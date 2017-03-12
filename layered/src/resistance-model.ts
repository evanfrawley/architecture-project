let fs = require('fs');
let CircularJSON = require('circular-json');

import {Protester} from './protester';
import {Protest} from './protest';
import {Movement} from './movement';

export class ResistanceModel {
    private protesters: Protester[];
    private protests: Protest[];
    private movements: Movement[];

    constructor() {
        this.protesters =  [];
        this.protests = [];
        this.movements = [];
    }

    /**
     * Registers a new protester with the system
     * @param name
     * @param email
     * @param zipcode
     */
    addMember(name: string, email: string, zipcode: string) {
        this.protesters.push(new Protester(name, email, zipcode));
    }

    /**
     *  Register a new protest with the system
     * @param newName
     * @param zipcode
     * @param time
     * @return {string} name of the new protest
     */
    addProtest(newName: string, zipcode: string, time: string): string {
        this.protests.push(new Protest(newName, zipcode, time));
        return newName;
    }

    /**
     * Register a new movement with the system
     * @param newName
     * @return {string} name of the new movement
     */
    addMovement(newName: string) {
        this.movements.push(new Movement(newName));
        return newName;
    }

    /**
     * Adds a Protester to a Protest
     * @param memberName
     * @param protestName
     */
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

    /**
     * Returns Protesters in the system who match the search string
     * @param searchName
     * @return {string[]} an array of matches
     */
    findMemberNames(searchName: string): string[] {
        return this.find(this.protesters, searchName).map((item) => { return item.getName()});
    }

    /**
     * Returns Protests in the system that match the search string
     * @param searchName
     * @return {string[]} an array of matches
     */
    findProtestNames(searchName: string): string[] {
        return this.find(this.protests, searchName).map((item) => { return item.getName()});
    }

    /**
     * Returns Movements in the system that match the search string
     * @param searchName
     * @return {string[]} an array of matches
     */
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

    /**
     * Alters the name and/or the time of the protest
     * @param name name of the protest to look for
     * @param newName
     * @param newTime
     */
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

    /**
     * Adds a Protest to a Movement
     * @param protestName
     * @param movementName
     */
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

    /**
     * Returns all the Protesters involved in a Protest and their email addresses.
     * @param protestName
     * @return {string[]} An array of protesters' names and email addresses
     */
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

    /**
     * Returns Protesters who are near a Protest
     * @param protestName
     * @param radius
     * @return {string[]} an array of matches
     */
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

    /**
     * Returns Protests near a location, as well as the Movements they are part of
     * @param zipcode
     * @param radius
     * @return {string[]} an array of matches
     */
    getNearbyProtests(zipcode: string, radius: number): string[] {
        let results: string[] = [];

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

    /**
     * Process the json and construct the objects
     * @param data json data as string
     */
    processResistanceData(data: string) {
        let obj = JSON.parse(data);
        let protesters = obj.Protesters;
        let protests = obj.Protests;
        let movements = obj.Movements;

        if (protesters.length > 0) {
            protesters.forEach((protester) => {
                let newProtester = new Protester(protester.name, protester.email, protester.location.zipcode);
                this.protesters.push(newProtester);
            });
        }

        if (protests.length > 0) {
            protests.forEach((protest) => {
                let newProtest = new Protest(protest.name, protest.location.zipcode, protest.time, protest.protesters, protest.movements);
                this.protests.push(newProtest);
            });
        }

        if (movements.length > 0) {
            movements.forEach((movement) => {
                let newMovement = new Movement(movement.name, movement.protests);
                this.movements.push(newMovement);

            });
        }
    }

    /**
     * Save the application data to a json file
     * @param fileName name of the json file
     */
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
}