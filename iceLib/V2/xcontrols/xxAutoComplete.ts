// @ts-nocheck
import { iXElement, iXElementHolder, OptionsHtml, enumVisibility, enumCouleur } from '../xBase';
import { BindableObject } from './BindableObject';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { xDiv } from './xDiv';
import { xInputText, enumStyleInput } from './xInput';
import { xInputTextAvecIcone } from './xInputTextAvecIcone';
import { xxBouton, enumTailleBouton } from './xxBouton';
import { xxListeDeroulante } from './xxListeDeroulante';
import { xxToolTip } from './xxToolTip';
import { xxLabel } from './xxLabel';
import { enumIconeSvg, IconeSvg, Icone } from '../xIcones';

interface OptionsAutoCompleteValueCode<T> extends OptionsHtml
{
    listeValeurs: T[];
    getLibelle: (elem: T, datas?: T[]) => string;
    getClass?: (elem: T, datas?: T[]) => string;
    getIdTest?: (elem: T) => string;
    valueChange: (val: T) => void;
    placeholder?: string; // Permet de definir un placeholder
    libelleNullChoice?: string; //definit un libelle pour un element Null(ajouté dans la liste des choix) et afficher en placeholder si il n'est pas deja defini
    value: string;
    getKey: (obj: T) => string;
    typeValue?: T;
    asyncLoading?: () => Promise<T[]>;
    asyncResearch?: (search: string) => Promise<T[]>;
    goasyncResearch?: (search: string) => boolean;
    lectureSeule?: boolean;
    binding: never;
    taille?: enumAutoCompleteTaille;
    renderItemInListe?: (p: iXElementHolder, item: T, selecteur: (a: T) => void) => void; // Pour listeDeroulante
    /** Regroupe les elements (comme un groupBy), sous une seule bannier commune (modifie l'ordre des données) */
    regroupementUniqueBy?: {
        /** Sans c'est options le header sera juste un libelle avec la donnée du GroupBy */
        groupHeaderCustom?: (place: iXElementHolder, listGroup: T[]) => void;
        GroupBy: (a: T) => string | boolean | number | DateSerialisable | Date;
    },
    renderOpen?: (place: iXElementHolder, item: T, open: (item: T) => void) => void;
    champLarge?: boolean;
    iconeInput?: enumIconeSvg;
    couleurIcone?: enumCouleur;
    renderLectureSeule?: (p: iXElementHolder, item: T) => void;
    optionsAffichage?: optionsAffichage;
    largeurEnPixels?: number;
}

interface OptionsAutoCompleteValueObject<T> extends OptionsHtml
{
    listeValeurs: T[];
    getLibelle: (elem: T, datas?: T[]) => string;
    getClass?: (elem: T, datas?: T[]) => string;
    getIdTest?: (elem: T) => string;
    valueChange: (val: T) => void;
    placeholder?: string; // Permet de definir un placeholder
    libelleNullChoice?: string; //definit un libelle pour un element Null(ajouté dans la liste des choix) et afficher en placeholder si il n'est pas deja defini
    value?: string;
    getKey?: (obj: T) => string;
    typeValue?: T;
    asyncLoading?: () => Promise<T[]>;
    asyncResearch?: (search: string) => Promise<T[]>;
    goasyncResearch?: (search: string) => boolean;
    lectureSeule?: boolean;
    binding?: {
        value?: BindableObject<T>;
        visibility?: BindableObject<enumVisibility>;
        lectureSeule?: BindableObject<boolean>;
    }
    taille?: enumAutoCompleteTaille;
    renderItemInListe?: (p: iXElementHolder, item: T, selecteur: (a: T) => void) => void; // Pour listeDeroulante
    /** Regroupe les elements (comme un groupBy), sous une seule bannier commune (modifie l'ordre des données) */
    regroupementUniqueBy?: {
        /** Sans c'est options le header sera juste un libelle avec la donnée du GroupBy */
        groupHeaderCustom?: (place: iXElementHolder, listGroup: T[]) => void;
        GroupBy: (a: T) => string | boolean | number | DateSerialisable | Date;
    }
    renderOpen?: (place: iXElementHolder, item: T, open: (item: T) => void) => void;
    champLarge?: boolean;
    iconeInput?: enumIconeSvg;
    couleurIcone?: enumCouleur;
    renderLectureSeule?: (p: iXElementHolder, item: T) => void;
    optionsAffichage?: optionsAffichage;
    largeurEnPixels?: number;
}

