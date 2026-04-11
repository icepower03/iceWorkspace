

class xUl extends xElement implements iXElementHolderEnable{

    private xh: xElementHolder;
    get asHolder(): iXElementHolder {
        return this.xh;
    }

    constructor(options?: OptionsHtml)
    {
        super("ul", options);
        this.xh = new xElementHolder(this);}
}