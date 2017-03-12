/**
 * Created by Wei-Jen on 3/07/17.
 */
import {ResistanceModel} from './resistance-model';

/**
 * Controller for the command-line view.
 */
export class ResistanceManager {
    private model: ResistanceModel;

    /**
     * Constructs a CanvasController
     * @param model The Model where the information lives
     */
    constructor(model:ResistanceModel) {
        this.model = model;
    }

    /**
     * Delegates the model to add a new Protester after validation
     * The params are information about the new Protester
     * @param name
     * @param email
     * @param zipcode
     * @return {boolean} true is successful, false otherwise
     */
    addMember(name: string, email: string, zipcode: string): boolean  {
        if (name && this.validateEmail(email) && this.validateZipcode(zipcode)) {
            this.model.addMember(name, email, zipcode);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Delegates the model to add a new Protest after validation
     * The params are information about the new Protest
     * @param newName
     * @param zipcode
     * @param time
     * @return {string} name of the added Protest
     */
    addProtest(newName: string, zipcode: string, time: string): string  {
        if (newName && this.validateZipcode(zipcode)) {
           return this.model.addProtest(newName, zipcode, time);
        } else {
            return '';
        }
    }

    /**
     * Delegates the model to add a new Movement after validation
     * The params are information about the new Movement
     * @param newName
     * @return {boolean} true is successful, false otherwise
     */
    addMovement(newName: string): string {
        if (newName) {
            return this.model.addMovement(newName);
        } else {
            return '';
        }
    }

    /**
     * Tests for US zipcode
     * @param zipcode the zipcode as string
     * @return {boolean} true is this is a US Zipcode, false otherwise
     */
     validateZipcode(zipcode: string): boolean {
        return zipcode && !isNaN(zipcode) && /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);
    }

    /**
     * Tests for Email address
     * @param email the email address to be tested
     * @return {boolean} true is this is a valid email address, false otherwise
     */
    validateEmail(email:string): boolean {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email && re.test(email);
    }
}