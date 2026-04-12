// @ts-nocheck
import { enumCouleur } from '../xBase';
import { xxToolTip } from './xxToolTip';
import { xxStackPanel } from './xxStackPanel';
import { xxLabel } from './xxLabel';
﻿interface optionXxIndicateur
{
    indicateur: iXElement;
    class?: string;
    Notif?: optionXxIndicateurNotif[];
    NotifHideAlwaysTakePlace?: boolean;
    NotifAlwaysShow?: boolean;
    TooltipStopPropagation?: boolean;
    titleLocalise?: string;
    titleVariable?: string;
    toolTipContent?: iXElement;
    tooltipIsContentLoadOnShow?: boolean;
    tooltipTitreHeaderVariable?: string;
    tooltipTitreHeaderLocalise?: string;
    tooltipOnShow?: (thisTooltip: xxToolTip) => void;
    tooltipOnHide?: (thisTooltip: xxToolTip) => void;
    click?: () => void;
    optionsAffichage?: optionsAffichage;
}

interface optionXxIndicateurNotifNoBind
{
    Caractere?: string;
    nbNotif: number;
    nbNotifBindable?: BindableObject<number>;
    NotifTitleVariable?: string;
    NotifTitleLocalise?: string;
    NotifTitleToolTipContent?: iXElement;
    NotifColor?: EnumXxIndicateurNotifColor;
}

interface optionXxIndicateurNotifBind
{
    Caractere?: string;
    nbNotif?: number;
    nbNotifBindable : BindableObject<number>;
    NotifTitleVariable?: string;
    NotifTitleToolTipContent?: iXElement;
    NotifTitleLocalise?: string;
    NotifColor?: EnumXxIndicateurNotifColor;
}

interface optionXxIndicateurNotifCaractere
{
    Caractere: string;
    nbNotif?: number;
    nbNotifBindable?: BindableObject<number>;
    NotifTitleVariable?: string;
    NotifTitleToolTipContent?: iXElement;
    NotifTitleLocalise?: string;
    NotifColor?: EnumXxIndicateurNotifColor;
}

type optionXxIndicateurNotif = optionXxIndicateurNotifNoBind | optionXxIndicateurNotifBind | optionXxIndicateurNotifCaractere;

export enum EnumXxIndicateurNotifColor
{
    Noir = enumCouleur.emed_noir,
    GrisFonce = enumCouleur.emed_grisfonce,
    GrisClair = enumCouleur.emed_grisclair,
    Blanc = enumCouleur.emed_blanc,
    MarronFonce = enumCouleur.emed_marronfonce,
    MarronClair = enumCouleur.emed_marronclair,
    RougeFonce = enumCouleur.emed_rougefonce,
    Rouge = enumCouleur.emed_rouge,
    Orange = enumCouleur.emed_orange,
    Jaune  = enumCouleur.emed_jaune,
    Vert = enumCouleur.emed_vert,
    Turquoise = enumCouleur.emed_turquoise,
    Bleu = enumCouleur.emed_bleu,
    Violet = enumCouleur.emed_violet,
    Peau = enumCouleur.emed_peau,
    Rose = enumCouleur.emed_rose
}

export class xxIndicateur implements iXElement
{
    // --------- //
    // Attributs //
    // --------- //
    private divIndicateur: xDiv | xxToolTip;
    private stacknotif: xxStackPanel;
    private ListNotif: optionXxIndicateurNotif[];
    private NotifHideAlwaysTakePlace: boolean = false;
    private NotifAlwaysShow: boolean = false;
    private isModeTooltip: boolean = false;

   
    public get y() { return this.divIndicateur.y; }

    // ----------- //
    // Constructor //
    // ----------- //
    constructor(option: optionXxIndicateur)
    {
        let mythis: xxIndicateur = this;

        // Option setup //
        let classe: string = "xxIndicateur ";
        if (option.class != null)
            option.class = classe + option.class;
        else
            option.class = classe;

        if (option.Notif != null)
            mythis.ListNotif = option.Notif.slice();

        if (option.NotifHideAlwaysTakePlace)
            mythis.NotifHideAlwaysTakePlace = true;

        if (option.NotifAlwaysShow)
            mythis.NotifAlwaysShow = true;

        // Generation //
        if (option.toolTipContent != null || option.tooltipIsContentLoadOnShow)
        {
            mythis.isModeTooltip = true;
            // Mode Tooltip //
            mythis.divIndicateur = new xxToolTip({
                class: option.class,
                TooltipStopPropagation: option.TooltipStopPropagation,
                titreHeaderLocalise: option.tooltipTitreHeaderLocalise,
                titreHeaderVariable: option.tooltipTitreHeaderVariable,
                onHide: option.tooltipOnHide,
                onShow: option.tooltipOnShow,
                initContent: mythis.generateContenu(option.indicateur, option.class),
                toolTipContent: option.tooltipIsContentLoadOnShow ? null : option.toolTipContent
            });
        }
        else
        {
            // Mode Title //
            let Title: string;
            if (option.titleLocalise)
            {
                Title = new xLString(option.titleLocalise).text;
            }
            else if (option.titleVariable)
            {
                Title = option.titleVariable;
            }

            mythis.divIndicateur = mythis.generateContenu(option.indicateur, option.class, Title);
        }

        if (option.optionsAffichage != null)
        {
            xStyle.AppliquerOptionsAffichage(mythis.divIndicateur, option.optionsAffichage);
        }

        if (option.click != null)
            mythis.y.onclick= function () { option.click(); };
    }

    // -------- //
    // Methodes //
    // -------- //

