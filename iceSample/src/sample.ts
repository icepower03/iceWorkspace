// @ts-ignore
import {
    
    xLib,
    enumThemes,
    xxPageWrapper,
    xxLabel,
    xxBouton,
    enumTypeBouton,
    xxShowRoom
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
    let xPage = new xxPageWrapper({
        titleLocalise: 'test',
        withFooter: true,         // ← sans ça, appendZoneFooter() crashe
    });

    // ── Contenu principal ─────────────────────────────────────────────────
    xPage.append(new xxLabel({ textLocalise: 'Hello' }));

    xPage.append(new xxBouton({
        textLocalise: 'Click Me',
        titleLocalise: 'Click Me',
        typeBouton: enumTypeBouton.Standard,
        click: (cb?: () => void) => { cb?.(); },
    }));

new xxShowRoom({ page: xPage });
    // ── Footer ────────────────────────────────────────────────────────────
    xPage.appendZoneFooter(new xxLabel({ textLocalise: 'Footer' }));

    xPage.attachToBody();
});
