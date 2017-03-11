import {Dispatcher} from 'flux';
import {ResistanceStore} from "./stores";
import {ToDoActions} from "./action";
import {ListView, ProtesterInputView} from "./views";

//define the dispatcher
const ResistanceDispatcher = new Dispatcher();

//main
let store = new ResistanceStore();
let listView = new ListView(store);
let inputView = new ProtesterInputView(store);
ToDoActions.addNewProtester("Say hello"); //starting item (testing)

export {ResistanceDispatcher};