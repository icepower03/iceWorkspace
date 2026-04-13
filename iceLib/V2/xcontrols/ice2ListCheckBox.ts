// @ts-nocheck
import { iXElement, iXElementHolder, enumTypeOrientation } from '../iceBase';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2DockPanelDeprecated, DockPosition } from './ice2DockPanel';
import { ice2ListWrapper } from './ice2ListWrapper';
import { ice2CheckBox } from './ice2CheckBox';
import { ice2Grid, ice2GridItem } from './ice2Grid';
import { ice2Label } from './ice2Label';

interface OptionsListCheckBox<T> {
    data: T[];
    asyncLoading?: Promise<T[]>;
    renderItem: (ici: iXElementHolder, item: T) => void;
    renderTitre: (ici: iXElementHolder) => void;
    valueChange: (listeValeurs: T[]) => void;
    itemChecked?: (item: T, isCheck: boolean) => void;
    getId?: (item: T) => string;
    withTous?: boolean;
    class?: string;
    dataSelected?: T[];
    dataDesactivated?: T[];
    equals?: (a: T, b: T) => boolean;
    typeOrientation?: enumTypeOrientation;
    id?: string;
    // Attention : getId obligatoire en mode Grid pour pourvoir supprimer des items par supprimerItems()
    affichageEnGrid?: {
        /** en cas d'affichage horizontal*/
        nbCols: number;
        gridGap?: string;
        /** en cas d'affichage vertical*/
        nbRows: number;
    };
}

export class ice2ListCheckBox<T> implements iXElement {
    private myList: ice2ListWrapper<T>;
    private datas: T[];
    private container: ice2DockPanelDeprecated;
    private selection: T[] = [];
    private tousSelectionnes: boolean = false;
    private noClickOnTous: boolean = false;
    private ZoneCheckboxtous: ice2WrapPanel;
    private CheckBoxTous: ice2CheckBox;
    private valueChange: (listeValeurs: T[]) => void;
    private itemsSelected: T[] = [];
    private itemsDesactivated: T[] = [];
    private egalite: (a: T, b: T) => boolean;
    private typeOrientaion: enumTypeOrientation;
    private classeElement: string;
    private itemChecked?: (item: T, isCheck: boolean) => void;
    private getId: (item: T) => string;
    private renderItem: (ici: iXElementHolder, item: T) => void;
    private affichageEnGrid?: {
        /** en cas d'affichage horizontal*/
        nbCols: number;
        gridGap?: string;
        /** en cas d'affichage vertival*/
        nbRows: number;
    }
    // Affichage en grid //
    /*private myGrid: ice2Grid;
    private myGridItems: ice2GridItem[] = [];
    private listCheckBoxesInMyGrid: ice2CheckBox[] = [];
    private affichageEnGrid: boolean = false;
    private nbColonnesGrid: number = 0;
    private gridGap: string = "10px";
    private rowStart: number = 1;
    private colStart: number = 1;*/

    get y() {
        let myThis: ice2ListCheckBox<T> = this;
        return myThis.container.y;
    }

