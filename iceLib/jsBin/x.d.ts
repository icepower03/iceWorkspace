declare module pdfMake {
    function createPdf(doc: DocDefinition): DocumentPdfMake;
    interface pdfMakeElementTableElement {
        headerRows?: number;
        widths?: (string | number)[] | Function;
        heights?: (string | number)[] | Function;
        body: (pdfMakeElement | pdfMakeElement[] | string | string[])[];
    }
    interface pdfMakeElement {
        table?: pdfMakeElementTableElement;
        text?: string | pdfMakeElement | pdfMakeElement[];
        margin?: [number, number, number, number] | [number, number];
        fit?: [number, number];
        pageBreak?: 'after' | 'before';
        image?: string;
        width?: number | string;
        height?: number | string;
        fontSize?: number;
        italics?: boolean;
        bold?: boolean;
        columns?: pdfMakeElement[] | any[] | string;
        stack?: pdfMakeElement[];
        ul?: pdfMakeElement[];
        ol?: pdfMakeElement[];
        reversed?: boolean;
        columnGap?: number;
        style?: any;
        colSpan?: number;
        alignment?: string;
        layout?: any;
        color?: string;
        start?: number;
        counter?: number;
        type?: string;
        markerColor?: string;
        separator?: string | string[];
        border?: [boolean, boolean, boolean, boolean];
        absolutePosition?: {
            x: number;
            y: number;
        };
        svg?: string;
    }
    interface DocDefinition {
        content?: (pdfMakeElement | string)[] | string;
        pageSize?: '4A0' | '2A0' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10' | 'B0' | 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6' | 'B7' | 'B8' | 'B9' | 'B10' | 'C0' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7' | 'C8' | 'C9' | 'C10' | 'RA0' | 'RA1' | 'RA2' | 'RA3' | 'RA4' | 'SRA0' | 'SRA1' | 'SRA2' | 'SRA3' | 'SRA4' | 'EXECUTIVE' | 'FOLIO' | 'LEGAL' | 'LETTER' | 'TABLOID';
        pageOrientation?: 'portrait' | 'landscape';
        pageMargins?: [number, number, number, number];
        images?: any[] | any;
        background?: ((currentPage: number) => pdfMakeElement) | pdfMakeElement;
        styles?: any[] | any;
        defaultStyle?: any;
        footer?: ((currentPage: number, pageCount: number) => pdfMakeElement) | pdfMakeElement;
        header?: ((currentPage: number, pageCount: number) => pdfMakeElement) | pdfMakeElement | (pdfMakeElement | string)[] | string;
    }
    interface DocumentPdfMake {
        docDefinition: DocDefinition;
        tableLayouts: any;
        fonts: any;
        vfs: any;
        open: (options: any, win: any) => any;
        print: (options: any, win: any) => any;
        download: (defaultFileName: string, cb?: any, options?: any) => any;
        getBase64: (cb?: any, options?: any) => any;
        getDataUrl: (cb?: any, options?: any) => any;
        getBlob: (cb?: any, options?: any) => any;
    }
}
declare enum enumIconeCs3i {
    aucun = 0,
    action_admission = 1,
    action_agrandir = 2,
    action_agrandir_horizontal = 3,
    action_ajout_destinataire = 4,
    action_ajouter = 5,
    action_ajouter_blanc = 6,
    action_ajouter_valider = 7,
    action_annuler = 8,
    action_annuler_blanc = 9,
    action_annuler_cercle = 10,
    action_apercu = 11,
    action_apercu_doc = 12,
    action_apercu_historique = 13,
    action_apercu_live = 14,
    action_arret = 15,
    action_associer = 16,
    action_baguette_auto = 17,
    action_bouton_play = 18,
    action_carte_praticien = 19,
    action_carte_visite_med = 20,
    action_changement_lit = 21,
    action_checkbox_active = 22,
    action_checkbox_inactive = 23,
    action_coller = 24,
    action_commentaire = 25,
    action_copie_destinataire = 26,
    action_copier = 27,
    action_copier_droite = 28,
    action_copier_gauche = 29,
    action_couper = 30,
    action_csv = 31,
    action_cv_creation_patient = 32,
    action_deplier_blanc = 33,
    action_deplier_bleu = 34,
    action_desepingler = 35,
    action_deverrouiller = 36,
    action_dmp = 37,
    action_dossierpatient = 38,
    action_dupliquer = 39,
    action_enregistrer = 40,
    action_enregistrer_imprimer = 41,
    action_enregistrer_periode = 42,
    action_envoi_message = 43,
    action_envoyer = 44,
    action_epingler = 45,
    action_erreur = 46,
    action_espace_pro = 47,
    action_etat_dossier = 48,
    action_filtres = 49,
    action_filtres_inactif = 50,
    action_filtres_options_actif = 51,
    action_filtres_options_inactif = 52,
    action_flag_gris = 53,
    action_flag_rouge = 54,
    action_fleche_angle_bas_droite = 55,
    action_fleche_double_droite = 56,
    action_fleche_double_gauche = 57,
    action_fleche_simple_droite = 58,
    action_fleche_simple_gauche = 59,
    action_fractionner_ligne = 60,
    action_gomme = 61,
    action_graphique = 62,
    action_historique = 63,
    action_horaire = 64,
    action_import = 65,
    action_import_ajout = 66,
    action_importer = 67,
    action_impression_cerfa = 68,
    action_imprimer = 69,
    action_imprimer_blanc = 70,
    action_imprimer_noir = 71,
    action_inconnu = 72,
    action_info = 73,
    action_interdit = 74,
    action_lecture = 75,
    action_log = 76,
    action_masquer = 77,
    action_medecin_adresseur = 78,
    action_medecin_traitant = 79,
    action_mise_en_page = 80,
    action_modifier = 81,
    action_mssante = 82,
    action_ouvrir_boxer = 83,
    action_partage = 84,
    action_pdf = 85,
    action_periode_heures = 86,
    action_personne_copie = 87,
    action_personne = 88,
    action_planifier = 89,
    action_plier_blanc = 90,
    action_plier_bleu = 91,
    action_raccourci = 92,
    action_rafraichir = 93,
    action_rafraichir_valider = 94,
    action_rechercher = 95,
    action_rechercher_dossier = 96,
    action_rechercher_patient = 97,
    action_recycler = 98,
    action_reduire = 99,
    action_reduire_horizontal = 100,
    action_reglage = 101,
    action_reset = 102,
    action_retour = 103,
    action_rotation = 104,
    action_saisie_facture = 105,
    action_securiser_factures = 106,
    action_sortie = 107,
    action_statistiques = 108,
    action_supprimer_blanc = 109,
    action_supprimer = 110,
    action_telecharger_documents = 111,
    action_telecharger_package = 112,
    action_teletransmission = 113,
    action_transferer = 114,
    action_tri_asc = 115,
    action_tri_defaut = 116,
    action_tri_desc = 117,
    action_tri_principal_asc = 118,
    action_tri_principal_desc = 119,
    action_trois_colonnes = 120,
    action_urgent = 121,
    action_valider = 122,
    action_valider_cercle = 123,
    action_verification = 124,
    action_verification_arl = 125,
    action_verification_noemie = 126,
    action_verrouiller = 127,
    action_xls = 128,
    action_zoom_ajuster_ecran = 129,
    action_zoom_ajuster_largeur = 130,
    action_zoom_moins = 131,
    action_zoom_plus = 132,
    admin_agendas = 133,
    admin_dossier_patient = 134,
    admin_elsan = 135,
    admin_etablissement = 136,
    admin_examens = 137,
    admin_hemo = 138,
    admin_impression = 139,
    admin_maj = 140,
    admin_medicaments = 141,
    admin_outil = 142,
    admin_parametres = 143,
    admin_parametres_simple = 144,
    admin_patient = 145,
    admin_pmsi = 146,
    admin_smartdoc = 147,
    admin_soins = 148,
    admin_UF = 149,
    admin_urgences = 150,
    admin_US = 151,
    admin_user = 152,
    agenda_ajouter = 153,
    agenda_comparer = 154,
    agenda_importer = 155,
    agenda_supprimer = 156,
    agenda_synchroniser = 157,
    aide_aide = 158,
    alerte_grise = 159,
    alerte_orange = 160,
    alerte_rouge = 161,
    alerte_verte = 162,
    basics_LinkBlanc = 163,
    basics_liste_a_points_blanc = 164,
    basics_liste_a_points_noir = 165,
    basics_UX_Mobile = 166,
    basics_UX_Pc = 167,
    bdd = 168,
    carte_cartemagnetique = 169,
    courrier_modele = 170,
    courrier_modele_ajouter = 171,
    dds_bon_livraison_efs = 172,
    dds_codes_barres = 173,
    dds_destruction = 174,
    dds_destruction_etablissement = 175,
    dds_poches_attentes_reception = 176,
    dds_poches_retour_efs = 177,
    dds_poches_sorties_transfusion = 178,
    dds_quarantaine = 179,
    dds_reappro_stock_urgence = 180,
    dds_reattribution = 181,
    dds_reception = 182,
    dds_retour = 183,
    dds_sortie = 184,
    dds_stats_detaillees = 185,
    dds_stats_globales = 186,
    dds_stock_en_cours = 187,
    dds_transfusion_ajouter = 188,
    dmp_notransmission = 189,
    dmp_transmission = 190,
    document_document = 191,
    document_invalide = 192,
    document_valide = 193,
    dossier_ajouter = 194,
    dossier_lier = 195,
    droits_ajouter_profil = 196,
    droits_charger_profil = 197,
    droits_enregistrer_user = 198,
    entrepot_entrepot = 199,
    etat_administre = 200,
    etat_arrete = 201,
    etat_arrete_modification = 202,
    etat_arrete_urgent = 203,
    etat_encours = 204,
    etat_lock = 205,
    etat_non_vu = 206,
    etat_prevu = 207,
    etat_suspendu = 208,
    etat_termine = 209,
    etat_vu = 210,
    examen_anormal = 211,
    examen_reaffecter_resultat = 212,
    facture_ajouter = 213,
    facture_liste = 214,
    favori_favoriOff = 215,
    favori_favoriOn = 216,
    fleche_blanche_bas = 217,
    fleche_blanche_droite = 218,
    fleche_blanche_gauche = 219,
    fleche_blanche_haut = 220,
    fleche_bleue_bas = 221,
    fleche_bleue_droite = 222,
    fleche_bleue_gauche = 223,
    fleche_bleue_haut = 224,
    fleche_noire_bas = 225,
    fleche_noire_droite = 226,
    fleche_noire_gauche = 227,
    fleche_noire_haut = 228,
    graphiste_icone_a_creer = 229,
    horloge_alerte = 230,
    horloge_attente = 231,
    horloge_attente_blanc = 232,
    horloge_attente_orange = 233,
    horloge_chrono = 234,
    horloge_duree = 235,
    lang_ca = 236,
    lang_de = 237,
    lang_fr = 238,
    lang_en = 239,
    lang_es = 240,
    liste_a_points = 241,
    liste_a_points_noir = 242,
    liste_annuler = 243,
    liste_coches = 244,
    liste_enregistrer = 245,
    liste_importer = 246,
    liste_simple = 247,
    logo_elive = 248,
    logo_guacamole_francisco_de_mexico = 249,
    medicament_pharmacie = 250,
    menu_calendrier = 251,
    menu_informations = 252,
    menu_intervention = 253,
    menu_troispoints = 254,
    menu_tuile_retour = 255,
    menu_tuile_vuedeservice = 256,
    nettoyer_balai = 257,
    niveau_niveau1 = 258,
    niveau_niveau2 = 259,
    niveau_niveau3 = 260,
    niveau_niveau4 = 261,
    periodicite_casse = 262,
    periodicite_jour = 263,
    periodicite_mois = 264,
    periodicite_semaine = 265,
    pharmacien_delai_depasse = 266,
    phonetique_off = 267,
    phonetique_on = 268,
    surveillance_surveillance = 269,
    tableau_version_1_tableau = 270,
    tableau_version_2_tableau = 271,
    tableau_version_3_tableau = 272,
    user_dossier = 273,
    user_ensemble = 274,
    user_seul = 275,
    user_sexe_feminin = 276,
    user_sexe_feminin_blanc = 277,
    user_sexe_indetermine = 278,
    user_sexe_indetermine_blanc = 279,
    user_sexe_masculin = 280,
    user_sexe_masculin_blanc = 281,
    user_user = 282,
    vide_vide = 283,
    websuite_logo = 284,
    xxCheckBox_checked_defaut = 285,
    xxCheckBox_checked_defaut_disabled = 286,
    fleche_select = 287,
    xxListChoix_defaut = 288,
    xxListChoix_tous = 289,
    xxRouteContainer_FavoriOff = 290,
    xxRouteContainer_FavoriOn = 291,
    xxRouteContainer_Fermer = 292,
    xxRouteContainer_Filariane = 293,
    xxRouteContainer_Home = 294,
    xxRouteContainer_MenuPerso = 295,
    xxRouteContainer_Partager = 296,
    xxRouteContainer_Refresh = 297,
    xxRouteContainer_Remonter = 298,
    xxRouteContainer_Retour = 299,
    xxRouteContainer_SwitchMenuOff = 300,
    xxRouteContainer_SwitchMenuOn = 301,
    xxTableau_config_colonnes = 302,
    xxTableau_FlecheBas = 303,
    xxTableau_FlecheBottom = 304,
    xxTableau_FlecheHaut = 305,
    xxTableau_FlecheTop = 306,
    xxVolet_bas = 307,
    xxVolet_droite = 308,
    xxVolet_gauche = 309,
    xxVolet_haut = 310
}
declare abstract class Icone implements iXElement {
    abstract getClasse(): string;
    abstract getTypeIcone(): string;
    abstract getValeurIcone(): any;
    abstract addClass(s: string): any;
    abstract removeClass(s: string): any;
    abstract get y(): HTMLElement | SVGElement;
}
declare class IconeV2 extends Icone {
    private catalogue;
    private nomIcone;
    private classeComplete;
    private elem;
    constructor(def: {
        catalogue: 'cs3i' | 'miniCs3i' | 'externe';
        nomIcone: string;
    }, o?: OptionsIconeExterne);
    getClasse(): string;
    getValeurIcone(): string | number;
    getTypeIcone(): string;
    addClass(s: string): xElement;
    removeClass(s: string): xElement;
    get y(): HTMLElement;
}
declare class IconeCs3i extends IconeV2 {
    private inType;
    constructor(inType: enumIconeCs3i | enumIconeAction, o?: OptionsIconeExterne);
    getValeurIcone(): enumIconeCs3i | enumIconeAction;
    getTypeIcone(): string;
}
declare class IconeMiniCs3i extends IconeV2 {
    static getIconeLang(lang: string): IconeMiniCs3i;
    private inType;
    /**
     * @deprecated A ne plus utiliser : préférer new IconeCs3i.
     */
    constructor(inType: enumIconeCs3i, o?: OptionsIconeExterne);
    getValeurIcone(): enumIconeCs3i;
    getTypeIcone(): string;
}
declare enum tailleIcone {
    M = 0,
    S = 1,
    L = 2,
    XS = 3,
    XL = 4,
    Custom = 5,
    XXS = 6
}
interface OptionsIconeExterne {
    taille?: tailleIcone;
    modeGrise?: boolean;
    couleurCustom?: string;
    widthCust?: number;
    heightCust?: number;
}
declare class IconeExterne extends IconeV2 {
    constructor(inClasse: string, o?: OptionsIconeExterne);
    getValeurIcone(): string | number;
    getTypeIcone(): string;
}
interface OptionIconeTypeExamen {
    classEtat: string;
    urlImgTypeExamen: string;
    abreviationTypeExamen: string;
}
declare class IconeTypeExamen extends Icone {
    private classEtat;
    private urlImgTypeExamen;
    private abreviationTypeExamen;
    private elem;
    addClass(s: string): xElement;
    removeClass(s: string): xElement;
    constructor(inOpt: OptionIconeTypeExamen);
    getValeurIcone(): OptionIconeTypeExamen;
    getTypeIcone(): string;
    getClasse(): string;
    get y(): HTMLElement;
}
declare enum enumListeIcones {
    svg = 0,
    tuiles = 1
}
declare enum enumIconeSvg {
    actualiser = 1,
    age = 2,
    ajouter = 3,
    alerte = 4,
    appareil_photo = 5,
    calendrier = 6,
    chevron_bas = 7,
    chevron_droite = 8,
    chevron_gauche = 9,
    croix = 10,
    document = 11,
    dossier = 12,
    editer_colonnes = 13,
    favori = 14,
    filtrer = 15,
    fleche_droite = 16,
    home = 17,
    horaire = 18,
    image = 19,
    imprimer = 20,
    informations = 21,
    liste = 22,
    lit = 23,
    menu_burger = 24,
    modifier = 25,
    observation = 26,
    partager = 27,
    qr_code = 28,
    recherche = 29,
    sauvegarder = 30,
    sexe_femme = 31,
    sexe_homme = 32,
    sexe_neutre = 33,
    statistiques = 34,
    supprimer = 35,
    traduction = 36,
    user = 37,
    upload = 38,
    validation = 39,
    valider = 40,
    verrouille = 41,
    associer = 42,
    etablissement = 43,
    modules = 44,
    banette = 45,
    cercle = 46,
    carre = 47,
    telephone = 48,
    drapeau = 49,
    coller = 50,
    geolocalisation = 51,
    maison = 52,
    administration = 53,
    flag = 54,
    recherche_document = 55,
    micro = 56,
    troispoints = 57,
    punaise = 58,
    envoyer_mail = 59,
    sms = 60,
    sollicitation = 61,
    main_levee = 62,
    fusion = 63,
    fiche_administrative = 64,
    sollicitation_pleine = 65,
    facture = 66,
    ajouter_rond = 67,
    suspendre = 68,
    play = 69,
    plus = 70,
    prise = 71,
    demandeavis = 72,
    demandeavis_pleine = 73,
    reprendre = 74,
    download = 75,
    moins = 76,
    chevron_haut = 77,
    troispoints_horizontaux = 78,
    chaise = 79,
    drapeau_medecin = 80,
    sollicitation_ajout = 81,
    demandeavis_ajout = 82,
    liste_simple = 83,
    lit_retour = 84,
    cercle_pointilles = 85,
    cercle_pointexclamation = 86,
    annuler_action = 87,
    prises_connectees = 88,
    prises_deconnectees = 89,
    incident_interne_externe = 90,
    materiel = 91,
    visualiser = 92,
    bdd = 93,
    liste_choix_tous = 94,
    historique = 95,
    dupliquer = 96,
    baguette_magique = 97,
    pdf = 98,
    user_ensemble = 99,
    attente = 100,
    copier = 101,
    couper = 102,
    logo_elive = 112
}
declare enum enumIconeEmedSvg {
    soins = 10001,
    perfusions = 10002,
    posologie = 10003,
    prolonger = 10004,
    suspendre = 10005
}
declare enum enumIconeTuile {
    AdmiEmed = 20001,
    AideEmed = 20002,
    ClassementDocEmed = 20003,
    DonSangEmed = 20004,
    DossierConsultEmed = 20005,
    GestionBlocEmed = 20006,
    ParametreEmed = 20007,
    InternetEmed = 20008,
    ConsultationPatient = 20009,
    ConsultationDossier = 20010,
    TableauDeBord = 20011,
    RechercheRapide = 20012,
    Delegues = 20013,
    Dispensation = 20014,
    SupportEmed = 20015,
    AppelContextuelPrescription = 20016,
    AppelContextuelPrescriptionLectureSeule = 20017,
    AppelContextuelAdmission = 20018,
    AppelContextuelAdmissionLectureSeule = 20019,
    EmedPatientConnect = 20020,
    Recherche = 20021,
    RechercheMedicament = 20022,
    Statistiques = 20023,
    VueJournee = 20024,
    MenuTuiles = 20025,
    SuiviPubliDocs = 20026,
    BlocCommerce = 20027,
    ValidationPharma = 20028,
    GestionIncoherences = 20029,
    InstallElive = 20030
}
interface multicoloreSVG {
    couleurIconeComplete?: enumCouleur;
    couleurPrincipale?: enumCouleur;
    couleurSecondaire?: enumCouleur;
    couleurTertiaire?: enumCouleur;
    couleurFond?: enumCouleur;
}
declare enum enumFormeFondIconeSvg {
    carre = "carre",
    rond = "rond",
    bordsArrondis = "bordsArrondis"
}
interface OptionsIconeSVG extends OptionsIconeExterne {
    couleurSvg?: multicoloreSVG;
    epaisseurTrait?: number;
    formeFond?: enumFormeFondIconeSvg;
}
declare class IconeSvg extends Icone {
    private inType;
    private couleurSvg;
    addClass(s: string): void;
    removeClass(s: string): void;
    svg: xSVG;
    constructor(inType: enumIconeSvg | enumIconeEmedSvg | enumIconeTuile, o?: OptionsIconeSVG);
    /**
     * Permet de récupérer le xSVG correspondant à une enum;
     * @param type
     * @param o
     */
    private getSVG;
    getClasse(): string;
    get y(): SVGElement;
    getValeurIcone(): enumIconeSvg | enumIconeEmedSvg | enumIconeTuile;
    getTypeIcone(): string;
    setCouleur(couleur: enumCouleur): Icone;
}
declare enum enumIconeTuile {
    adminEmed = 0
}
declare class IconeTuile extends Icone {
    private inType;
    svg: xSVG;
    constructor(inType: enumIconeTuile, o?: OptionsIconeSVG);
    /**
     * Permet de récuppérer le xSVG correspondant a une enum;
     * @param type
     * @param taille
     * @param width
     * @param height
     */
    private getSVG;
    getClasse(): string;
    getValeurIcone(): enumIconeTuile;
    getTypeIcone(): string;
    addClass(s: string): void;
    removeClass(s: string): void;
    get y(): SVGElement;
}
declare enum enumTypeOrientation {
    horizontal = "orientation_horizontale",
    vertical = "orientation_verticale"
}
declare enum enumPosition {
    Left = 0,
    Right = 1,
    Top = 2,
    Bottom = 3
}
declare enum enumCouleur {
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
declare enum enumCouleurHexa {
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
declare enum enumVisibility {
    afficher = 0,
    masquer = 1,
    masquerAvecCollapse = 2
}
declare class Visibility {
    static converterToBool(a: enumVisibility): boolean;
    static converterFromBool(b: boolean): enumVisibility;
}
declare enum enumThemes {
    ThemeDefaut = "tdef",
    ThemeLegacy = "tleg",
    Theme2020 = "t20"
}
declare enum enumThemeLuminosite {
    LightTheme = "lm",
    DarkTheme = "dm"
}
declare enum enumStyleBorderCSS {
    solid = "solid",
    dashed = "dashed",
    sotted = "doted"
}
declare enum enumCurseur {
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
interface OptionsCotesCSS {
    Tous?: number;
    HautEtBas?: number;
    GaucheEtDroite?: number;
    Haut?: number;
    Bas?: number;
    Gauche?: number;
    Droite?: number;
}
interface OptionTailleCss {
    px?: number;
    pourcentage?: number;
    view_width?: number;
}
interface optionsAffichage {
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
declare type xConfig = {
    langDictionaryUrl: string;
    langDictionaryData?: Dictionnaire<string>;
    missingTranslationCallback: (val: string, commentaire: string) => void;
    debugAddTranslationCallback: (val: string) => void;
    jsDependencyPath: string;
    theme?: () => enumThemes;
    themeluminosite?: () => enumThemeLuminosite;
} | {
    langDictionaryUrl?: string;
    langDictionaryData: Dictionnaire<string>;
    missingTranslationCallback: (val: string, commentaire: string) => void;
    debugAddTranslationCallback: (val: string) => void;
    jsDependencyPath: string;
    theme?: () => enumThemes;
    themeluminosite?: () => enumThemeLuminosite;
};
interface iTestable {
    idTest?: string;
}
interface OptionsHtml extends iTestable {
    id?: string;
    class?: string;
    name?: string;
    click?: (e?: MouseEvent) => void;
    tabindex?: number;
    autocomplete?: 'on' | 'off';
    privateForceElement?: HTMLDivElement;
    drag?: {
        dragKey?: () => string;
        drop?: (key: string) => void;
        dropAction?: 'deplacement' | 'copie' | 'lien';
    };
}
interface iXElement {
    y: HTMLElement | SVGElement;
}
interface iXElementHolderEnable {
    asHolder: iXElementHolder;
}
interface iXElementHolder extends iXElement {
    append(ajout: iXElement): iXElementHolder;
    appendMany(ajouts: iXElement[]): iXElementHolder;
    empty(): iXElementHolder;
    vider(): iXElementHolder;
    addClass(s: string): iXElementHolder;
    hasClass(s: string): boolean;
    toggleClass(s: string): iXElementHolder;
    removeClass(s: string): iXElementHolder;
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
declare class DictionnaireUtils {
    static getDicoFromArray<T>(tab: T[], keyMaker: (t: T) => string): Dictionnaire<T>;
    static getData<T>(dico: Dictionnaire<T>): T[];
}
interface Dictionnaire<T> {
    [x: string]: T;
}
interface CleValeur<T, U> {
    cle: T;
    valeur: U;
}
declare class Container<T> {
    content: T;
    constructor();
}
declare class Arbre<T> {
    private valeur;
    get Valeur(): T;
    set Valeur(val: T);
    enfants: Dictionnaire<Arbre<T>>;
    get EnfantsAsArray(): Arbre<T>[];
    constructor(a: T);
    getEnfant(t: T): Arbre<T>;
    getEnfants(chemin?: T[]): Arbre<T>[];
    /**
     * ajouter un enfant et retourne l'enfant
     * @param a
     */
    ajouterEnfant(a: T): Arbre<T>;
}
declare class xClass {
    static config: xConfig;
    static localConfig: xConfigPage;
    static get debugMode(): boolean;
    static get Theme(): enumThemes;
    static get ThemeLuminosite(): enumThemeLuminosite;
}
interface iCacheGeneric<T> {
    dicoNePasInitiliaser?: T;
    promesseNePasInitiliaser?: Promise<T>;
    nomVariableUnique: string;
    chargeurSimple: (p: xxPageWrapper) => Promise<T>;
}
declare class xCache {
    private static getVariable;
    private static setVariable;
    private static deleteVariable;
    static getFromSession<T>(item: string): T;
    static setFromSession<T>(item: string, valeur: T): void;
    static genericCache<T>(/* nom unique à donner pour pouvoir stocker les données du cache*/ nomVar: string, chargeur: (page: xxPageWrapper) => Promise<T>, getterLocal: () => T, setterLocal: (t: T) => void, inPage: xxPageWrapper): Promise<T>;
    static resetDico(nomVariableUniqueDico: string): void;
    static getDicoWithDelete<T>(paramsDico: iCacheGeneric<T>, page: xxPageWrapper): {
        data: Promise<T>;
        reset: () => void;
    };
    static getDico<T>(paramsDico: iCacheGeneric<T>, page: xxPageWrapper): Promise<T>;
    private static _dicoRessource;
    static get dicoRessources(): Dictionnaire<string>;
    static _debugMode: boolean;
    static get debugMode(): boolean;
    static setTraductionManquante(val: string, commentaire: string): void;
}
declare function cacherxElements(j: iXElement, collapse?: boolean): void;
declare function afficherxElements(j: iXElement): void;
declare function viderxElements(j: iXElement): void;
declare function assignerObjet<T>(target: T, source: T): T;
declare function GetDateTimeFromFrenchDateString(date: string): Date;
declare function xRequire(urlJson: string): any;
declare class xTime {
    constructor(hr: number, min: number);
    parse(inStr: string): void;
    private minutes;
    get Minutes(): number;
    set Minutes(min: number);
    private heures;
    get Heures(): number;
    set Heures(hr: number);
    getString(): string;
    get TotalMinutes(): number;
}
/**
 * Classe pour gérer la localisation des strings
 */
declare class xLString {
    private _text;
    private code;
    get text(): string;
    constructor(inVal: string);
    format(variables: (string | number)[]): string;
}
declare class xElementHolder implements iXElementHolder {
    private _y;
    constructor(elem: iXElement);
    cacher(collapse?: boolean): xElementHolder;
    get y(): HTMLElement;
    afficher(): xElementHolder;
    appendMany(ajouts: iXElement[]): xElementHolder;
    append(ajout: iXElement): xElementHolder;
    empty(): xElementHolder;
    vider(): xElementHolder;
    addClass(s: string): xElementHolder;
    hasClass(s: string): boolean;
    setAttribute(nom: string, valeur: string): void;
    getAttribute(nom: string): string;
    toggleClass(s: string, force?: boolean): xElementHolder;
    removeClass(s: string): xElementHolder;
    static fromHtmlElement(h: HTMLElement): iXElementHolder;
    static fromSVGElement(h: SVGElement): iXElementHolder;
    xxList<T>(o: OptionsList<T>, outElement?: Container<xxListWrapper<T>>): iXElementHolder;
    xxZoneModulable(o: OptionZoneModulable, outElement?: Container<xxZoneModulable>): xElementHolder;
    xxTreeTabControl(o: OptionsTreeTabControl, outElement?: Container<xxTreeTabControl>): this;
    xxTabControl(o: OptionsTabControl): xElementHolder;
    xxAutoComplete<T>(o: OptionsAutoComplete<T>): xElementHolder;
    xxMenu(o: OptionsMenu): xElementHolder;
    xxListChoix(o: OptionsSelect): xElementHolder;
    xul(o: OptionsHtml, outElement?: Container<xUl>): xElementHolder;
    xxListeChoixLang(o: OptionsListeChoixLang, outElement?: Container<xxListeChoixLang>): xElementHolder;
    xinputCheckBox(o: OptionsInputCheckBox, outElement?: Container<xInputCheckBox>): xElementHolder;
    xxTableau<T>(o: OptionsTableau<T>, outElement?: Container<xxTableauWrapper<T>>): xElementHolder;
    xxStackPanel(o: OptionsStackPanel, outElement?: Container<xxStackPanel>): xElementHolder;
    xxDockPanelDeprecated(o: OptionsxxDockPanel, outElement?: Container<xxDockPanelDeprecated>): xElementHolder;
    xinputDateAndTime(o: OptionsInputDateAndTime): xElementHolder;
    xdiv(o: OptionsDiv, outElement?: Container<xDiv>): xElementHolder;
    xxRadioButton<T>(o: OptionsRadioButton<T>, outElement?: Container<xxRadioButton<T>>): xElementHolder;
    xxCheckBox(o: OptionsInputCheckBox, outElement?: Container<xxCheckBox>): xElementHolder;
    xxLabel(o: OptionsLabel, outElement?: Container<xxLabel>): xElementHolder;
    xinputText(o: OptionsInput, outElement?: Container<xInputText>): xElementHolder;
    xxInputIntellisense(o: OptionsInputIntellisense, outElement?: Container<xxInputIntellisense>): xElementHolder;
    xinputDate(o: OptionsInputDate): xElementHolder;
    xxBouton(o: optionButton, outElement?: Container<xxBouton>): xElementHolder;
    xxLabelModifiable(o: OptionsLabelModifiable): xElementHolder;
    xxLabelContainer(o: OptionsLabelContainer, outElement?: Container<xxLabelContainer>): xElementHolder;
    xxWrapPanel(o: OptionsWrapPanel, outElement?: Container<xxWrapPanel>): xElementHolder;
    xspan(o: OptionsSpan, outElement?: Container<xSpan>): xElementHolder;
    xxToolTip(o: OptionsToolTip): xElementHolder;
    xxRecorder(o: OptionsRecorder): xElementHolder;
    xxArbre<T>(o: IOptionsxxArbre<T>): xElementHolder;
    xxIMC(o: OptionsIMC): xElementHolder;
    xxPage(o: OptionsPage, outElement?: Container<xxPageWrapper>): xElementHolder;
}
declare class xElement implements iXElement {
    private elem;
    get y(): HTMLElement;
    width(parame?: string | number): void | number;
    height(parame?: string | number): void | number;
    hasClass(c: string): boolean;
    addClass(c: string): xElement;
    cacher(collapse?: boolean): void;
    afficher(): void;
    static setCouleurFondAvecContrasteTexteAuto(element: iXElement, couleurFondADefinir: string): void;
    removeClass(c: string): xElement;
    toggleClass(classe: string, etatPlie?: boolean): xElement;
    private static isChildOf;
    private _dropActive;
    constructor(typeElementBase: 'input' | 'span' | 'div' | 'br' | 'canvas' | 'textarea' | 'table' | 'iframe' | 'select' | 'option' | 'ul' | 'li' | 'a' | 'img' | 'audio' | 'style', options: OptionsHtml);
}
declare class xElementsFramework {
    static getImages: () => Promise<dicoImagesXElement>;
}
/**
 * Constantes
 */
declare var days: string[];
declare var months: string[];
/**
*  Surcharge des membres statiques de l'objet Date
*  Declaration
*/
interface DateConstructor {
    diffEntreDeuxDates(date1: Date, date2: Date): Date;
}
/**
*  Surcharge des methodes de l'objet Date
*  Declaration
*/
interface Date {
    addSeconds(seconds: number): Date;
    addMinutes(minutes: number): Date;
    addHours(hours: number): Date;
    addDays(days: number): Date;
    addWeeks(weeks: number): Date;
    addMonths(months: number): Date;
    addYears(years: number): Date;
    totalSeconds(): number;
    totalMinutes(): number;
    totalHours(): number;
    format(format: 'mm/yy' | 'HH:mm' | 'dd/mm/yy' | 'yyyy-MM-ddTHH:mm:ss' | 'dd/MM/yyyy HH:mm'): string;
    getDayName(): string;
    getMonthName(): string;
    getWeekNumber(): number;
    toLocaleStringCS3I(): string;
    toLocaleDateStringCS3I(): string;
    toLocalDateStringCompleteCS3I(): string;
}
declare class __DateSerialisable {
    MaDateLong: number;
}
declare class __Dictionnaire {
}
declare class DateSerialisable extends __DateSerialisable {
    /**
    * Permet de recuperer la date actuelle en DateSerialisable
    */
    static getXTime(date: DateSerialisable): xTime;
    /**
    * Permet de recuperer la date actuelle en DateSerialisable
    */
    static Now(): DateSerialisable;
    /**
    * Permet de recuperer la date actuelle en DateSerialisable sans les informations de temps (ex:23/02/1985 00:00:00)
    */
    static NowWithoutTime(): DateSerialisable;
    static DateWithoutTime(date: DateSerialisable): DateSerialisable;
    static Factory(inDate?: Date): DateSerialisable;
    static getDate(d: DateSerialisable): Date;
    static getDateByLong(d: number): Date;
    static FactoryByLong(maDateSerialisableLong: number): DateSerialisable;
    static FactoryByNumber(annees: number, mois: number, jours?: number, heures?: number, minutes?: number, secondes?: number, millisecondes?: number): DateSerialisable;
    static FactoryByFrenchDateString(maDateString: string): DateSerialisable;
    static CopyDateSerialisable(dateSerialisable: DateSerialisable): DateSerialisable;
    static CopyDateSerialisableSansHeure(dateSerialisable: DateSerialisable): DateSerialisable;
    static setDate(d: DateSerialisable, inDate: Date): void;
    static setJourAnneeMois(date: DateSerialisable, annees: number, mois: number, jours: number): DateSerialisable;
    static setHeures(date: DateSerialisable, heures: number, minutes: number, secondes: number, milliseconde: number): DateSerialisable;
    /**
    *  Ajoute X minutes a la date
    */
    static addMinutes(date: Date, minutes: number): Date;
    /**
    *  Ajoute X minutes a la date
    */
    static addMinutesDateSerialisable(date: DateSerialisable, minutes: number): DateSerialisable;
    /**
    *  Modifie l'heure d'une date pour lui transmettre l'heure calculée depuis minuit selon le nombre de minutes passé en paramètre.
    */
    static setTimeDateSerialisable(date: DateSerialisable, totalMinutes: number): DateSerialisable;
    /**
    *  Ajoute X heures a la date
    */
    static addHoursDateSerialisable(date: DateSerialisable, hours: number): DateSerialisable;
    /**
    *  Ajoute X heures a la date
    */
    static addHours(date: Date, hours: number): Date;
    /**
    *  Ajoute X jours a la date
    */
    static addDays(date: Date, days: number): Date;
    static addDaysSerialisable(date: DateSerialisable, days: number): DateSerialisable;
    static addMonthDateSerialisable(date: DateSerialisable, months: number): DateSerialisable;
    static addWeekDateSerialisable(date: DateSerialisable, weeks: number): DateSerialisable;
    /**
     * Retourne la date du dernier jour du mois d'une date.
     * @param date
     */
    static getDernierJourMois(date: DateSerialisable): DateSerialisable;
    /**
     * Retourne le premier
     * @param date
     */
    static getPremierJourSemaine(date: DateSerialisable): DateSerialisable;
    /**
    *   Cette méthode permet de retourner une DateSerialisabe sous forme de string localisée sans les secondes.
    *   ex: 06/08/1999 à 11h25
    */
    static tolocalStringWithoutSeconds(Date: DateSerialisable, AvecTiret?: boolean): string;
    /**
   *   Cette méthode permet de retourner une DateSerialisabe sous forme de string localisée sans les secondes.
   *   ex: 06/08/1999 à 11h25
   */
    static tolocalStringMoisAnnee(Date: DateSerialisable): string;
    /**
    *   Cette méthode permet de retourner l'heure et les minutes d'un date serialisable passée en paramètres ex: 15h57
    */
    static tolocalstringHeureMinute(Date: DateSerialisable): string;
    /**
    * renvoie une date au format complet (ex: jeudi 23 février 2020)
    */
    static toLocalDateStringComplete(Date: DateSerialisable): string;
    /**
    *   Cette méthode permet de retourner une DateSerialisabe sous forme de string localisée sans heures/minutes/secondes , seulement la date
    *   ex: 06/08/1999
    */
    static tolocalStringOnlyDate(Date: DateSerialisable): string;
    static ToStringDateHeure(d: DateSerialisable): string;
    /**
    *   Cette méthode permet de retourner une DateSerialisabe sous forme de string norme ISO 8601 -> YYYYMMDD_HHMMSS
    *   ex: 19990806_115025 = 06/08/1999 11:50:25
    */
    static ToStringForNameFile(d: DateSerialisable): string;
    /**
     * Cette méthode permet de retourner un Dictionnaire représentant la différence entre deux DateSerialisable.
     * Liste des clés :
     * -anne
     * -mois
     * -jour
     * -heure
     * -minute
     * -seconde
     */
    static DateDiff(Date1: DateSerialisable, Date2: DateSerialisable, withTime?: boolean): {
        seconde?: number;
        minute?: number;
        heure?: number;
        jour?: number;
        mois?: number;
        annee?: number;
    };
    static DateDiffTheoriqueSansHeureMinute(Date1: DateSerialisable, Date2: DateSerialisable): {
        seconde?: number;
        minute?: number;
        heure?: number;
        jour?: number;
        mois?: number;
        annee?: number;
    };
    static DateDiffValue(Date1: DateSerialisable, Date2: DateSerialisable, withTime?: boolean): number;
    static DateDiffValueTheoriqueSansHeureMinute(Date1: DateSerialisable, Date2: DateSerialisable): number;
    /**
    *   Cette méthode permet d'avoir la différence en minutes entre 2 dates
    *   Date1 - Date2
    */
    static getDifferenceEnMinutes(date1: DateSerialisable, date2: DateSerialisable): number;
    /**
    *   Cette méthode permet de Comparer deux DateSerialisable , si une DateSerialisable est null, elle sera considérée comme plus petite
    *   1 => Date1 > Date2
    *   0 => Date1 = Date2
    *   -1 => Date1 < Date2
    */
    static CompareDate(Date1: DateSerialisable, Date2: DateSerialisable): number;
    static getWeekByDate(dateJ: Date): number;
    static getWeek(date: DateSerialisable): number;
    static getPremierJourDuMois(date: DateSerialisable): DateSerialisable;
    static calculDateFromIntervalleAndDaysToCount(dateDeb: DateSerialisable, jourACompter: string, intervalle: number): DateSerialisable;
    /**
     * cette fonction retourne un numero correspondant au jour de la semaine suivant l'ordre suivant:
     *  lundi = 1... dimanche = 7
     * @param date
     * @returns
     */
    static getIndexJourSemaine(date: DateSerialisable): number;
    static getHeures(date: DateSerialisable): number;
    static getMinutes(date: DateSerialisable): number;
    static getMois(date: DateSerialisable): number;
    static getAnnees(date: DateSerialisable): number;
    static getJours(date: DateSerialisable): number;
    static getSecondes(date: DateSerialisable): number;
    static getNomMois(date: DateSerialisable): string;
    static getUTCDate(date: DateSerialisable): number;
    static getUTCMois(date: DateSerialisable): number;
    static getUTCAnnees(date: DateSerialisable): number;
    private static getDatePaques;
    static getJoursFeries(year: number): DateSerialisable[];
}
declare class HelperGeneric {
    static IsDateSerialisable(a: any): a is DateSerialisable;
    static IsDate(a: any): a is Date;
    static CompareGeneric(a: string | boolean | number | DateSerialisable | Date, b: (string | boolean | number | DateSerialisable | Date)): number;
}
declare class CelluleMoisJour implements iXElement {
    private _div;
    private _dateJour;
    private _stackRdvs;
    private _rdvs;
    private _renderRdv;
    constructor(clickSurJour: (date: DateSerialisable) => void, dateCellule: DateSerialisable, RenderRdv: (rdv: PlanningRdv) => xxGrid | xxToolTip | xxLabel | xxWrapPanel | xxStackPanel | xDiv);
    get y(): HTMLElement;
    supprimerAllRdvs(): void;
    isDate(maDate: DateSerialisable): boolean;
    AjouterRdvs(rdvs: PlanningRdv[]): void;
    SupprimerRdvs(rdvs: PlanningRdv[]): void;
    GetAllRendezVous(): PlanningRdv[];
}
interface optionPlanningColonne {
    listeRDV: PlanningRdv[];
    Date: DateSerialisable;
    HeureDebut?: number;
    HeureFin?: number;
    Dispos?: PlanningDisponibilite[];
    ClickSurRdv?: (data: PlanningRdv) => void;
    RightClickOnRdv?: (data: PlanningRdv) => void;
    RightClickOnGrid?: (data: PlanningRdv) => void;
    RenderRightClickRdv?: (data: PlanningRdv, place: iXElementHolder, tooltip: xxMenuContextuel) => void;
    RenderRightClickGrid?: (data: PlanningRdv, place: iXElementHolder, tooltip: xxMenuContextuel) => void;
    ClickSurEnteteColonne?: (div: iXElement, rdv: PlanningColonne) => void;
    ClickSurDispoBarre?: (dispo: PlanningDisponibilite) => void;
    RenderRdv?: (rdv: PlanningRdv) => iXElement;
    RenderColonne?: (infoColonne: PlanningColonne) => iXElement;
    TimeLineNow?: boolean;
    RdvEnCours?: (heureTimeLine: DateSerialisable, rdvEnCours: PlanningRdv, rdvsSuivants: PlanningRdv[], refreshColonne: () => void) => void;
    ZoomChoisi: BindableObject<number>;
    Ressource?: PlanningRessource;
    Planning: xxPlanning;
    AgrandirRdv?: optionAgrandirRdv;
    DragAndDropRdv?: optionDragAndDropRdv;
    AddRdvOnClick?: optionAddRdvOnClick;
}
declare class PlanningColonne implements iXElement {
    private Planning;
    private GridPrincipale;
    private HeureDebut;
    private HeureFin;
    DateColonne: DateSerialisable;
    private TimeLine;
    private RdvEnCours;
    NbColonnes: number;
    private NbLignes;
    private GridItemTime;
    private RdvsColonne;
    private DisposColonne;
    private RenderRdv;
    private RenderColonne;
    private ClickSurEnteteColonne;
    private ClickSurRdv;
    private RightClickSurRdv;
    private RightClickOnGrid;
    private RenderRightClickRdv;
    private RenderRightCLickGrid;
    private ClickSurDispoBarre;
    private AvecDispoBarre;
    private dragAndDropRdv;
    private AvantDeplacement;
    private ApresDeplacement;
    private DureeMin?;
    private RenderDivCurseur;
    Ressource: PlanningRessource;
    private ZoomChoisi;
    private DispoBlocMax;
    private AgrandirRDV;
    private RdvsADeplacer;
    private ApresAgrandissement?;
    private AvantAgrandissement?;
    private rdvAvantAgrandissement;
    private diffEnCours;
    private GridItemLibelle;
    ON_MOUSE_MOUVE_AGRANDISSEMENT: (e: MouseEvent) => void;
    static CLASS_CSS_AGRANDISSEMENT_EN_COUR: string;
    static CLASS_CSS_DRAG_EN_COUR: string;
    static ClASS_CSS_AGRANDISSEMENT_HAUT: string;
    static CLASS_CSS_AGRANDISSEMENT_BAS: string;
    private AddRdvOnClick;
    width(parame?: string): void | number;
    height(parame?: string): void | number;
    get y(): HTMLElement;
    constructor(option: optionPlanningColonne);
    private createGrid;
    private listegriditem;
    private static nbId;
    private creerGridItem;
    private createLibelleColonne;
    private creerTimeLine;
    /**
     * Se fait uniquement si la méthode rdv depasses est implementer
     * @param dateTimeLine
     */
    private checkDepassement;
    private refreshRdv;
    private creerDipo;
    private checkDispoBarre;
    private creerRdv;
    private setItemRdv;
    private renderContenuRdv;
    private getNombreColonne;
    private calculerPosition;
    private calculerColonneRdv;
    private calculerColonneDispo;
    private getStringJour;
    ajouterRdv(rdvs: PlanningRdv[]): void;
    ajouterDispos(dispos: PlanningDisponibilite[]): void;
    supprimerRdv(rdvs: PlanningRdv[]): void;
    supprimerDispos(dispos: PlanningDisponibilite[]): void;
    supprimerAllDispos(): void;
    supprimerAllRdvs(): void;
    private getRendezVousByClick;
    private getRendezVousPrevusualiserByClick;
    private ajouterRdvByClick;
    private deplacerRdvByDragAndDrop;
    private changerDateRdv;
    private agrandirRdvByDeplacement;
    getPositionByEvent(event: MouseEvent, fromDragAndDrop: boolean): number[];
    getPositionAgrandissementByEvent(event: MouseEvent, isDateDebut: boolean): number[];
    private getMinutePourPositionSouris;
    private setTimeToDate;
    ajouterClass(nomClass: string): void;
    supprimerClass(nomClass: string): void;
    private eventMouseUp;
    getRendezVous(): PlanningRdv[];
    getDisponibilites(): PlanningDisponibilite[];
    ajouterRdvPrevisualisation(item: xxGridItem): void;
    supprimerRdvPrevisualisation(item: xxGridItem): void;
    changementPasHorraire(pas: number): void;
    changementDureeRdvDefaut(duree: number): void;
}
declare enum enumTypeDispo {
    Planning = 0,
    Barre = 1,
    Bloc = 2
}
declare class PlanningRdv {
    Id: number;
    IdExterne: number;
    IdExterne2: number;
    Libelle: string;
    DateDebut: DateSerialisable;
    DateFin: DateSerialisable;
    Couleur: string;
    IsRdvCompared: boolean;
    Ressource: number;
    Class: string;
    Item: xxGrid | xxToolTip | xxLabel | xxWrapPanel | xxStackPanel | xxGridItem | xDiv;
    DureeMin: number;
    isAggrandisable: boolean;
    isDeplacable: boolean;
    constructor(libelle: string, id: number, idExterne?: number, IdExterne2?: number, debut?: DateSerialisable, fin?: DateSerialisable, ressources?: number, couleur?: string, Class?: string, isAggrandisable?: boolean, isDeplacable?: boolean, isRdvCompared?: boolean);
    renderRdv(): iXElement;
    Contains(rdv: PlanningRdv): boolean;
    AddClassCss(classCss: string): void;
    RemoveClassCss(classCss: string): void;
}
declare class PlanningRessource {
    Libelle: string;
    Id: number;
    constructor(libelle: string, id: number);
}
declare class PlanningDisponibilite {
    Id: string;
    Libelle: string;
    IdRessource: string;
    DateDebut: DateSerialisable;
    DateFin: DateSerialisable;
    Couleur: string;
    Item: xxGridItem;
    Type: enumTypeDispo;
    Position: number;
    constructor(Libelle: string, Id: string, Debut: DateSerialisable, Fin: DateSerialisable, Couleur?: string, type?: enumTypeDispo, IdRessource?: string, Position?: number);
    renderDispo(): iXElement;
    Contains(dispo: PlanningDisponibilite): boolean;
}
declare class PlanningParamUser {
    KeyPlanning: string;
    Zoom?: number;
    Arrondissement?: number;
    DureeRdv?: number;
    PrevisualisationRdv?: boolean;
    constructor(KeyPlanning: string, zoom?: number, arrondissement?: number, dureeRdv?: number, previsualisationRdv?: boolean);
}
interface optionPlanningBase {
    Rdv?: PlanningRdv[];
    DateDebut?: DateSerialisable;
    HeureDebut?: number;
    HeureFin?: number;
    Dispo?: PlanningDisponibilite[];
    ClickSurRdv?: (data: PlanningRdv) => void;
    ClickSurEnteteColonne?: (div: iXElement, rdv: PlanningColonne) => void;
    ClickSurDispoBarre?: (dispo: PlanningDisponibilite) => void;
    RenderRdv?: (rdv: PlanningRdv) => xxGrid | xxToolTip | xxLabel | xxWrapPanel | xxStackPanel | xDiv;
    RenderColonne?: (infoColonne: PlanningColonne) => iXElement;
    TimeLineNow?: boolean;
    RdvEnCours?: (heureTimeLine: DateSerialisable, rdvEnCours: PlanningRdv, rdvsSuivants: PlanningRdv[], refreshColonne: () => void) => void;
    clickSurJourModeMois?: (date: DateSerialisable) => void;
    KeyPlanning?: string;
    DayToAffiche?: string;
    typeAffichageParDefaut?: EPlanningTypeAffichage;
    RightClick?: optionRightClick;
    AgrandirRdv?: optionAgrandirRdv;
    DragAndDropRdv?: optionDragAndDropRdv;
    ZoomPlanning?: optionZoomPlanning;
    AddRdvOnClick?: optionAddRdvOnClick;
}
interface optionPrevisualisationSouris {
    RenderPrevisualisationSouris?: (place: iXElementHolder, rdvfictif: PlanningRdv) => void;
}
interface optionZoomPlanning {
    ZoomChoisi?: number;
}
interface optionAgrandirRdv {
    ApresAgrandissement?: (rdv: PlanningRdv) => void;
    RdvsADeplacer?: (rdv: PlanningRdv, dateDebut: boolean) => PlanningRdv[];
    AvantAgrandissement?: (rdv: PlanningRdv) => void;
}
interface optionAddRdvOnClick {
    Id?: number;
    IdExterne?: number;
    LibelleRdv?: string;
    CouleurRdv?: string;
    DureeRdv?: number;
    RdvAdded?: (rdv: PlanningRdv) => void;
    BeforeAdd?: (rdv: PlanningRdv) => Promise<void>;
    ArrondirDebutRdvAuPas?: number;
    PrevisualisationSouris?: optionPrevisualisationSouris;
}
interface optionDragAndDropRdv {
    AvantDeplacement?: (rdv: PlanningRdv) => void;
    ApresDeplacement?: (rdv: PlanningRdv) => void;
    RenderDivCurseur?: (rdv: PlanningRdv) => iXElement;
    DureeMin?: (rdv: PlanningRdv) => [number, number];
}
interface optionPlanningDate extends optionPlanningBase {
    NombreJour?: number;
}
interface optionPlanningRessource extends optionPlanningBase {
    Ressources: PlanningRessource[];
}
interface optionRightClickCLassique {
    OnRdv: (data: PlanningRdv) => void;
    OnGrid: (data: PlanningRdv) => void;
}
interface optionRightClickRender {
    renderRightClickRdv: (data: PlanningRdv, place: iXElementHolder, tooltip: xxMenuContextuel) => void;
    renderRightClickGrid: (date: PlanningRdv, place: iXElementHolder, tooltip: xxMenuContextuel) => void;
}
declare type optionRightClick = optionRightClickCLassique | optionRightClickRender;
declare type optionPlanningResDate = optionPlanningDate | optionPlanningRessource;
declare type optionPlanning = optionPlanningResDate;
declare const KeyLocalStorageParamUser = "xxPlanningUserParam";
declare enum EPlanningTypeAffichage {
    Standard = 0,
    Mois = 1
}
declare class xxPlanning implements iXElement {
    private contenuePrincipal;
    private gridZoomEtHeure;
    private HeureDebut;
    private HeureFin;
    private ClickSurRdv;
    private RightClickSurRdv;
    private RightClickOnGrid;
    private RenderRightClickRdv;
    private RenderRightCLickGrid;
    private ClickSurDispoBarre;
    private ClickSurEnteteColonne;
    private RenderRdv;
    private RenderColonne;
    private TimeLineNow;
    private DateDebut;
    private RdvEnCours;
    private DatesColonnes;
    private NombreJour;
    ON_MOUSE_MOUVE_DEPLACEMENT: (e: MouseEvent) => void;
    ON_MOUSE_MOUVE_PREVUSUALISATION: (e: MouseEvent) => void;
    private zoom;
    private zoomChoisi;
    private AgrandirRdv;
    private ApresAgrandissement?;
    private RdvsADeplacer?;
    private AvantAgrandissement?;
    rdvPrevisualiseFictif: PlanningRdv;
    private ListParamUser;
    private AddRdvOnClick;
    private listArrondissementPossible;
    private listZoomPossible;
    addClass(s: string): void;
    removeClass(s: string): void;
    rdvPlacer: boolean;
    private creneauSelectionne;
    RdvSelect: PlanningRdv;
    RdvSelectRightClic: PlanningRdv;
    idTimerDivCurseur: number;
    MillSecMouseDown: number;
    MillSecMouseUp: number;
    private dragAndDropRdv;
    private ApresDeplacement;
    private AvantDeplacement;
    private DureeMin?;
    private RenderDivCurseur?;
    private _PrevisualisationRdv;
    private get PrevisualisationRdv();
    private set PrevisualisationRdv(value);
    previsualisationSourisActive: boolean;
    private Ressource;
    private listeColonne;
    private clickSurJourModeMois;
    private GridMonth;
    private premierJourGrid;
    private moisCourant;
    private premiereSemaine;
    private derniereSemaine;
    private celluleJoursMois;
    private typeAffichage;
    private keyPlanning;
    private DayToAffiche;
    callbackToDeleteRightClick: () => void;
    contenuMenuClicDroit: xDiv;
    get y(): HTMLElement;
    constructor(option: optionPlanning);
    private IsPlanningRessource;
    private IsRightCLickRendered;
    private calculDateColonne;
    private createColonneZoomEtHeure;
    private createColonnePlanning;
    changerDatePlanning(date: DateSerialisable, rdvs?: PlanningRdv[], dispos?: PlanningDisponibilite[]): void;
    getColonneByDispo(dispo: PlanningDisponibilite): PlanningColonne;
    getColonne(rdv: PlanningRdv): PlanningColonne;
    ajouterRdvs(rdvs: PlanningRdv[]): void;
    supprimerRdv(rdvs: PlanningRdv[]): void;
    supprimerAllRdv(): void;
    ajouterDispo(dispos: PlanningDisponibilite[]): void;
    supprimerAllDispo(): void;
    private previsualisationRdv;
    private supprimerRdvPrevisualiser;
    ajouterClassHeure(classCss: string): void;
    supprimerClassHeure(classCss: string): void;
    masquerAllRdv(): void;
    masquerRdvByIds(ids: number[]): void;
    afficherRdvByIds(ids: number[]): void;
    afficherAllRdv(): void;
    masquerAllDisponibilite(): void;
    masquerDisponibiliteByIds(ids: string[]): void;
    afficherDisponibiliteByIds(ids: string[]): void;
    afficherAllDisponibilite(): void;
    AjouterSelectionCreneau(rdv: PlanningRdv): void;
    private afficherPrevisualisation;
    private LoadInfoWithDate;
    private LoadHeaderGridMonth;
    private LoadContenuGridMonth;
    setModeAffichage(typeAffichage: EPlanningTypeAffichage, rdvs: PlanningRdv[], dispos: PlanningDisponibilite[], nbJoursAffiches: number, isTypeIntervaleSemaine: boolean): void;
    private clicDroitAction;
    getModeAffichage(): EPlanningTypeAffichage;
    /**
     * Retourne le stackpanel correspondant au jour donné.
     * @param dateDansLeMois
     */
    private getCelluleJourPourMois;
    private CreateModeMois;
    private LoadParamUser;
    private SaveParamUser;
    getAllRdvs(): PlanningRdv[];
    getRdvById(id: number): PlanningRdv;
    getAllDisponibilites(): PlanningDisponibilite[];
    ActiverRdvTransparents(): void;
    DesactiverRdvTransparents(): void;
}
interface optionSvgImpression {
    strokeWidth?: number;
    fontSize1?: number;
    fontSize2?: number;
}
declare class ImpressionRessource {
    Id: number;
    Libelle: string;
    constructor(id: number, libelle: string);
}
declare class ImpressionRdv {
    id: number;
    objet: string;
    dateDebut: DateSerialisable;
    dateFin: DateSerialisable;
    duree: number;
    infoPatient: string;
    couleur: string;
    ressource: number;
    text: string;
    optionSvg: optionSvgImpression;
    x: number;
    width: number;
    y: number;
    height: number;
    fontSize1: number;
    fontSize2: number;
    strokeWidth: number;
    constructor(Id: number, Objet: string, DateDebut: DateSerialisable, DateFin: DateSerialisable, Duree: number, InfoPatient: string, Couleur: string, Ressource: number, TexteSupplementaire?: string, optionSvg?: optionSvgImpression);
    Contains(rdv: ImpressionRdv): boolean;
    GenerateSVG(): string;
}
declare class ColonneImpresssion {
    private date;
    private rdvs;
    private ressource;
    x: number;
    y: number;
    private nbColonnes;
    private nbLignes;
    private largeurCol;
    private hauteurMinute;
    private heureFin;
    private heureDeb;
    constructor(Date: DateSerialisable, Rdvs: ImpressionRdv[], NbLignes: number, LargeurCol: number, HauteurMinute: number, HeureDebut: number, HeureFin: number, Ressource: ImpressionRessource, X: number, Y: number);
    getNombreColonne(): number;
    private calculerXRdv;
    private GetNameDay;
    GenerateSVG(): string;
}
declare class PageImpression {
    private nbCol;
    private dateDebut;
    private rdvs;
    private ressources;
    private heureDeb;
    private heureFin;
    private numeroPage;
    private largeurCol;
    private largeurPage;
    private hauteurPage;
    private hauteurMinute;
    private svgEntete;
    private svgHeure;
    constructor(nombreCol: number, DateDebut: DateSerialisable, Rdvs: ImpressionRdv[], Ressources: ImpressionRessource[], Hdebut: number, Hfin: number, numeroPage: number, largeurCol: number, hauteurMinute: number, svgEntete: string, svgHeure: string);
    GeneratePage(): pdfMake.pdfMakeElement[];
}
interface optionsxxShowRoomContainer {
    CallOldShowRoom_Temporaire?: (cb: () => void) => void;
}
declare enum ExxShowRoomContainerTypeOption {
    SousInterface = 0,
    ListeSousInterface = 1,
    Texte = 2,
    TexteLocalisable = 3,
    Enum = 4,
    Boolean = 5,
    Function = 6,
    Number = 7,
    Icone = 8,
    CouleurHexa = 9,
    Date = 10,
    DateSerialisable = 11,
    iXElement = 12,
    ListeiXElement = 13,
    Donnees = 14,
    Time = 15,
    Pagewapper = 16,
    CotesCSS = 17,
    Custom = 18
}
declare enum ExxShowRoomContaineGoupeElement {
    xElement = "x",
    xxElement = "xx",
    xxxElement = "xxx",
    deprecated_DontUse = "xxxx"
}
declare enum ExxShowRoomContaineDataType {
    number = "number",
    string = "string",
    boolean = "boolean",
    CleValeur = "CleValeur<string, string>",
    CustomObjet = "T"
}
interface IxxShowRoomContainerDefineOptionBase {
    Facultatif?: boolean;
    IsDeprecated?: boolean;
    description?: string;
}
interface IxxShowRoomContainerDefineOptionTexte extends IxxShowRoomContainerDefineOptionBase {
    NameOption: string;
    TypeOption: ExxShowRoomContainerTypeOption.Texte;
    ValeurDefaut?: string;
}
interface IxxShowRoomContainerDefineOptionTexteLocalisable extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable;
    NameOptionLocalisable: string;
    NameOptionVariable: string;
    ValeurDefaut?: string;
}
interface IxxShowRoomContainerDefineOptionSousInterface extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.SousInterface;
    NameOption: string;
    listOption: IxxShowRoomContainerDefineOption[];
}
interface IxxShowRoomContainerDefineOptionListeSousInterface extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface;
    NameOption: string;
    listOption: IxxShowRoomContainerDefineOption[];
}
interface IxxShowRoomContainerDefineOptionBoolean extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.Boolean;
    NameOption: string;
    ValeurDefaut?: boolean;
}
interface IxxShowRoomContainerDefineOptionNumber extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.Number;
    NameOption: string;
    ValeurDefaut?: number;
}
interface IxxShowRoomContainerDefineOptionFunction extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.Function;
    NameOption: string;
    isDefaultSelect?: boolean;
    /** Ecrivez les paramettres meme si voulez utiliser pas, ca permet de les avoir afficher dans le code AutoGeneré */
    Function: Function;
}
interface IxxShowRoomContainerDefineOptionEnum extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.Enum;
    NameOption: string;
    /** Permet d'avoir le nom de l'enum pour la generation auto et d'avoir les elements de l'enum avec la fonction Eval*/
    EnumType: string;
    /** en sois une enum est un objet avec des attributs qui son soit string ou number */
    ValeurDefaut: string | number;
}
interface IxxShowRoomContainerDefineOptionIcon extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.Icone;
    NameOption: string;
    ValeurDefaut?: Icone;
}
interface IxxShowRoomContainerDefineOptionCouleurHexa extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.CouleurHexa;
    NameOption: string;
}
interface IxxShowRoomContainerDefineOptionDateSerialisable extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.DateSerialisable;
    NameOption: string;
    ValeurDefaut?: DateSerialisable;
}
interface IxxShowRoomContainerDefineOptionDate extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.Date;
    NameOption: string;
    ValeurDefaut?: Date;
}
interface IxxShowRoomContainerDefineOptionIXElement extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.iXElement;
    NameOption: string;
    ValeurDefaut?: boolean;
    ValeurSample?: iXElement;
}
interface IxxShowRoomContainerDefineOptionListeIXElement extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement;
    NameOption: string;
    ValeurDefaut?: iXElement[];
}
interface IxxShowRoomContainerDefineOptionTime extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.Time;
    NameOption: string;
    ValeurDefaut?: xTime;
}
interface IxxShowRoomContainerDefineOptionDonnees extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.Donnees;
    NameOption: string;
    DataType: ExxShowRoomContaineDataType;
    ValeurDefaut?: any[];
    ValeurSample?: any[];
}
interface IxxShowRoomContainerDefineOptionPageWapper extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.Pagewapper;
    NameOption: string;
    ValeurDefaut?: boolean;
}
interface IxxShowRoomContainerDefineOptionCotesCSS extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.CotesCSS;
    NameOption: string;
    ValeurDefaut?: OptionsCotesCSS;
}
/** /!\ Attention si vous ne trouvez pas le type d'option qu'il vous faut car trop specifique demandé de l'aide a Aimeric-Thomas Dalvai /!\ */
interface IxxShowRoomContainerDefineOptionCustom extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.Custom;
    NameOption: string;
    GenerateOption: (returnData: (data: any, dataforAutoGene: any) => void, defaultValue?: any) => iXElement;
}
declare type IxxShowRoomContainerDefineOption = IxxShowRoomContainerDefineOptionTexte | IxxShowRoomContainerDefineOptionTexteLocalisable | IxxShowRoomContainerDefineOptionBoolean | IxxShowRoomContainerDefineOptionNumber | IxxShowRoomContainerDefineOptionSousInterface | IxxShowRoomContainerDefineOptionFunction | IxxShowRoomContainerDefineOptionEnum | IxxShowRoomContainerDefineOptionIcon | IxxShowRoomContainerDefineOptionListeSousInterface | IxxShowRoomContainerDefineOptionCouleurHexa | IxxShowRoomContainerDefineOptionDate | IxxShowRoomContainerDefineOptionDateSerialisable | IxxShowRoomContainerDefineOptionIXElement | IxxShowRoomContainerDefineOptionListeIXElement | IxxShowRoomContainerDefineOptionTime | IxxShowRoomContainerDefineOptionDonnees | IxxShowRoomContainerDefineOptionCustom | IxxShowRoomContainerDefineOptionPageWapper | IxxShowRoomContainerDefineOptionCotesCSS;
interface IxxShowRoomContainerPreReglageOption<T> {
    NomReglage: string;
    Prereglage: T;
}
interface IxxShowRoomContainerIconeDef {
    groupe: string;
    icone: () => Icone;
    iconeName: string;
    iconeValue: number | string;
    iconeString: string;
}
interface IxxShowRoomContainerDefineElement<T> {
    IsNotFunctionnal?: boolean;
    typeElement: Function;
    NomElement: string;
    Description: string;
    listOption: IxxShowRoomContainerDefineOption[];
    renderElement: (option: T) => iXElement;
    RenderTooltip: () => Promise<iXElement>;
    Groupe: ExxShowRoomContaineGoupeElement;
    ListePreReglageOption?: IxxShowRoomContainerPreReglageOption<T>[];
}
declare class xxShowRoomContainer implements iXElement {
    private static listElements;
    private static ListIcone;
    get y(): HTMLElement;
    private isAffichageIcone;
    private listePrereglage;
    private Page;
    private Grid;
    private GridSecondaire;
    private ZoneDeRendu;
    private ListeErreur;
    private GridVueIcone;
    private stringRecherche;
    private HaveResultatListeXElement;
    private IsT20;
    private timeOutId;
    private xstyle;
    constructor(options: optionsxxShowRoomContainer);
    static AjouterElementShowroom<T>(item: IxxShowRoomContainerDefineElement<T>): void;
    static AjouterIconeShowroom(ListeIcone: IxxShowRoomContainerIconeDef[]): void;
    private ReGenerateGridSecondaireEmpty;
    private ReGenerateGridSecondaireRecherche;
    private ReGenerateGridSecondaire;
    private GenerationRecursiveOptionsAffichage;
    private GenerationRecursiveOptionsStringCode;
    private ReGenerateGridIcone;
    private GenerateBoxerViewMethode;
    private GetMethodDescription;
    private htmlEntities;
    private AddErreur;
    private AddErreurOption;
}
interface optionsShowRoom {
    page: xxPageWrapper;
}
declare class BoxerDetail {
    private page;
    private boxer;
    constructor(composant: Function, options?: any);
}
declare class Methode {
    nom: string;
    description: string;
    constructor(nom: string, descriptor: PropertyDescriptor);
}
declare class ElementSR {
    titre: string;
    commentaire: string;
    render: (ici: xElementHolder) => void;
    classe?: Function;
    constructor(inT: string, inC: string, inR: (ici: xElementHolder) => void, inCl?: Function);
}
declare class xxShowRoom implements iXElement {
    pageShowRoom: xxPageWrapper;
    get y(): HTMLElement;
    constructor(options: optionsShowRoom);
}
declare class xxShowRoomImageTooltipPreview {
    static xxAutoComplete: string;
    static xxRouteContainer: string;
    static xxTooltip: string;
    static xxTreeTabControl: string;
    static xxDialog: string;
}
declare class xxShowRoomLoader {
    static XElement_Load(): void;
    static XXElement_Load(): void;
    static XElement_Icone_Load(): void;
}
declare class xxShowRoomOptionRecurrente {
    static get_OptionsHtml(addon?: IxxShowRoomContainerDefineOption[], ValeurDefaut?: OptionsHtml): IxxShowRoomContainerDefineOption[];
    static get_OptionsAffichage(addon?: IxxShowRoomContainerDefineOption[], ValeurDefaut?: optionsAffichage): IxxShowRoomContainerDefineOption[];
    static get_OptionsAffichageBouton(addon?: IxxShowRoomContainerDefineOption[], ValeurDefaut?: optionsAffichage): IxxShowRoomContainerDefineOption[];
    static get_OptionsXxNavOngletItem(nbRecur?: number): IxxShowRoomContainerDefineOption[];
}
declare class xxShowRoomSample {
    static readonly classSampleDiv_Red = "sampleDiv_Red";
    static readonly classSampleDiv_Bleu = "sampleDiv_Bleu";
    static readonly classSampleDiv_Green = "sampleDiv_Green";
    static readonly classSampleLabel = "sampleLabel";
    /** Permet de créer une div sample, pour avoir une couleur random mettre -1 */
    static divSample(nbColor?: number): xDiv;
    static listeCleValeurs(): CleValeur<string, string>[];
    static listeStrings(): string[];
    static listeNombre(): number[];
    static listeboolean(): boolean[];
    static listeObjet(): object[];
    static listeCustom(): xxShowroomCustomSample[];
    static urlIFrame(): string;
    static imageBase64(nbColor?: number): string;
    static PDFBase64(): string;
    static E_Med: string;
    static RMarecheche: string;
    static listeStringsAsync(): Promise<string[]>;
}
declare class xxShowroomCustomSample {
    nom: string;
    Group: string;
    couleur: string;
    constructor(nom: string, Group: string, couleur: string);
    toString(): string;
}
declare enum etype_messagebox {
    Normal = 0,
    Avertissement = 1
}
interface ajaxRetour<T> {
    d: T;
}
interface retourJsonWithErrors<T> {
    succes: T;
    erreur: string;
}
declare enum ETypeAlertify {
    success = 0,
    error = 1,
    log = 2,
    alert = 3
}
declare enum ETypeStorage {
    Session = 0,
    Local = 1
}
declare namespace alertify {
    interface IProperties {
        /** Default value for milliseconds display of log messages */
        delay?: number;
        /** Default values for display of labels */
        /** Default button for focus */
        /** Should buttons be displayed in reverse order */
        position?: enumPositionAlerte;
    }
    /** Labels for altertify.set function */
}
declare enum EPositionAlertify {
    topRight = 0,
    topLeft = 1,
    bottomRight = 2,
    bottomLeft = 3
}
declare enum EKeys {
    Echap = 0,
    FlecheHaut = 1,
    FlecheDroite = 2,
    FlecheBas = 3,
    FlecheGauche = 4,
    M = 5,
    Entrer = 6,
    A = 7
}
declare enum ETypeFichier {
    JavaScript = 0,
    CSS = 1
}
declare enum EnumLibrairieJs {
    pdfMake = "pdfmake.min.js vfs_fonts.js",
    pdfJs = "pdf.js pdf.worker.js",
    d3js = "d3js.4.11.0.js d3pie.min.js"
}
interface iNotificationMessage<T> {
    source: number;
    evenement: string;
    clefEvenement: string | number;
    data: T;
}
declare const desktopDevice = "desktop-device";
interface Echange {
    Contenu: string;
    Source: string;
    FinessSrc: string;
    Destinataire: string;
    FinessDest: string;
}
interface EchangeParamFrom {
    data_crypte: string;
    jeton_echange: Echange;
}
interface IEventKey {
    keyEvent: string;
    keyCode: EKeys;
    callBack: () => void;
}
declare class eventKey {
    private _eventListener;
    private _keyEvent;
    private _keyCode;
    get eventListener(): (event: KeyboardEvent) => void;
    constructor(keyCode: EKeys, keyEvent: string, callback: () => void);
    private checkEvent;
    /**     * key: "ArrowUp" -> Flèche haut
     *      "ArrowDown" -> Flèche bas
     *      "ArrowLeft" -> Flèche gauche
     *      "ArrowRight" -> Flèche droite
     *      "Escape" -> Echap */
    private getKeyFromEnum;
    IsKeyEvent(key: string): boolean;
}
declare class xOutils {
    static getStackTrace(): string;
    private static ListKeyUpEventsCallback;
    private static ListKeydownEventsCallback;
    private static escapeRegExp;
    static replaceAll(str: string, find: string, replace: string): string;
    /**
     * Retourne toutes les valeurs d'un enum sous la forme d'un tableau.
     * @param monenum
     */
    static enumToArray<T>(monenum: any): T[];
    /**
    * permet de retourner la liste des éléments ( nom de le l'élément et pas valeurs) disponibles dans un enum.
    * @param monenum
    */
    static enumNamesToStringArray(monenum: any): string[];
    /**
     * fournit la valeur enum d'un enum à partir de son nom en string
     *
     * @param valeur string d'un enum
     * @param type de l'enum
     */
    static stringToEnum<T>(value: string, enumerator: any): T;
    /**
    * Fait un appel ajax d'une fonction C#
    */
    static JqueryAjaxCall(pageUrl: string, parameter: any, functionRetour: (success: any, context?: any) => void, context?: any, functionError?: (data: any, success: any, error: any) => void): void;
    static JqueryAjaxCallPromiseForTsProxy<T>(pageUrl: string, parametreAppel: any, maPage?: xxPageWrapper): Promise<T>;
    static convertDevUrlToRelativeUrl(tildeUrl: string): string;
    static JqueryAjaxCallPromiseForTs<T>(pageUrl: string, parametreAppel: any, maPage?: xxPageWrapper): Promise<T>;
    static JqueryAjaxCallPromiseForTsJsonWithErrors<T>(pageUrl: string, parametreAppel: any, withJSON: boolean, maPage?: xxPageWrapper, catchPerso?: (s: string) => void): Promise<T>;
    /**
            * methode d'appel externe ajax en mode promise pour pouvoir chainer
            * @param pageUrl
            * @param parametreAppel
            * @param settings
            */
    static JqueryAjaxCallPromiseForTsJsonDistant<T>(parametreAppel: any, maPage?: xxPageWrapper): Promise<T>;
    static JqueryAjaxCallPromiseForTsJson<T>(pageUrl: string, parametreAppel: any, withJSON: boolean, maPage?: xxPageWrapper): Promise<T>;
    static JqueryAjaxCallPromiseForTsJsonFetch<T>(pageUrl: string, parametreAppel: {
        methode: string;
    }, withJSON: boolean, maPage?: xxPageWrapper): Promise<T>;
    private static AfficheErreurAjax;
    private static ajouterWS;
    /**
        * methode d'appel ajax en mode promise pour pouvoir chainer
        * @param pageUrl
        * @param parametreAppel
        * @param settings
        */
    static JqueryAjaxCallPromise2(pageUrl: string, parametreAppel: any, settings?: JQueryAjaxSettings): Promise<Response>;
    static JqueryAjaxCallPromiseFetch(pageUrl: string, parametreAppel: any, settings?: JQueryAjaxSettings): Promise<Response>;
    static afficherMessageAlertify(message: string, type: ETypeAlertify, options?: alertify.IProperties): void;
    static afficherMessageAlertifyLog(message: string): void;
    static afficherMessageAlertifyError(message: string): void;
    static afficherMessageAlertifySuccess(message: string): void;
    static afficherMessageAlertifyLocalise(message: string, type: ETypeAlertify, options?: alertify.IProperties): void;
    static afficherMessageAlertifyLocaliseLog(message: string): void;
    static afficherMessageAlertifyLocaliseError(message: string): void;
    static afficherMessageAlertifyLocaliseSuccess(message: string): void;
    static afficherMessageAlertifyContent(content: iXElement, type: ETypeAlertify, options?: alertify.IProperties): void;
    static afficherMessageConfirmationLocalise(message: string, afficherOuiNon: boolean, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox, sansBoutons?: boolean): void;
    static afficherMessageConfirmation(message: string, afficherOuiNon: boolean, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox, sansBoutons?: boolean): void;
    static afficherErreurConfirmation(message: string, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox, sansBoutons?: boolean): void;
    static afficherMessageConfirmationPromise(message: string, afficherOuiNon: boolean, type_messagebox?: etype_messagebox, sansBoutons?: boolean): Promise<boolean>;
    static IsMailValid(val: string): boolean;
    static DateToFrenchDateString(date: DateSerialisable, avecHeures: boolean, avecSecondes: boolean): string;
    static DateToFrenchTimeString(date: DateSerialisable, avecSecondes: boolean): string;
    static compareArrays(array1: any[], array2: any[]): boolean;
    static getUrlParameter(param: string): any;
    static getUrlParameterFromString(urlAParser: string, param: string, withDecode: boolean): any;
    removeParamFromHref(href: string, param: string): any;
    static guid(): string;
    static replaceUrlParam(url: string, paramName: string, paramValue: string): string;
    static inclureLibrairie(key: EnumLibrairieJs): Promise<void>;
    static inclureFichier(typeFichier: ETypeFichier, src: string): Promise<void>;
    static rechercheString(valeur1: string, valeur2: string[]): boolean;
    static rechercheStringofString(texteRechercher: string, texteComplet: string): string;
    private static setTextPourRecherche;
    static rechercheStringTous(valeursRecherche: string[], valeur2: string[]): boolean;
    static rechercheStringUnParmiTous(valeursRecherche: string[], valeur2: string[]): boolean;
    static getLocalStorage(key: string): string;
    static setLocalStorage(key: string, valeur: string): void;
    static delLocalStorage(key: string, valeur: string): void;
    static getSessionStorage(key: string): string;
    static setSessionStorage(key: string, valeur: string): void;
    static delSessionStorage(key: string): void;
    private static UpdateElement;
    private static AddElement;
    static RemoveElement(key: string, type?: ETypeStorage): void;
    private static GetElement;
    static IndenterJs(codesource: string): string;
    static readClipboard(): Promise<string>;
    static copyToClipboard(str: string): void;
    /**
     * Appelle la fonction donnée en arguments lorsque la touche donnée est relâchée
     * Un contrôle existe pour faire en sorte de ne pas s'abonner plusieurs fois au même événement
     */
    static addKeyupEvent(options: IEventKey): void;
    /**
    * Appelle la fonction donnée en arguments lorsque la touche donnée est pressée
    * Un contrôle existe pour faire en sorte de ne pas s'abonner plusieurs fois au même événement
    */
    static addKeydownEvent(options: IEventKey): void;
    /**
     * Efface le KeyboardEvent up spécifié
     */
    static removeKeyupEvent(keyCodeEvent: string): void;
    static afficherMessageErreurLicence(nom_licence?: string): void;
    static afficherMessageErreurPage(info?: string): void;
    static Notification: {
        throwSimpleEvent: (source: number, evenement: string, clefEvenement: string | number) => void;
        throwMultiSimpleEvent: (source: number, evenement: string, clefEvenement: (string | number)[]) => void;
        listenSimpleEvent: (source: number, evenement: string, clefEvenement: string | number, onchange: (source: number) => void) => () => void;
        listenOnlySimpleEvent: (evenement: string, clefEvenement: string | number, onchange: (source: number) => void) => () => void;
        createNewId: () => number;
    };
    static notificationListenerPur<T>(evenement: string, clefEvenement: string | number, onChange: (data: T) => void): () => void;
    static notificationListener<T>(source: number, evenement: string, clefEvenement: string | number, onChange: (data: T, source: number) => void): () => void;
    static notificationFullDom<T>(source: number, evenement: string, liste: {
        data: T;
        clefEvenement: string | number;
    }[]): void;
    private static notificationFullDomByMessage;
    static attachToHead(element: HTMLElement): void;
    static attachToBody(element: HTMLElement): void;
    /**
     * Compare des versions de programme entre elles.
     * @param a
     * @param b
     */
    static compareVersions(a: string, b: string): number;
    static hasFocus(a: iXElement): boolean;
    static afficheDate(d: DateSerialisable, ici: iXElementHolder): void;
    static afficheDateEtHeure(d: DateSerialisable, ici: iXElementHolder): void;
    static ToStringDateHeure(d: DateSerialisable): string;
    static ToStringDate(d: DateSerialisable): string;
    static printDate(d: DateSerialisable): string;
    static printDateHeure(d: DateSerialisable): string;
    static getCssClassByDiviceType(): string;
    static isMobile(): boolean;
    static base64ToUint8Array(base64: string): Uint8Array;
    static isNullOrEmpty(inStr: string): boolean;
    static IsNullOrEmpty(inStr: string): boolean;
    static InsertAt(source: string, index: number, val: string): string;
    static doubleToString: (value: number | string) => string;
    static isHttps(): boolean;
    static sleep(ms: number): Promise<void>;
    static distinct(liste: number[]): number[];
}
declare class xMaths {
    /**
     * Permet de calculer le plus petit multiple commun de deux nombres
     * @param a number
     * @param b number
     */
    static PPCM(a: number, b: number): number;
    /**
     * Permet de calculer le plus grand diviseur commun de deux nombres
     * @param a
     * @param b
     */
    static PGCD(a: number, b: number): number;
    /**
     * Permet de calculer le plus petit multiple d'une liste de nombre
     * @param listeNombre number[]
     */
    static PPCMListe(listeNombre: number[]): number;
    /**
     * Permet de calculer le plus grand diviseur commun d'une liste de nombre
     * @param listeNombre number[]
     */
    static PGCDListe(listeNombre: number[]): number;
    /**
     * Permet d'addition avec exactitude deux nombre (float ou entier)
     * @param a Nombre a base
     * @param b Nombre a additionner
     * @param e Nombre de décimal
     */
    static exactPlus(a: number, b: number, e: number): number;
    /**
     * Permet de soustraire avec exactitude deux nombre (float ou entier)
     * @param a Nombre a de base
     * @param b Nombre a soustraire
     * @param e Nombre de décimal
     */
    static exactMoins(a: number, b: number, e: number): number;
    static isNumericDigit(n: string): boolean;
    /**
     * Renvoie true si la châine donnée est numérique.
     * This solution is used in / taken from Jquery library $.isNumeric(obj)
     * @param n
     */
    static isNumeric(n: string): boolean;
}
declare class ContenusSVG {
    contenu: string;
    viewBoxContains: string;
    epaisseur: number;
    constructor(contenu: string, viewBoxContains: string, epaisseur?: number);
}
declare class xListeIconeSVG {
    static actualiser(): ContenusSVG;
    static administration(): ContenusSVG;
    static age(): ContenusSVG;
    static ajouter(): ContenusSVG;
    static ajouter_rond(): ContenusSVG;
    static alerte(): ContenusSVG;
    static annuler_action(): ContenusSVG;
    static appareil_photo(): ContenusSVG;
    static associer(): ContenusSVG;
    static attente(): ContenusSVG;
    static banette(): ContenusSVG;
    static baguette_magique(): ContenusSVG;
    static bdd(): ContenusSVG;
    static calendrier(): ContenusSVG;
    static carre(): ContenusSVG;
    static cercle(): ContenusSVG;
    static cercle_pointilles(): ContenusSVG;
    static cercle_pointexclamation(): ContenusSVG;
    static chaise(): ContenusSVG;
    static chevron_bas(): ContenusSVG;
    static chevron_droite(): ContenusSVG;
    static chevron_gauche(): ContenusSVG;
    static chevron_haut(): ContenusSVG;
    static coller(): ContenusSVG;
    static copier(): ContenusSVG;
    static couper(): ContenusSVG;
    static croix(): ContenusSVG;
    static demandeavis(): ContenusSVG;
    static demandeavis_ajout(): ContenusSVG;
    static demandeavis_pleine(): ContenusSVG;
    static document(): ContenusSVG;
    static dossier(): ContenusSVG;
    static drapeau(): ContenusSVG;
    static drapeau_medecin(): ContenusSVG;
    static download(): ContenusSVG;
    static dupliquer(): ContenusSVG;
    static editer_colonnes(): ContenusSVG;
    static envoyer_mail(): ContenusSVG;
    static etablissement(): ContenusSVG;
    static facture(): ContenusSVG;
    static favori(): ContenusSVG;
    static fiche_administrative(): ContenusSVG;
    static filtrer(): ContenusSVG;
    static flag(): ContenusSVG;
    static fleche_droite(): ContenusSVG;
    static fusion(): ContenusSVG;
    static geolocalisation(): ContenusSVG;
    static historique(): ContenusSVG;
    static home(): ContenusSVG;
    static horaire(): ContenusSVG;
    static image(): ContenusSVG;
    static imprimer(): ContenusSVG;
    static incident_interne_externe(): ContenusSVG;
    static informations(): ContenusSVG;
    static liste(): ContenusSVG;
    static liste_simple(): ContenusSVG;
    static liste_choix_tous(): ContenusSVG;
    static lit(): ContenusSVG;
    static lit_retour(): ContenusSVG;
    static main_levee(): ContenusSVG;
    static maison(): ContenusSVG;
    static materiel(): ContenusSVG;
    static menu_burger(): ContenusSVG;
    static micro(): ContenusSVG;
    static modifier(): ContenusSVG;
    static modules(): ContenusSVG;
    static moins(): ContenusSVG;
    static observation(): ContenusSVG;
    static partager(): ContenusSVG;
    static pdf(): ContenusSVG;
    static play(): ContenusSVG;
    static plus(): ContenusSVG;
    static prise(): ContenusSVG;
    static prises_connectees(): ContenusSVG;
    static prises_deconnectees(): ContenusSVG;
    static punaise(): ContenusSVG;
    static qr_code(): ContenusSVG;
    static recherche(): ContenusSVG;
    static recherche_document(): ContenusSVG;
    static sauvegarder(): ContenusSVG;
    static sexe_femme(): ContenusSVG;
    static sexe_homme(): ContenusSVG;
    static sexe_neutre(): ContenusSVG;
    static sms(): ContenusSVG;
    static sollicitation(): ContenusSVG;
    static sollicitation_ajout(): ContenusSVG;
    static sollicitation_pleine(): ContenusSVG;
    static statistiques(): ContenusSVG;
    static supprimer(): ContenusSVG;
    static suspendre(): ContenusSVG;
    static telephone(): ContenusSVG;
    static traduction(): ContenusSVG;
    static troispoints(): ContenusSVG;
    static troispoints_horizontaux(): ContenusSVG;
    static upload(): ContenusSVG;
    static validation(): ContenusSVG;
    static valider(): ContenusSVG;
    static verrouille(): ContenusSVG;
    static visualiser(): ContenusSVG;
    static user(): ContenusSVG;
    static user_ensemble(): ContenusSVG;
    static emed_soins(): ContenusSVG;
    static emed_perfusions(): ContenusSVG;
    static emed_posologie(): ContenusSVG;
    static emed_suspendre(): ContenusSVG;
    static emed_prolonger(): ContenusSVG;
    static logo_elive(): ContenusSVG;
    static age_patient_nouveau_ne(): ContenusSVG;
    static admin(): ContenusSVG;
    static aide(): ContenusSVG;
    static appelContextuelAdmission(): ContenusSVG;
    static appelContextuelAdmissionLectureSeule(): ContenusSVG;
    static appelContextuelPrescription(): ContenusSVG;
    static appelContextuelPrescriptionLectureSeule(): ContenusSVG;
    static blocCommerce(): ContenusSVG;
    static classementDoc(): ContenusSVG;
    static consultationDossier(): ContenusSVG;
    static consultationPatient(): ContenusSVG;
    static delegues(): ContenusSVG;
    static dispensation(): ContenusSVG;
    static donSang(): ContenusSVG;
    static dossierConsult(): ContenusSVG;
    static gestionBloc(): ContenusSVG;
    static GestionIncoherences(): ContenusSVG;
    static InstallElive(): ContenusSVG;
    static internet(): ContenusSVG;
    static menuTuiles(): ContenusSVG;
    static parametres(): ContenusSVG;
    static patientConnect(): ContenusSVG;
    static rechercheMedicament(): ContenusSVG;
    static rechercheRapide(): ContenusSVG;
    static rechercheTuile(): ContenusSVG;
    static reprendre(): ContenusSVG;
    static suiviPubliDocs(): ContenusSVG;
    static support(): ContenusSVG;
    static tableauDeBord(): ContenusSVG;
    static ValidationPharma(): ContenusSVG;
    static vueJournee(): ContenusSVG;
}
declare class BindableObject<T> {
    private _value;
    private abonnements;
    get Value(): T;
    set Value(newVal: T);
    bind(set: (v: T) => void): () => void;
    constructor(inDonne?: T);
}
interface OptionsCanvas {
    id?: string;
    class?: string;
}
declare class xCanvas extends xElement {
    constructor(options: OptionsCanvas);
}
declare class xBr extends xElement {
    constructor();
}
interface OptionsDiv extends OptionsHtml {
    textVariable?: string;
    textLocalise?: string;
    title?: string;
}
declare class xDiv extends xElement implements iXElementHolderEnable {
    private xh;
    get asHolder(): xElementHolder;
    constructor(options?: OptionsDiv);
    static FromDom(elem: HTMLDivElement): xDiv;
    setTitle(newTitle: string): void;
    hideDiv(collapse?: boolean): xDiv;
    cacher(collapse?: boolean): xDiv;
    showDiv(): xDiv;
    afficher(): xDiv;
    vider(): xDiv;
    width(parame?: string | number): void | number;
    contentsWidth(): void | number;
    contentsHeight(): void | number;
    height(parame?: string | number): void | number;
}
declare enum enumIconeAction {
    ajouter = 5,
    valider = 122,
    valider_cercle = 123,
    annuler = 8,
    annuler_cercle = 10,
    supprimer = 110,
    enregistrer = 40,
    imprimer = 69,
    visualiser = 11,
    verrouiller = 127,
    deverouiller = 36,
    modifier = 81,
    historique = 63,
    rechercher = 95,
    erreur = 46,
    suspendre = 208,
    importer = 67,
    alerte = 161,
    rafraichir = 93,
    parametres = 144,
    masquer = 77,
    info = 73,
    calendrier = 89,
    lister = 247,
    inconnu = 158,
    arreter = 15,
    sablier = 231,
    sablier_blanc = 232
}
declare enum enumPositionIconeAction {
    HautDroite = 0,
    BasDroite = 1
}
interface OptionsIconeAvecAction {
    iconePrincipale: IconeV2 | IconeSvg;
    iconeSecondaire: enumIconeAction;
    positionIconeAction?: enumPositionIconeAction;
    tailleIcone?: tailleIcone;
    heightCust?: number;
    widthCust?: number;
    optionsAffichage?: optionsAffichage;
}
declare class xIconeAvecAction implements iXElement {
    private grid;
    private iconePrincipale;
    private iconeSecondaire;
    constructor(options: OptionsIconeAvecAction);
    addClass(s: string): xxGrid;
    removeClass(s: string): xxGrid;
    getClasse(): string;
    getTypeIcone(): string;
    getValeurIcone(): Icone;
    get y(): HTMLElement;
}
interface OptionsImg extends OptionsHtml {
    src?: string;
}
declare class xImg extends xElement {
    constructor(options: OptionsImg);
}
interface OptionsIFrame extends OptionsHtml {
    src?: string;
}
declare class xIFrame extends xElement {
    constructor(options: OptionsIFrame);
    setSrc(url: string): void;
    remove(): void;
}
declare enum enumTypeOuvertureHref {
    NouvelleFenetre = 0,
    MemeEmplacement = 1,
    EmplacementParent = 2,
    Boxer = 3
}
interface OptionsHref extends OptionsHtml {
    textVariable?: string | number;
    textLocalise?: string;
    url: string;
    typeOuverture: enumTypeOuvertureHref;
    optionsAffichage?: optionsAffichagexHref;
}
interface optionsAffichagexHref extends optionsAffichage {
    couleur?: enumCouleur;
    retourALaLigne?: boolean;
}
declare class xHref extends xElement {
    constructor(options?: OptionsHref);
}
interface OptionDatePicker {
    value?: DateSerialisable;
    valueChange?: (val: DateSerialisable) => void;
    choixAnnee?: boolean;
    affichageNumSemaine?: boolean;
    affichageBtnAujourdhui?: boolean;
    affichageBtnAucuneDate?: boolean;
    class?: string;
}
declare class xDatePicker implements iXElement {
    private Value;
    private premiereValeur;
    private ValueChange;
    private ChoixAnnee;
    private AfficherNumSemaine;
    private AffichageBtnAujourdhui;
    private affichageBtnAucuneDate;
    private ToogleSelectedDefaut;
    private ClassCss;
    private Grid;
    private ListeGridItem;
    private ListeCodeJour;
    private ListeCodeMois;
    private nbColonne;
    private numLastLigneJours;
    private CodeMoisChoisi;
    private ValuePourChangement;
    constructor(option: OptionDatePicker);
    setValue(date: DateSerialisable): void;
    CreateDatePicker(): void;
    private createEnteteGrid;
    private createLibelleJours;
    private PlacerJours;
    private Btnfooter;
    Afficher(): void;
    Cacher(): void;
    get y(): HTMLElement;
    addClass(s: string): xxGrid;
    width(parame?: string | number): void | number;
    height(parame?: string): void | number;
}
interface OptionsCouleur {
    id?: string;
    class?: string;
    codeCouleur?: string;
    textVariable?: string;
    textLocalise?: string;
    title?: string;
    click?: (cb: () => void) => void;
    styleBulle?: boolean;
    binding?: {
        value?: BindableObject<string>;
        visibility?: BindableObject<enumVisibility>;
    };
}
declare class xCouleur implements iXElement {
    private elementPrincipal;
    private monDiv;
    private styleBulle;
    get y(): HTMLElement;
    constructor(options?: OptionsCouleur);
    changerCouleur(codeCouleur: string): void;
    changerTitle(newTitle: string): void;
}
declare enum enumTypeAffichePicker {
    InLine = 0,
    AvecPicker = 1,
    SansPicker = 2
}
interface OptionsInputTime extends OptionsHtml {
    id?: string;
    value?: xTime;
    ValueChange?: (val: xTime) => void;
    typeAffichage?: enumTypeAffichePicker;
    onClose?: (val: xTime) => void;
    btnValiderChange?: boolean;
    binding?: {
        value?: BindableObject<xTime>;
        visibility?: BindableObject<enumVisibility>;
    };
    placeHolderlocalise?: string;
    nonResponsive?: boolean;
    optionsAffichage?: optionsAffichage;
    disabled?: boolean;
}
interface OptionsInputDateAndTime extends OptionsHtml {
    value?: DateSerialisable;
    ValueChange?: (val: DateSerialisable) => void;
    typeAffichage?: enumTypeAffichePicker;
    AvecNumSemaine?: boolean;
    AvecChoixAnnee?: boolean;
    AvecCodeJour?: boolean;
    AvecBoutonToday?: boolean;
    AvesLabels?: boolean;
    btnValiderChange?: boolean;
    binding?: {
        value?: BindableObject<DateSerialisable>;
        visibility?: BindableObject<enumVisibility>;
        disabled?: BindableObject<boolean>;
    };
    placeHolderlocalise?: string;
    nonResponsive?: boolean;
    optionsAffichage?: optionsAffichage;
    disabled?: boolean;
}
interface OptionsInputDate extends OptionsHtml {
    value?: DateSerialisable;
    todayDefaultValue?: boolean;
    ValueChange?: (val: DateSerialisable) => void;
    typeAffichage?: enumTypeAffichePicker;
    AvecNumSemaine?: boolean;
    onClose?: (val: DateSerialisable) => void;
    AvecChoixAnnee?: boolean;
    AvecBoutonToday?: boolean;
    CanSelectDateNull?: boolean;
    AvecCodeJour?: boolean;
    appuyeToucheEntree?: (date: DateSerialisable) => void;
    binding?: {
        value?: BindableObject<DateSerialisable>;
        visibility?: BindableObject<enumVisibility>;
    };
    placeHolderlocalise?: string;
    nonResponsive?: boolean;
    optionsAffichage?: optionsAffichage;
    disabled?: boolean;
}
declare class xInputDate implements iXElement {
    private contenuePrincipal;
    private toolTipContenue;
    private inputTexteDate;
    private labelContainerCodeJour;
    private datePicker;
    private value;
    private valueChange;
    private class;
    private typeAffichageInputDate;
    private AvecNumSemaine;
    private AvecChoixAnnee;
    private CanSelectDateNull;
    private AvecBoutonToday;
    private AvecCodeJour;
    private placeHolderlocalise;
    private nonResponsive;
    private todayDefaultValue;
    private ListeCodeJour;
    get y(): HTMLElement;
    focus(): void;
    constructor(option: OptionsInputDate);
    setVisibility(s: enumVisibility): void;
    setDisabled(disabled: boolean): void;
    hasFocus(): boolean;
    setValue(date: DateSerialisable): void;
    afficherDatePicker(): void;
    width(parame?: string | number): void | number;
    height(parame?: string): void | number;
    getValueDateSerialisable(): DateSerialisable;
}
declare class xInputTime implements iXElement {
    private value;
    private valueChange;
    private class;
    private typeAffichage;
    private placeHolderlocalise;
    private inputTextTime;
    private tooltipContenue;
    private timePicker;
    private btnValiderChange;
    private contenuePrincipale;
    private nonResponsive;
    constructor(option: OptionsInputTime);
    setVisibility(s: enumVisibility): void;
    setDisabled(disabled: boolean): void;
    setValue(val: xTime): void;
    hasFocus(): boolean;
    afficherTimePicker(): void;
    get y(): HTMLElement;
    width(parame?: string | number): void | number;
    height(parame?: string): void | number;
}
declare class xInputDateAndTime implements iXElement {
    private wrapPrincipal;
    private value;
    private valueTime;
    private valueChange;
    private inputDate;
    private inputTime;
    private btnValiderChange;
    private nonResponsive;
    constructor(option: OptionsInputDateAndTime);
    setVisibility(s: enumVisibility): void;
    setValue(date: DateSerialisable): void;
    setDisabled(disabled: boolean): void;
    getValueDateSerialisable(): DateSerialisable;
    get y(): HTMLElement;
}
interface OptionsInputFile {
    accept?: string;
    capture?: 'user' | 'environment' | '';
    class?: string;
    ValueChange: (val: File, binary: string) => void;
    id?: string;
    textLocalise?: string;
    textVariable?: string;
    titleLocalise?: string;
    titleVariable?: string;
    textChangeWhenUpload?: boolean;
    widthMaxForImage?: number;
    iconeAppareilPhoto?: boolean;
}
declare class xInputFile implements iXElement {
    private element;
    private monFile;
    private label;
    private textAAfficher;
    private span;
    private icone;
    get y(): HTMLElement;
    constructor(options: OptionsInputFile);
    reset(): void;
    test(): void;
    ModifierPhotoPatient(): void;
}
declare class ObservableCollection<T> {
    private donnees;
    private abonnements;
    get Length(): number;
    bind(add: (v: T[]) => void, del: (v: T[]) => void): () => void;
    forEach(fe: (t: T) => void): void;
    find(fe: (t: T) => boolean): T;
    filter(fe: (t: T) => boolean): T[];
    All(): T[];
    vider(): ObservableCollection<T>;
    constructor(inDonnees?: T[]);
    add(inData: T[]): ObservableCollection<T>;
    del(delData: T[]): ObservableCollection<T>;
    elementIndex(elem: T): number;
    elementSuivant(elem: T): T;
    elementPrecedent(elem: T): T;
    elementAt(position: number): T;
}
declare enum enumStyleInput {
    Filled = 0,
    Outlined = 1,
    Simple = 2
}
declare enum enumBackgroundInput {
    Grey = 0,
    Transparent = 1,
    BgTheme = 2
}
interface optionsAffichageInput extends optionsAffichage {
    rechercheLarge?: boolean;
}
interface OptionsInput {
    value?: string | number;
    longueurMaxi?: number;
    longueurDuChamp?: number;
    hauteurDuChamp?: number;
    multiline?: boolean;
    rounded?: boolean;
    style?: enumStyleInput;
    background?: enumBackgroundInput;
    numeric?: OptionsInputNumericGenerique;
    KeyUpEnterCallback?: (val: number | string) => void;
    KeyUpCancelCallback?: () => void;
    KeyUpAddonCallback?: (k: KeyboardEvent) => void;
    ValueChange?: (val: number | string) => void;
    autoChange?: boolean;
    password?: boolean;
    placeHolderVariable?: string;
    placeHolderlocalise?: string;
    onLostfocusCallback?: (val: number | string) => void;
    onBlur?: () => void;
    binding?: {
        value?: BindableObject<string | number>;
        visibility?: BindableObject<enumVisibility>;
    };
    disabled?: boolean;
    optionsAffichage?: optionsAffichageInput;
    autoCompletionAutorisee?: boolean;
    class?: string;
    id?: string;
    name?: string;
    idTest?: string;
    click?: (evt: Event) => void;
    champLarge?: boolean;
}
interface OptionsInputNumericGenerique {
    plus?: boolean;
    minus?: boolean;
    decimalSeparator?: boolean;
    nbDigits?: number;
    nbDecimal?: number;
    max?: number;
    min?: number;
    autoCompletionAutorisee?: boolean;
}
declare class xInputText extends xElement {
    private change;
    private maValeur;
    private longueurMax;
    private isNumeric;
    private plus;
    private minus;
    private decimalSeparator;
    private nbDigits;
    private nbDecimal;
    private max;
    private min;
    constructor(options: OptionsInput);
    width(parame?: string | number): void | number;
    height(parame?: string | number): void | number;
    setDisabled(disabled: boolean): void;
    setValue(texte: string | number): void;
    setValueFireEvent(texte: string | number): void;
    focus(): void;
    checkCondition(valeur: string): boolean;
    checkConditionValueChange(valeur: string): boolean;
    getValue(): string | number;
    removeAttribute(strAttr: string): xInputText;
    setAttribute(strAttr: string, valeur: string): xInputText;
    setBlur(fn: () => void): xInputText;
}
interface OptionsInputTextAvecIcone extends OptionsInput {
    icone: enumIconeSvg;
    positionIcone?: "Debut" | "Fin";
    couleurIcone?: enumCouleur;
    clicSurIcone?: (cb: () => void) => void;
    largeurEnPixels?: number;
}
declare class xInputTextAvecIcone implements iXElement {
    private grid;
    private input;
    private icone;
    private couleurIcone;
    get y(): HTMLElement;
    constructor(options: OptionsInputTextAvecIcone);
    setDisabled(disabled: boolean): void;
    setValue(texte: string | number): void;
    setValueFireEvent(texte: string | number): void;
    focus(): void;
    checkCondition(valeur: string): boolean;
    checkConditionValueChange(valeur: string): boolean;
    getValue(): string | number;
    setBlur(fn: () => void): xInputTextAvecIcone;
    addClass(classe: string): void;
    removeClass(classe: string): void;
    width(parame?: string | number): void | number;
    height(parame?: string | number): void | number;
}
interface OptionsSpan extends OptionsHtml {
    textVariable?: string;
    textLocalise?: string;
    title?: string;
}
declare class xSpan extends xElement {
    constructor(options?: OptionsSpan);
    setTitle(newTitle: string): void;
}
declare enum enumCote {
    tous = 0,
    haut = 1,
    droite = 2,
    bas = 3,
    gauche = 4
}
declare class xStyle extends xElement {
    private dicoTargetCss;
    /** ATTENTION cet xElement est a utiliser uniquement unique sous la tutel des graphistes*/
    constructor();
    AddCss(Target: string, Css: string, Surcharge?: boolean): void;
    EmptyAllCss(): void;
    private genClassCss;
    static addClass(s: string, xelement: iXElement): void;
    static removeClass(s: string, xelement: iXElement): void;
    static AppliquerOptionsAffichage(xelement: iXElement, optionsAffichage: optionsAffichage): void;
    private static isCouleurHexa;
    static getLuminositeCouleurHexa(couleurFondADefinir: string): number;
    private static EclaicirAssombrirDecimal;
    static EclaicirCouleurHex(couleurFondADefinir: string, pourcentageEclaicisment: number): string;
    static AssombrissementCouleurHex(couleurFondADefinir: string, pourcentageAssombrissement: number): string;
    /**
     * ATTENTION, à n'utiliser que lorsqu'un graphiste vous l'a demandé.
     * La méthodologie normale de changement de couleur fond est l'application d'une class
     * @param element
     * @param couleurFondADefinir
     * @param opacite
     * @param transparence
     */
    static setCouleurFond(element: iXElement, couleurFondADefinir: string, opacite?: number, transparence?: boolean, iscouleurFondDynamique?: boolean): void;
    /**
     * ATTENTION, à n'utiliser que lorsqu'un graphiste vous l'a demandé.
     * La méthodologie normale de changement de couleur de texte est l'application d'une class
     * @param element
     * @param couleurFondADefinir
     * @param opacite
     */
    static setCouleurTexte(element: iXElement, couleurTexteADefinir: string): void;
    /**
     * ATTENTION, à n'utiliser que lorsqu'un graphiste vous l'a demandé.
     * La méthodologie normale de changement de couleur de border est l'application d'une class
     * @param element
     * @param couleurFondADefinir
     * @param cote
     */
    static setCouleurBorder(element: iXElement, couleurBorderADefinir: string | enumCouleurHexa, cote?: enumCote, iscouleurBorderDynamique?: boolean): void;
    static setCouleurFondAvecContrasteTexteAuto(element: iXElement, couleurFondADefinir: string, opacite?: number, transparence?: boolean, iscouleurFondDynamique?: boolean): void;
    static supprimerCouleurFond(element: iXElement): void;
    private static SetCotesCss;
    static setMargin(xelement: iXElement, optionCotes: OptionsCotesCSS): void;
    static setPadding(xelement: iXElement, optionCotes: OptionsCotesCSS): void;
    static setCurseur(xelement: iXElement, Curseur: enumCurseur): void;
    static setWidth(xelement: iXElement, optionTailleCss: OptionTailleCss): void;
    static setBorder(xelement: iXElement, optionCotes: OptionsCotesCSS, typeBorder?: enumStyleBorderCSS): void;
    static supprimerCurseur(xelement: iXElement): void;
}
interface OptionsLi extends OptionsHtml {
    text?: string;
}
declare class xLi extends xElement {
    private xh;
    constructor(options?: OptionsLi);
    get asHolder(): iXElementHolder;
}
declare class xInputCheckBox extends xElement {
    constructor(options: OptionsInputCheckBox);
    isChecked(): boolean;
    setChecked(val: boolean): boolean;
}
declare class xTable extends xElement {
    constructor(options?: OptionsHtml);
}
interface optionTimePicker {
    value?: xTime;
    valueChange?: (val: xTime) => void;
    class?: string;
}
declare class xTimePicker implements iXElement {
    gridPrincipal: xxGrid;
    wrapPrincipal: xxWrapPanel;
    gridHeure: xxGrid;
    gridMinute: xxGrid;
    listeGridItemHeure: xxGridItem[];
    listeGridItemMinute: xxGridItem[];
    value: xTime;
    valueChange: (val: xTime) => void;
    class: string;
    private isTimeInit;
    width(parame?: string | number): void | number;
    height(parame?: string | number): void | number;
    constructor(option: optionTimePicker);
    createTimePicker(): void;
    setValue(time: xTime): void;
    get y(): HTMLElement;
    addClass(s: string): void;
}
declare class xUl extends xElement implements iXElementHolderEnable {
    private xh;
    get asHolder(): iXElementHolder;
    constructor(options?: OptionsHtml);
}
interface OptionsAutoCompleteValueCode<T> extends OptionsHtml {
    listeValeurs: T[];
    getLibelle: (elem: T, datas?: T[]) => string;
    getClass?: (elem: T, datas?: T[]) => string;
    getIdTest?: (elem: T) => string;
    valueChange: (val: T) => void;
    placeholder?: string;
    libelleNullChoice?: string;
    value: string;
    getKey: (obj: T) => string;
    typeValue?: T;
    asyncLoading?: () => Promise<T[]>;
    asyncResearch?: (search: string) => Promise<T[]>;
    goasyncResearch?: (search: string) => boolean;
    lectureSeule?: boolean;
    binding: never;
    taille?: enumAutoCompleteTaille;
    renderItemInListe?: (p: iXElementHolder, item: T, selecteur: (a: T) => void) => void;
    /** Regroupe les elements (comme un groupBy), sous une seule bannier commune (modifie l'ordre des données) */
    regroupementUniqueBy?: {
        /** Sans c'est options le header sera juste un libelle avec la donnée du GroupBy */
        groupHeaderCustom?: (place: iXElementHolder, listGroup: T[]) => void;
        GroupBy: (a: T) => string | boolean | number | DateSerialisable | Date;
    };
    renderOpen?: (place: iXElementHolder, item: T, open: (item: T) => void) => void;
    champLarge?: boolean;
    iconeInput?: enumIconeSvg;
    couleurIcone?: enumCouleur;
    renderLectureSeule?: (p: iXElementHolder, item: T) => void;
    optionsAffichage?: optionsAffichage;
    largeurEnPixels?: number;
}
interface OptionsAutoCompleteValueObject<T> extends OptionsHtml {
    listeValeurs: T[];
    getLibelle: (elem: T, datas?: T[]) => string;
    getClass?: (elem: T, datas?: T[]) => string;
    getIdTest?: (elem: T) => string;
    valueChange: (val: T) => void;
    placeholder?: string;
    libelleNullChoice?: string;
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
    };
    taille?: enumAutoCompleteTaille;
    renderItemInListe?: (p: iXElementHolder, item: T, selecteur: (a: T) => void) => void;
    /** Regroupe les elements (comme un groupBy), sous une seule bannier commune (modifie l'ordre des données) */
    regroupementUniqueBy?: {
        /** Sans c'est options le header sera juste un libelle avec la donnée du GroupBy */
        groupHeaderCustom?: (place: iXElementHolder, listGroup: T[]) => void;
        GroupBy: (a: T) => string | boolean | number | DateSerialisable | Date;
    };
    renderOpen?: (place: iXElementHolder, item: T, open: (item: T) => void) => void;
    champLarge?: boolean;
    iconeInput?: enumIconeSvg;
    couleurIcone?: enumCouleur;
    renderLectureSeule?: (p: iXElementHolder, item: T) => void;
    optionsAffichage?: optionsAffichage;
    largeurEnPixels?: number;
}
interface ShownItem<T> {
    cle: string;
    value: T;
    click: () => void;
    toggleSelect: (on: boolean) => void;
}
declare type OptionsAutoComplete<T> = OptionsAutoCompleteValueCode<T> | OptionsAutoCompleteValueObject<T>;
declare enum enumAutoCompleteTaille {
    s = "s",
    m = "m",
    l = "l",
    xl = "xl"
}
declare class xxAutoComplete<T> implements iXElement {
    private listDeroulante;
    private elementAutocomplete;
    private binding;
    private input;
    private boutonMore;
    private valeurLectureSeule;
    private filtre;
    private valEnTempsReel;
    private readonly NB_AFFICHAGE_LISTE;
    private endOfList;
    private datas;
    private datasFiltre;
    private datasAfficher;
    private _asyncLoaded;
    private asyncResearch;
    private goasyncResearch?;
    private idTimeOut;
    private TIME_FOR_TIMEOUT;
    private isListVisible;
    private libelleSiNull;
    private HaveChoiseNull;
    private curseurBouton;
    private getLibelle;
    private getClass;
    private getKey?;
    private getIdTest?;
    private valueChange;
    private renderItemInListe?;
    private renderOpen;
    private bindLectureSeule;
    private renderLectureSeule;
    private value;
    private labelLectureSeule;
    private holderLectureSeule;
    private optionsAffichage;
    get y(): HTMLElement | SVGElement;
    get allDatas(): T[];
    get asyncLoaded(): Promise<T[]>;
    constructor(options: OptionsAutoComplete<T>);
    private getDatas;
    private searchInList;
    setValue(val: string): void;
    private setDefaultValue;
    CodeEstPresentDansLeDico(code: string): Promise<boolean>;
    private GetListeCleValeur;
    addElements(elems: T[]): void;
    addElement(elem: T): void;
    private filtrerListe;
    private chargerListe;
    removeAllElements(): void;
    private selectedSet;
    private selectedDeplacer;
    private selectedClick;
    openList(): xxAutoComplete<T>;
    closeList(): xxAutoComplete<T>;
    select(item: T): xxAutoComplete<T>;
}
interface OptionsAssistantUser {
    page: xxPageWrapper;
    affichageSimpleSansRecap?: boolean;
}
declare class xxAssistantSaisieUtilisateur implements iXElement {
    private cettePage;
    private elementPrincipal;
    private affichageSimpleSansRecap;
    private dataDecision;
    private zoneRecapitulatif;
    private tabRecap;
    private zoneChoix;
    private tabHistoCheminValeur;
    private radioButtonEtapes;
    private labelTitreEtape;
    private textSaisie;
    constructor(option: OptionsAssistantUser);
    get y(): HTMLElement;
    private renderStackAide;
    ajouterSaisieUtilisateur(saisie: xxAssistantSaisieUtilisateurData): void;
    setChoixPossibleSaisieUtilisateur(id: string, choixPossible: string[]): void;
    setDomSaisieUtilisateur(id: string, dom: iXElement): void;
    setActionSaisieUtilisateur(id: string, action: () => void): void;
    renderAideDecision(id: string): void;
    ajouterReponseAideDecision(val: string, id: string, sansModifReponse?: boolean): void;
    ajouterQuestionAideDecision(val: string, maClass: string, Obligatoire?: boolean): void;
    private ajoutRecap;
    private getRecap;
    ajouterReponseEtResume(val: string, id: string): void;
    retourEtapeSelectionner(selection: string): void;
    /** Retourne un récapitulatif final des étapes sous forme de texte. */
    getRecapitulatif(): string;
    /** Retourne un xelement avec les étapes de l'assistant. */
    getEtapes(): iXElement;
    private setEtape;
    /**
     * Rend visible les boutons des étapes suivantes.
     * @param id
     */
    showButtonsEtapeSuivante(id: string): void;
    /**
     * Rend invisible les boutons des étapes suivantes.
     * @param id
     */
    hideButtonsEtapeSuivante(id: string): void;
}
declare class xxAssistantSaisieUtilisateurData {
    id: string;
    libelleSelection: string;
    libelleContenu: string;
    choixPossible: string[];
    saisieDemande: boolean;
    elementDom: iXElement;
    action: () => void;
    placeHolderVariable: string;
    valeurDefautVariable: string;
    valeurSaisieBinding: BindableObject<string>;
    multiline: boolean;
    saisieObligatoire: boolean;
    classPourSaisie: string;
    class: string;
    private itemRadioButton;
    iconeSelection: Icone;
    private buttonChoixPossible;
    cacherButtonChoixPossible?: boolean;
    withResume: boolean;
    libelleResumeSpecifique: string;
    withRetourLigneResume: boolean;
    isRempli: boolean;
    constructor(o: ixxAssistantSaisieUtilisateurData);
    activerRadioButton(): void;
    desactiverRadioButton(): void;
    createItemRadioButton(index: number): itemRadioButton<string>;
    createButtonChoixPossible(click: () => void): xxBouton;
    setVisibilityButtonChoix(visible: boolean): void;
}
interface ixxAssistantSaisieUtilisateurData {
    id: string;
    libelleSelection: string;
    iconeSelection?: Icone;
    libelleContenu: string;
    choixPossible: string[];
    saisieDemande?: {
        multiline?: boolean;
        placeHolderVariable?: string;
        valeurDefautVariable?: string;
        binding?: BindableObject<string>;
        saisieObligatoire?: boolean;
        classSaisie?: string;
    };
    elementDom?: iXElement;
    action?: () => void;
    class?: string;
    cacherChoixPossible?: boolean;
    resume?: {
        libelleResume?: string;
        retourLigne: boolean;
    };
}
declare enum enumBoxerMode {
    standard = 1,
    maximize = 2,
    pleinePage = 3
}
declare enum enumBoxerTaille {
    s = 1,
    m = 2,
    l = 3,
    xl = 4,
    fit = 5
}
declare enum enumPositionOrigine {
    top_left = 0,
    top_right = 1,
    bottom_left = 2,
    bottom_right = 3
}
interface OptionsBoxer extends iTestable {
    id?: string;
    class?: string;
    initContent?: iXElement;
    beforeClose?: (fermerDefinitivement: () => void) => void;
    afterClose?: (myBoxer: xxBoxer) => void;
    beforeShow?: (myBoxer: xxBoxer) => void;
    titleLocalise?: string;
    titleVariable?: string;
    modal?: boolean;
    sansBtnClose?: boolean;
    tailleBoxer?: enumBoxerTaille;
    nonPersistent?: boolean;
    ModeAffichage?: enumBoxerMode;
    positionOriginie?: enumPositionOrigine;
    positionVerticale?: number;
    positionHorizontale?: number;
    optionsAffichage?: optionsAffichage;
}
declare class xxBoxer implements iXElement {
    get y(): HTMLElement;
    private divPrincipal;
    private divPlexiglas;
    private divBtn;
    private contenuHolder;
    private visible;
    private modeAffichage;
    private modeModal;
    private sansBtnClose;
    private tailleBoxer;
    private positionOrigine?;
    private positionVerticale?;
    private positionHorizontale?;
    private IsNonPersistent;
    vider(): xxBoxer;
    SupprimerBoxer(): void;
    private get boxerModeClass();
    private get boxerSizeClass();
    private get visibleClass();
    private refreshClass;
    afficher(): xxBoxer;
    fermerWithoutBeforeClose(): xxBoxer;
    fermer(): xxBoxer;
    toggleAgrandir(): xxBoxer;
    setBoxerMode(mode: enumBoxerMode): void;
    changerTaille(taille: enumBoxerTaille): xxBoxer;
    ajouterContenu(ajout: iXElement): xxBoxer;
    private beforeClose;
    private afterClose;
    private beforeShow;
    private affecterPositionOrigine;
    constructor(o: OptionsBoxer);
}
declare class xxBoxerPage extends xxBoxer {
    private myPage;
    constructor(o: OptionsPage, obox?: OptionsBoxer);
    get Page(): xxPageWrapper;
}
interface OptionsBloqueEcran {
    id?: string;
    class?: string;
    textVariable?: string;
    textLocalise?: string;
    fondVisible?: boolean;
}
declare class xxBloqueEcran implements iXElement {
    get y(): HTMLElement;
    private boxerPrincipal;
    constructor(o: OptionsBloqueEcran);
    fermer(): void;
}
interface OptionsxxDockPanel {
    id?: string;
    centrerDernier?: boolean;
    class?: string;
}
declare enum DockPosition {
    haut = 0,
    bas = 1,
    gauche = 2,
    droite = 3
}
declare class xxDockPanelDeprecated implements iXElement {
    private divPrincipal;
    private lastElement;
    private centrerDernier;
    constructor(o: OptionsxxDockPanel);
    toggleClass(classe: string, etatPlie: boolean): xElement;
    addClass(s: string): xElement;
    removeClass(s: string): xElement;
    get y(): HTMLElement;
    private ajouterElement;
    private ajouter;
    append(element: iXElement, pos: DockPosition, addClass?: string, addParentClass?: string): xxDockPanelDeprecated;
    ajouterDernier(element: iXElement, pos: DockPosition, addClass?: string, addParentClass?: string): xxDockPanelDeprecated;
    effacer(): xxDockPanelDeprecated;
}
declare enum enumPositionAlerte {
    bas = 0,
    bas_droite = 1,
    centre = 2,
    haut_droite = 3
}
declare enum enumTypeAlerte {
    info = 0,
    debug = 1,
    reussite = 2,
    erreur = 3,
    alerte = 4
}
declare enum enumDialogTypeBouton {
    pasDeBouton = 0,
    validerAnnuler = 1,
    QuitterAnnuler = 2,
    ouiNon = 3,
    infoImportante = 4
}
interface gridOptions {
    rowStart: 0;
    colStart: 0;
    nbRows: 5;
    nbCols: 4;
}
interface xxDialogOption {
    texteLocalise: string;
    titreLocalise?: string;
    xElementDialog?: iXElement;
    dureeAffichageSec?: number;
    dialogType?: enumDialogTypeBouton;
    type: enumTypeAlerte;
    dialogReponse?: (retour: boolean) => void;
    position?: enumPositionAlerte;
}
declare class xxDialog implements iXElement {
    get y(): HTMLElement;
    protected texte: string;
    private titre?;
    private dureeAffichageSec?;
    private dialogType?;
    private type;
    private position;
    private mainGrid;
    protected iconGridItem: xxGridItem;
    protected infoGridItem: xxGridItem;
    protected titreGridItem: xxGridItem;
    protected textGridItem: xxGridItem;
    private xElementDialog?;
    private idInterval;
    static stackPanelxxDialog: xxStackPanel;
    private xDivxxDialog;
    private dialogReponse?;
    constructor(o: xxDialogOption);
    private getSP;
    afficher(): void;
    fermer(): void;
    static afficherMessageDialog(message: string, type: ETypeAlertify, options?: alertify.IProperties): void;
    static afficherMessageDialogLog(message: string): void;
    static afficherMessageDialogError(message: string): void;
    static afficherMessageDialogSuccess(message: string): void;
    static afficherMessageDialogAlert(message: string): void;
    static afficherMessageDialogLocalise(message: string, type: ETypeAlertify, options?: alertify.IProperties): void;
    static afficherMessageDialogLocaliseLog(message: string): void;
    static afficherMessageDialogLocaliseError(message: string): void;
    static afficherMessageDialogLocaliseSuccess(message: string): void;
    static afficherMessageDialogLocaliseAlert(message: string): void;
    static afficherMessageDialogContent(content: iXElement, type: ETypeAlertify, options?: alertify.IProperties): void;
    static afficherMessageConfirmationLocalise(message: string, afficherOuiNon: boolean, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox, sansBoutons?: boolean): void;
    static afficherMessageConfirmation(message: string, afficherOuiNon: boolean, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox, sansBoutons?: boolean): void;
    static afficherErreurConfirmation(message: string, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox, sansBoutons?: boolean): void;
    static afficherMessageConfirmationPromise(message: string, afficherOuiNon: boolean, type_messagebox?: etype_messagebox, sansBoutons?: boolean): Promise<boolean>;
}
interface OptionsContainerEvent {
    id?: string;
    class?: string;
    initContent?: iXElement;
    onClick?: (cb: () => void) => void;
    onRightClick?: (cb: () => void) => void;
    onShiftClick?: (cb: () => void) => void;
    onDblClick?: (cb: () => void) => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    onMouseLeave?: () => void;
    onMouseEnter?: () => void;
    stopPropagation?: boolean;
    titleLocalise?: string;
    titleVariable?: string;
    onTouchLong?: (cb: () => void) => void;
    disabled?: boolean;
    optionsAffichage?: optionsAffichage;
    withDelaiPourMouseEnterMs?: number;
}
declare class xxContainerEvent implements iXElement, iXElementHolderEnable {
    private static CLASS_CLICK_EN_COURS;
    private static CLASS_DISABLED;
    private divForHolder;
    private holder;
    private content;
    private click;
    private dblClick;
    private shiftClick;
    private rightClick;
    private mouseOver;
    private mouseOut;
    private mouseEnter;
    private mouseLeave;
    private clickOut;
    private stopPropagation;
    private title;
    private longTouch;
    private dureeLong;
    private callbackTouchInterval;
    private disabled;
    private optionsAffichage;
    private idTimeOutDelaiPourMouseEnterMs?;
    width(parame?: string): void | number;
    height(parame?: string): void | number;
    get y(): HTMLElement;
    addClass(s: string): iXElementHolder;
    removeClass(s: string): iXElementHolder;
    get asHolder(): iXElementHolder;
    constructor(opt: OptionsContainerEvent);
    fakeEnter(): void;
    fakeLeave(): void;
    fakeClick(): void;
    fakeDblClick(): void;
    fakeRightClick(): void;
    fakeShiftClick(): void;
    fakeOver(): void;
    fakeOut(): void;
    operationEnCours(): void;
    operationEnCoursRemove(): void;
    setDisabled(isDisabled?: boolean): void;
}
interface OptionsChoixOuiNon {
    valeurParDefaut: boolean;
    valueChange: (val: boolean) => void;
    inactif?: boolean;
}
declare class xxChoixOuiNon implements iXElement {
    private radioOuiNon;
    get y(): HTMLElement;
    constructor(o: OptionsChoixOuiNon);
    setInactif(inactif: boolean): void;
}
declare enum enumNuancierCouleursDefaut {
    RougeFonce = "990000",
    Rouge = "ff3333",
    Orange = "ff6600",
    Jaune = "ffd833",
    VertClair = "53d353",
    Vert = "2eaa48",
    Turquoise = "27adad",
    BleuClair = "60d9ea",
    Bleu = "4389ed",
    BleuFonce = "383893",
    Violet = "7c3eb7",
    Rose = "ea8cae",
    Marron = "775d44",
    Beige = "d3c4ae",
    Blanc = "ffffff",
    GrisClair = "cccccc",
    GrisFonce = "666666",
    Noir = "161616"
}
declare enum enumNuancierCouleursUtilisateur {
    RougeFonce = "990000",
    Rouge = "ff3333",
    Orange = "ff6600",
    Jaune = "ffd833",
    VertClair = "53d353",
    Vert = "2eaa48",
    Turquoise = "27adad",
    BleuClair = "60d9ea",
    Bleu = "4389ed",
    BleuFonce = "383893",
    Violet = "7c3eb7",
    Rose = "ea8cae",
    Marron = "775d44",
    Beige = "d3c4ae",
    GrisClair = "cccccc",
    GrisFonce = "666666"
}
declare enum enumNuancierCouleurs {
    defaut = 0,
    utilisateur = 1
}
interface OptionsChoixCouleur {
    ValueChange?: (couleurHexa: string) => void;
    value?: string;
    binding?: {
        value?: BindableObject<string>;
        visibility?: BindableObject<enumVisibility>;
    };
    choixCouleurLibre: boolean;
    nuancierCouleurs?: enumNuancierCouleurs;
}
declare class xxChoixCouleur implements iXElement {
    private elementPrincipal;
    private _color;
    private listeCouleurs;
    private isChoixCouleurLibre;
    private typeNuancierCouleurs;
    get y(): HTMLElement;
    constructor(o: OptionsChoixCouleur);
}
declare module mChart {
    interface OptionsChartBar {
        title: string;
        desc: string;
        divContenant: iXElementHolder;
        data: DataChart[];
        id: string;
        width: number;
        height: number;
        click: (id: number) => void;
        withAffichageNbDansLesBar?: boolean;
    }
    interface OptionsChart {
        title: string;
        desc: string;
        divContenant: iXElement;
        data: DataChart[];
    }
    class DataChart {
        value: number;
        label: string;
        color: string;
        id: number;
        title: string;
        constructor(pvalue: number, plabel: string, pcolor: string, pid: number, ptitle?: string);
    }
    class xxChart {
        constructor(options: OptionsChart);
        private init;
    }
    class xxBarChart {
        constructor(options: OptionsChartBar);
    }
}
declare enum enumTypeCheckbox {
    standard = 0,
    slide = 1,
    texte = 2,
    image = 3,
    xxBouton = 4
}
interface OptionsInputCheckBoxStandard extends OptionsHtml {
    value?: boolean;
    CanValueChange?: (val: boolean) => boolean;
    ValueChange?: (val: boolean) => void;
    inactif?: boolean;
    titleVariable?: string;
    titleLocalise?: string;
    canbePartiel?: boolean;
    WithChangeValueWhenNull?: boolean;
    typeCheckbox?: enumTypeCheckbox.standard;
    withLabelContainer?: boolean;
    optionsLabelContainer?: {
        inverserLabelDOM?: boolean;
    };
    AffichageBoutonWapper2?: optionsAffichageBouton;
    renderIntermediaire?: () => iXElement;
    textLocalise?: string;
    textVariable?: string;
    imageEnable?: Icone;
    imageDisable?: Icone;
    IconeBoutonWapper2?: Icone | xIconeAvecAction;
    binding?: {
        value?: BindableObject<boolean>;
        visibility?: BindableObject<enumVisibility>;
    };
    espaceMinimaliste?: boolean;
}
interface OptionsInputCheckBoxAvecPartiel extends OptionsHtml {
    value?: boolean;
    CanValueChange?: (val: boolean) => boolean;
    ValueChange?: (val: boolean) => void;
    inactif?: boolean;
    titleVariable?: string;
    titleLocalise?: string;
    canbePartiel?: boolean;
    WithChangeValueWhenNull?: boolean;
    typeCheckbox?: enumTypeCheckbox;
    withLabelContainer?: boolean;
    optionsLabelContainer?: {
        inverserLabelDOM?: boolean;
    };
    AffichageBoutonWapper2?: optionsAffichageBouton;
    renderIntermediaire?: () => iXElement;
    imageEnable?: Icone;
    imageDisable?: Icone;
    IconeBoutonWapper2?: Icone | xIconeAvecAction;
    textLocalise?: string;
    textVariable?: string;
    binding?: {
        value?: BindableObject<boolean>;
        visibility?: BindableObject<enumVisibility>;
    };
    espaceMinimaliste?: boolean;
}
declare type OptionsInputCheckBox = OptionsInputCheckBoxStandard | OptionsInputCheckBoxAvecPartiel;
declare class xxCheckBox implements iXElement {
    private element;
    private divIcone;
    private cont;
    private btnTexte;
    private labelContainer;
    private inactif;
    private isInit;
    private options;
    private ValueChange;
    private _id;
    private binding;
    private Value;
    private CanValueChange;
    private canBePartiel;
    private WithChangeValueWhenNull;
    private isPartiel;
    private iscoche;
    private inverserLabelDom;
    private btnModeBtn;
    private renderIntermediaire;
    get y(): HTMLElement;
    get value(): boolean;
    get getId(): string;
    constructor(o: OptionsInputCheckBox);
    setValue(value: boolean): xxCheckBox;
    setValueSansValueChange(value: boolean): xxCheckBox;
    setActif(activer: boolean): xxCheckBox;
    addClass(s: string): xxCheckBox;
    removeClass(s: string): xxCheckBox;
    append(a: iXElement): xxCheckBox;
    private fnClick;
    private toggleIntermediaire;
    private toggleCoche;
    ChangerLabel(libelle: string, localiser?: boolean): void;
    ChangerTitle(libelle: string, localiser?: boolean): void;
    ChangerIconexxBouton(icone: Icone): void;
    vider(): void;
}
interface OptionsLabelModifiable {
    id?: string;
    class?: string;
    textVariable?: string;
    change?: (s: string) => void;
    type?: enumTypeLabel;
    libelleLabelSiVide?: string;
    multiline?: boolean;
    longueurMaxi?: number;
    testValidInput?: (s: string) => boolean;
    testValidInputAsync?: (s: string) => Promise<boolean>;
    texteLocaliseInvalideInput?: string;
    binding?: {
        value?: BindableObject<string | number>;
        visibility?: BindableObject<enumVisibility>;
    };
    optionsAffichage?: optionsAffichage;
}
declare class xxLabelModifiable implements iXElement {
    private elementPrincipal;
    private label;
    private libelleLabelSiVide;
    private type;
    private multiline;
    private class;
    private maVariable;
    private onchange;
    private testValidInput;
    private testValidInputAsync;
    private texteLocaliseInvalideInput;
    private longueurMaxi?;
    private inputSaisie;
    private binding?;
    constructor(o: OptionsLabelModifiable);
    setSurbrillanceBinding(sb: BindableObject<string>): xxLabelModifiable;
    setSurbrillance(s: string): xxLabelModifiable;
    ouvrirSaisie(): void;
    private reactiverLabel;
    get y(): HTMLElement;
    setValeur(valeur: string): void;
}
interface OptionsLabelDateModifiable {
    id?: string;
    class?: string;
    Value?: DateSerialisable;
    change: (t: DateSerialisable) => void;
    type?: enumTypeLabel;
    libelleLabelSiVide?: string;
    CanSelectDateNull?: boolean;
    testValidInput?: (s: DateSerialisable) => boolean;
    testValidInputAsync?: (s: DateSerialisable) => Promise<boolean>;
    texteLocaliseInvalideInput?: string;
    binding?: {
        value?: BindableObject<DateSerialisable>;
        visibility?: BindableObject<enumVisibility>;
    };
    optionsAffichage?: optionsAffichage;
}
declare class xxLabelDateModifiable implements iXElement {
    private elementPrincipal;
    private label;
    private libelleLabelSiVide;
    private type;
    private testValidInput;
    private testValidInputAsync;
    private texteLocaliseInvalideInput;
    private dateSelected;
    constructor(o: OptionsLabelDateModifiable);
    private changerValeurLabel;
    setSurbrillanceBinding(sb: BindableObject<string>): void;
    setSurbrillance(s: string): void;
    setVisibility(s: enumVisibility): void;
    get y(): HTMLElement;
}
declare enum enumPositionDuContenu {
    haut = 0,
    bas = 1,
    gauche = 2,
    droite = 3
}
declare enum enumJustificationDuContenu {
    debut = 0,
    centre = 1,
    fin = 2
}
interface optionsAffichageLabelContainer extends optionsAffichageLabel {
    positionDuContenu?: enumPositionDuContenu;
    justificationDuContenu?: enumJustificationDuContenu;
    largeurMaximum?: string;
}
interface OptionsLabelContainer {
    id?: string;
    class?: string;
    textVariable?: string;
    textLocalise?: string;
    titleVariable?: string;
    titleLocalise?: string;
    initContent?: iXElement;
    type?: enumTypeLabel;
    habillage?: enumHabillageLabel;
    lien?: OptionsHref;
    lineBreak?: boolean;
    taillePolice?: number;
    labelLargeurLibre?: boolean;
    binding?: {
        value?: BindableObject<string | number>;
        visibility?: BindableObject<enumVisibility>;
    };
    optionsAffichage?: optionsAffichageLabelContainer;
    gap?: number;
    drag?: {
        drop?: (ev: DragEvent) => void;
    };
}
declare class xxLabelContainer implements iXElement, iXElementHolderEnable {
    private elementPrincipal;
    private conteneurDuContenu;
    private monLabel;
    get asHolder(): iXElementHolder;
    addClass(s: string): xElement;
    removeClass(s: string): xElement;
    get y(): HTMLElement;
    constructor(o: OptionsLabelContainer);
    setSurbrillance(s: string): void;
    setSurbrillanceBinding(s: BindableObject<string>): void;
    append(element: iXElement): xxLabelContainer;
    vider(): void;
    setTypeLabel(type: enumTypeLabel): void;
    cacher(collapse?: boolean): void;
    afficher(): void;
    changerTextLocalise(s: string): void;
    changerTextVariable(s: string): void;
}
declare enum enumTypeLabel {
    standard = 0,
    titre = 1,
    soustitre = 2,
    important = 3,
    description = 4,
    temps = 5,
    bloc = 6,
    information = 7
}
declare enum enumHabillageLabel {
    standard = 0,
    warning = 1,
    erreur = 2,
    loading = 3,
    disabled = 4,
    valide = 5,
    info = 6,
    infoImportante = 7
}
declare enum enumMiseEnFormeLabel {
    standard = 0,
    ligneUnique = 1,
    espacesEtSautsDeLignePreserves = 2
}
declare enum enumDecorationLabel {
    aucun = 0,
    souligne = 1,
    barre = 2
}
interface optionsAffichageLabel extends optionsAffichage {
    couleurTexte?: enumCouleur;
    largeurMaximum?: string;
}
interface OptionsLabel {
    id?: string;
    class?: string;
    textVariable?: string | number;
    textLocalise?: string;
    titleLocalise?: string;
    titleVariable?: string;
    type?: enumTypeLabel;
    decoration?: enumDecorationLabel;
    habillage?: enumHabillageLabel;
    lien?: OptionsHref;
    lineBreak?: boolean;
    centrer?: boolean;
    tabindex?: number;
    taillePolice?: number;
    police?: string;
    binding?: {
        value?: BindableObject<string | number>;
        visibility?: BindableObject<enumVisibility>;
    };
    espaceMinimaliste?: boolean;
    miseEnForme?: enumMiseEnFormeLabel;
    optionsAffichage?: optionsAffichageLabel;
}
declare class xxLabel implements iXElement {
    private elementPrincipal;
    private montexteVariable;
    private typeLabel;
    private _haveSurbriance;
    get haveSurbriance(): boolean;
    width(parame?: string | number): void | number;
    height(parame?: string | number): void | number;
    constructor(o: OptionsLabel);
    setTaillePolice(n: number): void;
    setPolice(s: string): void;
    changerTextLocalise(s: string): void;
    cacher(collapse?: boolean): void;
    afficher(): void;
    setTypeLabel(type: enumTypeLabel): void;
    changerTextVariable(s: string | number): void;
    private annulerSurbrillance;
    private changerTexteDom;
    changerTitlteLocalise(s: string): void;
    changerTitleVariable(s: string | number): void;
    private changerTitlteDom;
    setSurbrillanceBinding(sb: BindableObject<string>): xxLabel;
    setSurbrillance(s: string, couleur?: string): xxLabel;
    private setTemps;
    hideLabel(collapse?: boolean): void;
    showLabel(): void;
    get y(): HTMLElement;
    addClass(c: string): xxLabel;
    removeClass(c: string): xxLabel;
}
interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    serviceURI: string;
    start(): void;
    stop(): void;
    abort(): void;
    onaudiostart: (ev: Event) => any;
    onsoundstart: (ev: Event) => any;
    onspeechstart: (ev: Event) => any;
    onspeechend: (ev: Event) => any;
    onsoundend: (ev: Event) => any;
    onaudioend: (ev: Event) => any;
    onstart: (ev: Event) => any;
    onend: (ev: Event) => any;
}
interface SpeechRecognitionStatic {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
}
declare var SpeechRecognition: SpeechRecognitionStatic;
declare var webkitSpeechRecognition: SpeechRecognitionStatic;
interface SpeechGrammar {
    src: string;
    weight: number;
}
interface SpeechGrammarStatic {
    prototype: SpeechGrammar;
    new (): SpeechGrammar;
}
declare var SpeechGrammar: SpeechGrammarStatic;
declare var webkitSpeechGrammar: SpeechGrammarStatic;
interface SpeechGrammarListStatic {
    prototype: SpeechGrammarListStatic;
    new (): SpeechGrammarListStatic;
}
declare var webkitSpeechGrammarList: SpeechGrammarListStatic;
declare class xxInputSpeech implements iXElement {
    private elementPrincipal;
    private xInput;
    constructor(options: OptionsInput);
    get y(): HTMLElement;
    setValue(texte: string): void;
}
interface OptionsInputMail {
    valeur?: string;
    valueChange?: (val: string) => void;
    lectureSeule?: boolean;
}
declare class xxInputMail implements iXElement {
    private wrap;
    private valueChange?;
    private libelleMail;
    get y(): HTMLElement;
    constructor(o: OptionsInputMail);
    switchToLink(lectureSeule: boolean, nouveauLibelle?: string): void;
    private switchToEdition;
    private setMail;
}
interface OptionsInputTelephone {
    valeur?: string;
    valueChange?: (val: string) => void;
    lectureSeule?: boolean;
    class?: string;
}
declare class xxInputTelephone implements iXElement {
    private retour;
    private valueChange?;
    private class;
    get y(): HTMLElement;
    constructor(o: OptionsInputTelephone);
    update(lectureSeule: boolean, nouveauNumero: string): void;
}
interface OptionsInputNumerir extends OptionsInputNumericGenerique {
    class?: string;
    value?: number;
    rounded?: boolean;
    style?: enumStyleInput;
    background?: enumBackgroundInput;
    ValueChange?: (val: number) => void;
    autoChange?: boolean;
    KeyUpEnterCallback?: (val: number) => void;
    KeyUpCancelCallback?: () => void;
    plusMinusButton?: optionBtnPlusMoin;
    AfficheplusMinusButtonFleche?: boolean;
    binding?: {
        value?: BindableObject<number>;
        visibility?: BindableObject<enumVisibility>;
    };
    placeHolderVariable?: string;
    placeHolderlocalise?: string;
    disabled?: boolean;
}
interface optionBtnPlusMoin {
    nbAAjouter?: number;
    nbASoustrare?: number;
}
declare class xxInputNumerique implements iXElement {
    private elementPrincipal;
    private inputNumeric;
    private class;
    get y(): HTMLElement;
    constructor(option: OptionsInputNumerir);
    setValue(texte: number): void;
    setValueFireEvent(texte: number): void;
    focus(): void;
    getValue(): number;
}
interface optionXxIndicateur {
    indicateur: iXElement;
    class?: string;
    Notif?: optionXxIndicateurNotif[];
    NotifHideAlwaysTakePlace?: boolean;
    NotifAlwaysShow?: boolean;
    TooltipStopPropagation?: boolean;
    titleLocalise?: string;
    titleVariable?: string;
    toolTipContent?: iXElement;
    tooltipIsContentLoadOnShow?: boolean;
    tooltipTitreHeaderVariable?: string;
    tooltipTitreHeaderLocalise?: string;
    tooltipOnShow?: (thisTooltip: xxToolTip) => void;
    tooltipOnHide?: (thisTooltip: xxToolTip) => void;
    click?: () => void;
    optionsAffichage?: optionsAffichage;
}
interface optionXxIndicateurNotifNoBind {
    Caractere?: string;
    nbNotif: number;
    nbNotifBindable?: BindableObject<number>;
    NotifTitleVariable?: string;
    NotifTitleLocalise?: string;
    NotifTitleToolTipContent?: iXElement;
    NotifColor?: EnumXxIndicateurNotifColor;
}
interface optionXxIndicateurNotifBind {
    Caractere?: string;
    nbNotif?: number;
    nbNotifBindable: BindableObject<number>;
    NotifTitleVariable?: string;
    NotifTitleToolTipContent?: iXElement;
    NotifTitleLocalise?: string;
    NotifColor?: EnumXxIndicateurNotifColor;
}
interface optionXxIndicateurNotifCaractere {
    Caractere: string;
    nbNotif?: number;
    nbNotifBindable?: BindableObject<number>;
    NotifTitleVariable?: string;
    NotifTitleToolTipContent?: iXElement;
    NotifTitleLocalise?: string;
    NotifColor?: EnumXxIndicateurNotifColor;
}
declare type optionXxIndicateurNotif = optionXxIndicateurNotifNoBind | optionXxIndicateurNotifBind | optionXxIndicateurNotifCaractere;
declare enum EnumXxIndicateurNotifColor {
    Noir = "emed_noir",
    GrisFonce = "emed_grisfonce",
    GrisClair = "emed_grisclair",
    Blanc = "emed_blanc",
    MarronFonce = "emed_marronfonce",
    MarronClair = "emed_marronclair",
    RougeFonce = "emed_rougefonce",
    Rouge = "emed_rouge",
    Orange = "emed_orange",
    Jaune = "emed_jaune",
    Vert = "emed_vert",
    Turquoise = "emed_turquoise",
    Bleu = "emed_bleu",
    Violet = "emed_violet",
    Peau = "emed_peau",
    Rose = "emed_rose"
}
declare class xxIndicateur implements iXElement {
    private divIndicateur;
    private stacknotif;
    private ListNotif;
    private NotifHideAlwaysTakePlace;
    private NotifAlwaysShow;
    private isModeTooltip;
    get y(): HTMLElement;
    constructor(option: optionXxIndicateur);
    private generateContenu;
    private generateNotif;
    addNotif(newNotif: optionXxIndicateurNotif, index?: number): void;
    removeNotif(index: number): void;
    setNbNotif(newValeur: number, index: number): void;
    RecalculTooltip(): void;
    hideTooltip(): void;
}
declare enum enumTypeImage {
    backgroundImage = 0,
    domImage = 1
}
interface OptionsImageTabByte {
    class?: string;
    tabByte: string;
    typeAffichage: enumTypeImage;
}
declare class xxImageTabByte {
    private container;
    get y(): HTMLElement;
    constructor(options: OptionsImageTabByte);
    SetTabByte(tabByte: string, typeAffichage: enumTypeImage): void;
}
interface OptionsGridLayout {
    id?: string;
    class?: string;
    gridGap?: string;
    lignes_auto?: string;
    container_fluid?: boolean;
    noMargin?: boolean;
    structureDePage?: boolean;
}
interface iDisplayDevice {
    nbCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    nbRows?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    hidden?: boolean;
}
interface iDisplay<T> {
    pc?: T;
    tablette?: T;
    mobile?: T;
}
interface ixGridLayoutElement {
    element: iXElement;
    display?: iDisplay<iDisplayDevice>;
    dispositionContenu?: {
        horizontal?: 'gauche' | 'centre' | 'droite' | 'fullHauteur';
        vertical?: 'haut' | 'centre' | 'bas' | 'fullHauteur';
    };
    id?: string;
    class?: string;
}
declare class xxGridLayout {
    private elemPrincipal;
    private static getClassesFromixGridLayoutElement;
    append(listItem: ixGridLayoutElement[]): xxGridLayout;
    constructor(o: OptionsGridLayout);
    get y(): HTMLElement;
    cacher(collapse?: boolean): xxGridLayout;
    afficher(): xxGridLayout;
    vider(): xxGridLayout;
}
interface OptionsUploadImage extends OptionsHtml {
    ValueChange: (fichierbase64: string) => void;
    appareilPhoto?: 'selfie' | 'appareil' | 'nimporteQuelObjectif';
    textVariable?: string;
    textLocalise?: string;
    widthMax?: number;
}
declare class xxInputUploadImage extends xInputFile {
    constructor(o: OptionsUploadImage);
}
interface OptionsLabelTimeModifiable {
    id?: string;
    class?: string;
    textVariable: string;
    change: (t: xTime) => void;
    type?: enumTypeLabel;
    libelleLabelSiVide?: string;
    optionsAffichage?: optionsAffichage;
}
declare class xxLabelTimeModifiable implements iXElement {
    private elementPrincipal;
    private label;
    private libelleLabelSiVide;
    private type;
    private changerValeurLabel;
    constructor(o: OptionsLabelTimeModifiable);
    get y(): HTMLElement;
}
declare enum enumEpaisseurSeparation {
    fin = "xsep-epais_f",
    large = "xsep-epais_l"
}
interface optionXSeparateur {
    class?: string;
    orientation: enumTypeOrientation;
    margin?: OptionsCotesCSS;
    epaisseur?: enumEpaisseurSeparation;
    tailleCustom?: number;
}
declare class xSeparateur implements iXElement {
    get y(): HTMLElement;
    private readonly MARGIN_DEFAULT;
    private separateur;
    private option;
    constructor(option: optionXSeparateur);
    private setMargin;
    private isOptionMarginFour;
    private isOptionMarginTwo;
    private getValueMarginDefault;
}
interface optionsXSeparateurAvecFleche {
    class?: string;
    positionFleche: enumPosition;
    optionsxSeparateur: optionXSeparateur;
}
declare class xSeparateurAvecFleche implements iXElement {
    get y(): HTMLElement;
    private grid;
    private option;
    constructor(option: optionsXSeparateurAvecFleche);
}
/**
 * @author Dimitry Kudrayvtsev
 * @version 2.0
 *
 * Ported to d3 v4 by Keyvan Fatehi on October 16th, 2016
 */
