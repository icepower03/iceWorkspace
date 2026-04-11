

interface OptionsCanvas {
    id?: string;
    class?: string;    
}

class xCanvas extends xElement {

    constructor(options: OptionsCanvas) {
        super("canvas", options);

    }
}