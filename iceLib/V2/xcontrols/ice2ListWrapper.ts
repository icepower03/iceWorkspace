// @ts-nocheck
import { iXElement, iXElementHolder, enumVisibility, Container } from '../iceBase';
import { iceDiv } from './iceDiv';
import { BindableObject } from './BindableObject';
import { ObservableCollection } from './ObservableCollection';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { HelperGeneric } from '../utils/HelperGeneric';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2StackPanel } from './ice2StackPanel';
import { ice2Grid, ice2GridItem } from './ice2Grid';
import { ice2Label, enumTypeLabel } from './ice2Label';
﻿

export enum enumTypeTri { asc, desc, aucun }

interface OptionsList<T> {
    donnees: T[];
    dataContext?: ObservableCollection<T>;
    renderItem: (p: iXElementHolder, item: T, id: string) => void;
    equals?: (a: T, b: T) => boolean;
    greaterThan?: (a: T, b: T) => number;
    unique?: boolean;
    sort?: enumTypeTri;
    horizontal?: boolean;
    espaceMinimaliste?: boolean;
    gap?: number;
    class?: string;
    LibelleSiVide?: string;
    id?: string;
    getId?: (valeur: T) => string;
    limite?: boolean;
    /** Meme fonctionnement que dans le Tableau, regroupement par fracture (ne modifie pas l'ordre des données) */
    groupeGlobal?: {
        group: (place: iXElementHolder, valeur: T, valeurPrecedente: T) => void;
        greaterThan?: (a: T, b: T) => number;
        greaterThanGeneric?: (a: T) => string | boolean | number | DateSerialisable | Date;
    },
    /** Regroupe les elements (comme un groupBy), sous une seule bannier commune (modifie l'ordre des données) */
    regroupementUniqueBy?: {
        /** Sans c'est options le header sera juste un libelle avec la donnée du GroupBy */
        groupHeaderCustom?: (place: iXElementHolder, listGroup: T[]) => void;
        GroupBy: (a: T) => string | boolean | number | DateSerialisable | Date;
    },
    affichageEnGrid?: {
        /** en cas d'affichage horizontal*/
        nbCols: number;
        gridGap?: string;
        /** en cas d'affichage vertival*/
        nbRows: number;
    };
}

///liste graphique se rafraichissant en fonction des données ajoutées ou supprimées
export class ice2ListWrapper<T> implements iXElement {
    private LIMITE_NUMBER: number = 500;

    private espaceMinimaliste: boolean;
    private gap: number;
    private filtreActif: (obj: T) => boolean;
    public dataContext: ObservableCollection<T>;
    public listeItems: ice2ListItem<T>[];
    private monDomContainer: ice2WrapPanel | ice2StackPanel | ice2Grid;
    private modeHorizontal: boolean;
    private LibelleSiVide: string;
    private affichageLabelSiVide: BindableObject<enumVisibility>;
    private greaterThan: (a: T, b: T) => number;
    private horizontal?: boolean;
    private modeUnique?: boolean;
    private equals?: (a: T, b: T) => boolean;
    private monTri?: enumTypeTri;
    private renderItem: (p: iXElementHolder, item: T, id: string) => void;
    private limite: boolean;

    private getId: (valeur: T) => string;

    // groupeGlobal
    private groupeGlobal: (place: iXElementHolder, valeur: T, valeurPrecedente: T) => void;
    public greaterThanGlobal: (a: T, b: T) => number;
    public HeaderGroupGlobal: iXElementHolder[] = [];

    // regroupement Unique By
    private regroupementUniqueBy_groupHeader: (place: iXElementHolder, listGroup: T[]) => void;
    private regroupementUniqueBy_GroupBy: (a: T) => string | boolean | number | DateSerialisable | Date;
    private regroupementUniqueBy_Dico: { [key: string]: { headerZone?: iXElementHolder, listeItem: ice2ListItem<T>[] } };

     // Affichage en grid //
    private affichageEnGrid: boolean = false;
    private listGridItem:  ice2GridItem []=[];
    private nbColonnesGrid: number = 0;
    private nbRowGrid: number = 0;
    private gridGap: string = "10px"; 
    private currentCol: number = 1;
    private currentRow: number = 1;
    //--- properties ---//
   
    public get y(): HTMLElement {
        return this.monDomContainer.y;
    }


