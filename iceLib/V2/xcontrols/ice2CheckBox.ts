// @ts-nocheck
import { iXElement, iXElementHolder, OptionsHtml, enumVisibility, Container, enumPosition } from '../iceBase';
import { BindableObject } from './BindableObject';
import { affichericeElements, cachericeElements } from '../../iceStaticFunctions';
import { iceDiv } from './iceDiv';
import { iceStyle } from './iceStyle';
import { ice2Bouton, optionsAffichageBouton, enumTailleBouton, enumTypeBouton } from './ice2Bouton';
import { ice2LabelContainer, enumPositionDuContenu } from './ice2LabelContainer';
import { iceIconeAvecAction } from './iceIconeAvecAction';
import { Icone, IconeExterne } from '../iceIcones';
import { iceInputCheckBox } from './iceInputCheckBox';
import { ice2ContainerEvent } from './ice2ContainerEvent';
﻿export enum enumTypeCheckbox {
    standard,
    slide,
    texte,
    image,
    ice2Bouton
}

interface OptionsInputCheckBoxStandard extends OptionsHtml {
    value?: boolean;
    CanValueChange?: (val: boolean) => boolean;
    ValueChange?: (val: boolean) => void;
    inactif?: boolean;
    titleVariable?: string;
    titleLocalise?: string;
    canbePartiel?: boolean;
    WithChangeValueWhenNull?: boolean;
    typeCheckbox?: enumTypeCheckbox.standard;
    withLabelContainer?: boolean;
    optionsLabelContainer?: {
        inverserLabelDOM?: boolean;
    };
    AffichageBoutonWapper2?: optionsAffichageBouton;
    renderIntermediaire?: () => iXElement;
    textLocalise?: string;
    textVariable?: string;
    imageEnable?: Icone;
    imageDisable?: Icone;
    IconeBoutonWapper2?: Icone | iceIconeAvecAction;
    binding?: {
        value?: BindableObject<boolean>;
        visibility?: BindableObject<enumVisibility>;
    }
    espaceMinimaliste?: boolean;
}

interface OptionsInputCheckBoxAvecPartiel extends OptionsHtml {
    value?: boolean;
    CanValueChange?: (val: boolean) => boolean;
    ValueChange?: (val: boolean) => void;
    inactif?: boolean;
    titleVariable?: string;
    titleLocalise?: string;
    canbePartiel?: boolean;
    WithChangeValueWhenNull?: boolean;
    typeCheckbox?: enumTypeCheckbox;
    withLabelContainer?: boolean;
    optionsLabelContainer?: {
        inverserLabelDOM?: boolean;
    };
    AffichageBoutonWapper2?: optionsAffichageBouton;
    renderIntermediaire?: () => iXElement;
    imageEnable?: Icone;
    imageDisable?: Icone;
    IconeBoutonWapper2?: Icone | iceIconeAvecAction;
    textLocalise?: string;
    textVariable?: string;
    binding?: {
        value?: BindableObject<boolean>;
        visibility?: BindableObject<enumVisibility>;
    }
    espaceMinimaliste?: boolean;
}

type OptionsInputCheckBox = OptionsInputCheckBoxStandard | OptionsInputCheckBoxAvecPartiel;


export class ice2CheckBox implements iXElement {

    // --------- //
    // Attributs //
    // --------- //
    // --- contener --- //
    private element: iceDiv;
    private divIcone: Container<iceDiv> = new Container<iceDiv>();
    private cont: Container<iceDiv> = new Container<iceDiv>();
    private btnTexte: ice2Bouton;
    private labelContainer: ice2LabelContainer;

    // --- data --- //
    private inactif: boolean;
    private isInit: boolean;
    private options: OptionsInputCheckBox;
    private ValueChange: (val: boolean) => void;
    private _id: string;

    private binding: BindableObject<boolean>;
    private Value: boolean

    private CanValueChange: (val: boolean) => boolean;
    private canBePartiel: boolean = true;
    private WithChangeValueWhenNull: boolean = false;
    private isPartiel: boolean;
    private iscoche: boolean;

    private inverserLabelDom: boolean = true;

    private btnModeBtn: ice2Bouton;

    private renderIntermediaire: ()=> iXElement = ()=>
    {
        // Si besoin: ajouter les conditions sur l'enumTypeCheckbox
        return new iceDiv({ class: "ice2CheckboxIcone partiel" });
    }

    // ----------- //
    // Methode Get //
    // ----------- //
   
    public get y()
    {
        let myThis: ice2CheckBox = this;
        if (myThis.labelContainer != null)
            return myThis.labelContainer.y;
        return myThis.element.y;
    }

    public get value(): boolean
    {
        let myThis: ice2CheckBox = this;
        return myThis.Value;
    }

