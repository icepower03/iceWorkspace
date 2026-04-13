// @ts-ignore
import {
    
    xLib,
    enumThemes,
    ice2PageWrapper,
    ice2Label,
    ice2Bouton,
    enumTypeBouton,
    ice2ShowRoom
} from 'icelib';

xLib.init(
    {
        langDictionaryData: { "test": "test traduit" },
        missingTranslationCallback: (val: string) => { console.log('traduction manquante : ' + val); },
        debugAddTranslationCallback: (val: string) => { console.log('debug traduction : ' + val); },
        jsDependencyPath: "../iceLib/include/",
        theme: () => enumThemes.ThemeLegacy,
    },
    {
        debug: false,
        contexteUrlPage: './',
        fileCacheTag: 'cc',
    }
);

document.addEventListener("DOMContentLoaded", () => {

    // ── Page principale ────────────────────────────────────────────────────
    // withFooter: true est obligatoire pour pouvoir appeler appendZoneFooter()
    let xPage = new ice2PageWrapper({
        titleLocalise: 'test',
        withFooter: true,         // ← sans ça, appendZoneFooter() crashe
    });

    // ── Contenu principal ─────────────────────────────────────────────────
    xPage.append(new ice2Label({ textLocalise: 'Hello' }));

    xPage.append(new ice2Bouton({
        textLocalise: 'Click Me',
        titleLocalise: 'Click Me',
        typeBouton: enumTypeBouton.Standard,
        click: (cb?: () => void) => { cb?.(); },
    }));

new ice2ShowRoom({ page: xPage });
    // ── Footer ────────────────────────────────────────────────────────────
    xPage.appendZoneFooter(new ice2Label({ textLocalise: 'Footer' }));

    xPage.attachToBody();
});
