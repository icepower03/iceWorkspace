// @ts-nocheck
import { iXElement, iXElementHolder, optionsAffichage, enumVisibility, iTestable, enumTypeOrientation, enumCouleur, enumCote } from '../xBase';
import { BindableObject } from './BindableObject';
import { afficherxElements, cacherxElements } from '../../xStaticFunctions';
import { xDiv } from './xDiv';
import { xxBouton, enumTailleBouton, enumTypeBouton, enumCouleurBouton, optionsAffichageBouton, enumStyleBouton } from './xxBouton';
import { xxGrid, xxGridItem } from './xxGrid';
import { xxWrapPanel } from './xxWrapPanel';
import { xxLabel } from './xxLabel';
import { Icone } from '../xIcones';
import { xxListWrapper } from './xxListWrapper';
﻿export enum ETypeBouton
{
    boutonClassique, //Bouton avec rond à cocher
    boutonWrapper2 //Utilisation du xxBouton
}



interface OptionsRadioButton<T>
{
    id?: string;
    class?: string;
    initElements: itemRadioButtonOptions<T>[];
    typeOrientation?: enumTypeOrientation;
    typeOrientationBouton?: enumTypeOrientation;
    valueChange: (a: T) => void;
    clickOnSelected?: (a: T, reset: () => void) => void;
    renderDecorator?: (i: itemRadioButton<T>) => void;

    SelectedClassCustonGlobal?: string;

    /* permet de réduire l'affichage lorsque */
    displayOnlySelected?: boolean;

    /* deprecated Permet d'effectuer un fakeClick a l'init du radioButton si il y a un Preselectionné */
    /* Change le nom dans le futur par "FireEventChangeOnInitPreselection" */
    FakeClickPreselectionOnInit?: boolean;
    typeBouton?: ETypeBouton;
    readonly?: boolean;

    binding?: {
        value?: BindableObject<T>;
        visibility?: BindableObject<enumVisibility>;
        disabled?: BindableObject<boolean>;
    };

    /*affichageEnGrid?: {
        nbCols: number;
        gridGap?: string;
    };*/
    affichageEnGrid?: {
        /** en cas d'affichage horizontal*/
        nbCols: number;
        gridGap?: string;
        /** en cas d'affichage vertival*/
        nbRows: number;
    };
    gap?: number;
}

interface itemRadioButtonOptions<T> extends iTestable
{
    id?: string;
    valeur: T;
    icone?: Icone;
    binding?: { texteVariable?: BindableObject<string> }
    libelleLocalise?: string;
    libelleVariable?: string;
    titleLocalise?: string;
    titleVariable?: string;
    preselectionne?: boolean;
    class?: string;
    espaceMinimaliste?: boolean;
    inactif?: boolean;

    SelectedClassCuston?: string;

    //BoutonWrapper2
    optionBoutonWrapper2?: {
        optionsAffichage?: optionsAffichageBouton;
        SelectedcolorCuston?: enumCouleurBouton;
        UnSelectedcolorCuston?: enumCouleurBouton;
        typeBouton?: enumTypeBouton;
        tailleBouton?: enumTailleBouton;
    }

    couleurBorder?: string;
}

export class itemRadioButton<T>
{
    //---- Constant Static ----//
    public static readonly classInactif: string = "xrbti-inactif";
    public static readonly classSelected: string = "xxRadioButtonItemSelected";

    //---- Attributs ----//
    public id?: string;
    public valeur: T;
    public icone?: Icone;
    public libelleLocalise?: string;
    public libelleVariable?: string;
    public titleLocalise?: string;
    public titleVariable?: string;
    public preselectionne?: boolean;
    public class?: string;
    public idTest: string;
    public espaceMinimaliste: boolean;
    public bindingTexte: BindableObject<string>;
    public couleurBorder: string;
    private _inactif?: boolean;
    private _isSelect: boolean;
    private gap?: number;

