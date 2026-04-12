// @ts-nocheck
interface OptionsInputMail
{
    valeur?: string;
    valueChange?: (val: string) => void;
    lectureSeule?: boolean;
}

class xxInputMail implements iXElement
{
    private wrap: xxWrapPanel;
    private valueChange?: (val: string) => void;
    private libelleMail: string = "";

    public get y()
    {
        let myThis: xxInputMail = this;
        return myThis.wrap.y;
    }

    constructor(o: OptionsInputMail)
    {
        let myThis: xxInputMail = this;

        if (o.valeur != null)
            myThis.libelleMail = o.valeur;

        myThis.wrap = new xxWrapPanel({ espaceMinimaliste: true, gap: 5,});
        myThis.valueChange = o.valueChange;

        if (!o.lectureSeule)
        {
            if (myThis.libelleMail == "" || xOutils.IsMailValid(myThis.libelleMail))
            {
                myThis.switchToLink(false);
            }
            else
                myThis.switchToEdition();
        }
        else
            myThis.switchToLink(true);
    }

    public switchToLink(lectureSeule: boolean, nouveauLibelle: string = null)
    {
        let myThis: xxInputMail = this;

        if (nouveauLibelle != null)
            myThis.libelleMail = nouveauLibelle;

        myThis.wrap.vider();

        if (myThis.libelleMail == "")
        {
            let labelMailVide: xxLabelModifiable = new xxLabelModifiable({
                libelleLabelSiVide: "[" + new xLString("Non renseigné").text + "]",
                change: function (newMail)
                {
                    myThis.setMail(newMail);
                }
            });

            myThis.wrap.append(labelMailVide);
        }
        else
        { 
            let lienMailTo: xHref = new xHref({
                typeOuverture: enumTypeOuvertureHref.MemeEmplacement,
                url: "mailto:" + myThis.libelleMail,
                textVariable: myThis.libelleMail
            });

            myThis.wrap.append(lienMailTo);

            let btnModifier: xxBouton = new xxBouton({
                icone: new IconeSvg(enumIconeSvg.modifier, { taille: tailleIcone.Custom, widthCust: 12, heightCust: 12 }),
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit, margin: { Tous: 0 } },
                titleLocalise: "Modifier",
                click: () =>
                {
                    myThis.switchToEdition();
                }
            });

            if (!lectureSeule)
                myThis.wrap.append(btnModifier);

        }
    }

    private switchToEdition()
    {
        let myThis: xxInputMail = this;

        let inputLien: xInputText = new xInputText({
            value: myThis.libelleMail,
            placeHolderVariable: "[" + new xLString("Non renseigné").text + "]",
            onLostfocusCallback: (newMail:string) =>
            {
                myThis.setMail(newMail);
            }
        });

        myThis.wrap.vider();
        myThis.wrap.append(inputLien);
    }

    private setMail(newMail: string)
    {
        let myThis: xxInputMail = this;

        if (xOutils.IsMailValid(newMail) || newMail == "")
        {
            myThis.libelleMail = newMail;
            myThis.valueChange(newMail);
        }
        else
            xOutils.afficherMessageAlertifyLocaliseError("Le format de l'adresse mail renseignéE est invalide.");

        myThis.switchToLink(false);
    }
}
