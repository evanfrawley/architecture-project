import {EventEmitter} from "events";
import {Action, ToDoActions} from './action'
import {ResistanceDispatcher} from "./index";


class ResistanceStore extends EventEmitter {
  private protesters:string[] = [];
  private protests:string[] = [];
  private movements:string[] = [];

  constructor() {
    super();
    //register callback (respond to dispatches)
    ResistanceDispatcher.register((payload:Action) => {
      switch(payload.actionType){ //switch instead of if/else block

        //handle each kind of action
        case ToDoActions.ADD_NEW_PROTESTOR:
          //TODO add something to protesters
          this.emit('change');
          break;

        case ToDoActions.ADD_NEW_PROTEST:
          //TODO add something to protesters
          this.emit('change');
          break;

        case ToDoActions.ADD_NEW_MOVEMENT:
          //TODO add something to protesters
          this.emit('change');
          break;

        case ToDoActions.MODIFY_PROTEST:
          //TODO add something to protesters
          this.emit('change');
          break;

        case ToDoActions.ADD_PROTEST_TO_MOVEMENT:
          //TODO add something to protesters
          this.emit('change');
          break;

        case ToDoActions.ADD_PROTESTER_TO_PROTEST:
          //TODO add something to protesters
          this.emit('change');
          break;

        case ToDoActions.GET_PROTESTS_MEMBERS:
          //TODO add something to protesters
          this.emit('change');
          break;

        case ToDoActions.GET_PROTESTERS_NEAR_PROTEST:
          //TODO add something to protesters
          this.emit('change');
          break;

        case ToDoActions.GET_PROTESTS_NEAR_LOCATION:
          //TODO add something to protesters
          this.emit('change');
          break;
      }
    })
  }

  /* state getters; should encapsulate more */
  getProtesters(){
    return this.protesters;
  }

  getProtests() {
    return this.protests;
  }

  getMovements() {
    return this.movements;
  }

  test() {
    console.log("test");
  }

}

export {ResistanceStore};