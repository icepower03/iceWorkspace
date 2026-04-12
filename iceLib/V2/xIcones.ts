

import { iXElement, enumCouleur } from './xBase';
import { xDiv } from './xcontrols/xDiv';
import { xSVG } from './xcontrols/xSVG';
import { xImg } from './xcontrols/xImg';
import { ContenusSVG, xListeIconeSVG } from './xListeIconeSVG';

export enum enumIconeP12
{
    //
    aucun, //undefined

    //actions
    action_admission,
    action_agrandir,
    action_agrandir_horizontal,
    action_ajout_destinataire,
    action_ajouter,
    action_ajouter_blanc,
    action_ajouter_valider,
    action_annuler,
    action_annuler_blanc,
    action_annuler_cercle,
    action_apercu,
    action_apercu_doc,
    action_apercu_historique,
    action_apercu_live,
    action_arret,
    action_associer,
    action_baguette_auto,
    action_bouton_play,
    action_carte_praticien,
    action_carte_visite_med,
    action_changement_lit,
    action_checkbox_active,
    action_checkbox_inactive,
    action_coller,
    action_commentaire,
    action_copie_destinataire,
    action_copier,
    action_copier_droite,
    action_copier_gauche,
    action_couper,
    action_csv,
    action_cv_creation_patient,
    action_deplier_blanc,
    action_deplier_bleu,
    action_desepingler,
    action_deverrouiller,
    action_dmp,
    action_dossierpatient,
    action_dupliquer,
    action_enregistrer,
    action_enregistrer_imprimer,
    action_enregistrer_periode,
    action_envoi_message,
    action_envoyer,
    action_epingler,
    action_erreur,
    action_espace_pro,
    action_etat_dossier,
    action_filtres,
    action_filtres_inactif,
    action_filtres_options_actif,
    action_filtres_options_inactif,
    action_flag_gris,
    action_flag_rouge,
    action_fleche_angle_bas_droite,
    action_fleche_double_droite,
    action_fleche_double_gauche,
    action_fleche_simple_droite,
    action_fleche_simple_gauche,
    action_fractionner_ligne,
    action_gomme,
    action_graphique,
    action_historique,
    action_horaire,
    action_import,
    action_import_ajout,
    action_importer,
    action_impression_cerfa,
    action_imprimer,
    action_imprimer_blanc,
    action_imprimer_noir,
    action_inconnu,
    action_info,
    action_interdit,
    action_lecture,
    action_log,
    action_masquer,
    action_medecin_adresseur,
    action_medecin_traitant,
    action_mise_en_page,
    action_modifier,
    action_mssante,
    action_ouvrir_boxer,
    action_partage,
    action_pdf,
    action_periode_heures,
    action_personne_copie,
    action_personne,
    action_planifier,
    action_plier_blanc,
    action_plier_bleu,
    action_raccourci,
    action_rafraichir,
    action_rafraichir_valider,
    action_rechercher,
    action_rechercher_dossier,
    action_rechercher_patient,
    action_recycler,
    action_reduire,
    action_reduire_horizontal,
    action_reglage,
    action_reset,
    action_retour,
    action_rotation,
    action_saisie_facture,
    action_securiser_factures,
    action_sortie,
    action_statistiques,
    action_supprimer_blanc,
    action_supprimer,
    action_telecharger_documents,
    action_telecharger_package,
    action_teletransmission,
    action_transferer,
    action_tri_asc,
    action_tri_defaut,
    action_tri_desc,
    action_tri_principal_asc,
    action_tri_principal_desc,
    action_trois_colonnes,
    action_urgent,
    action_valider,
    action_valider_cercle,
    action_verification,
    action_verification_arl,
    action_verification_noemie,
    action_verrouiller,
    action_xls,
    action_zoom_ajuster_ecran,
    action_zoom_ajuster_largeur,
    action_zoom_moins,
    action_zoom_plus,

    //Administration
    admin_agendas,
    admin_dossier_patient,
    admin_elsan,
    admin_etablissement,
    admin_examens,
    admin_hemo,
    admin_impression,
    admin_maj,
    admin_medicaments,
    admin_outil,
    admin_parametres,
    admin_parametres_simple,
    admin_patient,
    admin_pmsi,
    admin_smartdoc,
    admin_soins,
    admin_UF,
    admin_urgences,
    admin_US,
    admin_user,

    //Agenda
    agenda_ajouter,
    agenda_comparer,
    agenda_importer,
    agenda_supprimer,
    agenda_synchroniser,

    //aide
    aide_aide,

    //alerte
    alerte_grise,
    alerte_orange,
    alerte_rouge,
    alerte_verte,

    //basics
    basics_LinkBlanc,
    basics_liste_a_points_blanc,
    basics_liste_a_points_noir,
    basics_UX_Mobile,
    basics_UX_Pc,

    //bdd
    bdd,

    //carte
    carte_cartemagnetique,

    //courrier
    courrier_modele,
    courrier_modele_ajouter,

    //dds depot_de_sang
    dds_bon_livraison_efs,
    dds_codes_barres,
    dds_destruction,
    dds_destruction_etablissement,
    dds_poches_attentes_reception,
    dds_poches_retour_efs,
    dds_poches_sorties_transfusion,
    dds_quarantaine,
    dds_reappro_stock_urgence,
    dds_reattribution,
    dds_reception,
    dds_retour,
    dds_sortie,
    dds_stats_detaillees,
    dds_stats_globales,
    dds_stock_en_cours,
    dds_transfusion_ajouter,

