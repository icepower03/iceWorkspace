enum etype_messagebox { Normal, Avertissement }

interface ajaxRetour<T> { d: T; }

interface retourJsonWithErrors<T> {
    succes: T,
    erreur: string
}

enum ETypeAlertify {
    success,
    error,
    log,
    alert
}

enum ETypeStorage {
    Session,
    Local
}

declare namespace alertify {
    interface IProperties {
        /** Default value for milliseconds display of log messages */
        delay?: number;

        /** Default values for display of labels */
    //    labels?: ILabels;

        /** Default button for focus */
   //     buttonFocus?: string;

        /** Should buttons be displayed in reverse order */
     //    buttonReverse?: boolean;

        position?: enumPositionAlerte;
    }
    /** Labels for altertify.set function */
    //interface ILabels {
    //    ok?: string;
    //    cancel?: string;
    //}
}

enum EPositionAlertify {

    topRight,
    topLeft,
    bottomRight,
    bottomLeft
}

enum EKeys
{
    Echap,
    FlecheHaut,
    FlecheDroite,
    FlecheBas,
    FlecheGauche,
    M,
    Entrer,
    A
}

enum ETypeFichier {
    JavaScript,
    CSS
}

enum EnumLibrairieJs {
    pdfMake = "pdfmake.min.js vfs_fonts.js",
    pdfJs = "pdf.js pdf.worker.js",
    d3js = "d3js.4.11.0.js d3pie.min.js"
}

interface iNotificationMessage<T> {
    source: number,
    evenement: string,
    clefEvenement: string | number,
    data: T
}

const desktopDevice = "desktop-device";

interface Echange {
    Contenu: string,
    Source: string,
    FinessSrc: string,
    Destinataire: string,
    FinessDest: string
}


interface EchangeParamFrom {
    data_crypte: string,
    jeton_echange: Echange

}

interface IEventKey
{
    keyEvent: string;
    keyCode: EKeys;
    callBack: () => void;
}

class eventKey
{
    private _eventListener: (event: KeyboardEvent) => void;
    private _keyEvent: string;
    private _keyCode: EKeys;

    public get eventListener(): (event: KeyboardEvent) => void
    {
        let myThis: eventKey = this;
        return myThis._eventListener;
    }
    constructor(keyCode: EKeys, keyEvent: string, callback: () => void)
    {
        let myThis: eventKey = this; 
        this._keyEvent = keyEvent;
        this._keyCode = keyCode;
        this._eventListener = function (event: KeyboardEvent) 
        {
            if (myThis.checkEvent(event, keyCode))
                callback();
        }
    }

    private checkEvent(event: KeyboardEvent, key: EKeys): boolean
    {
        let myThis: eventKey = this; 

        if (event.target instanceof Element)
        {
            if (event.target.tagName.toUpperCase() != 'INPUT' && event.target.tagName.toUpperCase() != 'TEXTAREA')
            {
                if (event.key == myThis.getKeyFromEnum())
                {
                    return true;
                }
            }
        }

        return false;
    }

    /**     * key: "ArrowUp" -> Flèche haut
     *      "ArrowDown" -> Flèche bas
     *      "ArrowLeft" -> Flèche gauche
     *      "ArrowRight" -> Flèche droite
     *      "Escape" -> Echap */
    private getKeyFromEnum(): string
    {
        switch (this._keyCode)
        {
            case EKeys.Echap:
                return "Escape";
            case EKeys.FlecheBas:
                return "ArrowDown";
            case EKeys.FlecheDroite:
                return "ArrowRight";
            case EKeys.FlecheGauche:
                return "ArrowLeft";
            case EKeys.FlecheHaut:
                return "ArrowUp";
            case EKeys.M:
                return "m";
            case EKeys.Entrer:
                return "Enter";
            case EKeys.A:
                return "a";
            default:
                throw new DOMException("Touche non gérée");
        }
    }

    public IsKeyEvent(key: string):boolean
    {
        return key.toLowerCase() == this._keyEvent.toLowerCase();
    }
}


