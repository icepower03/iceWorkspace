// Utilitaires DOM purs, sans dépendance vers xElement ni xStyle.
// Permet de briser la dépendance circulaire xElement ↔ xStyle.

import type { iXElement, OptionsCotesCSS, enumCote, enumCurseur, enumStyleBorderCSS, optionsAffichage } from './xBase';

export function addClass(s: string, xelement: iXElement): void {
    s.split(' ').forEach(c => { xelement?.y?.classList.add(c); });
}

export function removeClass(s: string, xelement: iXElement): void {
    s.split(' ').forEach(c => { xelement?.y?.classList.remove(c); });
}

export function isCouleurHexa(couleurHexa: string): boolean {
    if (!!couleurHexa) couleurHexa = couleurHexa.replace("#", "");
    else return false;
    return couleurHexa.length == 6;
}

export function getLuminositeCouleurHexa(couleurFondADefinir: string): number {
    if (isCouleurHexa(couleurFondADefinir)) {
        couleurFondADefinir = couleurFondADefinir.replace("#", "");
        const r = parseInt(couleurFondADefinir.substr(0, 2), 16);
        const v = parseInt(couleurFondADefinir.substr(2, 2), 16);
        const b = parseInt(couleurFondADefinir.substr(4, 2), 16);
        return Math.round(Math.sqrt(r * r * .241 + v * v * .691 + b * b * .068));
    }
    return -1;
}

function eclaicirAssombrirDecimal(decimalColor: number, pourcentage: number, eclaircissement: boolean): number {
    let toSender = decimalColor;
    if (decimalColor <= 255 && decimalColor >= 0) {
        toSender += pourcentage * ((eclaircissement ? 255 : 0) - decimalColor) / 100;
        toSender = Math.round(toSender);
        if (toSender > 255) toSender = 255;
        else if (toSender < 0) toSender = 0;
    }
    return toSender;
}

export function eclaicirCouleurHex(couleurFondADefinir: string, pourcentageEclaicisment: number): string {
    if (!isCouleurHexa(couleurFondADefinir)) return null;
    couleurFondADefinir = couleurFondADefinir.replace("#", "");
    pourcentageEclaicisment = Math.max(0, Math.min(100, pourcentageEclaicisment));
    if (couleurFondADefinir.length >= 6) {
        const r = eclaicirAssombrirDecimal(parseInt(couleurFondADefinir.slice(0, 2), 16), pourcentageEclaicisment, true);
        const v = eclaicirAssombrirDecimal(parseInt(couleurFondADefinir.slice(2, 4), 16), pourcentageEclaicisment, true);
        const b = eclaicirAssombrirDecimal(parseInt(couleurFondADefinir.slice(4, 6), 16), pourcentageEclaicisment, true);
        if (!isNaN(r) && !isNaN(v) && !isNaN(b))
            return r.toString(16) + v.toString(16) + b.toString(16);
    }
    return couleurFondADefinir;
}

export function setCouleurFond(element: iXElement, couleurFondADefinir: string, opacite?: number, transparence: boolean = false, iscouleurFondDynamique: boolean = true): void {
    if (!isCouleurHexa(couleurFondADefinir)) return;
    couleurFondADefinir = couleurFondADefinir.replace("#", "");
    if (opacite != null) {
        opacite = Math.max(0, Math.min(100, opacite));
        if (!transparence) {
            couleurFondADefinir = eclaicirCouleurHex(couleurFondADefinir, opacite);
        } else {
            const valeurDecimale = Math.round(opacite * 255 / 100);
            const opaciteHexa = opacite < 7 ? "0" + valeurDecimale.toString(16) : valeurDecimale.toString(16);
            couleurFondADefinir = couleurFondADefinir + opaciteHexa;
        }
    }
    element.y.style.backgroundColor = "#" + couleurFondADefinir;
    if (iscouleurFondDynamique) addClass("couleurFondDynamique", element);
}

export function setCouleurTexte(element: iXElement, couleurTexteADefinir: string): void {
    if (isCouleurHexa(couleurTexteADefinir)) {
        element.y.style.color = "#" + couleurTexteADefinir;
        addClass("couleurTexteDynamique", element);
    }
}

export function supprimerCouleurFond(element: iXElement): void {
    removeClass("couleurAutoBlanc couleurAutoNoir couleurFondDynamique", element);
    element.y.style.backgroundColor = "transparent";
}

export function setCouleurFondAvecContrasteTexteAuto(element: iXElement, couleurFondADefinir: string, opacite?: number, transparence: boolean = false, iscouleurFondDynamique: boolean = true): void {
    if (isCouleurHexa(couleurFondADefinir)) couleurFondADefinir = couleurFondADefinir.replace("#", "");
    else couleurFondADefinir = "F1F1F1";

    if (opacite != null) {
        opacite = Math.max(0, Math.min(100, opacite));
        if (!transparence) { couleurFondADefinir = eclaicirCouleurHex(couleurFondADefinir, opacite); opacite = null; }
    }

    setCouleurFond(element, couleurFondADefinir, opacite, transparence, iscouleurFondDynamique);
    const luminosite = getLuminositeCouleurHexa(couleurFondADefinir);
    removeClass("couleurAutoBlanc couleurAutoNoir", element);
    addClass((opacite > 70 && transparence) || luminosite < 155 ? "couleurAutoBlanc" : "couleurAutoNoir", element);
}

