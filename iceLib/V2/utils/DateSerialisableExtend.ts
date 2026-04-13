import './DateExtend';
import { iceLString } from '../iceLString';
import { iceTime } from '../iceTime';
class __DateSerialisable {
    // MaDateLong
    public MaDateLong: number = 0;
}
class __Dictionnaire {

}

export class DateSerialisable extends __DateSerialisable {
    /**
    * Permet de recuperer la date actuelle en DateSerialisable
    */
    public static getXTime(date: DateSerialisable): iceTime {
        let maDate: Date = DateSerialisable.getDate(date);

        return new iceTime(maDate.getHours(), maDate.getMinutes());
    }

    /**
    * Permet de recuperer la date actuelle en DateSerialisable
    */
    public static Now(): DateSerialisable {
        return DateSerialisable.Factory(new Date(Date.now()));
    }

    /**
    * Permet de recuperer la date actuelle en DateSerialisable sans les informations de temps (ex:23/02/1985 00:00:00)
    */
    public static NowWithoutTime(): DateSerialisable {
        return DateSerialisable.DateWithoutTime(DateSerialisable.Now());
    }

    public static DateWithoutTime(date: DateSerialisable): DateSerialisable {
        let maDate: Date = DateSerialisable.getDate(date);
        maDate.setHours(0, 0, 0, 0);

        return DateSerialisable.Factory(maDate);
    }

    public static Factory(inDate?: Date): DateSerialisable {

        let val: DateSerialisable = new DateSerialisable();
        DateSerialisable.setDate(val, inDate);
        return val;
    }

    public static getDate(d: DateSerialisable): Date {
        return this.getDateByLong(d.MaDateLong);
    }

    public static getDateByLong(d: number): Date {
        let failletemporelle: Date = new Date(1970, 0, 1);
        let ecartTemporel: number;

        let retour: Date = new Date(d + new Date(1970, 0, 1).valueOf());

        ecartTemporel = retour.getTimezoneOffset() - failletemporelle.getTimezoneOffset();

        retour = DateSerialisable.addMinutes(retour, ecartTemporel);
        return retour;

    }

    public static FactoryByLong(maDateSerialisableLong: number): DateSerialisable {
        return this.Factory(this.getDateByLong(maDateSerialisableLong));
    }

    public static FactoryByNumber(annees: number, mois: number, jours?: number, heures?: number, minutes?: number, secondes?: number, millisecondes?: number) {

        let dateCreer = null;

        if (jours == null)
            dateCreer = new Date(annees, mois);
        else {
            if (heures == null)
                dateCreer = new Date(annees, mois, jours);
            else {
                if (minutes == null)
                    dateCreer = new Date(annees, mois, jours, heures);
                else {
                    if (secondes == null)
                        dateCreer = new Date(annees, mois, jours, heures, minutes);
                    else {
                        if (millisecondes == null)
                            dateCreer = new Date(annees, mois, jours, heures, minutes, secondes);
                        else
                            dateCreer = new Date(annees, mois, jours, heures, minutes, secondes, millisecondes);
                    }
                }
            }
        } 

        let dateRetour = new DateSerialisable();
        DateSerialisable.setDate(dateRetour, dateCreer);

        return dateRetour
    }

    public static FactoryByFrenchDateString(maDateString: string): DateSerialisable {

        let dateCrea: Date = null

        let jour: number = Number(maDateString.substr(0, 2));
        let mois: number = Number(maDateString.substr(3, 2)) - 1;//les mois commencent à zéro
        let annee: number = Number(maDateString.substr(6, 4));

        let heures: number = Number(maDateString.substr(11, 2));
        let minutes: number = Number(maDateString.substr(14, 2));

        //pour certaines dates ( plutot vieilles: ex 10/10/1976)
        //toLocaleDateString renvoie le 14/09 à 23:00
        //donc pour ces cas je suis obligé de modifier la date au test suivant)

        if (heures == null)
            dateCrea = new Date(annee, mois, jour);
        else {
            if (minutes == null)
                dateCrea = new Date(annee, mois, jour, heures);
            else
                dateCrea = new Date(annee, mois, jour, heures, minutes);
        }

        let dateStringPourTest = (dateCrea.toLocaleDateString() + " " + dateCrea.toLocaleTimeString());

        if (maDateString.length == 16)
            dateStringPourTest = dateStringPourTest.substr(0, 16);

        if (dateStringPourTest != maDateString) {
            dateCrea = new Date(annee, mois, jour, 0);
        }

        let dateRetour = new DateSerialisable();
        DateSerialisable.setDate(dateRetour, dateCrea);

        return dateRetour

    }

