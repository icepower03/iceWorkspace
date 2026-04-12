// @ts-nocheck
import { ExxShowRoomContainerTypeOption } from './xxShowRoomContainer';
import { xxRadioButton } from '../xxRadioButton';
import { enumCurseur, enumPosition } from '../../xBase';
import { enumStyleBouton, enumPositionnementResponsiveBouton, enumTailleBouton, enumCouleurBouton } from '../xxBouton';
export class xxShowRoomOptionRecurrente
{
    public static get_OptionsHtml(addon?: IxxShowRoomContainerDefineOption[], ValeurDefaut?: OptionsHtml): IxxShowRoomContainerDefineOption[]
    {
        let tosender: IxxShowRoomContainerDefineOption[] = [
            {
                TypeOption: ExxShowRoomContainerTypeOption.Texte,
                NameOption: "class",
                ValeurDefaut: ValeurDefaut?.class ? ValeurDefaut.class : null,
                Facultatif: true
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Texte,
                NameOption: "id",
                Facultatif: true
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Function,
                Function: (cb: () => void) =>
                {
                    cb();
                },
                NameOption: "click",
                Facultatif: true
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Number,
                NameOption: "tabindex",
                Facultatif: true,
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Custom,
                NameOption: "autocomplete",
                GenerateOption: (returnData) =>
                {
                    return new xxRadioButton<string>({
                        initElements: [
                            {
                                valeur: "on",
                                libelleVariable: "On",
                            },
                            {
                                valeur: "off",
                                libelleVariable: "Off",
                            },
                            {
                                valeur: null,
                                libelleVariable: "non defini",
                                preselectionne:true
                            }
                        ],
                        valueChange: (val) =>
                        {
                            returnData(val, val);
                        }
                    });
                },
                Facultatif: true,
            }
        ];

        if (addon)
            tosender = tosender.concat(addon);

        return tosender;
    }

    public static get_OptionsAffichage(addon?: IxxShowRoomContainerDefineOption[], ValeurDefaut?: optionsAffichage): IxxShowRoomContainerDefineOption[]
    {
        let tosender: IxxShowRoomContainerDefineOption[] = [
            {
                TypeOption: ExxShowRoomContainerTypeOption.Enum,
                NameOption: "curseur",
                EnumType: "enumCurseur",
                ValeurDefaut: ValeurDefaut?.curseur ? ValeurDefaut.curseur : enumCurseur.defaut,
                Facultatif: true,
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.CotesCSS,
                NameOption: "margin",
                Facultatif: true,
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.CotesCSS,
                NameOption: "padding",
                Facultatif: true,
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.CotesCSS,
                NameOption: "border",
                Facultatif: true,
            }
        ];

        if (addon)
            tosender = tosender.concat(addon);

        return tosender;
    }

    public static get_OptionsAffichageBouton(addon?: IxxShowRoomContainerDefineOption[], ValeurDefaut?: optionsAffichage): IxxShowRoomContainerDefineOption[]
    {
        let tosender: IxxShowRoomContainerDefineOption[] = [
            {
                TypeOption: ExxShowRoomContainerTypeOption.Enum,
                NameOption: "styleBouton",
                EnumType: "enumStyleBouton",
                ValeurDefaut: enumStyleBouton.Simple,
                Facultatif: true,
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Enum,
                NameOption: "positionnementResponsiveBouton",
                EnumType: "enumPositionnementResponsiveBouton",
                ValeurDefaut: enumPositionnementResponsiveBouton.Defaut,
                Facultatif: true,
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Enum,
                NameOption: "tailleBouton",
                EnumType: "enumTailleBouton",
                ValeurDefaut: enumTailleBouton.M,
                Facultatif: true,
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Enum,
                NameOption: "couleurBouton",
                EnumType: "enumCouleurBouton",
                ValeurDefaut: enumCouleurBouton.Utilisateur,
                Facultatif: true,
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Enum,
                NameOption: "positionIconeBouton",
                EnumType: "enumPosition",
                ValeurDefaut: enumPosition.Left,
                Facultatif: true,
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                NameOption: "boutonArrondi",
                Facultatif: true,
            }
        ];

        if (addon)
            tosender = tosender.concat(addon);

        tosender = xxShowRoomOptionRecurrente.get_OptionsAffichage(tosender, ValeurDefaut);

        return tosender;
    }
    
    //#region "Option recursif /!\"
    public static get_OptionsXxNavOngletItem(nbRecur?: number): IxxShowRoomContainerDefineOption[]
    {
        let toSender: IxxShowRoomContainerDefineOption[] = [
            {
                TypeOption: ExxShowRoomContainerTypeOption.Texte,
                NameOption: "id",
                Facultatif: true
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Texte,
                NameOption: "class",
                Facultatif: true
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                NameOptionLocalisable: "textLocalise",
                NameOptionVariable: "textVariable"
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                NameOption: "isOngletPreselected",
                Facultatif: true
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.CouleurHexa,
                NameOption: "color",
                Facultatif: true
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Function,
                NameOption: "onSelect",
                Function: (ongletItem: xxNavOngletItem) => { /* Complete moi*/ },
                Facultatif: true
            },
            {
                TypeOption: ExxShowRoomContainerTypeOption.Function,
                NameOption: "GenerateContent",
                isDefaultSelect:true,
                Function: () => { return xxShowRoomSample.divSample(-1);},
                Facultatif: true
            },
        ];

        if (nbRecur == null)
            nbRecur = 4;

        if (nbRecur > 0)
        {
            toSender.push({
                TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface,
                NameOption: "SousOnglet",
                listOption: xxShowRoomOptionRecurrente.get_OptionsXxNavOngletItem(--nbRecur),
                Facultatif: true
            });
        }
       
        return toSender;
    }
    //#endregion "Option recursif /!\"
}