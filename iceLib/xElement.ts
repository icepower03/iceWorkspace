
import { iXElement, iXElementHolder, OptionsHtml, xClass } from './V2/xBase';
import { cacherxElements, afficherxElements, viderxElements } from './xStaticFunctions';
import { setCouleurFondAvecContrasteTexteAuto } from './V2/xDomUtils';

export class xElementHolder implements iXElementHolder {
    //private e: JQuery;
    private _y: HTMLElement;


    constructor(elem: iXElement) {
        this._y = <HTMLElement>elem.y;

        


    } 

    cacher(collapse?: boolean): xElementHolder {
        let myThis: xElementHolder = this;
        cacherxElements(xElementHolder.fromHtmlElement(myThis.y), collapse);
        return myThis;
    }

    /* get x(): xQuery {
         return $(this.y);
     }*/

    get y(): HTMLElement {
        return this._y;

    }

    afficher(): xElementHolder {
        let myThis: xElementHolder = this;
        afficherxElements(xElementHolder.fromHtmlElement(myThis.y));
        return myThis;
    }

    appendMany(ajouts: iXElement[]): xElementHolder {
        ajouts.forEach((item: iXElement) => { this.append(item); });

        return this;
    }
    append(ajout: iXElement): xElementHolder {

        this.y?.append(ajout?.y);
        return this;
    }

    empty(): xElementHolder {

        return this.vider();
    }
    vider(): xElementHolder {
        if (this.y != null) {
            while (this.y.hasChildNodes()) {
                this.y.removeChild(this.y.lastChild);
            }
        }

        return this;
    }
    addClass(s: string): xElementHolder {
        this.y.className = this.y.className + ' ' + s;
        /*        s.split(' ').forEach(c => {
                    if (!this.y.classList.contains(c)&& c!=null &&c.length>0 )
                    { this.y.classList.add(c); }
                    
                })*/
        return this;
    }
    hasClass(s: string): boolean {
        return this.y.classList.contains(s);
    }

    setAttribute(nom: string, valeur: string) {
        let myThis: xElementHolder = this;
        myThis.y.setAttribute(nom, valeur);
    }
    getAttribute(nom: string): string {
        let myThis: xElementHolder = this;
        return myThis.y.getAttribute(nom);
    }
    /*
    css(prop: string, val?: string): xElementHolder | string {
        if (val == undefined) {
            return this.ye.style.getPropertyValue(prop);
        }
        else {
            this.ye.style.setProperty(prop, val);
            return this;
        }


    }*/

    toggleClass(s: string, force?: boolean): xElementHolder {

        s.split(' ').forEach(c => {
            this.y.classList.toggle(c, force);

        })
        return this;

    }

    removeClass(s: string): xElementHolder {
        s.split(' ').forEach(c => {
            this.y.classList.remove(c);

        })
        return this;
    }



    public static fromHtmlElement(h: HTMLElement): iXElementHolder {
        return new xElementHolder({ y: h });
    }
    public static fromSVGElement(h: SVGElement): iXElementHolder {
        return new xElementHolder({ y: h });
    }

}
export class xElement implements iXElement {
    //  private jq: xQuery;
    private elem: HTMLElement;



    public get y(): HTMLElement {
        let myThis: xElement = this;
        return myThis.elem;
    }

    public width(parame?: string | number): void | number {
        let myThis: xElement = this;
        if (parame != undefined) {
            $(myThis.y).width(parame);
        }
        else {
            return $(myThis.y).width();
        }
    }

    public height(parame?: string | number): void | number {
        let myThis: xElement = this;
        if (parame != undefined) {
            $(myThis.y).height(parame);
        }
        else {
            return $(myThis.y).height();
        }
    }

    public hasClass(c: string): boolean {
        let myThis: xElement = this;
        return myThis.elem.classList.contains(c);

    }
    public addClass(c: string): xElement {
        let myThis: xElement = this;
        if (!myThis.hasClass(c)) {
            myThis.elem.className += ' ' + c;
        }
        return myThis;
    }
    public cacher(collapse?: boolean) {
        let myThis: xElement = this;
        cacherxElements(myThis, collapse);
    }
    public afficher() {
        let myThis: xElement = this;
        afficherxElements(myThis);
    }

    static setCouleurFondAvecContrasteTexteAuto(element: iXElement, couleurFondADefinir: string) {
        setCouleurFondAvecContrasteTexteAuto(element, couleurFondADefinir);
    }
    public removeClass(c: string): xElement {
        let myThis: xElement = this;
        c.split(' ').forEach(s => { if (s != "") myThis.elem.classList.remove(s); });
        return myThis;
    }
    public toggleClass(classe: string, etatPlie?: boolean) {
        let myThis: xElement = this;
        classe.split(' ').forEach(s => { if (s != "") myThis.elem.classList.toggle(s, etatPlie); });
        return myThis;
    }

