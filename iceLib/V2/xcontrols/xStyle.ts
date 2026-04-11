enum enumCote { tous, haut, droite, bas, gauche }

class xStyle extends xElement
{
    private dicoTargetCss: Dictionnaire<string> = {};

    /** ATTENTION cet xElement est a utiliser uniquement unique sous la tutel des graphistes*/
    constructor()
    {
        super("style", { class:"xStyle"});
        let mythis: xStyle = this;
        xOutils.attachToHead(mythis.y);
    }

    public AddCss(Target: string, Css: string, Surcharge?: boolean)
    {
        let mythis: xStyle = this;
        Target = Target.trim();
        // Le Taget existe deja
        if (mythis.dicoTargetCss[Target])
        {
            if (Surcharge)
            {
                let texttemp = mythis.y.innerHTML;
                let indexTarget = texttemp.search(Target);
                if (indexTarget >= 0) // On a trouve la target
                {
                    let indexDebut = indexTarget + Target.length + 1;
                    texttemp = texttemp.substring(indexDebut);
                    let indexEnd = indexDebut + texttemp.search("}");
                    mythis.y.innerHTML = mythis.y.innerHTML.substring(0, indexDebut) + Css + mythis.y.innerHTML.substring(indexEnd);
                    mythis.dicoTargetCss[Target] = Css;
                }
            }
        }
        else // Sinon on l'ajoute
        {
            mythis.dicoTargetCss[Target] = Css;
            mythis.y.innerHTML += mythis.genClassCss(Target);
        }
    }

    public EmptyAllCss()
    {
        let mythis: xStyle = this;
        mythis.y.innerHTML = "";
    }

    private genClassCss(Target: string)
    {
        let mythis: xStyle = this;
        let texteTemp: string = "";
        texteTemp += Target + "{";
        texteTemp += mythis.dicoTargetCss[Target] + "} /**/";
        return texteTemp;
    }

    // ********** //
    //   Static   //
    // ********** //
    public static addClass(s: string, xelement: iXElement) {
        s.split(' ').forEach(c => { xelement?.y?.classList.add(c); });
        
    }
    public static removeClass(s: string, xelement: iXElement) {
        s.split(' ').forEach(c => { xelement?.y?.classList.remove(c); });

    }
    public static AppliquerOptionsAffichage(xelement: iXElement, optionsAffichage: optionsAffichage)
    {
        if (!!optionsAffichage && !!xelement)
        {
            if (!!optionsAffichage.margin)
                xStyle.setMargin(xelement, optionsAffichage.margin);

            if (!!optionsAffichage.padding)
                xStyle.setPadding(xelement, optionsAffichage.padding);

            if (!!optionsAffichage.curseur)
                xStyle.setCurseur(xelement, optionsAffichage.curseur);

            if (!!optionsAffichage.border)
                xStyle.setBorder(xelement, optionsAffichage.border);
        }
    }

    //#region "Luminosite et couleur"
    private static isCouleurHexa(couleurHexa: string)
    {
        if (!!couleurHexa)
            couleurHexa = couleurHexa.replace("#", "");
        else
            return false;
        return couleurHexa.length == 6;
    }

    public static getLuminositeCouleurHexa(couleurFondADefinir: string):number
    {
        if (xStyle.isCouleurHexa(couleurFondADefinir))
        {
            couleurFondADefinir = couleurFondADefinir.replace("#", "");
            let r: number = parseInt(couleurFondADefinir.substr(0, 2), 16);
            let v: number = parseInt(couleurFondADefinir.substr(2, 2), 16);
            let b: number = parseInt(couleurFondADefinir.substr(4, 2), 16);

            return Math.round(Math.sqrt(r * r * .241 + v * v * .691 + b * b * .068));
        }
        return -1;
    }

    private static EclaicirAssombrirDecimal(decimalColor: number, pourcentage: number, Eclaicisment: boolean):number
    {
        let toSender: number = decimalColor;
        if (decimalColor <= 255 && decimalColor >= 0)
        {
            let tempNumber = pourcentage * ((Eclaicisment ? 255 : 0) - decimalColor) / 100;

            toSender += tempNumber;

            toSender = Math.round(toSender);
            if (toSender > 255)
                toSender = 255;
            else if (toSender < 0)
                toSender = 0;
        }
        return toSender;
    }

