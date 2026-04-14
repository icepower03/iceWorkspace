import { OptionsHtml, iXElementHolder, iXElementHolderEnable } from '../iceBase';
import { iceElement, xElementHolder } from '../../iceElement';

export class iceUl extends iceElement implements iXElementHolderEnable {
    private xh: xElementHolder;

    get asHolder(): iXElementHolder {
        return this.xh;
    }

    constructor(options?: OptionsHtml) {
        super("ul", options);
        this.xh = new xElementHolder(this);
    }
}
