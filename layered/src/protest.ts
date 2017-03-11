/**
 * Created by Wei-Jen on 1/18/17.
 */

import {Protester} from './protester';
import {Movement} from "./movement";
import {ZcLocation} from "./location";

 export class Protest {
    private name: string;
    private location: ZcLocation;
    private time: Date;
    private protesters: Protester[];
    private movements: Movement[];

    constructor(name: string, zipcode?: string, time?: string) {
        this.name = name;
        this.location = new ZcLocation(zipcode);
        this.time = new Date(time);
        this.protesters = [];
        this.movements = [];
    }

    // Change the name or time of the Protest
    modify(newName?: string, newTime?: string) {
        if (newName) {
            this.name = newName;
        }
        if (newTime) {
            this.time = new Date(newTime);
        }
    }

    // Adds a Protester
    addProtester(newProtester: Protester) {
        // If the name already exists, bail out.
        for (let i = 0; i < this.protesters.length; i++) {
            if (this.protesters[i].getName().toLowerCase() === newProtester.getName().toLowerCase()) {
                return;
            }
        }

        this.protesters.push(newProtester);
    }

    // Adds a Movement
    addMovement(newMovement: Movement) {
        // If the name already exists, bail out.
        for (let i = 0; i < this.movements.length; i++) {
            if (this.movements[i].getName().toLowerCase() === newMovement.getName().toLowerCase()) {
                return;
            }
        }

        this.movements.push(newMovement);
    }


    // Getter methods
    getName(): string {
        return this.name;
    }

    getLocation(): ZcLocation {
        return this.location;
    }

    getTime(): Date {
        return this.time;
    }

    getProtesters(): Protester[] {
        return this.protesters;
    }

    getMovements() : Movement[] {
        return this.movements;
    }
}
