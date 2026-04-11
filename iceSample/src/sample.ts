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
        click: (cb) => { cb?.(); },
    }));

    // ── ShowRoom (API actuelle) ────────────────────────────────────────────
    // 1. Enregistrer les composants dans le registre statique
    xxShowRoomLoader.XElement_Load();       // éléments x* (xDiv, xInput, ...)
    xxShowRoomLoader.XXElement_Load();      // composants xx* (xxLabel, xxBouton, ...)
    xxShowRoomLoader.XElement_Icone_Load(); // icônes

    // 2. Créer et ajouter le container showroom
    xPage.append(new xxShowRoomContainer({}));

    // ── Footer ────────────────────────────────────────────────────────────
    xPage.appendZoneFooter(new xxLabel({ textLocalise: 'Footer' }));

    xPage.attachToBody();
});