    //--- Constructor ----//
    constructor(inOptions: OptionsList<T>) {
        let myThis: ice2ListWrapper<T> = this;

        if (inOptions.dataContext == undefined) {
            myThis.dataContext = new ObservableCollection<T>();
        }
        else {
            myThis.dataContext = inOptions.dataContext;
        }
        myThis.espaceMinimaliste = inOptions.espaceMinimaliste;
        if (myThis.espaceMinimaliste == undefined) {
            myThis.espaceMinimaliste = false;
        }
        myThis.gap = inOptions.gap;
        if (myThis.gap == undefined)
        {
            myThis.gap = 0;
        }

        myThis.dataContext.bind(
            (t: T[]) => { myThis.addData(t); },
            (t: T[]) => { myThis.delData(t); }
        );

        //si l'observable Collection contenanit déja des données:on les ajoute au tableau

        myThis.renderItem = inOptions.renderItem;
        myThis.getId = inOptions.getId;

        myThis.limite = inOptions.limite;
        if (myThis.limite == undefined)
            myThis.limite = true;

        let addClass: string;


        if (inOptions.class == undefined) { addClass = ""; }
        else { addClass = inOptions.class; }


        if (inOptions.horizontal == undefined) { inOptions.horizontal = false; }
        myThis.modeHorizontal = inOptions.horizontal;

        myThis.LibelleSiVide = inOptions.LibelleSiVide;
        // option Grille
        myThis.affichageEnGrid = inOptions.affichageEnGrid != undefined ? (inOptions.affichageEnGrid.nbCols + inOptions.affichageEnGrid.nbRows) > 1 : false;
        if (myThis.affichageEnGrid==true)
        {
            myThis.nbColonnesGrid = inOptions.affichageEnGrid.nbCols;
            if (myThis.nbColonnesGrid == 0) {
                myThis.nbColonnesGrid = 1;
            }
            myThis.nbRowGrid = inOptions.affichageEnGrid.nbRows;
            if (myThis.nbRowGrid == 0) {
                myThis.nbRowGrid = 1;
            }


            /* Empêcher un mode horizontal avec une seule colonne */
            if (myThis.modeHorizontal && myThis.nbColonnesGrid == 1)
                myThis.modeHorizontal = false;
            /* Empêcher un mode vertical avec une seule ligne */
            if (!myThis.modeHorizontal && myThis.nbRowGrid == 1)
                myThis.modeHorizontal = true;

            myThis.gridGap = inOptions.affichageEnGrid.gridGap != undefined ? inOptions.affichageEnGrid.gridGap : "10px";
            myThis.monDomContainer = new ice2Grid({
                id:  inOptions.id,
                colonnes_auto: "1fr",
                gridGap: myThis.gridGap, fullWidth: true,
                padding: false,
                class:"ice2ListPrincipal " + addClass
            });
        }else{ 
            if (myThis.modeHorizontal==true ) {
                myThis.monDomContainer = new ice2WrapPanel({ class: "ice2ListPrincipal " + addClass,
                id: inOptions.id,
                espaceMinimaliste:myThis.espaceMinimaliste, 
                gap:myThis.gap });
            }
            else 
            {
                myThis.monDomContainer = new ice2StackPanel({ class: "ice2ListPrincipal " + addClass, id: inOptions.id, gap: myThis.gap });
            } 
        }
        myThis.listeItems = [];
        myThis.listGridItem = [];

        if (inOptions.unique == undefined) { myThis.modeUnique = true; }
        else {
            myThis.modeUnique = inOptions.unique;
        }

        if (inOptions.sort == undefined) { myThis.monTri = enumTypeTri.aucun; }
        else { myThis.monTri = inOptions.sort; }

        if (inOptions.equals == undefined) {
            myThis.equals = function (a: T, b: T) { return a === b; }
        }
        else {
            myThis.equals = inOptions.equals;
        }

        if (inOptions.greaterThan == undefined) {
            myThis.greaterThan = function (a: T, b: T): number {
                if (a > b) { return 1; }

                if (a < b) {
                    return -1;
                }
                // si a==b
                return 0;
            }
        } else {
            myThis.greaterThan = inOptions.greaterThan;
        }

        // groupeGlobal
        if (inOptions.groupeGlobal != null) {
            if (inOptions.groupeGlobal.group != null) {
                myThis.groupeGlobal = inOptions.groupeGlobal.group;
                if (inOptions.groupeGlobal.greaterThanGeneric != null) {
                    myThis.greaterThanGlobal = (a, b) => {
                        return HelperGeneric.CompareGeneric(inOptions.groupeGlobal.greaterThanGeneric(a), inOptions.groupeGlobal.greaterThanGeneric(b));
                    }
                }
                else if (inOptions.groupeGlobal.greaterThan != null) {
                    myThis.greaterThanGlobal = inOptions.groupeGlobal.greaterThan;
                }
                else {
                    console.error("Aucun methode de greaterThan pour le groupeGlobal!");
                }
            }
        }

        // regroupement Unique By
        if (inOptions.regroupementUniqueBy != null) {
            if (inOptions.regroupementUniqueBy.GroupBy != null) {
                // init du dico de groupe
                myThis.regroupementUniqueBy_Dico = {};

                // C'est pour evité les erreur si un item est egale a null
                myThis.regroupementUniqueBy_GroupBy = (a: T) => {
                    if (a == null)
                        return null;
                    return inOptions.regroupementUniqueBy.GroupBy(a);
                };

                myThis.regroupementUniqueBy_groupHeader = inOptions.regroupementUniqueBy.groupHeaderCustom;
                if (myThis.regroupementUniqueBy_groupHeader == null)
                    myThis.regroupementUniqueBy_groupHeader = (place, item) => {
                        let temp = myThis.regroupementUniqueBy_GroupBy(item[0]);
                        if (HelperGeneric.IsDate(temp))
                            temp = temp.toLocalDateStringCompleteCS3I();
                        else if (HelperGeneric.IsDateSerialisable(temp))
                            temp = DateSerialisable.toLocalDateStringComplete(temp);

                        place.append(new ice2Label({
                            textVariable: temp.toString(),
                            type: enumTypeLabel.important
                        }));
                    };
            }
        }

        if (myThis.LibelleSiVide != null && myThis.LibelleSiVide != "") {
            myThis.affichageLabelSiVide = new BindableObject<enumVisibility>();
            myThis.affichageLabelSiVide.bind((val) => {
                myThis.monDomContainer.removeClass("IsVide");
                if (val == enumVisibility.afficher)
                    myThis.monDomContainer.addClass("IsVide");
            });
            myThis.GenerateLibelleSiVide();
        }

        myThis.addData(myThis.dataContext.All());

        //pour les données d'init (dans options.data) je les ajoute comme si c'était un ajout dynamique
        if (inOptions.donnees != undefined) {
            myThis.dataContext.add(inOptions.donnees);  
        } 
    }
    private incrementeGridPosition() {
        let myThis: ice2ListWrapper<T> = this;
        if (myThis.modeHorizontal == true) {
            myThis.currentCol++;
            if (myThis.currentCol > myThis.nbColonnesGrid) {
                myThis.currentCol = 1;
                myThis.currentRow++;
            }
        } else {
            myThis.currentRow++;
            if (myThis.currentRow > myThis.nbRowGrid) {
                myThis.currentRow = 1;
                myThis.currentCol++;
            }
        }
    }
    //--- methode ----//
    // Trie // 
    public filtrer() {
        let myThis: ice2ListWrapper<T> = this;
        let allHide: boolean = true;
        myThis.currentCol = 1;
        myThis.currentRow = 1;
        let iIndex: number = 0;
            myThis.listeItems.forEach(a => {
                let visibilite: boolean = myThis.filtreActif ? myThis.filtreActif(a.donnee) :true  ;
                if (visibilite) {
                    allHide = false;
                }
                a.setVisibilite(visibilite);
                if (myThis.affichageEnGrid) {
                    if (myThis.listGridItem && myThis.listGridItem[iIndex] != null) {
                        let gridItem: ice2GridItem = myThis.listGridItem[iIndex];
                        gridItem.changeRowsProperties(myThis.currentRow, 1);
                        gridItem.changeColsProperties(myThis.currentCol, 1);
                        if (visibilite) {
                            myThis.incrementeGridPosition();
                            affichericeElements(gridItem);
                        } else {

                            cachericeElements(gridItem);
                        }
                    }
                }
                iIndex++;
            });
        if (myThis.regroupementUniqueBy_GroupBy != null) {
            Object.keys(myThis.regroupementUniqueBy_Dico).forEach((key) => {
                if (myThis.regroupementUniqueBy_Dico[key].listeItem.some(t => t.visible.Value)) {
                    affichericeElements(myThis.regroupementUniqueBy_Dico[key].headerZone);
                    myThis.regroupementUniqueBy_Dico[key].headerZone.empty();
                    myThis.regroupementUniqueBy_groupHeader(myThis.regroupementUniqueBy_Dico[key].headerZone, myThis.regroupementUniqueBy_Dico[key].listeItem.filter(t => t.visible.Value).map(t => t.donnee));
                }
                else
                    cachericeElements(myThis.regroupementUniqueBy_Dico[key].headerZone, true);
            });
        }

        if (myThis.LibelleSiVide != null && myThis.LibelleSiVide != "") {
            myThis.affichageLabelSiVide.Value = enumVisibility.masquerAvecCollapse;
            if (allHide)
                myThis.affichageLabelSiVide.Value = enumVisibility.afficher;
        }

        myThis.GenerateGroupGlobal();
    }

