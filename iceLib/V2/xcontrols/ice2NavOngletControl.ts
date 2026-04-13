// @ts-nocheck
import { iceLString } from '../iceLString';
import { iXElement, iXElementHolder, enumVisibility, enumPosition, enumCote } from '../iceBase';
import { assignerObjet, affichericeElements, cachericeElements } from '../../iceStaticFunctions';
import { iceStyle } from './iceStyle';
import { BindableObject } from './BindableObject';
import { iceDiv } from './iceDiv';
import { ice2ContainerEvent } from './ice2ContainerEvent';
import { ice2Label, enumTypeLabel } from './ice2Label';
import { ice2ToolTip, enumXxToolTipPositionWidth } from './ice2ToolTip';
import { ice2Grid, ice2GridItem, enumAlignementContenu } from './ice2Grid';
import { ice2CheckBox, enumTypeCheckbox } from './ice2CheckBox';
import { Icone, enumIconeSvg, IconeSvg, tailleIcone } from '../iceIcones';
import { enumTailleBouton } from './ice2Bouton';
﻿interface Optionsice2NavOngletControl
{
    id?: string;
    class?: string;
    WithSousOngletTooltip?: boolean;
    CanReduireSousOnglet?: boolean;

    // Init
    initOnglets?: Optionsice2NavOngletItem[];
    initZoneAvantOnglet?: iXElement;
    initZoneApresOnglet?: iXElement;

    // Event
    OnOngletChange?: (OngletSelect: ice2NavOngletItem) => void;
}

interface Optionsice2NavOngletItemBase
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

    CheckNeedRegeneration?: (ongletItem: ice2NavOngletItem) => Promise<boolean>;
    ForGetXxNavOngletItem?: (thisItem: ice2NavOngletItem) => void;

    // Event
    onSelect?: (ongletItem: ice2NavOngletItem) => void;
}

interface Optionsice2NavOngletItemUnique extends Optionsice2NavOngletItemBase
{
    GenerateContent: (thisOnglet: ice2NavOngletItem) => iXElement;
}

interface Optionsice2NavOngletItemTree extends Optionsice2NavOngletItemBase
{
    GenerateContent?: (thisOnglet: ice2NavOngletItem) => iXElement; // dans se cas la c'est l'onglet home
    SousOnglet: Optionsice2NavOngletItem[];
}

type Optionsice2NavOngletItem = Optionsice2NavOngletItemUnique | Optionsice2NavOngletItemTree;

interface Optionsice2NavOngletBar
{
    id?: string;
    class?: string;
    Style?: iceStyle;
    GridForAddContent: ice2Grid;
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
    OngletMaster?: ice2NavOngletItem;
    initOnglets?: Optionsice2NavOngletItem[];

    // Event
    OnOngletChange?: (OngletSelect: ice2NavOngletItem) => void;// Ganon
}

export class ice2NavOngletItem
{
    // --------- //
    // Constante //
    // --------- //
    private static readonly CLASS_FlagHasContenu = "FlagHasContenu";
    private static readonly CLASS_FlagSousOngletHasContenu = "FlagSousOngletHasContenu";
    private static readonly TITLE_FlagHasContenu = new iceLString("Onglet avec du contenu").text;
    private static readonly TITLE_FlagSousOngletHasContenu = new iceLString("Contient un ou plusieurs sous-onglet avec du contenu").text;

    // --------- //
    // Propertie //
    // --------- //
     // Contenue
    public get OngletEtiquette(): ice2ContainerEvent | ice2ToolTip { return this._OngletEtiquetteTooltip ?? this._OngletEtiquette; }
    public get OngletEtiquetteHome(): ice2ContainerEvent { return this._OngletEtiquetteHome; }
    public get SousOnglets(): ice2NavOngletBar { return this._SousOnglets; }

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
    private GenerateContent: (thisOnglet: ice2NavOngletItem) => iXElement;
    private onSelect: (OngleSelect: ice2NavOngletItem) => void;
    private OnSupprimer: () => void;
    private _OngletName: string;
    private _id: string;
    private _class: string;

    // Contenue
    private _OngletEtiquette: ice2ContainerEvent;
    private _OngletEtiquetteForToolTip: ice2ContainerEvent;
    private _OngletEtiquetteTooltip: ice2ToolTip;
    private _OngletEtiquetteHome: ice2ContainerEvent;
    private _OngletEtiquetteHomeForToolTip: ice2ContainerEvent;
    private _OngletGridItemContenu: ice2GridItem;
    private _SousOnglets: ice2NavOngletBar;
    private _lastSousOngletsOpen: ice2NavOngletItem;

