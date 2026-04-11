
import { iXElement, optionsAffichage, Container } from '../xBase';
import { xDiv } from './xDiv';
import { xStyle } from './xStyle';

enum enumAlignementVerticalWrapPanel { haut, centre, bas }
enum enumAlignementHorizontalWrapPanel { Gauche, Centre, Droite }


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
class xxWrapPanel implements iXElement {
    public toggleClass(c: string, force: boolean) {
        return this.elemPrincipal.toggleClass(c, force);
    }
    private elemPrincipal: xDiv;
    private espaceMinimaliste: boolean;
    private itemsLargeurEgale: boolean;
    private conteneurDitems: Container<xDiv>;
    private alignementVertical: enumAlignementVerticalWrapPanel;
    private alignementHorizontal: enumAlignementHorizontalWrapPanel;
    private gap: string;
    public width(parame?: string | number): void | number {
        let myThis: xxWrapPanel = this;
        return myThis.elemPrincipal.width(parame);
    }

    public height(parame?: string | number): void | number {
        let myThis: xxWrapPanel = this;
        return myThis.elemPrincipal.height(parame);
    }
    public append(element: iXElement, addClass?: string, optionsAffichage?: optionsAffichage): xxWrapPanel {
        let newDiv: xDiv;

        let classeWrapItem = "xxWrapPanelItem";
        if (addClass != undefined) { classeWrapItem += " " + addClass; }

        newDiv = new xDiv({ class: classeWrapItem });



        if (optionsAffichage != undefined) {

            xStyle.AppliquerOptionsAffichage(newDiv, optionsAffichage);
        }

        this.conteneurDitems.content.asHolder.append(newDiv);
        newDiv.asHolder.append(element);
        return this;

    }

    constructor(o: OptionsWrapPanel) {
        let myThis: xxWrapPanel = this;
        myThis.conteneurDitems = new Container<xDiv>();
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

        myThis.elemPrincipal = new xDiv({
            id: o.id,
            class: "xxWrapPanelMaster " + o.class + myThis.getClasseMinimaliste() + myThis.getClasseItemsLargeurEgale(),
            drag:o.drag
        });
        if (o.class != "") {
            myThis.elemPrincipal.asHolder.xdiv({ class: "xxWrapPanel " + "WP" + o.class }, myThis.conteneurDitems);
        }
        else {
            myThis.elemPrincipal.asHolder.xdiv({ class: "xxWrapPanel " }, myThis.conteneurDitems);
        }
        if (o.initContent != undefined) {
            o.initContent.forEach(function (j: iXElement) {
                myThis.append(j);
            }
            );

        }

        if (o.optionsAffichage != undefined) {

            xStyle.AppliquerOptionsAffichage(myThis.elemPrincipal, o.optionsAffichage);
        }

        if (myThis.gap && myThis.gap != "")
            myThis.elemPrincipal.y.style.gap = myThis.gap;

        /*     if (o?.drag?.drop != null && o?.drag?.drop != undefined) {
                 myThis.elemPrincipal.y.addEventListener('drop', (e) => { o.drag.drop(e); })
                
             }
             */
    }


    public get y() { return this.elemPrincipal.y; }

    public cacher(collapse?: boolean): xxWrapPanel {
        let myThis: xxWrapPanel = this;
        cacherxElements(myThis, collapse);
        return myThis;
    }


    public afficher(): xxWrapPanel {
        let myThis: xxWrapPanel = this;
        afficherxElements(myThis);
        return myThis;
    }

    public vider(): xxWrapPanel {
        let myThis: xxWrapPanel = this;
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
        let myThis: xxWrapPanel = this;
        myThis.elemPrincipal.addClass(c);
    }


    public removeClass(c: string) {
        let myThis: xxWrapPanel = this;
        myThis.elemPrincipal.removeClass(c);

    }
}