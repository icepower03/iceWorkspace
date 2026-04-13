// @ts-nocheck
import { iXElement, enumPosition } from '../iceBase';
import { ice2ListeDeroulante } from './ice2ListeDeroulante';
import { ice2LabelContainer, enumPositionDuContenu } from './ice2LabelContainer';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';
import { IconeMiniP12, Icone } from '../iceIcones';

interface OptionsListeChoixLang {
    defaultValue: string;
    //liste des données à afficher
    donnees?: string[];
    renderSelectedClass?: string;
    selected: (lang: string) => void;
}


export class ice2ListeChoixLang implements iXElement  {
    private monListeChoixDeroulante: ice2ListeDeroulante<string>;

   
    public get y() {
        return this.monListeChoixDeroulante.y;
    }

    constructor(inOptions: OptionsListeChoixLang) {
        let myThis: ice2ListeChoixLang = this;
        let initDonnees: string[] = ['fr', 'de', 'en', 'es', 'ca'];

        if (inOptions.donnees != undefined) { initDonnees = inOptions.donnees; }

        if (inOptions.renderSelectedClass == undefined) { inOptions.renderSelectedClass = ''; }

        myThis.monListeChoixDeroulante = new ice2ListeDeroulante<string>({
            class: 'ice2ListeChoixLang',
            donnees: initDonnees,
            defaultValue: inOptions.defaultValue,
            renderSelected: function (ici, inLang, openSelect) {
                ici.ice2LabelContainer({
                    class: 'itemLangDrapeau '+inOptions.renderSelectedClass,
                    optionsAffichage: { positionDuContenu: enumPositionDuContenu.gauche },
                    textVariable: inLang,
                    initContent: new ice2Bouton({
                        titleLocalise: 'Changer de langue',
                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                        click: function (cb) {
                            openSelect(inLang);
                            cb();
                        },
                        icone: IconeMiniP12.getIconeLang(inLang)
                    })
                });

            },
            renderSelectItem: function (ici, item, onSelect) {
                ici.ice2LabelContainer({
                    class: 'itemLangDrapeau',
                    optionsAffichage: { positionDuContenu: enumPositionDuContenu.gauche },
                    textVariable: item,
                    initContent: new ice2Bouton({
                        titleLocalise: item,
                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                        click: function (cb) {
                            onSelect(item);

                        },
                        icone: IconeMiniP12.getIconeLang(item)
                    })
                });

            },
            selected: function (nouvelleLang) {
                inOptions.selected(nouvelleLang);
            }

        })

    }

}