    public setGreaterThan(f: (a: T, b: T) => number) {
        let myThis: ice2ListWrapper<T> = this;
        myThis.greaterThan = f;
        myThis.refreshTri();
        return myThis;
    }

    public refreshTri() {
        let myThis: ice2ListWrapper<T> = this;

        if (myThis.monTri != enumTypeTri.aucun) {
            //tri du tableau
            myThis.listeItems.sort(
                function (a: ice2ListItem<T>, b: ice2ListItem<T>): number {
                    if (myThis.monTri == enumTypeTri.desc) {
                        //swap si tri descendant
                        let temp: ice2ListItem<T>;
                        temp = b;
                        b = a;
                        a = temp;
                    }

                    return myThis.greaterThan(a.donnee, b.donnee);
                }
            );
        }

        if (myThis.regroupementUniqueBy_GroupBy != null) {
            //tri du tableau pour le groupe
            myThis.listeItems.sort(
                function (a: ice2ListItem<T>, b: ice2ListItem<T>): number {
                    return HelperGeneric.CompareGeneric(myThis.regroupementUniqueBy_GroupBy(a.donnee), myThis.regroupementUniqueBy_GroupBy(b.donnee));
                });

            // on vide toute les liste groupe pour les remplie a nouveau apres avec le bon ordre
            Object.keys(myThis.regroupementUniqueBy_Dico).forEach((key) => { myThis.regroupementUniqueBy_Dico[key].listeItem = [] });
        }

        //ici la liste est triée dans l'ordre prévu
        //on replace la dom dans le bon ordre
        myThis.listeItems.forEach(function (item: ice2ListItem<T>, index) {
            //je déplace la dom au bon endroit
            if (index == 0 && myThis.listeItems.length > 1) {

               myThis.listeItems[1].renderPlace.y.parentElement.before(item.renderPlace.y.parentElement);
            }
            else {
                if (myThis.listeItems.length > 1) {
                    myThis.listeItems[index - 1].renderPlace.y.parentElement.after(item.renderPlace.y.parentElement);
                }
            }

            // Si on est avec un regroupement
            if (myThis.regroupementUniqueBy_GroupBy != null && item.donnee != null) {
                let NameGroup: string;
                let temp = myThis.regroupementUniqueBy_GroupBy(item.donnee);
                if (temp != null) {
                    if (HelperGeneric.IsDate(temp))
                        NameGroup = temp.toLocalDateStringCompleteCS3I();
                    else if (HelperGeneric.IsDateSerialisable(temp))
                        NameGroup = DateSerialisable.toLocalDateStringComplete(temp);
                    else
                        NameGroup = temp.toString();
                }
                if (NameGroup != null) {

                    myThis.regroupementUniqueBy_Dico[NameGroup].listeItem.push(item);

                    if (myThis.regroupementUniqueBy_Dico[NameGroup].listeItem.length > 0 && myThis.regroupementUniqueBy_Dico[NameGroup].listeItem.indexOf(item) == 0) {
                        item.renderPlace.y.parentElement.before(myThis.regroupementUniqueBy_Dico[NameGroup].headerZone.y.parentElement);
                    }
                }
            }

        });

        myThis.GenerateGroupGlobal();

        return myThis;
    }

