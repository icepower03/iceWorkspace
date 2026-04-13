export class iceMaths {

    /**
     * Permet de calculer le plus petit multiple commun de deux nombres
     * @param a number
     * @param b number
     */
    public static PPCM(a: number, b: number): number 
    {
        if (a == 0 || b == 0)
            throw "Le paramètre a ou b est égal à 0.";

        if (a == b)
            return a;

        return a * b / (this.PGCD(a, b));
    }

    /**
     * Permet de calculer le plus grand diviseur commun de deux nombres 
     * @param a 
     * @param b
     */
    public static PGCD(a: number, b: number): number {
        let int_R;
        let int_pgcd;

        let int_A = a;
        let int_B = b;
        while (int_B != 0) {
            int_R = int_A % int_B;
            int_A = int_B;
            int_B = int_R;
        }
        int_pgcd = int_A;

        return int_pgcd;
    }

    /**
     * Permet de calculer le plus petit multiple d'une liste de nombre
     * @param listeNombre number[]
     */
    public static PPCMListe(listeNombre: number[]): number {
        let ppcm = 1;

        for (let i = 1; i < listeNombre.length; i++) {
            if (i == 1)
                ppcm = this.PPCM(listeNombre[i - 1], listeNombre[i]);
            else
                ppcm = this.PPCM(ppcm, listeNombre[i]);
        }
        return ppcm;
    }

    /**
     * Permet de calculer le plus grand diviseur commun d'une liste de nombre
     * @param listeNombre number[]
     */
    public static PGCDListe(listeNombre: number[]): number {
        let pgcd = 1;

        for (let i = 1; i < listeNombre.length; i++) {
            if (i == 1)
                pgcd = this.PGCD(listeNombre[i - 1], listeNombre[i]);
            else
                pgcd = this.PGCD(pgcd, listeNombre[i]);
        }
        return pgcd;
    }

    /**
     * Permet d'addition avec exactitude deux nombre (float ou entier)
     * @param a Nombre a base
     * @param b Nombre a additionner
     * @param e Nombre de décimal
     */
    public static exactPlus(a: number, b: number, e: number): number {
        let aS  = String(a)
        let bS = String(b)
        let arrayA = aS.split('\.');
        let arrayB = bS.split('\.');
        let deci = 0;
        if (arrayA.length > 1) {
            if (arrayB.length > 1)
                deci = (arrayA[1].length > arrayB[1].length) ? arrayA[1].length : arrayB[1].length;
            else
                deci = arrayA[1].length;
        }
        else {
            if (arrayB.length > 1)
                deci = arrayB[1].length;
            else
                deci = 0;
        }
        let c = Number(a) + Number(b);
        let expo = (Math.pow(10, deci))
        let result: number = parseFloat(((Math.round(c * expo) / expo).toFixed(e)));

        return result;
    } 

    /**
     * Permet de soustraire avec exactitude deux nombre (float ou entier)
     * @param a Nombre a de base
     * @param b Nombre a soustraire
     * @param e Nombre de décimal
     */
    public static exactMoins(a: number, b: number, e: number): number {
        let aS = String(a)
        let bS = String(b)
        let arrayA = aS.split('\.');
        let arrayB = bS.split('\.');
        let deci = 0;
        if (arrayA.length > 1) {
            if (arrayB.length > 1)
                deci = (arrayA[1].length > arrayB[1].length) ? arrayA[1].length : arrayB[1].length;
            else
                deci = arrayA[1].length;
        }
        else {
            if (arrayB.length > 1)
                deci = arrayB[1].length;
            else
                deci = 0;
        }
        let c = Number(a) - Number(b);
        let expo = (Math.pow(10, deci))
        let result: number = parseFloat(((Math.round(c * expo) / expo).toFixed(e)));

        return result;
    }

    public static isNumericDigit(n: string): boolean {
        if (n != null && n.length == 1) {
            switch (n) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    return true;
                default:
                    return false;
            }
        }
        return false;
    }

    /**
     * Renvoie true si la châine donnée est numérique.
     * This solution is used in / taken from Jquery library $.isNumeric(obj)
     * @param n
     */
    public static isNumeric(n:string): boolean
    {
        let val = parseInt(n);
        
        return !isNaN(parseFloat(n)) && isFinite(parseInt(n)) && val.toString() == n;

        // parseFloat NaNs numeric-cast false positives (null|true|false|"")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        // adding 1 corrects loss of precision from parseFloat (#15100)
     //   return  (n - parseFloat(n) + 1) >= 0;
    }
}