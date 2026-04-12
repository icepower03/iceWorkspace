// @ts-nocheck
import { xLString } from '../xLString';
import { iXElement, iXElementHolder, enumVisibility, enumPosition, enumCote } from '../xBase';
import { assignerObjet, afficherxElements, cacherxElements } from '../../xStaticFunctions';
import { xStyle } from './xStyle';
import { BindableObject } from './BindableObject';
import { xDiv } from './xDiv';
import { xxContainerEvent } from './xxContainerEvent';
import { xxLabel, enumTypeLabel } from './xxLabel';
import { xxToolTip, enumXxToolTipPositionWidth } from './xxToolTip';
import { xxGrid, xxGridItem, enumAlignementContenu } from './xxGrid';
import { xxCheckBox, enumTypeCheckbox } from './xxCheckBox';
import { Icone, enumIconeSvg, IconeSvg, tailleIcone } from '../xIcones';
import { enumTailleBouton } from './xxBouton';
﻿interface OptionsxxNavOngletControl
{
    id?: string;
    class?: string;
    WithSousOngletTooltip?: boolean;
    CanReduireSousOnglet?: boolean;

    // Init
    initOnglets?: OptionsxxNavOngletItem[];
    initZoneAvantOnglet?: iXElement;
    initZoneApresOnglet?: iXElement;

    // Event
    OnOngletChange?: (OngletSelect: xxNavOngletItem) => void;
}

interface OptionsxxNavOngletItemBase
{
    id?: string;
    class?: string;

    // header ongle
    textLocalise?: string;
    textVariable?: string;

    // data
    haveFlagHasContenu?: boolean;
    isOngletPreselected?: boolean; // GANON
    isOngletLastSelected?: boolean; // GANON
    color?: string;

    CheckNeedRegeneration?: (ongletItem: xxNavOngletItem) => Promise<boolean>;
    ForGetXxNavOngletItem?: (thisItem: xxNavOngletItem) => void;

    // Event
    onSelect?: (ongletItem: xxNavOngletItem) => void;
}

interface OptionsxxNavOngletItemUnique extends OptionsxxNavOngletItemBase
{
    GenerateContent: (thisOnglet: xxNavOngletItem) => iXElement;
}

interface OptionsxxNavOngletItemTree extends OptionsxxNavOngletItemBase
{
    GenerateContent?: (thisOnglet: xxNavOngletItem) => iXElement; // dans se cas la c'est l'onglet home
    SousOnglet: OptionsxxNavOngletItem[];
}

type OptionsxxNavOngletItem = OptionsxxNavOngletItemUnique | OptionsxxNavOngletItemTree;

interface OptionsxxNavOngletBar
{
    id?: string;
    class?: string;
    Style?: xStyle;
    GridForAddContent: xxGrid;
    GridItemContentOption:
    {
        colStart: number;
        nbCols: number;
        rowStart: number;
        nbRows: number;
    };
    WithSousOngletTooltip?: boolean;

    /** Uniquement la barre Primaire */
    CanReduireSousOnglet?: boolean;

    // Init
    OngletMaster?: xxNavOngletItem;
    initOnglets?: OptionsxxNavOngletItem[];

    // Event
    OnOngletChange?: (OngletSelect: xxNavOngletItem) => void;// Ganon
}

export class xxNavOngletItem
{
    // --------- //
    // Constante //
    // --------- //
    private static readonly CLASS_FlagHasContenu = "FlagHasContenu";
    private static readonly CLASS_FlagSousOngletHasContenu = "FlagSousOngletHasContenu";
    private static readonly TITLE_FlagHasContenu = new xLString("Onglet avec du contenu").text;
    private static readonly TITLE_FlagSousOngletHasContenu = new xLString("Contient un ou plusieurs sous-onglet avec du contenu").text;

    // --------- //
    // Propertie //
    // --------- //
     // Contenue
    public get OngletEtiquette(): xxContainerEvent | xxToolTip { return this._OngletEtiquetteTooltip ?? this._OngletEtiquette; }
    public get OngletEtiquetteHome(): xxContainerEvent { return this._OngletEtiquetteHome; }
    public get SousOnglets(): xxNavOngletBar { return this._SousOnglets; }

    // Data Affichage
    public get isSousOngletAfficher(): boolean { return this._SousOnglets?.isAfficher; }
    public get isContenueAfficher(): boolean { return this._isContenueAfficher; }
    public get haveContent(): boolean { return this.GenerateContent != null; }
    public get ContenueIsGenerated(): boolean { return this._ContenueIsGenerated; }
    public get isTreeOnglet(): boolean { return this._SousOnglets != null; }
    public get color(): string { return this._color; }
    public get OngletName(): string { return this._OngletName; }
    public get id(): string { return this._id; }

    // --------- //
    // attributs //
    // --------- //
    // Data/option
    private _color: string = "AAAAAA";
    private GenerateContent: (thisOnglet: xxNavOngletItem) => iXElement;
    private onSelect: (OngleSelect: xxNavOngletItem) => void;
    private OnSupprimer: () => void;
    private _OngletName: string;
    private _id: string;
    private _class: string;

    // Contenue
    private _OngletEtiquette: xxContainerEvent;
    private _OngletEtiquetteForToolTip: xxContainerEvent;
    private _OngletEtiquetteTooltip: xxToolTip;
    private _OngletEtiquetteHome: xxContainerEvent;
    private _OngletEtiquetteHomeForToolTip: xxContainerEvent;
    private _OngletGridItemContenu: xxGridItem;
    private _SousOnglets: xxNavOngletBar;
    private _lastSousOngletsOpen: xxNavOngletItem;

    // Data Affichage
    private _haveFlagHasContenu: BindableObject<boolean>;
    private _isContenueAfficher: boolean = false;
    private _isOngletAfficher: BindableObject<boolean> = new BindableObject<boolean>(true);
    private _isOngletHomeAfficher: boolean = true;
    private _ContenueIsGenerated: boolean = false;
    private TooltipNeedRefresh: boolean = true;

    // autre
    private CheckNeedRegeneration: (ongletItem: xxNavOngletItem) => Promise<boolean>;

