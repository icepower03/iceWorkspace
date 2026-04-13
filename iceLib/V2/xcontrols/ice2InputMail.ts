// @ts-nocheck
interface OptionsInputMail
{
    valeur?: string;
    valueChange?: (val: string) => void;
    lectureSeule?: boolean;
}

class ice2InputMail implements iXElement
{
    private wrap: ice2WrapPanel;
    private valueChange?: (val: string) => void;
    private libelleMail: string = "";

    public get y()
    {
        let myThis: ice2InputMail = this;
        return myThis.wrap.y;
    }

    constructor(o: OptionsInputMail)
    {
        let myThis: ice2InputMail = this;

        if (o.valeur != null)
            myThis.libelleMail = o.valeur;

        myThis.wrap = new ice2WrapPanel({ espaceMinimaliste: true, gap: 5,});
        myThis.valueChange = o.valueChange;

        if (!o.lectureSeule)
        {
            if (myThis.libelleMail == "" || iceOutils.IsMailValid(myThis.libelleMail))
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
        let myThis: ice2InputMail = this;

        if (nouveauLibelle != null)
            myThis.libelleMail = nouveauLibelle;

        myThis.wrap.vider();

        if (myThis.libelleMail == "")
        {
            let labelMailVide: ice2LabelModifiable = new ice2LabelModifiable({
                libelleLabelSiVide: "[" + new iceLString("Non renseigné").text + "]",
                change: function (newMail)
                {
                    myThis.setMail(newMail);
                }
            });

            myThis.wrap.append(labelMailVide);
        }
        else
        { 
            let lienMailTo: iceHref = new iceHref({
                typeOuverture: enumTypeOuvertureHref.MemeEmplacement,
                url: "mailto:" + myThis.libelleMail,
                textVariable: myThis.libelleMail
            });

            myThis.wrap.append(lienMailTo);

            let btnModifier: ice2Bouton = new ice2Bouton({
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
        let myThis: ice2InputMail = this;

        let inputLien: xInputText = new xInputText({
            value: myThis.libelleMail,
            placeHolderVariable: "[" + new iceLString("Non renseigné").text + "]",
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
        let myThis: ice2InputMail = this;

        if (iceOutils.IsMailValid(newMail) || newMail == "")
        {
            myThis.libelleMail = newMail;
            myThis.valueChange(newMail);
        }
        else
            iceOutils.afficherMessageAlertifyLocaliseError("Le format de l'adresse mail renseignéE est invalide.");

        myThis.switchToLink(false);
    }
}
