import { iXElement, enumPosition } from '../iceBase';
import { xInputText } from './iceInput';
import { ice2Bouton } from './ice2Bouton';
import { ice2Boxer, enumBoxerTaille, enumBoxerMode } from './ice2Boxer';
import { ice2PageWrapper } from './ice2PageWrapper';
import { ice2Label, enumTypeLabel } from './ice2Label';
import { IconeP12, enumIconeP12, Icone } from '../iceIcones';
import { ice2Grid, ice2GridItem, enumAlignementContenu } from './ice2Grid';
import { ice2ImageTabByte, enumTypeImage } from './ice2ImageTabByte';
import { iceOutils, ETypeAlertify } from '../../iceOutils';

interface OptionsLecteurCarteMagnetique
{
    callbackScan: (idCarte: string) => void;
}

export class ice2LecteurCarteMagnetique implements iXElement
{
    private btnLectureCarte: ice2Bouton;
    private inputScan: xInputText;
    private dataCarte: string;

    constructor(options: OptionsLecteurCarteMagnetique)
    {

        let myThis: ice2LecteurCarteMagnetique = this;


        let boxer: ice2Boxer = new ice2Boxer({
            ModeAffichage: enumBoxerMode.standard,
            tailleBoxer: enumBoxerTaille.fit
        });

        myThis.btnLectureCarte = new ice2Bouton({
            icone: new IconeP12(enumIconeP12.carte_cartemagnetique),
            textLocalise: "Lire carte",
            titleLocalise: "Lire carte",
            class: "btnLectureCarte",
            optionsAffichage: {
                positionIconeBouton: enumPosition.Top
            },
            click: function (cb)
            {
                boxer.afficher();
                myThis.inputScan.focus();
                cb();
            }
        });

        let contenuBoxer: ice2PageWrapper = new ice2PageWrapper({
            titleLocalise: "Lecture de carte magnétique",
            classBody:"boxerLecteurCarteMagnetique",
            withHeader: false
        });

        myThis.inputScan = new xInputText({
            class:"inputScan",
            ValueChange: function (val: string)
            {
                iceOutils.afficherMessageAlertify(val, ETypeAlertify.log);
                options.callbackScan(val);
                boxer.fermer();
            }
        });

        let structureBoxer: ice2Grid = new ice2Grid({
            lignes_auto: "1fr 3fr",
            colonnes_auto: "1",
        });

        let itemLabelCommentaire: ice2GridItem = new ice2GridItem({
            colStart: 1,
            rowStart: 1,
            optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
            content:
                new ice2Label({ textLocalise: "Vous pouvez scanner la carte.", type: enumTypeLabel.soustitre })
        });

        let itemImage: ice2GridItem = new ice2GridItem({
            colStart: 1,
            rowStart: 2,
            optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
            content:
                new ice2ImageTabByte({
                    typeAffichage: enumTypeImage.domImage,
                    tabByte: "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",
                })
        });

        structureBoxer.append([itemLabelCommentaire, itemImage]);
        contenuBoxer.append(myThis.inputScan);
        contenuBoxer.append(structureBoxer);
        boxer.ajouterContenu(contenuBoxer);
    }

  
    public get y() {
        let myThis: ice2LecteurCarteMagnetique = this;
        return myThis.btnLectureCarte.y;
    }
}