class xInputCheckBox extends xElement {

   
    constructor(options: OptionsInputCheckBox) {
        let _myChangeCallback = options.ValueChange;
       
      

        delete options.ValueChange;

        super("input", options);
        let myThis: xInputCheckBox = this;
        (<HTMLInputElement>myThis.y).type = 'checkbox';

        if (options.value != undefined && options.value) {
           
            (<HTMLInputElement>   myThis.y).checked = true;
        }

      

        if (_myChangeCallback) {
            myThis.y.onchange=
                function (e: Event) {
                    let r: HTMLInputElement = <HTMLInputElement>e.target;
                    _myChangeCallback(r.checked);
                };
        }


    }

    public isChecked() {
        let myThis: xInputCheckBox = this;
        return (<HTMLInputElement>myThis.y).checked;

    }


    public setChecked(val:boolean) {
        let myThis: xInputCheckBox = this;
        return (<HTMLInputElement>myThis.y).checked=val;
    }
}
