import { iceElement } from '../../iceElement';
import { OptionsHtml } from '../iceBase';
import { iceLString } from '../iceLString';

export interface OptionsSpan extends OptionsHtml {
    textVariable?: string;
    textLocalise?: string;
    title?: string;
}

export class iceSpan extends iceElement {
    constructor(options?: OptionsSpan) {
        let texteFinal: string;
        if (options != undefined) {
            if (options.textVariable != undefined)
            { texteFinal = options.textVariable; }

            if (options.textLocalise != undefined)
            { texteFinal = new iceLString(options.textLocalise).text; }

            delete options.textLocalise;
            delete options.textVariable;
        }

        super("span", options);
        if (texteFinal != undefined)
        { this.y.innerHTML=texteFinal; }

        if (options != undefined && options.title != undefined) {
            this.y.title = options.title;
        }

    }

    public setTitle(newTitle: string) {
        let myThis: iceSpan = this;

        myThis.y.title = newTitle;

    }
}