    // Pour le type boutonWrapper2
    public optionsAffichageBouton?: optionsAffichageBouton;
    public typeBouton?: enumTypeBouton;

    // Content
    public jqHostButton: iXElementHolder;
    public divHost: xDiv;
    public boutonAssocie: xxBouton;

    // other
    public SelectedClassCustonGlobal: string;
    private SelectedClassCuston: string;
    private Selectedcolor?: enumCouleurBouton;
    private UnSelectedcolor?: enumCouleurBouton;

    //---- propertie ----//
    public get inactif(): boolean { return this._inactif; }
    public get isSelect(): boolean { return this._isSelect; }

    //---- Constructor ----//
    constructor(o: itemRadioButtonOptions<T>)
    {
        let myThis: itemRadioButton<T> = this;

        myThis.id = o.id;
        myThis.valeur = o.valeur;
        myThis.icone = o.icone;
        myThis.libelleLocalise = o.libelleLocalise;
        myThis.libelleVariable = o.libelleVariable;
        myThis.preselectionne = o.preselectionne;
        myThis.titleLocalise = o.titleLocalise;
        myThis.titleVariable = o.titleVariable;
        myThis.class = o.class;
        myThis.SelectedClassCuston = o.SelectedClassCuston;
        myThis.idTest = o.idTest;
        myThis.espaceMinimaliste = o.espaceMinimaliste;
        myThis.bindingTexte = o?.binding?.texteVariable;
        myThis._inactif = o.inactif;
        myThis.couleurBorder = o.couleurBorder;
        if (myThis.espaceMinimaliste == undefined)
        {
            myThis.espaceMinimaliste = false;
        }

        myThis.optionsAffichageBouton = o.optionBoutonWrapper2?.optionsAffichage;      

        if (myThis.optionsAffichageBouton == undefined)
        {
            myThis.optionsAffichageBouton = { styleBouton: enumStyleBouton.SansFondAvecContour };
        }
        else if (myThis.optionsAffichageBouton.styleBouton == undefined)
        {
            myThis.optionsAffichageBouton.styleBouton = enumStyleBouton.SansFondAvecContour;
        }


        myThis.typeBouton = o.optionBoutonWrapper2?.typeBouton;

        myThis.Selectedcolor = enumCouleurBouton.Valide;
        if (o.optionBoutonWrapper2?.SelectedcolorCuston != null)
            myThis.Selectedcolor = o.optionBoutonWrapper2.SelectedcolorCuston;

        myThis.UnSelectedcolor = enumCouleurBouton.Blanc;
        if (o.optionBoutonWrapper2?.UnSelectedcolorCuston != null)
            myThis.UnSelectedcolor = o.optionBoutonWrapper2.UnSelectedcolorCuston;
    }

    //---- Methode ----//
    private getSelectedClass(): string
    {
        let myThis: itemRadioButton<T> = this;
        let toSender: string = "";

        if ((myThis.SelectedClassCustonGlobal != null && myThis.SelectedClassCustonGlobal != "") || (myThis.SelectedClassCuston != null && myThis.SelectedClassCuston != ""))
        {
            if (myThis.SelectedClassCustonGlobal != null && myThis.SelectedClassCustonGlobal != "")
                toSender += myThis.SelectedClassCustonGlobal;

            if (myThis.SelectedClassCuston != null && myThis.SelectedClassCuston != "")
                toSender += (toSender != "" ? " " : "") + myThis.SelectedClassCuston;
        }
        else
            toSender = itemRadioButton.classSelected;

        return toSender;
    }

