// @ts-nocheck
import { iXElement, iXElementHolder, iXElementHolderEnable, optionsAffichage, enumVisibility, Container, enumPosition } from '../iceBase';
import { BindableObject } from './BindableObject';
import { affichericeElements, cachericeElements } from '../../iceStaticFunctions';
import { iceDiv } from './iceDiv';
import { iceStyle } from './iceStyle';
import { ice2Label, enumTypeLabel, enumHabillageLabel, optionsAffichageLabel } from './ice2Label';
﻿export enum enumPositionDuContenu { haut, bas, gauche, droite }
export enum enumJustificationDuContenu { debut, centre, fin }

interface optionsAffichageLabelContainer extends optionsAffichageLabel
{
    positionDuContenu?: enumPositionDuContenu;
    justificationDuContenu?: enumJustificationDuContenu;
    largeurMaximum?: string;
}

interface OptionsLabelContainer
{
    id?: string;
    class?: string;
    textVariable?: string;
    textLocalise?: string;
    titleVariable?: string;
    titleLocalise?: string;
    initContent?: iXElement;
    type?: enumTypeLabel;
    habillage?: enumHabillageLabel;
    lien?: OptionsHref;
    lineBreak?: boolean;
    taillePolice?: number;
    labelLargeurLibre?: boolean; //Utile en mode orientation horizontale. A true, la largeur du label n'est plus fixée à 120px.
    binding?: {
        value?: BindableObject<string | number>;
        visibility?: BindableObject<enumVisibility>;
    }
    optionsAffichage?: optionsAffichageLabelContainer;
    gap?: number;
    drag?: { drop?: (ev: DragEvent) => void; }
}

export class ice2LabelContainer implements iXElement, iXElementHolderEnable {

    private elementPrincipal: iceDiv;
    private conteneurDuContenu: iceDiv;
    private monLabel: ice2Label;

    get asHolder(): iXElementHolder {
        return this.elementPrincipal.asHolder;
    }

  
    public addClass(s: string) {
        return this.elementPrincipal.addClass(s);
    }
         public removeClass(s: string) {
        return this.elementPrincipal.removeClass(s);
    }
    get y() { return this.elementPrincipal.y; }

