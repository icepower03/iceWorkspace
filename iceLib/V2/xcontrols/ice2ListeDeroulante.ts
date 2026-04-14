import { iXElement, iXElementHolder, OptionsHtml, enumVisibility, CleValeur } from '../iceBase';
import { BindableObject } from './BindableObject';
import { iceElement, xElementHolder } from '../../iceElement';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { ObservableCollection } from './ObservableCollection';
import { iceDiv } from './iceDiv';
import { ice2ToolTip, enumXxToolTipMode, enumXxToolTipPositionWidth } from './ice2ToolTip';
import { ice2ListWrapper } from './ice2ListWrapper';
import { Icone, enumIconeSvg, IconeSvg, tailleIcone } from '../iceIcones';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';
import { ice2LabelContainer } from './ice2LabelContainer';
import { affichericeElements, cachericeElements, videriceElements } from '../../iceStaticFunctions';
import { iceOutils } from '../../iceOutils';
interface OptionsOption {
    value?: string;
    selected?: any; // permet de definir si l'option est selectionnées  ( il suffit de lui affecter une valeur, '' par exemple )
    text?: string;
}

export interface OptionsSelect extends OptionsHtml {
    multiple?: any; // permet de definir la selection multiple ( il suffit de lui affecter une valeur, '' par exemple)
    listeValeurs?: CleValeur<string, string>[];
    valueDefault?: string;
    optionTous?: boolean;
    icone?: Icone;
    onClose?: () => void;
    change?: (code: string) => void;
    asyncLoading?: (opt: OptionsSelect, callback: (value?: {}) => void) => void;
}

enum enumConteneurListeDeroulante {
    standard, boxer

}

export interface OptionsListeDeroulante<T> {
    defaultValue?: T;
    lectureSeule?: boolean;
    //liste des données à afficher
    donnees: T[];
    dataContext?: ObservableCollection<T>;
    asyncLoading?: () => Promise<T[]>;
    asyncDefault?: (donneesChargees: T[]) => T;
    justifieAGauche?: boolean;
    retourALaLigne?: boolean;
    textLocaliseMobile?: string;
    textVariableMobile?: string;
    //permet de définir comment afficher l'élément sélectionné et comment déclencher la sélection
    renderSelectItem: (p: iXElementHolder, item: T, selecteur: (a: T) => void, id: string) => void;
    //permet de définir l'affichage des éléments à choisir
    renderSelected: (p: xElementHolder, item: T, openSelect: (itemSelectionne: T) => void, data: T[]) => void;
    selected: (item: T, deleteElementCallBack: () => void, listeDeroulante: ice2ListeDeroulante<T>) => void;
    class?: string;
    id?: string;
    getId?: (elem: T) => string;
    onClose?: () => void;
    onShow?: () => void;
    equals?: (a: T, b: T) => boolean;
    renderHeaderList?: (placeHead: iXElementHolder, list: ice2ListeDeroulante<T>) => void;
    renderEndList?: (iciFin: iXElementHolder, listeDeroulante: ice2ListeDeroulante<T>) => void;
    binding?: {
        value?: BindableObject<T>;
        visibility?: BindableObject<enumVisibility>;
        lectureSeule?: BindableObject<boolean>;
    }
    renderLectureSeule?: (p: iXElementHolder, item: T) => void;
    nonResponsive?: boolean;
    /** Regroupe les elements (comme un groupBy), sous une seule bannier commune (modifie l'ordre des données) */
    regroupementUniqueBy?: {
        /** Sans c'est options le header sera juste un libelle avec la donnée du GroupBy */
        groupHeaderCustom?: (place: iXElementHolder, listGroup: T[]) => void;
        GroupBy: (a: T) => string | boolean | number | DateSerialisable | Date;
    }
}

export class ice2ListeDeroulante<T> implements iXElement {
    // ********* //
    // Attributs //
    // ********* //
    private containerPourChoisir: iceDiv;
    private openListButton: iceDiv;
    private container: ice2ToolTip;
    private hoteList: iceDiv;
    private list: ice2ListWrapper<T>;

    private donnees: ObservableCollection<T>;
    private currentValue: T;

    private promesseChargement: Promise<T[]>;
    private promesseCharge: Promise<void>;

    private bindLectureSeule: BindableObject<boolean>;
    private nonResponsive: boolean;

