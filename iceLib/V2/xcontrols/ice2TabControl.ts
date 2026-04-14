import { iXElement, iXElementHolder, enumTypeOrientation, enumCouleur, enumPosition } from '../iceBase';
import { BindableObject } from './BindableObject';
import { iceOutils } from '../../iceOutils';
import { iceDiv } from './iceDiv';
import { iceStyle } from './iceStyle';
import { ice2Bouton, enumTailleBouton, enumTypeBouton, enumCouleurBouton, optionsAffichageBouton, enumStyleBouton } from './ice2Bouton';
import { ice2Label } from './ice2Label';
import { ice2StackPanel } from './ice2StackPanel';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2Grid, ice2GridItem, enumAlignementContenu } from './ice2Grid';
import { ice2Dialog, enumTypeAlerte } from './ice2Dialog';
import { ice2RadioButton, ETypeBouton, itemRadioButton } from './ice2RadioButton';
import { ice2InputNumerique } from './ice2InputNumerique';
import { Icone, enumIconeP12, enumIconeSvg, IconeP12, IconeMiniP12, IconeSvg, tailleIcone } from '../iceIcones';
import { ice2DockPanelDeprecated, DockPosition } from './ice2DockPanel';
import { ice2ListeDeroulante } from './ice2ListeDeroulante';
import { ice2LabelContainer, enumPositionDuContenu } from './ice2LabelContainer';
import { ice2PageWrapper } from './ice2PageWrapper';
import { ice2LabelModifiable } from './ice2LabelModifiable';
import { ice2ListeSelection } from './ice2ListeSelection';
import { ice2Boxer, enumBoxerTaille } from './ice2Boxer';
import { xElementHolder } from '../../iceElement';
import { cachericeElements, affichericeElements, videriceElements } from '../../iceStaticFunctions';
import { iceLString } from '../iceLString';

interface OptionsTabControl {
    id?: string;
    class?: string;
    tabChange?: (tabSelectionne: ice2TabItem) => void;
    typeOrientation?: enumTypeOrientation;
    typeOrientationBouton?: enumTypeOrientation;
    typeBouton?: ETypeBouton;
    initElements?: OptionsTabItem[];
    withDefault?: boolean;
    favoriteGlobalKey?: {
        key: string;
        cdperso: string;
    };
    favoriteAutoSave?: boolean;
    modeNavigation?: boolean;
    modeFermerOnglets?: boolean;
    ongletAjout?: OptionsOngletAjout;
    gererGroupe?: OptionsGestionGroupeTab;/** Si cette option est utilisée les onglets doivent obligatoirement avoir une option id*/
    styleArrondi?: boolean;
    postZoneAligneeADroite?: boolean;
}

interface OptionsOngletAjout {
    textAjoutLocalise: string;
    listeOngletsAjout: OptionsTabItem[];
}

interface OptionsGestionGroupeTab {
    groupesKey: string;
    textAjoutGroupeLocalise: string;
    /** dans zeus utiliser la méthode générique: OutilsJSZeus.GetGroupesOnglets; */
    getListeGroupe: (key: string) => Promise<CustomGroupeOnglets[]>;
    /** dans zeus utiliser la méthode générique: OutilsJSZeus.SaveGroupesOnglets; */
    saveGroupe: (key: string, custom: CustomGroupeOnglets) => Promise<CustomGroupeOnglets>;
    /** dans zeus utiliser la méthode générique: OutilsJSZeus.DeleteGroupesOngltc; */
    deleteGroupe: (key: string, custom: CustomGroupeOnglets) => Promise<void>;
    /** dans zeus utiliser la méthode générique: OutilsJSZeus.getDernierGroupeOnglet; */
    getDerniersOuverts: (key: string) => Promise<CustomGroupeOnglets>;
    /** dans zeus utiliser la méthode générique: OutilsJSZeus.saveDernierGroupeOnglet; */
    saveDerniersOuverts: (key: string, custom: CustomGroupeOnglets) => Promise<CustomGroupeOnglets>;

    derniersOuvertsKey: string;

}

export interface OptionsTabItem {
    icone?: Icone;
    id?: string;
    class?: string;
    textLocalise?: string;
    textVariable?: string;
    addContent: (ici: iXElementHolder) => void;
    defaultTab?: boolean;
    favoriteTabKey?: string;
    selectionnerajout?: boolean;
    onSelect?: () => void;
    color?: string;
    decorateur?: boolean;
    onClose?: (o: OptionsTabItem) => void;
    modeFermerOnglets?: boolean;
    textFermerOngletLocalise?: string;
    titleFermerOngletLocalise?: string;
    optionBoutonWrapper2?: {
        optionsAffichage?: optionsAffichageBouton;
        SelectedcolorCuston?: enumCouleurBouton;
        UnSelectedcolorCuston?: enumCouleurBouton;
        typeBouton?: enumTypeBouton;
    };
    retour?: {
        SelectCallback?: () => void;
    };
    binding?: { textVariable?: BindableObject<string> }
}

class CustomGroupeOnglets {
    Id: string;
    Libelle: string;
    DernierSelectionne: string;
    IdsOnglets: string[];
}

enum EActionGroupeTab {
    Ajouter,
    Modifier,
    Supprimer
}

export class ice2TabItem {

    public jqHost: iXElementHolder;

    public SaveAsFavorite(tabParent: ice2TabControl): void {

        let clefGlobal: string = tabParent.FavoriteGlobalKey;
        let myThis: ice2TabItem = this;
        if (clefGlobal != undefined && clefGlobal.length > 0
            && myThis.FavoriteTabKey != undefined && myThis.FavoriteTabKey.length > 0
            && iceOutils.getLocalStorage(clefGlobal) != myThis.FavoriteTabKey) {

            iceOutils.setLocalStorage(clefGlobal, myThis.FavoriteTabKey);

            //iceOutils.afficherMessageAlertifyLocalise("onglet favori enregistré", ETypeAlertify.success);

            //si j'ai un tabitemfavorite paramétré je lui enlève la classe favori 
            //puis j'ajoute la classe favori sur le nouveau selectionne
            if (tabParent.tabItemFavorite != undefined) {
                tabParent.toggleFavori();
            }
            tabParent.tabItemFavorite = myThis;
            tabParent.toggleFavori();

        }

    }
    private color: string;
    public get Color(): string { return this.color; }

    private decorateur: boolean;
    public get Decorateur(): boolean { return this.decorateur; }

