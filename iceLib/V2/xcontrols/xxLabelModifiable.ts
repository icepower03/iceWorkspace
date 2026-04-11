interface OptionsLabelModifiable {
    id?: string;
    class?: string;
    textVariable?: string;
    change?: (s: string) => void;
    type?: enumTypeLabel;
    libelleLabelSiVide?: string;
    multiline?: boolean;
    longueurMaxi?: number;
    testValidInput?: (s: string) => boolean;
    testValidInputAsync?: (s: string) => Promise<boolean>;
    texteLocaliseInvalideInput?: string;
    binding?: {
        value?: BindableObject<string | number>;
        visibility?: BindableObject<enumVisibility>;
    }
    optionsAffichage?: optionsAffichage;
}


class xxLabelModifiable implements iXElement  {
    private elementPrincipal: xDiv;
    private label: xxLabelContainer;
    private libelleLabelSiVide: xLString;
    private type: enumTypeLabel;
    private multiline: boolean;
    private class: string;
    private maVariable: string;
    private onchange: (s: string) => void;
    private testValidInput: (s: string) => boolean;
    private testValidInputAsync: (s: string) => Promise<boolean>;
    private texteLocaliseInvalideInput: string;
    private longueurMaxi?: number;
    private inputSaisie: xInputText;

    private binding?: {
        value?: BindableObject<string | number>;
        visibility?: BindableObject<enumVisibility>;
    }

    constructor(o: OptionsLabelModifiable) {
        let myThis: xxLabelModifiable = this;
        myThis.onchange = o.change;

        if (o.binding != undefined)
        {
            myThis.binding = o.binding;
            myThis.onchange = (s) => { myThis.binding.value.Value = s; };
        }

        // test input valide
        if (!o.testValidInput)
        {
            o.testValidInput = () => true;

            // Si il n'y a pas de testValidInput sync on utilise le async si il y en a un
            myThis.testValidInputAsync = o.testValidInputAsync;
        }
        myThis.testValidInput = o.testValidInput;
        if (!o.texteLocaliseInvalideInput)
            o.texteLocaliseInvalideInput = "Texte invalide";
        myThis.texteLocaliseInvalideInput = o.texteLocaliseInvalideInput;

        myThis.longueurMaxi = o.longueurMaxi;
        myThis.type = enumTypeLabel.standard;
        if (o.type != undefined) {
            myThis.type = o.type;
        }
        myThis.multiline = false;
        if (o.multiline != undefined) {
            myThis.multiline = o.multiline;
        }
        myThis.class = o.class;

        o.class += " typeLabel_" + enumTypeLabel[o.type];

        if (o.libelleLabelSiVide != undefined) {
            myThis.libelleLabelSiVide = new xLString(o.libelleLabelSiVide);
        }
        else { myThis.libelleLabelSiVide = new xLString("[non renseigné]"); }

        this.elementPrincipal = new xDiv({ id: o.id, class: "xxLabelModifiableContainer " + o.class });

        myThis.maVariable = o.textVariable;
        if (myThis.maVariable != undefined && myThis.maVariable != "") {
            if (myThis.multiline) {
                myThis.label = new xxLabelContainer({
                    binding: myThis.binding,
                    textVariable: myThis.maVariable.split('\n').join('<br/>'),
                    type: myThis.type,
                    labelLargeurLibre: true,
                    initContent: new IconeSvg(enumIconeSvg.modifier, { taille: tailleIcone.Custom, widthCust: 12, heightCust: 12 }),
                    gap: 5,
                    optionsAffichage: { curseur: enumCurseur.texte }
                });
            }
            else
            {
                myThis.label = new xxLabelContainer({
                    binding: myThis.binding,
                    textVariable: myThis.maVariable,
                    type: myThis.type,
                    labelLargeurLibre: true,
                    initContent: new IconeSvg(enumIconeSvg.modifier, { taille: tailleIcone.Custom, widthCust: 12, heightCust: 12 }),
                    gap: 5,
                    optionsAffichage: { curseur: enumCurseur.texte }
                });
            }
        }
        else {
            myThis.label = new xxLabelContainer({
                binding: myThis.binding,
                textVariable: myThis.libelleLabelSiVide.text,
                type: myThis.type,
                labelLargeurLibre: true,
                initContent: new IconeSvg(enumIconeSvg.modifier, { taille: tailleIcone.Custom, widthCust: 12, heightCust: 12 }),
                gap: 5,
                optionsAffichage: { curseur: enumCurseur.texte }
            });
        }

        myThis.elementPrincipal.asHolder
            .append(myThis.label);

        myThis.label.y.onclick=(evt: any) =>
        {
            myThis.label.addClass("maskey");
            myThis.ouvrirSaisie();
            evt.stopPropagation();
        };

        myThis.label.y.ondblclick=(evt: any) =>
        {
            myThis.label.addClass("maskey");
            myThis.ouvrirSaisie();
            evt.stopPropagation();
        };

        if (o.optionsAffichage != undefined)
        {
            xStyle.AppliquerOptionsAffichage(myThis.elementPrincipal, o.optionsAffichage);
        }
    }

