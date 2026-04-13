// @ts-nocheck
import { iXElement } from '../iceBase';
import { iceDiv } from './iceDiv';

interface Optionsice2DockPanel {
    id?: string;
    centrerDernier?: boolean;
    class?: string;
}

export enum DockPosition { haut, bas, gauche, droite }
export class ice2DockPanelDeprecated implements iXElement {
    
    private divPrincipal: iceDiv;
    private lastElement: iceDiv;
    private centrerDernier: boolean;

    constructor(o: Optionsice2DockPanel) {
        if (o.class == undefined)
        { o.class = ""; }

        this.divPrincipal = new iceDiv({ class: "ice2DockPanelPrincipal " + o.class, id: o.id });
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

    private ajouterElement(dernier: boolean, element: iXElement, pos: DockPosition, addClass?: string, addParentClass?: string): ice2DockPanelDeprecated {
        let c: iceDiv;
        let d: iceDiv;

        if (addClass == undefined)
        { addClass = ''; }
        let classeNouveauDiv: string;
        classeNouveauDiv = "ice2DockPanel  Direction_" + DockPosition[pos];

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
        { classeNouveauDiv = classeNouveauDiv + " ice2DockPanelDernierItem"; }

        c = new iceDiv({ class: classeNouveauDiv });
        this.lastElement.removeClass("ice2DockPanelDernierItem");
        this.lastElement.asHolder.append(c);

        d = new iceDiv({ class: "ice2DockPanelItem" + ' ' + addClass });

        c.asHolder.append(d);

        d.asHolder.append(element);
        this.lastElement = c;

        return this;
    }

    private ajouter(element: iXElement, pos: DockPosition, addClass?: string, addParentClass?: string): ice2DockPanelDeprecated {
        this.ajouterElement(this.centrerDernier, element, pos, addClass, addParentClass);
        return this;
    }

    public append(element: iXElement, pos: DockPosition, addClass?: string, addParentClass?: string): ice2DockPanelDeprecated {
        return this.ajouter(element, pos, addClass, addParentClass);
    }

    public ajouterDernier(element: iXElement, pos: DockPosition, addClass?: string, addParentClass?: string): ice2DockPanelDeprecated {
        this.ajouterElement(true, element, pos, addClass, addParentClass);
        return this;
    }

    public effacer(): ice2DockPanelDeprecated
    {
        this.divPrincipal.vider();
        this.lastElement = this.divPrincipal;
        return this;
    }
}