    public setFiltre(inFiltre: (obj: T) => boolean): ice2ListWrapper<T> {
        let myThis: ice2ListWrapper<T> = this;
        myThis.filtreActif = inFiltre;
        return myThis;
    }

    public changerTri(tri?: enumTypeTri): ice2ListWrapper<T> {
        let myThis: ice2ListWrapper<T> = this;

        if (tri == undefined) {
            if (myThis.monTri != enumTypeTri.asc) { tri = enumTypeTri.asc; }
            else { tri = enumTypeTri.desc; }
        }

        myThis.monTri = tri;
        return myThis.refreshTri();

    }

    // suppression //
    public supprimerItem(item: T): ice2ListWrapper<T> {
        return this.supprimerItems([item]);
    }

    public supprimerItems(item: T[]): ice2ListWrapper<T> {
        let mythis: ice2ListWrapper<T> = this;
        mythis.dataContext.del(item);
        return mythis;

    }

    public supprimerItemsAll(): ice2ListWrapper<T> {
        let myThis: ice2ListWrapper<T> = this;
        myThis.supprimerItems(myThis.getAllData());
        return myThis;
    }
    private delData(items: T[]): ice2ListWrapper<T> {

        let mythis: ice2ListWrapper<T> = this; 
        items.forEach(function (v: T) {

            mythis.listeItems.forEach(function (val: ice2ListItem<T>, index: number) {
                if (v != undefined) {
                    if (mythis.equals(val.donnee, v)) {
                        //supression ds la dom
                        //suppression des donnees
                        mythis.listeItems[index].supprimer();
                        if (mythis.affichageEnGrid) {
                            if (mythis.listGridItem[index] != null) {
                                let gridItem: ice2GridItem = mythis.listGridItem[index];
                                let grid: ice2Grid = mythis.monDomContainer as ice2Grid;
                                if (grid != null && gridItem!=null) {
                                    grid.supprimer([gridItem]);
                                }
                                cachericeElements(gridItem);
                                mythis.listGridItem.splice(index, 1); 
                            }
                        } 
                        mythis.listeItems.splice(index, 1); 
                        // si on a un groupement
                        if (mythis.regroupementUniqueBy_GroupBy) {
                            // on recupe le nom du groupe
                            let NameGroup: string;
                            let NameGrouptempo = mythis.regroupementUniqueBy_GroupBy(val.donnee);
                            if (NameGrouptempo != null) {
                                if (HelperGeneric.IsDate(NameGrouptempo))
                                    NameGroup = NameGrouptempo.toLocalDateStringCompleteCS3I();
                                else if (HelperGeneric.IsDateSerialisable(NameGrouptempo))
                                    NameGroup = DateSerialisable.toLocalDateStringComplete(NameGrouptempo);
                                else
                                    NameGroup = NameGrouptempo.toString();
                            }

                            if (NameGroup != null) {
                                // on supprime l'element de la liste
                                let indexGroup = mythis.regroupementUniqueBy_Dico[NameGroup].listeItem.indexOf(val);
                                if (indexGroup >= 0)
                                    mythis.regroupementUniqueBy_Dico[NameGroup].listeItem.splice(indexGroup, 1);

                                // on supprime le groupe si plus d'element
                                if (mythis.regroupementUniqueBy_Dico[NameGroup].listeItem.length == 0) {
                                    mythis.regroupementUniqueBy_Dico[NameGroup].headerZone.y.parentElement.remove();
                                    delete mythis.regroupementUniqueBy_Dico[NameGroup];
                                }
                            }
                        }
                    }
                }
            });
        });

        if (mythis.listeItems.length == 0)
            mythis.VideDom();

        mythis.GenerateGroupGlobal();

        return mythis;
    }

