import { cacherxElements, afficherxElements, assignerObjet } from '../../xStaticFunctions';
import { xOutils } from '../xOutils';
import { xxLabelContainer } from '../xcontrols/xxLabelContainer';
import { PlanningRdv, PlanningDisponibilite } from './PlanningElements';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { iXElement, iXElementHolder } from '../xBase';

import { PlanningRessource, enumTypeDispo } from './PlanningElements';
import { optionAgrandirRdv, optionAddRdvOnClick, optionDragAndDropRdv } from './xxPlanning';
import { xxGrid, xxGridItem, OptionsGridItem } from '../xcontrols/xxGrid';
import { xDiv } from '../xcontrols/xDiv';
import { xxLabel, enumTypeLabel } from '../xcontrols/xxLabel';
import { enumPositionDuContenu } from '../xcontrols/xxLabelContainer';

import { xxIndicateur } from '../xcontrols/xxIndicateur';
import { xxStackPanel } from '../xcontrols/xxStackPanel';
import { xxWrapPanel, enumAlignementHorizontalWrapPanel, enumAlignementVerticalWrapPanel } from '../xcontrols/xxWrapPanel';
import { xxBouton } from '../xcontrols/xxBouton';
import { IconeP12, enumIconeP12, tailleIcone } from '../xIcones';
import { xMaths } from '../xMaths';
import { xLString } from '../xLString';

import { xxMenuContextuel } from '../xcontrols/xxMenuContextuel';
import { xxPlanning } from './xxPlanning';
import { BindableObject } from '../xcontrols/BindableObject';

interface optionPlanningColonne {
    listeRDV: PlanningRdv[]; 
    Date: DateSerialisable;
    HeureDebut?: number;
    HeureFin?: number;
    Dispos?: PlanningDisponibilite[];
    ClickSurRdv?: (data: PlanningRdv) => void;
    RightClickOnRdv?: (data: PlanningRdv) => void;
    RightClickOnGrid?: (data: PlanningRdv) => void;
    RenderRightClickRdv?: (data: PlanningRdv, place: iXElementHolder, tooltip: xxMenuContextuel) => void;
    RenderRightClickGrid?: (data: PlanningRdv, place: iXElementHolder, tooltip: xxMenuContextuel) => void;
    ClickSurEnteteColonne?: (div: iXElement, rdv: PlanningColonne) => void;
    ClickSurDispoBarre?: (dispo: PlanningDisponibilite) => void;
    RenderRdv?: (rdv: PlanningRdv) => iXElement;
    RenderColonne?: (infoColonne: PlanningColonne) => iXElement;
    TimeLineNow?: boolean;
    RdvEnCours?: (heureTimeLine: DateSerialisable, rdvEnCours: PlanningRdv, rdvsSuivants: PlanningRdv[], refreshColonne: () => void) => void;
    ZoomChoisi: BindableObject<number>;
    Ressource?: PlanningRessource;
    Planning: xxPlanning,
    AgrandirRdv?: optionAgrandirRdv;
    DragAndDropRdv?: optionDragAndDropRdv;
    AddRdvOnClick?: optionAddRdvOnClick;
}

export class PlanningColonne implements iXElement {
    private Planning: xxPlanning;
    private GridPrincipale: xxGrid;

    private HeureDebut: number;
    private HeureFin: number;
    public DateColonne: DateSerialisable;

    private TimeLine: boolean;
    private RdvEnCours: (heureTimeLine: DateSerialisable, rdvEnCours: PlanningRdv, rdvsSuivants: PlanningRdv[], refreshColonne: () => void) => void;

    public NbColonnes: number;
    private NbLignes: number;

    private GridItemTime: xxGridItem;

    private RdvsColonne: PlanningRdv[];
    private DisposColonne: PlanningDisponibilite[];
    private RenderRdv: (rdv: PlanningRdv) => iXElement;
    private RenderColonne: (infoColonne: PlanningColonne) => iXElement;
    private ClickSurEnteteColonne: (div: iXElement, rdv: PlanningColonne) => void;
    private ClickSurRdv: (rdv: PlanningRdv) => void;


    // option pour le click droit
    private RightClickSurRdv: (data: PlanningRdv) => void = null;
    private RightClickOnGrid: (data: PlanningRdv) => void = null;

    private RenderRightClickRdv: (data: PlanningRdv, place: iXElementHolder, tooltip: xxMenuContextuel) => void = null;
    private RenderRightCLickGrid: (data: PlanningRdv, place: iXElementHolder, tooltip: xxMenuContextuel) => void = null;

    private ClickSurDispoBarre: (dispo: PlanningDisponibilite) => void;
    private AvecDispoBarre: boolean;

    private dragAndDropRdv: boolean = false;
    private AvantDeplacement: (rdv: PlanningRdv) => void;
    private ApresDeplacement: (rdv: PlanningRdv) => void;
    private DureeMin?: (rdv: PlanningRdv) => [number, number];
    private RenderDivCurseur: (rdv: PlanningRdv) => iXElement;

    public Ressource: PlanningRessource;

    private ZoomChoisi: BindableObject<number>;

    private DispoBlocMax: number;

    private AgrandirRDV: boolean = false;
    private RdvsADeplacer: (rdv: PlanningRdv, dateDebut: boolean) => PlanningRdv[];
    private ApresAgrandissement?: (rdv: PlanningRdv) => void;
    private AvantAgrandissement?: (rdv: PlanningRdv) => void;
    private rdvAvantAgrandissement: PlanningRdv = null;
    private diffEnCours: number = 0;

    private GridItemLibelle: xxGridItem;


    public ON_MOUSE_MOUVE_AGRANDISSEMENT: (e: MouseEvent) => void;

    static CLASS_CSS_AGRANDISSEMENT_EN_COUR = "AgrandissementEnCour";
    static CLASS_CSS_DRAG_EN_COUR = "DragEnCour";
    static ClASS_CSS_AGRANDISSEMENT_HAUT = "AgrandissementHaut";
    static CLASS_CSS_AGRANDISSEMENT_BAS = "AgrandissementBas";

    private AddRdvOnClick: optionAddRdvOnClick;

    public width(parame?: string | number): void | number {
        let myThis: PlanningColonne = this;
        if (parame != undefined) {
            myThis.y.style.width = typeof parame === 'number' ? parame + 'px' : parame;
        } else {
            return myThis.y.offsetWidth;
        }
    }