interface ShownItem<T>
{
    cle: string,
    value: T,
    click: () => void,
    toggleSelect: (on: boolean) => void
}

type OptionsAutoComplete<T> = OptionsAutoCompleteValueCode<T> | OptionsAutoCompleteValueObject<T>;
//s = 100px;m=200px;etc.
export enum enumAutoCompleteTaille { s = "s", m = "m", l = "l", xl = "xl" }

export class xxAutoComplete<T> implements iXElement
{

    private listDeroulante: xxListeDeroulante<ShownItem<T>>;
    private elementAutocomplete: iXElement;

    private binding: BindableObject<T>;
    private input: xInputTextAvecIcone;
    private boutonMore: xxBouton;

    private valeurLectureSeule: T = null; //dernière valeure sélectionnée
    private filtre: string = null; //dernier filtre appliqué
    private valEnTempsReel: string = null; //valeur quand on tape

    private readonly NB_AFFICHAGE_LISTE = 20
    private endOfList: number; // Fin de la liste affichée

    // ** Data ** //
    private datas: CleValeur<string, T>[]; // Les datas Completes
    private datasFiltre: CleValeur<string, T>[]; // Les datas Filtrées
    private datasAfficher: ShownItem<T>[]; // Les data Affichées par la recherche ou par le max de 20

    // ** recuperation donnée ** //
    private _asyncLoaded: Promise<T[]>;
    private asyncResearch: (search: string) => Promise<T[]> = null;
    private goasyncResearch?: (search: string) => boolean = null;

    private idTimeOut: number;
    private TIME_FOR_TIMEOUT: number = 350;

    private isListVisible: boolean = false;
    private libelleSiNull: string = "";
    private HaveChoiseNull: boolean = false;
    private curseurBouton: number = -1; //indique l'index du bouton selectionne
    private getLibelle: (elem: T, datas?: T[]) => string;
    private getClass: (elem: T, datas?: T[]) => string;
    private getKey?: (obj: T) => string;
    private getIdTest?: (elem: T) => string;
    private valueChange: (val: T) => void;
    private renderItemInListe?: (p: iXElementHolder, item: T, selecteur: (a: T) => void) => void = null; // Pour listeDeroulante
    private renderOpen: (place: iXElementHolder, item: T, open: (item: T) => void) => void;
    private bindLectureSeule: BindableObject<boolean>;
    private renderLectureSeule: (p: iXElementHolder, item: T) => void;
    private value: string;
    private labelLectureSeule: xxLabel;
    private holderLectureSeule: iXElementHolder;
    private optionsAffichage: optionsAffichage;

    get y()
    {
        let mythis: xxAutoComplete<T> = this;
        if (this.bindLectureSeule.Value)
        {

            if (mythis.renderLectureSeule != undefined)
            {
               mythis.elementAutocomplete = mythis.holderLectureSeule;
            }
            else
            {
                mythis.elementAutocomplete = mythis.labelLectureSeule;
            }
        }
        else
        {
            mythis.elementAutocomplete = mythis.listDeroulante;
        }
        return mythis.elementAutocomplete.y;
    }

    get allDatas(): T[]
    {
        return this.datas.map(d => d.valeur);
    }

    get asyncLoaded(): Promise<T[]>
    {
        return this._asyncLoaded;
    }