    private textFermerOngletLocalise: string;
    private titleFermerOngletLocalise: string;
    private optionBoutonWrapper2: {
        optionsAffichage?: optionsAffichageBouton;
        SelectedcolorCuston?: enumCouleurBouton;
        UnSelectedcolorCuston?: enumCouleurBouton;
        typeBouton?: enumTypeBouton;
    };
    public get OptionBoutonWrapper2():
        {
            optionsAffichage?: optionsAffichageBouton;
            SelectedcolorCuston?: enumCouleurBouton;
            UnSelectedcolorCuston?: enumCouleurBouton;
            typeBouton?: enumTypeBouton;
        } { return this.optionBoutonWrapper2; }

    public get TextFermerOngletLocalise(): string { return this.textFermerOngletLocalise; }
    public get TitleFermerOngletLocalise(): string { return this.titleFermerOngletLocalise; }
    private modeFermerOnglets: boolean;
    public get ModeFermerOnglet(): boolean { return this.modeFermerOnglets; }
    private myContent: iceDiv
    private initialise: boolean = false;
    private createContent: (ici: xElementHolder) => void;
    private favoriteTabKey: string;
    private bindingText: BindableObject<string>;
    private hasContenu: boolean = false;
    public id: string;

    //private modeXXBouton?: boolean; //
    public onSelect: () => void;

    public onClose: () => void;

    public get FavoriteTabKey(): string {

        return this.favoriteTabKey;
    }

    constructor(o: OptionsTabItem) {
        let myThis: ice2TabItem = this;

        myThis.myContent = new iceDiv({ class: "ice2TabControlItemContent" });
        myThis.createContent = o.addContent;

        if (o.favoriteTabKey != undefined) { myThis.favoriteTabKey = o.favoriteTabKey; }
        if (o.color != undefined) { myThis.color = o.color; }
        myThis.textFermerOngletLocalise = o.textFermerOngletLocalise == undefined ? "" : o.textFermerOngletLocalise;
        myThis.titleFermerOngletLocalise = o.titleFermerOngletLocalise == undefined ? "" : o.titleFermerOngletLocalise;
        myThis.optionBoutonWrapper2 = o.optionBoutonWrapper2 == undefined ? {
            optionsAffichage: { tailleBouton: enumTailleBouton.Fit, styleBouton: enumStyleBouton.Simple }
        } : o.optionBoutonWrapper2;
        myThis.modeFermerOnglets = o.modeFermerOnglets == undefined ? false : o.modeFermerOnglets;
        myThis.decorateur = o.decorateur == undefined ? false : o.decorateur;
        myThis.onSelect = () => { };
        myThis.onClose = () => { };
        if (o.id != undefined) { myThis.id = o.id; }

        if (o.onSelect != undefined) { myThis.onSelect = o.onSelect; }
        if (o.onClose != undefined) {
            myThis.onClose = () => { o.onClose(o); };
        }
        myThis.bindingText = o.binding?.textVariable;
    }

    public setHasContenu(hasContenu: boolean) {
        let myThis: ice2TabItem = this;

        myThis.hasContenu = hasContenu;
        if (hasContenu)
            myThis.jqHost.addClass("ongletAvecContenu");
        else
            myThis.jqHost.removeClass("ongletAvecContenu");

    }

    public getHasContenu(): boolean {
        let myThis: ice2TabItem = this;

        return (myThis.hasContenu);
    }

    public attacherContenu(ici: iXElementHolder) {
        let myThis: ice2TabItem = this;

        ici.append(myThis.myContent);
    }

    public masquer() {
        let myThis: ice2TabItem = this;
        cachericeElements(myThis.myContent, true);
    }

    public afficher() {
        let myThis: ice2TabItem = this;

        if (!myThis.initialise) {
            myThis.createContent(new xElementHolder(myThis.myContent));
            myThis.initialise = true;
        }

        affichericeElements(this.myContent);
    }
}


export class ice2TabControl implements iXElement {
    private zoneAvantOnglet: ice2StackPanel | ice2WrapPanel;
    private zoneApresOnglet: ice2StackPanel | ice2WrapPanel;
    private ongletAjout: ice2StackPanel | ice2WrapPanel;
    private ongletGestionOnglet: ice2StackPanel | ice2WrapPanel;
    private listeAjout: ice2ListeDeroulante<OptionsTabItem>;
    private optionsAjout: OptionsOngletAjout;
    private listeAjoutOnglet: OptionsTabItem[];
    private optionsGroupe: OptionsGestionGroupeTab;
    private listeGroupes: ice2ListeDeroulante<CustomGroupeOnglets>;
    private listeGroupesUtil: CustomGroupeOnglets[];
    private selectedGroupe: CustomGroupeOnglets;
    private groupeAucun: CustomGroupeOnglets;
    private groupeDerniereSelection: CustomGroupeOnglets = null;
    private dernierOuvertsKey: string;
    private boxerGroupe: ice2Boxer = null;
    private postZoneAligneeADroite: boolean;

    private ID_GROUPE_AUCUN: string = "ID_GROUPE_AUCUN";
    private ID_GROUPE_DERNIER: string = "ID_GROUPE_DERNIER";

    private initElements: OptionsTabItem[];

    public appendPreZoneTab(i: iXElement): ice2TabControl {
        let myThis: ice2TabControl = this;
        myThis.zoneAvantOnglet.append(i);
        return myThis;
    }

    public appendPostZoneTab(i: iXElement): ice2TabControl {
        let myThis: ice2TabControl = this;
        myThis.zoneApresOnglet.append(i);
        return myThis;
    }
    public vider(): ice2TabControl {

        let myThis: ice2TabControl = this;
        videriceElements(myThis);
        return myThis;
    }
    public selectTabItem(item: ice2TabItem, avecRechargement?: boolean): void {
        let myThis: ice2TabControl = this;

        // supprimer le current
        if (myThis.tabItemSelected != undefined) {
            myThis.tabItemSelected.masquer();
            myThis.tabItemSelected = undefined;
        }

        myThis.select(item, avecRechargement);
    }

    public setTabItemHasContenu(itemId: string, hasContenu: boolean): void {
        let myThis: ice2TabControl = this;
        let tabItems: ice2TabItem[] = myThis.tabItems.filter(e => e.id == itemId);
        if (tabItems.length > 0) {
            tabItems[0].setHasContenu(hasContenu);
        }
    }

    public hasContenu(): boolean {
        let myThis: ice2TabControl = this;
        let nb: number = 0;
        myThis.tabItems.forEach(e => {
            if (e.getHasContenu()) {
                nb++;
            }
        });

        return (nb > 0);
    }