    public static EclaicirCouleurHex(couleurFondADefinir: string, pourcentageEclaicisment: number): string
    {
        if (xStyle.isCouleurHexa(couleurFondADefinir))
        {
            couleurFondADefinir = couleurFondADefinir.replace("#", "");
            let toSender = couleurFondADefinir;
            if (pourcentageEclaicisment < 0)
                pourcentageEclaicisment = 0;
            else if (pourcentageEclaicisment > 100)
                pourcentageEclaicisment = 100;

            if (couleurFondADefinir.length >= 6)
            {
                let Rouge: number = parseInt(couleurFondADefinir.slice(0, 2), 16);
                let Vert: number = parseInt(couleurFondADefinir.slice(2, 4), 16);
                let Bleu: number = parseInt(couleurFondADefinir.slice(4, 6), 16);

                // Si toute les parties on bien etait parse int
                if (!isNaN(Rouge) && !isNaN(Vert) && !isNaN(Bleu))
                {
                    Rouge = xStyle.EclaicirAssombrirDecimal(Rouge, pourcentageEclaicisment, true);

                    Vert = xStyle.EclaicirAssombrirDecimal(Vert, pourcentageEclaicisment, true);

                    Bleu = xStyle.EclaicirAssombrirDecimal(Bleu, pourcentageEclaicisment, true);

                    toSender = Rouge.toString(16) + Vert.toString(16) + Bleu.toString(16);
                }
            }
            return toSender;
        }
        return null;
    }

    public static AssombrissementCouleurHex(couleurFondADefinir: string, pourcentageAssombrissement: number): string
    {
        if (xStyle.isCouleurHexa(couleurFondADefinir))
        {
            couleurFondADefinir = couleurFondADefinir.replace("#", "");
            let toSender = couleurFondADefinir;
            if (pourcentageAssombrissement < 0)
                pourcentageAssombrissement = 0;
            else if (pourcentageAssombrissement > 100)
                pourcentageAssombrissement = 100;

            if (couleurFondADefinir.length >= 6)
            {
                let Rouge: number = parseInt(couleurFondADefinir.slice(0, 2), 16);
                let Vert: number = parseInt(couleurFondADefinir.slice(2, 4), 16);
                let Bleu: number = parseInt(couleurFondADefinir.slice(4, 6), 16);

                // Si toute les parties on bien etait parse int
                if (!isNaN(Rouge) && !isNaN(Vert) && !isNaN(Bleu))
                {
                    Rouge = xStyle.EclaicirAssombrirDecimal(Rouge, pourcentageAssombrissement, false);

                    Vert = xStyle.EclaicirAssombrirDecimal(Vert, pourcentageAssombrissement, false);

                    Bleu = xStyle.EclaicirAssombrirDecimal(Bleu, pourcentageAssombrissement, false);

                    toSender = Rouge.toString(16) + Vert.toString(16) + Bleu.toString(16);
                }
            }
            return toSender;
        }
        else
            return null;
    }

    /**
     * ATTENTION, à n'utiliser que lorsqu'un graphiste vous l'a demandé.
     * La méthodologie normale de changement de couleur fond est l'application d'une class
     * @param element
     * @param couleurFondADefinir
     * @param opacite
     * @param transparence
     */
    public static setCouleurFond(element: iXElement, couleurFondADefinir: string, opacite?: number, transparence: boolean = false, iscouleurFondDynamique: boolean = true)
    {
        if (xStyle.isCouleurHexa(couleurFondADefinir))
        {
            couleurFondADefinir = couleurFondADefinir.replace("#", "");
            if (opacite != null)
            {
                if (opacite < 0)
                    opacite = 0;
                else if (opacite > 100)
                    opacite = 100;

                if (!transparence)
                {
                    couleurFondADefinir = xStyle.EclaicirCouleurHex(couleurFondADefinir, opacite);
                }
                else 
                {
                    let valeurDecimale = Math.round(opacite * 255 / 100);
                    let opaciteHexa: string;

                    if (opacite < 7)
                        opaciteHexa = "0" + valeurDecimale.toString(16);
                    else
                        opaciteHexa = valeurDecimale.toString(16);

                    couleurFondADefinir = couleurFondADefinir + opaciteHexa;
                }

            }


            element.y.style.backgroundColor = "#" + couleurFondADefinir;
            if (iscouleurFondDynamique)
                xStyle.addClass("couleurFondDynamique", element);
        }
    }

    /**
     * ATTENTION, à n'utiliser que lorsqu'un graphiste vous l'a demandé.
     * La méthodologie normale de changement de couleur de texte est l'application d'une class
     * @param element
     * @param couleurFondADefinir
     * @param opacite
     */
    public static setCouleurTexte(element: iXElement, couleurTexteADefinir: string)
    {
        if (xStyle.isCouleurHexa(couleurTexteADefinir))
        {
            element.y.style.color = "#" + couleurTexteADefinir;
            xStyle.addClass("couleurTexteDynamique", element);
        }
    }