    // ----------- //
    // Constructor //
    // ----------- //
    public constructor(Options: OptionsxxNavOngletItem, GridItemContentOption: { colStart: number, nbCols: number, rowStart: number, nbRows: number }, GridForAddContent: xxGrid, WithSousOngletTooltip: boolean, style: xStyle,OnSupprimer:()=>void)
    {
        let mythis: xxNavOngletItem = this;

        // Get options //
        mythis.OnSupprimer = OnSupprimer;

        if (Options.onSelect)
            mythis.onSelect = Options.onSelect;

        if (!!Options.id)
            mythis._id = Options.id;

        if (!!Options.class)
            mythis._class = Options.class;

        if (Options.haveFlagHasContenu != null)
            mythis._haveFlagHasContenu = new BindableObject<boolean>(Options.haveFlagHasContenu);
        else
            mythis._haveFlagHasContenu = new BindableObject<boolean>(false);

        if (!!Options.color)
            mythis._color = Options.color;

        if (!!Options.textLocalise)
            mythis._OngletName = new xLString(Options.textLocalise).text;
        else if (!!Options.textVariable)
            mythis._OngletName = Options.textVariable;
        if (!mythis._OngletName)
            mythis._OngletName = new xLString("Aucun nom").text;

        mythis.CheckNeedRegeneration = async () => { return !mythis._ContenueIsGenerated; };
        if (Options.CheckNeedRegeneration != null)
            mythis.CheckNeedRegeneration = async (item) => { return !mythis._ContenueIsGenerated || await Options.CheckNeedRegeneration(item); };  

        let classCouleurDegradeSurvol: string = "xxNavOngletBar_ongletItem_couleurDegrade_" + mythis.color;
        style.AddCss(".NotSelected." + classCouleurDegradeSurvol + ":after", "color:#" + mythis.color + "!important;");
        style.AddCss(".NotSelected." + classCouleurDegradeSurvol + " > .xxTooltip_Contenu:after", "color:#" + mythis.color + "!important;");

        let classTemp = (mythis._haveFlagHasContenu.Value ? xxNavOngletItem.CLASS_FlagHasContenu + " " : "") + (!!Options.class ? Options.class : "");

        // Init Etiquette
        mythis._OngletEtiquette = new xxContainerEvent({
            id: (!!Options.id ? "xxNavOngletBar_ongletItem_" + Options.id : null),
            class: "xxNavOngletBar_ongletItem NotSelected " + classTemp,
            titleVariable: mythis._OngletName,
            initContent: new xxLabel({
                textVariable: mythis._OngletName,
                lineBreak: false,
            }),
            stopPropagation: true,
            onMouseOver: () =>
            {
                if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                    xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquette, mythis.color);
                mythis._OngletEtiquette.addClass(classCouleurDegradeSurvol);
            },
            onMouseOut: () =>
            {
                if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                    xStyle.supprimerCouleurFond(mythis._OngletEtiquette);
                mythis._OngletEtiquette.removeClass(classCouleurDegradeSurvol);
            },
            onClick: (cb) =>
            {
                cb();
                mythis.Select();
            }
        });
        mythis._OngletEtiquette.asHolder.append(mythis.CreateFlagHasContenu());
        mythis._OngletEtiquette.asHolder.append(mythis.CreateFlagSousOngletHasContenu());

        // color border
        xStyle.setCouleurBorder(mythis._OngletEtiquette, mythis.color, enumCote.bas,false);

        // Test Si c'est juste un onglet ou un onglet avec sousOnglet
        if (mythis.testIsUniqueItem(Options))
        {
            mythis.GenerateContent = Options.GenerateContent;
        }
        else if (mythis.testIsTree(Options))
        {
            // Si il y a un contenue
            if (Options.GenerateContent)
            {
                mythis.GenerateContent = Options.GenerateContent;
                mythis._OngletEtiquetteHome = new xxContainerEvent({
                    id: (!!Options.id ? "xxNavOngletBar_barHome_" + Options.id : null),
                    class: "xxNavOngletBar_barHome " + classTemp,
                    initContent: new xxLabel({
                        textVariable: mythis._OngletName,
                        lineBreak: false,
                    }),
                    stopPropagation: true,
                    onClick: (cb) =>
                    {
                        cb();
                        mythis.Select();
                    }
                });
                mythis._OngletEtiquetteHome.asHolder.append(mythis.CreateFlagHasContenu());
                xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHome, mythis.color);
                xStyle.setCouleurBorder(mythis._OngletEtiquetteHome, mythis.color, enumCote.bas,false);
            }