class xOutils {
    public static getStackTrace() {
        let callstack = [];
        let isCallstackPopulated = false;
        try {
            throw ("getStack");
        } catch (e) {
            if (e.stack) { //Firefox
                var lines = e.stack.split("\n");
                for (var i = 0, len = lines.length; i < len; i++) {
                    if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
                        callstack.push(lines[i]);
                    }
                }
                //Remove call to printStackTrace()
                callstack.shift();
                isCallstackPopulated = true;
            }

        }
        if (!isCallstackPopulated) { //IE and Safari
            var currentFunction = arguments.callee.caller;
            while (currentFunction) {
                var fn = currentFunction.toString();
                var fname = fn.substring(fn.indexOf("function") + 8, fn.indexOf("(")) || "anonymous";
                callstack.push(fname);
                currentFunction = currentFunction.caller;
            }
        }
        return callstack.join('\n');
    }

    private static ListKeyUpEventsCallback: eventKey[];
    private static ListKeydownEventsCallback: eventKey[];

    private static escapeRegExp(str: string): string {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    public static replaceAll(str: string, find: string, replace: string): string {
        return str.replace(new RegExp(xOutils.escapeRegExp(find), 'g'), replace);
    }

    /**
     * Retourne toutes les valeurs d'un enum sous la forme d'un tableau.
     * @param monenum
     */
    public static enumToArray<T>(monenum: any): T[] {
        let tab: T[] = [];

        for (let item in monenum) {
            if (!isNaN(Number(item))) {
                let temp: any = Number(item);
                tab.push(<T>temp);
            }

        }

        return tab;
    }

    /**
    * permet de retourner la liste des éléments ( nom de le l'élément et pas valeurs) disponibles dans un enum.
    * @param monenum
    */

    public static enumNamesToStringArray(monenum: any): string[] {

        var vals: string[] = Object.keys(monenum).map(function (key) {
            var cle: any = key;
            if (isNaN(<number>cle)) {
                return key;
            }
        });

        function notUndefined(element: any) {
            return element != undefined
        }

        vals = vals.filter(notUndefined);

        return vals;
    }

    /**
     * fournit la valeur enum d'un enum à partir de son nom en string
     * 
     * @param valeur string d'un enum
     * @param type de l'enum
     */
    public static stringToEnum<T>(value: string, enumerator: any): T {
        //si le string est convertible en entier
        //il y a un pb car l'enumerator retournerait un string au lieu de retourner un number     
        if (!isNaN(parseInt(value))) { return undefined; }

        return enumerator[value];
    }

    /**
    * Fait un appel ajax d'une fonction C#
    */
    
    static JqueryAjaxCall(pageUrl: string, parameter: any, functionRetour: (success: any, context?: any) => void, context?: any, functionError?: (data: any, success: any, error: any) => void): void {
        $.ajax({
            url: pageUrl,
            type: 'POST',
            data: parameter != null ? JSON.stringify(parameter) : null,
            processData: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",  // not "json" we'll parse 
            context: context,
            success: function (success) {
                functionRetour(success.d, context);
            },
            error: functionError != null ? functionError : function (data, success, error) {
               
                    xOutils.afficherMessageAlertify("at " + pageUrl + ", Error :" + data.responseText, ETypeAlertify.error);

                console.log("at " + pageUrl + ", Error :" + data.responseText);
            }
        });
    };
    
    static JqueryAjaxCallPromiseForTsProxy<T>(pageUrl: string, parametreAppel: any, maPage?: xxPageWrapper): Promise<T> {
        return this.JqueryAjaxCallPromiseForTs(pageUrl, parametreAppel, maPage);
    };

 



    static convertDevUrlToRelativeUrl(tildeUrl: string): string {
        if (tildeUrl.indexOf("~") == 0) {
            if (xClass.localConfig.contexteUrlPage.substr(xClass.localConfig.contexteUrlPage.length - 1) != "/")
                xClass.localConfig.contexteUrlPage = xClass.localConfig.contexteUrlPage + "/";

            tildeUrl = tildeUrl.replace("~/", xClass.localConfig.contexteUrlPage);
        } 

        return tildeUrl;
    }

    static JqueryAjaxCallPromiseForTs<T>(pageUrl: string, parametreAppel: any, maPage?: xxPageWrapper): Promise<T> {
        return this.JqueryAjaxCallPromiseForTsJson<T>(pageUrl, parametreAppel, false, maPage);
    }

   
    static JqueryAjaxCallPromiseForTsJsonWithErrors<T>(pageUrl: string, parametreAppel: any, 
        withJSON: boolean, maPage?: xxPageWrapper, catchPerso?: (s: string) => void): Promise<T> {


        let promesseRetour = new Promise<T>((resolve, reject) => {
            let promesse = xOutils.JqueryAjaxCallPromiseForTsJson<retourJsonWithErrors<T>>(pageUrl, parametreAppel, withJSON, maPage);
            promesse.then((retour) => {

                if (retour.erreur != undefined && retour.erreur != null) {
                    reject(retour.erreur);
                }
                else {
                    resolve(retour.succes);
                }

            });
        });
        if (catchPerso != undefined) {
            promesseRetour.catch((err) => { catchPerso(err); });
        }
        else {
            promesseRetour.catch(
                (err: string) => {
                    
                        xOutils.afficherMessageAlertifyError(err);
                  
                });
        }
        return promesseRetour;

    }


    /**
            * methode d'appel externe ajax en mode promise pour pouvoir chainer
            * @param pageUrl
            * @param parametreAppel
            * @param settings
            */
    static JqueryAjaxCallPromiseForTsJsonDistant<T>(parametreAppel: any, maPage?: xxPageWrapper): Promise<T> {
        let divws: xDiv = undefined;
        if (maPage != undefined && maPage != null) {

            divws = maPage.ajouterWS();
        }
        else {
            //fake
            divws = xOutils.ajouterWS();
            document.body.append(divws.y);
        }

        divws.addClass("ws_launch");

        let promesseEmed: Promise<T> = new Promise<T>((resolve, reject) => {

           let cryptageEtJeton: Promise<Response> = xOutils.JqueryAjaxCallPromise2(xOutils.convertDevUrlToRelativeUrl("~/xModules/ModuleEmed.aspx/Before_requestWebService_Echange"), parametreAppel, { async: true });

            //Cryptage de la requête à envoyer à l'emed destinataire : paramètres d'appel de la méthode
            cryptageEtJeton.then(async (retourBefore: Response)=>
            {
                let retourBeforeObjet = (await retourBefore.json()).d;
                //On va verifier le jeton de communication et recuperer la cle correspondante ainsi que la veritable requete a effectuer
                let requestDistante: Promise<Response> = xOutils.JqueryAjaxCallPromise2(retourBeforeObjet.URL_Emed_Clinique + "/xModules/ModuleEmed.aspx/requestWebService_Echange", { data_echange: retourBeforeObjet }, { async: true });

                requestDistante.then(async (retourRequest: Response)=>
                {
                    let retourAfterObjet = (await retourRequest.json()).d;
                    let decryptWithKey: Promise<Response> = xOutils.JqueryAjaxCallPromise2(xOutils.convertDevUrlToRelativeUrl("~/xModules/ModuleEmed.aspx/After_requestWebService_Echange"), { data_echange: retourAfterObjet }, { async: true });
                

                        decryptWithKey.then(async (retour: Response) =>
                        {
                            let monRetour: T = JSON.parse((await retour.json()).d);

                            resolve(monRetour);

                        });

                   
                    decryptWithKey.catch(function (erreur: string) {
                        console.error("Erreur lors du déchiffrement de la réponse d'un appel vers l'URL " + retourBeforeObjet.URL_Emed_Clinique + ": ", erreur);
                        xOutils.afficherMessageAlertify("Erreur lors du déchiffrement de la réponse d'un appel vers l'URL ", ETypeAlertify.error);

                         reject("Erreur lors du déchiffrement de la réponse d'un appel vers l'URL " + retourBeforeObjet.URL_Emed_Clinique);

                    });

                });
                requestDistante.catch(function (erreur: string) {
                    console.error("Erreur lors d'un appel vers l'URL " + retourBeforeObjet.URL_Emed_Clinique + ": ", erreur);
                    xOutils.afficherMessageAlertify("Erreur lors d'un appel vers l'URL " + retourBeforeObjet.URL_Emed_Clinique, ETypeAlertify.error);

                    reject("Erreur lors d'un appel vers l'URL " + retourBeforeObjet.URL_Emed_Clinique);
                });
            });
            cryptageEtJeton.catch(function (erreur: string) {
                console.error("Erreur lors de la création du jeton d'échange: ", erreur);
                xOutils.afficherMessageAlertify("Erreur lors de la création du jeton d'échange", ETypeAlertify.error);
                reject("Erreur lors de la création du jeton d'échange");

            });

        });

        promesseEmed.then(function () {
            divws.removeClass("ws_launch");
            divws.addClass("ws_ok");
            setTimeout(function () { divws.y.remove(); }, 2000);
        });

        promesseEmed.catch(
            function (err: any) {
                divws.removeClass("ws_launch");
                divws.addClass("ws_error");
                setTimeout(function () { divws.y.remove(); }, 3000);

                xOutils.afficherMessageAlertify(err.responseJSON != undefined ? err.responseJSON.Message : err, ETypeAlertify.error);

            });
        return promesseEmed;
    
    }

       static JqueryAjaxCallPromiseForTsJson<T>(pageUrl: string, parametreAppel: any, withJSON: boolean, maPage?: xxPageWrapper): Promise<T> {
       return xOutils.JqueryAjaxCallPromiseForTsJsonFetch(pageUrl, parametreAppel, withJSON, maPage);
   }
 
    static JqueryAjaxCallPromiseForTsJsonFetch<T>(pageUrl: string, parametreAppel: { methode: string }, withJSON: boolean, maPage?: xxPageWrapper): Promise<T>
    {

        pageUrl = xOutils.convertDevUrlToRelativeUrl(pageUrl);
        let divws: xDiv = undefined;
        if (maPage != undefined && maPage != null)
        {
            divws = maPage.ajouterWS();
        }
        else
        {
            //fake
            divws = xOutils.ajouterWS();
            document.body.append(divws.y);
        }
        divws.addClass("ws_launch");

        let promesse: Promise<T> = new Promise<T>(function (resolve, reject)
        {
            xOutils.JqueryAjaxCallPromiseFetch(pageUrl, parametreAppel, { async: true }).then(async (retour: Response) =>
            {
                let monretourstring = await retour.json();
                try
                {
                    let monRetour: T;
                    if (withJSON)
                        monRetour = JSON.parse(monretourstring.d)
                    else
                        monRetour = monretourstring.d;
                    resolve(monRetour);
                }
                catch (erreur)
                {
                    if (monretourstring?.d != null && monretourstring.d.startsWith("InvalidSession:-")) //si c'est une erreur de sesison on ne la remonte a l'utilisateur (pour ne pas avoir de msg rouge avant la deconnection)
                        console.log("Session Emed invalide, " + monretourstring.d);
                    else
                        xOutils.AfficheErreurAjax("Erreur des données de retour de la méthode Ajax " + parametreAppel.methode, erreur, divws);
                }
            }).catch((erreur) =>
            {
                xOutils.AfficheErreurAjax("Erreur pendant l'appel de la méthode Ajax " + parametreAppel.methode, erreur, divws);
                reject(erreur);
            });
        })

        promesse.then(function () 
        {
            divws.removeClass("ws_launch");
            divws.addClass("ws_ok");
            setTimeout(function () { divws.y.remove(); }, 2000);
        }).catch(function (erreur)
        {
            xOutils.AfficheErreurAjax("Erreur catch 'impossible' promesse " + parametreAppel.methode, erreur, divws);
        });
        return promesse;
    }

    private static AfficheErreurAjax(erreur_info: string, erreur: any, divws: xDiv) 
    {
        let erreur_info_console = erreur_info;
        if (erreur != null)
        {
            if (erreur.stack != null)
                erreur_info_console += " : " + erreur.stack
            else if (erreur.responseText != null)
                erreur_info_console += " : " + erreur.responseText;
            else
                erreur_info_console += " : " + erreur;
        }
        console.log(erreur_info_console); //on met plus d'info dans la console et qq chose de plus light a l'affichage
        divws.removeClass("ws_launch");
        divws.addClass("ws_error");
        setTimeout(function () { divws.y.remove(); }, 3000);

        //try 
        //{
        //    let json = JSON.parse(err.responseText);
        //    if (json.Message != undefined)
        //    {
        //        affichage = json.Message;
        //    }
        //}
        //catch (exc) 
        //{
        //}
        xOutils.afficherMessageAlertify(erreur_info, ETypeAlertify.error);
    }

    private static ajouterWS(): xDiv {

        let retour: xDiv = new xDiv({ class: 'Global_wsLineElement' });
        return retour;
    }

    /**
        * methode d'appel ajax en mode promise pour pouvoir chainer
        * @param pageUrl
        * @param parametreAppel
        * @param settings
        */
    static JqueryAjaxCallPromise2(pageUrl: string, parametreAppel: any, settings?: JQueryAjaxSettings): Promise<Response> {


        var s: JQueryAjaxSettings;
        s = {

            type: 'POST',
            data: parametreAppel != null ? JSON.stringify(parametreAppel) : null,

            processData: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json"  // not "json" we'll parse 

        }
        if (settings != null) {
            
            s = { ...s, ...settings };
        }

        //return $.ajax(pageUrl, s);
        return fetch(pageUrl, { method: s.type, body: s.data, headers: { 'content-type': s.contentType } });

    }

    static JqueryAjaxCallPromiseFetch(pageUrl: string, parametreAppel: any, settings?: JQueryAjaxSettings): Promise<Response> {


        var s: JQueryAjaxSettings;
        s = {

            type: 'POST',
            data: parametreAppel != null ? JSON.stringify(parametreAppel) : null,

            processData: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json"  // not "json" we'll parse 

        }
        if (settings != null) {

            s = { ...s, ...settings };
        }

        return fetch(pageUrl, { method: s.type, body: s.data, headers: { 'content-type': s.contentType } })

       
    }

    static afficherMessageAlertify(message: string, type: ETypeAlertify, options: alertify.IProperties = {}): void {
        xxDialog.afficherMessageDialog(message, type, options);
    }

    static afficherMessageAlertifyLog(message: string)
    {
        xxDialog.afficherMessageDialog(message, ETypeAlertify.log);
    }
    static afficherMessageAlertifyError(message: string)
    {
        xxDialog.afficherMessageDialog(message, ETypeAlertify.error);
    }
    static afficherMessageAlertifySuccess(message: string)
    {
        xxDialog.afficherMessageDialog(message, ETypeAlertify.success);
    }

    static afficherMessageAlertifyLocalise(message: string, type: ETypeAlertify, options: alertify.IProperties = {}): void {
        xxDialog.afficherMessageDialog(new xLString(message).text, type, options);
    }

    static afficherMessageAlertifyLocaliseLog(message: string)
    {
        xxDialog.afficherMessageDialogLocalise(message, ETypeAlertify.log);
    }
    static afficherMessageAlertifyLocaliseError(message: string)
    {
        xxDialog.afficherMessageDialogLocalise(message, ETypeAlertify.error);
    }
    static afficherMessageAlertifyLocaliseSuccess(message: string)
    {
        xxDialog.afficherMessageDialogLocalise(message, ETypeAlertify.success);
    }

    static afficherMessageAlertifyContent(content: iXElement, type: ETypeAlertify, options: alertify.IProperties = {}): void
    {
        xxDialog.afficherMessageDialogContent(content, type, options);
    }
    
    static afficherMessageConfirmationLocalise(message: string, afficherOuiNon: boolean, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox/*, bloquerBtnValider: boolean = false, NomDeBoutonCustom?: { ok: string, cancel: string }*/, sansBoutons?:boolean): void {
        xxDialog.afficherMessageConfirmation(new xLString(message).text, afficherOuiNon, delegueReponse, type_messagebox/*, bloquerBtnValider, NomDeBoutonCustom*/, sansBoutons);
    }
    static afficherMessageConfirmation(message: string, afficherOuiNon: boolean, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox/*, bloquerBtnValider: boolean = false, NomDeBoutonCustom?: { ok: string, cancel: string }*/, sansBoutons?: boolean): void {
        xxDialog.afficherMessageConfirmation(message, afficherOuiNon, delegueReponse, type_messagebox, sansBoutons);
    };
    static afficherErreurConfirmation(message: string, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox, sansBoutons?: boolean): void {
        xxDialog.afficherErreurConfirmation(message, delegueReponse, type_messagebox, sansBoutons);
    };

    static afficherMessageConfirmationPromise(message: string, afficherOuiNon: boolean, type_messagebox?: etype_messagebox/*, bloquerBtnValider: boolean = false, NomDeBoutonCustom?: { ok: string, cancel: string }*/, sansBoutons?: boolean): Promise<boolean> {
        return xxDialog.afficherMessageConfirmationPromise(message, afficherOuiNon, type_messagebox, sansBoutons);
    }

    static IsMailValid(val: string): boolean {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let valid: boolean;
        if (val.match(mailformat))
            valid = true;
        else
            valid = false;
        return valid;
    }

    static DateToFrenchDateString(date: DateSerialisable, avecHeures: boolean, avecSecondes: boolean): string {
        var ret = ""
        var nb = DateSerialisable.getJours(date);//.getDate();
        ret += nb < 10 ? "0" + nb : nb;
        var nb = DateSerialisable.getMois(date) + 1; // .getMonth() + 1;
        ret += "/" + (nb < 10 ? "0" + nb : nb);
        ret += "/" + DateSerialisable.getAnnees(date) //.getFullYear();
        if (avecHeures)
            ret += " " + this.DateToFrenchTimeString(date, avecSecondes);
        return ret;
    };

    static DateToFrenchTimeString(date: DateSerialisable, avecSecondes: boolean): string {
        var ret = ""
        var nb = DateSerialisable.getHeures(date); //.getHours();
        ret += nb < 10 ? "0" + nb : nb;
        var nb = DateSerialisable.getMinutes(date) //.getMinutes();
        ret += ":" + (nb < 10 ? "0" + nb : nb);
        if (avecSecondes) {
            var nb = DateSerialisable.getSecondes(date) //.getSeconds();
            ret += ":" + (nb < 10 ? "0" + nb : nb);
        }
        return ret;
    };

    static compareArrays(array1: any[], array2: any[]): boolean {

        if (!array1 && !array2)
            return true;

        if ((!array1 && array2) || (array1 && !array2))
            return false

        // compare lengths - can save a lot of time 
        if (array1.length != array2.length)
            return false;

        for (var i = 0, l = array1.length; i < l; i++) {
            // Check if we have nested arrays
            if (array1[i] instanceof Array && array2[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this.compareArrays(array1[i], array2[i]))
                    return false;
            }
            else if (array1[i] != array2[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };

    static getUrlParameter(param: string): any {
        ///<summary>recupere le parametre d'id donne de l'URL courante</summary>
        return xOutils.getUrlParameterFromString(window.location.search.substring(1), param, true);
    };

    static getUrlParameterFromString(urlAParser: string, param: string, withDecode: boolean): any {
        ///<summary>recupere le parametre d'id donne de l'URL courante</summary>

        var sPageURL: string = urlAParser;
        if (withDecode) {
            sPageURL = decodeURIComponent(sPageURL);
        }

        var URLVariables: string[] = sPageURL.split('&');
        var parameterName: string[];
        var i: number;

        for (i = 0; i < URLVariables.length; i++) {
            parameterName = URLVariables[i].split('=');

            if (parameterName[0] === param) {
                return parameterName[1] === undefined ? "true" : parameterName[1];
            }
        }
    };

    removeParamFromHref(href: string, param: string): any {
        var pos1: number = href.indexOf(param + '=');
        if (pos1 > 0) {
            var pos2 = href.indexOf('&', pos1 + 1);
            if (pos2 > 0)
                //si le character du debut du parametre est ? alors on va supprimer le & suivant
                href = href.replace(href.substr(pos1 - 1, 1) == "?" ? href.substring(pos1, pos2 + 1) : href.substring(pos1 - 1, pos2), '');
            else
                href = href.replace(href.substr(pos1 - 1), '');
        }
        return href;
    };

    static guid(): string {
        ///<summary>renvoit un id aleatoire</summary>

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    static replaceUrlParam(url: string, paramName: string, paramValue: string): string {
        if (paramValue == null)
            paramValue = '';
        var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)')
        if (url.search(pattern) >= 0) {
            return url.replace(pattern, '$1' + paramValue + '$2');
        }
        return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue
    }

    public static async inclureLibrairie(key: EnumLibrairieJs) {
        let path: string = xOutils.convertDevUrlToRelativeUrl(xConfigActive.jsDependencyPath);
        let tag: string = "";
        if (xClass.localConfig.fileCacheTag != undefined)
            tag = "?" + xClass.localConfig.fileCacheTag;

        let nomsFichiers: string[] = key.split(" ");

        for (let nom of nomsFichiers) {
            await this.inclureFichier(ETypeFichier.JavaScript, path + nom + tag);
        }
    }

    public static async inclureFichier(typeFichier: ETypeFichier, src: string): Promise<void> {
        return new Promise<void>((resolve, reject) =>
        {
            let elem: HTMLElement;

            switch (typeFichier)
            {
                case ETypeFichier.JavaScript:
                    elem = document.createElement('script');
                    elem.setAttribute("type", "text/javascript");
                    elem.setAttribute("src", src);
                    document.getElementsByTagName('head')[0].appendChild(elem);

                    elem.addEventListener('load', () =>
                    {
                        resolve();
                        console.log('load', src)
                    })

                    elem.addEventListener("error", (ev) =>
                    {
                        reject('Failed to load the file ' + src)
                        console.log('erreur', src);

                    });

                    break;
                case ETypeFichier.CSS:
                    elem = document.createElement('link');
                    elem.setAttribute("type", "text/css");
                    elem.setAttribute('rel', 'stylesheet');
                    elem.setAttribute("href", src);
                    elem.setAttribute('media', 'print');
                    elem.setAttribute('onload', "this.media='all'");
                    document.getElementsByTagName('head')[0].appendChild(elem);

                    resolve();
                    break;
            }
        });
    }

    public static rechercheString(valeur1: string, valeur2: string[]): boolean {
        let value: boolean = false;
        let myThis = this;

        if (valeur1 != null) {
            valeur2.forEach(function (element) {
                if (element != null && !value)
                    value = myThis.setTextPourRecherche(element).indexOf(myThis.setTextPourRecherche(valeur1)) >= 0;
            });
        }

        return value;
    }

    public static rechercheStringofString(texteRechercher: string, texteComplet: string): string {
        let myThis = this;

        let value: number = myThis.setTextPourRecherche(texteComplet).indexOf(myThis.setTextPourRecherche(texteRechercher));
        if (value >= 0)
        {
            return texteComplet.substring(value, value + texteRechercher.length);
        }
        else
            return null;
    }

    private static setTextPourRecherche(s: string): string {
        var accent = [
            /[\300-\306]/g, /[\340-\346]/g, // A, a
            /[\310-\313]/g, /[\350-\353]/g, // E, e
            /[\314-\317]/g, /[\354-\357]/g, // I, i
            /[\322-\330]/g, /[\362-\370]/g, // O, o
            /[\331-\334]/g, /[\371-\374]/g, // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g, // C, c
        ];
        var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

        for (var i = 0; i < accent.length; i++) {
            s = s.replace(accent[i], noaccent[i]);
        }

        return s.toUpperCase();
    }

    public static rechercheStringTous(valeursRecherche: string[], valeur2: string[]): boolean {

        return valeursRecherche.every(rech => { return xOutils.rechercheString(rech, valeur2); });
    }

    public static rechercheStringUnParmiTous(valeursRecherche: string[], valeur2: string[]): boolean {

        return valeursRecherche.some(rech => { return xOutils.rechercheString(rech, valeur2); });
    }

    public static getLocalStorage(key: string): string {
        return this.GetElement(key, ETypeStorage.Local);
    }

    public static setLocalStorage(key: string, valeur: string) {
        this.UpdateElement(key, valeur, ETypeStorage.Local);
    }
    public static delLocalStorage(key: string, valeur: string) {//pour guid
        this.RemoveElement(key, ETypeStorage.Local);
    }

    public static getSessionStorage(key: string): string {
        return this.GetElement(key, ETypeStorage.Session);
    }

    public static setSessionStorage(key: string, valeur: string) {
        this.UpdateElement(key, valeur, ETypeStorage.Session);
    }

    public static delSessionStorage(key: string) {
        this.RemoveElement(key, ETypeStorage.Session);
    }


    private static UpdateElement(key: string, value: string, type: ETypeStorage = ETypeStorage.Session) {
        this.RemoveElement(key, type);
        this.AddElement(key, value, type);
    }

    private static AddElement(key: string, value: string, type: ETypeStorage = ETypeStorage.Session) {

        if (type == ETypeStorage.Session)
            sessionStorage.setItem(key, value);
        else
            localStorage.setItem(key, value);
    }

    public static RemoveElement(key: string, type: ETypeStorage = ETypeStorage.Session) {
        if (type == ETypeStorage.Session)
            sessionStorage.removeItem(key);
        else
            localStorage.removeItem(key);
    }

    private static GetElement(key: string, type: ETypeStorage = ETypeStorage.Session): string {
        var res: string;
        if (type == ETypeStorage.Session) {
            res = sessionStorage.getItem(key);
        } else {
            res = localStorage.getItem(key);
        }

        return res;
    }

    public static IndenterJs(codesource: string): string {

        let option_beautify: JsBeautifyOptions =
        {
            indent_size: 4,
            indent_char: " ",
            max_preserve_newlines: 2,
            preserve_newlines: true,
            keep_array_indentation: false,
            break_chained_methods: false,
            indent_scripts: "normal",
            brace_style: "collapse",
            space_before_conditional: true,
            unescape_strings: false,
            jslint_happy: false,
            end_with_newline: false,
            wrap_line_length: 0,
            indent_inner_html: false,
            comma_first: false,
            e4x: false
        };

        return js_beautify(codesource, option_beautify);
    }

    public static async readClipboard(): Promise<string> {
        return navigator.clipboard.readText();

    }
    public static copyToClipboard(str: string) {

        // Create new element
        let el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = str;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '1px';
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
        xOutils.afficherMessageAlertifyLocaliseSuccess('Copié dans le presse papiers');
    }

    

    /**
     * Appelle la fonction donnée en arguments lorsque la touche donnée est relâchée
     * Un contrôle existe pour faire en sorte de ne pas s'abonner plusieurs fois au même événement
     */
    public static addKeyupEvent(options: IEventKey): void
    {
        if (xOutils.ListKeyUpEventsCallback == null)
            xOutils.ListKeyUpEventsCallback = [];

        let exist: boolean = xOutils.ListKeyUpEventsCallback.some(s => s.IsKeyEvent(options.keyEvent));

        if (!exist)
        {
            let keyEvenement: eventKey = new eventKey(options.keyCode, options.keyEvent, options.callBack);
            xOutils.ListKeyUpEventsCallback.push(keyEvenement);
            window.addEventListener("keyup", keyEvenement.eventListener, false);
        }

    }

    /**
    * Appelle la fonction donnée en arguments lorsque la touche donnée est pressée
    * Un contrôle existe pour faire en sorte de ne pas s'abonner plusieurs fois au même événement
    */
    public static addKeydownEvent(options: IEventKey): void
    {
        if (xOutils.ListKeydownEventsCallback == null)
            xOutils.ListKeydownEventsCallback = [];

        let exist: boolean = xOutils.ListKeydownEventsCallback.some(s => s.IsKeyEvent(options.keyEvent));

        if (!exist)
        {
            let keyEvenement: eventKey = new eventKey(options.keyCode, options.keyEvent, options.callBack);
            xOutils.ListKeydownEventsCallback.push(keyEvenement);
            window.addEventListener("keydown", keyEvenement.eventListener, false);
        }
    }

    /**
     * Efface le KeyboardEvent up spécifié
     */
    public static removeKeyupEvent(keyCodeEvent:string): void 
    {
        if (xOutils.ListKeyUpEventsCallback != null) 
        {
            let evenement = xOutils.ListKeydownEventsCallback.filter(s => s.IsKeyEvent(keyCodeEvent));

            if (evenement != null && evenement.length > 0)
            {
                window.removeEventListener("keyup", evenement[0].eventListener, false);
            }
        }
    }

    public static afficherMessageErreurLicence(nom_licence: string = null): void {

        let textAAfficher: string = new xLString("La licence {0} nécessaire à l'affichage de ce contenu n'est pas présente sur votre version d'Emed. Veuillez prendre contact avec votre référent.").format([nom_licence != null && nom_licence != "" ? "(" + nom_licence + ") " : ""]);

        new xxBloqueEcran({
            class: "ErreurLicence",
            textLocalise: textAAfficher
        });
    }

    public static afficherMessageErreurPage(info: string = null): void {

        let textAAfficher: string = new xLString("Vous ne disposez pas des droits nécessaires à l'affichage de cette page.").format([info != null && info != "" ? "(" + info + ") " : ""]);

        new xxBloqueEcran({
            class: "ErreurLicence",
            textLocalise: textAAfficher
        });
    }

    public static Notification = {
        throwSimpleEvent: (source: number, evenement: string, clefEvenement: string | number) => {
            return xOutils.notificationFullDom<number>(source, evenement, [{ data: Date.now(), clefEvenement: clefEvenement }]);
        },
        throwMultiSimpleEvent: (source: number, evenement: string, clefEvenement: (string | number)[]) => {

            return xOutils.notificationFullDom<number>(source, evenement, clefEvenement.map(i => { return { data: Date.now(), clefEvenement: i } }));
        },

        listenSimpleEvent: (source: number, evenement: string, clefEvenement: string | number, onchange: (source: number) => void) => {
            return xOutils.notificationListener<number>(source, evenement, clefEvenement, onchange);
        },
        listenOnlySimpleEvent: (evenement: string, clefEvenement: string | number, onchange: (source: number) => void) => {
            return xOutils.notificationListenerPur<number>(evenement, clefEvenement, onchange);
        },
        createNewId: (): number => {
            return Math.random();
        }
    }

    public static notificationListenerPur<T>(evenement: string, clefEvenement: string | number, onChange: (data: T) => void): () => void {
        return xOutils.notificationListener(null, evenement, clefEvenement, onChange);
    }

    public static notificationListener<T>(source: number, evenement: string, clefEvenement: string | number,
        onChange: (data: T, source: number) => void): () => void {


        if (typeof (BroadcastChannel) == "undefined") 
        {
            window.addEventListener("storage", (e) => 
            {

                if (e.key == evenement + '_' + clefEvenement) {

                    let newValueString: string = e.newValue;

                    //le message nous intéresse
                    let valeur: iNotificationMessage<T> = null;
                    if (newValueString != null) {
                        valeur = JSON.parse(newValueString);
                    }

                    if (source == null || valeur.source != source) {
                        //et ce n'est pas moi qu'il l'ai envoyé

                        onChange(valeur == null ? null : valeur.data, source);

                    }
                }

            });
            return () => { };
        }
        else {

            let channel = new BroadcastChannel(evenement + '_' + clefEvenement);

            channel.onmessage = (e) => {
                console.log(e);
                let newValueString: string = e.data;
                //le message nous intéresse
                let valeur: iNotificationMessage<T> = null;
                if (newValueString != null) {
                    valeur = JSON.parse(newValueString);
                }


                if (source == null || valeur.source != source) {
                    //et ce n'est pas moi qu'il l'ai envoyé

                    onChange(valeur == null ? null : valeur.data, source);

                }


            }
            return () => {
                if (channel != null) { channel.close(); }
            };
        }

        /*   window.addEventListener("EmedNotify", (e:CustomEvent<iNotificationMessage<T>>) => {
               
               if (e.detail.evenement + '_' + e.detail.clefEvenement == evenement + '_' + clefEvenement) {
   
                  
                   if (source == null || e.detail.source != source) {
                       //et ce n'est pas moi qu'il l'ai envoyé
   
                       onChange(e.detail == null ? null : e.detail.data);
   
                   }
               }
   
           });
           */

    }

    public static notificationFullDom<T>(source: number, evenement: string, liste: { data: T, clefEvenement: string | number }[]): void {

        return xOutils.notificationFullDomByMessage(liste.map(i => {
            return { source: source, evenement: evenement, data: i.data, clefEvenement: i.clefEvenement };
        }));
    }

    private static notificationFullDomByMessage<T>(messages: iNotificationMessage<T>[]): void {
        if (typeof (BroadcastChannel) == "undefined") {
            var x = window.open("", "myWindow", "width=10,height=10");
            messages.forEach(message => {
                x.localStorage.setItem(message.evenement + '_' + message.clefEvenement, JSON.stringify(message));
            });
            x.close();
        }
        else {
            messages.forEach(message => {
                let channel = new BroadcastChannel(message.evenement + '_' + message.clefEvenement);
                channel.postMessage(JSON.stringify(message));
            });

        }

          //window.dispatchEvent(new CustomEvent <iNotificationMessage<T>>('EmedNotify', {detail:message}))
    }

    //public static attachTo(parent: JQuery, element: HTMLElement) {
    //    parent.append(element);
    //}

    public static attachToHead(element: HTMLElement)
    {
        document.head.append( element);
    }

    public static attachToBody(element: HTMLElement)
    {
        document.body.append( element);
    }

    /**
     * Compare des versions de programme entre elles.
     * @param a
     * @param b
     */
    public static compareVersions(a: string, b: string): number {
        let i: number;
        let diff: number;
        let regExStrip0: RegExp = /(\.0+)+$/;
        let segmentsA: string[] = a.replace(regExStrip0, '').split('.');
        let segmentsB: string[] = b.replace(regExStrip0, '').split('.');
        let l: number = Math.min(segmentsA.length, segmentsB.length);

        for (i = 0; i < l; i++) {
            diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
            if (diff) {
                return diff;
            }
        }

        return segmentsA.length - segmentsB.length;
    }

    public static hasFocus(a: iXElement): boolean {
        return (document.activeElement === a.y);
    }
    //public static rgb2hsv(r:number, g:number, b:number) {
    //        var computedH = 0;
    //        var computedS = 0;
    //        var computedV = 0;

    //        //remove spaces from input RGB values, convert to int
    //        var r = parseInt(('' + r).replace(/\s/g, ''), 10);
    //        var g = parseInt(('' + g).replace(/\s/g, ''), 10);
    //        var b = parseInt(('' + b).replace(/\s/g, ''), 10);

    //        if (r == null || g == null || b == null ||
    //            isNaN(r) || isNaN(g) || isNaN(b)) {
    //            alert('Please enter numeric RGB values!');
    //            return;
    //        }
    //        if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
    //            alert('RGB values must be in the range 0 to 255.');
    //            return;
    //        }
    //        r = r / 255; g = g / 255; b = b / 255;
    //        var minRGB = Math.min(r, Math.min(g, b));
    //        var maxRGB = Math.max(r, Math.max(g, b));

    //        // Black-gray-white
    //        if (minRGB == maxRGB) {
    //            computedV = minRGB;
    //            return [0, 0, computedV];
    //        }

    //        // Colors other than black-gray-white:
    //        var d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
    //        var h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);
    //        computedH = 60 * (h - d / (maxRGB - minRGB));
    //        computedS = (maxRGB - minRGB) / maxRGB;
    //        computedV = maxRGB;
    //        return [computedH, computedS, computedV];
    //    }

    public static afficheDate(d: DateSerialisable, ici: iXElementHolder) {
        if (d != undefined) {
            
            ici.xxLabel({
                textVariable: DateSerialisable.tolocalStringOnlyDate(d)
            });
        }
    }

    public static afficheDateEtHeure(d: DateSerialisable, ici: iXElementHolder) {
        if (d != undefined) {

            ici.xxLabel({
                textVariable: DateSerialisable.tolocalStringWithoutSeconds(d)
            });
        }
    }

    public static ToStringDateHeure(d: DateSerialisable) {
        if (d != undefined) {
            return DateSerialisable.tolocalstringHeureMinute(d);
        }
        return "";
    }

    public static ToStringDate(d: DateSerialisable) {

        if (d != undefined) {
            return DateSerialisable.tolocalStringOnlyDate(d); // maDate.toLocaleDateString();

        }
        return "";
    }



    public static printDate(d: DateSerialisable): string {
        let retour: string = "";

        if (d != undefined) {
            retour = DateSerialisable.tolocalstringHeureMinute(d); // maDate.toLocaleDateString() //+ " " + maDate.toLocaleTimeString();
        }
        return retour;
    }
    public static printDateHeure(d: DateSerialisable): string {
        let retour: string = "";

        if (d != undefined)
        {
            retour = DateSerialisable.tolocalStringWithoutSeconds(d) /*maDate.toLocaleDateString() + " " + maDate.toLocaleTimeString();*/
        }
        return retour;
    }

    public static getCssClassByDiviceType(): string {
        let ua = navigator.userAgent;

        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua))
            return "tablet-device";

        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua))
            return "mobile-device";

        return desktopDevice;
    }

    public static isMobile(): boolean {

        let isTestDeviceTypeMobile = xOutils.getCssClassByDiviceType() != desktopDevice;

        if (!isTestDeviceTypeMobile)
        {
            if (window.innerWidth <= 1024)
                return true;
        }

        return isTestDeviceTypeMobile;

    }


    public static base64ToUint8Array(base64: string): Uint8Array {
        var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    }



    public static isNullOrEmpty(inStr: string): boolean { return !(inStr && inStr.length > 0); }
    public static IsNullOrEmpty(inStr: string): boolean {
        return xOutils.isNullOrEmpty(inStr);
}

    public static InsertAt(source: string, index: number, val: string) {
        var new_str = source;
        if (index >= 0 && index < this.length) {
            new_str = [source.slice(0, index), val, source.slice(index)].join("");
        }
        return new_str;
    }

    public static doubleToString = function (value:number|string):string {
        if (!value)
            return "";
        return <string>value;
    }

    public static isHttps(): boolean
    {
        return (document.location.protocol == 'https:');
    }

    public static async sleep(ms: number)
    {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    public static distinct(liste: number[])
    {
        return liste.filter((element, index, liste) => liste.findIndex(elem => elem === element) === index);
    }
}