    //dmp
    dmp_notransmission,
    dmp_transmission,

    //documents
    document_document,
    document_invalide,
    document_valide,

    //dossier
    dossier_ajouter,
    dossier_lier,

    //droits
    droits_ajouter_profil,
    droits_charger_profil,
    droits_enregistrer_user,

    //entrepot
    entrepot_entrepot,

    //etat
    etat_administre,
    etat_arrete,
    etat_arrete_modification,
    etat_arrete_urgent,
    etat_encours,
    etat_lock,
    etat_non_vu,
    etat_prevu,
    etat_suspendu,
    etat_termine,
    etat_vu,

    //examens
    examen_anormal,
    examen_reaffecter_resultat,

    //facture
    facture_ajouter,
    facture_liste,

    //favoris
    favori_favoriOff,
    favori_favoriOn,

    //fleche
    fleche_blanche_bas,
    fleche_blanche_droite,
    fleche_blanche_gauche,
    fleche_blanche_haut,
    fleche_bleue_bas,
    fleche_bleue_droite,
    fleche_bleue_gauche,
    fleche_bleue_haut,
    fleche_noire_bas,
    fleche_noire_droite,
    fleche_noire_gauche,
    fleche_noire_haut,

    //graphiste
    graphiste_icone_a_creer,

    //horloge
    horloge_alerte,
    horloge_attente,
    horloge_attente_blanc,
    horloge_attente_orange,
    horloge_chrono,
    horloge_duree,

    //lang
    lang_ca,
    lang_de,
    lang_fr,
    lang_en,
    lang_es,

    //liste
    liste_a_points,
    liste_a_points_noir,
    liste_annuler,
    liste_coches,
    liste_enregistrer,
    liste_importer,
    liste_simple,

    //logo
    logo_elive,
    logo_guacamole_francisco_de_mexico,

    //Médicament (pour admin)
    medicament_pharmacie,

    //menu
    menu_calendrier,
    menu_informations,
    menu_intervention,
    menu_troispoints,
    menu_tuile_retour,
    menu_tuile_vuedeservice,

    //nettoyer
    nettoyer_balai,

    //niveau
    niveau_niveau1,
    niveau_niveau2,
    niveau_niveau3,
    niveau_niveau4,

    //Periodicite
    periodicite_casse,
    periodicite_jour,
    periodicite_mois,
    periodicite_semaine,

    //pharmacien
    pharmacien_delai_depasse,

    //phonetique
    phonetique_off,
    phonetique_on,

    //surveillance
    surveillance_surveillance,

    //tableau
    tableau_version_1_tableau,
    tableau_version_2_tableau,
    tableau_version_3_tableau,

    //user
    user_dossier,
    user_ensemble,
    user_seul,
    user_sexe_feminin,
    user_sexe_feminin_blanc,
    user_sexe_indetermine,
    user_sexe_indetermine_blanc,
    user_sexe_masculin,
    user_sexe_masculin_blanc,
    user_user,

    //vide
    vide_vide,

    //websuite
    websuite_logo,

    //xxCheckbox
    xxCheckBox_checked_defaut,
    xxCheckBox_checked_defaut_disabled,

    //xxListChoix
    fleche_select,
    xxListChoix_defaut,
    xxListChoix_tous,

    //xxRouteContainer
    xxRouteContainer_FavoriOff,
    xxRouteContainer_FavoriOn,
    xxRouteContainer_Fermer,
    xxRouteContainer_Filariane,
    xxRouteContainer_Home,
    xxRouteContainer_MenuPerso,
    xxRouteContainer_Partager,
    xxRouteContainer_Refresh,
    xxRouteContainer_Remonter,
    xxRouteContainer_Retour,
    xxRouteContainer_SwitchMenuOff,
    xxRouteContainer_SwitchMenuOn,

    //xxTableau
    xxTableau_config_colonnes,
    xxTableau_FlecheBas,
    xxTableau_FlecheBottom,
    xxTableau_FlecheHaut,
    xxTableau_FlecheTop,

    //xxVolet
    xxVolet_bas,
    xxVolet_droite,
    xxVolet_gauche,
    xxVolet_haut,
};

export enum enumIconeAction
{
    ajouter = enumIconeP12.action_ajouter,
    valider = enumIconeP12.action_valider,
    valider_cercle = enumIconeP12.action_valider_cercle,
    annuler = enumIconeP12.action_annuler,
    annuler_cercle = enumIconeP12.action_annuler_cercle,
    supprimer = enumIconeP12.action_supprimer,
    enregistrer = enumIconeP12.action_enregistrer,
    imprimer = enumIconeP12.action_imprimer,
    visualiser = enumIconeP12.action_apercu,
    verrouiller = enumIconeP12.action_verrouiller,
    deverouiller = enumIconeP12.action_deverrouiller,
    modifier = enumIconeP12.action_modifier,
    historique = enumIconeP12.action_historique,
    rechercher = enumIconeP12.action_rechercher,
    erreur = enumIconeP12.action_erreur,
    suspendre = enumIconeP12.etat_suspendu,
    importer = enumIconeP12.action_importer,
    alerte = enumIconeP12.alerte_rouge,
    rafraichir = enumIconeP12.action_rafraichir,
    parametres = enumIconeP12.admin_parametres_simple,
    masquer = enumIconeP12.action_masquer,
    info = enumIconeP12.action_info,
    calendrier = enumIconeP12.action_planifier,
    lister = enumIconeP12.liste_simple,
    inconnu = enumIconeP12.aide_aide,
    arreter = enumIconeP12.action_arret,
    sablier = enumIconeP12.horloge_attente,
    sablier_blanc = enumIconeP12.horloge_attente_blanc,
}

