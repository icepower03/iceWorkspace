interface OptionsProgressBar
{
    class?: string;
    page?: xxPageWrapper;
    nbTotalElements: number;
    hauteur?: string;
    largeur?: string;
    titre?: string;
    dureeAnimCSS?: number; // Définit le temps d'anim CSS de la largeur de la barre de progression
    valeurDepart?: string; // Définit la valeur de départ de la largeur de la barre de progression

}


class xxProgressBar implements iXElement
{
    private lectureSeule: boolean;
    private class: string;
    private nbTotalElements: number;
    private nbElementsEnCours: BindableObject<number> = new BindableObject<number>(0);
    private composant: xDiv;
    private progressBarContainer: xDiv;
    private progressBar: xDiv;
    private wrapPanel: xxWrapPanel;

    constructor(options: OptionsProgressBar)
    {
        let myThis: xxProgressBar = this;

        if (options.class == undefined) { options.class = "xxProgressBar"; }
        myThis.class = options.class;

        myThis.nbTotalElements = options.nbTotalElements;

        myThis.composant = new xDiv({ class: myThis.class });
        myThis.composant.y.style.width = "100%";
        myThis.progressBarContainer = new xDiv({ class: "xxpbar-bar_container" });
        myThis.progressBar = new xDiv({ class: "xxpbar-bar" });
        myThis.progressBarContainer.asHolder.append(myThis.progressBar);

        if (options.dureeAnimCSS)
        {
            myThis.progressBar.y.style.transitionProperty = "width";
            myThis.progressBar.y.style.transitionTimingFunction = "ease-out";
            myThis.progressBar.y.style.transitionDuration = options.dureeAnimCSS + "s";
        }

        if (options.titre != undefined) {
            myThis.wrapPanel = new xxWrapPanel({
                espaceMinimaliste: true,
                class: "xxpbar-label",
                initContent: [
                    new xxLabel({ textLocalise: options.titre + " " }),
                    new xxLabel({ binding: { value: myThis.nbElementsEnCours } }),
                    new xxLabel({ textLocalise: "/" + myThis.nbTotalElements }),
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
        let myThis: xxProgressBar = this;
        // timeOut à 0 (??) pour voir l'animation, sans ça la progression est set à 0 sans qu'on aie le temps de voir l'état 100%
        setTimeout(() =>
        {
            myThis.nbElementsEnCours.Value = nbElement;
            myThis.progressBar.y.style.width = nbElement * 100 / myThis.nbTotalElements + "%";
        }, 0);
    }


    get y()
    {
        let myThis: xxProgressBar = this;
        return myThis.composant.y;
    }
}