    public afficherTabItem(itemId: string, bShow: boolean): void {
        let myThis: ice2TabControl = this;
        let tabItems: ice2TabItem[] = myThis.tabItems.filter(e => e.id == itemId);
        if (tabItems.length > 0) {
            if (!bShow)
                cachericeElements(tabItems[0].jqHost,true);
            else
                affichericeElements( tabItems[0].jqHost);
        }
    }

    public toggleFavori() {

        if (this.tabItemFavorite != undefined && this.tabItemFavorite.jqHost != undefined) {
            this.tabItemFavorite.jqHost.toggleClass("Tabfavori");
        }
    }

  
    public get y() { return this.dockPrincipal.y; }

    private tabChange: (t: ice2TabItem) => void;

    private dockPrincipal: ice2DockPanelDeprecated;
    private gridPrincipal: ice2Grid;

    private modeAffichage: enumTypeOrientation;

    private orientationBoutons: enumTypeOrientation;
    private typeBouton: ETypeBouton;

    private boutonsradio: ice2RadioButton<ice2TabItem>;

    private tabItemSelected: ice2TabItem;

    public tabItemFavorite: ice2TabItem;

    private contentHolder: iceDiv;

    public withDefault: boolean;

    private favoriteGlobalKey: string;

    public get FavoriteGlobalKey(): string { return this.favoriteGlobalKey; }

    private favoriteAutoSave: boolean;

    private modeNavigation?: boolean;

    private modeFermerOnglets?: boolean;

    private styleArrondi?: boolean;

    public ajouterOnglet(oi: OptionsTabItem): ice2TabControl {
        let myThis: ice2TabControl = this;
        let preselection: boolean = false;
        let isFavori: boolean = false;
        //cas d'une valeur user dependante
        if (myThis.favoriteGlobalKey != undefined) {
            //si l'onglet courant a une cle permettant de le mettre en favori
            // et que c'est celle que l'on a lue dans le registre
            // alors on doit le preselectionner
            if (oi.favoriteTabKey != undefined && myThis.CurrentFavoriteTabKey == oi.favoriteTabKey) {
                preselection = true;
                isFavori = true;
            } else {
                if (myThis.CurrentFavoriteTabKey == null)
                    preselection = oi.defaultTab;
            }
        }
        else {//cas du mode defaut sans favoris
            preselection = oi.defaultTab;
        }

        let doitEtreSelectionne: boolean = preselection;
        //si on ne gère pas de default et qu'on est le premier onglet
        //on l'active

        if (!myThis.withDefault && myThis.tabItems.length == 0) {
            doitEtreSelectionne = true;
        }

        //si je travaille en mode default et j'ai bien desactivé les favoris, je sélectionne automatiquement l'onglet avec default = true à l'ajout
        if (myThis.withDefault && myThis.favoriteGlobalKey == undefined && preselection) {
            doitEtreSelectionne = true;
        }

        if (oi.selectionnerajout != undefined && oi.selectionnerajout && myThis.optionsAjout != undefined && myThis.optionsAjout.listeOngletsAjout.length > 0)
            doitEtreSelectionne = true;

        if (doitEtreSelectionne == undefined) { doitEtreSelectionne = false; }

        let newTabItem: ice2TabItem = new ice2TabItem(oi);
        newTabItem.masquer();

        if (oi.class == undefined) {
            oi.class = "";
        }

        let classCSS: string = (myThis.modeFermerOnglets != null && myThis.modeFermerOnglets ? " ice2TabControlOngletFermable " : oi.modeFermerOnglets ? " ice2TabControlOngletFermable " : " ") + oi.class;

        let newItemRadio: itemRadioButton<ice2TabItem> = new itemRadioButton<ice2TabItem>({
            id: oi.id,
            icone: oi.icone,
            libelleLocalise: oi.textLocalise,
            libelleVariable: oi.textVariable,
            valeur: newTabItem,
            preselectionne: doitEtreSelectionne,
            binding: { texteVariable: oi?.binding?.textVariable },
            optionBoutonWrapper2: oi.optionBoutonWrapper2,
            class: classCSS
        });

        myThis.boutonsradio.ajouterItems([newItemRadio]);

        newTabItem.jqHost = newItemRadio.jqHostButton;

        if (isFavori) {
            myThis.tabItemFavorite = newTabItem;
            myThis.toggleFavori();
        }

        myThis.tabItems.push(newTabItem);

        newTabItem.attacherContenu(myThis.contentHolder.asHolder);
        if (doitEtreSelectionne)
        {
            myThis.select(newTabItem, true);
        }

        oi.retour = {
            SelectCallback: () => {
                myThis.select(newTabItem, true);
            }
        }
        myThis.afficherOngletAjout();
        return myThis;


    }

    public supprimerOnglets(onglets: itemRadioButton<ice2TabItem>[], bGroupe: boolean)
    {
        let myThis: ice2TabControl = this;

        myThis.boutonsradio.supprimerItems(onglets);

        //On supprime les ice2TabItem correspondants
        onglets.forEach(function (onglet: itemRadioButton<ice2TabItem>) {

            let i: number = 0;
            onglet.valeur.onClose();
            onglet.valeur.masquer();

            //On cherche le ice2TabItem dans la liste
            while (i < myThis.tabItems.length && myThis.tabItems[i] != onglet.valeur)
                i++;

            if (i < myThis.tabItems.length) {
                //Si trouvé, on le supprime
                myThis.tabItems.splice(i, 1);
            }

            if (myThis.optionsGroupe != undefined && bGroupe)
            {
                // supprimer l'onglet au groupe des derniers sélectionnés s'il y est
                let indexDansOngletsDerniersOuverts: number = myThis.groupeDerniereSelection.IdsOnglets.indexOf(onglet.valeur.id);
                if (indexDansOngletsDerniersOuverts != -1)
                    myThis.groupeDerniereSelection.IdsOnglets.splice(indexDansOngletsDerniersOuverts, 1);
            }
        });

        if (myThis.optionsGroupe != undefined && bGroupe)
        {
            // ajuster le dernier onglet sélectionné
            if (myThis.groupeDerniereSelection.IdsOnglets.length > 0)
            {
                if (myThis.groupeDerniereSelection.IdsOnglets.indexOf(myThis.groupeDerniereSelection.DernierSelectionne) == -1)
                    myThis.groupeDerniereSelection.DernierSelectionne = myThis.groupeDerniereSelection.IdsOnglets[0];
            }
            else
                myThis.groupeDerniereSelection.DernierSelectionne = null;

            myThis.SaveDerniereSelection();
        }

        if (myThis.tabItems.length > 0)
            myThis.select(myThis.tabItems[0], true);

        myThis.afficherOngletAjout();
    }

    private currentFavoriteTabKey: string;

