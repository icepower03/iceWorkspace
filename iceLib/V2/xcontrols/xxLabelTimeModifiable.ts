
interface OptionsLabelTimeModifiable {
    id?: string;
    class?: string;
    textVariable: string;
    change: (t: xTime) => void;
    type?: enumTypeLabel;
    libelleLabelSiVide?: string;
    optionsAffichage?: optionsAffichage;
}


class xxLabelTimeModifiable implements iXElement {
    private elementPrincipal: xDiv;
    private label: xxLabelContainer;
    private libelleLabelSiVide: xLString;
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
        let myThis: xxLabelTimeModifiable = this;

        myThis.type = enumTypeLabel.standard;
        if (o.type == enumTypeLabel.titre) {
            myThis.type = enumTypeLabel.titre;
        }

        if (o.libelleLabelSiVide != undefined) {
            myThis.libelleLabelSiVide = new xLString(o.libelleLabelSiVide);
        }
        else { myThis.libelleLabelSiVide = new xLString("00:00"); }

        this.elementPrincipal = new xDiv({ id: o.id, class: "xxLabelModifiableContainer LabelModifiableTime " + o.class });

        let maVariable = o.textVariable;
        if (maVariable != "") {
            myThis.label = new xxLabelContainer({
                textVariable: maVariable,
                type: myThis.type,
                labelLargeurLibre: true,
                initContent: new IconeSvg(enumIconeSvg.modifier, { taille: tailleIcone.Custom, widthCust: 12, heightCust: 12 }),
                gap: 5,
                optionsAffichage: { curseur: enumCurseur.texte }

            });
        }
        else {
            myThis.label = new xxLabelContainer({
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
            let varTime: xTime;
            let tab: string[] = maVariable.split(':');
            varTime = new xTime(parseInt(tab[0]), parseInt(tab[1]));
            //cacherxElements(myThis.label, true);
            let input: xInputTime = new xInputTime({
                value: varTime,
                onClose: (val) => {
                    if (!input.hasFocus()) {
                        maVariable = val.getString();
                        myThis.changerValeurLabel(val.getString());
                        // let triste = val;

                        afficherxElements(myThis.label);
                        input.y.remove();
                        input = null;

                        o.change(val);
                    }

                },
                ValueChange: function (t: xTime) {
                    maVariable = t.getString();
                    myThis.changerValeurLabel(maVariable);

                    //

                    //afficherxElements(myThis.label);
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

            xStyle.AppliquerOptionsAffichage(myThis.elementPrincipal, o.optionsAffichage);
        }
    }

   
    public get y() { return this.elementPrincipal.y; }
}
