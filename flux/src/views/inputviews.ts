import {} from '../actions/actions';
import * as $ from 'jquery';
import {ResistanceAction} from "../actions/actions";
import {InputClearer} from '../util/util';

// INTERFACES
/**
 * Interface for inputviews
 * InputViews are used for the views of where the user inputs information
 * has an instance of an id
 * has an instance of an InputClearer
 */
interface InputView {
  readonly id:string;
  inputClearer:InputClearer;
}

// INPUT VIEWS
/**
 * class for Input view for adding new protesters
 */
export class NewProtesterInputView implements InputView {
  public readonly id:string;
  public inputClearer:InputClearer;
  constructor(id:string) {
    this.id = id;
    this.inputClearer = new InputClearer(this.id);
    let protesterSubmit = $('#protesterSubmit');
    protesterSubmit.on('click', (e) => {
      e.preventDefault();
      let email =  $('#email').val();
      let zip = $('#protesterZip').val();
      let name = $('#protesterNameInput').val();
      this.inputClearer.clear();
      ResistanceAction.addNewProtester(name, email, zip);
    });
  }
}

/**
 * class for Input view for adding new protests
 */
export class NewProtestInputView implements InputView {

  public readonly id:string;
  public inputClearer:InputClearer;
  constructor(id:string) {
    this.id = id;
    this.inputClearer = new InputClearer(this.id);
    let protestSubmit = $('#protestSubmit');
    protestSubmit.on('click', (e) => {
      e.preventDefault();
      let dateTime =  $('#dateTime').val();
      let zip = $('#protestZip').val();
      let name = $('#protestNameInput').val();
      ResistanceAction.addNewProtest(name, zip, dateTime);
      this.inputClearer.clear();
    });
  }
}

/**
 * class for Input view for getting all protesters in a protest
 */
export class GetProtestersInProtestInputView implements InputView {
  readonly id:string;
  inputClearer:InputClearer;
  constructor(id:string) {
    this.id = id;
    this.inputClearer = new InputClearer(id);
    let getProtesterInProtest = $('#protesterAtProtestSubmit');
    getProtesterInProtest.on('click', (e) => {
      e.preventDefault();
      let protestName = $('#protesterAtProtest').val();
      ResistanceAction.getProtestProtesters(protestName);
      this.inputClearer.clear();
    });
  }
}

/**
 * class for Input view for modifying protest information
 */
export class ModifyProtestInputView implements InputView {
  readonly id:string;
  inputClearer:InputClearer;
  constructor(id:string) {
    this.id = id;
    this.inputClearer = new InputClearer(id);
    let modifyProtest = $('#modifyProtestSubmit');
    modifyProtest.on('click', (e) => {
      e.preventDefault();
      let oldProtestName = $('#modifyOldName').val();
      let newProtestName = $('#modifyNewName').val();
      let newProtestTime = $('#modifyNewTime').val();
      ResistanceAction.modifyProtest(oldProtestName, newProtestName, newProtestTime);
      this.inputClearer.clear();
    })
  }
}

/**
 * class for input view for getting protesters near a location
 * Locations can be protests or zip codes
 */
export class GetProtestersNearLocationInputView implements InputView {
  readonly id:string;
  inputClearer:InputClearer;
  constructor(id:string) {
    this.id = id;
    this.inputClearer = new InputClearer(id);
    let getProtestersNearLocation = $('#protesterNearSubmit');
    getProtestersNearLocation.on('click', (e) => {
      e.preventDefault();
      let location = $('#protesterNear').val();
      let radius = $('#protesterNearRadius').val();
      ResistanceAction.getProtestersNearLocation(location, radius);
      this.inputClearer.clear();
    })
  }
}

/**
 * class for input view to add protesters to protests
 */
export class AddProtesterToProtestInputView implements InputView {
  readonly id:string;
  inputClearer:InputClearer;
  constructor(id:string) {
    this.id = id;
    this.inputClearer = new InputClearer(id);
    let protesterToProtest = $('#protesterToProtestSubmit');
    protesterToProtest.on('click', (e) => {
      e.preventDefault();
      let protesterName = $('#protesterToProtest').val();
      let protestName = $('#protestReceiving').val();
      ResistanceAction.addProtesterToProtest(protestName, protesterName);
      this.inputClearer.clear();
    });
  }
}

/**
 * class for input view for adding protests to movements
 */
export class AddProtestToMovementInputView implements InputView {
  readonly id:string;
  inputClearer:InputClearer;
  constructor(id:string) {
    this.id = id;
    this.inputClearer = new InputClearer(id);
    let addProtestToMovement = $('#protestToMovementSubmit');
    addProtestToMovement.on('click', (e) => {
      e.preventDefault();
      let protestName = $('#protestToMovement').val();
      let movementName = $('#movementReceiving').val();
      ResistanceAction.addProtestToMovement(movementName, protestName);
      this.inputClearer.clear();
    });

  }
}

/**
 * class for input view of adding a new movement
 */
export class MovementInputView implements InputView {
  public readonly id:string;
  public inputClearer:InputClearer;
  constructor(id:string) {
    this.id = id;
    this.inputClearer = new InputClearer(this.id);
    let movementSubmit = $('#movementSubmit');
    movementSubmit.on('click', (e) => {
      e.preventDefault();
      let name = $('#movementNameInput').val();
      ResistanceAction.addNewMovement(name);
      this.inputClearer.clear();
    });
  }
}