    constructor(o: OptionsListCheckBox<T>) {
        let myThis: ice2ListCheckBox<T> = this;

        let additionnalClass: string = o.class ? o.class : "";

        myThis.classeElement = additionnalClass;

        myThis.valueChange = o.valueChange;
        myThis.renderItem = o.renderItem;

        // option Grille
        myThis.affichageEnGrid = o.affichageEnGrid;/* != undefined ? o.affichageEnGrid.nbCols > 1 : false;
        if (myThis.affichageEnGrid)
        {
            myThis.nbColonnesGrid = o.affichageEnGrid.nbCols;
            myThis.gridGap = o.affichageEnGrid.gridGap != undefined ? o.affichageEnGrid.gridGap : "10px";
        }
        */
        if (o.affichageEnGrid != undefined ? o.affichageEnGrid.nbCols + o.affichageEnGrid.nbRows > 1 : false) {
            if (o.typeOrientation == undefined) {
                o.typeOrientation = enumTypeOrientation.horizontal;
            } 
        }
        myThis.container = new ice2DockPanelDeprecated({ centrerDernier: false, class: "ice2ListCheckBox " + additionnalClass });

        if (o.dataSelected)
            myThis.itemsSelected = o.dataSelected;

        if (o.dataDesactivated)
            myThis.itemsDesactivated = o.dataDesactivated;

        if (o.equals)
            myThis.egalite = o.equals;
        else
            myThis.egalite = function (a: T, b: T) { return a == b; };

        myThis.itemChecked = o.itemChecked;

        myThis.getId = o.getId;

        myThis.typeOrientaion = o.typeOrientation;

        if (myThis.typeOrientaion == undefined)
            myThis.typeOrientaion = enumTypeOrientation.vertical;

        myThis.getData(o).then(function (data)
        {
           /* if (myThis.affichageEnGrid)
            {
                myThis.createGrid(data, o);
                myThis.container.append(myThis.myGrid, DockPosition.haut);
            }
            else
            {*/
                myThis.createListe(data, o);

                //Bouton Tous
                if (o.withTous)
                {
                    myThis.ZoneCheckboxtous = new ice2WrapPanel({ espaceMinimaliste: true });

                    myThis.CheckBoxTous = new ice2CheckBox({
                        value: myThis.tousSelectionnes,
                        ValueChange: function (isChecked)
                        {
                            myThis.tousSelectionnes = isChecked;
                            if (!myThis.noClickOnTous)
                            {
                                if (isChecked)
                                { //ajout des éléments à la liste de retour
                                    myThis.selection = myThis.myList.getAllData().slice(); //JSON.parse(JSON.stringify()); //Pour forcer la copie de l'élément et non récupérer la référence
                                }
                                else
                                { //suppression des éléments de la liste de retour
                                    myThis.selection = [];
                                }
                                myThis.myList.render();
                                myThis.valueChange(myThis.selection);
                            }
                        }
                    });

                    myThis.ZoneCheckboxtous.append(myThis.CheckBoxTous);

                    myThis.ZoneCheckboxtous.append(new ice2Label({ textLocalise: "Tous" }));

                    myThis.container.append(myThis.ZoneCheckboxtous, DockPosition.haut, "tous");
                }
                myThis.container.append(myThis.myList, DockPosition.haut);
            /*}*/
            myThis.TestAllSelect();
        });
    }

    private async getData(o: OptionsListCheckBox<T>): Promise<T[]> {
        let myThis: ice2ListCheckBox<T> = this;

        if (o.asyncLoading) {
            o.data = await o.asyncLoading;
        }
        myThis.datas = o.data;
        return o.data;
    }

    private createListe(data: T[], o: OptionsListCheckBox<T>) {
        let myThis: ice2ListCheckBox<T> = this;
        myThis.selection = myThis.itemsSelected;

        let classtemp: string = myThis.classeElement != "" ? "_" + myThis.classeElement : "";

        myThis.myList = new ice2ListWrapper<T>({
            id: o.id,
            donnees: data,
            horizontal: myThis.typeOrientaion == enumTypeOrientation.horizontal,
            affichageEnGrid: myThis.affichageEnGrid,
            renderItem: function (ici, item) {
                let content = new ice2WrapPanel({ class: "ice2ListCheckboxItem" + classtemp, retourALaLigne: false, espaceMinimaliste: true });
                let itemPlace: iceDiv = new iceDiv({ class: "ice2ListCheckboxItem_div" });

                let selected: boolean = myThis.tousSelectionnes || myThis.indexOfItem(myThis.selection, item) > -1;
                let inactif: boolean = myThis.itemsDesactivated != null && myThis.indexOfItem(myThis.itemsDesactivated, item) > -1;

                let checkBoxTemp = new ice2CheckBox({
                    id: o.getId != null ? o.getId(item) : null,
                    value: selected,
                    inactif: inactif,
                    ValueChange: function (e)
                    {
                        if (e)
                        { //ajout de l'élément à la liste de retour
                            myThis.selection.push(item);
                            if (myThis.itemChecked != null)
                                myThis.itemChecked(item, true);
                        }
                        else
                        { //suppression de l'élément de la liste de retour
                            myThis.selection.splice(myThis.indexOfItem(myThis.selection, item), 1);
                            if (myThis.itemChecked != null)
                                myThis.itemChecked(item, false);
                        }
                        myThis.TestAllSelect();
                        o.valueChange(myThis.selection);
                    }
                });

                content.append(checkBoxTemp, "ice2ListCheckboxItem_checkbox");

                checkBoxTemp.setValue(selected);

                content.append(itemPlace, "ice2ListCheckboxItem_contenu");

                o.renderItem(itemPlace.asHolder, item);

                ici.append(content);
            }
        });

        // Suppression des pre selection
        myThis.itemsSelected = [];
    }