    public get CurrentFavoriteTabKey() {
        if (this.favoriteGlobalKey != undefined) {
            this.currentFavoriteTabKey = iceOutils.getLocalStorage(this.favoriteGlobalKey);
        }
        return this.currentFavoriteTabKey;
    }

    private select(nouveautabItemSelectionne: ice2TabItem, avecRechargement: boolean): ice2TabControl {

        let myThis: ice2TabControl = this;

        if (myThis.optionsGroupe != null && myThis.boxerGroupe != null)
        {
            myThis.boxerGroupe.fermer();
            myThis.boxerGroupe = null;
        }

        if (nouveautabItemSelectionne != myThis.tabItemSelected || avecRechargement == undefined || avecRechargement == true)
        {

            if (myThis.tabItemSelected != undefined) {
                myThis.tabItemSelected.masquer();
            }

            myThis.tabItemSelected = nouveautabItemSelectionne;
            myThis.tabItemSelected.afficher();
            if (myThis.favoriteAutoSave) {
                myThis.tabItemSelected.SaveAsFavorite(myThis);
            }
            if (avecRechargement == undefined || avecRechargement == true)
                myThis.tabItemSelected.onSelect();

            if (myThis.tabChange != undefined) {
                myThis.tabChange(nouveautabItemSelectionne);
            }

            // ToggleSelected
            myThis.boutonsradio.setValue(nouveautabItemSelectionne, false);

            if (myThis.optionsGroupe != undefined)
            {
                if (nouveautabItemSelectionne.id != null)
                {
                    // ajouter l'onglet au groupe des derniers sélectionnés s'il n'y est pas
                    let inclusDansOngletsDerniersOuverts: boolean = myThis.groupeDerniereSelection.IdsOnglets.includes(nouveautabItemSelectionne.id);
                    if (!inclusDansOngletsDerniersOuverts)
                        myThis.groupeDerniereSelection.IdsOnglets.push(nouveautabItemSelectionne.id);

                    myThis.groupeDerniereSelection.DernierSelectionne = nouveautabItemSelectionne.id;
                    myThis.SaveDerniereSelection();

                    // modifier l'onglet sélectionné dans le groupe affiché
                    let index: number = myThis.listeGroupesUtil.findIndex(groupe => groupe.Id == myThis.selectedGroupe.Id);
                    if (index != -1)
                    {
                        if (myThis.listeGroupesUtil[index].IdsOnglets.includes(nouveautabItemSelectionne.id))
                            myThis.listeGroupesUtil[index].DernierSelectionne = nouveautabItemSelectionne.id
                    }
                }
            }
        }

        return myThis;
    }

    public tabItems: ice2TabItem[] = [];

    // Permet de forcer le scroll 
    // PxScroll => 5 par default
    public tabContentScroll(up: boolean, PxScroll?: number): void {
        let mythis: ice2TabControl = this;
        let scrolltopActu: number = mythis.contentHolder.y.scrollTop;

        let lePxScroll: number = 5;
        if (PxScroll != null)
            lePxScroll = PxScroll;

        mythis.contentHolder.y.scrollTop=scrolltopActu + (up ? (-lePxScroll) : lePxScroll);
    }

