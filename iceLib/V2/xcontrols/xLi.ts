// @ts-nocheck
import { xElement } from '../../xElement';
﻿
interface OptionsLi extends OptionsHtml {
    text?: string;
}
export class xLi extends xElement {
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