interface OptionsToolTip
{
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
    /* afterShow = juste après l'apparition */
    afterShow?: (thisTooltip: xxToolTip) => void;
    onHide?: (thisTooltip: xxToolTip) => void;
    /* beforeHide = juste avant le masquage */
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

interface OptionToolTipBouton extends iTestable
{
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
    WithOutBackGround?: boolean
    onShow?: (thisTooltip: xxToolTip) => void;
    /* afterShow = juste après l'apparition */
    afterShow?: (thisTooltip: xxToolTip) => void;
    onHide?: (thisTooltip: xxToolTip) => void;
    /* beforeHide = juste avant le masquage */
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

interface OptionToolTipBoutonTexteVariable extends OptionToolTipBouton
{
    tailleBouton?: enumTailleBouton,
    titleLocalise?: string;
    titleVariable?: string;
    textLocalise?: string;
    textVariable: string;
}

interface OptionToolTipBoutonTexteLocalise extends OptionToolTipBouton
{
    tailleBouton?: enumTailleBouton,
    titleLocalise?: string;
    titleVariable?: string;
    textLocalise: string;
    textVariable?: string;
}

interface OptionToolTipBoutonSansTexte extends OptionToolTipBouton
{
    tailleBouton?: enumTailleBouton.Fit | enumTailleBouton.Tuile;
    titleLocalise?: string;
    titleVariable?: string;
    textLocalise?: undefined;
    textVariable?: undefined;
}

type OptionsTooltipBouton = OptionToolTipBoutonSansTexte | OptionToolTipBoutonTexteLocalise | OptionToolTipBoutonTexteVariable;

enum enumXxToolTipMode { OnHover, Manuel, Manuel_WithOut_BackGround}

enum enumXxToolTipPositionHeight { haut, center, bas }

enum enumXxToolTipPositionWidth { extremiteGauche, gauche, center, droite, extremiteDroite }

class xxToolTip implements iXElement 
{
    // ----------------------- //
    // Static tooltip gestion  //
    // ----------------------- //
    private static TooltipOuvert: xxToolTip;
    private static ListeTooltip: xxToolTip[] = [];
    private static IsHoverIndependenteToolTip: boolean = false;

    //** Permet de fermé de force toute les tooltips de l'ecrant, retourne "True" si au moins une tooltip a etait fermé*/
    public static ForcerFermetureDeToutesLesTooltips(): boolean
    {
        let toSender: boolean = false;
        if (xxToolTip.ListeTooltip.length > 0)
            xxToolTip.ListeTooltip.forEach((to) =>
            {
                if (to.isVisible)
                {
                    to.HideTooltip();
                    toSender = true;
                }
            });
        return toSender;
    }

    // --------- //
    // Attributs //
    // --------- //
    private timenb: number = 250;

    // Title
    private title: string;

    // Element 
    private elementPrincipal: xDiv;
    private elementTooltip: xDiv;
    private headerDiv: xDiv;

    private Tooltip_Box_Event: xxContainerEvent;
    private Tooltip_Box_Header_Titre: xxLabel;
    private ToolTip_Box_Contenu: xDiv;

    private Tootip_Contenu: xxContainerEvent | xDiv;

    // Position du tooltip
    private positionHeight: enumXxToolTipPositionHeight;
    private positionWidth: enumXxToolTipPositionWidth;
	// Position souhaitée du tooltip
	private positionHeightSouhaite: enumXxToolTipPositionHeight;
	private positionWidthSouhaite: enumXxToolTipPositionWidth;

    // Option du tooltip
    private lesOption: OptionsToolTip;

    // Si il est ouvert
    private isShow: boolean = false;
    public addClass(strClasses: string): xxToolTip {
        let myThis: xxToolTip = this;


        myThis.elementPrincipal.addClass(strClasses);


        return myThis;
    }

    public removeClass(strClasses: string): xxToolTip {
        let myThis: xxToolTip = this;


        myThis.elementPrincipal.removeClass(strClasses);


        return myThis;
    }
    // ----------- //
    // Constructor //
    // ----------- //
    constructor(o: OptionsToolTip)
    {
        let mythis: xxToolTip = this;

        // add tooltip in liste Static
        xxToolTip.ListeTooltip.push(mythis);

        // Init. Position et option par default
        mythis.positionHeight = enumXxToolTipPositionHeight.bas;
		mythis.positionWidth = enumXxToolTipPositionWidth.center;
		mythis.positionHeightSouhaite = o.ToolTipPositionHeightSouhaite;
		mythis.positionWidthSouhaite = o.ToolTipPositionWidthSouhaite;

        // Option Test
        if (o.id == undefined)
        { o.id = null; }

        if (o.class == undefined)
        { o.class = null; }


        if (!!o.titleLocalise)
            mythis.title = new xLString(o.titleLocalise).text;
        else if (!!o.titleVariable)
            mythis.title = o.titleVariable;

        // Generation des 2 div Principale
        mythis.elementPrincipal = new xDiv({ id: o.id , class: "xxTooltip " + (!!o.class ? o.class : "") });
        mythis.elementTooltip = new xDiv({ id: (!!o.id ? "Tooltip_Box_#" + o.id : null), class: "xxTooltip_Box " + (!!o.class ? o.class : "") });

        // Gestion du comportement responsive
        if (o.nonResponsive)
            mythis.elementTooltip.addClass("xttip-noresponsive");

        // Si on est en mode tooltip OnClick
        if (o.TooltipMode == enumXxToolTipMode.Manuel)
            mythis.elementTooltip.addClass("xxTooltip_Box_With_BackGround");

        if (o.NotAbsoluteTooltip)
            mythis.elementTooltip.addClass("xxTooltip_Box_Not_Absolute");

        // Pour supprimer la tooltip quand on supprimer l'elementPrincipal


        mythis.elementPrincipal.y.addEventListener("remove", () => {
            mythis.elementTooltip.y.remove();
        });


        // Generation des contenue
        if (o.initContent != null)
        {
            mythis.lesOption = o;
            mythis.Generation();

            // Si on veux la tooltip en mode absolute
            if (!mythis.lesOption.NotAbsoluteTooltip)
            {
                // On ajouter la tooltip au même niveau que les xxboxer
                document.body.append(mythis.elementTooltip.y);
            }
        }
        else
            console.error("xxToolTip => option initContent is undefined");

        if (o.optionsAffichage != undefined)
        {
            xStyle.AppliquerOptionsAffichage(mythis.elementPrincipal, o.optionsAffichage);
        }
    }

