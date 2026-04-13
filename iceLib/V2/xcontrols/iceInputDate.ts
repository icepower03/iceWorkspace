// @ts-nocheck
import { iXElement, iXElementHolder, OptionsHtml, enumVisibility, optionsAffichage, enumPosition } from '../iceBase';
import { BindableObject } from './BindableObject';
import { iceTime } from '../iceTime';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { iceDiv } from './iceDiv';
import { xInputText } from './iceInput';
import { iceInputTextAvecIcone } from './iceInputTextAvecIcone';
import { iceDatePicker } from './iceDatePicker';
import { iceTimePicker } from './iceTimePicker';
import { ice2ToolTip, enumXxToolTipMode } from './ice2ToolTip';
import { ice2LabelContainer, enumPositionDuContenu } from './ice2LabelContainer';
import { iceStyle } from './iceStyle';
import { IconeSvg, enumIconeSvg, tailleIcone, enumIconeP12, IconeP12, Icone } from '../iceIcones';
import { ice2StackPanel } from './ice2StackPanel';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2Label, enumTypeLabel } from './ice2Label';
﻿

export enum enumTypeAffichePicker { InLine, AvecPicker, SansPicker }

interface OptionsInputTime extends OptionsHtml {
    id?: string;
    value?: iceTime;
    ValueChange?: (val: iceTime) => void;
    typeAffichage?: enumTypeAffichePicker;
    onClose?: (val: iceTime) => void;
    btnValiderChange?: boolean;
    binding?: {
        value?: BindableObject<iceTime>;
        visibility?: BindableObject<enumVisibility>;
    }
    placeHolderlocalise?: string;
    nonResponsive?: boolean;
    optionsAffichage?: optionsAffichage;
    disabled?: boolean;
}
interface OptionsInputDateAndTime extends OptionsHtml {
    value?: DateSerialisable;
    ValueChange?: (val: DateSerialisable) => void;
    typeAffichage?: enumTypeAffichePicker;
    AvecNumSemaine?: boolean;
    AvecChoixAnnee?: boolean;
    AvecCodeJour?: boolean;
    AvecBoutonToday?: boolean;
    AvesLabels?: boolean; //Ne fonctionne pas en Affichage "InLine"
    btnValiderChange?: boolean;
    binding?: {
        value?: BindableObject<DateSerialisable>;
        visibility?: BindableObject<enumVisibility>;
        disabled?: BindableObject<boolean>;
    }
    placeHolderlocalise?: string;
    nonResponsive?: boolean;
    optionsAffichage?: optionsAffichage;
    disabled?: boolean;
}
interface OptionsInputDate extends OptionsHtml {
    value?: DateSerialisable;
    todayDefaultValue?: boolean;
    ValueChange?: (val: DateSerialisable) => void;
    typeAffichage?: enumTypeAffichePicker;
    AvecNumSemaine?: boolean;
    onClose?: (val: DateSerialisable) => void;
    AvecChoixAnnee?: boolean;
    AvecBoutonToday?: boolean;
    CanSelectDateNull?: boolean;
    AvecCodeJour?: boolean;
    appuyeToucheEntree?: (date: DateSerialisable) => void;
    binding?: {
        value?: BindableObject<DateSerialisable>;
        visibility?: BindableObject<enumVisibility>;
    }
    placeHolderlocalise?: string;
    nonResponsive?: boolean;
    optionsAffichage?: optionsAffichage;
    disabled?: boolean;
}

export class iceInputDate implements iXElement {

    private contenuePrincipal: ice2ToolTip | xInputText | iceDatePicker | iceInputTextAvecIcone
    private toolTipContenue: ice2ToolTip;
    private inputTexteDate: iceInputTextAvecIcone;
    private labelContainerCodeJour: ice2LabelContainer;
    private datePicker: iceDatePicker;
    private value: DateSerialisable;
    private valueChange: (val: DateSerialisable) => void;
    private class: string;
    private typeAffichageInputDate: enumTypeAffichePicker;
    private AvecNumSemaine: boolean;
    private AvecChoixAnnee: boolean;
    private CanSelectDateNull: boolean;
    private AvecBoutonToday: boolean;
    private AvecCodeJour: boolean;
    private placeHolderlocalise: string;
    private nonResponsive: boolean;
    private todayDefaultValue: boolean;

