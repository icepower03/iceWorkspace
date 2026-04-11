
enum enumBoxerMode { standard = 1, maximize = 2, pleinePage = 3 }

enum enumBoxerTaille { s = 1, m = 2, l = 3, xl = 4, fit = 5 }

enum enumPositionOrigine
{
    top_left,
    top_right,
    bottom_left,
    bottom_right
}

interface OptionsBoxer extends iTestable {

    id?: string;
    class?: string;
    initContent?: iXElement;
    beforeClose?: (fermerDefinitivement:()=>void) => void;
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


class xxBoxer implements iXElement {
  
    public get y(): HTMLElement { return this.divPrincipal.y; }


    private divPrincipal: xDiv;
    private divPlexiglas: xDiv;
    private divBtn: xDiv;
    private contenuHolder: xDiv;
    private visible: boolean = false;
    private modeAffichage: enumBoxerMode;
    private modeModal: boolean;
    private sansBtnClose: boolean = false;
    private tailleBoxer: enumBoxerTaille;
    private positionOrigine?: enumPositionOrigine;
    private positionVerticale?: number;
    private positionHorizontale?: number;
    private IsNonPersistent: boolean = false;

    public vider(): xxBoxer {
        this.contenuHolder.vider();
        return this;
    }

    public SupprimerBoxer(): void
    {
        let mythis: xxBoxer = this;

        if (mythis.divPrincipal != null)
        {
            mythis.divPrincipal.y.remove();
            mythis.divPrincipal = null;
        }
    }

    private get boxerModeClass(): string {
        if (this.modeAffichage == enumBoxerMode.maximize) {
            return "xxBoxerDisplayMaximize";
        }
        if (this.modeAffichage == enumBoxerMode.pleinePage)
        {
            return "xxBoxerDisplayPleinePage";
        }
        return "xxBoxerDisplayStandard";
    }

    private get boxerSizeClass(): string {
        let myThis: xxBoxer = this;
        let classChosi: string = "";

        switch (myThis.tailleBoxer) {
            case enumBoxerTaille.s:
                classChosi = 'Boxer_S'
                break;
            case enumBoxerTaille.m:
                classChosi = 'Boxer_M'
                break;
            case enumBoxerTaille.l:
                classChosi = 'Boxer_L'
                break;
            case enumBoxerTaille.xl:
                classChosi = 'Boxer_XL'
                break;
            case enumBoxerTaille.fit:
                classChosi = "Boxer_Fit";
                break;
        }
        return classChosi;
    }

    private get visibleClass(): string {
        if (this.visible)
        { return "xxBoxerOn"; }
        else
        { return "xxBoxerOff"; }
    }

    private refreshClass() 
    {
        let myThis: xxBoxer = this;

        if (myThis.divPrincipal != null)
        {
            myThis.divPrincipal
                .removeClass("xxBoxerOn xxBoxerOff")
                .addClass(myThis.visibleClass)
                .removeClass("xxBoxerDisplayMaximize xxBoxerDisplayPleinePage xxBoxerDisplayStandard")
                .addClass(myThis.boxerModeClass)
                .removeClass('Boxer_S Boxer_M Boxer_L Boxer_XL Boxer_Fit')
                .addClass(myThis.boxerSizeClass);
        }

        if (myThis.positionOrigine != undefined)
        {
            myThis.affecterPositionOrigine();
        }
    }
    public afficher():xxBoxer {
        let myThis: xxBoxer = this;

        if (myThis.beforeShow != undefined) {
            myThis.beforeShow(myThis);
        }

        if (myThis.divPrincipal != null)
        {
            myThis.visible = true;
            myThis.refreshClass();
        }
        else
        {
            console.error("xxBoxer = this Boxer has been removed");
        }

        return myThis;
    }

    // annuler le beforeClose pour ne pas boucler dans fermer()
    //public annulerBeforeClose(): xxBoxer {
    //    let myThis: xxBoxer = this;

    //    myThis.beforeClose = undefined;
    //    return myThis;
    //}

    public fermerWithoutBeforeClose(): xxBoxer
    {
        let myThis: xxBoxer = this;

        myThis.visible = false;
        myThis.refreshClass();

        if (myThis.afterClose != undefined)
        {
            myThis.afterClose(myThis);
        }

        if (myThis.IsNonPersistent)
            myThis.SupprimerBoxer();

        return myThis;
    }