    public constructor(options: OptionsAutoComplete<T>)
    {
        let mythis: xxAutoComplete<T> = this;

        // ----- Recuperation des options -----//
        mythis.getKey = options.getKey;
        mythis.getLibelle = options.getLibelle;
        mythis.optionsAffichage = options.optionsAffichage;

        this.renderOpen = options.renderOpen;
        let classe: string = "xxAutoComplete" + (options.class != undefined ? " " + options.class : "");
    
        mythis.getClass = options.getClass != undefined ? options.getClass : () => "";
      
        mythis.getIdTest = options.getIdTest;
        mythis.valueChange = options.valueChange;
        if (options.renderItemInListe != undefined)
            mythis.renderItemInListe = options.renderItemInListe;
        if (options.asyncResearch != undefined)
            mythis.asyncResearch = options.asyncResearch;
        if (options.goasyncResearch != undefined)
            mythis.goasyncResearch = options.goasyncResearch;
        this.bindLectureSeule = new BindableObject<boolean>(false);

        if (options.binding != undefined && options.binding != null)
        {
            if (options.binding.value != undefined)
            {
                mythis.binding = options.binding.value;
                mythis.valueChange = (val: T) => mythis.binding.Value = val;
            }
            if (options.binding.visibility != undefined)
            {
                options.binding.visibility.bind(s =>
                {
                    switch (s)
                    {
                        case enumVisibility.afficher:
                            afficherxElements(mythis.listDeroulante);
                            break;
                        case enumVisibility.masquer:
                            cacherxElements(mythis.listDeroulante, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cacherxElements(mythis.listDeroulante, true);
                            break;
                    }
                });
            }
            if (options.binding.lectureSeule != undefined)
            {
                this.bindLectureSeule = options.binding.lectureSeule;
            }


        }
        else if (options.lectureSeule != null)
            this.bindLectureSeule.Value = options.lectureSeule;



        if (options.libelleNullChoice != undefined)
        {
            mythis.libelleSiNull = options.libelleNullChoice;
            mythis.HaveChoiseNull = true;
        }

        let getIdTemp: (Element: ShownItem<T>) => string;
        if (options.getKey != null)
        {
            getIdTemp = (ElementAvecPleinDeDonnee) =>
            {
                if (ElementAvecPleinDeDonnee.value != null)
                    return options.getKey(ElementAvecPleinDeDonnee.value);
                else
                    return (ElementAvecPleinDeDonnee.cle as any).replaceAll(" ", "_");
            };
        }

        let regroupementUniqueBytemp: any = null;
        if (options.regroupementUniqueBy != null)
        {
            regroupementUniqueBytemp = {};

            regroupementUniqueBytemp.GroupBy = (a: { cle: string, value: T, click: () => void, toggleSelect: (on: boolean) => void }) =>
            {
                if (a.value != null)
                    return options.regroupementUniqueBy.GroupBy(a.value);
                else
                    return null;
            }
            if (options.regroupementUniqueBy.groupHeaderCustom != null)
                regroupementUniqueBytemp.groupHeaderCustom = (place: iXElementHolder, liste: { cle: string, value: T, click: () => void, toggleSelect: (on: boolean) => void }[]) =>
                {
                    return options.regroupementUniqueBy.groupHeaderCustom(place, liste.map(item => item.value));
                }
        }

        let search = (search: string, item: ShownItem<T>, open: (itemSelectionne: ShownItem<T>) => void) =>
        {
            if (open != null)
            {
                open(item);
            }
            mythis.valEnTempsReel = search;

            if (mythis.filtre != mythis.valEnTempsReel.toUpperCase() || search.length == 0)
            {
                clearTimeout(mythis.idTimeOut);
                mythis.idTimeOut = setTimeout(async () =>
                {
                    if (mythis.asyncResearch != null)
                    {
                        if (mythis.goasyncResearch != null)
                        {
                            if (mythis.goasyncResearch(search))
                            {
                                let tmp = await mythis.asyncResearch(search);
                                mythis.removeAllElements();
                                mythis.addElements(tmp);
                            }
                        } else if (search.length > 3)
                        {
                            let tmp = await mythis.asyncResearch(search);
                            mythis.removeAllElements();
                            mythis.addElements(tmp);
                        }
                    } else
                    {
                        mythis.filtrerListe(mythis.valEnTempsReel);
                        mythis.curseurBouton = -1;
                    }
                }, mythis.TIME_FOR_TIMEOUT);
            }
        }
        mythis.renderLectureSeule = options.renderLectureSeule;
        // ----- Generation Composant -----//
        mythis.listDeroulante = new xxListeDeroulante<ShownItem<T>>({
            donnees: [],
            class: classe,
            nonResponsive: true,
            id: options.id,
            getId: getIdTemp,
            regroupementUniqueBy: regroupementUniqueBytemp,
            onShow: () =>
            {
                mythis.curseurBouton = -1;
                mythis.isListVisible = true;
                if (this.searchInList())
                {
                    this.input.focus();
                }
            },
            onClose: () =>
            {
                mythis.curseurBouton = -1;
                mythis.isListVisible = false;
            },
            renderSelected: (place, item, open) =>
            {
                if (this.searchInList())
                {
                    this.renderOpen(place, item == null ? null : item.value,
                        (i: T) =>
                        {
                            open({
                                cle: i == null ? this.libelleSiNull : this.getLibelle(i),
                                value: i,
                                toggleSelect: null,
                                click: null
                            });
                        }
                    );
                } else
                {
                    mythis.input = new xInputTextAvecIcone({
                        icone: (!!options.iconeInput ? options.iconeInput : enumIconeSvg.chevron_bas),
                        champLarge: options.champLarge,
                        couleurIcone: options.couleurIcone,
                        id: 'xxAutoComplete_input',
                        class: 'xxAutoComplete_input' + (options.taille != null ? ' taille_' + options.taille : ""),
                        autoChange: true,
                        placeHolderVariable: (options.placeholder != null && options.placeholder != "") ? options.placeholder : mythis.libelleSiNull,
                        value: item != null && item.value != null ? item.cle : "",
                        ValueChange: async (s: string) => search(s, item, open),
                        click: () =>
                        {
                            open(item);

                        },
                        clicSurIcone: (cb) =>
                        {
                            open(item);
                            cb();
                        },
                        KeyUpAddonCallback: (e: KeyboardEvent) =>
                        {
                            if (e.keyCode == 13)
                            {
                                // entree
                                if (mythis.isListVisible)
                                    mythis.selectedClick();
                                else
                                    mythis.listDeroulante.ouvrirSelection();
                            }
                            else if (e.keyCode == 38)//fleche haut
                            {
                                if (mythis.curseurBouton == -1)
                                    mythis.selectedSet();
                                else
                                    mythis.selectedDeplacer(-1);
                            }
                            else if (e.keyCode == 40)//fleche bas
                            {
                                if (mythis.curseurBouton == -1)
                                    mythis.selectedSet();
                                else
                                    mythis.selectedDeplacer(1);
                            }
                        },
                        largeurEnPixels: options.largeurEnPixels
                    });

                    place.append(mythis.input);
                }
            },
            renderSelectItem: (p, item, select, idElemnt) =>
            {
                if (mythis.renderItemInListe == null)
                {
                    let buttonTemp: xxBouton;
                    if (item.value != null)
                    {
                        let idTest: string = null;
                        if (mythis.getIdTest != undefined)
                            idTest = mythis.getIdTest(item.value);

                        buttonTemp = new xxBouton({
                            id: idElemnt != null && idElemnt != "" ? "xxAutoComplete_bouton_" + idElemnt : null,
                            textVariable: item.cle,
                            titleLocalise:"",
                            class: "xxAutoComplete_bouton " + mythis.getClass(item.value, mythis.allDatas),
                            optionsAffichage: {
                                tailleBouton: enumTailleBouton.XS
                            }, 
                            click: (cb) =>
                            {
                                select(item);
                                mythis.valEnTempsReel = "";
                                cb();
                            }
                        });
                        item.click = () =>
                        {
                            select(item);
                            mythis.valEnTempsReel = "";
                        };
                    }
                    else
                    {
                        buttonTemp = new xxBouton({
                            textVariable: mythis.libelleSiNull,
                            optionsAffichage: {
                                tailleBouton: enumTailleBouton.XS
                            }, 
                            id: idElemnt != null && idElemnt != "" ? "xxAutoComplete_bouton_" + idElemnt : null,
                            class: 'xxAutoComplete_bouton bouton_null',
                            titleLocalise: "choisir cet élément",
                            click: function (cb: Function)
                            {
                                mythis.valEnTempsReel = "";
                                mythis.filtrerListe("");
                                select(item);
                                cb();
                            }
                        });
                        item.click = () =>
                        {
                            mythis.valEnTempsReel = "";
                            mythis.filtrerListe("");
                            select(item);
                        };
                    }

                    item.toggleSelect = (val) =>
                    {
                        if (val)
                            buttonTemp.addClass("selected");
                        else
                            buttonTemp.removeClass("selected");
                    };

                    p.append(buttonTemp);
                }
                else
                {
                    if (item.value == null && mythis.libelleSiNull != null)
                    {
                        p.append(new xxBouton({
                            textVariable: mythis.libelleSiNull,
                            optionsAffichage: {
                                tailleBouton: enumTailleBouton.XS
                            }, 
                            id: idElemnt != null && idElemnt != "" ? "xxAutoComplete_bouton_" + idElemnt : null,
                            class: 'xxAutoComplete_bouton bouton_null',
                            titleLocalise: "choisir cet élément",
                            click: function (cb: Function)
                            {
                                mythis.valEnTempsReel = "";
                                mythis.filtrerListe("");
                                select(item);
                                cb();
                            }
                        }));
                        item.click = () =>
                        {
                            mythis.valEnTempsReel = "";
                            mythis.filtrerListe("");
                            select(item);
                        };
                    }
                    else
                    {
                        mythis.renderItemInListe(p, item.value, (a: T) =>
                        {
                            select(item);
                            mythis.valEnTempsReel = "";
                        });
                    }
                }
            },
            renderHeaderList: this.searchInList() ? (placeHead: iXElementHolder) =>
            {
                placeHead.append(this.input = new xInputTextAvecIcone({
                    icone: enumIconeSvg.recherche,
                    champLarge: true,
                    autoChange: true,
                    ValueChange: (s: string) =>
                    {
                        search(s, null, null);
                    }
                }));
            } : undefined,

            renderEndList: (ici) =>
            {
                mythis.boutonMore = new xxBouton({
                    textLocalise: "Afficher plus d'éléments",
                    titleLocalise: "Afficher plus d'éléments",
                    click: function (cb: Function)
                    {
                        cb();
                        mythis.chargerListe();
                    }
                });
                ici.append(mythis.boutonMore);
                if (mythis.datasFiltre != null && mythis.datasFiltre.length < mythis.NB_AFFICHAGE_LISTE)
                    cacherxElements(mythis.boutonMore, true);
            },
            selected: (item) =>
            {
                mythis.valeurLectureSeule = item.value == null ? null : item.value;
                mythis.valueChange(item.value);
            },
        });


        if (mythis.optionsAffichage != undefined)
        {

            xStyle.AppliquerOptionsAffichage(mythis.listDeroulante, mythis.optionsAffichage);
        }


        mythis.datas = [];
        mythis.value = options.typeValue != undefined ? mythis.getLibelle(options.typeValue) : options.value;
        mythis.labelLectureSeule = new xxLabel({
            textLocalise: mythis.value != null ? mythis.value : "",
            id: options.id,
            class: classe
        });
        mythis.holderLectureSeule = new xDiv({
            id: options.id,
            class: classe
        }).asHolder;
            mythis.getDatas(options);
    }

    private async getDatas(options: OptionsAutoComplete<T>)
    {
        let mythis: xxAutoComplete<T> = this;
        //Si les données sont obtenues via une promesse
        if (options.asyncLoading != undefined)
        {
            if (mythis._asyncLoaded == null)
                mythis._asyncLoaded = options.asyncLoading();
            let datasSansCleValeur = await mythis._asyncLoaded;
            mythis.datas = mythis.GetListeCleValeur(datasSansCleValeur);
            mythis.filtrerListe("");
            mythis.setDefaultValue(options);

        }
        else if (options.listeValeurs != null)
        {
            mythis.datas = mythis.GetListeCleValeur(options.listeValeurs);
            mythis.filtrerListe("");
            mythis.setDefaultValue(options);
        }
        if (mythis._asyncLoaded == null)
            mythis._asyncLoaded = new Promise<T[]>(resolve =>
            {
                resolve([]);
            });

        if (options.lectureSeule)
        {
            if (options.typeValue != undefined)
            {
                mythis.valeurLectureSeule = mythis.datas.find(a => a.cle == (options.typeValue as any))?.valeur;
            }
            else
            {
                if (options.value != undefined)
                {
                    //on cherche l'objet par défaut ) partir de son code
                    if (mythis.getKey != undefined)
                    {
                        mythis.valeurLectureSeule = mythis.datas.find(a => mythis.getKey(a.valeur) == options.value)?.valeur;
                    }
                    else
                    {
                        mythis.valeurLectureSeule = mythis.datas.find(a => a.cle == options.value)?.valeur;
                    }
                }
            }

            if (mythis.renderLectureSeule != undefined)
            {
                mythis.renderLectureSeule(mythis.holderLectureSeule, mythis.valeurLectureSeule);
            }
        }
 
       
    }

    private searchInList(): boolean
    {
        return this.renderOpen != null;
    }

    public setValue(val: string)
    {
        let mythis: xxAutoComplete<T> = this;
        if (!mythis.bindLectureSeule.Value)
        {
            mythis.listDeroulante.asyncLoaded.then((res) =>
            {
                if (mythis.input != undefined)
                    mythis.input.setValue(val);
            });
        }
       
      
    }

    private setDefaultValue(options: OptionsAutoComplete<T>)
    {
        let mythis: xxAutoComplete<T> = this;

        if (options.typeValue != undefined)
        {
            mythis.setValue(mythis.getLibelle(options.typeValue))
        }
        else
        {
            if (options.value != undefined)
            {
                //on cherche l'objet par défaut ) partir de son code
                if (mythis.getKey != undefined)
                {
                    let monTableau = mythis.datas.filter(a => { return mythis.getKey(a.valeur) == options.value; });

                    if (monTableau.length > 0)
                    {
                     
                        mythis.setValue(monTableau[0].cle);
                    }
                }
                else
                {
                    this.setValue(options.value);
                }
            }
        }
    }

    // permet de dire si un code est présent ou non dans la liste (gestion des items inactifs)
    public async CodeEstPresentDansLeDico(code: string): Promise<boolean>
    {
        let myThis: xxAutoComplete<T> = this;

        await (myThis.asyncLoaded);

        let items = myThis.datas.filter(u => myThis.getKey(u.valeur) == code);
        return items.length > 0;

    }


    private GetListeCleValeur(datas: T[]): CleValeur<string, T>[]
    {
        let mythis: xxAutoComplete<T> = this;

        let ListeCleValeur: CleValeur<string, T>[] = [];
        if (datas != undefined)
        {
            datas.forEach(elem =>
                ListeCleValeur.push(
                    {
                        cle: mythis.getLibelle(elem),
                        valeur: elem
                    }));
        }

        return ListeCleValeur;
    }

    // ---- Add ---- //
    public addElements(elems: T[])
    {
        let mythis: xxAutoComplete<T> = this;

        mythis.GetListeCleValeur(elems).forEach(function (elem)
        {
            mythis.datas.push(elem);
        });

        mythis.filtrerListe("");
    }

    public addElement(elem: T)
    {
        let mythis: xxAutoComplete<T> = this;
        mythis.addElements([elem]);
    }

    // ---- Gestion des element de la liste ---- // 
    private filtrerListe(newFiltre: string)
    {
        let mythis: xxAutoComplete<T> = this;

        newFiltre = newFiltre.toUpperCase();
        //newFiltre == "" est seulement utilisé dans le cas d'un chargement des données différé.
        //c'est le seul moyen de rafraichir le contenu de l'affichage.
        if (newFiltre != mythis.filtre || newFiltre == "")
        {
            mythis.listDeroulante.supprimerDataAll();

            let newListfiltre: CleValeur<string, T>[] = [];
            let dataAfiltre: CleValeur<string, T>[] = mythis.datas;

            // si l'ancien filtre est compris dans le nouveau, on reprend le résultat précédent
            if (newFiltre != '' && newFiltre.indexOf(mythis.filtre) != -1 && newFiltre.length > mythis.filtre.length)
                dataAfiltre = mythis.datasFiltre;

            // filtre
            for (let elem of dataAfiltre)
            {
                if (elem != null && elem.cle != null && elem.cle.toUpperCase().indexOf(newFiltre) != -1)
                    newListfiltre.push(elem);
            }

            // tri par index
            mythis.filtre = newFiltre;
            mythis.datasFiltre = newListfiltre;


            // liste a afficher
            mythis.datasAfficher = [];

            //si le choix peut etre null
            if (mythis.HaveChoiseNull)
            {
                mythis.datasAfficher.push({ cle: mythis.libelleSiNull, value: null, click: null, toggleSelect: null })
            }
            mythis.endOfList = mythis.NB_AFFICHAGE_LISTE;

            for (let elem of mythis.datasFiltre.slice(0, mythis.endOfList))
            {
                mythis.datasAfficher.push({ cle: elem.cle, value: elem.valeur, click: null, toggleSelect: null });
            }

            mythis.listDeroulante.ajouterData(mythis.datasAfficher);


            afficherxElements(mythis.boutonMore);
            if (mythis.datasFiltre.length < mythis.NB_AFFICHAGE_LISTE)
                cacherxElements(mythis.boutonMore, true);

            mythis.listDeroulante.ajouterData(mythis.datasAfficher);

        }
    }

    private chargerListe()
    {
        let mythis: xxAutoComplete<T> = this;
        if (mythis.datasFiltre.length > mythis.datasAfficher.length - 1)
        {
            let listeTempo: { cle: string, value: T, click: () => void, toggleSelect: (on: boolean) => void }[] = [];
            for (let elem of mythis.datasFiltre.slice(mythis.endOfList, mythis.endOfList + mythis.NB_AFFICHAGE_LISTE))
            {
                let tempo: { cle: string, value: T, click: () => void, toggleSelect: (on: boolean) => void } = { cle: elem.cle, value: elem.valeur, click: null, toggleSelect: null };
                listeTempo.push(tempo);
                mythis.datasAfficher.push(tempo);
            };

            mythis.endOfList += mythis.NB_AFFICHAGE_LISTE;

            if (mythis.datasAfficher.length >= mythis.datasFiltre.length)
                cacherxElements(mythis.boutonMore, true);

            mythis.listDeroulante.ajouterData(listeTempo);
        }

        if (mythis.datasAfficher.length >= mythis.datasFiltre.length)
            cacherxElements(mythis.boutonMore, true);
    }

    // ---- Remove ---- //
    public removeAllElements()
    {
        let mythis: xxAutoComplete<T> = this;
        mythis.datas = [];
        mythis.datasAfficher = [];
        mythis.datasFiltre = [];
        mythis.listDeroulante.supprimerDataAll();
        mythis.endOfList = mythis.NB_AFFICHAGE_LISTE;
    }

    // ---- Select ---- //

    private selectedSet()
    {
        let mythis: xxAutoComplete<T> = this;
        if (mythis.datasAfficher.length > 0)
        {
            if (!mythis.HaveChoiseNull || mythis.datasAfficher.length == 1)
                mythis.curseurBouton = 0;
            else
                mythis.curseurBouton = 1;
            mythis.datasAfficher[mythis.curseurBouton].toggleSelect(true); //selected
        }
    }

    private selectedDeplacer(deplacement: number)
    {
        let mythis: xxAutoComplete<T> = this;

        let lastCurseurBouton = mythis.curseurBouton;

        if (mythis.datasAfficher.length > 0)
        {
            mythis.datasAfficher[mythis.curseurBouton].toggleSelect(false);
            mythis.curseurBouton = (mythis.curseurBouton + deplacement + mythis.datasAfficher.length) % mythis.datasAfficher.length;
            mythis.datasAfficher[mythis.curseurBouton].toggleSelect(true);
        }

        //chargement des 20 suivants
        if (mythis.curseurBouton + 1 == mythis.endOfList && deplacement > 0)
        {
            mythis.chargerListe();
        }

        if (deplacement > 0)
        {
            if (lastCurseurBouton > mythis.curseurBouton)
                mythis.listDeroulante.scrollToTop();
            else if (mythis.curseurBouton > 8)
                mythis.listDeroulante.scrollDown();
        }
        else if (deplacement < 0)
        {
            if (lastCurseurBouton < mythis.curseurBouton)
                mythis.listDeroulante.scrollToBot();
            else if (mythis.curseurBouton < mythis.datasAfficher.length - 8)
                mythis.listDeroulante.scrollUp();
        }
    }

    private selectedClick()
    {
        let mythis: xxAutoComplete<T> = this;

        if (mythis.datasAfficher.length > 0)
        {
            mythis.datasAfficher[mythis.curseurBouton]?.click();
        }
    }

    public openList(): xxAutoComplete<T>
    {
        this.listDeroulante.ouvrirSelection();
        return this;
    }

    public closeList(): xxAutoComplete<T>
    {
        this.listDeroulante.close();
        return this;
    }

    public select(item: T): xxAutoComplete<T>
    {
        this.listDeroulante.selecteur(this.datasAfficher.find(i => i.value == item));
        return this;
    }

}