// @ts-nocheck
import { iXElement, iXElementHolder, Dictionnaire } from '../xBase';
import { BindableObject } from './BindableObject';
import { xDiv } from './xDiv';
import { xxWrapPanel, enumAlignementVerticalWrapPanel, enumAlignementHorizontalWrapPanel } from './xxWrapPanel';
import { enumAlignementContenu } from './xxGrid';
import { xxStackPanel } from './xxStackPanel';
import { xxLabel } from './xxLabel';
import { xxBouton, enumTailleBouton, enumStyleBouton } from './xxBouton';
import { xxInputNumerique } from './xxInputNumerique';
import { xxAutoComplete } from './xxAutoComplete';
import { xxToolTip } from './xxToolTip';
import { Icone, IconeP12, enumIconeP12, enumIconeSvg, IconeSvg, tailleIcone } from '../xIcones';
import { xxContainerEvent } from './xxContainerEvent';
import { xxGrid, xxGridItem } from './xxGrid';
import { xInputText } from './xInput';
import { xxCheckBox, enumTypeCheckbox } from './xxCheckBox';
import { xxDialog, enumTypeAlerte, enumDialogTypeBouton } from './xxDialog';
import { xxDockPanelDeprecated, DockPosition } from './xxDockPanel';
import { xxListWrapper } from './xxListWrapper';

interface optionsxxRouteContainer {
    
    desktopMenuEnabled?: boolean;

    isFavori: (cheminPhysique: string) => Promise<boolean>,
    toggleFavori: (cheminPhysique: string, ajout: boolean) => void,

    isMenuFixe?: () => Promise<boolean>,
    toggleMenuFixe?: (isFixed: boolean) => void,

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
    renderRecherche?: (zoneRecherche: iXElementHolder, params: (string | number)[], dataCacher: Dictionnaire<(string | number|boolean)>) => Promise<void>;
    selecteurRoutes?: (params: (string | number)[], dataCacher: Dictionnaire<(string | number|boolean)>) => Promise<string[]>;

};

export class xxRouteContainer implements iXElement
{
    public static ROOTBASE = '';

    // --------- //
    // Attributs //
    // --------- //
    private HaveNotSaveData: boolean = false;


    private SansZoneDeRecherche: boolean = false;

    // Favori //
    private isFavori: (cheminPhysique: string) => Promise<boolean>;
    private toggleFavori: (cheminPhysique: string, ajout: boolean) => void;

    // Mode Menu //
    private isMenuFixe: () => Promise<boolean>;
    private toggleMenuFixe: (isFixed: boolean) => void;
    private etatFixed: boolean;


    private gestionBackBrowser: boolean;
    private dernieresPages: string[];
    private modeFileArianeClavier: boolean = false;
  
    public createInternalUrl: (str: string) => string;
    public createExternalUrl: (str: string) => string;
    public createMenuCustom: (ici: xxStackPanel) => void;

    public verbose(s: string, object: any = undefined)
    {
        let mythis: xxRouteContainer = this;
        if (mythis.verboseMode)
        {
            if (object != undefined) { console.log(s, object); }
            else
            {
                console.log(s);
            }
        }
    }

    private verboseMode: boolean;
    private filtretexte: BindableObject<string>;

    private arbreRoutes: Arbre<string>;

    private dicoRoutesTheoriques: Dictionnaire<EndPointFn> = {};
    private dicoEcransOuverts: Dictionnaire<iXElementHolder> = {};
    private dicoLibelleParams: Dictionnaire<string> = {};
    private dicoDataParams: Dictionnaire<Dictionnaire<(string | number | boolean)>> = {}; // Pour pouvoir donner des parametres ou donner cacher a la page, Comme avec la methode POST

    private routeActivePhysique: string;

    private selectionEnCours: boolean = false;

    private activationBandeauPerso: boolean = false;
    private activationMenuList: boolean = true;


    // Xelement //
    private elemPrincipal: xxWrapPanel;

    private elemBoutonMenu: xxWrapPanel;
    private elemMenu: xxStackPanel;
    private elemMenuNav: xxStackPanel
    private elemMenuList: xxStackPanel;
    private elemMenuCustom: xxStackPanel;
    private elemMenuTools: xxWrapPanel;
    private elemZoneContenu: xDiv;
    private elemMenuSecondaire: xDiv
    private elemZoneFermerMenu: xxContainerEvent

    private elemFilAriane: xxWrapPanel;

    // --------- //
    // propriété //
    // --------- //
    public get y() { return this.elemPrincipal.y; }

    public get DicoLibelleParams(): Dictionnaire<string> {
        return this.dicoLibelleParams;
    }

    public getCurrentUrl(): string {
        let mythis: xxRouteContainer = this;
        return mythis.createInternalUrl(encodeURIComponent(mythis.routeActivePhysique));
      
    }

    // Activation Menu List
    public set ActivationMenuList(val: boolean) {
        let myThis: xxRouteContainer = this;
        if (val == undefined) {
            val = true;
        }

        myThis.activationMenuList = val;
        myThis.refreshAfficheMenuList();

    }
    public get ActivationMenuList(): boolean {
        let myThis: xxRouteContainer = this;
        if (myThis.activationMenuList == undefined) {
            myThis.activationMenuList = true;
        }
        return myThis.activationMenuList;
    }

    // Activation Bandeau perso
    public set ActivationBandeauPerso(val: boolean) {
        let myThis: xxRouteContainer = this;
        if (val == undefined) {
            val = true;
        }

        myThis.activationBandeauPerso = val;
        myThis.refreshAfficheBandeauPerso();

    }
    public get ActivationBandeauPerso(): boolean {
        let myThis: xxRouteContainer = this;
        if (myThis.activationBandeauPerso == undefined) {
            myThis.activationBandeauPerso = true;
        }
        return myThis.activationBandeauPerso;
    }