    private ListeCodeJour: string[] = ["ice2CodeJourLundi", "ice2CodeJourMardi", "ice2CodeJourMercredi", "ice2CodeJourJeudi", "ice2CodeJourVendredi", "ice2CodeJourSamedi", "ice2CodeJourDimanche"];


    get y() {
        return this.contenuePrincipal.y;
    }

    public focus() {
        let myThis: iceInputDate = this;

        myThis.y.focus();
    }

    constructor(option: OptionsInputDate) {
        let myThis: iceInputDate = this;

        myThis.nonResponsive = option.nonResponsive;

        if (option.binding != undefined) {
            if (option.binding.value != undefined) {
                option.binding.value.bind(s => { myThis.setValue(s); })
                option.value = option.binding.value.Value;

                option.ValueChange = (val) => {
                    option.binding.value.Value = val;
                }
            }

            if (option.binding.visibility != undefined) {
                option.binding.visibility.bind(s => {
                    myThis.setVisibility(s);
                });
            }
        }

        myThis.valueChange = option.ValueChange;
        myThis.AvecNumSemaine = option.AvecNumSemaine;
        if (myThis.AvecNumSemaine == undefined)
            myThis.AvecNumSemaine = false;
        myThis.AvecChoixAnnee = option.AvecChoixAnnee;
        if (myThis.AvecChoixAnnee == undefined)
            myThis.AvecChoixAnnee = false;
        myThis.AvecBoutonToday = option.AvecBoutonToday;
        if (myThis.AvecBoutonToday == undefined)
            myThis.AvecBoutonToday = false;
        myThis.CanSelectDateNull = option.CanSelectDateNull;
        if (myThis.CanSelectDateNull == undefined)
            myThis.CanSelectDateNull = false;
        myThis.AvecCodeJour = option.AvecCodeJour;
        if (myThis.AvecCodeJour == undefined)
            myThis.AvecCodeJour = false;

        myThis.todayDefaultValue = option.todayDefaultValue;
        if (myThis.todayDefaultValue == null)
            myThis.todayDefaultValue = false;

        if (myThis.todayDefaultValue) {
            option.value = DateSerialisable.Now();
            if (myThis.valueChange != undefined) {
                myThis.valueChange(option.value);
            }
        }

        myThis.value = option.value;

        myThis.typeAffichageInputDate = option.typeAffichage;
        if (myThis.typeAffichageInputDate == undefined)
            myThis.typeAffichageInputDate = enumTypeAffichePicker.AvecPicker;

        myThis.class = "iceInputDate";

        if (myThis.AvecCodeJour)
            myThis.class += " avecAbreviationJour";

        if (option.class != undefined)
            myThis.class += (" " + option.class);

        myThis.placeHolderlocalise = option.placeHolderlocalise;

        myThis.inputTexteDate = new iceInputTextAvecIcone({
            icone: enumIconeSvg.calendrier,
            value: option.value == undefined || option.value == null ? "" : DateSerialisable.tolocalStringOnlyDate(option.value),
            // value: option.value == undefined || option.value == null ? "" : iceOutils.DateToFrenchDateString(option.value, false, false),
            id: option.id,
            idTest: option.idTest,
            class: "inputTextDate",
            disabled: option.disabled,
            placeHolderlocalise: myThis.placeHolderlocalise,
            ValueChange: (val: string) => {
                let res: string = "";
                let nb: number = 0;
                for (var i = 0; i < val.length; i++) {
                    if (nb < 10) {
                        if (iceMaths.isNumericDigit(val.charAt(i))) {

                            if (res.length == 2 || res.length == 5) {
                                res = res + "/";
                                nb++;
                            }

                            if ((res.length == 7 || res.length == 8 || res.length == 9)) {
                                res = res + val.charAt(i);
                                nb++;
                            } else if (res.length == 1) {
                                if (!(parseInt(val.charAt(i - 1)) == 3 && parseInt(val.charAt(i)) > 1)) {
                                    res = res + val.charAt(i);
                                    nb++;
                                } else
                                    iceOutils.afficherMessageAlertifyLocaliseError("La valeur doit être comprise entre 0 et 1");

                            } else if (res.length == 0) {
                                if (parseInt(val.charAt(i)) <= 3) {
                                    res = res + val.charAt(i);
                                    nb++

                                } else
                                    iceOutils.afficherMessageAlertifyLocaliseError("La valeur doit être comprise entre 0 et 3");
                            } else if (res.length == 3) {
                                if (parseInt(val.charAt(i)) <= 1) {
                                    res = res + val.charAt(i);
                                    nb++
                                } else
                                    iceOutils.afficherMessageAlertifyLocaliseError("La valeur doit être comprise entre 0 et 1");

                            }
                            else if (res.length == 4) {
                                if (!(parseInt(val.charAt(i - 1)) == 1 && parseInt(val.charAt(i)) > 2)) {
                                    res = res + val.charAt(i);
                                    nb++;
                                } else
                                    iceOutils.afficherMessageAlertifyLocaliseError("La valeur doit être comprise entre 0 et 2");

                            } else if (res.length == 6) {
                                if (parseInt(val.charAt(i)) <= 2 && parseInt(val.charAt(i)) >= 1) {
                                    res = res + val.charAt(i);
                                    nb++
                                } else
                                    iceOutils.afficherMessageAlertifyLocaliseError("La valeur doit être comprise entre 1 et 2");
                            }
                        }
                    }
                }

                myThis.inputTexteDate.setValue(res);

                if (val != "") {
                    let date = DateSerialisable.FactoryByFrenchDateString(val);

                    if (date != null && val.length == 10) {
                        myThis.value = date;
                        let indexJours = DateSerialisable.getIndexJourSemaine(myThis.value) /*.getDay();*/

                        if (myThis.AvecCodeJour)
                            myThis.labelContainerCodeJour.changerTextVariable(new iceLString(myThis.ListeCodeJour[indexJours - 1]).text);
                        if (myThis.typeAffichageInputDate == enumTypeAffichePicker.AvecPicker)
                            myThis.datePicker.setValue(date);
                        if (myThis.valueChange != undefined) {
                            myThis.valueChange(date);
                        }
                    }
                }
                else {
                    if (myThis.valueChange != undefined) {
                        myThis.valueChange(null);
                    }

                    myThis.valueChange(null);
                    iceOutils.afficherMessageAlertifyLocaliseError("La date doit être saisie entièrement ");
                }

            },
            click: () => {
                if (myThis.typeAffichageInputDate != enumTypeAffichePicker.SansPicker) {
                    myThis.datePicker.CreateDatePicker();
                    myThis.toolTipContenue.ToggleToolTip();
                }
            },
            clicSurIcone: (cb) => {
                if (myThis.typeAffichageInputDate != enumTypeAffichePicker.SansPicker) {
                    myThis.datePicker.CreateDatePicker();
                    myThis.toolTipContenue.ToggleToolTip();
                }
                cb()
            },
            autoChange: true,
            KeyUpEnterCallback: (val: string) => {
                if (option.appuyeToucheEntree != undefined) {
                    option.appuyeToucheEntree(myThis.value);
                }
                let date = DateSerialisable.FactoryByFrenchDateString(val);  //GetDateTimeFromFrenchDateString(val);
                if (date != null) {
                    if (myThis.valueChange != undefined) {
                        myThis.valueChange(date);
                    }
                }
            }
        })

        if (myThis.AvecCodeJour) {
            let indexJours;
            if (myThis.value != null)
                indexJours = DateSerialisable.getIndexJourSemaine(myThis.value) // myThis.value.getDay();


            myThis.labelContainerCodeJour = new ice2LabelContainer({
                textVariable: new iceLString(myThis.value != null ? myThis.ListeCodeJour[indexJours - 1] : "").text,
                initContent: myThis.inputTexteDate,
                type: enumTypeLabel.description,
                optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
                labelLargeurLibre: true,
                gap: 0,
            });
        }

        myThis.datePicker = new iceDatePicker({
            value: myThis.value,
            affichageBtnAujourdhui: myThis.AvecBoutonToday,
            affichageBtnAucuneDate: myThis.CanSelectDateNull,
            affichageNumSemaine: myThis.AvecNumSemaine,
            choixAnnee: myThis.AvecChoixAnnee,
            valueChange: val => {
                myThis.value = val;
                if (val != null)
                    myThis.inputTexteDate.setValue(DateSerialisable.tolocalStringOnlyDate(val)); // iceOutils.DateToFrenchDateString(val, false, false));
                else {
                    myThis.inputTexteDate.setValue("");
                    iceOutils.afficherMessageAlertifyLocaliseError("La date doit être saisie entièrement ");
                }


                if (myThis.AvecCodeJour) {
                    let indexJours = myThis.value != null ? DateSerialisable.getIndexJourSemaine(myThis.value) : DateSerialisable.getIndexJourSemaine(DateSerialisable.Now());


                    if (myThis.AvecCodeJour)
                        myThis.labelContainerCodeJour.changerTextVariable(new iceLString(myThis.ListeCodeJour[indexJours - 1]).text);
                }

                myThis.valueChange(val);
                if (myThis.typeAffichageInputDate != enumTypeAffichePicker.SansPicker)
                    myThis.toolTipContenue.HideTooltip();
            }
        });

        myThis.toolTipContenue = new ice2ToolTip({
            initContent: myThis.AvecCodeJour ? myThis.labelContainerCodeJour : myThis.inputTexteDate,
            TooltipStopPropagation: true,
            TooltipMode: enumXxToolTipMode.Manuel_WithOut_BackGround,
            toolTipContent: myThis.datePicker,
            class: "ToolTipDatePicker" + ((myThis.class != null) ? " xttip-" + myThis.class : ""),
            nonResponsive: myThis.nonResponsive,
            onHide: (tooltip) => {
                if (option.onClose != undefined)
                    option.onClose(myThis.value);
            },
            disabled: option.disabled
        });


        switch (myThis.typeAffichageInputDate) {
            case enumTypeAffichePicker.AvecPicker:
                myThis.contenuePrincipal = myThis.toolTipContenue;
                break;
            case enumTypeAffichePicker.InLine:
                myThis.contenuePrincipal = myThis.datePicker;
                break;
            case enumTypeAffichePicker.SansPicker:
                myThis.contenuePrincipal = myThis.inputTexteDate;
                break;
        }
        if (myThis.class != null) {
            myThis.class.split(' ').forEach(ci => {
                myThis.contenuePrincipal.addClass(ci);
            })
        }

        if (option.binding != null && option.binding.visibility != null)
            myThis.setVisibility(option.binding.visibility.Value);

        if (option.optionsAffichage != undefined) {
            iceStyle.AppliquerOptionsAffichage(this, option.optionsAffichage);
        }
    }

