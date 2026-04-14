// Pierre CHEVALIER                        - ISIMA
// Fichier etendant les methodes de l'objet date :
// Methode statique :
//  diffEntreDeuxDates()
// Methodes d'instance :
//  addSeconds()
//  addMinutes()
//  addHours()
//  addDays()
//  addWeeks()
//  addMonths()
//  addYears()

/**
 * Constantes
 */

var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];


/**
*  Surcharge des membres statiques de l'objet Date
*  Declaration
*/
interface DateConstructor {
    diffEntreDeuxDates(date1: Date, date2: Date): Date;
}

/**
*  Definition
*/

/**
*  Fonction permettant de calculer la difference entre deux dates revoyant un tableau au format [heure,minute,seconde]
*/
Date.diffEntreDeuxDates = function (date1: Date, date2: Date): Date {
    var result = [0, 0];
    var diff = date2.getTime() - date1.getTime();
    if (diff > 0) {
        result[0] = diff / 3600000;
        result[1] = (diff % 3600000) / 60000;
    }
    return new Date(0, 0, 0, result[0], result[1]);
}

/**
*  Surcharge des methodes de l'objet Date
*  Declaration
*/
interface Date {
    addSeconds(seconds: number): Date;
    addMinutes(minutes: number): Date;
    addHours(hours: number): Date;
    addDays(days: number): Date;
    addWeeks(weeks: number): Date;
    addMonths(months: number): Date;
    addYears(years: number): Date;

    totalSeconds(): number;
    totalMinutes(): number;
    totalHours(): number;
    format(format: 'mm/yy' | 'HH:mm' | 'dd/mm/yy' | 'yyyy-MM-ddTHH:mm:ss' | 'dd/MM/yyyy HH:mm'): string;

    getDayName(): string;
    getMonthName(): string;
    getWeekNumber(): number;

    toLocaleStringCS3I(): string; 
    toLocaleDateStringCS3I(): string;
    toLocalDateStringCompleteCS3I(): string;
    
}

/**
*  Definition
*/
Date.prototype.format = function (format: 'mm/yy' | 'HH:mm' | 'dd/mm/yy' | 'yyyy-MM-ddTHH:mm:ss' | 'dd/MM/yyyy HH:mm') {
    let my_this: Date = this;
    let retour:string = '';
    switch (format) {
        case 'mm/yy':
            retour = ("0" + (my_this.getMonth() + 1)).slice(-2) + '/' + + ("0" + (my_this.getFullYear() % 100)).slice(-2)
            break;
        case 'HH:mm':
            retour = ("0" + (my_this.getHours())).slice(-2) + '/' + ("0" + (my_this.getMinutes())).slice(-2);
            break;
        case 'dd/mm/yy':
            retour = ("0" + (my_this.getDate())).slice(-2) + '/' + ("0" + (my_this.getMonth() + 1)).slice(-2) + '/' + ("0"+ (my_this.getFullYear() % 100)).slice(-2);
            break;
    }
    return retour;
}
Date.prototype.toLocaleStringCS3I = function ()
{
    let my_this: Date = this;
    return my_this.toLocaleString().replace(/[^ -~]/g, '');
}

Date.prototype.toLocaleDateStringCS3I = function ()
{
    let my_this: Date = this;
    return my_this.toLocaleDateString().replace(/[^ -~]/g, '');
}

/**
*  Ajoute X secondes a la date
*/
Date.prototype.addSeconds = function (seconds) {
    this.setSeconds(this.getSeconds() + seconds);
    return this;
};

/**
*  Ajoute X minutes a la date
*/
Date.prototype.addMinutes = function (minutes) {
    this.setMinutes(this.getMinutes() + minutes);
    return this;
};

/**
*  Ajoute X heures a la date
*/
Date.prototype.addHours = function (hours) {
    this.setHours(this.getHours() + hours);
    return this;
};

/**
*  Ajoute X jours a la date
*/
Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
};

/**
*  Ajoute X semaines a la date
*/
Date.prototype.addWeeks = function (weeks) {
    this.addDays(weeks * 7);
    return this;
};

/**
*  Ajoute X mois a la date
*/
Date.prototype.addMonths = function (months) {
    var dt = this.getDate();

    this.setMonth(this.getMonth() + months);
    var currDt = this.getDate();

    if (dt !== currDt) {
        this.addDays(-currDt);
    }

    return this;
};

/**
*  Ajoute X annees a la date
*/
Date.prototype.addYears = function (years) {
    var dt = this.getDate();

    this.setFullYear(this.getFullYear() + years);

    var currDt = this.getDate();

    if (dt !== currDt) {
        this.addDays(-currDt);
    }

    return this;
};

/**
*  Convertie une date en string suivant le format passe en param
*
* The format can be combinations of the following:
* d  - day of month (no leading zero)
* dd - day of month (two digit)
* o  - day of year (no leading zeros)
* oo - day of year (three digit)
* D  - day name short
* DD - day name long
* m  - month of year (no leading zero)
* mm - month of year (two digit)
* M  - month name short
* MM - month name long
* y  - year (two digit)
* yy - year (four digit)
* @ - Unix timestamp (ms since 01/01/1970)
* ! - Windows ticks (100ns since 01/01/0001)
* "..." - literal text
* '' - single quote
*/
/*
Date.prototype.format = function (format) {
    return $.datepicker.formatDate(format, this);
};
*/
Date.prototype.getDayName = function () {
    return days[this.getDay()];
};

Date.prototype.getMonthName = function () {
    return months[this.getMonth()];
};

Date.prototype.getWeekNumber = function () {
    var d: Date = new Date(+this);
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart : Date = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);;
};

Date.prototype.totalMinutes = function () {
    var dt: Date = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0)
    return (this.getTime() - dt.getTime()) / 60000;
};

/*
Methodes non testees
Date.prototype.totalSeconds = function () {
    var dt: Date = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0)
    return (this.getTime() - dt.getTime()) / 1000;
};

Date.prototype.totalMinutes = function () {
    var dt: Date = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0)
    return (this.getTime() - dt.getTime()) / 60000;
};

Date.prototype.totalHours = function () {
    var dt: Date = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0)
    return (this.getTime() - dt.getTime()) / 3600000;
};
*/