    /*private ajouterItemToMyGrid(data: T[])
    {
        let myThis: ice2ListCheckBox<T> = this;
        let nbcols: number = 1;
        let classtemp: string = myThis.classeElement != "" ? "_" + myThis.classeElement : "";

        data.forEach((item, index) =>
        {
            let content = new ice2WrapPanel({ class: "ice2ListCheckboxItem" + classtemp, retourALaLigne: false, espaceMinimaliste: true });
            let itemPlace: iceDiv = new iceDiv({ class: "ice2ListCheckboxItem_div" });

            let selected: boolean = myThis.tousSelectionnes || myThis.indexOfItem(myThis.selection, item) > -1;
            let inactif: boolean = myThis.itemsDesactivated != null && myThis.indexOfItem(myThis.itemsDesactivated, item) > -1;

            let checkBoxTemp = new ice2CheckBox({
                id: myThis.getId != null ? myThis.getId(item) : null,
                value: selected,
                inactif: inactif,
                ValueChange: function (isChecked)
                {
                    if (isChecked)
                    { //ajout de l'élément à la liste de retour
                        myThis.selection.push(item);
                        if (myThis.itemChecked != null)
                            myThis.itemChecked(item, true);
                    }
                    else
                    { //suppression de l'élément de la liste de retour
                        myThis.selection.splice(myThis.indexOfItem(myThis.selection, item), 1);
                        if (myThis.itemChecked != null)
                            myThis.itemChecked(item, false);
                    }
                    myThis.TestAllSelect();
                    myThis.valueChange(myThis.selection);
                }
            });

            content.append(checkBoxTemp, "ice2ListCheckboxItem_checkbox");

            checkBoxTemp.setValue(selected);
            myThis.listCheckBoxesInMyGrid.push(checkBoxTemp);

            content.append(itemPlace, "ice2ListCheckboxItem_contenu");

            myThis.renderItem(itemPlace.asHolder, item);

            // pour aligner le dernier élément sur les colonnes 
            if (index == data.length - 1)
                nbcols = myThis.nbColonnesGrid - (index % myThis.nbColonnesGrid);
            else
                nbcols = 1;

            let gridItem: ice2GridItem = new ice2GridItem({
                id: myThis.getId != null ? "gi_" + myThis.getId(item) : null,
                content: content, // tdiv
                rowStart: myThis.rowStart,
                colStart: myThis.colStart,
                nbRows: 1,
                nbCols: nbcols
            });

            myThis.myGridItems.push(gridItem);
            myThis.myGrid.append([gridItem]);

            if (myThis.colStart < myThis.nbColonnesGrid)
                myThis.colStart++;
            else
            {
                myThis.rowStart++;
                myThis.colStart = 1;
            }
        });

    }*/
    /*
    private createGrid(data: T[], o: OptionsListCheckBox<T>) {
        let myThis: ice2ListCheckBox<T> = this;

        myThis.selection = myThis.itemsSelected;

        myThis.myGrid = new ice2Grid({
            id: o.id,
            colonnes_auto: "1fr",
            gridGap: myThis.gridGap,
            padding: false,
            class: "gridCheckbox"
        });

        myThis.rowStart = 1;
        myThis.colStart = 1;

        //Bouton Tous
        if (o.withTous)
        {
            let content = new ice2WrapPanel({ class: "ice2ListCheckboxItemTous", retourALaLigne: false, espaceMinimaliste: true });

            myThis.CheckBoxTous = new ice2CheckBox({
                id: "tous",
                textLocalise: "Tous",
                value: myThis.tousSelectionnes,
                ValueChange: function (isChecked)
                {
                    myThis.tousSelectionnes = isChecked;
                    if (!myThis.noClickOnTous)
                    {
                        myThis.listCheckBoxesInMyGrid.forEach(item =>
                        {
                            item.setValue(isChecked);
                        });
                        myThis.selection = isChecked ? myThis.getAllDatas() : []; 
                    }
                }
            });
            content.append(myThis.CheckBoxTous, "ice2ListCheckboxItem_checkbox");

            content.append(new ice2Label({ textLocalise: "Tous" }), "ice2ListCheckboxItem_contenu");

            let gridItem: ice2GridItem = new ice2GridItem({
                content: content, 
                rowStart: myThis.rowStart,
                colStart: myThis.colStart,
                nbRows: 1,
                nbCols: 1
            });
            myThis.myGridItems.push(gridItem);
            myThis.myGrid.append([gridItem]);

            myThis.colStart++;
        }

        myThis.ajouterItemToMyGrid(data);

        // Suppression des pre selection
        myThis.itemsSelected = [];
    }
    */
    // permet de tester si tous les elements sont cochés manuellement et de cocher ou decocher la case tous si elle est presente
    private TestAllSelect() {
        let myThis: ice2ListCheckBox<T> = this;

        if (myThis.CheckBoxTous != undefined)
        {
            if (myThis.ZoneCheckboxtous != undefined && myThis.myList != null)
            {
                if (myThis.myList.getAllData().length > 0) 
                    affichericeElements(myThis.ZoneCheckboxtous);
                else
                    cachericeElements(myThis.ZoneCheckboxtous, true);
            }

            myThis.noClickOnTous = true;
           /* if (myThis.myGrid != null)
            {
                if (myThis.selection.length == myThis.listCheckBoxesInMyGrid.length && myThis.listCheckBoxesInMyGrid.length != 0)
                {
                    if (myThis.CheckBoxTous.value == false)
                        myThis.CheckBoxTous.setValue(true);
                }
                else
                {
                    if (myThis.CheckBoxTous.value == true)
                        myThis.CheckBoxTous.setValue(false);
                }
            }
            else
            {*/
                if (myThis.selection.length == myThis.myList.getAllData().length && myThis.myList.getAllData().length != 0)
                {
                    if (myThis.CheckBoxTous.value == false)
                        myThis.CheckBoxTous.setValue(true);
                }
                else
                {
                    if (myThis.CheckBoxTous.value == true)
                        myThis.CheckBoxTous.setValue(false);
                }
           /* }*/
            myThis.noClickOnTous = false;
        }
    }

