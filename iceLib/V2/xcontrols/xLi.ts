
interface OptionsLi extends OptionsHtml {
    text?: string;
}
class xLi extends xElement {
    private xh: xElementHolder;
    constructor(options?: OptionsLi) {
        super("li", options);

        if (options?.text != undefined) {
            this.y.textContent = options.text;
        }
    }

    get asHolder(): iXElementHolder {
        if (this.xh == null) {
            this.xh = new xElementHolder(this);
        }
        return this.xh;
    }

}