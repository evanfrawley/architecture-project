var zipcodeMap = require('../data/zipcode-locations.json');
var geolib = require('geolib');

import {Protester} from './protester';
import {Protest} from './protest';
import {Movement} from './movement';

export class ResistanceManager {
    private protests: Protest[];
    private protesters: Protester[];
    private movements: Movement[];

    constructor() {
        this.protests = [];
        this.protesters =  [];
        this.movements = [];
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
        this.protesters.forEach((protester) => {
            if(protester.getName() === memberName) {
                // Find the protest
                this.protests.forEach((protest) => {
                    if (protest.getName() === protestName) {
                        protest.addProtester(protester);
                    }
                });
            }
        });
    }

    // Returns Protesters in the system who match the search string
    findMemberNames(searchName: string): string[] {
        return this.find(this.protesters, searchName);
    }

    //  Returns Protests in the system that match the search string
    findProtestNames(searchName: string): string[] {
        return this.find(this.protests, searchName);
    }

    //  Returns Movements in the system that match the search string
    findMovementNames(searchName: string): string[] {
        return this.find(this.movements, searchName);
    }

    // General search helper function
    find(searchArray: any[], searchName: string): string[] {
        var results: string[] = [];
        searchArray.filter((item) => {
            if(item.getName().toLowerCase().includes(searchName.toLowerCase())) {
                results.push(item.getName());
            }
        });
        return results;
    }

    // Alters the name and/or the time of the protest
    modifyProtest(name: string, newName?: string, newTime?: string) {
        this.protests.forEach((protest) => {
            if (protest.getName() === name) {
                protest.modify(newName, newTime);
                return;
            }
        });
    }

    // Adds a Protest to a Movement
    addProtestToMovement(protestName: string, movementName: string) {
        this.protests.forEach((protest) => {
            if(protest.getName() === protestName) {
                this.movements.forEach((movement) => {
                    if (movement.getName() === movementName) {
                        movement.addProtest(protest);
                    }
                });
            }
        });
    }

    // Returns all the Protesters involved in a Protest and their email addresses
    getProtesters(protestName: string): string[] {
        var results: string[] = [];
        this.protests.forEach((protest) => {
            if (protest.getName() === protestName) {
                protest.getProtesters().forEach((protester) => {
                    results.push(protester.getName() + ' (' + protester.getEmail() + ')');
                });
            }
        });
        return results;
    }

    // Returns Protesters who are near a Protest
    getUsersNearProtest(protestName: string, radius: number): string[] {
        var results: string[] = [];
        this.protests.forEach((protest) => {
            if (protest.getName() === protestName) {
                protest.getProtesters().forEach((protester) => {
                    var distance = geolib.getDistance(zipcodeMap[protest.getZipcode()], zipcodeMap[protester.getZipcode()]); // in meters
                    var distanceInMiles = distance * 0.000621371;
                    if (distanceInMiles <= radius) {
                        results.push(protester.getName() + ' (' + protester.getEmail() + ')');
                    }
                });
            }
        });
        return results;
    }

    // Returns Protests near a location, as well as the Movement they are part of
    getNearbyProtests(zipcode: string, radius: number): string[] {
        var results = [];

        // First, add the protest with no movement to the result
        this.protests.forEach((protest) => {
            var distance = geolib.getDistance(zipcodeMap[zipcode], zipcodeMap[protest.getZipcode()]); // in meters
            var distanceInMiles = distance * 0.000621371;
            if (distanceInMiles <= radius) {
                var result = {
                    name: protest.getName(),
                    movement: 'Not part of a movement'
                };
                results.push(result);
            }
        });

        // Then, check if any Protest belongs to a movement.
        this.movements.forEach((movement) => {
            movement.getProtests().forEach((protest) => {
                results.forEach((result) => {
                   if (result.name === protest.getName()) {
                        result.movement = movement.getName();
                   }
                });
            });
        });

        // String it together
        for (var i = 0; i < results.length; i++) {
            results[i] = results[i].name + ' (' + results[i].movement + ')';
        }
        return results;
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