export abstract class Icone implements iXElement
{
    public abstract getClasse(): string;
    public abstract getTypeIcone(): string;
    public abstract getValeurIcone():any;
    public abstract addClass(s: string): any;
    public abstract removeClass(s: string): any;

    public abstract get y(): HTMLElement|SVGElement;
}

export class IconeV2 extends Icone {
    private catalogue!: string;
    private nomIcone!: string;
    private classeComplete!: string;
    private elem!: xDiv;


    constructor(def: {
        catalogue: 'p12' | 'miniP12' | 'externe',
        nomIcone:string
    }, o?: OptionsIconeExterne) {
        super();

        let myThis: IconeV2 = this;
        myThis.catalogue = def.catalogue;
        myThis.nomIcone = def.nomIcone;
        if (o == undefined)
        {
            o = {};
        }

        if (o.taille == undefined) { o.taille = tailleIcone.M; }

        if (o.modeGrise == undefined) { o.modeGrise = false; }

        myThis.classeComplete = myThis.nomIcone + ' icone_' + tailleIcone[o.taille];

        if (o.modeGrise == true) { myThis.classeComplete += " iconeGrise" }

        switch (myThis.catalogue)
        {
            case 'p12':
                myThis.elem = new xDiv({ class: "iconeSeuleP12 " + myThis.getClasse() });
                break;
            case 'miniP12':
                myThis.elem = new xDiv({ class: "iconeSeuleMiniP12 " + myThis.getClasse() });
                break;
            case 'externe':
                myThis.elem = new xDiv({ class: "iconeSeuleExterne " + myThis.getClasse() });
                break;
        }
    }

    getClasse(): string {
        let myThis: IconeV2 = this;
        switch (myThis.catalogue)
        {
            case 'p12':
                return "iconeP12_" + myThis.classeComplete;
            case 'miniP12':
                return "iconeMiniP12_" + myThis.classeComplete;
            case 'externe':
                return "iconeExterne_" + myThis.classeComplete + ' iconeExterne ';
            default:
                return "";
        }
    }

    getValeurIcone(): string|number
    {
        let myThis: IconeV2 = this;
        return myThis.nomIcone;
    }

    getTypeIcone() : string
    {
        let myThis: IconeV2 = this;
        switch (myThis.catalogue)
        {
            case 'p12':
                return "iconeP12";
            case 'miniP12':
                return "iconeP12";
            case 'externe':
                return "iconeExterne";
            default:
                return "";
        }
    }


    public addClass(s: string) {
        return this.elem.addClass(s);
    }
    public removeClass(s: string) {
        return this.elem.removeClass(s);
    }

    get y(): HTMLElement {
        let myThis: IconeV2 = this;
        return myThis.elem.y;
    }
}

export class IconeP12 extends IconeV2
{
    private inType: enumIconeP12 | enumIconeAction;
    constructor(inType: enumIconeP12 | enumIconeAction, o?: OptionsIconeExterne)
    {
        super({ catalogue: 'p12', nomIcone: enumIconeP12[inType] }, o ?? { modeGrise: false, taille: tailleIcone.M });
        this.inType = inType;
    }

    getValeurIcone()
    {
        let myThis: IconeP12 = this;
        return myThis.inType;
    }

    getTypeIcone()
    {
        return "iconeP12";
    }
}


export class IconeMiniP12 extends IconeV2
{
    public static getIconeLang(lang: string) {
        let enumIcone: enumIconeP12;
        switch (lang) {
            case 'fr': enumIcone = enumIconeP12.lang_fr;
                break;
            case 'en': enumIcone = enumIconeP12.lang_en;
                break;
            case 'de': enumIcone = enumIconeP12.lang_de;
                break;
            case 'es': enumIcone = enumIconeP12.lang_es;
                break;
            case 'ca': enumIcone = enumIconeP12.lang_ca;
                break;
            default: enumIcone = enumIconeP12.lang_fr;
                break;

        }
        return new IconeMiniP12(enumIcone);
    }

    private inType: enumIconeP12;
    /**
     * @deprecated A ne plus utiliser : préférer new IconeP12.
     */
    constructor(inType: enumIconeP12,o?:OptionsIconeExterne)
    {
        super({ catalogue: 'p12', nomIcone: enumIconeP12[inType] }, o ?? { modeGrise: false, taille: tailleIcone.S });
        this.inType = inType;
    }

    getValeurIcone()
    {
        let myThis: IconeMiniP12 = this;
        return myThis.inType;
    }

    getTypeIcone()
    {
        return "iconeP12";
    }
}

export enum tailleIcone { M = 0, S = 1, L = 2, XS = 3, XL = 4, Custom = 5, XXS = 6  }



export interface OptionsIconeExterne
{
    taille?: tailleIcone,
    modeGrise?: boolean,
    couleurCustom?: string,
    widthCust?: number,
    heightCust?: number,
}


export class IconeExterne extends IconeV2 {

    constructor(inClasse: string, o?: OptionsIconeExterne) {

        super({catalogue:'externe',nomIcone:inClasse},o);
    }

    getValeurIcone()
    {
        return super.getValeurIcone();
    }

    getTypeIcone()
    {
        return super.getTypeIcone();
    }
}

export interface OptionIconeTypeExamen {
    classEtat: string;
    urlImgTypeExamen: string;
    abreviationTypeExamen: string;
}

