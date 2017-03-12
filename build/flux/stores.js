"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('require');
var events_1 = require("events");
var action_1 = require('./action');
var index_1 = require("./index");
var ResistanceStore = (function (_super) {
    __extends(ResistanceStore, _super);
    function ResistanceStore() {
        var _this = this;
        _super.call(this);
        this.protesters = [];
        this.protests = [];
        this.movements = [];
        this.draft = "";
        //register callback (respond to dispatches)
        index_1.ResistanceDispatcher.register(function (payload) {
            switch (payload.actionType) {
                //handle each kind of action
                case action_1.ToDoActions.ADD_NEW_PROTESTOR:
                    //TODO add something to protesters
                    _this.emit('change');
                    break;
                case action_1.ToDoActions.ADD_NEW_PROTEST:
                    //TODO add something to protesters
                    _this.emit('change');
                    break;
                case action_1.ToDoActions.ADD_NEW_MOVEMENT:
                    //TODO add something to protesters
                    _this.emit('change');
                    break;
                case action_1.ToDoActions.MODIFY_PROTEST:
                    //TODO add something to protesters
                    _this.emit('change');
                    break;
                case action_1.ToDoActions.ADD_PROTEST_TO_MOVEMENT:
                    //TODO add something to protesters
                    _this.emit('change');
                    break;
                case action_1.ToDoActions.ADD_PROTESTER_TO_PROTEST:
                    //TODO add something to protesters
                    _this.emit('change');
                    break;
                case action_1.ToDoActions.GET_PROTESTS_MEMBERS:
                    //TODO add something to protesters
                    _this.emit('change');
                    break;
                case action_1.ToDoActions.GET_PROTESTERS_NEAR_PROTEST:
                    //TODO add something to protesters
                    _this.emit('change');
                    break;
                case action_1.ToDoActions.GET_PROTESTS_NEAR_LOCATION:
                    //TODO add something to protesters
                    _this.emit('change');
                    break;
            }
        });
    }
    /* state getters; should encapsulate more */
    ResistanceStore.prototype.getProtesters = function () {
        return this.protesters;
    };
    ResistanceStore.prototype.getProtests = function () {
        return this.protests;
    };
    ResistanceStore.prototype.getMovements = function () {
        return this.movements;
    };
    ResistanceStore.prototype.getDraftItem = function () {
        return this.draft;
    };
    return ResistanceStore;
}(events_1.EventEmitter));
exports.ResistanceStore = ResistanceStore;