    public setVisibility(s: enumVisibility) {
        let myThis: iceInputDate = this;
        switch (s) {
            case enumVisibility.afficher:
                affichericeElements(myThis.contenuePrincipal);
                break;
            case enumVisibility.masquer:
                cachericeElements(myThis.contenuePrincipal, false);
                break;
            case enumVisibility.masquerAvecCollapse:
                cachericeElements(myThis.contenuePrincipal, true);
                break;
            default:
                affichericeElements(myThis.contenuePrincipal);
        }
    }

    public setDisabled(disabled: boolean) {
        let myThis: iceInputDate = this;
        myThis.inputTexteDate.setDisabled(disabled);
        myThis.toolTipContenue.setDisabled(disabled);
    }

    public hasFocus(): boolean {
        let myThis: iceInputDate = this;
        return iceOutils.hasFocus(myThis.inputTexteDate);
    }

    public setValue(date: DateSerialisable) {
        let myThis: iceInputDate = this;
        myThis.datePicker.setValue(date);
        myThis.inputTexteDate.setValue(date != null ? DateSerialisable.tolocalStringOnlyDate(date) : "");
        //myThis.inputTexteDate.setValue(date != null ? iceOutils.DateToFrenchDateString(date, false, false) : "");
        myThis.value = date;

        if (myThis.AvecCodeJour) {
            let indexJours = myThis.value != null ? DateSerialisable.getIndexJourSemaine(myThis.value) : DateSerialisable.getIndexJourSemaine(DateSerialisable.Now()); // new Date().getDay();
            //let indexJours = myThis.value != null ? myThis.value.getDay() : new Date().getDay();

            if (indexJours == 0)
                indexJours = 7;
            myThis.labelContainerCodeJour.changerTextVariable(myThis.value != null ? new iceLString(myThis.ListeCodeJour[indexJours - 1]).text : "");
        }
    }

