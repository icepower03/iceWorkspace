// @ts-nocheck
import { iXElement, enumVisibility } from '../iceBase';
import { BindableObject } from './BindableObject';
import { ice2ListeDeroulante } from './ice2ListeDeroulante';
import { iceCouleur } from './iceCouleur';
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


export class ice2ChoixCouleur implements iXElement {
    private elementPrincipal: iXElement;
    private _color: string;

    private listeCouleurs: ice2ListeDeroulante<{ key: string, Valeurhexa: string }>;
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
        let myThis: ice2ChoixCouleur = this;



        if (o.choixCouleurLibre != null) {

            myThis.isChoixCouleurLibre = o.choixCouleurLibre;

        }

        if (o.nuancierCouleurs != null)
            myThis.typeNuancierCouleurs = o.nuancierCouleurs;


        if (myThis.isChoixCouleurLibre) {

            const colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.className = 'ice2ChoixCouleur';

            // wrapper iXElement minimal pour cachericeElements / affichericeElements
            myThis.elementPrincipal = { y: colorInput };

            const toInputValue = (hex: string) => hex ? '#' + hex.replace('#', '') : '#000000';
            const fromInputValue = (val: string) => val.replace('#', '');

            // valeur initiale
            if (o.binding?.value?.Value != undefined)
                o.value = o.binding.value.Value;

            if (o.value != undefined) {
                myThis._color = o.value.replace('#', '');
                colorInput.value = toInputValue(o.value);
            }

            // binding value entrant
            if (o.binding?.value != undefined) {
                o.binding.value.bind(c => {
                    myThis._color = fromInputValue(c);
                    colorInput.value = toInputValue(c);
                });
            }

            // binding visibility
            if (o.binding?.visibility != undefined) {
                o.binding.visibility.bind(s => {
                    switch (s) {
                        case enumVisibility.afficher:              affichericeElements(myThis.elementPrincipal); break;
                        case enumVisibility.masquer:               cachericeElements(myThis.elementPrincipal, false); break;
                        case enumVisibility.masquerAvecCollapse:   cachericeElements(myThis.elementPrincipal, true); break;
                    }
                });
            }

            // événement natif
            colorInput.addEventListener('input', () => {
                myThis._color = fromInputValue(colorInput.value);
                if (o.ValueChange != undefined)
                    o.ValueChange(myThis._color);
                if (o.binding?.value != undefined)
                    o.binding.value.Value = myThis._color;
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


            myThis.listeCouleurs = new ice2ListeDeroulante<{ key: string, Valeurhexa: string }>({
                class: "ice2ChoixCouleur " + classColonnes,
                donnees: listekeyHexa,
                defaultValue: o.value ? { key: "", Valeurhexa: o.value } : { key: "Blanc", Valeurhexa: "ffffff" },
                binding: {
                    value: bindtempo,
                    visibility: o.binding?.visibility
                },
                renderSelected: (place, item, openSelect) => {
                    place.append(new iceCouleur({
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
                    place.append(new iceCouleur({
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