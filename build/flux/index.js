"use strict";
require('requirejs');
var Dispatcher = require('flux');
var stores_1 = require("./stores");
var action_1 = require("./action");
var views_1 = require("./views");
//define the dispatcher
var ResistanceDispatcher = new Dispatcher();
exports.ResistanceDispatcher = ResistanceDispatcher;
//main
console.log("Running program...");
var store = new stores_1.ResistanceStore();
var listView = new views_1.ListView(store);
var inputView = new views_1.InputView(store);
action_1.ToDoActions.addNewProtester("Say hello"); //starting item (testing)
