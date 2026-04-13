// @ts-nocheck
import { iceElement } from '../../iceElement';
﻿

interface OptionsCanvas {
    id?: string;
    class?: string;    
}

export class iceCanvas extends iceElement {

    constructor(options: OptionsCanvas) {
        super("canvas", options);

    }
}