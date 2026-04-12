
import { xElement, xElementHolder } from '../../xElement';
import { OptionsHtml, iXElementHolderEnable } from '../xBase';
import { xLString } from '../xLString';
import { cacherxElements, afficherxElements, viderxElements } from '../../xStaticFunctions';

export interface OptionsDiv extends OptionsHtml {

    textVariable?: string;
    textLocalise?: string;
    title?: string;
    
  
}



export class xDiv extends xElement implements iXElementHolderEnable {
    
    private xh!: xElementHolder;

  /*  public get y(): HTMLDivElement {
        return <HTMLDivElement>super.y();
    }*/

    get asHolder(): xElementHolder {
        if (this.xh == null) {
            this.xh = new xElementHolder(this);
        }
        return this.xh;
    }
 
    constructor(options?: OptionsDiv, out?: { content: any }) {
        let forceElement: HTMLDivElement | undefined = options?.privateForceElement;
        let texteFinal: string | undefined = undefined;

        if (options != undefined) {
            if (options.textVariable != undefined) {
                texteFinal = options.textVariable;
            }
            if (options.textLocalise != undefined) {
                texteFinal = new xLString(options.textLocalise).text;
            }
            delete options.textLocalise;
            delete options.textVariable;
        }

        super("div", options as any);
        if (texteFinal !== undefined) {
            this.y.innerHTML = texteFinal;
        }

        if (options != undefined && options.title != undefined) {
            this.y.title = options.title;
        }

        if (out != null) out.content = this;

    }

    public static FromDom(elem: HTMLDivElement):xDiv {
        let retour = new xDiv({ privateForceElement: elem });


        return retour;
    }

    public setTitle(newTitle: string) {
        let myThis: xDiv = this;

        myThis.y.title = newTitle;

    }

    public hideDiv(collapse?: boolean): xDiv {
        let myThis: xDiv = this;
        cacherxElements(myThis, collapse != undefined ? collapse : true);
        return myThis;
    }
    public cacher(collapse?: boolean): xDiv {
        let myThis: xDiv = this;
        cacherxElements(myThis, collapse != undefined ? collapse : true);
        return myThis;
    }
    public showDiv(): xDiv {
        let myThis: xDiv = this;
        afficherxElements(myThis);
        return myThis;
    }

    public afficher(): xDiv {
        let myThis: xDiv = this;
        afficherxElements(myThis);
        return myThis;
    }

    public vider(): xDiv {

        let myThis: xDiv = this;
        viderxElements(myThis);
        return myThis;
    }

    public width(parame?: string | number): void | number {
        let myThis: xDiv = this;
        if (parame != undefined) {
            myThis.y.style.width = typeof parame === 'number' ? parame + 'px' : parame;
        } else {
            return myThis.y.offsetWidth;
        }
    }
    public contentsWidth(): number {
        return this.y.scrollWidth;
    }
    public contentsHeight(): number {
        return this.y.scrollHeight;
    }
    public height(parame?: string | number): void | number {
        let myThis: xDiv = this;
        if (parame != undefined) {
            myThis.y.style.height = typeof parame === 'number' ? parame + 'px' : parame;
        } else {
            return myThis.y.offsetHeight;
        }
    }
}