    // Ajoute //
    public ajouterItems(items: T[]): ice2ListWrapper<T> {
        let mythis: ice2ListWrapper<T> = this;
        mythis.dataContext.add(items);
        return mythis;
    }
    private   appendToContener(element:iXElement):void{
        let myThis: ice2ListWrapper<T> = this;
        if (this.affichageEnGrid == true) {
            let DomContainer: ice2Grid = myThis.monDomContainer as ice2Grid;
            DomContainer.append([element]); 
        } else {
            if (this.modeHorizontal==true) { 
                let DomContainer: ice2WrapPanel = myThis.monDomContainer as ice2WrapPanel;
                DomContainer.append(element);
            } else {
                let DomContainer: ice2StackPanel = myThis.monDomContainer as ice2StackPanel;
                    DomContainer.append(element);
            }
        }
    }
    private addData(items: T[]): ice2ListWrapper<T> {
        let myThis: ice2ListWrapper<T> = this;
        let nbcols: number = 1;

        if (items == null) { items = []; }

        if ((items.length <= myThis.LIMITE_NUMBER || !myThis.limite)) {
            items.forEach(function (v: T, index: number) {
                let ajout: boolean = true;
                //  ajout

                if (myThis.modeUnique) {
                    let listeFiltree: ice2ListItem<T>[] = myThis.listeItems.filter(function (val: ice2ListItem<T>) {
                        return myThis.equals(val.donnee, v);
                    });

                    //l'élément existe-t-il déja 
                    ajout = listeFiltree.length == 0;

                }

                // si il n'existe pas (au sens de la méthode compare) on ajoute l'élément
                if (ajout) {
                    let idTempo: string = "";
                    if (myThis.getId != null)
                        idTempo += myThis.getId(v);

                    let tdiv: iceDiv = null;
                    let tGridItem: ice2GridItem = null;
                    
                    if (myThis.affichageEnGrid == true) { 
                        tdiv = new iceDiv({ class: "ice2ListItem ice2ListItemGrid", id: idTempo != "" ? "ice2ListItem_" + idTempo : null });
                        if (index == items.length - 1) { nbcols = myThis.nbColonnesGrid - (index % myThis.nbColonnesGrid); }

                        else { nbcols = 1; }
                        nbcols = 1; 
                        tGridItem = new ice2GridItem({
                            rowStart: myThis.currentRow,
                            colStart: myThis.currentCol,
                            nbRows: 1,
                            nbCols: nbcols, 
                            content: tdiv
                        });
                        if (myThis.listGridItem) { 
                            myThis.listGridItem.push(tGridItem);
                        }
                         
                         
                        myThis.appendToContener(tGridItem)
                    } else {
                        tdiv = new iceDiv({ class: "ice2ListItem", id: idTempo != "" ? "ice2ListItem_" + idTempo : null });
                        myThis.appendToContener(tdiv)
                    }
                    let visible: boolean = true;
                    if (myThis.filtreActif != undefined) {
                        visible = myThis.filtreActif(v);
                    }
                    if (myThis.affichageEnGrid == true) {
                        if (visible) {
                            myThis.incrementeGridPosition();
                        }
                    }

                    let item: ice2ListItem<T> = new ice2ListItem<T>(tdiv, v, visible, myThis.renderItem, idTempo);
                    let indexInsert: number = myThis.listeItems.length;
                   
                    // toutes ces valeur son pour gere les groups
                    let indexDebutGroups: number;
                    let indexfinGroups: number;

                    if (myThis.regroupementUniqueBy_GroupBy) {
                        for (let i: number = 0; i < myThis.listeItems.length; i++) {
                            let nbOrder = HelperGeneric.CompareGeneric(myThis.regroupementUniqueBy_GroupBy(myThis.listeItems[i].donnee), myThis.regroupementUniqueBy_GroupBy(item.donnee));

                            if (i == 0 && nbOrder == 1 && indexDebutGroups == null) {
                                indexDebutGroups = 0;
                                indexfinGroups = 0;
                                indexInsert = 0;
                                break;
                            }
                            else if (nbOrder >= 0 && indexDebutGroups == null) {
                                indexDebutGroups = i;
                                if (nbOrder == 1) {
                                    indexfinGroups = i;
                                    indexInsert = i;
                                    break;
                                }
                            }
                            else if (indexDebutGroups != null && nbOrder != 0) {
                                indexfinGroups = i;
                                indexInsert = i;
                                break;
                            }
                        }
                    }

                    if (indexDebutGroups == null)
                        indexDebutGroups = myThis.regroupementUniqueBy_GroupBy ? myThis.listeItems.length : 0;
                    if (indexfinGroups == null)
                        indexfinGroups = myThis.listeItems.length;

                    switch (myThis.monTri) {
                        case enumTypeTri.aucun:
                            indexInsert = indexfinGroups;
                            break;
                        case enumTypeTri.asc:
                            {
                                for (let i: number = indexDebutGroups; i < indexfinGroups; i++) {
                                    if (myThis.greaterThan(myThis.listeItems[i].donnee, item.donnee) > 0) {
                                        indexInsert = i;
                                        break;
                                    }
                                    indexInsert = indexfinGroups;
                                }
                            }

                            break;
                        case enumTypeTri.desc:
                            {
                                for (let i: number = indexDebutGroups; i < indexfinGroups; i++) {
                                    if (myThis.greaterThan(item.donnee, myThis.listeItems[i].donnee) > 0) {
                                        indexInsert = i;
                                        break;
                                    }
                                    indexInsert = indexfinGroups;
                                }
                            }
                            break;

                    }
                    //j'insère l'élément dans la liste
                    myThis.listeItems.splice(indexInsert, 0, item);
                    // On ajoute dans le dico du groupe
                    let NameGroup: string;
                    if (myThis.regroupementUniqueBy_GroupBy) {
                        let NameGrouptempo = myThis.regroupementUniqueBy_GroupBy(item.donnee);
                        if (NameGrouptempo != null) {
                            if (HelperGeneric.IsDate(NameGrouptempo))
                                NameGroup = NameGrouptempo.toLocalDateStringCompleteCS3I();
                            else if (HelperGeneric.IsDateSerialisable(NameGrouptempo))
                                NameGroup = DateSerialisable.toLocalDateStringComplete(NameGrouptempo);
                            else
                                NameGroup = NameGrouptempo.toString();

                            if (!myThis.regroupementUniqueBy_Dico[NameGroup]) {
                                myThis.regroupementUniqueBy_Dico[NameGroup] = {
                                    headerZone: new iceDiv({ class: "ice2ListGroupeHeader", id: "ice2ListGroupeHeader_" + NameGroup }).asHolder, listeItem: [] };
                                myThis.appendToContener(myThis.regroupementUniqueBy_Dico[NameGroup].headerZone);
                            }

                            myThis.regroupementUniqueBy_Dico[NameGroup].listeItem.splice(indexInsert - indexDebutGroups, 0, item);

                            myThis.regroupementUniqueBy_Dico[NameGroup].headerZone.empty()
                            myThis.regroupementUniqueBy_groupHeader(myThis.regroupementUniqueBy_Dico[NameGroup].headerZone, myThis.regroupementUniqueBy_Dico[NameGroup].listeItem.filter(t => t.visible).map(t => t.donnee));
                        }

                    }

                    //je déplace la dom au bon endroit
                    if (indexInsert == 0 && myThis.listeItems.length > 1) {
                        if (myThis.regroupementUniqueBy_GroupBy) {
                            let NameGrouptempo = myThis.regroupementUniqueBy_GroupBy(myThis.listeItems[1].donnee);
                            if (NameGrouptempo != null) {
                                if (HelperGeneric.IsDate(NameGrouptempo))
                                    NameGrouptempo = NameGrouptempo.toLocalDateStringCompleteCS3I();
                                else if (HelperGeneric.IsDateSerialisable(NameGrouptempo))
                                    NameGrouptempo = DateSerialisable.toLocalDateStringComplete(NameGrouptempo);
                                else
                                    NameGrouptempo = NameGrouptempo.toString();
                                myThis.regroupementUniqueBy_Dico[NameGrouptempo].headerZone.y.parentElement.before(item.renderPlace.y.parentElement);
                            }
                        }
                        else
                            myThis.listeItems[1].renderPlace.y.parentElement.before(item.renderPlace.y.parentElement);
                    }
                    else {
                        if (myThis.listeItems.length > 1) {
                            myThis.listeItems[indexInsert - 1].renderPlace.y.parentElement.after(item.renderPlace.y.parentElement);
                        }
                    }

                    if (NameGroup != null && (indexInsert - indexDebutGroups) == 0) {
                        item.renderPlace.y.parentElement.before(myThis.regroupementUniqueBy_Dico[NameGroup].headerZone.y.parentElement);
                    }
                }
            });
        } else

            myThis.appendToContener(new ice2Label({ textLocalise: "Trop de données, veuillez affiner votre recherche.", type: enumTypeLabel.information }))

        if (myThis.LibelleSiVide != null && myThis.LibelleSiVide != "") {
            myThis.affichageLabelSiVide.Value = enumVisibility.masquerAvecCollapse;
            if (myThis.listeItems.length <= 0)
                myThis.affichageLabelSiVide.Value = enumVisibility.afficher;
        }

        if (myThis.listeItems.length > 0)
            myThis.GenerateGroupGlobal();

        return myThis;
    }