    public afficherDatePicker() {
        let myThis: iceInputDate = this;
        myThis.toolTipContenue.ShowTooltip();
    }

    public width(parame?: string | number): void | number {
        let myThis: iceInputDate = this;
        return myThis.contenuePrincipal.width(parame);
    }

    public height(parame?: string): void | number {
        let myThis: iceInputDate = this;
        return myThis.contenuePrincipal.height(parame);
    }

    public getValueDateSerialisable(): DateSerialisable {
        let myThis: iceInputDate = this;
        return myThis.value;
    }

}

export class xInputTime implements iXElement {
    private value: iceTime;
    private valueChange: (val: iceTime) => void;
    private class: string;
    private typeAffichage: enumTypeAffichePicker;
    private placeHolderlocalise: string;

    private inputTextTime: iceInputTextAvecIcone;
    private tooltipContenue: ice2ToolTip;
    private timePicker: iceTimePicker;

    private btnValiderChange: boolean;

    private contenuePrincipale: xInputText | ice2ToolTip | iceTimePicker | iceInputTextAvecIcone;
    private nonResponsive: boolean;

    constructor(option: OptionsInputTime) {
        let myThis: xInputTime = this;

        myThis.nonResponsive = option.nonResponsive;

        if (option.binding != undefined) {
            if (option.binding.value != undefined) {
                option.binding.value.bind(s => { myThis.setValue(s); })
                option.value = option.binding.value.Value;
                option.ValueChange = (val) => {
                    option.binding.value.Value = val;
                }
            }

            if (option.binding.visibility != undefined) {
                option.binding.visibility.bind(s => {
                    myThis.setVisibility(s);
                });
            }
        }

        myThis.btnValiderChange = option.btnValiderChange;
        myThis.value = option.value;
        myThis.valueChange = option.ValueChange;
        myThis.class = "xInputTime";
        myThis.typeAffichage = option.typeAffichage;

        if (option.class != undefined)
            myThis.class += (" " + option.class);
        if (myThis.typeAffichage == undefined)
            myThis.typeAffichage = enumTypeAffichePicker.AvecPicker;

        if (myThis.btnValiderChange == undefined)
            myThis.btnValiderChange = false;

        myThis.placeHolderlocalise = option.placeHolderlocalise;

        myThis.inputTextTime = new iceInputTextAvecIcone({
            icone: enumIconeSvg.horaire,
            id: option.id,
            value: myThis.value != undefined ? myThis.value.getString() : "",
            idTest: option.idTest,
            disabled: option.disabled,
            placeHolderlocalise: myThis.placeHolderlocalise,
            click: () => {
                if (myThis.typeAffichage != enumTypeAffichePicker.SansPicker)
                    myThis.tooltipContenue.ToggleToolTip();
            },
            clicSurIcone: (cb) => {
                if (myThis.typeAffichage != enumTypeAffichePicker.SansPicker)
                    myThis.tooltipContenue.ToggleToolTip();

                cb()
            },
            class: "inputTextTime",
            autoChange: true,
            ValueChange: (val: string) => {
                let res: string = "";
                let nb: number = 0;
                for (var i = 0; i < val.length; i++) {
                    if (nb < 5) {

                        if (iceMaths.isNumericDigit(val.charAt(i))) {
                            if (val.length == 1 && parseInt(val[i]) > 2) {
                                val = "";
                                iceOutils.afficherMessageAlertifyLocaliseError("La valeur doit être comprise entre 0 et 2");
                            }


                            if (res.length == 2) {
                                res = res + ":";
                                nb++;
                            }

                            if (val.length == 2 && i == 1 && parseInt(val[i - 1]) == 2 && parseInt(val[i]) > 3) {
                                val = val.slice(1, i - 1);
                                iceOutils.afficherMessageAlertifyLocaliseError("La valeur doit être comprise entre 0 et 3");
                            }

                            if (((val.length == 4 && i == 3) || (val.length == 3 && i == 2)) && parseInt(val[i]) > 5) {
                                val = val.slice(1, i - 1);
                                iceOutils.afficherMessageAlertifyLocaliseError("La valeur doit être comprise entre 0 et 5");
                            }

                            if (val[i] != undefined && val[i] != null && val[i] != "")
                                res = res + val.charAt(i);

                            nb++;
                        }
                    }
                }
                myThis.inputTextTime.setValue(res);

                if (val.length == 5) {
                    let tabHeurMin = val.split(':');
                    let time = new iceTime(parseInt(tabHeurMin[0]), parseInt(tabHeurMin[1]))
                    if (time != null) {
                        myThis.value = time;
                        if (myThis.typeAffichage == enumTypeAffichePicker.AvecPicker) {
                            myThis.timePicker.setValue(time);
                        }
                        if (myThis.valueChange != undefined && !myThis.btnValiderChange)
                            myThis.valueChange(time);
                    }
                }

            }
        });

        myThis.timePicker = new iceTimePicker({
            value: myThis.value,
            valueChange: val => {
                myThis.value = val;

                if (myThis.valueChange != undefined && !myThis.btnValiderChange) {
                    myThis.inputTextTime.setValue(val.getString());
                    myThis.valueChange(val);
                }
            }
        });

        let stack_timePicker_boutonClosse = new ice2StackPanel({
            espaceMinimaliste: true,
        });

        stack_timePicker_boutonClosse.append(myThis.timePicker);

        if (myThis.valueChange != undefined && myThis.btnValiderChange) {
            stack_timePicker_boutonClosse.append(new ice2Bouton({
                titleLocalise: "Valider",
                textLocalise: "Valider",
                icone: new IconeP12(enumIconeP12.action_valider),
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.XS
                },
                click: cb => {
                    myThis.tooltipContenue.HideTooltip();
                    if (myThis.valueChange != undefined && myThis.btnValiderChange) {
                        myThis.valueChange(myThis.value);
                        myThis.inputTextTime.setValue(myThis.value.getString());
                    }
                    cb();
                }
            }), "boutonInputTime");
        }

