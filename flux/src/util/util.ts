/**
 * Utility file for reusible classes & interfaces
 */

/**
 * Interface to clear items
 */
interface Clearer {
  clear():void
}

/**
 * class for an object to clear the inputs within a given id's HTML children
 */
export class InputClearer implements Clearer {
  constructor(private id:string) { }

  // sets all input values to empty
  clear() {
    let inputs = $(`#${this.id}`).find(":input");
    inputs.each(function(item) {
      $(inputs[item]).val('');
    })
  }
}