            if (WithSousOngletTooltip)
            {
                mythis._OngletEtiquetteTooltip = new xxToolTip({
                    id: (!!Options.id ? "xxNavOngletBar_ongletItem_ToolTip_" + Options.id : null),
                    class: "xxNavOngletBar xxNavOngletBar_ongletItem_ToolTip NotSelected " + classTemp,
                    titleVariable: mythis._OngletName,
                    initContent: new xxLabel({
                        textVariable: mythis._OngletName,
                        lineBreak: false,
                    }),
                    WithoutFleche: true,
                    ToolTipPositionWidthNeverCenter: true,
                    ToolTipPositionWidthSouhaite: enumXxToolTipPositionWidth.droite,
                    onHide: (thistooltip) =>
                    {
                        if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                            xStyle.supprimerCouleurFond(thistooltip);
                        mythis._OngletEtiquetteTooltip.removeClass(classCouleurDegradeSurvol);
                        
                    },
                    onShow: (thistooltip) =>
                    {
                        if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                            xStyle.setCouleurFondAvecContrasteTexteAuto(thistooltip, mythis.color);
                        mythis._OngletEtiquetteTooltip.addClass(classCouleurDegradeSurvol);

                        if (mythis.TooltipNeedRefresh)
                        {
                            mythis.TooltipNeedRefresh = false;
                            thistooltip.viderTooltip()

                            // generation de la grid tooltip
                            let grid: xxGrid = new xxGrid({
                                class: "xxNavOngletBar_GridTooltip",
                                colonnes_auto: "1fr",
                                fullHeight: true,
                                fullWidth: true,
                                gridGap: "0px"
                            });
                            // Couleur de la bordure Gauche
                            xStyle.setCouleurBorder(grid, mythis.color, enumCote.gauche,false);

                            // Creation de tous les boutons des sousOnglets
                            let i = 1, j = 1;

                            if (Options.GenerateContent && mythis._isOngletHomeAfficher)
                            {
                                mythis._OngletEtiquetteHomeForToolTip = new xxContainerEvent({
                                    id: (!!Options.id ? "xxNavOngletBar_GridTooltip_item_" + mythis.id : null),
                                    class: "xxNavOngletBar_GridTooltip_item_home " + classTemp,
                                    initContent: new xxLabel({
                                        textVariable: mythis._OngletName,
                                        lineBreak: false,
                                        centrer:true
                                    }), 
                                    stopPropagation: true,
                                    onMouseOver: () =>
                                    {
                                        if (!mythis.isContenueAfficher)
                                            xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color);
                                    },
                                    onMouseOut: () =>
                                    {
                                        if (!mythis.isContenueAfficher)
                                            xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color, 66, false);
                                    },
                                    onClick: (cb) =>
                                    {
                                        cb();
                                        thistooltip.HideTooltip();
                                        mythis.Select();
                                    }
                                });

                                mythis._OngletEtiquetteHomeForToolTip.asHolder.append(mythis.CreateFlagHasContenu());
                                // color 
                                if (mythis.isContenueAfficher)
                                    xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color);
                                else
                                    xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color, 66, false);
                                xStyle.setCouleurBorder(mythis._OngletEtiquetteHomeForToolTip, mythis.color, enumCote.bas,false);
                                xStyle.setCouleurBorder(mythis._OngletEtiquetteHomeForToolTip, mythis.color, enumCote.droite, false);
                                grid.append([new xxGridItem({
                                    colStart: i++, nbCols: 1, rowStart: j, nbRows: 1,
                                    content: mythis._OngletEtiquetteHomeForToolTip
                                })]);
                            }

                            mythis._SousOnglets.ListOnglet.forEach((item) =>
                            {
                                if (item._isOngletAfficher.Value)
                                {
                                    if (i > 3)
                                    {
                                        j++;
                                        i = 1;
                                    }
                                    let gridItemTemp: xxGridItem = new xxGridItem({
                                        colStart: i++, nbCols: 1, rowStart: j, nbRows: 1,
                                        content: item.CreateOngletEtiquetteForToolTip(() => { mythis._OngletEtiquetteTooltip.HideTooltip(); })
                                    });

                                    // color 
                                    xStyle.setCouleurFondAvecContrasteTexteAuto(gridItemTemp, mythis.color, 66, false, false);
                                    xStyle.setCouleurBorder(gridItemTemp, mythis.color, enumCote.droite,false);
                                    grid.append([gridItemTemp]);
                                }
                            });

                            // Ajoute et recalcul de la tooltip
                            thistooltip.setToolTip(grid);
                            thistooltip.CalculPosition();
                        }
                    },
                    OnClickTooltip: () =>
                    {
                        mythis.Select();
                        mythis._OngletEtiquetteTooltip.HideTooltip();
                    }
                });

                mythis._OngletEtiquetteTooltip.y.append(mythis.CreateFlagHasContenu().y);
                mythis._OngletEtiquetteTooltip.y.append(mythis.CreateFlagSousOngletHasContenu().y);
                // color border
                xStyle.setCouleurBorder(mythis._OngletEtiquetteTooltip, mythis.color, enumCote.bas,false);
            }

            mythis._SousOnglets = new xxNavOngletBar({
                initOnglets: Options.SousOnglet,
                Style: style,
                OngletMaster: mythis,
                GridForAddContent: GridForAddContent,
                GridItemContentOption: GridItemContentOption,
                OnOngletChange: (ongletItem) =>
                {
                    mythis._lastSousOngletsOpen = ongletItem;
                    mythis.AfficherSousOnglet();
                    mythis.onSelect(mythis);
                },
                WithSousOngletTooltip: WithSousOngletTooltip,
            });
            mythis._SousOnglets.ListOnglet.forEach((item) =>
            {
                item._isOngletAfficher.bind((val) =>
                {
                    if (val || mythis._SousOnglets.ListOnglet.some((ongl) => { return ongl._isOngletAfficher.Value; }))
                    {
                        mythis.AfficherOnglet(true);
                    }
                    else
                    {
                        if (!mythis.GenerateContent || !mythis._isOngletHomeAfficher)
                            mythis.CacherOnglet(true);
                    }
                    mythis.TooltipNeedRefresh = true;
                });
                item._haveFlagHasContenu.bind((val) =>
                {
                    if (val || mythis._SousOnglets.ListOnglet.some((ongl) => { return ongl._haveFlagHasContenu.Value; }))
                    {
                        mythis.setFlagSousOngletHasContenu(true);
                    }
                    else
                    {
                        mythis.setFlagSousOngletHasContenu(false);
                    }
                });
                if (item._haveFlagHasContenu.Value && !mythis._haveFlagHasContenu.Value)
                    mythis.setFlagSousOngletHasContenu(true);
            });
        }

        // Si il y a un contenu possible pour l'onglet on creer la zone
        if (mythis.GenerateContent)
        {
            // Init GridItemContenu
            mythis._OngletGridItemContenu = new xxGridItem({
                id: (!!Options.id ? "xxNavOngletBar_GridItem_ongletContenu_" + Options.id : null),
                class: "xxNavOngletBar_GridItem_ongletContenu " + (!!Options.class ? Options.class : ""),
                colStart: GridItemContentOption.colStart, nbCols: GridItemContentOption.nbCols,
                rowStart: GridItemContentOption.rowStart, nbRows: GridItemContentOption.nbRows,
                content: new xDiv({})
            });
            cacherxElements(mythis._OngletGridItemContenu, true);
            GridForAddContent.append([mythis._OngletGridItemContenu]);
        }

        if (Options.isOngletPreselected)
            mythis.Select(); //GANON ca marche pas bien sur les sous-onglet

        if (Options.ForGetXxNavOngletItem)
            Options.ForGetXxNavOngletItem(mythis);
    }

    // -------- //
    // Methodes //
    // -------- //
    //#region "Methode d'interaction"

    public setFlagHasContenu(valeur: boolean)
    {
        let mythis: xxNavOngletItem = this;
        mythis._haveFlagHasContenu.Value = valeur;
        if (mythis._haveFlagHasContenu.Value)
        {
            mythis._OngletEtiquette.addClass(xxNavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteForToolTip)
                mythis._OngletEtiquetteForToolTip.addClass(xxNavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteTooltip)
                mythis._OngletEtiquetteTooltip.addClass(xxNavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteHome)
                mythis._OngletEtiquetteHome.addClass(xxNavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteHomeForToolTip)
                mythis._OngletEtiquetteHomeForToolTip.addClass(xxNavOngletItem.CLASS_FlagHasContenu);
        }
        else
        {
            mythis._OngletEtiquette.removeClass(xxNavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteForToolTip)
                mythis._OngletEtiquetteForToolTip.removeClass(xxNavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteTooltip)
                mythis._OngletEtiquetteTooltip.removeClass(xxNavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteHome)
                mythis._OngletEtiquetteHome.removeClass(xxNavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteHomeForToolTip)
                mythis._OngletEtiquetteHomeForToolTip.removeClass(xxNavOngletItem.CLASS_FlagHasContenu);
        }
    }

    /**
    * Selection de l'onglet
    * @param wihoutRegeneration permet de ne pas regeneré le contenue si il existe deja 
    */
    public Select(wihoutRegeneration?: boolean)
    {
        let mythis: xxNavOngletItem = this;
        if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
        {
            mythis.OngletEtiquette.removeClass("NotSelected");
            xStyle.setCouleurFondAvecContrasteTexteAuto(mythis.OngletEtiquette, mythis.color);
            if (mythis._OngletEtiquetteForToolTip)
                xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteForToolTip, mythis.color);
        }

        if (mythis.onSelect) mythis.onSelect(mythis);

        mythis.AfficherContenue(wihoutRegeneration);

        mythis.AfficherSousOnglet(wihoutRegeneration);
    }
    /**
     * DeSelection de l'onglet
     * @param videContenue force a vidé le contenue de l'onglet
     */
    public UnSelect(videContenue?: boolean)
    {
        let mythis: xxNavOngletItem = this;
        if (mythis._isContenueAfficher || mythis.isSousOngletAfficher)
        {
            mythis.OngletEtiquette.addClass("NotSelected");
            xStyle.supprimerCouleurFond(mythis.OngletEtiquette);
            if (mythis._OngletEtiquetteForToolTip)
                xStyle.supprimerCouleurFond(mythis._OngletEtiquetteForToolTip);
        }

        mythis.CacherContenue(videContenue);

        mythis.CacherSousOnglet(videContenue);
    }

    /**
     * Permet d'afficher le contenue de l'onglet si il y en a un
     * @param wihoutRegeneration permet de ne pas regeneré le contenue si il existe deja 
     */
    public AfficherContenue(wihoutRegeneration?: boolean)
    {
        let mythis: xxNavOngletItem = this;

        // si il y a un generateur de content 
        if (mythis.GenerateContent)
        {
            if (mythis.isTreeOnglet)
            {
                mythis.SousOnglets.cacherOngletSelected();
                if (mythis._OngletEtiquetteHomeForToolTip)
                    xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color);
            }

            mythis._isContenueAfficher = true;
            afficherxElements(mythis._OngletGridItemContenu);

            // - Si le paramettre wihoutRegeneration est egale a false -> empeche de CheckNeedRegeneration
            // - Si le contenue n'est pas genere -> genere la premier fois
            if (!wihoutRegeneration || !mythis._ContenueIsGenerated)
            {
                // Test Pour si il y a besoin d'une regeneration
                mythis.CheckNeedRegeneration(mythis).then((isNeedRegeneration) =>
                {
                    if (isNeedRegeneration)
                    {
                        mythis._OngletGridItemContenu.ChangeContent(mythis.GenerateContent(mythis));
                        mythis._ContenueIsGenerated = true;
                    }
                });
            }
        }
        else
        {
            if (mythis.isTreeOnglet)
            {
                if (mythis.SousOnglets.ListOnglet.length > 0)
                {
                    if (mythis._lastSousOngletsOpen != null && mythis._lastSousOngletsOpen._isOngletAfficher.Value)
                        mythis._lastSousOngletsOpen.Select();
                    else
                        mythis.SousOnglets.ListOnglet.find((item) => { return item._isOngletAfficher.Value }).Select();
                }
            }
        }
    }

    /**
     * Permet de cacher le contenue de l'onglet si il y en a un
     * @param videContenue force a vidé le contenue de l'onglet
     */
    public CacherContenue(videContenue?: boolean)
    {
        let mythis: xxNavOngletItem = this;

        if (mythis.GenerateContent)
        {
            if (mythis.isTreeOnglet)
            {
                if (mythis._OngletEtiquetteHomeForToolTip)
                    xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color, 66, false);
            }

            mythis._isContenueAfficher = false;
            cacherxElements(mythis._OngletGridItemContenu, true);


            // on vide le Contenue uniquement si le parametre est a TRUE
            if (videContenue)
            {
                mythis._OngletGridItemContenu.ChangeContent(new xDiv({}));
                mythis._ContenueIsGenerated = false;
            }
        }
    }

    /**
    * Permet d'afficher la barre de sousOnglet si il y en a une
    * @param wihoutRegeneration permet de ne pas regeneré le contenue si il existe deja 
    */
    public AfficherSousOnglet(wihoutRegeneration?: boolean)
    {
        let mythis: xxNavOngletItem = this;
        if (mythis.isTreeOnglet)
        {
            if (!mythis.isSousOngletAfficher)
            {
                mythis.OngletEtiquette.removeClass("NotSelected");
                xStyle.setCouleurFondAvecContrasteTexteAuto(mythis.OngletEtiquette, mythis.color);
                //if (mythis.onSelect) mythis.onSelect(mythis);
            }
            mythis.SousOnglets.AfficherBarre(wihoutRegeneration);
        }
    }

    /**
     * Permet de cacher la barre de sousOnglet si il y en a une
     * @param videContenue force a vidé le contenue de l'onglet
     */
    public CacherSousOnglet(videContenue?: boolean)
    {
        let mythis: xxNavOngletItem = this;
        if (mythis.isTreeOnglet)
        {
            if (mythis.isSousOngletAfficher)
            {
                mythis.OngletEtiquette.addClass("NotSelected");
                xStyle.supprimerCouleurFond(mythis.OngletEtiquette);
            }

            mythis.SousOnglets.CacherBarre(videContenue);
        }
    }

    /**
     * Permet de afficher l'onglet
     * @param withoutHome permet dans le cas d'un sous onglet de raffiché uniquement l'onglet pour les sous-onglets et pas le home si il en a un
     * */
    public AfficherOnglet(withoutHome?: boolean)
    {
        let mythis: xxNavOngletItem = this;
        if (!mythis._isOngletAfficher.Value || !mythis._isOngletHomeAfficher)
        {
            if (mythis.isTreeOnglet)
            {
                afficherxElements(mythis._OngletEtiquette);
                if (mythis._OngletEtiquetteTooltip)
                    afficherxElements(mythis._OngletEtiquetteTooltip);
                mythis._isOngletAfficher.Value = true;

                if (!withoutHome)
                    if (mythis._OngletEtiquetteHome)
                    {
                        afficherxElements(mythis._OngletEtiquetteHome);
                        mythis.TooltipNeedRefresh = true;
                        mythis._isOngletHomeAfficher = true;
                    }
            }
            else
            {
                afficherxElements(mythis._OngletEtiquette);
                mythis._isOngletAfficher.Value = true;
            }

        }
    }

    /**
     * Permet de cacher l'onglet
     * @param force force a cacher l'onglet meme si il y a des sous onglet visible
     * */
    public CacherOnglet(force?: boolean)
    {
        let mythis: xxNavOngletItem = this;
        if (mythis._isOngletAfficher.Value || mythis._isOngletHomeAfficher)
        {
            if (mythis.isTreeOnglet)
            {
                if (force)
                {
                    cacherxElements(mythis._OngletEtiquette, true);
                    if (mythis._OngletEtiquetteTooltip)
                        cacherxElements(mythis._OngletEtiquetteTooltip, true);
                    mythis._isOngletAfficher.Value = false;
                }
                if (mythis._OngletEtiquetteHome)
                {
                    cacherxElements(mythis._OngletEtiquetteHome, true);
                    mythis.TooltipNeedRefresh = true;
                    mythis._isOngletHomeAfficher = false;
                }

            }
            else
            {
                cacherxElements(mythis._OngletEtiquette, true);
                mythis._isOngletAfficher.Value = false;

            }

        }
    }

    //#endregion "Methode d'interaction"

    public SupprimerOnglet()
    {
        let mythis: xxNavOngletItem = this;
        mythis._OngletGridItemContenu.y.remove();
        mythis._OngletEtiquette.y.remove();
        if (mythis._OngletEtiquetteForToolTip)
            mythis._OngletEtiquetteForToolTip.y.remove();
        if (mythis._OngletEtiquetteTooltip)
            mythis._OngletEtiquetteTooltip.y.remove();
        if (mythis._OngletEtiquetteHome)
            mythis._OngletEtiquetteHome.y.remove();
        if (mythis._OngletEtiquetteHomeForToolTip)
            mythis._OngletEtiquetteHomeForToolTip.y.remove();
        mythis.TooltipNeedRefresh = true;
        if (mythis.SousOnglets)
        {
            mythis.SousOnglets.SupprimerAllOnglet();
        }
    }

    // --- private --- //
    private CreateOngletEtiquetteForToolTip(cbHideTooltip: () => void): xxContainerEvent
    {
        let mythis: xxNavOngletItem = this;
        mythis._OngletEtiquetteForToolTip = new xxContainerEvent({
            id: (!!mythis.id ? "xxNavOngletBar_GridTooltip_item_" + mythis.id : null),
            class: "xxNavOngletBar_GridTooltip_item " + (mythis._haveFlagHasContenu.Value ? xxNavOngletItem.CLASS_FlagHasContenu + " " : "") + (!!mythis._class ? mythis._class : ""),
            initContent: new xxLabel({
                textVariable: mythis.OngletName,
                centrer: true,
                lineBreak: false,
            }),
            stopPropagation: true,
            onMouseOver: () =>
            {
                if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                    xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteForToolTip, mythis.color);
            },
            onMouseOut: () =>
            {
                if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                    xStyle.supprimerCouleurFond(mythis._OngletEtiquetteForToolTip);
            },
            onClick: (cb) =>
            {
                cb();
                mythis.Select();
                cbHideTooltip();
            }
        });
        mythis._OngletEtiquetteForToolTip.asHolder.append(mythis.CreateFlagHasContenu());
        mythis._OngletEtiquetteForToolTip.asHolder.append(mythis.CreateFlagSousOngletHasContenu());
        if (mythis._isContenueAfficher || mythis.isSousOngletAfficher)
            xStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteForToolTip, mythis.color);
        xStyle.setCouleurBorder(mythis._OngletEtiquetteForToolTip, mythis.color, enumCote.bas, false);
        return mythis._OngletEtiquetteForToolTip
    }

    private CreateFlagHasContenu(): xDiv
    {
        return new xDiv({
            class: "xxNavOngletBar_FlagHasContenu",
            title: xxNavOngletItem.TITLE_FlagHasContenu
        });
    }

    private CreateFlagSousOngletHasContenu(): xDiv
    {
        return new xDiv({
            class: "xxNavOngletBar_FlagSousOngletHasContenu",
            title: xxNavOngletItem.TITLE_FlagSousOngletHasContenu
        });
    }

    private setFlagSousOngletHasContenu(valeur: boolean)
    {
        let mythis: xxNavOngletItem = this;
        if (!mythis._haveFlagHasContenu.Value && valeur)
        {
            mythis._OngletEtiquette.addClass(xxNavOngletItem.CLASS_FlagSousOngletHasContenu);
            if (mythis._OngletEtiquetteTooltip)
                mythis._OngletEtiquetteTooltip.addClass(xxNavOngletItem.CLASS_FlagSousOngletHasContenu);
        }
        else if(!valeur)
        {
            mythis._OngletEtiquette.removeClass(xxNavOngletItem.CLASS_FlagSousOngletHasContenu);
            if (mythis._OngletEtiquetteTooltip)
                mythis._OngletEtiquetteTooltip.removeClass(xxNavOngletItem.CLASS_FlagSousOngletHasContenu);
        }
    }

    private testIsTree(Options: OptionsxxNavOngletItem): Options is OptionsxxNavOngletItemTree
    {
        return "SousOnglet" in Options;
    }
    private testIsUniqueItem(Options: OptionsxxNavOngletItem): Options is OptionsxxNavOngletItemUnique
    {
        return "GenerateContent" in Options && !("SousOnglet" in Options);
    }
}

