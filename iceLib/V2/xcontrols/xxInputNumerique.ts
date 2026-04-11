interface OptionsInputNumerir extends OptionsInputNumericGenerique {
    class?: string;
    value?: number;
    rounded?: boolean;
    style?: enumStyleInput;
    background?: enumBackgroundInput;
    ValueChange?: (val: number) => void;
    autoChange?: boolean;
    KeyUpEnterCallback?: (val: number) => void; // Par defaut lance le valueChange
    KeyUpCancelCallback?: () => void;
    plusMinusButton?: optionBtnPlusMoin; // Ajoute un boutton plus et un moins
    AfficheplusMinusButtonFleche?:boolean;
    binding?: {
        value?: BindableObject<number>;
        visibility?: BindableObject<enumVisibility>;
    };
    placeHolderVariable?: string;
    placeHolderlocalise?: string;
    disabled?: boolean;
}

interface optionBtnPlusMoin {
    nbAAjouter?: number;
    nbASoustrare?: number
}

class xxInputNumerique implements iXElement {

    private elementPrincipal: xInputText|xxWrapPanel|xxStackPanel;
    private inputNumeric: xInputText;

    private class: string;

 
    get y() {
        return this.elementPrincipal.y;
    }

    constructor(option: OptionsInputNumerir) {
        let myThis: xxInputNumerique = this;

        myThis.class = "xxInputNumeric";
        if (option.class != undefined)
            myThis.class += " " + option.class;

        // creation du input
        myThis.inputNumeric = new xInputText({
            autoChange: option.autoChange,
            binding: option.binding,
            class: "inputNumerique",
            value: option.value,
            ValueChange: option.ValueChange,
            KeyUpCancelCallback: option.KeyUpCancelCallback,
            KeyUpEnterCallback: option.KeyUpEnterCallback,
            background: option.background,
            placeHolderlocalise: option.placeHolderlocalise,
            placeHolderVariable: option.placeHolderVariable,
            rounded: option.rounded,
            style: option.style,
            disabled: option.disabled,
            numeric: {
                decimalSeparator: option.decimalSeparator,
                max: option.max,
                min: option.min,
                minus: option.minus,
                nbDecimal: option.nbDecimal,
                nbDigits: option.nbDigits,
                plus: option.plus                
            }
        });

        // Si pas de bouton plus and minus
        if (option.plusMinusButton == undefined || !option.plusMinusButton) {
            myThis.elementPrincipal = myThis.inputNumeric;
            myThis.inputNumeric.addClass(myThis.class);
        } else {

            if (option.AfficheplusMinusButtonFleche)
            {
                let boutonPlus: xxBouton = new xxBouton({
                    disabled: option.disabled,
                    icone: new IconeMiniCs3i(enumIconeCs3i.fleche_noire_haut),
                    class: "btnFlecheInputNumeric",
                    titleLocalise: "Plus",
                    click: cb =>
                    {
                        let numberEnCour:number = myThis.inputNumeric.getValue() as number;
                        if (option.max == null || numberEnCour < option.max || numberEnCour == null)
                        {
                            if (numberEnCour == null)
                                numberEnCour = option.min ?? 0;
                            else
                                numberEnCour = xMaths.exactPlus(<number>numberEnCour, 1, option.nbDecimal != undefined ? option.nbDecimal : 0)
                            myThis.inputNumeric.setValueFireEvent(numberEnCour);

                        }

                        // --- Class disabled --- //
                        if (numberEnCour > option.max || numberEnCour == option.max)
                            boutonPlus.addClass("disabled");
                        else
                            boutonPlus.removeClass("disabled");

                        if (numberEnCour < option.min || numberEnCour == option.min)
                            boutonMoins.addClass("disabled");
                        else
                            boutonMoins.removeClass("disabled");

                        cb();
                    }
                });

                let boutonMoins: xxBouton = new xxBouton({
                    icone: new IconeMiniCs3i(enumIconeCs3i.fleche_noire_bas),
                    disabled: option.disabled,
                    class: "btnFlecheInputNumeric",
                    titleLocalise: "Moins",
                    click: cb =>
                    {
                        let numberEnCour = myThis.inputNumeric.getValue() as number;
                        if (option.min == null || numberEnCour > option.min || numberEnCour == null)
                        {
                            if (numberEnCour == null)
                                numberEnCour = option.min ?? 0;
                            else
                                numberEnCour = xMaths.exactMoins(<number>numberEnCour, 1, option.nbDecimal != undefined ? option.nbDecimal : 0);
                            
                            myThis.inputNumeric.setValueFireEvent(numberEnCour);
                        }

                        // --- Class disabled --- //
                        if (numberEnCour < option.min || numberEnCour == option.min)
                            boutonMoins.addClass("disabled");
                        else
                            boutonMoins.removeClass("disabled");

                        if (numberEnCour > option.max || numberEnCour == option.max)
                            boutonPlus.addClass("disabled");
                        else
                            boutonPlus.removeClass("disabled");

                        cb();
                    }
                });

                myThis.elementPrincipal = new xxStackPanel({
                    class: myThis.class,
                    espaceMinimaliste: true,
                    initContent: [
                       boutonPlus,
                        myThis.inputNumeric,
                        boutonMoins
                    ],
                });
            }
            else
            {

                myThis.inputNumeric.addClass("avecBoutonsPlusMoins");
                myThis.elementPrincipal = new xxWrapPanel({
                    class: myThis.class,
                    espaceMinimaliste: true,
                    initContent: [
                        myThis.inputNumeric,
                        new xxBouton({
                            disabled: option.disabled,
                            optionsAffichage: { margin: { Tous: 0 }, tailleBouton: enumTailleBouton.XS },
                            typeBouton: enumTypeBouton.Standard,
                            textVariable: "-",
                            class: "btnMoinsInputNumeric",
                            titleLocalise: "Moins",
                            click: cb =>
                            {
                                let numberEnCour: number = <number>myThis.inputNumeric.getValue();
                                let nbCalculer: number = xMaths.exactMoins(numberEnCour, option.plusMinusButton.nbASoustrare != null ? option.plusMinusButton.nbASoustrare : 1, option.nbDecimal != undefined ? option.nbDecimal : 0);
                                myThis.inputNumeric.setValueFireEvent(nbCalculer);
                                cb();
                            }
                        }),
                        new xxBouton({
                            disabled: option.disabled,
                            optionsAffichage: { margin: { Tous: 0 }, tailleBouton: enumTailleBouton.XS },
                            typeBouton: enumTypeBouton.Standard, 
                            textVariable: "+",
                            class: "btnPlusInputNumeric",
                            titleLocalise: "Plus",
                            click: cb =>
                            {
                                let numberEnCour: number = <number>myThis.inputNumeric.getValue();
                                let nbCalculer: number = xMaths.exactPlus(numberEnCour, option.plusMinusButton.nbAAjouter != null ? option.plusMinusButton.nbAAjouter : 1, option.nbDecimal != undefined ? option.nbDecimal : 0)
                                myThis.inputNumeric.setValueFireEvent(nbCalculer);
                                cb();
                            }
                        })
                    ],
                });
            }
        }
    }

    public setValue(texte: number): void {
        let myThis: xxInputNumerique = this;

        if (!isNaN(texte))
            myThis.inputNumeric.setValue(texte);
    }

    public setValueFireEvent(texte: number): void {
        let myThis: xxInputNumerique = this;
        myThis.setValueFireEvent(texte)
    }

    public focus() {
        let myThis: xxInputNumerique = this;
        myThis.inputNumeric.focus();
    }   

    public getValue(): number {
        let myThis: xxInputNumerique = this;

        return <number>myThis.inputNumeric.getValue();
    }
}