    // ---- Option ---- //
    private equals: (a: T, b: T) => boolean;
    private renderSelected: (p: iXElementHolder, item: T, openSelect: (itemSelectionne: T) => void, data: T[]) => void;
    private selected: (item: T, deleteElementCallBack: () => void, listeDeroulante: ice2ListeDeroulante<T>) => void;
    private renderSelectItem: (p: iXElementHolder, item: T, selecteur: (a: T) => void, id: string) => void;
    private renderHeaderList: (placeHead: iXElementHolder, list: ice2ListeDeroulante<T>) => void;
    private renderEndList?: (iciFin: iXElementHolder, listeDeroulante: ice2ListeDeroulante<T>) => void;
    private textLocaliseMobile?: string;
    private textVariableMobile?: string;
    private justifieAGauche?: boolean;
    private renderLectureSeule?: (p: iXElementHolder, item: T) => void;
    private onClose?: () => void;
    private getId?: (elem: T) => string;
    private regroupementUniqueBy?: {
        groupHeaderCustom?: (place: iXElementHolder, listGroup: T[]) => void;
        GroupBy: (a: T) => string | boolean | number | DateSerialisable | Date;
    };

    // ******** //
    // Property //
    // ******** //
   
    public get y(): HTMLElement {
        return this.container.y;
    }
    public get asyncLoaded(): Promise<void> { return this.promesseCharge; }
    public get Data(): T[] { return this.donnees.All(); }
    public set Data(datas: T[]) { this.donnees.vider().add(datas); }

