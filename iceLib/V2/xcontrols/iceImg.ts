// @ts-nocheck
import { iceElement } from '../../iceElement';
import { OptionsHtml } from '../iceBase';
﻿

export interface OptionsImg extends OptionsHtml {
    src?: string;
}

export class iceImg extends iceElement {
    
    constructor(options: OptionsImg) {
        super("img", options);
        if (options.src != undefined) {
           (<HTMLImageElement> this.y).src = options.src;
        }

    }
}