export class IconeTypeExamen extends Icone {
    private classEtat: string;
    private urlImgTypeExamen: string;
    private abreviationTypeExamen: string;
    private elem: xDiv;
    public addClass(s: string) {
        return this.elem.addClass(s);
    }
    public removeClass(s: string) {
        return this.elem.removeClass(s);
    }
    constructor(inOpt: OptionIconeTypeExamen) {
        super();
        this.classEtat = inOpt.classEtat;
        this.urlImgTypeExamen = inOpt.urlImgTypeExamen;
        this.abreviationTypeExamen = inOpt.abreviationTypeExamen;
      this.elem= new xDiv({ class: this.classEtat });

        if (this.abreviationTypeExamen != null) {
            this.elem.asHolder.append(new xDiv({ class: "abreviation icon_tags", textVariable: this.abreviationTypeExamen }));
        }
        else if (this.urlImgTypeExamen != null) {
            this.elem.asHolder.append(
                new xImg({
                    src: this.urlImgTypeExamen,
                    class: 'icon_img'
                })
            );
        }
    }

    getValeurIcone(): OptionIconeTypeExamen
    {
        let myThis: IconeTypeExamen = this;
        return {
            classEtat: myThis.classEtat,
            urlImgTypeExamen: myThis.urlImgTypeExamen,
            abreviationTypeExamen: myThis.abreviationTypeExamen
        };
    }

    getTypeIcone()
    {
        return "iconeTypeExamen";
    }

    getClasse(): string {
        return "";
    }
   
    get y():HTMLElement  {
        return this.elem.y;
    }
}

// -------------- ICONES SVG ------------------

//----- ENUM LISTE D'ICONES -----//
export enum enumListeIcones {
    svg,
    tuiles
}

// ----- ENUM ICONES SVG (DE 1 A 9999)-----
export enum enumIconeSvg {
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
    play = 69, // nice
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
};

// ----- ENUM ICONES EMED (ENTRE 10001 et 19999) -----
export enum enumIconeEmedSvg {
    soins = 10001,
    perfusions = 10002,
    posologie = 10003,
    prolonger = 10004,
    suspendre = 10005
}


// ----- ENUM ICONES TUILES (ENTRE 20001 et 29999) -----
export enum enumIconeTuile {
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
    InstallElive = 20030,
    adminEmed = 20031,
};



export interface multicoloreSVG
{
    couleurIconeComplete?: enumCouleur,
    couleurPrincipale?: enumCouleur,
    couleurSecondaire?: enumCouleur,
    couleurTertiaire?: enumCouleur,
    couleurFond?: enumCouleur,
}

export enum enumFormeFondIconeSvg
{ 
    carre = "carre",
    rond = "rond",
    bordsArrondis = "bordsArrondis"
}

export interface OptionsIconeSVG extends OptionsIconeExterne
{
    couleurSvg?: multicoloreSVG,
    epaisseurTrait?: number,
    formeFond?: enumFormeFondIconeSvg
}

export class IconeSvg extends Icone {

    private inType!: enumIconeSvg | enumIconeEmedSvg | enumIconeTuile;
    private couleurSvg!: enumCouleur;

