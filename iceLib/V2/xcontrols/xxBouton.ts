enum enumTypeBouton {
    Standard,
    TexteHorsBouton
}

enum enumComportementBouton {
    Standard,
    ActionDifferee,
    ActionAConfirmer,
    ValidationBloquante
}

enum enumStyleBouton {
    Simple,
    SansFondAvecContour,
    AvecFond,
    AvecFondBlancAvecContour, 
    Ombre
}

enum enumPositionnementResponsiveBouton {
    Defaut,
    PleineLargeur,
    DansLeCoin,
    EnBas
}

enum enumCouleurBouton {
    Utilisateur,
    Alternatif,
    Alerte,
    Valide,
    Neutre,
    Blanc,
    Sans
}

enum enumTailleBouton {
    Fit,
    XS,
    S,
    M,
    L,
    XL,
    Tuile,
    Header
}

interface optionTitleVariable {
    titleVariable: string;
    titleLocalise?: string;
}

interface optionTitleLocalise {
    titleLocalise: string;
    titleVariable?: string;
}

interface optionBouton {
    class?: string;
    id?: string;
    textLocalise?: string;
    textVariable?: string;
    disabled?: boolean;
    icone?: Icone | xIconeAvecAction;
    click: (showButton?: () => void, ceBouton?: xxBouton) => void;
    dblclick?: (showButton?: () => void, ceBouton?: xxBouton) => void;

    shiftClick?: (showButton?: () => void, ceBouton?: xxBouton) => void;
    touchLong?: (showButton?: () => void, ceBouton?: xxBouton) => void;
    confirm?: {
        comportement: enumComportementBouton;
        stringConfirm?: () => string;
    };
    binding?: {
        visibility?: BindableObject<enumVisibility>;
        textVariable?: BindableObject<string>;
        disabled?: BindableObject<boolean>;
    };
    optionsAffichage?: optionsAffichageBouton;
}

interface optionBoutonStandard extends optionBouton {
    typeBouton?: enumTypeBouton;
}
interface optionBoutonLabelled extends optionBouton {
    typeBouton: enumTypeBouton.TexteHorsBouton;
    optionsLabel: OptionsLabel;
}

type optionButton = (optionBoutonStandard | optionBoutonLabelled) & optionTitleLocalise
                  | (optionBoutonStandard | optionBoutonLabelled) & optionTitleVariable;

interface optionsAffichageBouton extends optionsAffichage{
    styleBouton?: enumStyleBouton;
    positionnementResponsiveBouton?: enumPositionnementResponsiveBouton;
    tailleBouton?: enumTailleBouton;
    couleurBouton?: enumCouleurBouton;
    positionIconeBouton?: enumPosition;
    boutonArrondi?: boolean;
    fullHeight?: boolean;
    fullWidth?: boolean;
}

class xxBouton implements iXElement {
    // Graphiques 
    private mainDiv: xxContainerEvent;
    private secondDiv: xDiv;    
    private label: xxLabel;
    private span: xSpan;

    // Options
    private class: string;
    private id: string;
    private text: string;
    private title: string;    
    private style: enumStyleBouton;
    private type: enumTypeBouton;
    private reponsiveButton: enumPositionnementResponsiveBouton;
    private size: enumTailleBouton;
    private color: enumCouleurBouton;
    private rounded: boolean;
   
    private disabled: boolean;
    private positionIcone: enumPosition;    
    private icone: Icone | xIconeAvecAction
    private click: (showButton: () => void,ceBouton:xxBouton) => void;
    private dblclick: (showButton: () => void, ceBouton: xxBouton) => void;
    private fullHeight: boolean;
    private fullWidth: boolean;

    private shiftClick: (showButton: () => void, ceBouton: xxBouton) => void;
    private touchLong: (showButton: () => void, ceBouton: xxBouton) => void;

    private confirmBehaviour: enumComportementBouton;    
    private confirmString: () => string;
    private textVariableBind: BindableObject<string>;
    private optionLabel: OptionsLabel;
    private optionsAffichage: optionsAffichage;

