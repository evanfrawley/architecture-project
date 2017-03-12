let fs = require('fs');
let CircularJSON = require('circular-json');

import {Protester} from './protester';
import {Protest} from './protest';
import {Movement} from './movement';

// Behaviors for Subjects (publishers from lectures)
export interface Subject {
    register(obs:Observer);
    unregister(obs:Observer);
    notifyAll();
}

// Behaviors for Observers (subscribers from lectures)
export interface Observer {
    notify();
}

export class ResistanceModel {
    private protesters: Protester[];
    private protests: Protest[];
    private movements: Movement[];
    private observers: Observer[];

    constructor() {
        this.protesters =  [];
        this.protests = [];
        this.movements = [];
        this.observers = [];
    }

    // Register a new protester with the system
    addMember(name: string, email: string, zipcode: string) {
        this.protesters.push(new Protester(name, email, zipcode));
    }

    // Register a new protest with the system
    addProtest(newName: string, zipcode: string, time: string): string {
        this.protests.push(new Protest(newName, zipcode, time));
        return newName;
    }

    // Register a new movement with the system
    addMovement(newName: string) {
        this.movements.push(new Movement(newName));
        return newName;
    }

    // Adds a Protester to a Protest
    addMemberToProtest(memberName: string, protestName: string) {
        // Find the protester
        let protesters = this.find(this.protesters, memberName);

        // Find the protest
        let protests = this.find(this.protests, protestName);

        if (protests.length > 0 && protesters.length > 0) {
            protests.forEach((protest) => {
                protesters.forEach((protester) => {
                    protest.addProtester(protester)
                });
            });
        }
    }

    // Returns Protesters in the system who match the search string
    findMemberNames(searchName: string): string[] {
        return this.find(this.protesters, searchName).map((item) => { return item.getName()});
    }

    //  Returns Protests in the system that match the search string
    findProtestNames(searchName: string): string[] {
        return this.find(this.protests, searchName).map((item) => { return item.getName()});
    }

    //  Returns Movements in the system that match the search string
    findMovementNames(searchName: string): string[] {
        return this.find(this.movements, searchName).map((item) => { return item.getName()});
    }

    // General search helper function
    find(searchArray: any[], searchName: string): any[] {
        let results: any[] = [];
        searchArray.filter((item) => {
            if(item.getName().toLowerCase().includes(searchName.toLowerCase())) {
                results.push(item);
            }
        });
        return results;
    }

    // Alters the name and/or the time of the protest
    modifyProtest(name: string, newName?: string, newTime?: string) {
        // Only fires when either newName or newTime is defined, otherwise no point in modifying
        if (newName || newTime) {

            let protests = this.find(this.protests, name);

            // if no protest is found, bail.
            if (protests.length < 0) {
                return;
            }

            protests[0].modify(newName, newTime);
        }
    }

    // Adds a Protest to a Movement
    addProtestToMovement(protestName: string, movementName: string) {
        let protests = this.find(this.protests, protestName);

        let movements = this.find(this.movements, movementName);

        if (protests.length > 0 && movements.length > 0) {
            movements.forEach((movement) => {
                protests.forEach((protest) => {
                    movement.addProtest(protest);
                    protest.addMovement(movement);
                });
            });
        }
    }

    // Returns all the Protesters involved in a Protest and their email addresses
    getProtesters(protestName: string): string[] {
        let results = this.find(this.protests, protestName);

        if (results.length > 0) {
            results.forEach((protest) => {
                protest.getProtesters().map((protester) => {
                    return protester.getName() + ' (' + protester.getEmail() + ')';
                });
            });
        }

        return results;
    }

    // Returns Protesters who are near a Protest
    getUsersNearProtest(protestName: string, radius: number): string[] {
        let results: string[] = [];
        let protests = this.find(this.protests, protestName);

        if (protests.length > 0) {
            protests.forEach((protest) => {
                this.protesters.forEach((protester) => {
                    if (protest.getLocation().isWithinRadius(protester.getLocation().getZipCode(), radius)) {
                        results.push(protester.getName() + ' (' + protester.getEmail() + ')');
                    }
                });
            });
        }

        return results;
    }

    // Returns Protests near a location, as well as the Movements they are part of
    getNearbyProtests(zipcode: string, radius: number): string[] {
        let results = [];

        this.protests.forEach((protest) => {
            if (protest.getLocation().isWithinRadius(zipcode, radius)) {
                let result = protest.getName();
                let movements = protest.getMovements();
                let movementsInNames = movements.map((movement) => {return movement.getName()});
                if (movements.length <= 0) {
                    result += " (Not part of any movement)";
                } else {
                    result += " (" +  movementsInNames.join(", ") + ")";
                }
                results.push(result);
            }
        });
        return results;
    }

    processResistanceData(data: string) {
        console.log(data);
        console.log("  Done!");
    }

    saveResistanceData(fileName: string) {
        let json: string = '{ \"Protesters\":' + CircularJSON.stringify(this.protesters, null, '\t') + ', \n\t\"Protests\":'
            + CircularJSON.stringify(this.protests, null, '\t')
            + ', \n\t\"Movements\":' + CircularJSON.stringify(this.movements, null, '\t') + ' }' ;
        fs.writeFile(fileName, json,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("Data written successfully!");
        });
    }

    // Getter methods
    getMembers(): Protester[] {
        return this.protesters;
    }

    getProtests(): Protest[] {
        return this.protests;
    }

    getMovements(): Movement[] {
        return this.movements;
    }

    /**
     * Adds an Observer.
     * @param obs The Observer to be added.
     */
    register(obs:Observer) {
        this.observers.push(obs);
    }

    /**
     * Removes an Observer.
     * @param obs The Observer to be removed.
     */
    unregister(obs:Observer) {
        if (this.observers.length != 0) {
            let index = this.observers.indexOf(obs);
            if (index > -1) {
                this.observers.splice(index, 1);
            }
        }
    }

    /**
     * Asks all Observers to update themselves.
     */
    notifyAll() {
        this.observers.forEach((obs) => obs.notify());
    }
}