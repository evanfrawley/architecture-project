/**
 * Created by Wei-Jen on 1/18/17.
 */

import {Protest} from './protest';

export class Movement {
    private name: string;
    private protests: Protest[];

    constructor(name: string) {
        this.name = name;
        this.protests = [];
    }

    // Adds a Protest
    addProtest(newProtest: Protest) {
        for (let i = 0; i < this.protests.length; i++) {
            if (this.protests[i].getName() === newProtest.getName()) {
                return;
            }
        }
        this.protests.push(newProtest);
    }

    // Getter methods
    getName(): string {
        return this.name;
    }

    getProtests(): Protest[] {
        return this.protests;
    }
}