

interface OptionsImg extends OptionsHtml{
        src?: string;
}

class xImg extends xElement {
    
    constructor(options: OptionsImg) {
        super("img", options);
        if (options.src != undefined) {
           (<HTMLImageElement> this.y).src = options.src;
        }

    }
}