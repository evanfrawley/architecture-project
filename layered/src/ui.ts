//User Interface for The Resistance Manager. Acts as the presentation layer.

let readlineSync = require('readline-sync'); //for easier repeated prompts
let fs = require('file-system');

import {ResistanceModel} from './resistance-model';
import {ResistanceManager} from './resistance-manager';

/**
 * Function to run the UI
 */
export function start() {
  //make a manager and start interacting with it
  let rm = new ResistanceModel();
  showMainMenu(rm, new ResistanceManager(rm));
}

/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(rm:ResistanceModel, rmgr:ResistanceManager) {
  while(true){ //run until we exit
    console.log(`Welcome to the Resistance! Pick an option:
  1. Register a new member
  2. Register a new protest
  3. Register a new movement
  4. Add a member to a protest
  5. Modify a protest
  6. Add a protest to a movement
  7. List protest members
  8. List members near a protest
  9. List protests near a location
  10. Load in existing resistance data
  11. Exit`);

    let response = readlineSync.question('> ');
    if(response === '11' || response.slice(0,2).toLowerCase() === ':q'){
      let saveWork = readlineSync.question('Do you want to save the data? (y/n): ');
      if (saveWork.toLowerCase().startsWith('y')) {
        const DEFAULT_NAME = 'data.json';
        let fileName = readlineSync.question(`Please provide the file name (default: ${DEFAULT_NAME}): `); //use default if undefined
        if (fileName) {
          rm.saveResistanceData(fileName + '.json');
        } else {
          rm.saveResistanceData(DEFAULT_NAME);
        }
      }
      break; //stop looping, thus leaving method
    }

    switch(response) { //handle each response
      case '1': showNewMemberMenu(rm, rmgr); break;
      case '2': showNewProtestMenu(rm, rmgr); break;
      case '3': showNewMovementMenu(rm, rmgr); break;
      case '4': showAddToProtestMenu(rm); break;
      case '5': showModifyProtestMenu(rm); break;
      case '6': showAddToMovementMenu(rm); break;
      case '7': showListProtestersMenu(rm); break;
      case '8': showListNearbyMembersMenu(rm); break;
      case '9': showListNearbyProtestsMenu(rm); break;
      case '10': showLoadExistingResistanceDataMenu(rm); break;

      //case 11 handled above
      default: console.log('Invalid option!');
    }
    console.log(''); //extra empty line for revisiting
  }
}

/**
 * Show menu to add a new member
 */
function showNewMemberMenu(rm:ResistanceModel, rmgr:ResistanceManager) {
  console.log('Add a new member.');
  let name:string = readlineSync.question('  Name: ');
  let email:string = readlineSync.question('  Email: ');
  let zip:string = readlineSync.question('  Zip Code: ');

  if (rmgr.addMember(name, email, zip)) {
    console.log('  Protester added!');
  } else {
    console.log('  An input has failed data validation. Please check your input.');
  }
}

/** 
 * Show menu to add a new protest. Will then show menu to add members to the protest
 */
function showNewProtestMenu(rm:ResistanceModel, rmgr:ResistanceManager) {
  console.log('Add a new protest.');
  let newProtestName:string = readlineSync.question('  Title of protest: ');
  let zipcode:string = readlineSync.question('  Location (zip code): ');
  let date:string = readlineSync.question('  Date and time (ex: Jan 21 2017 13:00 PST): ');

  let protestName:string = rmgr.addProtest(newProtestName, zipcode, date);

  if (protestName) {
    console.log("  Protest added!");
    showAddToProtestMenu(rm, protestName); //add users to new protest
  } else {
    console.log('  An input has failed data validation. Please check your input.');
  }
}

/**
 * Show menu to add a new movement. Will then show menu to add protests to the movement
 */
function showNewMovementMenu(rm:ResistanceModel, rmgr:ResistanceManager) {
  console.log('Add a new movement.');
  let newMovementName:string = readlineSync.question('  Title of movement: ');

  let movementName:string = rmgr.addMovement(newMovementName);

  if (movementName) {
    console.log("  Movement added!");
    let adding = readlineSync.question('Add protests to movement? (y/n): ');
    while(adding.toLowerCase().startsWith('y')){ //while adding members
      showAddToMovementMenu(rm, movementName); //add protests to new movement
      adding = readlineSync.question('Add another protest? (y/n): ');
    }
  } else {
    console.log('  An input has failed data validation. Please check your input.');
  }
}

/**
 * Show menu to add a member to a protest. Will repeat to add multiple members. Will show menu to search for a protest if none is provided.
 */
function showAddToProtestMenu(rm:ResistanceModel, protestName?:string) {
  if(!protestName){
    protestName = showSearchProtestsMenu(rm);
    if(!protestName){ return }//if didn't select a protest
  }

  let adding = readlineSync.question('Add a member to protest? (y/n): ');
  while(adding.toLowerCase().startsWith('y')){ //while adding members    
    let memberName = showSearchMembersMenu(rm); //find a member
    if(memberName){ //if selected someone
      rm.addMemberToProtest(memberName, protestName);
    } else {
      console.log('No member selected.')
    }
    adding = readlineSync.question('Add another member? (y/n): ');
  }
}

/**
 * Show menu to look up a member. Will return undefined if no member selected.
 */
function showSearchMembersMenu(rm:ResistanceModel) : string|undefined {
  return _searchListMenu('member', (q) => rm.findMemberNames(q));
}

