import {ResistanceStore} from "./stores";
import * as $ from 'jquery';

class ListView {

  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', (e) => { this.render(); });
  }

  render(){
    let list = $('#todo-list');
    list.empty();
    let items = this.resistanceStore.getProtesters();
    items.forEach((item) => {
      list.append(`<li>${item}</li>`); //add item for each
    })
    list.append(`<li><em>memes</em></li>`); //add draft
  }
}

class ProtesterInputView {
  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', (e) => { this.render(); });

    // PROTESTERS
    let protesterSubmit = $('#protesterSubmit');
    protesterSubmit.on('click', (e) => {
      e.preventDefault();
      // retreive values
      let email =  $('#email').val();
      let zip = $('#protesterZip').val();
      let name = $('#protesterNameInput').val();

      // clear values
      $('#protesterNameInput').val('');
      $('#protesterZip').val('');
      $('#email').val('')
      // TODO Actions.action(input value)
    });


    // PROTESTS
    let protestSubmit = $('#protestSubmit');
    protestSubmit.on('click', (e) => {
      e.preventDefault();
      // retreive values
      let dateTime =  $('#dateTime').val();
      let zip = $('#protestZip').val();
      let name = $('#protestNameInput').val();

      // clear values
      $('#protestNameInput').val('');
      $('#protestZip').val('');
      $('#dateTime').val('');
      // TODO Actions.action(input value)
    });


    // MOVEMENTS
    let movementSubmit = $('#movementSubmit');
    protestSubmit.on('click', (e) => {
      e.preventDefault();
      // retreive values
      let name = $('#movementNameInput').val();

      // clear values
      $('#movementNameInput').val('');
      // TODO Actions.action(input value)
    });

  }

  render() {
    let input = $('#newItem');
  }
}

class ProtestInputView {
  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', (e) => { this.render(); });

    // PROTESTS
    let protestSubmit = $('#protestSubmit');
    protestSubmit.on('click', (e) => {
      e.preventDefault();
      // retreive values
      let dateTime =  $('#dateTime').val();
      let zip = $('#protestZip').val();
      let name = $('#protestNameInput').val();

      // clear values
      $('#protestNameInput').val('');
      $('#protestZip').val('');
      $('#dateTime').val('');
      // TODO Actions.action(input value)
    });

  }

  render() {
    let input = $('#newItem');
  }

}

class MovementInputView {
  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', (e) => { this.render(); });

    // MOVEMENTS
    let movementSubmit = $('#movementSubmit');
    movementSubmit.on('click', (e) => {
      e.preventDefault();
      // retreive values
      let name = $('#movementNameInput').val();

      // clear values
      $('#movementNameInput').val('');
      // TODO Actions.action(input value)
    });

  }

  render() {
    let input = $('#newItem');
  }

}


export {ListView, ProtesterInputView, ProtestInputView, MovementInputView};