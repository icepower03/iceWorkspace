import { OptionsHtml } from '../iceBase';
import { iceElement } from '../../iceElement';

interface OptionsInputCheckBox extends OptionsHtml {
    value?: boolean;
    ValueChange?: (checked: boolean) => void;
}

export class iceInputCheckBox extends iceElement {

    constructor(options: OptionsInputCheckBox) {
        let _myChangeCallback = options.ValueChange;

        delete options.ValueChange;

        super("input", options);
        let myThis: iceInputCheckBox = this;
        (<HTMLInputElement>myThis.y).type = 'checkbox';

        if (options.value != undefined && options.value) {
            (<HTMLInputElement>myThis.y).checked = true;
        }

        if (_myChangeCallback) {
            myThis.y.onchange =
                function (e: Event) {
                    let r: HTMLInputElement = <HTMLInputElement>e.target;
                    _myChangeCallback(r.checked);
                };
        }
    }

    public isChecked() {
        let myThis: iceInputCheckBox = this;
        return (<HTMLInputElement>myThis.y).checked;
    }

    public setChecked(val: boolean) {
        let myThis: iceInputCheckBox = this;
        return (<HTMLInputElement>myThis.y).checked = val;
    }
}