    /**toggle button isSelected */
    public ToggleSelected(isSelect?: boolean): void
    {
        let myThis: itemRadioButton<T> = this;
        if (myThis.isSelect && isSelect != true)
        {
            myThis._isSelect = false;
            myThis.divHost.removeClass(myThis.getSelectedClass());
            if (myThis.boutonAssocie != null && (myThis.SelectedClassCustonGlobal != null && myThis.SelectedClassCustonGlobal != "") || (myThis.SelectedClassCuston != null && myThis.SelectedClassCuston != ""))
                myThis.boutonAssocie.setColor(myThis.Selectedcolor);

        }
        else if (isSelect != false)
        {
            myThis._isSelect = true;
            myThis.divHost.addClass(myThis.getSelectedClass());
            if (myThis.boutonAssocie != null && (myThis.SelectedClassCustonGlobal != null && myThis.SelectedClassCustonGlobal != "") || (myThis.SelectedClassCuston != null && myThis.SelectedClassCuston != ""))
                myThis.boutonAssocie.setColor(myThis.UnSelectedcolor);
        }
    }

    /**Active le radio button */
    public activer(): void
    {
        let myThis: itemRadioButton<T> = this;
        myThis._inactif = false;
        myThis.divHost.removeClass(itemRadioButton.classInactif);
    }

    /**Désactive le radio button */
    public desactiver(): void
    {
        let myThis: itemRadioButton<T> = this;
        myThis._inactif = true;
        myThis.divHost.addClass(itemRadioButton.classInactif);
    }

}

export class xxRadioButton<T> implements iXElement
{

    //---- propertie ----//
 
    public get y()
    {
        /*if (this.myGrid != null)
            return this.myGrid.y;
        else*/
            return this.myList.y;
    }


    //---- Attributs ----//

    // option //
    private valueChange: (a: T) => void;
    private typeBouton?: ETypeBouton;
    private displayOnlySelected: boolean;
    private typeOrientation: enumTypeOrientation;
    private typeOrientationBouton: enumTypeOrientation;
    private isReadonly: boolean;
    private clickOnSelected: (a: T, reset: () => void) => void;
    private renderDecorator: (i: itemRadioButton<T>) => void;
    private SelectedClassCustonGlobal: string;

    private Value: T;

    // Items //
    private myList: xxListWrapper<itemRadioButton<T>>;


    // selected item //
    private ItemSelected: itemRadioButton<T>;

    // Other //
    private hasValue: boolean;

    // Affichage en grid //
    private  affichageEnGrid?: {
        /** en cas d'affichage horizontal*/
        nbCols: number;
        gridGap?: string;
        /** en cas d'affichage vertival*/
        nbRows: number;
    };
    private doAffichageEnGrid: boolean;
    /*private myGrid: xxGrid;
    private myGridItems: xxGridItem[] = [];
    private affichageEnGrid: boolean = false;
    private nbColonnesGrid: number = 0;
    private gridGap: string = "10px";
    private rowStart: number = 1;
    private colStart: number = 1;*/ 
    private listeClassItem: itemRadioButton<T>[] = [];

