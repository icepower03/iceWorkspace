import { iXElement, iXElementHolder, enumCouleur, enumPosition } from '../iceBase';
import { BindableObject } from './BindableObject';
import { ObservableCollection } from './ObservableCollection';
import { iceDiv } from './iceDiv';
import { ice2ListWrapper } from './ice2ListWrapper';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';
import { ice2Grid, ice2GridItem } from './ice2Grid';
import { ice2WrapPanel, enumAlignementVerticalWrapPanel } from './ice2WrapPanel';
import { ice2StackPanel } from './ice2StackPanel';
import { ice2Label, enumTypeLabel } from './ice2Label';
import { ice2ListeDeroulante } from './ice2ListeDeroulante';
import { enumIconeP12, enumIconeSvg, IconeP12, IconeSvg, tailleIcone, Icone } from '../iceIcones';
import { iceLString } from '../iceLString';

interface OptionListeSelectionStandardSync<T> {
    ValueChange: (specialite: T[]) => void;
    DonneeSelectionnees: T[];
    DonneeComplete: T[];
    RenderItemListeComplete: (place: iXElementHolder, item: T) => void;
    RenderItemListeSelectionee: (place: iXElementHolder, item: T) => void;
    equals?: (a: T, b: T) => boolean;
    WithOrdre?: boolean;
    CallbackOrdre?: (item: T, ordre: number) => void;
    Class?: string;
    getId?: (item: T) => string;
}

interface OptionListeSelectionContextSync<T>{
    binding: {
        value: ObservableCollection<T>;
    };
    DonneeComplete: T[];
    RenderItemListeComplete: (place: iXElementHolder, item: T) => void;
    RenderItemListeSelectionee: (place: iXElementHolder, item: T) => void;
    equals?: (a: T, b: T) => boolean;
    WithOrdre?: boolean;
    CallbackOrdre?: (item: T, ordre: number) => void;
    Class?: string;
    getId?: (item: T) => string;
}

interface OptionListeSelectionStandardAsync<T> {
    ValueChange: (specialite: T[]) => void;
    DonneeCompleteAsync: Promise<T[]>;
    DonneeSelectionnees: T[];
    DonneeSelectionneesAsync?: (completeListe: T[]) => T[];
    RenderItemListeComplete: (place: iXElementHolder, item: T) => void;
    RenderItemListeSelectionee: (place: iXElementHolder, item: T) => void;
    equals?: (a: T, b: T) => boolean;
    WithOrdre?: boolean;
    CallbackOrdre?: (item: T, ordre: number) => void;
    Class?: string;
    getId?: (item: T) => string;
}

interface OptionListeSelectionContextAsync<T>
{
    binding: {
        value: ObservableCollection<T>;
    };
    DonneeCompleteAsync: Promise<T[]>;
    RenderItemListeComplete: (place: iXElementHolder, item: T) => void;
    RenderItemListeSelectionee: (place: iXElementHolder, item: T) => void;
    WithOrdre?: boolean;
    equals?: (a: T, b: T) => boolean;
    CallbackOrdre?: (item: T, ordre: number) => void;
    Class?: string;
    getId?: (item: T) => string;
}

type OptionListeSelectionStandard<T> = OptionListeSelectionStandardSync<T> | OptionListeSelectionStandardAsync<T>;

type OptionListeSelectionContext<T> = OptionListeSelectionContextSync<T> | OptionListeSelectionContextAsync<T>;

type OptionListeSelection<T> = OptionListeSelectionStandard<T> | OptionListeSelectionContext<T>;

export class ice2ListeSelection<T> implements iXElement {

 
    get y() {
        let myThis: ice2ListeSelection<T> = this;
        return myThis.divPrincipale.y;
    }
    // ---- attributs ---- //

    private divPrincipale: iceDiv;
    private Class: string;
    private bouton_ajout_specialite: ice2Bouton;
    private headerListeComplete: iceDiv;
    private headerListeSelectionee: iceDiv;
    private getId: (item: T) => string;

    private listeSelections: ice2ListWrapper<T> = null;

    // Données des listes
    private ListeComplete: T[];
    private ListeSelectionee: T[];

