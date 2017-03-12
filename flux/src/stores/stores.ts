import {EventEmitter} from "events";
import {Action, ResistanceAction} from '../actions/actions'
import {ResistanceDispatcher} from "../index";
import {Movement} from '../common/movement';
import {Protest} from '../common/protest';
import {Protester} from '../common/protester';

// class to represent the state of the application
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
      let zipcode;
      let radius;

      // Dispatcher actions
      switch(payload.actionType){

        case ResistanceAction.ADD_NEW_PROTESTER:
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
          let oldProtestName = payload.data.oldProtestName;
          let newProtestName = payload.data.newProtestName;
          let newProtestTime = payload.data.newProtestTime;
          protest = this.find(this.protests, oldProtestName)[0];
          protest.modify(newProtestName, newProtestTime);
          this.emit('change');
          break;

        case ResistanceAction.ADD_PROTEST_TO_MOVEMENT:
          protest = this.find(this.protests, payload.data.protestName)[0];
          movement = this.find(this.movements, payload.data.movementName)[0];
          movement.addProtest(protest);
          this.emit('change');
          break;

        case ResistanceAction.ADD_PROTESTER_TO_PROTEST:
          protest = this.find(this.protests, payload.data.protestName)[0];
          protester = this.find(this.protesters, payload.data.protesterName)[0];
          protest.addProtester(protester);
          this.emit('change');
          break;

        case ResistanceAction.GET_PROTESTS_MEMBERS:
          protest = this.find(this.protests, payload.data.protestName)[0];
          this.otherList = protest.getProtesters();
          this.emit('change');
          break;

        case ResistanceAction.GET_PROTESTERS_NEAR_PROTEST:
          protest = this.find(this.protests, payload.data.protestName)[0];
          zipcode = protest.getLocation().getZipCode();
          radius = payload.data.radius;
          this.otherList = this.getProtestersNearLocation(this.protesters, zipcode, radius);
          this.emit('change');
          break;

        case ResistanceAction.GET_PROTESTS_NEAR_LOCATION:
          zipcode = payload.data.zipcode;
          radius = payload.data.radius;
          this.otherList = this.getProtestersNearLocation(this.protesters, zipcode, radius);
          this.emit('change');
          break;
      }
    })
  }

  /* store getters */
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

  // Utility Functions

  /**
   * Finds a matching item in a given array
   * @param searchArray
   * @param searchString
   * @returns {any[]}
   */
  find(searchArray:any[], searchString:any) {
    let filteredArray = searchArray.filter((item) => {
      return item.getName() === searchString
    });
    return filteredArray;
  }

  /**
   * Gets protesters near a given location within a certain radius
   * @param protesters
   * @param zipcode
   * @param radius
   * @returns {Protester[]}
   */
  getProtestersNearLocation(protesters:Protester[], zipcode:string, radius:number) {
    return protesters.filter((protester) => {
      return protester.getLocation().isWithinRadius(zipcode, radius);
    });
  }

}

export {ResistanceStore};