    // ------- //
    // Methode //
    // ------- //
    /**
     * Permet de vider le contenue de la toolTip
     * */
    public viderTooltip(): xxToolTip
    {
        this.ToolTip_Box_Contenu.asHolder.empty();
        return this;
    }

    /**
     * Permet d'ajouté du contenue dans la tooltip
     */
    public setToolTip(ttContent: iXElement): xxToolTip
    {
        let mythis: xxToolTip = this;
        mythis.ToolTip_Box_Contenu.asHolder.append(ttContent);
        return this;
    }
    /**
     *  Permet de set le Titre du header (si il y en a un )
     */
    public setTitreHeaderTooltipBox(titre: string):void
    {
        let mythis: xxToolTip = this;
        if (mythis.Tooltip_Box_Header_Titre != null)
            mythis.Tooltip_Box_Header_Titre.changerTextVariable(titre);
    }

    //Renvoie true si le tooltip est affiché.
    get isVisible(): boolean
    {
        let mythis: xxToolTip = this;
        return mythis.isShow;
    }

    // Permet la generation du xxelement
    private Generation()
    {
        let mythis: xxToolTip = this;

        // init. contenu de elementTooltip
        mythis.ToolTip_Box_Contenu = new xDiv({ class: "xxTooltip_Box_Contenu" });

        if (mythis.lesOption.toolTipContent != null)
            mythis.setToolTip(mythis.lesOption.toolTipContent);

        // Container Evenment
        switch (mythis.lesOption.TooltipMode)
        {
            case enumXxToolTipMode.Manuel:
                mythis.ModeManuel();
                break;
            case enumXxToolTipMode.Manuel_WithOut_BackGround:
                mythis.ModeManuelWithOutBackGround();
                break;
            default:
                mythis.OnHover();
        }
        // Ajout des class
        mythis.Tooltip_Box_Event.asHolder.addClass("xxTooltip_Box_Event");

        // Si on ne veux pas de fleche sur la tooltip (utilisé pour les liste deroulente)
        if (!mythis.lesOption.WithoutFleche)
            mythis.Tooltip_Box_Event.asHolder.addClass("Fleche");

        // Si c'est une tootips indepente
        if (mythis.lesOption.isIndependenteToolTip)
            mythis.Tooltip_Box_Event.asHolder.addClass("Tooltip_isIndepente");

        mythis.Tootip_Contenu.asHolder.addClass("xxTooltip_Contenu");

        // Ajout des contenu
        mythis.elementPrincipal.asHolder.append(mythis.Tootip_Contenu);
        if (mythis.lesOption.NotAbsoluteTooltip)
            mythis.elementPrincipal.asHolder.append(mythis.elementTooltip);
        mythis.elementTooltip.asHolder.append(mythis.Tooltip_Box_Event);

        // Refresh des class variable
        mythis.refreshClass();
    }

