import {EventEmitter} from "events";
import {Action, ResistanceAction} from './action'
import {ResistanceDispatcher} from "./index";
import {Movement} from './components/movement';
import {Protest} from './components/protest';
import {Protester} from './components/protester';
import * as _ from 'lodash';


class ResistanceStore extends EventEmitter {
  private protesters:Protester[] = [];
  private protests:Protest[] = [];
  private movements:Movement[] = [];
  private otherList:Protester[] = [];


  constructor() {
    super();
    //register callback (respond to dispatches)
    ResistanceDispatcher.register((payload:Action) => {
      let protester;
      let protest;
      let movement;
      var protesters;
      var protests;
      var movements;
      switch(payload.actionType){ //switch instead of if/else block

        //handle each kind of action
        case ResistanceAction.ADD_NEW_PROTESTOR:
          protester = new Protester(
            payload.data.name,
            payload.data.email,
            payload.data.zip
          );
          this.protesters.push(protester);
          this.emit('change');
          break;

        case ResistanceAction.ADD_NEW_PROTEST:
          protest = new Protest(
            payload.data.name,
            payload.data.dateTime,
            payload.data.zip
          );
          this.protests.push(protest);
          this.emit('change');
          break;

        case ResistanceAction.ADD_NEW_MOVEMENT:
          movement = new Movement(payload.data.name);
          this.movements.push(movement);
          this.emit('change');
          break;

        case ResistanceAction.MODIFY_PROTEST:
          //TODO add something to protesters
          this.emit('change');
          break;

        case ResistanceAction.ADD_PROTEST_TO_MOVEMENT:
          protest = this.find(this.protests, payload.data.protestName);
          movement = this.find(this.movements, payload.data.movementName);
          movement.addProtest(protest);
          this.emit('change');
          break;

        case ResistanceAction.ADD_PROTESTER_TO_PROTEST:
          protest = this.find(this.protests, payload.data.protestName);
          protester = this.find(this.protesters, payload.data.protesterName);
          protest.addProtester(protester);
          this.emit('change');
          break;

        case ResistanceAction.GET_PROTESTS_MEMBERS:
          protest = this.find(this.protests, payload.data.protestName);
          this.otherList = protest.getProtesters();
          this.emit('change');
          break;

        case ResistanceAction.GET_PROTESTERS_NEAR_PROTEST:
          //TODO add something to protesters
          this.emit('change');
          break;

        case ResistanceAction.GET_PROTESTS_NEAR_LOCATION:
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

  getOtherElements() {
    return this.otherList;
  }

  find(searchArray:any[], searchString:any) {
    let filteredArray = searchArray.filter((item) => {
      return item.getName() === searchString
    });
    return filteredArray[0];
  }

}

export {ResistanceStore};