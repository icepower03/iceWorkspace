// @ts-nocheck
import { iXElement, enumTypeOrientation, enumCouleur, enumPosition } from '../xBase';
import { xOutils } from '../../xOutils';
import { xMaths } from '../../xMaths';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { xDiv } from './xDiv';
import { xxGrid, xxGridItem } from './xxGrid';
import { xxLabel, enumTypeLabel } from './xxLabel';
import { xxBouton, enumTailleBouton } from './xxBouton';
import { xxWrapPanel } from './xxWrapPanel';
import { xxListeDeroulante } from './xxListeDeroulante';
import { xSeparateur } from './xSeparateur';
import { enumIconeP12, enumIconeSvg, IconeP12, IconeMiniP12, IconeSvg, tailleIcone, Icone } from '../xIcones';

interface OptionDatePicker {
    value?: DateSerialisable;
    valueChange?: (val: DateSerialisable) => void;
    choixAnnee?: boolean;
    affichageNumSemaine?: boolean;
    affichageBtnAujourdhui?: boolean;
    affichageBtnAucuneDate?: boolean;
    class?: string;
}

export class xDatePicker implements iXElement {
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
    private Grid: xxGrid;
    private ListeGridItem: xxGridItem[];


    private ListeCodeJour: string[];
    private ListeCodeMois: string[];

    private nbColonne: number;
    private numLastLigneJours: number;
    private CodeMoisChoisi: string;

    private ValuePourChangement: DateSerialisable;

    constructor(option: OptionDatePicker) {
        let myThis: xDatePicker = this;

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
        myThis.ListeCodeJour = ["xxCodeJourLundi", "xxCodeJourMardi", "xxCodeJourMercredi", "xxCodeJourJeudi", "xxCodeJourVendredi", "xxCodeJourSamedi", "xxCodeJourDimanche"];
        myThis.ListeCodeMois = ["xxCodeMoisJanvier", "xxCodeMoisFevrier", "xxCodeMoisMars", "xxCodeMoisAvril", "xxCodeMoisMai", "xxCodeMoisJuin", "xxCodeMoisJuillet", "xxCodeMoisAout", "xxCodeMoisSeptembre", "xxCodeMoisOctobre", "xxCodeMoisNovembre", "xxCodeMoisDecembre"];

        myThis.CreateDatePicker();
    }

    public setValue(date: DateSerialisable) {
        let myThis: xDatePicker = this;
        if (date != null) {
            myThis.ToogleSelectedDefaut = true;
            myThis.Value = DateSerialisable.CopyDateSerialisableSansHeure(date);

            myThis.ValuePourChangement = DateSerialisable.CopyDateSerialisableSansHeure(date) 
        }
        myThis.CreateDatePicker();

    }

    public CreateDatePicker() {
        let myThis: xDatePicker = this;

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

            myThis.Grid = new xxGrid({
                fullWidth: false,
                class: "xDatePicker " + myThis.ClassCss,
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
        let myThis: xDatePicker = this;

        let contenueEntete: xxWrapPanel = new xxWrapPanel({
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
                new xxListeDeroulante({
                    renderSelected: (place, item, openSelect) => {
                        place.append(new xxBouton({
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
                        place.append(new xxBouton({
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
                new xxListeDeroulante({
                    renderSelected: (place, item, openSelect) => {
                        place.append(new xxBouton({
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
                        place.append(new xxBouton({
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
            contenueEntete.append(new xxLabel({
                class: "labelMoisAnnee",
                textVariable: new xLString(myThis.CodeMoisChoisi).text + " " + annee.toString()
            }))
        }

        contenueEntete.append(
            new xxBouton({
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
            new xxBouton({
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


        let entete: xxGridItem = new xxGridItem({
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
        let myThis: xDatePicker = this;

        myThis.ListeCodeJour.forEach((item, index) => {
            let colstart = index + 1

            let codeJour: xxGridItem = new xxGridItem({
                rowStart: 2,
                class: "labelJour",
                colStart: myThis.AfficherNumSemaine ? colstart + 1 : colstart,
                nbCols: 1,
                nbRows: 1,
                content: new xxLabel({
                    textLocalise: item,
                })
            })

            myThis.ListeGridItem.push(codeJour);
            myThis.Grid.append([codeJour]);
        })
    }

    private PlacerJours(dernierJour: DateSerialisable) {
        let myThis: xDatePicker = this;

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
                let gridItem = new xxGridItem({
                    colStart: 1,
                    class: "NumSemaine",
                    rowStart: rowStart,
                    nbCols: 1,
                    nbRows: 1,
                    content: new xxLabel({
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

            let gridItem = new xxGridItem({
                colStart: myThis.AfficherNumSemaine ? colStart + 1 : colStart,
                class: classItem,
                rowStart: rowStart,
                nbCols: 1,
                nbRows: 1,
                content: new xxBouton({
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
        let myThis: xDatePicker = this;

        let tabGridTemp: xxGridItem[] = [];

        let barreSeparation: xxGridItem = new xxGridItem({
            colStart: 1,
            rowStart: myThis.numLastLigneJours + 1,
            nbCols: myThis.nbColonne,
            nbRows: 1,
            content: new xSeparateur({ orientation: enumTypeOrientation.horizontal, margin: { HautEtBas: 4 } })
        })
        tabGridTemp.push(barreSeparation);
        myThis.ListeGridItem.push(barreSeparation);

        let numberDecalage: number = 2;

        if (myThis.AffichageBtnAujourdhui) {
            let btnAujourdhui: xxGridItem = new xxGridItem({
                colStart: 1,
                rowStart: myThis.numLastLigneJours + numberDecalage,
                nbCols: myThis.nbColonne,
                nbRows: 1,
                content: new xxBouton({
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
            let btnAucuneDate: xxGridItem = new xxGridItem({
                colStart: 1,
                rowStart: myThis.numLastLigneJours + numberDecalage,
                nbCols: myThis.nbColonne,
                nbRows: 1,
                content: new xxBouton({
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
        let myThis: xDatePicker = this;
        myThis.Grid.afficher();
    }

    public Cacher() {
        let myThis: xDatePicker = this;
        myThis.Grid.cacher();
    }


    get y() {
        let myThis: xDatePicker = this;
        return myThis.Grid.y;
    }
    public addClass(s: string) {
        return this.Grid.addClass(s);
    }

    public width(parame?: string | number): void | number {
        let myThis: xDatePicker = this;
        return myThis.Grid.width(parame);
    }

    public height(parame?: string): void | number {
        let myThis: xDatePicker = this;
        return myThis.Grid.height(parame);
    }
} 