export class xxNavOngletBar implements iXElement
{
    // --------- //
    // Propertie //
    // --------- //
  
    public get y(): HTMLElement { return this._gridOnglet.y; }

    // Data Affichage
    public get isAfficher(): boolean { return this._isAfficher; }

    public get ListOnglet(): xxNavOngletItem[] { return this.listeOngletItem.slice(0, this.listeOngletItem.length); }

    // --------- //
    // attributs //
    // --------- //
    private isError: boolean = false;
    // Options
    private OnOngletChange: (OngleSelect: xxNavOngletItem) => void;
    private WithSousOngletTooltip: boolean;


    // Data
    private OngletMaster: xxNavOngletItem;

    private _gridOnglet: xxGrid;
    private listeOngletItem: xxNavOngletItem[] = [];
    private listeGridxxNavOngletBar: xxGridItem[] = [];
    private SelectedOngletItem: xxNavOngletItem;

    // Conteneur
    private GridForAddContent: xxGrid;
    private GridItemContentOption:
    {
        colStart: number;
        nbCols: number;
        rowStart: number;
        nbRows: number;
        };

    // Data Affichage
    private _isAfficher: boolean = true;
    private _SousOngleIsAfficher: boolean = true;

    // xStyle
    private Style: xStyle;

    // ----------- //
    // Constructor //
    // ----------- //
    public constructor(Options : OptionsxxNavOngletBar)
    {
        let mythis: xxNavOngletBar = this;
        // ---- Recuperation des options ---- //
        if (Options.Style)
            mythis.Style = Options.Style;
        else
            mythis.Style = new xStyle();

        mythis.OnOngletChange = () => { };
        if (Options.OnOngletChange)
            mythis.OnOngletChange = Options.OnOngletChange;

        if (Options.OngletMaster)
            mythis.OngletMaster = Options.OngletMaster;

        if (Options.WithSousOngletTooltip)
            mythis.WithSousOngletTooltip = Options.WithSousOngletTooltip;


        mythis.GridForAddContent = Options.GridForAddContent;
        if (!mythis.GridForAddContent)
        {
            console.error("xxNavOngletBar - GridForAddContent is undefined!");
            mythis.isError = true;
        }

        mythis.GridItemContentOption = Options.GridItemContentOption;

        // ----- init Onglet barre ------ //
        mythis._gridOnglet = new xxGrid({
            class: (!mythis.OngletMaster ? "xxNavOngletBar_GridOngletPrincipale" : "xxNavOngletBar_GridOngletSecondaire") + " xxNavOngletBar " + (!!Options.class ? Options.class:""),
            colonnes: ["Auto", "1fr"],
            fullHeight: true,
            fullWidth: true,
            gridGap: "0px"
        });

        if (mythis.OngletMaster)
        {
            // color border
            xStyle.setCouleurBorder(mythis._gridOnglet, mythis.OngletMaster.color, enumCote.gauche,false);
            mythis.CacherBarre();

            // ---- generate bouton home ---- //
            if (mythis.OngletMaster.haveContent)
            {
                let etiquetteGridHomeTemp: xxGridItem = new xxGridItem({
                    class: "xxNavOngletBar_GridItem_barHome xxNavOngletBar_GridItem_barHome_Fleche_" + mythis.OngletMaster.color+"  "+ (!!Options.class ? Options.class : ""),
                    colStart: 1, nbCols: 1,
                    rowStart: 1, nbRows: 1,
                    content: mythis.OngletMaster.OngletEtiquetteHome
                });
                mythis.Style.AddCss(".xxNavOngletBar_GridItem_barHome_Fleche_" + mythis.OngletMaster.color + ":after", "background-color: #" + mythis.OngletMaster.color + "; border-left-color: #" + mythis.OngletMaster.color +";");
                mythis._gridOnglet.append([
                  etiquetteGridHomeTemp
                ]);
            }
        }

        // Creation de la fleche
        if (Options.CanReduireSousOnglet && Options.OngletMaster == null)
        {
            let chevronReduire = new xxCheckBox({
                class: (mythis._SousOngleIsAfficher ? "xxNavOngletBar_GridItem_FlecheReduction_ChevronUP":""),
                titleLocalise: "Afficher/Cacher les sousOnglets",
                AffichageBoutonWapper2: {
                    tailleBouton: enumTailleBouton.Fit,
                    margin: { Tous: 0 },
                },
                IconeBoutonWapper2: new IconeSvg(enumIconeSvg.chevron_bas, { taille: tailleIcone.XS }),
                typeCheckbox: enumTypeCheckbox.xxBouton,
                value: mythis._SousOngleIsAfficher,
                ValueChange: (val) =>
                {
                    mythis._SousOngleIsAfficher = val;
                    if (mythis._SousOngleIsAfficher)
                        chevronReduire.addClass("xxNavOngletBar_GridItem_FlecheReduction_ChevronUP");
                    else
                        chevronReduire.removeClass("xxNavOngletBar_GridItem_FlecheReduction_ChevronUP");

                    if (mythis.listeGridxxNavOngletBar?.length > 0)
                        mythis.listeGridxxNavOngletBar.forEach((item) =>
                        {
                            if (mythis._SousOngleIsAfficher)
                            {
                                afficherxElements(item);
                                setTimeout(() =>
                                {
                                    item.removeClass("xxNavOngletBar_Cacher");
                                }, 20);
                            }
                            else
                            {
                                item.addClass("xxNavOngletBar_Cacher");
                                item.y.addEventListener('transitionend', function (e)
                                {
                                    if (!mythis._SousOngleIsAfficher)
                                        cacherxElements(item, true);
                                }, {
                                    capture: false,
                                    once: true,
                                    passive: false
                                });
                            }
                        });
                }
            });
            mythis._gridOnglet.append([new xxGridItem({
                class: "xxNavOngletBar_GridItem_FlecheReduction",
                colStart: 1, nbCols: 1,
                rowStart: 1, nbRows: 2,
                optionsAffichage: {
                    alignementContenu: enumAlignementContenu.CentreCentre,
                    padding: { Droite: 5 },
                },
                content: chevronReduire
            })]);
        }

        // ----- init onglet liste ------//
        if (Options.initOnglets)
        {
            Options.initOnglets.forEach((item) =>
            {
                mythis.AjouteOnglet(item);
            });
        }
    }

