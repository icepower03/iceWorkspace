import { CelluleMoisJour } from './CelluleMoisJour';
import { iXElement, iXElementHolder, enumPosition } from '../iceBase';
import { iceOutils } from '../../iceOutils';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { iceDiv } from '../xcontrols/iceDiv';
import { ice2Grid, ice2GridItem, enumAlignementContenu } from '../xcontrols/ice2Grid';
import { ice2Label, enumTypeLabel } from '../xcontrols/ice2Label';
import { ice2Bouton, enumTailleBouton } from '../xcontrols/ice2Bouton';
import { ice2WrapPanel } from '../xcontrols/ice2WrapPanel';
import { ice2StackPanel } from '../xcontrols/ice2StackPanel';
import { ice2ToolTip } from '../xcontrols/ice2ToolTip';
import { ice2Zoom, enumAffichageZoom } from '../xcontrols/ice2Zoom';
import { ice2ContainerEvent } from '../xcontrols/ice2ContainerEvent';
import { PlanningColonne } from './PlanningColonne';
import { PlanningRdv, PlanningDisponibilite } from './PlanningElements';
import { PlanningRessource, PlanningParamUser } from './PlanningElements';
import { ice2MenuContextuel } from '../xcontrols/ice2MenuContextuel';
import { BindableObject } from '../xcontrols/BindableObject';
import { ice2PageWrapper } from '../xcontrols/ice2PageWrapper';
import { ice2Boxer, enumBoxerTaille } from '../xcontrols/ice2Boxer';
import { ice2LabelContainer, enumPositionDuContenu } from '../xcontrols/ice2LabelContainer';
import { IconeP12, enumIconeP12, tailleIcone } from '../iceIcones';
import { ice2ListeDeroulante } from '../xcontrols/ice2ListeDeroulante';
import { ice2CheckBox } from '../xcontrols/ice2CheckBox';
import { ice2InputNumerique } from '../xcontrols/ice2InputNumerique';
import { iceTime } from '../iceTime';
import { iceSpan } from '../xcontrols/iceSpan';
import { cachericeElements, affichericeElements } from '../../iceStaticFunctions';
import { iceLString } from '../iceLString';

interface optionPlanningBase {
    Rdv?: PlanningRdv[];
    DateDebut?: DateSerialisable;
    HeureDebut?: number;
    HeureFin?: number;
    Dispo?: PlanningDisponibilite[];
    ClickSurRdv?: (data: PlanningRdv) => void;
    ClickSurEnteteColonne?: (div: iXElement, rdv: PlanningColonne) => void;
    ClickSurDispoBarre?: (dispo: PlanningDisponibilite) => void;
    RenderRdv?: (rdv: PlanningRdv) => ice2Grid | ice2ToolTip | ice2Label | ice2WrapPanel | ice2StackPanel | iceDiv;
    RenderColonne?: (infoColonne: PlanningColonne) => iXElement;
    TimeLineNow?: boolean;
    RdvEnCours?: (heureTimeLine: DateSerialisable, rdvEnCours: PlanningRdv, rdvsSuivants: PlanningRdv[], refreshColonne: () => void) => void;
    clickSurJourModeMois?: (date: DateSerialisable) => void;
    KeyPlanning?: string;
    DayToAffiche?: string;
    typeAffichageParDefaut?: EPlanningTypeAffichage;
    RightClick?: optionRightClick;
    AgrandirRdv?: optionAgrandirRdv;
    DragAndDropRdv?: optionDragAndDropRdv;
    ZoomPlanning?: optionZoomPlanning;
    AddRdvOnClick?: optionAddRdvOnClick;
}

interface optionPrevisualisationSouris{
    RenderPrevisualisationSouris?: (place: iXElementHolder, rdvfictif: PlanningRdv) => void;
} 

interface optionZoomPlanning {
    ZoomChoisi?: number;
}

export interface optionAgrandirRdv {
    ApresAgrandissement?: (rdv: PlanningRdv) => void;
    RdvsADeplacer?: (rdv: PlanningRdv, dateDebut: boolean) => PlanningRdv[]; // Sert quand des rdv "Secondaires" sont associés à un rdv "principal" (ex : Planning des blocs: temps de préap / opération / temps de nettoyage)
    AvantAgrandissement?: (rdv: PlanningRdv) => void;

}

export interface optionAddRdvOnClick {
    Id?: number;
    IdExterne?: number;
    LibelleRdv?: string;
    CouleurRdv?: string;
    DureeRdv?: number;
    RdvAdded?: (rdv: PlanningRdv) => void;
    BeforeAdd?: (rdv: PlanningRdv) => Promise<void>;
    ArrondirDebutRdvAuPas?: number;
    //ChangementArrondissement?: (arrondissement: number) => void;
    //ChangementDureeRdv?: (duree: number) => void;
    PrevisualisationSouris?: optionPrevisualisationSouris;
}

export interface optionDragAndDropRdv {
    AvantDeplacement?: (rdv: PlanningRdv) => void;
    ApresDeplacement?: (rdv: PlanningRdv) => void;
    RenderDivCurseur?: (rdv: PlanningRdv) => iXElement;
    DureeMin?: (rdv: PlanningRdv) => [number, number]; // [DuréeTotal, DuréeSousCurseur] Permet de gérer la position de l'affichage
}

interface optionPlanningDate extends optionPlanningBase {
    NombreJour?: number;
}

interface optionPlanningRessource extends optionPlanningBase {
    Ressources: PlanningRessource[];
}

interface optionRightClickCLassique {
    OnRdv: (data: PlanningRdv) => void;
    OnGrid: (data: PlanningRdv) => void;
}

interface optionRightClickRender {
    renderRightClickRdv: (data: PlanningRdv, place: iXElementHolder, tooltip: ice2MenuContextuel) => void;
    renderRightClickGrid: (date: PlanningRdv, place: iXElementHolder, tooltip: ice2MenuContextuel) => void;
}

type optionRightClick = optionRightClickCLassique | optionRightClickRender;
type optionPlanningResDate = optionPlanningDate | optionPlanningRessource
type optionPlanning = optionPlanningResDate

const KeyLocalStorageParamUser = "ice2PlanningUserParam";

export enum EPlanningTypeAffichage {
    Standard,
    Mois
}

export class ice2Planning implements iXElement {

    private contenuePrincipal: ice2WrapPanel;
    private gridZoomEtHeure: ice2Grid;

    private HeureDebut: number;
    private HeureFin: number;

    private ClickSurRdv: (data: PlanningRdv) => void;

    // option pour le click droit
    private RightClickSurRdv: (data: PlanningRdv) => void = null;
    private RightClickOnGrid: (data: PlanningRdv) => void = null;

    private RenderRightClickRdv: (data: PlanningRdv, place: iXElementHolder, tooltip: ice2MenuContextuel) => void = null;
    private RenderRightCLickGrid: (data: PlanningRdv, place: iXElementHolder, tooltip: ice2MenuContextuel) => void = null;

    private ClickSurDispoBarre: (dispo: PlanningDisponibilite) => void;
    private ClickSurEnteteColonne: (div: iXElement, rdv: PlanningColonne) => void;
    private RenderRdv: (rdv: PlanningRdv) => ice2Grid | ice2ToolTip | ice2Label | ice2WrapPanel | ice2StackPanel | iceDiv;
    private RenderColonne: (infoColonne: PlanningColonne) => iXElement;
    private TimeLineNow: boolean;
    private DateDebut: DateSerialisable;

    private RdvEnCours: (heureTimeLine: DateSerialisable, rdvEnCours: PlanningRdv, rdvsSuivants: PlanningRdv[], refreshColonne: () => void) => void;

    private DatesColonnes: DateSerialisable[];
    private NombreJour: number;

    public ON_MOUSE_MOUVE_DEPLACEMENT: (e: MouseEvent) => void;
    public ON_MOUSE_MOUVE_PREVUSUALISATION: (e: MouseEvent) => void;

    private zoom: boolean;
    private zoomChoisi: BindableObject<number>;

    private AgrandirRdv: boolean = false;
    private ApresAgrandissement?: (rdv: PlanningRdv) => void;
    private RdvsADeplacer?: (rdv: PlanningRdv, dateDebut: boolean) => PlanningRdv[];
    private AvantAgrandissement?: (rdv: PlanningRdv) => void;

