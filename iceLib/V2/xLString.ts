
/**
 * Classe pour gérer la localisation des strings
 */
class xLString {

    private _text: string;
    private code: string;
    public get text(): string {
        return this._text;
    }

    constructor(inVal: string) {
        let myThis: xLString = this;

        if (inVal == undefined) {
            inVal = "";
        } 

        //on extrait les trims du debut de la fin
        let trimstart: string = "";
        let trimend: string = "";
        let btrimstart: boolean = false;

        for (let i = 0; i < inVal.length; i++)
        {
            let charatester: string = inVal[i];
            if (charatester == ' ' || charatester == '\t' || charatester == '\n' || charatester == '\r' || charatester == ':') //un char a trimer
            {
                if (!btrimstart)
                    trimstart += charatester; //on continue de générer le trim de debut
                else
                    trimend += charatester; //on genere le trime de fin
            }
            else //un char a prendre en compte
            {
                btrimstart = true; //on arrete de fabriquer le trim du debut
                trimend = ""; //on reset le trim de fin
            }
        }

        if (inVal.length > 0 && btrimstart) // Si la chaine n'est pas vide et qui il y des vrais caracteres
        {

			let logpile: string = null;

            if (inVal.length > 200)
            {
                // si le libelle fait plus de 200 caracteres
                try
                {
                    let error: Error = new Error();
                    logpile = error.stack.toString();
                } catch { }
                xCache.setTraductionManquante(inVal, logpile);
                myThis._text = inVal;
            }
            else
            {
                myThis.code = inVal.substring(trimstart.length, inVal.length - trimend.length);
                let retour: string;
                retour = xCache.dicoRessources[myThis.code];

                if (retour === null)
                {
                    //null veut dire que le code est déjà connu mais n'a pas de traduction
                    myThis._text = trimstart + myThis.code + trimend ;
                }
                else
                {
                    if (retour === undefined) 
                    {

                        xCache.dicoRessources[myThis.code] = null;
                        myThis._text = trimstart + myThis.code + trimend;
                        try
                        {
                            let error: Error = new Error();
                            logpile = error.stack.toString();
                        } catch { }
                        xCache.setTraductionManquante(myThis.code, logpile);
                    }
                    else 
                    {
                        myThis._text = trimstart + retour + trimend;
                    }
                }
            }
        }
        else {
            myThis._text = "";
        }
    }

    public format(variables: (string | number)[]): string 
    {
        let retour: string = "";
        retour = this.text;
        if (variables != undefined && variables.length > 0) 
        {
            variables.forEach((element, index) =>
            {
                if(element != null)
                    retour = retour.replace('{' + index + '}', element.toString());
            });
          
        }
        else {

        }

        return retour;

    }


}