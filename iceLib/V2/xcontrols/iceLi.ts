import { OptionsHtml, iXElementHolder } from '../iceBase';
import { iceElement, xElementHolder } from '../../iceElement';

interface OptionsLi extends OptionsHtml {
    text?: string;
}

export class iceLi extends iceElement {
    private xh: xElementHolder;

    constructor(options?: OptionsLi) {
        super("li", options);
        if (options?.text != undefined) {
            this.y.textContent = options.text;
        }
    }

    get asHolder(): iXElementHolder {
        if (this.xh == null) {
            this.xh = new xElementHolder(this);
        }
        return this.xh;
    }
}