    public rdvPrevisualiseFictif: PlanningRdv;

    private ListParamUser: PlanningParamUser[] = [];

    private AddRdvOnClick: optionAddRdvOnClick;

    private listArrondissementPossible: number[] = [5, 10, 15, 20, 30, 60]  
    private listZoomPossible: number[] = [100, 150, 200, 250, 300, 350, 400];

    public addClass(s: string) {
        return this.contenuePrincipal.addClass(s);
    }

    public removeClass(s: string) {
        return this.contenuePrincipal.removeClass(s);
    }
    public rdvPlacer: boolean = false;
    private creneauSelectionne: PlanningRdv;

    public RdvSelect: PlanningRdv = null;
    public RdvSelectRightClic: PlanningRdv = null;
    public idTimerDivCurseur: ReturnType<typeof setTimeout>;

    public MillSecMouseDown: number;
    public MillSecMouseUp: number;

    private dragAndDropRdv: boolean = false;
    private ApresDeplacement: (rdv: PlanningRdv) => void;
    private AvantDeplacement: (rdv: PlanningRdv) => void;
    private DureeMin?: (rdv: PlanningRdv) => [number, number];
    private RenderDivCurseur?: (rdv: PlanningRdv) => iXElement;

    private _PrevisualisationRdv: ice2GridItem = null;
    private get PrevisualisationRdv(): ice2GridItem { return this._PrevisualisationRdv; };
    private set PrevisualisationRdv(intt: ice2GridItem) { this._PrevisualisationRdv = intt; };

    public previsualisationSourisActive: boolean;


    private Ressource: PlanningRessource[];

    private listeColonne: PlanningColonne[];

    private clickSurJourModeMois: (date: DateSerialisable) => void;
    private GridMonth: ice2Grid;
    private premierJourGrid: DateSerialisable;
    private moisCourant: number;
    private premiereSemaine: number;
    private derniereSemaine: number;
    private celluleJoursMois: CelluleMoisJour[];
    private typeAffichage: EPlanningTypeAffichage;

    private keyPlanning: string;

    private DayToAffiche: string = "1111111";

    public callbackToDeleteRightClick: () => void;
    public contenuMenuClicDroit: iceDiv;

    public get y() {
        let myThis: ice2Planning = this;
        return myThis.contenuePrincipal.y;
    }

    // Différence entre mode Ressource et Date
    public constructor(option: optionPlanning) {
        let myThis: ice2Planning = this;

        myThis.DateDebut = option.DateDebut;
        myThis.HeureDebut = option.HeureDebut;
        if (myThis.HeureDebut == undefined)
            myThis.HeureDebut = 0;

        myThis.HeureFin = option.HeureFin;
        if (myThis.HeureFin == undefined || myThis.HeureFin == 0)
            myThis.HeureFin = 24;

        if (option.DayToAffiche != null) {
            myThis.DayToAffiche = option.DayToAffiche;
        }

        myThis.ClickSurEnteteColonne = option.ClickSurEnteteColonne;
        myThis.ClickSurRdv = option.ClickSurRdv;

        if (option.RightClick != null) {
            if (myThis.IsRightCLickRendered(option.RightClick)) {
                myThis.RenderRightClickRdv = option.RightClick.renderRightClickRdv;
                myThis.RenderRightCLickGrid = option.RightClick.renderRightClickGrid;
            } else {
                myThis.RightClickSurRdv = option.RightClick.OnRdv;
                myThis.RightClickOnGrid = option.RightClick.OnGrid;
            }
        }

        myThis.ClickSurDispoBarre = option.ClickSurDispoBarre;
        myThis.RenderColonne = option.RenderColonne;
        myThis.RenderRdv = option.RenderRdv;
        myThis.listeColonne = [];
        myThis.RdvEnCours = option.RdvEnCours;

        myThis.typeAffichage = EPlanningTypeAffichage.Standard;

        if (option.typeAffichageParDefaut != null)
            myThis.typeAffichage = option.typeAffichageParDefaut;

        myThis.ON_MOUSE_MOUVE_DEPLACEMENT = (e: MouseEvent) => { myThis.previsualisationRdv(e, true); };
        myThis.ON_MOUSE_MOUVE_PREVUSUALISATION = (e: MouseEvent) => { myThis.previsualisationRdv(e, false); };

        myThis.previsualisationSourisActive = false;

        if (option.DragAndDropRdv != undefined) {
            myThis.dragAndDropRdv = true;
            myThis.ApresDeplacement = option.DragAndDropRdv.ApresDeplacement;
            myThis.AvantDeplacement = option.DragAndDropRdv.AvantDeplacement;
            myThis.DureeMin = option.DragAndDropRdv.DureeMin;
            myThis.RenderDivCurseur = option.DragAndDropRdv.RenderDivCurseur;
        }

        if (option.AgrandirRdv != undefined) {
            myThis.AgrandirRdv = true;
            myThis.ApresAgrandissement = option.AgrandirRdv.ApresAgrandissement;    
            myThis.RdvsADeplacer = option.AgrandirRdv.RdvsADeplacer;
            myThis.AvantAgrandissement = option.AgrandirRdv.AvantAgrandissement;
        }

        if (option.AddRdvOnClick != undefined) {
            
            myThis.AddRdvOnClick = option.AddRdvOnClick;
            
            if (myThis.AddRdvOnClick.LibelleRdv == undefined)
                myThis.AddRdvOnClick.LibelleRdv = "Nouveau Rdv";
            if (myThis.AddRdvOnClick.DureeRdv == undefined)
                myThis.AddRdvOnClick.DureeRdv = 120;
            if (myThis.AddRdvOnClick.CouleurRdv == undefined)
                myThis.AddRdvOnClick.CouleurRdv = "#20b2aa";
            if (myThis.AddRdvOnClick.Id == undefined)
                myThis.AddRdvOnClick.Id = 0;
            if (myThis.AddRdvOnClick.IdExterne == undefined)
                myThis.AddRdvOnClick.IdExterne = 0;
            if (myThis.AddRdvOnClick.ArrondirDebutRdvAuPas == null)
                myThis.AddRdvOnClick.ArrondirDebutRdvAuPas = 5;

            if (myThis.AddRdvOnClick.PrevisualisationSouris != null) {
                myThis.previsualisationSourisActive = true;

                if (myThis.AddRdvOnClick.PrevisualisationSouris.RenderPrevisualisationSouris == null)
                    myThis.AddRdvOnClick.PrevisualisationSouris.RenderPrevisualisationSouris = (ici, rdv) => {
                        ici.append(new ice2Label({ textVariable: DateSerialisable.tolocalstringHeureMinute(rdv.DateDebut) + " - " + DateSerialisable.tolocalstringHeureMinute(rdv.DateFin) }))
                }
            }
        }

        myThis.TimeLineNow = option.TimeLineNow;
        if (myThis.TimeLineNow == undefined)
            myThis.TimeLineNow = true;

        myThis.zoom = false;

        myThis.keyPlanning = option.KeyPlanning;

        if (option.ZoomPlanning != undefined) {
            myThis.zoomChoisi = new BindableObject<number>(100);
            myThis.zoom = true;

            if (option.ZoomPlanning.ZoomChoisi != undefined)
                myThis.zoomChoisi.Value = option.ZoomPlanning.ZoomChoisi;
        }

        myThis.clickSurJourModeMois = option.clickSurJourModeMois;

        if (myThis.IsPlanningRessource(option)) {
            myThis.Ressource = option.Ressources;
            if (myThis.Ressource == undefined)
                myThis.Ressource = [];
        }
        else {
            myThis.NombreJour = option.NombreJour;
            if (myThis.NombreJour == undefined)
                myThis.NombreJour = 7;

            myThis.calculDateColonne(myThis.NombreJour == 7);
        }


        if (myThis.keyPlanning != null)
            myThis.LoadParamUser();

        myThis.setModeAffichage(myThis.typeAffichage, option.Rdv, option.Dispo, myThis.NombreJour, myThis.NombreJour == 7);
    }

    private IsPlanningRessource(option: optionPlanning): option is optionPlanningRessource {
        return (<optionPlanningRessource>option).Ressources !== undefined;
    }