    private getBackPage(): string {
        let mythis: xxRouteContainer = this;
        let retour = '';



        if (mythis.dernieresPages.length > 1) {
            //j'enleve la page active
            mythis.dernieresPages.pop();
            //et je fournis la page precedente
            retour = mythis.dernieresPages.pop();
        }

        return retour;

    }

    private getLastPage(): string {
        let mythis: xxRouteContainer = this;
        let retour = '';

        if (mythis.dernieresPages.length > 0) {
            //et je fournis la page precedente
            retour = mythis.dernieresPages.pop();
        }

        return retour;

    }

    public getCurrentPage(): string {
        let mythis: xxRouteContainer = this;
        let retour = '';

        if (mythis.dernieresPages.length > 0) {
            //et je fournis la page precedente
            retour = mythis.dernieresPages[mythis.dernieresPages.length - 1];
        }

        return retour;
    }

    // ----------- //
    // constructor //
    // ----------- //
    constructor(o: optionsxxRouteContainer) {

        let mythis: xxRouteContainer = this;
        // -- init -- //
        mythis.filtretexte = new BindableObject<string>();

        if (o.SansZoneDeRecherche != null)
            mythis.SansZoneDeRecherche = o.SansZoneDeRecherche;

        mythis.gestionBackBrowser = true;
        if (o.gestionBackBrowser === false) {
            mythis.gestionBackBrowser = false;
        }

        mythis.verboseMode = false;
        if (o.verboseMode === true) {
            mythis.verboseMode = true;
        }
        mythis.createInternalUrl = o.createInternalUrl;
        mythis.createExternalUrl = o.createExternalUrl;
        mythis.createMenuCustom = o.createMenuCustom;
        mythis.isFavori = o.isFavori;
        mythis.toggleFavori = o.toggleFavori;

        mythis.isMenuFixe = async () => { return mythis.etatFixed; };
        if (o.isMenuFixe)
            mythis.isMenuFixe = o.isMenuFixe;
        mythis.toggleMenuFixe = (b) => { mythis.etatFixed = b; };
        if (o.toggleMenuFixe)
            mythis.toggleMenuFixe = o.toggleMenuFixe;

        mythis.arbreRoutes = new Arbre<string>(xxRouteContainer.ROOTBASE);
        mythis.dernieresPages = [];

        // -- Generation routeur -- //
        mythis.elemPrincipal = new xxWrapPanel({
            id: o.id,
            class: 'xxRouteContainer',
            espaceMinimaliste: true,
            retourALaLigne: false,
            alignementVertical: enumAlignementVerticalWrapPanel.haut,
            alignementHorizontal: enumAlignementHorizontalWrapPanel.Gauche
        });
        mythis.elemMenuTools = new xxWrapPanel({ class: 'RC_MenuTools-wrap', itemsLargeurEgale: true, espaceMinimaliste: true, retourALaLigne: false, gap: 5 });

        mythis.activationMenuList = (o.desktopMenuEnabled == undefined ? true : o.desktopMenuEnabled);
        if (mythis.gestionBackBrowser)
        {
            window.addEventListener('popstate', function (e)
            {
                mythis.popstate(e);// e.state is equal to the data-attribute of the last image we clicked
            });
        }
        /***
         * 
         * OPTION 1
         * 
         * **/
        
        mythis.elemFilAriane = new xxWrapPanel({ espaceMinimaliste: true, retourALaLigne: false, gap: 10 });

        /***
         * 
         * OPTION 2
         * 
         * 
         * **/

        if (!mythis.gestionBackBrowser) {
            mythis.elemMenuTools.append(new xxBouton({
                textLocalise: '',
                titleLocalise: 'Page précédente',
                icone: new IconeP12(enumIconeP12.xxRouteContainer_Retour),
                click: (cb) => {
                    mythis.navigationBack();
                    cb();
                }
            }), "BoutonRetour")
        }
        mythis.elemMenuTools.append(mythis.elemFilAriane,"RC_MenuToolsFil")
            .append(new xxBouton({
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit
                },

            titleLocalise: 'Rafraichir',
            icone: new IconeP12(enumIconeP12.xxRouteContainer_Refresh),
            click: (cb) => {
                mythis.refreshCurrent();
                cb();
            }
        }), "BoutonRefresh")
            .append(new xxBouton({
                titleLocalise: 'copier un lien exportable',
                icone: new IconeP12(enumIconeP12.xxRouteContainer_Partager),
                click: (cb) => {
                    cb();
                    xOutils.copyToClipboard(mythis.createExternalUrl(encodeURIComponent(mythis.routeActivePhysique)));

                },
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit
                },

            }), "BoutonPartager");

        //---

        mythis.elemBoutonMenu = new xxWrapPanel({
            espaceMinimaliste: true,
            retourALaLigne: false,
            alignementHorizontal: enumAlignementHorizontalWrapPanel.Gauche
        });
        mythis.elemBoutonMenu.append(
            new xxContainerEvent({
                initContent: new IconeSvg(
                    enumIconeSvg.menu_burger,
                    { taille: tailleIcone.XS }),
                onClick: (cb) => {
                    mythis.selectionEnCours = true;
                    mythis.ActivationMenuList = true;
                    cb();
                }
            }));
        
        mythis.elemMenu = new xxStackPanel({ class: "RC_Menu-elem",espaceMinimaliste: true});
            
        mythis.elemMenuSecondaire = new xDiv({class:"RC_MenuSecondaire-elem"});
        mythis.elemZoneFermerMenu = new xxContainerEvent({
            initContent: new xDiv({}),
            onClick: (cb) => {
                mythis.selectionEnCours = false;
                mythis.ActivationMenuList = false;
                cb();
            }
        })
        mythis.elemZoneContenu = new xDiv({ class: "RC_ZoneContenu-elem" });

        mythis.elemPrincipal
            .append(mythis.elemBoutonMenu, 'RC_BoutonMenu')
            .append(mythis.elemMenu, "RC_Menu")
            .append(mythis.elemMenuSecondaire, 'RC_MenuSecondaire')
            .append(mythis.elemZoneFermerMenu,'RC_ZoneFermerMenu')
            .append(mythis.elemZoneContenu, 'RC_ZoneContenu');


        // Creation du Header //
        let elemMenuHeader: xxGrid = new xxGrid({
            colonnes: ["40px", "1fr", "40px"],
            fullWidth: true,
            gridGap: "0px",
            padding: false,
            class:"wp-icones",
        });

        let iconePunaise = new xxContainerEvent({
            initContent: new IconeSvg(enumIconeSvg.punaise, { taille: tailleIcone.XS }),
            class: "iconePunaise",
            onClick: async(cb) =>
            {
                if (await mythis.isMenuFixe())
                {
                    iconePunaise.addClass("iDeFixed");
                    mythis.elemPrincipal.addClass("menuDeFixed");
                    mythis.toggleMenuFixe(false);
                    mythis.etatFixed = false;
                }
                else
                {
                    iconePunaise.removeClass("iDeFixed");
                    mythis.elemPrincipal.removeClass("menuDeFixed");
                    mythis.toggleMenuFixe(true);
                    mythis.etatFixed = true;
                }
                cb();
            }
        });
        mythis.isMenuFixe().then((b) => {
            if (b)
            {
                iconePunaise.removeClass("iDeFixed");
                mythis.elemPrincipal.removeClass("menuDeFixed");
                mythis.etatFixed = true;
            }
            else {
                iconePunaise.addClass("iDeFixed");
                mythis.elemPrincipal.addClass("menuDeFixed");
                mythis.etatFixed = false;
            }
        });

        elemMenuHeader.append([
            new xxGridItem({
                colStart: 1, rowStart: 1,
                class: "wpi-iconeCroix",
                content: new xxContainerEvent({
                    initContent: new IconeSvg(enumIconeSvg.croix, { taille: tailleIcone.XS }),
                    class: "iconeCroix",
                    onClick: (cb) =>
                    {
                        mythis.selectionEnCours = false;
                        mythis.ActivationMenuList = false;
                        cb();
                    }
                })
            }),
            new xxGridItem({
                colStart: 3, rowStart: 1,
                class: "wpi-iconePunaise",
                content: iconePunaise
            })
        ]);

        if (o.IconeHeader != null)
            elemMenuHeader.append([
                new xxGridItem({
                    colStart: 2, rowStart: 1,
                    optionsAffichage: {
                        alignementContenu: enumAlignementContenu.BasCentre
                    },
                    content: o.IconeHeader
                }),
            ]);

        mythis.elemMenuList = new xxStackPanel({espaceMinimaliste:true});
        mythis.elemMenuNav = new xxStackPanel({ espaceMinimaliste: true });
            mythis.elemMenuNav.append(mythis.elemMenuList, 'RC_MenuNavList');
            if (mythis.createMenuCustom) {
                mythis.elemMenuCustom = new xxStackPanel({ espaceMinimaliste: true });
                mythis.elemMenuNav.append(mythis.elemMenuCustom, 'RC_MenuNavCustom');
            }

        //Création du Main Menu
        mythis.elemMenu
            //Menu Header
            .append(elemMenuHeader, 'RC_MenuHeader')
            //Menu Nav
            .append(mythis.elemMenuNav, 'RC_MenuNav');
            //Menu Tools
            mythis.elemMenu.append(mythis.elemMenuTools, 'RC_MenuTools');

        mythis.refreshAfficheMenuList();

        if (mythis.createMenuCustom != undefined && mythis.createMenuCustom != null)
        {
            mythis.createMenuCustom(mythis.elemMenuCustom);
        }

    }

    // ------- //
    // Methode //
    // ------- //

    // #region AjouteRoute

    private completerArbre(route: string)
    {
        let mythis: xxRouteContainer = this;

        let tabRoute = route.split('\\');
        let arbre = mythis.arbreRoutes;

        tabRoute.forEach((s: string) =>
        {
            if (arbre.enfants[s] != undefined)
            {
                arbre = arbre.getEnfant(s);
            }
            else
            {
                arbre = arbre.ajouterEnfant(s);
            }
        })
    }

    private ajouterRoute(route: string, endpoint: EndPointFn): xxRouteContainer
    {
        let mythis: xxRouteContainer = this;
        mythis.dicoRoutesTheoriques[route] = endpoint;
        mythis.completerArbre(route);

        return mythis;
    }
    /**
     * permet d'ajouter un selecteur de routes possibles à partir d'un endpoint
     * @param route
     * @param routesPossibles
     */
    private ajouterRouteSelecteurSpecifiquePrivate(route: string, inroutesPossibles: (params: string[], dataCacher?: Dictionnaire<(string | number|boolean)>) => Promise<string[]>): xxRouteContainer
    {
        let mythis: xxRouteContainer = this;
        let routesPossibles = inroutesPossibles;

        mythis.dicoRoutesTheoriques[route] = { selecteurRoutes: routesPossibles };
        return mythis;
    }

    /**
     * permet d'ajouter une route vers un écran
     * @param route
     * @param renderEcran
     */
    public ajouterRouteEcran(route: string, renderEcran: (ici: iXElementHolder, params: string[], dataCacher?: Dictionnaire<(string | number|boolean)>) => Promise<void>): xxRouteContainer
    {
        let mythis: xxRouteContainer = this;
        return mythis.ajouterRoute(route, { render: renderEcran, reactivation: async () => { } });
    }

    /**
    * permet d'ajouter une route vers un écran
    * @param route
    * @param renderEcran
    */
    public ajouterRouteEcranAvecReactivation(route: string, renderEcran: (ici: iXElementHolder, params: string[], dataCacher?: Dictionnaire<(string | number|boolean)>) => Promise<void>, reactivationEcran: (params: string[], dataCacher?: Dictionnaire<(string | number|boolean)>) => Promise<void>): xxRouteContainer
    {
        let mythis: xxRouteContainer = this;
        return mythis.ajouterRoute(route, { render: renderEcran, reactivation: reactivationEcran });
    }


    /**
     * permet d'ajouter une route vers un écran
     * @param route
     * @param renderEcran
     */
    public ajouterRouteEcranWithSelecteurStandard(route: string, renderEcran: (ici: iXElementHolder, params: string[], dataCacher?: Dictionnaire<(string | number|boolean)>) => Promise<void>): xxRouteContainer
    {
        let mythis: xxRouteContainer = this;
        let maroute: string = '' + route;
        let f = (params: string[]): Promise<string[]> =>
        {
            let tabTheorique: string[] = [];
            if (maroute == xxRouteContainer.ROOTBASE)
            {
                mythis.arbreRoutes.getEnfants().forEach((a: Arbre<string>) => { tabTheorique.push(a.Valeur); });
            }
            else
            {
                mythis.arbreRoutes
                    .getEnfants((maroute).split('\\'))
                    .forEach((a: Arbre<string>) =>
                    {
                        tabTheorique.push(maroute + '\\' + a.Valeur);
                    });
            }

            let tabPhysique: string[] = [];

            tabTheorique.forEach((a) => { tabPhysique.push(mythis.routeTheoriqueToRoutePhysique(a, params)); });

            let prom = new Promise<string[]>((resolve) =>
            {
                resolve(tabPhysique);
            })
            return prom;
        };
        mythis.ajouterRoute(route, { render: renderEcran, reactivation: async () => { }, selecteurRoutes: f });
        return mythis;
    }

    /**
     * permet d'ajouter une route vers un écran de sélection
     * @param route
     * @param renderEcran
     */
    public ajouterRouteSelecteur(route: string, renderRech: (recherche: iXElementHolder, params: string[], dataCacher?: Dictionnaire<(string | number|boolean)>) => Promise<void>): xxRouteContainer
    {
        let mythis: xxRouteContainer = this;
        return mythis.ajouterRoute(route, { renderRecherche: renderRech });
    }

    /**
     * permet d'ajouter un noeud qui affiche tous les sous menus
     * @param route
     */
    public ajouterRouteSelecteurStandard(inRoute: string): xxRouteContainer
    {

        let mythis: xxRouteContainer = this;
        let maroute: string = '' + inRoute;


        //ici je crée un focntion qui retournera les chemins possibles à partir de cette route
        // le retour est une promesse
        let f = (params: string[]): Promise<string[]> =>
        {
            let tabTheorique: string[] = [];
            if (maroute == xxRouteContainer.ROOTBASE)
            {
                mythis.arbreRoutes.getEnfants().forEach((a: Arbre<string>) => { tabTheorique.push(a.Valeur); });
            }
            else
            {
                mythis.arbreRoutes
                    .getEnfants((maroute).split('\\'))
                    .forEach((a: Arbre<string>) =>
                    {
                        tabTheorique.push(maroute + '\\' + a.Valeur);
                    });
            }

            let tabPhysique: string[] = [];

            tabTheorique.forEach((a) => { tabPhysique.push(mythis.routeTheoriqueToRoutePhysique(a, params)); });

            let prom = new Promise<string[]>((resolve) =>
            {
                resolve(tabPhysique);
            })
            return prom;
        };
        return mythis.ajouterRouteSelecteurSpecifiquePrivate(maroute, f);
    }
    /**
   * permet d'ajouter un noeud qui affiche des sous menus dynamiques
   * @param route
   */
    public ajouterRouteSelecteurSpecifique(inRoute: string, routesPossibles: (params: string[], dataCacher?: Dictionnaire<(string | number|boolean)>) => Promise<string[]>): xxRouteContainer
    {
        let mythis: xxRouteContainer = this;
        let route = '' + inRoute;
        return mythis.ajouterRouteSelecteurSpecifiquePrivate(route, routesPossibles);
    }
    // #endregion AjouteRoute

    //#region Refresh

    public async refresh(routeTheorique: string, params: (string | number)[], dataCacher?: Dictionnaire<(string | number|boolean)>): Promise<xxRouteContainer>
    {
        let mythis: xxRouteContainer = this;
        return await mythis.display(routeTheorique, params, dataCacher, true, false);
    }

    public async refreshCurrent(): Promise<xxRouteContainer>
    {
        let mythis: xxRouteContainer = this;
        let rt = mythis.routePhysiqueToRouteTheorique(mythis.getCurrentPage());
        return await mythis.display(rt.routeTheorique, rt.params, mythis.dicoDataParams[mythis.getCurrentPage()], true, false);
    }

    private refreshAfficheMenuList()
    {
        let myThis: xxRouteContainer = this;
        myThis.elemPrincipal.toggleClass('noDesktopMenu', !myThis.activationMenuList);
        myThis.elemPrincipal.toggleClass('selectionEnCours', myThis.selectionEnCours);
    }

    private refreshAfficheBandeauPerso()
    {
        let myThis: xxRouteContainer = this;
        myThis.elemMenuCustom.toggleClass('BandeauPersoVisible', myThis.activationBandeauPerso);
    }

    private async refreshMenuList()
    {
        let myThis: xxRouteContainer = this;

        let myHost: xDiv = new xDiv();

        myThis.refreshAfficheMenuList();
        myThis.elemMenuList
            .empty()
            .append(myHost);

        if (!myThis.SansZoneDeRecherche)
            myHost.asHolder.append(new xInputText({
                class: "champRechercheMenu",
                placeHolderlocalise: "Quelque chose à chercher ?",
                binding: { value: myThis.filtretexte }
            }));

        myThis.afficherListeByNiveau(myHost.asHolder, xxRouteContainer.ROOTBASE);

    }

    private async refreshFilAriane()
    {
        let myThis: xxRouteContainer = this;


        if (!myThis.modeFileArianeClavier)
        {
            let tabChemin = myThis.routeActivePhysique.split('\\');
            let routeTheorique = myThis.routePhysiqueToRouteTheorique(myThis.routeActivePhysique);
            let tabCheminTheorique = routeTheorique.routeTheorique.split('\\');
            let tabCourantTheorique: string = '';
            let tabCourantPhysique: string = '';

            myThis.elemFilAriane
                .vider()
                .append(new xxBouton({
                    class: 'xxRouteContainerHomeContainerEvent',
                    click: () => { myThis.afficherAccueil(); },
                    icone: new IconeP12(enumIconeP12.xxRouteContainer_Home),
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.Fit
                    },

                    titleLocalise: "retour à l'accueil"
                }), "hiddenOnMobile");

            tabChemin.forEach((a, index) =>
            {
                let classe: string = '';

                if (tabCourantTheorique != '') { tabCourantTheorique += ('\\' + tabCheminTheorique[index]); }
                else { tabCourantTheorique += tabCheminTheorique[index]; }

                if (tabCourantPhysique != '') { tabCourantPhysique = tabCourantPhysique += '\\' + a; }
                else { tabCourantPhysique = a; }

                if (index == tabChemin.length - 1)
                {
                    classe = 'xxRouteContainerFilArianePageActive';
                }

                if (myThis.DicoLibelleParams[tabCourantPhysique] != undefined)
                {
                    a = myThis.DicoLibelleParams[tabCourantPhysique];
                }

                let lab = new xxLabel({ textVariable: a, class: classe });
                let nbParams: number = 0;
                let i: number = 0;
                for (i = 0; i < tabCourantTheorique.length; i++)
                    if (tabCourantTheorique.charAt(i) == '{')
                    {
                        nbParams++;
                    }

                let p: string[] = [];
                p = routeTheorique.params.slice(0, nbParams);

                let val: string = tabCourantTheorique;
                let itemFinal = new xxContainerEvent({
                    initContent: lab,
                    onClick: (cb) =>
                    {
                        myThis.afficher(val, p);
                        cb();
                    }
                });
                myThis.elemFilAriane.append(itemFinal, "hiddenOnMobile");
            })
        }
        else
        {
            myThis.elemFilAriane.vider();
            let inputAdresse = new xInputText({
                value: myThis.routeActivePhysique,
                ValueChange: (s: string) =>
                {
                    myThis.afficherRoutePhysique(s);
                },
                KeyUpEnterCallback: (s: string) =>
                {
                    myThis.afficherRoutePhysique(s);
                }
            });
            myThis.elemFilAriane
                .append(new xxBouton({
                    class: 'xxRouteContainerHomeContainerEvent',
                    click: () => { myThis.afficherAccueil(); },
                    icone: new IconeP12(enumIconeP12.xxRouteContainer_Home),
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.Fit
                    },

                    titleLocalise: "retour à l'accueil"
                }), "hiddenOnMobile")
                .append(new xxContainerEvent({
                    initContent: inputAdresse, onClick: (cb) =>
                    {
                        cb();
                        inputAdresse.y.focus();

                        (<HTMLInputElement>inputAdresse.y).select();
                    }
                }), "hiddenOnMobile");

        }

        myThis.elemFilAriane.append(new xxCheckBox({
            value: await myThis.isFavori(myThis.routeActivePhysique),
            titleLocalise: 'Ajouter/Retirer le favori',
            imageEnable: new IconeP12(enumIconeP12.xxRouteContainer_FavoriOn),
            imageDisable: new IconeP12(enumIconeP12.xxRouteContainer_FavoriOff),
            typeCheckbox: enumTypeCheckbox.image,
            ValueChange: (newVal) => { myThis.toggleFavori(myThis.routeActivePhysique, newVal); }
        }));




    }

    //#endregion Refresh

    public setCurrentPageHaveDataNotSave(value: boolean)
    {
        let mythis: xxRouteContainer = this;
        mythis.HaveNotSaveData = value;
    }

    private async CheckCurrentPageCanQuitOrRefresh():Promise<boolean>
    {
        let mythis: xxRouteContainer = this;
        if (mythis.HaveNotSaveData)
        {
            let temp = await new Promise<boolean>(async function (resolve, reject)
            {
                new xxDialog({
                    texteLocalise: "Les modifications que vous avez apportées ne seront peut-être pas enregistrées.",
                    type: enumTypeAlerte.info,
                    dialogType: enumDialogTypeBouton.QuitterAnnuler,
                    dialogReponse: (ok) => 
                    {
                        resolve(ok);
                    },
                }).afficher();
            }); 
            if (temp)
                mythis.HaveNotSaveData = false; 
            return temp;
        }
        else
            return true;
    }

    private ajouterHistorique(chemin: string, withPush: boolean)
    {
        let mythis: xxRouteContainer = this;
        let histo = mythis.getCurrentPage();
        if (withPush)
        {
            history.pushState({ chemin: chemin }, 'titre', mythis.createInternalUrl(chemin));
        }

        mythis.verbose('pushState', { chemin: chemin });
        mythis.dernieresPages.push(chemin);
        if (mythis.dernieresPages.length > 20)
        {
            mythis.dernieresPages.shift();
        }
    }

    public navigationCancel(withPush: boolean =true)
    {
        let mythis: xxRouteContainer = this;
        let theo = mythis.routePhysiqueToRouteTheorique(mythis.getLastPage());

        return mythis.display(theo.routeTheorique, theo.params, null, false, withPush,true);
    }

    public navigationBack()
    {
        let mythis: xxRouteContainer = this;
        mythis.afficherRoutePhysique(mythis.getBackPage());
    }

    public annulerEcran(routePhysique: string)
    {
        let myThis: xxRouteContainer = this;
        let xi = myThis.dicoEcransOuverts[routePhysique];
        if (xi != undefined)
        {
            xi.y.remove();
            myThis.dicoEcransOuverts[routePhysique] = undefined;
        }
        let xiData = myThis.dicoDataParams[routePhysique];
        if (xiData != undefined)
        {
            myThis.dicoDataParams[routePhysique] = undefined;
        }
    }

    public annulerEcranCourant()
    {
        let myThis: xxRouteContainer = this;

        let routePhysique = myThis.getCurrentPage();
        let xi = myThis.dicoEcransOuverts[routePhysique];
        if (xi != undefined)
        {

            xi.y?.remove();
            myThis.dicoEcransOuverts[routePhysique] = undefined;
        }
        let xiData = myThis.dicoDataParams[routePhysique];
        if (xiData != undefined)
        {
            myThis.dicoDataParams[routePhysique] = undefined;
        }
    }

    public async afficher(routeTheorique: string, params: (string | number)[], dataCacher?: Dictionnaire<(string | number|boolean)>): Promise<xxRouteContainer> {
        let mythis: xxRouteContainer = this;
            return await mythis.display(routeTheorique, params, dataCacher, false, true);
    }

    public routePhysiqueToRouteTheorique(routePhysique: string) {
        let mythis: xxRouteContainer = this;
        let routeTheorique: string;
        let params: string[];

        if (routePhysique.indexOf('{') >= 0) {
            throw ('erreur route physique');
        }

        /*
         *j'essaye de retrouver une route théorique à partir du chemin Physique et si je la trouve je dois retrouver les paramètres
         * */
        let tabPhysique = routePhysique.split('\\');

        for (let key in mythis.dicoRoutesTheoriques) {
            let isOk: boolean = true;
            let paramsTemp: string[] = [];
            let tabTheorique = key.split('\\');

            if (tabTheorique.length == tabPhysique.length) {
                //si les 2 tableaux font la même taille , on les compare
                isOk = true;

                tabTheorique.forEach((val, index) => {
                    if (isOk) {
                        //si les valeurs sont différentes et que la route théorique n'a pas de joker
                        if (tabTheorique[index].charAt(0) != '{' && tabTheorique[index] != tabPhysique[index]) {
                            isOk = false;
                        }
                        else {
                            isOk = true;
                            if (tabTheorique[index].charAt(0) == '{') {
                                paramsTemp.push(tabPhysique[index]);
                            }
                        }
                    }
                });

            }
            else {
                isOk = false;
                continue;
            }

            //si isok est toujours à true j'ai trouvé la bonne route et je garde les paramètres
            if (isOk) {
                params = paramsTemp;
                routeTheorique = key;
                break;
            }
        }
        mythis.verbose('routePhysique:' + routePhysique);
        mythis.verbose('donne:' + routeTheorique);
        mythis.verbose('params:' + params?.forEach(s => { return s + '/'; }));

     /*   if (params?.indexOf('{') >= 0) {
            throw ("erreur détection des params");
        }*/

        return { routeTheorique: routeTheorique, params: params };
    }

    public routeTheoriqueToRoutePhysique(routeTheorique: string, params: (string|number)[]): string {
        
   /*     if (params.indexOf('{') >= 0) {
            throw ('erreur params en entrée');
        }
        */
        let route: string = routeTheorique;
        if (params != null) {
            params.forEach((valeur, index) => {
                route = route.replace('{' + index + '}', params[index]?.toString());
            });
        }
        return route;
    }
    
    public afficherRoutePhysiqueNoPush(routePhysique: string, dataCacher?: Dictionnaire<(string | number|boolean)>) {
        let mythis: xxRouteContainer = this;
        if (routePhysique.indexOf('{') >= 0) {
            throw ('erreur route physique dans public afficherRoutePhysiqueNoPush(');
        }
        let theo = mythis.routePhysiqueToRouteTheorique(routePhysique);

        return mythis.display(theo.routeTheorique, theo.params, dataCacher, false,false);
    }
    public afficherRoutePhysique(routePhysique: string, dataCacher?: Dictionnaire<(string | number|boolean)>) {
        let mythis: xxRouteContainer = this;
      
        if (routePhysique.indexOf('{') >= 0) {
            throw ('erreur route physique dans public afficherRoutePhysique(');
        }
        let theo = mythis.routePhysiqueToRouteTheorique(routePhysique);

        return mythis.display(theo.routeTheorique, theo.params, dataCacher, false, true);
    }

    public afficherAccueil() {
        let mythis: xxRouteContainer = this;
        mythis.afficher('', []);
    }

    private async display(routeTheorique: string, params: (string | number)[], dataCacher: Dictionnaire<(string | number | boolean)>, forceRefresh: boolean, withPush: boolean, withoutReactivation: boolean=false): Promise<xxRouteContainer> {
        let mythis: xxRouteContainer = this;
        mythis.verbose('route choisie:' + routeTheorique);

        let route = mythis.routeTheoriqueToRoutePhysique(routeTheorique, params);

        
        let def: EndPointFn = mythis.dicoRoutesTheoriques[routeTheorique];
        if (def == undefined) {
            console.log('route inconnue:' + routeTheorique)
        }
        if (def != undefined) {
            // si ce n'est pas un écran de recherche je masque le menu pour le refaire
            if (def.renderRecherche == undefined) {
                cacherxElements(mythis.elemMenuSecondaire, true);
            }


            //si c'est un écran à afficher
            if (def.render != undefined)
            {
                mythis.selectionEnCours = false;
                let AcceptDeRender = true;

                if (!mythis.etatFixed)
                {
                    mythis.ActivationMenuList = false;
                }

                //si l'écran demandé est déja calculé et qu'il ne s'agit pas d'un refresh
                //alors je détache le contenu pour etre capable de le ressortir plus tard

                if (forceRefresh)
                {
                    AcceptDeRender = await this.CheckCurrentPageCanQuitOrRefresh();
                    if (AcceptDeRender)
                        mythis.annulerEcran(route);
                }
                else if (route != mythis.getCurrentPage())
                {
                    AcceptDeRender = await this.CheckCurrentPageCanQuitOrRefresh();
                }

                if (AcceptDeRender)
                {
                    if (mythis.dicoEcransOuverts[route] != undefined)
                    {
                        cacherxElements(mythis.dicoEcransOuverts[route], true);
                        mythis.setRoute(route, routeTheorique, params);
                        if (mythis.dicoRoutesTheoriques[routeTheorique].reactivation != null && !withoutReactivation)
                        {
                            mythis.dicoDataParams[route] = dataCacher;
                            mythis.dicoRoutesTheoriques[routeTheorique].reactivation(params, dataCacher);
                        }

                    }
                    else
                    {

                        let divHote = new xDiv({ class: "ContainerPage ", idTest: route }).asHolder;

                        cacherxElements(divHote, true);
                        mythis.dicoEcransOuverts[route] = divHote;

                        mythis.dicoDataParams[route] = dataCacher;

                        mythis.elemZoneContenu.asHolder.append(divHote);


                        def.render(divHote, params, dataCacher).then(() =>
                        {
                            mythis.setRoute(route, routeTheorique, params);
                        }
                        );
                    }


                    mythis.ajouterHistorique(route, withPush);
                }
                else
                    mythis.navigationCancel(false);
            }
            else {


                mythis.elemMenuSecondaire.asHolder.empty();

                let stk = new xxStackPanel({ espaceMinimaliste: true});
                let dockBouton = new xxDockPanelDeprecated({
                    centrerDernier: true,
                    class: "OptionsMenuSecondaire"
                });

                let niveau = route.split('\\');

                if (route != '') {
                    dockBouton.append(new xxBouton({
                        textLocalise: '',
                        titleLocalise: 'Niveau supérieur',
                        icone: new IconeP12(enumIconeP12.xxRouteContainer_Remonter),
                        click: (cb) => {
                            if (niveau.length > 1) {
                                niveau.pop();
                                mythis.afficherRoutePhysique(niveau.join('\\'));
                            }
                            else {

                                //retour au menu normal sans préselection
                                //     mythis.navigationCancel();
                                //      mythis.setRoute('', '', []);
                                //     mythis.selectionEnCours = true;
                                //     mythis.ActivationMenuPrincipal = true;




                                //retour au menu normal
                                //  mythis.navigationCancel();
                                //   mythis.selectionEnCours = true;
                                //   mythis.ActivationMenuPrincipal = true;


                                //mode superbasique
                                mythis.afficherAccueil();;
                            }

                            cb();
                        }
                    }), DockPosition.gauche);
                }

                dockBouton.append(new xxBouton({
                    textLocalise: '',
                    titleLocalise: 'fermer',                    
                    icone: new IconeP12(enumIconeP12.xxRouteContainer_Fermer),
                    click: (cb) => {
                        mythis.navigationCancel(false);
                        cb();
                    }
                }), DockPosition.droite);


                dockBouton.append(new xxLabel({
                    textVariable: route == '' ? new xLString('Menu Principal').text : route
                }), DockPosition.haut);
                stk.append(dockBouton);
                mythis.elemMenuSecondaire.asHolder
                    .append(stk);

                //si c'est un écran de recherche
                if (def.renderRecherche != undefined) {

                    let placeHolderForSearch = new xDiv({ class: "RechercheMenuSec" });

                    mythis.dicoDataParams[route] = dataCacher;
                    stk.append(placeHolderForSearch);

                    def.renderRecherche(placeHolderForSearch.asHolder, params,dataCacher).then(() => {
                        mythis.setRoute(route, routeTheorique, params);
                    });

                }
                else {
                    //sinon il faut un sélecteur simple de sous menu
                    if (def.selecteurRoutes) {

                        let clicsNavigation = new xxStackPanel({ espaceMinimaliste: true });

                        mythis.dicoDataParams[route] = dataCacher;
                        let routesPossibles = await def.selecteurRoutes(params, dataCacher);
                        routesPossibles.forEach((route: string) => {

                            let theo = mythis.routePhysiqueToRouteTheorique(route);
                            let texte: string = "undefine";
                            // let tab = theo.routeTheorique.split('\\')
                            if (mythis.DicoLibelleParams[route] == undefined)
                            {
                                let tab = route.split('\\');
                                texte = tab[tab.length - 1];
                            }
                            else
                            {
                                texte = mythis.DicoLibelleParams[route];
                            }

                            clicsNavigation.append(new xxBouton({
                                titleLocalise: 'choisir',
                                textVariable: texte, 
                                optionsAffichage: {
                                    styleBouton: enumStyleBouton.Simple
                                },
                                click: (cb) => {

                                    mythis.afficher(theo.routeTheorique, theo.params);
                                    cb();
                                }
                            }))
                        });

                        stk.append(clicsNavigation);
                    }
                    mythis.setRoute(route, routeTheorique, params);
                }

                afficherxElements(mythis.elemMenuSecondaire);
            }
        }

     
        return mythis;
    }

    private setRoute(routePhysique: string, routeTheorique: string, params: (string|number)[]): void {
        let myThis: xxRouteContainer = this;
        //if (myThis.dicoEcransOuverts[myThis.routeActivePhysique] != undefined && myThis.dicoEcransOuverts[routePhysique] != undefined)
        //{
        //    cacherxElements(myThis.dicoEcransOuverts[myThis.routeActivePhysique], true);
        //}

        myThis.routeActivePhysique = routePhysique;

        if (myThis.dicoEcransOuverts[myThis.routeActivePhysique] != undefined) {
         

            for (let key in myThis.dicoEcransOuverts) {
                cacherxElements(myThis.dicoEcransOuverts[key], true);
            }

            afficherxElements(myThis.dicoEcransOuverts[myThis.routeActivePhysique]);
        }


        myThis.refreshFilAriane();
        myThis.refreshMenuList();

    }

    private async afficherListeByNiveau(myHost: iXElementHolder, cheminAAfficherPhysique: string) {
        let mythis: xxRouteContainer = this;
        if (cheminAAfficherPhysique.indexOf('{') >= 0) {
            throw ('erreur route physique cheminAAfficherPhysique dans afficherListeByNiveau');
        }
        let theorique = mythis.routePhysiqueToRouteTheorique(cheminAAfficherPhysique);
        let isJoker: boolean = false;

        //pour cette routePhysique, je cherche mes enfants

        let enfants: string[] = [];

        if (mythis.dicoRoutesTheoriques[theorique.routeTheorique] == undefined) {
            mythis.verbose("route inconnue:" + theorique.routeTheorique);
        }
        //j'ai un selecteur si je fais un aiguillage spécifique ou si je fais un aiguillage normal 
        // par conte je n'ai pas d'écran ni de recherche
        if (mythis.dicoRoutesTheoriques[theorique.routeTheorique]?.selecteurRoutes != undefined) {

            let f: Function = mythis.dicoRoutesTheoriques[theorique.routeTheorique].selecteurRoutes;

            mythis.verbose('selecteur pour route:' + theorique.routeTheorique + '--->' + f.toString());

            if (theorique.params.indexOf('{') >= 0) {
                throw ('erreur totale B4');
            }

            enfants = await f(theorique.params);


            mythis.verbose('---enfants-----');
            enfants.forEach(s => {
                mythis.verbose(s);
                if (s.indexOf('{') >= 0) {
                    throw ('erreur cheminphysique pour les enfants de f selecteur ');
                }
            });
            mythis.verbose('fin---enfants-----');


        }
        else {
            isJoker = true;
            //j'avance d'un cran:
            let taille = cheminAAfficherPhysique.split('\\').length;

            let cheminEnfantCourantPhysique = mythis.routeActivePhysique.split('\\').slice(0, taille + 1).join('\\');

            enfants.push(cheminEnfantCourantPhysique);
            if (cheminEnfantCourantPhysique.indexOf('{') >= 0) {
                throw ('erreur cheminphysique dans isJoker =true ==> afficherListeByNiveau');
            }

        }

        let maClasse: string = '';

        if (theorique.routeTheorique != xxRouteContainer.ROOTBASE) {
            maClasse = 'SousListeMenu';
        }

        let indexSplitLien: number = 0;
        if (!!cheminAAfficherPhysique)
            indexSplitLien = cheminAAfficherPhysique.split("\\").length
        let maListe = new xxListWrapper<string>({
            class: maClasse,
            donnees: enfants,
            renderItem: async (ici, routePhysique) => {

                let cheminEnfantPhysique: string = '';

                mythis.verbose(routePhysique);
                cheminEnfantPhysique = routePhysique;

                let isCheminActif: boolean = (mythis.routeActivePhysique.split("\\")[indexSplitLien] == cheminEnfantPhysique.split("\\")[indexSplitLien]);
                let classe: string = '';

                if (isJoker || isCheminActif) {
                    classe += ' cheminActif';
                    //si je suis le dernier élément de l'arbre
                    if (mythis.routeActivePhysique == cheminEnfantPhysique) {
                        classe += ' lienActif';
                    }
                }

                //je chercher le dernier morceau du nom de la route:
                let tabPhysiqueEnfant = cheminEnfantPhysique.split('\\');
                let texte = tabPhysiqueEnfant[tabPhysiqueEnfant.length - 1];

                if (mythis.DicoLibelleParams[cheminEnfantPhysique] != undefined) {
                    texte = mythis.DicoLibelleParams[cheminEnfantPhysique];
                }

                //pour chaque enfant j'affiche le nom de son dernier dossier 
                //..et si c'est un dossier actif je reitere une liste afficherListeByNiveau à partir de l'enfant            
                let lab = new xxLabel({ textVariable: texte });
                let itemFinal = new xxContainerEvent({
                    class: classe,
                    initContent: lab,
                    onClick: async (cb) => {
                        //   let a = mythis.routePhysiqueToRouteTheorique(cheminEnfantPhysique);
                        mythis.afficherRoutePhysique(cheminEnfantPhysique);
                        cb();
                    }
                });

                ici.append(itemFinal);
                if ((isJoker || isCheminActif) && (mythis.routeActivePhysique != cheminEnfantPhysique)) {
                    let newHost = new xDiv();
                    ici.append(newHost);
                    mythis.afficherListeByNiveau(newHost.asHolder, cheminEnfantPhysique);
                }
            }
        })

        myHost.append(maListe);
        maListe.setFiltre(a => {
           // return true;
            return xOutils.rechercheString(mythis.filtretexte.Value,[a]);
        })

        mythis.filtretexte.bind(a => { maListe.filtrer(); })

    }

    // Event
    private async popstate(e: PopStateEvent)
    {
        let mythis: xxRouteContainer = this;
        if (await mythis.CheckCurrentPageCanQuitOrRefresh())
        {
            mythis.verbose('popstate', e);
            if (e.state != null && e.state.chemin)
            {
                let aFermerUneTooltip: boolean = xxToolTip.ForcerFermetureDeToutesLesTooltips();
                if (aFermerUneTooltip && window.innerWidth <= 1024)
                {
                    mythis.navigationCancel();
                }
                else
                {
                    if (e.state.chemin == '')
                    {
                        mythis.afficherAccueil();
                    }
                    else
                    {
                        mythis.afficherRoutePhysiqueNoPush(e.state.chemin, mythis.dicoDataParams[e.state.chemin]);
                    }
                }
            }
        }
        else
            mythis.navigationCancel();

    }
}