    constructor(o: OptionsLabelContainer) {
        let myThis: ice2LabelContainer = this;

        if (o.class == undefined) { o.class = ""; }

        if (o.habillage == undefined) { o.habillage = enumHabillageLabel.standard; }
        o.class += " habillageLabel_" + enumHabillageLabel[o.habillage];

        let cl: Container<ice2Label> = new Container<ice2Label>();
        this.elementPrincipal = new iceDiv({ id: o.id, class: "ice2LabelContainer " + o.class });



        let label: OptionsLabel = {
            textLocalise: o.textLocalise, textVariable: o.textVariable,
            titleLocalise: o.titleLocalise,
            titleVariable: o.titleVariable,
            lineBreak: o.lineBreak,
            class: "ice2LabelContainerTitre",
            type: o.type,
            taillePolice: o.taillePolice,
            lien: o.lien,
            optionsAffichage: { largeurMaximum: o.optionsAffichage?.largeurMaximum ? o.optionsAffichage.largeurMaximum : null }
        };


        if (o.binding != undefined) {
            if (o.binding.value != undefined) {
                label = {
                    textLocalise: o.textLocalise,
                    textVariable: o.textVariable,
                    lineBreak: o.lineBreak,
                    titleLocalise: o.titleLocalise,
                    titleVariable: o.titleVariable,
                    class: "ice2LabelContainerTitre",
                    type: o.type, binding: { value: o.binding.value }, taillePolice: o.taillePolice, lien: o.lien
                };
            }

            if (o.binding.visibility != undefined) {
                if (o.binding.visibility.Value != undefined) {
                    switch (o.binding.visibility.Value) {
                        case enumVisibility.afficher:
                            affichericeElements(this.elementPrincipal);
                            break;
                        case enumVisibility.masquer:
                            cachericeElements(this.elementPrincipal, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cachericeElements(this.elementPrincipal, true);
                            break;
                    }
                }
                o.binding.visibility.bind((s) => {

                    switch (s) {
                        case enumVisibility.afficher:
                            affichericeElements(this.elementPrincipal);
                            break;
                        case enumVisibility.masquer:
                            cachericeElements(this.elementPrincipal, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cachericeElements(this.elementPrincipal, true);
                            break;
                    }
                })
            }
        }
        // this.elementPrincipal.asHolder.ice2Label({ textLocalise: o.textLocalise, textVariable: o.textVariable, lineBreak: o.lineBreak, class: "ice2LabelContainerTitre " + classeOrientation, type: o.type }, cl);
        //!!o.OptionAffichage?.PostionContenu && (blabla)

        if (o.optionsAffichage?.positionDuContenu == enumPositionDuContenu.haut || o.optionsAffichage?.positionDuContenu == enumPositionDuContenu.gauche)
        { 
            if (o.initContent != undefined) {
                this.append(o.initContent);
            }
            this.elementPrincipal.asHolder.ice2Label(label, cl);
        }
        else {
            this.elementPrincipal.asHolder.ice2Label(label, cl);
            if (o.initContent != undefined) {
                this.append(o.initContent);
            }
        }



        this.monLabel = cl.content;

        if (o.labelLargeurLibre)
            this.elementPrincipal.addClass("largeurLibre");


        if (o.habillage == undefined) { o.habillage = enumHabillageLabel.standard; }
        this.elementPrincipal.y.classList.add("habillageLabel_" + enumHabillageLabel[o.habillage]);

        if (o.gap != undefined)
            this.elementPrincipal.y.style.gap = o.gap + "px";

        if (o.binding != undefined) {
            if (o.binding.value != undefined) {

            }
        }

        this.elementPrincipal.y.classList.add("positionDuContenu_droite");
        this.elementPrincipal.y.classList.add("justificationDuContenu_centre");

        if (o.optionsAffichage != undefined) {
            iceStyle.AppliquerOptionsAffichage(myThis.elementPrincipal, o.optionsAffichage);

            if (!!o.optionsAffichage.couleurTexte)
                this.elementPrincipal.y.classList.add("couleurTexte_" + o.optionsAffichage.couleurTexte);

            // Positionnement avec optionsAffichage
            if (o.optionsAffichage.positionDuContenu != undefined) {
                this.elementPrincipal.y.classList.remove("positionDuContenu_droite");
                this.elementPrincipal.y.classList.add("positionDuContenu_" + enumPositionDuContenu[o.optionsAffichage.positionDuContenu].valueOf());
            }

            // centrer le contenu en cas de contenu en haut ou en bas
            if (o.optionsAffichage.positionDuContenu == enumPositionDuContenu.haut || o.optionsAffichage.positionDuContenu == enumPositionDuContenu.bas) {
                this.elementPrincipal.y.classList.remove("justificationDuContenu_centre");
                this.elementPrincipal.y.classList.add("justificationDuContenu_debut");
            }

            // Justification avec optionsAffichage
            if (o.optionsAffichage.justificationDuContenu != undefined)
            {
                this.elementPrincipal.y.classList.remove("justificationDuContenu_centre");
                this.elementPrincipal.y.classList.add("justificationDuContenu_" + enumJustificationDuContenu[o.optionsAffichage.justificationDuContenu].valueOf());
            }
        }

            

        if (o?.drag?.drop != null && o?.drag?.drop != undefined) {
            myThis.elementPrincipal.y.addEventListener('drop', (e) => { o.drag.drop(e); })
          
        }
    }
    

    public setSurbrillance(s: string) {
        let myThis: ice2LabelContainer = this;
        myThis.monLabel.setSurbrillance(s);
    }

    public setSurbrillanceBinding(s: BindableObject<string>) {
        let myThis: ice2LabelContainer = this;
        myThis.monLabel.setSurbrillanceBinding(s);
    }

    public append(element: iXElement): ice2LabelContainer {
        //on ne peut ajouter qu'une seule fois'
        if (this.conteneurDuContenu == undefined) {
            this.conteneurDuContenu = new iceDiv({ class: "ice2LabelContainerItem" });
            this.conteneurDuContenu.asHolder.append(element);
            this.elementPrincipal.asHolder.append(this.conteneurDuContenu);
        }
        else {
            console.log("un ice2LabelContainer ne peut héberger qu'un seul élément.");
        }
        return this;

    }

    public vider() {
        if (this.conteneurDuContenu != undefined) {
            this.conteneurDuContenu.y.remove();
            this.conteneurDuContenu = undefined;
        }
    }

    public setTypeLabel(type: enumTypeLabel)
    {
        let myThis: ice2LabelContainer = this;
        myThis.monLabel.setTypeLabel(type);
    }


    public cacher(collapse?: boolean)
    {
        let myThis: ice2LabelContainer = this;
        myThis.elementPrincipal.cacher(collapse);
    }

    public afficher()
    {
        let myThis: ice2LabelContainer = this;
        myThis.elementPrincipal.afficher();
    }


    public changerTextLocalise(s: string) {
        this.monLabel.changerTextLocalise(s);
    }
    public changerTextVariable(s: string) { this.monLabel.changerTextVariable(s); }
}