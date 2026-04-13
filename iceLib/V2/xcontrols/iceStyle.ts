import { iceElement } from '../../iceElement';
import { iceOutils } from '../../iceOutils';
import { iXElement, Dictionnaire, OptionsCotesCSS, enumCote, enumCurseur, enumStyleBorderCSS, optionsAffichage, enumCouleurHexa } from '../iceBase';
import * as iceDomUtils from '../iceDomUtils';

export class iceStyle extends iceElement
{
    private dicoTargetCss: Dictionnaire<string> = {};

    /** ATTENTION cet iceElement est a utiliser uniquement unique sous la tutel des graphistes*/
    constructor()
    {
        super("style", { class:"iceStyle"});
        let mythis: iceStyle = this;
        iceOutils.attachToHead(mythis.y);
    }

    public AddCss(Target: string, Css: string, Surcharge?: boolean)
    {
        let mythis: iceStyle = this;
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
        let mythis: iceStyle = this;
        mythis.y.innerHTML = "";
    }

    private genClassCss(Target: string)
    {
        let mythis: iceStyle = this;
        let texteTemp: string = "";
        texteTemp += Target + "{";
        texteTemp += mythis.dicoTargetCss[Target] + "} /**/";
        return texteTemp;
    }

    // ********** //
    //   Static   //
    // ********** //
    public static addClass(s: string, xelement: iXElement) { iceDomUtils.addClass(s, xelement); }
    public static removeClass(s: string, xelement: iXElement) { iceDomUtils.removeClass(s, xelement); }
    public static AppliquerOptionsAffichage(xelement: iXElement, optionsAffichage: optionsAffichage)
    {
        iceDomUtils.AppliquerOptionsAffichage(xelement, optionsAffichage);
    }

    public static getLuminositeCouleurHexa(c: string) { return iceDomUtils.getLuminositeCouleurHexa(c); }
    public static EclaicirCouleurHex(c: string, p: number) { return iceDomUtils.eclaicirCouleurHex(c, p); }
    public static AssombrissementCouleurHex(couleurFondADefinir: string, pourcentageAssombrissement: number): string { return iceDomUtils.eclaicirCouleurHex(couleurFondADefinir, -pourcentageAssombrissement); }
    public static setCouleurFond(e: iXElement, c: string, o?: number, t?: boolean, d?: boolean) { iceDomUtils.setCouleurFond(e, c, o, t, d); }
    public static setCouleurTexte(e: iXElement, c: string) { iceDomUtils.setCouleurTexte(e, c); }
    public static supprimerCouleurFond(e: iXElement) { iceDomUtils.supprimerCouleurFond(e); }
    public static setCouleurFondAvecContrasteTexteAuto(e: iXElement, c: string, o?: number, t?: boolean, d?: boolean) { iceDomUtils.setCouleurFondAvecContrasteTexteAuto(e, c, o, t, d); }
    public static setCouleurBorder(element: iXElement, couleurBorderADefinir: string | enumCouleurHexa, cote?: enumCote, iscouleurBorderDynamique: boolean = true) { iceDomUtils.addClass("couleurBorderDynamique", element); element.y.style.borderColor = "#" + couleurBorderADefinir; }
    public static setMargin(x: iXElement, o: OptionsCotesCSS) { iceDomUtils.setMargin(x, o); }
    public static setPadding(x: iXElement, o: OptionsCotesCSS) { iceDomUtils.setPadding(x, o); }
    public static setCurseur(x: iXElement, c: enumCurseur) { iceDomUtils.setCurseur(x, c); }
    public static supprimerCurseur(x: iXElement) { iceDomUtils.supprimerCurseur(x); }
    public static setBorder(x: iXElement, o: OptionsCotesCSS, t?: enumStyleBorderCSS) { iceDomUtils.setBorder(x, o, t); }
    public static setWidth(xelement: iXElement, optionTailleCss: any) { if (xelement && optionTailleCss) { const s = xelement.y.style; if (optionTailleCss.px != null) s.width = optionTailleCss.px + "px"; if (optionTailleCss.pourcentage != null) s.width = optionTailleCss.pourcentage + "%"; if (optionTailleCss.view_width != null) s.width = optionTailleCss.view_width + "vw"; xelement.y.classList.add("width_custom"); } }


}
