enum enumAffichageZoom {
    modeSlider,
    modeListeHorizontale,
    modeListeVerticale,
    modeOnlyBouton,
}

interface OptionsZoom extends iTestable {
    niveauxZoomPerCent: number[];
    afterZoom: (zoom: number) => void;
    modeAffichage?: enumAffichageZoom;
    zoomChoisi?: number;
}

let ecartPx: number = 25;

class xxZoom implements iXElement {
    
    private rangNiveauZoom: number;
    private listeNiveauxZoom: number[];

    private wrapPanelPrincipal: xxWrapPanel = null;
    private stackPanelPrincipal: xxStackPanel = null;
    private divGlissiere: xDiv = null;

    private boutonZoom: xxBouton = null;
    private boutonGlissiere: xxLabel = null;
    private boutonDezoom: xxBouton = null;

    private ModeAffichage: enumAffichageZoom;

    private afterZoom: (zoom: number) => void = null;

    public constructor(o: OptionsZoom) {
        let myThis: xxZoom = this;
      
        if (o.afterZoom != null)
            myThis.afterZoom = o.afterZoom;
        else
            myThis.afterZoom = () => { }

        myThis.listeNiveauxZoom = o.niveauxZoomPerCent.sort(function (n1, n2) { return n1 - n2 });
        myThis.rangNiveauZoom = (Math.ceil(myThis.listeNiveauxZoom.length / 2) - 1);

        myThis.wrapPanelPrincipal = new xxWrapPanel({ class: "xxZoom", espaceMinimaliste: true, gap: 5 });

        myThis.stackPanelPrincipal = new xxStackPanel({ class: "xxZoom", espaceMinimaliste: true, gap: 5 })

        myThis.divGlissiere = new xDiv({ class: "Glissiere" });
        myThis.divGlissiere.y.style.width = (ecartPx * (myThis.listeNiveauxZoom.length + 1)).toString() + "px";

        if (o.modeAffichage != undefined)
            myThis.ModeAffichage = o.modeAffichage;
        else
            myThis.ModeAffichage = enumAffichageZoom.modeSlider;

        if (o.zoomChoisi != undefined)
            myThis.rangNiveauZoom = myThis.listeNiveauxZoom.indexOf(o.zoomChoisi);

        myThis.createAffichage();

    }

    public createAffichage() {
        let myThis: xxZoom = this;

        myThis.wrapPanelPrincipal.vider()

        if (myThis.ModeAffichage == enumAffichageZoom.modeSlider) {

            myThis.boutonZoom = new xxBouton({
                class: "boutonZoom",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit
                },
                titleLocalise: "Zoomer",
                icone: new IconeCs3i(enumIconeCs3i.action_zoom_plus),
                click: function (cb) {
                    myThis.zoom();
                    cb();
                }
            })

            myThis.boutonDezoom = new xxBouton({
                class: "boutonDezoom",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit
                },
                titleLocalise: "Dézoomer",
                icone: new IconeCs3i(enumIconeCs3i.action_zoom_moins),
                click: function (cb) {
                    myThis.dezoom();
                    cb();
                }
            })

            myThis.boutonGlissiere = new xxLabel({
                class: "boutonGlissiere",
                textLocalise: myThis.listeNiveauxZoom[myThis.rangNiveauZoom].toString() + "%",
            })
            myThis.divGlissiere.asHolder.append(myThis.boutonGlissiere);
            myThis.boutonGlissiere.y.style.left = (ecartPx * myThis.rangNiveauZoom).toString() + "px";
            myThis.boutonGlissiere.y.style.width = ((ecartPx * 2) - 2).toString() + "px";

            $(myThis.boutonGlissiere.y).draggable({
                containment: ".Glissiere",
                cursor: "grabbing",
                drag: function (event, ui) {
                    let rang: number = ui.position.left / ecartPx;

                    if (rang != myThis.rangNiveauZoom) {

                        myThis.rangNiveauZoom = rang;

                        myThis.applyZoom();
                    }
                },

                axis: "x",
                grid: [ecartPx, 0]
            })

            myThis.divGlissiere.asHolder.append(myThis.boutonGlissiere);