    /**
     * ATTENTION, à n'utiliser que lorsqu'un graphiste vous l'a demandé.
     * La méthodologie normale de changement de couleur de border est l'application d'une class
     * @param element
     * @param couleurFondADefinir
     * @param cote
     */
    public static setCouleurBorder(element: iXElement, couleurBorderADefinir: string | enumCouleurHexa, cote?: enumCote, iscouleurBorderDynamique: boolean = true)
    {

        if (xStyle.isCouleurHexa(couleurBorderADefinir))
        {
            couleurBorderADefinir = couleurBorderADefinir.replace("#", "");
            let couleurComplete: string = "#" + couleurBorderADefinir;
            if (iscouleurBorderDynamique)
                xStyle.addClass("couleurBorderDynamique", element);


            if (cote == undefined)
                cote = enumCote.tous;

            switch (cote)
            {
                case enumCote.tous:
                    element.y.style.borderColor = couleurComplete;
                    break;
                case enumCote.haut:
                    element.y.style.borderTopColor = couleurComplete;
                    break;
                case enumCote.droite:
                    element.y.style.borderRightColor = couleurComplete;
                    break;
                case enumCote.bas:
                    element.y.style.borderBottomColor = couleurComplete;
                    break;
                case enumCote.gauche:
                    element.y.style.borderLeftColor = couleurComplete;
                    break;
                default:
                    element.y.style.borderColor = couleurComplete;
            }
        }
    }

    public static setCouleurFondAvecContrasteTexteAuto(element: iXElement, couleurFondADefinir: string, opacite?: number, transparence: boolean = false, iscouleurFondDynamique: boolean = true)
    {
        if (xStyle.isCouleurHexa(couleurFondADefinir))
            couleurFondADefinir = couleurFondADefinir.replace("#", "");
        else
            couleurFondADefinir = "F1F1F1"; /* Couleur de fond imposée dans le cas où celle passée est aux fraises */

        if (opacite != null)
        {
            if (opacite < 0)
                opacite = 0;
            else if (opacite > 100)
                opacite = 100;

            if (!transparence)
            {
                couleurFondADefinir = xStyle.EclaicirCouleurHex(couleurFondADefinir, opacite);
                opacite = null;
            }
        }

        xStyle.setCouleurFond(element, couleurFondADefinir, opacite, transparence, iscouleurFondDynamique);

        let classCouleurTexte: string;

        let luminosite: number = xStyle.getLuminositeCouleurHexa(couleurFondADefinir);

        xStyle.removeClass("couleurAutoBlanc couleurAutoNoir",element);

        if ((opacite > 70 && transparence) || luminosite < 155)
            classCouleurTexte = "couleurAutoBlanc";
        else
            classCouleurTexte = "couleurAutoNoir";

        xStyle.addClass(classCouleurTexte, element);
    }

    public static supprimerCouleurFond(element: iXElement)
    {
        xStyle.removeClass("couleurAutoBlanc couleurAutoNoir couleurFondDynamique", element);
        element.y.style.backgroundColor = "transparent";

    }

    //#endregion "Luminosite et couleur"

    //#region "Margin et padding"
    private static SetCotesCss(xelement: iXElement, optionCotes: OptionsCotesCSS, isPadding: boolean)
    {
        let styleOfElement = xelement.y.style; 

        // Tous les cotés
        if (optionCotes.Tous != null)
            if (isPadding)
                styleOfElement.padding = optionCotes.Tous + "px";
            else
                styleOfElement.margin = optionCotes.Tous + "px";

        // Haut et Bas
        if (optionCotes.HautEtBas != null)
        {
            if (isPadding)
            {
                styleOfElement.paddingTop = optionCotes.HautEtBas + "px";
                styleOfElement.paddingBottom = optionCotes.HautEtBas + "px";
            }
            else
            {
                styleOfElement.marginTop = optionCotes.HautEtBas + "px";
                styleOfElement.marginBottom = optionCotes.HautEtBas + "px";
            }
        }
        else
        {
            // Haut
            if (optionCotes.Haut != null)
                if (isPadding)
                    styleOfElement.paddingTop = optionCotes.Haut + "px";
                else
                    styleOfElement.marginTop = optionCotes.Haut + "px";

            // Bas
            if (optionCotes.Bas != null)
                if (isPadding)
                    styleOfElement.paddingBottom = optionCotes.Bas + "px";
                else
                    styleOfElement.marginBottom = optionCotes.Bas + "px";
        }

        // Gauche et Droite
        if (optionCotes.GaucheEtDroite != null)
        {
            if (isPadding)
            {
                styleOfElement.paddingRight = optionCotes.GaucheEtDroite + "px";
                styleOfElement.paddingLeft = optionCotes.GaucheEtDroite + "px";
            }
            else
            {
                styleOfElement.marginRight = optionCotes.GaucheEtDroite + "px";
                styleOfElement.marginLeft = optionCotes.GaucheEtDroite + "px";
            }
        }
        else
        {
            // Droite
            if (optionCotes.Droite != null)
                if (isPadding)
                    styleOfElement.paddingRight = optionCotes.Droite + "px";
                else
                    styleOfElement.marginRight = optionCotes.Droite + "px";

            // Gauche
            if (optionCotes.Gauche != null)
                if (isPadding)
                    styleOfElement.paddingLeft = optionCotes.Gauche + "px";
                else
                    styleOfElement.marginLeft = optionCotes.Gauche + "px";
        }
    }

