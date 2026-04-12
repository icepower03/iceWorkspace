// @ts-nocheck
import { iXElement, optionsAffichage, enumVisibility, enumCurseur } from '../xBase';
import { BindableObject } from './BindableObject';
import { xLString } from '../xLString';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { xDiv } from './xDiv';
import { xStyle } from './xStyle';
import { xxLabelContainer } from './xxLabelContainer';
import { xxLabel, enumTypeLabel } from './xxLabel';
import { xInputDate } from './xInputDate';
import { enumIconeSvg, IconeSvg, tailleIcone, Icone } from '../xIcones';
﻿interface OptionsLabelDateModifiable {
    id?: string;
    class?: string;
    Value?: DateSerialisable;
    change: (t: DateSerialisable) => void;
    type?: enumTypeLabel;
    libelleLabelSiVide?: string;
    CanSelectDateNull?: boolean
    testValidInput?: (s: DateSerialisable) => boolean;
    testValidInputAsync?: (s: DateSerialisable) => Promise<boolean>;
    texteLocaliseInvalideInput?: string;
    binding?: {
        value?: BindableObject<DateSerialisable>;
        visibility?: BindableObject<enumVisibility>;
    }
    optionsAffichage?: optionsAffichage;
}

export class xxLabelDateModifiable implements iXElement {
    private elementPrincipal: xDiv;
    private label: xxLabelContainer;
    private libelleLabelSiVide: string;
    private type: enumTypeLabel;

    private testValidInput: (s: DateSerialisable) => boolean;
    private testValidInputAsync: (s: DateSerialisable) => Promise<boolean>;
    private texteLocaliseInvalideInput: string;

    private dateSelected: BindableObject<DateSerialisable>;

    constructor(o: OptionsLabelDateModifiable) {
        let myThis: xxLabelDateModifiable = this;

        // init type de label
        myThis.type = enumTypeLabel.standard;
        if (o.type == enumTypeLabel.titre)
            myThis.type = enumTypeLabel.titre;

        // init libelle si vide
        if (o.libelleLabelSiVide != undefined)
            myThis.libelleLabelSiVide = new xLString(o.libelleLabelSiVide).text;
        else
            myThis.libelleLabelSiVide = new xLString("[non renseigné]").text;

        // init dateSelected
        myThis.dateSelected = new BindableObject<DateSerialisable>(o.Value);
        if (o.binding != null && o.binding.value != null)
            myThis.dateSelected = o.binding.value;
        myThis.dateSelected.bind((d) => o.change(d));

        // test input valide
        myThis.testValidInput = o.testValidInput;
        if (o.testValidInput == null) {
            myThis.testValidInput = () => true;
            // Si il n'y a pas de testValidInput sync on utilise le async si il y en a un
            myThis.testValidInputAsync = o.testValidInputAsync;
        }

        // init text invalide data
        if (o.texteLocaliseInvalideInput != null)
            myThis.texteLocaliseInvalideInput = new xLString(o.texteLocaliseInvalideInput).text;
        else
            myThis.texteLocaliseInvalideInput = new xLString("Date invalide").text;

        //---- Generation de l'element ----//
        myThis.elementPrincipal = new xDiv({
            id: o.id,
            class: "xxLabelModifiableContainer LabelModifiableDate " + o.class
        });

        // bindind visibility
        if (o.binding != null && o.binding.visibility != null) {
            myThis.setVisibility(o.binding.visibility.Value);
            o.binding.visibility.bind((s) => myThis.setVisibility(s));
        }

        // Label
        myThis.label = new xxLabelContainer({
            textVariable: myThis.libelleLabelSiVide,
            type: myThis.type,
            class: o.class,
            labelLargeurLibre: true,
            initContent: new IconeSvg(enumIconeSvg.modifier, { taille: tailleIcone.Custom, widthCust: 12, heightCust: 12 }),
            gap: 5,
            optionsAffichage: { curseur: enumCurseur.texte }
        });
        myThis.elementPrincipal.asHolder.append(myThis.label);
        // init Value Label
        myThis.changerValeurLabel(myThis.dateSelected.Value);
        // binding Label
        myThis.dateSelected.bind((d) => myThis.changerValeurLabel(d));

        myThis.label.y.onclick = function () {
            cacherxElements(myThis.label, false);
            // Date input
            let input: xInputDate = new xInputDate({
                CanSelectDateNull: o.CanSelectDateNull,
                AvecChoixAnnee : true,
                value: myThis.dateSelected.Value,
                ValueChange: async function (d: DateSerialisable) {
                    let dateSerialTempo: DateSerialisable;
                    if (d != null)
                        dateSerialTempo = DateSerialisable.CopyDateSerialisable(d);

                    let isValideTexte: boolean = true;

                    if (!o.CanSelectDateNull)
                        isValideTexte = d != null

                    if (myThis.testValidInputAsync && isValideTexte)
                        isValideTexte = await myThis.testValidInputAsync(dateSerialTempo);

                    if (myThis.testValidInput(dateSerialTempo) && isValideTexte) {
                        myThis.dateSelected.Value = dateSerialTempo;
                        afficherxElements(myThis.label);
                        input.y.remove();
                        input = null;
                    }
                    else {
                        xOutils.afficherMessageAlertifyLocaliseError(myThis.texteLocaliseInvalideInput);
                    }
                },
                onClose: async (val) => {
                    let dateSerialTempo: DateSerialisable;
                    if (val != null)
                        dateSerialTempo = DateSerialisable.CopyDateSerialisable(val);

                    let isValideTexte: boolean = true;

                    if (!o.CanSelectDateNull)
                        isValideTexte = val != null

                    if (myThis.testValidInputAsync && isValideTexte)
                        isValideTexte = await myThis.testValidInputAsync(dateSerialTempo);


                    if (myThis.testValidInput(dateSerialTempo) && isValideTexte && input != null && !input.hasFocus()) {
                        afficherxElements(myThis.label);
                        input.y.remove();
                        input = null;
                    }
                }
            });

            myThis.elementPrincipal.asHolder.append(input);
            input.afficherDatePicker();
        };
        if (o.optionsAffichage != undefined) {
            xStyle.AppliquerOptionsAffichage(myThis.elementPrincipal, o.optionsAffichage);
        }

    }

    //---------//
    // Methode //
    //---------//
    private changerValeurLabel(val: DateSerialisable) {
        let myThis: xxLabelDateModifiable = this;
        if (val != null) {
            myThis.label.changerTextVariable(DateSerialisable.tolocalStringOnlyDate(myThis.dateSelected.Value));
        }
        else {
            myThis.label.changerTextVariable(myThis.libelleLabelSiVide);
        }
    }

    // Set subrillance Texte
    public setSurbrillanceBinding(sb: BindableObject<string>) {
        let myThis: xxLabelDateModifiable = this;
        myThis.label.setSurbrillanceBinding(sb);
    }
    public setSurbrillance(s: string) {
        let myThis: xxLabelDateModifiable = this;
        myThis.label.setSurbrillance(s);
    }

    // Set visibility
    public setVisibility(s: enumVisibility) {
        let myThis: xxLabelDateModifiable = this;
        switch (s) {
            case enumVisibility.afficher:
                afficherxElements(myThis.elementPrincipal);
                break;
            case enumVisibility.masquer:
                cacherxElements(myThis.elementPrincipal, false);
                break;
            case enumVisibility.masquerAvecCollapse:
                cacherxElements(myThis.elementPrincipal, true);
                break;
            default:
                afficherxElements(myThis.elementPrincipal);
        }
    }




    public get y() {
        return this.elementPrincipal.y;
    }

}