    constructor(o: OptionsRadioButton<T>)
    {
        let myThis: xxRadioButton<T> = this;

        myThis.hasValue = false;

        // option init //
        myThis.valueChange = o.valueChange;

        // option Grille
        myThis.doAffichageEnGrid = o.affichageEnGrid != undefined ?  (o.affichageEnGrid.nbCols + o.affichageEnGrid.nbRows) > 1 : false;
        if (myThis.doAffichageEnGrid)
        { 
            myThis.affichageEnGrid = o.affichageEnGrid;
        }

        myThis.SelectedClassCustonGlobal = o.SelectedClassCustonGlobal;

        myThis.typeBouton = o.typeBouton != undefined ? o.typeBouton : ETypeBouton.boutonWrapper2;

        myThis.displayOnlySelected = o.displayOnlySelected == undefined ? false : o.displayOnlySelected;

        if (o.clickOnSelected != undefined) { myThis.clickOnSelected = o.clickOnSelected; }

        if (o.renderDecorator != undefined) { myThis.renderDecorator = o.renderDecorator; }


        myThis.typeOrientation = o.typeOrientation;
        if (myThis.typeOrientation == undefined) { myThis.typeOrientation = enumTypeOrientation.horizontal; }

        myThis.typeOrientationBouton = o.typeOrientationBouton;
        if (myThis.typeOrientationBouton == undefined) { myThis.typeOrientationBouton = enumTypeOrientation.vertical; }

        myThis.isReadonly = o.readonly;
        if (myThis.isReadonly == null)
            myThis.isReadonly = false;

        if (o.binding != undefined) 
        {
            if (o.binding.value != undefined)
            {
                let itemRadioSelect = o.initElements.filter(i => i.valeur == o.binding.value.Value)[0];
                itemRadioSelect.preselectionne = true;
                o.binding.value.bind(s =>
                {
                    myThis.setValue(s);
                })
                myThis.valueChange = (val) =>
                {
                    o.binding.value.Value = val;
                }
            }

            if (o.binding.visibility != undefined)
            {
                o.binding.visibility.bind(s =>
                {
                    myThis.setVisibility(s);
                });
            }

            if (o.binding.disabled != null)
            {
                myThis.isReadonly = o.binding.disabled.Value;
                o.binding.disabled.bind(s =>
                {
                    if(s)
                        myThis.listeClassItem.forEach(d => d.desactiver());
                    else
                        myThis.listeClassItem.forEach(d => d.activer());
                })
            }
                
        }


        // Generate Liste Items //
        //let listeClassItem: itemRadioButton<T>[] = [];
        o.initElements.forEach(function (i: itemRadioButtonOptions<T>)
        {
            if (myThis.isReadonly) // && !i.preselectionne
            {
                i.inactif = true;
            }
            if (i.preselectionne)
            {
                myThis.hasValue = true;
                if (o.FakeClickPreselectionOnInit) {
                    myThis.Value = i.valeur;
                    myThis.valueChange(i.valeur);
                }
                    
            }

            myThis.listeClassItem.push(new itemRadioButton<T>(i));
        });

        // Generate Class //
        let classeDefaut: string = "xxRadioButton ";

        if (myThis.displayOnlySelected)
        {

            classeDefaut += ' displayOnlySelected ';
        }
        else
        {
            classeDefaut += ' displayStandard ';
        }
        if (o.class != undefined)
        {
            classeDefaut += (' ' + o.class);
        }

        /*if (myThis.affichageEnGrid)
        {
            // Generate Grid Boutons //
            myThis.myGrid = new xxGrid({
                colonnes_auto: "1fr",
                gridGap: myThis.gridGap,
                padding: false,
                class: "gridRadioBouton"
            });

            myThis.rowStart = 1;
            myThis.colStart = 1;
            myThis.ajouterItemToMyGrid(myThis.listeClassItem);

            if (myThis.hasValue)
                myThis.myGrid.addClass("hasValue");

        }
        else
        {*/
            // Generate liste Boutons //
            myThis.myList = new xxListWrapper<itemRadioButton<T>>({
                class: classeDefaut,
                horizontal: myThis.typeOrientation == enumTypeOrientation.horizontal,
                affichageEnGrid: myThis.doAffichageEnGrid ? myThis.affichageEnGrid : undefined,
                donnees: myThis.listeClassItem,
                gap: o.gap ? o.gap : null,
                renderItem: function (ici, item: itemRadioButton<T>)
                {
                    myThis.createButton(ici, item, myThis);
                },
                equals: function (a: itemRadioButton<T>, b: itemRadioButton<T>)
                {
                    return (
                        a.id == b.id
                        && a.divHost == b.divHost
                        && a.jqHostButton == a.jqHostButton
                        && a.idTest == b.idTest
                        && a.valeur == b.valeur
                    );
                }

            });

            if (myThis.hasValue)
                myThis.myList.addClass("hasValue");
        
       /* }*/

    }

    //---- Methode ----//

