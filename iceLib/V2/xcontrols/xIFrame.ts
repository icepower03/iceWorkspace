

interface OptionsIFrame extends OptionsHtml  {
  
    src?: string;
}

class xIFrame extends xElement {

    constructor(options: OptionsIFrame) {
        super("iframe", options);
        let myThis: xIFrame = this;
        if (options?.src != undefined) {
            myThis.setSrc(options.src);
        }
    }

    public setSrc(url: string) {
        let myThis: xIFrame = this;
        (<HTMLIFrameElement>myThis.y).src = url;

    }
    public remove() {
        let myThis: xIFrame = this;
        (<HTMLIFrameElement>myThis.y).remove();
    }
}