    public setSurbrillanceBinding(sb: BindableObject<string>): xxLabelModifiable
    {
        let myThis: xxLabelModifiable = this;
        myThis.label.setSurbrillanceBinding(sb);
        return myThis;
    }

    public setSurbrillance(s: string): xxLabelModifiable {
        let myThis: xxLabelModifiable = this;
        myThis.label.setSurbrillance(s);
        return myThis;
    }

    public ouvrirSaisie(): void 
    {
        //faut laisser le const parce que c'est bien en fait
        const myThis: xxLabelModifiable = this;
        if (myThis.inputSaisie != null)
        {
            myThis.inputSaisie.y.remove();
            delete myThis.inputSaisie;
        }
        if (myThis.inputSaisie == null)
        {
            myThis.inputSaisie = new xInputText({
                multiline: myThis.multiline,
                class: myThis.class,
                value: myThis.maVariable,
                autoChange: false,
                longueurMaxi: myThis.longueurMaxi,
                binding: myThis.binding,
                ValueChange: async (s: string) =>
                {
                    myThis.inputSaisie.removeClass("Invalide");
                    let isValideTexte: boolean = true;

                    if (myThis.testValidInputAsync)
                        isValideTexte = await myThis.testValidInputAsync(s);

                    if (myThis.testValidInput(s) && isValideTexte)
                    {
                        myThis.maVariable = s;
                        if (myThis.multiline)
                        {
                            myThis.setValeur(myThis.maVariable.split('\n').join('<br/>'));
                        }
                        else
                        {
                            myThis.setValeur(myThis.maVariable);
                        }

                        myThis.reactiverLabel();
                        myThis.onchange(s);

                    }
                    else
                    {
                        myThis.inputSaisie.addClass("Invalide");
                        myThis.inputSaisie.focus();
                        xOutils.afficherMessageAlertifyLocaliseError(myThis.texteLocaliseInvalideInput);
                    }
                },
                onLostfocusCallback: function (s: string)
                {
                    myThis.reactiverLabel();
                },
                KeyUpCancelCallback: function ()
                {
                    myThis.reactiverLabel();
                }
            });
            myThis.inputSaisie.y.onclick = (evt: any) =>
            {
                evt.stopPropagation();
            };

            myThis.elementPrincipal.asHolder.append(myThis.inputSaisie);
        }

        afficherxElements(myThis.inputSaisie);

        if (myThis.multiline == true) {
            cacherxElements(myThis.label, true);
        }
        myThis.inputSaisie.focus();
    }

    private reactiverLabel(): void
    {
        let myThis: xxLabelModifiable = this;

        cacherxElements(myThis.inputSaisie);
        afficherxElements(myThis.label);
        myThis.label.removeClass("maskey");
    }
   
    public get y() { return this.elementPrincipal.y; }

    public setValeur(valeur: string) {
        let myThis: xxLabelModifiable = this;

        if (valeur != "")
            myThis.label.changerTextVariable(valeur);
        else
            myThis.label.changerTextVariable(myThis.libelleLabelSiVide.text);

        myThis.maVariable = valeur;
    }
}
