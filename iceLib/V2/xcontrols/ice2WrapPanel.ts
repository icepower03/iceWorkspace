
import { iXElement, optionsAffichage, Container } from '../iceBase';
import { iceDiv } from './iceDiv';
import { iceStyle } from './iceStyle';
import { cachericeElements, affichericeElements } from '../../iceStaticFunctions';

export enum enumAlignementVerticalWrapPanel { haut, centre, bas }
export enum enumAlignementHorizontalWrapPanel { Gauche, Centre, Droite }


interface OptionsWrapPanel {
    id?: string;
    class?: string;
    initContent?: iXElement[];
    retourALaLigne?: boolean;
    padding?: boolean;
    espaceMinimaliste?: boolean;
    alignementHorizontal?: enumAlignementHorizontalWrapPanel;
    itemsLargeurEgale?: boolean;
    alignementVertical?: enumAlignementVerticalWrapPanel;
    optionsAffichage?: optionsAffichage;
    gap?: number;
    pleineLargeur?: boolean;
    drag?: {

        dragKey?: () => string;
        drop?: (key: string) => void;
        dropAction?: 'deplacement' | 'copie' | 'lien';
    }
    //  drag?: { drop?: (ev: DragEvent) => void; }
}
export class ice2WrapPanel implements iXElement {
    public toggleClass(c: string, force: boolean) {
        return this.elemPrincipal.toggleClass(c, force);  
    }
    private elemPrincipal: iceDiv;
    private espaceMinimaliste: boolean;
    private itemsLargeurEgale: boolean;
    private conteneurDitems: Container<iceDiv>;
    private alignementVertical: enumAlignementVerticalWrapPanel;
    private alignementHorizontal: enumAlignementHorizontalWrapPanel;
    private gap: string;
    public width(parame?: string | number): void | number {
        let myThis: ice2WrapPanel = this;
        return myThis.elemPrincipal.width(parame);
    }

    public height(parame?: string | number): void | number {
        let myThis: ice2WrapPanel = this;
        return myThis.elemPrincipal.height(parame);
    }
    public append(element: iXElement, addClass?: string, optionsAffichage?: optionsAffichage): ice2WrapPanel {
        let newDiv: iceDiv;

        let classeWrapItem = "ice2WrapPanelItem";
        if (addClass != undefined) { classeWrapItem += " " + addClass; }

        newDiv = new iceDiv({ class: classeWrapItem });



        if (optionsAffichage != undefined) {

            iceStyle.AppliquerOptionsAffichage(newDiv, optionsAffichage);
        }

      
        this.conteneurDitems.content?.asHolder.append(newDiv);
        newDiv.asHolder.append(element);
        return this;

    } 
   
    constructor(o: OptionsWrapPanel) {
        let myThis: ice2WrapPanel = this;
        myThis.conteneurDitems = new Container<iceDiv>(); 
        if (o.class == undefined) { o.class = ""; }

        if (o.retourALaLigne != undefined && o.retourALaLigne === false)
            o.class += " no_retour";

        if (o.padding == false)
            o.class += " no_padding";

        if (o.pleineLargeur == true)
            o.class += " pleineLargeur";

        myThis.espaceMinimaliste = o.espaceMinimaliste;
        if (myThis.espaceMinimaliste == undefined) {
            myThis.espaceMinimaliste = true;
        }

        myThis.itemsLargeurEgale = o.itemsLargeurEgale;
        if (myThis.itemsLargeurEgale == undefined) {
            myThis.itemsLargeurEgale = false;
        }

        if (o.alignementVertical != undefined) {
            myThis.alignementVertical = o.alignementVertical
        } else {
            myThis.alignementVertical = enumAlignementVerticalWrapPanel.centre
        }

        if (o.alignementHorizontal != undefined)
            myThis.alignementHorizontal = o.alignementHorizontal;
        else
            myThis.alignementHorizontal = enumAlignementHorizontalWrapPanel.Gauche;

        if (o.gap != undefined)
            myThis.gap = o.gap + "px";


        o.class += " position_verticale_" + enumAlignementVerticalWrapPanel[myThis.alignementVertical]

        o.class += " alignement" + enumAlignementHorizontalWrapPanel[myThis.alignementHorizontal];

        myThis.elemPrincipal = new iceDiv({
            id: o.id,
            class: "ice2WrapPanelMaster " + o.class + myThis.getClasseMinimaliste() + myThis.getClasseItemsLargeurEgale(),
            drag:o.drag
        });
        if (o.class != "") {
            myThis.elemPrincipal.asHolder.append(new iceDiv({ class: "ice2WrapPanel " + "WP" + o.class }, myThis.conteneurDitems));
        } 
        else {
            myThis.elemPrincipal.asHolder.append(new iceDiv({ class: "ice2WrapPanel " }, myThis.conteneurDitems));
        }
        if (o.initContent != undefined) {
            o.initContent.forEach(function (j: iXElement) {
                myThis.append(j);
            }
            );

        }

        if (o.optionsAffichage != undefined) {

            iceStyle.AppliquerOptionsAffichage(myThis.elemPrincipal, o.optionsAffichage);
        }

        if (myThis.gap && myThis.gap != "")
            myThis.elemPrincipal.y.style.gap = myThis.gap;

        /*     if (o?.drag?.drop != null && o?.drag?.drop != undefined) {
                 myThis.elemPrincipal.y.addEventListener('drop', (e) => { o.drag.drop(e); })
                
             }
             */
    }


    public get y() { return this.elemPrincipal.y; }

    public cacher(collapse?: boolean): ice2WrapPanel {
        let myThis: ice2WrapPanel = this;
        cachericeElements(myThis, collapse);
        return myThis;
    }


    public afficher(): ice2WrapPanel {
        let myThis: ice2WrapPanel = this;
        affichericeElements(myThis);
        return myThis;
    }

    public vider(): ice2WrapPanel {
        let myThis: ice2WrapPanel = this;
        myThis.conteneurDitems.content.asHolder.empty();
        return myThis;
    }


    public getClasseMinimaliste(): string {
        if (this.espaceMinimaliste) { return " espaceMinimaliste"; }
        else { return ""; }
    }

    public getClasseItemsLargeurEgale(): string {
        if (this.itemsLargeurEgale) { return " itemsLargeurEgale"; }
        else { return ""; }
    }

    public addClass(c: string) {
        let myThis: ice2WrapPanel = this;
        myThis.elemPrincipal.addClass(c);
    }


    public removeClass(c: string) {
        let myThis: ice2WrapPanel = this;
        myThis.elemPrincipal.removeClass(c);

    }
}