    public supprimerAllData() {
        let myThis: ice2ListCheckBox<T> = this;

        /*if (myThis.myGrid != null)
        {
            myThis.myGrid.vider();
            myThis.rowStart = 1;
            myThis.colStart = 1;
        }
        else*/
        myThis.myList.supprimerItemsAll();

        myThis.selection = [];
        myThis.TestAllSelect();
    }

    /*private supprimerItemFromMyGrid(elements: T[])
    {
        let myThis: ice2ListCheckBox<T> = this;

        elements.forEach(item =>
        {
            if (myThis.getId != null)
            {
                let gridItem: ice2GridItem = myThis.myGridItems.find(gi => gi.id == "gi_" + myThis.getId(item));
                if (gridItem != undefined)
                    myThis.myGrid.supprimer([gridItem]);
            }
        });
    }*/

    public supprimerItems(tab: T[]) {
        let myThis: ice2ListCheckBox<T> = this;

        tab.forEach((val) => {
            myThis.selection.splice(myThis.indexOfItem(myThis.selection, val), 1);
        });
        myThis.TestAllSelect();

       /* if (myThis.myGrid != null)
            myThis.supprimerItemFromMyGrid(tab);
        else*/
            myThis.myList.supprimerItems(tab);
    }

   /* private setValuesToMyGrid(elements: T[])
    {
        let myThis: ice2ListCheckBox<T> = this;

        elements.forEach(item =>
        {
            if (myThis.getId != null)
            {
                let check: ice2CheckBox = myThis.listCheckBoxesInMyGrid.find(ch => ch.getId == myThis.getId(item));
                if (check != undefined)
                    check.setValue(true);
            }
        });
    }*/

    //Coche les valeurs passées en paramètre
    public setValues(values: T[]) {
        let myThis: ice2ListCheckBox<T> = this;
        myThis.itemsSelected = values;
        myThis.selection = myThis.itemsSelected;

        /*if (myThis.myGrid != null)
            myThis.setValuesToMyGrid(values);
        else*/
            if (myThis.myList != null)
                myThis.myList.render();
    }

    public ajouterItems(tab: T[], PreselectionSelectionner: boolean = false) {
        let myThis: ice2ListCheckBox<T> = this;
        myThis.tousSelectionnes = false;
        if (PreselectionSelectionner) {
            myThis.selection = myThis.selection.concat(tab);
        }
        /*if (myThis.myGrid != null)
            myThis.ajouterItemToMyGrid(tab);
        else*/
            if (myThis.myList != null)
                myThis.myList.ajouterItems(tab);

        myThis.TestAllSelect();

        myThis.valueChange(myThis.selection);
    }

    private indexOfItem(liste: T[], item: T): number {
        let myThis: ice2ListCheckBox<T> = this;

        let retour: number = -1;
        liste.forEach(function (e, index) {
            if (myThis.egalite(e, item))
                retour = index;
        });

        //console.log(item);
        //console.log("index : " + retour);

        return retour;
    }

    /**
     * Modifie la valeur de la case à cocher "tous".
     * @param value
     */
    public setCocheTous(value: boolean): void {
        let myThis: ice2ListCheckBox<T> = this;
        if (myThis.CheckBoxTous != null) {
            myThis.CheckBoxTous.setValue(value);
        }
    }

    public getAllDatas() {
        let myThis: ice2ListCheckBox<T> = this;

        return myThis.datas;
    }

    public getSelection(): T[] {
        let myThis: ice2ListCheckBox<T> = this;

        return myThis.selection;
    }
}