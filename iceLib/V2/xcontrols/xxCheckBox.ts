enum enumTypeCheckbox {
    standard,
    slide,
    texte,
    image,
    xxBouton
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
    IconeBoutonWapper2?: Icone | xIconeAvecAction;
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
    IconeBoutonWapper2?: Icone | xIconeAvecAction;
    textLocalise?: string;
    textVariable?: string;
    binding?: {
        value?: BindableObject<boolean>;
        visibility?: BindableObject<enumVisibility>;
    }
    espaceMinimaliste?: boolean;
}

type OptionsInputCheckBox = OptionsInputCheckBoxStandard | OptionsInputCheckBoxAvecPartiel;


class xxCheckBox implements iXElement {

    // --------- //
    // Attributs //
    // --------- //
    // --- contener --- //
    private element: xDiv;
    private divIcone: Container<xDiv> = new Container<xDiv>();
    private cont: Container<xDiv> = new Container<xDiv>();
    private btnTexte: xxBouton;
    private labelContainer: xxLabelContainer;

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

    private btnModeBtn: xxBouton;

    private renderIntermediaire: ()=> iXElement = ()=>
    {
        // Si besoin: ajouter les conditions sur l'enumTypeCheckbox
        return new xDiv({ class: "xxCheckboxIcone partiel" });
    }

    // ----------- //
    // Methode Get //
    // ----------- //
   
    public get y()
    {
        let myThis: xxCheckBox = this;
        if (myThis.labelContainer != null)
            return myThis.labelContainer.y;
        return myThis.element.y;
    }

    public get value(): boolean
    {
        let myThis: xxCheckBox = this;
        return myThis.Value;
    }

    public get getId(): string
    {
        let myThis: xxCheckBox = this;

        return myThis._id;
    }

