
interface OptionsBloqueEcran
{
    id?: string;
    class?: string;
    textVariable?: string;
    textLocalise?: string;
    fondVisible?: boolean;
}

class xxBloqueEcran implements iXElement
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
                        new IconeCs3i(enumIconeCs3i.action_verrouiller),
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