    // -------- //
    // Methodes //
    // -------- //
    public AjouteOnglet(onglet: OptionsxxNavOngletItem)
    {
        let mythis: xxNavOngletBar = this;
        if (!mythis.isError)
            if (onglet != null)
                mythis.generateonglet(onglet);
    }

    public cacherOngletSelected(videContenue?: boolean)
    {
        let mythis: xxNavOngletBar = this;
        if (mythis.SelectedOngletItem)
        {
            mythis.SelectedOngletItem.UnSelect(videContenue);
            mythis.SelectedOngletItem = null;
        }
    }

    /**
      * Pemet d'afficher la barre d'onglet
      * @param wihoutRegeneration permet de ne pas regeneré le contenue si il existe deja 
      */
    public AfficherBarre(wihoutRegeneration?: boolean)
    {
        let mythis: xxNavOngletBar = this;
        if (!mythis._isAfficher)
        {
            mythis._isAfficher = true;
            afficherxElements(mythis._gridOnglet);
        }
    }

    /**
     * Pemet de cacher la bar et force les onglets a ce cacher
     * @param videContenue force a vidé le contenue de l'onglet
     */
    public CacherBarre(videContenue?: boolean)
    {
        let mythis: xxNavOngletBar = this;
        if (mythis._isAfficher)
        {
            mythis._isAfficher = false;
            cacherxElements(mythis._gridOnglet, true);
            mythis.cacherOngletSelected(videContenue);

            if (mythis.OngletMaster)
                mythis.OngletMaster.CacherContenue(videContenue);
        }
    }