    // ----------- //
    constructor(o: OptionsInputCheckBox) {
        let myThis: xxCheckBox = this;

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
            addclass += " xxSlide";

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
                            afficherxElements(myThis.element);
                            break;
                        case enumVisibility.masquer:
                            cacherxElements(myThis.element, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cacherxElements(myThis.element, true);
                            break;
                    }
                })
            }
        }

        // --- Generation --- //
        myThis.element = new xDiv({
            id: myThis._id,
            class: "xxCheckbox " + addclass,
            title: o.titleLocalise == undefined ? (o.titleVariable == undefined ? new xLString("Sélectionner").text : o.titleVariable) : new xLString(o.titleLocalise).text
        });

        switch (o.typeCheckbox)
        {
            case enumTypeCheckbox.texte:
                myThis.element.addClass("xchb-texte");
                myThis.btnTexte = new xxBouton({
                    click: function (cb)
                    {
                        myThis.fnClick(myThis);
                        cb();
                    },
                    textLocalise: o.textLocalise,
                    textVariable: o.textVariable,
                    titleLocalise: o.titleLocalise == undefined ? (o.titleVariable == undefined ? new xLString("Sélectionner").text : o.titleLocalise) : o.titleLocalise,
                    titleVariable: o.titleVariable,
                    optionsAffichage: { tailleBouton: enumTailleBouton.S },
                });
                myThis.element.asHolder.append(myThis.btnTexte);
                break;

            case enumTypeCheckbox.image:
                myThis.element.addClass("xxImage");
                myThis.options.imageEnable = o.imageEnable != null ? o.imageEnable : new IconeExterne("");
                myThis.options.imageDisable = o.imageEnable != null ? o.imageDisable : new IconeExterne("");

                let image: Icone = myThis.iscoche ? o.imageEnable : o.imageDisable;
                myThis.btnTexte = new xxBouton({
                    click: function (cb)
                    {
                        myThis.fnClick(myThis);
                        cb();
                    },
                    titleLocalise: o.titleLocalise == undefined ? (o.titleVariable == undefined ? new xLString("Sélectionner").text : o.titleLocalise) : o.titleLocalise,
                    titleVariable: o.titleVariable,
                    optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                    icone: image
                });
                myThis.element.asHolder.append(myThis.btnTexte);
                break;

            case enumTypeCheckbox.xxBouton:
                myThis.element.addClass("BoutonWapper2-text");

                myThis.btnModeBtn = new xxBouton({
                    textLocalise: myThis.options.textLocalise,
                    textVariable: myThis.options.textVariable,
                    optionsAffichage: myThis.options.AffichageBoutonWapper2,
                    icone: myThis.options.IconeBoutonWapper2,
                    typeBouton: enumTypeBouton.Standard,
                    titleLocalise: o.titleLocalise == undefined ? (o.titleVariable == undefined ? new xLString("Sélectionner").text : o.titleLocalise) : o.titleLocalise,
                    titleVariable: o.titleVariable,
                    click: (cb) => {
                        myThis.fnClick(myThis);
                        cb();
                    }
                })
                myThis.element.asHolder.append(myThis.btnModeBtn);
                break;

            default:
                myThis.element.asHolder.xdiv({ class: "xxCheckboxContainer" }, myThis.cont);
                myThis.cont.content.asHolder.xdiv({ class: "xxCheckboxIcone" }, myThis.divIcone);
        }

        if (o.withLabelContainer && (o.textLocalise != null || o.textVariable != null) && o.typeCheckbox != enumTypeCheckbox.texte && o.typeCheckbox != enumTypeCheckbox.xxBouton)
            myThis.labelContainer = new xxLabelContainer({
                labelLargeurLibre: true,
                class: "xxCheckboxContainerLabel",
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
    public setValue(value: boolean): xxCheckBox {
        let myThis: xxCheckBox = this;

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
            myThis.element.addClass("xxchecked");
            myThis.element.removeClass("xxunchecked");
        }
        else if (!myThis.iscoche)
        {
            myThis.element.removeClass("xxchecked");
            myThis.element.addClass("xxunchecked");
        }


        myThis.element.addClass("animEnCours");
        setTimeout(function ()
        {
            myThis.element.removeClass("animEnCours");
        }, 300);

        return myThis;
    }

    public setValueSansValueChange(value: boolean): xxCheckBox
    {
        let myThis: xxCheckBox = this;

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

    public setActif(activer: boolean): xxCheckBox {
        let myThis: xxCheckBox = this;
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

    public addClass(s: string): xxCheckBox
    {
        let myThis: xxCheckBox = this;
        myThis.element.addClass(s);
        return myThis;
    }

    public removeClass(s: string): xxCheckBox {
        let myThis: xxCheckBox = this;
        myThis.element.removeClass(s);
        return myThis;
    }

    public append(a: iXElement): xxCheckBox
    {
        let myThis: xxCheckBox = this;

        myThis.element.asHolder.append(a);
        return myThis;
    }


    // --------------- //
    // Methode private //
    // --------------- //
    private fnClick(myThis: xxCheckBox)
    {
        if (myThis.binding == undefined)
            myThis.setValue(!myThis.iscoche);
        else
            myThis.binding.Value = !myThis.iscoche;
    }

    private toggleIntermediaire(): xxCheckBox
    {
        let myThis: xxCheckBox = this;
        myThis.isPartiel = true;

        myThis.element.asHolder.empty().append(new xxContainerEvent({
            class: "xxCheckboxContainer",
            initContent: myThis.renderIntermediaire(),
            onClick: cb =>
            {
                myThis.iscoche = true;
                myThis.isPartiel = false;
                myThis.element.asHolder.empty().xdiv({ class: "xxCheckboxContainer" }, myThis.cont);
                myThis.cont.content.asHolder.xdiv({ class: "xxCheckboxIcone" }, myThis.divIcone);

                myThis.toggleCoche();
            }
        }))

        return myThis;
    }

    private toggleCoche(): xxCheckBox
    {
        let myThis: xxCheckBox = this;

        if (!myThis.isPartiel)
            myThis.iscoche = !myThis.iscoche;
        else
        {
            myThis.isPartiel = false;
            myThis.iscoche = !myThis.iscoche;
            myThis.element.asHolder.empty().xdiv({ class: "xxCheckboxContainer" }, myThis.cont);
            myThis.cont.content.asHolder.xdiv({ class: "xxCheckboxIcone" }, myThis.divIcone);
        }

        if (myThis.iscoche)
        {
            myThis.element.addClass("xxchecked");
            myThis.element.removeClass("xxunchecked");
        }
        else if (!myThis.iscoche)
        {
            myThis.element.removeClass("xxchecked");
            myThis.element.addClass("xxunchecked");
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

        let myThis: xxCheckBox = this;
        let text: string = libelle;

        if (localiser)
            text = new xLString(libelle).text;

        switch (myThis.options.typeCheckbox)
        {
            case enumTypeCheckbox.texte:
                myThis.btnTexte.changerText(text);
                break;
            case enumTypeCheckbox.xxBouton:
                myThis.btnModeBtn.changerText(text);
                break;
            case enumTypeCheckbox.standard:
                break;
        }


    }

    public ChangerTitle(libelle: string, localiser: boolean = false)
    {

        let myThis: xxCheckBox = this;
        let text: string = libelle;

        if (localiser)
            text = new xLString(libelle).text;

        switch (myThis.options.typeCheckbox)
        {
            case enumTypeCheckbox.texte:
                break;
            case enumTypeCheckbox.xxBouton:
                myThis.btnModeBtn.setTitle(text);
                break;
            case enumTypeCheckbox.standard:
                break;
        }


    }

    public ChangerIconexxBouton(icone: Icone)
    {

        let myThis: xxCheckBox = this;

        switch (myThis.options.typeCheckbox)
        {
            case enumTypeCheckbox.xxBouton:
                myThis.btnModeBtn.setIcone(icone);
                break;
        }


    }


    public vider(): void {
        let myThis: xxCheckBox = this;

        viderxElements(myThis);


    }
}


