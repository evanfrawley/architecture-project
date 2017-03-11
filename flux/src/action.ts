import {ResistanceDispatcher} from './index'

// Action object
class Action {
  constructor(readonly actionType:string, readonly data?:any){}
}

class ToDoActions {
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
  static addNewProtester(item){
    let action = new Action(ToDoActions.ADD_NEW_PROTESTOR, {text:item});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static addNewProtest(item){
    let action = new Action(ToDoActions.ADD_NEW_PROTEST, {text:item});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static addNewMovement(item){
    let action = new Action(ToDoActions.ADD_NEW_MOVEMENT, {text:item});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static modifyProtest(item){
    let action = new Action(ToDoActions.MODIFY_PROTEST, {text:item});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static addProtestToMovement(item){
    let action = new Action(ToDoActions.ADD_PROTEST_TO_MOVEMENT, {text:item});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static addProtesterToProtest(item){
    let action = new Action(ToDoActions.ADD_PROTESTER_TO_PROTEST, {text:item});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static getProtestProtesters(item){
    let action = new Action(ToDoActions.GET_PROTESTS_MEMBERS, {text:item});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static getProtestersNearProtest(item){
    let action = new Action(ToDoActions.GET_PROTESTERS_NEAR_PROTEST, {text:item});
    ResistanceDispatcher.dispatch(action);
  }

  // add new protester
  static getProtestsNearLocation(item){
    let action = new Action(ToDoActions.GET_PROTESTS_NEAR_LOCATION, {text:item});
    ResistanceDispatcher.dispatch(action);
  }
}

export {ToDoActions, Action};

