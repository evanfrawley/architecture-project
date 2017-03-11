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
                if (movements.length <= 0) {
                    result += " (Not part of any movement)";
                } else {
                    result += " (" +  movements.join(", ") + ")";
                }
                results.push(result);
            }
        });

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