    public fermer():xxBoxer {
        let myThis: xxBoxer = this;

        if (myThis.beforeClose != undefined) {
            myThis.beforeClose(() => { myThis.fermerWithoutBeforeClose(); });
            return myThis;
        }

        myThis.visible = false;
        myThis.refreshClass();

        if (myThis.afterClose != undefined) {
            myThis.afterClose(myThis);
        }

        if (myThis.IsNonPersistent)
            myThis.SupprimerBoxer();

        return myThis;
    }

    public toggleAgrandir() :xxBoxer{
        let myThis: xxBoxer = this;
        if (myThis.modeAffichage == null || myThis.modeAffichage == enumBoxerMode.standard)
        { myThis.modeAffichage = enumBoxerMode.maximize; }
        else
        { myThis.modeAffichage = enumBoxerMode.standard; }
        myThis.refreshClass();
        return myThis;
    }

    public setBoxerMode(mode: enumBoxerMode)
    {
        let myThis: xxBoxer = this;
        myThis.modeAffichage = mode;
        myThis.refreshClass();
    }

    public changerTaille(taille: enumBoxerTaille) :xxBoxer {
        let myThis: xxBoxer = this;

        if (taille != myThis.tailleBoxer) {
            myThis.tailleBoxer = taille;
            myThis.refreshClass();
        }

        return myThis;
    }

    public ajouterContenu(ajout: iXElement):xxBoxer {
        this.contenuHolder.asHolder.append(ajout);
        return this;
    }

    private beforeClose: (fermerDefinitivement: () => void) => void;
    private afterClose: (myBoxer: xxBoxer) => void;
    private beforeShow: (myBoxer: xxBoxer) => void;

    private affecterPositionOrigine()
    {
        let myThis: xxBoxer = this;
        let libelleOrigineVerticale: string;
        let libelleOrigineHorizontale: string;
        let classChosi: string = "";

        switch (myThis.positionOrigine)
        {
            case enumPositionOrigine.top_left:
                myThis.divBtn.y.style.top = (myThis.positionVerticale) + "px";
                myThis.divBtn.y.style.left = (myThis.positionHorizontale) + "px";
                myThis.divPrincipal.addClass("Origine_Top_Left");

                break;
            case enumPositionOrigine.top_right:
                myThis.divBtn.y.style.top = (myThis.positionVerticale) + "px";
                myThis.divBtn.y.style.right = (myThis.positionHorizontale) + "px";
                myThis.divPrincipal.addClass("Origine_Top_Right");
                break;
            case enumPositionOrigine.bottom_left:
                myThis.divBtn.y.style.bottom = (myThis.positionVerticale) + "px";
                myThis.divBtn.y.style.left = (myThis.positionHorizontale) + "px";
                myThis.divPrincipal.addClass("Origine_Bottom_Left");
                break;
            case enumPositionOrigine.bottom_right:
                myThis.divBtn.y.style.bottom = (myThis.positionVerticale) + "px";
                myThis.divBtn.y.style.right = (myThis.positionHorizontale) + "px";
                myThis.divPrincipal.addClass("Origine_Bottom_Right");
                break;
        }
    }