    private createButton(ici: iXElementHolder, item: itemRadioButton<T>, myThis: xxRadioButton<T>)
    {
        item.jqHostButton = ici;
        item.divHost = new xDiv({ class: "xxRadioButtonItem" });

        item.SelectedClassCustonGlobal = myThis.SelectedClassCustonGlobal;

        if (item.inactif != null && item.inactif)
            item.desactiver();

        if (item.class != undefined)
            item.divHost.addClass(item.class);

        if (item.couleurBorder)
        {
            xStyle.setBorder(item.divHost, { Gauche: 5 });
            xStyle.setCouleurBorder(item.divHost, item.couleurBorder, enumCote.gauche);
        }

        // héritage d'un ancien mode ou il n'etait pas possible de forcer typehabillage
        /*if (item.libelleLocalise == undefined && item.libelleVariable == undefined)
        {
            item.optionsAffichageBouton.tailleBouton = enumTailleBouton.Fit;
        }*/
        let boutonSeul = (item.libelleVariable == null || item.libelleVariable == '') && (item.libelleLocalise == null || item.libelleLocalise == '');
        switch (myThis.typeBouton)
        {

            case ETypeBouton.boutonClassique:
                item.divHost.asHolder.append(new xxBouton({
                    id: item.id,
                    binding: {
                        textVariable: item.bindingTexte
                    },
                    titleLocalise: item.titleLocalise == undefined ? (item.titleVariable == undefined ? "Sélectionner" : item.titleVariable) : item.titleLocalise,
                    class: "xxRadioButtonClassique" + (boutonSeul? " boutonSeul":""),
                    click: function (cb)
                    {

                        if (item.inactif != null && item.inactif)
                        {
                            cb();
                            return;
                        }

                        myThis.setCheckedItem(item);

                        cb();
                    },
                    textVariable: item.bindingTexte != null ? null : item.libelleVariable,
                    textLocalise: item.bindingTexte != null ? null : item.libelleLocalise,
                    icone: item.icone,
                    optionsAffichage: {

                        tailleBouton: (boutonSeul ? enumTailleBouton.Fit : null)
                    }
                }));
                break;
            case ETypeBouton.boutonWrapper2:
                let btnWrapper2: xxBouton = new xxBouton({

                    id: item.id,
                    binding: {
                        textVariable: item.bindingTexte
                    },
                    titleLocalise: item.titleLocalise == undefined ? (item.titleVariable == undefined ? "Sélectionner" : item.titleVariable) : item.titleLocalise,
                    class: "",
                    click: function (cb)
                    {
                        if (item.inactif != null && item.inactif)
                        {
                            cb();
                            return;
                        }

                        myThis.setCheckedItem(item);

                        cb();
                    },
                    textVariable: item.bindingTexte != null ? null : item.libelleVariable,
                    textLocalise: item.bindingTexte != null ? null : item.libelleLocalise,
                    icone: item.icone,
                    optionsAffichage: item.optionsAffichageBouton,
                    typeBouton: item.typeBouton,
                });
                item.boutonAssocie = btnWrapper2;
                item.divHost.asHolder.append(btnWrapper2);
        }

        if (myThis.renderDecorator != null)
            myThis.renderDecorator(item);
        ici.append(item.divHost);

        // si un item en préselection
        if (item.preselectionne == true)
        {
            myThis.ItemSelected = item;
            myThis.ItemSelected.ToggleSelected(true);
        }
    }

    /*private ajouterItemToMyGrid(elements: itemRadioButton<T>[])
    {
        let myThis: xxRadioButton<T> = this;
        let nbcols: number = 1;

        elements.forEach((item, index) =>
        {
            let tdiv: xDiv = new xDiv({ class: "xxGridItem", id: item.id });
            myThis.createButton(tdiv.asHolder, item, myThis);

            // pour aligner le dernier élément sur les colonnes 
            if (index == elements.length - 1)
                nbcols = myThis.nbColonnesGrid - (index % myThis.nbColonnesGrid);
            else
                nbcols = 1;

            let gridItem: xxGridItem = new xxGridItem({
                content: tdiv,
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
    }
    */
    /*private supprimerItemFromMyGrid(elements: itemRadioButton<T>[])
    {
        let myThis: xxRadioButton<T> = this;

        elements.forEach(item =>
        {
            let gridItem: xxGridItem = myThis.myGridItems.find(gi => gi.content.y.id == item.id);
            if (gridItem != undefined)
                myThis.myGrid.supprimer([gridItem]);
        });
    }*/

