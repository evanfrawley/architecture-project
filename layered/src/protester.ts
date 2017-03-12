/**
 * Created by Wei-Jen on 1/18/17.
 */

import {ZcLocation} from "./location";

export class Protester {
    private name: string;
    private email: string;
    private location: ZcLocation;

    /**
     * Constructs a Protester
     * @param name
     * @param email
     * @param zipcode
     */
    constructor(name: string, email?: string, zipcode?: string) {
        this.name = name;
        this.email = email;
        this.location = new ZcLocation(zipcode);
    }

    // Getter methods
    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getLocation(): ZcLocation {
        return this.location;
    }
}