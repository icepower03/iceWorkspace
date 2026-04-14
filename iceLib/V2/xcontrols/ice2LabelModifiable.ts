import { iXElement, optionsAffichage, enumVisibility, enumCurseur } from '../iceBase';
import { BindableObject } from './BindableObject';
import { iceLString } from '../iceLString';
import { iceDiv } from './iceDiv';
import { iceStyle } from './iceStyle';
import { xInputText } from './iceInput';
import { ice2LabelContainer } from './ice2LabelContainer';
import { ice2Label, enumTypeLabel } from './ice2Label';
import { enumIconeSvg, IconeSvg, tailleIcone, Icone } from '../iceIcones';
import { iceOutils } from '../../iceOutils';
import { affichericeElements, cachericeElements } from '../../iceStaticFunctions';
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


export class ice2LabelModifiable implements iXElement  {
    private elementPrincipal: iceDiv;
    private label: ice2LabelContainer;
    private libelleLabelSiVide: iceLString;
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
        let myThis: ice2LabelModifiable = this;
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
            myThis.libelleLabelSiVide = new iceLString(o.libelleLabelSiVide);
        }
        else { myThis.libelleLabelSiVide = new iceLString("[non renseigné]"); }

        this.elementPrincipal = new iceDiv({ id: o.id, class: "ice2LabelModifiableContainer " + o.class });

        myThis.maVariable = o.textVariable;
        if (myThis.maVariable != undefined && myThis.maVariable != "") {
            if (myThis.multiline) {
                myThis.label = new ice2LabelContainer({
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
                myThis.label = new ice2LabelContainer({
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
            myThis.label = new ice2LabelContainer({
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
            iceStyle.AppliquerOptionsAffichage(myThis.elementPrincipal, o.optionsAffichage);
        }
    }

    public setSurbrillanceBinding(sb: BindableObject<string>): ice2LabelModifiable
    {
        let myThis: ice2LabelModifiable = this;
        myThis.label.setSurbrillanceBinding(sb);
        return myThis;
    }

    public setSurbrillance(s: string): ice2LabelModifiable {
        let myThis: ice2LabelModifiable = this;
        myThis.label.setSurbrillance(s);
        return myThis;
    }

    public ouvrirSaisie(): void 
    {
        //faut laisser le const parce que c'est bien en fait
        const myThis: ice2LabelModifiable = this;
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
                        iceOutils.afficherMessageAlertifyLocaliseError(myThis.texteLocaliseInvalideInput);
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

        affichericeElements(myThis.inputSaisie);

        if (myThis.multiline == true) {
            cachericeElements(myThis.label, true);
        }
        myThis.inputSaisie.focus();
    }

    private reactiverLabel(): void
    {
        let myThis: ice2LabelModifiable = this;

        cachericeElements(myThis.inputSaisie);
        affichericeElements(myThis.label);
        myThis.label.removeClass("maskey");
    }
   
    public get y() { return this.elementPrincipal.y; }

    public setValeur(valeur: string) {
        let myThis: ice2LabelModifiable = this;

        if (valeur != "")
            myThis.label.changerTextVariable(valeur);
        else
            myThis.label.changerTextVariable(myThis.libelleLabelSiVide.text);

        myThis.maVariable = valeur;
    }
}