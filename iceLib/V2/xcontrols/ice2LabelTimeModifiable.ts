// @ts-nocheck
import { iXElement, optionsAffichage, enumCurseur } from '../iceBase';
import { iceLString } from '../iceLString';
import { iceTime } from '../iceTime';
import { iceDiv } from './iceDiv';
import { ice2LabelContainer } from './ice2LabelContainer';
import { ice2Label, enumTypeLabel } from './ice2Label';
import { xInputTime } from './iceInputDate';
import { IconeSvg, enumIconeSvg, tailleIcone, Icone } from '../iceIcones';

interface OptionsLabelTimeModifiable {
    id?: string;
    class?: string;
    textVariable: string;
    change: (t: iceTime) => void;
    type?: enumTypeLabel;
    libelleLabelSiVide?: string;
    optionsAffichage?: optionsAffichage;
}


export class ice2LabelTimeModifiable implements iXElement {
    private elementPrincipal: iceDiv;
    private label: ice2LabelContainer;
    private libelleLabelSiVide: iceLString;
    private type: enumTypeLabel;

    private changerValeurLabel(val: string) {
        if (val != "") {
            this.label.changerTextVariable(val);
        }
        else {
            this.label.changerTextLocalise(this.libelleLabelSiVide.text);
        }
    }

    constructor(o: OptionsLabelTimeModifiable) {
        let myThis: ice2LabelTimeModifiable = this;

        myThis.type = enumTypeLabel.standard;
        if (o.type == enumTypeLabel.titre) {
            myThis.type = enumTypeLabel.titre;
        }

        if (o.libelleLabelSiVide != undefined) {
            myThis.libelleLabelSiVide = new iceLString(o.libelleLabelSiVide);
        }
        else { myThis.libelleLabelSiVide = new iceLString("00:00"); }

        this.elementPrincipal = new iceDiv({ id: o.id, class: "ice2LabelModifiableContainer LabelModifiableTime " + o.class });

        let maVariable = o.textVariable;
        if (maVariable != "") {
            myThis.label = new ice2LabelContainer({
                textVariable: maVariable,
                type: myThis.type,
                labelLargeurLibre: true,
                initContent: new IconeSvg(enumIconeSvg.modifier, { taille: tailleIcone.Custom, widthCust: 12, heightCust: 12 }),
                gap: 5,
                optionsAffichage: { curseur: enumCurseur.texte }

            });
        }
        else {
            myThis.label = new ice2LabelContainer({
                textVariable: myThis.libelleLabelSiVide.text,
                type: myThis.type,
                labelLargeurLibre: true,
                initContent: new IconeSvg(enumIconeSvg.modifier, { taille: tailleIcone.Custom, widthCust: 12, heightCust: 12 }),
                gap: 5,
                optionsAffichage: { curseur: enumCurseur.texte }
            });
        }

        myThis.elementPrincipal.asHolder.append(myThis.label);        

        myThis.label.y.onclick=function () {
            let varTime: iceTime;
            let tab: string[] = maVariable.split(':');
            varTime = new iceTime(parseInt(tab[0]), parseInt(tab[1]));
            //cachericeElements(myThis.label, true);
            let input: xInputTime = new xInputTime({
                value: varTime,
                onClose: (val) => {
                    if (!input.hasFocus()) {
                        maVariable = val.getString();
                        myThis.changerValeurLabel(val.getString());
                        // let triste = val;

                        affichericeElements(myThis.label);
                        input.y.remove();
                        input = null;

                        o.change(val);
                    }

                },
                ValueChange: function (t: iceTime) {
                    maVariable = t.getString();
                    myThis.changerValeurLabel(maVariable);

                    //

                    //affichericeElements(myThis.label);
                    //input.x.remove();
                    //input = null;

                    o.change(t);
                }
            });
            myThis.elementPrincipal.asHolder.append(input); 

            input.afficherTimePicker();
        };

        if (o.optionsAffichage != undefined)
        {

            iceStyle.AppliquerOptionsAffichage(myThis.elementPrincipal, o.optionsAffichage);
        }
    }

   
    public get y() { return this.elementPrincipal.y; }
}