    constructor(o: OptionsTabControl) {
        let myThis: ice2TabControl = this;
        if (o == undefined) { o = {}; }

        myThis.modeNavigation = o.modeNavigation;
        myThis.styleArrondi = o.styleArrondi;
        myThis.modeFermerOnglets = o.modeFermerOnglets;
        myThis.favoriteAutoSave = o.favoriteAutoSave;
        if (o.favoriteGlobalKey != undefined)
            myThis.favoriteGlobalKey = o.favoriteGlobalKey.cdperso + "_" + o.favoriteGlobalKey.key;
        myThis.optionsAjout = o.ongletAjout;
        myThis.optionsGroupe = o.gererGroupe;
        if (o.ongletAjout != undefined) {
            myThis.listeAjoutOnglet = o.ongletAjout.listeOngletsAjout;
            myThis.optionsAjout.textAjoutLocalise = o.ongletAjout.textAjoutLocalise;
        }
        myThis.initElements = o.initElements;
        myThis.listeGroupesUtil = [];

        if (o.tabChange != undefined) { myThis.tabChange = o.tabChange; }
        if (o.class == undefined) { o.class = ""; }

        if (o.typeOrientation == undefined) { myThis.modeAffichage = enumTypeOrientation.horizontal; }
        else { myThis.modeAffichage = o.typeOrientation; }

        myThis.orientationBoutons = o.typeOrientationBouton;
        if (o.typeBouton != undefined)
            myThis.typeBouton = o.typeBouton;
        else
            myThis.typeBouton = ETypeBouton.boutonWrapper2

        if (myThis.CurrentFavoriteTabKey != undefined) { myThis.withDefault = true; }

        myThis.withDefault = o.withDefault;
        if (myThis.withDefault == undefined) {
            myThis.withDefault = false;
        }

        myThis.postZoneAligneeADroite = o.postZoneAligneeADroite;
        if (myThis.postZoneAligneeADroite == undefined) {
            myThis.postZoneAligneeADroite = false;
        }
        myThis.dockPrincipal = new ice2DockPanelDeprecated({ id: o.id, class: "ice2TabControlContainer " + myThis.modeAffichage + " " + o.class, centrerDernier: false });

        myThis.ongletGestionOnglet = myThis.modeAffichage == enumTypeOrientation.horizontal ?
            new ice2WrapPanel({ class: "ice2TabMenu_groupTab" }) :
            new ice2StackPanel({ class: "ice2TabMenu_groupTab" });

        //création du bouton radio

        let classRadioButton: string;

        if (myThis.styleArrondi == true)
            classRadioButton = "ice2tabcontrol_styleArrondi";

        myThis.boutonsradio = new ice2RadioButton<ice2TabItem>({
            displayOnlySelected: myThis.modeNavigation,
            class: classRadioButton,
            typeOrientation: myThis.modeAffichage,
            typeOrientationBouton: myThis.orientationBoutons,
            typeBouton: myThis.typeBouton,
            renderDecorator: function (a: itemRadioButton<ice2TabItem>) {
                if (a.valeur.id != "ice2TabControlAjoutOnglet") {
                    if (myThis.modeFermerOnglets || a.valeur.ModeFermerOnglet) {

                        if (myThis.styleArrondi != true) {
                            let quit: ice2Bouton = new ice2Bouton({
                                class: "closeTab" + (a.valeur.TextFermerOngletLocalise ? " avecTexte" : ""),
                                click: function () {
                                    myThis.supprimerOnglets([a], true);
                                },
                                textLocalise: a.valeur.TextFermerOngletLocalise ? a.valeur.TextFermerOngletLocalise : "",
                                titleLocalise: a.valeur.TitleFermerOngletLocalise ? a.valeur.TitleFermerOngletLocalise : "Fermer l'onglet",
                                icone: new IconeSvg(enumIconeSvg.croix, { taille: tailleIcone.XXS, couleurSvg: { couleurIconeComplete: enumCouleur.zeus_grisfonce } }),
                                optionsAffichage: { tailleBouton: a.valeur.TextFermerOngletLocalise ? enumTailleBouton.XS : enumTailleBouton.Fit },
                                
                            });
                            a.divHost.asHolder.append(quit);

                        }
                        else {
                            let quit: ice2Bouton = new ice2Bouton({
                                class: "closeTab" + (a.valeur.TextFermerOngletLocalise ? " avecTexte" : ""),
                                click: function () {
                                    myThis.supprimerOnglets([a], true);
                                },
                                textLocalise: a.valeur.TextFermerOngletLocalise ? a.valeur.TextFermerOngletLocalise : "",
                                titleLocalise: a.valeur.TitleFermerOngletLocalise ? a.valeur.TitleFermerOngletLocalise : "Fermer l'onglet",
                                icone: a.valeur.TextFermerOngletLocalise ? new IconeP12(enumIconeP12.action_annuler, { taille: tailleIcone.XS }) : new IconeSvg(enumIconeSvg.croix),
                                optionsAffichage: a.valeur.OptionBoutonWrapper2.optionsAffichage,

                            });
                            a.divHost.asHolder.append(quit);
                        }
                    }
                }

                if (a.valeur.Color != undefined) {

                    a.divHost.addClass("ice2TabItemColor");

                    if (myThis.modeAffichage == enumTypeOrientation.horizontal) {
                        a.divHost.y.style.borderBottomStyle = "solid";
                        a.divHost.y.style.borderBottomWidth = "3px";
                        a.divHost.y.style.borderBottomColor = "#" + a.valeur.Color;
                    }

                    if (myThis.modeAffichage == enumTypeOrientation.vertical) {
                        a.divHost.y.style.borderRightStyle = "solid";
                        a.divHost.y.style.borderRightWidth = "3px";
                        a.divHost.y.style.borderRightColor = "#" + a.valeur.Color;
                    }

                    if (a.divHost.y.classList.contains("sous-onglet")) {
                        iceStyle.setCouleurFondAvecContrasteTexteAuto(a.divHost, a.valeur.Color);
                    }
                }
                else {
                    a.divHost.addClass("ice2TabItemNoColor");
                }

                if (a.valeur.Decorateur) {
                    a.divHost.addClass('withDecorator');
                }
            },
            initElements: [],
            valueChange: function (t: ice2TabItem) {
                myThis.select(t, true);
            },
            clickOnSelected: function (t: ice2TabItem) {
                {//si l'on reclique sur le meme
                    t.SaveAsFavorite(myThis);
                    myThis.select(t, true);
                }
            }
        });

        myThis.contentHolder = new iceDiv({ class: 'ice2TabControlContentHolder' });

        let colonnesAutoOnglets: string;
        if (myThis.postZoneAligneeADroite == false)
            colonnesAutoOnglets = "auto auto auto auto 1fr";
        else
            colonnesAutoOnglets = "auto auto auto 1fr auto";

        if (myThis.modeAffichage == enumTypeOrientation.horizontal) {
            myThis.zoneAvantOnglet = new ice2WrapPanel({ class: "ice2TabMenu_preZone", espaceMinimaliste: true });
            myThis.zoneApresOnglet = new ice2WrapPanel({ class: "ice2TabMenu_postZone", espaceMinimaliste: true });
            myThis.ongletAjout = new ice2WrapPanel({ class: "ice2TabMenu_addTab", espaceMinimaliste: true });

            myThis.gridPrincipal = new ice2Grid({
                gridGap: "0",
                colonnes_auto: colonnesAutoOnglets,
                lignes_auto: "auto",
                padding: false,
                id: "ice2GridPrincipal" + (o.id != undefined ? o.id : ""),
                class: "ice2TabMenu " + o.class
            });

            let gridItemAvantOnglet: ice2GridItem = new ice2GridItem({
                rowStart: 1,
                colStart: 1,
                nbCols: 1,
                content: myThis.zoneAvantOnglet,
                class: "zoneAvantOnglets",
            });
            let gridItemBoutonsradio: ice2GridItem = new ice2GridItem({
                rowStart: 1,
                colStart: 2,
                nbCols: 1,
                content: myThis.boutonsradio,
                class: "zoneOnglets",
                optionsAffichage: { alignementContenu: enumAlignementContenu.BasGauche }
            });
            let gridItemOngletAjout: ice2GridItem = new ice2GridItem({
                rowStart: 1,
                colStart: 3,
                nbCols: 1,
                content: myThis.ongletAjout,
                class: "zoneOngletAjout",
            });
            let gridItemGestionOnglet: ice2GridItem = new ice2GridItem({
                rowStart: 1,
                colStart: 4,
                nbCols: 1,
                content: myThis.ongletGestionOnglet,
                class: "zoneGestionOnglets",
            });
            let gridItemApresOnglet: ice2GridItem = new ice2GridItem({
                rowStart: 1,
                colStart: 5,
                nbCols: 1,
                content: myThis.zoneApresOnglet,
                class: "zoneApresOnglets",
                optionsAffichage: {
                    alignementContenu: enumAlignementContenu.BasGauche,
                    padding: { Bas: 5 }
                }
            });

            myThis.gridPrincipal.append([gridItemAvantOnglet, gridItemBoutonsradio, gridItemOngletAjout, gridItemGestionOnglet, gridItemApresOnglet]);

            myThis.dockPrincipal.append(myThis.gridPrincipal, DockPosition.haut, "ice2TabControlMenu");
            myThis.dockPrincipal.append(myThis.contentHolder, DockPosition.haut, "ice2TabContent");
            //myThis.contentHolder.x.parents(".ice2DockPanel.Direction_haut:first")[0].classList.add("ice2TabContentParent");
            
        }
        else {

            let myStack: ice2StackPanel = new ice2StackPanel({ class: "ice2TabMenu" });
            myThis.zoneAvantOnglet = new ice2StackPanel({ class: "ice2TabMenu_preZone" });
            myThis.zoneApresOnglet = new ice2StackPanel({ class: "ice2TabMenu_postZone" });
            myThis.ongletAjout = new ice2StackPanel({ class: "ice2TabMenu_addTab" });
            myStack.append(myThis.zoneAvantOnglet)
                .append(myThis.boutonsradio, "ice2TabMenu_zoneOnglets")
                .append(myThis.ongletAjout)
                .append(myThis.ongletGestionOnglet)
                .append(myThis.zoneApresOnglet);

            myThis.dockPrincipal.append(myStack, DockPosition.gauche, "ice2TabControlMenu");
            myThis.dockPrincipal.append(myThis.contentHolder, DockPosition.gauche);
        }

        myThis.afficherOngletAjout();

        if (myThis.optionsGroupe != undefined)
        {
            myThis.dernierOuvertsKey = myThis.optionsGroupe.derniersOuvertsKey;
            myThis.groupeAucun = { Id: myThis.ID_GROUPE_AUCUN, Libelle: new iceLString("Aucun").text, IdsOnglets: [], DernierSelectionne: myThis.tabItemSelected?.id }
            myThis.optionsGroupe.getDerniersOuverts(myThis.dernierOuvertsKey).then(res =>
            {
                myThis.groupeDerniereSelection = res;
                myThis.initGroupes();
            });
        } else {
            if (myThis.initElements != undefined) {
                myThis.initElements.forEach(function (oi: OptionsTabItem) {
                    myThis.ajouterOnglet(oi);
                });
            }
        }
    }

