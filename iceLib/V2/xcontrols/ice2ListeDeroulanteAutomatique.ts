// @ts-nocheck
import { iXElement, enumCouleur, enumPosition } from '../iceBase';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2ListeDeroulante } from './ice2ListeDeroulante';
import { ice2RadioButton } from './ice2RadioButton';
import { ice2Bouton, enumTailleBouton, enumStyleBouton, enumCouleurBouton } from './ice2Bouton';
import { ice2Label } from './ice2Label';
import { enumIconeSvg, IconeSvg, Icone } from '../iceIcones';

interface OptionListeDeroulanteAutomatique {
    data: string[],
    libelle: string,
    renderSelected: () => void, //Déclenchée quand click sur la liste pour l'ouvrir ou sur un bouton radio
    valeurSaisie: (val: string) => void, //Déclenchée quand une valeur est saisie,
    versionMobile?: boolean,
    nbElemMaxBouttonsRadio?: number;
}

export class ice2ListeDeroulanteAutomatique implements iXElement {

    private data: string[];
    private libelle: string;
    private renderSelected: () => void;
    private valeurSaisie: (val: string) => void;
    private versionMobile: boolean;
    private nbElemMaxBouttonsRadio: number;

    private elemPrincipal: ice2WrapPanel|ice2ListeDeroulante<string>;


    constructor(o: OptionListeDeroulanteAutomatique) {
        let myThis: ice2ListeDeroulanteAutomatique = this

        myThis.data = o.data;
        myThis.libelle = o.libelle;
        myThis.renderSelected = o.renderSelected;
        myThis.valeurSaisie = o.valeurSaisie;
        myThis.versionMobile = o.versionMobile;
        myThis.nbElemMaxBouttonsRadio = o.nbElemMaxBouttonsRadio != undefined ? o.nbElemMaxBouttonsRadio : 4;

        myThis.affiche();
    }

    private async affiche() {

        let myThis: ice2ListeDeroulanteAutomatique = this;

        if (myThis.data.length > myThis.nbElemMaxBouttonsRadio) {

            //Si il y a plus de 4 éléments dans la liste, on affiche une liste déroulante en plein écran
            let listeElem = new ice2ListeDeroulante({
                class: "ice2RadioButtonListe",
                textVariableMobile: myThis.versionMobile ? myThis.libelle : null,
                donnees: myThis.data,
                renderSelected: function (ici, valeur, cbouvrir) {
                    ici.append(new ice2Bouton({
                        click: function (cb) {

                            myThis.renderSelected();

                            cbouvrir(valeur);
                            cb();
                        },
                        titleLocalise: "Choisir un élément",
                        textVariable: ((valeur)) ?? new iceLString("Choisir un élément").text,
                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.zeus_grisfonce } }),
                        optionsAffichage: { tailleBouton: enumTailleBouton.XS, positionIconeBouton: enumPosition.Right },
                    }));
                },
                renderSelectItem: function (ici, valeurSoin, cbChoisir) {
                    ici.append(new ice2Bouton({
                        click: function (cb) {
                            cbChoisir(valeurSoin);
                        },
                        titleLocalise: 'Choisir cet élément',
                        optionsAffichage: { tailleBouton: enumTailleBouton.XS },
                        textVariable: valeurSoin
                    }));
                },
                selected: function (maSelection) {
                    myThis.valeurSaisie(maSelection);
                }
            });

            myThis.elemPrincipal = listeElem;
        }
        else {

            // Radio bouton
            let radioButtons: ice2RadioButton<string> = new ice2RadioButton<string>({
                valueChange: (button: string) => {
                    myThis.renderSelected();
                    myThis.valeurSaisie(button);
                },
                initElements: [],
                typeBouton: ETypeBouton.boutonWrapper2,

            });

            for (let i = 0; i < myThis.data.length; i++) {
                let itemButtonRadio: itemRadioButton<string> = new itemRadioButton({
                    libelleVariable: myThis.data[i],
                    valeur: myThis.data[i],
                    optionBoutonWrapper2: {
                        optionsAffichage: {
                            styleBouton: enumStyleBouton.Ombre,
                            couleurBouton: enumCouleurBouton.Blanc,
                            tailleBouton: enumTailleBouton.S
                        }
                    }
                });

                radioButtons.ajouterItems([itemButtonRadio])
            }

            let wpRadioButton = new ice2WrapPanel({
                initContent: [radioButtons],
            });

            myThis.elemPrincipal = wpRadioButton;
        }
    }


    get y() {
        return this.elemPrincipal.y;
    }
}