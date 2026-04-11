enum enumIconeAction
{
    ajouter = enumIconeCs3i.action_ajouter,
    valider = enumIconeCs3i.action_valider,
    valider_cercle = enumIconeCs3i.action_valider_cercle,
    annuler = enumIconeCs3i.action_annuler,
    annuler_cercle = enumIconeCs3i.action_annuler_cercle,
    supprimer = enumIconeCs3i.action_supprimer,
    enregistrer = enumIconeCs3i.action_enregistrer,
    imprimer = enumIconeCs3i.action_imprimer,
    visualiser = enumIconeCs3i.action_apercu,
    verrouiller = enumIconeCs3i.action_verrouiller,
    deverouiller = enumIconeCs3i.action_deverrouiller,
    modifier = enumIconeCs3i.action_modifier,
    historique = enumIconeCs3i.action_historique,
    rechercher = enumIconeCs3i.action_rechercher,
    erreur = enumIconeCs3i.action_erreur,
    suspendre = enumIconeCs3i.etat_suspendu,
    importer = enumIconeCs3i.action_importer,
    alerte = enumIconeCs3i.alerte_rouge,
    rafraichir = enumIconeCs3i.action_rafraichir,
    parametres = enumIconeCs3i.admin_parametres_simple,
    masquer = enumIconeCs3i.action_masquer,
    info = enumIconeCs3i.action_info,
    calendrier = enumIconeCs3i.action_planifier,
    lister = enumIconeCs3i.liste_simple,
    inconnu = enumIconeCs3i.aide_aide,
    arreter = enumIconeCs3i.action_arret,
    sablier = enumIconeCs3i.horloge_attente,
    sablier_blanc = enumIconeCs3i.horloge_attente_blanc,
}

enum enumPositionIconeAction {HautDroite, BasDroite}

interface OptionsIconeAvecAction
{
    iconePrincipale: IconeV2 | IconeSvg;
    iconeSecondaire: enumIconeAction;
    positionIconeAction?: enumPositionIconeAction,
    tailleIcone?: tailleIcone;
    heightCust?: number;
    widthCust?: number;
    optionsAffichage?: optionsAffichage;
}

class xIconeAvecAction implements iXElement
{
    private grid: xxGrid;
    private iconePrincipale: IconeV2 | IconeSvg;
    private iconeSecondaire: IconeCs3i;


    constructor(options: OptionsIconeAvecAction)
    {

        let myThis: xIconeAvecAction = this;

        if (!options.tailleIcone) { options.tailleIcone = tailleIcone.M; }
        if (options.positionIconeAction == undefined) { options.positionIconeAction = enumPositionIconeAction.BasDroite; }

        let classeTaille: string = " taille_" + tailleIcone[options.tailleIcone];
        let classePosition: string = " positionIconeAction_" + enumPositionIconeAction[options.positionIconeAction];

        myThis.grid = new xxGrid({
            class: "xIconeAvecAction" + classePosition + classeTaille,
            colonnes: ["12fr 7fr 5fr"],
            lignes: ["5fr 7fr 7fr 5fr"],
            gridGap: "0",
            fullWidth: false,
            fullHeight: false,
        });

        myThis.iconePrincipale = options.iconePrincipale;
        myThis.iconeSecondaire = new IconeCs3i(options.iconeSecondaire);

        myThis.grid.append([
            new xxGridItem({
                content: myThis.iconePrincipale,
                colStart: 1,
                nbCols: 2,
                rowStart: options.positionIconeAction == enumPositionIconeAction.BasDroite ? 1 : 2,
                nbRows: 3,
                class: "gi_xIconeAvecAction iconePrincipale",
            }),
            new xxGridItem({
                content: myThis.iconeSecondaire,
                colStart: 2,
                nbCols: 2,
                rowStart: options.positionIconeAction == enumPositionIconeAction.BasDroite ? 3 : 1,
                nbRows: 2,
                class : "gi_xIconeAvecAction iconeSecondaire",
            }),
        ]);
    }

    public addClass(s: string) {
        return this.grid.addClass(s);
    }
    public removeClass(s: string) {
        return this.grid.removeClass(s);
    }

    public getClasse(): string
    {
        let myThis = this;
        return myThis.getClasse();
    }
    getTypeIcone(): string
    {
        return null;
    }
    getValeurIcone(): Icone
    {
        let myThis = this;

        return myThis.iconePrincipale;
    }

    get y(): HTMLElement {
        let myThis: xIconeAvecAction = this;
        return myThis.grid.y;
    }
}

