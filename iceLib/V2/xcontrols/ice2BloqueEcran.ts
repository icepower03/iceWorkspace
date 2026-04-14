import { iXElement } from '../iceBase';
import { ice2Boxer, enumBoxerTaille } from './ice2Boxer';
import { ice2StackPanel } from './ice2StackPanel';
import { ice2Label } from './ice2Label';
import { IconeP12, enumIconeP12, Icone } from '../iceIcones';

interface OptionsBloqueEcran
{
    id?: string;
    class?: string;
    textVariable?: string;
    textLocalise?: string;
    fondVisible?: boolean;
}

export class ice2BloqueEcran implements iXElement
{
 
    public get y() { return this.boxerPrincipal.y; }
    private boxerPrincipal: ice2Boxer;
    constructor(o: OptionsBloqueEcran)
    {
        if (o.class == undefined)
        { o.class = ""; }

        this.boxerPrincipal = new ice2Boxer({
            id: o.id,
            initContent:
                new ice2StackPanel({
                    initContent: [
                        new IconeP12(enumIconeP12.action_verrouiller),
                        new ice2Label({ textLocalise: o.textLocalise, textVariable: o.textVariable })
                    ]
                }),
            tailleBoxer: enumBoxerTaille.fit,
            nonPersistent:true,
            modal: true,
            sansBtnClose: true,
            class: "ice2BloqueEcran " + o.class
        });
        this.boxerPrincipal.afficher();
    }


    public fermer()
    {
        this.boxerPrincipal.fermer();
    }

}