import { iXElement } from '../xBase';
import { IconeCs3i, IconeMiniCs3i, enumIconeCs3i } from '../xIcones';
import { xxBouton, enumTailleBouton } from './xxBouton';
import { xxToolTipBouton } from './xxToolTip';

enum enumPositionVolet {
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

class xxVolet implements iXElement {

    private volet: xDiv;
    private content: xDiv;
    private position: enumPositionVolet;
    private OnClose: () => void;
    private BoutonPosition: xxToolTipBouton;
    private class: string;

    public constructor(o: OptionVolet) {
        let myThis: xxVolet = this;

        myThis.volet = new xDiv({
            class: "xxVolet"
        })

        myThis.volet.addClass("Direction_" + enumPositionVolet[o.position])

        if (o.class != undefined)
            myThis.volet.addClass(o.class)
        

        let boutonFermer: xxBouton = new xxBouton({
            id: "BoutonFermer",
            optionsAffichage: {
                tailleBouton: enumTailleBouton.Fit
            },
            icone: new IconeCs3i(enumIconeCs3i.action_annuler),
            titleLocalise: "Fermer",
            click: function (cb: any) {
                myThis.fermer();
                cb();
            }
        })

        myThis.BoutonPosition = new xxToolTipBouton({
            class:"btnPosition",
            icone: new IconeCs3i(enumIconeCs3i.xxVolet_droite),
            tailleBouton: enumTailleBouton.Fit,
            titleLocalise: "Changer la position du volet",
            WithOutBackGround: true,
            toolTipContent: new xxWrapPanel({
                class: "WrapPositions",
                initContent: [
                    new xxBouton({
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit
                        },
                        click: function (cb: any) {
                            myThis.switchPosition(enumPositionVolet.gauche);
                            myThis.BoutonPosition.GetTooltip.ToggleToolTip();
                            myThis.BoutonPosition.setIcone(new IconeMiniCs3i(enumIconeCs3i.xxVolet_gauche));
                            cb();
                        },
                        icone: new IconeMiniCs3i(enumIconeCs3i.xxVolet_gauche),
                        titleLocalise: "Positionner à gauche"
                    }),
                    new xxBouton({
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit
                        },
                        click: function (cb: any) {
                            myThis.switchPosition(enumPositionVolet.haut);
                            myThis.BoutonPosition.GetTooltip.ToggleToolTip();
                            myThis.BoutonPosition.setIcone(new IconeMiniCs3i(enumIconeCs3i.xxVolet_haut));
                            cb();
                        },
                        icone: new IconeMiniCs3i(enumIconeCs3i.xxVolet_haut),
                        titleLocalise: "Positionner en haut"
                    }),
                    new xxBouton({
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit
                        },
                        click: function (cb: any) {
                            myThis.switchPosition(enumPositionVolet.droite);
                            myThis.BoutonPosition.GetTooltip.ToggleToolTip();
                            myThis.BoutonPosition.setIcone(new IconeMiniCs3i(enumIconeCs3i.xxVolet_droite));
                            cb();
                        },
                        icone: new IconeMiniCs3i(enumIconeCs3i.xxVolet_droite),
                        titleLocalise: "Positionner à droite"
                    }),
                    new xxBouton({
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit
                        },
                        click: function (cb: any) {
                            myThis.switchPosition(enumPositionVolet.bas);
                            myThis.BoutonPosition.GetTooltip.ToggleToolTip();
                            myThis.BoutonPosition.setIcone(new IconeMiniCs3i(enumIconeCs3i.xxVolet_bas));
                            cb();
                        },
                        icone: new IconeMiniCs3i(enumIconeCs3i.xxVolet_bas),
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

        myThis.content = new xDiv({
            class: "xxVoletContent"
        })

        myThis.volet.asHolder.append(myThis.content);

        if (o.initContent != null) {
            myThis.content.asHolder.appendMany(o.initContent);
        }

        xOutils.addKeyupEvent({
            keyEvent: "xxvolet_fermer",
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
        let myThis: xxVolet = this;

        switch (pos) {
            case enumPositionVolet.gauche:
                myThis.BoutonPosition.setIcone(new IconeMiniCs3i(enumIconeCs3i.xxVolet_gauche))                
                break;
            case enumPositionVolet.droite:
                myThis.BoutonPosition.setIcone(new IconeMiniCs3i(enumIconeCs3i.xxVolet_droite))
                break;
            case enumPositionVolet.bas:
                myThis.BoutonPosition.setIcone(new IconeMiniCs3i(enumIconeCs3i.xxVolet_bas))
                break;
            case enumPositionVolet.haut:
                myThis.BoutonPosition.setIcone(new IconeMiniCs3i(enumIconeCs3i.xxVolet_haut))
                break;
        }
    }

    public switchPosition(pos: enumPositionVolet): void {
        let myThis: xxVolet = this;
        
        myThis.volet.removeClass("Direction_" + enumPositionVolet[enumPositionVolet.gauche]);
        myThis.volet.removeClass("Direction_" + enumPositionVolet[enumPositionVolet.droite]);
        myThis.volet.removeClass("Direction_" + enumPositionVolet[enumPositionVolet.bas]);
        myThis.volet.removeClass("Direction_" + enumPositionVolet[enumPositionVolet.haut]);

        myThis.volet.addClass("Direction_" + enumPositionVolet[pos])
    }

    public append(content: iXElement): void {
        let myThis: xxVolet = this;

        myThis.content.asHolder.append(content);
    }

    public vider(): void {
        let myThis: xxVolet = this;

        myThis.content.asHolder.empty();
    }

    public afficher(): void {
        let myThis: xxVolet = this;

        myThis.volet.removeClass("invisible");
        myThis.volet.addClass("visible");
    }

    public fermer(): void {
        let myThis: xxVolet = this;

        myThis.volet.removeClass("visible");
        myThis.volet.addClass("invisible");

        if (myThis.OnClose != null)
            myThis.OnClose();
    }

    public isOpen(): boolean {
        let myThis: xxVolet = this;
        return myThis.volet != null && myThis.volet.y.classList.contains("visible");
    }

  
    public get y() { return this.volet.y; }
}