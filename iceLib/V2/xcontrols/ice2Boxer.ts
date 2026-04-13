// @ts-nocheck
import { iXElement, iXElementHolder, optionsAffichage, iTestable, enumPosition } from '../iceBase';
import { iceDiv } from './iceDiv';
import { iceStyle } from './iceStyle';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';
import { ice2Label } from './ice2Label';
import { Icone, enumIconeP12, IconeP12, IconeMiniP12 } from '../iceIcones';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2PageWrapper } from './ice2PageWrapper';
import { DockPosition } from './ice2DockPanel';

export enum enumBoxerMode { standard = 1, maximize = 2, pleinePage = 3 }

export enum enumBoxerTaille { s = 1, m = 2, l = 3, xl = 4, fit = 5 }

export enum enumPositionOrigine
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
    afterClose?: (myBoxer: ice2Boxer) => void;
    beforeShow?: (myBoxer: ice2Boxer) => void;
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


export class ice2Boxer implements iXElement {
  
    public get y(): HTMLElement { return this.divPrincipal.y; }


    private divPrincipal: iceDiv;
    private divPlexiglas: iceDiv;
    private divBtn: iceDiv;
    private contenuHolder: iceDiv;
    private visible: boolean = false;
    private modeAffichage: enumBoxerMode;
    private modeModal: boolean;
    private sansBtnClose: boolean = false;
    private tailleBoxer: enumBoxerTaille;
    private positionOrigine?: enumPositionOrigine;
    private positionVerticale?: number;
    private positionHorizontale?: number;
    private IsNonPersistent: boolean = false;

    public vider(): ice2Boxer {
        this.contenuHolder.vider();
        return this;
    }

    public SupprimerBoxer(): void
    {
        let mythis: ice2Boxer = this;

        if (mythis.divPrincipal != null)
        {
            mythis.divPrincipal.y.remove();
            mythis.divPrincipal = null;
        }
    }

    private get boxerModeClass(): string {
        if (this.modeAffichage == enumBoxerMode.maximize) {
            return "ice2BoxerDisplayMaximize";
        }
        if (this.modeAffichage == enumBoxerMode.pleinePage)
        {
            return "ice2BoxerDisplayPleinePage";
        }
        return "ice2BoxerDisplayStandard";
    }

    private get boxerSizeClass(): string {
        let myThis: ice2Boxer = this;
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
        { return "ice2BoxerOn"; }
        else
        { return "ice2BoxerOff"; }
    }

    private refreshClass() 
    {
        let myThis: ice2Boxer = this;

        if (myThis.divPrincipal != null)
        {
            myThis.divPrincipal
                .removeClass("ice2BoxerOn ice2BoxerOff")
                .addClass(myThis.visibleClass)
                .removeClass("ice2BoxerDisplayMaximize ice2BoxerDisplayPleinePage ice2BoxerDisplayStandard")
                .addClass(myThis.boxerModeClass)
                .removeClass('Boxer_S Boxer_M Boxer_L Boxer_XL Boxer_Fit')
                .addClass(myThis.boxerSizeClass);
        }

        if (myThis.positionOrigine != undefined)
        {
            myThis.affecterPositionOrigine();
        }
    }
    public afficher():ice2Boxer {
        let myThis: ice2Boxer = this;

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
            console.error("ice2Boxer = this Boxer has been removed");
        }