    public static setMargin(xelement: iXElement, optionCotes: OptionsCotesCSS)
    {
        if (!!xelement && !!optionCotes)
            xStyle.SetCotesCss(xelement, optionCotes,false);
    }

    public static setPadding(xelement: iXElement, optionCotes: OptionsCotesCSS)
    {
        if (!!xelement && !!optionCotes)
            xStyle.SetCotesCss(xelement, optionCotes, true);
    }
    //#endregion "Margin et Padding"

    //#region "Autre"
    public static setCurseur(xelement: iXElement, Curseur: enumCurseur)
    {
        if (!!xelement && !!Curseur)
        {
            xStyle.supprimerCurseur(xelement);
            if (Curseur != enumCurseur.defaut)
                xStyle.addClass("curseur-" + Curseur, xelement);
                
        }
    }

    public static setWidth(xelement: iXElement, optionTailleCss: OptionTailleCss) {
        let styleOfElement = xelement.y.style;

        if (!!xelement && !!optionTailleCss) {
            if (optionTailleCss.px != null)
                styleOfElement.width = optionTailleCss.px + "px";

            if (optionTailleCss.pourcentage != null)
                styleOfElement.width = optionTailleCss.pourcentage + "%";

            if (optionTailleCss.view_width != null)
                styleOfElement.width = optionTailleCss.view_width + "vw";

            xelement.y.classList.add("width_custom")
        }
    }

    public static setBorder(xelement: iXElement, optionCotes: OptionsCotesCSS, typeBorder?: enumStyleBorderCSS) {
        let styleOfElement = xelement.y.style;
        

        if (typeBorder == null)
            typeBorder = enumStyleBorderCSS.solid;

        if (!!xelement && !!optionCotes) {

            
            // Tous les cotés
            if (!!optionCotes.Tous) { 
                styleOfElement.borderStyle = typeBorder;
                styleOfElement.borderWidth = optionCotes.Tous + "px";                        
            }
                

            // Haut
            if (!!optionCotes.Haut) {
                styleOfElement.borderTopWidth = optionCotes.Haut + "px";
                styleOfElement.borderTopStyle = typeBorder;
            }

            // Bas
            if (!!optionCotes.Bas) {
                styleOfElement.borderBottomWidth = optionCotes.Bas + "px";
                styleOfElement.borderBottomStyle = typeBorder;
            }

            // Droite
            if (!!optionCotes.Droite) {
                styleOfElement.borderRightStyle = typeBorder;
                styleOfElement.borderRightWidth = optionCotes.Droite + "px";
            }
                
            // Gauche
            if (!!optionCotes.Gauche) {
                styleOfElement.borderLeftStyle = typeBorder;
                styleOfElement.borderLeftWidth = optionCotes.Gauche + "px";
            }
                
            // Haut et Bas
            if (!!optionCotes.HautEtBas) {
                styleOfElement.borderBottomStyle = typeBorder;
                styleOfElement.borderTopStyle = typeBorder;
                styleOfElement.borderBottomWidth = optionCotes.HautEtBas + "px";
                styleOfElement.borderTopWidth = optionCotes.HautEtBas + "px";
            }

            if (!!optionCotes.GaucheEtDroite) {
                styleOfElement.borderRightStyle = typeBorder;
                styleOfElement.borderLeftStyle = typeBorder;
                styleOfElement.borderRightWidth = optionCotes.GaucheEtDroite + "px";
                styleOfElement.borderLeftWidth = optionCotes.GaucheEtDroite + "px";
            }
        }
    }

    public static supprimerCurseur(xelement: iXElement)
    {
        if (!!xelement)
        {
            xelement.y.classList.forEach((classe) =>
            {
                if (classe.startsWith("curseur-"))
                    xStyle.removeClass(classe, xelement);
            });
        }
    }

    //#endregion "Autre"
}