    // Permet de generer les contenueurEvent OnClick avec le background
    private ModeManuel()
    {
        let mythis: xxToolTip = this;

        // Tooltip_box_BackGround
        mythis.elementTooltip.asHolder.append(new xDiv({
            class: "xxTooltip_Box_BackGround",
            click: () =>
            {
                mythis.HideTooltip();
            }
        }));

        // Tooltip_box_Event
        mythis.Tooltip_Box_Event = new xxContainerEvent({
            initContent: mythis.generateTooltipBoxEventInitContent(),
            onClick: (cb) =>
            {
                if (!mythis.lesOption.TooltipStopPropagation)
                    mythis.HideTooltip();
                if (mythis.lesOption.OnClickTooltipBox)
                    mythis.lesOption.OnClickTooltipBox();
                cb();
            },
            stopPropagation: true
        });

        // tooltip_Contenu
        mythis.Tootip_Contenu = new xDiv({
            title: mythis.title,
            click: () =>
            {
                if (mythis.lesOption.OnClickTooltip)
                    mythis.lesOption.OnClickTooltip();
            }
        });
        mythis.Tootip_Contenu.asHolder.append(mythis.lesOption.initContent);
    }
    // Permet de generer le containerEvent OnClick sans le background
    private ModeManuelWithOutBackGround()
    {
        let mythis: xxToolTip = this;

        let isHover: boolean = false;

        // Crée une ecoute sur tous les evenement scroll de la page
        window.addEventListener("scroll", () =>
        {
            // Si la tooltip est ouvert et que l'on est pas dessus avec la sourie
            if (mythis.isShow && !isHover && !xxToolTip.IsHoverIndependenteToolTip)
            {
                mythis.HideTooltip();// on ferme la tooltip
                /*
                mythis.CalculPosition(); // on Recalcul la position quelle dois avoir par rapport a l'element principale
                */
            }
        }, true);

        // Crée une ecoute sur tous les evenement click de la page
        window.addEventListener("click", () =>
        {
            // Si la tooltip est ouvert et que l'on est pas dessus avec la sourie on ferme la tooltip
            if (mythis.isShow && !isHover && !xxToolTip.IsHoverIndependenteToolTip)
                mythis.HideTooltip();
        }, true);

        // Tooltip Event
        mythis.Tooltip_Box_Event = new xxContainerEvent({
            initContent: mythis.generateTooltipBoxEventInitContent(),
            onMouseOver: () =>
            {
                isHover = true;
                if (mythis.lesOption.isIndependenteToolTip)
                    xxToolTip.IsHoverIndependenteToolTip = true;
            },
            onMouseOut: () =>
            {
                isHover = false;
                if (mythis.lesOption.isIndependenteToolTip)
                    xxToolTip.IsHoverIndependenteToolTip = false;
            },
            onClick: (cb) =>
            {
                if (!mythis.lesOption.TooltipStopPropagation) {
                    mythis.HideTooltip();
                }

                if (mythis.lesOption.OnClickTooltipBox)
                    mythis.lesOption.OnClickTooltipBox();
                cb();
            },            
            stopPropagation: true
        });

        // tooltip_Contenu
        mythis.Tootip_Contenu = new xxContainerEvent({
            titleVariable: mythis.title,
            initContent: mythis.lesOption.initContent,
            onMouseOver: () =>
            {
                isHover = true;
            },
            onMouseLeave: () =>
            {
                isHover = false;
                xxToolTip.IsHoverIndependenteToolTip = false;
            },
            onClick: (cb) =>
            {
                if (mythis.lesOption.OnClickTooltip)
                    mythis.lesOption.OnClickTooltip();
                cb();
            }
        });
    }
    // Permet de generer le containerEvent OnHover
    private OnHover()
    {
        let mythis: xxToolTip = this;
        let ishover: boolean = false;

        // Tooltip_box_Event
        mythis.Tooltip_Box_Event = new xxContainerEvent({
            initContent: mythis.generateTooltipBoxEventInitContent(),
            onMouseOver: () =>
            {
                ishover = true;
            },
            onMouseEnter: () =>
            {
                ishover = true;
            },
            onMouseLeave: () =>
            {
                ishover = false;
                // on timeOut 1sec pour laisse le temps a l'utilisateur de ce remettre dans la tooltip ou d'aller sur l'elementPrincipale
                setTimeout(() =>
                {
                    // Si l'utilisateur est toujours sur l'un des deux element on ne ferme pas la tooltip
                    if (!ishover)
                        mythis.HideTooltip();
                }, mythis.timenb);
            },
            onClick: (cb) =>
            {
                if (mythis.lesOption.OnClickTooltipBox)
                    mythis.lesOption.OnClickTooltipBox();
                cb();
            }
        });

        // tooltip_Contenu
        mythis.Tootip_Contenu = new xxContainerEvent({
            titleVariable: mythis.title,
            initContent: mythis.lesOption.initContent,
            withDelaiPourMouseEnterMs: mythis.lesOption.withDelaiOuvertureMs,
            onMouseEnter: () =>
            {
                if (!ishover)
                    mythis.ShowTooltip();
                ishover = true;
            },
            onMouseLeave: () =>
            {
                ishover = false;
                if (mythis.lesOption.TooltipStopPropagation) // On ne veux pouvoir aller sur la tooltip avec la sourie
                {
                    mythis.HideTooltip();
                }
                else // Si on veux pouvoir aller sur la tooltip
                {
                    // on timeOut 1sec pour laisse le temps a l'utilisateur de ce remettre dans la tooltip ou d'aller sur l'elementPrincipale
                    setTimeout(() =>
                    {
                        // Si l'utilisateur est toujours sur l'un des deux element on ne ferme pas la tooltip
                        if (!ishover)
                            mythis.HideTooltip();
                    }, mythis.timenb);
                }
            },
            onClick: (cb) =>
            {
                if (mythis.lesOption.OnClickTooltip)
                    mythis.lesOption.OnClickTooltip();
                cb();
            }
        });
    }

    public setCouleurHeader(newCouleur: enumCouleurHexa)
    {
        let mythis: xxToolTip = this;
        if (mythis.headerDiv != null)
            xStyle.setCouleurFondAvecContrasteTexteAuto(mythis.headerDiv, newCouleur);
    }