    // autre //
    private GenerateGroupGlobal() {
        let myThis: ice2ListWrapper<T> = this;
        let itemPrecedent: ice2ListItem<T> = null;

        if (myThis.groupeGlobal && myThis.greaterThanGlobal) {
            if (myThis.HeaderGroupGlobal.length > 0) {
                myThis.HeaderGroupGlobal.forEach((val) => { val.y.remove(); });
                myThis.HeaderGroupGlobal = [];
            }

            myThis.listeItems.forEach((item) => {
                if (item.visible.Value) {
                    if ((itemPrecedent == null || myThis.greaterThanGlobal(item.donnee, itemPrecedent.donnee) != 0)) {
                        let div: iceDiv = new iceDiv({ class: "ice2ListGroupGlobal" });
                        myThis.HeaderGroupGlobal.push(div.asHolder);
                        myThis.groupeGlobal(div.asHolder, item.donnee, itemPrecedent == null ? null : itemPrecedent.donnee);
                        item.renderPlace.y.parentElement.before(div.y);
                    }
                    itemPrecedent = item;
                }
            });
        }
    }

    private GenerateLibelleSiVide() {
        let mythis: ice2ListWrapper<T> = this;

        if (mythis.LibelleSiVide != null && mythis.LibelleSiVide != "") {
            mythis.appendToContener(new ice2Label({
                textLocalise: mythis.LibelleSiVide,
                type: enumTypeLabel.information,
                binding: {
                    visibility: mythis.affichageLabelSiVide
                }
            }));

            // Permet de Force l'invisibilité du ice2Label a l'init
            mythis.affichageLabelSiVide.Value = enumVisibility.afficher;
            mythis.affichageLabelSiVide.Value = enumVisibility.masquerAvecCollapse;
            if (mythis.listeItems.length <= 0)
                mythis.affichageLabelSiVide.Value = enumVisibility.afficher;
        }
    }

