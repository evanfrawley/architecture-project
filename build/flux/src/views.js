"use strict";
var $ = require('jquery');
var ListView = (function () {
    function ListView(resistanceStore) {
        var _this = this;
        this.resistanceStore = resistanceStore;
        resistanceStore.on('change', function (e) { _this.render(); });
    }
    ListView.prototype.render = function () {
        var list = $('#todo-list');
        list.empty();
        var items = this.resistanceStore.getProtesters();
        items.forEach(function (item) {
            list.append("<li>" + item + "</li>"); //add item for each
        });
        list.append("<li><em>" + this.resistanceStore.getDraftItem() + "</em></li>"); //add draft
    };
    return ListView;
}());
exports.ListView = ListView;
var InputView = (function () {
    function InputView(resistanceStore) {
        var _this = this;
        this.resistanceStore = resistanceStore;
        resistanceStore.on('change', function (e) { _this.render(); });
        // PROTESTERS
        var input = $('#protesterSubmit');
        input.on('submit', function () {
            // TODO Actions.action(input value)
            console.log($('#email').val(), $('#protesterZip').val(), $('#protesterNameInput').val());
        });
        // PROTESTS
        // MOVEMENTS
    }
    InputView.prototype.render = function () {
        var input = $('#newItem');
        console.log('rendering', this.resistanceStore.getDraftItem());
        input.val(this.resistanceStore.getDraftItem()); //in case need to update...
    };
    return InputView;
}());
exports.InputView = InputView;