    // Permet de generer le contenu du Tooltip_Box_Event de la tooltip_Box
    private generateTooltipBoxEventInitContent(): iXElement
    {
        let mythis: xxToolTip = this;
        let toSender: xDiv | xxStackPanel;

        let WithHeaderTitre: boolean = mythis.lesOption.titreHeaderLocalise != null || mythis.lesOption.titreHeaderVariable != null;
        let WithHeaderCustom: boolean = mythis.lesOption.renderCustomHeader != null;

        let withFooter: boolean = mythis.lesOption.contenuFooter != null;

        if (WithHeaderTitre || WithHeaderCustom || withFooter)
        {
            toSender = new xxStackPanel({ espaceMinimaliste: true });

            if (WithHeaderTitre) // Header Titre simple
            {
                mythis.elementTooltip.addClass("xxTooltip_AvecHeader");

                mythis.headerDiv = new xDiv({ class: "xxTooltip_Box_Header" });
                mythis.Tooltip_Box_Header_Titre = new xxLabel({
                    textLocalise: mythis.lesOption.titreHeaderLocalise,
                    textVariable: mythis.lesOption.titreHeaderVariable
                });

                if(mythis.lesOption.couleurHeader != undefined)
                    mythis.setCouleurHeader(mythis.lesOption.couleurHeader);

                mythis.headerDiv.asHolder.append(mythis.Tooltip_Box_Header_Titre);
                toSender.append(mythis.headerDiv);
            }

            if (WithHeaderCustom) // Header Custom
            {
                mythis.elementTooltip.addClass("xxTooltip_AvecHeaderCustom");

                let headerCustom: xDiv = new xDiv({ class: "xxTooltip_Box_Header_Custom" });

                mythis.lesOption.renderCustomHeader(headerCustom.asHolder, mythis);

                toSender.append(headerCustom);
            }

            toSender.append(mythis.ToolTip_Box_Contenu);

            if (withFooter) // La page a un footer
            {
                mythis.elementTooltip.addClass("xxTooltip_AvecFooter");

                let footerCustom: xDiv = new xDiv({ class: "xxTooltip_Box_Footer" });

                footerCustom.asHolder.append(mythis.lesOption.contenuFooter);

                toSender.append(footerCustom);
            }

        }
        else
        {
            toSender = mythis.ToolTip_Box_Contenu;
        }
        
        return toSender;
    }

    public setDisabled(disabled: boolean)
    {
        let myThis: xxToolTip = this;

        if (disabled)
            myThis.lesOption.disabled = true;
        else
            myThis.lesOption.disabled = false;
    }

    /**
    * Permet d'afficher la tootip
    */
    public ShowTooltip()
    {
        let mythis: xxToolTip = this;

        if (mythis.lesOption.disabled != null && mythis.lesOption.disabled)
            return;

        // function executée à l'affichage
        if (mythis.lesOption.onShow != undefined)
            mythis.lesOption.onShow(mythis);

        mythis.isShow = true;

        mythis.refreshClass();

        // Save de la tooltip ouverte
        if (!mythis.lesOption.isIndependenteToolTip)
        {
            if (xxToolTip.TooltipOuvert != null && xxToolTip.TooltipOuvert != mythis)
                xxToolTip.TooltipOuvert.HideTooltip();
            xxToolTip.TooltipOuvert = mythis;
        }

        if (!mythis.lesOption.NotAbsoluteTooltip)
            // Calcul de la position
            mythis.CalculPosition();

        // function executée après l'affichage
        if (mythis.lesOption.afterShow != undefined)
            mythis.lesOption.afterShow(mythis);

    }
    /**
    * Permet de cacher la tooltip
    */
    public async HideTooltip()
    {
        let mythis: xxToolTip = this;

        // function executée avant la disparition
        if (mythis.lesOption.beforeHide != undefined)
            await mythis.lesOption.beforeHide(mythis);

        mythis.isShow = false;
        mythis.refreshClass();

        // Si la tooltip Save est la tooltip actuellement ouverte, on set null la Save
        if (!mythis.lesOption.isIndependenteToolTip)
        {
            if (xxToolTip.TooltipOuvert == mythis)
                xxToolTip.TooltipOuvert = null;            
        }

        // function executée à la disparition
        if (mythis.lesOption.onHide != undefined)
            mythis.lesOption.onHide(mythis);
    }
    public ToggleToolTip()
    {
        let mythis: xxToolTip = this;
        if (mythis.isShow)
        {
            mythis.HideTooltip();
        }
        else
        {
            mythis.ShowTooltip();
        }
    }
 
