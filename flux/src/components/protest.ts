/**
 * Created by Wei-Jen on 1/18/17.
 */

import {Protester} from './protester';

export class Protest {
    private name: string;
    private zipcode: string;
    private time: Date;
    private protesters: Protester[];

    constructor(name: string, zipcode?: string, time?: string) {
        this.name = name;
        this.zipcode = zipcode;
        this.time = new Date(time);
        this.protesters = [];
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
        for (var i = 0; i < this.protesters.length; i++) {
            if (this.protesters[i].getName() === newProtester.getName()) {
                return;
            }
        }
        this.protesters.push(newProtester);
    }

    // Getter methods
    getName(): string {
        return this.name;
    }

    getZipcode(): string {
        return this.zipcode;
    }

    getTime(): Date {
        return this.time;
    }

    getProtesters(): Protester[] {
        return this.protesters;
    }
}
