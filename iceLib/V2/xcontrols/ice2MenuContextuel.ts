import { cachericeElements, affichericeElements } from '../../iceStaticFunctions';
import { iXElementHolder, iXElement } from '../iceBase';
import { iceDiv } from './iceDiv';

export interface optionMenuContextuel {
    renderMenuContextuel: (place: iXElementHolder, ouvrir?: () => void, fermer?: () => void) => void;
    class?: string;

}

export class ice2MenuContextuel implements iXElement {

    private elementPrincipal: iceDiv;

    private xSouris: number = 0;
    private ySouris: number = 0;

    constructor(options: optionMenuContextuel) {
        let myThis: ice2MenuContextuel = this;

        let classCSS = "ice2MenuContextuel";

        if (options.class != null)
            classCSS += " " + options.class

        myThis.elementPrincipal = new iceDiv({ class: classCSS });    

        options.renderMenuContextuel(myThis.elementPrincipal.asHolder, () => { myThis.ouvrir(); }, () => { myThis.fermer(); });

        document.body.addEventListener('mousemove', event => { myThis.ySouris = (<MouseEvent>event).clientY; myThis.xSouris = (<MouseEvent>event).clientX });

        myThis.elementPrincipal.y.addEventListener('mouseleave', event => { myThis.fermer(); });

        document.body.append(myThis.elementPrincipal.y);

        myThis.fermer();
    }

    public fermer() {
        let myThis: ice2MenuContextuel = this;

        cachericeElements(myThis.elementPrincipal, true);
    }

    public ouvrir() {
        let myThis: ice2MenuContextuel = this;

        
        affichericeElements(myThis.elementPrincipal);
        myThis.calculePositionMenu();
    }

    public get y() {
        return this.elementPrincipal.y;
    }
    

    private calculePositionMenu() {
        let myThis: ice2MenuContextuel = this;
        console.log(myThis);

        myThis.elementPrincipal.y.style.top = myThis.ySouris.toString() + "px";
        myThis.elementPrincipal.y.style.left = myThis.xSouris.toString() + "px";

        let widthElement = myThis.elementPrincipal.y.offsetWidth;

        let heightElement = myThis.elementPrincipal.y.offsetHeight;

        // SI ça ne passe pas à gauche 
        // on ajoute 20px pour avoir de la marge 
        if (screen.width < (myThis.xSouris + widthElement + 20)) {
            myThis.elementPrincipal.y.style.left = (myThis.xSouris - widthElement).toString() + "px";    
        }

        // SI on à pas la place en bas 
        if (screen.height < (myThis.ySouris + heightElement + 250)){
            myThis.elementPrincipal.y.style.top = (myThis.ySouris - heightElement).toString() + "px";
        }
    }

        // Permettra de savoir quand on à cliquer en dehors
        //    let xDebutElem = myThis.elementPrincipal.y.offsetLeft;
        //    let xFinElem = xDebutElem + myThis.elementPrincipal.y.offsetWidth;

        //    let yDebutElem = myThis.elementPrincipal.y.offsetTop;
        //    let yFinElem = myThis.elementPrincipal.y.offsetHeight;

        //    // Si on à clicker en dehors de l'element principale
        //    // ydeb/xdeb ---------------------- xfin
        //    //  |    click ici ou pas ?           |
        //    //  |                                 |
        //    // yfin--------------------------------
        //    if (!(xDebutElem < (<MouseEvent>event).clientX && xFinElem > (<MouseEvent>event).clientX && yDebutElem < (<MouseEvent>event).clientY && yFinElem > (<MouseEvent>event).clientY)) {
        //        myThis.fermer();
        //    }
}