    /**
    * Permet de calculer et positionner la tooltip
    */
    public CalculPosition()
    {
        let mythis: xxToolTip = this;

        // Reset css
        mythis.Tooltip_Box_Event.removeClass("xxToolTip_overload");
        mythis.ToolTip_Box_Contenu.y.style.height = "";
        mythis.ToolTip_Box_Contenu.y.style.width = "";

        // Taille Fix
        if (mythis.lesOption.ToolTipHeigthFix > 30)
        {
            mythis.ToolTip_Box_Contenu.y.style.height = mythis.lesOption.ToolTipHeigthFix + "px";
            mythis.Tooltip_Box_Event.addClass("xxToolTip_overload");
        }
        if (mythis.lesOption.ToolTipWidthFix > 30)
        {
            mythis.ToolTip_Box_Contenu.y.style.width = mythis.lesOption.ToolTipWidthFix + "px";
        }

        // Taille Fleche
        let TailleFleche: number = mythis.lesOption.WithoutFleche ? 0 : 10;
        let DecalageFleche: number = mythis.lesOption.WithoutFleche ? 0 : 26;

        // si la tooltip c'est mis en extrémité
        let isExtremityPosition: boolean = false;

        // Si on souhaite le mode center en height on force le mode extremity
        if (mythis.positionHeightSouhaite == enumXxToolTipPositionHeight.center)
        {
            mythis.lesOption.ToolTipPosition_by_Width_extremity = true;
        }

        // ****************************************************************************** //
        // ***** Calcul Position ExtremiteGauche/gauche/centre/droit/ExtremiteDroit ***** //
        // ****************************************************************************** //
        // Taille max de la tooltipBox en width
        mythis.ToolTip_Box_Contenu.y.style.maxWidth = ((80 * window.innerWidth) / 100).toString() + "px"; // On fix une taille max qui est de 80% de la taille de l'ecran

        // Valeur ElementPrincipal
        let marginLeft: string = mythis.lesOption.initContent.y.style.marginLeft.replace(/\D/g, '');
        let marginRight: string = mythis.lesOption.initContent.y.style.marginRight.replace(/\D/g, '');

        if (marginLeft == "")
            marginLeft = "0";

        if (marginRight == "")
            marginRight = "0";

        //let OffSetLeft: number = mythis.elementPrincipal.x.offset().left + parseInt(marginLeft);
        let OffSetLeft: number = mythis.elementPrincipal.y.getBoundingClientRect().left + parseInt(marginLeft);
        let TailleWidth: number = <number>mythis.elementPrincipal.width() - (parseInt(marginLeft) + parseInt(marginRight));
        let placewidthRight: number = window.innerWidth - (OffSetLeft + TailleWidth);

        // Taille de la box depassant de chaque coté de l'elementPrincipal dans une configuration central
        let widthToolBoxDivised: number = (<number>mythis.Tooltip_Box_Event.width() - TailleWidth) / 2;

        // Taille de l'elementPrincipal Diviser ou pas (celon si il y a la fleche) 
        let widthElementPrincipal: number = mythis.lesOption.WithoutFleche ? TailleWidth : (TailleWidth / 2);

        // teste de place
        let HavePlaceForCenter: boolean = !mythis.lesOption.ToolTipPositionWidthNeverCenter
            && !mythis.lesOption.ToolTipPosition_by_Width_extremity// Si on veux placer sur les extrémités on ne peut pas le mettre au centre en width
            && placewidthRight > widthToolBoxDivised
            && OffSetLeft > widthToolBoxDivised;

        // Si il y a de la place a l'extremité Droite
        let HavePlaceForRightExtremity: boolean = placewidthRight > (<number>mythis.Tooltip_Box_Event.width() + TailleFleche) && mythis.lesOption.ToolTipPosition_by_Width_extremity;
        // Si il y a de la place a l'extremité Droite ou juste a droite (Par rapport a l'elementPrencipal)
        let HavePlaceForRight: boolean = (placewidthRight + widthElementPrincipal) > (<number>mythis.Tooltip_Box_Event.width()) || HavePlaceForRightExtremity;

        // Si il y a de la place a l'extremité gauche
        let HavePlaceForLeftExtremity: boolean = OffSetLeft > (<number>mythis.Tooltip_Box_Event.width() + TailleFleche) && mythis.lesOption.ToolTipPosition_by_Width_extremity;
        // Si il y a de la place a l'extremité gauche ou juste a gauche (Par rapport a l'elementPrencipal)
        let HavePlaceForLeft: boolean = (OffSetLeft + widthElementPrincipal) > (<number>mythis.Tooltip_Box_Event.width()) || HavePlaceForLeftExtremity;

        let isNotDroite: boolean = mythis.positionWidthSouhaite != enumXxToolTipPositionWidth.droite && mythis.positionWidthSouhaite != enumXxToolTipPositionWidth.extremiteDroite;
        let isNotGauche: boolean = mythis.positionWidthSouhaite != enumXxToolTipPositionWidth.gauche && mythis.positionWidthSouhaite != enumXxToolTipPositionWidth.extremiteGauche;

        // si il y a de place pour mettre au centre 
        // ET que l'on ne souhaité pas le mettre a droite ET on ne pas souhaité pas le mettre a gauche OU on n'a pas la place a gauche
        // OU on ne pas souhaité pas le mettre a gauche ET on n'a pas la place a droite
        if (HavePlaceForCenter
            && ((isNotDroite && (isNotGauche || !HavePlaceForLeft))
                || (isNotGauche && !HavePlaceForRight))) 
        {
            mythis.Tooltip_Box_Event.y.style.left = OffSetLeft - widthToolBoxDivised + "px";
            mythis.positionWidth = enumXxToolTipPositionWidth.center;
        }
        // Sinon Si il y a de la place a gauche ET on ne souhaité pas le mettre a droite OU on n'a pas la place a droite
        else if (HavePlaceForLeft && (isNotDroite || !HavePlaceForRight))
        {
            // Si on n'ai pas en mode de position par extremity ET que l'on ne souhaite pas mettre a l'extremité gauche ET qu'il n'y a pas la place a  l'extremité gauche
            if (!mythis.lesOption.ToolTipPosition_by_Width_extremity && (mythis.positionWidthSouhaite != enumXxToolTipPositionWidth.extremiteGauche || !HavePlaceForLeftExtremity))
            {
                mythis.Tooltip_Box_Event.y.style.left = ((OffSetLeft -<number> mythis.Tooltip_Box_Event.width()) + (widthElementPrincipal + DecalageFleche)).toString() + "px";
                mythis.positionWidth = enumXxToolTipPositionWidth.gauche;
            }
            else
            {
                mythis.Tooltip_Box_Event.y.style.left = (OffSetLeft - (<number>mythis.Tooltip_Box_Event.width() + TailleFleche)).toString() + "px";
                mythis.positionWidth = enumXxToolTipPositionWidth.extremiteGauche;
                isExtremityPosition = true;
            }
        }
        // Sinon Si il y a de la place a droite
        else if (HavePlaceForRight)
        {
            // Si on n'ai pas en mode de position par extremity ET que l'on ne souhaite pas mettre a l'extremité droite ou qu'il n'y a pas la place a  l'extremité droite
            if (!mythis.lesOption.ToolTipPosition_by_Width_extremity && (mythis.positionWidthSouhaite != enumXxToolTipPositionWidth.extremiteDroite || !HavePlaceForRightExtremity))
            {
                mythis.Tooltip_Box_Event.y.style.left = (OffSetLeft + (mythis.lesOption.WithoutFleche ? 0 : (widthElementPrincipal - DecalageFleche))).toString() + "px";
                mythis.positionWidth = enumXxToolTipPositionWidth.droite;
            }
            else
            {
                mythis.Tooltip_Box_Event.y.style.left = (OffSetLeft + (TailleWidth + TailleFleche)).toString() + "px";
                mythis.positionWidth = enumXxToolTipPositionWidth.extremiteDroite;
                isExtremityPosition = true;
            }
        }
        else // Mode affichage overload
        {
            // Test quelle emplacement a le plus de place
            if (placewidthRight > OffSetLeft) // droite
            {
                mythis.ToolTip_Box_Contenu.y.style.width = (placewidthRight - 100).toString() + "px";
                if (!mythis.lesOption.ToolTipPosition_by_Width_extremity && mythis.positionWidthSouhaite != enumXxToolTipPositionWidth.extremiteDroite)
                {
                    mythis.Tooltip_Box_Event.y.style.left = (OffSetLeft + (mythis.lesOption.WithoutFleche ? 0 : (widthElementPrincipal - DecalageFleche))).toString() + "px";
                    mythis.positionWidth = enumXxToolTipPositionWidth.droite;
                }
                else
                {
                    mythis.Tooltip_Box_Event.y.style.height = (OffSetLeft + (TailleWidth + TailleFleche)).toString() + "px";
                    mythis.positionWidth = enumXxToolTipPositionWidth.extremiteDroite;
                    isExtremityPosition = true;
                }
            }
            else // gauche
            {
                mythis.ToolTip_Box_Contenu.y.style.height = (OffSetLeft - 100).toString() + "px";

                if (!mythis.lesOption.ToolTipPosition_by_Width_extremity && mythis.positionWidthSouhaite != enumXxToolTipPositionWidth.extremiteGauche)
                {
                    mythis.Tooltip_Box_Event.y.style.left = ((OffSetLeft -<number> mythis.Tooltip_Box_Event.width()) + (widthElementPrincipal + DecalageFleche)).toString() + "px";
                    mythis.positionWidth = enumXxToolTipPositionWidth.gauche;
                }
                else
                {
                    mythis.Tooltip_Box_Event.y.style.left = (OffSetLeft - (<number>mythis.Tooltip_Box_Event.width() + TailleFleche)).toString() + "px";
                    mythis.positionWidth = enumXxToolTipPositionWidth.extremiteGauche;
                    isExtremityPosition = true;
                }
            }
        }

        // ******************************************* //
        // ***** Calcul position Haut/center/Bas ***** //
        // ******************************************* //
        // Valeur ElementPrincipal
        let marginTop: string = mythis.lesOption.initContent.y.style.marginTop.replace(/\D/g, '');
        let marginBot: string = mythis.lesOption.initContent.y.style.marginBottom.replace(/\D/g, '');

        if (marginTop == "")
            marginTop = "0";

        if (marginBot == "")
            marginBot = "0";

        //let OffSetTop: number = mythis.elementPrincipal.x.offset().top + parseInt(marginTop);
        let OffSetTop: number = mythis.elementPrincipal.y.getBoundingClientRect().top + parseInt(marginTop);
        let TailleHeight: number = <number>mythis.elementPrincipal.height() - (parseInt(marginTop) + parseInt(marginBot));
        let placeheightBot: number = window.innerHeight - (OffSetTop + TailleHeight); // Calcul de la place en Bas
        let TailleHeaderTooltip: number = <number>mythis.Tooltip_Box_Event.height() - <number>mythis.ToolTip_Box_Contenu.height();

        // Taille de la box depassant de chaque coté de l'elementPrincipal dans une configuration central
        let heigthToolBoxDivised: number = (<number>mythis.Tooltip_Box_Event.height() - TailleHeight) / 2;

        // Taille de l'elementPrincipal Diviser ou pas (celon si il y a la fleche) 
        let heigthElementPrincipal: number = mythis.lesOption.WithoutFleche ? TailleHeight : (TailleHeight / 2);

        // teste de place
        let HavePlaceForCenterHeight: boolean = !mythis.lesOption.ToolTipPosition_Heigth_NeverCenter 
            && isExtremityPosition // Si on est sur les extremité on peut mettre au centre en height
            && placeheightBot > heigthToolBoxDivised
            && OffSetTop >  heigthToolBoxDivised;

        // Si il y a de la place a l'extremité bot
        let havePlaceBotExtremity: boolean = (placeheightBot + heigthElementPrincipal) > (<number>mythis.Tooltip_Box_Event.height()) && isExtremityPosition;
        let havePlaceBot: boolean = placeheightBot > (<number>mythis.Tooltip_Box_Event.height() + TailleFleche) || havePlaceBotExtremity; 
         // Si il y a de la place a l'extremité top
        let havePlaceTopExtremity: boolean = (OffSetTop - heigthElementPrincipal) > (<number>mythis.Tooltip_Box_Event.height()) && isExtremityPosition;
        let havePlaceTop: boolean = OffSetTop > (<number>mythis.Tooltip_Box_Event.height() + TailleFleche) || havePlaceTopExtremity; 

        // si il y a de place pour mettre au centre 
        // ET que l'on ne souhaite pas le place en bas ET que l'on ne souhaite pas le place en haut ou qui n'y a pas de place en haut
        // OU on ne pas souhaité pas le mettre a haut ET on n'a pas la place a bas
        if (HavePlaceForCenterHeight
            && ((mythis.positionHeightSouhaite != enumXxToolTipPositionHeight.bas && (mythis.positionHeightSouhaite != enumXxToolTipPositionHeight.haut || !havePlaceTop))
            || (mythis.positionHeightSouhaite != enumXxToolTipPositionHeight.haut && !havePlaceBot))) 
        {
            mythis.Tooltip_Box_Event.y.style.top = (OffSetTop - heigthToolBoxDivised).toString() + "px";
            mythis.positionHeight = enumXxToolTipPositionHeight.center;
        }
        // Sinon Si il y a de la place en bas ET on ne souhaité pas le mettre a haut OU on n'a pas la place a haut
        else if (havePlaceBot && (mythis.positionHeightSouhaite != enumXxToolTipPositionHeight.haut || !havePlaceTop))
        {
            mythis.positionHeight = enumXxToolTipPositionHeight.bas;

            // si on est pas a l'extremité gauche ou droite
            if (!isExtremityPosition)
                mythis.Tooltip_Box_Event.y.style.top = (OffSetTop + TailleHeight + TailleFleche).toString() + "px";
            else
                mythis.Tooltip_Box_Event.y.style.top = (OffSetTop + (mythis.lesOption.WithoutFleche ? 0 : (heigthElementPrincipal - DecalageFleche))).toString() + "px";
        }
        // Sinon Si il y a de la place en haut
        else if (havePlaceTop)
        {
            mythis.positionHeight = enumXxToolTipPositionHeight.haut;

            // si on est pas a l'extremité gauche ou droite
            if (!isExtremityPosition)
                mythis.Tooltip_Box_Event.y.style.top = (OffSetTop - (<number>mythis.Tooltip_Box_Event.height() + TailleFleche)).toString() + "px";
            else
                mythis.Tooltip_Box_Event.y.style.top = ((OffSetTop - <number>mythis.Tooltip_Box_Event.height()) + (heigthElementPrincipal + DecalageFleche)).toString() + "px";
        }
        else // Mode affichage overload
        {
            // Test quelle emplacement a le plus de place
            if (placeheightBot > OffSetTop)
            {
                mythis.ToolTip_Box_Contenu.y.style.height = (placeheightBot - TailleHeaderTooltip - 100).toString() + "px";

                if (!isExtremityPosition)
                    mythis.Tooltip_Box_Event.y.style.top = (OffSetTop + TailleHeight + TailleFleche).toString() + "px";
                else
                    mythis.Tooltip_Box_Event.y.style.top = (OffSetTop + (mythis.lesOption.WithoutFleche ? 0 : (heigthElementPrincipal - DecalageFleche))).toString() + "px";

                mythis.positionHeight = enumXxToolTipPositionHeight.bas;
            }
            else
            {
                mythis.ToolTip_Box_Contenu.y.style.height = (OffSetTop - TailleHeaderTooltip - 100).toString() + "px";

                if (!isExtremityPosition)
                    mythis.Tooltip_Box_Event.y.style.top = (OffSetTop - (<number>mythis.Tooltip_Box_Event.height() + TailleFleche)).toString() + "px";
                else
                    mythis.Tooltip_Box_Event.y.style.top = ((OffSetTop - <number>mythis.Tooltip_Box_Event.height()) + (heigthElementPrincipal + DecalageFleche)).toString() + "px";

                mythis.positionHeight = enumXxToolTipPositionHeight.haut;
            }
            mythis.Tooltip_Box_Event.addClass("xxToolTip_overload");
        }


        // Refresh des class variable
        mythis.refreshClass();
    }

