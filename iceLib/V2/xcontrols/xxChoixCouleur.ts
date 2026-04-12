// @ts-nocheck
import { iXElement, enumVisibility } from '../xBase';
import { BindableObject } from './BindableObject';
import { xInputText } from './xInput';
import { xxListeDeroulante } from './xxListeDeroulante';
import { xCouleur } from './xCouleur';
﻿enum enumNuancierCouleursDefaut
{
    RougeFonce = "990000",
    Rouge = "ff3333",
    Orange = "ff6600",
    Jaune = "ffd833",
    VertClair = "53d353",
    Vert = "2eaa48",
    Turquoise = "27adad",
    BleuClair = "60d9ea",
    Bleu = "4389ed",
    BleuFonce = "383893",
    Violet = "7c3eb7",
    Rose = "ea8cae",
    Marron = "775d44",
    Beige = "d3c4ae",
    Blanc = "ffffff",
    GrisClair = "cccccc",
    GrisFonce = "666666",
    Noir = "161616",
}
enum enumNuancierCouleursUtilisateur
{

    RougeFonce = "990000",
    Rouge = "ff3333",
    Orange = "ff6600",
    Jaune = "ffd833",
    VertClair = "53d353",
    Vert = "2eaa48",
    Turquoise = "27adad",
    BleuClair = "60d9ea",
    Bleu = "4389ed",
    BleuFonce = "383893",
    Violet = "7c3eb7",
    Rose = "ea8cae",
    Marron = "775d44",
    Beige = "d3c4ae",
    GrisClair = "cccccc",
    GrisFonce = "666666",
}

export enum enumNuancierCouleurs
{
    defaut,
    utilisateur
}

interface OptionsChoixCouleur {

    ValueChange?: (couleurHexa: string) => void;
    value?: string;
    binding?: {
        value?: BindableObject<string>;
        visibility?: BindableObject<enumVisibility>;
    };
    choixCouleurLibre: boolean;
    nuancierCouleurs?: enumNuancierCouleurs ;
}


export class xxChoixCouleur implements iXElement {
    private elementPrincipal: xInputText;
    private _color: string;

    private listeCouleurs: xxListeDeroulante<{ key: string, Valeurhexa: string }>;
    private isChoixCouleurLibre: boolean = false;
    private typeNuancierCouleurs: enumNuancierCouleurs = enumNuancierCouleurs.defaut;

    //public get x() {

    //    if (this.isChoixCouleurLibre) {
    //        return this.elementPrincipal.x;
    //    }
    //    else {
    //        return this.listeCouleurs.x;
    //    }

        
    //}
    public get y() {

        if (this.isChoixCouleurLibre) {
            return this.elementPrincipal.y;
        }
        else {
            return this.listeCouleurs.y;
        }
    }