    public static CopyDateSerialisable(dateSerialisable: DateSerialisable): DateSerialisable {
        return this.FactoryByLong(dateSerialisable.MaDateLong);
    }

    public static CopyDateSerialisableSansHeure(dateSerialisable: DateSerialisable): DateSerialisable {
        return this.setTimeDateSerialisable(this.FactoryByLong(dateSerialisable.MaDateLong), 0);
    }

    //cette methode s'applique lorsque l'on crée un dateserialisable depuis TS
    public static setDate(d: DateSerialisable, inDate: Date): void {
        if (inDate != undefined) {
            let failletemporelle: Date = new Date(1970, 0, 1);
            let ecartTemporel: number = inDate.getTimezoneOffset() - failletemporelle.getTimezoneOffset();

            d.MaDateLong = inDate.valueOf() - failletemporelle.valueOf() - ecartTemporel * 60 * 1000;
        }
    }

    public static setJourAnneeMois(date: DateSerialisable, annees: number, mois: number, jours: number) {
        let dateRecup = DateSerialisable.getDate(date);

        dateRecup.setFullYear(annees, mois, jours);

        return DateSerialisable.Factory(dateRecup);
    }

    public static setHeures(date: DateSerialisable, heures: number, minutes: number, secondes: number, milliseconde: number) {
        let dateRecup = DateSerialisable.getDate(date);

        dateRecup.setHours(heures, minutes, secondes, milliseconde)

        return DateSerialisable.Factory(dateRecup);
    }

    /**
    *  Ajoute X minutes a la date
    */
    public static addMinutes(date: Date, minutes: number): Date {
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    };

    /**
    *  Ajoute X minutes a la date
    */
    public static addMinutesDateSerialisable(date: DateSerialisable, minutes: number): DateSerialisable {
        let maDate: Date = DateSerialisable.getDate(date);
        let newDate: Date = this.addMinutes(maDate, minutes);

        return DateSerialisable.Factory(newDate);
    };

    /**
    *  Modifie l'heure d'une date pour lui transmettre l'heure calculée depuis minuit selon le nombre de minutes passé en paramètre.
    */
    public static setTimeDateSerialisable(date: DateSerialisable, totalMinutes: number): DateSerialisable {
        let maDate: Date = DateSerialisable.getDate(date);
        maDate.setHours(0);
        maDate.setMinutes(0);
        maDate.setSeconds(0);
        maDate.setMilliseconds(0);
        maDate.addMinutes(totalMinutes);

        return DateSerialisable.Factory(maDate);
    };

    /**
    *  Ajoute X heures a la date
    */
    public static addHoursDateSerialisable(date: DateSerialisable, hours: number): DateSerialisable {
        let maDate: Date = DateSerialisable.getDate(date);
        let newDate: Date = this.addHours(maDate, hours);

        return DateSerialisable.Factory(newDate);
    };


    /**
    *  Ajoute X heures a la date
    */
    public static addHours(date: Date, hours: number): Date {
        date.setHours(date.getHours() + hours);
        return date;
    };

