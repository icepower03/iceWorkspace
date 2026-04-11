
if (xConfigActive == undefined) {
    alert("xConfigActive is not initialized, please report to xDevelopers.");
}

//var xConfigPageActive: xConfigPage = { contexteUrlPage: "../../" };

if (xConfigPageActive == undefined) {
    alert("xConfigPageActive is not initialized, you must create a xConfigPage variable  named 'xConfigPageActive'.");
}


enum enumTypeOrientation {
    horizontal = "orientation_horizontale",
    vertical = "orientation_verticale"
};

enum enumPosition {
    Left,
    Right,
    Top,
    Bottom
}

enum enumCouleur {
    emed_noir = "emed_noir",
    emed_grisfonce = "emed_grisfonce",
    emed_grisclair = "emed_grisclair",
    emed_blanc = "emed_blanc",
    emed_marronfonce = "emed_marronfonce",
    emed_marronclair = "emed_marronclair",
    emed_rougefonce = "emed_rougefonce",
    emed_rouge = "emed_rouge",
    emed_orange = "emed_orange",
    emed_jaune = "emed_jaune",
    emed_vert = "emed_vert",
    emed_turquoise = "emed_turquoise",
    emed_bleu = "emed_bleu",
    emed_violet = "emed_violet",
    emed_peau = "emed_peau",
    emed_rose = "emed_rose",
    t20_utilisateur = "t20_user",
    t20_alternatif = "t20_alt",
    intervention_plannifiee = "intervention_plannifee",
    intervention_programmee = "intervention_programmee",
    intervention_validee = "intervention_validee",
    intervention_encours = "intervention_encours",
    intervention_realisee = "intervention_realisee",
    intervention_annulee = "intervention_annulee"
}


enum enumCouleurHexa {
    emed_noir = "000000",
    emed_grisfonce = "585858",
    emed_grisclair = "C6C6C6",
    emed_blanc = "FFFFFF",
    emed_marronfonce = "926036",
    emed_marronclair = "C99D66",
    emed_rougefonce = "AC0800",
    emed_rouge = "ED1D25",
    emed_orange = "EF8208",
    emed_jaune = "EACF0F",
    emed_vert = "39AD47",
    emed_turquoise = "5BB996",
    emed_bleu = "1C779C",
    emed_violet = "662482",
    emed_peau = "f6b478",
    emed_rose = "a3195c",
    intervention_plannifiee = "aaaaaa",
    intervention_programmee = "f2696b",
    intervention_validee = "f6c371",
    intervention_encours = "817efc",
    intervention_realisee = "75a85d",
    intervention_annulee = "585858"
}

enum enumVisibility {
    afficher,
    masquer,
    masquerAvecCollapse
}

class Visibility {
    public static  converterToBool(a: enumVisibility):boolean { return a == enumVisibility.afficher; }
    public static converterFromBool(b: boolean): enumVisibility {
        return b ? enumVisibility.afficher : enumVisibility.masquer;
    }

}
enum enumThemes {
    ThemeDefaut = 'tdef',
    ThemeLegacy = 'tleg',
    Theme2020 = 't20'
}

enum enumThemeLuminosite {
    LightTheme = 'lm',
    DarkTheme = 'dm'
}

enum enumStyleBorderCSS {
    solid = 'solid',
    dashed = 'dashed',
    sotted = 'doted',
}

enum enumCurseur {
    defaut = "default",
    clic = "pointer",
    aide = "help",
    attente = "wait",
    texte = "text",
    deplacement = "move",
    interdit = "not-allowed",
    mainOuverte = "grab",
    mainFermee = "grabbing",
    redimensionnerColonne = "col-resize",
    redimensionnerLigne = "row-resize",
    zoomPlus = "zoom-in",
    zoomMoins = "zoom-out"
}

interface OptionsCotesCSS
{
    Tous?: number,
    HautEtBas?: number,
    GaucheEtDroite?: number,
    Haut?: number,
    Bas?: number,
    Gauche?: number,
    Droite?: number
}

interface OptionTailleCss {
    px?: number;
    pourcentage?: number;
    view_width?: number;
}

interface optionsAffichage
{
    margin?: OptionsCotesCSS;
    padding?: OptionsCotesCSS;
    border?: OptionsCotesCSS;
    curseur?: enumCurseur;
}

interface xConfigPage {
    contexteUrlPage: string;
    fileCacheTag?: string;
    debug?: boolean;
    theme?: () => enumThemes;
    themeluminosite?: () => enumThemeLuminosite;
}