    public SupprimerAllOnglet()
    {
        let mythis: xxNavOngletBar = this;
        mythis.listeOngletItem.forEach((item) =>
        {
            item.SupprimerOnglet();
        });
    }

    // private
    private getRealOngletsSelect(onglet: xxNavOngletItem): xxNavOngletItem
    {
        let mythis: xxNavOngletBar = this;
        if (onglet.isTreeOnglet)
        {
            if (onglet.SousOnglets.SelectedOngletItem)
                return mythis.getRealOngletsSelect(onglet.SousOnglets.SelectedOngletItem)
        }
        return onglet;
    }

    private generateonglet(onglet: OptionsxxNavOngletItem)
    {
        let mythis: xxNavOngletBar = this;
        let toSender: xxNavOngletItem;
        onglet = assignerObjet(({} as any), onglet);
        // On ne veux pas des #
        if (!!onglet.color)
        {
            onglet.color = onglet.color.replace("#", "");
            if (xStyle.getLuminositeCouleurHexa(onglet.color) > 200)
            {
                onglet.color = xStyle.AssombrissementCouleurHex(onglet.color, 25);
            }
        }

        // on surchage la select d'un onglet
        let onSelectUser = onglet.onSelect;
        onglet.onSelect = (ongletItem: xxNavOngletItem) =>
        {
            if (mythis.SelectedOngletItem != ongletItem)
            {
                if (mythis.SelectedOngletItem != null)
                    mythis.SelectedOngletItem.UnSelect();

                mythis.SelectedOngletItem = ongletItem;

                if (mythis.OnOngletChange)
                    mythis.OnOngletChange(mythis.getRealOngletsSelect(ongletItem));
            }

            if (mythis.OngletMaster)
            {
                if (mythis.OngletMaster.isContenueAfficher)
                    mythis.OngletMaster.CacherContenue();

                if (!mythis.OngletMaster.isSousOngletAfficher)
                    mythis.OngletMaster.AfficherSousOnglet();
            }

            if (onSelectUser)
                onSelectUser(ongletItem);

            mythis.ActualiseGridTemplateOngle();
        };

        // si on est dans un sous onglet, on eclaicie les couleurs des sous onglet pour avoir une tainte de differensation
        if (mythis.OngletMaster && !onglet.color)
            onglet.color = xStyle.EclaicirCouleurHex(mythis.OngletMaster.color, 33);
        else if (mythis.OngletMaster && onglet.color)
            onglet.color = xStyle.EclaicirCouleurHex(onglet.color, 15);

        // creation de l'onglet et ajoute a la barre
        let etiquetteGridTemp: xxGridItem;
        let tempoGriditem: xxGridItem;
        let ongletItem = new xxNavOngletItem(onglet, mythis.GridItemContentOption, mythis.GridForAddContent, mythis.WithSousOngletTooltip, mythis.Style, () =>
        {
            etiquetteGridTemp.y.remove();
            if (tempoGriditem)
            {
                mythis.listeGridxxNavOngletBar.splice(mythis.listeGridxxNavOngletBar.indexOf(tempoGriditem), 1);
                tempoGriditem.y.remove();
            }

            mythis.ActualiseGridTemplateOngle();
        });
        mythis.listeOngletItem.push(ongletItem);

        // Grid Etiquette
        etiquetteGridTemp = new xxGridItem({
            class: "xxNavOngletBar_GridItem_ongletItem " + (mythis.OngletMaster && mythis.listeOngletItem.length <= 1 ? "xxNavOngletBar_GridItem_ongletItem_firstWithHome":"" ),
            colStart: mythis.listeOngletItem.length + 1, nbCols: 1,
            rowStart: 1, nbRows: 1,
            content: ongletItem.OngletEtiquette
        });
        if (mythis.OngletMaster && !!mythis.OngletMaster.color)
        {

            let couleurClaire = xStyle.EclaicirCouleurHex(mythis.OngletMaster.color, 66);
            let classCouleurDegrade: string = "xxNavOngletBar_GridItem_ongletItem_couleurDegrade_" + couleurClaire;
            mythis.Style.AddCss("." + classCouleurDegrade + " > .xxNavOngletBar_ongletItem.NotSelected:after", "color:#" + couleurClaire + ";");
            mythis.Style.AddCss("." + classCouleurDegrade + " > .xxTooltip.xxNavOngletBar_ongletItem_ToolTip.NotSelected > .xxTooltip_Contenu:after", "color:#" + couleurClaire + ";");
            etiquetteGridTemp.addClass(classCouleurDegrade);

            xStyle.setCouleurFondAvecContrasteTexteAuto(etiquetteGridTemp, couleurClaire,null, false, false);
        }

        mythis._gridOnglet.append([
            etiquetteGridTemp
        ]);

        if (mythis.listeGridxxNavOngletBar.length > 0)
            mythis.listeGridxxNavOngletBar.forEach((item) => { item.changeColsProperties((mythis.OngletMaster != null ? 1 : 2), mythis.listeOngletItem.length + (mythis.OngletMaster != null ? 2 : 1)); });

        if (ongletItem.isTreeOnglet)
        {
            let tempoGriditem: xxGridItem = new xxGridItem({
                class: "xxNavOngletBar_GridItem_SousOnglet",
                colStart: (mythis.OngletMaster != null ? 1 : 2), nbCols: mythis.listeOngletItem.length + (mythis.OngletMaster != null ? 2 : 1),
                rowStart: 2, nbRows: 1,
                content: ongletItem.SousOnglets
            });
            if (!mythis._SousOngleIsAfficher)
                cacherxElements(tempoGriditem,true);
            mythis.listeGridxxNavOngletBar.push(tempoGriditem);
            mythis._gridOnglet.append([tempoGriditem]);
        }

        mythis.ActualiseGridTemplateOngle();
        return toSender;
    }