    constructor(o: OptionsChoixCouleur)
    {
        let myThis: xxChoixCouleur = this;



        if (o.choixCouleurLibre != null) {

            myThis.isChoixCouleurLibre = o.choixCouleurLibre;

        }

        if (o.nuancierCouleurs != null)
            myThis.typeNuancierCouleurs = o.nuancierCouleurs;


        if (myThis.isChoixCouleurLibre) {


            if (o.binding != undefined)
            {
                if (o.binding.value != undefined)
                {

                    o.binding.value.bind(c =>
                    {
                        myThis._color = c;
                        myThis.elementPrincipal.setValue(c);
                        xElement.setCouleurFondAvecContrasteTexteAuto(myThis.elementPrincipal, myThis._color);
                    })

                    if (o.binding.value.Value != undefined)
                        o.value = o.binding.value.Value;
                }

                if (o.binding.visibility != undefined)
                {
                    o.binding.visibility.bind(s =>
                    {
                        switch (s)
                        {
                            case enumVisibility.afficher:
                                afficherxElements(myThis.elementPrincipal);
                                break;
                            case enumVisibility.masquer:
                                cacherxElements(myThis.elementPrincipal, false);
                                break;
                            case enumVisibility.masquerAvecCollapse:
                                cacherxElements(myThis.elementPrincipal, true);
                                break;
                        }
                    })
                }
            }


            myThis.elementPrincipal = new xInputText({
                //numeric: {},
                class:"xxChoixCouleur",
                value: o.value,
                ValueChange: (s: string) => {
                    myThis._color = s;
                    xElement.setCouleurFondAvecContrasteTexteAuto(myThis.elementPrincipal, myThis._color);

                }
            });

            if (o.value != undefined) {
                xElement.setCouleurFondAvecContrasteTexteAuto(myThis.elementPrincipal, o.value);
            }

       $ (this.elementPrincipal.y)
            .colorpicker({
                closeOnEscape: true,
                closeOnOutside: false,
                altField: "#apercu_couleur",
                altOnChange: false,
                ok: function () {
                    if (o.ValueChange != undefined)
                        o.ValueChange(myThis._color)

                        if (o.binding != undefined) {
                            o.binding.value.Value = myThis._color;
                        }
                    }
                });
        }
        else {
            let enumTemp: any;
            let classColonnes: string;
            switch (myThis.typeNuancierCouleurs)
            {
                case (enumNuancierCouleurs.defaut):
                    enumTemp = enumNuancierCouleursDefaut;
                    classColonnes = "sixColonnes";
                    
                    break;

                case (enumNuancierCouleurs.utilisateur):
                    enumTemp = enumNuancierCouleursUtilisateur;
                    classColonnes = "quatreColonnes";
                    break;
            }

            let listekeyHexa: { key: string, Valeurhexa: string }[] = Object.keys(enumTemp).map((key) => { return { key: key, Valeurhexa: enumTemp[key] }; });

            let bindtempo: BindableObject<{ key: string, Valeurhexa: string }>;
            if (o.binding?.value != null)
            {
                bindtempo = new BindableObject();
                let valtemp = listekeyHexa.find((item) => item.Valeurhexa == o.binding.value.Value);
                if (valtemp != null)
                    bindtempo.Value = valtemp;
                else
                    bindtempo.Value = { key: "", Valeurhexa: o.binding.value.Value };

                o.binding.value.bind((val) =>
                {
                    let valtemp = listekeyHexa.find((item) => item.Valeurhexa == o.binding.value.Value);
                    if (valtemp != null)
                        bindtempo.Value = valtemp;
                    else
                        if (val != bindtempo.Value.Valeurhexa)
                            bindtempo.Value = { key: "", Valeurhexa: val };
                });

                bindtempo.bind((val) =>
                {
                    o.binding.value.Value = val.Valeurhexa; 
                });
            }


            myThis.listeCouleurs = new xxListeDeroulante<{ key: string, Valeurhexa: string }>({
                class: "xxChoixCouleur " + classColonnes,
                donnees: listekeyHexa,
                defaultValue: o.value ? { key: "", Valeurhexa: o.value } : { key: "Blanc", Valeurhexa: "ffffff" },
                binding: {
                    value: bindtempo,
                    visibility: o.binding?.visibility
                },
                renderSelected: (place, item, openSelect) => {
                    place.append(new xCouleur({
                        codeCouleur: item.Valeurhexa,
                        class: item.Valeurhexa.toLowerCase().replace(/f/g, '').replace('#', '').length > 0 ? "couleurChoisie" : "couleurChoisie fondClair", // La filouterie
                        title: !!item.key ? "Couleur choisie : " + item.key : "Couleur choisie",
                        click: (cb) => {
                            openSelect(item);
                            cb();
                        }
                    }));
                },
                renderSelectItem: (place, item, selecteur) => {
                    place.append(new xCouleur({
                        codeCouleur: item.Valeurhexa,
                        class: item.Valeurhexa != "ffffff" ? "caseCouleur" : "caseCouleur fondClair",
                        title: !!item.key ? "Choisir la couleur : " + item.key : "Choisir cette couleur",
                        click: (cb) => {
                            selecteur(item);
                            cb();
                        }
                    }))
                },
                selected: (item) => {
                    myThis._color = item.Valeurhexa;

                    if(o.ValueChange != null)
                        o.ValueChange(item.Valeurhexa);
                }

                
            });
            

            
        }

    }


}