type xConfig =
    {
        langDictionaryUrl: string;
        langDictionaryData?: Dictionnaire<string>;
        missingTranslationCallback: (val: string,commentaire :string) => void;
        debugAddTranslationCallback: (val: string) => void;
        jsDependencyPath: string;
        theme?: () => enumThemes;
        themeluminosite?: () => enumThemeLuminosite;
    }
    |
    {
        langDictionaryUrl?: string;
        langDictionaryData: Dictionnaire<string>;
		missingTranslationCallback: (val: string, commentaire: string) => void;
        debugAddTranslationCallback: (val: string) => void;
        jsDependencyPath: string;
        theme?: () => enumThemes;
        themeluminosite?: () => enumThemeLuminosite;
    }

interface iTestable {
    idTest?: string;
}

interface OptionsHtml extends iTestable {
    id?: string;
    class?: string;
    name?: string;
    click?: (e?: MouseEvent) => void;
  //  data?: any;
    tabindex?: number;
    autocomplete?: 'on' | 'off';
    /* ne pas utiliser */
    privateForceElement?: HTMLDivElement;
    drag?: {
        
        dragKey?: () => string;
        drop?: (key: string) => void;
        dropAction?: 'deplacement' | 'copie'|'lien';
}
}
  



interface iXElement {
   // x: xQuery;
   // x: never;

    y: HTMLElement | SVGElement;
}


interface iXElementHolderEnable {
    asHolder: iXElementHolder;
}


interface iXElementHolder extends iXElement {

    //x: xQuery;
    append(ajout: iXElement): iXElementHolder;
    appendMany(ajouts: iXElement[]): iXElementHolder;

    empty(): iXElementHolder;
    vider(): iXElementHolder;
    addClass(s: string): iXElementHolder;
    hasClass(s: string): boolean;
 //   css(prop: string, val?: string): iXElementHolder | string;
    toggleClass(s: string): iXElementHolder;
    removeClass(s: string): iXElementHolder;
    //click: (cb: (a?: MouseEvent) => void, shiftcb?: (a?: MouseEvent) => void) => void;

    //rightClick: (cb: (a?: MouseEvent) => void) => void;
    //dblClick: (cb: (a?: MouseEvent) => void) => void;
    //mouseOver: (cb: (a?: MouseEvent) => void) => void;
    //mouseEnter: (cb: (a?: MouseEvent) => void) => void;
    //mouseOut: (cb: (a?: MouseEvent) => void) => void;
    //mouseLeave: (cb: (a?: MouseEvent) => void) => void;
    xul(o: OptionsHtml, outElement?: Container<xUl>): iXElementHolder;
    xxList<T>(o: OptionsList<T>, outElement?: Container<xxListWrapper<T>>): iXElementHolder;
    xxZoneModulable(o: OptionZoneModulable, outElement?: Container<xxZoneModulable>): iXElementHolder;
    xxTreeTabControl(o: OptionsTreeTabControl, outElement?: Container<xxTreeTabControl>): this;
    xxTabControl(o: OptionsTabControl): iXElementHolder;
    xxAutoComplete<T>(o: OptionsAutoComplete<T>): iXElementHolder;
    xxArbre<T>(o: IOptionsxxArbre<T>): iXElementHolder;
    xxMenu(o: OptionsMenu): iXElementHolder;
    xxListChoix(o: OptionsSelect): iXElementHolder;
    xxRadioButton<T>(o: OptionsRadioButton<T>): iXElementHolder;
    xxListeChoixLang(o: OptionsListeChoixLang, outElement?: Container<xxListeChoixLang>): iXElementHolder;
    xinputCheckBox(o: OptionsInputCheckBox, outElement?: Container<xInputCheckBox>): iXElementHolder;
    xxTableau<T>(o: OptionsTableau<T>, outElement?: Container<xxTableauWrapper<T>>): iXElementHolder;
    xxStackPanel(o: OptionsStackPanel, outElement?: Container<xxStackPanel>): iXElementHolder;
    xxDockPanelDeprecated(o: OptionsxxDockPanel, outElement?: Container<xxDockPanelDeprecated>): iXElementHolder;
    xinputText(o: OptionsInput, outElement?: Container<xInputText>): iXElementHolder;
    xinputDateAndTime(o: OptionsInputDateAndTime): iXElementHolder;
    xdiv(o: OptionsDiv, outElement?: Container<xDiv>): iXElementHolder;
    xxCheckBox(o: OptionsInputCheckBox, outElement?: Container<xxCheckBox>): iXElementHolder;
    xxLabel(o: OptionsLabel, outElement?: Container<xxLabel>): iXElementHolder;
    xxInputIntellisense(o: OptionsInputIntellisense, outElement?: Container<xxInputIntellisense>): iXElementHolder;

