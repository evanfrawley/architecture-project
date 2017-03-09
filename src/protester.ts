/**
 * Created by Wei-Jen on 1/18/17.
 */

export class Protester {
    private name: string;
    private email: string;
    private zipcode: string;

    constructor(name: string, email?: string, zipcode?: string) {
        this.name = name;
        this.email = email;
        this.zipcode = zipcode;
    }

    // Getter methods
    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getZipcode(): string {
        return this.zipcode;
    }
}