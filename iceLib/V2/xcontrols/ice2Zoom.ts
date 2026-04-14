import { iXElement, iXElementHolder, iTestable, enumPosition } from '../iceBase';
import { iceDiv } from './iceDiv';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2StackPanel } from './ice2StackPanel';
import { ice2Label } from './ice2Label';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';
import { ice2RadioButton } from './ice2RadioButton';
import { ice2ListeDeroulante } from './ice2ListeDeroulante';
import { enumIconeP12, IconeP12, tailleIcone, Icone } from '../iceIcones';

export enum enumAffichageZoom {
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

export class ice2Zoom implements iXElement {
    
    private rangNiveauZoom: number;
    private listeNiveauxZoom: number[];

    private wrapPanelPrincipal: ice2WrapPanel = null;
    private stackPanelPrincipal: ice2StackPanel = null;
    private divGlissiere: iceDiv = null;

    private boutonZoom: ice2Bouton = null;
    private boutonGlissiere: ice2Label = null;
    private boutonDezoom: ice2Bouton = null;

    private ModeAffichage: enumAffichageZoom;

    private afterZoom: (zoom: number) => void = null;

    public constructor(o: OptionsZoom) {
        let myThis: ice2Zoom = this;
      
        if (o.afterZoom != null)
            myThis.afterZoom = o.afterZoom;
        else
            myThis.afterZoom = () => { }

        myThis.listeNiveauxZoom = o.niveauxZoomPerCent.sort(function (n1, n2) { return n1 - n2 });
        myThis.rangNiveauZoom = (Math.ceil(myThis.listeNiveauxZoom.length / 2) - 1);

        myThis.wrapPanelPrincipal = new ice2WrapPanel({ class: "ice2Zoom", espaceMinimaliste: true, gap: 5 });

        myThis.stackPanelPrincipal = new ice2StackPanel({ class: "ice2Zoom", espaceMinimaliste: true, gap: 5 })

        myThis.divGlissiere = new iceDiv({ class: "Glissiere" });
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
        let myThis: ice2Zoom = this;

        myThis.wrapPanelPrincipal.vider()

        if (myThis.ModeAffichage == enumAffichageZoom.modeSlider) {

            myThis.boutonZoom = new ice2Bouton({
                class: "boutonZoom",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit
                },
                titleLocalise: "Zoomer",
                icone: new IconeP12(enumIconeP12.action_zoom_plus),
                click: function (cb) {
                    myThis.zoom();
                    cb();
                }
            })

            myThis.boutonDezoom = new ice2Bouton({
                class: "boutonDezoom",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit
                },
                titleLocalise: "Dézoomer",
                icone: new IconeP12(enumIconeP12.action_zoom_moins),
                click: function (cb) {
                    myThis.dezoom();
                    cb();
                }
            })

            myThis.boutonGlissiere = new ice2Label({
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


            let listZoom: ice2ListeDeroulante<number> = new ice2ListeDeroulante({
                donnees: myThis.listeNiveauxZoom,
                class: "ListeNiveauxZoom",
                defaultValue: myThis.listeNiveauxZoom[myThis.rangNiveauZoom],
                renderSelectItem: (place, item, selecteur) => {
                    place.append(new ice2Bouton({
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
                    place.append(new ice2Bouton({
                        class: "boutonSelectPourcentage",
                        textLocalise: item != null ? item.toString() + "%" : "",
                        icone: new IconeP12(enumIconeP12.fleche_select, { taille: tailleIcone.XS }),
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

            let boutonMoins: ice2Bouton = new ice2Bouton({
                titleLocalise: "Dézoomer",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit,
                    margin: { Tous: 0 }
                },
                icone: new IconeP12(enumIconeP12.action_zoom_moins, { taille: tailleIcone.S }),
                class: "zoomMoins",
                click: cb => {
                    if (myThis.rangNiveauZoom > 0) {
                        myThis.rangNiveauZoom--;
                        listZoom.selecteur(myThis.listeNiveauxZoom[myThis.rangNiveauZoom]);
                    }
                    cb();
                }
            })

            let boutonPlus: ice2Bouton = new ice2Bouton({
                titleLocalise: "Zoomer",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit,
                    margin: { Tous: 0 }
                },
                icone: new IconeP12(enumIconeP12.action_zoom_plus, { taille: tailleIcone.S }),
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
                myThis.stackPanelPrincipal.append(new ice2WrapPanel({ initContent: [boutonMoins, boutonPlus], espaceMinimaliste: true, gap: 5 })).append(listZoom);
            else
                myThis.wrapPanelPrincipal.append(listZoom).append(boutonMoins).append(boutonPlus);
        } else if (myThis.ModeAffichage == enumAffichageZoom.modeOnlyBouton) {

            let boutonMoins: ice2Bouton = new ice2Bouton({
                titleLocalise: "Dézoomer",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit,
                    margin: { Tous: 0 }
                },
                icone: new IconeP12(enumIconeP12.action_zoom_moins, { taille: tailleIcone.S }),
                class: "zoomMoins",
                click: cb => {
                    if (myThis.rangNiveauZoom > 0) {
                        myThis.rangNiveauZoom--;

                        myThis.afterZoom(myThis.listeNiveauxZoom[myThis.rangNiveauZoom]);
                    }
                    cb();
                }
            });

            let boutonPlus: ice2Bouton = new ice2Bouton({
                titleLocalise: "Zoomer",
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.Fit,
                    margin: { Tous: 0 }
                },
                icone: new IconeP12(enumIconeP12.action_zoom_plus, { taille: tailleIcone.S }),
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
        let myThis: ice2Zoom = this;
        return myThis.listeNiveauxZoom[myThis.rangNiveauZoom];
    }

    public setNiveauZoom(niveauZoomPerCent: number): void {
        let myThis: ice2Zoom = this;

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
        let myThis: ice2Zoom = this;

        if (myThis.rangNiveauZoom < myThis.listeNiveauxZoom.length - 1)
        {
            myThis.rangNiveauZoom += 1;
            myThis.boutonGlissiere.y.style.left = (myThis.rangNiveauZoom * ecartPx).toString() + "px";
            myThis.applyZoom();
        }
    }

    public dezoom(): void {
        let myThis: ice2Zoom = this;

        if (myThis.rangNiveauZoom > 0)
        {
            myThis.rangNiveauZoom -= 1;
            myThis.boutonGlissiere.y.style.left = (myThis.rangNiveauZoom * ecartPx).toString() + "px";
            myThis.applyZoom();
        }
    }

    private applyZoom() {
        let myThis: ice2Zoom = this;
        
        myThis.boutonGlissiere.changerTextLocalise(myThis.listeNiveauxZoom[myThis.rangNiveauZoom].toString() + "%")

        myThis.afterZoom(myThis.getNiveauZoom());
    }

   

    public get y(): HTMLElement {
        let myThis: ice2Zoom = this;
        if (myThis.ModeAffichage == enumAffichageZoom.modeListeHorizontale || myThis.ModeAffichage == enumAffichageZoom.modeSlider || myThis.ModeAffichage == enumAffichageZoom.modeOnlyBouton)
            return myThis.wrapPanelPrincipal.y;
        else
            return myThis.stackPanelPrincipal.y;

    }
}