    public getAllData(): T[] {
        let myThis: ice2ListWrapper<T> = this;
        let retour: T[] = [];
        myThis.listeItems.forEach(function (item: ice2ListItem<T>) {
            retour.push(item.donnee);
        })

        return retour;
    }

    public render(): void {
        let myThis: ice2ListWrapper<T> = this;
        this.listeItems.forEach(function (item: ice2ListItem<T>, index: number) {
            item.render();
        });
        this.filtrer();
    }

    private VideDom() {
        let mythis: ice2ListWrapper<T> = this;
        if (this.affichageEnGrid) { 
            this.currentCol = 1;
            this.currentRow = 1; 
        }
        mythis.monDomContainer.vider();
        mythis.GenerateLibelleSiVide();
    }
    public addClass(strClasses: string): ice2ListWrapper<T> {
        let myThis: ice2ListWrapper<T> = this;
        myThis.monDomContainer.addClass(strClasses);

        return myThis;
    }

    public removeClass(strClasses: string): ice2ListWrapper<T> {
        let myThis: ice2ListWrapper<T> = this;
        myThis.monDomContainer.removeClass(strClasses);
        return myThis;
    }
    public toggleClass(classe: string, force: boolean) {
        return this.monDomContainer.toggleClass(classe, force);

    }
    public width(parame?: string | number): void | number {
        let myThis: ice2ListWrapper<T> = this;
        return myThis.monDomContainer.width(parame);
    }