    // Methode Class tooltip
    private get visibleClass(): string
    {
        let mythis: xxToolTip = this;

        if (mythis.isShow)
        { return "xxTooltipOn"; }
        else
        { return "xxTooltipOff"; }
    }
    private get PositionClass(): string
    {
        return "positionH_" + enumXxToolTipPositionHeight[this.positionHeight] + " positionW_" + enumXxToolTipPositionWidth[this.positionWidth];
    }
    private refreshClass()
    {
        let mythis: xxToolTip = this;

        mythis.elementTooltip.removeClass("xxTooltipOn");
        mythis.elementTooltip.removeClass("xxTooltipOff");
        mythis.elementTooltip.addClass(mythis.visibleClass);
            
        if (!mythis.lesOption.NotAbsoluteTooltip)
        {
            mythis.elementTooltip.removeClass("positionH_haut");
            mythis.elementTooltip.removeClass("positionH_center");
            mythis.elementTooltip.removeClass("positionH_bas");
            mythis.elementTooltip.removeClass("positionW_droite");
            mythis.elementTooltip.removeClass("positionW_center");
            mythis.elementTooltip.removeClass("positionW_gauche");
            mythis.elementTooltip.removeClass("positionW_extremiteDroite");
            mythis.elementTooltip.removeClass("positionW_extremiteGauche");
            mythis.elementTooltip.addClass(mythis.PositionClass)
            //mythis.elementTooltip.addClass();
        }
    }