    /**
    *  Ajoute X jours a la date
    */
    public static addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    };

    public static addDaysSerialisable(date: DateSerialisable, days: number): DateSerialisable {
        return DateSerialisable.Factory(DateSerialisable.getDate(date).addDays(days));
    }

    public static addMonthDateSerialisable(date: DateSerialisable, months: number): DateSerialisable {
        return DateSerialisable.Factory(DateSerialisable.getDate(date).addMonths(months));
    }

    public static addWeekDateSerialisable(date: DateSerialisable, weeks: number): DateSerialisable {
        return DateSerialisable.Factory(DateSerialisable.getDate(date).addWeeks(weeks));
    }

    /**
     * Retourne la date du dernier jour du mois d'une date.
     * @param date
     */
    public static getDernierJourMois(date: DateSerialisable): DateSerialisable {
        return DateSerialisable.Factory(
            new Date(
                DateSerialisable.getDate(date).getFullYear(),
                DateSerialisable.getDate(date).getMonth() + 1,
                0
            )
        );
    }

    /**
     * Retourne le premier
     * @param date
     */
    public static getPremierJourSemaine(date: DateSerialisable): DateSerialisable {
        let d: Date = this.getDate(date);
        let jour: number = d.getDay();
        let diff: number = d.getDate() - jour + (jour == 0 ? -6 : 1);
        d.setDate(diff);
        return DateSerialisable.Factory(
            new Date(d.getTime())
        );
    }

    /**
    *   Cette méthode permet de retourner une DateSerialisabe sous forme de string localisée sans les secondes.
    *   ex: 06/08/1999 à 11h25
    */
    public static tolocalStringWithoutSeconds(Date: DateSerialisable, AvecTiret: boolean = true): string {
        if (Date === undefined || Date == null)
            return "";

        let laDate: Date = DateSerialisable.getDate(Date);
        let Datestring: string = laDate.toLocaleDateString();

        let minute: number = laDate.getMinutes();
        let heure: number = laDate.getHours();
        let timestring: string = (heure < 10 ? "0" + heure : heure) + ":" + (minute < 10 ? "0" + minute.toString() : minute.toString());
        if (AvecTiret == true)
            return new iceLString("{0} - {1}").format([Datestring, timestring]);
        else
            return new iceLString("{0} {1}").format([Datestring, timestring]);
    }
    /**
   *   Cette méthode permet de retourner une DateSerialisabe sous forme de string localisée sans les secondes.
   *   ex: 06/08/1999 à 11h25
   */
    public static tolocalStringMoisAnnee(Date: DateSerialisable): string {
        if (Date === undefined || Date == null)
            return "";

        let laDate: Date = DateSerialisable.getDate(Date);
        let Datestring: string = laDate.toLocaleDateString();
        let dateTab = Datestring.split("/");
     
        return dateTab[1] + "/" + dateTab[2];
    }
    /**
    *   Cette méthode permet de retourner l'heure et les minutes d'un date serialisable passée en paramètres ex: 15h57
    */
    ///
    public static tolocalstringHeureMinute(Date: DateSerialisable): string {
        if (Date === undefined || Date == null)
            return "";
        let laDate = DateSerialisable.getDate(Date);
        let heure: number = laDate.getHours();
        let minute: number = laDate.getMinutes();
        let timestring: string = (heure < 10 ? "0" + heure : heure) + "h" + (minute < 10 ? "0" + minute.toString() : minute.toString());
        let HeuresMinutes: string = new iceLString("{0}").format([timestring]);
        return HeuresMinutes;
    }

    /**
    * renvoie une date au format complet (ex: jeudi 23 février 2020)
    */
    public static toLocalDateStringComplete(Date: DateSerialisable): string {
        let laDate = DateSerialisable.getDate(Date);
        return laDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }


    /**
    *   Cette méthode permet de retourner une DateSerialisabe sous forme de string localisée sans heures/minutes/secondes , seulement la date
    *   ex: 06/08/1999
    */
    public static tolocalStringOnlyDate(Date: DateSerialisable): string {
        if (Date === undefined || Date == null)
            return "";
        let laDate: Date = DateSerialisable.getDate(Date);
        return laDate.toLocaleDateString();
    }

    public static ToStringDateHeure(d: DateSerialisable): string {
        if (d != undefined) {
            let maDate: Date = DateSerialisable.getDate(d);
            return maDate.toLocaleDateString() + " " + maDate.toLocaleTimeString();

        }
        return "";
    }

    /**
    *   Cette méthode permet de retourner une DateSerialisabe sous forme de string norme ISO 8601 -> YYYYMMDD_HHMMSS
    *   ex: 19990806_115025 = 06/08/1999 11:50:25
    */
    public static ToStringForNameFile(d: DateSerialisable): string
    {
        if (d != undefined)
        {
            let toSender: string = "" + DateSerialisable.getAnnees(d);

            if (DateSerialisable.getMois(d)+1 < 10)
                toSender += "0";
            toSender += (DateSerialisable.getMois(d)+1);


            if (DateSerialisable.getJours(d) < 10)
                toSender += "0";
            toSender += DateSerialisable.getJours(d) + "_";


            if (DateSerialisable.getHeures(d) < 10)
                toSender += "0";
            toSender += DateSerialisable.getHeures(d);


            if (DateSerialisable.getMinutes(d) < 10)
                toSender += "0";
            toSender += DateSerialisable.getMinutes(d);


            if (DateSerialisable.getSecondes(d) < 10)
                toSender += "0";
            toSender += DateSerialisable.getSecondes(d);


            return toSender;

        }
        return "";
    }


    /**
     * Cette méthode permet de retourner un Dictionnaire représentant la différence entre deux DateSerialisable.
     * Liste des clés :
     * -anne
     * -mois
     * -jour
     * -heure
     * -minute
     * -seconde
     */
    public static DateDiff(Date1: DateSerialisable, Date2: DateSerialisable, withTime: boolean = true): { seconde?: number, minute?: number, heure?: number, jour?: number, mois?: number, annee?: number } {
        let toSender: { seconde?: number, minute?: number, heure?: number, jour?: number, mois?: number, annee?: number } = {};

        let Valeur: number = Math.abs(DateSerialisable.DateDiffValue(Date1, Date2, withTime));

        // Temps en Seconde
        Valeur /= 1000
        toSender.seconde = Math.floor(Valeur);

        // Temps en Minute
        Valeur /= 60;
        toSender.minute = Math.floor(Valeur);

        // Temps en Heure
        Valeur /= 60;
        toSender.heure = Math.floor(Valeur);

        // Temps en jour
        Valeur /= 24;
        toSender.jour = Math.floor(Valeur);

        // Temps en mois
        Valeur /= 30;
        toSender.mois = Math.floor(Valeur);

        // Temps en année
        Valeur /= 12;
        toSender.annee = Math.floor(Valeur);

        return toSender;
    }

    public static DateDiffTheoriqueSansHeureMinute(Date1: DateSerialisable, Date2: DateSerialisable): { seconde?: number, minute?: number, heure?: number, jour?: number, mois?: number, annee?: number } {
        let toSender: { seconde?: number, minute?: number, heure?: number, jour?: number, mois?: number, annee?: number } = {};

        let Valeur: number = Math.abs(DateSerialisable.DateDiffValueTheoriqueSansHeureMinute(Date1, Date2));

        // Temps en Seconde
        Valeur /= 1000
        toSender.seconde = Math.floor(Valeur);

        // Temps en Minute
        Valeur /= 60;
        toSender.minute = Math.floor(Valeur);

        // Temps en Heure
        Valeur /= 60;
        toSender.heure = Math.floor(Valeur);

        // Temps en jour
        Valeur /= 24;
        toSender.jour = Math.floor(Valeur);

        // Temps en mois
        Valeur /= 30;
        toSender.mois = Math.floor(Valeur);

        // Temps en année
        Valeur /= 12;
        toSender.annee = Math.floor(Valeur);

        return toSender;
    }

    //retourne la différence en ms
    //Date1 - Date2
    //retourne le  temps réellement écoulé entre 2 dates (en tenant compte des changemetns d'heure)
    public static DateDiffValue(Date1: DateSerialisable, Date2: DateSerialisable, withTime: boolean = true): number {
        let Valeur: number

        if (withTime)
            Valeur = DateSerialisable.getDate(Date1).getTime() - DateSerialisable.getDate(Date2).getTime();
        else {
            let date1SinceTime = new Date(DateSerialisable.getDate(Date1).getFullYear(), DateSerialisable.getDate(Date1).getMonth(), DateSerialisable.getDate(Date1).getDate());
            let date2SinceTime = new Date(DateSerialisable.getDate(Date2).getFullYear(), DateSerialisable.getDate(Date2).getMonth(), DateSerialisable.getDate(Date2).getDate());
            Valeur = date1SinceTime.getTime() - date2SinceTime.getTime();

        }

        return Valeur;
    }

    //retourne la diff entre 2 dates (uniquement jour sans heure/minute, sans tenir compte des changemtns d'heure)
    public static DateDiffValueTheoriqueSansHeureMinute(Date1: DateSerialisable, Date2: DateSerialisable): number {
        let Valeur: number
        let date1 = DateSerialisable.getDate(Date1);
        let date2 = DateSerialisable.getDate(Date2);

        let ecart = date1.getTimezoneOffset() - date2.getTimezoneOffset();

        let date1SinceTime = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        let date2SinceTime = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        Valeur = date1SinceTime.getTime() - date2SinceTime.getTime();


        return Valeur - ecart * 60 * 1000;
    }


    /**
    *   Cette méthode permet d'avoir la différence en minutes entre 2 dates
    *   Date1 - Date2
    */
    public static getDifferenceEnMinutes(date1: DateSerialisable, date2: DateSerialisable) {
        return DateSerialisable.DateDiffValue(date1, date2, true) / 60000
    }
    /**
    *   Cette méthode permet de Comparer deux DateSerialisable , si une DateSerialisable est null, elle sera considérée comme plus petite
    *   1 => Date1 > Date2
    *   0 => Date1 = Date2
    *   -1 => Date1 < Date2
    */
    public static CompareDate(Date1: DateSerialisable, Date2: DateSerialisable): number {
        if (Date1 == null && Date2 == null)
            return 0;
        if (Date1 == null)
            return -1;
        if (Date2 == null)
            return 1;

        let toSender: number = 0;
        if (Date1.MaDateLong > Date2.MaDateLong)
            toSender = 1;
        else if (Date1.MaDateLong < Date2.MaDateLong)
            toSender = -1

        return toSender;
    }


    public static getWeekByDate(dateJ: Date): number
    {
        return dateJ.getWeekNumber();
    }

    public static getWeek(date: DateSerialisable): number {
        return DateSerialisable.getWeekByDate(DateSerialisable.getDate(date));
    }

    public static getPremierJourDuMois(date: DateSerialisable): DateSerialisable {

        return DateSerialisable.Factory(
            new Date(
                DateSerialisable.getDate(date).getFullYear(),
                DateSerialisable.getDate(date).getMonth(),
                1
            )
        )
    }

    public static calculDateFromIntervalleAndDaysToCount(dateDeb: DateSerialisable, jourACompter: string, intervalle: number): DateSerialisable {

        let days: number[] = [];

        //on met dans l'ordre javascript dimanche -> samedi
        if (jourACompter.charAt(6) == "1") { // cas dimanche
            days.push(1);
        }
        else {
            days.push(0);
        }
        for (let x = 0; x < 6; x++) { // lundi au samedi
            if (jourACompter.charAt(x) == "1") {
                days.push(1);
            }
            else {
                days.push(0);
            }
        }

        let i = 1;
        let fin: Date = DateSerialisable.getDate(dateDeb);
        if (days[fin.getDay()] == 0) { // cas sam/dim
            i = 0;
        }

        while (i < intervalle) {
            fin = fin.addDays(1);

            if (days[fin.getDay()] == 1) {
                i++
            }

        }

        return DateSerialisable.Factory(fin);


    }

    /**
     * cette fonction retourne un numero correspondant au jour de la semaine suivant l'ordre suivant:
     *  lundi = 1... dimanche = 7
     * @param date
     * @returns
     */
    public static getIndexJourSemaine(date: DateSerialisable): number {
        let indexJour = DateSerialisable.getDate(date).getDay();
        if (indexJour == 0)
            indexJour = 7;

        return indexJour;
    }

    public static getHeures(date: DateSerialisable) {
        return DateSerialisable.getDate(date).getHours();
    }

    public static getMinutes(date: DateSerialisable) {
        return DateSerialisable.getDate(date).getMinutes();
    }

    public static getMois(date: DateSerialisable) {
        return DateSerialisable.getDate(date).getMonth();
    }

    public static getAnnees(date: DateSerialisable) {
        return DateSerialisable.getDate(date).getFullYear();
    }

    public static getJours(date: DateSerialisable) {
        return DateSerialisable.getDate(date).getDate();
    }

    public static getSecondes(date: DateSerialisable) {
        return DateSerialisable.getDate(date).getSeconds();
    }

    public static getNomMois(date: DateSerialisable) {
        return DateSerialisable.getDate(date).getMonthName();
    }

    public static getUTCDate(date: DateSerialisable) {
        return DateSerialisable.getDate(date).getUTCDate();
    }

    public static getUTCMois(date: DateSerialisable) {
        return DateSerialisable.getDate(date).getUTCMonth();
    }

    public static getUTCAnnees(date: DateSerialisable) {
        return DateSerialisable.getDate(date).getUTCFullYear();
    }





    /* donne la date du dimanche de paques */
    private static getDatePaques(year: number): DateSerialisable {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;

        let retour = new Date(year, month - 1, day);
        return DateSerialisable.Factory(retour);
       
}

    public static getJoursFeries(year: number): DateSerialisable[] {
        let retour: DateSerialisable[] = [];
        retour.push(DateSerialisable.FactoryByNumber(year, 0, 1));
        retour.push(DateSerialisable.FactoryByNumber(year, 4, 1));
        retour.push(DateSerialisable.FactoryByNumber(year, 4, 8));
        retour.push(DateSerialisable.FactoryByNumber(year, 6, 14));
        retour.push(DateSerialisable.FactoryByNumber(year, 7, 15));
        retour.push(DateSerialisable.FactoryByNumber(year, 10, 1));
        retour.push(DateSerialisable.FactoryByNumber(year, 10, 11));
        retour.push(DateSerialisable.FactoryByNumber(year, 11, 25));

        const easterDate = DateSerialisable.getDatePaques(year);
        retour.push(DateSerialisable.addDaysSerialisable(easterDate, 1));
        retour.push(DateSerialisable.addDaysSerialisable(easterDate, 39));
        retour.push(DateSerialisable.addDaysSerialisable(easterDate, 50));
        return retour;
}




}

if (typeof globalThis !== "undefined") {
    (globalThis as any).DateSerialisable = DateSerialisable;
}
