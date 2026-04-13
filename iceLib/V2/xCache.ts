
import { xClass, Dictionnaire } from './xBase';
import { xOutils } from '../xOutils';
declare function xRequire(url: string): any;
declare const etype_messagebox: any;

export interface iCacheGeneric<T> {
    dicoNePasInitiliaser?: T,//pour faire le cache pour une autre méthode refaire en dessous
    promesseNePasInitiliaser?: Promise<T>,
    nomVariableUnique: string,
        /*méthode retournant la promesse capable de charger les données depuis le serveur */chargeurSimple: (p: any) => Promise<T>,

}

export class xCache {


    //moyen d'écrire et lire les données de cache avec une pérennité correspondant à une session d'zeus
    private static getVariable(item: string): any {
        try {
            var d: any = window.top;
            return d['cache_zeus_' + item];
        }
        catch (r) {
            console.log("impossible de lire les variables du window.top");
            // console.log(r);
        }

        return undefined;
    }

    private static setVariable(item: string, valeur: any) {
        try {

            var d: any = window.top;
            d['cache_zeus_' + item] = valeur;
        }
        catch (r) {
            console.log("impossible d'écrires les variables du window.top");
            // console.log(r);
        }
    }

    private static deleteVariable(item: string) {
        try {

            var d: any = window.top;
            delete  d['cache_zeus_' + item] ;
        }
        catch (r) {
            console.log("impossible d'écrires les variables du window.top");
            // console.log(r);
        }
    }

    public static getFromSession<T>(item: string): T {
        return xCache.getVariable(item);
    }
    public static setFromSession<T>(item: string,valeur:T) {
        return xCache.setVariable(item,valeur);
    }

    public static genericCache<T>(/* nom unique à donner pour pouvoir stocker les données du cache*/nomVar: string,
        /*méthode retournant la promesse capable de charger les données depuis le serveur */chargeur: (page: any) => Promise<T>,
        /*méthode capable de retourner les données depuis une variable locale */getterLocal: () => T,
        /*méthode capable d'enregistrer les données dans une variable locale */setterLocal: (t: T) => void,
        inPage: any): Promise<T> {
        let myThis: typeof xCache = this;
        let nomVarPromesse = 'genericCache_' + nomVar;
        if (myThis.getVariable(nomVarPromesse) == null) {
          
            let promessRetour = new Promise<T>(function (resolve, reject) {

                let donneesLocales = getterLocal();
                //si ma variable locale est renseignée
                if (donneesLocales != undefined) {
                    resolve(donneesLocales);
                }
                else {
                    //si la variable locale est undefined et que la variable globale n'est pas undefined
                    //on réutilise la variable globale pour reinjecter dans la variable locale via setter

                    let temp: T = myThis.getVariable(nomVar);
                    if (temp != undefined) {

                        setterLocal(temp);
                        resolve(temp);
                    }
                    else {
                        console.log('chargement par fetch');
                        //sinon
                        //on doit charger les données serveur
                        chargeur(inPage).then(function (value: T) {
                            myThis.setVariable(nomVar, value);
                            setterLocal(value);
                            resolve(value);
                        });
                    }



                }
            });
             myThis.setVariable(nomVarPromesse, promessRetour);
        }
       
        return myThis.getVariable(nomVarPromesse);


    }



    public static resetDico(nomVariableUniqueDico:string) {
        this.deleteVariable(nomVariableUniqueDico);
    }
    