export function AppliquerOptionsAffichage(xelement: iXElement, optionsAff: optionsAffichage): void {
    if (!optionsAff || !xelement) return;
    if (optionsAff.margin) setMargin(xelement, optionsAff.margin);
    if (optionsAff.padding) setPadding(xelement, optionsAff.padding);
    if (optionsAff.curseur) setCurseur(xelement, optionsAff.curseur);
    if (optionsAff.border) setBorder(xelement, optionsAff.border);
}

function SetCotesCss(xelement: iXElement, optionCotes: OptionsCotesCSS, isPadding: boolean): void {
    const s = xelement.y.style;
    if (optionCotes.Tous != null) { if (isPadding) s.padding = optionCotes.Tous + "px"; else s.margin = optionCotes.Tous + "px"; }
    if (optionCotes.HautEtBas != null) {
        if (isPadding) { s.paddingTop = optionCotes.HautEtBas + "px"; s.paddingBottom = optionCotes.HautEtBas + "px"; }
        else { s.marginTop = optionCotes.HautEtBas + "px"; s.marginBottom = optionCotes.HautEtBas + "px"; }
    } else {
        if (optionCotes.Haut != null) { if (isPadding) s.paddingTop = optionCotes.Haut + "px"; else s.marginTop = optionCotes.Haut + "px"; }
        if (optionCotes.Bas != null) { if (isPadding) s.paddingBottom = optionCotes.Bas + "px"; else s.marginBottom = optionCotes.Bas + "px"; }
    }
    if (optionCotes.GaucheEtDroite != null) {
        if (isPadding) { s.paddingRight = optionCotes.GaucheEtDroite + "px"; s.paddingLeft = optionCotes.GaucheEtDroite + "px"; }
        else { s.marginRight = optionCotes.GaucheEtDroite + "px"; s.marginLeft = optionCotes.GaucheEtDroite + "px"; }
    } else {
        if (optionCotes.Droite != null) { if (isPadding) s.paddingRight = optionCotes.Droite + "px"; else s.marginRight = optionCotes.Droite + "px"; }
        if (optionCotes.Gauche != null) { if (isPadding) s.paddingLeft = optionCotes.Gauche + "px"; else s.marginLeft = optionCotes.Gauche + "px"; }
    }
}

export function setMargin(xelement: iXElement, optionCotes: OptionsCotesCSS): void {
    if (xelement && optionCotes) SetCotesCss(xelement, optionCotes, false);
}
export function setPadding(xelement: iXElement, optionCotes: OptionsCotesCSS): void {
    if (xelement && optionCotes) SetCotesCss(xelement, optionCotes, true);
}

export function setCurseur(xelement: iXElement, curseur: enumCurseur): void {
    if (!xelement || !curseur) return;
    supprimerCurseur(xelement);
    if (curseur !== "default" as enumCurseur) addClass("curseur-" + curseur, xelement);
}

export function supprimerCurseur(xelement: iXElement): void {
    if (!xelement) return;
    xelement.y.classList.forEach(c => { if (c.startsWith("curseur-")) removeClass(c, xelement); });
}

export function setBorder(xelement: iXElement, optionCotes: OptionsCotesCSS, typeBorder: enumStyleBorderCSS = "solid" as enumStyleBorderCSS): void {
    if (!xelement || !optionCotes) return;
    const s = xelement.y.style;
    if (optionCotes.Tous) { s.borderStyle = typeBorder; s.borderWidth = optionCotes.Tous + "px"; }
    if (optionCotes.Haut) { s.borderTopWidth = optionCotes.Haut + "px"; s.borderTopStyle = typeBorder; }
    if (optionCotes.Bas) { s.borderBottomWidth = optionCotes.Bas + "px"; s.borderBottomStyle = typeBorder; }
    if (optionCotes.Droite) { s.borderRightStyle = typeBorder; s.borderRightWidth = optionCotes.Droite + "px"; }
    if (optionCotes.Gauche) { s.borderLeftStyle = typeBorder; s.borderLeftWidth = optionCotes.Gauche + "px"; }
    if (optionCotes.HautEtBas) {
        s.borderBottomStyle = s.borderTopStyle = typeBorder;
        s.borderBottomWidth = s.borderTopWidth = optionCotes.HautEtBas + "px";
    }
    if (optionCotes.GaucheEtDroite) {
        s.borderRightStyle = s.borderLeftStyle = typeBorder;
        s.borderRightWidth = s.borderLeftWidth = optionCotes.GaucheEtDroite + "px";
    }
}