    private async afficherOngletAjout() {

        let myThis: ice2TabControl = this;
        if (myThis.optionsAjout != undefined) {
            myThis.ongletAjout.vider();
            myThis.optionsAjout.listeOngletsAjout = myThis.listeAjoutOnglet.filter(e => !iceOutils.rechercheString(e.id, myThis.tabItems.map(f => f.id)));
            if (myThis.optionsAjout.listeOngletsAjout.length > 0) {
                myThis.listeAjout = new ice2ListeDeroulante<OptionsTabItem>({
                    defaultValue: null,
                    renderSelected: function (p: iXElementHolder, item: OptionsTabItem, selecteur: (a: OptionsTabItem) => void) {
                        if (item != null) {
                            p.append(new ice2Bouton({
                                click: function (cb) {
                                    myThis.listeAjout.ouvrirSelection();
                                    cb();
                                },
                                titleLocalise: 'Choisir cet onglet',
                                textVariable: item.textVariable,
                                class: 'ice2BoutonListeAddTab',
                                optionsAffichage: { tailleBouton: enumTailleBouton.XS },
                            }));
                        }
                        else {
                            p.append(new ice2Bouton({
                                click: function (cb) {
                                    myThis.listeAjout.ouvrirSelection();
                                    cb();
                                },
                                titleLocalise: myThis.optionsAjout.textAjoutLocalise,
                                textLocalise: myThis.optionsAjout.textAjoutLocalise,
                                class: 'ice2BoutonListeAddTab',
                                optionsAffichage: { tailleBouton: enumTailleBouton.XS },
                                icone: new IconeMiniP12(enumIconeP12.action_ajouter)
                            }));


                        }
                    },
                    donnees: myThis.optionsAjout.listeOngletsAjout,
                    renderSelectItem: function (p: iXElementHolder, item: OptionsTabItem, selecteur: (a: OptionsTabItem) => void) {
                        if (item != null) {
                            p.append(new ice2Bouton({
                                click: function (cb) {

                                    if (item != null) {
                                        item.selectionnerajout = true;
                                        // déselectionner les autres onglets
                                        myThis.boutonsradio.resetValue(false);
                                        myThis.listeAjout.close();
                                        myThis.ajouterOnglet(item);
                                    }
                                    cb();
                                },
                                titleLocalise: 'Choisir cet onglet',
                                textVariable: item.textVariable,
                                class: 'ice2BoutonListeAddTab',
                                optionsAffichage: { tailleBouton: enumTailleBouton.XS },
                            }));
                        }
                        else {
                            p.append(new ice2Bouton({
                                click: function (cb) {
                                    myThis.listeAjout.ouvrirSelection();
                                    cb();
                                },
                                titleLocalise: 'Choisir cet onglet',
                                textLocalise: myThis.optionsAjout.textAjoutLocalise,
                                class: 'ice2BoutonListeAddTab',
                                optionsAffichage: { tailleBouton: enumTailleBouton.XS },
                                icone: new IconeMiniP12(enumIconeP12.action_ajouter)
                            }));
                        }
                    },
                    selected: (item: OptionsTabItem) => {

                    },

                });
                myThis.ongletAjout.append(myThis.listeAjout);
            }
        }
    }