    xinputDate(o: OptionsInputDate): iXElementHolder;
   // xxBoutonDeprecated(o: OptionsBoutons, outElement?: Container<xxBoutonDeprecated>): iXElementHolder;
    xxBouton(o: optionButton, outElement?: Container<xxBouton>): iXElementHolder;
    xxLabelModifiable(o: OptionsLabelModifiable): iXElementHolder;
    xxLabelContainer(o: OptionsLabelContainer, outElement?: Container<xxLabelContainer>): iXElementHolder;
    xxWrapPanel(o: OptionsWrapPanel, outElement?: Container<xxWrapPanel>): iXElementHolder;
    xspan(o: OptionsSpan, outElement?: Container<xSpan>): iXElementHolder;
    xxToolTip(o: OptionsToolTip): iXElementHolder;
    xxPage(o: OptionsPage, outElement?: Container<xxPageWrapper>): iXElementHolder;
    cacher(collapse?: boolean): void;
    afficher(): void;
}





class DictionnaireUtils {

    public static getDicoFromArray<T>(tab: T[], keyMaker: (t: T) => string): Dictionnaire<T> {
        let retour: Dictionnaire<T> = {};
        if (tab == null) { tab = []; }

        tab.forEach(t => {
            retour[keyMaker(t)] = t;
        });
        return retour;
    }

    public static getData<T>(dico: Dictionnaire<T>): T[] {
        let retour: T[] = [];
        for (let key in dico) {
            retour.push(dico[key]);
        }
        return retour;
    }
}


interface Dictionnaire<T> {
    [x: string]: T;
}
/*
interface DictionnaireNumeric<T>  {
    [x: number]: T;
}
*/


interface CleValeur<T, U> {
    cle: T;
    valeur: U;
}






class Container<T> {
    public content: T;

    constructor() { }
}

class Arbre<T>
{
    private valeur: T;
    public get Valeur(): T
    {
        let myThis: Arbre<T> = this;
        return myThis.valeur;
    }
    public set Valeur(val: T)
    {
        let myThis: Arbre<T> = this;
        myThis.valeur = val;
    }

    enfants: Dictionnaire<Arbre<T>>;

    public get EnfantsAsArray(): Arbre<T>[] {
        let myThis: Arbre<T> = this;
        let tabFinal: Arbre<T>[] = [];

        for (let key in myThis.enfants) {
            tabFinal.push(myThis.enfants[key]);
        }
        return tabFinal;
    }

    constructor(a: T) {
        this.valeur = a;
        this.enfants = {};
    }
    public getEnfant(t: T): Arbre<T> {
        let myThis: Arbre<T> = this;
        let tabFinal = myThis.EnfantsAsArray.filter((a) => { return a.valeur == t; })

        if (tabFinal == null || tabFinal.length != 1) {
            throw "cet enfant de l'arbre n'existe pas ou n'est pas unique";

        }
        return tabFinal[0];
    }
    public getEnfants(chemin?: T[]): Arbre<T>[] {
        let myThis: Arbre<T> = this;
        let arbreCourant: Arbre<T>;
        arbreCourant = myThis;
        if (chemin != undefined) {
            chemin.forEach((t: T) => { arbreCourant = arbreCourant.getEnfant(t); });
        }


        return arbreCourant.EnfantsAsArray;
    }


    /**
     * ajouter un enfant et retourne l'enfant
     * @param a
     */
    public ajouterEnfant(a: T): Arbre<T> {
        let myThis: Arbre<T> = this;
        let newArbre = new Arbre(a);
        let g: string;
        g = <any>(newArbre.valeur);
        myThis.enfants[g] = newArbre;
        return newArbre;
    }
}

class xClass {
    //correspond à l'intégration de la librairie dans un programme
    public static config: xConfig = xConfigActive;

    //correspond à des valeurs qui proviennent de la page courante
    public static localConfig: xConfigPage = xConfigPageActive;

    public static get debugMode(): boolean { return xCache.debugMode; }

    public static get Theme(): enumThemes {
        if (xClass.localConfig.theme != undefined) {
            return xClass.localConfig.theme();
        }

        if (xClass.config.theme != undefined) {
            return xClass.config.theme();
        }

        return enumThemes.ThemeDefaut;
    }

    public static get ThemeLuminosite(): enumThemeLuminosite {
        if (xClass.localConfig.themeluminosite != undefined) {
            return xClass.localConfig.themeluminosite();
        }

        if (xClass.config.themeluminosite != undefined) {
            return xClass.config.themeluminosite();
        }
         
        return enumThemeLuminosite.LightTheme;
    }
} 
