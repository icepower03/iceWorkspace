import { iXElement, enumVisibility } from '../iceBase';
import { cachericeElements, affichericeElements } from '../../iceStaticFunctions';
import { iceStyle } from './iceStyle';
import { BindableObject } from './BindableObject';
import { iceDiv } from './iceDiv';
import { ice2ContainerEvent } from './ice2ContainerEvent';


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



export class iceCouleur implements iXElement
{
    private elementPrincipal: ice2ContainerEvent;
    private monDiv: iceDiv;
    private styleBulle: boolean;

  
    get y() { return this.elementPrincipal.y; }

    constructor(options?: OptionsCouleur)
    {
        let myThis: iceCouleur = this;
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
                                affichericeElements(myThis.elementPrincipal);
                                break;
                            case enumVisibility.masquer:
                                cachericeElements(myThis.elementPrincipal, false);
                                break;
                            case enumVisibility.masquerAvecCollapse:
                                cachericeElements(myThis.elementPrincipal, true);
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

        myThis.monDiv = new iceDiv({
            class: 'iceCouleur ',
            id: options.id,
            textLocalise: options.textLocalise,
            textVariable: options.textVariable,
            title: options.title
        });
        myThis.monDiv.addClass(maClass);

        if (options.click != undefined)
            myThis.monDiv.y.style.cursor = 'pointer';

        myThis.elementPrincipal = new ice2ContainerEvent({
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
        let myThis: iceCouleur = this

        if (codeCouleur != undefined && codeCouleur != "")
        {
            myThis.monDiv.y.style.backgroundColor = "#" + codeCouleur;

            let luminosite = iceStyle.getLuminositeCouleurHexa(codeCouleur);

            if (luminosite > 155)
            {
                myThis.monDiv.addClass("couleurClaire");
                myThis.monDiv.y.style.border = "1px solid #" + iceStyle.AssombrissementCouleurHex(codeCouleur, 20);
            }

        }
    }

    public changerTitle(newTitle: string) {
        let myThis: iceCouleur = this

        myThis.monDiv.setTitle(newTitle);
    }
}