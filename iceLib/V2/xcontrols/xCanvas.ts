// @ts-nocheck
import { xElement } from '../../xElement';
﻿

interface OptionsCanvas {
    id?: string;
    class?: string;    
}

export class xCanvas extends xElement {

    constructor(options: OptionsCanvas) {
        super("canvas", options);

    }
}