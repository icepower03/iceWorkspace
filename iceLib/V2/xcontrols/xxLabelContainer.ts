enum enumPositionDuContenu { haut, bas, gauche, droite }
enum enumJustificationDuContenu { debut, centre, fin }

interface optionsAffichageLabelContainer extends optionsAffichageLabel
{
    positionDuContenu?: enumPositionDuContenu;
    justificationDuContenu?: enumJustificationDuContenu;
    largeurMaximum?: string;
}

interface OptionsLabelContainer
{
    id?: string;
    class?: string;
    textVariable?: string;
    textLocalise?: string;
    titleVariable?: string;
    titleLocalise?: string;
    initContent?: iXElement;
    type?: enumTypeLabel;
    habillage?: enumHabillageLabel;
    lien?: OptionsHref;
    lineBreak?: boolean;
    taillePolice?: number;
    labelLargeurLibre?: boolean; //Utile en mode orientation horizontale. A true, la largeur du label n'est plus fixée à 120px.
    binding?: {
        value?: BindableObject<string | number>;
        visibility?: BindableObject<enumVisibility>;
    }
    optionsAffichage?: optionsAffichageLabelContainer;
    gap?: number;
    drag?: { drop?: (ev: DragEvent) => void; }
}

class xxLabelContainer implements iXElement, iXElementHolderEnable {

    private elementPrincipal: xDiv;
    private conteneurDuContenu: xDiv;
    private monLabel: xxLabel;

    get asHolder(): iXElementHolder {
        return this.elementPrincipal.asHolder;
    }

  
    public addClass(s: string) {
        return this.elementPrincipal.addClass(s);
    }
         public removeClass(s: string) {
        return this.elementPrincipal.removeClass(s);
    }
    get y() { return this.elementPrincipal.y; }