    constructor(option: optionButton) {
        let myThis: xxBouton = this;

        myThis.disabled = option.disabled; 

        if (option.icone == null && option.textLocalise == null && option.textVariable == null) {
            option.textLocalise = 'non défini';
        }
        if (option.binding != undefined && option.binding.disabled != null)
        {
            myThis.disabled = option.binding.disabled.Value;
            option.binding.disabled.bind(b => myThis.ToggleAffichageDisabled(b));
        }

        if (option.confirm != undefined) 
        {
            myThis.confirmBehaviour = option.confirm.comportement;
            myThis.confirmString = option.confirm.stringConfirm;
        }
        else
            myThis.confirmBehaviour = enumComportementBouton.Standard;

        myThis.class = "xxBoutonContainer";
        myThis.text = "";
        myThis.title = "";

        if (option.class != undefined)
            myThis.class += " " + option.class;

        if (option.titleLocalise != undefined)
            myThis.title = new xLString(option.titleLocalise).text;
        else
            myThis.title = option.titleVariable;

        if (!myThis.isOptionLabelled(option)) {
            if (option.textLocalise != undefined)
                myThis.text = new xLString(option.textLocalise).text; 

            if (option.textVariable != undefined)
                myThis.text = option.textVariable;            
        } else {            
            myThis.optionLabel = option.optionsLabel;            
        }

        if (option.optionsAffichage != null) {
            myThis.color = option.optionsAffichage.couleurBouton;
            myThis.positionIcone = option.optionsAffichage.positionIconeBouton;
            myThis.size = option.optionsAffichage.tailleBouton;
            myThis.reponsiveButton = option.optionsAffichage.positionnementResponsiveBouton;
            myThis.style = option.optionsAffichage.styleBouton;
            myThis.rounded = option.optionsAffichage.boutonArrondi;
            myThis.fullHeight = option.optionsAffichage.fullHeight;
            myThis.fullWidth = option.optionsAffichage.fullWidth;

        }
 
        myThis.icone = option.icone;
        myThis.type = option.typeBouton;
        myThis.setClick(option.click);
        myThis.dblclick = option.dblclick;
        myThis.shiftClick = option.shiftClick;
        myThis.touchLong = option.touchLong;
        myThis.id = option.id;

        if (myThis.color == undefined)
            myThis.color = enumCouleurBouton.Utilisateur;
        if (myThis.positionIcone == undefined)
            myThis.positionIcone = enumPosition.Left;
        if (myThis.size == undefined)
            myThis.size = enumTailleBouton.M;
        if (myThis.reponsiveButton == undefined)
            myThis.reponsiveButton = enumPositionnementResponsiveBouton.Defaut;
        if (myThis.type == undefined)
            myThis.type = enumTypeBouton.Standard;

        if (myThis.style == undefined)
        {
            if (myThis.type == enumTypeBouton.Standard && (myThis.text == null || myThis.text == "") || myThis.type == enumTypeBouton.TexteHorsBouton)
                myThis.style = enumStyleBouton.Simple;
            else
                myThis.style = enumStyleBouton.SansFondAvecContour;
        }

        if (myThis.disabled == undefined)
            myThis.disabled = false;
        if (myThis.fullHeight == undefined)
            myThis.fullHeight = false;
        if (myThis.fullWidth == undefined)
            myThis.fullWidth = false;

        if (myThis.rounded == undefined) {
            if (myThis.type == enumTypeBouton.Standard && (myThis.text == null || myThis.text == "") || myThis.type == enumTypeBouton.TexteHorsBouton)
                myThis.rounded = true; 
            else
                myThis.rounded = false;
        }

        myThis.optionsAffichage = option.optionsAffichage;

        

        myThis.createButton();

        if (option.binding != undefined)
        {
            if (option.binding.visibility != undefined)
            {
                switch (option.binding.visibility.Value)
                {
                    case enumVisibility.afficher:
                        afficherxElements(myThis.mainDiv);
                        break;
                    case enumVisibility.masquer:
                        cacherxElements(myThis.mainDiv, false);
                        break;
                    case enumVisibility.masquerAvecCollapse:
                        cacherxElements(myThis.mainDiv, true);
                        break;
                }

                option.binding.visibility.bind(c =>
                {
                    switch (c)
                    {
                        case enumVisibility.afficher:
                            afficherxElements(myThis.mainDiv);
                            break;
                        case enumVisibility.masquer:
                            cacherxElements(myThis.mainDiv, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cacherxElements(myThis.mainDiv, true);
                            break;
                    }
                })
            }
            if (option.binding.textVariable != undefined)
            {
                myThis.textVariableBind = option.binding.textVariable;

                myThis.textVariableBind.bind((val) =>
                {
                    myThis.setTexte(val);
                });
            }
        }
    }

    private createButton() {
        let myThis: xxBouton = this;

        myThis.mainDiv = new xxContainerEvent({
            class: myThis.class + myThis.getMainClass(),
            stopPropagation: true,
            id: myThis.id,
            disabled: myThis.disabled,
            titleLocalise: myThis.title,
            onClick: (cb) => {
                myThis.clickBehaviour(cb, false);
            },
            onShiftClick: (cb) => {
                myThis.clickBehaviour(cb, true)
            },
            onTouchLong: (cb) => {
                if (myThis.touchLong != undefined) {
                    myThis.longTouchBehaviour(cb)
                } else { cb(); }
            },
            onDblClick: (cb) => {
                if (myThis.dblclick != undefined) {
                    myThis.dblclick(cb,myThis)
                } else { cb(); }
            },

        });

        
        myThis.secondDiv = new xDiv({
            class: "xxBoutonContent" + myThis.getSecondClass()
        });

        myThis.reGenerateContentSecondeDiv();

        if (myThis.type == enumTypeBouton.Standard) 
        {
            myThis.mainDiv.asHolder.append(myThis.secondDiv);
        }
        else if (myThis.type == enumTypeBouton.TexteHorsBouton)
        {
            if (myThis.optionLabel != undefined)
                myThis.label = new xxLabel(myThis.optionLabel);
            else
                myThis.label = new xxLabel({ textVariable: myThis.text });
        
            myThis.mainDiv.asHolder.append(myThis.label);

            if (myThis.positionIcone == enumPosition.Left || myThis.positionIcone == enumPosition.Top) {
                myThis.mainDiv.asHolder.append(myThis.secondDiv);
                myThis.mainDiv.asHolder.append(myThis.label);
            } else {
                myThis.mainDiv.asHolder.append(myThis.label);
                myThis.mainDiv.asHolder.append(myThis.secondDiv);
            }
        }      

        if (myThis.optionsAffichage != undefined)
        {
            xStyle.AppliquerOptionsAffichage(myThis.secondDiv, myThis.optionsAffichage);
        }

    }

    private reGenerateContentSecondeDiv()
    {
        let myThis: xxBouton = this;
        myThis.secondDiv.asHolder.empty();
        if (myThis.type == enumTypeBouton.Standard)
        {
            myThis.span = new xSpan({ textVariable: myThis.text });

            if (myThis.positionIcone == enumPosition.Left || myThis.positionIcone == enumPosition.Top)
            {
                if (myThis.icone != undefined)
                    myThis.secondDiv.asHolder.append(myThis.icone);
                if (myThis.text != undefined && myThis.text != "")
                    myThis.secondDiv.asHolder.append(myThis.span);
            } else
            {
                if (myThis.text != undefined && myThis.text != "")
                    myThis.secondDiv.asHolder.append(myThis.span);
                if (myThis.icone != undefined)
                    myThis.secondDiv.asHolder.append(myThis.icone);
            }
        }
        else if (myThis.type == enumTypeBouton.TexteHorsBouton)
        {
            if (myThis.icone != undefined)
                myThis.secondDiv.asHolder.append(myThis.icone);
        }
    }

    private getMainClass(): string {
        let myThis: xxBouton = this;

        let retour: string = "";

        retour += " xbtn-typ_" + enumTypeBouton[myThis.type].toString().toLowerCase();
        retour += " xbtn-res_" + enumPositionnementResponsiveBouton[myThis.reponsiveButton].toString().toLowerCase(); 

        if (myThis.type == enumTypeBouton.TexteHorsBouton)
            retour += " xbtn-pos_" + enumPosition[myThis.positionIcone].toString().toLowerCase();
        

        if (myThis.disabled == true)
            retour += " xbtn-disabled";

        return retour;
    }

    private getSecondClass(): string {
        let myThis: xxBouton = this;

        let retour: string = "";

        retour += " xbtn-sty_" + enumStyleBouton[myThis.style].toString().toLowerCase();
        retour += " xbtn-cou_" + enumCouleurBouton[myThis.color].toString().toLowerCase();
        retour += " xbtn-siz_" + enumTailleBouton[myThis.size].toString().toLowerCase();

        if (myThis.type == enumTypeBouton.Standard) {
            retour += " xbtn-pos_" + enumPosition[myThis.positionIcone].toString().toLowerCase();

            if (myThis.text == null || myThis.text == "")
                retour += " xbtn-icon_only";
        } else
            retour += " xbtn-icon_only";

        if (myThis.rounded == true)
            retour += " xbtn-rounded";

        if (myThis.fullHeight == true)
            retour += " xbtn-fullHeight";

        if (myThis.fullWidth == true)
            retour += " xbtn-fullWidth";

        return retour;
    }

    private clickBehaviour(showButton: () => void, shiftClick: boolean): void 
    {
        let myThis: xxBouton = this;

        let p: Promise<{}>;

        switch (myThis.confirmBehaviour) 
        {
            case enumComportementBouton.Standard:
                p = new Promise((resolve, reject) => {
                    resolve({});
                });
                break;
            case enumComportementBouton.ActionDifferee:
                //on lance l'action après délai de rétractation 
                p = new Promise((resolve, reject) => {
                    let opD: optionButton =
                    {
                        textLocalise: "Annuler",
                        titleLocalise: "annuler" ,
                        icone: new IconeSvg(enumIconeSvg.croix),
                        //icone: myThis.icon,
                        class: "cancelState",
                        click: function (cb) {
                            reject();
                        }
                    }

                    let btnAnnuler = new xxBouton(opD);

                    myThis.y.parentElement.append(btnAnnuler.y);

                    //je laisse 3 secondes pour annuler l'action
                    setTimeout(() => { resolve({}); btnAnnuler.deleteButton(); }, 3000);
                });
                break;

            case enumComportementBouton.ActionAConfirmer:
                //on lance l'action que si confirmation
                p = new Promise((resolve, reject) => {
                    let opD: optionButton =
                    {
                        textLocalise: "confirmer",
                        titleLocalise: "confirmer",                        
                        icone: new IconeSvg(enumIconeSvg.validation), // TODO: mettre le bon icone
                        // icone: myThis.icon,
                        class: "confirmState",
                        click: (cb) => {
                            resolve({});
                        }

                    }

                    let btnconfirm = new xxBouton(opD);

                   myThis.y.parentElement.append(btnconfirm.y);

                    //je laisse 3 secondes pour annuler l'action
                    setTimeout(() => { reject(); btnconfirm.deleteButton(); }, 3000);
                });
                break;

            case enumComportementBouton.ValidationBloquante:
                //on lance l'action que si confirmation
                p = new Promise((resolve, reject) => {
                    let monMsg = "Etes vous sûr ?";

                    if (myThis.confirmString != null)
                        monMsg = myThis.confirmString();
                    
                   
                    xOutils.afficherMessageConfirmationLocalise(monMsg, false, (selection: boolean) => { if (selection) { resolve({}); } else { reject() } });
                });
                break;
        }
        p.then(() =>
        {
            // si la promesse est réalisée je lance l'action prévue

            if (myThis.shiftClick != undefined && shiftClick)
                myThis.shiftClick(showButton,myThis);            
            else
                myThis.click(showButton,myThis);
            
        }, () => 
        {
            //si la promesse a été refusée
            xOutils.afficherMessageAlertifyError("annulé");
          
            myThis.mainDiv.operationEnCoursRemove();
        });
    }

    private longTouchBehaviour(showButton: () => void): void {
        let myThis: xxBouton = this;
       

            let p: Promise<{}>;


            p = new Promise((resolve, reject) => {
                resolve({});
            });

            p.then(() => {

                myThis.touchLong(showButton, myThis);
            }, () => {
                //si la promesse a été refusée
                xOutils.afficherMessageAlertifyError("annulé");
                myThis.mainDiv.operationEnCoursRemove();
            });
        
    }

    private isOptionLabelled(option: optionButton): option is ((optionBoutonLabelled & optionTitleLocalise) | (optionBoutonLabelled & optionTitleVariable)) {
        return (<optionBoutonLabelled>option).optionsLabel != undefined;
    }

    public showButton(): void {
        let myThis: xxBouton = this;
        afficherxElements(myThis.mainDiv);
    }

    public hideButton(collapse?: boolean): void {
        let myThis: xxBouton = this;
        cacherxElements(myThis.mainDiv, collapse != undefined ? collapse : false);
    }

    public addClass(cssClass: string): void {
        let myThis: xxBouton = this;
        myThis.mainDiv.asHolder.addClass(cssClass);
    }

    public removeClass(cssClass: string): void {
        let myThis: xxBouton = this;
        myThis.mainDiv.asHolder.removeClass(cssClass);
    }

    public deleteButton(): void {
        let myThis: xxBouton = this;
        myThis.mainDiv.y.remove();
    }   

    public setSubrianceLabel(text:string): void
    {
        let myThis: xxBouton = this;
        if (myThis.label != null)
            myThis.label.setSurbrillance(text);
    }

    public setSubrianceBindingLabel(bindText: BindableObject<string>): void
    {
        let myThis: xxBouton = this;
        if (myThis.label != null)
            myThis.label.setSurbrillanceBinding(bindText);
    }

    public setColor(color: enumCouleurBouton): void
    {
        let myThis: xxBouton = this;
        if (myThis.color != null) {
            myThis.secondDiv.removeClass("xbtn-cou_" + enumCouleurBouton[myThis.color].toString().toLowerCase());
            myThis.color = color;
            myThis.secondDiv.addClass("xbtn-cou_" + enumCouleurBouton[myThis.color].toString().toLowerCase());
        }
    }

    public getIcone(): Icone | xIconeAvecAction
    {
        let mythis: xxBouton = this;
        return mythis.icone;
    }

    public setIcone(icone: Icone)
    {
        let mythis: xxBouton = this;
        mythis.icone = icone;
        mythis.reGenerateContentSecondeDiv();
    }

    public ToggleAffichageDisabled(isDisabled?: boolean): void
    {
        let myThis: xxBouton = this;
        myThis.mainDiv.asHolder.removeClass("xbtn-disabled");
        if ((!myThis.disabled && isDisabled == null) || isDisabled == true)
            myThis.mainDiv.asHolder.addClass("xbtn-disabled");
        myThis.disabled = isDisabled != null ? isDisabled : !myThis.disabled;

        myThis.mainDiv.setDisabled(isDisabled);
    }

    public getText(): string
    {
        let myThis: xxBouton = this;
        return myThis.span.y.textContent;
    }

    public changerText(inText: string): void {
        let myThis: xxBouton = this;
        myThis.text = inText;
        myThis.span.y.textContent=inText;
    }

    public setTitle(newText: string): void
    {
        let myThis: xxBouton = this;
        myThis.mainDiv.y.title = newText;
    }

    public setTexte(newText: string): void
    {
        let myThis: xxBouton = this;
        myThis.text = newText;
        if (myThis.type == enumTypeBouton.Standard) {
            myThis.span.y.textContent=newText;
        }
        else
        {
            myThis.label.y.textContent=newText;
        }
    }

    /** Modifie le statut du bouton pour spécifier qu'une opération est en cours.
     * Celui-ci est alors désactivé et une animation est affichée à l'utilisateur.
     * */
    public setOperationEnCours():void
    {
        let myThis: xxBouton = this;
        myThis.mainDiv.operationEnCours();
    }

    /** Modifie le statut du bouton pour indiquer que le traitement en cours est terminé.
    * Celui-ci est alors réactivé.
    * */
    public removeOperationEnCours(): void
    {
        let myThis: xxBouton = this;
        myThis.mainDiv.operationEnCoursRemove();
    }

   

    public get y() {
        let myThis: xxBouton = this;

        return myThis.mainDiv.y;
    }


    public removeAttribute(strAttr: string): xxBouton {
        let myThis: xxBouton = this;
        myThis.y.removeAttribute(strAttr);

        return myThis;
    }

    public setAttribute(strAttr: string, valeur: string): xxBouton {
        let myThis: xxBouton = this;
        myThis.y.setAttribute(strAttr, strAttr);

        return myThis;
    }


    public setClick(clickCb: (showButton?: () => void, ceBouton?: xxBouton) => void): xxBouton{
        let myThis: xxBouton = this;
       
        myThis.click = clickCb;
        return myThis;
    }
    public setShiftClick(sclickCb: (showButton?: () => void, ceBouton?: xxBouton) => void): xxBouton {
        let myThis: xxBouton = this;

        myThis.shiftClick = sclickCb;
        return myThis;
    }

    public fakeClick()
    {
        this.y.click();
    }


}