    private setCheckedItem(item: itemRadioButton<T>)
    {
        let myThis: xxRadioButton<T> = this;

        if (myThis.displayOnlySelected)
        {
            //offsetWidth retourne toujours 0 si l'objet ou l'un de ses parents est hide.
            //pour contrer ça il faut afficher les éléments le temps de prendre les mesures.
            //myThis.myList.removeClass("displayOnlySelected");
            /*if (myThis.myGrid != null)
            {
                myThis.listeClassItem.forEach((temp) =>
                {
                    let settailleForAnime = () =>
                    {
                        if (myThis.typeOrientation == enumTypeOrientation.horizontal)
                            temp.divHost.y.style.width = <string><any>temp.divHost.contentsWidth();
                        else
                            temp.divHost.y.style.height = <string><any>temp.divHost.contentsHeight();
                    }

                    settailleForAnime();

                    if (temp.bindingTexte != null)
                        temp.bindingTexte.bind(() =>{ settailleForAnime();});
                });

                //myThis.myGrid.addClass("displayOnlySelected");

                myThis.hasValue = !myThis.hasValue;

                if (myThis.hasValue)
                {
                    myThis.myGrid.removeClass("NothasValue");
                    myThis.myGrid.addClass("hasValue");
                } else
                {
                    myThis.myGrid.removeClass("hasValue");
                    myThis.myGrid.addClass("NothasValue");
                }

            }
            else
            {*/
                myThis.myList.listeItems.forEach((temp) =>
                {
                    let settailleForAnime = () =>
                    {
                        if (myThis.typeOrientation == enumTypeOrientation.horizontal)
                            temp.donnee.divHost.y.style.width = <string><any>temp.donnee.divHost.contentsWidth();
                        else
                            temp.donnee.divHost.y.style.height = <string><any>temp.donnee.divHost.contentsHeight();
                    }

                    settailleForAnime();

                    if (temp.donnee.bindingTexte != null)
                        temp.donnee.bindingTexte.bind(() =>{ settailleForAnime();});
                });

                //myThis.myList.addClass("displayOnlySelected");

                myThis.hasValue = !myThis.hasValue;
                myThis.myList.toggleClass("hasValue", myThis.hasValue);
                myThis.myList.toggleClass("NothasValue", !myThis.hasValue);

            /*}*/
        }

        if (myThis.ItemSelected != item)
        {
            //si je ne suis pas déja choisi
            if (myThis.ItemSelected != null)
                myThis.ItemSelected.ToggleSelected(false);
            myThis.Value = item.valeur;
            myThis.valueChange(item.valeur);
            myThis.ItemSelected = item;
            item.ToggleSelected(true);
        }
        else
        {
            //si je suis déja choisi
            if (myThis.clickOnSelected != undefined)
            {
                myThis.clickOnSelected(item.valeur, function () { myThis.resetValue(); });
            }
        }
    }

   
    // Ajoute/suppr items
    public ajouterItems(elements: itemRadioButton<T>[])
    {
        let myThis: xxRadioButton<T> = this;

        elements.forEach(function (bouton: itemRadioButton<T>)
        {
            myThis.listeClassItem.push(bouton);
        });

        if (elements.filter(function (a) { return a.preselectionne; }).length > 0)
        {
            myThis.hasValue = true;
        }

        /*if (myThis.myGrid != null)
            myThis.ajouterItemToMyGrid(elements);
        else*/
            myThis.myList.ajouterItems(elements);

        if (myThis.isReadonly)
            elements.forEach((item) => { item.desactiver(); });
    }