    public height(parame?: string): void | number {
        let myThis: ice2ListWrapper<T> = this;
        return myThis.monDomContainer.height(parame);
    }
}

class ice2ListItem<T>{
    visible: BindableObject<boolean>;
    renderPlace: iceDiv;
    donnee: T;
    render: () => void;
    constructor(rPlace: iceDiv, inDonnee: any, visible: boolean, renderMethod: (place: xElementHolder, valeur: T, id: string) => void, id: string) {
        let mythis: ice2ListItem<T> = this; 
        mythis.visible = new BindableObject(visible);
        mythis.visible.bind((visible) => {
            //déclenché que si la valeur a changé
            if (!visible) {
                cachericeElements(mythis.renderPlace, true);
            }
            else {
                affichericeElements(mythis.renderPlace)
            }
        });

        mythis.renderPlace = rPlace;
        mythis.donnee = inDonnee;
        mythis.render = function () {
            if (!mythis.visible.Value) {
                cachericeElements(rPlace, true);
            }
            rPlace.vider();
            renderMethod(rPlace.asHolder, inDonnee, id);
        }
        mythis.render();


    }

    setVisibilite(visible: boolean) {
        let mythis: ice2ListItem<T> = this;
        mythis.visible.Value = visible;

    }

    supprimer() {
        let mythis: ice2ListItem<T> = this;
        // On supprime au le parent pour supprime le stackItem de La liste
        mythis.renderPlace.y.parentElement.remove();
    }


}