    public addClass(s: string) {
        let myThis: IconeSvg = this;
        s.split(' ').forEach(c => {
            myThis.svg.y.classList.add(s);
        });
    }
    public removeClass(s: string) {
        let myThis: IconeSvg = this;
        s.split(' ').forEach(c => {
            myThis.svg.y.classList.remove(s);
        });
    }
    public svg!: xSVG;
    //constructor(inType: enumIconeSvg | enumIconeEmedSvg | enumIconeTuile, taille?: enumSVGTaille, widthCust?: number, heightCust?: number) {
    constructor(inType: enumIconeSvg | enumIconeEmedSvg | enumIconeTuile, o?: OptionsIconeSVG) {
        super();

        if (o == null)
            o = {};

        let myThis: IconeSvg = this;
        myThis.inType = inType;
        myThis.svg = this.getSVG(inType, o);

        if (!!o.couleurSvg)
        {
            this.setCouleur(o.couleurSvg.couleurIconeComplete);
        }
    }
    /**
     * Permet de récupérer le xSVG correspondant à une enum;
     * @param type
     * @param o
     */
    private getSVG(type: enumIconeSvg | enumIconeEmedSvg | enumIconeTuile, o?: OptionsIconeSVG): xSVG {

        let contenu: any = new ContenusSVG("", "");

        let nomIcone: string;

        let classModeGrise: string = "";
        if (o.modeGrise == true) {
            classModeGrise = " iconeGrise";
        }

        let classCouleurSvg: string = "";
        if (o.couleurSvg?.couleurIconeComplete != undefined) {
            classCouleurSvg = " xsvg-couleur_" + o.couleurSvg.couleurIconeComplete;
        }

        let couleurCustom: string = o.couleurCustom;

        let cssCustom: string = "";
        let classCustom: string = "";
        if (couleurCustom != undefined) {
            classCustom = 'xsvg-couleur_' + couleurCustom.replace("#","");
            cssCustom = `
                .` + classCustom + ` .xsvg-elem_stroked{ stroke: ` + couleurCustom + `;}
                .` + classCustom + ` .xsvg-elem_filled{ fill: ` + couleurCustom + `; } 
            `;
            classCustom = " " + classCustom;
        }

        let classMulticolore = "";
        if (o.couleurSvg?.couleurPrincipale != null)
        {
            classMulticolore += ' xsvg-multicolore-couleurPrincipale_' + o.couleurSvg.couleurPrincipale;
        }
        if (o.couleurSvg?.couleurSecondaire != null)
        {
            classMulticolore += ' xsvg-multicolore-couleurSecondaire_' + o.couleurSvg.couleurSecondaire;
        }
        if (o.couleurSvg?.couleurTertiaire != null)
        {
            classMulticolore += ' xsvg-multicolore-couleurTertiaire_' + o.couleurSvg.couleurTertiaire;
        }

        let classCouleurFond: string = "";
        if (o.couleurSvg?.couleurFond != null)
        {
            classCouleurFond = ' xsvg-couleurFond_' + o.couleurSvg.couleurFond;
        }

        let classFormeFond: string = "";
        if (o.formeFond != undefined)
        {
            classFormeFond = " xsvg-formeFond_" + o.formeFond;
        }



        if (type >= 1 && type <= 9999) // On est dans les icones SVG
            nomIcone = enumIconeSvg[type].toString();
        else if (type >= 10001 && type <= 19999) // On est dans les icones Emed SVG
            nomIcone = enumIconeEmedSvg[type].toString();
        else if (type >= 20001 && type <= 29999) // On est dans les icones Tuile
            nomIcone = enumIconeTuile[type].toString();

        switch (type) {
            case enumIconeSvg.actualiser:
                contenu = xListeIconeSVG.actualiser();
                break;
            case enumIconeSvg.administration:
                contenu = xListeIconeSVG.administration();
                break;
            case enumIconeSvg.age:
                contenu = xListeIconeSVG.age();
                break;
            case enumIconeSvg.ajouter:
                contenu = xListeIconeSVG.ajouter();
                break;
            case enumIconeSvg.ajouter_rond:
                contenu = xListeIconeSVG.ajouter_rond();
                break;
            case enumIconeSvg.alerte:
                contenu = xListeIconeSVG.alerte();
                break;
            case enumIconeSvg.annuler_action:
                contenu = xListeIconeSVG.annuler_action();
                break;
            case enumIconeSvg.appareil_photo:
                contenu = xListeIconeSVG.appareil_photo();
                break;
            case enumIconeSvg.associer:
                contenu = xListeIconeSVG.associer();
                break;
            case enumIconeSvg.attente:
                contenu = xListeIconeSVG.attente();
                break;
            case enumIconeSvg.banette:
                contenu = xListeIconeSVG.banette();
                break;
            case enumIconeSvg.baguette_magique:
                contenu = xListeIconeSVG.baguette_magique();
                break;
            case enumIconeSvg.bdd:
                contenu = xListeIconeSVG.bdd();
                break;
            case enumIconeSvg.calendrier:
                contenu = xListeIconeSVG.calendrier();
                break;
            case enumIconeSvg.carre:
                contenu = xListeIconeSVG.carre();
                break;
            case enumIconeSvg.cercle:
                contenu = xListeIconeSVG.cercle();
                break;
            case enumIconeSvg.cercle_pointilles:
                contenu = xListeIconeSVG.cercle_pointilles();
                break;
            case enumIconeSvg.cercle_pointexclamation:
                contenu = xListeIconeSVG.cercle_pointexclamation();
                break;
            case enumIconeSvg.chaise:
                contenu = xListeIconeSVG.chaise();
                break;
            case enumIconeSvg.chevron_bas:
                contenu = xListeIconeSVG.chevron_bas();
                break;
            case enumIconeSvg.chevron_droite:
                contenu = xListeIconeSVG.chevron_droite();
                break;
            case enumIconeSvg.chevron_gauche:
                contenu = xListeIconeSVG.chevron_gauche();
                break;
            case enumIconeSvg.chevron_haut:
                contenu = xListeIconeSVG.chevron_haut();
                break;
            case enumIconeSvg.coller:
                contenu = xListeIconeSVG.coller();
                break;
            case enumIconeSvg.copier:
                contenu = xListeIconeSVG.copier();
                break;
            case enumIconeSvg.couper:
                contenu = xListeIconeSVG.couper();
                break;
            case enumIconeSvg.croix:
                contenu = xListeIconeSVG.croix();
                break;
            case enumIconeSvg.demandeavis:
                contenu = xListeIconeSVG.demandeavis();
                break;
            case enumIconeSvg.demandeavis_ajout:
                contenu = xListeIconeSVG.demandeavis_ajout();
                break;
            case enumIconeSvg.demandeavis_pleine:
                contenu = xListeIconeSVG.demandeavis_pleine();
                break;
            case enumIconeSvg.document:
                contenu = xListeIconeSVG.document();
                break;
            case enumIconeSvg.dossier:
                contenu = xListeIconeSVG.dossier();
                break;
            case enumIconeSvg.drapeau:
                contenu = xListeIconeSVG.drapeau();
                break;
            case enumIconeSvg.drapeau_medecin:
                contenu = xListeIconeSVG.drapeau_medecin();
                break;
            case enumIconeSvg.download:
                contenu = xListeIconeSVG.download();
                break;
            case enumIconeSvg.dupliquer:
                contenu = xListeIconeSVG.dupliquer();
                break;
            case enumIconeSvg.editer_colonnes:
                contenu = xListeIconeSVG.editer_colonnes();
                break;
            case enumIconeSvg.envoyer_mail:
                contenu = xListeIconeSVG.envoyer_mail();
                break;
            case enumIconeSvg.etablissement:
                contenu = xListeIconeSVG.etablissement();
                break;
            case enumIconeSvg.favori:
                contenu = xListeIconeSVG.favori();
                break;
            case enumIconeSvg.facture:
                contenu = xListeIconeSVG.facture();
                break;
            case enumIconeSvg.fiche_administrative:
                contenu = xListeIconeSVG.fiche_administrative();
                break;
            case enumIconeSvg.filtrer:
                contenu = xListeIconeSVG.filtrer();
                break;
            case enumIconeSvg.flag:
                contenu = xListeIconeSVG.flag();
                break;
            case enumIconeSvg.fleche_droite:
                contenu = xListeIconeSVG.fleche_droite();
                break;
            case enumIconeSvg.fusion:
                contenu = xListeIconeSVG.fusion();
                break;
            case enumIconeSvg.geolocalisation:
                contenu = xListeIconeSVG.geolocalisation();
                break;
            case enumIconeSvg.historique:
                contenu = xListeIconeSVG.historique();
                break;
            case enumIconeSvg.home:
                contenu = xListeIconeSVG.home();
                break;
            case enumIconeSvg.horaire:
                contenu = xListeIconeSVG.horaire();
                break;
            case enumIconeSvg.image:
                contenu = xListeIconeSVG.image();
                break;
            case enumIconeSvg.imprimer:
                contenu = xListeIconeSVG.imprimer();
                break;
            case enumIconeSvg.incident_interne_externe:
                contenu = xListeIconeSVG.incident_interne_externe();
                break;
            case enumIconeSvg.informations:
                contenu = xListeIconeSVG.informations();
                break;
            case enumIconeSvg.liste:
                contenu = xListeIconeSVG.liste();
                break;
            case enumIconeSvg.liste_simple:
                contenu = xListeIconeSVG.liste_simple();
                break;
            case enumIconeSvg.liste_choix_tous:
                contenu = xListeIconeSVG.liste_choix_tous();
                break;
            case enumIconeSvg.lit:
                contenu = xListeIconeSVG.lit();
                break;
            case enumIconeSvg.lit_retour:
                contenu = xListeIconeSVG.lit_retour();
                break;
            case enumIconeSvg.main_levee:
                contenu = xListeIconeSVG.main_levee();
                break;
            case enumIconeSvg.maison:
                contenu = xListeIconeSVG.maison();
                break;
            case enumIconeSvg.materiel:
                contenu = xListeIconeSVG.materiel();
                break;
            case enumIconeSvg.menu_burger:
                contenu = xListeIconeSVG.menu_burger();
                break;
            case enumIconeSvg.micro:
                contenu = xListeIconeSVG.micro();
                break;
            case enumIconeSvg.modifier:
                contenu = xListeIconeSVG.modifier();
                break;
            case enumIconeSvg.modules:
                contenu = xListeIconeSVG.modules();
                break;
            case enumIconeSvg.moins:
                contenu = xListeIconeSVG.moins();
                break;
            case enumIconeSvg.observation:
                contenu = xListeIconeSVG.observation();
                break;
            case enumIconeSvg.partager:
                contenu = xListeIconeSVG.partager();
                break;
            case enumIconeSvg.play:
                contenu = xListeIconeSVG.play();
                break;
            case enumIconeSvg.pdf:
                contenu = xListeIconeSVG.pdf();
                break;
            case enumIconeSvg.plus:
                contenu = xListeIconeSVG.plus();
                break;
            case enumIconeSvg.prise:
                contenu = xListeIconeSVG.prise();
                break;
            case enumIconeSvg.prises_connectees:
                contenu = xListeIconeSVG.prises_connectees();
                break;
            case enumIconeSvg.prises_deconnectees:
                contenu = xListeIconeSVG.prises_deconnectees();
                break;
            case enumIconeSvg.punaise:
                contenu = xListeIconeSVG.punaise();
                break;
            case enumIconeSvg.qr_code:
                contenu = xListeIconeSVG.qr_code();
                break;
            case enumIconeSvg.recherche:
                contenu = xListeIconeSVG.recherche();
                break;
            case enumIconeSvg.recherche_document:
                contenu = xListeIconeSVG.recherche_document();
                break;
            case enumIconeSvg.reprendre:
                contenu = xListeIconeSVG.reprendre();
                break;
            case enumIconeSvg.sauvegarder:
                contenu = xListeIconeSVG.sauvegarder();
                break;
            case enumIconeSvg.sexe_femme:
                contenu = xListeIconeSVG.sexe_femme();
                break;
            case enumIconeSvg.sexe_homme:
                contenu = xListeIconeSVG.sexe_homme();
                break;
            case enumIconeSvg.sexe_neutre:
                contenu = xListeIconeSVG.sexe_neutre();
                break;
            case enumIconeSvg.sms:
                contenu = xListeIconeSVG.sms();
                break;
            case enumIconeSvg.sollicitation:
                contenu = xListeIconeSVG.sollicitation();
                break;
            case enumIconeSvg.sollicitation_ajout:
                contenu = xListeIconeSVG.sollicitation_ajout();
                break;
            case enumIconeSvg.sollicitation_pleine:
                contenu = xListeIconeSVG.sollicitation_pleine();
                break;
            case enumIconeSvg.statistiques:
                contenu = xListeIconeSVG.statistiques();
                break;
            case enumIconeSvg.supprimer:
                contenu = xListeIconeSVG.supprimer();
                break;
            case enumIconeSvg.suspendre:
                contenu = xListeIconeSVG.suspendre();
                break;
            case enumIconeSvg.telephone:
                contenu = xListeIconeSVG.telephone();
                break;
            case enumIconeSvg.traduction:
                contenu = xListeIconeSVG.traduction();
                break;
            case enumIconeSvg.troispoints:
                contenu = xListeIconeSVG.troispoints();
                break;
            case enumIconeSvg.troispoints_horizontaux:
                contenu = xListeIconeSVG.troispoints_horizontaux();
                break;
            case enumIconeSvg.upload:
                contenu = xListeIconeSVG.upload();
                break;
            case enumIconeSvg.user:
                contenu = xListeIconeSVG.user();
                break;
            case enumIconeSvg.user_ensemble:
                contenu = xListeIconeSVG.user_ensemble();
                break;
            case enumIconeSvg.validation:
                contenu = xListeIconeSVG.validation();
                break;
            case enumIconeSvg.valider:
                contenu = xListeIconeSVG.valider();
                break;
            case enumIconeSvg.verrouille:
                contenu = xListeIconeSVG.verrouille();
                break;
            case enumIconeSvg.visualiser:
                contenu = xListeIconeSVG.visualiser();
                break;

            case enumIconeSvg.logo_elive:
                contenu = xListeIconeSVG.logo_elive();
                break;


            //----- Icones SVG Emed -----//

            case enumIconeEmedSvg.soins:
                contenu = xListeIconeSVG.emed_soins();
                break;
            case enumIconeEmedSvg.perfusions:
                contenu = xListeIconeSVG.emed_perfusions();
                break;
            case enumIconeEmedSvg.posologie:
                contenu = xListeIconeSVG.emed_posologie();
                break;
            case enumIconeEmedSvg.prolonger:
                contenu = xListeIconeSVG.emed_prolonger();
                break;
            case enumIconeEmedSvg.suspendre:
                contenu = xListeIconeSVG.emed_suspendre();
                break;

            //----- Icones Tuiles -----//
            case enumIconeTuile.AdmiEmed:
                contenu = xListeIconeSVG.admin();
                break;
            case enumIconeTuile.AideEmed:
                contenu = xListeIconeSVG.aide();
                break;
            case enumIconeTuile.ClassementDocEmed:
                contenu = xListeIconeSVG.classementDoc();
                break;
            case enumIconeTuile.DonSangEmed:
                contenu = xListeIconeSVG.donSang();
                break;
            case enumIconeTuile.DossierConsultEmed:
                contenu = xListeIconeSVG.dossierConsult();
                break;
            case enumIconeTuile.GestionBlocEmed:
                contenu = xListeIconeSVG.gestionBloc();
                break;
            case enumIconeTuile.ParametreEmed:
                contenu = xListeIconeSVG.parametres();
                break;
            case enumIconeTuile.InternetEmed:
                contenu = xListeIconeSVG.internet();
                break;
            case enumIconeTuile.ConsultationPatient:
                contenu = xListeIconeSVG.consultationPatient();
                break;
            case enumIconeTuile.ConsultationDossier:
                contenu = xListeIconeSVG.consultationDossier();
                break;
            case enumIconeTuile.TableauDeBord:
                contenu = xListeIconeSVG.tableauDeBord();
                break;
            case enumIconeTuile.RechercheRapide:
                contenu = xListeIconeSVG.rechercheRapide();
                break;
            case enumIconeTuile.Delegues:
                contenu = xListeIconeSVG.delegues();
                break;
            case enumIconeTuile.Dispensation:
                contenu = xListeIconeSVG.dispensation();
                break;
            case enumIconeTuile.SupportEmed:
                contenu = xListeIconeSVG.support();
                break;
            case enumIconeTuile.AppelContextuelPrescription:
                contenu = xListeIconeSVG.appelContextuelPrescription();
                break;
            case enumIconeTuile.AppelContextuelPrescriptionLectureSeule:
                contenu = xListeIconeSVG.appelContextuelPrescriptionLectureSeule();
                break;
            case enumIconeTuile.AppelContextuelAdmission:
                contenu = xListeIconeSVG.appelContextuelAdmission();
                break;
            case enumIconeTuile.AppelContextuelAdmissionLectureSeule:
                contenu = xListeIconeSVG.appelContextuelAdmissionLectureSeule();
                break;
            case enumIconeTuile.EmedPatientConnect:
                contenu = xListeIconeSVG.patientConnect();
                break;
            case enumIconeTuile.Recherche:
                contenu = xListeIconeSVG.recherche();
                break;
            case enumIconeTuile.RechercheMedicament:
                contenu = xListeIconeSVG.rechercheMedicament();
                break;
            case enumIconeTuile.Statistiques:
                contenu = xListeIconeSVG.statistiques();
                break;
            case enumIconeTuile.VueJournee:
                contenu = xListeIconeSVG.vueJournee();
                break;
            case enumIconeTuile.MenuTuiles:
                contenu = xListeIconeSVG.menuTuiles();
                break;
            case enumIconeTuile.SuiviPubliDocs:
                contenu = xListeIconeSVG.suiviPubliDocs();
                break;
            case enumIconeTuile.BlocCommerce:
                contenu = xListeIconeSVG.blocCommerce();
                break;
            case enumIconeTuile.ValidationPharma:
                contenu = xListeIconeSVG.ValidationPharma();
                break;
            case enumIconeTuile.GestionIncoherences:
                contenu = xListeIconeSVG.GestionIncoherences();
                break;
            case enumIconeTuile.InstallElive:
                contenu = xListeIconeSVG.InstallElive();
                break;

        }

        

        if (!o.epaisseurTrait)
            o.epaisseurTrait = contenu.epaisseur;

        if (o.epaisseurTrait < 0)
            o.epaisseurTrait = 0;

        if (o.epaisseurTrait > 10)
            o.epaisseurTrait = 10;

        return new xSVG({
            contains: contenu.contenu,
            viewBoxContains: contenu.viewBoxContains,
            size: o.taille,
            heightCustom: o.heightCust,
            widthCustom: o.widthCust,
            cssContains: cssCustom,
            class: "iconeSvg iconeSvg_" + nomIcone + " xsvg-stroke_" + o.epaisseurTrait + classModeGrise + classCouleurSvg + classCustom + classMulticolore + classCouleurFond + classFormeFond,
        })
    }

