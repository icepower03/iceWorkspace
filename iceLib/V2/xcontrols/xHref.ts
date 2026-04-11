enum enumTypeOuvertureHref
{
    NouvelleFenetre,
    MemeEmplacement,
    EmplacementParent,
    Boxer
}

interface OptionsHref extends OptionsHtml
{
    textVariable?: string|number;
    textLocalise?: string;
    url: string;
    typeOuverture: enumTypeOuvertureHref;
    optionsAffichage?: optionsAffichagexHref;
}

interface optionsAffichagexHref extends optionsAffichage
{
    couleur?: enumCouleur;
    retourALaLigne?: boolean;
}

class xHref extends xElement
{
    constructor(options?: OptionsHref)
    {
        let texteFinal: string;

        if (options != undefined)
        {
            if (options.textVariable != undefined)
            { texteFinal = options.textVariable.toString(); }

            if (options.textLocalise != undefined)
            { texteFinal = new xLString(options.textLocalise).text; }

            delete options.textLocalise;
            delete options.textVariable;
        }

        

        super("a", options);


        this.addClass("xHref");

        let classCouleur: string = "couleuremed_bleu";

        if (options.optionsAffichage != undefined)
        {
            xStyle.AppliquerOptionsAffichage(this, options.optionsAffichage);

            if (options.optionsAffichage.margin != undefined || options.optionsAffichage.padding != undefined)
                this.addClass("xInline");

            if (options.optionsAffichage.couleur)
                classCouleur = "couleur" + options.optionsAffichage.couleur;

            if (!options.optionsAffichage.retourALaLigne)
                this.addClass("xHref_noWrap");
        }

        this.y.classList.add(classCouleur);

        if (texteFinal != undefined)
        {
            this.y.innerHTML=(texteFinal);
        }

        let target: string = "_blank";
        if (options.typeOuverture == enumTypeOuvertureHref.MemeEmplacement)
            target = "_self";
        else if (options.typeOuverture == enumTypeOuvertureHref.EmplacementParent)
            target = "_parent";

        if (options.typeOuverture == enumTypeOuvertureHref.Boxer)
        {
            this.y.setAttribute('href', '#');
            this.y.onclick= ()=>
            {
                let boxer: xxBoxer = new xxBoxer(
                    {
                        initContent: new xIFrame({ src: options.url })
                    });
                boxer.afficher()
            }
        }
        else {
            this.y.setAttribute('href', options.url);
            this.y.setAttribute('target', target);
        }

        this.addClass(options.class);
    }
}