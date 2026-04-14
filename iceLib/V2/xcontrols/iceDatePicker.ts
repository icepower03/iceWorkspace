import { iXElement, enumTypeOrientation, enumCouleur, enumPosition } from '../iceBase';
import { iceOutils } from '../../iceOutils';
import { iceMaths } from '../iceMaths';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { iceDiv } from './iceDiv';
import { ice2Grid, ice2GridItem } from './ice2Grid';
import { ice2Label, enumTypeLabel } from './ice2Label';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2ListeDeroulante } from './ice2ListeDeroulante';
import { iceSeparateur } from './iceSeparateur';
import { enumIconeP12, enumIconeSvg, IconeP12, IconeMiniP12, IconeSvg, tailleIcone, Icone } from '../iceIcones';
import { iceLString } from '../iceLString';

interface OptionDatePicker {
    value?: DateSerialisable;
    valueChange?: (val: DateSerialisable) => void;
    choixAnnee?: boolean;
    affichageNumSemaine?: boolean;
    affichageBtnAujourdhui?: boolean;
    affichageBtnAucuneDate?: boolean;
    class?: string;
}

export class iceDatePicker implements iXElement {
    // Attributs class
    private Value: DateSerialisable;
    private premiereValeur: DateSerialisable;
    private ValueChange: (val: DateSerialisable) => void;
    private ChoixAnnee: boolean;
    private AfficherNumSemaine: boolean;
    private AffichageBtnAujourdhui: boolean;
    private affichageBtnAucuneDate: boolean;
    private ToogleSelectedDefaut: boolean;
    private ClassCss: string;

    // Composant graphique
    private Grid: ice2Grid;
    private ListeGridItem: ice2GridItem[];


    private ListeCodeJour: string[];
    private ListeCodeMois: string[];

    private nbColonne: number;
    private numLastLigneJours: number;
    private CodeMoisChoisi: string;

    private ValuePourChangement: DateSerialisable;

    constructor(option: OptionDatePicker) {
        let myThis: iceDatePicker = this;

        // Options constructeur
        myThis.Value = option.value;
        myThis.ValueChange = option.valueChange;
        myThis.ChoixAnnee = option.choixAnnee;
        myThis.AfficherNumSemaine = option.affichageNumSemaine;
        myThis.AffichageBtnAujourdhui = option.affichageBtnAujourdhui;
        myThis.affichageBtnAucuneDate = option.affichageBtnAucuneDate;
        myThis.ClassCss = option.class;
        myThis.ToogleSelectedDefaut = false;
        if (option.value != undefined)
            myThis.ToogleSelectedDefaut = true;


        if (myThis.Value == undefined)
            myThis.Value = DateSerialisable.Now();
        if (myThis.ValueChange == undefined)
            myThis.ValueChange = (val: DateSerialisable) => { };
        if (myThis.ChoixAnnee == undefined)
            myThis.ChoixAnnee = false;
        if (myThis.AfficherNumSemaine == undefined)
            myThis.AfficherNumSemaine = false;
        if (myThis.AffichageBtnAujourdhui == undefined)
            myThis.AffichageBtnAujourdhui = false;
        if (myThis.affichageBtnAucuneDate == undefined)
            myThis.affichageBtnAucuneDate = false;
        if (myThis.ClassCss == undefined)
            myThis.ClassCss = "";

        myThis.ValuePourChangement = DateSerialisable.CopyDateSerialisableSansHeure(myThis.Value);
        
        myThis.premiereValeur = DateSerialisable.CopyDateSerialisableSansHeure(myThis.Value)

        // Initialisation des varriable du composant
        myThis.ListeGridItem = [];
        myThis.ListeCodeJour = ["ice2CodeJourLundi", "ice2CodeJourMardi", "ice2CodeJourMercredi", "ice2CodeJourJeudi", "ice2CodeJourVendredi", "ice2CodeJourSamedi", "ice2CodeJourDimanche"];
        myThis.ListeCodeMois = ["ice2CodeMoisJanvier", "ice2CodeMoisFevrier", "ice2CodeMoisMars", "ice2CodeMoisAvril", "ice2CodeMoisMai", "ice2CodeMoisJuin", "ice2CodeMoisJuillet", "ice2CodeMoisAout", "ice2CodeMoisSeptembre", "ice2CodeMoisOctobre", "ice2CodeMoisNovembre", "ice2CodeMoisDecembre"];

        myThis.CreateDatePicker();
    }

    public setValue(date: DateSerialisable) {
        let myThis: iceDatePicker = this;
        if (date != null) {
            myThis.ToogleSelectedDefaut = true;
            myThis.Value = DateSerialisable.CopyDateSerialisableSansHeure(date);

            myThis.ValuePourChangement = DateSerialisable.CopyDateSerialisableSansHeure(date) 
        }
        myThis.CreateDatePicker();

    }

