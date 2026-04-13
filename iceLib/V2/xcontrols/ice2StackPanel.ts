// @ts-nocheck
import { iXElement, iXElementHolder, iXElementHolderEnable, optionsAffichage, iTestable, Container } from '../iceBase';
import { affichericeElements, cachericeElements } from '../../iceStaticFunctions';
import { iceDiv } from './iceDiv';
import { iceStyle } from './iceStyle';
﻿interface OptionsStackPanel extends iTestable {
    id?: string;
    class?: string;
    initContent?: iXElement[];
    espaceMinimaliste?: boolean;
    gap?: number;
    optionsAffichage?: optionsAffichage;
    drag?: {
        drop?: (key: string) => void;
        dropAction?: 'copie' | 'deplacement' | 'lien';
    }
}

export class ice2StackPanel implements iXElement {
    private elemPrincipal: iceDiv;

    private espaceMinimaliste: boolean;
    private conteneurDitems: Container<iceDiv>;
    private gap: string;
    public toggleClass(c: string, force: boolean) {
        return this.elemPrincipal.toggleClass(c, force);
    }
    public append(element: iXElement, addClass?: string, optionsAffichage?: optionsAffichage): ice2StackPanel {
        if (element != null) {
            let classStackPanelItem = "ice2StackPanelItem"
            if (addClass != undefined) { classStackPanelItem += " " + addClass }
            let newDiv = new iceDiv({ class: classStackPanelItem });

            if (optionsAffichage != undefined) {

                iceStyle.AppliquerOptionsAffichage(newDiv, optionsAffichage);
            }




            this.conteneurDitems.content.asHolder.append(newDiv);
            newDiv.asHolder.append(element);
        }
        return this;
    }
    public appendMany(elements: iXElement[]): ice2StackPanel {
        let myThis: ice2StackPanel = this;
        elements.forEach((elem) => { myThis.append(elem); });
        return myThis;
    }



    constructor(o: OptionsStackPanel) {
        let myThis: ice2StackPanel = this;
        this.conteneurDitems = new Container<iceDiv>();
        if (o.class == undefined) { o.class = ""; }

        this.elemPrincipal = new iceDiv({ id: o.id, class: "ice2StackPanelMaster " + o.class,drag: o?.drag, idTest: o.idTest });
        if (o.class != "") {
            this.elemPrincipal.asHolder.xdiv({ class: "ice2StackPanel " + "SP" + o.class }, this.conteneurDitems);
        }
        else {
            this.elemPrincipal.asHolder.xdiv({ class: "ice2StackPanel " }, this.conteneurDitems);
        }
        if (o.initContent != undefined) {
            o.initContent.forEach(function (j: iXElement) {
                myThis.append(j);
            }
            );

        }
        myThis.espaceMinimaliste = o.espaceMinimaliste;
        if (myThis.espaceMinimaliste == undefined) {
            myThis.espaceMinimaliste = false;
        }

        if (o.optionsAffichage != undefined) {

            iceStyle.AppliquerOptionsAffichage(myThis.elemPrincipal, o.optionsAffichage);
        }

        if (o.gap != undefined)
            myThis.gap = o.gap + "px";



        if (myThis.gap && myThis.gap != "")
            myThis.elemPrincipal.y.style.gap = myThis.gap;
        
    }

    public width(parame?: string | number): void | number {
        let myThis: ice2StackPanel = this;
        return myThis.elemPrincipal.width(parame);
    }

    public height(parame?: string | number): void | number {
        let myThis: ice2StackPanel = this;
        return myThis.elemPrincipal.height(parame);
    }
    public get y() { return this.elemPrincipal.y; }

    public cacher(collapse?: boolean): ice2StackPanel {
        let myThis: ice2StackPanel = this;
        cachericeElements(myThis, collapse);
        return myThis;
    }


    public afficher(): ice2StackPanel {
        let myThis: ice2StackPanel = this;
        affichericeElements(myThis);
        return myThis;
    }
    public vider() {
        let myThis: ice2StackPanel = this;
        myThis.empty();
    }
    public empty(): ice2StackPanel {
        let myThis: ice2StackPanel = this;
        myThis.conteneurDitems.content.asHolder.empty();
        return myThis;
    }

    public getClasseMinimaliste(): string {
        if (this.espaceMinimaliste) { return "espaceMinimaliste"; }
        else { return ""; }
    }

    public addClass(c: string) {
        let myThis: ice2StackPanel = this;
        myThis.elemPrincipal.addClass(c);
    }


    public removeClass(c: string) {
        let myThis: ice2StackPanel = this;
        myThis.elemPrincipal.removeClass(c);

    }
}