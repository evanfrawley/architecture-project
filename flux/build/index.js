"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flux_1 = require("flux");
var stores_1 = require("./stores");
var action_1 = require("./action");
var views_1 = require("./views");
//define the dispatcher
var ResistanceDispatcher = new flux_1.Dispatcher();
exports.ResistanceDispatcher = ResistanceDispatcher;
var toDoStoreSingleton = new stores_1.ResistanceStore(); //instantiate; doing some singleton work
//main
// let store = new ResistanceStore();
var listView = new views_1.ListView(toDoStoreSingleton);
var inputView = new views_1.InputView(toDoStoreSingleton);
action_1.ToDoActions.addNewProtester("Say hello"); //starting item (testing)
// store.test();
toDoStoreSingleton.test();
