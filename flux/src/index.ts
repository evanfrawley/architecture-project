import {Dispatcher} from 'flux';
import {ResistanceStore} from "./stores";
import {ResistanceAction} from "./action";
import * as View from "./views";

//define the dispatcher
const ResistanceDispatcher = new Dispatcher();

//main
let store = new ResistanceStore();
let protesterListView = new View.ProtesterListView(store);
let protestListView = new View.ProtestListView(store);
let movementListView = new View.MovementListView(store);
let otherListView = new View.OtherListView(store);
let protesterInputView = new View.ProtesterInputView(store);
let protestInputView = new View.ProtestInputView(store);
let movementrInputView = new View.MovementInputView(store);

export {ResistanceDispatcher};