    private IsRightCLickRendered(option: optionRightClick): option is optionRightClickRender {
        return (<optionRightClickRender>option).renderRightClickRdv !== undefined;
    }

    private calculDateColonne(isTypeIntervaleSemaine: boolean) {
        let myThis: ice2Planning = this;

        let date: DateSerialisable = DateSerialisable.CopyDateSerialisable(myThis.DateDebut);
        myThis.DatesColonnes = [];
        let days: number[] = [];

        // En type d'intervale semaine, on prend comme base le lundi correspondant à la semaine de la date sélectionnée de sorte à ce que le planning affiche la semaine complète moins les jours paramétrés pour ne pas être affichés
        if (isTypeIntervaleSemaine)
        {
            date = DateSerialisable.getPremierJourSemaine(date);
        }

        //on met dans l'odre javascript dimanche - samedi
        if (myThis.DayToAffiche.charAt(6) == "1") { // cas dimanche
            days.push(1);
        }
        else {
            days.push(0);
        }
        for (let x = 0; x < 6; x++) { // lundi au samedi
            if (myThis.DayToAffiche.charAt(x) == "1") {
                days.push(1);
            }
            else {
                days.push(0);
            }
        }

        if (isTypeIntervaleSemaine)
        {
            days.forEach(dateColonne =>
            {
                if (days[DateSerialisable.getIndexJourSemaine(date)] == 1)
                {
                    myThis.DatesColonnes.push(DateSerialisable.CopyDateSerialisable(date));
                    date = DateSerialisable.addDaysSerialisable(date, 1);
                }
            });
        }
        else
        {
            while (myThis.DatesColonnes.length < myThis.NombreJour)
            {
                if (days[DateSerialisable.getIndexJourSemaine(date)] == 1)
                {
                    myThis.DatesColonnes.push(DateSerialisable.CopyDateSerialisable(date));
                }

                date = DateSerialisable.addDaysSerialisable(date, 1);
            }
        }
    }

    private createColonneZoomEtHeure() {
        let myThis: ice2Planning = this;

        let lignes = Math.ceil((myThis.HeureFin - myThis.HeureDebut) * 60 / 60);


        let listeLignes = [];

        for (let i = 0; i <= lignes * 12; i++) {
            if (i != 0) {
                listeLignes.push('1');
            } else {
                listeLignes.push('50px');
            }
        }

        let gridZoomEtParam = new ice2Grid({
            colonnes: ["auto"],
            lignes: ["auto", "auto"],
            gridGap: "3px",
            fullHeight: true,
            optionsAffichage: { padding: { Tous: 2 } }
        });
        //let stackPanelZoomBtnParam = new ice2StackPanel({ espaceMinimaliste: true });

        myThis.gridZoomEtHeure = new ice2Grid({
            colonnes: ['1'],
            lignes: listeLignes,
            gridGap: "0px",
            class: 'ZoomEtHeure'
        });

        // Fin boxer parametrage 
        myThis.gridZoomEtHeure.append([new ice2GridItem({
            class: "premierItem",
            colStart: 1,
            rowStart: 1,
            nbCols: 1,
            nbRows: 1,
            cssOnly: true,
            content: myThis.zoom || myThis.AddRdvOnClick != null ? gridZoomEtParam : new iceDiv({ class: "zoomItem" })
        })]);

        if (myThis.zoom && myThis.AddRdvOnClick == null) {
            let zoomItem = new ice2Zoom({
                afterZoom: (zoom: number) => {
                    myThis.zoomChoisi.Value = zoom;

                    myThis.SaveParamUser();

                    myThis.supprimerClassHeure("p100");
                    myThis.supprimerClassHeure("p150");
                    myThis.supprimerClassHeure("p200");
                    myThis.supprimerClassHeure("p250");
                    myThis.supprimerClassHeure("p300");
                    myThis.supprimerClassHeure("p350");
                    myThis.supprimerClassHeure("p400");
                    myThis.ajouterClassHeure("p" + myThis.zoomChoisi.Value.toString());
                },
                zoomChoisi: myThis.zoomChoisi.Value,
                niveauxZoomPerCent: myThis.listZoomPossible,
                modeAffichage: enumAffichageZoom.modeListeVerticale,

            });

            gridZoomEtParam.append([new ice2GridItem({ colStart: 1, rowStart: 1, nbRows: 2, content: zoomItem, optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre } })])
            //stackPanelZoomBtnParam.append(zoomItem);
        }else if (myThis.AddRdvOnClick != null) { 
            
            let pageBoxer = new ice2PageWrapper({ titleLocalise: "Paramètrage du planning" });
            let boxerParametrage = new ice2Boxer({ initContent: pageBoxer, tailleBoxer: enumBoxerTaille.fit, class:"BoxerParametrage" });

            let stackBoxerParam = new ice2StackPanel({ espaceMinimaliste: true, gap: 10 });
            pageBoxer.append(stackBoxerParam);


            if (myThis.zoom) {
                myThis.ajouterClassHeure("p" + myThis.zoomChoisi.Value);

                let zoomItem = new ice2Zoom({
                    afterZoom: (zoom: number) => {
                        myThis.zoomChoisi.Value = zoom;

                        myThis.SaveParamUser();

                        myThis.supprimerClassHeure("p100");
                        myThis.supprimerClassHeure("p150");
                        myThis.supprimerClassHeure("p200");
                        myThis.supprimerClassHeure("p250");
                        myThis.supprimerClassHeure("p300");
                        myThis.supprimerClassHeure("p350");
                        myThis.supprimerClassHeure("p400");
                        myThis.ajouterClassHeure("p" + myThis.zoomChoisi.Value.toString());
                    },
                    zoomChoisi: myThis.zoomChoisi.Value,
                    niveauxZoomPerCent: myThis.listZoomPossible,
                    modeAffichage: enumAffichageZoom.modeOnlyBouton,

                });
                gridZoomEtParam.append([new ice2GridItem({ colStart: 1, rowStart: 1, nbRows: 1, content: zoomItem, optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre } })]);

                stackBoxerParam.append(new ice2LabelContainer({
                    textLocalise: "Zoom",
                    type: enumTypeLabel.important,
                    labelLargeurLibre: true,
                    gap:5,
                    optionsAffichage: {
                        positionDuContenu: enumPositionDuContenu.bas,
                    },
                    initContent: new ice2Zoom({
                        afterZoom: (zoom: number) => {
                            myThis.zoomChoisi.Value = zoom;

                            myThis.SaveParamUser();

                            myThis.supprimerClassHeure("p100");
                            myThis.supprimerClassHeure("p150");
                            myThis.supprimerClassHeure("p200");
                            myThis.supprimerClassHeure("p250");
                            myThis.supprimerClassHeure("p300");
                            myThis.supprimerClassHeure("p350");
                            myThis.supprimerClassHeure("p400");
                            myThis.ajouterClassHeure("p" + myThis.zoomChoisi.Value.toString());
                        },
                        zoomChoisi: myThis.zoomChoisi.Value,
                        niveauxZoomPerCent: myThis.listZoomPossible,
                        modeAffichage: enumAffichageZoom.modeListeHorizontale,

                    })
                }));
            }