    public static getDicoWithDelete<T>(paramsDico: iCacheGeneric<T>, page: any): { data: Promise<T>, reset: () => void } {
        
        return {
            data: xCache.genericCache<T>(paramsDico.nomVariableUnique,
                (page) => {
                    if (paramsDico.promesseNePasInitiliaser == null) {
                        paramsDico.promesseNePasInitiliaser = paramsDico.chargeurSimple(page);
                        console.info("Chargement des services depuis le serveur");
                    }
                    return paramsDico.promesseNePasInitiliaser;
                },
                () => {
                    console.info("Chargement des services depuis DataCache");
                    return paramsDico.dicoNePasInitiliaser;
                },
                (d: T) => {
                    paramsDico.dicoNePasInitiliaser = d;
                },
                page
            )
        , reset: () => {
            paramsDico.dicoNePasInitiliaser = null;
            paramsDico.promesseNePasInitiliaser = null;
            xCache.deleteVariable(paramsDico.nomVariableUnique);
        }
    };
    }

    public static getDico<T>(paramsDico: iCacheGeneric<T>, page: any): Promise<T>{
        return this.getDicoWithDelete<T>(paramsDico, page).data;
    }

    private static _dicoRessource: Dictionnaire<string>;

    public static get dicoRessources(): Dictionnaire<string> {

        //si le dico a déja été chargé, on le reprend
        if (xCache._dicoRessource == undefined) {
            xCache._dicoRessource = xCache.getVariable("dicoRessources");
            //si la variable top n'existe pas '

            //on va le chercher sur le serveur
            if (xCache._dicoRessource == undefined) {//on essaye de recuperer le dico sur le top
                if (xClass.config == undefined) {
                    // xLib.init() n'a pas encore été appelé (initialisation statique de classes)
                    return {} as Dictionnaire<string>;
                }
                if (xClass.config.langDictionaryData != undefined) {
                    xCache._dicoRessource = xClass.config.langDictionaryData;
                }
                else {
                    xCache._dicoRessource = xRequire(xOutils.convertDevUrlToRelativeUrl(xClass.config.langDictionaryUrl));
                } 

                //et on essaye de le mettre ds le top pour gagner du temps la prochaine fois
                xCache.setVariable("dicoRessources", xCache._dicoRessource);
                if (xCache._dicoRessource == undefined) { alert('impossible de charger le dictionnaire'); }

            }
            else {
                console.log('chargement dico par top');
            }
        }

        return this._dicoRessource;

    }

    public static _debugMode: boolean;

    public static get debugMode(): boolean {
        if (xCache._debugMode == undefined) {
            //            xCache._debugMode = xCache.getVariable("debugMode");
            xCache._debugMode = xClass.localConfig.debug;
            if (xCache._debugMode == undefined) {
                xCache._debugMode = false;
            }
        }
        return xCache._debugMode;
    }



    public static setTraductionManquante(val: string,commentaire :string) {
        if (xClass.config == undefined) { return; } // xLib.init() pas encore appelé
        if (false /*xClass.debugMode*/) {

            let isOverLength: boolean = false;

			let message = val + "<br/><br/>";
            if (val.length > 200)
            {
                isOverLength = true;
				message += "Attention ce code a une longueur supérieure à 200 caractères,veuillez le changer pour un code plus cours.<br/><br/>"
                commentaire += "\r\n - Libelle superieur a 200 caracteres - "
			}
			else
				message += "Cette chaine de caractères doite être traduite ?<br/><br/>";

            console.log("===================");
            console.log(message);
            console.log("===================");
            console.trace();
            console.log("===================");

            xOutils.afficherMessageConfirmation(message, true,
                (choix) =>
                {
                    if (!isOverLength)
                    {
                        if (choix) 
                        {
                            return xClass.config.missingTranslationCallback(val, commentaire);
                        }
                        else
                        {
                            xOutils.afficherMessageAlertifyLocaliseLog('traduction à remplacer par un textVariable');
                        }
                    }
                    else
                    {
                        xOutils.afficherMessageAlertifyLocaliseLog('traduction à remplacer par un code plus court');
                    }
                }, (isOverLength ? etype_messagebox.Avertissement : etype_messagebox.Normal)
            )
        }
		else 
		{
			return xClass.config.missingTranslationCallback(val, commentaire);
        }
    }
}