    private ActualiseGridTemplateOngle()
    {
        let mythis: xxNavOngletBar = this;
        let indexOngletSelect: number = -1;
        if (mythis.SelectedOngletItem)
            indexOngletSelect = mythis.listeOngletItem.indexOf(mythis.SelectedOngletItem);

        let TemplateColumns: string = "auto ";

        if (indexOngletSelect >= 0)
        {
            if (indexOngletSelect == 0)
                TemplateColumns += "max-content repeat(" + (mythis.listeOngletItem.length - 1) + ", minmax(0px, min-content)) ";
            else if (indexOngletSelect == (mythis.listeOngletItem.length - 1))
                TemplateColumns += "repeat(" + (mythis.listeOngletItem.length - 1) + ", minmax(0px, min - content)) max-content ";
            else
            {
                TemplateColumns += "repeat(" + indexOngletSelect + ", minmax(0px, min-content)) max-content repeat(" + (mythis.listeOngletItem.length - (indexOngletSelect + 1)) + ", minmax(0px, min-content))";
            }
        }
        else
        {
            TemplateColumns += "repeat(" + mythis.listeOngletItem.length + ", minmax(0px, min-content)) ";
        }

        TemplateColumns += "1fr";

        mythis._gridOnglet.y.style.gridTemplateColumns = TemplateColumns;
    }
}