        myThis.tooltipContenue = new ice2ToolTip({
            TooltipStopPropagation: true,
            TooltipMode: enumXxToolTipMode.Manuel_WithOut_BackGround,
            initContent: myThis.inputTextTime,
            class: "ToolTipTimePicker" + ((myThis.class != null) ? " xttip-" + myThis.class : ""),
            nonResponsive: myThis.nonResponsive,
            toolTipContent: stack_timePicker_boutonClosse,
            disabled: option.disabled,
            onHide: (tooltip) => {
                if (option.onClose != undefined)
                    option.onClose(myThis.value);
            }
        });

        switch (myThis.typeAffichage) {
            case enumTypeAffichePicker.AvecPicker:
                myThis.contenuePrincipale = myThis.tooltipContenue;
                break;
            case enumTypeAffichePicker.InLine:
                myThis.contenuePrincipale = myThis.timePicker;
                break;
            case enumTypeAffichePicker.SansPicker:
                myThis.contenuePrincipale = myThis.inputTextTime;
                break;
        }

        //   myThis.contenuePrincipale.x.addClass(myThis.class);
        if (myThis.class != null) {
            myThis.class.split(' ').forEach(ci => {
                myThis.contenuePrincipale.addClass(ci);
            })
        }
        if (option.binding != null && option.binding.visibility != null)
            myThis.setVisibility(option.binding.visibility.Value);