declare module mGantt {
    interface iMargin {
        top: number;
        left: number;
        bottom: number;
        right: number;
    }
    interface optionsGantt<T, J> {
        tasksTypes: string[];
        tickFormat: string;
        timeDomain: [Date, Date];
        gradient: boolean;
        horizontal: boolean;
        size: {
            height: number;
            width: number;
        };
        margin: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        taskMap: {
            Key: (t: T) => string;
            startDate: (t: T) => Date;
            endDate: (t: T) => Date;
            taskName: (t: T) => string;
            description: (t: T) => string;
            title: (t: T) => string;
            click?: (t: T) => ((a: SVGElement) => void);
            hover?: (t: T) => ((a: SVGElement) => void);
            pourcentage1: (t: T) => number;
            pourcentage2: (t: T) => number;
            render: (j: T, a: svgTaskWrapper) => void;
        };
        jalonMap: {
            Key: (t: J) => string;
            dateSouhaitee: (j: J) => Date;
            textVariable: (j: J) => string;
            click?: (j: J) => ((a: SVGElement) => void);
            hover?: (j: J) => ((a: SVGElement) => void);
            render: (j: J, a: svgJalonWrapper) => void;
        };
    }
    class svgElementWrapper {
        private myElement;
        constructor(s: SVGElement);
        toggleClass(classe: string, actif: boolean): void;
        cancelFill(): void;
    }
    class svgTaskWrapper extends svgElementWrapper {
        constructor(s: SVGElement);
    }
    class svgJalonWrapper extends svgElementWrapper {
        constructor(s: SVGElement);
    }
    class xxGantt<T, J> {
        private svg;
        private x;
        private y;
        private xAxis;
        private yAxis;
        private heightPlanifiable;
        private heightCellule;
        private dictionnaireElements;
        private dictionnaireJalons;
        classed(str: string, b: boolean): void;
        get margin(): iMargin;
        getElementFromKey(tache: T): SVGElement;
        getJalonFromKey(j: J): SVGElement;
        private _width;
        set width(value: number);
        get width(): number;
        private _height;
        get height(): number;
        set height(value: number);
        private _tickFormat;
        get tickFormat(): string;
        set tickFormat(value: string);
        private tasks;
        addtasks(planifs: T[]): void;
        initAxis(): void;
        flip(): xxGantt<T, J>;
        private myOpt;
        constructor(opt: optionsGantt<T, J>);
        draw(inTaches: T[], inJalons: J[], selecteur: string | HTMLElement): xxGantt<T, J>;
        drawMaintenant(): xxGantt<T, J>;
        drawJalon(j: J): xxGantt<T, J>;
    }
}
interface OptionsInputIntellisense extends OptionsInput {
    listeAutoComplete: string[];
    nbLigneAfficher: number;
}
declare class xxInputIntellisense implements iXElement {
    private divContent;
    private divContentEditable;
    private tooltipAutoComplete;
    private listeMotsAutoComplete;
    private listAutoComplete;
    private listEventContainers;
    private indexCurrent;
    private debutMot;
    private posCurseurLeftDebutMot;
    private widthTooltip;
    private myNewInputElement;
    private posCurseurInInput;
    private currentNode;
    private nbLigneAfficher;
    private bloqueLostFocus;
    width(parame?: string | number): void | number;
    height(parame?: string): void | number;
    get y(): HTMLElement;
    constructor(options: OptionsInputIntellisense);
    private getContenuText;
    private setTabIndexAutoComplete;
    private setTextAutoComplete;
    private setCursorAtEnd;
    setValue(texte: string): void;
    setListMotsAutoComplete(mots: string[]): void;
    private IsEspace;
    private setTextPourRecherche;
    setHeight(): void;
    private getHeightInPx;
}
interface OptionsLecteurCarteMagnetique {
    callbackScan: (idCarte: string) => void;
}
declare class xxLecteurCarteMagnetique implements iXElement {
    private btnLectureCarte;
    private inputScan;
    private dataCarte;
    constructor(options: OptionsLecteurCarteMagnetique);
    get y(): HTMLElement;
}
interface OptionViewerPDF {
    WithBoutonTelecharger?: boolean;
    AffichagePageWrapper?: boolean;
    WithoutTitlePDF?: boolean;
}
declare class xxViewerPDF implements iXElement {
    private _Conteneur;
    private _Page;
    private _Stackmobile;
    private _divContenu;
    private _bindingTitre;
    private _TabBinary;
    private _nameDoc;
    get y(): HTMLElement;
    constructor(o: OptionViewerPDF);
    geneButtonDownLoad(): xxBouton;
    /**
     * Affiche le pdf spécifié en format base64.
     * @param dataFilepdf
     * @param div
     */
    afficher(dataFilepdf: string, nompdf: string): Promise<void>;
    /**
     * Affiche le pdf spécifié dans un boxer
     * @param dataFilepdf
     * @param nompdf
     */
    afficheBoxer(dataFilepdf: string, nompdf: string): Promise<void>;
    /**
     * Ajoute la page spécifiée du pdf dans le canvas.
     * @param numpage
     * @param pdf
     */
    private afficherPage;
}
interface OptionsListeChoixLang {
    defaultValue: string;
    donnees?: string[];
    renderSelectedClass?: string;
    selected: (lang: string) => void;
}
declare class xxListeChoixLang implements iXElement {
    private monListeChoixDeroulante;
    get y(): HTMLElement;
    constructor(inOptions: OptionsListeChoixLang);
}
declare class xxListChoix implements iXElement {
    private element;
    private optionsSelect;
    private classElementList;
    private classIsSelected;
    private iconeAAfficher;
    private boutonSelection;
    private buttonDefault;
    private _list;
    private _cache;
    get y(): HTMLElement;
    addClass(s: string): xElement;
    constructor(options: OptionsSelect);
    private closeList;
    private loadList;
    addElements(elements: CleValeur<string, string>[]): void;
}
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
    affichageEnGrid?: {
        /** en cas d'affichage horizontal*/
        nbCols: number;
        gridGap?: string;
        /** en cas d'affichage vertical*/
        nbRows: number;
    };
}
declare class xxListCheckBox<T> implements iXElement {
    private myList;
    private datas;
    private container;
    private selection;
    private tousSelectionnes;
    private noClickOnTous;
    private ZoneCheckboxtous;
    private CheckBoxTous;
    private valueChange;
    private itemsSelected;
    private itemsDesactivated;
    private egalite;
    private typeOrientaion;
    private classeElement;
    private itemChecked?;
    private getId;
    private renderItem;
    private affichageEnGrid?;
    get y(): HTMLElement;
    constructor(o: OptionsListCheckBox<T>);
    private getData;
    private createListe;
    private TestAllSelect;
    supprimerAllData(): void;
    supprimerItems(tab: T[]): void;
    setValues(values: T[]): void;
    ajouterItems(tab: T[], PreselectionSelectionner?: boolean): void;
    private indexOfItem;
    /**
     * Modifie la valeur de la case à cocher "tous".
     * @param value
     */
    setCocheTous(value: boolean): void;
    getAllDatas(): T[];
    getSelection(): T[];
}
interface OptionsxxLinker {
    renderLienTheorique: () => Promise<{
        lien: string;
        params: string[];
    }>;
    routeur: xxRouteContainer;
    icone?: Icone | 'none';
    textLocalise?: string;
    textVariable?: string;
}
declare class xxLinker implements iXElement {
    private elementPrincipal;
    private monRouteur;
    private renderLienTheorique;
    get y(): HTMLElement;
    constructor(o: OptionsxxLinker);
}
declare enum enumAlignementZone {
    gauche = "xpag-align_gauche",
    centre = "xpag-align_centre",
    droite = "xpag-align_droite"
}
declare enum enumStyleHeader {
    avecOmbreT20 = "xpag-header_avecombre",
    sansOmbreT20 = "xpag-header_sansombre"
}
interface optionsAffichagePageWrapper extends optionsAffichage {
    styleHeader?: enumStyleHeader;
}
interface OptionsPage {
    titleLocalise: string;
    localizationParams?: (number | string)[];
    withFooter?: boolean;
    icone?: Icone;
    id?: string;
    class?: string;
    classBody?: string;
    withHeader?: boolean;
    withPreHeader?: boolean;
    scrollableHeader?: boolean;
    centrerContenu?: boolean;
    initContent?: iXElement[];
    initContentFooter?: iXElement[];
    initContentHeader?: iXElement[];
    alignementFooter?: enumAlignementZone;
    alignementHeader?: enumAlignementZone;
    optionsAffichage?: optionsAffichagePageWrapper;
}
declare class xxPageWrapper implements iXElement {
    private zoneWS;
    private zoneTitleDiv;
    zoneTitle: iXElementHolder;
    private zonePrincipaleDiv;
    zonePrincipale: iXElementHolder;
    private zoneFooterDiv;
    zoneFooter: iXElementHolder;
    private zonePreHeaderDiv;
    zonePreHeader: iXElementHolder;
    private alignementFooter;
    private alignementHeader;
    private titre;
    private localizationParams;
    private divPincipal;
    private divSecondaire;
    private compteurAppelWS;
    private iconePage;
    private ledivTitre;
    private divAttente;
    attachToContentHolder(): xxPageWrapper;
    attachToBody(): xxPageWrapper;
    private attachTo;
    get Titre(): string;
    set TitreLocalise(val: string);
    set TitreVariable(val: string);
    addClass(c: string): xxPageWrapper;
    removeClass(c: string): xxPageWrapper;
    ajouterWS(): xDiv;
    constructor(inOptions: OptionsPage);
    /** vide la zone de titre mais n'enlève pas le libellé du titre. */
    viderZoneTitle(): void;
    get y(): HTMLElement;
    append(i: iXElement): xxPageWrapper;
    appendZoneTitle(i: iXElement): xxPageWrapper;
    appendZoneFooter(i: iXElement): xxPageWrapper;
    appendZonePreHeader(i: iXElement): xxPageWrapper;
    activerAlerte(o: {
        textLocalise: string;
        textLocaliseBouton: string;
        action: (cb: () => void) => void;
    }): void;
    activerAttente(titre?: string): void;
    desactiverAttente(): void;
}
interface OptionsMenu {
    activerRecherche?: boolean; /** active la zone de saisie et le bouton de filtre   */
    toutDeplie?: boolean; /** par defaut le menu est réduit valeur= 'false' pour le forcer tout déplie mettre 'true' */
    contenu: iGroupeMenu[];
    selectFirstLigne?: boolean;
}
interface iGroupeMenu {
    libelle: string;
    icone: Icone;
    items: iGroupeMenuItem[];
}
interface iGroupeMenuItem {
    libelle: string;
    classe: string;
    Click: () => void;
    id?: string;
    titleLocalise?: string;
    titleVariable?: string;
    icone?: Icone;
    classeSelected?: string;
}
declare class xxMenu implements iXElement {
    get y(): HTMLElement;
    private elementP;
    private groupesMenus;
    private srchMenu;
    private champSaisi;
    private divRecherche;
    constructor(options: OptionsMenu);
    private filtrer;
    private annulerFiltre;
    private ouvrirTout;
    private fermerTout;
}
declare class GroupeMenu implements iXElement {
    private contenu;
    private libelle;
    private icone;
    private items;
    constructor(options: iGroupeMenu);
    get y(): HTMLElement;
    selectLigne(index: number): void;
    afficherTout(): void;
    cacherTout(): void;
    filtrer(recherche: string): void;
}
declare class GroupeMenuItem implements iXElement {
    private bouton;
    libelle: string;
    private titleLocalise;
    private titleVariable;
    private icone;
    private classe;
    private Click;
    private isAfficher;
    private classeSelected;
    constructor(options: iGroupeMenuItem);
    get y(): HTMLElement;
    tooggle(): void;
    afficher(): void;
    fakeClick(): void;
    cacher(): void;
}
interface OptionsxxNavOngletControl {
    id?: string;
    class?: string;
    WithSousOngletTooltip?: boolean;
    CanReduireSousOnglet?: boolean;
    initOnglets?: OptionsxxNavOngletItem[];
    initZoneAvantOnglet?: iXElement;
    initZoneApresOnglet?: iXElement;
    OnOngletChange?: (OngletSelect: xxNavOngletItem) => void;
}
interface OptionsxxNavOngletItemBase {
    id?: string;
    class?: string;
    textLocalise?: string;
    textVariable?: string;
    haveFlagHasContenu?: boolean;
    isOngletPreselected?: boolean;
    isOngletLastSelected?: boolean;
    color?: string;
    CheckNeedRegeneration?: (ongletItem: xxNavOngletItem) => Promise<boolean>;
    ForGetXxNavOngletItem?: (thisItem: xxNavOngletItem) => void;
    onSelect?: (ongletItem: xxNavOngletItem) => void;
}
interface OptionsxxNavOngletItemUnique extends OptionsxxNavOngletItemBase {
    GenerateContent: (thisOnglet: xxNavOngletItem) => iXElement;
}
interface OptionsxxNavOngletItemTree extends OptionsxxNavOngletItemBase {
    GenerateContent?: (thisOnglet: xxNavOngletItem) => iXElement;
    SousOnglet: OptionsxxNavOngletItem[];
}
declare type OptionsxxNavOngletItem = OptionsxxNavOngletItemUnique | OptionsxxNavOngletItemTree;
interface OptionsxxNavOngletBar {
    id?: string;
    class?: string;
    Style?: xStyle;
    GridForAddContent: xxGrid;
    GridItemContentOption: {
        colStart: number;
        nbCols: number;
        rowStart: number;
        nbRows: number;
    };
    WithSousOngletTooltip?: boolean;
    /** Uniquement la barre Primaire */
    CanReduireSousOnglet?: boolean;
    OngletMaster?: xxNavOngletItem;
    initOnglets?: OptionsxxNavOngletItem[];
    OnOngletChange?: (OngletSelect: xxNavOngletItem) => void;
}
declare class xxNavOngletItem {
    private static readonly CLASS_FlagHasContenu;
    private static readonly CLASS_FlagSousOngletHasContenu;
    private static readonly TITLE_FlagHasContenu;
    private static readonly TITLE_FlagSousOngletHasContenu;
    get OngletEtiquette(): xxContainerEvent | xxToolTip;
    get OngletEtiquetteHome(): xxContainerEvent;
    get SousOnglets(): xxNavOngletBar;
    get isSousOngletAfficher(): boolean;
    get isContenueAfficher(): boolean;
    get haveContent(): boolean;
    get ContenueIsGenerated(): boolean;
    get isTreeOnglet(): boolean;
    get color(): string;
    get OngletName(): string;
    get id(): string;
    private _color;
    private GenerateContent;
    private onSelect;
    private OnSupprimer;
    private _OngletName;
    private _id;
    private _class;
    private _OngletEtiquette;
    private _OngletEtiquetteForToolTip;
    private _OngletEtiquetteTooltip;
    private _OngletEtiquetteHome;
    private _OngletEtiquetteHomeForToolTip;
    private _OngletGridItemContenu;
    private _SousOnglets;
    private _lastSousOngletsOpen;
    private _haveFlagHasContenu;
    private _isContenueAfficher;
    private _isOngletAfficher;
    private _isOngletHomeAfficher;
    private _ContenueIsGenerated;
    private TooltipNeedRefresh;
    private CheckNeedRegeneration;
    constructor(Options: OptionsxxNavOngletItem, GridItemContentOption: {
        colStart: number;
        nbCols: number;
        rowStart: number;
        nbRows: number;
    }, GridForAddContent: xxGrid, WithSousOngletTooltip: boolean, style: xStyle, OnSupprimer: () => void);
    setFlagHasContenu(valeur: boolean): void;
    /**
    * Selection de l'onglet
    * @param wihoutRegeneration permet de ne pas regeneré le contenue si il existe deja
    */
    Select(wihoutRegeneration?: boolean): void;
    /**
     * DeSelection de l'onglet
     * @param videContenue force a vidé le contenue de l'onglet
     */
    UnSelect(videContenue?: boolean): void;
    /**
     * Permet d'afficher le contenue de l'onglet si il y en a un
     * @param wihoutRegeneration permet de ne pas regeneré le contenue si il existe deja
     */
    AfficherContenue(wihoutRegeneration?: boolean): void;
    /**
     * Permet de cacher le contenue de l'onglet si il y en a un
     * @param videContenue force a vidé le contenue de l'onglet
     */
    CacherContenue(videContenue?: boolean): void;
    /**
    * Permet d'afficher la barre de sousOnglet si il y en a une
    * @param wihoutRegeneration permet de ne pas regeneré le contenue si il existe deja
    */
    AfficherSousOnglet(wihoutRegeneration?: boolean): void;
    /**
     * Permet de cacher la barre de sousOnglet si il y en a une
     * @param videContenue force a vidé le contenue de l'onglet
     */
    CacherSousOnglet(videContenue?: boolean): void;
    /**
     * Permet de afficher l'onglet
     * @param withoutHome permet dans le cas d'un sous onglet de raffiché uniquement l'onglet pour les sous-onglets et pas le home si il en a un
     * */
    AfficherOnglet(withoutHome?: boolean): void;
    /**
     * Permet de cacher l'onglet
     * @param force force a cacher l'onglet meme si il y a des sous onglet visible
     * */
    CacherOnglet(force?: boolean): void;
    SupprimerOnglet(): void;
    private CreateOngletEtiquetteForToolTip;
    private CreateFlagHasContenu;
    private CreateFlagSousOngletHasContenu;
    private setFlagSousOngletHasContenu;
    private testIsTree;
    private testIsUniqueItem;
}
declare class xxNavOngletBar implements iXElement {
    get y(): HTMLElement;
    get isAfficher(): boolean;
    get ListOnglet(): xxNavOngletItem[];
    private isError;
    private OnOngletChange;
    private WithSousOngletTooltip;
    private OngletMaster;
    private _gridOnglet;
    private listeOngletItem;
    private listeGridxxNavOngletBar;
    private SelectedOngletItem;
    private GridForAddContent;
    private GridItemContentOption;
    private _isAfficher;
    private _SousOngleIsAfficher;
    private Style;
    constructor(Options: OptionsxxNavOngletBar);
    AjouteOnglet(onglet: OptionsxxNavOngletItem): void;
    cacherOngletSelected(videContenue?: boolean): void;
    /**
      * Pemet d'afficher la barre d'onglet
      * @param wihoutRegeneration permet de ne pas regeneré le contenue si il existe deja
      */
    AfficherBarre(wihoutRegeneration?: boolean): void;
    /**
     * Pemet de cacher la bar et force les onglets a ce cacher
     * @param videContenue force a vidé le contenue de l'onglet
     */
    CacherBarre(videContenue?: boolean): void;
    SupprimerAllOnglet(): void;
    private getRealOngletsSelect;
    private generateonglet;
    private ActualiseGridTemplateOngle;
}
declare class xxNavOngletControl implements iXElement {
    get y(): HTMLElement;
    private OngletPrincipaleBar;
    private gridPrincipale;
    private zoneAvantOnglet;
    private ZoneApresOnglet;
    constructor(Options: OptionsxxNavOngletControl);
    /**
     * Permet d'ajoute une ongletUnique on un OnletTree
     * @param onglet
     */
    AjouteOnglet(onglet: OptionsxxNavOngletItem): void;
    /**
     * Pemet de changer le contenu de la zone avant Onglet, /!\ Attention cela supprime l'ancien contenu /!\
     * @param i
     */
    ChangeContentZoneAvantOnglet(i: iXElement): xxNavOngletControl;
    /**
     * Pemet de changer le contenu de la zone apres Onglet, /!\ Attention cela supprime l'ancien contenu /!\
     * @param i
     */
    ChangeContentZoneApresOnglet(i: iXElement): xxNavOngletControl;
}
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
interface OptionListeSelectionContextSync<T> {
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
interface OptionListeSelectionContextAsync<T> {
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
declare type OptionListeSelectionStandard<T> = OptionListeSelectionStandardSync<T> | OptionListeSelectionStandardAsync<T>;
declare type OptionListeSelectionContext<T> = OptionListeSelectionContextSync<T> | OptionListeSelectionContextAsync<T>;
declare type OptionListeSelection<T> = OptionListeSelectionStandard<T> | OptionListeSelectionContext<T>;
declare class xxListeSelection<T> implements iXElement {
    get y(): HTMLElement;
    private divPrincipale;
    private Class;
    private bouton_ajout_specialite;
    private headerListeComplete;
    private headerListeSelectionee;
    private getId;
    private listeSelections;
    private ListeComplete;
    private ListeSelectionee;
    private DonneeSelectionnee;
    private DonneeComplete;
    private DonneeCompleteAsync;
    private avecOrdre;
    private cochageListeComplete;
    private cochageListeSelectionnee;
    private equals;
    get DonneeCompleteLoaded(): Promise<T[]>;
    constructor(option: OptionListeSelection<T>);
    FiltreListeComplete(filtre: (valeur: T) => boolean): void;
    FiltreListeSelectionne(filtre: (valeur: T) => boolean): void;
    appendToHeaderListeComplete(element: iXElement): void;
    appendToHeaderListeSelectionne(element: iXElement): void;
    private InitCollection;
    private IsOptionContext;
    private IsOptionContextAsync;
    private IsOptionContextStandardAsync;
    isSelection(a: T): boolean;
    viderSelection(): void;
    changerSelection(nouveaux: T[]): void;
    getDonneesSelectionees(): T[];
    private refreshDonneesSelectionnees;
    private refreshDomSelectionnees;
}
declare enum enumTypeTri {
    asc = 0,
    desc = 1,
    aucun = 2
}
interface OptionsList<T> {
    donnees: T[];
    dataContext?: ObservableCollection<T>;
    renderItem: (p: iXElementHolder, item: T, id: string) => void;
    equals?: (a: T, b: T) => boolean;
    greaterThan?: (a: T, b: T) => number;
    unique?: boolean;
    sort?: enumTypeTri;
    horizontal?: boolean;
    espaceMinimaliste?: boolean;
    gap?: number;
    class?: string;
    LibelleSiVide?: string;
    id?: string;
    getId?: (valeur: T) => string;
    limite?: boolean;
    /** Meme fonctionnement que dans le Tableau, regroupement par fracture (ne modifie pas l'ordre des données) */
    groupeGlobal?: {
        group: (place: iXElementHolder, valeur: T, valeurPrecedente: T) => void;
        greaterThan?: (a: T, b: T) => number;
        greaterThanGeneric?: (a: T) => string | boolean | number | DateSerialisable | Date;
    };
    /** Regroupe les elements (comme un groupBy), sous une seule bannier commune (modifie l'ordre des données) */
    regroupementUniqueBy?: {
        /** Sans c'est options le header sera juste un libelle avec la donnée du GroupBy */
        groupHeaderCustom?: (place: iXElementHolder, listGroup: T[]) => void;
        GroupBy: (a: T) => string | boolean | number | DateSerialisable | Date;
    };
    affichageEnGrid?: {
        /** en cas d'affichage horizontal*/
        nbCols: number;
        gridGap?: string;
        /** en cas d'affichage vertival*/
        nbRows: number;
    };
}
declare class xxListWrapper<T> implements iXElement {
    private LIMITE_NUMBER;
    private espaceMinimaliste;
    private gap;
    private filtreActif;
    dataContext: ObservableCollection<T>;
    listeItems: xxListItem<T>[];
    private monDomContainer;
    private modeHorizontal;
    private LibelleSiVide;
    private affichageLabelSiVide;
    private greaterThan;
    private horizontal?;
    private modeUnique?;
    private equals?;
    private monTri?;
    private renderItem;
    private limite;
    private getId;
    private groupeGlobal;
    greaterThanGlobal: (a: T, b: T) => number;
    HeaderGroupGlobal: iXElementHolder[];
    private regroupementUniqueBy_groupHeader;
    private regroupementUniqueBy_GroupBy;
    private regroupementUniqueBy_Dico;
    private affichageEnGrid;
    private listGridItem;
    private nbColonnesGrid;
    private nbRowGrid;
    private gridGap;
    private currentCol;
    private currentRow;
    get y(): HTMLElement;
    constructor(inOptions: OptionsList<T>);
    private incrementeGridPosition;
    filtrer(): void;
    setGreaterThan(f: (a: T, b: T) => number): xxListWrapper<T>;
    refreshTri(): xxListWrapper<T>;
    setFiltre(inFiltre: (obj: T) => boolean): xxListWrapper<T>;
    changerTri(tri?: enumTypeTri): xxListWrapper<T>;
    supprimerItem(item: T): xxListWrapper<T>;
    supprimerItems(item: T[]): xxListWrapper<T>;
    supprimerItemsAll(): xxListWrapper<T>;
    private delData;
    ajouterItems(items: T[]): xxListWrapper<T>;
    private appendToContener;
    private addData;
    private GenerateGroupGlobal;
    private GenerateLibelleSiVide;
    getAllData(): T[];
    render(): void;
    private VideDom;
    addClass(strClasses: string): xxListWrapper<T>;
    removeClass(strClasses: string): xxListWrapper<T>;
    toggleClass(classe: string, force: boolean): xElement;
    width(parame?: string | number): void | number;
    height(parame?: string): void | number;
}
declare class xxListItem<T> {
    visible: BindableObject<boolean>;
    renderPlace: xDiv;
    donnee: T;
    render: () => void;
    constructor(rPlace: xDiv, inDonnee: any, visible: boolean, renderMethod: (place: xElementHolder, valeur: T, id: string) => void, id: string);
    setVisibilite(visible: boolean): void;
    supprimer(): void;
}
interface OptionsPlanneur {
    listeRessources: PlanneurRessource[];
    dateDebut: DateSerialisable;
    nbJours: number;
    displayRdv: (ici: iXElementHolder, rdv: PlanneurRDV) => void;
    displayRessource?: (ici: iXElementHolder, ressource: PlanneurRessource, manager: xElement) => void;
    selectRessource: (ress: PlanneurRessource) => void;
    renderDateColonne?: (ici: iXElementHolder, dt: DateSerialisable) => void;
    renderClassBloc?: (d: DateSerialisable) => string;
    ligneMouseOver?: (div: xDiv, ress: PlanneurRessource) => void;
    ligneMouseOut?: (div: xDiv, ress: PlanneurRessource) => void;
    ligneMouseClick?: (div: xDiv, ress: PlanneurRessource) => void;
    taillePremiereColonne?: number;
    surchargeFondGrille?: (div: xDiv, ress: PlanneurRessource, dateCell: DateSerialisable) => void;
}
declare class PlanneurRDV {
    DateDebut: DateSerialisable;
    DateFin: DateSerialisable;
    Libelle: string;
    Id: string;
    IdExterne: number;
    Couleur: string;
    Ressources: string[];
    width: number;
    left: number;
    ClassCss: string;
    Div: xDiv;
    initContent?: iXElement;
    constructor(libelle: string, id: string, debut: DateSerialisable, fin: DateSerialisable, ressources: string[], idExterne?: number, couleur?: string, classCss?: string, initcontent?: iXElement);
    isValid(): boolean;
}
declare class PlanneurRessource {
    Libelle: string;
    Id: string;
    IdExterne: number | string;
    constructor(lib: string, id: string, idExterne?: number | string);
}
declare class xxPlanneurColonne implements iXElement, iXElementHolderEnable {
    Span6h: xSpan;
    Span12h: xSpan;
    Span18h: xSpan;
    private container;
    get y(): HTMLElement;
    get asHolder(): iXElementHolder;
    constructor(planneur: xxPlanneur, index: number, dateColonne: DateSerialisable, ressource: PlanneurRessource, modeEnteteColonne: boolean, modeEnteteLigne: boolean, selectRessource: (ress: PlanneurRessource) => void, surchargeFondGrille: (div: xDiv, p: PlanneurRessource, date: DateSerialisable) => void);
}
declare class xxPlanneurLigne implements iXElement, iXElementHolderEnable {
    Colonnes: xxPlanneurColonne[];
    Libelle: string;
    Id: number;
    Div: xDiv;
    get y(): HTMLElement;
    get asHolder(): iXElementHolder;
    constructor(planneur: xxPlanneur, index: number, nbColonnes: number, datesColonnes: DateSerialisable[], ressource: PlanneurRessource, selectRessource: (ress: PlanneurRessource) => void, displayRessource: (ici: iXElementHolder, ressource: PlanneurRessource, managerLigne: xElement) => void, MouseClick: (div: xDiv, ress: PlanneurRessource) => void, MouseOut: (div: xDiv, ress: PlanneurRessource) => void, MouseOver: (div: xDiv, ress: PlanneurRessource) => void, surchargeFondGrille: (div: xDiv, p: PlanneurRessource, date: DateSerialisable) => void);
}
declare class xxPlanneur implements iXElement {
    private container;
    private listeLignes;
    renderClassBloc: (d: DateSerialisable) => string;
    private dateDebut;
    private dateFin;
    private listeRessources;
    private listeRDV;
    renderDateColonne: (ici: iXElementHolder, dt: DateSerialisable) => void;
    private Dates;
    private IdsLignes;
    taillePremiereColonne: number;
    private cssTotalWidth;
    private spaceMinute;
    private NbColonnes;
    private NbLignes;
    private displayRdv;
    private displayRessource;
    private selectRessource;
    private ligneMouseOver;
    private ligneMouseOut;
    private ligneMouseClick;
    private surchargeFondGrille;
    get y(): HTMLElement;
    constructor(opt: OptionsPlanneur);
    private creerPlanneur;
    private refreshRdv;
    ajouterRessource(ress: PlanneurRessource): void;
    idRdvExist(id: string): boolean;
    ajouterRdv(rdvs: PlanneurRDV[]): void;
    supprimerAllRdv(): void;
    supprimerRdv(rdvs: PlanneurRDV[]): void;
    getPosition(d: DateSerialisable): number;
    private filterRDV;
    private placerRDV;
    private renderRDV;
    private calculerPosition;
    private creerLigne;
    private rechercheTableau;
    private searchRdv;
    private dateDiff;
}
interface OptionsTabControl {
    id?: string;
    class?: string;
    tabChange?: (tabSelectionne: xxTabItem) => void;
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
    gererGroupe?: OptionsGestionGroupeTab; /** Si cette option est utilisée les onglets doivent obligatoirement avoir une option id*/
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
    /** dans emed utiliser la méthode générique: OutilsJSEmed.GetGroupesOnglets; */
    getListeGroupe: (key: string) => Promise<CustomGroupeOnglets[]>;
    /** dans emed utiliser la méthode générique: OutilsJSEmed.SaveGroupesOnglets; */
    saveGroupe: (key: string, custom: CustomGroupeOnglets) => Promise<CustomGroupeOnglets>;
    /** dans emed utiliser la méthode générique: OutilsJSEmed.DeleteGroupesOngltc; */
    deleteGroupe: (key: string, custom: CustomGroupeOnglets) => Promise<void>;
    /** dans emed utiliser la méthode générique: OutilsJSEmed.getDernierGroupeOnglet; */
    getDerniersOuverts: (key: string) => Promise<CustomGroupeOnglets>;
    /** dans emed utiliser la méthode générique: OutilsJSEmed.saveDernierGroupeOnglet; */
    saveDerniersOuverts: (key: string, custom: CustomGroupeOnglets) => Promise<CustomGroupeOnglets>;
    derniersOuvertsKey: string;
}
interface OptionsTabItem {
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
    binding?: {
        textVariable?: BindableObject<string>;
    };
}
declare class CustomGroupeOnglets {
    Id: string;
    Libelle: string;
    DernierSelectionne: string;
    IdsOnglets: string[];
}
declare enum EActionGroupeTab {
    Ajouter = 0,
    Modifier = 1,
    Supprimer = 2
}
declare class xxTabItem {
    jqHost: iXElementHolder;
    SaveAsFavorite(tabParent: xxTabControl): void;
    private color;
    get Color(): string;
    private decorateur;
    get Decorateur(): boolean;
    private textFermerOngletLocalise;
    private titleFermerOngletLocalise;
    private optionBoutonWrapper2;
    get OptionBoutonWrapper2(): {
        optionsAffichage?: optionsAffichageBouton;
        SelectedcolorCuston?: enumCouleurBouton;
        UnSelectedcolorCuston?: enumCouleurBouton;
        typeBouton?: enumTypeBouton;
    };
    get TextFermerOngletLocalise(): string;
    get TitleFermerOngletLocalise(): string;
    private modeFermerOnglets;
    get ModeFermerOnglet(): boolean;
    private myContent;
    private initialise;
    private createContent;
    private favoriteTabKey;
    private bindingText;
    private hasContenu;
    id: string;
    onSelect: () => void;
    onClose: () => void;
    get FavoriteTabKey(): string;
    constructor(o: OptionsTabItem);
    setHasContenu(hasContenu: boolean): void;
    getHasContenu(): boolean;
    attacherContenu(ici: iXElementHolder): void;
    masquer(): void;
    afficher(): void;
}
declare class xxTabControl implements iXElement {
    private zoneAvantOnglet;
    private zoneApresOnglet;
    private ongletAjout;
    private ongletGestionOnglet;
    private listeAjout;
    private optionsAjout;
    private listeAjoutOnglet;
    private optionsGroupe;
    private listeGroupes;
    private listeGroupesUtil;
    private selectedGroupe;
    private groupeAucun;
    private groupeDerniereSelection;
    private dernierOuvertsKey;
    private boxerGroupe;
    private postZoneAligneeADroite;
    private ID_GROUPE_AUCUN;
    private ID_GROUPE_DERNIER;
    private initElements;
    appendPreZoneTab(i: iXElement): xxTabControl;
    appendPostZoneTab(i: iXElement): xxTabControl;
    vider(): xxTabControl;
    selectTabItem(item: xxTabItem, avecRechargement?: boolean): void;
    setTabItemHasContenu(itemId: string, hasContenu: boolean): void;
    hasContenu(): boolean;
    afficherTabItem(itemId: string, bShow: boolean): void;
    toggleFavori(): void;
    get y(): HTMLElement;
    private tabChange;
    private dockPrincipal;
    private gridPrincipal;
    private modeAffichage;
    private orientationBoutons;
    private typeBouton;
    private boutonsradio;
    private tabItemSelected;
    tabItemFavorite: xxTabItem;
    private contentHolder;
    withDefault: boolean;
    private favoriteGlobalKey;
    get FavoriteGlobalKey(): string;
    private favoriteAutoSave;
    private modeNavigation?;
    private modeFermerOnglets?;
    private styleArrondi?;
    ajouterOnglet(oi: OptionsTabItem): xxTabControl;
    supprimerOnglets(onglets: itemRadioButton<xxTabItem>[], bGroupe: boolean): void;
    private currentFavoriteTabKey;
    get CurrentFavoriteTabKey(): string;
    private select;
    tabItems: xxTabItem[];
    tabContentScroll(up: boolean, PxScroll?: number): void;
    constructor(o: OptionsTabControl);
    private afficherOngletAjout;
    private initGroupes;
    private SetSelectedGroupe;
    private SetGroupeDerniereSelection;
    private SaveDerniereSelection;
    private SelectGroupe;
    private DeleteGroupe;
    private openBoxer;
}
interface OptionsStackPanel extends iTestable {
    id?: string;
    class?: string;
    initContent?: iXElement[];
    espaceMinimaliste?: boolean;
    gap?: number;
    optionsAffichage?: optionsAffichage;
    drag?: {
        drop?: (key: string) => void;
        dropAction?: 'copie' | 'deplacement' | 'lien';
    };
}
declare class xxStackPanel implements iXElement {
    private elemPrincipal;
    private espaceMinimaliste;
    private conteneurDitems;
    private gap;
    toggleClass(c: string, force: boolean): xElement;
    append(element: iXElement, addClass?: string, optionsAffichage?: optionsAffichage): xxStackPanel;
    appendMany(elements: iXElement[]): xxStackPanel;
    constructor(o: OptionsStackPanel);
    width(parame?: string | number): void | number;
    height(parame?: string | number): void | number;
    get y(): HTMLElement;
    cacher(collapse?: boolean): xxStackPanel;
    afficher(): xxStackPanel;
    vider(): void;
    empty(): xxStackPanel;
    getClasseMinimaliste(): string;
    addClass(c: string): void;
    removeClass(c: string): void;
}
interface OptionsInfosCreneaux {
    dateDebut: DateSerialisable;
    joursSelectionnes: number[];
    heureDebut: xTime;
    heureFin: xTime;
}
declare enum EJoursSemaine {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
declare class xxSpecificationCreneaux implements iXElement {
    private dateDebut;
    private joursSelectionnes;
    private heureDebut;
    private heureFin;
    private monLabel;
    private btnAnnuler;
    private btnValider;
    private choixHeureDebut;
    private choixHeureFin;
    private monBoxer;
    private callbackValider?;
    constructor(callbackValider: (o: OptionsInfosCreneaux) => void, debutCrenaux?: DateSerialisable);
    private getJourSemaineLibelle;
    get y(): HTMLElement;
    afficher(): void;
}
interface optionsxxRouteContainer {
    desktopMenuEnabled?: boolean;
    isFavori: (cheminPhysique: string) => Promise<boolean>;
    toggleFavori: (cheminPhysique: string, ajout: boolean) => void;
    isMenuFixe?: () => Promise<boolean>;
    toggleMenuFixe?: (isFixed: boolean) => void;
    createInternalUrl: (str: string) => string;
    createExternalUrl: (str: string) => string;
    createMenuCustom?: (ici: xxStackPanel) => void;
    IconeHeader?: Icone;
    ajouterHistoriquePersonnalise?: (chemin: string) => void;
    gestionBackBrowser?: boolean;
    id?: string;
    verboseMode?: boolean;
    SansZoneDeRecherche?: boolean;
}
interface EndPointFn {
    render?: (ecran: iXElementHolder, params: (string | number)[], dataCacher: Dictionnaire<(string | number | boolean)>) => Promise<void>;
    reactivation?: (params: (string | number)[], dataCacher: Dictionnaire<(string | number | boolean)>) => Promise<void>;
    renderRecherche?: (zoneRecherche: iXElementHolder, params: (string | number)[], dataCacher: Dictionnaire<(string | number | boolean)>) => Promise<void>;
    selecteurRoutes?: (params: (string | number)[], dataCacher: Dictionnaire<(string | number | boolean)>) => Promise<string[]>;
}
declare class xxRouteContainer implements iXElement {
    static ROOTBASE: string;
    private HaveNotSaveData;
    private SansZoneDeRecherche;
    private isFavori;
    private toggleFavori;
    private isMenuFixe;
    private toggleMenuFixe;
    private etatFixed;
    private gestionBackBrowser;
    private dernieresPages;
    private modeFileArianeClavier;
    createInternalUrl: (str: string) => string;
    createExternalUrl: (str: string) => string;
    createMenuCustom: (ici: xxStackPanel) => void;
    verbose(s: string, object?: any): void;
    private verboseMode;
    private filtretexte;
    private arbreRoutes;
    private dicoRoutesTheoriques;
    private dicoEcransOuverts;
    private dicoLibelleParams;
    private dicoDataParams;
    private routeActivePhysique;
    private selectionEnCours;
    private activationBandeauPerso;
    private activationMenuList;
    private elemPrincipal;
    private elemBoutonMenu;
    private elemMenu;
    private elemMenuNav;
    private elemMenuList;
    private elemMenuCustom;
    private elemMenuTools;
    private elemZoneContenu;
    private elemMenuSecondaire;
    private elemZoneFermerMenu;
    private elemFilAriane;
    get y(): HTMLElement;
    get DicoLibelleParams(): Dictionnaire<string>;
    getCurrentUrl(): string;
    set ActivationMenuList(val: boolean);
    get ActivationMenuList(): boolean;
    set ActivationBandeauPerso(val: boolean);
    get ActivationBandeauPerso(): boolean;
    private getBackPage;
    private getLastPage;
    getCurrentPage(): string;
    constructor(o: optionsxxRouteContainer);
    private completerArbre;
    private ajouterRoute;
    /**
     * permet d'ajouter un selecteur de routes possibles à partir d'un endpoint
     * @param route
     * @param routesPossibles
     */
    private ajouterRouteSelecteurSpecifiquePrivate;
    /**
     * permet d'ajouter une route vers un écran
     * @param route
     * @param renderEcran
     */
    ajouterRouteEcran(route: string, renderEcran: (ici: iXElementHolder, params: string[], dataCacher?: Dictionnaire<(string | number | boolean)>) => Promise<void>): xxRouteContainer;
    /**
    * permet d'ajouter une route vers un écran
    * @param route
    * @param renderEcran
    */
    ajouterRouteEcranAvecReactivation(route: string, renderEcran: (ici: iXElementHolder, params: string[], dataCacher?: Dictionnaire<(string | number | boolean)>) => Promise<void>, reactivationEcran: (params: string[], dataCacher?: Dictionnaire<(string | number | boolean)>) => Promise<void>): xxRouteContainer;
    /**
     * permet d'ajouter une route vers un écran
     * @param route
     * @param renderEcran
     */
    ajouterRouteEcranWithSelecteurStandard(route: string, renderEcran: (ici: iXElementHolder, params: string[], dataCacher?: Dictionnaire<(string | number | boolean)>) => Promise<void>): xxRouteContainer;
    /**
     * permet d'ajouter une route vers un écran de sélection
     * @param route
     * @param renderEcran
     */
    ajouterRouteSelecteur(route: string, renderRech: (recherche: iXElementHolder, params: string[], dataCacher?: Dictionnaire<(string | number | boolean)>) => Promise<void>): xxRouteContainer;
    /**
     * permet d'ajouter un noeud qui affiche tous les sous menus
     * @param route
     */
    ajouterRouteSelecteurStandard(inRoute: string): xxRouteContainer;
    /**
   * permet d'ajouter un noeud qui affiche des sous menus dynamiques
   * @param route
   */
    ajouterRouteSelecteurSpecifique(inRoute: string, routesPossibles: (params: string[], dataCacher?: Dictionnaire<(string | number | boolean)>) => Promise<string[]>): xxRouteContainer;
    refresh(routeTheorique: string, params: (string | number)[], dataCacher?: Dictionnaire<(string | number | boolean)>): Promise<xxRouteContainer>;
    refreshCurrent(): Promise<xxRouteContainer>;
    private refreshAfficheMenuList;
    private refreshAfficheBandeauPerso;
    private refreshMenuList;
    private refreshFilAriane;
    setCurrentPageHaveDataNotSave(value: boolean): void;
    private CheckCurrentPageCanQuitOrRefresh;
    private ajouterHistorique;
    navigationCancel(withPush?: boolean): Promise<xxRouteContainer>;
    navigationBack(): void;
    annulerEcran(routePhysique: string): void;
    annulerEcranCourant(): void;
    afficher(routeTheorique: string, params: (string | number)[], dataCacher?: Dictionnaire<(string | number | boolean)>): Promise<xxRouteContainer>;
    routePhysiqueToRouteTheorique(routePhysique: string): {
        routeTheorique: string;
        params: string[];
    };
    routeTheoriqueToRoutePhysique(routeTheorique: string, params: (string | number)[]): string;
    afficherRoutePhysiqueNoPush(routePhysique: string, dataCacher?: Dictionnaire<(string | number | boolean)>): Promise<xxRouteContainer>;
    afficherRoutePhysique(routePhysique: string, dataCacher?: Dictionnaire<(string | number | boolean)>): Promise<xxRouteContainer>;
    afficherAccueil(): void;
    private display;
    private setRoute;
    private afficherListeByNiveau;
    private popstate;
}
interface optionsQrCodeBasics {
    autosize?: boolean;
    id?: string;
    class?: string;
    onError?: (err: any) => void;
}
interface optionsQrCodeChange extends optionsQrCodeBasics {
    onDetect: (s: string) => void;
}
interface optionsQrCodeReaderBinding extends optionsQrCodeBasics {
    binding: {
        value?: BindableObject<string>;
        visibility?: BindableObject<enumVisibility>;
    };
}
declare function jsQR(data: Uint8ClampedArray, width: number, height: number, providedOptions?: any): any | null;
declare class xxQrCodeReader implements iXElement {
    myCanvas: xCanvas;
    canvasElement: HTMLCanvasElement;
    canvas2D: CanvasRenderingContext2D;
    video: HTMLVideoElement;
    autosize: boolean;
    qrcode: BindableObject<string>;
    onchange: (s: string) => void;
    onError: (err: any) => void;
    constructor(o: optionsQrCodeReaderBinding | optionsQrCodeChange);
    private isBindingOptions;
    private drawLine;
    stop(): void;
    start(): void;
    private tick;
    get y(): HTMLElement;
}
declare enum ETypeBouton {
    boutonClassique = 0,
    boutonWrapper2 = 1
}
interface OptionsRadioButton<T> {
    id?: string;
    class?: string;
    initElements: itemRadioButtonOptions<T>[];
    typeOrientation?: enumTypeOrientation;
    typeOrientationBouton?: enumTypeOrientation;
    valueChange: (a: T) => void;
    clickOnSelected?: (a: T, reset: () => void) => void;
    renderDecorator?: (i: itemRadioButton<T>) => void;
    SelectedClassCustonGlobal?: string;
    displayOnlySelected?: boolean;
    FakeClickPreselectionOnInit?: boolean;
    typeBouton?: ETypeBouton;
    readonly?: boolean;
    binding?: {
        value?: BindableObject<T>;
        visibility?: BindableObject<enumVisibility>;
        disabled?: BindableObject<boolean>;
    };
    affichageEnGrid?: {
        /** en cas d'affichage horizontal*/
        nbCols: number;
        gridGap?: string;
        /** en cas d'affichage vertival*/
        nbRows: number;
    };
    gap?: number;
}
interface itemRadioButtonOptions<T> extends iTestable {
    id?: string;
    valeur: T;
    icone?: Icone;
    binding?: {
        texteVariable?: BindableObject<string>;
    };
    libelleLocalise?: string;
    libelleVariable?: string;
    titleLocalise?: string;
    titleVariable?: string;
    preselectionne?: boolean;
    class?: string;
    espaceMinimaliste?: boolean;
    inactif?: boolean;
    SelectedClassCuston?: string;
    optionBoutonWrapper2?: {
        optionsAffichage?: optionsAffichageBouton;
        SelectedcolorCuston?: enumCouleurBouton;
        UnSelectedcolorCuston?: enumCouleurBouton;
        typeBouton?: enumTypeBouton;
        tailleBouton?: enumTailleBouton;
    };
    couleurBorder?: string;
}
declare class itemRadioButton<T> {
    static readonly classInactif: string;
    static readonly classSelected: string;
    id?: string;
    valeur: T;
    icone?: Icone;
    libelleLocalise?: string;
    libelleVariable?: string;
    titleLocalise?: string;
    titleVariable?: string;
    preselectionne?: boolean;
    class?: string;
    idTest: string;
    espaceMinimaliste: boolean;
    bindingTexte: BindableObject<string>;
    couleurBorder: string;
    private _inactif?;
    private _isSelect;
    private gap?;
    optionsAffichageBouton?: optionsAffichageBouton;
    typeBouton?: enumTypeBouton;
    jqHostButton: iXElementHolder;
    divHost: xDiv;
    boutonAssocie: xxBouton;
    SelectedClassCustonGlobal: string;
    private SelectedClassCuston;
    private Selectedcolor?;
    private UnSelectedcolor?;
    get inactif(): boolean;
    get isSelect(): boolean;
    constructor(o: itemRadioButtonOptions<T>);
    private getSelectedClass;
    /**toggle button isSelected */
    ToggleSelected(isSelect?: boolean): void;
    /**Active le radio button */
    activer(): void;
    /**Désactive le radio button */
    desactiver(): void;
}
declare class xxRadioButton<T> implements iXElement {
    get y(): HTMLElement;
    private valueChange;
    private typeBouton?;
    private displayOnlySelected;
    private typeOrientation;
    private typeOrientationBouton;
    private isReadonly;
    private clickOnSelected;
    private renderDecorator;
    private SelectedClassCustonGlobal;
    private Value;
    private myList;
    private ItemSelected;
    private hasValue;
    private affichageEnGrid?;
    private doAffichageEnGrid;
    private listeClassItem;
    constructor(o: OptionsRadioButton<T>);
    private createButton;
    private setCheckedItem;
    ajouterItems(elements: itemRadioButton<T>[]): void;
    supprimerItems(elements: itemRadioButton<T>[]): void;
    /** Supprime tous les items de la liste*/
    resetItems(): void;
    getItems(): itemRadioButton<T>[];
    setTexteBoutonSelected(newText: string): void;
    setValue(val: T, withFireEventValueChange?: boolean): void;
    resetValue(declencheValueChanged?: boolean): void;
    setReadonly(value: boolean): void;
    setVisibility(s: enumVisibility): void;
    get value(): T;
}
declare enum enumPositionVolet {
    haut = 0,
    bas = 1,
    gauche = 2,
    droite = 3
}
interface OptionVolet {
    position: enumPositionVolet;
    initContent?: iXElement[];
    onClose?: () => void;
    class?: string;
    fermerParDefaut?: boolean;
}
declare class xxVolet implements iXElement {
    private volet;
    private content;
    private position;
    private OnClose;
    private BoutonPosition;
    private class;
    constructor(o: OptionVolet);
    private changeIcone;
    switchPosition(pos: enumPositionVolet): void;
    append(content: iXElement): void;
    vider(): void;
    afficher(): void;
    fermer(): void;
    isOpen(): boolean;
    get y(): HTMLElement;
}
declare enum enumAlignementVerticalWrapPanel {
    haut = 0,
    centre = 1,
    bas = 2
}
declare enum enumAlignementHorizontalWrapPanel {
    Gauche = 0,
    Centre = 1,
    Droite = 2
}
interface OptionsWrapPanel {
    id?: string;
    class?: string;
    initContent?: iXElement[];
    retourALaLigne?: boolean;
    padding?: boolean;
    espaceMinimaliste?: boolean;
    alignementHorizontal?: enumAlignementHorizontalWrapPanel;
    itemsLargeurEgale?: boolean;
    alignementVertical?: enumAlignementVerticalWrapPanel;
    optionsAffichage?: optionsAffichage;
    gap?: number;
    pleineLargeur?: boolean;
    drag?: {
        dragKey?: () => string;
        drop?: (key: string) => void;
        dropAction?: 'deplacement' | 'copie' | 'lien';
    };
}
declare class xxWrapPanel implements iXElement {
    toggleClass(c: string, force: boolean): xElement;
    private elemPrincipal;
    private espaceMinimaliste;
    private itemsLargeurEgale;
    private conteneurDitems;
    private alignementVertical;
    private alignementHorizontal;
    private gap;
    width(parame?: string | number): void | number;
    height(parame?: string | number): void | number;
    append(element: iXElement, addClass?: string, optionsAffichage?: optionsAffichage): xxWrapPanel;
    constructor(o: OptionsWrapPanel);
    get y(): HTMLElement;
    cacher(collapse?: boolean): xxWrapPanel;
    afficher(): xxWrapPanel;
    vider(): xxWrapPanel;
    getClasseMinimaliste(): string;
    getClasseItemsLargeurEgale(): string;
    addClass(c: string): void;
    removeClass(c: string): void;
}
declare enum enumAffichageZoom {
    modeSlider = 0,
    modeListeHorizontale = 1,
    modeListeVerticale = 2,
    modeOnlyBouton = 3
}
interface OptionsZoom extends iTestable {
    niveauxZoomPerCent: number[];
    afterZoom: (zoom: number) => void;
    modeAffichage?: enumAffichageZoom;
    zoomChoisi?: number;
}
declare let ecartPx: number;
declare class xxZoom implements iXElement {
    private rangNiveauZoom;
    private listeNiveauxZoom;
    private wrapPanelPrincipal;
    private stackPanelPrincipal;
    private divGlissiere;
    private boutonZoom;
    private boutonGlissiere;
    private boutonDezoom;
    private ModeAffichage;
    private afterZoom;
    constructor(o: OptionsZoom);
    createAffichage(): void;
    getNiveauZoom(): number;
    setNiveauZoom(niveauZoomPerCent: number): void;
    zoom(): void;
    dezoom(): void;
    private applyZoom;
    get y(): HTMLElement;
}
declare enum enumXxZoneRepliablePosition {
    droite = 0,
    gauche = 1
}
declare enum enumXxZoneRepliableCouleurFleche {
    Bleu = 0,
    Blanc = 1,
    Noir = 2,
    Perso = 3
}
interface OptionsZoneRepliable {
    renderTitre: (ici: iXElementHolder, plier?: (b: boolean) => void, refreshTitre?: () => void, plie?: boolean) => void;
    renderDetail: (ici: iXElementHolder, plier?: (b: boolean) => void, refreshTitre?: () => void) => void;
    plie?: boolean;
    class?: string;
    fleche?: boolean;
    flechePosition?: enumXxZoneRepliablePosition;
    CouleurFleche?: enumXxZoneRepliableCouleurFleche;
    iconeRepliePerso?: Icone;
    iconeDepliePerso?: Icone;
    fullTitleToggle?: boolean;
    onToggle?: (plie?: boolean, refreshTitre?: () => void) => void;
}
declare class xxZoneRepliable implements iXElement {
    private renderTitre;
    private renderDetail;
    private stackPrincipal;
    private divTitre;
    private divDetail;
    private etatPlie;
    private PositionFleche;
    private CouleurFleche;
    private IconeRepliePerso;
    private IconeDepliePerso;
    private fleche;
    private cssClasse;
    private noDeleteContentOnRender;
    private onToggleCallBack;
    private isRendered;
    private btnSwap;
    get y(): HTMLElement;
    constructor(opt: OptionsZoneRepliable);
    private getICone;
    private genTitre;
    private genDetail;
    forcerRenderDetail(): void;
    toggleDetail(): void;
    plier(inPlier: boolean): void;
    refreshTitre(): void;
}
declare enum enumTypeBouton {
    Standard = 0,
    TexteHorsBouton = 1
}
declare enum enumComportementBouton {
    Standard = 0,
    ActionDifferee = 1,
    ActionAConfirmer = 2,
    ValidationBloquante = 3
}
declare enum enumStyleBouton {
    Simple = 0,
    SansFondAvecContour = 1,
    AvecFond = 2,
    AvecFondBlancAvecContour = 3,
    Ombre = 4
}
declare enum enumPositionnementResponsiveBouton {
    Defaut = 0,
    PleineLargeur = 1,
    DansLeCoin = 2,
    EnBas = 3
}
declare enum enumCouleurBouton {
    Utilisateur = 0,
    Alternatif = 1,
    Alerte = 2,
    Valide = 3,
    Neutre = 4,
    Blanc = 5,
    Sans = 6
}
declare enum enumTailleBouton {
    Fit = 0,
    XS = 1,
    S = 2,
    M = 3,
    L = 4,
    XL = 5,
    Tuile = 6,
    Header = 7
}
interface optionTitleVariable {
    titleVariable: string;
    titleLocalise?: string;
}
interface optionTitleLocalise {
    titleLocalise: string;
    titleVariable?: string;
}
interface optionBouton {
    class?: string;
    id?: string;
    textLocalise?: string;
    textVariable?: string;
    disabled?: boolean;
    icone?: Icone | xIconeAvecAction;
    click: (showButton?: () => void, ceBouton?: xxBouton) => void;
    dblclick?: (showButton?: () => void, ceBouton?: xxBouton) => void;
    shiftClick?: (showButton?: () => void, ceBouton?: xxBouton) => void;
    touchLong?: (showButton?: () => void, ceBouton?: xxBouton) => void;
    confirm?: {
        comportement: enumComportementBouton;
        stringConfirm?: () => string;
    };
    binding?: {
        visibility?: BindableObject<enumVisibility>;
        textVariable?: BindableObject<string>;
        disabled?: BindableObject<boolean>;
    };
    optionsAffichage?: optionsAffichageBouton;
}
interface optionBoutonStandard extends optionBouton {
    typeBouton?: enumTypeBouton;
}
interface optionBoutonLabelled extends optionBouton {
    typeBouton: enumTypeBouton.TexteHorsBouton;
    optionsLabel: OptionsLabel;
}
declare type optionButton = (optionBoutonStandard | optionBoutonLabelled) & optionTitleLocalise | (optionBoutonStandard | optionBoutonLabelled) & optionTitleVariable;
interface optionsAffichageBouton extends optionsAffichage {
    styleBouton?: enumStyleBouton;
    positionnementResponsiveBouton?: enumPositionnementResponsiveBouton;
    tailleBouton?: enumTailleBouton;
    couleurBouton?: enumCouleurBouton;
    positionIconeBouton?: enumPosition;
    boutonArrondi?: boolean;
    fullHeight?: boolean;
    fullWidth?: boolean;
}
declare class xxBouton implements iXElement {
    private mainDiv;
    private secondDiv;
    private label;
    private span;
    private class;
    private id;
    private text;
    private title;
    private style;
    private type;
    private reponsiveButton;
    private size;
    private color;
    private rounded;
    private disabled;
    private positionIcone;
    private icone;
    private click;
    private dblclick;
    private fullHeight;
    private fullWidth;
    private shiftClick;
    private touchLong;
    private confirmBehaviour;
    private confirmString;
    private textVariableBind;
    private optionLabel;
    private optionsAffichage;
    constructor(option: optionButton);
    private createButton;
    private reGenerateContentSecondeDiv;
    private getMainClass;
    private getSecondClass;
    private clickBehaviour;
    private longTouchBehaviour;
    private isOptionLabelled;
    showButton(): void;
    hideButton(collapse?: boolean): void;
    addClass(cssClass: string): void;
    removeClass(cssClass: string): void;
    deleteButton(): void;
    setSubrianceLabel(text: string): void;
    setSubrianceBindingLabel(bindText: BindableObject<string>): void;
    setColor(color: enumCouleurBouton): void;
    getIcone(): Icone | xIconeAvecAction;
    setIcone(icone: Icone): void;
    ToggleAffichageDisabled(isDisabled?: boolean): void;
    getText(): string;
    changerText(inText: string): void;
    setTitle(newText: string): void;
    setTexte(newText: string): void;
    /** Modifie le statut du bouton pour spécifier qu'une opération est en cours.
     * Celui-ci est alors désactivé et une animation est affichée à l'utilisateur.
     * */
    setOperationEnCours(): void;
    /** Modifie le statut du bouton pour indiquer que le traitement en cours est terminé.
    * Celui-ci est alors réactivé.
    * */
    removeOperationEnCours(): void;
    get y(): HTMLElement;
    removeAttribute(strAttr: string): xxBouton;
    setAttribute(strAttr: string, valeur: string): xxBouton;
    setClick(clickCb: (showButton?: () => void, ceBouton?: xxBouton) => void): xxBouton;
    setShiftClick(sclickCb: (showButton?: () => void, ceBouton?: xxBouton) => void): xxBouton;
    fakeClick(): void;
}
declare enum enumAlignementContenu {
    HautGauche = 0,
    HautCentre = 1,
    HautDroite = 2,
    CentreGauche = 3,
    CentreCentre = 4,
    CentreDroite = 5,
    BasGauche = 6,
    BasCentre = 7,
    BasDroite = 8
}
interface optionsAffichageGrid extends optionsAffichage {
    alignementContenu?: enumAlignementContenu;
}
interface OptionsGrid {
    id?: string;
    class?: string;
    colonnes?: string[];
    colonnes_auto?: string;
    lignes?: string[];
    lignes_auto?: string;
    fullWidth?: boolean;
    fullHeight?: boolean;
    initMatrix?: iXElement[][];
    gridGap?: string;
    padding?: boolean;
    optionsAffichage?: optionsAffichageGrid;
    drag?: {
        dragKey: () => string;
    };
}
interface OptionsGridItem {
    content: iXElement;
    rowStart: number;
    colStart: number;
    nbRows?: number;
    nbCols?: number;
    class?: string;
    id?: string;
    optionsAffichage?: optionsAffichageGrid;
}
interface OptionsGridItemCssOnly {
    content: iXElement;
    class?: string;
    id?: string;
    cssOnly: true;
    optionsAffichage?: optionsAffichageGrid;
}
declare class xxGridItem implements iXElement {
    private elementPrincipalItem;
    content: iXElement;
    rowStart: number;
    colStart: number;
    nbRows: number;
    nbCols: number;
    class?: string;
    cssOnly: boolean;
    id?: string;
    alignementContenu?: enumAlignementContenu;
    optionsAffichage?: optionsAffichageGrid;
    private isGridCssOnly;
    width(parame?: string): void | number;
    height(parame?: string): void | number;
    addClass(strClasses: string): xxGridItem;
    removeClass(strClasses: string): xxGridItem;
    constructor(o: OptionsGridItem | OptionsGridItemCssOnly);
    private setProperties;
    ChangeContent(element: iXElement): void;
    changeRowsProperties(rowStart: number, nbsRows: number): void;
    changeColsProperties(colStart: number, nbsCols: number): void;
    get y(): HTMLElement;
}
interface iXElementGridPoperty {
    xelem: iXElement;
    nbCols: number;
    nbRows?: number;
    class?: string;
}
declare class xxGrid {
    Length(): number;
    private elemPrincipal;
    private mesElements;
    private paramsColonnes;
    private autoColonnes;
    private paramsLignes;
    private autoLignes;
    private fullWidth;
    private fullHeight;
    private class;
    private gridGap?;
    padding: boolean;
    optionsAffichage: optionsAffichage;
    width(parame?: string | number): void | number;
    height(parame?: string): void | number;
    toggleClass(c: string, force: boolean): xElement;
    private setProperties;
    append(items: (xxGridItem | iXElement)[]): xxGrid;
    addClass(strClasses: string): xxGrid;
    removeClass(strClasses: string): xxGrid;
    supprimer(items: xxGridItem[]): xxGrid;
    constructor(o: OptionsGrid);
    setColonnes(colonnes: string[]): void;
    setLignes(lignes: string[]): void;
    private isGridProperty;
    private isxxGridItem;
    appendMatrix(tabelem: (iXElement | iXElementGridPoperty)[][]): xxGrid;
    private appendMatrixStd;
    get y(): HTMLElement;
    cacher(collapse?: boolean): xxGrid;
    afficher(): xxGrid;
    vider(): xxGrid;
    setAutoColonnes(autoColonnes: string): xxGrid;
    removeClassFromAllElements(laclasse: string): xxGrid;
    addClassToElement(colstart: number, laclasse: string): xxGrid;
    removeClassFromElement(colstart: number, laclasse: string): xxGrid;
}
interface OptionZoneModulable {
    id?: string;
    class?: string;
    typeOrientation?: enumTypeOrientation;
    initPosition?: string;
    initEtat?: EEtatZoneModulable;
    noRotation?: boolean;
    initPremiereZone?: (ici: iXElementHolder) => any;
    initSecondeZone?: (ici: iXElementHolder) => any;
    savePositionKey?: string;
    titrePremiereZone?: () => string;
    titreDeuxiemeZone?: () => string;
    onDeplierPremierZone?: () => void;
    onDeplierDeuxiemeZone?: () => void;
    onPlierPremiereZone?: () => void;
    onPlierDeuxiemeZone?: () => void;
}
declare enum EEtatZoneModulable {
    repliePremiereZone = "replie_premiere_zone",
    replieDeuxiemeZone = "replie_deuxieme_zone",
    deplie = "deplie"
}
declare class xxZoneModulable implements iXElement {
    private currentMouseUpListener;
    private currentMouseLeaveListener;
    private static CleSauvegardeOrientation;
    private static CleSauvegardePosition;
    private static CleSauvegardeEtat;
    private onDeplierPremierZone?;
    private onDeplierDeuxiemeZone?;
    private onPlierPremiereZone?;
    private onPlierDeuxiemeZone?;
    private get KeyOrientationName();
    private get KeyPositionName();
    private get KeyEtatName();
    private titrePremiereZone;
    private titreDeuxiemeZone;
    private position;
    get y(): HTMLElement;
    get premiereZone(): iXElementHolder;
    get secondeZone(): iXElementHolder;
    private divPrincipal;
    private premiereZoneDiv;
    private secondeZondeDiv;
    private cache;
    private centralZone;
    private zoneRepliee;
    private orientation;
    private etat;
    private doc;
    private click;
    private savePositionKey;
    private savePosition;
    noRotation: boolean;
    private initPositionFromOption;
    private dernierePositionHorizontale;
    private dernierePositionVerticale;
    private titreZoneReplie;
    private divClick;
    constructor(options: OptionZoneModulable);
    private setPremiereZone;
    private setPremiereZoneWidth;
    private setPremiereZoneHeight;
    private resPremiereZoneWidth;
    private resPremiereZoneHeight;
    private setDisplayInCache;
    private afficherCache;
    private attacherSouris;
    /**renvoie true si la deuxième zone possède une iframe */
    private deuxiemeZoneHasIframe;
    private detacherSouris;
    private replierZone;
    flipOrientation(): void;
    addClass(s: string): xElement;
    removeClass(s: string): xElement;
    deplierZone(position?: string): void;
    replierPremiereZone(): void;
    replierDeuxiemeZone(): void;
}
declare module mChart {
    export interface OptionsCourbe<T> {
        titleLocalise: string;
        divContenant: iXElementHolder;
        data: ObservableCollection<T>[];
        yName: string;
        yMaxMinValueDefaut?: number;
        unit: string;
        xName?: string;
        id: string;
        width: number;
        height: number;
        hover: (e: T, point?: [number, number]) => void;
        dataY: (data: T) => number;
        dataX: (data: T) => DateSerialisable;
        seriesName: string[];
        courbe: enumStyleCourbe;
        affichageDate: (d: DateSerialisable) => string;
        echelle?: OptionsEchelle;
        legend: boolean;
        afficherCumul?: boolean;
        cumuler?: (a: T, b: T) => T;
        ligneSupplementaire?: number[];
        seriesCouleur: string[];
        notWithLegendeInChart?: boolean;
        class?: string;
    }
    interface OptionsEchelle {
        debut: DateSerialisable;
        fin: DateSerialisable;
    }
    export enum enumStyleCourbe {
        points = 0,
        courbeApprox = 1
    }
    export class DataCourbe {
        name: string;
        values: number[];
        constructor(pname: string, pvalue: number[]);
    }
    export class AllDataCourbe {
        series: DataCourbe[];
        dates: DateSerialisable[];
        constructor(pseries: DataCourbe[], pdates: DateSerialisable[]);
    }
    export class VoronoiPointCustom {
        point: [number, number];
        key: string;
        constructor(key: string, point: [number, number]);
    }
    export class VoronoiSerieCustom {
        area: number;
        cell: [number, number];
        polygon: [number, number];
        centroid: [number, number];
        constructor(area: number, cell: [number, number], polygon: [number, number], centroid: [number, number]);
    }
    export class xxCourbe<T> implements iXElement {
        private series;
        private datas;
        private allDates;
        private pointsVoronoi;
        private serieVoronoi;
        private pointsAllSeries;
        private axSvg;
        private withLegendeInChart;
        get y(): SVGElement;
        private getEmplacementLegend;
        private getVoronoiSerie;
        constructor(options: OptionsCourbe<T>);
    }
    export {};
}
interface OptionsTreeTabControl {
    id?: string;
    class?: string;
    typeOrientation?: enumTypeOrientation;
    textLocalise?: string;
    textVariable?: string;
    onglets: (OptionsTreeTabControl | OptionsTabItem)[];
    withDefault?: boolean;
    favoriteGlobalKey?: {
        key: string;
        cdperso: string;
    };
    favoriteAutoSave?: boolean;
    color?: string;
    modeNavigation?: boolean;
    addContentTreeTabControl?: xxTreeTabControl;
    postZoneAligneeADroite?: boolean;
}
declare class xxTreeTabControl implements iXElement {
    get y(): HTMLElement;
    private favoriteGlobalKey?;
    private TabControlPrincipal;
    private modeNavigation?;
    appendPreZoneTab(i: iXElement): xxTreeTabControl;
    appendPostZoneTab(i: iXElement): xxTreeTabControl;
    ajouterOnglet(op: OptionsTabItem): void;
    ajouterGroupeOnglets(op: OptionsTreeTabControl): xxTreeTabControl;
    selectTabItem(itemId: string, avecRechargement: boolean): boolean;
    setTabItemHasContenu(itemId: string, hasContenu: boolean): void;
    afficherTabItem(itemId: string, bShow: boolean): boolean;
    hasContenu(): boolean;
    constructor(o: OptionsTreeTabControl);
}
interface OptionsColonnes<T> {
    titleLocalise?: string;
    titleVariable?: string;
    titleClass?: string;
    tooltipTitleLocalise?: string;
    renderMethod: (place: iXElementHolder, valeur: T, element: ITableauLigneWrapperBase<T>, tab: xxTableauWrapper<T>) => void;
    renderTitle?: (place: iXElementHolder) => void;
    greaterThan?: (a: T, b: T, TriCourant: enumTypeTri) => number;
    greaterThanGeneric?: (a: T) => string | boolean | number | DateSerialisable | Date;
    triCourant?: enumTypeTri;
    group?: (place: iXElementHolder, valeur: T) => void;
    printGroup?: (valeur: T) => string;
    print?: (valeur: T) => string | number;
    printTitleLocalise?: () => string;
    widthPdf?: number | string;
    canDeleteColumn?: boolean;
    ordreTri?: number;
    binding?: {
        triCourantEtOrdreBinding?: BindableObject<{
            triCourant?: enumTypeTri;
            ordreTri?: number;
        }>;
    };
    onChangeTrie?: (triCourant: enumTypeTri, ordreTri?: number) => void;
    verrouTriPrincipal?: boolean;
}
interface dicoImagesXElement {
    '*'?: string;
    page_de_garde_paysage?: string;
    page_de_garde_portrait?: string;
    page_paysage?: string;
    page_portrait?: string;
}
interface OptionsTableau<T> {
    id?: string;
    class?: string;
    data: T[];
    dataContext?: ObservableCollection<T>;
    columns: OptionsColonnes<T>[];
    fixerEntetes?: boolean;
    margin?: boolean;
    pagination?: number;
    afficherTotalElements?: boolean;
    filtreTexte?: (s: string, item: T) => boolean;
    filtreTexteAsync?: (s: string, item: T) => Promise<boolean>;
    masquerZoneFiltreTexte?: boolean;
    placeHolderFiltreTexte?: string;
    sansTableauTools?: boolean;
    autoComplete?: boolean;
    clickLigne?: (l: T, lw: ITableauLigneWrapperBase<T>) => void;
    dblClickLigne?: (l: T, lw: ITableauLigneWrapperBase<T>) => void;
    titleVariable?: string;
    titleLocalise?: string;
    titleIcone?: Icone;
    titleTypeLabel?: enumTypeLabel;
    exportPDF?: {
        sousTitreLocaliseExportPdf?: string | (() => string);
        sousTitreVariableExportPdf?: string | (() => string);
        titreLocaliseExportPdf?: string | (() => string);
        titreVariableExportPdf?: string | (() => string);
        nomExportPdf?: string;
        getImagesPdf?: () => Promise<dicoImagesXElement>;
        PdfModePaysage?: boolean;
        getCartouchePdf?: () => Promise<pdfMake.DocDefinition>;
        renderBouton?: boolean;
    };
    detailLigne?: {
        renderDetailLigne?: (place: iXElementHolder, valeur: T, lw: ITableauLigneWrapperBase<T>) => void;
        afficherDetailLigne?: (valeur: T) => boolean;
        printDetailLigne?: (valeur: T) => string;
    };
    groupeGlobal?: {
        group: (place: iXElementHolder, valeur: T, valeurPrecedente: T) => void;
        greaterThan?: (a: T, b: T) => number;
        greaterThanAsync?: (a: T, b: T) => Promise<number>;
        greaterThanGeneric?: (a: T) => string | boolean | number | DateSerialisable | Date;
        printGroupeGlobal?: (valeur: T, valeurPrecedente: T) => string;
    };
    renderNoData?: (ici: iXElementHolder) => void;
    WithHeaderRenderNoData?: boolean;
    premiereColonneFixe?: boolean;
}
declare class xxColonne<T> {
    wrapInEntete: xxWrapPanel;
    private _entete;
    set entete(v: HTMLTableHeaderCellElement);
    get entete(): HTMLTableHeaderCellElement;
    titre: string;
    tooltipTitleLocalise: string;
    renderTitre?: (place: iXElementHolder, setTriPrincipal?: (colonne: xxColonne<T>, withTogle: boolean) => void, trierLesDonnes?: () => xxTableauWrapper<T>) => void;
    renderMethod: (place: iXElementHolder, valeur: T, l: ITableauLigneWrapperBase<T>, tab: xxTableauWrapper<T>) => void;
    greaterThan?: (a: T, b: T, TriCourant: enumTypeTri) => number;
    group?: (place: iXElementHolder, valeur: T) => void;
    printGroup?: (valeur: T) => string;
    widthPdf?: string | number;
    print?: (val: T) => string | number;
    printTitleLocalise?: () => string;
    canDeleteColumn: boolean;
    changerIcone: (a: Icone) => void;
    private _titleClass;
    triCourantEtOrdreBinding: BindableObject<{
        triCourant?: enumTypeTri;
        ordreTri?: number;
    }>;
    private onChangeTrie?;
    private verrouTriPrincipal;
    get IsTriable(): boolean;
    get IsVerrouTriPrincipal(): boolean;
    getOrderTri(): number;
    getTypeTri(): number;
    getIconeTri(): Icone;
    private _cle;
    get cle(): number;
    private static compteurUniverselColonnes;
    private static getUniqueColumn;
    constructor(inOptions: OptionsColonnes<T>);
}
declare class xxTableauHelper {
    static rechercheString(valeur1: string, valeur2: string[]): boolean;
}
interface ITableauLigneWrapperBase<T> {
    toggleClass(c: string): void;
    ajouterClasse(c: string): void;
    supprimerClasse(c: string): void;
    refresh(sourceObjetAAssigner?: T): void;
    afficherDetail(): void;
    masquerDetail(): void;
    togleDetail(): void;
    containsClasse(c: string): boolean;
}
declare class xxTableauLigneWrapper<T> implements ITableauLigneWrapperBase<T> {
    constructor(inItem: xxTableauItem<T>);
    private item;
    /**
     * permet de permuter la présence d'une classe sur la ligne en cours
     * @param c
     */
    toggleClass(c: string): void;
    /**
    * permet d'ajouter une classe sur la ligne en cours
    * @param c
    */
    ajouterClasse(c: string): void;
    /**
     * permet de supprimer une classe sur la ligne en cours
     * @param c
     */
    supprimerClasse(c: string): void;
    refresh(sourceObjetAAssigner?: T): void;
    afficherDetail(): void;
    masquerDetail(): void;
    togleDetail(): void;
    containsClasse(classeCss: string): boolean;
}
declare class xxTableauWrapper<T> implements iXElement {
    private renderNoData;
    private getImagesPdf;
    private getCartouchePdf;
    private PdfModePaysage;
    private divPrincipal;
    private footerTableau;
    private placeInfoNoData;
    private placeInfoLoading;
    private compteurComplet;
    private monTableau;
    private ligneEntete;
    private mesItemsTous;
    private mesItemsFiltres;
    private debutAffichage;
    private pagination;
    private colonneTri;
    private filtreEnCours;
    private filtreTexte?;
    private placeHolderFiltreTexte?;
    private autocomplete;
    private nomExportPdf;
    private titre;
    private icone;
    private masquerZoneFiltreTexte;
    private sansTableauTools;
    private clickLigne;
    private dblClickLigne;
    mesColonnes: xxColonne<T>[];
    private dockBoutonHeader;
    private labelCompteur;
    private afficherTotalElements;
    private inputFiltre;
    private hasGroupGlobal;
    private groupGlobal;
    private greaterThanGlobal;
    private printGroupeGlobal;
    dataContext: ObservableCollection<T>;
    private fixerEntetes;
    private sousTitrePDf;
    private titrePDF;
    private margin;
    private classCss;
    private renderDetailLigne;
    private printDetailLigne;
    private afficherDetailLigne;
    private _ligneSelectionne;
    getColonnes(): xxColonne<T>[];
    private renderLoading;
    private resetLoading;
    private resetNoData;
    constructor(inOptions: OptionsTableau<T>);
    private initTri;
    fakeClic(val: T): void;
    setLoadingPromise(p: Promise<void>): void;
    fakedblClic(val: T): void;
    getDatasFiltres(): T[];
    setFiltre(str: string): xxTableauWrapper<T>;
    getFiltre(): string;
    exporterExcel(): Promise<void>;
    exporterFichierExcel(): Promise<string[]>;
    private genererworksheetDonneeFichierXLSX;
    exporterCSV(): void;
    private getImagesPdfWrapper;
    private getCartouchePdfWrapper;
    /**
     * permet de récupérer une ligne wrapper correspondant à une donnéee du tableau
     * @param o
     */
    getLigneByValue(o: T): xxTableauLigneWrapper<T>;
    exporterPDF(cb: () => void): Promise<void>;
    /**
     * Retourne l'image de fond pour le pdf en fonction du mode d'édition et de la page courante.
     * @param sources
     * @param modePaysage
     * @param currentPage
     */
    private getBackgroundImage;
    /**
     * permet d'ajouter un bouton dans le header tableau
     * @param boutonWrapper
     * @param position Dockposition
     */
    ajouterBouton(b: xxToolTipBouton | xxBouton, position: DockPosition): xxTableauWrapper<T>;
    /**
   * permet d'ajouter un bouton dans le header tableau
   * @param labelContainer
   * @param position Dockposition
   */
    ajouterLabelContainer(b: xxLabelContainer, position: DockPosition): xxTableauWrapper<T>;
    /**
     * Permet d'ajouter un element dans le header
     * @param b
     * @param position
     */
    ajouterElement(b: iXElement, position: DockPosition): xxTableauWrapper<T>;
    /**
     * affiche le bandeau aucune donnée si nécessaire
     * @param oui
     */
    private afficheNoData;
    private addDatas;
    /**
     * permet d'ajouter des éléments de type <T>
     * privilégier l'ajout par liste pour améliorer les performances
     * @param tabVal
     */
    ajouterDatas(tabVal: T[]): xxTableauWrapper<T>;
    masquerPagination(): xxTableauWrapper<T>;
    afficherPagination(): xxTableauWrapper<T>;
    private delDatas;
    /**
     * permet de supprimer des éléments de type <T>
     * la sélection des objets à supprimer se fait par référence
     * privilégier la suppression par liste pour améliorer les performances
     * @param tabVal
     */
    supprimerDatas(val: T[]): xxTableauWrapper<T>;
    /**
    * permet de vider le tableau
    */
    supprimerDatasAll(): xxTableauWrapper<T>;
    /**
     * fonction donnant le nbre de pages total
     */
    getNbPages(): number;
    /**
     * fonction donnant le numero de la page active (démarre à 1)
     */
    getPageCourante(): number;
    getColonnesBySelecteur(filtre: ((colonne: xxColonne<T>) => boolean)): xxColonne<T>[];
    getColonneByClef(clef: number): xxColonne<T>;
    /**
     * fonction permettant d'ajouter dynamiquement une colonne au tableau
     * @param colonne
     */
    ajouterColonne(colonne: xxColonne<T>): xxTableauWrapper<T>;
    /**
     * fonction permettant de supprimer une colonne
     * @param colonne
     */
    supprimerColonne(colonne: xxColonne<T>): xxTableauWrapper<T>;
    decalerColonnePositionFixe(colonne: xxColonne<T>, position: number): xxTableauWrapper<T>;
    ajouterColonnePositionFixe(colonne: xxColonne<T>, position?: number): xxTableauWrapper<T>;
    ajouterColonnePourItem(c: xxColonne<T>, item: xxTableauItem<T>, tab: xxTableauWrapper<T>): void;
    /**
     * fonction permettant de récupérérer l'élément de base de la DOM pour pouvoir l'attacher dans un écran
     */
    get y(): HTMLElement;
    /**
     * fonction permettant de placer la pagination sur la dernière page
     */
    setPaginationMax(): void;
    /**
     * fonction permettant de définir le numéro de l'élément à partir duquel on veut afficher une page d'éléments
     * démarre à 0
     * @param index
     */
    setPagination(index: number): xxTableauWrapper<T>;
    private setPagePrecedente;
    private setPageSuivante;
    /**
     * fonction permettant de rechercher les éléments du tableau à parti d'un string fourni
     * @param s
     */
    filtrerParTexteExterne(s: string): Promise<xxTableauWrapper<T>>;
    filtrerParFonctionAsync(fi: (t: T) => Promise<boolean>): Promise<xxTableauWrapper<T>>;
    filtrerParFonction(fi: (t: T) => boolean): Promise<xxTableauWrapper<T>>;
    private rafraichirCompteurs;
    private SetMesItemsFiltres;
    private filtrerParTexte;
    private ajouterColonneNoData;
    private getColonneTrieVerrouille;
    private setTriPrincipal;
    private addTriSupplementaire;
    private trierlesDonnees;
    private rafraichirContenuTableau;
    private attacherALalisteGraphique;
    private viderLaListeGraphique;
    /**
     * Permet de créer la ligne de détail d'une ligne
     * @param item
     * @param index = index ici sert d'id pour que l'on puisse faire correspondre ligne et ligne détail
     */
    private createLigneDetail;
    SelectLigne(numeroLigne: number): void;
    addClass(c: string): xxTableauWrapper<T>;
    removeClass(c: string): xxTableauWrapper<T>;
}
declare class xxTableauItem<T> {
    renderPlaces: Dictionnaire<HTMLTableDataCellElement>;
    donnee: T;
    ligne: HTMLTableRowElement;
    ligneDetail: HTMLTableRowElement;
    rendered: boolean;
    Detailrendered: boolean;
    supprimerElement: () => void;
    render: () => void;
    renderDetail: () => void;
    constructor(ligneComplete: HTMLTableRowElement, rPlaces: Dictionnaire<HTMLTableDataCellElement>, inDonnee: T, leTableau: xxTableauWrapper<T>);
    detruire(): void;
}
interface OptionsToolTip {
    id?: string;
    class?: string;
    titleLocalise?: string;
    titleVariable?: string;
    titreHeaderVariable?: string;
    titreHeaderLocalise?: string;
    renderCustomHeader?: (ici: iXElementHolder, thisTooltip: xxToolTip) => void;
    couleurHeader?: enumCouleurHexa;
    contenuFooter?: iXElement;
    initContent: iXElement;
    toolTipContent?: iXElement;
    TooltipMode?: enumXxToolTipMode;
    OnClickTooltip?: () => void;
    OnClickTooltipBox?: () => void;
    onShow?: (thisTooltip: xxToolTip) => void;
    afterShow?: (thisTooltip: xxToolTip) => void;
    onHide?: (thisTooltip: xxToolTip) => void;
    beforeHide?: (thisTooltip: xxToolTip) => void;
    TooltipStopPropagation?: boolean;
    NotAbsoluteTooltip?: boolean;
    /** Permet de definir une position par l'axe Y (haut/center/bas) a privilegie*/
    ToolTipPositionHeightSouhaite?: enumXxToolTipPositionHeight;
    /** Permet de definir une position par l'axe X (Gauche/center/droite/extrémité Gauche/droite) a privilegie*/
    ToolTipPositionWidthSouhaite?: enumXxToolTipPositionWidth;
    /** Permet de definir si la tooltip va privilegie le position par l'axe X (extrémité Gauche/droite) ou par l'axe Y (haut/bas) */
    ToolTipPosition_by_Width_extremity?: boolean;
    /** Empêche la tooltip de ce positionné au centre sur l'axe X */
    ToolTipPositionWidthNeverCenter?: boolean;
    /** Empêche la tooltip de ce positionné au centre sur l'axe Y */
    ToolTipPosition_Heigth_NeverCenter?: boolean;
    /** Permet de definir la taille de la tooltip en X (width)  */
    ToolTipWidthFix?: number;
    /** Permet de definir la taille de la tooltip en Y (Heigth)  */
    ToolTipHeigthFix?: number;
    WithoutFleche?: boolean;
    /** Si un autre tooltip est ouvert evite qu'elle se ferme*/
    isIndependenteToolTip?: boolean;
    /** Permet d'éviter le comportement responsive à true */
    nonResponsive?: boolean;
    /** Permet de désactiver le tooltip : celui-ci ne s'ouvrira pas */
    disabled?: boolean;
    /**Permet d'ajouter un délai en MS avant l'ouverture de l'info-bulle */
    withDelaiOuvertureMs?: number;
    optionsAffichage?: optionsAffichage;
}
interface OptionToolTipBouton extends iTestable {
    id?: string;
    class?: string;
    titreHeaderVariable?: string;
    titreHeaderLocalise?: string;
    renderCustomHeader?: (ici: iXElementHolder, thisTooltip: xxToolTip) => void;
    couleurHeader?: enumCouleurHexa;
    contenuFooter?: iXElement;
    icone?: Icone;
    espaceMinimaliste?: boolean;
    border?: boolean;
    margin?: boolean;
    positionIconeBouton?: enumPosition;
    optionsAffichageBouton?: optionsAffichageBouton;
    inverser?: boolean;
    toolTipContent?: iXElement;
    WithOutBackGround?: boolean;
    onShow?: (thisTooltip: xxToolTip) => void;
    afterShow?: (thisTooltip: xxToolTip) => void;
    onHide?: (thisTooltip: xxToolTip) => void;
    beforeHide?: (thisTooltip: xxToolTip) => void;
    TooltipStopPropagation?: boolean;
    NotAbsoluteTooltip?: boolean;
    /** Permet de definir une position par l'axe Y (haut/center/bas) a privilegie*/
    ToolTipPositionHeightSouhaite?: enumXxToolTipPositionHeight;
    /** Permet de definir une position par l'axe X (Gauche/center/droite/extrémité Gauche/droite) a privilegie*/
    ToolTipPositionWidthSouhaite?: enumXxToolTipPositionWidth;
    /** Permet de definir si la tooltip va privilegie le position par l'axe X (extrémité Gauche/droite) ou par l'axe Y (haut/bas) */
    ToolTipPosition_by_Width_extremity?: boolean;
    /** Empêche la tooltip de ce positionné au centre sur l'axe X */
    ToolTipPositionWidthNeverCenter?: boolean;
    /** Empêche la tooltip de ce positionné au centre sur l'axe Y */
    ToolTipPosition_Heigth_NeverCenter?: boolean;
    /** Permet de definir la taille de la tooltip en X (width)  */
    ToolTipWidthFix?: number;
    /** Permet de definir la taille de la tooltip en Y (Heigth)  */
    ToolTipHeigthFix?: number;
    WithoutFleche?: boolean;
    /** Si un autre tooltip est ouvert evite qu'elle se ferme*/
    isIndependenteToolTip?: boolean;
    optionsAffichage?: optionsAffichage;
}
interface OptionToolTipBoutonTexteVariable extends OptionToolTipBouton {
    tailleBouton?: enumTailleBouton;
    titleLocalise?: string;
    titleVariable?: string;
    textLocalise?: string;
    textVariable: string;
}
interface OptionToolTipBoutonTexteLocalise extends OptionToolTipBouton {
    tailleBouton?: enumTailleBouton;
    titleLocalise?: string;
    titleVariable?: string;
    textLocalise: string;
    textVariable?: string;
}
interface OptionToolTipBoutonSansTexte extends OptionToolTipBouton {
    tailleBouton?: enumTailleBouton.Fit | enumTailleBouton.Tuile;
    titleLocalise?: string;
    titleVariable?: string;
    textLocalise?: undefined;
    textVariable?: undefined;
}
declare type OptionsTooltipBouton = OptionToolTipBoutonSansTexte | OptionToolTipBoutonTexteLocalise | OptionToolTipBoutonTexteVariable;
declare enum enumXxToolTipMode {
    OnHover = 0,
    Manuel = 1,
    Manuel_WithOut_BackGround = 2
}
declare enum enumXxToolTipPositionHeight {
    haut = 0,
    center = 1,
    bas = 2
}
declare enum enumXxToolTipPositionWidth {
    extremiteGauche = 0,
    gauche = 1,
    center = 2,
    droite = 3,
    extremiteDroite = 4
}
declare class xxToolTip implements iXElement {
    private static TooltipOuvert;
    private static ListeTooltip;
    private static IsHoverIndependenteToolTip;
    static ForcerFermetureDeToutesLesTooltips(): boolean;
    private timenb;
    private title;
    private elementPrincipal;
    private elementTooltip;
    private headerDiv;
    private Tooltip_Box_Event;
    private Tooltip_Box_Header_Titre;
    private ToolTip_Box_Contenu;
    private Tootip_Contenu;
    private positionHeight;
    private positionWidth;
    private positionHeightSouhaite;
    private positionWidthSouhaite;
    private lesOption;
    private isShow;
    addClass(strClasses: string): xxToolTip;
    removeClass(strClasses: string): xxToolTip;
    constructor(o: OptionsToolTip);
    /**
     * Permet de vider le contenue de la toolTip
     * */
    viderTooltip(): xxToolTip;
    /**
     * Permet d'ajouté du contenue dans la tooltip
     */
    setToolTip(ttContent: iXElement): xxToolTip;
    /**
     *  Permet de set le Titre du header (si il y en a un )
     */
    setTitreHeaderTooltipBox(titre: string): void;
    get isVisible(): boolean;
    private Generation;
    private ModeManuel;
    private ModeManuelWithOutBackGround;
    private OnHover;
    setCouleurHeader(newCouleur: enumCouleurHexa): void;
    private generateTooltipBoxEventInitContent;
    setDisabled(disabled: boolean): void;
    /**
    * Permet d'afficher la tootip
    */
    ShowTooltip(): void;
    /**
    * Permet de cacher la tooltip
    */
    HideTooltip(): Promise<void>;
    ToggleToolTip(): void;
    /**
    * Permet de calculer et positionner la tooltip
    */
    CalculPosition(): void;
    private get visibleClass();
    private get PositionClass();
    private refreshClass;
    width(parame?: string | number): void | number;
    height(parame?: string | number): void | number;
    get y(): HTMLElement;
}
declare class xxToolTipBouton implements iXElement {
    private ToolTip;
    private Bouton;
    constructor(o: OptionsTooltipBouton);
    get GetTooltip(): xxToolTip;
    get y(): HTMLElement;
    setIcone(icone: Icone): void;
    setText(test: string): void;
    addClass(c: string): xxToolTipBouton;
    removeClass(c: string): xxToolTipBouton;
}
declare enum enumSVGTaille {
    xxs = 0,
    xs = 1,
    s = 2,
    m = 3,
    l = 4,
    custom = 5
}
declare enum enumSVGOrientation {
    Left = 0,
    Right = 1,
    Top = 2,
    Bottom = 3,
    custom = 4
}
interface OptionsSVG {
    id?: string;
    viewBoxContains?: string;
    contains?: string;
    cssContains?: string;
    widthCustom?: number;
    heightCustom?: number;
    class?: string;
    size?: tailleIcone;
}
declare class xSVG {
    get y(): SVGElement;
    private tailleSvg;
    private widthCustom;
    private heightCustom;
    private class;
    private svge;
    constructor(options: OptionsSVG);
    getClasse(): string;
    getClass(): string;
}
interface OptionsOption {
    value?: string;
    selected?: any;
    text?: string;
}
interface OptionsSelect extends OptionsHtml {
    multiple?: any;
    listeValeurs?: CleValeur<string, string>[];
    valueDefault?: string;
    optionTous?: boolean;
    icone?: Icone;
    onClose?: () => void;
    change?: (code: string) => void;
    asyncLoading?: (opt: OptionsSelect, callback: (value?: {}) => void) => void;
}
declare enum enumConteneurListeDeroulante {
    standard = 0,
    boxer = 1
}
interface OptionsListeDeroulante<T> {
    defaultValue?: T;
    lectureSeule?: boolean;
    donnees: T[];
    dataContext?: ObservableCollection<T>;
    asyncLoading?: () => Promise<T[]>;
    asyncDefault?: (donneesChargees: T[]) => T;
    justifieAGauche?: boolean;
    retourALaLigne?: boolean;
    textLocaliseMobile?: string;
    textVariableMobile?: string;
    renderSelectItem: (p: iXElementHolder, item: T, selecteur: (a: T) => void, id: string) => void;
    renderSelected: (p: xElementHolder, item: T, openSelect: (itemSelectionne: T) => void, data: T[]) => void;
    selected: (item: T, deleteElementCallBack: () => void, listeDeroulante: xxListeDeroulante<T>) => void;
    class?: string;
    id?: string;
    getId?: (elem: T) => string;
    onClose?: () => void;
    onShow?: () => void;
    equals?: (a: T, b: T) => boolean;
    renderHeaderList?: (placeHead: iXElementHolder, list: xxListeDeroulante<T>) => void;
    renderEndList?: (iciFin: iXElementHolder, listeDeroulante: xxListeDeroulante<T>) => void;
    binding?: {
        value?: BindableObject<T>;
        visibility?: BindableObject<enumVisibility>;
        lectureSeule?: BindableObject<boolean>;
    };
    renderLectureSeule?: (p: iXElementHolder, item: T) => void;
    nonResponsive?: boolean;
    /** Regroupe les elements (comme un groupBy), sous une seule bannier commune (modifie l'ordre des données) */
    regroupementUniqueBy?: {
        /** Sans c'est options le header sera juste un libelle avec la donnée du GroupBy */
        groupHeaderCustom?: (place: iXElementHolder, listGroup: T[]) => void;
        GroupBy: (a: T) => string | boolean | number | DateSerialisable | Date;
    };
}
declare class xxListeDeroulante<T> implements iXElement {
    private containerPourChoisir;
    private openListButton;
    private container;
    private hoteList;
    private list;
    private donnees;
    private currentValue;
    private promesseChargement;
    private promesseCharge;
    private bindLectureSeule;
    private nonResponsive;
    private equals;
    private renderSelected;
    private selected;
    private renderSelectItem;
    private renderHeaderList;
    private renderEndList?;
    private textLocaliseMobile?;
    private textVariableMobile?;
    private justifieAGauche?;
    private renderLectureSeule?;
    private onClose?;
    private getId?;
    private regroupementUniqueBy?;
    get y(): HTMLElement;
    get asyncLoaded(): Promise<void>;
    get Data(): T[];
    set Data(datas: T[]);
    constructor(inOptions: OptionsListeDeroulante<T>);
    private supprimerElement;
    ajouterData(dataPlus: T[]): xxListeDeroulante<T>;
    supprimerDataAll(): xxListeDeroulante<T>;
    setLectureSeule(lectureSeule: boolean): void;
    selecteur(i: T): void;
    selecteurByFind(filtre: ((a: T) => boolean)): void;
    selecteurWithOutValueChange(i: T): void;
    ouvrirSelection(): Promise<void>;
    scrollToTop(): void;
    scrollToBot(): void;
    scrollUp(nombrePx?: number): void;
    scrollDown(nombrePx?: number): void;
    private openSelect;
    private closeList;
    close(): void;
    vider(): void;
}
interface OptionsListeDeroulanteSimpleNePlusUtiliser<T> {
    defaultKeyValue: string;
    donnees: T[];
    asyncLoading?: () => Promise<T[]>;
    selected: (cle: T) => void;
    getKey: (item: T) => string;
    getLibelle: (item: T) => string;
    getIcone?: (item: T) => Icone;
    class?: string;
}
/** @deprecated Ne sert que pour rétrocompatibilité, ne pas utiliser*/
declare class xxListeDeroulanteSimpleNePlusUtiliser<T> extends xxListeDeroulante<T> {
    constructor(inOpt: OptionsListeDeroulanteSimpleNePlusUtiliser<T>);
}
interface OptionCarrousel {
    photos64: string[];
    indice_depart: number;
    class?: string;
    valueChange: (index: number) => void;
}
declare class xxCarrousel implements iXElement {
    private photos64;
    private indexListe;
    private elemPrincipal;
    private valueChange;
    constructor(o: OptionCarrousel);
    private affiche;
    ajouterData(indice: number, photo: string): void;
    get y(): HTMLElement;
}
interface OptionListeDeroulanteAutomatique {
    data: string[];
    libelle: string;
    renderSelected: () => void;
    valeurSaisie: (val: string) => void;
    versionMobile?: boolean;
    nbElemMaxBouttonsRadio?: number;
}
declare class xxListeDeroulanteAutomatique implements iXElement {
    private data;
    private libelle;
    private renderSelected;
    private valeurSaisie;
    private versionMobile;
    private nbElemMaxBouttonsRadio;
    private elemPrincipal;
    constructor(o: OptionListeDeroulanteAutomatique);
    private affiche;
    get y(): HTMLElement;
}
declare class MediaRecorder {
    constructor(stream: MediaStream, options?: any);
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    addEventListener(type: string, listener: (event: any) => void): void;
}
interface OptionsRecorder {
    id?: string;
    class?: string;
    valueChange?: (url: string) => void;
}
interface Window {
    webkitAudioContext: typeof AudioContext;
}
declare class xxRecorder implements iXElement {
    private wrap;
    get y(): HTMLElement;
    private leftchannel;
    private rightchannel;
    private recorder;
    private recordingLength;
    private volume;
    private mediaStream;
    private sampleRate;
    private blob;
    private url;
    private audio;
    private lecteurAudio;
    private valueChange;
    private temps;
    private timerLabel;
    private interval;
    private timerIsRunning;
    private btnPause;
    private alreadyPause;
    private mediarecorder;
    private audioChunks;
    constructor(o: OptionsRecorder);
    setAudio(audio: string): void;
    private StartTimer;
    private ArreterTimer;
    private PauseTimer;
    private ResumeTimer;
}
interface OptionsLecteurAudio {
    id?: string;
    class?: string;
    audio?: string;
}
declare class xxLecteurAudio extends xElement {
    constructor(o: OptionsLecteurAudio);
    setAudio(newAudio: string): void;
    hideLecteurAudio(collapse?: boolean): void;
    showLecteurAudio(): void;
}
interface optionsTexteEnrichi extends OptionsInput {
    /** dans emed utiliser la méthode générique: OutilsJSEmed.insertListeMotsInCkEditor; */
    insertListeMotsInCkEditor?: (htmlVal: string, listeMot: boolean) => void;
}
declare var gestion_editor: any;
declare class xxTexteEnrichi implements iXElement {
    get y(): HTMLElement;
    private textArea;
    private elementPrincipal;
    private insertListeMotsInCkEditor;
    private change;
    constructor(options: optionsTexteEnrichi);
    setCkEditor(): void;
    private fermerBaliseP;
    getContenu(): string;
    setContenu(txtCourrier: string): void;
    setDisabled(disabled: boolean): void;
}
interface OptionsIMC {
    id?: string;
    class?: string;
    value: number;
    disabledTooltip?: boolean;
}
declare class xxIMC implements iXElement {
    private tooltip;
    get y(): HTMLElement;
    constructor(o: OptionsIMC);
    private ToolTipContent;
}
interface OptionsProgressBar {
    class?: string;
    page?: xxPageWrapper;
    nbTotalElements: number;
    hauteur?: string;
    largeur?: string;
    titre?: string;
    dureeAnimCSS?: number;
    valeurDepart?: string;
}
declare class xxProgressBar implements iXElement {
    private lectureSeule;
    private class;
    private nbTotalElements;
    private nbElementsEnCours;
    private composant;
    private progressBarContainer;
    private progressBar;
    private wrapPanel;
    constructor(options: OptionsProgressBar);
    setProgression(nbElement: number): void;
    get y(): HTMLElement;
}
interface IOptionsxxArbre<T> {
    donnees: ObservableCollection<T>;
    getEnfants: (t: T) => T[];
    getPere: (t: T) => T;
    valueChange: (t: T) => void;
    renderDetail: (t: T, place: iXElementHolder, selecteur: (t: T) => void) => void;
    renderTitre: (t: T, place: iXElementHolder, selecteur: (t: T) => void) => void;
    renderSelected: (t: T, place: iXElementHolder, openSelect: (itemSelectionne: T) => void) => void;
    defaultvalue: T;
    renderEndList: (place: iXElementHolder, liste: xxListeDeroulante<T>) => void;
}
declare class xxArbre<T> implements iXElement {
    private div;
    private donnees;
    private getEnfants;
    get y(): HTMLElement;
    constructor(o: IOptionsxxArbre<T>);
    private RenderEnfants;
}
interface optionMenuContextuel {
    renderMenuContextuel: (place: iXElementHolder, ouvrir?: () => void, fermer?: () => void) => void;
    class?: string;
}
declare class xxMenuContextuel implements iXElement {
    private elementPrincipal;
    private xSouris;
    private ySouris;
    constructor(options: optionMenuContextuel);
    fermer(): void;
    ouvrir(): void;
    get y(): HTMLElement;
    private calculePositionMenu;
}