/**
 * Show menu to look up a protest. Will return undefined if no protest selected.
 */
function showSearchProtestsMenu(rm:ResistanceModel) : string|undefined {
  return _searchListMenu('protest', (q) => rm.findProtestNames(q));
}

/**
 * Show menu to look up a movement. Will return undefined if no movement selected.
 */
function showSearchMovementsMenu(rm:ResistanceModel) : string|undefined {
  return _searchListMenu('movement', (q) => rm.findMovementNames(q));
}

/**
 * Helper function that shows a menu to search a list of items and choose a result.
 * Will return undefined if no item is selected
 */
function _searchListMenu(type:string, searchCallback:(query:string) => string[]) : string|undefined {
  console.log(`Searching for a ${type}.`);
  let query:string = readlineSync.question('Search query: ');
  let results:string[] = searchCallback(query);

  if(results.length > 0) {
    console.log('Results found: ');
    let resultsDisplay = '  '+(results.map((item:string, idx:number) => `${idx+1}. ${item}`).join('\n  '));
    console.log(resultsDisplay);
    
    let choiceIdx = parseInt(readlineSync.question(`Choose a ${type} (1-${results.length}): `)); //will covert to number or NaN

    return results[choiceIdx-1]; //will return undefined if invalid index
  } else {
    console.log('No results found.');
    return undefined;
  }
}

/**
 * Show menu to modify protest (title, time, or movement). Will show menu to search for a protest if none is provided.
 */
function showModifyProtestMenu(rm:ResistanceModel, protestName?:string) {
  if(!protestName){
    protestName = showSearchProtestsMenu(rm);
    if(!protestName){ return }//if didn't select a protest
  }

  while(true){ //run until we exit
    console.log(`Edit protest '${protestName}'.
  1. Change title
  2. Change time
  3. Add to movement
  4. Return to previous menu`);

    let response:number = parseInt(readlineSync.question('> '));
    if(response == 1){
      let newTitle = readlineSync.question('  New title: ');
      rm.modifyProtest(protestName, newTitle);
    }
    else if(response == 2){
      let newTime = readlineSync.question('  New date and time (ex: Jan 21 2017 13:00 PST): ');
      rm.modifyProtest(protestName, undefined, newTime); //no name to change
    }
    else if(response == 3){
      showAddToMovementMenu(rm, undefined, protestName);
    }
    else if(response == 4){ break; //exit from loop to return
    } else {
      console.log('Invalid option!');
    }
  }
}

/**
 * Show menu to add a protest to a movement. Will show menus to search for a protest and a movement if either is not provided.
 */
function showAddToMovementMenu(rm:ResistanceModel, movementName?:string, protestName?:string, ) {
  if(!protestName){ //if protest not yet specified
    protestName = showSearchProtestsMenu(rm);
    if(!protestName){ return }//if didn't select a protest
  }

  if(!movementName){ //if movement not yet specified
    movementName = showSearchMovementsMenu(rm);
    if(!movementName){ return }//if didn't select a movement
  }

  //add the protest to the movement
  rm.addProtestToMovement(protestName, movementName);
}

/**
 * Show a list of members participating in a protest. Will show menu to search for a protest. Should include outputting member's email addresses.
 */
function showListProtestersMenu(rm:ResistanceModel) {
  let protestName = showSearchProtestsMenu(rm);

  let members = rm.getProtesters(protestName);

  console.log('Members participating in this action:');
  console.log('  '+members.join('\n  ')+'\n');

  readlineSync.keyInPause('(Press any letter to continue)', {guide:false}); //so have time to read stuff
}

/**
 * Show a list of members geographically near to a protest. Will show menu to search for a protest. Should include outputting member's email addresses.
 */
function showListNearbyMembersMenu(rm:ResistanceModel) {
  let protestName = showSearchProtestsMenu(rm);

  const DEFAULT_DISTANCE = 20; 
  let distance = parseInt(readlineSync.question(`Distance in miles from protest (default: ${DEFAULT_DISTANCE}): `)) | DEFAULT_DISTANCE; //use default if undefined

  let members = rm.getUsersNearProtest(protestName, distance);

  console.log('Members participating in this action:');
  console.log('  '+members.join('\n  ')+'\n');

  readlineSync.keyInPause('(Press any letter to continue)', {guide:false}); //so have time to read stuff
}

/**
 * Show a list of protests geographically near the given zip code. Displayed protests should list any movements they are a part of.
 */
function showListNearbyProtestsMenu(rm:ResistanceModel) {
  let zip:string = readlineSync.question('Zip code to search near: ');

  const DEFAULT_DISTANCE = 50; 
  let distance = parseInt(readlineSync.question(`Distance in miles from protest (default: ${DEFAULT_DISTANCE}): `)) | DEFAULT_DISTANCE; //use default if undefined

  let protests = rm.getNearbyProtests(zip, distance);

  console.log('Nearby protests:');
  console.log('  '+protests.join('\n  ')+'\n');

  readlineSync.keyInPause('(Press any letter to continue)', {guide:false}); //so have time to read stuff
}

/**
 * Loads existing resistance data
 */
function showLoadExistingResistanceDataMenu(rm:ResistanceModel) {
  let fileName = readlineSync.question('  File Name: ');
  console.log('  Reading in ' + fileName + '.json...');

  var data = fs.readFileSync(fileName + '.json');
  rm.processResistanceData(data.toString());

  readlineSync.keyInPause('(Press any letter to continue)', {guide:false}); //so have time to read stuff
}