        if (option.optionsAffichage != undefined) {
            iceStyle.AppliquerOptionsAffichage(this, option.optionsAffichage);
        }
    }


    public setVisibility(s: enumVisibility) {
        let myThis: xInputTime = this;
        switch (s) {
            case enumVisibility.afficher:
                affichericeElements(myThis.contenuePrincipale);
                break;
            case enumVisibility.masquer:
                cachericeElements(myThis.contenuePrincipale, false);
                break;
            case enumVisibility.masquerAvecCollapse:
                cachericeElements(myThis.contenuePrincipale, true);
                break;
            default:
                affichericeElements(myThis.contenuePrincipale);
        }
    }

    public setDisabled(disabled: boolean) {
        let myThis: xInputTime = this;
        myThis.inputTextTime.setDisabled(disabled);
        myThis.tooltipContenue.setDisabled(disabled);
    }

    public setValue(val: iceTime) {
        let myThis: xInputTime = this;
        myThis.value = val;
        myThis.inputTextTime.setValue(val != null ? val.getString() : "");
        myThis.timePicker.setValue(val);
    }

    public hasFocus(): boolean {
        let myThis: xInputTime = this;
        return iceOutils.hasFocus(myThis.inputTextTime);
    }

    public afficherTimePicker() {
        let myThis: xInputTime = this;

        myThis.tooltipContenue.ShowTooltip();
    }


    get y() {
        return this.contenuePrincipale.y;
    }


    public width(parame?: string | number): void | number {
        let myThis: xInputTime = this;
        return myThis.contenuePrincipale.width(parame);
    }

    public height(parame?: string): void | number {
        let myThis: xInputTime = this;
        return myThis.contenuePrincipale.height(parame);
    }
}