    // Permet de générer le contenu
    private generateContenu(indicateur: iXElement, classe: string, Title?: string): xDiv
    {
        let mythis: xxIndicateur = this;

        // Generation contenu de l'indicateur
        let div = new xDiv({ title: Title, class: " xxIndicateurContenu " + classe });

        div.asHolder.append(indicateur);

        // generation zone notif
        mythis.stacknotif = new xxStackPanel({
            espaceMinimaliste: true,
            class: "xxIndicateurNotifStack"
        });

        div.asHolder.append(mythis.stacknotif);

        mythis.generateNotif();

        return div;
    }

    // Permet de re/générer les notifications
    private generateNotif()
    {
        let mythis: xxIndicateur = this;
        mythis.stacknotif.empty();
        if (mythis.ListNotif != null && mythis.ListNotif.length > 0)
        {
            mythis.ListNotif.forEach((notifItem) =>
            {
                let isCaratere: boolean = notifItem.Caractere != null && notifItem.Caractere != "";
                if (!isCaratere)
                {
                    if (notifItem.nbNotifBindable == null)
                        notifItem.nbNotifBindable = new BindableObject<number>(notifItem.nbNotif);
                }

                if (notifItem.NotifColor == null)
                    notifItem.NotifColor = EnumXxIndicateurNotifColor.Bleu;

                let divNotif: xDiv;

                // Title Notif //
                let TitleNotif: string;

                if (!notifItem.NotifTitleToolTipContent)
                {
                    if (notifItem.NotifTitleLocalise)
                    {
                        TitleNotif = new xLString(notifItem.NotifTitleLocalise).text;
                    }
                    else if (notifItem.NotifTitleVariable)
                    {
                        TitleNotif = notifItem.NotifTitleVariable;
                    }
                }

                divNotif = new xDiv({ title: TitleNotif, class: "xxIndicateurNotif " + notifItem.NotifColor.toString() });

                // label
                let labelNotif: xxLabel = new xxLabel({
                    textVariable: isCaratere ? notifItem.Caractere : notifItem.nbNotifBindable.Value,
                    centrer:true
                });
                if (!isCaratere)
                {
                    notifItem.nbNotifBindable.bind((val) =>
                    {
                        if (val > 99)
                        {
                            labelNotif.changerTextVariable("99+");
                            divNotif.addClass("OverNotif");
                        }
                        else
                        {
                            labelNotif.changerTextVariable(val);
                            divNotif.removeClass("OverNotif");
                        }
                    });
                }

                if (notifItem.NotifTitleToolTipContent)
                {
                    divNotif.asHolder.append( new xxToolTip({
                        initContent: labelNotif,
                        class: "xxIndicateurNotifTooltip",
                        TooltipStopPropagation: true,
                        toolTipContent: notifItem.NotifTitleToolTipContent
                    }));
                }
                else
                {
                    divNotif.asHolder.append(labelNotif);
                }

                // Affichage et Bind
                if (!isCaratere && !mythis.NotifAlwaysShow)
                {
                    if (!mythis.NotifHideAlwaysTakePlace)
                    {
                        if (notifItem.nbNotifBindable.Value <= 0)
                            cacherxElements(divNotif,true);
                        else
                          afficherxElements(  divNotif);

                        notifItem.nbNotifBindable.bind((value) =>
                        {
                            if (value <= 0)
                                cacherxElements(divNotif,true);
                            else
                                afficherxElements(divNotif);
                        });
                    }
                    else
                    {
                        if (notifItem.nbNotifBindable.Value <= 0)
                            divNotif.asHolder.cacher();
                        else
                            divNotif.asHolder.afficher();

                        notifItem.nbNotifBindable.bind((value) =>
                        {
                            if (value <= 0)
                                divNotif.asHolder.cacher();
                            else
                                divNotif.asHolder.afficher();
                        });
                    }
                }

                mythis.stacknotif.append(divNotif);

            });
        }
    }

    // Permet d'ajouter une nouvelle notif a la liste de notif
    public addNotif(newNotif: optionXxIndicateurNotif, index?: number)
    {
        let mythis: xxIndicateur = this;
        if (newNotif != null)
        {
            // Insertion dans la list
            if (index != null && index >= 0 && index < mythis.ListNotif.length)
                mythis.ListNotif.splice(index, 0, newNotif);
            else
                mythis.ListNotif.push(newNotif);

            // regeneration des notif
            mythis.generateNotif();
        }
        else
        {
            console.error("xxIndicateur => Function : addNotif - newNofit is null");
        }
    }

    // Permet de supprimer une notif de la liste de notif
    public removeNotif(index: number)
    {
        let mythis: xxIndicateur = this;
        if (index != null && index >= 0 && index < mythis.ListNotif.length)
        {
            // Suppression
            mythis.ListNotif.splice(index, 1);

            // regeneration des notif
            mythis.generateNotif();
        }
        else
        {
            console.error("xxIndicateur => Function : removeNotif - index out of range");
        }
    }

    // Permet de set la valeur d'un notif
    public setNbNotif(newValeur: number, index: number)
    {
        let mythis: xxIndicateur = this;
        if (index != null && index >= 0 && index < mythis.ListNotif.length)
        {
            mythis.ListNotif[index].nbNotifBindable.Value = newValeur;
        }
        else
        {
            console.error("xxIndicateur => Function : setNbNotif - index out of range");
        }
    }

    public RecalculTooltip()
    {
        let mythis: xxIndicateur = this;
        if (mythis.isModeTooltip)
            (mythis.divIndicateur as xxToolTip).CalculPosition();
    }

    public hideTooltip()
    {
        let mythis: xxIndicateur = this;
        if (mythis.isModeTooltip)
            (mythis.divIndicateur as xxToolTip).HideTooltip();
    }
}