    constructor(o: OptionsLabelContainer) {
        let myThis: xxLabelContainer = this;

        if (o.class == undefined) { o.class = ""; }

        if (o.habillage == undefined) { o.habillage = enumHabillageLabel.standard; }
        o.class += " habillageLabel_" + enumHabillageLabel[o.habillage];

        let cl: Container<xxLabel> = new Container<xxLabel>();
        this.elementPrincipal = new xDiv({ id: o.id, class: "xxLabelContainer " + o.class });



        let label: OptionsLabel = {
            textLocalise: o.textLocalise, textVariable: o.textVariable,
            titleLocalise: o.titleLocalise,
            titleVariable: o.titleVariable,
            lineBreak: o.lineBreak,
            class: "xxLabelContainerTitre",
            type: o.type,
            taillePolice: o.taillePolice,
            lien: o.lien,
            optionsAffichage: { largeurMaximum: o.optionsAffichage?.largeurMaximum ? o.optionsAffichage.largeurMaximum : null }
        };


        if (o.binding != undefined) {
            if (o.binding.value != undefined) {
                label = {
                    textLocalise: o.textLocalise,
                    textVariable: o.textVariable,
                    lineBreak: o.lineBreak,
                    titleLocalise: o.titleLocalise,
                    titleVariable: o.titleVariable,
                    class: "xxLabelContainerTitre",
                    type: o.type, binding: { value: o.binding.value }, taillePolice: o.taillePolice, lien: o.lien
                };
            }

            if (o.binding.visibility != undefined) {
                if (o.binding.visibility.Value != undefined) {
                    switch (o.binding.visibility.Value) {
                        case enumVisibility.afficher:
                            afficherxElements(this.elementPrincipal);
                            break;
                        case enumVisibility.masquer:
                            cacherxElements(this.elementPrincipal, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cacherxElements(this.elementPrincipal, true);
                            break;
                    }
                }
                o.binding.visibility.bind((s) => {

                    switch (s) {
                        case enumVisibility.afficher:
                            afficherxElements(this.elementPrincipal);
                            break;
                        case enumVisibility.masquer:
                            cacherxElements(this.elementPrincipal, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cacherxElements(this.elementPrincipal, true);
                            break;
                    }
                })
            }
        }
        // this.elementPrincipal.asHolder.xxLabel({ textLocalise: o.textLocalise, textVariable: o.textVariable, lineBreak: o.lineBreak, class: "xxLabelContainerTitre " + classeOrientation, type: o.type }, cl);
        //!!o.OptionAffichage?.PostionContenu && (blabla)

        if (o.optionsAffichage?.positionDuContenu == enumPositionDuContenu.haut || o.optionsAffichage?.positionDuContenu == enumPositionDuContenu.gauche)
        { 
            if (o.initContent != undefined) {
                this.append(o.initContent);
            }
            this.elementPrincipal.asHolder.xxLabel(label, cl);
        }
        else {
            this.elementPrincipal.asHolder.xxLabel(label, cl);
            if (o.initContent != undefined) {
                this.append(o.initContent);
            }
        }



        this.monLabel = cl.content;

        if (o.labelLargeurLibre)
            this.elementPrincipal.addClass("largeurLibre");


        if (o.habillage == undefined) { o.habillage = enumHabillageLabel.standard; }
        this.elementPrincipal.y.classList.add("habillageLabel_" + enumHabillageLabel[o.habillage]);

        if (o.gap != undefined)
            this.elementPrincipal.y.style.gap = o.gap + "px";

        if (o.binding != undefined) {
            if (o.binding.value != undefined) {

            }
        }

        this.elementPrincipal.y.classList.add("positionDuContenu_droite");
        this.elementPrincipal.y.classList.add("justificationDuContenu_centre");

        if (o.optionsAffichage != undefined) {
            xStyle.AppliquerOptionsAffichage(myThis.elementPrincipal, o.optionsAffichage);

            if (!!o.optionsAffichage.couleurTexte)
                this.elementPrincipal.y.classList.add("couleurTexte_" + o.optionsAffichage.couleurTexte);

            // Positionnement avec optionsAffichage
            if (o.optionsAffichage.positionDuContenu != undefined) {
                this.elementPrincipal.y.classList.remove("positionDuContenu_droite");
                this.elementPrincipal.y.classList.add("positionDuContenu_" + enumPositionDuContenu[o.optionsAffichage.positionDuContenu].valueOf());
            }

            // centrer le contenu en cas de contenu en haut ou en bas
            if (o.optionsAffichage.positionDuContenu == enumPositionDuContenu.haut || o.optionsAffichage.positionDuContenu == enumPositionDuContenu.bas) {
                this.elementPrincipal.y.classList.remove("justificationDuContenu_centre");
                this.elementPrincipal.y.classList.add("justificationDuContenu_debut");
            }

            // Justification avec optionsAffichage
            if (o.optionsAffichage.justificationDuContenu != undefined)
            {
                this.elementPrincipal.y.classList.remove("justificationDuContenu_centre");
                this.elementPrincipal.y.classList.add("justificationDuContenu_" + enumJustificationDuContenu[o.optionsAffichage.justificationDuContenu].valueOf());
            }
        }

            

        if (o?.drag?.drop != null && o?.drag?.drop != undefined) {
            myThis.elementPrincipal.y.addEventListener('drop', (e) => { o.drag.drop(e); })
          
        }
    }
    

    public setSurbrillance(s: string) {
        let myThis: xxLabelContainer = this;
        myThis.monLabel.setSurbrillance(s);
    }

    public setSurbrillanceBinding(s: BindableObject<string>) {
        let myThis: xxLabelContainer = this;
        myThis.monLabel.setSurbrillanceBinding(s);
    }

    public append(element: iXElement): xxLabelContainer {
        //on ne peut ajouter qu'une seule fois'
        if (this.conteneurDuContenu == undefined) {
            this.conteneurDuContenu = new xDiv({ class: "xxLabelContainerItem" });
            this.conteneurDuContenu.asHolder.append(element);
            this.elementPrincipal.asHolder.append(this.conteneurDuContenu);
        }
        else {
            console.log("un xxLabelContainer ne peut héberger qu'un seul élément.");
        }
        return this;

    }

    public vider() {
        if (this.conteneurDuContenu != undefined) {
            this.conteneurDuContenu.y.remove();
            this.conteneurDuContenu = undefined;
        }
    }

    public setTypeLabel(type: enumTypeLabel)
    {
        let myThis: xxLabelContainer = this;
        myThis.monLabel.setTypeLabel(type);
    }


    public cacher(collapse?: boolean)
    {
        let myThis: xxLabelContainer = this;
        myThis.elementPrincipal.cacher(collapse);
    }

    public afficher()
    {
        let myThis: xxLabelContainer = this;
        myThis.elementPrincipal.afficher();
    }


    public changerTextLocalise(s: string) {
        this.monLabel.changerTextLocalise(s);
    }
    public changerTextVariable(s: string) { this.monLabel.changerTextVariable(s); }
}