export class xInputDateAndTime implements iXElement {

    private wrapPrincipal: ice2WrapPanel;
    private value: DateSerialisable;
    private valueTime: iceTime;

    private valueChange: (val: DateSerialisable) => void;

    private inputDate: iceInputDate;
    private inputTime: xInputTime;

    private btnValiderChange: boolean;
    private nonResponsive: boolean;

    constructor(option: OptionsInputDateAndTime) {
        let myThis: xInputDateAndTime = this;

        myThis.nonResponsive = option.nonResponsive;

        if (option.binding != undefined) {
            if (option.binding.value != undefined) {
                option.value = option.binding.value.Value;
                option.binding.value.bind(s => { myThis.setValue(s); })
                option.ValueChange = (val) => {
                    let dateToChange = DateSerialisable.CopyDateSerialisable(val);
                    //let dateToChange = new Date(val.getFullYear(), val.getUTCMonth(), val.getDate(), val.getHours(), val.getMinutes())
                    option.binding.value.Value = dateToChange;
                }
            }

            if (option.binding.visibility != undefined) {
                option.binding.visibility.bind(s => {
                    myThis.setVisibility(s);
                });
            }

            if (option.binding.disabled != null) {
                option.disabled = option.binding.disabled.Value;
                option.binding.disabled.bind(s => {
                    myThis.inputDate.setDisabled(s);
                    myThis.inputTime.setDisabled(s);
                })
            }
        }

        myThis.value = option.value;
        myThis.valueChange = option.ValueChange;

        let maclass: string = "xInputDateAndTime";

        if (option.class != undefined)
            maclass += (" " + option.class);

        myThis.wrapPrincipal = new ice2WrapPanel({
            espaceMinimaliste: true,
            class: maclass,
            retourALaLigne: true,
            id: option.id
        });

        // ---- Date ---- //
        if (option.typeAffichage != enumTypeAffichePicker.InLine && option.AvesLabels) {
            myThis.wrapPrincipal.append(new ice2Label({
                textLocalise: "Le "
            }));
        }
        myThis.btnValiderChange = option.btnValiderChange;

        if (myThis.btnValiderChange == undefined)
            myThis.btnValiderChange = false;

        myThis.inputDate = new iceInputDate({
            class: option.class,
            idTest: option.idTest,
            nonResponsive: myThis.nonResponsive,
            AvecBoutonToday: option.AvecBoutonToday,
            AvecChoixAnnee: option.AvecChoixAnnee,
            AvecNumSemaine: option.AvecNumSemaine,
            AvecCodeJour: option.AvecCodeJour,
            typeAffichage: option.typeAffichage,
            value: myThis.value,
            disabled: option.disabled,
            ValueChange: val => {
                if (myThis.value != val)
                    myThis.value = val;

                if (myThis.value != null) {
                    myThis.value = DateSerialisable.setJourAnneeMois(myThis.value, DateSerialisable.getAnnees(val), DateSerialisable.getMois(val), DateSerialisable.getJours(val));

                    // test si aucun value Time, on set a 00:00
                    if (myThis.valueTime == null) {
                        myThis.valueTime = new iceTime(0, 0);
                        myThis.inputTime.setValue(myThis.valueTime);
                    }
                    myThis.value = DateSerialisable.setHeures(myThis.value, myThis.valueTime.Heures, myThis.valueTime.Minutes, 0, 0);
                }


                if (myThis.valueChange != undefined)
                    myThis.valueChange(myThis.value);
            }
        });
        myThis.wrapPrincipal.append(myThis.inputDate);

        if (myThis.value != null)
            myThis.valueTime = new iceTime(DateSerialisable.getHeures(myThis.value), DateSerialisable.getMinutes(myThis.value));


        // ---- Time ---- //
        if (option.typeAffichage != enumTypeAffichePicker.InLine && option.AvesLabels) {
            myThis.wrapPrincipal.append(new ice2Label({
                textLocalise: "à "
            }));
        }

        myThis.inputTime = new xInputTime({
            class: option.class,
            idTest: option.idTest != null ? option.idTest + "_time" : "",
            value: myThis.valueTime,
            nonResponsive: myThis.nonResponsive,
            typeAffichage: option.typeAffichage,
            btnValiderChange: myThis.btnValiderChange,
            disabled: option.disabled,

            ValueChange: (val) => {
                if (myThis.value == null) {
                    myThis.value = DateSerialisable.Now();
                    myThis.inputDate.setValue(myThis.value);
                }

                if (val != null) {

                    myThis.value = DateSerialisable.setHeures(myThis.value, val.Heures, val.Minutes, 0, 0);
                }
                myThis.valueTime = val;

                if (myThis.valueChange != undefined)
                    myThis.valueChange(myThis.value);
            }
        });
        myThis.wrapPrincipal.append(myThis.inputTime);

        if (option.binding != null && option.binding.visibility != null)
            myThis.setVisibility(option.binding.visibility.Value);

        if (option.optionsAffichage != undefined) {
            iceStyle.AppliquerOptionsAffichage(myThis, option.optionsAffichage);
        }
    }