    // Data Affichage
    private _haveFlagHasContenu: BindableObject<boolean>;
    private _isContenueAfficher: boolean = false;
    private _isOngletAfficher: BindableObject<boolean> = new BindableObject<boolean>(true);
    private _isOngletHomeAfficher: boolean = true;
    private _ContenueIsGenerated: boolean = false;
    private TooltipNeedRefresh: boolean = true;

    // autre
    private CheckNeedRegeneration: (ongletItem: ice2NavOngletItem) => Promise<boolean>;

    // ----------- //
    // Constructor //
    // ----------- //
    public constructor(Options: Optionsice2NavOngletItem, GridItemContentOption: { colStart: number, nbCols: number, rowStart: number, nbRows: number }, GridForAddContent: ice2Grid, WithSousOngletTooltip: boolean, style: iceStyle,OnSupprimer:()=>void)
    {
        let mythis: ice2NavOngletItem = this;

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
            mythis._OngletName = new iceLString(Options.textLocalise).text;
        else if (!!Options.textVariable)
            mythis._OngletName = Options.textVariable;
        if (!mythis._OngletName)
            mythis._OngletName = new iceLString("Aucun nom").text;

        mythis.CheckNeedRegeneration = async () => { return !mythis._ContenueIsGenerated; };
        if (Options.CheckNeedRegeneration != null)
            mythis.CheckNeedRegeneration = async (item) => { return !mythis._ContenueIsGenerated || await Options.CheckNeedRegeneration(item); };  

        let classCouleurDegradeSurvol: string = "ice2NavOngletBar_ongletItem_couleurDegrade_" + mythis.color;
        style.AddCss(".NotSelected." + classCouleurDegradeSurvol + ":after", "color:#" + mythis.color + "!important;");
        style.AddCss(".NotSelected." + classCouleurDegradeSurvol + " > .ice2Tooltip_Contenu:after", "color:#" + mythis.color + "!important;");

        let classTemp = (mythis._haveFlagHasContenu.Value ? ice2NavOngletItem.CLASS_FlagHasContenu + " " : "") + (!!Options.class ? Options.class : "");

        // Init Etiquette
        mythis._OngletEtiquette = new ice2ContainerEvent({
            id: (!!Options.id ? "ice2NavOngletBar_ongletItem_" + Options.id : null),
            class: "ice2NavOngletBar_ongletItem NotSelected " + classTemp,
            titleVariable: mythis._OngletName,
            initContent: new ice2Label({
                textVariable: mythis._OngletName,
                lineBreak: false,
            }),
            stopPropagation: true,
            onMouseOver: () =>
            {
                if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                    iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquette, mythis.color);
                mythis._OngletEtiquette.addClass(classCouleurDegradeSurvol);
            },
            onMouseOut: () =>
            {
                if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                    iceStyle.supprimerCouleurFond(mythis._OngletEtiquette);
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
        iceStyle.setCouleurBorder(mythis._OngletEtiquette, mythis.color, enumCote.bas,false);

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
                mythis._OngletEtiquetteHome = new ice2ContainerEvent({
                    id: (!!Options.id ? "ice2NavOngletBar_barHome_" + Options.id : null),
                    class: "ice2NavOngletBar_barHome " + classTemp,
                    initContent: new ice2Label({
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
                iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHome, mythis.color);
                iceStyle.setCouleurBorder(mythis._OngletEtiquetteHome, mythis.color, enumCote.bas,false);
            }

            if (WithSousOngletTooltip)
            {
                mythis._OngletEtiquetteTooltip = new ice2ToolTip({
                    id: (!!Options.id ? "ice2NavOngletBar_ongletItem_ToolTip_" + Options.id : null),
                    class: "ice2NavOngletBar ice2NavOngletBar_ongletItem_ToolTip NotSelected " + classTemp,
                    titleVariable: mythis._OngletName,
                    initContent: new ice2Label({
                        textVariable: mythis._OngletName,
                        lineBreak: false,
                    }),
                    WithoutFleche: true,
                    ToolTipPositionWidthNeverCenter: true,
                    ToolTipPositionWidthSouhaite: enumXxToolTipPositionWidth.droite,
                    onHide: (thistooltip) =>
                    {
                        if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                            iceStyle.supprimerCouleurFond(thistooltip);
                        mythis._OngletEtiquetteTooltip.removeClass(classCouleurDegradeSurvol);
                        
                    },
                    onShow: (thistooltip) =>
                    {
                        if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                            iceStyle.setCouleurFondAvecContrasteTexteAuto(thistooltip, mythis.color);
                        mythis._OngletEtiquetteTooltip.addClass(classCouleurDegradeSurvol);

                        if (mythis.TooltipNeedRefresh)
                        {
                            mythis.TooltipNeedRefresh = false;
                            thistooltip.viderTooltip()

                            // generation de la grid tooltip
                            let grid: ice2Grid = new ice2Grid({
                                class: "ice2NavOngletBar_GridTooltip",
                                colonnes_auto: "1fr",
                                fullHeight: true,
                                fullWidth: true,
                                gridGap: "0px"
                            });
                            // Couleur de la bordure Gauche
                            iceStyle.setCouleurBorder(grid, mythis.color, enumCote.gauche,false);

                            // Creation de tous les boutons des sousOnglets
                            let i = 1, j = 1;

                            if (Options.GenerateContent && mythis._isOngletHomeAfficher)
                            {
                                mythis._OngletEtiquetteHomeForToolTip = new ice2ContainerEvent({
                                    id: (!!Options.id ? "ice2NavOngletBar_GridTooltip_item_" + mythis.id : null),
                                    class: "ice2NavOngletBar_GridTooltip_item_home " + classTemp,
                                    initContent: new ice2Label({
                                        textVariable: mythis._OngletName,
                                        lineBreak: false,
                                        centrer:true
                                    }), 
                                    stopPropagation: true,
                                    onMouseOver: () =>
                                    {
                                        if (!mythis.isContenueAfficher)
                                            iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color);
                                    },
                                    onMouseOut: () =>
                                    {
                                        if (!mythis.isContenueAfficher)
                                            iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color, 66, false);
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
                                    iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color);
                                else
                                    iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color, 66, false);
                                iceStyle.setCouleurBorder(mythis._OngletEtiquetteHomeForToolTip, mythis.color, enumCote.bas,false);
                                iceStyle.setCouleurBorder(mythis._OngletEtiquetteHomeForToolTip, mythis.color, enumCote.droite, false);
                                grid.append([new ice2GridItem({
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
                                    let gridItemTemp: ice2GridItem = new ice2GridItem({
                                        colStart: i++, nbCols: 1, rowStart: j, nbRows: 1,
                                        content: item.CreateOngletEtiquetteForToolTip(() => { mythis._OngletEtiquetteTooltip.HideTooltip(); })
                                    });

                                    // color 
                                    iceStyle.setCouleurFondAvecContrasteTexteAuto(gridItemTemp, mythis.color, 66, false, false);
                                    iceStyle.setCouleurBorder(gridItemTemp, mythis.color, enumCote.droite,false);
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
                iceStyle.setCouleurBorder(mythis._OngletEtiquetteTooltip, mythis.color, enumCote.bas,false);
            }

            mythis._SousOnglets = new ice2NavOngletBar({
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
            mythis._OngletGridItemContenu = new ice2GridItem({
                id: (!!Options.id ? "ice2NavOngletBar_GridItem_ongletContenu_" + Options.id : null),
                class: "ice2NavOngletBar_GridItem_ongletContenu " + (!!Options.class ? Options.class : ""),
                colStart: GridItemContentOption.colStart, nbCols: GridItemContentOption.nbCols,
                rowStart: GridItemContentOption.rowStart, nbRows: GridItemContentOption.nbRows,
                content: new iceDiv({})
            });
            cachericeElements(mythis._OngletGridItemContenu, true);
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
        let mythis: ice2NavOngletItem = this;
        mythis._haveFlagHasContenu.Value = valeur;
        if (mythis._haveFlagHasContenu.Value)
        {
            mythis._OngletEtiquette.addClass(ice2NavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteForToolTip)
                mythis._OngletEtiquetteForToolTip.addClass(ice2NavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteTooltip)
                mythis._OngletEtiquetteTooltip.addClass(ice2NavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteHome)
                mythis._OngletEtiquetteHome.addClass(ice2NavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteHomeForToolTip)
                mythis._OngletEtiquetteHomeForToolTip.addClass(ice2NavOngletItem.CLASS_FlagHasContenu);
        }
        else
        {
            mythis._OngletEtiquette.removeClass(ice2NavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteForToolTip)
                mythis._OngletEtiquetteForToolTip.removeClass(ice2NavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteTooltip)
                mythis._OngletEtiquetteTooltip.removeClass(ice2NavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteHome)
                mythis._OngletEtiquetteHome.removeClass(ice2NavOngletItem.CLASS_FlagHasContenu);
            if (mythis._OngletEtiquetteHomeForToolTip)
                mythis._OngletEtiquetteHomeForToolTip.removeClass(ice2NavOngletItem.CLASS_FlagHasContenu);
        }
    }

    /**
    * Selection de l'onglet
    * @param wihoutRegeneration permet de ne pas regeneré le contenue si il existe deja 
    */
    public Select(wihoutRegeneration?: boolean)
    {
        let mythis: ice2NavOngletItem = this;
        if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
        {
            mythis.OngletEtiquette.removeClass("NotSelected");
            iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis.OngletEtiquette, mythis.color);
            if (mythis._OngletEtiquetteForToolTip)
                iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteForToolTip, mythis.color);
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
        let mythis: ice2NavOngletItem = this;
        if (mythis._isContenueAfficher || mythis.isSousOngletAfficher)
        {
            mythis.OngletEtiquette.addClass("NotSelected");
            iceStyle.supprimerCouleurFond(mythis.OngletEtiquette);
            if (mythis._OngletEtiquetteForToolTip)
                iceStyle.supprimerCouleurFond(mythis._OngletEtiquetteForToolTip);
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
        let mythis: ice2NavOngletItem = this;

        // si il y a un generateur de content 
        if (mythis.GenerateContent)
        {
            if (mythis.isTreeOnglet)
            {
                mythis.SousOnglets.cacherOngletSelected();
                if (mythis._OngletEtiquetteHomeForToolTip)
                    iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color);
            }

            mythis._isContenueAfficher = true;
            affichericeElements(mythis._OngletGridItemContenu);

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
        let mythis: ice2NavOngletItem = this;

        if (mythis.GenerateContent)
        {
            if (mythis.isTreeOnglet)
            {
                if (mythis._OngletEtiquetteHomeForToolTip)
                    iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteHomeForToolTip, mythis.color, 66, false);
            }

            mythis._isContenueAfficher = false;
            cachericeElements(mythis._OngletGridItemContenu, true);


            // on vide le Contenue uniquement si le parametre est a TRUE
            if (videContenue)
            {
                mythis._OngletGridItemContenu.ChangeContent(new iceDiv({}));
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
        let mythis: ice2NavOngletItem = this;
        if (mythis.isTreeOnglet)
        {
            if (!mythis.isSousOngletAfficher)
            {
                mythis.OngletEtiquette.removeClass("NotSelected");
                iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis.OngletEtiquette, mythis.color);
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
        let mythis: ice2NavOngletItem = this;
        if (mythis.isTreeOnglet)
        {
            if (mythis.isSousOngletAfficher)
            {
                mythis.OngletEtiquette.addClass("NotSelected");
                iceStyle.supprimerCouleurFond(mythis.OngletEtiquette);
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
        let mythis: ice2NavOngletItem = this;
        if (!mythis._isOngletAfficher.Value || !mythis._isOngletHomeAfficher)
        {
            if (mythis.isTreeOnglet)
            {
                affichericeElements(mythis._OngletEtiquette);
                if (mythis._OngletEtiquetteTooltip)
                    affichericeElements(mythis._OngletEtiquetteTooltip);
                mythis._isOngletAfficher.Value = true;

                if (!withoutHome)
                    if (mythis._OngletEtiquetteHome)
                    {
                        affichericeElements(mythis._OngletEtiquetteHome);
                        mythis.TooltipNeedRefresh = true;
                        mythis._isOngletHomeAfficher = true;
                    }
            }
            else
            {
                affichericeElements(mythis._OngletEtiquette);
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
        let mythis: ice2NavOngletItem = this;
        if (mythis._isOngletAfficher.Value || mythis._isOngletHomeAfficher)
        {
            if (mythis.isTreeOnglet)
            {
                if (force)
                {
                    cachericeElements(mythis._OngletEtiquette, true);
                    if (mythis._OngletEtiquetteTooltip)
                        cachericeElements(mythis._OngletEtiquetteTooltip, true);
                    mythis._isOngletAfficher.Value = false;
                }
                if (mythis._OngletEtiquetteHome)
                {
                    cachericeElements(mythis._OngletEtiquetteHome, true);
                    mythis.TooltipNeedRefresh = true;
                    mythis._isOngletHomeAfficher = false;
                }

            }
            else
            {
                cachericeElements(mythis._OngletEtiquette, true);
                mythis._isOngletAfficher.Value = false;

            }

        }
    }

    //#endregion "Methode d'interaction"

    public SupprimerOnglet()
    {
        let mythis: ice2NavOngletItem = this;
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
    private CreateOngletEtiquetteForToolTip(cbHideTooltip: () => void): ice2ContainerEvent
    {
        let mythis: ice2NavOngletItem = this;
        mythis._OngletEtiquetteForToolTip = new ice2ContainerEvent({
            id: (!!mythis.id ? "ice2NavOngletBar_GridTooltip_item_" + mythis.id : null),
            class: "ice2NavOngletBar_GridTooltip_item " + (mythis._haveFlagHasContenu.Value ? ice2NavOngletItem.CLASS_FlagHasContenu + " " : "") + (!!mythis._class ? mythis._class : ""),
            initContent: new ice2Label({
                textVariable: mythis.OngletName,
                centrer: true,
                lineBreak: false,
            }),
            stopPropagation: true,
            onMouseOver: () =>
            {
                if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                    iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteForToolTip, mythis.color);
            },
            onMouseOut: () =>
            {
                if (!mythis._isContenueAfficher && !mythis.isSousOngletAfficher)
                    iceStyle.supprimerCouleurFond(mythis._OngletEtiquetteForToolTip);
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
            iceStyle.setCouleurFondAvecContrasteTexteAuto(mythis._OngletEtiquetteForToolTip, mythis.color);
        iceStyle.setCouleurBorder(mythis._OngletEtiquetteForToolTip, mythis.color, enumCote.bas, false);
        return mythis._OngletEtiquetteForToolTip
    }

    private CreateFlagHasContenu(): iceDiv
    {
        return new iceDiv({
            class: "ice2NavOngletBar_FlagHasContenu",
            title: ice2NavOngletItem.TITLE_FlagHasContenu
        });
    }

    private CreateFlagSousOngletHasContenu(): iceDiv
    {
        return new iceDiv({
            class: "ice2NavOngletBar_FlagSousOngletHasContenu",
            title: ice2NavOngletItem.TITLE_FlagSousOngletHasContenu
        });
    }

    private setFlagSousOngletHasContenu(valeur: boolean)
    {
        let mythis: ice2NavOngletItem = this;
        if (!mythis._haveFlagHasContenu.Value && valeur)
        {
            mythis._OngletEtiquette.addClass(ice2NavOngletItem.CLASS_FlagSousOngletHasContenu);
            if (mythis._OngletEtiquetteTooltip)
                mythis._OngletEtiquetteTooltip.addClass(ice2NavOngletItem.CLASS_FlagSousOngletHasContenu);
        }
        else if(!valeur)
        {
            mythis._OngletEtiquette.removeClass(ice2NavOngletItem.CLASS_FlagSousOngletHasContenu);
            if (mythis._OngletEtiquetteTooltip)
                mythis._OngletEtiquetteTooltip.removeClass(ice2NavOngletItem.CLASS_FlagSousOngletHasContenu);
        }
    }

    private testIsTree(Options: Optionsice2NavOngletItem): Options is Optionsice2NavOngletItemTree
    {
        return "SousOnglet" in Options;
    }
    private testIsUniqueItem(Options: Optionsice2NavOngletItem): Options is Optionsice2NavOngletItemUnique
    {
        return "GenerateContent" in Options && !("SousOnglet" in Options);
    }
}

export class ice2NavOngletBar implements iXElement
{
    // --------- //
    // Propertie //
    // --------- //
  
    public get y(): HTMLElement { return this._gridOnglet.y; }

    // Data Affichage
    public get isAfficher(): boolean { return this._isAfficher; }

    public get ListOnglet(): ice2NavOngletItem[] { return this.listeOngletItem.slice(0, this.listeOngletItem.length); }

    // --------- //
    // attributs //
    // --------- //
    private isError: boolean = false;
    // Options
    private OnOngletChange: (OngleSelect: ice2NavOngletItem) => void;
    private WithSousOngletTooltip: boolean;


    // Data
    private OngletMaster: ice2NavOngletItem;

    private _gridOnglet: ice2Grid;
    private listeOngletItem: ice2NavOngletItem[] = [];
    private listeGridice2NavOngletBar: ice2GridItem[] = [];
    private SelectedOngletItem: ice2NavOngletItem;

    // Conteneur
    private GridForAddContent: ice2Grid;
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

    // iceStyle
    private Style: iceStyle;

    // ----------- //
    // Constructor //
    // ----------- //
    public constructor(Options : Optionsice2NavOngletBar)
    {
        let mythis: ice2NavOngletBar = this;
        // ---- Recuperation des options ---- //
        if (Options.Style)
            mythis.Style = Options.Style;
        else
            mythis.Style = new iceStyle();

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
            console.error("ice2NavOngletBar - GridForAddContent is undefined!");
            mythis.isError = true;
        }

        mythis.GridItemContentOption = Options.GridItemContentOption;

        // ----- init Onglet barre ------ //
        mythis._gridOnglet = new ice2Grid({
            class: (!mythis.OngletMaster ? "ice2NavOngletBar_GridOngletPrincipale" : "ice2NavOngletBar_GridOngletSecondaire") + " ice2NavOngletBar " + (!!Options.class ? Options.class:""),
            colonnes: ["Auto", "1fr"],
            fullHeight: true,
            fullWidth: true,
            gridGap: "0px"
        });

        if (mythis.OngletMaster)
        {
            // color border
            iceStyle.setCouleurBorder(mythis._gridOnglet, mythis.OngletMaster.color, enumCote.gauche,false);
            mythis.CacherBarre();

            // ---- generate bouton home ---- //
            if (mythis.OngletMaster.haveContent)
            {
                let etiquetteGridHomeTemp: ice2GridItem = new ice2GridItem({
                    class: "ice2NavOngletBar_GridItem_barHome ice2NavOngletBar_GridItem_barHome_Fleche_" + mythis.OngletMaster.color+"  "+ (!!Options.class ? Options.class : ""),
                    colStart: 1, nbCols: 1,
                    rowStart: 1, nbRows: 1,
                    content: mythis.OngletMaster.OngletEtiquetteHome
                });
                mythis.Style.AddCss(".ice2NavOngletBar_GridItem_barHome_Fleche_" + mythis.OngletMaster.color + ":after", "background-color: #" + mythis.OngletMaster.color + "; border-left-color: #" + mythis.OngletMaster.color +";");
                mythis._gridOnglet.append([
                  etiquetteGridHomeTemp
                ]);
            }
        }

        // Creation de la fleche
        if (Options.CanReduireSousOnglet && Options.OngletMaster == null)
        {
            let chevronReduire = new ice2CheckBox({
                class: (mythis._SousOngleIsAfficher ? "ice2NavOngletBar_GridItem_FlecheReduction_ChevronUP":""),
                titleLocalise: "Afficher/Cacher les sousOnglets",
                AffichageBoutonWapper2: {
                    tailleBouton: enumTailleBouton.Fit,
                    margin: { Tous: 0 },
                },
                IconeBoutonWapper2: new IconeSvg(enumIconeSvg.chevron_bas, { taille: tailleIcone.XS }),
                typeCheckbox: enumTypeCheckbox.ice2Bouton,
                value: mythis._SousOngleIsAfficher,
                ValueChange: (val) =>
                {
                    mythis._SousOngleIsAfficher = val;
                    if (mythis._SousOngleIsAfficher)
                        chevronReduire.addClass("ice2NavOngletBar_GridItem_FlecheReduction_ChevronUP");
                    else
                        chevronReduire.removeClass("ice2NavOngletBar_GridItem_FlecheReduction_ChevronUP");

                    if (mythis.listeGridice2NavOngletBar?.length > 0)
                        mythis.listeGridice2NavOngletBar.forEach((item) =>
                        {
                            if (mythis._SousOngleIsAfficher)
                            {
                                affichericeElements(item);
                                setTimeout(() =>
                                {
                                    item.removeClass("ice2NavOngletBar_Cacher");
                                }, 20);
                            }
                            else
                            {
                                item.addClass("ice2NavOngletBar_Cacher");
                                item.y.addEventListener('transitionend', function (e)
                                {
                                    if (!mythis._SousOngleIsAfficher)
                                        cachericeElements(item, true);
                                }, {
                                    capture: false,
                                    once: true,
                                    passive: false
                                });
                            }
                        });
                }
            });
            mythis._gridOnglet.append([new ice2GridItem({
                class: "ice2NavOngletBar_GridItem_FlecheReduction",
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
    public AjouteOnglet(onglet: Optionsice2NavOngletItem)
    {
        let mythis: ice2NavOngletBar = this;
        if (!mythis.isError)
            if (onglet != null)
                mythis.generateonglet(onglet);
    }

    public cacherOngletSelected(videContenue?: boolean)
    {
        let mythis: ice2NavOngletBar = this;
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
        let mythis: ice2NavOngletBar = this;
        if (!mythis._isAfficher)
        {
            mythis._isAfficher = true;
            affichericeElements(mythis._gridOnglet);
        }
    }

    /**
     * Pemet de cacher la bar et force les onglets a ce cacher
     * @param videContenue force a vidé le contenue de l'onglet
     */
    public CacherBarre(videContenue?: boolean)
    {
        let mythis: ice2NavOngletBar = this;
        if (mythis._isAfficher)
        {
            mythis._isAfficher = false;
            cachericeElements(mythis._gridOnglet, true);
            mythis.cacherOngletSelected(videContenue);

            if (mythis.OngletMaster)
                mythis.OngletMaster.CacherContenue(videContenue);
        }
    }

    public SupprimerAllOnglet()
    {
        let mythis: ice2NavOngletBar = this;
        mythis.listeOngletItem.forEach((item) =>
        {
            item.SupprimerOnglet();
        });
    }

    // private
    private getRealOngletsSelect(onglet: ice2NavOngletItem): ice2NavOngletItem
    {
        let mythis: ice2NavOngletBar = this;
        if (onglet.isTreeOnglet)
        {
            if (onglet.SousOnglets.SelectedOngletItem)
                return mythis.getRealOngletsSelect(onglet.SousOnglets.SelectedOngletItem)
        }
        return onglet;
    }

    private generateonglet(onglet: Optionsice2NavOngletItem)
    {
        let mythis: ice2NavOngletBar = this;
        let toSender: ice2NavOngletItem;
        onglet = assignerObjet(({} as any), onglet);
        // On ne veux pas des #
        if (!!onglet.color)
        {
            onglet.color = onglet.color.replace("#", "");
            if (iceStyle.getLuminositeCouleurHexa(onglet.color) > 200)
            {
                onglet.color = iceStyle.AssombrissementCouleurHex(onglet.color, 25);
            }
        }

        // on surchage la select d'un onglet
        let onSelectUser = onglet.onSelect;
        onglet.onSelect = (ongletItem: ice2NavOngletItem) =>
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
            onglet.color = iceStyle.EclaicirCouleurHex(mythis.OngletMaster.color, 33);
        else if (mythis.OngletMaster && onglet.color)
            onglet.color = iceStyle.EclaicirCouleurHex(onglet.color, 15);

        // creation de l'onglet et ajoute a la barre
        let etiquetteGridTemp: ice2GridItem;
        let tempoGriditem: ice2GridItem;
        let ongletItem = new ice2NavOngletItem(onglet, mythis.GridItemContentOption, mythis.GridForAddContent, mythis.WithSousOngletTooltip, mythis.Style, () =>
        {
            etiquetteGridTemp.y.remove();
            if (tempoGriditem)
            {
                mythis.listeGridice2NavOngletBar.splice(mythis.listeGridice2NavOngletBar.indexOf(tempoGriditem), 1);
                tempoGriditem.y.remove();
            }

            mythis.ActualiseGridTemplateOngle();
        });
        mythis.listeOngletItem.push(ongletItem);

        // Grid Etiquette
        etiquetteGridTemp = new ice2GridItem({
            class: "ice2NavOngletBar_GridItem_ongletItem " + (mythis.OngletMaster && mythis.listeOngletItem.length <= 1 ? "ice2NavOngletBar_GridItem_ongletItem_firstWithHome":"" ),
            colStart: mythis.listeOngletItem.length + 1, nbCols: 1,
            rowStart: 1, nbRows: 1,
            content: ongletItem.OngletEtiquette
        });
        if (mythis.OngletMaster && !!mythis.OngletMaster.color)
        {

            let couleurClaire = iceStyle.EclaicirCouleurHex(mythis.OngletMaster.color, 66);
            let classCouleurDegrade: string = "ice2NavOngletBar_GridItem_ongletItem_couleurDegrade_" + couleurClaire;
            mythis.Style.AddCss("." + classCouleurDegrade + " > .ice2NavOngletBar_ongletItem.NotSelected:after", "color:#" + couleurClaire + ";");
            mythis.Style.AddCss("." + classCouleurDegrade + " > .ice2Tooltip.ice2NavOngletBar_ongletItem_ToolTip.NotSelected > .ice2Tooltip_Contenu:after", "color:#" + couleurClaire + ";");
            etiquetteGridTemp.addClass(classCouleurDegrade);

            iceStyle.setCouleurFondAvecContrasteTexteAuto(etiquetteGridTemp, couleurClaire,null, false, false);
        }

        mythis._gridOnglet.append([
            etiquetteGridTemp
        ]);

        if (mythis.listeGridice2NavOngletBar.length > 0)
            mythis.listeGridice2NavOngletBar.forEach((item) => { item.changeColsProperties((mythis.OngletMaster != null ? 1 : 2), mythis.listeOngletItem.length + (mythis.OngletMaster != null ? 2 : 1)); });

        if (ongletItem.isTreeOnglet)
        {
            let tempoGriditem: ice2GridItem = new ice2GridItem({
                class: "ice2NavOngletBar_GridItem_SousOnglet",
                colStart: (mythis.OngletMaster != null ? 1 : 2), nbCols: mythis.listeOngletItem.length + (mythis.OngletMaster != null ? 2 : 1),
                rowStart: 2, nbRows: 1,
                content: ongletItem.SousOnglets
            });
            if (!mythis._SousOngleIsAfficher)
                cachericeElements(tempoGriditem,true);
            mythis.listeGridice2NavOngletBar.push(tempoGriditem);
            mythis._gridOnglet.append([tempoGriditem]);
        }

        mythis.ActualiseGridTemplateOngle();
        return toSender;
    }

    private ActualiseGridTemplateOngle()
    {
        let mythis: ice2NavOngletBar = this;
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

export class ice2NavOngletControl implements iXElement
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
    private OngletPrincipaleBar: ice2NavOngletBar;

    // Conteneur 
    private gridPrincipale: ice2Grid;

    // Zone
    private zoneAvantOnglet: ice2GridItem;
    private ZoneApresOnglet: ice2GridItem;


    // ----------- //
    // Constructor //
    // ----------- //
    public constructor(Options:Optionsice2NavOngletControl)
    {
        let mythis: ice2NavOngletControl = this;

        // ---- Init ---- //
        mythis.gridPrincipale = new ice2Grid({
            class: "ice2NavOngletControl ice2NavOngletControl_GridPrincipale",
            lignes: /*GANON - Options.WithHistoriqueBar*/ false ? ["auto", "1fr", "40px"] : ["auto","1fr"],
            colonnes:["auto","1fr","auto"],
            fullHeight: true,
            fullWidth: true,
            gridGap:"0px"
        });

        // Init ZoneAvantOnglet
        mythis.zoneAvantOnglet = new ice2GridItem({
            colStart: 1, nbCols: 1,
            rowStart: 1, nbRows: 1,
            optionsAffichage: {
                alignementContenu: enumAlignementContenu.CentreCentre
            },
            class: "ice2NavOngletControl_GridItem_ZoneAvantOnglet",
            content: Options.initZoneAvantOnglet ?? new iceDiv({}) // Si pas de init on met un DivPlaceholder
        });
        mythis.gridPrincipale.append([mythis.zoneAvantOnglet]);

        // Init ZoneApresOnglet
        mythis.ZoneApresOnglet = new ice2GridItem({
            colStart: 3, nbCols: 1,
            rowStart: 1, nbRows: 1,
            optionsAffichage: {
                alignementContenu: enumAlignementContenu.CentreCentre
            },
            class: "ice2NavOngletControl_GridItem_ZoneApresOnglet",
            content: Options.initZoneApresOnglet ?? new iceDiv({}) // Si pas de init on met un DivPlaceholder
        });
        mythis.gridPrincipale.append([mythis.ZoneApresOnglet]);

        // Init Onglet bar Principale
        mythis.OngletPrincipaleBar = new ice2NavOngletBar({
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
            new ice2GridItem({
                colStart: 2, nbCols: 1,
                rowStart: 1, nbRows: 1,
                class: "ice2NavOngletControl_GridItem_GridOngletPrincipale",
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
    public AjouteOnglet(onglet: Optionsice2NavOngletItem)
    {
        let mythis: ice2NavOngletControl = this;

        if (onglet != null)
        {
            mythis.OngletPrincipaleBar.AjouteOnglet(onglet);
        }
    }

    /**
     * Pemet de changer le contenu de la zone avant Onglet, /!\ Attention cela supprime l'ancien contenu /!\
     * @param i
     */
    public ChangeContentZoneAvantOnglet(i: iXElement): ice2NavOngletControl
    {
        let mythis: ice2NavOngletControl = this;
        mythis.zoneAvantOnglet.ChangeContent(i);
        return mythis;
    }

    /**
     * Pemet de changer le contenu de la zone apres Onglet, /!\ Attention cela supprime l'ancien contenu /!\
     * @param i
     */
    public ChangeContentZoneApresOnglet(i: iXElement): ice2NavOngletControl
    {
        let mythis: ice2NavOngletControl = this;
        mythis.ZoneApresOnglet.ChangeContent(i);
        return mythis;
    }
  
}