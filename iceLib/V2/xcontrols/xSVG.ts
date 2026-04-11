import { tailleIcone } from '../xIcones';

export enum enumSVGTaille
{
    xxs,
    xs,
    s,
    m,
    l,
    custom
}

export enum enumSVGOrientation {
    Left,
    Right,
    Top,
    Bottom,
    custom
}


export interface OptionsSVG {
    id?: string;
    viewBoxContains?: string;
    contains?: string;
    cssContains?: string;
    widthCustom?: number;
    heightCustom?: number; 
    class?: string;
    size?: tailleIcone;
  //  orientation?: enumSVGOrientation;
}

export class xSVG //implements iXElement 
{
   /* public get x(): xQuery {
        return this.jq;
    }*/
    public get y(): SVGElement {
        return this.svge;
    }
    private tailleSvg: tailleIcone;
    private widthCustom: number;
    private heightCustom: number;
    private class: string;
    private svge: SVGElement;
  //  private jq: JQuery;

    constructor(options: OptionsSVG) {
        let myThis: xSVG = this;

//        let stringSvg: string = "<svg ";
        myThis.svge = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        if (options.id != undefined) {
            myThis.svge.id = options.id;}
//            stringSvg += ' id="' + options.id + '"';

        myThis.tailleSvg = options.size;

        if (myThis.tailleSvg == undefined)
            myThis.tailleSvg = tailleIcone.M

        myThis.class = "xSVG";

        if (options.class != undefined)
            myThis.class += " " + options.class;

        switch (myThis.tailleSvg)
        {
            case tailleIcone.XXS:
                myThis.class += " svg_xxs";
                break;
            case tailleIcone.XS:
                myThis.class += " svg_xs";
                break;
            case tailleIcone.S:
                myThis.class += " svg_s";
                break;
            case tailleIcone.M:
                myThis.class += " svg_m";
                break;
            case tailleIcone.L:
                myThis.class += " svg_l";
                break;
            case tailleIcone.XL:
                myThis.class += " svg_xl";
                break;
            case tailleIcone.Custom:
                myThis.class += " svg_custom";
                myThis.heightCustom = options.heightCustom;
                myThis.widthCustom = options.widthCustom;
                break;
        }


        if (myThis.widthCustom != undefined) {
            
            myThis.svge.setAttribute('width', myThis.widthCustom.toString());
//            stringSvg += ' width="' + myThis.widthCustom + '"';
        }            

        if (myThis.heightCustom != undefined) {
            myThis.svge.setAttribute('height', myThis.heightCustom.toString());
        }
 
        if (myThis.class != undefined) {
            myThis.class.split(' ').forEach(s => { myThis.svge.classList.add(s); });    
        }

        if (options.viewBoxContains != undefined && options.viewBoxContains != '')
        {
            myThis.svge.setAttribute('viewBox', options.viewBoxContains);
        }


        if (options.cssContains != undefined) {
            myThis.svge.innerHTML += '<style type="text/css">' + options.cssContains + '</style>';

        }

        if (options.contains != undefined) {
            myThis.svge.innerHTML += options.contains;
        }

    }
    public getClasse(): string {
        let myThis: xSVG = this;

        return myThis.getClass();
    }

    public getClass(): string {
        let myThis: xSVG = this;

        return myThis.class;
    }
}