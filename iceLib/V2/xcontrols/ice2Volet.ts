import { iXElement } from '../iceBase';
import { IconeP12, IconeMiniP12, enumIconeP12, Icone } from '../iceIcones';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';
import { ice2ToolTipBouton } from './ice2ToolTip';
import { ice2WrapPanel } from './ice2WrapPanel';
import { enumPosition } from '../iceBase';
import { iceDiv } from './iceDiv';
import { iceOutils, EKeys } from '../../iceOutils';

export enum enumPositionVolet {
    haut,
    bas,
    gauche,
    droite
}

interface OptionVolet {
    position: enumPositionVolet,
    initContent?: iXElement[],
    onClose?: () => void,
    class?: string,
    fermerParDefaut?:boolean
}

export class ice2Volet implements iXElement {

    private volet: iceDiv;
    private content: iceDiv;
    private position: enumPositionVolet;
    private OnClose: () => void;
    private BoutonPosition: ice2ToolTipBouton;
    private class: string;

    public constructor(o: OptionVolet) {
        let myThis: ice2Volet = this;

        myThis.volet = new iceDiv({
            class: "ice2Volet"
        })

        myThis.volet.addClass("Direction_" + enumPositionVolet[o.position])

        if (o.class != undefined)
            myThis.volet.addClass(o.class)
        

        let boutonFermer: ice2Bouton = new ice2Bouton({
            id: "BoutonFermer",
            optionsAffichage: {
                tailleBouton: enumTailleBouton.Fit
            },
            icone: new IconeP12(enumIconeP12.action_annuler),
            titleLocalise: "Fermer",
            click: function (cb: any) {
                myThis.fermer();
                cb();
            }
        })

        myThis.BoutonPosition = new ice2ToolTipBouton({
            class:"btnPosition",
            icone: new IconeP12(enumIconeP12.ice2Volet_droite),
            tailleBouton: enumTailleBouton.Fit,
            titleLocalise: "Changer la position du volet",
            WithOutBackGround: true,
            toolTipContent: new ice2WrapPanel({
                class: "WrapPositions",
                initContent: [
                    new ice2Bouton({
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit
                        },
                        click: function (cb: any) {
                            myThis.switchPosition(enumPositionVolet.gauche);
                            myThis.BoutonPosition.GetTooltip.ToggleToolTip();
                            myThis.BoutonPosition.setIcone(new IconeMiniP12(enumIconeP12.ice2Volet_gauche));
                            cb();
                        },
                        icone: new IconeMiniP12(enumIconeP12.ice2Volet_gauche),
                        titleLocalise: "Positionner à gauche"
                    }),
                    new ice2Bouton({
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit
                        },
                        click: function (cb: any) {
                            myThis.switchPosition(enumPositionVolet.haut);
                            myThis.BoutonPosition.GetTooltip.ToggleToolTip();
                            myThis.BoutonPosition.setIcone(new IconeMiniP12(enumIconeP12.ice2Volet_haut));
                            cb();
                        },
                        icone: new IconeMiniP12(enumIconeP12.ice2Volet_haut),
                        titleLocalise: "Positionner en haut"
                    }),
                    new ice2Bouton({
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit
                        },
                        click: function (cb: any) {
                            myThis.switchPosition(enumPositionVolet.droite);
                            myThis.BoutonPosition.GetTooltip.ToggleToolTip();
                            myThis.BoutonPosition.setIcone(new IconeMiniP12(enumIconeP12.ice2Volet_droite));
                            cb();
                        },
                        icone: new IconeMiniP12(enumIconeP12.ice2Volet_droite),
                        titleLocalise: "Positionner à droite"
                    }),
                    new ice2Bouton({
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit
                        },
                        click: function (cb: any) {
                            myThis.switchPosition(enumPositionVolet.bas);
                            myThis.BoutonPosition.GetTooltip.ToggleToolTip();
                            myThis.BoutonPosition.setIcone(new IconeMiniP12(enumIconeP12.ice2Volet_bas));
                            cb();
                        },
                        icone: new IconeMiniP12(enumIconeP12.ice2Volet_bas),
                        titleLocalise: "Positionner en bas"
                    })
                ]
            }),
            optionsAffichageBouton: {
                tailleBouton: enumTailleBouton.Fit
            }
        })

        myThis.volet.asHolder.append(boutonFermer);
        myThis.volet.asHolder.append(myThis.BoutonPosition);

        if (o.position != undefined)
            myThis.position = o.position;

        myThis.changeIcone(myThis.position);

        myThis.content = new iceDiv({
            class: "ice2VoletContent"
        })

        myThis.volet.asHolder.append(myThis.content);

        if (o.initContent != null) {
            myThis.content.asHolder.appendMany(o.initContent);
        }

        iceOutils.addKeyupEvent({
            keyEvent: "ice2volet_fermer",
            keyCode: EKeys.Echap,
            callBack: function () { myThis.fermer(); }
        });

        if (o.fermerParDefaut != null && o.fermerParDefaut)
            myThis.fermer();

        if (o.onClose != null) {
            myThis.OnClose = o.onClose;
        }
    }

    private changeIcone(pos: enumPositionVolet): void {
        let myThis: ice2Volet = this;

        switch (pos) {
            case enumPositionVolet.gauche:
                myThis.BoutonPosition.setIcone(new IconeMiniP12(enumIconeP12.ice2Volet_gauche))                
                break;
            case enumPositionVolet.droite:
                myThis.BoutonPosition.setIcone(new IconeMiniP12(enumIconeP12.ice2Volet_droite))
                break;
            case enumPositionVolet.bas:
                myThis.BoutonPosition.setIcone(new IconeMiniP12(enumIconeP12.ice2Volet_bas))
                break;
            case enumPositionVolet.haut:
                myThis.BoutonPosition.setIcone(new IconeMiniP12(enumIconeP12.ice2Volet_haut))
                break;
        }
    }

    public switchPosition(pos: enumPositionVolet): void {
        let myThis: ice2Volet = this;
        
        myThis.volet.removeClass("Direction_" + enumPositionVolet[enumPositionVolet.gauche]);
        myThis.volet.removeClass("Direction_" + enumPositionVolet[enumPositionVolet.droite]);
        myThis.volet.removeClass("Direction_" + enumPositionVolet[enumPositionVolet.bas]);
        myThis.volet.removeClass("Direction_" + enumPositionVolet[enumPositionVolet.haut]);

        myThis.volet.addClass("Direction_" + enumPositionVolet[pos])
    }

    public append(content: iXElement): void {
        let myThis: ice2Volet = this;

        myThis.content.asHolder.append(content);
    }

    public vider(): void {
        let myThis: ice2Volet = this;

        myThis.content.asHolder.empty();
    }

    public afficher(): void {
        let myThis: ice2Volet = this;

        myThis.volet.removeClass("invisible");
        myThis.volet.addClass("visible");
    }

    public fermer(): void {
        let myThis: ice2Volet = this;

        myThis.volet.removeClass("visible");
        myThis.volet.addClass("invisible");

        if (myThis.OnClose != null)
            myThis.OnClose();
    }

    public isOpen(): boolean {
        let myThis: ice2Volet = this;
        return myThis.volet != null && myThis.volet.y.classList.contains("visible");
    }

  
    public get y() { return this.volet.y; }
}