    public supprimerItems(elements: itemRadioButton<T>[])
    {
        let myThis: xxRadioButton<T> = this;
        elements.forEach(function (v: itemRadioButton<T>)
        {
            myThis.listeClassItem.forEach(function (val: itemRadioButton<T>, index: number)
            {
                if (v == val)
                {
                    //suppression des donnees
                    myThis.listeClassItem.splice(index, 1);
                }
            });
        });

        /*if (myThis.myGrid != null)
            myThis.supprimerItemFromMyGrid(elements);
        else*/
            myThis.myList.supprimerItems(elements);
    }

    /** Supprime tous les items de la liste*/
    public resetItems()
    {
        let myThis: xxRadioButton<T> = this;

        myThis.listeClassItem = [];

        /*if (myThis.myGrid != null)
        {
            myThis.myGrid.vider();
            myThis.rowStart = 1;
            myThis.colStart = 1;
        }
        else*/
            myThis.myList.supprimerItemsAll();
    }

    public getItems()
    {
        let myThis: xxRadioButton<T> = this;

        /*if (myThis.myGrid != null)
            return myThis.listeClassItem;
        else*/
            return myThis.myList.getAllData();
    }

    //** Set le texte en mode xxBouton (ButtonWapper2)*/
    public setTexteBoutonSelected(newText: string): void
    {
        let myThis: xxRadioButton<T> = this;
        myThis.ItemSelected.boutonAssocie?.setTexte(newText);
    }

    // Set Value
    public setValue(val: T, withFireEventValueChange: boolean = false)
    {
        let myThis: xxRadioButton<T> = this;
        myThis.ItemSelected = null;
        let listeClassItem: itemRadioButton<T>[];
        /*if (myThis.myGrid != null)
            listeClassItem = myThis.listeClassItem;
        else*/
            listeClassItem = myThis.myList.getAllData();

        listeClassItem.forEach(function (i)
        {
            if (i.valeur as T == val)
            {
                i.ToggleSelected(true);
                myThis.ItemSelected = i;
                if (withFireEventValueChange) {
                    myThis.Value = i.valeur;
                    myThis.valueChange(i.valeur);
                }
                    
            }
            else
                i.ToggleSelected(false);
        });
    }

    public resetValue(declencheValueChanged: boolean = true)
    {
        let myThis: xxRadioButton<T> = this;

        if (myThis.ItemSelected != null)
        {
            myThis.ItemSelected.ToggleSelected(false);
            myThis.ItemSelected = null;
        }

        if (declencheValueChanged) {
            myThis.Value = null;
            myThis.valueChange(null);
        }
            
        /*if (myThis.myGrid != null)
            myThis.myGrid.removeClass("hasValue");
        else*/
            myThis.myList.removeClass("hasValue");

    }

    // lectureSeule
    public setReadonly(value: boolean)
    {
        let myThis: xxRadioButton<T> = this;
        myThis.isReadonly = value;

        myThis.listeClassItem.forEach((item) =>
        {
            if (myThis.isReadonly)
                item.desactiver();
            else
                item.activer();
        });
    }

    public setVisibility(s: enumVisibility)
    {
        let myThis: xxRadioButton<T> = this;
        switch (s)
        {
            case enumVisibility.afficher:
                afficherxElements(/*myThis.myGrid != null ? myThis.myGrid :*/ myThis.myList);
                break;
            case enumVisibility.masquer:
                cacherxElements(/*myThis.myGrid != null ? myThis.myGrid : */myThis.myList, false);
                break;
            case enumVisibility.masquerAvecCollapse:
                cacherxElements(/*myThis.myGrid != null ? myThis.myGrid :*/ myThis.myList, true);
                break;
            default:
                afficherxElements(/*myThis.myGrid != null ? myThis.myGrid :*/ myThis.myList);
        }
    }

    public get value(): T {
        let myThis: xxRadioButton<T> = this;

        return myThis.Value;
    }
}