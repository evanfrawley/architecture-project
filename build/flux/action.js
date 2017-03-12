"use strict";
require('require');
var index_1 = require('./index');
// Action object
var Action = (function () {
    function Action(actionType, data) {
        this.actionType = actionType;
        this.data = data;
    }
    return Action;
}());
exports.Action = Action;
var ToDoActions = (function () {
    function ToDoActions() {
    }
    // add new protester
    ToDoActions.addNewProtester = function (item) {
        var action = new Action(ToDoActions.ADD_NEW_PROTESTOR, { text: item });
        index_1.ResistanceDispatcher.dispatch(action);
    };
    // add new protester
    ToDoActions.addNewProtest = function (item) {
        var action = new Action(ToDoActions.ADD_NEW_PROTEST, { text: item });
        index_1.ResistanceDispatcher.dispatch(action);
    };
    // add new protester
    ToDoActions.addNewMovement = function (item) {
        var action = new Action(ToDoActions.ADD_NEW_MOVEMENT, { text: item });
        index_1.ResistanceDispatcher.dispatch(action);
    };
    // add new protester
    ToDoActions.modifyProtest = function (item) {
        var action = new Action(ToDoActions.MODIFY_PROTEST, { text: item });
        index_1.ResistanceDispatcher.dispatch(action);
    };
    // add new protester
    ToDoActions.addProtestToMovement = function (item) {
        var action = new Action(ToDoActions.ADD_PROTEST_TO_MOVEMENT, { text: item });
        index_1.ResistanceDispatcher.dispatch(action);
    };
    // add new protester
    ToDoActions.addProtesterToProtest = function (item) {
        var action = new Action(ToDoActions.ADD_PROTESTER_TO_PROTEST, { text: item });
        index_1.ResistanceDispatcher.dispatch(action);
    };
    // add new protester
    ToDoActions.getProtestProtesters = function (item) {
        var action = new Action(ToDoActions.GET_PROTESTS_MEMBERS, { text: item });
        index_1.ResistanceDispatcher.dispatch(action);
    };
    // add new protester
    ToDoActions.getProtestersNearProtest = function (item) {
        var action = new Action(ToDoActions.GET_PROTESTERS_NEAR_PROTEST, { text: item });
        index_1.ResistanceDispatcher.dispatch(action);
    };
    // add new protester
    ToDoActions.getProtestsNearLocation = function (item) {
        var action = new Action(ToDoActions.GET_PROTESTS_NEAR_LOCATION, { text: item });
        index_1.ResistanceDispatcher.dispatch(action);
    };
    //type constants
    ToDoActions.ADD_NEW_PROTESTOR = 'add_new_protester';
    ToDoActions.ADD_NEW_PROTEST = 'add_new_protest';
    ToDoActions.ADD_NEW_MOVEMENT = 'add_new_movement';
    ToDoActions.MODIFY_PROTEST = 'modify_protest';
    ToDoActions.ADD_PROTEST_TO_MOVEMENT = 'add_protest_to_movement';
    ToDoActions.ADD_PROTESTER_TO_PROTEST = 'add_protester_to_protest';
    ToDoActions.GET_PROTESTS_MEMBERS = 'get_protest_members';
    ToDoActions.GET_PROTESTERS_NEAR_PROTEST = 'get_protesters_near_protest';
    ToDoActions.GET_PROTESTS_NEAR_LOCATION = 'get_protests_near_location';
    return ToDoActions;
}());
exports.ToDoActions = ToDoActions;