    public getClasse(): string {
        let myThis: IconeSvg = this;

        return myThis.svg.getClass();
    }
    public get y(): SVGElement {
        let myThis: IconeSvg = this;
        return myThis.svg.y;
    }
   

    public getValeurIcone(): enumIconeSvg | enumIconeEmedSvg | enumIconeTuile
    {
        let myThis: IconeSvg = this;
        return myThis.inType;
    }

    public getTypeIcone():string
    {
        let myThis: IconeSvg = this;
        if (myThis.inType >= 20001 || myThis.inType <= 29999)
            return "iconeTuileSvg";
        else if (myThis.inType >= 10001 || myThis.inType <= 19999)
            return "iconeEmedSvg";
        else
            return "iconeSvg";
    }

    public setCouleur(couleur: enumCouleur): Icone
    {

        if (!!this.couleurSvg)
            this.y.classList.remove("xsvg-couleur_" + this.couleurSvg);

        this.couleurSvg = couleur;
        if (!!this.couleurSvg)
            this.y.classList.add("xsvg-couleur_" + this.couleurSvg);

        return this;

    }

}

// -------------- FIN ICONES SVG ------------------


// -------------- ICONES TUILES ------------------


export class IconeTuile extends Icone {
    private inType: enumIconeTuile;
    public svg: xSVG;

