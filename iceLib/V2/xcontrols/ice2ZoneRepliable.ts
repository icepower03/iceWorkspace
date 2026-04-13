// @ts-nocheck
import { iXElement, iXElementHolder } from '../iceBase';
import { iceDiv } from './iceDiv';
import { ice2StackPanel } from './ice2StackPanel';
import { ice2DockPanelDeprecated, DockPosition } from './ice2DockPanel';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';
import { Icone, enumIconeP12, IconeP12 } from '../iceIcones';

export enum enumXxZoneRepliablePosition { droite, gauche }
export enum enumXxZoneRepliableCouleurFleche {Bleu,Blanc,Noir,Perso}

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

export class ice2ZoneRepliable implements iXElement {

    private renderTitre: (ici: iXElementHolder, plier: (b: boolean) => void, refreshTitre: () => void,plie:boolean) => void;
    private renderDetail: (ici: iXElementHolder, plier: (b: boolean) => void, refreshTitre: () => void) => void
    private stackPrincipal: ice2StackPanel = null;
    private divTitre: ice2DockPanelDeprecated = null;
    private divDetail: iceDiv = null;
    private etatPlie: boolean;
    private PositionFleche: enumXxZoneRepliablePosition
    private CouleurFleche: enumXxZoneRepliableCouleurFleche;
    private IconeRepliePerso: Icone;
    private IconeDepliePerso: Icone;
    private fleche: boolean;
    private cssClasse: string;
    private noDeleteContentOnRender: boolean = false;
    private onToggleCallBack: (plie?: boolean, refreshTitre?: () => void) => void;
    private isRendered: boolean = false;

    private btnSwap: ice2Bouton;

  

    get y() { return this.stackPrincipal.y; }

    constructor(opt: OptionsZoneRepliable) {
        let myThis: ice2ZoneRepliable = this;

        myThis.renderTitre = opt.renderTitre;
        myThis.renderDetail = opt.renderDetail;
        myThis.cssClasse = (opt.class != null) ? opt.class : "";
        myThis.etatPlie = false;
        myThis.PositionFleche = enumXxZoneRepliablePosition.droite;
        myThis.CouleurFleche = enumXxZoneRepliableCouleurFleche.Bleu;
        myThis.IconeDepliePerso = opt.iconeDepliePerso;
        myThis.IconeRepliePerso = opt.iconeRepliePerso;

        myThis.onToggleCallBack = opt.onToggle;
        if (myThis.onToggleCallBack == undefined) {
            myThis.onToggleCallBack = () => { };
        }

        myThis.fleche = opt.fleche;

        if (myThis.fleche == undefined) { myThis.fleche = true; }
        if (opt.flechePosition != undefined) { myThis.PositionFleche = opt.flechePosition; }
        if (opt.CouleurFleche != undefined) { myThis.CouleurFleche = opt.CouleurFleche; }
        if (opt.plie != undefined) { myThis.etatPlie = opt.plie; }
        myThis.divTitre = new ice2DockPanelDeprecated({ class: "titreZoneRepliable" });
        if (opt.fullTitleToggle == true) {
            myThis.divTitre.y.onclick = () => { myThis.toggleDetail(); };
        }
        myThis.divDetail = new iceDiv({ class: "detailZoneRepliable" });
        myThis.stackPrincipal = new ice2StackPanel({ class: "ZoneRepliable " + myThis.cssClasse });

        myThis.stackPrincipal
            .append(myThis.divTitre)
            .append(myThis.divDetail);

        myThis.genTitre();
        if (!myThis.etatPlie) {
            myThis.genDetail();
        }
        else {
            cachericeElements(myThis.divDetail, true);
        }
    }


