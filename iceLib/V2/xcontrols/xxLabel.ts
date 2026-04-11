


enum enumTypeLabel { standard, titre, soustitre, important, description, temps, bloc, information }
enum enumHabillageLabel { standard, warning, erreur, loading, disabled, valide, info, infoImportante }
enum enumMiseEnFormeLabel { standard, ligneUnique, espacesEtSautsDeLignePreserves }
enum enumDecorationLabel { aucun, souligne, barre }

interface optionsAffichageLabel extends optionsAffichage{
    couleurTexte?: enumCouleur;
    largeurMaximum?: string;
}

interface OptionsLabel {
    id?: string;
    class?: string;
    textVariable?: string|number;
    textLocalise?: string;
    titleLocalise?: string;
    titleVariable?: string;
    type?: enumTypeLabel;
    decoration?: enumDecorationLabel;
    habillage?: enumHabillageLabel;
    lien?: OptionsHref;
    lineBreak?: boolean;
    centrer?: boolean;
    tabindex?: number;
    taillePolice?: number;
    police?: string;
    binding?: {
        value?: BindableObject<string | number>;
        visibility?: BindableObject<enumVisibility>;
    }
    espaceMinimaliste?: boolean;
    miseEnForme?: enumMiseEnFormeLabel;
    optionsAffichage?: optionsAffichageLabel;
}

class xxLabel implements iXElement 
{
    private elementPrincipal: xSpan | xElement;
    private montexteVariable: string;
    private typeLabel: enumTypeLabel;
    private _haveSurbriance: boolean; //true si une partie de texte est en surbriance

    public get haveSurbriance() { return this._haveSurbriance; }

    public width(parame?: string|number): void | number {
        let myThis: xxLabel = this;
        return myThis.elementPrincipal.width(parame);
    }

