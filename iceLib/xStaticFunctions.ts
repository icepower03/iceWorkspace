
import { iXElement } from './V2/xBase';
import { addClass, removeClass } from './V2/xDomUtils';

export function cacherxElements(j: iXElement, collapse?: boolean) {
    if (collapse == undefined) { collapse = false; }
    if (j?.y != null) {
        if (collapse) {
            addClass("xdisabled", j);
        }
        else {

            addClass("xInvisible", j);
        }
    }
}


export function afficherxElements(j: iXElement) {
    if (j?.y != null) {
        removeClass("xdisabled xInvisible", j);
        
    }
}
export function viderxElements(j: iXElement) {
    if (j?.y != null) {
        while (j.y.hasChildNodes()) {
            j.y.removeChild(j.y.lastChild);
        }
    }
}

export function assignerObjet<T>(target: T, source: T): T {
    if (typeof ((<any>Object).assign) != 'function') {
        // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        let to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return <T>to;
    }
    else {
        return <T>(<any>Object).assign(target, source);
    }
}

export function GetDateTimeFromFrenchDateString(date: string): Date
///<summary>Convertit une date fr en date JS</summary>
{
    let dateRetour: Date = null;

    let jour: number = Number(date.substr(0, 2));
    let mois: number = Number(date.substr(3, 2)) - 1;//les mois commencent à zéro
    let annee: number = Number(date.substr(6));

    //pour certaines dates ( plutot vieilles: ex 10/10/1976) 
    //toLocaleDateString renvoie le 14/09 à 23:00
    //donc pour ces cas je suis obligé de modifier la date au test suivant)

    dateRetour = new Date(annee, mois, jour);

    if (dateRetour.toLocaleDateString() != date) {
        dateRetour = new Date(annee, mois, jour, 12);
    }

    return dateRetour;
}

export function xRequire(urlJson: string): any {


    let aj: JQueryXHR;
    aj = $.ajax({
        type: 'POST',
        url: urlJson,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        async: false
    });

    return aj.responseJSON.d;

}

