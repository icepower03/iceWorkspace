// @ts-nocheck
import { iXElement } from '../xBase';
import { xxGrid, xxGridItem, enumAlignementContenu } from './xxGrid';
import { xxBouton, enumTailleBouton, enumTypeBouton } from './xxBouton';
import { xxImageTabByte, enumTypeImage } from './xxImageTabByte';
import { xxLabel } from './xxLabel';
import { enumIconeSvg, IconeSvg, tailleIcone, Icone } from '../xIcones';

interface OptionCarrousel {
    photos64: string[],
    indice_depart: number,
    class?: string,
    valueChange: (index: number) => void,
}

export class xxCarrousel implements iXElement {

    private photos64: string[];
    private indexListe: number;

    private elemPrincipal: xxGrid;

    private valueChange: (index: number) => void;

    //Méthode pour boutons etc...

    constructor(o: OptionCarrousel) {
        let myThis: xxCarrousel = this

        myThis.photos64 = o.photos64;
        myThis.indexListe = o.indice_depart;
        myThis.valueChange = o.valueChange;

        myThis.elemPrincipal = new xxGrid({
            colonnes: ["40px", "1fr", "40px"],
            gridGap: "5px 10px",
            class: "gridCarrousel",
        });

        myThis.affiche();
    }

    private async affiche() {
        let myThis: xxCarrousel = this;

        let buttonPrec = new xxBouton({
            click: async function (cb) {
                myThis.indexListe = myThis.indexListe - 1;
                await myThis.valueChange(myThis.indexListe);
                myThis.elemPrincipal.vider();
                myThis.affiche();
                cb();
            },
            optionsAffichage: {
                boutonArrondi: true,
                tailleBouton: enumTailleBouton.Fit,
            },
            typeBouton: enumTypeBouton.Standard,
            titleLocalise: "Photo précédente",
            icone: new IconeSvg(enumIconeSvg.chevron_gauche, { taille:tailleIcone.M })
        });

        let itemButtonPrec: xxGridItem = new xxGridItem({
            colStart: 1,
            rowStart: 1,
            optionsAffichage: {
                alignementContenu: enumAlignementContenu.CentreDroite
            },
            content: buttonPrec,
            class: "button",
        });

        let buttonSuiv = new xxBouton({
            click: async function (cb) {
                myThis.indexListe = myThis.indexListe + 1;
                await myThis.valueChange(myThis.indexListe);
                myThis.elemPrincipal.vider();
                myThis.affiche();
                cb();
            },
            optionsAffichage: {
                boutonArrondi: true,
                tailleBouton: enumTailleBouton.Fit,
            },
            typeBouton: enumTypeBouton.Standard,
            titleLocalise: "Photo suivante",
            icone: new IconeSvg(enumIconeSvg.chevron_droite, { taille: tailleIcone.M })
        });

        let itemButtonSuiv: xxGridItem = new xxGridItem({
            colStart: 3,
            rowStart: 1,
            optionsAffichage: {
                alignementContenu: enumAlignementContenu.CentreGauche
            },
            content: buttonSuiv,
            class: "button",
        });

        if (myThis.indexListe <= 0) {
            buttonPrec.hideButton();
        }
        else {
            buttonPrec.showButton();
        }

        if (myThis.indexListe >= myThis.photos64.length - 1) {
            buttonSuiv.hideButton();
        }
        else {
            buttonSuiv.showButton();
        }

        let img: xxImageTabByte = new xxImageTabByte({
            tabByte: myThis.photos64[myThis.indexListe],
            typeAffichage: enumTypeImage.domImage,
            class: "imagePlaieDetails",
        });

        let itemImg: xxGridItem = new xxGridItem({
            colStart: 2,
            rowStart: 1,
            nbCols: 1,
            optionsAffichage: {
                alignementContenu: enumAlignementContenu.CentreCentre
            },
            content: img,
        });

        let legendeImage: xxGridItem = new xxGridItem({
            colStart: 1,
            rowStart: 2,
            nbCols: 3,
            optionsAffichage: {
                alignementContenu: enumAlignementContenu.CentreCentre
            },
            content: new xxLabel({
                textVariable: new xLString("Photo {0}/{1}").format([myThis.indexListe + 1, myThis.photos64.length])
            }),
            class: "legende",
        })

        myThis.elemPrincipal.append([itemButtonPrec, itemButtonSuiv, itemImg, legendeImage]);
    }

    public ajouterData(indice: number, photo: string) {
        let myThis: xxCarrousel = this;

        myThis.photos64[indice] = photo;
        myThis.elemPrincipal.vider();
        myThis.affiche();
    }

  

    get y() {
        return this.elemPrincipal.y;
    }
}