    // *********** //
    // Constructor //
    // *********** //
    constructor(inOptions: OptionsListeDeroulante<T>) {
        // Options
        let addclass: string = inOptions.class ?? "";

        if (inOptions.retourALaLigne) {
            addclass += " retourALaLigne";
        }
        if (inOptions.lectureSeule) {
            addclass += " lectureSeule";
        }

        this.containerPourChoisir = new iceDiv({ class: 'ice2ListeDeroulanteStdListeRelativeOrigin' });

        this.getId = inOptions.getId;

        if (inOptions.justifieAGauche == null)
            inOptions.justifieAGauche = false;
        this.promesseChargement = inOptions.asyncLoading != null ? inOptions.asyncLoading() :
            new Promise<T[]>(resolve => {
                resolve([]);
            });

        if (inOptions.dataContext == null) {
            this.donnees = new ObservableCollection<T>(inOptions.donnees);
        }
        else {
            this.donnees = inOptions.dataContext;
            this.donnees.add(inOptions.donnees);
        }
        this.renderSelected = inOptions.renderSelected;
        this.selected = inOptions.selected;
        this.renderSelectItem = inOptions.renderSelectItem;
        this.justifieAGauche = inOptions.justifieAGauche ?? false;
        this.renderHeaderList = inOptions.renderHeaderList;
        this.renderEndList = inOptions.renderEndList;
        this.textLocaliseMobile = inOptions.textLocaliseMobile;
        this.textVariableMobile = inOptions.textVariableMobile;
        this.renderLectureSeule = inOptions.renderLectureSeule;
        this.onClose = inOptions.onClose;
        this.nonResponsive = inOptions.nonResponsive;
        this.regroupementUniqueBy = inOptions.regroupementUniqueBy;


        // binding
        if (inOptions.binding != null) {
            if (inOptions.binding.value != null) {
                let ReafectationInterneDeLaValeur: boolean = false;
                inOptions.binding.value.bind((s) => {
                    if (!ReafectationInterneDeLaValeur)
                        this.selecteur(s);
                });
                this.selected = (s) => {
                    ReafectationInterneDeLaValeur = true;
                    inOptions.binding.value.Value = s;
                    ReafectationInterneDeLaValeur = false;
                };
                if (inOptions.binding.value.Value != null) {
                    inOptions.defaultValue = inOptions.binding.value.Value;
                }


            }
            if (inOptions.binding.visibility != null) {
                inOptions.binding.visibility.bind((n: enumVisibility) => {
                    switch (n) {
                        case enumVisibility.afficher:
                            affichericeElements(this.container);
                            break;
                        case enumVisibility.masquer:
                            cachericeElements(this.container, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cachericeElements(this.container, true);
                            break;
                    }
                })
            }

        }

        // lectureSeule bind
        this.bindLectureSeule = new BindableObject<boolean>(false);
        if (inOptions.binding?.lectureSeule != null)
            this.bindLectureSeule = inOptions.binding.lectureSeule;
        else if (inOptions.lectureSeule != null)
            this.bindLectureSeule.Value = inOptions.lectureSeule;

        this.bindLectureSeule.bind((val) => {
            this.openListButton.asHolder.empty();
            if (val) {
                if (inOptions.renderLectureSeule != null) {
                    if (this.openListButton != null)
                        inOptions.renderLectureSeule(this.openListButton.asHolder, this.currentValue);
                }
                else
                    console.error("ice2ListeDeroulante - renderLectureSeule non defini!");
            }
            else {
                this.renderSelected(
                    this.openListButton.asHolder,
                    this.currentValue,
                    (item: T) => {
                        this.openSelect(item).then(() => {
                            if (this.hoteList != null) {
                                this.container.CalculPosition();
                            }
                        });
                    }, this.donnees.All()
                );
            }
        });


        // Equal function
        this.equals = inOptions.equals != null ?
            (a: T, b: T) => (a == null && b == null) || (a != null && b != null && inOptions.equals(a, b)) :
            (a: T, b: T) => a == b;

        //Recuperation données async
        this.promesseCharge = this.promesseChargement.then((d: T[]) => {
            this.donnees.add(d);
        });

        this.openListButton = new iceDiv({ class: "xlsd-valeurSelected" });
        this.container = new ice2ToolTip({
            class: "ice2ListeDeroulante " + addclass,
            id: inOptions.id,
            initContent: this.openListButton,
            TooltipMode: (iceOutils.isMobile() ? enumXxToolTipMode.Manuel : enumXxToolTipMode.Manuel_WithOut_BackGround),
            ToolTipPositionWidthSouhaite: enumXxToolTipPositionWidth.droite,
            ToolTipPositionWidthNeverCenter: true,
            WithoutFleche: true,
            isIndependenteToolTip: true,
            nonResponsive: this.nonResponsive,
            TooltipStopPropagation: true,
            onShow: () =>
            {

                if (inOptions.onShow != null)
                    inOptions.onShow();
            },
            afterShow: () =>
            {
                if (iceOutils.isMobile())
                    this.containerPourChoisir.y.classList.add("visible");
            },
            beforeHide: async (tooltip: ice2ToolTip) =>
            {
                if (iceOutils.isMobile())
                {
                    this.containerPourChoisir.y.classList.remove("visible");
                    await iceOutils.sleep(300);
                }

                tooltip.viderTooltip();
                
            }

        });


        // Premier chargement
        this.promesseCharge.then(() => {
            if (inOptions.asyncDefault != null) {
                inOptions.defaultValue = inOptions.asyncDefault(this.donnees.All());
            }

            if (this.bindLectureSeule.Value) {

                if (inOptions.renderLectureSeule != null) {
                    if (inOptions.defaultValue != null)
                        inOptions.renderLectureSeule(this.openListButton.asHolder, inOptions.defaultValue);
                }
                else
                    console.error("ice2ListeDeroulante - renderLectureSeule non defini!");
            }
            else {
                this.renderSelected(
                    this.openListButton.asHolder,
                    inOptions.defaultValue,
                    (item: T) => {
                        this.openSelect(item).then(() => {
                            if (this.hoteList != null) {
                                this.container.CalculPosition();
                            }
                        });
                    },
                    this.donnees.All()
                );
            }

            this.currentValue = inOptions.defaultValue;
        });

        this.currentValue = inOptions.defaultValue;
    }

    // ******** //
    // Methodes //
    // ******** //
    private supprimerElement(toDelete: T[]) {
        this.donnees.del(this.donnees.All().filter(data => toDelete.indexOf(data) < 0));
    }

    public ajouterData(dataPlus: T[]): ice2ListeDeroulante<T> {
        this.donnees.add(dataPlus);
        return this;
    }
    public supprimerDataAll(): ice2ListeDeroulante<T> {
        this.donnees.vider();
        return this;
    }

    public setLectureSeule(lectureSeule: boolean) {
        this.bindLectureSeule.Value = lectureSeule;
    }

    public selecteur(i: T) {
        //quand on choisit un élément
        //on lance le traitement spécifique
        this.promesseCharge.then(() => {
            this.currentValue = i;
            this.selected(i, () => this.supprimerElement([i]), this);
            this.closeList(i);
        });
    }

    public selecteurByFind(filtre: ((a: T) => boolean)) {
        //quand on choisit un élément
        //on lance le traitement spécifique
        this.promesseCharge.then(() => {
            let i = this.donnees.find(filtre);
            this.selecteur(i);
        });
    }

    // Permet de definir l'item selectionné sans executer le valuechange
    public selecteurWithOutValueChange(i: T) {
        //quand on choisit un élément
        //on lance le traitement spécifique
        this.promesseCharge.then(() => {
            this.currentValue = i;
            this.closeList(i);
        });
    }

    //cette méthode permet de déclencher l'affichage de l'ouvertre des items disponibles
    public async ouvrirSelection(): Promise<void> {
        this.openSelect(this.currentValue);
    }

    public scrollToTop() {
        this.list.y.scrollTo({ top: 0 });
    }

    public scrollToBot() {
        this.list.y.scrollTo({ top: this.list.y.scrollHeight });   //.prop('scrollHeight'));
    }

    public scrollUp(nombrePx?: number) {
        this.list.y.scrollTo({ top: (this.list.y.scrollTop - (nombrePx == null ? 20 : nombrePx)) });
    }

    public scrollDown(nombrePx?: number) {
        this.list.y.scrollTo({
            top: this.list.y.scrollTop + (nombrePx == null ? 20 : nombrePx)
        });
    }

    private async openSelect(itemEnCours: T): Promise<void>
    {
        let myThis: ice2ListeDeroulante<T> = this;
        // On exécute que si la tooltip n'est pas déjà affiché
        if (!this.container.isVisible) {
            await myThis.promesseCharge;
            myThis.list = new ice2ListWrapper<T>({
                dataContext: myThis.donnees,
                getId: myThis.getId,
                donnees: [],
                regroupementUniqueBy: myThis.regroupementUniqueBy,
                renderItem: (ici, item: T, idElement) => {
                    if (myThis.equals(item, itemEnCours)) {
                        ici.addClass("selected");
                    }
                    myThis.renderSelectItem(ici, item, (i) => {
                        myThis.selecteur(i);
                    }, idElement);
                }
            });

            myThis.donnees.bind(
                () => myThis.container.CalculPosition(),
                () => myThis.container.CalculPosition());

            

            myThis.hoteList = new iceDiv({ class: 'ice2ListeDeroulanteStdListeHoster' });
            myThis.hoteList.y.style.minWidth = myThis.openListButton.width() + "px";

            if (myThis.justifieAGauche)
                myThis.hoteList.addClass("xlsd-align_gauche");

            if (myThis.renderHeaderList != null) {
                let header = new iceDiv({});
                myThis.hoteList.asHolder.append(header);
                myThis.renderHeaderList(header.asHolder, myThis)
            }
            myThis.hoteList.asHolder.append(myThis.list);
            if (myThis.renderEndList != null) {
                let hoteEndList: iceDiv = new iceDiv({ class: 'ice2ListeDeroulanteEndList' });
                myThis.hoteList.asHolder.append(hoteEndList);
                myThis.renderEndList(hoteEndList.asHolder, myThis);
            }

            let labelContainerTextMobile: ice2LabelContainer = new ice2LabelContainer({
                class: "xlsd-titre_mobile",
                textLocalise: myThis.textLocaliseMobile??'Indéfini',
                textVariable: myThis.textVariableMobile ?? (myThis.textLocaliseMobile ? null : "Indéfini"),
                initContent: new ice2Bouton({
                    icone: new IconeSvg(enumIconeSvg.croix, { taille: tailleIcone.S }),
                    click: show =>
                    {
                        myThis.container.HideTooltip();
                        show();
                    },
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.M,
                        margin: { Tous: 0 },
                    },
                    titleLocalise: "retour"
                }),
            });
            myThis.containerPourChoisir.asHolder.vider();
            myThis.containerPourChoisir.asHolder.append(labelContainerTextMobile);

            //------------------------------------------------------
            myThis.containerPourChoisir.asHolder.append(myThis.hoteList);
            myThis.container.setToolTip(myThis.containerPourChoisir);

            myThis.container.ShowTooltip();
        }
    }

    private closeList(i: T): void {

        this.container.HideTooltip();

            //if (i !== null) {
            //on vide l'affichage de l'élément selectionné
            this.openListButton.vider();
            //on redessine la zone de valeur sélectionné avec la nouvelle valeur
            if (this.bindLectureSeule.Value)
            {
                this.renderLectureSeule(this.openListButton.asHolder, i);
            }
            else
            {
                this.renderSelected(this.openListButton.asHolder, i, (a) =>
                {
                    this.openSelect(a);
                }, this.donnees.All());
            }

            //}

            if (typeof (this.onClose) == "function")
            {
                try
                {
                    this.onClose();

                } catch (ex)
                {
                    console.log("problème fonction onClose ice2ListeDeroulante " + ex);
                }
            }
    }

    public close() {
        this.closeList(null);
    }
    public vider(): void {
        let myThis: ice2ListeDeroulante<T> = this;
      
        videriceElements(myThis);
       

    }
}