    private async initGroupes() {
        let myThis: ice2TabControl = this;

        myThis.optionsGroupe.getListeGroupe(myThis.optionsGroupe.groupesKey).then(groupes =>
        {
            myThis.listeGroupesUtil = [];

            myThis.listeGroupesUtil.push(myThis.groupeAucun);
            if (myThis.groupeDerniereSelection != null && myThis.groupeDerniereSelection.Id == myThis.ID_GROUPE_DERNIER)
                myThis.listeGroupesUtil.push(myThis.groupeDerniereSelection);

            if (groupes.length > 0)
                myThis.listeGroupesUtil.push(...groupes);

            // dernier groupe sélectionné au démarrage : la dernière sélection ou aucun
            if (myThis.groupeDerniereSelection != null && myThis.groupeDerniereSelection.Id != null)
                myThis.SetSelectedGroupe(myThis.groupeDerniereSelection);
            else
                myThis.SetSelectedGroupe(myThis.groupeAucun);

            if (myThis.initElements != undefined)
            {
                if (myThis.selectedGroupe.IdsOnglets != null)
                {
                    let derniersOuverts: OptionsTabItem[] = myThis.initElements.filter(e => iceOutils.rechercheString(e.id, myThis.selectedGroupe.IdsOnglets));
                    // si le dernier onglet ouvert n'est pas dans le groupe: ouvrir le premier du groupe
                    if (derniersOuverts.length > 0 && derniersOuverts.findIndex(e => e.id == myThis.selectedGroupe.DernierSelectionne) == -1)
                        myThis.selectedGroupe.DernierSelectionne = derniersOuverts[0].id;
                    derniersOuverts.forEach(oi =>
                    {
                        if (oi.id == myThis.selectedGroupe.DernierSelectionne)
                            oi.defaultTab = true;
                        else
                            oi.defaultTab = false;
                        myThis.ajouterOnglet(oi);
                    });
                }
            }

            // ----- Gestion des Groupes d'onglets ---- //
            myThis.listeGroupes = new ice2ListeDeroulante<CustomGroupeOnglets>({
                class: "listeGroupes",
                asyncDefault: (liste: CustomGroupeOnglets[]) =>
                {
                    return myThis.selectedGroupe;
                },
                donnees: myThis.listeGroupesUtil,
                defaultValue: myThis.selectedGroupe,
                renderSelected: (place, valeur, openSelect) => {
                    place.append(new ice2Bouton({
                        titleVariable: valeur != undefined ? valeur.Libelle : new iceLString("Aucun").text,
                        textVariable: valeur != undefined ? valeur.Libelle : new iceLString("Aucun").text,
                        click: (cb) =>
                        {
                            myThis.listeGroupes.ouvrirSelection();
                            cb();
                        },
                        icone: new IconeMiniP12(enumIconeP12.fleche_noire_bas),
                        optionsAffichage: { tailleBouton: enumTailleBouton.XS, positionIconeBouton: enumPosition.Right },
                    }));

                },
                renderSelectItem: (place, valeur, selecteur) => {
                    let label: ice2GridItem = new ice2GridItem({
                        colStart: 1,
                        nbCols: 1,
                        rowStart: 1,
                        nbRows: 1,
                        content: new ice2Bouton({
                            click: () => selecteur(valeur),
                            textVariable: valeur != undefined ? valeur.Libelle : new iceLString("Aucun").text,
                            titleVariable: valeur != undefined ? valeur.Libelle : new iceLString("Aucun").text,
                            optionsAffichage: { tailleBouton: enumTailleBouton.XS },
                        })

                    });
                    let boutonLigne: ice2Grid = new ice2Grid({
                        class: "gridNomGroupes",
                        colonnes_auto: "70% 15% 15%",
                        gridGap: "2px",
                        padding: true,

                    });

                    if (valeur.Id != myThis.ID_GROUPE_DERNIER && valeur.Id != myThis.ID_GROUPE_AUCUN && valeur.Id != "")
                    {
                        let boutonEdit: ice2GridItem = new ice2GridItem({
                            colStart: 2,
                            nbCols: 1,
                            rowStart: 1,
                            nbRows: 1,
                            content: new ice2Bouton({
                                titleLocalise:"Modifier",
                                click: function (cb) {
                                    myThis.openBoxer(myThis.optionsGroupe.groupesKey, EActionGroupeTab.Modifier, valeur);
                                    cb();
                                },
                                icone: new IconeMiniP12(enumIconeP12.action_modifier),
                                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                            })
                        });

                        let boutonSuppr: ice2GridItem = new ice2GridItem({
                            colStart: 3,
                            nbCols: 1,
                            rowStart: 1,
                            nbRows: 1,
                            content: new ice2Bouton({
                                titleLocalise: "Supprimer",
                                click: function (cb) {
                                    myThis.openBoxer(myThis.optionsGroupe.groupesKey, EActionGroupeTab.Supprimer, valeur);
                                    cb();
                                },
                                icone: new IconeMiniP12(enumIconeP12.action_supprimer),
                                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },

                            })
                        });

                        boutonLigne.append([label, boutonEdit, boutonSuppr]);
                    }
                    else 
                    {
                        boutonLigne.append([label]);
                    }

                    place.append(boutonLigne);

                },
                selected: (valeur, callback) =>
                {
                    if (myThis.boxerGroupe != null)
                    {
                        myThis.boxerGroupe.fermer();
                        myThis.boxerGroupe = null;
                    }
                    myThis.SelectGroupe(valeur, myThis.tabItemSelected?.id);
                },
                renderEndList: function (iciFin, listeDeroulante) {
                    let boutonLigne: ice2LabelContainer = new ice2LabelContainer({
                        optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite }
                    });
                    boutonLigne.asHolder.append(new ice2Bouton({
                        click: function (cb) {
                            myThis.openBoxer(myThis.optionsGroupe.groupesKey, EActionGroupeTab.Ajouter);
                        },
                        textLocalise: myThis.optionsGroupe.textAjoutGroupeLocalise,
                        titleLocalise: myThis.optionsGroupe.textAjoutGroupeLocalise,
                        optionsAffichage: { tailleBouton: enumTailleBouton.XS },
                        icone: new IconeMiniP12(enumIconeP12.action_ajouter)
                    }));

                    iciFin.append(boutonLigne);

                },
            });

            myThis.ongletGestionOnglet.append(new ice2Label({ textLocalise: "Groupe: ", centrer: true, class: "labelGroupe" }));
            myThis.ongletGestionOnglet.append(myThis.listeGroupes);
        });
    }

    private SetSelectedGroupe(newGroupe: CustomGroupeOnglets)
    {
        let myThis: ice2TabControl = this;
        if (myThis.selectedGroupe == null)
            myThis.selectedGroupe = new CustomGroupeOnglets();

        myThis.selectedGroupe.Id = newGroupe.Id;
        myThis.selectedGroupe.Libelle = newGroupe.Libelle;
        myThis.selectedGroupe.DernierSelectionne = newGroupe.DernierSelectionne;
        let IdsOnglets: string[] = [];
        newGroupe.IdsOnglets.forEach(onglet => IdsOnglets.push(onglet));
        myThis.selectedGroupe.IdsOnglets = IdsOnglets;
    }

    private SetGroupeDerniereSelection(newGroupe: CustomGroupeOnglets)
    {
        let myThis: ice2TabControl = this;
        if (myThis.groupeDerniereSelection == null)
            myThis.groupeDerniereSelection = new CustomGroupeOnglets();

        myThis.groupeDerniereSelection.Id = newGroupe.Id;
        myThis.groupeDerniereSelection.Libelle = newGroupe.Libelle;
        myThis.groupeDerniereSelection.DernierSelectionne = newGroupe.DernierSelectionne;
        let IdsOnglets: string[] = [];
        newGroupe.IdsOnglets.forEach(onglet => IdsOnglets.push(onglet));
        myThis.groupeDerniereSelection.IdsOnglets = IdsOnglets;
    }

    private SaveDerniereSelection()
    {
        let myThis: ice2TabControl = this;
        myThis.groupeDerniereSelection.Id = myThis.ID_GROUPE_DERNIER;
        myThis.groupeDerniereSelection.Libelle = new iceLString("Dernière sélection").text;
        myThis.optionsGroupe.saveDerniersOuverts(myThis.dernierOuvertsKey, myThis.groupeDerniereSelection);
    }

    private SelectGroupe(newGroupe: CustomGroupeOnglets, idOngletSelected: string)
    {
        let myThis: ice2TabControl = this;

        // supprimer le groupe 'dernière sélection' de la liste des groupes
        let index: number = myThis.listeGroupesUtil.findIndex(group => group.Id == myThis.ID_GROUPE_DERNIER);
        if (index != -1)
        {
            myThis.listeGroupesUtil.splice(index, 1);
            myThis.listeGroupes.Data = myThis.listeGroupesUtil;
        }

        // modifier le contenu du groupe sélectionné
        myThis.SetSelectedGroupe(newGroupe);

        // sauvegarder le dernier groupe affiché
        if (newGroupe.Id != myThis.ID_GROUPE_AUCUN)
            myThis.optionsGroupe.saveDerniersOuverts(myThis.dernierOuvertsKey, newGroupe);

        // modifier le contenu du groupe de la dernière sélection
        myThis.SetGroupeDerniereSelection(newGroupe);

        // On réinitialise les onglets
        myThis.boutonsradio.resetItems();
        myThis.supprimerOnglets(myThis.tabItems.map(e => new itemRadioButton<ice2TabItem>({
            valeur: e
        })), false);

        //On construit la liste des onglets correspondant au nouveau groupe 
        if (myThis.initElements != undefined)
        {
            let ongletsDuGroupe: OptionsTabItem[] = myThis.initElements.filter((e => iceOutils.rechercheStringTous([e.id], newGroupe.IdsOnglets)));
            // si le dernier onglet ouvert n'est pas dans le groupe: ouvrir le premier du groupe
            if (ongletsDuGroupe.length > 0 && ongletsDuGroupe.findIndex(e => e.id == newGroupe.DernierSelectionne) == -1)
                newGroupe.DernierSelectionne = ongletsDuGroupe[0].id;

            // Affichage des onglets du groupe
            ongletsDuGroupe.forEach(oi =>
            {
                // select du dernier sélectionné de ce groupe
                if (oi.id == newGroupe.DernierSelectionne)
                    oi.defaultTab = true;
                else
                    oi.defaultTab = false;
                myThis.ajouterOnglet(oi);
            });

        }
    }

    private DeleteGroupe(legroupe: CustomGroupeOnglets)
    {
        let myThis: ice2TabControl = this;
        let sameItem: boolean = (legroupe.Id == myThis.selectedGroupe.Id);
        myThis.optionsGroupe.deleteGroupe(myThis.optionsGroupe.groupesKey, legroupe).then(function ()
        {
            myThis.optionsGroupe.getListeGroupe(myThis.optionsGroupe.groupesKey).then(groupes =>
            {
                let index: number = myThis.listeGroupesUtil.findIndex(group => group.Id == legroupe.Id);
                if (index != -1)
                {
                    myThis.listeGroupesUtil.splice(index, 1);
                    myThis.listeGroupes.Data = myThis.listeGroupesUtil;
                }
                if (sameItem)
                    myThis.SaveDerniereSelection();
            });
        });

    }

    private openBoxer(key: string, action: EActionGroupeTab, item?: CustomGroupeOnglets) {
        let myThis: ice2TabControl = this;

        if (myThis.boxerGroupe != null)
            myThis.boxerGroupe.fermer();

        if (action != EActionGroupeTab.Supprimer) {

            let pageEnregistrer: ice2PageWrapper = new ice2PageWrapper({
                titleLocalise: "Sauvegarder le groupe",
                withHeader: true,
                withFooter: true,
            });

            if (item == undefined) {
                item = { IdsOnglets: myThis.tabItems.map(e => e.id), Libelle: new iceLString("Nouveau groupe").text, Id: null, DernierSelectionne: myThis.tabItemSelected?.id }
            }
            pageEnregistrer.zonePrincipale.append(
                new ice2LabelContainer({
                    class: "libelleGroupe",
                    textLocalise: "Libellé du groupe :",
                    labelLargeurLibre: true,
                    initContent: new ice2LabelModifiable({
                        textVariable: item.Libelle,
                        change: function (val) {
                            item.Libelle = val;
                        }
                    })
                })
            );

            let index: number = myThis.listeGroupesUtil.findIndex(group => group.Id == item.Id);
            let groupe: CustomGroupeOnglets = null;
            if (index != -1)
                groupe = myThis.listeGroupesUtil[index];

            // liste des onglets du groupe
            pageEnregistrer.zonePrincipale.append(
                new ice2ListeSelection<OptionsTabItem>({
                    DonneeComplete: myThis.listeAjoutOnglet,
                    DonneeSelectionnees: action == EActionGroupeTab.Ajouter || groupe == null ? [] : myThis.listeAjoutOnglet.filter(e => groupe.IdsOnglets.includes(e.id)),
                    RenderItemListeComplete: (ici, e) => {
                        ici.append(new ice2Label({ textLocalise: e.textLocalise, textVariable: e.textVariable }));
                    },
                    RenderItemListeSelectionee: (ici, e) => {
                        ici.append(new ice2Label({ textLocalise: e.textLocalise, textVariable: e.textVariable }));
                    },
                    ValueChange: (listeSelectionnee) => {
                        item.IdsOnglets = listeSelectionnee.map(e => e.id);
                    }
                })
            );

            pageEnregistrer.appendZoneFooter(new ice2Bouton({
                titleLocalise: "Enregistrer",
                textLocalise: "Enregistrer",
                icone: new IconeP12(enumIconeP12.action_enregistrer),
                optionsAffichage: { styleBouton: enumStyleBouton.Simple },
                click: cb =>
                {
                    myThis.optionsGroupe.saveGroupe(key, item).then((legroupe) => {

                        let index: number = myThis.listeGroupesUtil.findIndex(group => group.Id == legroupe.Id);
                        if (index != -1)
                            myThis.listeGroupesUtil[index] = legroupe;
                        else
                            myThis.listeGroupesUtil.push(legroupe);

                        myThis.listeGroupes.Data = myThis.listeGroupesUtil;

                        if (action === EActionGroupeTab.Modifier && legroupe.Id == myThis.selectedGroupe.Id)
                            myThis.listeGroupes.selecteur(legroupe);
                        else if (action == EActionGroupeTab.Ajouter)
                            myThis.listeGroupes.selecteur(legroupe);

                        myThis.boxerGroupe.fermer();
                        myThis.boxerGroupe = null;
                    });
                }
            }));

            myThis.boxerGroupe = new ice2Boxer({
                class: "boxerNomGRoupe",
                initContent: pageEnregistrer,
                tailleBoxer: enumBoxerTaille.fit
            });

            myThis.boxerGroupe.afficher();
        }
        else {
            if (item != null) {
                iceOutils.afficherMessageConfirmationPromise(new iceLString("Voulez vous supprimer le groupe {0}?").format([item.Libelle != null ? item.Libelle : ""]), true).then((res) => {
                    if (res)
                    {
                        myThis.DeleteGroupe(item);
                    }
                });
            }
        }
    }
}