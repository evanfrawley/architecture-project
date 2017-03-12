import {Dispatcher} from 'flux';
import {ResistanceStore} from "./stores/stores";
import * as ListView from "./views/listviews";
import * as InputView from "./views/inputviews";


// dispatcher
const ResistanceDispatcher = new Dispatcher();

// store
let store = new ResistanceStore();

// list views
let protesterListView = new ListView.ProtesterListView(store);
let protestListView = new ListView.ProtestListView(store);
let movementListView = new ListView.MovementListView(store);
let otherListView = new ListView.OtherListView(store);

// input views

// create new object views
let protesterInputView = new InputView.NewProtesterInputView("protestersContainer");
let protestInputView = new InputView.NewProtestInputView("protestsContainer");
let movementrInputView = new InputView.MovementInputView("movementsContainer");

// append object views
let addProtesterToProtestInputView = new InputView.AddProtesterToProtestInputView("protesterToProtestContainer");
let addProtestToMovementInputView = new InputView.AddProtestToMovementInputView("protestToMovementContainer");

// querying views
let getProtestersInProtestInputView = new InputView.GetProtestersInProtestInputView("getProtestersAtProtestContainer");
let getProtestersNearLocationInputView = new InputView.GetProtestersNearLocationInputView("getProtestersNearLocationContainer");

// modifying views
let modifyProtestInputView = new InputView.ModifyProtestInputView("modifyOldNameContainer");

export {ResistanceDispatcher};