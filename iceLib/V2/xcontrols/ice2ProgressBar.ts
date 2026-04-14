import { iXElement } from '../iceBase';
import { BindableObject } from './BindableObject';
import { iceDiv } from './iceDiv';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2Label } from './ice2Label';
import { ice2PageWrapper } from './ice2PageWrapper';
interface OptionsProgressBar
{
    class?: string;
    page?: ice2PageWrapper;
    nbTotalElements: number;
    hauteur?: string;
    largeur?: string;
    titre?: string;
    dureeAnimCSS?: number; // Définit le temps d'anim CSS de la largeur de la barre de progression
    valeurDepart?: string; // Définit la valeur de départ de la largeur de la barre de progression

}


export class ice2ProgressBar implements iXElement
{
    private lectureSeule: boolean;
    private class: string;
    private nbTotalElements: number;
    private nbElementsEnCours: BindableObject<number> = new BindableObject<number>(0);
    private composant: iceDiv;
    private progressBarContainer: iceDiv;
    private progressBar: iceDiv;
    private wrapPanel: ice2WrapPanel;

    constructor(options: OptionsProgressBar)
    {
        let myThis: ice2ProgressBar = this;

        if (options.class == undefined) { options.class = "ice2ProgressBar"; }
        myThis.class = options.class;

        myThis.nbTotalElements = options.nbTotalElements;

        myThis.composant = new iceDiv({ class: myThis.class });
        myThis.composant.y.style.width = "100%";
        myThis.progressBarContainer = new iceDiv({ class: "ice2pbar-bar_container" });
        myThis.progressBar = new iceDiv({ class: "ice2pbar-bar" });
        myThis.progressBarContainer.asHolder.append(myThis.progressBar);

        if (options.dureeAnimCSS)
        {
            myThis.progressBar.y.style.transitionProperty = "width";
            myThis.progressBar.y.style.transitionTimingFunction = "ease-out";
            myThis.progressBar.y.style.transitionDuration = options.dureeAnimCSS + "s";
        }

        if (options.titre != undefined) {
            myThis.wrapPanel = new ice2WrapPanel({
                espaceMinimaliste: true,
                class: "ice2pbar-label",
                initContent: [
                    new ice2Label({ textLocalise: options.titre + " " }),
                    new ice2Label({ binding: { value: myThis.nbElementsEnCours } }),
                    new ice2Label({ textLocalise: "/" + myThis.nbTotalElements }),
                ]
            });
            myThis.composant.asHolder.append(myThis.wrapPanel);
        }        

        if (options.hauteur == undefined)
        {
            myThis.progressBarContainer.y.style.height = "7px";
            myThis.progressBar.y.style.height = "7px";
        }
        else
        {
            myThis.progressBarContainer.y.style.height = options.hauteur;
            myThis.progressBar.y.style.height = options.hauteur;
        }

        if (options.largeur == undefined)
            myThis.progressBarContainer.y.style.width = "100%";
        else
            myThis.progressBarContainer.y.style.width = options.largeur;

        if (options.valeurDepart != undefined)
            myThis.progressBar.y.style.width = options.valeurDepart;


        myThis.composant.asHolder.append(myThis.progressBarContainer);
    }

    public setProgression(nbElement: number)
    {
        let myThis: ice2ProgressBar = this;
        // timeOut à 0 (??) pour voir l'animation, sans ça la progression est set à 0 sans qu'on aie le temps de voir l'état 100%
        setTimeout(() =>
        {
            myThis.nbElementsEnCours.Value = nbElement;
            myThis.progressBar.y.style.width = nbElement * 100 / myThis.nbTotalElements + "%";
        }, 0);
    }


    get y()
    {
        let myThis: ice2ProgressBar = this;
        return myThis.composant.y;
    }
}