    public CreateDatePicker() {
        let myThis: iceDatePicker = this;

        myThis.nbColonne = myThis.AfficherNumSemaine ? 8 : 7;

        let premierJour = DateSerialisable.getPremierJourDuMois(myThis.ValuePourChangement);
        let dernierJour = DateSerialisable.getDernierJourMois(myThis.ValuePourChangement);

        let colonnes: string[] = [];

        for (let i = 0; i < myThis.nbColonne; i++) {
            if (myThis.AfficherNumSemaine && i == 0)
                colonnes.push("1fr");
            else
                colonnes.push("1fr");
        }

        if (myThis.Grid == undefined) {

            myThis.Grid = new ice2Grid({
                fullWidth: false,
                class: "iceDatePicker " + myThis.ClassCss,
                colonnes: colonnes,
                gridGap: "1px",
            });
        } else {
            myThis.Grid.vider();
            myThis.ListeGridItem = [];
        }

        myThis.createEnteteGrid(DateSerialisable.getAnnees(premierJour), DateSerialisable.getMois(premierJour));

        myThis.createLibelleJours();
        myThis.PlacerJours(dernierJour);

        if (myThis.AffichageBtnAujourdhui || myThis.affichageBtnAucuneDate)
            myThis.Btnfooter();
    }

    private createEnteteGrid(annee: number, indexMois: number) {
        let myThis: iceDatePicker = this;

        let contenueEntete: ice2WrapPanel = new ice2WrapPanel({
            class: "enTeteDatePicker",
            initContent: [],
            pleineLargeur: true,
        });

        let listeAnnee: number[] = [];

        // let datePourAnnee = new Date();
        let datePourAnnee = DateSerialisable.Now();

        for (let i = DateSerialisable.getAnnees(datePourAnnee) - 10; i <= DateSerialisable.getAnnees(datePourAnnee) + 10; i++) { // for (let i = DateSerialisable.getAnnees(datePourAnnee) datePourAnnee.getFullYear() - 10; i <= datePourAnnee.getFullYear() + 10; i++) {
            listeAnnee.push(i);
        }

        myThis.CodeMoisChoisi = myThis.ListeCodeMois[indexMois];

        if (myThis.ChoixAnnee) {
            contenueEntete.append(
                new ice2ListeDeroulante({
                    renderSelected: (place, item, openSelect) => {
                        place.append(new ice2Bouton({
                            textLocalise: item,
                            optionsAffichage: {
                                margin: { Tous: 0 },
                                positionIconeBouton: enumPosition.Right,
                                tailleBouton: enumTailleBouton.XS
                            },
                            titleLocalise: "Changer de mois",
                            icone: new IconeSvg(enumIconeSvg.chevron_bas, { taille: tailleIcone.XS, couleurSvg: { couleurIconeComplete: enumCouleur.zeus_grisfonce } }),
                            click: cb => {
                                openSelect(item);
                                cb();
                            }
                        }))
                    },
                    renderSelectItem: (place, item, selecteur) => {
                        place.append(new ice2Bouton({
                            textLocalise: item,
                            titleLocalise: "Choisir ce mois",
                            click: cb => {
                                selecteur(item);
                            }
                        }))
                    },
                    selected: valeur => {
                        let mois = myThis.ListeCodeMois.indexOf(valeur);

                        let olddate = myThis.ValuePourChangement;
                        myThis.ValuePourChangement = DateSerialisable.FactoryByNumber(DateSerialisable.getAnnees(olddate), mois, DateSerialisable.getJours(olddate)) // new Date(olddate.getFullYear(), mois, olddate.getDate())
                        myThis.CreateDatePicker();
                    },
                    donnees: myThis.ListeCodeMois,
                    defaultValue: myThis.CodeMoisChoisi
                })
            ).append(
                new ice2ListeDeroulante({
                    renderSelected: (place, item, openSelect) => {
                        place.append(new ice2Bouton({
                            textVariable: item.toString(),
                            titleLocalise: "Changer d'année",
                            optionsAffichage: {
                                margin: { Tous: 0 },
                                positionIconeBouton: enumPosition.Right,
                                tailleBouton: enumTailleBouton.XS
                            },
                            icone: new IconeSvg(enumIconeSvg.chevron_bas, { taille: tailleIcone.XS, couleurSvg: { couleurIconeComplete: enumCouleur.zeus_grisfonce } }),
                            click: cb => {
                                openSelect(item);
                                cb();
                            }
                        }))
                    },
                    renderSelectItem: (place, item, selecteur) => {
                        place.append(new ice2Bouton({
                            textVariable: item.toString(),
                            titleLocalise: "Choisir cette année",
                            click: cb => {
                                selecteur(item);
                            }
                        }))
                    },
                    selected: valeur => {

                        let olddate = myThis.ValuePourChangement;
                        myThis.ValuePourChangement = DateSerialisable.FactoryByNumber(valeur, DateSerialisable.getMois(olddate), DateSerialisable.getJours(olddate));  // new Date(valeur, olddate.getMonth(), olddate.getDate())
                        myThis.CreateDatePicker();
                    },
                    donnees: listeAnnee,
                    defaultValue: annee
                })
            )
        } else {
            contenueEntete.append(new ice2Label({
                class: "labelMoisAnnee",
                textVariable: new iceLString(myThis.CodeMoisChoisi).text + " " + annee.toString()
            }))
        }

        contenueEntete.append(
            new ice2Bouton({
                titleLocalise: "Mois précédent",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit, margin: { Tous: 2 }
                },
                icone: new IconeMiniP12(enumIconeP12.fleche_blanche_gauche, { taille: tailleIcone.XS }),
                click: cb => {
                    let olddate = myThis.ValuePourChangement;
                    myThis.ValuePourChangement = DateSerialisable.FactoryByNumber(DateSerialisable.getAnnees(olddate), DateSerialisable.getMois(olddate) - 1, DateSerialisable.getJours(olddate)); // new Date(olddate.getFullYear(), olddate.getMonth() - 1, olddate.getDate())
                    myThis.CreateDatePicker();
                }
            })
        ).append(
            new ice2Bouton({
                titleLocalise: "Mois suivant",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit, margin: { Tous: 2 }
                },
                icone: new IconeMiniP12(enumIconeP12.fleche_blanche_droite, { taille: tailleIcone.XS }),
                click: cb => {
                    let olddate = myThis.ValuePourChangement;
                    myThis.ValuePourChangement = DateSerialisable.FactoryByNumber(DateSerialisable.getAnnees(olddate), DateSerialisable.getMois(olddate) + 1, DateSerialisable.getJours(olddate));//new Date(olddate.getFullYear(), olddate.getMonth() + 1, olddate.getDate())
                    myThis.CreateDatePicker();
                }
            })
        )


        let entete: ice2GridItem = new ice2GridItem({
            colStart: 1,
            nbCols: myThis.nbColonne,
            rowStart: 1,
            nbRows: 1,
            content: contenueEntete
        })

        myThis.ListeGridItem.push(entete);
        myThis.Grid.append([entete]);
    }

    private createLibelleJours() {
        let myThis: iceDatePicker = this;

        myThis.ListeCodeJour.forEach((item, index) => {
            let colstart = index + 1

            let codeJour: ice2GridItem = new ice2GridItem({
                rowStart: 2,
                class: "labelJour",
                colStart: myThis.AfficherNumSemaine ? colstart + 1 : colstart,
                nbCols: 1,
                nbRows: 1,
                content: new ice2Label({
                    textLocalise: item,
                })
            })

            myThis.ListeGridItem.push(codeJour);
            myThis.Grid.append([codeJour]);
        })
    }

    private PlacerJours(dernierJour: DateSerialisable) {
        let myThis: iceDatePicker = this;

        let rowStart = 3;
        let oldRowsStart = 0;


        for (let i = 1; i <= DateSerialisable.getJours(dernierJour); i++) {
            let dateJ = DateSerialisable.FactoryByNumber(DateSerialisable.getAnnees(dernierJour), DateSerialisable.getMois(dernierJour), i);
            //let dateJ = new Date(dernierJour.getFullYear(), dernierJour.getMonth(), i);

            //let colStart = dateJ.getDay();
            //if (colStart == 0) {
            //    colStart = 7
            //}
            let colStart = DateSerialisable.getIndexJourSemaine(dateJ)

            if (myThis.AfficherNumSemaine && oldRowsStart != rowStart) {
                let gridItem = new ice2GridItem({
                    colStart: 1,
                    class: "NumSemaine",
                    rowStart: rowStart,
                    nbCols: 1,
                    nbRows: 1,
                    content: new ice2Label({
                        textVariable: DateSerialisable.getWeek(dateJ).toString(),
                        type: enumTypeLabel.description,
                        optionsAffichage: {
                            margin: { GaucheEtDroite: 2 },
                        }
                    })
                })

                myThis.ListeGridItem.push(gridItem);
                myThis.Grid.append([gridItem]);
            }

            let classItem = "BtnJours";

            //if (myThis.Value != null && (myThis.Value.getFullYear() == dateJ.getFullYear()) && (myThis.Value.getMonth() == dateJ.getMonth()) && (myThis.Value.getDate() == dateJ.getDate())) {
            if (myThis.Value != null && (DateSerialisable.getAnnees(myThis.Value) == DateSerialisable.getAnnees(dateJ)) && (DateSerialisable.getMois(myThis.Value) == DateSerialisable.getMois(dateJ)) && (DateSerialisable.getJours(myThis.Value) == DateSerialisable.getJours(dateJ))) {
                if (myThis.ToogleSelectedDefaut) {
                    classItem += " Selected";
                }

            }

            if (myThis.premiereValeur.valueOf() == dateJ.valueOf())
                classItem += " Defaut";

            let gridItem = new ice2GridItem({
                colStart: myThis.AfficherNumSemaine ? colStart + 1 : colStart,
                class: classItem,
                rowStart: rowStart,
                nbCols: 1,
                nbRows: 1,
                content: new ice2Bouton({
                    textVariable: i.toString(),
                    titleLocalise: 'choisir cette date',
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.XS,
                        margin: { Tous: 0 },
                        padding: { Tous: 0 },
                    },
                    click: cb => {
                        myThis.Value = dateJ;
                        myThis.ValueChange(dateJ);
                        myThis.ListeGridItem.forEach(item => { item.removeClass("Selected"); })
                        gridItem.addClass("Selected");
                        myThis.ToogleSelectedDefaut = true;
                        cb();
                    }
                })
            })

            myThis.ListeGridItem.push(gridItem);
            myThis.Grid.append([gridItem]);

            myThis.numLastLigneJours = rowStart;
            oldRowsStart = rowStart;

            if (colStart == 7) {
                rowStart++;
            }
        }

    }

    private Btnfooter() {
        let myThis: iceDatePicker = this;

        let tabGridTemp: ice2GridItem[] = [];

        let barreSeparation: ice2GridItem = new ice2GridItem({
            colStart: 1,
            rowStart: myThis.numLastLigneJours + 1,
            nbCols: myThis.nbColonne,
            nbRows: 1,
            content: new iceSeparateur({ orientation: enumTypeOrientation.horizontal, margin: { HautEtBas: 4 } })
        })
        tabGridTemp.push(barreSeparation);
        myThis.ListeGridItem.push(barreSeparation);

        let numberDecalage: number = 2;

        if (myThis.AffichageBtnAujourdhui) {
            let btnAujourdhui: ice2GridItem = new ice2GridItem({
                colStart: 1,
                rowStart: myThis.numLastLigneJours + numberDecalage,
                nbCols: myThis.nbColonne,
                nbRows: 1,
                content: new ice2Bouton({
                    textLocalise: "Aujourd'hui",
                    titleLocalise: "Date du jour",
                    class: "Btnfooter",
                    optionsAffichage: {
                        margin: { Tous: 0 },
                    },
                    click: cb => {
                        cb()
                        myThis.ToogleSelectedDefaut = true;
                        myThis.Value = DateSerialisable.Now();
                        myThis.ValuePourChangement = DateSerialisable.Now();
                        myThis.ValueChange(myThis.Value);
                        myThis.CreateDatePicker();
                    }
                })
            });
            numberDecalage++;
            tabGridTemp.push(btnAujourdhui);
            myThis.ListeGridItem.push(btnAujourdhui);
        }

        if (myThis.affichageBtnAucuneDate) {
            let btnAucuneDate: ice2GridItem = new ice2GridItem({
                colStart: 1,
                rowStart: myThis.numLastLigneJours + numberDecalage,
                nbCols: myThis.nbColonne,
                nbRows: 1,
                content: new ice2Bouton({
                    textLocalise: "Aucune Date",
                    titleLocalise: "Selectionné aucune date",
                    class: "Btnfooter",
                    optionsAffichage: {
                        margin: { Tous: 0 }
                    },
                    click: cb => {
                        cb()
                        myThis.Value = null;
                        myThis.ValuePourChangement = DateSerialisable.Now();
                        myThis.ValueChange(myThis.Value);
                        myThis.CreateDatePicker();
                    }
                })
            });
            numberDecalage++;
            tabGridTemp.push(btnAucuneDate);
            myThis.ListeGridItem.push(btnAucuneDate);
        }

        myThis.Grid.append(tabGridTemp);
    }

    public Afficher() {
        let myThis: iceDatePicker = this;
        myThis.Grid.afficher();
    }

    public Cacher() {
        let myThis: iceDatePicker = this;
        myThis.Grid.cacher();
    }


    get y() {
        let myThis: iceDatePicker = this;
        return myThis.Grid.y;
    }
    public addClass(s: string) {
        return this.Grid.addClass(s);
    }

    public width(parame?: string | number): void | number {
        let myThis: iceDatePicker = this;
        return myThis.Grid.width(parame);
    }

    public height(parame?: string): void | number {
        let myThis: iceDatePicker = this;
        return myThis.Grid.height(parame);
    }
} 