            gridZoomEtParam.append([new ice2GridItem({
                colStart: 1, rowStart: 2, nbRows: 1,
                optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
                content: new ice2Bouton({
                    titleLocalise: "Ouvrir l'écran de paramètrage du planning",
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.Fit,
                        margin: { Tous: 0 }
                    },
                    icone: new IconeP12(enumIconeP12.admin_parametres, { taille: tailleIcone.S }),
                    class: "btnBoxerEcranParametrage",
                    click: cb => {
                        boxerParametrage.afficher();
                        cb();
                    }
                })
            })]);



            // Debut boxer parametrage

            if (myThis.AddRdvOnClick != null) {
                let listeArrondissement: ice2ListeDeroulante<number> = new ice2ListeDeroulante({
                    donnees: myThis.listArrondissementPossible,
                    class: "ListeTrancheHoraire",
                    defaultValue: myThis.listArrondissementPossible[myThis.listArrondissementPossible.indexOf(myThis.AddRdvOnClick.ArrondirDebutRdvAuPas)],
                    renderSelectItem: (place, item, selecteur) => {
                        place.append(new ice2Bouton({
                            textLocalise: item.toString() + "mins",
                            titleLocalise: "Choisir cette tranche horaire",
                            optionsAffichage: {
                                tailleBouton: enumTailleBouton.XS,
                            },
                            click: cb => {
                                selecteur(item);
                                cb();
                            }
                        }))

                    },
                    renderSelected: (place, item, select) => {
                        place.append(new ice2Bouton({
                            class: "boutonSelectTrancheHoraire",
                            textLocalise: item != null ? item.toString() + "mins" : "",
                            icone: new IconeP12(enumIconeP12.fleche_select, { taille: tailleIcone.XS }),
                            titleLocalise: "Changer de tranche horaire",
                            optionsAffichage: {
                                tailleBouton: enumTailleBouton.XS,
                                positionIconeBouton: enumPosition.Right,
                                margin: { Tous: 0 }
                            },
                            click: cb => {
                                select(item);
                                cb();
                            }
                        }))
                    },
                    selected: item => {
                        myThis.AddRdvOnClick.ArrondirDebutRdvAuPas = item;
                        myThis.SaveParamUser();
                    }
                });

                let boutonMoins: ice2Bouton = new ice2Bouton({
                    textVariable: "-",
                    titleLocalise: "Réduire",
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.XS,
                        margin: { Tous: 0 }
                    },
                    class: "trancheHorraireMoins",
                    click: cb => {
                        if (myThis.listArrondissementPossible.indexOf(myThis.AddRdvOnClick.ArrondirDebutRdvAuPas) - 1 >= 0)
                            listeArrondissement.selecteur(myThis.listArrondissementPossible[myThis.listArrondissementPossible.indexOf(myThis.AddRdvOnClick.ArrondirDebutRdvAuPas) - 1]);
                        else
                            iceOutils.afficherMessageAlertifyError("Impossible d'avoir une tranche horraire plus courte");
                        cb();
                    }
                });

                let boutonPlus: ice2Bouton = new ice2Bouton({
                    textVariable: "+",
                    titleLocalise: "Augmenter",
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.XS,
                        margin: { Tous: 0 }
                    },
                    class: "trancheHorrairePlus",
                    click: cb => {
                        if (myThis.listArrondissementPossible.indexOf(myThis.AddRdvOnClick.ArrondirDebutRdvAuPas) + 1 <= myThis.listArrondissementPossible.length - 1)
                            listeArrondissement.selecteur(myThis.listArrondissementPossible[myThis.listArrondissementPossible.indexOf(myThis.AddRdvOnClick.ArrondirDebutRdvAuPas) + 1]);
                        else
                            iceOutils.afficherMessageAlertifyError("Impossible d'avoir une tranche horraire plus longue");
                        cb();
                    }
                });

                stackBoxerParam.append(new ice2LabelContainer({
                    textLocalise: "Prévisualisation rdv",
                    type: enumTypeLabel.important,
                    labelLargeurLibre: true,
                    gap: 5,
                    optionsAffichage: {
                        positionDuContenu: enumPositionDuContenu.bas
                    },
                    initContent: new ice2CheckBox({
                        value: myThis.previsualisationSourisActive,
                        ValueChange: val => {
                            myThis.previsualisationSourisActive = val;
                            if (val)
                                myThis.contenuePrincipal.y.onmousemove = myThis.ON_MOUSE_MOUVE_PREVUSUALISATION;
                            else
                                myThis.contenuePrincipal.y.onmousemove = null;
                            myThis.SaveParamUser();
                        }
                    })
                }))

                stackBoxerParam.append(new ice2LabelContainer({
                    type: enumTypeLabel.important,
                    labelLargeurLibre: true,
                    gap: 5,
                    optionsAffichage: {
                        positionDuContenu: enumPositionDuContenu.bas,
                    },
                    textLocalise: "Tranche horaire",
                    initContent: new ice2WrapPanel({ class:"wpTrancheHoraire", espaceMinimaliste: true, initContent: [listeArrondissement, boutonMoins, boutonPlus] })
                }));

                if (myThis.AddRdvOnClick != null) {
                    stackBoxerParam.append(new ice2LabelContainer({
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        gap: 5,
                        optionsAffichage: {
                            positionDuContenu: enumPositionDuContenu.bas,
                        },
                        textLocalise: "Durée rdv par défaut (min)",
                        initContent: new ice2InputNumerique({
                            plusMinusButton: {
                                nbAAjouter: 5,
                                nbASoustrare: 5
                            },
                            value: myThis.AddRdvOnClick.DureeRdv,
                            ValueChange: val => {
                                //myThis.changementDureeRdvDefaut(val);
                                myThis.AddRdvOnClick.DureeRdv = val;
                                myThis.SaveParamUser();
                            }
                        })
                    }));
                }
            }
           

        }

        let Heures = [];
        let Minutes = myThis.HeureDebut * 60;
        for (let i = 0; i <= lignes; i++) {
            let calculHeures = Math.floor(Minutes / 60);
            let calculMinutes = Minutes % 60;
            if (calculHeures != 24)
                Heures.push(new iceTime(calculHeures, calculMinutes).getString());
            else
                Heures.push(new iceTime(0, calculMinutes).getString());

            Minutes += 60;
        }

        let j = 0;
        for (let i = 1; i <= (lignes * 12); i += 12) { //myThis.celluleLength
            let libelle = new iceDiv({ class: "libellePlanning" });

            //(car la liste commence à 0 et que la première ligne est occupée par les libellés des colonnes !)            

            libelle.asHolder.append(new iceSpan({ class: "heure", textVariable: Heures[j] }));
            let div = new ice2GridItem({
                class: i == lignes * 12 ? "LibelleLigne DerniereLigne" : "LibelleLigne",
                rowStart: i + 1, //+1 car l'indice de la grid commence à 1 et que la première colonne est occupée par les libellés des colonnes !
                colStart: 1,
                nbRows: 12, // myThis.celluleLength
                nbCols: 1, // +1 pour les heures et +1 parce que le dernier n'est pas pris en compte !myThis.NombreJour +
                content: libelle
            });

            myThis.gridZoomEtHeure.append([div]);
            j++;
        }

        myThis.contenuePrincipal.append(myThis.gridZoomEtHeure);
    }

    // Différence entre mode Ressource et Date
    private createColonnePlanning(rdvs: PlanningRdv[], dispos: PlanningDisponibilite[]) {
        let myThis: ice2Planning = this;
        myThis.listeColonne = [];

        if (rdvs == null)
            rdvs = [];

        if (dispos == null)
            dispos = [];

        if (myThis.Ressource == undefined) {
            myThis.DatesColonnes.forEach(item => {
                let dateDebutJour: DateSerialisable = DateSerialisable.CopyDateSerialisable(item);
                dateDebutJour = DateSerialisable.setTimeDateSerialisable(dateDebutJour, 0);
                let dateFinJour: DateSerialisable = DateSerialisable.CopyDateSerialisable(dateDebutJour);
                dateFinJour = DateSerialisable.addHoursDateSerialisable(dateFinJour, 23);
                dateFinJour = DateSerialisable.addMinutesDateSerialisable(dateFinJour, 59);

                //console.log(DateSerialisable.getDate(dateDebutJour), DateSerialisable.getDate(dateFinJour));


                //let dateDebutJour = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                //let dateFinJour = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 59);

                let listeRdvFiltrer = [];
                //listeRdvFiltrer = rdvs.filter(c => dateDebutJour < c.DateDebut && c.DateFin < dateFinJour).sort((a, b) => {
                listeRdvFiltrer = rdvs.filter(c => dateDebutJour.MaDateLong < c.DateDebut.MaDateLong && c.DateFin.MaDateLong < dateFinJour.MaDateLong).sort((a, b) => {
                    return DateSerialisable.CompareDate(a.DateDebut, b.DateDebut);
                });

                let listeDispoFiltrer = [];
                //listeDispoFiltrer = dispos.filter(c => dateDebutJour < c.DateDebut && c.DateFin < dateFinJour).sort((a, b) => {
                listeDispoFiltrer = dispos.filter(c => dateDebutJour.MaDateLong < c.DateDebut.MaDateLong && c.DateFin.MaDateLong < dateFinJour.MaDateLong).sort((a, b) => {
                    return DateSerialisable.CompareDate(a.DateDebut, b.DateDebut);
                });

                let colonne = new PlanningColonne({
                    Date: item,
                    listeRDV: listeRdvFiltrer,
                    ZoomChoisi: myThis.zoomChoisi,
                    ClickSurEnteteColonne: myThis.ClickSurEnteteColonne,
                    ClickSurRdv: myThis.ClickSurRdv,
                    RightClickOnRdv: myThis.RightClickSurRdv,
                    RightClickOnGrid: myThis.RightClickOnGrid,
                    RenderRightClickGrid: myThis.RenderRightCLickGrid,
                    RenderRightClickRdv: myThis.RenderRightClickRdv,
                    ClickSurDispoBarre: myThis.ClickSurDispoBarre,
                    HeureDebut: myThis.HeureDebut,
                    HeureFin: myThis.HeureFin,
                    RenderColonne: myThis.RenderColonne,
                    RenderRdv: myThis.RenderRdv,
                    TimeLineNow: myThis.TimeLineNow,
                    RdvEnCours: myThis.RdvEnCours,
                    Dispos: listeDispoFiltrer,
                    AgrandirRdv: myThis.AgrandirRdv ? {
                        ApresAgrandissement: myThis.ApresAgrandissement,
                        RdvsADeplacer: myThis.RdvsADeplacer,
                        AvantAgrandissement: myThis.AvantAgrandissement,
                    } : undefined,
                    DragAndDropRdv: myThis.dragAndDropRdv ? {
                        AvantDeplacement: myThis.AvantDeplacement,
                        ApresDeplacement: myThis.ApresDeplacement,
                        DureeMin: myThis.DureeMin,
                        RenderDivCurseur: myThis.RenderDivCurseur
                    } : undefined,
                    AddRdvOnClick: myThis.AddRdvOnClick,
                    Planning: myThis
                });

                myThis.listeColonne.push(colonne);
                myThis.contenuePrincipal.append(colonne);
            });
        } else {
            myThis.Ressource.forEach(item => {
                
                let dateDebutJour: DateSerialisable = DateSerialisable.CopyDateSerialisable(myThis.DateDebut);
                dateDebutJour = DateSerialisable.setTimeDateSerialisable(dateDebutJour, 0);
                let dateFinJour: DateSerialisable = DateSerialisable.CopyDateSerialisable(dateDebutJour);
                dateFinJour = DateSerialisable.addHoursDateSerialisable(dateFinJour, 23);
                dateFinJour = DateSerialisable.addMinutesDateSerialisable(dateFinJour, 59);


                /*console.log(DateSerialisable.getDate(dateDebutJour), DateSerialisable.getDate(dateFinJour));*/
                let listeRdvFiltrer = rdvs.filter(c => (c.Ressource == item.Id) && (DateSerialisable.getDate(dateDebutJour) < DateSerialisable.getDate(c.DateDebut) && DateSerialisable.getDate(c.DateFin) < DateSerialisable.getDate(dateFinJour))).sort((a, b) => {
                    return DateSerialisable.CompareDate(a.DateDebut, b.DateDebut);
                });;

                let listeDispoFiltrer = [];
                listeDispoFiltrer = dispos.filter(c => c.IdRessource == item.Id.toString()).sort((a, b) => {
                    return DateSerialisable.CompareDate(a.DateDebut, b.DateDebut);
                });;

                let colonne = new PlanningColonne({
                    Date: myThis.DateDebut,
                    listeRDV: listeRdvFiltrer,
                    ZoomChoisi: myThis.zoomChoisi,
                    ClickSurEnteteColonne: myThis.ClickSurEnteteColonne,
                    ClickSurRdv: myThis.ClickSurRdv,
                    RightClickOnRdv: myThis.RightClickSurRdv,
                    RightClickOnGrid: myThis.RightClickOnGrid,
                    RenderRightClickGrid: myThis.RenderRightCLickGrid,
                    RenderRightClickRdv: myThis.RenderRightClickRdv,
                    ClickSurDispoBarre: myThis.ClickSurDispoBarre,
                    HeureDebut: myThis.HeureDebut,
                    HeureFin: myThis.HeureFin,
                    RenderColonne: myThis.RenderColonne,
                    RenderRdv: myThis.RenderRdv,
                    TimeLineNow: myThis.TimeLineNow,
                    RdvEnCours: myThis.RdvEnCours,
                    Dispos: listeDispoFiltrer,
                    Ressource: item,
                    AgrandirRdv: myThis.AgrandirRdv ? {
                        ApresAgrandissement: myThis.ApresAgrandissement,
                        RdvsADeplacer: myThis.RdvsADeplacer,
                        AvantAgrandissement: myThis.AvantAgrandissement,
                    } : undefined,
                    DragAndDropRdv: myThis.dragAndDropRdv ? {
                        ApresDeplacement: myThis.ApresDeplacement,
                        AvantDeplacement: myThis.AvantDeplacement,
                        DureeMin: myThis.DureeMin,
                        RenderDivCurseur: myThis.RenderDivCurseur,
                    } : undefined,
                    AddRdvOnClick: myThis.AddRdvOnClick,
                    Planning: myThis
                });

                myThis.listeColonne.push(colonne);
                myThis.contenuePrincipal.append(colonne);
            })
        }

    }

    // Différence entre mode Ressource et Date
    public changerDatePlanning(date: DateSerialisable, rdvs: PlanningRdv[] = null, dispos: PlanningDisponibilite[] = null) {
        let myThis: ice2Planning = this;

        myThis.DateDebut = date;

        myThis.supprimerRdvPrevisualiser();
        myThis.contenuePrincipal.vider();

        if (myThis.typeAffichage == EPlanningTypeAffichage.Standard) {
            if (myThis.Ressource == undefined)
                myThis.calculDateColonne(myThis.NombreJour == 7);
            myThis.createColonneZoomEtHeure();
            myThis.createColonnePlanning(rdvs, dispos);
        }
        else {
            myThis.CreateModeMois(rdvs);
        }
    }

    public getColonneByDispo(dispo: PlanningDisponibilite): PlanningColonne {
        let myThis: ice2Planning = this;
        let colonne: PlanningColonne;

        if (myThis.typeAffichage == EPlanningTypeAffichage.Standard) {
            let dateRdv: DateSerialisable = DateSerialisable.DateWithoutTime(dispo.DateDebut);
            if (myThis.Ressource == null)
                colonne = myThis.listeColonne.filter(c => DateSerialisable.CompareDate(DateSerialisable.DateWithoutTime(c.DateColonne), dateRdv) == 0)[0];
            else
                colonne = myThis.listeColonne.filter(c => c.Ressource.Id.toString() == dispo.IdRessource)[0];
        }

        return colonne;
    }

    public getColonne(rdv: PlanningRdv): PlanningColonne {
        let myThis: ice2Planning = this;
        let colonne: PlanningColonne;

        if (myThis.typeAffichage == EPlanningTypeAffichage.Standard) {
            let dateRdv: DateSerialisable = DateSerialisable.DateWithoutTime(rdv.DateDebut);
            if (myThis.Ressource == null)
                colonne = myThis.listeColonne.filter(c => DateSerialisable.CompareDate(DateSerialisable.DateWithoutTime(c.DateColonne), dateRdv) == 0)[0];
            else
                colonne = myThis.listeColonne.filter(c => c.Ressource.Id == rdv.Ressource)[0];
        }

        return colonne;
    }

    // Différence entre mode Ressource et Date
    public ajouterRdvs(rdvs: PlanningRdv[]) {
        let myThis: ice2Planning = this;

        if (rdvs != null && rdvs.length > 0) {
            if (myThis.typeAffichage == EPlanningTypeAffichage.Mois) {
                myThis.celluleJoursMois.forEach(function (cellule) {
                    let rdvsCellule: PlanningRdv[] = rdvs.filter(f => cellule.isDate(DateSerialisable.CopyDateSerialisable(f.DateDebut)));

                    if (rdvsCellule.length > 0) {
                        rdvsCellule.sort((a, b) => DateSerialisable.CompareDate(a.DateDebut, b.DateDebut));

                        cellule.AjouterRdvs(rdvsCellule);
                    }
                });
            }
            else {
                let listeColonnesImpactees: PlanningColonne[] = [];
                rdvs.forEach(item => {
                    let colonne: PlanningColonne = myThis.getColonne(item);
                    if (colonne != null && !listeColonnesImpactees.includes(colonne))
                        listeColonnesImpactees.push(colonne);
                });

                listeColonnesImpactees.forEach(colonne => {
                    let rdvsColonne: PlanningRdv[] = rdvs.filter(r => myThis.getColonne(r) == colonne);
                    colonne.ajouterRdv(rdvsColonne);
                });
            }

        }
    }

    // Différence entre mode Ressource et Date
    public supprimerRdv(rdvs: PlanningRdv[]) {
        let myThis: ice2Planning = this;

        if (rdvs != null && rdvs.length > 0) {
            if (myThis.typeAffichage == EPlanningTypeAffichage.Mois) {
                rdvs.forEach(function (r) {
                    let cellule: CelluleMoisJour = myThis.getCelluleJourPourMois(DateSerialisable.CopyDateSerialisable(r.DateDebut));
                    if (cellule != null)
                        cellule.SupprimerRdvs([r]);
                });
            }
            else {
                let listeColonnesImpactees: PlanningColonne[] = [];
                rdvs.forEach(item => {
                    let colonne: PlanningColonne = myThis.getColonne(item);
                    if (colonne != null && !listeColonnesImpactees.includes(colonne))
                        listeColonnesImpactees.push(colonne);
                });

                listeColonnesImpactees.forEach(colonne => {
                    let rdvsColonne: PlanningRdv[] = rdvs.filter(r => myThis.getColonne(r) == colonne);
                    colonne.supprimerRdv(rdvsColonne);
                });
            }
        }
    }

    public supprimerAllRdv() {
        let myThis: ice2Planning = this;

        if (myThis.typeAffichage == EPlanningTypeAffichage.Mois) {
            myThis.celluleJoursMois.forEach(s => s.supprimerAllRdvs());
        }
        else
            myThis.listeColonne.forEach(colonne => colonne.supprimerAllRdvs());
    }

    // Différence entre mode Ressource et Date
    public ajouterDispo(dispos: PlanningDisponibilite[]) {
        let myThis: ice2Planning = this;

        if (dispos != null && dispos.length > 0) {
            if (myThis.typeAffichage == EPlanningTypeAffichage.Standard) {
                let listeColonnesImpactees: PlanningColonne[] = [];
                dispos.forEach(item => {
                    let colonne: PlanningColonne = myThis.getColonneByDispo(item);
                    if (colonne != null && !listeColonnesImpactees.includes(colonne))
                        listeColonnesImpactees.push(colonne);
                });

                listeColonnesImpactees.forEach(colonne => {
                    let disposColonne: PlanningDisponibilite[] = dispos.filter(r => myThis.getColonneByDispo(r) == colonne);
                    colonne.ajouterDispos(disposColonne);
                });
            }

        }
    }

    public supprimerAllDispo() {
        let myThis: ice2Planning = this;

        if (myThis.typeAffichage == EPlanningTypeAffichage.Standard) {
            myThis.listeColonne.forEach(s => s.supprimerAllDispos());
        }
    }

    private previsualisationRdv(event: MouseEvent, fromDragAndDrop: boolean) {
        let myThis: ice2Planning = this;

        let widthTotal: number = <number>myThis.contenuePrincipal.width();
        let widthColonneHeure: number = <number>myThis.gridZoomEtHeure.width();

        let widthTotalColonne: number = widthTotal - widthColonneHeure;
        let widthUneColonne: number = widthTotalColonne / myThis.listeColonne.length;

        let cursor_x: number = event.clientX;


        let div_x: number = myThis.y.getBoundingClientRect().left;

        let leftPosition: number = cursor_x - div_x;

        if (leftPosition > widthColonneHeure) {

            leftPosition = leftPosition - widthColonneHeure;
            let indexColonne: number;

            for (let i = 1; i <= myThis.listeColonne.length; i++) {
                if ((i * widthUneColonne) > leftPosition && i == 1)
                    indexColonne = 0;
                else if (((i * widthUneColonne) > leftPosition) && (((i - 1) * widthUneColonne) < leftPosition)) {
                    indexColonne = i - 1;
                }
            }

            let colonne = myThis.listeColonne[indexColonne];
            if (colonne != null) {
                let postionH: number[] = colonne.getPositionByEvent(event, fromDragAndDrop);

                myThis.afficherPrevisualisation(indexColonne, postionH[0], postionH[1] - postionH[0], 1, fromDragAndDrop);
            }

        }
    }

    private supprimerRdvPrevisualiser() {
        let myThis: ice2Planning = this;

        if (myThis.PrevisualisationRdv != null) {

            myThis.listeColonne.forEach((item, idx) => {
                item.supprimerRdvPrevisualisation(myThis.PrevisualisationRdv);
            });
        }
    }

    public ajouterClassHeure(classCss: string) {
        let myThis: ice2Planning = this;

        myThis.gridZoomEtHeure.addClass(classCss);
    }

    public supprimerClassHeure(classCss: string) {
        let myThis: ice2Planning = this;

        myThis.gridZoomEtHeure.removeClass(classCss);
    }

    public masquerAllRdv(): void {
        let myThis: ice2Planning = this;

        myThis.getAllRdvs().forEach(item => {
            cachericeElements(item.Item, true);
        });
    }

    public masquerRdvByIds(ids: number[]): void {
        let myThis: ice2Planning = this;
        myThis.getAllRdvs().forEach(item => {
            if (ids.some(c => item.Id == c))
                cachericeElements(item.Item, true);
        });
    }

    public afficherRdvByIds(ids: number[]): void {
        let myThis: ice2Planning = this;
        myThis.getAllRdvs().forEach(item => {
            if (ids.some(c => item.Id == c))
                affichericeElements(item.Item);
        });
    }

    public afficherAllRdv(): void {
        let myThis: ice2Planning = this;

        myThis.getAllRdvs().forEach(item => {
            affichericeElements(item.Item);
        });
    }

    public masquerAllDisponibilite(): void {
        let myThis: ice2Planning = this;

        myThis.getAllDisponibilites().forEach(item => {
            cachericeElements(item.Item, true);
        });
    }

    public masquerDisponibiliteByIds(ids: string[]): void {
        let myThis: ice2Planning = this;

        myThis.getAllDisponibilites().forEach(item => {
            if (ids.some(c => item.Id == c))
                cachericeElements(item.Item, true);
        });
    }

    public afficherDisponibiliteByIds(ids: string[]): void {
        let myThis: ice2Planning = this;

        myThis.getAllDisponibilites().forEach(item => {
            if (ids.some(c => item.Id == c))
                affichericeElements(item.Item);
        });
    }

    public afficherAllDisponibilite(): void {
        let myThis: ice2Planning = this;

        myThis.getAllDisponibilites().forEach(item => {
            affichericeElements(item.Item);
        });
    }


    public AjouterSelectionCreneau(rdv: PlanningRdv) {
        let myThis: ice2Planning = this;

        if (myThis.creneauSelectionne != null)
            myThis.supprimerRdv([myThis.creneauSelectionne]);

        myThis.creneauSelectionne = rdv;

        myThis.ajouterRdvs([myThis.creneauSelectionne]);

        if (myThis.AddRdvOnClick.RdvAdded != undefined)
            myThis.AddRdvOnClick.RdvAdded(myThis.creneauSelectionne);
    }

    private afficherPrevisualisation(indiceColonne: number, rowStart: number, nbRows: number, colStart: number, fromDragAndDrop: boolean) {
        let myThis: ice2Planning = this;

        let colonne = myThis.listeColonne[indiceColonne];
        if (colonne != null) {

            myThis.supprimerRdvPrevisualiser();

            let content: iXElement = null

            if (fromDragAndDrop)
                content = myThis.RenderDivCurseur != undefined ? myThis.RenderDivCurseur(myThis.RdvSelect) : new iceDiv({ class: "RenderDivCurseur" })
            else {
                content = new iceDiv({});
                myThis.AddRdvOnClick.PrevisualisationSouris.RenderPrevisualisationSouris((<iceDiv>content).asHolder, myThis.rdvPrevisualiseFictif);
            }


            myThis.PrevisualisationRdv = new ice2GridItem({
                rowStart: rowStart,
                nbRows: nbRows,
                colStart: colStart, // +1 pour la colonne disponibilité
                nbCols: colonne.NbColonnes,
                class: "PrevisualisationRdv",
                content: content
            });

            if (nbRows > 0)
                colonne.ajouterRdvPrevisualisation(myThis.PrevisualisationRdv);
        }
    }

    private LoadInfoWithDate() {
        let myThis: ice2Planning = this;
        let premierJourDuMois: DateSerialisable = DateSerialisable.getPremierJourDuMois(myThis.DateDebut);
        myThis.premierJourGrid = DateSerialisable.getPremierJourSemaine(premierJourDuMois);

        let dernierJourDuMois: DateSerialisable = DateSerialisable.getDernierJourMois(myThis.DateDebut);
        myThis.premiereSemaine = DateSerialisable.getWeek(myThis.premierJourGrid);
        if (DateSerialisable.getDate(myThis.premierJourGrid).getDay() == 0)
            myThis.premiereSemaine--;

        myThis.derniereSemaine = DateSerialisable.getWeek(dernierJourDuMois);

        if (DateSerialisable.getDate(dernierJourDuMois).getDay() == 0)
            myThis.derniereSemaine--;
        myThis.moisCourant = DateSerialisable.getDate(myThis.DateDebut).getMonth();


    }

    private LoadHeaderGridMonth() {
        let myThis: ice2Planning = this;
        let lignesAuto: string = "30px ";

        let nbLignes: number = myThis.derniereSemaine % myThis.premiereSemaine + 1
        for (let x = 0; x < nbLignes; x++) {
            lignesAuto += " 1fr";
        }

        myThis.GridMonth = new ice2Grid({

            colonnes_auto: "120px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            lignes_auto: lignesAuto,
            gridGap: "0",
            class: "gridMois",

        })
            .append([new ice2GridItem({
                colStart: 1,
                rowStart: 1,
                nbCols: 1,
                nbRows: 1,
                content: new ice2Label({ textLocalise: "Plage", type: enumTypeLabel.important, centrer: true, }),
                class: "premiereLigne",
            })])
            .append([new ice2GridItem({
                colStart: 2,
                rowStart: 1,
                nbCols: 1,
                nbRows: 1,
                content: new ice2Label({ textLocalise: "Lundi", type: enumTypeLabel.important }),
                class: "premiereLigne",
            })])
            .append([new ice2GridItem({
                colStart: 3,
                rowStart: 1,
                nbCols: 1,
                nbRows: 1,
                content: new ice2Label({ textLocalise: "Mardi", type: enumTypeLabel.important }),
                class: "premiereLigne",
            })])
            .append([new ice2GridItem({
                colStart: 4,
                rowStart: 1,
                nbCols: 1,
                nbRows: 1,
                content: new ice2Label({ textLocalise: "Mercredi", type: enumTypeLabel.important }),
                class: "premiereLigne",
            })])
            .append([new ice2GridItem({
                colStart: 5,
                rowStart: 1,
                nbCols: 1,
                nbRows: 1,
                content: new ice2Label({ textLocalise: "Jeudi", type: enumTypeLabel.important }),
                class: "premiereLigne",
            })])
            .append([new ice2GridItem({
                colStart: 6,
                rowStart: 1,
                nbCols: 1,
                nbRows: 1,
                content: new ice2Label({ textLocalise: "Vendredi", type: enumTypeLabel.important }),
                class: "premiereLigne",
            })])
            .append([new ice2GridItem({
                colStart: 7,
                rowStart: 1,
                nbCols: 1,
                nbRows: 1,
                content: new ice2Label({ textLocalise: "Samedi", type: enumTypeLabel.important }),
                class: "premiereLigne",
            })])
            .append([new ice2GridItem({
                colStart: 8,
                rowStart: 1,
                nbCols: 1,
                nbRows: 1,
                content: new ice2Label({ textLocalise: "Dimanche", type: enumTypeLabel.important }),
                class: "premiereLigne",
            })])


    }

    private LoadContenuGridMonth(rdvs: PlanningRdv[]) {
        let myThis: ice2Planning = this;
        myThis.celluleJoursMois = [];
        let nbLignes: number;
        if (myThis.premiereSemaine > myThis.derniereSemaine)
            nbLignes = myThis.derniereSemaine;
        else
            nbLignes = myThis.derniereSemaine - myThis.premiereSemaine;

        nbLignes++;
        let jourCourant: DateSerialisable = myThis.premierJourGrid;

        for (let semaine = 0; semaine < nbLignes; semaine++) {
            let numWeek: number;
            if (myThis.premiereSemaine > myThis.derniereSemaine) { // cas Janvier
                if (semaine == 0) { // semaine 52 ou 53
                    numWeek = myThis.premiereSemaine
                }
                else {
                    numWeek = semaine;
                }
            }
            else { //cas fev-dec
                numWeek = semaine + myThis.premiereSemaine;
            }


            let label = new ice2LabelContainer({ optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas } });

            label.append(new ice2Label({ textVariable: new iceLString("Semaine n°").text + numWeek, type: enumTypeLabel.important }));
            label.asHolder.append(new ice2Label({ textVariable: "Du " + DateSerialisable.tolocalStringOnlyDate(jourCourant) })),
                label.asHolder.append(new ice2Label({ textVariable: "au " + DateSerialisable.tolocalStringOnlyDate(DateSerialisable.addDaysSerialisable(jourCourant, 6)) }))

            myThis.GridMonth.append( // gridItem pour colonne Plage
                [new ice2GridItem({
                    colStart: 1,
                    rowStart: semaine + 2,
                    nbCols: 1,
                    nbRows: 1,
                    content: label,


                })]
            );

            for (let jour = 1; jour < 8; jour++) {
                let numeroMois: number = DateSerialisable.getDate(jourCourant).getMonth();

                let dateJour: DateSerialisable = jourCourant;
                let celluleMoisJour: CelluleMoisJour = new CelluleMoisJour(myThis.clickSurJourModeMois, dateJour, myThis.RenderRdv);
                myThis.celluleJoursMois.push(celluleMoisJour);

                myThis.GridMonth.append( // gridItem pour colonne Plage
                    [new ice2GridItem({
                        colStart: jour + 1,
                        rowStart: semaine + 2,
                        nbCols: 1,
                        nbRows: 1,
                        content: celluleMoisJour,
                        class: numeroMois != myThis.moisCourant ? "Gris" : "Blanc"

                    })]
                );


                jourCourant = DateSerialisable.addDaysSerialisable(jourCourant, 1);
            }
        }

        myThis.ajouterRdvs(rdvs);
    }

    public setModeAffichage(typeAffichage: EPlanningTypeAffichage, rdvs: PlanningRdv[], dispos: PlanningDisponibilite[], nbJoursAffiches: number, isTypeIntervaleSemaine: boolean) {
        let myThis: ice2Planning = this;
        myThis.typeAffichage = typeAffichage;

        if (myThis.typeAffichage == EPlanningTypeAffichage.Standard)
        {
            myThis.NombreJour = nbJoursAffiches;
            myThis.calculDateColonne(isTypeIntervaleSemaine)
        }

        if (myThis.contenuePrincipal == null) {
            myThis.contenuePrincipal = new ice2WrapPanel({
                retourALaLigne: false,
                espaceMinimaliste: true,
                initContent: [],
                class: "ice2Planning"
            });
        }
        else {
            myThis.contenuePrincipal.vider();
            myThis.contenuePrincipal.removeClass('contenuMois');
        }

        if (myThis.typeAffichage == EPlanningTypeAffichage.Standard) {
            myThis.contenuMenuClicDroit = new iceDiv({ class: "contextPlanning" });

            myThis.contenuMenuClicDroit.y.style.position = "absolute";
            myThis.contenuMenuClicDroit.y.style.zIndex = "0";

            let bouhTon = new ice2Bouton({
                textVariable: "Coller",
                icone: new IconeP12(enumIconeP12.action_coller),
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit
                },
                titleLocalise: "Coller",
                class: "btnColler",
                click: (cb) => {
                    myThis.RightClickOnGrid(myThis.RdvSelectRightClic);
                    myThis.callbackToDeleteRightClick();
                    cb();
                }
            });

            myThis.callbackToDeleteRightClick = () => {
                myThis.contenuMenuClicDroit.y.style.zIndex = "0";
                cachericeElements(myThis.contenuMenuClicDroit, true);
            }

            myThis.contenuMenuClicDroit.asHolder.append(bouhTon);

            if (myThis.RightClickOnGrid != null || myThis.RightClickSurRdv != null) {
                document.body.append(myThis.contenuMenuClicDroit.y);
            }

            myThis.createColonneZoomEtHeure();
            myThis.createColonnePlanning(rdvs, dispos);

            myThis.contenuePrincipal.y.removeEventListener('contextmenu', myThis.clicDroitAction);

            myThis.contenuePrincipal.y.addEventListener("contextmenu", myThis.clicDroitAction, false);

            if (myThis.AddRdvOnClick != null && myThis.AddRdvOnClick.PrevisualisationSouris != null && myThis.previsualisationSourisActive) {
                myThis.contenuePrincipal.y.onmousemove = myThis.ON_MOUSE_MOUVE_PREVUSUALISATION;
                myThis.contenuePrincipal.y.onmouseleave = () => {
                    myThis.supprimerRdvPrevisualiser();
                }
            }

            cachericeElements(myThis.contenuMenuClicDroit, true);
        }
        else {
            myThis.contenuePrincipal.addClass('contenuMois');

            myThis.CreateModeMois(rdvs);
        }
    }

    private clicDroitAction(event: MouseEvent) {
        let myThis: ice2Planning = this;
        if (myThis.RightClickOnGrid != null || myThis.RightClickSurRdv != null) {
            let width = <number>myThis.contenuMenuClicDroit.width();
            let height = <number>myThis.contenuMenuClicDroit.height();

            let posX = event.clientX;
            let posY = event.clientY;
            if (event.clientX + width > window.innerWidth || event.clientY + height > window.innerHeight) {
                posX = posX - width;
                posY = posY - height;
            }

            myThis.contenuMenuClicDroit.y.style.left = posX.toString() + "px";
            myThis.contenuMenuClicDroit.y.style.top = posY.toString() + "px";
            myThis.contenuMenuClicDroit.y.style.zIndex = "5";
        }
        event.preventDefault();
        return false;
    }

    public getModeAffichage(): EPlanningTypeAffichage {
        let myThis: ice2Planning = this;
        return myThis.typeAffichage;
    }

    /**
     * Retourne le stackpanel correspondant au jour donné.
     * @param dateDansLeMois
     */
    private getCelluleJourPourMois(dateDansLeMois: DateSerialisable): CelluleMoisJour {
        let myThis: ice2Planning = this;
        return myThis.celluleJoursMois.filter(f => f.isDate(dateDansLeMois))[0];
    }

    private CreateModeMois(rdvs: PlanningRdv[]) {
        let myThis: ice2Planning = this;

        myThis.LoadInfoWithDate();
        myThis.LoadHeaderGridMonth();
        myThis.LoadContenuGridMonth(rdvs);
        myThis.contenuePrincipal.append(myThis.GridMonth);

    }

    private LoadParamUser() {
        let myThis: ice2Planning = this;

        myThis.ListParamUser = JSON.parse(iceOutils.getLocalStorage(KeyLocalStorageParamUser));

        if (myThis.ListParamUser != null) {
            let tmp = myThis.ListParamUser.filter(e => e.KeyPlanning == myThis.keyPlanning);
            if (tmp.length == 0) {
                myThis.ListParamUser.push(new PlanningParamUser(
                    myThis.keyPlanning,
                    myThis.zoomChoisi != null ? myThis.zoomChoisi.Value : null,
                    myThis.AddRdvOnClick != null ? myThis.AddRdvOnClick.ArrondirDebutRdvAuPas : null,
                    myThis.AddRdvOnClick != null ? myThis.AddRdvOnClick.DureeRdv : null,
                    myThis.AddRdvOnClick != null ? myThis.previsualisationSourisActive : null,
                ));
            }
            else {
                if (myThis.zoom)
                    myThis.zoomChoisi.Value = tmp[0].Zoom;

                if (myThis.AddRdvOnClick != null) {
                    let besoinSave = false;

                    myThis.AddRdvOnClick.ArrondirDebutRdvAuPas = tmp[0].Arrondissement;
                    myThis.AddRdvOnClick.DureeRdv = tmp[0].DureeRdv;
                    myThis.previsualisationSourisActive = tmp[0].PrevisualisationRdv;

                    // Début : Permet de mettre à jours les stockage déjà fais avant cette modif 
                    if (myThis.AddRdvOnClick.ArrondirDebutRdvAuPas == null) {
                        myThis.AddRdvOnClick.ArrondirDebutRdvAuPas = 5;
                        besoinSave = true;
                    }

                    if (myThis.AddRdvOnClick.DureeRdv == null) {
                        myThis.AddRdvOnClick.DureeRdv = 60;
                        besoinSave = true;
                    }

                    if (myThis.previsualisationSourisActive == null) {
                        myThis.previsualisationSourisActive = true;
                        besoinSave = true;
                    }

                    if (besoinSave)
                        myThis.SaveParamUser();

                    // FIN
                }
            }
        }
        else {
            myThis.ListParamUser = [];
            myThis.ListParamUser.push(new PlanningParamUser(
                myThis.keyPlanning,
                myThis.zoom ? myThis.zoomChoisi.Value : null,
                myThis.AddRdvOnClick != null ? myThis.AddRdvOnClick.ArrondirDebutRdvAuPas : null,
                myThis.AddRdvOnClick != null ? myThis.AddRdvOnClick.DureeRdv : null,
                myThis.AddRdvOnClick != null ? myThis.previsualisationSourisActive : null,
            ));
        }

    }

    private SaveParamUser() {
        let myThis: ice2Planning = this;

        if (myThis.keyPlanning != null) {
            myThis.ListParamUser.forEach(e => {
                if (e.KeyPlanning == myThis.keyPlanning) {

                    if (myThis.zoomChoisi.Value != null)
                        e.Zoom = myThis.zoomChoisi.Value;

                    if (myThis.AddRdvOnClick != null) {
                        e.Arrondissement = myThis.AddRdvOnClick.ArrondirDebutRdvAuPas;
                        e.DureeRdv = myThis.AddRdvOnClick.DureeRdv;
                        e.PrevisualisationRdv = myThis.previsualisationSourisActive;
                    }
                }

            });

            iceOutils.setLocalStorage(KeyLocalStorageParamUser, JSON.stringify(myThis.ListParamUser));
        }
    }

    public getAllRdvs(): PlanningRdv[] {
        let myThis: ice2Planning = this;
        let retour: PlanningRdv[] = [];

        if (myThis.typeAffichage == EPlanningTypeAffichage.Standard) {
            myThis.listeColonne.forEach(colonne => {
                colonne.getRendezVous().forEach(rdv => retour.push(rdv));
            });
        }
        else {
            myThis.celluleJoursMois.forEach(cellule => {
                cellule.GetAllRendezVous().forEach(rdv => retour.push(rdv));
            });
        }

        return retour;
    }

    public getRdvById(id: number): PlanningRdv {
        let myThis: ice2Planning = this;
        let retour: PlanningRdv = null;

        if (myThis.typeAffichage == EPlanningTypeAffichage.Standard) {
            myThis.listeColonne.forEach(colonne => {
                let rdvFiltre = colonne.getRendezVous().filter(rdv => rdv.Id == id)[0];

                if (rdvFiltre != null)
                    retour = rdvFiltre
            });
        }
        else {
            myThis.celluleJoursMois.forEach(cellule => {

                let rdvFiltre = cellule.GetAllRendezVous().filter(rdv => rdv.Id == id)[0];

                if (rdvFiltre != null)
                    retour = rdvFiltre
            });
        }

        return retour;
    }

    public getAllDisponibilites(): PlanningDisponibilite[] {
        let myThis: ice2Planning = this;
        let retour: PlanningDisponibilite[] = [];

        myThis.listeColonne.forEach(colonne => {
            colonne.getDisponibilites().forEach(d => retour.push(d));
        });

        return retour;
    }

    public ActiverRdvTransparents() {
        let myThis: ice2Planning = this;

        myThis.contenuePrincipal.addClass("ModeRdvTransparent");
    }

    public DesactiverRdvTransparents() {
        let myThis: ice2Planning = this;

        myThis.contenuePrincipal.removeClass("ModeRdvTransparent");
    }
}