        return myThis;
    }

    // annuler le beforeClose pour ne pas boucler dans fermer()
    //public annulerBeforeClose(): ice2Boxer {
    //    let myThis: ice2Boxer = this;

    //    myThis.beforeClose = undefined;
    //    return myThis;
    //}

    public fermerWithoutBeforeClose(): ice2Boxer
    {
        let myThis: ice2Boxer = this;

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

    public fermer():ice2Boxer {
        let myThis: ice2Boxer = this;

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

    public toggleAgrandir() :ice2Boxer{
        let myThis: ice2Boxer = this;
        if (myThis.modeAffichage == null || myThis.modeAffichage == enumBoxerMode.standard)
        { myThis.modeAffichage = enumBoxerMode.maximize; }
        else
        { myThis.modeAffichage = enumBoxerMode.standard; }
        myThis.refreshClass();
        return myThis;
    }

    public setBoxerMode(mode: enumBoxerMode)
    {
        let myThis: ice2Boxer = this;
        myThis.modeAffichage = mode;
        myThis.refreshClass();
    }

    public changerTaille(taille: enumBoxerTaille) :ice2Boxer {
        let myThis: ice2Boxer = this;

        if (taille != myThis.tailleBoxer) {
            myThis.tailleBoxer = taille;
            myThis.refreshClass();
        }

        return myThis;
    }

    public ajouterContenu(ajout: iXElement):ice2Boxer {
        this.contenuHolder.asHolder.append(ajout);
        return this;
    }

    private beforeClose: (fermerDefinitivement: () => void) => void;
    private afterClose: (myBoxer: ice2Boxer) => void;
    private beforeShow: (myBoxer: ice2Boxer) => void;

    private affecterPositionOrigine()
    {
        let myThis: ice2Boxer = this;
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
        let myThis: ice2Boxer = this;
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

        myThis.divPrincipal = new iceDiv({
            idTest: o.idTest, id: o.id, class: "ice2BoxerContainer " + o.class
        });

        myThis.divPlexiglas = new iceDiv({
            class: "ice2BoxerBackground", click: function () {
                if (!myThis.modeModal) {
                    myThis.fermer();
                }
            }
        });

        //myThis.divPlexiglas.x.toggleClass("", myThis.modeModal);
        myThis.divPrincipal.toggleClass ("ice2BoxerBackgroundIncassable", myThis.modeModal);

        myThis.divBtn = new iceDiv({ class: "ice2Boxer" });
        let myDockHeader: Container<ice2DockPanelDeprecated> = new Container<ice2DockPanelDeprecated>();
        myThis.divBtn.asHolder.ice2DockPanelDeprecated({ class: "ice2BoxerHeader", centrerDernier: true }, myDockHeader);


        if (!myThis.sansBtnClose)
        {
            let myWrapBouton: ice2WrapPanel = new ice2WrapPanel({ class: "ice2BoxerWrapBouton" });
            let boutonToggleAgrandir = new ice2Bouton({
                titleLocalise: 'Agrandir/réduire',
                class: "boxerDockButton",
                click: function (cb) {
                    myThis.toggleAgrandir();
                    if (myThis.modeAffichage == enumBoxerMode.maximize)
                        boutonToggleAgrandir.setIcone(new IconeP12(enumIconeP12.action_reduire));
                    if (myThis.modeAffichage == enumBoxerMode.standard)
                        boutonToggleAgrandir.setIcone(new IconeP12(enumIconeP12.action_agrandir));
                   cb();
                },
                icone: new IconeMiniP12(myThis.modeAffichage == enumBoxerMode.maximize ? enumIconeP12.action_reduire : enumIconeP12.action_agrandir),
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
            });
            myWrapBouton.append(boutonToggleAgrandir);
            myWrapBouton.append(new ice2Bouton({
                id: o.id + "_btn_fermer",
                titleLocalise: 'Fermer', class: "boxerDockButton", click: function (cb) {
                    myThis.fermer();
                    cb();
                },
                icone: new IconeMiniP12(enumIconeP12.action_annuler),
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
            }));

            myDockHeader.content.append(myWrapBouton, DockPosition.droite);
        }

        if (!(o.titleLocalise == undefined && o.titleLocalise == undefined)) {
            myDockHeader.content.ajouterDernier(new ice2Label({ textLocalise: o.titleLocalise, textVariable: o.titleVariable, class: "ice2LabelTitreBoxer" }), DockPosition.gauche);
        }
        else
        { myDockHeader.content.ajouterDernier(new iceDiv(), DockPosition.gauche); }

        myThis.contenuHolder = new iceDiv({ class: "ice2BoxerContent" });
        if (o.initContent != undefined) {
            myThis.ajouterContenu(o.initContent);
        }

        if (o.tailleBoxer != undefined) {
            myThis.tailleBoxer = o.tailleBoxer;
        }     

        if (o.optionsAffichage != undefined)
            iceStyle.AppliquerOptionsAffichage(myThis.contenuHolder, o.optionsAffichage);


        myThis.divPrincipal.asHolder.append(myThis.divPlexiglas);
        myThis.divPrincipal.asHolder.append(myThis.divBtn);

        myThis.divBtn.asHolder.append(myThis.contenuHolder);

        //j'active les bonnes classes en fonction des paramètres mis pendant l'init
        myThis.refreshClass();

        iceOutils.attachToBody(myThis.y);
    }
}


class ice2BoxerPage extends ice2Boxer
{
    private myPage: ice2PageWrapper;

    constructor(o: OptionsPage, obox: OptionsBoxer=null)
    {
        let page = new ice2PageWrapper(o);

        if (obox == null)
            obox = { initContent: page };
        else
            obox.initContent = page;

        super(obox);

        let mythis: ice2BoxerPage = this;
        mythis.myPage = page;

    }

    public get Page(): ice2PageWrapper { return this.myPage;}

}