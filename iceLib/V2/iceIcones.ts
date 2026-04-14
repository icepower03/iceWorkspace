

import { iXElement, enumCouleur } from './iceBase';
import { iceDiv } from './xcontrols/iceDiv';
import { iceSVG } from './xcontrols/iceSVG';
import { iceImg } from './xcontrols/iceImg';
import { ContenusSVG, iceListeIconeSVG } from './iceListeIconeSVG';

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

    //ice2Checkbox
    ice2CheckBox_checked_defaut,
    ice2CheckBox_checked_defaut_disabled,

    //ice2ListChoix
    fleche_select,
    ice2ListChoix_defaut,
    ice2ListChoix_tous,

    //ice2RouteContainer
    ice2RouteContainer_FavoriOff,
    ice2RouteContainer_FavoriOn,
    ice2RouteContainer_Fermer,
    ice2RouteContainer_Filariane,
    ice2RouteContainer_Home,
    ice2RouteContainer_MenuPerso,
    ice2RouteContainer_Partager,
    ice2RouteContainer_Refresh,
    ice2RouteContainer_Remonter,
    ice2RouteContainer_Retour,
    ice2RouteContainer_SwitchMenuOff,
    ice2RouteContainer_SwitchMenuOn,

    //ice2Tableau
    ice2Tableau_config_colonnes,
    ice2Tableau_FlecheBas,
    ice2Tableau_FlecheBottom,
    ice2Tableau_FlecheHaut,
    ice2Tableau_FlecheTop,

    //ice2Volet
    ice2Volet_bas,
    ice2Volet_droite,
    ice2Volet_gauche,
    ice2Volet_haut,
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
    private elem!: iceDiv;


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
                myThis.elem = new iceDiv({ class: "iconeSeuleP12 " + myThis.getClasse() });
                break;
            case 'miniP12':
                myThis.elem = new iceDiv({ class: "iconeSeuleMiniP12 " + myThis.getClasse() });
                break;
            case 'externe':
                myThis.elem = new iceDiv({ class: "iconeSeuleExterne " + myThis.getClasse() });
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
    private elem: iceDiv;
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
      this.elem= new iceDiv({ class: this.classEtat });

        if (this.abreviationTypeExamen != null) {
            this.elem.asHolder.append(new iceDiv({ class: "abreviation icon_tags", textVariable: this.abreviationTypeExamen }));
        }
        else if (this.urlImgTypeExamen != null) {
            this.elem.asHolder.append(
                new iceImg({
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

// ----- ENUM ICONES ZEUS (ENTRE 10001 et 19999) -----
export enum enumIconeZeusSvg {
    soins = 10001,
    perfusions = 10002,
    posologie = 10003,
    prolonger = 10004,
    suspendre = 10005
}


// ----- ENUM ICONES TUILES (ENTRE 20001 et 29999) -----
export enum enumIconeTuile {
    AdmiZeus = 20001,
    AideZeus = 20002,
    ClassementDocZeus = 20003,
    DonSangZeus = 20004,
    DossierConsultZeus = 20005,
    GestionBlocZeus = 20006,
    ParametreZeus = 20007,
    InternetZeus = 20008,
    ConsultationPatient = 20009,
    ConsultationDossier = 20010,
    TableauDeBord = 20011,
    RechercheRapide = 20012,
    Delegues = 20013,
    Dispensation = 20014,
    SupportZeus = 20015,
    AppelContextuelPrescription = 20016,
    AppelContextuelPrescriptionLectureSeule = 20017,
    AppelContextuelAdmission = 20018,
    AppelContextuelAdmissionLectureSeule = 20019,
    ZeusPatientConnect = 20020,
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
    adminZeus = 20031,
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

    private inType!: enumIconeSvg | enumIconeZeusSvg | enumIconeTuile;
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
    public svg!: iceSVG;
    //constructor(inType: enumIconeSvg | enumIconeZeusSvg | enumIconeTuile, taille?: enumSVGTaille, widthCust?: number, heightCust?: number) {
    constructor(inType: enumIconeSvg | enumIconeZeusSvg | enumIconeTuile, o?: OptionsIconeSVG) {
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
     * Permet de récupérer le iceSVG correspondant à une enum;
     * @param type
     * @param o
     */
    private getSVG(type: enumIconeSvg | enumIconeZeusSvg | enumIconeTuile, o?: OptionsIconeSVG): iceSVG {

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
        else if (type >= 10001 && type <= 19999) // On est dans les icones Zeus SVG
            nomIcone = enumIconeZeusSvg[type].toString();
        else if (type >= 20001 && type <= 29999) // On est dans les icones Tuile
            nomIcone = enumIconeTuile[type].toString();

        switch (type) {
            case enumIconeSvg.actualiser:
                contenu = iceListeIconeSVG.actualiser();
                break;
            case enumIconeSvg.administration:
                contenu = iceListeIconeSVG.administration();
                break;
            case enumIconeSvg.age:
                contenu = iceListeIconeSVG.age();
                break;
            case enumIconeSvg.ajouter:
                contenu = iceListeIconeSVG.ajouter();
                break;
            case enumIconeSvg.ajouter_rond:
                contenu = iceListeIconeSVG.ajouter_rond();
                break;
            case enumIconeSvg.alerte:
                contenu = iceListeIconeSVG.alerte();
                break;
            case enumIconeSvg.annuler_action:
                contenu = iceListeIconeSVG.annuler_action();
                break;
            case enumIconeSvg.appareil_photo:
                contenu = iceListeIconeSVG.appareil_photo();
                break;
            case enumIconeSvg.associer:
                contenu = iceListeIconeSVG.associer();
                break;
            case enumIconeSvg.attente:
                contenu = iceListeIconeSVG.attente();
                break;
            case enumIconeSvg.banette:
                contenu = iceListeIconeSVG.banette();
                break;
            case enumIconeSvg.baguette_magique:
                contenu = iceListeIconeSVG.baguette_magique();
                break;
            case enumIconeSvg.bdd:
                contenu = iceListeIconeSVG.bdd();
                break;
            case enumIconeSvg.calendrier:
                contenu = iceListeIconeSVG.calendrier();
                break;
            case enumIconeSvg.carre:
                contenu = iceListeIconeSVG.carre();
                break;
            case enumIconeSvg.cercle:
                contenu = iceListeIconeSVG.cercle();
                break;
            case enumIconeSvg.cercle_pointilles:
                contenu = iceListeIconeSVG.cercle_pointilles();
                break;
            case enumIconeSvg.cercle_pointexclamation:
                contenu = iceListeIconeSVG.cercle_pointexclamation();
                break;
            case enumIconeSvg.chaise:
                contenu = iceListeIconeSVG.chaise();
                break;
            case enumIconeSvg.chevron_bas:
                contenu = iceListeIconeSVG.chevron_bas();
                break;
            case enumIconeSvg.chevron_droite:
                contenu = iceListeIconeSVG.chevron_droite();
                break;
            case enumIconeSvg.chevron_gauche:
                contenu = iceListeIconeSVG.chevron_gauche();
                break;
            case enumIconeSvg.chevron_haut:
                contenu = iceListeIconeSVG.chevron_haut();
                break;
            case enumIconeSvg.coller:
                contenu = iceListeIconeSVG.coller();
                break;
            case enumIconeSvg.copier:
                contenu = iceListeIconeSVG.copier();
                break;
            case enumIconeSvg.couper:
                contenu = iceListeIconeSVG.couper();
                break;
            case enumIconeSvg.croix:
                contenu = iceListeIconeSVG.croix();
                break;
            case enumIconeSvg.demandeavis:
                contenu = iceListeIconeSVG.demandeavis();
                break;
            case enumIconeSvg.demandeavis_ajout:
                contenu = iceListeIconeSVG.demandeavis_ajout();
                break;
            case enumIconeSvg.demandeavis_pleine:
                contenu = iceListeIconeSVG.demandeavis_pleine();
                break;
            case enumIconeSvg.document:
                contenu = iceListeIconeSVG.document();
                break;
            case enumIconeSvg.dossier:
                contenu = iceListeIconeSVG.dossier();
                break;
            case enumIconeSvg.drapeau:
                contenu = iceListeIconeSVG.drapeau();
                break;
            case enumIconeSvg.drapeau_medecin:
                contenu = iceListeIconeSVG.drapeau_medecin();
                break;
            case enumIconeSvg.download:
                contenu = iceListeIconeSVG.download();
                break;
            case enumIconeSvg.dupliquer:
                contenu = iceListeIconeSVG.dupliquer();
                break;
            case enumIconeSvg.editer_colonnes:
                contenu = iceListeIconeSVG.editer_colonnes();
                break;
            case enumIconeSvg.envoyer_mail:
                contenu = iceListeIconeSVG.envoyer_mail();
                break;
            case enumIconeSvg.etablissement:
                contenu = iceListeIconeSVG.etablissement();
                break;
            case enumIconeSvg.favori:
                contenu = iceListeIconeSVG.favori();
                break;
            case enumIconeSvg.facture:
                contenu = iceListeIconeSVG.facture();
                break;
            case enumIconeSvg.fiche_administrative:
                contenu = iceListeIconeSVG.fiche_administrative();
                break;
            case enumIconeSvg.filtrer:
                contenu = iceListeIconeSVG.filtrer();
                break;
            case enumIconeSvg.flag:
                contenu = iceListeIconeSVG.flag();
                break;
            case enumIconeSvg.fleche_droite:
                contenu = iceListeIconeSVG.fleche_droite();
                break;
            case enumIconeSvg.fusion:
                contenu = iceListeIconeSVG.fusion();
                break;
            case enumIconeSvg.geolocalisation:
                contenu = iceListeIconeSVG.geolocalisation();
                break;
            case enumIconeSvg.historique:
                contenu = iceListeIconeSVG.historique();
                break;
            case enumIconeSvg.home:
                contenu = iceListeIconeSVG.home();
                break;
            case enumIconeSvg.horaire:
                contenu = iceListeIconeSVG.horaire();
                break;
            case enumIconeSvg.image:
                contenu = iceListeIconeSVG.image();
                break;
            case enumIconeSvg.imprimer:
                contenu = iceListeIconeSVG.imprimer();
                break;
            case enumIconeSvg.incident_interne_externe:
                contenu = iceListeIconeSVG.incident_interne_externe();
                break;
            case enumIconeSvg.informations:
                contenu = iceListeIconeSVG.informations();
                break;
            case enumIconeSvg.liste:
                contenu = iceListeIconeSVG.liste();
                break;
            case enumIconeSvg.liste_simple:
                contenu = iceListeIconeSVG.liste_simple();
                break;
            case enumIconeSvg.liste_choix_tous:
                contenu = iceListeIconeSVG.liste_choix_tous();
                break;
            case enumIconeSvg.lit:
                contenu = iceListeIconeSVG.lit();
                break;
            case enumIconeSvg.lit_retour:
                contenu = iceListeIconeSVG.lit_retour();
                break;
            case enumIconeSvg.main_levee:
                contenu = iceListeIconeSVG.main_levee();
                break;
            case enumIconeSvg.maison:
                contenu = iceListeIconeSVG.maison();
                break;
            case enumIconeSvg.materiel:
                contenu = iceListeIconeSVG.materiel();
                break;
            case enumIconeSvg.menu_burger:
                contenu = iceListeIconeSVG.menu_burger();
                break;
            case enumIconeSvg.micro:
                contenu = iceListeIconeSVG.micro();
                break;
            case enumIconeSvg.modifier:
                contenu = iceListeIconeSVG.modifier();
                break;
            case enumIconeSvg.modules:
                contenu = iceListeIconeSVG.modules();
                break;
            case enumIconeSvg.moins:
                contenu = iceListeIconeSVG.moins();
                break;
            case enumIconeSvg.observation:
                contenu = iceListeIconeSVG.observation();
                break;
            case enumIconeSvg.partager:
                contenu = iceListeIconeSVG.partager();
                break;
            case enumIconeSvg.play:
                contenu = iceListeIconeSVG.play();
                break;
            case enumIconeSvg.pdf:
                contenu = iceListeIconeSVG.pdf();
                break;
            case enumIconeSvg.plus:
                contenu = iceListeIconeSVG.plus();
                break;
            case enumIconeSvg.prise:
                contenu = iceListeIconeSVG.prise();
                break;
            case enumIconeSvg.prises_connectees:
                contenu = iceListeIconeSVG.prises_connectees();
                break;
            case enumIconeSvg.prises_deconnectees:
                contenu = iceListeIconeSVG.prises_deconnectees();
                break;
            case enumIconeSvg.punaise:
                contenu = iceListeIconeSVG.punaise();
                break;
            case enumIconeSvg.qr_code:
                contenu = iceListeIconeSVG.qr_code();
                break;
            case enumIconeSvg.recherche:
                contenu = iceListeIconeSVG.recherche();
                break;
            case enumIconeSvg.recherche_document:
                contenu = iceListeIconeSVG.recherche_document();
                break;
            case enumIconeSvg.reprendre:
                contenu = iceListeIconeSVG.reprendre();
                break;
            case enumIconeSvg.sauvegarder:
                contenu = iceListeIconeSVG.sauvegarder();
                break;
            case enumIconeSvg.sexe_femme:
                contenu = iceListeIconeSVG.sexe_femme();
                break;
            case enumIconeSvg.sexe_homme:
                contenu = iceListeIconeSVG.sexe_homme();
                break;
            case enumIconeSvg.sexe_neutre:
                contenu = iceListeIconeSVG.sexe_neutre();
                break;
            case enumIconeSvg.sms:
                contenu = iceListeIconeSVG.sms();
                break;
            case enumIconeSvg.sollicitation:
                contenu = iceListeIconeSVG.sollicitation();
                break;
            case enumIconeSvg.sollicitation_ajout:
                contenu = iceListeIconeSVG.sollicitation_ajout();
                break;
            case enumIconeSvg.sollicitation_pleine:
                contenu = iceListeIconeSVG.sollicitation_pleine();
                break;
            case enumIconeSvg.statistiques:
                contenu = iceListeIconeSVG.statistiques();
                break;
            case enumIconeSvg.supprimer:
                contenu = iceListeIconeSVG.supprimer();
                break;
            case enumIconeSvg.suspendre:
                contenu = iceListeIconeSVG.suspendre();
                break;
            case enumIconeSvg.telephone:
                contenu = iceListeIconeSVG.telephone();
                break;
            case enumIconeSvg.traduction:
                contenu = iceListeIconeSVG.traduction();
                break;
            case enumIconeSvg.troispoints:
                contenu = iceListeIconeSVG.troispoints();
                break;
            case enumIconeSvg.troispoints_horizontaux:
                contenu = iceListeIconeSVG.troispoints_horizontaux();
                break;
            case enumIconeSvg.upload:
                contenu = iceListeIconeSVG.upload();
                break;
            case enumIconeSvg.user:
                contenu = iceListeIconeSVG.user();
                break;
            case enumIconeSvg.user_ensemble:
                contenu = iceListeIconeSVG.user_ensemble();
                break;
            case enumIconeSvg.validation:
                contenu = iceListeIconeSVG.validation();
                break;
            case enumIconeSvg.valider:
                contenu = iceListeIconeSVG.valider();
                break;
            case enumIconeSvg.verrouille:
                contenu = iceListeIconeSVG.verrouille();
                break;
            case enumIconeSvg.visualiser:
                contenu = iceListeIconeSVG.visualiser();
                break;

            case enumIconeSvg.logo_elive:
                contenu = iceListeIconeSVG.logo_elive();
                break;


            //----- Icones SVG Zeus -----//

            case enumIconeZeusSvg.soins:
                contenu = iceListeIconeSVG.zeus_soins();
                break;
            case enumIconeZeusSvg.perfusions:
                contenu = iceListeIconeSVG.zeus_perfusions();
                break;
            case enumIconeZeusSvg.posologie:
                contenu = iceListeIconeSVG.zeus_posologie();
                break;
            case enumIconeZeusSvg.prolonger:
                contenu = iceListeIconeSVG.zeus_prolonger();
                break;
            case enumIconeZeusSvg.suspendre:
                contenu = iceListeIconeSVG.zeus_suspendre();
                break;

            //----- Icones Tuiles -----//
            case enumIconeTuile.AdmiZeus:
                contenu = iceListeIconeSVG.admin();
                break;
            case enumIconeTuile.AideZeus:
                contenu = iceListeIconeSVG.aide();
                break;
            case enumIconeTuile.ClassementDocZeus:
                contenu = iceListeIconeSVG.classementDoc();
                break;
            case enumIconeTuile.DonSangZeus:
                contenu = iceListeIconeSVG.donSang();
                break;
            case enumIconeTuile.DossierConsultZeus:
                contenu = iceListeIconeSVG.dossierConsult();
                break;
            case enumIconeTuile.GestionBlocZeus:
                contenu = iceListeIconeSVG.gestionBloc();
                break;
            case enumIconeTuile.ParametreZeus:
                contenu = iceListeIconeSVG.parametres();
                break;
            case enumIconeTuile.InternetZeus:
                contenu = iceListeIconeSVG.internet();
                break;
            case enumIconeTuile.ConsultationPatient:
                contenu = iceListeIconeSVG.consultationPatient();
                break;
            case enumIconeTuile.ConsultationDossier:
                contenu = iceListeIconeSVG.consultationDossier();
                break;
            case enumIconeTuile.TableauDeBord:
                contenu = iceListeIconeSVG.tableauDeBord();
                break;
            case enumIconeTuile.RechercheRapide:
                contenu = iceListeIconeSVG.rechercheRapide();
                break;
            case enumIconeTuile.Delegues:
                contenu = iceListeIconeSVG.delegues();
                break;
            case enumIconeTuile.Dispensation:
                contenu = iceListeIconeSVG.dispensation();
                break;
            case enumIconeTuile.SupportZeus:
                contenu = iceListeIconeSVG.support();
                break;
            case enumIconeTuile.AppelContextuelPrescription:
                contenu = iceListeIconeSVG.appelContextuelPrescription();
                break;
            case enumIconeTuile.AppelContextuelPrescriptionLectureSeule:
                contenu = iceListeIconeSVG.appelContextuelPrescriptionLectureSeule();
                break;
            case enumIconeTuile.AppelContextuelAdmission:
                contenu = iceListeIconeSVG.appelContextuelAdmission();
                break;
            case enumIconeTuile.AppelContextuelAdmissionLectureSeule:
                contenu = iceListeIconeSVG.appelContextuelAdmissionLectureSeule();
                break;
            case enumIconeTuile.ZeusPatientConnect:
                contenu = iceListeIconeSVG.patientConnect();
                break;
            case enumIconeTuile.Recherche:
                contenu = iceListeIconeSVG.recherche();
                break;
            case enumIconeTuile.RechercheMedicament:
                contenu = iceListeIconeSVG.rechercheMedicament();
                break;
            case enumIconeTuile.Statistiques:
                contenu = iceListeIconeSVG.statistiques();
                break;
            case enumIconeTuile.VueJournee:
                contenu = iceListeIconeSVG.vueJournee();
                break;
            case enumIconeTuile.MenuTuiles:
                contenu = iceListeIconeSVG.menuTuiles();
                break;
            case enumIconeTuile.SuiviPubliDocs:
                contenu = iceListeIconeSVG.suiviPubliDocs();
                break;
            case enumIconeTuile.BlocCommerce:
                contenu = iceListeIconeSVG.blocCommerce();
                break;
            case enumIconeTuile.ValidationPharma:
                contenu = iceListeIconeSVG.ValidationPharma();
                break;
            case enumIconeTuile.GestionIncoherences:
                contenu = iceListeIconeSVG.GestionIncoherences();
                break;
            case enumIconeTuile.InstallElive:
                contenu = iceListeIconeSVG.InstallElive();
                break;

        }

        

        if (!o.epaisseurTrait)
            o.epaisseurTrait = contenu.epaisseur;

        if (o.epaisseurTrait < 0)
            o.epaisseurTrait = 0;

        if (o.epaisseurTrait > 10)
            o.epaisseurTrait = 10;

        return new iceSVG({
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
   

    public getValeurIcone(): enumIconeSvg | enumIconeZeusSvg | enumIconeTuile
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
            return "iconeZeusSvg";
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
    public svg: iceSVG;

    constructor(inType: enumIconeTuile, o?: OptionsIconeSVG) {
        super();

        if (o == null)
            o = {};

        let myThis: IconeTuile = this;
        myThis.inType = inType
        myThis.svg = this.getSVG(inType, o);
    }
    /**
     * Permet de récuppérer le iceSVG correspondant a une enum;
     * @param type
     * @param taille
     * @param width
     * @param height
     */
    private getSVG(type: enumIconeTuile, o?: OptionsIconeSVG): iceSVG {

        let contenu: any = new ContenusSVG("", "");

        switch (type) {
            case enumIconeTuile.adminZeus:
                contenu = iceListeIconeSVG.admin();
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

        return new iceSVG({
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