    public height(parame?: string|number): void | number {
        let myThis: xxLabel = this;
        return myThis.elementPrincipal.height(parame);
    }
    constructor(o: OptionsLabel) {
        let myThis: xxLabel = this;

        if (o.binding != undefined) {
            if (o.binding.value != undefined) {

                o.binding.value.bind((a: string | number) => { myThis.changerTextVariable(a); });

                if (o.binding.value.Value != null) {
                    o.textVariable = o.binding.value.Value.toString();
                }
            }
            if (o.binding.visibility != undefined) {
                o.binding.visibility.bind((n: enumVisibility) => {
                    switch (n) {
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
        
        if (o.class == undefined) { o.class = ""; }
        if (o.type == undefined) { o.type = enumTypeLabel.standard; }
        if (o.decoration == undefined) { o.decoration = enumDecorationLabel.aucun; }
        if (o.habillage == undefined) { o.habillage = enumHabillageLabel.standard; }
        if (o.lineBreak == undefined) { o.lineBreak = true; }
        if (o.centrer == undefined) { o.centrer = false; }
        if (o.espaceMinimaliste == undefined) { o.espaceMinimaliste = false; }
        if (o.miseEnForme == undefined) { o.miseEnForme = enumMiseEnFormeLabel.standard }

        if (o.textLocalise != undefined) {
            myThis.montexteVariable = new xLString(o.textLocalise).text;
        }

        if (o.textVariable !=undefined) {
            myThis.montexteVariable = o.textVariable.toString();
        }

        let title: string;
        if (o.titleLocalise) {
            title = new xLString(o.titleLocalise).text;
        }
        else if (o.titleVariable) {
            title = o.titleVariable;
        }

        o.class += " habillageLabel_" + enumHabillageLabel[o.habillage];
        o.class += " decorationLabel_" + enumDecorationLabel[o.decoration];


        if (!o.lineBreak) { o.class += " xxLabelNoBreak"; }

        if (o.centrer) { o.class += " centrerLabel"; }
        if (o.espaceMinimaliste) { o.class += " espaceMinimaliste"; }

        switch (o.miseEnForme)
        {
            case enumMiseEnFormeLabel.standard:
                break;
            case enumMiseEnFormeLabel.espacesEtSautsDeLignePreserves:
                o.class += " xlab-prewrap";
                break;
            case enumMiseEnFormeLabel.ligneUnique:
                o.class += " xlab-nowrap";
                break;
        }

        if (o.textLocalise === undefined && o.textVariable === undefined) {
           // alert("vous devez mettre un libellé dans un label");
        }
        if (o.lien != undefined) {
            this.elementPrincipal = new xHref({ class: "xxHref " + o.class, textVariable: myThis.montexteVariable, url: o.lien.url, typeOuverture: o.lien.typeOuverture, click: o.lien.click });
        }
        else {
            this.elementPrincipal = new xSpan({ tabindex: o.tabindex, id: o.id, class: "xxLabel " + o.class, textVariable: myThis.montexteVariable, title:title });
            if (o.type == enumTypeLabel.temps) {
                this.setTemps();
            }
        }

        if (o.taillePolice != undefined)
        {
            myThis.setTaillePolice(o.taillePolice);
        }
        if (o.police != undefined)
        {
            this.elementPrincipal.y.style.fontFamily = o.police;
        }

        myThis.setTypeLabel(o.type);

        if (o.optionsAffichage != undefined)
        {
            xStyle.AppliquerOptionsAffichage(this, o.optionsAffichage);

            if (!!o.optionsAffichage.margin || !!o.optionsAffichage.padding)
                this.elementPrincipal.addClass("xInline");

            if (!!o.optionsAffichage.couleurTexte)
                this.elementPrincipal.y.classList.add("couleurTexte_" + o.optionsAffichage.couleurTexte);

            if (!!o.optionsAffichage.largeurMaximum) {
                this.elementPrincipal.y.style.maxWidth = o.optionsAffichage.largeurMaximum;
                this.elementPrincipal.addClass("largeurMax");                
            }
                
        }
    }
    public setTaillePolice(n: number)
    {
        let myThis: xxLabel = this;
        myThis.elementPrincipal.y.style.fontSize = n + "px";
    }
    public setPolice(s: string)
    {
        let myThis: xxLabel = this;
        myThis.elementPrincipal.y.style.fontFamily = s;
    }

    public changerTextLocalise(s: string) {
        let myThis: xxLabel = this;
        myThis.changerTextVariable(new xLString(s).text);
    }
    public cacher(collapse?: boolean) {
        let myThis: xxLabel = this;
        myThis.elementPrincipal.cacher(collapse);
    }

    public afficher() {
        let myThis: xxLabel = this;
        myThis.elementPrincipal.afficher();
    }

    public setTypeLabel(type: enumTypeLabel)
    {
        let myThis: xxLabel = this;

        if (myThis.typeLabel != null)
            myThis.removeClass("typeLabel_" + enumTypeLabel[myThis.typeLabel]);

        myThis.typeLabel = type;
        myThis.addClass("typeLabel_" + enumTypeLabel[myThis.typeLabel]);
    }

    public changerTextVariable(s: string | number)
    {
        let myThis: xxLabel = this;
        if (s == null) s = "";
        myThis.montexteVariable = s.toString();
        myThis.changerTexteDom(s.toString());
    }

    private annulerSurbrillance() {
        let myThis: xxLabel = this;
        myThis._haveSurbriance = false;
        myThis.elementPrincipal.y.innerHTML=(myThis.montexteVariable);
    }

    private changerTexteDom(s: string) {
        let myThis: xxLabel = this;
        myThis.elementPrincipal.y.innerHTML=(s);
    }

    public changerTitlteLocalise(s: string) {
        let myThis: xxLabel = this;
        myThis.changerTitlteDom(new xLString(s).text);
    }

    public changerTitleVariable(s: string | number) {
        let myThis: xxLabel = this;
        if (s == null) s = "";
        myThis.changerTitlteDom(s.toString());
    }

    private changerTitlteDom(s: string) {
        this.elementPrincipal.y.title = s;
    }

    public setSurbrillanceBinding(sb: BindableObject<string>): xxLabel
    {
        let myThis: xxLabel = this;

        sb.bind(function (val)
        {
            let str: string;
            str = xOutils.rechercheStringofString(val, myThis.montexteVariable);
            if (str != null)
                myThis.setSurbrillance(str);
            else
                myThis.annulerSurbrillance();
        });
        return myThis;
    }

    public setSurbrillance(s: string, couleur?: string): xxLabel {
        let myThis: xxLabel = this;

        let montexteSurbrille: string = '';
      
        if (s != null && s != '' && myThis.montexteVariable != null)
        {
                let montexteSurbrilleTab: string[];
                let montexteVariableSup = myThis.montexteVariable.toUpperCase();

                let sUp = s.toUpperCase();

                let montexteSurbrilleSup: string[] = montexteVariableSup.split(sUp);


                let index: number = 0;
                let tailleS: number = s.length;
                let tabCourant: number = 0;
                let indexDansTab: number = 0;

                while (index < myThis.montexteVariable.length) {
                    //si mon tableau courant n'est pas fini
                    if (indexDansTab < montexteSurbrilleSup[tabCourant].length) {
                        montexteSurbrille += myThis.montexteVariable.charAt(index);

                    }
                    else {
                        //sinon je dois changer de tableau 
                        // et donc augmenter de la taille de ma separation
                        indexDansTab = -1;
                        tabCourant++;

                        myThis._haveSurbriance = true; // Si on est la c'est que on a du texte qui va etre en surbriance
                        let textSubrille = "<b class='surligner'";
                        if (couleur != undefined)
                            textSubrille += "style='background:" + couleur + "!important'";
                        textSubrille += ">";

                        let leVraiS = myThis.montexteVariable.slice(index, index + tailleS);
                        montexteSurbrille += (textSubrille + leVraiS + '</b>');
                        index += tailleS - 1;
                    }

                    indexDansTab++;
                    index++;
                }
                myThis.changerTexteDom(montexteSurbrille);
            }
            else {
                myThis.annulerSurbrillance();
            }

        return myThis;
    }

    private setTemps() {
        let myThis: xxLabel = this;
        
        if (myThis.montexteVariable != null) {
            let long: number = myThis.montexteVariable.length;
            let a_griser: string = "";
            let monTemps: string = "";
            let index: number = 0;

            while (myThis.montexteVariable.charAt(index) == '0' || (myThis.montexteVariable.charAt(index) == 'h' && index > 0)) {
                a_griser += myThis.montexteVariable.charAt(index)
                index += 1;
            }

            monTemps += ("<b class='clair'>" + a_griser + '</b>') + myThis.montexteVariable.slice(index, long);
            myThis.changerTexteDom(monTemps);
        }
    }

  

  
    public hideLabel(collapse?: boolean): void {
        let myThis: xxLabel = this;
        cacherxElements(myThis, collapse != undefined ? collapse : true);
    }

    public showLabel(): void {
        let myThis: xxLabel = this;
        afficherxElements(myThis);
    }

    public get y() { return this.elementPrincipal.y; }

    public addClass(c: string): xxLabel {
        let myThis: xxLabel = this;
        myThis.elementPrincipal.addClass(c);
    
        return myThis;
    }

    public removeClass(c: string): xxLabel {
        let myThis: xxLabel = this;
        myThis.elementPrincipal.removeClass(c);
        return myThis;
    }
}
