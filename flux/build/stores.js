"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var action_1 = require("./action");
var index_1 = require("./index");
var ResistanceStore = (function (_super) {
    __extends(ResistanceStore, _super);
    function ResistanceStore() {
        var _this = _super.call(this) || this;
        _this.protesters = [];
        _this.protests = [];
        _this.movements = [];
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
        return _this;
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
    ResistanceStore.prototype.test = function () {
        console.log("test");
    };
    return ResistanceStore;
}(events_1.EventEmitter));
exports.ResistanceStore = ResistanceStore;
