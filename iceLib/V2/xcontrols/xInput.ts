
enum enumStyleInput {
    Filled,
    Outlined,
    Simple,
}

enum enumBackgroundInput {
    Grey,
    Transparent,
    BgTheme
}

interface optionsAffichageInput extends optionsAffichage
{
    rechercheLarge?: boolean;
}

interface OptionsInput /*extends OptionsHtml*/ {
    value?: string | number;
    longueurMaxi?: number;
    longueurDuChamp?: number;
    hauteurDuChamp?: number;
    multiline?: boolean;
    rounded?: boolean;
    style?: enumStyleInput;
    background?: enumBackgroundInput;
    numeric?: OptionsInputNumericGenerique;
    KeyUpEnterCallback?: (val: number | string) => void; // Par defaut lance le valueChange
    KeyUpCancelCallback?: () => void;
    KeyUpAddonCallback?: (k:KeyboardEvent) => void;
    ValueChange?: (val: number | string) => void;
    autoChange?: boolean; // Permet de déclencher le onchange sur chaque saisie clavier
    password?: boolean;
    placeHolderVariable?: string;
    placeHolderlocalise?: string;
    onLostfocusCallback?: (val: number | string) => void;
    onBlur?: () => void;
    binding?: {
        value?: BindableObject<string | number>;
        visibility?: BindableObject<enumVisibility>;
    };
    disabled?: boolean;
    optionsAffichage?: optionsAffichageInput;
    autoCompletionAutorisee?: boolean;
    class?: string;
    id?: string;
    name?: string;
    idTest?: string;
    click?: (evt: Event) => void;
    champLarge?: boolean;

}

interface OptionsInputNumericGenerique {
    plus?: boolean; // Ajoute un plus si nb positif
    minus?: boolean; // Ajoute un moins si nb négatif
    decimalSeparator?: boolean; // Ajoute un séparteur pour les deciamal ex : 31.141
    nbDigits?: number; // Nb totale de chiffre
    nbDecimal?: number; // Nb de decimal après la virgule
    max?: number; // Valeur maximal
    min?: number; // Valeur minimal    
    autoCompletionAutorisee?: boolean;
}

class xInputText extends xElement {
    private change: (str: string | number) => void;

    private maValeur: string | number;

    // Utiliser si on est en string 
    private longueurMax: number;

    // Utiliser si on est en numérique 
    private isNumeric: boolean;

    // OptionNumeric
    private plus: boolean; // Ajoute un plus si nb positif
    private minus: boolean; // Ajoute un moins si nb négatif
    private decimalSeparator: boolean; // Ajoute un séparteur pour les deciamal ex : 31.141
    private nbDigits: number; // Nb totale de chiffre
    private nbDecimal: number; // Nb de decimal après la virgule
    private max: number; // Valeur maximal
    private min: number; // Valeur 
    //    public y(): HTMLInputElement | HTMLTextAreaElement { return <HTMLInputElement | HTMLTextAreaElement>super.y(); }

