// @ts-nocheck
import { iXElement, enumPosition } from '../xBase';
import { xxListeDeroulante } from './xxListeDeroulante';
import { xxLabelContainer, enumPositionDuContenu } from './xxLabelContainer';
import { xxBouton, enumTailleBouton } from './xxBouton';
import { IconeMiniP12, Icone } from '../xIcones';

interface OptionsListeChoixLang {
    defaultValue: string;
    //liste des données à afficher
    donnees?: string[];
    renderSelectedClass?: string;
    selected: (lang: string) => void;
}


export class xxListeChoixLang implements iXElement  {
    private monListeChoixDeroulante: xxListeDeroulante<string>;

   
    public get y() {
        return this.monListeChoixDeroulante.y;
    }

    constructor(inOptions: OptionsListeChoixLang) {
        let myThis: xxListeChoixLang = this;
        let initDonnees: string[] = ['fr', 'de', 'en', 'es', 'ca'];

        if (inOptions.donnees != undefined) { initDonnees = inOptions.donnees; }

        if (inOptions.renderSelectedClass == undefined) { inOptions.renderSelectedClass = ''; }

        myThis.monListeChoixDeroulante = new xxListeDeroulante<string>({
            class: 'xxListeChoixLang',
            donnees: initDonnees,
            defaultValue: inOptions.defaultValue,
            renderSelected: function (ici, inLang, openSelect) {
                ici.xxLabelContainer({
                    class: 'itemLangDrapeau '+inOptions.renderSelectedClass,
                    optionsAffichage: { positionDuContenu: enumPositionDuContenu.gauche },
                    textVariable: inLang,
                    initContent: new xxBouton({
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
                ici.xxLabelContainer({
                    class: 'itemLangDrapeau',
                    optionsAffichage: { positionDuContenu: enumPositionDuContenu.gauche },
                    textVariable: item,
                    initContent: new xxBouton({
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