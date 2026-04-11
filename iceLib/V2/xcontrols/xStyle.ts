import { xElement } from '../../xElement';
import { xOutils } from '../../xOutils';
import { iXElement, Dictionnaire, OptionsCotesCSS, enumCote, enumCurseur, enumStyleBorderCSS, optionsAffichage, enumCouleurHexa } from '../xBase';
import * as xDomUtils from '../xDomUtils';

export class xStyle extends xElement
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
    public static addClass(s: string, xelement: iXElement) { xDomUtils.addClass(s, xelement); }
    public static removeClass(s: string, xelement: iXElement) { xDomUtils.removeClass(s, xelement); }
    public static AppliquerOptionsAffichage(xelement: iXElement, optionsAffichage: optionsAffichage)
    {
        xDomUtils.AppliquerOptionsAffichage(xelement, optionsAffichage);
    }

    public static getLuminositeCouleurHexa(c: string) { return xDomUtils.getLuminositeCouleurHexa(c); }
    public static EclaicirCouleurHex(c: string, p: number) { return xDomUtils.eclaicirCouleurHex(c, p); }
    public static AssombrissementCouleurHex(couleurFondADefinir: string, pourcentageAssombrissement: number): string { return xDomUtils.eclaicirCouleurHex(couleurFondADefinir, -pourcentageAssombrissement); }
    public static setCouleurFond(e: iXElement, c: string, o?: number, t?: boolean, d?: boolean) { xDomUtils.setCouleurFond(e, c, o, t, d); }
    public static setCouleurTexte(e: iXElement, c: string) { xDomUtils.setCouleurTexte(e, c); }
    public static supprimerCouleurFond(e: iXElement) { xDomUtils.supprimerCouleurFond(e); }
    public static setCouleurFondAvecContrasteTexteAuto(e: iXElement, c: string, o?: number, t?: boolean, d?: boolean) { xDomUtils.setCouleurFondAvecContrasteTexteAuto(e, c, o, t, d); }
    public static setCouleurBorder(element: iXElement, couleurBorderADefinir: string | enumCouleurHexa, cote?: enumCote, iscouleurBorderDynamique: boolean = true) { xDomUtils.addClass("couleurBorderDynamique", element); element.y.style.borderColor = "#" + couleurBorderADefinir; }
    public static setMargin(x: iXElement, o: OptionsCotesCSS) { xDomUtils.setMargin(x, o); }
    public static setPadding(x: iXElement, o: OptionsCotesCSS) { xDomUtils.setPadding(x, o); }
    public static setCurseur(x: iXElement, c: enumCurseur) { xDomUtils.setCurseur(x, c); }
    public static supprimerCurseur(x: iXElement) { xDomUtils.supprimerCurseur(x); }
    public static setBorder(x: iXElement, o: OptionsCotesCSS, t?: enumStyleBorderCSS) { xDomUtils.setBorder(x, o, t); }
    public static setWidth(xelement: iXElement, optionTailleCss: any) { if (xelement && optionTailleCss) { const s = xelement.y.style; if (optionTailleCss.px != null) s.width = optionTailleCss.px + "px"; if (optionTailleCss.pourcentage != null) s.width = optionTailleCss.pourcentage + "%"; if (optionTailleCss.view_width != null) s.width = optionTailleCss.view_width + "vw"; xelement.y.classList.add("width_custom"); } }


}