            myThis.wrapPanelPrincipal.append(myThis.boutonDezoom);
            myThis.wrapPanelPrincipal.append(myThis.divGlissiere);
            myThis.wrapPanelPrincipal.append(myThis.boutonZoom);

        } else if (myThis.ModeAffichage == enumAffichageZoom.modeListeHorizontale || myThis.ModeAffichage == enumAffichageZoom.modeListeVerticale) {
            if (myThis.rangNiveauZoom == undefined)
                myThis.rangNiveauZoom = 0;


            let listZoom: xxListeDeroulante<number> = new xxListeDeroulante({
                donnees: myThis.listeNiveauxZoom,
                class: "ListeNiveauxZoom",
                defaultValue: myThis.listeNiveauxZoom[myThis.rangNiveauZoom],
                renderSelectItem: (place, item, selecteur) => {
                    place.append(new xxBouton({
                        textLocalise: item.toString() + "%",
                        titleLocalise: "Choisir ce zoom",
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.S,
                        },
                        click: cb => {
                            selecteur(item);
                            cb();
                        }
                    }))

                },
                renderSelected: (place, item, select) => {
                    place.append(new xxBouton({
                        class: "boutonSelectPourcentage",
                        textLocalise: item != null ? item.toString() + "%" : "",
                        icone: new IconeCs3i(enumIconeCs3i.fleche_select, { taille: tailleIcone.XS }),
                        titleLocalise: "Changer de zoom",
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit,
                            positionIconeBouton: enumPosition.Right,
                            margin: { Tous: 0 }
                        },
                        click: cb => {
                            select(item);
                            cb();
                        }
                    }))
                },
                selected: item => {
                    myThis.rangNiveauZoom = myThis.listeNiveauxZoom.indexOf(item);
                    myThis.afterZoom(myThis.listeNiveauxZoom[myThis.rangNiveauZoom]);
                }
            })

            let boutonMoins: xxBouton = new xxBouton({
                titleLocalise: "Dézoomer",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit,
                    margin: { Tous: 0 }
                },
                icone: new IconeCs3i(enumIconeCs3i.action_zoom_moins, { taille: tailleIcone.S }),
                class: "zoomMoins",
                click: cb => {
                    if (myThis.rangNiveauZoom > 0) {
                        myThis.rangNiveauZoom--;
                        listZoom.selecteur(myThis.listeNiveauxZoom[myThis.rangNiveauZoom]);
                    }
                    cb();
                }
            })

            let boutonPlus: xxBouton = new xxBouton({
                titleLocalise: "Zoomer",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit,
                    margin: { Tous: 0 }
                },
                icone: new IconeCs3i(enumIconeCs3i.action_zoom_plus, { taille: tailleIcone.S }),
                class: "zoomPlus",
                click: cb => {
                    if (myThis.rangNiveauZoom + 1 < myThis.listeNiveauxZoom.length) {
                        myThis.rangNiveauZoom++;
                        listZoom.selecteur(myThis.listeNiveauxZoom[myThis.rangNiveauZoom]);
                    }
                    cb();
                }
            })

            if (myThis.ModeAffichage == enumAffichageZoom.modeListeVerticale)
                myThis.stackPanelPrincipal.append(new xxWrapPanel({ initContent: [boutonMoins, boutonPlus], espaceMinimaliste: true, gap: 5 })).append(listZoom);
            else
                myThis.wrapPanelPrincipal.append(listZoom).append(boutonMoins).append(boutonPlus);
        } else if (myThis.ModeAffichage == enumAffichageZoom.modeOnlyBouton) {

            let boutonMoins: xxBouton = new xxBouton({
                titleLocalise: "Dézoomer",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit,
                    margin: { Tous: 0 }
                },
                icone: new IconeCs3i(enumIconeCs3i.action_zoom_moins, { taille: tailleIcone.S }),
                class: "zoomMoins",
                click: cb => {
                    if (myThis.rangNiveauZoom > 0) {
                        myThis.rangNiveauZoom--;

                        myThis.afterZoom(myThis.listeNiveauxZoom[myThis.rangNiveauZoom]);
                    }
                    cb();
                }
            });

            let boutonPlus: xxBouton = new xxBouton({
                titleLocalise: "Zoomer",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit,
                    margin: { Tous: 0 }
                },
                icone: new IconeCs3i(enumIconeCs3i.action_zoom_plus, { taille: tailleIcone.S }),
                class: "zoomPlus",
                click: cb => {
                    if (myThis.rangNiveauZoom + 1 < myThis.listeNiveauxZoom.length) {
                        myThis.rangNiveauZoom++;
                        myThis.afterZoom(myThis.listeNiveauxZoom[myThis.rangNiveauZoom]);
                    }
                    cb();
                }
            });

            myThis.wrapPanelPrincipal.append(boutonMoins).append(boutonPlus);
        }
    }

    public getNiveauZoom(): number {
        let myThis: xxZoom = this;
        return myThis.listeNiveauxZoom[myThis.rangNiveauZoom];
    }

    public setNiveauZoom(niveauZoomPerCent: number): void {
        let myThis: xxZoom = this;

        let minDelta: number = null;
        let rangNiveauPlusProche: number = null;

        myThis.listeNiveauxZoom.forEach(function (niveaux, index) {
            let delta: number = Math.abs(niveaux - niveauZoomPerCent);

            if (rangNiveauPlusProche == null || delta < minDelta) {
                minDelta = delta;
                rangNiveauPlusProche = index;
            }
        })

        myThis.rangNiveauZoom = rangNiveauPlusProche;
        myThis.boutonGlissiere.y.style.left = (myThis.rangNiveauZoom * ecartPx).toString() + "px";
        myThis.applyZoom();
    }

    public zoom(): void {
        let myThis: xxZoom = this;

        if (myThis.rangNiveauZoom < myThis.listeNiveauxZoom.length - 1)
        {
            myThis.rangNiveauZoom += 1;
            myThis.boutonGlissiere.y.style.left = (myThis.rangNiveauZoom * ecartPx).toString() + "px";
            myThis.applyZoom();
        }
    }

    public dezoom(): void {
        let myThis: xxZoom = this;

        if (myThis.rangNiveauZoom > 0)
        {
            myThis.rangNiveauZoom -= 1;
            myThis.boutonGlissiere.y.style.left = (myThis.rangNiveauZoom * ecartPx).toString() + "px";
            myThis.applyZoom();
        }
    }

    private applyZoom() {
        let myThis: xxZoom = this;
        
        myThis.boutonGlissiere.changerTextLocalise(myThis.listeNiveauxZoom[myThis.rangNiveauZoom].toString() + "%")

        myThis.afterZoom(myThis.getNiveauZoom());
    }

   

    public get y(): HTMLElement {
        let myThis: xxZoom = this;
        if (myThis.ModeAffichage == enumAffichageZoom.modeListeHorizontale || myThis.ModeAffichage == enumAffichageZoom.modeSlider || myThis.ModeAffichage == enumAffichageZoom.modeOnlyBouton)
            return myThis.wrapPanelPrincipal.y;
        else
            return myThis.stackPanelPrincipal.y;

    }
}