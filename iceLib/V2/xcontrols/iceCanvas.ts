import { OptionsHtml } from '../iceBase';
import { iceElement } from '../../iceElement';

interface OptionsCanvas extends OptionsHtml {
}

export class iceCanvas extends iceElement {

    constructor(options: OptionsCanvas) {
        super("canvas", options);
    }
}