    constructor(options: OptionsInput) //|OptionsInputBind
    {
        let changeLocal: (str: string | number) => void;
        let placeHolder: string = '';
        let optionNumeric: OptionsInputNumericGenerique = options.numeric;



        if (options.binding != null) {
            if (options.binding.value != undefined) {
                options.binding.value.bind((s) => { myThis.setValue(s); })
                options.value = options.binding.value.Value;
                changeLocal = (s) => {
                    options.binding.value.Value = s;
                }
            }
            if (options.binding.visibility != null) {
                options.binding.visibility.bind((s: enumVisibility) => {
                    switch (s) {
                        case enumVisibility.afficher:
                            afficherxElements(myThis);
                            break;
                        case enumVisibility.masquer:
                            cacherxElements(myThis, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cacherxElements(myThis, true);
                            break;
                    }
                })
            }
        }
        if (options.ValueChange != null) {
            changeLocal = options.ValueChange;
        }

        if (options.placeHolderlocalise != null)
        {
            placeHolder = new xLString(options.placeHolderlocalise).text;
        }
        else {
            if (options.placeHolderVariable != null)
            {
                placeHolder = options.placeHolderVariable;
            }
        }

        let multiligne: boolean = options.multiline;
        if (multiligne == null) {
            multiligne = false;
        }

        if (options.disabled == null)
            options.disabled = false;

        let style: enumStyleInput = options.style;
        //Styles graphiques par défaut
        if (style == undefined) {
            if (multiligne == false) {
                style = enumStyleInput.Filled; //1 ligne = effet Filled
            }
            else {
                style = enumStyleInput.Simple; // multiligne = effet Simple
            }
        }

        let background: enumBackgroundInput = options.background;
        //Couleurs de fonds par défaut
        if (background == undefined) {
            if (style == enumStyleInput.Outlined) {
                background = enumBackgroundInput.Transparent; //Style outlined = fond transparent
            }
            else if (style == enumStyleInput.Simple) {
                if (multiligne == false) {
                    background = enumBackgroundInput.BgTheme; //Style simple + 1 ligne = couleur thème
                }
                else { background = enumBackgroundInput.Grey; } //Style simple + multiple = gris
            }
            else {
                background = enumBackgroundInput.Grey; //Style filled = gris
            }
        }

        let rounded: boolean = options.rounded;
        if (rounded == undefined) {
            rounded = false;
        }


        let classStyles: string = "xInput";
        classStyles += " xinp-" + enumStyleInput[style].toString().toLowerCase();
        classStyles += " xinp-" + enumBackgroundInput[background].toString().toLowerCase();
        if (rounded == true)
            classStyles += " xinp-rounded";
        if (options.champLarge == true)
            classStyles += " xinp-champLarge";

        if (options.optionsAffichage?.rechercheLarge)
            classStyles += " RechercheLarge";

        let _keyUpEnterCallback = options.KeyUpEnterCallback;
        let _keyUpCancelCallback = options.KeyUpCancelCallback;
        let _keyUpAddOnCallBack = options.KeyUpAddonCallback;
        let _onlostFocus = options.onLostfocusCallback;
        let _typeInput = "text";


        let valeur: string | number = options.value;


        let autoChange: boolean = false;

        //par défaut on garde le meme mécanisme change qu'un input classique
        if (options.autoChange != undefined) {
            autoChange = options.autoChange;
            delete options.autoChange;
        }

        if (options.password)
            _typeInput = "password";

        delete options.KeyUpAddonCallback;
        delete options.KeyUpEnterCallback;
        delete options.KeyUpCancelCallback;
        delete options.ValueChange;
        delete options.password;
        delete options.placeHolderlocalise;
        delete options.placeHolderVariable;
        delete options.onLostfocusCallback;
        delete options.numeric;

        if (multiligne) {

            delete options.value;
            delete options.multiline;
            super("textarea", options);

            if (options.id != undefined) {
                this.y.setAttribute("id", options.id);
            }

            if (options.class != undefined) {
                this.addClass(options.class);
            }
            if (valeur != undefined) {
                this.y.textContent=valeur.toString();
            }

        }
        else {
            if (options.autoCompletionAutorisee) {
                super("input", options);

            } else {
                super("input", { ...options, autocomplete: 'off' });
            }
            this.y.setAttribute("type", _typeInput);
            if (valeur != undefined) {
                (<HTMLInputElement>this.y).value = <string>valeur;
            }
        }

        let myThis: xInputText = this;

        if (options.optionsAffichage != undefined)
        {
            xStyle.AppliquerOptionsAffichage(myThis, options.optionsAffichage);
        }

        if (placeHolder != '')
        {
            this.y.setAttribute("placeholder", placeHolder);
            this.y.setAttribute("title", placeHolder);
        }

        if (options.longueurDuChamp != null)
            this.y.style.width = options.longueurDuChamp + "px";
        if (options.hauteurDuChamp != null)
            this.y.style.height = options.hauteurDuChamp + "px";

        myThis.setDisabled(options.disabled);

        myThis.addClass(classStyles);
        myThis.longueurMax = options.longueurMaxi;

        if (optionNumeric != undefined) {
            myThis.isNumeric = true;
            myThis.plus = optionNumeric.plus;
            myThis.minus = optionNumeric.minus;
            myThis.decimalSeparator = optionNumeric.decimalSeparator;
            myThis.nbDigits = optionNumeric.nbDigits;
            myThis.nbDecimal = optionNumeric.nbDecimal;
            myThis.max = optionNumeric.max;
            myThis.min = optionNumeric.min;

            if (optionNumeric.min != undefined)
                autoChange = false;

            if (myThis.plus == undefined)
                myThis.plus = false;
            if (myThis.minus == undefined)
                myThis.minus = true;
            if (myThis.decimalSeparator == undefined)
                myThis.decimalSeparator = true;
        }

        myThis.change = changeLocal;
        myThis.maValeur = valeur;




        let oldValeur: string | number = myThis.maValeur;

        if (myThis.change) {
           myThis.y.onchange = (e) => {
               
               let currentValue: string =(<HTMLInputElement> e.target).value;
               if (myThis.checkConditionValueChange(currentValue)) {
                   myThis.change(currentValue);
                   myThis.maValeur = currentValue;
               }
                    
                else
                    myThis.setValue(""); }

         
        }

        if (_onlostFocus) {
            myThis.y.addEventListener('focusout', (event) => { _onlostFocus((<HTMLInputElement>event.target).value); }); 
               
        }


        // Par defaut lance le valueChange
        if (!_keyUpEnterCallback) {
            _keyUpEnterCallback = function (val) {
                //myThis.change(val);
            }
        }
        if (!_keyUpCancelCallback) {
            _keyUpCancelCallback = function () {
              
            }
        }

        myThis.y.onkeyup=
             (e: KeyboardEvent) =>{
                let r: HTMLInputElement = <HTMLInputElement>e.target;
                let retour: number | string = r.value.toString();

               

                if (myThis.isNumeric && myThis.decimalSeparator) {
                    retour = retour.replace(',', '.');
                    myThis.setValue(retour);
                }



                 if (myThis.checkCondition(retour)) {
                     //si on tape enter on lance la function définie
                     if (e.keyCode == 13) {
                         if (options.numeric != null) {
                             if (r.value == '') {
                                 retour = null;
                             }
                         }
                         if (myThis.checkCondition(retour.toString()))
                             _keyUpEnterCallback(retour);
                     }
                     else {
                         if (e.keyCode == 27)
                             _keyUpCancelCallback();
                         else //pour les autres touches on lance le change uniquement si il est déclaré en auto
                             if (autoChange) // ici on ne utilise pas checkConditionValueChange() car il teste juste le min et lorsque min -> autoChange = false;
                             {
                                 myThis.y.dispatchEvent(new Event('change'));

                             }
                     }

                     if (_keyUpAddOnCallBack != null) {
                         _keyUpAddOnCallBack(e);
                     }

                     oldValeur = retour;
                 } else { myThis.setValue(oldValeur); }
            }
        ;
    }
    public width(parame?: string | number): void | number {
        let myThis: xInputText = this;
        if (parame != undefined) {
            $(myThis.y).width(parame);
        }
        else {
            return $(myThis.y).width();
        }
    }

    public height(parame?: string | number): void | number {
        let myThis: xInputText = this;
        if (parame != undefined) {
            $(myThis.y).height(parame);
        }
        else {
            return $(myThis.y).height();
        }
    }
    public setDisabled(disabled: boolean) {
        let myThis: xInputText = this;
        if (disabled)
            myThis.y.setAttribute("disabled", "true");
        else
            myThis.y.removeAttribute("disabled");
    }

    public setValue(texte: string | number): void {
        let myThis: xInputText = this;
        (<HTMLInputElement | HTMLTextAreaElement>myThis.y).value = <string>texte;
        myThis.maValeur = texte;
    }

    public setValueFireEvent(texte: string | number): void {
        let myThis: xInputText = this;
        if (myThis.checkCondition(texte.toString())) {
            if (myThis.checkConditionValueChange(texte.toString())) {
                myThis.change(texte);
                myThis.maValeur = texte;
                myThis.setValue(texte);
            }
            else
                myThis.setValue("");
        }

    }

    public focus() {
        let myThis: xInputText = this;
        myThis.y.focus();
    }

    public checkCondition(valeur: string): boolean {
        let myThis: xInputText = this;

        if (myThis.isNumeric) {
            if (valeur.length > 0) {
                let seprationDecimal = false;

                for (let i = 0; i < valeur.length; i++) {
                    let valeurEnCour = valeur[i];

                    if (isNaN(parseFloat(valeurEnCour))) {
                        if (valeurEnCour == ".") {
                            if (myThis.decimalSeparator && !seprationDecimal && i != 0 && (valeur[i - 1] != "-" && valeur[i - 1] != "+"))
                                seprationDecimal = true;
                            else {
                                xOutils.afficherMessageAlertifyLocaliseError("Le caractère . n'est pas autorisé ici");
                                return false;
                            }
                        }
                        else if (valeurEnCour == "+") {
                            if (!myThis.plus || i != 0) {
                                xOutils.afficherMessageAlertifyLocaliseError("Le caractère + n'est pas autorisé ici");
                                return false
                            }
                        } else if (valeurEnCour == "-") {
                            if (!myThis.minus || i != 0) {
                                xOutils.afficherMessageAlertifyLocaliseError("Le caractère - n'est pas autorisé ici");
                                return false;
                            }
                        }
                        else {
                            xOutils.afficherMessageAlertifyLocaliseError("Votre saisie est incorrecte");
                            return false;
                        }
                    }
                }

                let valeurNumber = parseFloat(valeur);

                if (myThis.nbDecimal != undefined) {
                    if (valeur.substr(valeur.indexOf('.'), valeur.length).length - 1 > myThis.nbDecimal) {
                        xOutils.afficherMessageAlertifyError(new xLString('Le nombre de décimales {0} est dépassé.').format([myThis.nbDecimal]));
                        return false
                    }
                }

                if ((myThis.max != undefined) && (valeurNumber > myThis.max)) {
                    xOutils.afficherMessageAlertifyError(new xLString('La valeur maximale de {0} est dépassée.').format([myThis.max]));
                    return false;
                }



                let uniquementlesChiffre = valeur.replace(',', '');
                uniquementlesChiffre = uniquementlesChiffre.replace('.', '');
                uniquementlesChiffre = uniquementlesChiffre.replace('-', '');
                uniquementlesChiffre = uniquementlesChiffre.replace('+', '');
                uniquementlesChiffre = uniquementlesChiffre.replace(' ', '');


                if (myThis.nbDigits != undefined && myThis.nbDigits < uniquementlesChiffre.length) {
                    xOutils.afficherMessageAlertifyError(new xLString('Le nombre de chiffres maximal de {0} est dépassé.').format([myThis.nbDigits]));
                    return false;
                }

            }
        } else {
            // TODO : ajouter de possible teste pour le cas non numérique
            if (myThis.longueurMax != undefined) {
                if (valeur.length > myThis.longueurMax) {
                    xOutils.afficherMessageAlertifyLocalise("longueur maxi:" + myThis.longueurMax, ETypeAlertify.log);
                    return false;
                }
            }
        }

        return true;
    }

    public checkConditionValueChange(valeur: string): boolean {
        let myThis: xInputText = this;

        if (myThis.isNumeric) {
            if (valeur.length > 0) {
                let valeurNumber = parseFloat(valeur);

                if ((myThis.min != undefined) && (valeurNumber < myThis.min)) {
                    xOutils.afficherMessageAlertifyError(new xLString("La valeur minimale de {0} n'est pas atteinte").format([myThis.min]));
                    return false;
                }
            }
        }

        return true;
    }

    public getValue(): string | number {
        let myThis: xInputText = this;

        return myThis.maValeur;
    }


    public removeAttribute(strAttr:string):xInputText {
        let myThis: xInputText = this;
        myThis.y.removeAttribute(strAttr);

        return myThis;
    }

    public setAttribute(strAttr: string,valeur:string): xInputText {
        let myThis: xInputText = this;
        myThis.y.setAttribute(strAttr,strAttr);

        return myThis;
    }

    public setBlur(fn: () => void):xInputText {

        let myThis: xInputText = this;
        myThis.y.onblur = fn;

        return myThis;
    }
   
}