    public height(parame?: string | number): void | number {
        let myThis: PlanningColonne = this;
        if (parame != undefined) {
            myThis.y.style.height = typeof parame === 'number' ? parame + 'px' : parame;
        } else {
            return myThis.y.offsetHeight;
        }
    }
    public get y() {
        return this.GridPrincipale.y;
    }
    public constructor(option: optionPlanningColonne) {
        let myThis: PlanningColonne = this;

        myThis.DateColonne = option.Date;
        myThis.HeureDebut = option.HeureDebut;
        myThis.HeureFin = option.HeureFin;
        myThis.ZoomChoisi = option.ZoomChoisi;
        myThis.RenderRdv = option.RenderRdv;
        myThis.RenderColonne = option.RenderColonne;
        myThis.RdvsColonne = option.listeRDV;
        myThis.DisposColonne = option.Dispos;
        myThis.ClickSurEnteteColonne = option.ClickSurEnteteColonne;
        myThis.ClickSurRdv = option.ClickSurRdv;
        myThis.RightClickSurRdv = option.RightClickOnRdv;
        myThis.RightClickOnGrid = option.RightClickOnGrid;
        myThis.RenderRightCLickGrid = option.RenderRightClickGrid;
        myThis.RenderRightClickRdv = option.RenderRightClickRdv;
        myThis.TimeLine = option.TimeLineNow;
        myThis.ClickSurDispoBarre = option.ClickSurDispoBarre;
        myThis.Ressource = option.Ressource;
        myThis.Planning = option.Planning;

        myThis.ON_MOUSE_MOUVE_AGRANDISSEMENT = (e: MouseEvent) => { myThis.agrandirRdvByDeplacement(e, myThis.GridPrincipale.y.classList.contains(PlanningColonne.ClASS_CSS_AGRANDISSEMENT_HAUT)); }

        if (option.DragAndDropRdv != undefined) {
            myThis.dragAndDropRdv = true;

            myThis.AvantDeplacement = option.DragAndDropRdv.AvantDeplacement;
            myThis.ApresDeplacement = option.DragAndDropRdv.ApresDeplacement;
            myThis.DureeMin = option.DragAndDropRdv.DureeMin;
            myThis.RenderDivCurseur = option.DragAndDropRdv.RenderDivCurseur;

            myThis.RdvEnCours = option.RdvEnCours;

            if (myThis.ApresDeplacement == undefined)
                myThis.ApresDeplacement = (rdv) => {
                    myThis.Planning.ajouterRdvs([rdv]);
                }
            if (myThis.RenderDivCurseur == undefined)
                myThis.RenderDivCurseur = (rdv) => {
                    return rdv.renderRdv();
                }
            if (myThis.AvantDeplacement == undefined)
                myThis.AvantDeplacement = (rdv) => { };
        }

        if (option.AgrandirRdv != undefined) {
            myThis.AgrandirRDV = true;
            myThis.ApresAgrandissement = option.AgrandirRdv.ApresAgrandissement;
            myThis.RdvsADeplacer = option.AgrandirRdv.RdvsADeplacer

            myThis.AvantAgrandissement = option.AgrandirRdv.AvantAgrandissement;

            if (myThis.ApresAgrandissement == undefined)
                myThis.ApresAgrandissement = (rdv) => { };
            if (myThis.RdvsADeplacer == undefined)
                myThis.RdvsADeplacer = (rdv, isDateDebut) => { return []; }
            if (myThis.AvantAgrandissement == undefined)
                myThis.AvantAgrandissement = (rdv) => { };
        }

        if (option.AddRdvOnClick != undefined) {
            myThis.AddRdvOnClick = option.AddRdvOnClick
        }

        if (myThis.ZoomChoisi != undefined) {

            myThis.ZoomChoisi.bind(c => {
                myThis.supprimerClass("p100");
                myThis.supprimerClass("p150");
                myThis.supprimerClass("p200");
                myThis.supprimerClass("p250");
                myThis.supprimerClass("p300");
                myThis.supprimerClass("p350");
                myThis.supprimerClass("p400");
                myThis.ajouterClass("p" + myThis.ZoomChoisi.Value.toString());
            })
        }

        

        myThis.createGrid();

        if (myThis.TimeLine) {
            setInterval(() => { myThis.creerTimeLine(); }, 60000);
        }
    }

    private createGrid() {
        let myThis: PlanningColonne = this;

        //Construction du grid
        let listeColonnes = [];

        // On tri les rdv
        myThis.RdvsColonne = myThis.RdvsColonne.sort((a, b) => {
            if (a.DateDebut.MaDateLong != b.DateDebut.MaDateLong)
                return DateSerialisable.CompareDate(a.DateDebut, b.DateDebut)
            else
                return DateSerialisable.CompareDate(b.DateDebut, a.DateFin)
        });

        // Si c'est un refresh 
        // On vide la grid et on supprimes les items qui on pus être créer avant 
        if (myThis.GridPrincipale != undefined) {
            myThis.GridPrincipale.vider();

            myThis.RdvsColonne.forEach(rdv => {
                if (rdv.Item != null)
                    rdv.Item = null;
            });
        }

        myThis.AvecDispoBarre = myThis.DisposColonne.some(c => c.Type == enumTypeDispo.Barre)

        myThis.NbLignes = Math.ceil((myThis.HeureFin - myThis.HeureDebut) * 60 / 60);

        myThis.NbColonnes = myThis.getNombreColonne();

        // Si on peut clicker sur une dispo plage, il faut une colonne spécifique pour le bouton
        if (myThis.AvecDispoBarre) {
            myThis.NbColonnes++;
        }

        for (let i = 1; i <= myThis.NbColonnes; i++) {
            if (myThis.AvecDispoBarre && i == 1)
                listeColonnes.push('10px')
            else
                listeColonnes.push('1');
        }

        let listeLignes = [];

        for (let i = 0; i <= (myThis.NbLignes) * 12; i++) {
            if (i != 0) {
                listeLignes.push('1');
            } else {
                listeLignes.push('50px');
            }
        }

        if (myThis.GridPrincipale == null) {
            myThis.GridPrincipale = new xxGrid({
                colonnes: listeColonnes,
                lignes: listeLignes,
                gridGap: '0px',
                class: "PlanningColonne",
            });

            // Mouseup
            // myThis.GridPrincipale.y.onmouseup = (event) => myThis.eventMouseUp(event);
            myThis.GridPrincipale.y.addEventListener("mouseup", (event) => myThis.eventMouseUp(event), false);

            // ContextMenu

            window.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                return false;
            }, false);
            //myThis.GridPrincipale.y.addEventListener("contextmenu", function (event) {
            //    event.preventDefault();
            //    return false;
            //}, false);

            //myThis.GridPrincipale.y.oncontextmenu = (event) => {
            //    event.preventDefault();
            //    return false;
            //};