export class xxNavOngletControl implements iXElement
{
    // --------- //
    // Propertie //
    // --------- //
 
    public get y(): HTMLElement { return this.gridPrincipale.y; }

    // --------- //
    // attributs //
    // --------- //
    // Option


    // Data
    private OngletPrincipaleBar: xxNavOngletBar;

    // Conteneur 
    private gridPrincipale: xxGrid;

    // Zone
    private zoneAvantOnglet: xxGridItem;
    private ZoneApresOnglet: xxGridItem;


    // ----------- //
    // Constructor //
    // ----------- //
    public constructor(Options:OptionsxxNavOngletControl)
    {
        let mythis: xxNavOngletControl = this;

        // ---- Init ---- //
        mythis.gridPrincipale = new xxGrid({
            class: "xxNavOngletControl xxNavOngletControl_GridPrincipale",
            lignes: /*GANON - Options.WithHistoriqueBar*/ false ? ["auto", "1fr", "40px"] : ["auto","1fr"],
            colonnes:["auto","1fr","auto"],
            fullHeight: true,
            fullWidth: true,
            gridGap:"0px"
        });

        // Init ZoneAvantOnglet
        mythis.zoneAvantOnglet = new xxGridItem({
            colStart: 1, nbCols: 1,
            rowStart: 1, nbRows: 1,
            optionsAffichage: {
                alignementContenu: enumAlignementContenu.CentreCentre
            },
            class: "xxNavOngletControl_GridItem_ZoneAvantOnglet",
            content: Options.initZoneAvantOnglet ?? new xDiv({}) // Si pas de init on met un DivPlaceholder
        });
        mythis.gridPrincipale.append([mythis.zoneAvantOnglet]);

        // Init ZoneApresOnglet
        mythis.ZoneApresOnglet = new xxGridItem({
            colStart: 3, nbCols: 1,
            rowStart: 1, nbRows: 1,
            optionsAffichage: {
                alignementContenu: enumAlignementContenu.CentreCentre
            },
            class: "xxNavOngletControl_GridItem_ZoneApresOnglet",
            content: Options.initZoneApresOnglet ?? new xDiv({}) // Si pas de init on met un DivPlaceholder
        });
        mythis.gridPrincipale.append([mythis.ZoneApresOnglet]);

        // Init Onglet bar Principale
        mythis.OngletPrincipaleBar = new xxNavOngletBar({
            OnOngletChange: Options.OnOngletChange,
            initOnglets: Options.initOnglets,
            WithSousOngletTooltip: Options.WithSousOngletTooltip,
            CanReduireSousOnglet: Options.CanReduireSousOnglet,
            GridForAddContent: mythis.gridPrincipale,
            GridItemContentOption: {
                colStart: 1, nbCols: 3,
                rowStart: 2, nbRows: 1,
            }
        });
        
        mythis.gridPrincipale.append([
            new xxGridItem({
                colStart: 2, nbCols: 1,
                rowStart: 1, nbRows: 1,
                class: "xxNavOngletControl_GridItem_GridOngletPrincipale",
                content: mythis.OngletPrincipaleBar,
            })
        ]);
    }

    // -------- //
    // Methodes //
    // -------- //

    /**
     * Permet d'ajoute une ongletUnique on un OnletTree 
     * @param onglet
     */
    public AjouteOnglet(onglet: OptionsxxNavOngletItem)
    {
        let mythis: xxNavOngletControl = this;

        if (onglet != null)
        {
            mythis.OngletPrincipaleBar.AjouteOnglet(onglet);
        }
    }

    /**
     * Pemet de changer le contenu de la zone avant Onglet, /!\ Attention cela supprime l'ancien contenu /!\
     * @param i
     */
    public ChangeContentZoneAvantOnglet(i: iXElement): xxNavOngletControl
    {
        let mythis: xxNavOngletControl = this;
        mythis.zoneAvantOnglet.ChangeContent(i);
        return mythis;
    }

    /**
     * Pemet de changer le contenu de la zone apres Onglet, /!\ Attention cela supprime l'ancien contenu /!\
     * @param i
     */
    public ChangeContentZoneApresOnglet(i: iXElement): xxNavOngletControl
    {
        let mythis: xxNavOngletControl = this;
        mythis.ZoneApresOnglet.ChangeContent(i);
        return mythis;
    }
  
}