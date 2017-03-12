# Architected Resistance

This repo contains code for two different versions of an application to manage political resistance actions, created as part of an assignment for the [Software Architecture](https://canvas.uw.edu/courses/1100150) course at the UW iSchool. Each version utilizes an architectural style:

1. Flux
2. Layered (n-tiered)

See the individual folders for more details.


### Architectural Analysis
> In the space below (replacing these lines), address the following questions about the architecture of your implementation:

> 1. Discuss how effectively each architectural style was individually at supporting the features of this particular application? What were the benefits and drawbacks of following that style? Be sure to justify your responses with specifics!


#### Effectiveness

##### Flux
Flux's single direction data flow is quite good for architecting the _**Resistance**_ from HW1. The great part about Flux is that it deals with individual user interactions at once, keeping track of a current state, and displaying the state with its various views. In terms of the specific features of this application, architecting in Flux allowed us to compartmentalize the application into small chunks. These chunks, similar to that below, were able to give us finite control on what parts of the state to update when they need to, and only update the views when the states are updated.

```js
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


> 2. Discussed how effectively&mdash;_in theory_&mdash;each architectural style would support the "additional feature" required by the other. For example, if you did Client-Server and Pipe-and-Filter versions, you should discuss how well client-server might support data processing, and how well pipe-and-filter might support multiple multiple organizers collaborating. Be sure to justify your responses with specifics!

#### Scaling

##### Flux

Supporting _**Layered (N-Tier)**_'s additional feature of persisting data between different sessions is an interesting task. There are already current solutions of saving a massive store of information (a big JSON object in the cloud, if you will), such as Firebase or other non-relational databases like MongoDB. However, if we were to implement it from scratch, that would be doable. Our first idea would be to write the data into a local JSON file after each use, and read it in (given that it exists) before every use. One issue with this is that it could interfere with the additional feature of Flux, having a multi-instance functionality. If a user is interacting with the app, another user logs on, the first users makes changes and closes the app, the JSON file is saved locally, and then the second user closes the app, overwriting the local JSON file. This would be the biggest problem that could be solved with a few solutions. First, there could be a JSON diff tool that can see the differences between the JSON objects, and then merge them. If there exists conflicts, then the tool would deal with them and choose the most up to date. Alternatively, like Firebase, there could be an event listener for when the local JSON file is changed, updating the state for all of the users listening to the app.
