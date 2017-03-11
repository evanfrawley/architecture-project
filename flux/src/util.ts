interface Clearer {
  clear():void
}

export class InputClearer implements Clearer {
  constructor(private id:string) { }

  clear() {
    let inputs = $(`#${this.id}`).find(":input");
    inputs.each(function(item) {
      $(inputs[item]).val('');
    })
  }
}