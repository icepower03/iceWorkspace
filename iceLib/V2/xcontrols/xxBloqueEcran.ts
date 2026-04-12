// @ts-nocheck
import { iXElement } from '../xBase';
import { xxBoxer, enumBoxerTaille } from './xxBoxer';
import { xxStackPanel } from './xxStackPanel';
import { xxLabel } from './xxLabel';
import { IconeP12, enumIconeP12, Icone } from '../xIcones';

interface OptionsBloqueEcran
{
    id?: string;
    class?: string;
    textVariable?: string;
    textLocalise?: string;
    fondVisible?: boolean;
}

export class xxBloqueEcran implements iXElement
{
 
    public get y() { return this.boxerPrincipal.y; }
    private boxerPrincipal: xxBoxer;
    constructor(o: OptionsBloqueEcran)
    {
        if (o.class == undefined)
        { o.class = ""; }

        this.boxerPrincipal = new xxBoxer({
            id: o.id,
            initContent:
                new xxStackPanel({
                    initContent: [
                        new IconeP12(enumIconeP12.action_verrouiller),
                        new xxLabel({ textLocalise: o.textLocalise, textVariable: o.textVariable })
                    ]
                }),
            tailleBoxer: enumBoxerTaille.fit,
            nonPersistent:true,
            modal: true,
            sansBtnClose: true,
            class: "xxBloqueEcran " + o.class
        });
        this.boxerPrincipal.afficher();
    }


    public fermer()
    {
        this.boxerPrincipal.fermer();
    }

}