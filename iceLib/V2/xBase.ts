import "./utils/DateSerialisableExtend";

export enum enumTypeOrientation {
    horizontal = "orientation_horizontale",
    vertical = "orientation_verticale"
};

export enum enumPosition {
    Left,
    Right,
    Top,
    Bottom
}

export enum enumCouleur {
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

export enum enumCouleurHexa {
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

export enum enumVisibility {
    afficher,
    masquer,
    masquerAvecCollapse
}

export class Visibility {
    public static converterToBool(a: enumVisibility): boolean { return a == enumVisibility.afficher; }
    public static converterFromBool(b: boolean): enumVisibility {
        return b ? enumVisibility.afficher : enumVisibility.masquer;
    }
}

export enum enumThemes {
    ThemeDefaut = 'tdef',
    ThemeLegacy = 'tleg',
    Theme2020 = 't20'
}

export enum enumThemeLuminosite {
    LightTheme = 'lm',
    DarkTheme = 'dm'
}

export enum enumCote { tous, haut, droite, bas, gauche }

export enum enumStyleBorderCSS {
    solid = 'solid',
    dashed = 'dashed',
    sotted = 'doted',
}

export enum enumCurseur {
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

export interface OptionsCotesCSS {
    Tous?: number;
    HautEtBas?: number;
    GaucheEtDroite?: number;
    Haut?: number;
    Bas?: number;
    Gauche?: number;
    Droite?: number;
}

export interface OptionTailleCss {
    px?: number;
    pourcentage?: number;
    view_width?: number;
}

export interface optionsAffichage {
    margin?: OptionsCotesCSS;
    padding?: OptionsCotesCSS;
    border?: OptionsCotesCSS;
    curseur?: enumCurseur;
}

export interface xConfigPage {
    contexteUrlPage: string;
    fileCacheTag?: string;
    debug?: boolean;
    theme?: () => enumThemes;
    themeluminosite?: () => enumThemeLuminosite;
}

export type xConfig =
    {
        langDictionaryUrl: string;
        langDictionaryData?: Dictionnaire<string>;
        missingTranslationCallback: (val: string, commentaire: string) => void;
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
    };

export interface iTestable {
    idTest?: string;
}

export interface OptionsHtml extends iTestable {
    id?: string;
    class?: string;
    name?: string;
    click?: (e?: MouseEvent) => void;
    tabindex?: number;
    autocomplete?: 'on' | 'off';
    /** ne pas utiliser */
    privateForceElement?: HTMLDivElement;
    drag?: {
        dragKey?: () => string;
        drop?: (key: string) => void;
        dropAction?: 'deplacement' | 'copie' | 'lien';
    };
}

export interface iXElement {
    y: HTMLElement | SVGElement;
}

export interface iXElementHolderEnable {
    asHolder: iXElementHolder;
}

/** Interface minimale — les méthodes builder (xxLabel, xxBouton, …) sont sur la
 *  classe concrète xElementHolder pour éviter la dépendance circulaire en ESM. */
export interface iXElementHolder extends iXElement {
    append(ajout: iXElement): iXElementHolder;
    appendMany(ajouts: iXElement[]): iXElementHolder;
    empty(): iXElementHolder;
    vider(): iXElementHolder;
    addClass(s: string): iXElementHolder;
    hasClass(s: string): boolean;
    toggleClass(s: string): iXElementHolder;
    removeClass(s: string): iXElementHolder;
    cacher(collapse?: boolean): void;
    afficher(): void;
}

export interface Dictionnaire<T> {
    [x: string]: T;
}

export interface CleValeur<T, U> {
    cle: T;
    valeur: U;
}

export class DictionnaireUtils {
    public static getDicoFromArray<T>(tab: T[], keyMaker: (t: T) => string): Dictionnaire<T> {
        const retour: Dictionnaire<T> = {};
        (tab ?? []).forEach(t => { retour[keyMaker(t)] = t; });
        return retour;
    }
    public static getData<T>(dico: Dictionnaire<T>): T[] {
        const retour: T[] = [];
        for (const key in dico) { retour.push(dico[key]); }
        return retour;
    }
}

export class Container<T> {
    public content: T=undefined as any;
    constructor() {
      
     }
}

export class Arbre<T> {
    private valeur: T;
    public get Valeur(): T { return this.valeur; }
    public set Valeur(val: T) { this.valeur = val; }
    enfants: Dictionnaire<Arbre<T>>;

    constructor(a: T) { this.valeur = a; this.enfants = {}; }

    public get EnfantsAsArray(): Arbre<T>[] {
        const tabFinal: Arbre<T>[] = [];
        for (const key in this.enfants) { tabFinal.push(this.enfants[key]); }
        return tabFinal;
    }
    public getEnfant(t: T): Arbre<T> {
        const tabFinal = this.EnfantsAsArray.filter(a => a.valeur == t);
        if (!tabFinal || tabFinal.length != 1) throw "cet enfant de l'arbre n'existe pas ou n'est pas unique";
        return tabFinal[0];
    }
    public getEnfants(chemin?: T[]): Arbre<T>[] {
        let arbreCourant: Arbre<T> = this;
        if (chemin) chemin.forEach(t => { arbreCourant = arbreCourant.getEnfant(t); });
        return arbreCourant.EnfantsAsArray;
    }
    public ajouterEnfant(a: T): Arbre<T> {
        const newArbre = new Arbre(a);
        this.enfants[newArbre.valeur as any] = newArbre;
        return newArbre;
    }
}

export class xClass {
    public static config: xConfig = undefined as any;
    public static localConfig: xConfigPage = undefined as any;

    /** Circulaire cassée : ne passe plus par xCache */
    public static get debugMode(): boolean { return xClass.localConfig?.debug ?? false; }

    public static get Theme(): enumThemes {
        if (xClass.localConfig?.theme) return xClass.localConfig.theme();
        if (xClass.config?.theme) return xClass.config.theme();
        return enumThemes.ThemeDefaut;
    }

    public static get ThemeLuminosite(): enumThemeLuminosite {
        if (xClass.localConfig?.themeluminosite) return xClass.localConfig.themeluminosite();
        if (xClass.config?.themeluminosite) return xClass.config.themeluminosite();
        return enumThemeLuminosite.LightTheme;
    }
}