    public width(parame?: string | number): void | number {
        let myThis: xxToolTip = this;
        return myThis.elementPrincipal.width(parame);
    }

    public height(parame?: string | number): void | number {
        let myThis: xxToolTip = this;
        return myThis.elementPrincipal.height(parame);
    }
    public get y() {
        return this.elementPrincipal.y;
    }
}

class xxToolTipBouton implements iXElement
{
    // --------- //
    // Attributs //
    // --------- //
    private ToolTip: xxToolTip;
    private Bouton: xxBouton;

    // ----------- //
    // Constructor //
    // ----------- //
    constructor(o: OptionsTooltipBouton)
    {
        let mythis: xxToolTipBouton = this;

        // Création du bouton
        let optionBt: optionButton = {
            id: ((o.id != null && o.id != "") ? "TooltipBt_#" + o.id : ""),
            class: ((o.class != null && o.class != "") ? "Tooltip_Bt_" + o.class : ""),
            //border: o.border,
            optionsAffichage: {
                tailleBouton: o?.optionsAffichageBouton?.tailleBouton ?? null,
                positionIconeBouton: o?.optionsAffichageBouton?.positionIconeBouton ?? null,
            },
            titleLocalise: o.titleLocalise,
            titleVariable: o.titleVariable,
            textVariable: o.textVariable,
            textLocalise: o.textLocalise,
            icone: o.icone,
            //espaceMinimaliste: o.espaceMinimaliste,
            click: (e) =>
            {
                mythis.ToolTip.ToggleToolTip();
                e();
            },
            confirm: {
                comportement: enumComportementBouton.Standard
            }
        };

        mythis.Bouton = new xxBouton(optionBt);

        // Création de la tooltip
        let opitonTooltip: OptionsToolTip = {
            id: o.id,
            class: o.class,
            titreHeaderLocalise: o.titreHeaderLocalise,
            titreHeaderVariable: o.titreHeaderVariable,
            renderCustomHeader: o.renderCustomHeader,
            onHide: o.onHide,
            onShow: o.onShow,
            initContent: mythis.Bouton,
            TooltipStopPropagation: o.TooltipStopPropagation,
            toolTipContent: o.toolTipContent,
            ToolTipPositionHeightSouhaite: o.ToolTipPositionHeightSouhaite,
            ToolTipPositionWidthSouhaite: o.ToolTipPositionWidthSouhaite,
            ToolTipPosition_by_Width_extremity: o.ToolTipPosition_by_Width_extremity,
            ToolTipPositionWidthNeverCenter: o.ToolTipPositionWidthNeverCenter,
            ToolTipPosition_Heigth_NeverCenter: o.ToolTipPosition_Heigth_NeverCenter,
            ToolTipHeigthFix: o.ToolTipHeigthFix,
            ToolTipWidthFix: o.ToolTipWidthFix,
            WithoutFleche: o.WithoutFleche,
            NotAbsoluteTooltip: o.NotAbsoluteTooltip,
            isIndependenteToolTip: o.isIndependenteToolTip
        };

        if (o.WithOutBackGround)
            opitonTooltip.TooltipMode = enumXxToolTipMode.Manuel_WithOut_BackGround;
        else
            opitonTooltip.TooltipMode = enumXxToolTipMode.Manuel;

        mythis.ToolTip = new xxToolTip(opitonTooltip);



        if (o.optionsAffichage != undefined)
        {
            xStyle.AppliquerOptionsAffichage(mythis.Bouton, o.optionsAffichage);
        }
    }

    // ------- //
    // Methode //
    // ------- //
    public get GetTooltip()
    {
        return this.ToolTip;
    }

  
    public get y() {
        return this.ToolTip.y;
    }

    public setIcone(icone: Icone) {
        let myThis: xxToolTipBouton = this;

        myThis.Bouton.setIcone(icone);
    }

    public setText(test: string)
    {
        let myThis: xxToolTipBouton = this;
        myThis.Bouton.changerText(test);
    }

    public addClass(c: string):xxToolTipBouton {
        let myThis: xxToolTipBouton = this;
        myThis.ToolTip.addClass(c);
        return myThis;

    }
    public removeClass(c: string):xxToolTipBouton {
        let myThis: xxToolTipBouton = this;
        myThis.ToolTip.removeClass(c);
        return myThis;
    }
}