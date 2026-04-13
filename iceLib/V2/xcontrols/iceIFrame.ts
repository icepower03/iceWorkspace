// @ts-nocheck
import { iceElement } from '../../iceElement';
﻿

interface OptionsIFrame extends OptionsHtml  {
  
    src?: string;
}

export class iceIFrame extends iceElement {

    constructor(options: OptionsIFrame) {
        super("iframe", options);
        let myThis: iceIFrame = this;
        if (options?.src != undefined) {
            myThis.setSrc(options.src);
        }
    }

    public setSrc(url: string) {
        let myThis: iceIFrame = this;
        (<HTMLIFrameElement>myThis.y).src = url;

    }
    public remove() {
        let myThis: iceIFrame = this;
        (<HTMLIFrameElement>myThis.y).remove();
    }
}