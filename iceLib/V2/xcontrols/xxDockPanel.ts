// @ts-nocheck
import { iXElement } from '../xBase';
import { xDiv } from './xDiv';

interface OptionsxxDockPanel {
    id?: string;
    centrerDernier?: boolean;
    class?: string;
}

export enum DockPosition { haut, bas, gauche, droite }
export class xxDockPanelDeprecated implements iXElement {
    
    private divPrincipal: xDiv;
    private lastElement: xDiv;
    private centrerDernier: boolean;

    constructor(o: OptionsxxDockPanel) {
        if (o.class == undefined)
        { o.class = ""; }

        this.divPrincipal = new xDiv({ class: "xxDockPanelPrincipal " + o.class, id: o.id });
        this.lastElement = this.divPrincipal;
        this.centrerDernier = o.centrerDernier;

        if (this.centrerDernier == undefined)
        { this.centrerDernier = true; }

    }

    public toggleClass(classe: string, etatPlie: boolean) {
        return this.divPrincipal.toggleClass(classe,etatPlie);
    }
    public addClass(s: string) {
        return this.divPrincipal.addClass(s);
    }
    public removeClass(s: string) {
        return this.divPrincipal.removeClass(s);
    }
    public get y() { return this.divPrincipal.y; }

    private ajouterElement(dernier: boolean, element: iXElement, pos: DockPosition, addClass?: string, addParentClass?: string): xxDockPanelDeprecated {
        let c: xDiv;
        let d: xDiv;

        if (addClass == undefined)
        { addClass = ''; }
        let classeNouveauDiv: string;
        classeNouveauDiv = "xxDockPanel  Direction_" + DockPosition[pos];

        //on ajoute une class sur le conteneur, soit une class spécifique est donné soit on prend la class de l'élément et on lui ajout un préfixe.
        if (addParentClass == undefined)
        {
            addParentClass = '';
        }

        if (addParentClass!= '')
        {
            classeNouveauDiv = classeNouveauDiv + " " + addParentClass;
        }
        else
        {
            if (addClass != '')
            {
                classeNouveauDiv = classeNouveauDiv + " DP_" + addClass;
            }
        }

        if (dernier)
        { classeNouveauDiv = classeNouveauDiv + " xxDockPanelDernierItem"; }

        c = new xDiv({ class: classeNouveauDiv });
        this.lastElement.removeClass("xxDockPanelDernierItem");
        this.lastElement.asHolder.append(c);

        d = new xDiv({ class: "xxDockPanelItem" + ' ' + addClass });

        c.asHolder.append(d);

        d.asHolder.append(element);
        this.lastElement = c;

        return this;
    }

    private ajouter(element: iXElement, pos: DockPosition, addClass?: string, addParentClass?: string): xxDockPanelDeprecated {
        this.ajouterElement(this.centrerDernier, element, pos, addClass, addParentClass);
        return this;
    }

    public append(element: iXElement, pos: DockPosition, addClass?: string, addParentClass?: string): xxDockPanelDeprecated {
        return this.ajouter(element, pos, addClass, addParentClass);
    }

    public ajouterDernier(element: iXElement, pos: DockPosition, addClass?: string, addParentClass?: string): xxDockPanelDeprecated {
        this.ajouterElement(true, element, pos, addClass, addParentClass);
        return this;
    }

    public effacer(): xxDockPanelDeprecated
    {
        this.divPrincipal.vider();
        this.lastElement = this.divPrincipal;
        return this;
    }
}