    public get getId(): string
    {
        let myThis: ice2CheckBox = this;

        return myThis._id;
    }

    // ----------- //
    constructor(o: OptionsInputCheckBox) {
        let myThis: ice2CheckBox = this;

        // --- Get Option --- //
        myThis._id = o.id;
        myThis.options = o;
        myThis.ValueChange = o.ValueChange;
        myThis.iscoche = false;
        myThis.isPartiel = false;
        if (o.renderIntermediaire != null)
            myThis.renderIntermediaire = o.renderIntermediaire;

        if (o.espaceMinimaliste == null)
            o.espaceMinimaliste = false;

        if (o.withLabelContainer == null)
            o.withLabelContainer = false;

        if (o.optionsLabelContainer != null)
            if (o.optionsLabelContainer.inverserLabelDOM != null)
                myThis.inverserLabelDom = o.optionsLabelContainer.inverserLabelDOM;


        myThis.canBePartiel = o.canbePartiel;
        if (o.canbePartiel == null)
            myThis.canBePartiel = false;

        myThis.CanValueChange = o.CanValueChange;
        if (myThis.CanValueChange == null)
            myThis.CanValueChange = () => { return true; };

        myThis.WithChangeValueWhenNull = o.WithChangeValueWhenNull;
        if (o.WithChangeValueWhenNull == null)
            myThis.WithChangeValueWhenNull = false;

        let valeurParDefaut = o.value;
        myThis.Value = o.value;

        // --- class --- //
        let addclass: string ="";
        if (addclass != null)
            addclass = o.class;

        if (o.typeCheckbox == enumTypeCheckbox.slide)
            addclass += " ice2Slide";

        if (o.espaceMinimaliste)
            addclass += " espaceMinimaliste";

        // --- Binding --- //
        if (o.binding != null)
        {
            // Value //
            if (o.binding.value != null)
            {
                myThis.binding = o.binding.value;
                valeurParDefaut = myThis.binding.Value;
                myThis.Value = o.value;

                myThis.binding.bind(n =>
                {
                    myThis.setValue(n);
                });
                myThis.ValueChange = (v: boolean) => { myThis.binding.Value = v; };
            }

            // visibility //
            if (o.binding.visibility != null)
            {
                o.binding.visibility.bind((s: enumVisibility) =>
                {
                    switch (s)
                    {
                        case enumVisibility.afficher:
                            affichericeElements(myThis.element);
                            break;
                        case enumVisibility.masquer:
                            cachericeElements(myThis.element, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cachericeElements(myThis.element, true);
                            break;
                    }
                })
            }
        }

        // --- Generation --- //
        myThis.element = new iceDiv({
            id: myThis._id,
            class: "ice2Checkbox " + addclass,
            title: o.titleLocalise == undefined ? (o.titleVariable == undefined ? new iceLString("Sélectionner").text : o.titleVariable) : new iceLString(o.titleLocalise).text
        });

        switch (o.typeCheckbox)
        {
            case enumTypeCheckbox.texte:
                myThis.element.addClass("xchb-texte");
                myThis.btnTexte = new ice2Bouton({
                    click: function (cb)
                    {
                        myThis.fnClick(myThis);
                        cb();
                    },
                    textLocalise: o.textLocalise,
                    textVariable: o.textVariable,
                    titleLocalise: o.titleLocalise == undefined ? (o.titleVariable == undefined ? new iceLString("Sélectionner").text : o.titleLocalise) : o.titleLocalise,
                    titleVariable: o.titleVariable,
                    optionsAffichage: { tailleBouton: enumTailleBouton.S },
                });
                myThis.element.asHolder.append(myThis.btnTexte);
                break;

            case enumTypeCheckbox.image:
                myThis.element.addClass("ice2Image");
                myThis.options.imageEnable = o.imageEnable != null ? o.imageEnable : new IconeExterne("");
                myThis.options.imageDisable = o.imageEnable != null ? o.imageDisable : new IconeExterne("");

                let image: Icone = myThis.iscoche ? o.imageEnable : o.imageDisable;
                myThis.btnTexte = new ice2Bouton({
                    click: function (cb)
                    {
                        myThis.fnClick(myThis);
                        cb();
                    },
                    titleLocalise: o.titleLocalise == undefined ? (o.titleVariable == undefined ? new iceLString("Sélectionner").text : o.titleLocalise) : o.titleLocalise,
                    titleVariable: o.titleVariable,
                    optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                    icone: image
                });
                myThis.element.asHolder.append(myThis.btnTexte);
                break;

            case enumTypeCheckbox.ice2Bouton:
                myThis.element.addClass("BoutonWapper2-text");

                myThis.btnModeBtn = new ice2Bouton({
                    textLocalise: myThis.options.textLocalise,
                    textVariable: myThis.options.textVariable,
                    optionsAffichage: myThis.options.AffichageBoutonWapper2,
                    icone: myThis.options.IconeBoutonWapper2,
                    typeBouton: enumTypeBouton.Standard,
                    titleLocalise: o.titleLocalise == undefined ? (o.titleVariable == undefined ? new iceLString("Sélectionner").text : o.titleLocalise) : o.titleLocalise,
                    titleVariable: o.titleVariable,
                    click: (cb) => {
                        myThis.fnClick(myThis);
                        cb();
                    }
                })
                myThis.element.asHolder.append(myThis.btnModeBtn);
                break;

            default:
                myThis.element.asHolder.xdiv({ class: "ice2CheckboxContainer" }, myThis.cont);
                myThis.cont.content.asHolder.xdiv({ class: "ice2CheckboxIcone" }, myThis.divIcone);
        }

        if (o.withLabelContainer && (o.textLocalise != null || o.textVariable != null) && o.typeCheckbox != enumTypeCheckbox.texte && o.typeCheckbox != enumTypeCheckbox.ice2Bouton)
            myThis.labelContainer = new ice2LabelContainer({
                labelLargeurLibre: true,
                class: "ice2CheckboxContainerLabel",
                textVariable: o.textVariable,
                textLocalise: o.textLocalise,
                initContent: myThis.element,
                optionsAffichage: { positionDuContenu: enumPositionDuContenu.gauche }
            });

        // --- init --- //
        if (myThis.canBePartiel && valeurParDefaut == null) {
            myThis.isPartiel = true
            myThis.toggleIntermediaire();
        }
        else if (valeurParDefaut) {
            myThis.toggleCoche();
                
        }

        if (o.inactif == null)
            o.inactif = false;

        myThis.isInit = true;
        myThis.setActif(!o.inactif);
    }

    // -------------- //
    // Methode Public //
    // -------------- //
    public setValue(value: boolean): ice2CheckBox {
        let myThis: ice2CheckBox = this;

        if (myThis.CanValueChange(value))
        {
            if (myThis.isPartiel && myThis.canBePartiel)
                myThis.iscoche = !value

            if (value != null && value != myThis.iscoche)
            {
                if (myThis.value != value)
                {
                    myThis.Value = value;

                    if (myThis.ValueChange != null)
                        myThis.ValueChange(value);

                    myThis.toggleCoche();
                }
            }
            else if (value == null && myThis.canBePartiel)
            {
                myThis.Value = value;

                if (myThis.ValueChange != null && myThis.WithChangeValueWhenNull)
                    myThis.ValueChange(value);

                myThis.toggleIntermediaire();
            }
        }

        if (myThis.iscoche)
        {
            myThis.element.addClass("ice2checked");
            myThis.element.removeClass("ice2unchecked");
        }
        else if (!myThis.iscoche)
        {
            myThis.element.removeClass("ice2checked");
            myThis.element.addClass("ice2unchecked");
        }


        myThis.element.addClass("animEnCours");
        setTimeout(function ()
        {
            myThis.element.removeClass("animEnCours");
        }, 300);

        return myThis;
    }

    public setValueSansValueChange(value: boolean): ice2CheckBox
    {
        let myThis: ice2CheckBox = this;

        if (myThis.CanValueChange(value))
        {

            if (myThis.isPartiel && myThis.canBePartiel)
                myThis.iscoche = !value

            if (value != null && value != myThis.iscoche)
            {
                if (myThis.value != value)
                {
                    myThis.Value = value;
                    myThis.toggleCoche();
                }
            }
            else if (value == null && myThis.canBePartiel)
            {
                myThis.Value = value;
                myThis.toggleIntermediaire();
            }
        }

        return myThis;
    }

    public setActif(activer: boolean): ice2CheckBox {
        let myThis: ice2CheckBox = this;
        let addclass: string = "";

        if (myThis.options.typeCheckbox != enumTypeCheckbox.texte)
        {
            if (activer == undefined || activer)
            {
                if (myThis.inactif || myThis.isInit) // Evite de mettre deux fois l'evenement click si la checkbox est deja active
                {
                    myThis.inactif = false;

                    myThis.element.y.onclick=  (e)=>
                    {
                        myThis.fnClick(myThis);
                        e.stopPropagation();
                    };
                    myThis.element.removeClass("disabled");
                    if (myThis.labelContainer != null)
                        myThis.labelContainer.removeClass("disabled");
                }
            }
            else
            {
                if (!myThis.inactif || myThis.isInit) // Evite de mettre deux fois la classe disabled la checkbox est deja inactif
                {
                    myThis.inactif = !activer;
                    addclass += "disabled";
                    myThis.element.y.onclick=null;
                    //myThis.element.x.addClass(addclass);
                    myThis.element.addClass(addclass);
                    if (myThis.labelContainer != null)
                    /*myThis.labelContainer.x.addClass(addclass);*/
                        myThis.labelContainer.addClass(addclass);
                }
            }
        }
        myThis.isInit = false;
        return myThis;
    }

    public addClass(s: string): ice2CheckBox
    {
        let myThis: ice2CheckBox = this;
        myThis.element.addClass(s);
        return myThis;
    }

    public removeClass(s: string): ice2CheckBox {
        let myThis: ice2CheckBox = this;
        myThis.element.removeClass(s);
        return myThis;
    }

    public append(a: iXElement): ice2CheckBox
    {
        let myThis: ice2CheckBox = this;

        myThis.element.asHolder.append(a);
        return myThis;
    }


    // --------------- //
    // Methode private //
    // --------------- //
    private fnClick(myThis: ice2CheckBox)
    {
        if (myThis.binding == undefined)
            myThis.setValue(!myThis.iscoche);
        else
            myThis.binding.Value = !myThis.iscoche;
    }

    private toggleIntermediaire(): ice2CheckBox
    {
        let myThis: ice2CheckBox = this;
        myThis.isPartiel = true;

        myThis.element.asHolder.empty().append(new ice2ContainerEvent({
            class: "ice2CheckboxContainer",
            initContent: myThis.renderIntermediaire(),
            onClick: cb =>
            {
                myThis.iscoche = true;
                myThis.isPartiel = false;
                myThis.element.asHolder.empty().xdiv({ class: "ice2CheckboxContainer" }, myThis.cont);
                myThis.cont.content.asHolder.xdiv({ class: "ice2CheckboxIcone" }, myThis.divIcone);

                myThis.toggleCoche();
            }
        }))

        return myThis;
    }

    private toggleCoche(): ice2CheckBox
    {
        let myThis: ice2CheckBox = this;

        if (!myThis.isPartiel)
            myThis.iscoche = !myThis.iscoche;
        else
        {
            myThis.isPartiel = false;
            myThis.iscoche = !myThis.iscoche;
            myThis.element.asHolder.empty().xdiv({ class: "ice2CheckboxContainer" }, myThis.cont);
            myThis.cont.content.asHolder.xdiv({ class: "ice2CheckboxIcone" }, myThis.divIcone);
        }

        if (myThis.iscoche)
        {
            myThis.element.addClass("ice2checked");
            myThis.element.removeClass("ice2unchecked");
        }
        else if (!myThis.iscoche)
        {
            myThis.element.removeClass("ice2checked");
            myThis.element.addClass("ice2unchecked");
        }

        switch (myThis.options.typeCheckbox)
        {
            case enumTypeCheckbox.slide:
                if (myThis.iscoche)
                    myThis.cont.content.addClass("isCoche");
                else
                    myThis.cont.content.removeClass("isCoche");
                break;
            case enumTypeCheckbox.texte:
                if (myThis.iscoche)
                    myThis.element.addClass("xchb-texte_selected");
                else
                    myThis.element.removeClass("xchb-texte_selected");
                break;
            case enumTypeCheckbox.image:
                let image: Icone = myThis.iscoche ? myThis.options.imageEnable : myThis.options.imageDisable;
                myThis.btnTexte.setIcone(image);
                break;
        }

        return myThis;
    }

    public ChangerLabel(libelle: string, localiser: boolean = false)
    {

        let myThis: ice2CheckBox = this;
        let text: string = libelle;

        if (localiser)
            text = new iceLString(libelle).text;

        switch (myThis.options.typeCheckbox)
        {
            case enumTypeCheckbox.texte:
                myThis.btnTexte.changerText(text);
                break;
            case enumTypeCheckbox.ice2Bouton:
                myThis.btnModeBtn.changerText(text);
                break;
            case enumTypeCheckbox.standard:
                break;
        }


    }

    public ChangerTitle(libelle: string, localiser: boolean = false)
    {

        let myThis: ice2CheckBox = this;
        let text: string = libelle;

        if (localiser)
            text = new iceLString(libelle).text;

        switch (myThis.options.typeCheckbox)
        {
            case enumTypeCheckbox.texte:
                break;
            case enumTypeCheckbox.ice2Bouton:
                myThis.btnModeBtn.setTitle(text);
                break;
            case enumTypeCheckbox.standard:
                break;
        }


    }

    public ChangerIconeice2Bouton(icone: Icone)
    {

        let myThis: ice2CheckBox = this;

        switch (myThis.options.typeCheckbox)
        {
            case enumTypeCheckbox.ice2Bouton:
                myThis.btnModeBtn.setIcone(icone);
                break;
        }


    }


    public vider(): void {
        let myThis: ice2CheckBox = this;

        videriceElements(myThis);


    }
}