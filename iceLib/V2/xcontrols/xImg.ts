// @ts-nocheck
import { xElement } from '../../xElement';
import { OptionsHtml } from '../xBase';
﻿

export interface OptionsImg extends OptionsHtml {
    src?: string;
}

export class xImg extends xElement {
    
    constructor(options: OptionsImg) {
        super("img", options);
        if (options.src != undefined) {
           (<HTMLImageElement> this.y).src = options.src;
        }

    }
}