            // Scroll
            window.addEventListener("scroll", () => {
                if (myThis.Planning.callbackToDeleteRightClick != null)
                    myThis.Planning.callbackToDeleteRightClick();
            }, false);
        }
        else {
            myThis.GridPrincipale.setColonnes(listeColonnes);
            myThis.GridPrincipale.setLignes(listeLignes);
        }

        if (myThis.ZoomChoisi != undefined)
            myThis.ajouterClass("p" + myThis.ZoomChoisi.Value);

        myThis.createLibelleColonne();

        for (let i = 1; i <= (myThis.NbLignes * 12); i += 12) {

            let div = myThis.creerGridItem({
                class: i == myThis.NbLignes * 12 ? "LibelleLigne DerniereLigne" : "LibelleLigne",
                rowStart: i + 1, //+1 car l'indice de la grid commence à 1 et que la première colonne est occupée par les libellés des colonnes !
                colStart: 1,
                nbRows: 12,
                nbCols: myThis.NbColonnes + 1, // +1 pour les heures et +1 parce que le dernier n'est pas pris en compte !
                content: new xDiv({})
            });

            let zoneMenu: iXElementHolder = null

            if (myThis.RenderRightCLickGrid != null) {
                let menu = new xxMenuContextuel({
                    renderMenuContextuel: (place) => {
                        zoneMenu = place;
                    },
                    class: "menuContextuel",
                });


                div.y.addEventListener('mouseup', event => {
                    if (event.which == 3) {
                        zoneMenu.vider();
                        let rdvFictif = myThis.getRendezVousByClick(event);
                        let newrdv = null

                        if (myThis.Planning.RdvSelectRightClic != null) {

                            let dateFinCalculer = DateSerialisable.addMinutesDateSerialisable(rdvFictif.DateDebut, DateSerialisable.getDifferenceEnMinutes(myThis.Planning.RdvSelectRightClic.DateFin, myThis.Planning.RdvSelectRightClic.DateDebut));

                            newrdv = new PlanningRdv(myThis.Planning.RdvSelectRightClic.Libelle, myThis.Planning.RdvSelectRightClic.Id, myThis.Planning.RdvSelectRightClic.IdExterne, myThis.Planning.RdvSelectRightClic.IdExterne2, rdvFictif.DateDebut, dateFinCalculer, myThis.Planning.RdvSelectRightClic.Ressource, myThis.Planning.RdvSelectRightClic.Couleur, myThis.Planning.RdvSelectRightClic.Class, myThis.Planning.RdvSelectRightClic.isAggrandisable, myThis.Planning.RdvSelectRightClic.isDeplacable, myThis.Planning.RdvSelectRightClic.IsRdvCompared);                           
                            
                        }

                        myThis.RenderRightCLickGrid(newrdv != null ? newrdv : rdvFictif, zoneMenu, menu);
                        menu.ouvrir();
                        //event.stopPropagation();
                    }
                    
                }); 
            }

            myThis.GridPrincipale.append([div]);
        }

        myThis.creerDipo();
        myThis.creerRdv();

        let debutJ: DateSerialisable = DateSerialisable.Now();
        debutJ = DateSerialisable.setHeures(debutJ, 0, 0, 0, 0);

        let dateComparaison = DateSerialisable.CopyDateSerialisableSansHeure(myThis.DateColonne);
        

        if (myThis.TimeLine && (DateSerialisable.CompareDate(debutJ, dateComparaison) == 0 || myThis.Ressource == null))
            myThis.creerTimeLine();
    }
    private listegriditem: xxGridItem[] = [];
    private static nbId: number = 0;
    private creerGridItem(opts: OptionsGridItem): xxGridItem {
        let myThis: PlanningColonne = this;
        let retour = new xxGridItem(opts);
        retour.id = (PlanningColonne.nbId++).toString();
        myThis.listegriditem.push(retour);
        return retour;
    }
    // Différence entre mode Ressource et Date
    private createLibelleColonne() {
        let myThis: PlanningColonne = this;

        let libelle = new xDiv({});

        if (myThis.Ressource == undefined) {
            libelle.asHolder.append(new xxLabelContainer({
                class: "libellejour",
                textVariable: myThis.getStringJour(myThis.DateColonne),
                optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                initContent: new xxLabel({
                    textVariable: xOutils.DateToFrenchDateString(myThis.DateColonne, false, false)
                })
            }))

        } else {
            libelle.asHolder.append(new xxLabelContainer({
                class: "libelleRessource",
                textVariable: myThis.Ressource.Libelle,
                optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },

            }))
        }

        myThis.GridItemLibelle = myThis.creerGridItem({
            colStart: 1,
            nbCols: myThis.NbColonnes,
            rowStart: 1,
            nbRows: 1,
            class: "Entete",
            content: myThis.RenderColonne != undefined ? myThis.RenderColonne(myThis) : libelle
        })

        if (myThis.ClickSurEnteteColonne != undefined) {
            myThis.GridItemLibelle.y.addEventListener('mouseup', (event) => {
                myThis.ClickSurEnteteColonne(myThis.GridItemLibelle, myThis);
                event.stopPropagation();
            }, false);
        }
        myThis.GridPrincipale.append([myThis.GridItemLibelle]);
    }

    private creerTimeLine(): void {

        let myThis: PlanningColonne = this;

        if (myThis.GridItemTime != undefined) 
            myThis.GridPrincipale.supprimer([myThis.GridItemTime]);
        

        let debut: DateSerialisable = DateSerialisable.Now();
        
        debut = DateSerialisable.setHeures(debut, DateSerialisable.getHeures(debut), DateSerialisable.getMinutes(debut), 0, 0);

        let fin: DateSerialisable = DateSerialisable.CopyDateSerialisable(debut);
        fin = DateSerialisable.addMinutesDateSerialisable(fin, 1);

        let getPosition = myThis.calculerPosition(debut, fin);

        // Permet dans l'affichage bloc de gérer la multiplisité de colonne dans une colonne ressource
        let nbCols = myThis.NbColonnes;

        myThis.GridItemTime = myThis.creerGridItem({
            class: "TimeLineNow",
            colStart: 1,
            rowStart: getPosition[0],
            nbCols: nbCols,
            nbRows: getPosition[1] - getPosition[0],
            content: new xDiv({
                class: "AVoirAvecMaxime"
            })

        });

        myThis.checkDepassement(debut);
        myThis.GridPrincipale.append([myThis.GridItemTime]);
    }

    /**
     * Se fait uniquement si la méthode rdv depasses est implementer 
     * @param dateTimeLine
     */
    private checkDepassement(dateTimeLine: DateSerialisable): void {
        let myThis: PlanningColonne = this;

        if (myThis.RdvEnCours != null) {

            // TODO : regarder si le jour en cours et bien le même que celui que l'on regarde 

            let rdvConverne: PlanningRdv = myThis.RdvsColonne.filter(c => {
                return (c.DateDebut.MaDateLong < dateTimeLine.MaDateLong && c.DateFin.MaDateLong >= dateTimeLine.MaDateLong)
            })[0];

            if (rdvConverne != null) {
                let derniereDate = DateSerialisable.CopyDateSerialisable(rdvConverne.DateFin);

                let rdvImpactes: PlanningRdv[] = [];

                myThis.RdvsColonne.forEach(c => {
                    let diff = DateSerialisable.getDifferenceEnMinutes(derniereDate, c.DateDebut);

                    if ((c.Id != rdvConverne.Id || c.IdExterne != rdvConverne.IdExterne) && (diff >= 0 && diff <= 1)) {
                        derniereDate = DateSerialisable.CopyDateSerialisable(c.DateFin);
                        rdvImpactes.push(c);
                    }
                })

                let refreshColonne = () => {
                    let listeachanger: PlanningRdv[] = [];

                    if (rdvImpactes.length > 0)
                        rdvImpactes.forEach(item => { listeachanger.push(item); })
                    listeachanger.push(rdvConverne);

                    myThis.refreshRdv(listeachanger.sort((a, b) => {
                        if (a.DateDebut.MaDateLong != b.DateDebut.MaDateLong)
                            return DateSerialisable.CompareDate(a.DateDebut, b.DateDebut);
                        else
                            return DateSerialisable.CompareDate(b.DateFin, a.DateFin);
                    }));
                }

                myThis.RdvEnCours(dateTimeLine, rdvConverne, rdvImpactes, refreshColonne);
            }
        }
    }

    private refreshRdv(rdvs: PlanningRdv[]): void {
        let myThis: PlanningColonne = this;
        rdvs.forEach(item => {
            myThis.GridPrincipale.supprimer([item.Item as xxGridItem]);
            let positionRow = myThis.calculerPosition(item.DateDebut, item.DateFin);
            let positionCol = myThis.calculerColonneRdv(item);

            let classCss: string = "PlanningRdv";

            if (item.Class != undefined)
                classCss += " " + item.Class;

            let gridItem = myThis.creerGridItem({
                rowStart: positionRow[0],
                nbRows: positionRow[1] - positionRow[0],
                colStart: positionCol[0],
                nbCols: positionCol[1],
                id: item.Id.toString(),
                class: classCss,
                content: myThis.renderContenuRdv(item)
            });

            gridItem.y.addEventListener("mousedown", event => {
                myThis.Planning.callbackToDeleteRightClick();
                myThis.Planning.RdvSelect = item;

                // event.which
                //  0 = click with no button
                //  1 = left click
                //  2 = midddle click 
                //  3 = right click 
                if (event.which != 3) {

                    myThis.Planning.y.onmousemove = null;
                    if ((myThis.ClickSurRdv != undefined || myThis.dragAndDropRdv) && !myThis.GridPrincipale.y.classList.contains(PlanningColonne.CLASS_CSS_AGRANDISSEMENT_EN_COUR)) {

                        if (myThis.dragAndDropRdv && myThis.Planning.RdvSelect != null && myThis.Planning.RdvSelect.isDeplacable) {
                            myThis.Planning.idTimerDivCurseur = setTimeout(() => {
                                if (myThis.AvantDeplacement != undefined) {
                                    myThis.AvantDeplacement(myThis.Planning.RdvSelect);
                                    myThis.Planning.y.onmousemove = myThis.Planning.ON_MOUSE_MOUVE_DEPLACEMENT;
                                    cacherxElements(myThis.Planning.RdvSelect.Item, true);
                                    myThis.Planning.addClass(PlanningColonne.CLASS_CSS_DRAG_EN_COUR);
                                }
                            }, 300);
                        }
                    }
                    myThis.Planning.MillSecMouseDown = DateSerialisable.Now().MaDateLong; //new Date().valueOf();
                }
            }, false);

            item.Item = gridItem;
            myThis.GridPrincipale.append([gridItem]);
        });
    }

    private creerDipo(): void {
        let myThis: PlanningColonne = this;

        let cloneDispo: PlanningDisponibilite[] = [];

        assignerObjet(cloneDispo, myThis.DisposColonne);

        cloneDispo.forEach(item => {
            let positionRow = myThis.calculerPosition(item.DateDebut, item.DateFin);

            if (item.Type == enumTypeDispo.Planning) {
                let positionCol = myThis.calculerColonneDispo(item);

                let gridItem = myThis.creerGridItem({
                    rowStart: positionRow[0],
                    nbRows: positionRow[1] - positionRow[0],
                    colStart: positionCol[0],
                    nbCols: positionCol[1],
                    class: "PlanningDispoPlage",
                    content: new xDiv({ class: "dispo" })
                });

                item.Item = gridItem;
                myThis.GridPrincipale.append([gridItem]);

            } else if (item.Type == enumTypeDispo.Barre) {

                let dispoEnUneBarre = myThis.checkDispoBarre(item);
                let gridItemClickablee: xxGridItem;
                let indicateur: xxIndicateur;
                if (dispoEnUneBarre.length > 1) {
                    let dateDebut: DateSerialisable = dispoEnUneBarre[0].DateDebut;
                    let dateFin: DateSerialisable = dispoEnUneBarre[0].DateFin;

                    let stackpanelDispo: xxStackPanel = new xxStackPanel({
                        class: "",
                        espaceMinimaliste: true,
                        initContent: []
                    });

                    dispoEnUneBarre.forEach(dispBarre => {
                        if (dispBarre.Id != item.Id)
                            cloneDispo.splice(cloneDispo.indexOf(dispBarre), 1);

                        if (dispBarre.DateDebut.MaDateLong < dateDebut.MaDateLong)
                            dateDebut = dispBarre.DateDebut;
                        if (dispBarre.DateFin.MaDateLong > dateFin.MaDateLong)
                            dateFin = dispBarre.DateFin;

                        let wrappanelCouleurDispo = new xxWrapPanel({
                            class: "DispoCouleur",
                            espaceMinimaliste: true,
                            alignementHorizontal: enumAlignementHorizontalWrapPanel.Centre,
                            alignementVertical: enumAlignementVerticalWrapPanel.centre,
                            initContent: [],
                        });

                        stackpanelDispo.append(wrappanelCouleurDispo)

                        let codeCouleur: string = "";

                        if (item.Couleur.charAt(0) != "#")
                            codeCouleur = "#" + item.Couleur;
                        else
                            codeCouleur = item.Couleur;

                        let divCouleur = new xDiv({ class: "carreCouleur" });
                        divCouleur.y.style.backgroundColor = codeCouleur;

                        wrappanelCouleurDispo.append(divCouleur);

                        if (myThis.ClickSurDispoBarre != undefined) {
                            wrappanelCouleurDispo.append(new xxBouton({
                                textVariable: dispBarre.Libelle,
                                titleLocalise: "",
                                click: cb => {
                                    myThis.ClickSurDispoBarre(dispBarre);
                                    indicateur.hideTooltip();
                                    cb();
                                }
                            }))
                        } else {
                            wrappanelCouleurDispo.append(new xxLabel({
                                textVariable: dispBarre.Libelle,
                            }))
                        }
                    })

                    positionRow = myThis.calculerPosition(dateDebut, dateFin);

                    indicateur = new xxIndicateur({
                        indicateur: new xDiv({ class: "dispo" }),
                        toolTipContent: stackpanelDispo
                    });

                    gridItemClickablee = myThis.creerGridItem({
                        rowStart: positionRow[0],
                        nbRows: positionRow[1] - positionRow[0],
                        colStart: 1,
                        nbCols: 1,
                        class: "PlanningDispoBarre DispoBarreMultiple",
                        content: indicateur
                    });

                } else {
                    let contenueDispoBarre: iXElement;

                    if (myThis.ClickSurDispoBarre != undefined) {
                        contenueDispoBarre = new xxBouton({
                            textVariable: item.Libelle,
                            titleLocalise: "",
                            click: cb => {
                                myThis.ClickSurDispoBarre(item);
                                indicateur.hideTooltip();
                                cb();
                            }
                        })
                    }
                    else {
                        contenueDispoBarre = new xxLabel({ textVariable: item.Libelle });
                    }

                    indicateur = new xxIndicateur({
                        indicateur: new xDiv({ class: "dispo" }),
                        toolTipContent: contenueDispoBarre,
                    });

                    gridItemClickablee = myThis.creerGridItem({
                        rowStart: positionRow[0],
                        nbRows: positionRow[1] - positionRow[0],
                        colStart: 1,
                        nbCols: 1,
                        class: "PlanningDispoBarre",
                        content: indicateur
                    });

                    if (myThis.ClickSurDispoBarre != undefined) {
                        gridItemClickablee.y.onclick = () => {
                            myThis.ClickSurDispoBarre(item);
                        };
                    }
                }

                gridItemClickablee.y.style.background = item.Couleur;
                item.Item = gridItemClickablee;
                myThis.GridPrincipale.append([gridItemClickablee]);

            } else if (item.Type == enumTypeDispo.Bloc) {
                let positionCol = myThis.calculerColonneDispo(item);

                let divContent: xDiv = new xDiv({
                    class: "infoDispoBloc",
                    title: item.Libelle
                });

                let labelDispo = new xxLabel({
                    type: enumTypeLabel.description,
                    textVariable: item.Libelle,
                    class: "libelleRessourceBloc",
                });
                divContent.asHolder.append(labelDispo);

                let divDipoBloc = new xDiv({ class: "hachureDispoBloc" });
                divContent.asHolder.append(divDipoBloc);

                let gridItem = myThis.creerGridItem({
                    rowStart: positionRow[0],
                    nbRows: positionRow[1] - positionRow[0],
                    colStart: positionCol[0],
                    nbCols: positionCol[1],
                    class: "PlanningDispoBloc",
                    content: divContent
                });

                labelDispo.y.style.background = item.Couleur;
                divDipoBloc.y.style.background = item.Couleur;
                item.Item = gridItem;
                myThis.GridPrincipale.append([gridItem]);
            }
        })
    }

    private checkDispoBarre(dispo: PlanningDisponibilite, dispoCheck: PlanningDisponibilite[] = []): PlanningDisponibilite[] {
        let myThis: PlanningColonne = this;

        let dispoEnMemeTemps: PlanningDisponibilite[] = [];

        dispoEnMemeTemps = myThis.DisposColonne.filter(c => dispo.Contains(c) && c.Type == enumTypeDispo.Barre);

        dispoCheck.push(dispo);

        if (dispoEnMemeTemps.length > 1) {
            dispoEnMemeTemps.forEach(item => {
                let DispoRecursive: PlanningDisponibilite[] = [];
                if ((!dispoCheck.some(c => c.Id == item.Id)) && item.Id != dispo.Id)
                    DispoRecursive = myThis.checkDispoBarre(item, dispoCheck);

                DispoRecursive.forEach(dispRec => {
                    if (!dispoEnMemeTemps.some(c => c.Id == dispRec.Id))
                        dispoEnMemeTemps.push(dispRec);
                });
            })
        }

        return dispoEnMemeTemps;
    }

    private creerRdv(): void {
        let myThis: PlanningColonne = this;

        myThis.RdvsColonne.forEach(rdv => {            
            myThis.setItemRdv(rdv);
        });
    }

    private setItemRdv(rdv: PlanningRdv) {
        let myThis: PlanningColonne = this;

        //rdv.DateDebut. setSeconds(0, 0);
        //rdv.DateFin.setSeconds(0, 0);

        let positionRow = myThis.calculerPosition(rdv.DateDebut, rdv.DateFin);
        let positionCol = myThis.calculerColonneRdv(rdv);

        let classCss: string = "PlanningRdv";

        if (rdv.Class != undefined)
            classCss += " " + rdv.Class;

        let gridItem = myThis.creerGridItem({
            rowStart: positionRow[0],
            nbRows: positionRow[1] - positionRow[0],
            colStart: positionCol[0],
            nbCols: positionCol[1],
            id: rdv.Id.toString(),
            class: classCss,
            content: myThis.renderContenuRdv(rdv)
        });

        gridItem.y.addEventListener('mousedown', event => {
            myThis.Planning.callbackToDeleteRightClick();
            myThis.Planning.RdvSelect = rdv;
            myThis.Planning.y.onmousemove = null;
            if (event.which != 3) {
                if ((myThis.ClickSurRdv != undefined || myThis.dragAndDropRdv) && !myThis.GridPrincipale.y.classList.contains(PlanningColonne.CLASS_CSS_AGRANDISSEMENT_EN_COUR)) {
                    if (myThis.dragAndDropRdv && myThis.Planning.RdvSelect != null && myThis.Planning.RdvSelect.isDeplacable) {
                        myThis.Planning.idTimerDivCurseur = setTimeout(() => {
                            if (myThis.AvantDeplacement != undefined) {
                                myThis.AvantDeplacement(myThis.Planning.RdvSelect);
                                myThis.Planning.y.onmousemove = myThis.Planning.ON_MOUSE_MOUVE_DEPLACEMENT;
                                cacherxElements(myThis.Planning.RdvSelect.Item, true);
                                myThis.Planning.addClass(PlanningColonne.CLASS_CSS_DRAG_EN_COUR);
                            }
                        }, 300);
                    }
                }
                myThis.Planning.MillSecMouseDown = DateSerialisable.Now().MaDateLong; //new Date().valueOf();
            }
        });

        rdv.Item = gridItem;
        myThis.GridPrincipale.append([gridItem]);
    }

    private renderContenuRdv(rdv: PlanningRdv): iXElement {
        let myThis: PlanningColonne = this;

        let contenueItem: iXElement;

        let agrandirHaut = new xDiv({ class: "agrandirRdvHaut agrandirRdv" });
        let agrandirBas = new xDiv({ class: "agrandirRdvBas  agrandirRdv" });

        if (myThis.AgrandirRDV && rdv.isAggrandisable) {
            let flecheHaut = new IconeP12(enumIconeP12.fleche_noire_haut, { taille: tailleIcone.XS });
            let flecheBas = new IconeP12(enumIconeP12.fleche_noire_bas, { taille: tailleIcone.XS });

            agrandirHaut.y.onmousedown = () => {
                myThis.GridPrincipale.addClass(PlanningColonne.CLASS_CSS_AGRANDISSEMENT_EN_COUR);
                myThis.GridPrincipale.addClass(PlanningColonne.ClASS_CSS_AGRANDISSEMENT_HAUT);
                myThis.Planning.RdvSelect = rdv;
                if (myThis.rdvAvantAgrandissement == null)
                    myThis.rdvAvantAgrandissement = new PlanningRdv(rdv.Libelle, 0, rdv.IdExterne, rdv.IdExterne2, rdv.DateDebut, rdv.DateFin, rdv.Ressource, rdv.Couleur, rdv.Class);

                if (myThis.Planning.RdvSelect != null)
                    myThis.GridPrincipale.y.onmousemove = myThis.ON_MOUSE_MOUVE_AGRANDISSEMENT;

                myThis.AvantAgrandissement(myThis.Planning.RdvSelect);
            };

            agrandirBas.y.onmousedown = () =>
            {
                myThis.GridPrincipale.addClass(PlanningColonne.CLASS_CSS_AGRANDISSEMENT_EN_COUR);
                myThis.GridPrincipale.addClass(PlanningColonne.CLASS_CSS_AGRANDISSEMENT_BAS);
                myThis.Planning.RdvSelect = rdv;
                if (myThis.rdvAvantAgrandissement == null)
                    myThis.rdvAvantAgrandissement = new PlanningRdv(rdv.Libelle, 0, rdv.IdExterne, rdv.IdExterne2, rdv.DateDebut, rdv.DateFin, rdv.Ressource, rdv.Couleur, rdv.Class);
                if (myThis.Planning.RdvSelect != null)
                    myThis.GridPrincipale.y.onmousemove = myThis.ON_MOUSE_MOUVE_AGRANDISSEMENT;

                myThis.AvantAgrandissement(myThis.Planning.RdvSelect);
            };

            agrandirHaut.asHolder.append(flecheHaut);
            agrandirBas.asHolder.append(flecheBas);
        }

        if (myThis.RenderRdv != undefined)
            contenueItem = myThis.RenderRdv(rdv);
        else
            contenueItem = rdv.renderRdv();


        let contenuRdv = new xDiv({ class: "ContenuRdv" });

        if (myThis.RenderRightClickRdv != null) {

            let zoneMenu: iXElementHolder = null;

            let menu = new xxMenuContextuel({
                renderMenuContextuel: (place) => {
                    zoneMenu = place;
                }
            });

            contenuRdv.y.addEventListener('mouseup' , event => {

                if (event.which == 3) {
                    zoneMenu.vider();
                    myThis.RenderRightClickRdv(rdv, zoneMenu, menu);
                    
                    myThis.Planning.RdvSelectRightClic = rdv;
                    menu.ouvrir();
                    //event.stopPropagation();
                } 
            });
        }

        contenuRdv.asHolder.append(contenueItem);

        
        if (myThis.AgrandirRDV && rdv.isAggrandisable)
            contenuRdv.asHolder.append(agrandirHaut);        

        if (myThis.AgrandirRDV && rdv.isAggrandisable)
            contenuRdv.asHolder.append(agrandirBas);

        if (rdv.Couleur != undefined)
            contenuRdv.y.style.borderTopColor = rdv.Couleur, contenuRdv.y.style.backgroundColor = rdv.Couleur;

                    

        return contenuRdv;
    }

    private getNombreColonne(): number {
        let myThis: PlanningColonne = this;
        let listeRdvEnMemetemps: number[] = [];

        //sort((a, b) => {
        //    let comparaDebut = DateSerialisable.CompareDate(a?.DateDebut, b?.DateDebut);
        //    if (comparaDebut != 0)
        //        return comparaDebut
        //    else
        //        return DateSerialisable.CompareDate(b?.DateFin, a?.DateFin)
        //})

        myThis.RdvsColonne.forEach(item => {
            let rdvEnMemeTemps = myThis.RdvsColonne.filter(c => item.Contains(c));

            let nbRdvCoteCote = 1;

            // parcour des rdv simultanné
            // Pour chaque rdv on regarde si lui à d'autre rdv simultané
            // Le plus grand nombre de rdv simultané sera le nomvre de rdv que l'on aura cote à cote
            rdvEnMemeTemps.forEach((rdvTester, index) => {
                if (rdvTester.Id != item.Id) {
                    let rdvEnMemeTempsQueTeste = rdvEnMemeTemps.filter(c => rdvTester.Contains(c));

                    if (rdvEnMemeTempsQueTeste.length > 1 && nbRdvCoteCote < rdvEnMemeTempsQueTeste.length)
                        nbRdvCoteCote = rdvEnMemeTempsQueTeste.length;
                }

            });

            listeRdvEnMemetemps.push(nbRdvCoteCote);
        });

        let positionMax = 1;
        myThis.DisposColonne.forEach(item => {
            if (item.Type == enumTypeDispo.Bloc) {
                if (positionMax < item.Position)
                    positionMax = item.Position;
            }
        })
        myThis.DispoBlocMax = positionMax;

        let ppcmRdv = 1;
        if (listeRdvEnMemetemps.length > 0) {
            ppcmRdv = xMaths.PPCMListe(listeRdvEnMemetemps);
        }
        return xMaths.PPCM(ppcmRdv, positionMax);
    }

    private calculerPosition(DateDebutS: DateSerialisable, DateFinS: DateSerialisable): number[] {
        let myThis: PlanningColonne = this;
        let DateDebut = DateSerialisable.getDate(DateDebutS);
        let DateFin = DateSerialisable.getDate(DateFinS);

        let debut: number = DateDebut.getHours() * 60 + DateDebut.getMinutes();
        let fin: number = DateFin.getHours() * 60 + DateFin.getMinutes();

        let duree: number = fin - debut;

        let rowStart: number;
        let rowEnd: number;

        rowStart = Math.floor((debut - myThis.HeureDebut * 60) / 5) + 2; //+2 car la grid commence à 1 et que la première ligne contient les libellés des dates !
        rowEnd = rowStart + Math.floor(duree / 5);

        if (rowStart < 1)
            rowStart = 1;

        if (rowEnd < 1)
            myThis.NbLignes

        return [rowStart, rowEnd];
    }

    private calculerColonneRdv(rdv: PlanningRdv): number[] {
        let myThis: PlanningColonne = this;

        let rdvEnMemeTemps = myThis.RdvsColonne.filter(c => rdv.Contains(c))

        let nbRdvCoteCote = 1;

        rdvEnMemeTemps.forEach((rdvTester, index) => {
            if (rdvTester.Id != rdv.Id) {
                let rdvEnMemeTempsQueTeste = rdvEnMemeTemps.filter(c => rdvTester.Contains(c));

                if (rdvEnMemeTempsQueTeste.length > 1 && nbRdvCoteCote < rdvEnMemeTempsQueTeste.length)
                    nbRdvCoteCote = rdvEnMemeTempsQueTeste.length;
            }

        });


        let nbCol = (myThis.AvecDispoBarre ? (myThis.NbColonnes - 1) : myThis.NbColonnes) / (nbRdvCoteCote);
        let indexRdv = rdvEnMemeTemps.indexOf(rdv) + 1;

        let colStart: number = 1 + ((indexRdv * nbCol) - nbCol);

        if (myThis.AvecDispoBarre)
            colStart = colStart + 1;

        // parcour des rdv qui sont en même temps, pour savoir ou placer notre rdv
        // Si le rdv simultanané n'a pas d'item alors on laisse à la place prévu, Sinon 
        // Si on à la place après, on le met après 
        // Sinon on le met avant
        rdvEnMemeTemps.forEach(item => {
            if (item.Id != rdv.Id) {
                let gridItemAsso: xxGridItem = myThis.getRendezVous().filter(c => c.Id == item.Id)[0].Item as xxGridItem;

                if (gridItemAsso != null) {
                    if ((gridItemAsso.colStart + gridItemAsso.nbCols) <= myThis.NbColonnes) { //(myThis.AvecDispoBarre ? myThis.NbColonnes - 1 : myThis.NbColonnes)

                        colStart = gridItemAsso.colStart + gridItemAsso.nbCols;
                        nbCol = gridItemAsso.nbCols;
                    }
                    else {
                        colStart = 1;
                        if (myThis.AvecDispoBarre)
                            colStart = colStart + 1;

                        nbCol = gridItemAsso.nbCols;

                        if (myThis.RdvsColonne.filter(c => (c.Id != item.Id) && (c.Id != rdv.Id) && (rdv.Contains(c))).length == 0)
                            nbCol = (myThis.AvecDispoBarre ? myThis.NbColonnes - 1 : myThis.NbColonnes) - nbCol;
                    }

                }
            }
        });

        return [colStart, nbCol];
    }

    private calculerColonneDispo(dispo: PlanningDisponibilite): number[] {
        let myThis: PlanningColonne = this;

        let colStart = 1;
        let nbCol = 1;

        // Pas de calcule pour les dispo barre car toujours sur la colonne 1 prévus a cette effets (Quand on a au moins une dispo barre)
        if (dispo.Type == enumTypeDispo.Bloc) {
            nbCol = (myThis.AvecDispoBarre ? (myThis.NbColonnes - 1) : myThis.NbColonnes) / myThis.DispoBlocMax;
            colStart = 1 + ((dispo.Position * nbCol) - nbCol);

            if (myThis.AvecDispoBarre)
                colStart++;

        } else if (dispo.Type == enumTypeDispo.Planning) {
            nbCol = (myThis.AvecDispoBarre ? myThis.NbColonnes - 1 : myThis.NbColonnes)
            colStart = 1
        }

        return [colStart, nbCol];
    }

    private getStringJour(d: DateSerialisable): string {

        let day: number = DateSerialisable.getIndexJourSemaine(d); // d.getDay();
        // let day: number = d.getDay();

        let weekday = [
            new xLString('xxCodeJourCompletDimanche').text,
            new xLString('xxCodeJourCompletLundi').text,
            new xLString('xxCodeJourCompletMardi').text,
            new xLString('xxCodeJourCompletMercredi').text,
            new xLString('xxCodeJourCompletJeudi').text,
            new xLString('xxCodeJourCompletVendredi').text,
            new xLString('xxCodeJourCompletSamedi').text
        ];

        return weekday[day];
    }

    public ajouterRdv(rdvs: PlanningRdv[]) {
        let myThis: PlanningColonne = this;

        myThis.RdvsColonne = myThis.RdvsColonne.concat(rdvs);
        myThis.createGrid();
    }

    public ajouterDispos(dispos: PlanningDisponibilite[]) {
        let myThis: PlanningColonne = this;

        myThis.DisposColonne = myThis.DisposColonne.concat(dispos);
        myThis.createGrid();
    }

    public supprimerRdv(rdvs: PlanningRdv[]) {
        let myThis: PlanningColonne = this;
        let rdvsTemp: PlanningRdv[] = rdvs.slice();

        rdvsTemp.forEach(r => {
            let index: number = myThis.RdvsColonne.indexOf(r);
            if (index >= 0)
                myThis.RdvsColonne.splice(index, 1);
        });

        myThis.createGrid();
    }

    public supprimerDispos(dispos: PlanningDisponibilite[]) {
        let myThis: PlanningColonne = this;
        let disposTemp: PlanningDisponibilite[] = dispos.slice();

        disposTemp.forEach(r => {
            let index: number = myThis.DisposColonne.indexOf(r);
            if (index >= 0)
                myThis.DisposColonne.splice(index, 1);
        });

        myThis.createGrid();
    }

    public supprimerAllDispos() {
        let myThis: PlanningColonne = this;

        myThis.supprimerDispos(myThis.DisposColonne);
    }

    public supprimerAllRdvs() {
        let myThis: PlanningColonne = this;

        myThis.supprimerRdv(myThis.RdvsColonne);
    }

    private getRendezVousByClick(event: MouseEvent): PlanningRdv {
        let myThis: PlanningColonne = this;

        let minutes = myThis.getMinutePourPositionSouris(event, myThis.AddRdvOnClick.ArrondirDebutRdvAuPas);

        let debut: DateSerialisable = DateSerialisable.CopyDateSerialisable(myThis.DateColonne);
        debut = DateSerialisable.setTimeDateSerialisable(debut, minutes);

        let fin: DateSerialisable = DateSerialisable.CopyDateSerialisable(myThis.DateColonne);
        fin = DateSerialisable.setTimeDateSerialisable(fin, minutes + myThis.AddRdvOnClick.DureeRdv);

        let rdv: PlanningRdv = new PlanningRdv(myThis.AddRdvOnClick.LibelleRdv, myThis.AddRdvOnClick.Id, myThis.AddRdvOnClick.IdExterne, null, debut, fin, myThis.Ressource != undefined ? myThis.Ressource.Id : null, myThis.AddRdvOnClick.CouleurRdv);

        return rdv;
    }

    private getRendezVousPrevusualiserByClick(event: MouseEvent): PlanningRdv {
        let myThis: PlanningColonne = this;

        let minutes = myThis.getMinutePourPositionSouris(event, myThis.AddRdvOnClick.ArrondirDebutRdvAuPas);

        let debut: DateSerialisable = DateSerialisable.CopyDateSerialisable(myThis.DateColonne);
        debut = DateSerialisable.setTimeDateSerialisable(debut, minutes);

        let fin: DateSerialisable = DateSerialisable.CopyDateSerialisable(myThis.DateColonne);
        fin = DateSerialisable.setTimeDateSerialisable(fin, minutes + myThis.AddRdvOnClick.DureeRdv);

        let rdv: PlanningRdv = new PlanningRdv("", 0, 0, null, debut, fin, myThis.Ressource != undefined ? myThis.Ressource.Id : null, "COULEUR TODO");

        return rdv;
    }

    private ajouterRdvByClick(event: MouseEvent) {
        let myThis: PlanningColonne = this;
        let rdv: PlanningRdv = myThis.getRendezVousByClick(event);
        DateSerialisable.getXTime(rdv.DateDebut).Heures;

        //if (rdv.DateDebut.getHours() == 0) {
        if (DateSerialisable.getXTime(rdv.DateDebut).Heures == 0) {
            event.stopPropagation();
        } else {
            if (myThis.AddRdvOnClick.BeforeAdd != null) {
                myThis.AddRdvOnClick.BeforeAdd(rdv).then(() => {
                    // Si un traitement est fait sur le rdv il sera pris en compte par référence
                    myThis.Planning.AjouterSelectionCreneau(rdv);
                })
            } else
                myThis.Planning.AjouterSelectionCreneau(rdv);
        }
    }

    private deplacerRdvByDragAndDrop(event: MouseEvent) {
        let myThis: PlanningColonne = this;

        myThis.Planning.supprimerRdv([myThis.Planning.RdvSelect]);
        let minutes = myThis.getMinutePourPositionSouris(event, myThis.AddRdvOnClick.ArrondirDebutRdvAuPas);

        let duree = (myThis.Planning.RdvSelect.DateFin.MaDateLong - myThis.Planning.RdvSelect.DateDebut.MaDateLong);
        let dureeMins = Math.round(duree / 60000);

        let debutS: DateSerialisable = DateSerialisable.CopyDateSerialisable(myThis.DateColonne);
        debutS = DateSerialisable.setTimeDateSerialisable(debutS, minutes);

        let finS: DateSerialisable = DateSerialisable.CopyDateSerialisable(myThis.DateColonne);
        finS = DateSerialisable.setTimeDateSerialisable(finS, minutes + dureeMins);

        myThis.Planning.RdvSelect.DateDebut = debutS;
        myThis.Planning.RdvSelect.DateFin = finS;

        if (myThis.Ressource != undefined)
            myThis.Planning.RdvSelect.Ressource = myThis.Ressource.Id;

        myThis.ApresDeplacement(myThis.Planning.RdvSelect);
        myThis.Planning.RdvSelect = null;
    }

    private changerDateRdv(rdvAChanger: PlanningRdv[]) {
        let myThis: PlanningColonne = this;

        if (rdvAChanger.length > 0) {
            rdvAChanger.forEach((item, i) => {
                item.DateDebut = DateSerialisable.addMinutesDateSerialisable(item.DateDebut, myThis.diffEnCours);
                item.DateFin = DateSerialisable.addMinutesDateSerialisable(item.DateFin, myThis.diffEnCours);
                item.DureeMin = Math.round((item.DateFin.MaDateLong - item.DateDebut.MaDateLong) / 60000);
                (item.Item as xxGridItem).ChangeContent(myThis.renderContenuRdv(item));
            });
        }
    }

    private agrandirRdvByDeplacement(event: MouseEvent, isDateDebut: boolean) {
        let myThis: PlanningColonne = this;
        let positionH: number[] = myThis.getPositionAgrandissementByEvent(event, isDateDebut);
        let rowDiff: number = 0;
        let gridItemRdvSelect: xxGridItem = myThis.Planning.RdvSelect.Item as xxGridItem;

        if (isDateDebut)
            rowDiff = positionH[0] - gridItemRdvSelect.rowStart;
        else {
            rowDiff = positionH[1] - (gridItemRdvSelect.rowStart + gridItemRdvSelect.nbRows);
        }

        let rdvsADeplacer: PlanningRdv[] = myThis.RdvsADeplacer(myThis.Planning.RdvSelect, isDateDebut);
        gridItemRdvSelect.changeRowsProperties(positionH[0], positionH[1] - positionH[0]);
        gridItemRdvSelect.ChangeContent(myThis.renderContenuRdv(myThis.Planning.RdvSelect));


        rdvsADeplacer.forEach(item => {
            let itemGrid: xxGridItem = item.Item as xxGridItem;
            itemGrid.changeRowsProperties(itemGrid.rowStart + rowDiff, itemGrid.nbRows);
        });
    }

    public getPositionByEvent(event: MouseEvent, fromDragAndDrop: boolean): number[] {

        let myThis: PlanningColonne = this;
        let minutes = myThis.getMinutePourPositionSouris(event, 0);

        let dureeMins = 0;
        let debut: DateSerialisable = DateSerialisable.CopyDateSerialisable(myThis.DateColonne) // new Date(DateSerialisable.getDate(myThis.DateColonne).getTime());
        let fin: DateSerialisable = DateSerialisable.CopyDateSerialisable(myThis.DateColonne) //  new Date(DateSerialisable.getDate(myThis.DateColonne).getTime());

        if (fromDragAndDrop && myThis.DureeMin != undefined) {
            let retourDuree = myThis.DureeMin(myThis.Planning.RdvSelect);

            if (retourDuree[0] != retourDuree[1]) {
                debut = DateSerialisable.setTimeDateSerialisable(debut, minutes - (retourDuree[0] - retourDuree[1]));
                fin = DateSerialisable.setTimeDateSerialisable(fin, minutes + retourDuree[1]);

            } else {
                debut = DateSerialisable.setTimeDateSerialisable(debut, minutes);
                fin = DateSerialisable.setTimeDateSerialisable(fin, minutes + retourDuree[0]);
            }

        } else if (!fromDragAndDrop && myThis.AddRdvOnClick.PrevisualisationSouris != null) {
            myThis.Planning.rdvPrevisualiseFictif = myThis.getRendezVousPrevusualiserByClick(event)
            debut = myThis.Planning.rdvPrevisualiseFictif.DateDebut;
            fin = myThis.Planning.rdvPrevisualiseFictif.DateFin;
            //fin = DateSerialisable.setTimeDateSerialisable(fin, minutes + myThis.dureePrevisualisationRdv);
        }
        else{
            let duree: number = myThis.Planning.RdvSelect.DateFin.MaDateLong - myThis.Planning.RdvSelect.DateDebut.MaDateLong;
            dureeMins = Math.round(duree / 60000);

            debut = DateSerialisable.setTimeDateSerialisable(debut, minutes);
            fin = DateSerialisable.addMinutesDateSerialisable(debut, dureeMins);
            
        }

        return myThis.calculerPosition(debut, fin);
    }

    public getPositionAgrandissementByEvent(event: MouseEvent, isDateDebut: boolean): number[] {
        let myThis: PlanningColonne = this;

        let minutes = myThis.getMinutePourPositionSouris(event, 0);

        if (isDateDebut)
            myThis.Planning.RdvSelect.DateDebut = DateSerialisable.setTimeDateSerialisable(myThis.Planning.RdvSelect.DateDebut, minutes);
        else
            myThis.Planning.RdvSelect.DateFin = DateSerialisable.setTimeDateSerialisable(myThis.Planning.RdvSelect.DateFin, minutes);

        myThis.Planning.RdvSelect.DureeMin = Math.round((myThis.Planning.RdvSelect.DateFin.MaDateLong - myThis.Planning.RdvSelect.DateDebut.MaDateLong) / 60000);
        if (myThis.Planning.RdvSelect.DureeMin <= 0) {
            myThis.GridPrincipale.y.onmousemove = null;

            if (isDateDebut) {
                xOutils.afficherMessageAlertifyLocaliseError("La date de début ne peut pas précéder la date de fin");

                myThis.Planning.RdvSelect.DateDebut = DateSerialisable.addMinutesDateSerialisable(myThis.Planning.RdvSelect.DateDebut, -15);
            } else {
                xOutils.afficherMessageAlertifyLocaliseError("La date de fin ne peut pas être antérieure à la date de début");
                myThis.Planning.RdvSelect.DateFin = DateSerialisable.addMinutesDateSerialisable(myThis.Planning.RdvSelect.DateFin, 15);

            }
            myThis.Planning.RdvSelect.DureeMin = Math.round((myThis.Planning.RdvSelect.DateFin.MaDateLong - myThis.Planning.RdvSelect.DateDebut.MaDateLong) / 60000);
        }

        return myThis.calculerPosition(myThis.Planning.RdvSelect.DateDebut, myThis.Planning.RdvSelect.DateFin);
    }

    private getMinutePourPositionSouris(event: MouseEvent, arrondirAuPas: number): number {
        let myThis: PlanningColonne = this;

        let cssHeightColonneLibelle = <number>myThis.GridItemLibelle.height(); // taille ligne 

        let cursor_y: number = event.clientY; // position souris

        let div_y: number = myThis.GridPrincipale.y.getBoundingClientRect().top; // position grid

        let heightGrid = <number>myThis.GridPrincipale.height() - cssHeightColonneLibelle; // taille grid sans ligne jour

        let topPosition: number = cursor_y - div_y; // // on change le réferentiel = page -> toute la grid

        if (topPosition > cssHeightColonneLibelle) { // si pas clic sur la cellule 'samedi x/x/x'

            topPosition = topPosition - cssHeightColonneLibelle; // on change le réferentiel = toute la grid -> partie rdv de la grid

            //  taille minute  = taille grid / ( nbMinutes * nbHeuresAffichee * nb5min)
            let spaceMinute = heightGrid / (5 * myThis.NbLignes * 12);

            // nbMinutes     =  (positionSouris/ taille minute ) + heureDebut *60
            let min: number = (topPosition / spaceMinute) + myThis.HeureDebut * 60;

            // position souris dans la cellule = nbMinutes mod 60
            let positionInCellule = min % 60;

            min = Math.floor(min / 60) * 60; // on arrondi
           
            if (arrondirAuPas > 0)
            {
                //on autorise que les valeurs divisible dans 60
                if (Math.floor(60 / arrondirAuPas) == (60 / arrondirAuPas))
                    min += (Math.round(positionInCellule / arrondirAuPas) * arrondirAuPas);
                else
                {
                    min += (Math.round(positionInCellule / 15) * 15);
                    console.log(new xLString("La durée du pas n'est pas compatible: {0} minutes").format([arrondirAuPas]));
                }
            }
            else
                min += Math.floor(positionInCellule); // On ajouter la position de la souris dans la cellule convertie en minute
                
            //if (positionInCellule >= 60 / 2)
            //    min += 60 / 2; // Pour les demie-heures

            return min;
        }
        return 0;
    }

    private setTimeToDate(minutes: number, date: DateSerialisable): void {
        let heure: number = Math.floor(minutes / 60);
        minutes = Math.floor(minutes % 60);

        date = DateSerialisable.setHeures(date, heure, minutes, 0, 0);
        //date.setHours(heure);
        //date.setMinutes(minutes);
    }

    public ajouterClass(nomClass: string): void {
        let myThis: PlanningColonne = this;

        myThis.GridPrincipale.addClass(nomClass);
    }

    public supprimerClass(nomClass: string): void {
        let myThis: PlanningColonne = this;

        myThis.GridPrincipale.removeClass(nomClass);
    }

    private eventMouseUp(event: MouseEvent) {
        let myThis: PlanningColonne = this;

        if (event.which == 3) {
            event.stopPropagation();
                if (myThis.Planning.RdvSelect == null) {
                    myThis.Planning.RdvSelectRightClic = myThis.getRendezVousByClick(event);

                    if (myThis.RightClickOnGrid)
                        myThis.RightClickOnGrid(myThis.Planning.RdvSelectRightClic);
                }
                else {
                    myThis.Planning.RdvSelectRightClic = myThis.Planning.RdvSelect;

                    if (myThis.RightClickSurRdv != null)
                        myThis.RightClickSurRdv(myThis.Planning.RdvSelect);
                }
            
            myThis.Planning.RdvSelect = null;
        }
        else if (myThis.RightClickOnGrid == null || myThis.RightClickSurRdv == null) { // si pas clic droit
            myThis.Planning.MillSecMouseUp = DateSerialisable.Now().MaDateLong; // new Date().valueOf();
            myThis.Planning.callbackToDeleteRightClick();

            if (myThis.Planning.RdvSelect != null) {

                if (myThis.dragAndDropRdv && ((myThis.Planning.MillSecMouseUp - myThis.Planning.MillSecMouseDown) >= 200) && myThis.Planning.y.classList.contains(PlanningColonne.CLASS_CSS_DRAG_EN_COUR)) {

                    myThis.Planning.y.onmousemove = null;
                    myThis.Planning.removeClass(PlanningColonne.CLASS_CSS_DRAG_EN_COUR);
                    myThis.deplacerRdvByDragAndDrop(event);

                }
                else if (myThis.AgrandirRDV && myThis.GridPrincipale.y.classList.contains(PlanningColonne.CLASS_CSS_AGRANDISSEMENT_EN_COUR)) {
                    let isDateDebut = myThis.GridPrincipale.y.classList.contains(PlanningColonne.ClASS_CSS_AGRANDISSEMENT_HAUT);

                    myThis.GridPrincipale.removeClass(PlanningColonne.CLASS_CSS_AGRANDISSEMENT_EN_COUR);
                    myThis.GridPrincipale.y.onmousemove = null;

                    let rdvADeplacer = myThis.RdvsADeplacer(myThis.Planning.RdvSelect, isDateDebut);

                    if (rdvADeplacer != null && rdvADeplacer.length > 0) {
                        if (isDateDebut)
                            myThis.diffEnCours = Math.round((myThis.Planning.RdvSelect.DateDebut.MaDateLong - myThis.rdvAvantAgrandissement.DateDebut.MaDateLong) / 60000);
                        //myThis.diffEnCours = Math.round((myThis.Planning.RdvSelect.DateDebut.getTime() - myThis.rdvAvantAgrandissement.DateDebut.getTime()) / 60000);
                        else
                            myThis.diffEnCours = Math.round((myThis.Planning.RdvSelect.DateFin.MaDateLong - myThis.rdvAvantAgrandissement.DateFin.MaDateLong) / 60000);
                        //myThis.diffEnCours = Math.round((myThis.Planning.RdvSelect.DateFin.getTime() - myThis.rdvAvantAgrandissement.DateFin.getTime()) / 60000);

                        myThis.changerDateRdv(rdvADeplacer);
                    }

                    myThis.ApresAgrandissement(myThis.Planning.RdvSelect);
                    myThis.Planning.RdvSelect = null;
                    myThis.rdvAvantAgrandissement = null;

                    myThis.GridPrincipale.removeClass(PlanningColonne.ClASS_CSS_AGRANDISSEMENT_HAUT);
                    myThis.GridPrincipale.removeClass(PlanningColonne.CLASS_CSS_AGRANDISSEMENT_BAS);
                }
                else if (myThis.ClickSurRdv != undefined) {
                    clearTimeout(myThis.Planning.idTimerDivCurseur);
                    myThis.ClickSurRdv(myThis.Planning.RdvSelect);
                    myThis.Planning.RdvSelect = null;
                }

                if (myThis.AddRdvOnClick != null && myThis.AddRdvOnClick.PrevisualisationSouris != null && myThis.Planning.previsualisationSourisActive)
                    myThis.Planning.y.onmousemove = myThis.Planning.ON_MOUSE_MOUVE_PREVUSUALISATION;

            }
            else if (myThis.AddRdvOnClick != undefined) {
                // Trouver un moyen  de savoir quand on est sur un click dans l'entete de la colonne pour ne pas tout casser 
                myThis.Planning.RdvSelect = null;
                myThis.ajouterRdvByClick(event);
            }
        }
    }

    public getRendezVous(): PlanningRdv[] {
        let myThis: PlanningColonne = this;
        return myThis.RdvsColonne;
    }

    public getDisponibilites(): PlanningDisponibilite[] {
        let myThis: PlanningColonne = this;
        return myThis.DisposColonne;
    }

    public ajouterRdvPrevisualisation(item: xxGridItem): void {
        let myThis: PlanningColonne = this;

        myThis.GridPrincipale.append([item]);
    }

    public supprimerRdvPrevisualisation(item: xxGridItem): void {
        let myThis: PlanningColonne = this;
        myThis.GridPrincipale.supprimer([item]);
    }

    public changementPasHorraire(pas: number) {
        let myThis: PlanningColonne = this;

        myThis.AddRdvOnClick.ArrondirDebutRdvAuPas = pas;
    }
    public changementDureeRdvDefaut(duree: number) {
        let myThis: PlanningColonne = this;

        myThis.AddRdvOnClick.DureeRdv = duree;
    }
}