    constructor(inType: enumIconeTuile, o?: OptionsIconeSVG) {
        super();

        if (o == null)
            o = {};

        let myThis: IconeTuile = this;
        myThis.inType = inType
        myThis.svg = this.getSVG(inType, o);
    }
    /**
     * Permet de récuppérer le xSVG correspondant a une enum;
     * @param type
     * @param taille
     * @param width
     * @param height
     */
    private getSVG(type: enumIconeTuile, o?: OptionsIconeSVG): xSVG {

        let contenu: any = new ContenusSVG("", "");

        switch (type) {
            case enumIconeTuile.adminEmed:
                contenu = xListeIconeSVG.admin();
                break;
        }

        if (o.taille == undefined) o.taille = tailleIcone.L;



        let classModeGrise: string = "";
        if (o.modeGrise == true) {
            classModeGrise = " iconeGrise";
        }

        let classCouleurSvg: string = "";
        if (o.couleurSvg?.couleurIconeComplete != undefined) {
            classCouleurSvg = " couleurSvg_" + o.couleurSvg.couleurIconeComplete;
        }

        let classMulticolore = "";
        if (o.couleurSvg?.couleurPrincipale != null)
        {
            classMulticolore += ' xsvg-multicolore-couleurPrincipale_' + o.couleurSvg.couleurPrincipale;
        }
        if (o.couleurSvg?.couleurSecondaire != null)
        {
            classMulticolore += ' xsvg-multicolore-couleurSecondaire_' + o.couleurSvg.couleurSecondaire;
        }
        if (o.couleurSvg?.couleurTertiaire != null)
        {
            classMulticolore += ' xsvg-multicolore-couleurTertiaire_' + o.couleurSvg.couleurTertiaire;
        }

        let classCouleurFond: string = "";
        if (o.couleurSvg?.couleurFond != null)
        {
            classCouleurFond = ' xsvg-couleurFond_' + o.couleurSvg.couleurFond;
        }

        let classFormeFond: string = "";
        if (o.formeFond != undefined)
        {
            classFormeFond = " xsvg-formeFond_" + o.formeFond;
        }

        return new xSVG({
            contains: contenu.contenu,
            viewBoxContains: contenu.viewBoxContains,
            size: o.taille,
            heightCustom: o.heightCust,
            widthCustom: o.widthCust,
            class: "iconeTuile iconeTuile_" + enumIconeTuile[type].toString() + " xsvg-stroke_" + contenu.epaisseur + classModeGrise + classCouleurSvg + classMulticolore + classCouleurFond + classFormeFond,
        })
    }

    public getClasse(): string {
        let myThis: IconeTuile = this;

        return myThis.svg.getClass();
    }

    getValeurIcone(): enumIconeTuile
    {
        let myThis: IconeTuile = this;
        return myThis.inType;
    }

    getTypeIcone(): string
    {
        let myThis: IconeTuile = this;
        return "iconeTuile";
    }

    public addClass(s: string) {
        let myThis: IconeTuile = this;
        s.split(' ').forEach(c => {
            myThis.svg.y.classList.add(s);
        });
    }
    public removeClass(s: string) {
        let myThis: IconeTuile = this;
        s.split(' ').forEach(c => {
            myThis.svg.y.classList.remove(s);
        });
    }
    public get y(): SVGElement {
        let myThis: IconeTuile = this;
        return myThis.svg.y;

    }

}

// -------------- FIN ICONES TUILES ------------------