    public setVisibility(s: enumVisibility) {
        let myThis: xInputDateAndTime = this;
        switch (s) {
            case enumVisibility.afficher:
                affichericeElements(myThis.wrapPrincipal);
                break;
            case enumVisibility.masquer:
                cachericeElements(myThis.wrapPrincipal, false);
                break;
            case enumVisibility.masquerAvecCollapse:
                cachericeElements(myThis.wrapPrincipal, true);
                break;
            default:
                affichericeElements(myThis.wrapPrincipal);
        }
    }

    public setValue(date: DateSerialisable) {
        let myThis: xInputDateAndTime = this;
        myThis.value = date;
        myThis.inputDate.setValue(date);
        if (myThis.valueTime == null)
            myThis.valueTime = date != null ? new iceTime(DateSerialisable.getHeures(date), DateSerialisable.getMinutes(date)) : null;
        else {
            myThis.valueTime.Heures = date != null ? DateSerialisable.getHeures(date) : 0;
            myThis.valueTime.Minutes = date != null ? DateSerialisable.getMinutes(date) : 0;
        }

        myThis.inputTime.setValue(date != null ? myThis.valueTime : null);
    }

    public setDisabled(disabled: boolean) {
        let myThis: xInputDateAndTime = this;
        myThis.inputDate.setDisabled(disabled);
        myThis.inputTime.setDisabled(disabled);
    }

    public getValueDateSerialisable(): DateSerialisable {
        let myThis: xInputDateAndTime = this;
        return myThis.value;
    }



    get y() {
        return this.wrapPrincipal.y;
    }

}