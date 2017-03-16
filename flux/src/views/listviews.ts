import {ResistanceStore} from "../stores/stores";
import {} from '../actions/actions';
import * as $ from 'jquery';

// INTERFACES
/**
 * Interface for List View
 * List views are used to show the current state of an array
 * creates the child list of a given array
 */
interface ListView {
  createList(list:HTMLUListElement, items:any[]):void
  render():void
}

// LIST VIEWS
/**
 * class for the list view of protesters
 * shows the state of protesters
 */
export class ProtesterListView implements ListView {

  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', () => { this.render(); });
  }

  createList(list, items) {
    items.forEach((item) => {
      list.append(
        `<li>
          Name: ${item.getName()}</br>
          Email: ${item.getEmail()}</br>
          ZIP: ${item.getLocation().getZipCode()}
        </li>`
      );
    });
  }
  render(){
    let protesterList = $('#protesterList');
    protesterList.empty();
    let protesters = this.resistanceStore.getProtesters();
    this.createList(protesterList, protesters);
  }
}

/**
 * class for protest list view that shows current protest state
 * will show the protesters of a certain protest if they're registered
 */
export class ProtestListView implements ListView {

  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', () => { this.render(); });
  }

  createList(list, items) {
    items.forEach((item) => {
      let itemText =
        `<li>
          Protest Name: ${item.getName()}</br>
          ZIP: ${item.getLocation().getZipCode()}</br>
          Date/Time: ${item.getTime()}
        </li>`
      if(item.getProtesters().length > 0) {
        let nestedList = $(`<ul></ul>`);
        item.getProtesters().forEach((protester) => {
          nestedList.append(
            `<li>
              Protester Name: ${protester.getName()}</br>
              ZIP: ${protester.getLocation().getZipCode()}
            </li>`
          );
        });
        let li = $(itemText);
        li.append(nestedList);
        list.append(li);
      } else {
        list.append(itemText);
      }
    });
  }

  render(){
    let protestList = $('#protestList');
    protestList.empty();
    let protests = this.resistanceStore.getProtests();
    this.createList(protestList, protests);
  }
}

/**
 * class for the movements list view
 * shows the current state of the movemvents
 */
export class MovementListView implements ListView {

  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', () => { this.render(); });
  }

  createList(list, items) {
    items.forEach((item) => {
      let itemText = `<li>${item.getName()}</li>`;
      if(item.getProtests().length > 0) {
        let nestedList = $(`<ul></ul>`);
        item.getProtests().forEach((protest) => {
          nestedList.append(
            `<li>
              Protest Name: ${protest.getName()}</br>
              ZIP: ${protest.getLocation().getZipCode()}
            </li>`
          );
        });
        let li = $(itemText);
        li.append(nestedList);
        list.append(li);
      } else {
        list.append(itemText);
      }
    });
  }

  render(){
    let movementList = $('#movementList');
    movementList.empty();
    let movements = this.resistanceStore.getMovements();
    this.createList(movementList, movements);
  }
}

/**
 * class of a list view to show the changing querying output from the user
 * called OtherListView since it shows the "other" information that the user queries
 */
export class OtherListView implements ListView {

  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', () => { this.render(); })
  }

  createList(list, items) {
    items.forEach((item) => {
      list.append(
        `<li>
          ${item.getName()} (${item.getEmail()})
        </li>`
      );
    });
  }

  render() {
    let otherList = $('#otherList');
    otherList.empty();
    let otherElements = this.resistanceStore.getOtherElements();
    this.createList(otherList, otherElements);
  }
}