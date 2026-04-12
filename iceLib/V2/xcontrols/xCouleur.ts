// @ts-nocheck
import { iXElement, enumVisibility } from '../xBase';
import { BindableObject } from './BindableObject';
import { xDiv } from './xDiv';
import { xxContainerEvent } from './xxContainerEvent';
﻿

interface OptionsCouleur 
{
    id?: string;
    class?: string;
    codeCouleur?: string;
    textVariable?: string;
    textLocalise?: string;
    title?: string;
    click?: (cb: () => void) => void;
    styleBulle?: boolean;
    binding?: {
        value?: BindableObject<string>;
        visibility?: BindableObject<enumVisibility>;
    };
}



export class xCouleur implements iXElement
{
    private elementPrincipal: xxContainerEvent;
    private monDiv: xDiv;
    private styleBulle: boolean;

  
    get y() { return this.elementPrincipal.y; }

    constructor(options?: OptionsCouleur)
    {
        let myThis: xCouleur = this;
        let maClass: string = "";
        let codeCouleur: string;
        if (options != undefined)
        {
            if (options.codeCouleur != undefined)
            {
                codeCouleur = options.codeCouleur;
                codeCouleur = codeCouleur.replace("#", "");
            }

            delete options.codeCouleur;
            if (options.class != undefined) {
                maClass = options.class;
            }
            delete options.class;

            if (options.binding != undefined) {
                if (options.binding.value != undefined) {
                    options.binding.value.bind(c => {
                        myThis.changerCouleur(c);
                    })

                    if (options.binding.value.Value != undefined)
                        codeCouleur = options.binding.value.Value;
                        
                }

                if (options.binding.visibility != undefined) {
                    options.binding.visibility.bind(s => {
                        switch (s) {
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

        }
        myThis.styleBulle = options.styleBulle;
        if (myThis.styleBulle == undefined) {
            myThis.styleBulle = false;
        }
        if (myThis.styleBulle == true) {
            maClass += ' styleBulle'; 
        }

        myThis.monDiv = new xDiv({
            class: 'xCouleur ',
            id: options.id,
            textLocalise: options.textLocalise,
            textVariable: options.textVariable,
            title: options.title
        });
        myThis.monDiv.addClass(maClass);

        if (options.click != undefined)
            myThis.monDiv.y.style.cursor = 'pointer';

        myThis.elementPrincipal = new xxContainerEvent({
            onClick: (cb) => {
                if (options.click != undefined) {
                    options.click(cb);
                } else
                    cb();                   
                
            },
            initContent: myThis.monDiv
        });
        

        if (codeCouleur != undefined && codeCouleur != "")
        {
            myThis.changerCouleur(codeCouleur);
        }
    }

    public changerCouleur(codeCouleur: string) {
        let myThis: xCouleur = this

        if (codeCouleur != undefined && codeCouleur != "")
        {
            myThis.monDiv.y.style.backgroundColor = "#" + codeCouleur;

            let luminosite = xStyle.getLuminositeCouleurHexa(codeCouleur);

            if (luminosite > 155)
            {
                myThis.monDiv.addClass("couleurClaire");
                myThis.monDiv.y.style.border = "1px solid #" + xStyle.AssombrissementCouleurHex(codeCouleur, 20);
            }

        }
    }

    public changerTitle(newTitle: string) {
        let myThis: xCouleur = this

        myThis.monDiv.setTitle(newTitle);
    }
}