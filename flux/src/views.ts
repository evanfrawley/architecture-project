import {ResistanceStore} from "./stores";
import {} from './action';
import * as $ from 'jquery';
import {ResistanceAction} from "./action";
import {InputClearer} from './util';
import {Movement} from './components/movement';
import {Protest} from './components/protest';
import {Protester} from './components/protester';


interface ListView {
  createList(list:HTMLUListElement, items:any[]):void
  render():void
}

interface InputView {
  readonly id:string;
  inputClearer:InputClearer;
}

class ProtesterListView implements ListView {

  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', (e) => { this.render(); });
  }

  createList(list, items) {
    items.forEach((item) => {
      list.append(`<li>Name: ${item.getName()} Email: ${item.getEmail()} ZIP: ${item.getZipcode()}</li>`); //add item for each
    });
  }

  render(){
    let protesterList = $('#protesterList');
    protesterList.empty();
    let protesters = this.resistanceStore.getProtesters();

    this.createList(protesterList, protesters);
  }
}

class ProtestListView implements ListView {
  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', (e) => { this.render(); });
  }

  createList(list, items) {
    items.forEach((item) => {
      let itemText = `<li>Protest Name: ${item.getName()} ZIP: ${item.getZipcode()} Date/Time: ${item.getTime()}</li>`
      if(item.getProtesters().length > 0) {
        let nestedList = $(`<ul></ul>`);
        item.getProtesters().forEach((protester) => {
          nestedList.append(`<li>Protester Name: ${protester.getName()} ZIP: ${protester.getZipcode()}</li>`)
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

class MovementListView implements ListView {
  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', (e) => { this.render(); });
  }

  createList(list, items) {
    items.forEach((item) => {
      list.append(`<li>${item.getName()}</li>`); //add item for each
    });
  }
  render(){

    let movementList = $('#movementList');
    movementList.empty();
    let movements = this.resistanceStore.getMovements();

    this.createList(movementList, movements);
  }
}

class OtherListView implements ListView {

  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', (e) => { this.render(); })
  }

  createList(list, items) {
    items.forEach((item) => {
      list.append(`<li>${item.getName()}</li>`); //add item for each
    });
  }

  render() {

    let otherList = $('#otherList');
    otherList.empty();
    let otherElements = this.resistanceStore.getOtherElements();

    this.createList(otherList, otherElements);
  }
}

class ProtesterInputView implements InputView {
  public readonly id:string;
  public inputClearer:InputClearer;
  constructor(private resistanceStore:ResistanceStore) {
    this.id = "protesters";
    this.inputClearer = new InputClearer(this.id);
    resistanceStore.on('change', (e) => { this.render(); });

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



  render() { }
}

class ProtestInputView implements InputView {

  public readonly id:string;
  public inputClearer:InputClearer;
  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', (e) => { this.render(); });
    this.id = 'protests';
    this.inputClearer = new InputClearer(this.id);
    let protestSubmit = $('#protestSubmit');
    protestSubmit.on('click', (e) => {
      e.preventDefault();
      let dateTime =  $('#dateTime').val();
      let zip = $('#protestZip').val();
      let name = $('#protestNameInput').val();
      ResistanceAction.addNewProtest(name, dateTime, zip);
      this.inputClearer.clear();
    });

    let protesterToProtest = $('#protesterToProtestSubmit');
    protesterToProtest.on('click', (e) => {
      e.preventDefault();
      let protesterName = $('#protesterToProtest').val();
      let protestName = $('#protestReceiving').val();
      ResistanceAction.addProtesterToProtest(protestName, protesterName);
      this.inputClearer.clear();
    });


    let getProtesterInProtest = $('#protesterAtProtestSubmit');
    getProtesterInProtest.on('click', (e) => {
      e.preventDefault();
      let protestName = $('#protesterAtProtest').val();
      ResistanceAction.getProtestProtesters(protestName);
      this.inputClearer.clear();
    })
  }
  render() { }
}

class MovementInputView implements InputView {

  public readonly id:string;
  public inputClearer:InputClearer;

  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', (e) => { this.render(); });
    this.id = 'movements';
    this.inputClearer = new InputClearer(this.id);
    let movementSubmit = $('#movementSubmit');
    movementSubmit.on('click', (e) => {
      e.preventDefault();
      let name = $('#movementNameInput').val();
      ResistanceAction.addNewMovement(name);
      this.inputClearer.clear();
    });

    let addProtestToMovement = $('#protestToMovementSubmit');
    addProtestToMovement.on('click', (e) => {
      e.preventDefault();
      let protestName = $('#protestToMovement').val();
      let movementName = $('#movementReceiving').val();
      ResistanceAction.addProtestToMovement(movementName, protestName);
      this.inputClearer.clear();
    });

  }
  render() { }

}

export {
  ProtesterListView,
  ProtestListView,
  MovementListView,
  OtherListView,
  ProtesterInputView,
  ProtestInputView,
  MovementInputView
};