    private getICone(): Icone {
        let myThis: ice2ZoneRepliable = this;
        
        switch (myThis.CouleurFleche) {
            case enumXxZoneRepliableCouleurFleche.Bleu:
                if (myThis.etatPlie) {
                    if (myThis.PositionFleche == enumXxZoneRepliablePosition.droite) {
                        return new IconeP12(enumIconeP12.action_fleche_simple_gauche);
                    }
                    else {
                        return new IconeP12(enumIconeP12.action_plier_bleu);
                    }
                }
                else {
                    return new IconeP12(enumIconeP12.action_deplier_bleu);
                }
                break;

            case enumXxZoneRepliableCouleurFleche.Blanc:
                if (myThis.etatPlie) {
                    if (myThis.PositionFleche == enumXxZoneRepliablePosition.droite) {
                        return new IconeP12(enumIconeP12.fleche_blanche_gauche);
                    }
                    else {
                        return new IconeP12(enumIconeP12.action_plier_blanc);
                    }
                }
                else {
                    return new IconeP12(enumIconeP12.action_deplier_blanc);
                }
                break;

            case enumXxZoneRepliableCouleurFleche.Noir:
                if (myThis.etatPlie) {
                    if (myThis.PositionFleche == enumXxZoneRepliablePosition.droite) {
                        return new IconeP12(enumIconeP12.fleche_noire_gauche);
                    }
                    else {
                        return new IconeP12(enumIconeP12.fleche_noire_droite);
                    }
                }
                else {
                    return new IconeP12(enumIconeP12.fleche_noire_bas);
                }
                break;

            case enumXxZoneRepliableCouleurFleche.Perso:
                if (myThis.etatPlie) {
                    return myThis.IconeRepliePerso;
                }
                else {
                    return myThis.IconeDepliePerso;
                }
                break;
        }
    }

    private genTitre() {
        let myThis: ice2ZoneRepliable = this;
        myThis.btnSwap = new ice2Bouton({
            class: "BtnReplier",
            titleLocalise: "Déplier/Replier",
            icone: myThis.getICone(),
            optionsAffichage: {
                tailleBouton: enumTailleBouton.Fit
            },
            click: function (cb)
            {
                myThis.toggleDetail();
                cb();
            }
        });

        let zoneTitre: iceDiv = new iceDiv({ class: 'zoneTitre' });
        myThis.divTitre.effacer()
        if (myThis.fleche) {
            myThis.divTitre.append(myThis.btnSwap, (myThis.PositionFleche == enumXxZoneRepliablePosition.droite) ? DockPosition.droite : DockPosition.gauche, "zoneBtnReplier")
        }
        myThis.divTitre.append(zoneTitre, DockPosition.gauche, "zoneTitreContenu");
        
        myThis.renderTitre(zoneTitre.asHolder, (b: boolean) => { myThis.plier(b); }, () => { myThis.genTitre(); }, myThis.etatPlie);

    }

    private genDetail()
    {
        let myThis: ice2ZoneRepliable = this;

        if (!myThis.isRendered)
        {
            myThis.renderDetail(myThis.divDetail.asHolder, function (b: boolean) { myThis.plier(b); }, function () { myThis.genTitre(); });
            myThis.isRendered = true;
        }
    }

    public forcerRenderDetail()
    {
        let myThis: ice2ZoneRepliable = this;
        let etatPlie: boolean = myThis.etatPlie;
        myThis.isRendered = false;
        myThis.etatPlie = true;
        myThis.toggleDetail();
        if (etatPlie)
            myThis.toggleDetail();

    }
    public toggleDetail() {
        let myThis: ice2ZoneRepliable = this;

        myThis.etatPlie = !myThis.etatPlie;

        myThis.btnSwap.setIcone(myThis.getICone());

        if (myThis.etatPlie) {

            cachericeElements(myThis.divDetail, true);
        }
        else {
            myThis.genDetail();
            affichericeElements(myThis.divDetail);
        }

        myThis.divTitre.toggleClass("selected", myThis.etatPlie);

        myThis.onToggleCallBack(myThis.etatPlie, () => { myThis.genTitre(); });
    }

    public plier(inPlier: boolean) {
        let myThis: ice2ZoneRepliable = this;

        if (inPlier != myThis.etatPlie) {
            myThis.toggleDetail();
        }
    }

    public refreshTitre() {
        let myThis: ice2ZoneRepliable = this;

        myThis.genTitre();
    }

    //public async test(): Promise<void> {
    //    let myThis: ice2ZoneRepliable = this;
    //    await myThis.btnSwap.TestClick();
    //}
}