    private static isChildOf(enfant: HTMLElement, parent: HTMLElement) {

        let elem = enfant;
        while (elem.parentElement != null) {
            if (elem.parentElement == parent) {
                return true;
            }
            elem = elem.parentElement;
        }

        return false;
    }

    private _dropActive: boolean = false;

    constructor(typeElementBase: 'input' | 'span' | 'div' | 'br' | 'canvas' | 'textarea' | 'table' | 'iframe' | 'select' | 'option' | 'ul' | 'li' | 'a' | 'img' | 'audio' | 'style', options: OptionsHtml) {
        let myThis: xElement = this;
        let dropActionHtml: 'move' | 'copy' | 'link' = 'move';
        if (options?.drag?.dropAction != undefined) {
            switch (options.drag.dropAction) {
                case "copie": dropActionHtml = 'copy'; break;
                case "lien": dropActionHtml = 'link'; break;
                case "deplacement": dropActionHtml = 'move'; break;
            }
        }
        // typeElementBase = typeElementBase.replace('<', '').replace('>', '').replace('/', '').replace(' ', '');
        let _clickFunction: (m: MouseEvent) => void;
        // let _data: any;
        if (options?.privateForceElement != null) {
            myThis.elem = options.privateForceElement;
        }
        else {
            myThis.elem = document.createElement(typeElementBase);
        }

        if (options != undefined) {

            if (options.id != undefined) {
                myThis.elem.id = options.id;
            }


            if (options.click != undefined) {
                _clickFunction = options.click;
                delete options.click;
                myThis.elem.addEventListener('click', (evt) => { _clickFunction(evt); })
            }
            if (options.class != null && options.class != undefined) {
                myThis.addClass(options.class);
            }

            if (options.idTest != undefined) {
                myThis.elem.setAttribute('data-id-test', options.idTest);

            }

            if (options.autocomplete) {
                myThis.elem.setAttribute('autocomplete', options.autocomplete);

            }

            //pas affectation direct pour éviter de polluer la dom avec draggable=false sur tous les éléments
            if (options?.drag?.dragKey) { myThis.elem.draggable = true; }

            if (options?.drag?.dragKey != null && options?.drag?.dragKey != undefined)
            { myThis.elem.addEventListener('dragstart', (ev) => {  ev.dataTransfer.setData('text', options.drag.dragKey()); });}

            if (options?.drag?.drop != null && options?.drag?.drop != undefined) {
                myThis.elem.addEventListener('drop', (e) => {
                   
                    console.log('drop');
                    options.drag.drop(e.dataTransfer.getData('text'));
                    myThis.removeClass('isCibleDrop');
                });
                
                myThis.elem.addEventListener('dragenter', (e) => {
                    console.log('dragenter');
                    if (!myThis._dropActive) {
                        myThis.addClass('isCibleDrop');
                        myThis._dropActive = true;
                      
                    }
                 //   myThis.addClass('isCibleDrop');
                    // est ce l'element target est un enfant de currentTarget'
                    //if (e.target == e.currentTarget || xElement.isChildOf(<HTMLElement>e.currentTarget, <HTMLElement>e.target)) {
                    //    console.log('dragenter current');
                    //    myThis.addClass('isCibleDrop');
                    //    e.stopImmediatePropagation();
                    //}
                    //else {
                    //    console.log('dragenter not current');
                    //}
                });
                myThis.elem.addEventListener('dragleave', (e) => {
                    myThis.removeClass('isCibleDrop');
                    myThis._dropActive = false;
                    console.log('dragleave');
                    //if (e.target == e.currentTarget) {
                    //    console.log('dragleave current');
                    ////    myThis.removeClass('isCibleDrop');
                    //    e.stopImmediatePropagation();
                    //}
                    //else {
                    //    console.log('dragleave not current');
                    //    }
                   
                   
                  
                });
                myThis.elem.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = dropActionHtml;
                    console.log('dragover');
                    if (!myThis._dropActive) {
                        myThis.addClass('isCibleDrop');
                        myThis._dropActive = true;
                    }

                    
                });
                myThis.elem.addEventListener('dragend', (e) => {
                    console.log('dragend');
                    myThis.removeClass('isCibleDrop');
                   
                });
            }


            myThis.addClass(xClass.Theme).addClass(xClass.ThemeLuminosite);
        }

    }
}

