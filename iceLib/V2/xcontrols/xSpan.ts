interface OptionsSpan extends OptionsHtml {
    textVariable?: string;
    textLocalise?: string;
    title?: string;
}

class xSpan extends xElement {
    constructor(options?: OptionsSpan) {
        let texteFinal: string;
        if (options != undefined) {
            if (options.textVariable != undefined)
            { texteFinal = options.textVariable; }

            if (options.textLocalise != undefined)
            { texteFinal = new xLString(options.textLocalise).text; }

            delete options.textLocalise;
            delete options.textVariable;
        }

        super("span", options);
        if (texteFinal != undefined)
        { this.y.innerHTML=texteFinal; }

        if (options != undefined && options.title != undefined) {
            this.y.title = options.title;
        }

    }

    public setTitle(newTitle: string) {
        let myThis: xSpan = this;

        myThis.y.title = newTitle;

    }
}
