import {ResistanceDispatcher} from './index'

// Action object
class Action {
  constructor(readonly actionType:string, readonly data?:any){}
}

class ResistanceAction {
  //type constants
  static readonly ADD_NEW_PROTESTOR = 'add_new_protester';
  static readonly ADD_NEW_PROTEST = 'add_new_protest';
  static readonly ADD_NEW_MOVEMENT = 'add_new_movement';
  static readonly MODIFY_PROTEST = 'modify_protest';
  static readonly ADD_PROTEST_TO_MOVEMENT = 'add_protest_to_movement';
  static readonly ADD_PROTESTER_TO_PROTEST = 'add_protester_to_protest';
  static readonly GET_PROTESTS_MEMBERS = 'get_protest_members';
  static readonly GET_PROTESTERS_NEAR_PROTEST = 'get_protesters_near_protest';
  static readonly GET_PROTESTS_NEAR_LOCATION = 'get_protests_near_location';

  // add new protester
  static addNewProtester(name, email, zip){
    let action = new Action(ResistanceAction.ADD_NEW_PROTESTOR, {name:name, email:email, zip:zip});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static addNewProtest(name, dateTime, zip){
    let action = new Action(ResistanceAction.ADD_NEW_PROTEST, {name:name, dateTime:dateTime, zip:zip});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static addNewMovement(name){
    let action = new Action(ResistanceAction.ADD_NEW_MOVEMENT, {name:name});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static modifyProtest(item){
    let action = new Action(ResistanceAction.MODIFY_PROTEST, {text:item});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static addProtestToMovement(movementName, protestName){
    let action = new Action(ResistanceAction.ADD_PROTEST_TO_MOVEMENT, {movementName:movementName, protestName:protestName});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static addProtesterToProtest(protestName, protesterName){
    let action = new Action(ResistanceAction.ADD_PROTESTER_TO_PROTEST, {protestName:protestName, protesterName:protesterName});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static getProtestProtesters(protestName){
    let action = new Action(ResistanceAction.GET_PROTESTS_MEMBERS, {protestName:protestName});
    ResistanceDispatcher.dispatch(action);
  }

  // get protester near something
  static getProtestersNearLocation(location){
    let action;
    if(isNaN(parseInt(location))) {
      action = new Action(ResistanceAction.GET_PROTESTERS_NEAR_PROTEST, {protestName:location});
    } else {
      action = new Action(ResistanceAction.GET_PROTESTS_NEAR_LOCATION, {zipcode:location});
    }
    ResistanceDispatcher.dispatch(action);
  }
}

export {ResistanceAction, Action};