    // Données des listes affichées
    private DonneeSelectionnee: ObservableCollection<T>;
    private DonneeComplete: ObservableCollection<T>;
    private DonneeCompleteAsync: Promise<T[]>;

    private avecOrdre: boolean;

    // Liste des Checkbox
    private cochageListeComplete: { item: T, check:BindableObject<boolean>}[];
    private cochageListeSelectionnee: { item: T, check: BindableObject<boolean>}[];

    private equals: (a: T, b: T) => boolean;

    get DonneeCompleteLoaded(): Promise<T[]>
    {
        let myThis: ice2ListeSelection<T> = this;
        return myThis.DonneeCompleteAsync;
    }

    // ---- Constructeur ---- //
    constructor(option: OptionListeSelection<T>) {
        let myThis: ice2ListeSelection<T> = this;

        myThis.Class = "ice2ListeSelection ";

        if (option.Class != null)
            myThis.Class += option.Class;

        if (option.WithOrdre != undefined)
            myThis.avecOrdre = option.WithOrdre;
        else
            myThis.avecOrdre = false;

        if (myThis.IsOptionContextAsync(option))
            myThis.DonneeCompleteAsync = option.DonneeCompleteAsync;

        myThis.getId = option.getId;
         
        // Equal function
        if (option.equals != undefined) {
            myThis.equals = function (a: T, b: T) {

                if (a == null && b == null) { return true; }
                if (a == null || b == null) { return false; }

                return option.equals(a, b);
            }
        }
        else {
            myThis.equals = function (a: T, b: T) { return a == b; }
        }

        myThis.divPrincipale = new iceDiv({
            class: myThis.Class
        })

        // Init Xelement
        let wrap_globale: ice2WrapPanel = new ice2WrapPanel({
            class: "WrapGlobal",
            retourALaLigne: false,
            espaceMinimaliste: true,
            alignementVertical: enumAlignementVerticalWrapPanel.haut
        });

        let stackPanelGauche: ice2StackPanel = new ice2StackPanel({});
        let stackPanelDroite: ice2StackPanel = new ice2StackPanel({});

        myThis.headerListeComplete = new iceDiv({ class: "DivHeaderComplete"});
        myThis.headerListeSelectionee = new iceDiv({ class: "DivHeaderSelectionee"});

        stackPanelGauche.append(myThis.headerListeComplete, "HeaderListe");
        stackPanelDroite.append(myThis.headerListeSelectionee), "HeaderListe";

        wrap_globale.append(stackPanelGauche, "WPIContenuGauche").append(stackPanelDroite, "WPIContenuDroite");
        myThis.divPrincipale.asHolder.append(wrap_globale);

        // Permet de charger les données Complete de façon async ou pas
        myThis.InitCollection(option).then(() =>
        {
            // ------------------
            //  Liste Dispo (Gauche)

            // header
            let LabelDispo: ice2Label = new ice2Label({
                type: enumTypeLabel.description,
                textVariable: new iceLString("Eléments disponibles").text + " (" + myThis.DonneeComplete.Length + ")"
            });

            let FuncMajLabelDispo = () => LabelDispo.changerTextVariable(new iceLString("Eléments disponibles").text + " (" + myThis.DonneeComplete.Length + ")");
            myThis.DonneeComplete.bind(FuncMajLabelDispo, FuncMajLabelDispo);

            let wpTitre: ice2WrapPanel = new ice2WrapPanel({
                class: "titreElementDispos",
                retourALaLigne:false,
                initContent: [LabelDispo]
            });

            stackPanelGauche.append(wpTitre, "SelectionListe");

            // Liste
            let liste_complete: ice2ListWrapper<T> = new ice2ListWrapper({
                donnees: [],
                dataContext: myThis.DonneeComplete,
                renderItem: (place, item) =>
                {
                    let wrap_contenue_complet: ice2WrapPanel = new ice2WrapPanel({ class: "ContenuLigne", espaceMinimaliste: true, retourALaLigne: false });

                    let div_contenue_renderItem = new iceDiv({});

                    myThis.bouton_ajout_specialite = new ice2Bouton({
                        optionsAffichage: { tailleBouton:enumTailleBouton.Fit},
                        icone: new IconeP12(enumIconeP12.fleche_bleue_droite, {taille: tailleIcone.XS}),
                        titleLocalise: "Ajouter",
                        id: (myThis.getId != null ? "ice2ListeSelection_item_add_" + myThis.getId(item) : null),
                        class: "btn_ajout",
                        click: cb =>
                        {
                            myThis.DonneeSelectionnee.add([item]);
                            myThis.ListeSelectionee.push(item);
                            myThis.refreshDomSelectionnees();
                            cb();
                        }
                    })
                    wrap_contenue_complet.append(div_contenue_renderItem, "zoneTexte");

                    option.RenderItemListeComplete(div_contenue_renderItem.asHolder, item);

                    wrap_contenue_complet.append(myThis.bouton_ajout_specialite, "WPIBtnLigne");

                    place.append(wrap_contenue_complet);

                },
                equals: myThis.equals
            });

            stackPanelGauche.append(liste_complete, "Liste");

            // ------------------
            // Liste Select (Droite)

            // header
            let LabelSelect: ice2Label = new ice2Label({
                type: enumTypeLabel.description,
                textVariable: new iceLString("Eléments sélectionnés").text + " (" + myThis.DonneeSelectionnee.Length + ")",
            });

            let FuncMajLabelSelect: () => void = () => LabelSelect.changerTextVariable(new iceLString("Eléments sélectionnés").text + " (" + myThis.DonneeSelectionnee.Length + ")");

            let FuncMajLabelSelectAdd: (items: T[]) => void = (items: T[]) =>
            {
                myThis.DonneeComplete.del(items);
                FuncMajLabelSelect();
                if (!myThis.IsOptionContext(option) || myThis.IsOptionContextStandardAsync(option))
                    option.ValueChange(myThis.DonneeSelectionnee.All());
            }

            let FuncMajLabelSelectDel: (items: T[]) => void = (items: T[]) =>
            {
                myThis.DonneeComplete.add(items);
                FuncMajLabelSelect();
                if (!myThis.IsOptionContext(option) || myThis.IsOptionContextStandardAsync(option))
                    option.ValueChange(myThis.DonneeSelectionnee.All());
            }

            myThis.DonneeSelectionnee.bind(FuncMajLabelSelectAdd, FuncMajLabelSelectDel);

            let wpTitreSelect: ice2WrapPanel = new ice2WrapPanel({
                class: "titreElementSelects",
                retourALaLigne:false,
                initContent: [LabelSelect]
            });
            stackPanelDroite.append(wpTitreSelect, "SelectionListe");

            // Liste
            myThis.listeSelections = new ice2ListWrapper({
                donnees: [],
                dataContext: myThis.DonneeSelectionnee,
                limite: false,
                renderItem: (place, item) =>
                {
                    let wrap_contenue_selectionee: ice2WrapPanel = new ice2WrapPanel({ class: "ContenuLigne", retourALaLigne:false, espaceMinimaliste:true, });
                    let div_contenu_render_item = new iceDiv({ class:"ligneChoisieDiv"});

                    let bouton_retirer_specialite: ice2Bouton = new ice2Bouton({
                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                        icone: new IconeP12(enumIconeP12.fleche_bleue_gauche, { taille: tailleIcone.XS }),
                        titleLocalise: "Retirer",
                        id: (myThis.getId != null ? "ice2ListeSelection_item_Remove_" + myThis.getId(item) : null),
                        class: "btn_supp",
                        click: cb =>
                        {
                            myThis.DonneeSelectionnee.del([item]);
                            myThis.ListeSelectionee.splice(myThis.ListeSelectionee.indexOf(item), 1);
                            myThis.refreshDomSelectionnees();
                            cb();
                        }
                    });

                    wrap_contenue_selectionee.append(bouton_retirer_specialite, "WPIBtnLigne");
                    wrap_contenue_selectionee.append(div_contenu_render_item);
                    option.RenderItemListeSelectionee(div_contenu_render_item.asHolder, item)

                    if (myThis.avecOrdre) {
                        let listeOrdres = new ice2ListeDeroulante<number>({
                            donnees: Array.from(Array(myThis.DonneeSelectionnee.Length).keys()),
                            defaultValue: myThis.DonneeSelectionnee.All().indexOf(item),
                            renderSelected: (place, ordre, openIt) => {
                                place.append(new ice2Bouton({
                                    textVariable: (ordre + 1).toString(),
                                    titleLocalise: "Changer d'ordre",
                                    click: (cb) =>
                                    {
                                        openIt(ordre);
                                        cb();
                                    },
                                    icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.zeus_grisfonce } }),
                                    optionsAffichage: { tailleBouton: enumTailleBouton.XS, positionIconeBouton: enumPosition.Right },
                                }));
                            },
                            renderSelectItem: (place, ordre, selecteur) => {
                                place.append(new ice2Bouton({
                                    textVariable: (ordre + 1).toString(),
                                    titleLocalise: 'Choisir cet ordre',
                                    optionsAffichage: { tailleBouton: enumTailleBouton.XS },
                                    click: (cb) =>
                                    {
                                        cb();
                                        selecteur(ordre);
                                        if (option.CallbackOrdre != null)
                                            option.CallbackOrdre(item, ordre);
                                    }
                                }));
                            },
                            selected: selected => {
                                myThis.ListeSelectionee.splice(myThis.DonneeSelectionnee.All().indexOf(item), 1);
                                myThis.ListeSelectionee.splice(selected, 0, item);
                                myThis.refreshDonneesSelectionnees();
                            }
                        });

                        let btnOrdreSup = new ice2Bouton({
                            optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                            titleLocalise: "Définir une position supérieure",
                            icone: new IconeP12(enumIconeP12.fleche_noire_haut, { taille:tailleIcone.XS }),
                            click: () => {
                                let indexItem: number = myThis.DonneeSelectionnee.All().indexOf(item);

                                myThis.ListeSelectionee.splice(indexItem, 1);
                                myThis.ListeSelectionee.splice(indexItem - 1, 0, item);
                                if (option.CallbackOrdre != null)
                                    option.CallbackOrdre(item, indexItem - 1);
                                myThis.refreshDonneesSelectionnees();
                            }
                        });

                        let btnOrdreInf = new ice2Bouton({
                            optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                            titleLocalise: "Définir une position inférieure",
                            icone: new IconeP12(enumIconeP12.fleche_noire_bas, { taille: tailleIcone.XS }),
                            click: () => {
                                let indexItem: number = myThis.DonneeSelectionnee.All().indexOf(item);

                                myThis.ListeSelectionee.splice(indexItem, 1);
                                myThis.ListeSelectionee.splice(indexItem + 1, 0, item);
                                if (option.CallbackOrdre != null)
                                    option.CallbackOrdre(item, indexItem + 1);
                                myThis.refreshDonneesSelectionnees();
                            }
                        });

                        let stackBtnsOrdre = new ice2StackPanel({
                            espaceMinimaliste: true,
                            initContent: [btnOrdreSup, btnOrdreInf],
                        });

                        wrap_contenue_selectionee
                            .append(listeOrdres)
                            .append(stackBtnsOrdre)
                    }

                    place.append(wrap_contenue_selectionee);
                },
                equals: myThis.equals
            });
            stackPanelDroite.append(myThis.listeSelections, "Liste");

        });
    }

    // ---- Methodes ---- //


    public FiltreListeComplete(filtre: (valeur: T) => boolean ) {
        let myThis: ice2ListeSelection<T> = this;
        let donnerFiltre: T[] = [];

        myThis.ListeComplete.forEach(c => {
            if (filtre(c) && !myThis.isSelection(c))
                donnerFiltre.push(c);
        })

        myThis.DonneeComplete.vider();
        myThis.DonneeComplete.add(donnerFiltre);
    }

    public FiltreListeSelectionne(filtre: (valeur: T) => boolean) {
        let myThis: ice2ListeSelection<T> = this;
        let donnerFiltre: T[] = [];

        myThis.ListeSelectionee.forEach(c =>
        {
            if (filtre(c))
                donnerFiltre.push(c);
        });

        myThis.DonneeSelectionnee.vider();
        myThis.DonneeSelectionnee.add(donnerFiltre);
    }

    public appendToHeaderListeComplete(element: iXElement) {
        let myThis: ice2ListeSelection<T> = this;

        myThis.headerListeComplete.asHolder.append(element);
    }

    public appendToHeaderListeSelectionne(element: iXElement) {
        let myThis: ice2ListeSelection<T> = this;

        myThis.headerListeSelectionee.asHolder.append(element);
    }

    private InitCollection(option: OptionListeSelection<T>): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            let myThis: ice2ListeSelection<T> = this;
            if (!myThis.IsOptionContext(option))
            {
                myThis.DonneeSelectionnee = new ObservableCollection<T>(option.DonneeSelectionnees);
            }
            else
            {
                myThis.DonneeSelectionnee = option.binding.value;
            }
            
            if (myThis.IsOptionContextAsync(option))
            {
                option.DonneeCompleteAsync.then((Val) =>
                {
                    if (myThis.IsOptionContextStandardAsync(option))
                    {
                        myThis.ListeSelectionee = option.DonneeSelectionneesAsync(Val);
                        myThis.DonneeSelectionnee = new ObservableCollection<T>(myThis.ListeSelectionee);
                    }
                    else
                        myThis.ListeSelectionee = myThis.DonneeSelectionnee.All();

                    myThis.ListeComplete = Val.filter(c => myThis.DonneeSelectionnee.All().some(itemsel => myThis.equals(itemsel, c)) == false);
                    myThis.DonneeComplete = new ObservableCollection<T>(myThis.ListeComplete);
                    resolve();
                });
            }
            else
            {
                myThis.ListeComplete = option.DonneeComplete.filter(c => myThis.DonneeSelectionnee.All().some(itemsel => myThis.equals(itemsel, c)) == false);
                myThis.ListeSelectionee = myThis.DonneeSelectionnee.All();
                myThis.DonneeComplete = new ObservableCollection<T>(myThis.ListeComplete);
                resolve();
            }
        });
    }

    private IsOptionContext(option: OptionListeSelection<T>): option is OptionListeSelectionContext<T>
    {
        return (option as OptionListeSelectionContext<T>).binding !== undefined;
    }

    private IsOptionContextAsync(option: OptionListeSelection<T>): option is OptionListeSelectionContextAsync<T> | OptionListeSelectionStandardAsync<T>
    {
        return (option as OptionListeSelectionContextAsync<T>|OptionListeSelectionStandardAsync<T>).DonneeCompleteAsync !== undefined;
    }

    private IsOptionContextStandardAsync(option: OptionListeSelection<T>): option is OptionListeSelectionStandardAsync<T> {
        return (option as OptionListeSelectionStandardAsync<T>).DonneeSelectionneesAsync !== undefined;
    }

    //public test(): void {
    //    let myThis: ice2ListeSelection<T> = this;
    //    myThis.bouton_ajout_specialite.TestClick();
    //}

    public isSelection(a: T): boolean {
        let myThis: ice2ListeSelection<T> = this;

        let bool: boolean = false;
        myThis.ListeSelectionee.map(e => bool = bool || myThis.equals(e, a));

        return bool;
    }

    public viderSelection(): void {
        let myThis: ice2ListeSelection<T> = this;
        myThis.ListeSelectionee = [];
        if (myThis.DonneeComplete!=null)
        myThis.DonneeComplete.add(myThis.DonneeSelectionnee.All());
        myThis.DonneeSelectionnee.vider();

    }

    public changerSelection(nouveaux: T[]) {

        let myThis: ice2ListeSelection<T> = this;

        myThis.viderSelection();

        myThis.DonneeSelectionnee.add(nouveaux);
        myThis.DonneeComplete.del(nouveaux);
        myThis.ListeSelectionee = nouveaux;
    }

    public getDonneesSelectionees(): T[]
    {
        let myThis: ice2ListeSelection<T> = this;
        let donnees: T[] = [];
        myThis.DonneeSelectionnee.forEach(element =>
        {
            donnees.push(element);
        });
        return donnees;
    }

    private refreshDonneesSelectionnees(): void
    {
        let myThis: ice2ListeSelection<T> = this;

        myThis.listeSelections.supprimerItemsAll();
        myThis.listeSelections.ajouterItems(myThis.ListeSelectionee);
    }

    private refreshDomSelectionnees()
    {
        let myThis: ice2ListeSelection<T> = this;
        myThis.listeSelections.render();
    }
}