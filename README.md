# This was a homework assignment for Software Architecture. 
## Here, I (Evan) implemented a Flux architecture from scratch :)
## My friend Wei-Jen implemented layed MVC

# Architected Resistance

This repo contains code for two different versions of an application to manage political resistance actions, created as part of an assignment for the [Software Architecture](https://canvas.uw.edu/courses/1100150) course at the UW iSchool. Each version utilizes an architectural style:

1. Flux
2. Layered (n-tiered)

See the individual folders for more details.


## Architectural Analysis

### Effectiveness

##### Flux
Flux's single direction data flow is quite good for architecting the _**Resistance**_ from HW1. The great part about Flux is that it deals with individual user interactions at once, keeping track of a current state, and displaying the state with its various views. In terms of the specific features of this application, architecting in Flux allowed us to compartmentalize the application into small chunks. These chunks, similar to that below, were able to give us finite control on what parts of the state to update when they need to, and only update the views when the states are updated.

``` js
// View that is easily populated with the state
export class ProtesterListView implements ListView {
  constructor(private resistanceStore:ResistanceStore) {
    resistanceStore.on('change', () => { this.render(); });
  }
  createList(list, items) {
    // creates list
  }
  render(){
    // renders list
  }
}

// example of an actions
case ResistanceAction.ADD_NEW_PROTESTER:
  protester = new Protester(
    // payload user info
  );
  this.protesters.push(protester);
  this.emit('change');
  break;
```

Having exact protocol for when an action is dispatched allowed us to get very finite control over how the state changed. Additionally, we were able to scale the number of controls that the user could interact with easily since the change was appending to the `switch` statement, adding to the `action` file, and adding new views. One of the drawbacks was that there felt like there was quite a bit of repeated _"style"_ in the HTML, such redundancy that is solved with ReactJS and using React Components. Even then, the architecture made the code very easy to manage and easy to iterate quickly on the code base.

##### Layered

Layered architecture is effective in implementing the the features required since it separates the concerns of the app. The architecture breaks the app into three layers: the data, presentation, and business logic layers. Separating these allows the app to add additional features and layers in the future. Here, it was very beneficial to break up the different separations, such that each layer only needs to deal with its inputs and outputs. Below are code snippets demonstrating this separation.

``` js

//manager handles interactions between layers
//it also does initial data validation that comes from the view
export class ResistanceManager {
    private model: ResistanceModel;
    //controller loads instance of the model
    constructor(model:ResistanceModel) {
        this.model = model;
    }
    //business logic
}
// View also loads in the model now, in addition to the manager from before
function showMainMenu(rm:ResistanceModel, rmgr:ResistanceManager) {
  while(true){ //run until we exit
    console.log(Welcome to the Resistance! Pick an option:
  1. Register a new member
  2.
  .
  .
  .
}
// a "Fat" model, such that it does a lot of the heavy lifting & data processing
export class ResistanceModel {
    private protesters: Protester[];
    private protests: Protest[];
    private movements: Movement[];
    private observers: Observer[];
    constructor() {
      // sets fields
    }
}
```


Additionally, when having an actual implementation of this app, the architecture follows nicely to work with a mobile app, such that if you were protesting, you'd be able to use the app on the go. It would be odd to bring a computer while you're protesting, but easy for a mobile app to be accessed! Moreover, if other views were added to the app, they would be easy to implement, since they would all share the same data model. One major drawback was that if there are numerous views and controllers updating one another, there would be a exponentially growing complexity with each feature that is added. With a bunch of extra layers would come a huge performance decrease, since the number of layers and objects and interactions skyrockets as the app grows.

### Scaling

##### Flux

Supporting _**Layered (N-Tier)**_'s additional feature of persisting data between different sessions is an interesting task. There are already current solutions of saving a massive store of information (a big JSON object in the cloud, if you will), such as Firebase or other non-relational databases like MongoDB. However, if we were to implement it from scratch, that would be doable. Our first idea would be to write the data into a local JSON file after each use, and read it in (given that it exists) before every use. One issue with this is that it could interfere with the additional feature of Flux, having a multi-instance functionality. If a user is interacting with the app, another user logs on, the first users makes changes and closes the app, the JSON file is saved locally, and then the second user closes the app, overwriting the local JSON file. This would be the biggest problem that could be solved with a few solutions. First, there could be a JSON diff tool that can see the differences between the JSON objects, and then merge them. If there exists conflicts, then the tool would deal with them and choose the most up to date. Alternatively, like Firebase, there could be an event listener for when the local JSON file is changed, updating the state for all of the users listening to the app.

##### Layered

Supporting _**Flux**_'s additional feature of allowing numerous simultaneous views of the data is an implementation that is very similar to Flux's above. Our theory is that the architecture would use specific _different_ instances of the data layer, such that each data model is _specific_ to the user. Additionally, this data instance could be saved in the cloud or locally for later usage. We would increase the number of layers in the application, such that there would be another business logic layer to allows for data model for specific users to interact with other users. Such functionality would be on the scope of sharing data, changing the other's data, adding to it, deleting it, etc. The different views would then follow, since each view would inherently render a different instance of a data layer, since they would be different for other users.