    constructor(o: OptionsBoxer) {
        let myThis: xxBoxer = this;
        if (o == undefined)
        { o = {}; }

        //par defaut mode non modal ( donc on peut fermer en cliquant en dehors)
        if (o.modal == undefined)
        { myThis.modeModal = false; }
        else
        { myThis.modeModal = o.modal; }
        if (o.sansBtnClose != undefined)
        { myThis.sansBtnClose = o.sansBtnClose; }

        if (o.beforeClose != undefined)
        { myThis.beforeClose = o.beforeClose; }

        if (o.afterClose != undefined)
        { myThis.afterClose = o.afterClose; }

        if (o.beforeShow != undefined)
        { myThis.beforeShow = o.beforeShow; }

        if (o.class == undefined)
        { o.class = ""; }

        if (o.positionOriginie != undefined)
        {
            myThis.positionOrigine = o.positionOriginie;
        }

        if (o.positionVerticale != undefined)
        {
            myThis.positionVerticale = o.positionVerticale;
        }

        if (o.positionHorizontale != undefined)
        {
            myThis.positionHorizontale = o.positionHorizontale;
        }

        if (o.nonPersistent != undefined)
        {
            myThis.IsNonPersistent = o.nonPersistent;
        }

        if (o.ModeAffichage != undefined)
        {
            myThis.modeAffichage = o.ModeAffichage;
        } else
            myThis.modeAffichage = enumBoxerMode.standard;

        myThis.divPrincipal = new xDiv({
            idTest: o.idTest, id: o.id, class: "xxBoxerContainer " + o.class
        });

        myThis.divPlexiglas = new xDiv({
            class: "xxBoxerBackground", click: function () {
                if (!myThis.modeModal) {
                    myThis.fermer();
                }
            }
        });

        //myThis.divPlexiglas.x.toggleClass("", myThis.modeModal);
        myThis.divPrincipal.toggleClass ("xxBoxerBackgroundIncassable", myThis.modeModal);

        myThis.divBtn = new xDiv({ class: "xxBoxer" });
        let myDockHeader: Container<xxDockPanelDeprecated> = new Container<xxDockPanelDeprecated>();
        myThis.divBtn.asHolder.xxDockPanelDeprecated({ class: "xxBoxerHeader", centrerDernier: true }, myDockHeader);


        if (!myThis.sansBtnClose)
        {
            let myWrapBouton: xxWrapPanel = new xxWrapPanel({ class: "xxBoxerWrapBouton" });
            let boutonToggleAgrandir = new xxBouton({
                titleLocalise: 'Agrandir/réduire',
                class: "boxerDockButton",
                click: function (cb) {
                    myThis.toggleAgrandir();
                    if (myThis.modeAffichage == enumBoxerMode.maximize)
                        boutonToggleAgrandir.setIcone(new IconeCs3i(enumIconeCs3i.action_reduire));
                    if (myThis.modeAffichage == enumBoxerMode.standard)
                        boutonToggleAgrandir.setIcone(new IconeCs3i(enumIconeCs3i.action_agrandir));
                   cb();
                },
                icone: new IconeMiniCs3i(myThis.modeAffichage == enumBoxerMode.maximize ? enumIconeCs3i.action_reduire : enumIconeCs3i.action_agrandir),
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
            });
            myWrapBouton.append(boutonToggleAgrandir);
            myWrapBouton.append(new xxBouton({
                id: o.id + "_btn_fermer",
                titleLocalise: 'Fermer', class: "boxerDockButton", click: function (cb) {
                    myThis.fermer();
                    cb();
                },
                icone: new IconeMiniCs3i(enumIconeCs3i.action_annuler),
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
            }));

            myDockHeader.content.append(myWrapBouton, DockPosition.droite);
        }

        if (!(o.titleLocalise == undefined && o.titleLocalise == undefined)) {
            myDockHeader.content.ajouterDernier(new xxLabel({ textLocalise: o.titleLocalise, textVariable: o.titleVariable, class: "xxLabelTitreBoxer" }), DockPosition.gauche);
        }
        else
        { myDockHeader.content.ajouterDernier(new xDiv(), DockPosition.gauche); }

        myThis.contenuHolder = new xDiv({ class: "xxBoxerContent" });
        if (o.initContent != undefined) {
            myThis.ajouterContenu(o.initContent);
        }

        if (o.tailleBoxer != undefined) {
            myThis.tailleBoxer = o.tailleBoxer;
        }     

        if (o.optionsAffichage != undefined)
            xStyle.AppliquerOptionsAffichage(myThis.contenuHolder, o.optionsAffichage);


        myThis.divPrincipal.asHolder.append(myThis.divPlexiglas);
        myThis.divPrincipal.asHolder.append(myThis.divBtn);

        myThis.divBtn.asHolder.append(myThis.contenuHolder);

        //j'active les bonnes classes en fonction des paramètres mis pendant l'init
        myThis.refreshClass();

        xOutils.attachToBody(myThis.y);
    }
}


class xxBoxerPage extends xxBoxer
{
    private myPage: xxPageWrapper;

    constructor(o: OptionsPage, obox: OptionsBoxer=null)
    {
        let page = new xxPageWrapper(o);

        if (obox == null)
            obox = { initContent: page };
        else
            obox.initContent = page;

        super(obox);

        let mythis: xxBoxerPage = this;
        mythis.myPage = page;

    }

    public get Page(): xxPageWrapper { return this.myPage;}

}