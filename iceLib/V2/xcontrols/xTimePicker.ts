// @ts-nocheck
import { iXElement } from '../xBase';
import { xTime } from '../xTime';
import { xxGrid, xxGridItem } from './xxGrid';
import { xxWrapPanel } from './xxWrapPanel';
import { xxLabel } from './xxLabel';
import { xxBouton, enumTailleBouton } from './xxBouton';

interface optionTimePicker {
    value?: xTime;
    valueChange?: (val: xTime) => void;
    class?: string;
}

export class xTimePicker implements iXElement {
    public gridPrincipal: xxGrid;
    public wrapPrincipal: xxWrapPanel;

    public gridHeure: xxGrid;
    public gridMinute: xxGrid;
    public listeGridItemHeure: xxGridItem[];
    public listeGridItemMinute: xxGridItem[];
    public value: xTime;
    public valueChange: (val: xTime) => void;
    public class: string;

    private isTimeInit: boolean;
    public width(parame?: string | number): void | number {
        let myThis: xTimePicker = this;
        return myThis.wrapPrincipal.width(parame);
    }

    public height(parame?: string | number): void | number {
        let myThis: xTimePicker = this;
        return myThis.wrapPrincipal.height(parame);
    }
    constructor(option: optionTimePicker) {
        let myThis: xTimePicker = this;

        myThis.value = option.value;
        myThis.isTimeInit = true;
        myThis.valueChange = option.valueChange;
        myThis.class = "xTimePicker"

        if (option.class != undefined)
            myThis.class += (" " + option.class);

        if (myThis.value == undefined) {
            myThis.value = new xTime(0, 0);
            myThis.isTimeInit = false;
        }

        myThis.createTimePicker();
        
    }

    public createTimePicker() {
        let myThis: xTimePicker = this;

        if (myThis.wrapPrincipal == undefined) {
            myThis.wrapPrincipal = new xxWrapPanel({ class: myThis.class, espaceMinimaliste: true, retourALaLigne: true })

            myThis.gridHeure = new xxGrid({
                gridGap: '1px',
                colonnes: ['repeat(6,1fr)'],
                class: "GridHeures"
            });

            myThis.gridMinute = new xxGrid({
                gridGap: '1px',
                colonnes: ['repeat(3,1fr)'],
                class: "GridMinutes"
            });

            myThis.wrapPrincipal.append(myThis.gridHeure).append(myThis.gridMinute)

        } else {

            myThis.gridHeure.vider();
            myThis.gridMinute.vider();
        }


        myThis.listeGridItemHeure = [];
        myThis.listeGridItemMinute = [];

        let enteteHeure = new xxGridItem({
            colStart: 1,
            rowStart: 1,
            nbRows: 1,
            nbCols: 6,
            class: "EnteteHeure",
            content: new xxLabel({
                textLocalise: "Heure",
            })
        })

        let enteteMinute = new xxGridItem({
            colStart: 1,
            rowStart: 1,
            nbCols: 3,
            nbRows: 1,
            class: "EnteteMinute",
            content: new xxLabel({
                textLocalise: "Minutes",
            })
        })

        myThis.gridHeure.append([enteteHeure]);
        myThis.gridMinute.append([enteteMinute]);


        let colHeureStart = 1;

        for (let i: number = 0; i < 24; i++) {

            let rowStart = 2;
            if (i > 5 && i < 12)
                rowStart = 3;
            else if (i > 11 && i < 18)
                rowStart = 4;
            else if (i > 17)
                rowStart = 5;

            let classHeure = "heureTimePicker";
            if (myThis.value.Heures == i && myThis.isTimeInit)
                classHeure += " Selected";

            let gridItemHeure = new xxGridItem({
                colStart: colHeureStart,
                rowStart: rowStart,
                class: classHeure,
                content: new xxBouton({
                    textVariable: i < 10 ? ("0" + i.toString()) : i.toString(),
                    titleLocalise: "Sélectionner cette heure",
                    optionsAffichage: { boutonArrondi: false, margin: {Tous:0}, padding: {Tous:0}, tailleBouton:enumTailleBouton.XS },
                    click: cb => {
                        myThis.value = new xTime(i, myThis.value.Minutes);
                        myThis.listeGridItemHeure.forEach(item => {
                            item.removeClass("Selected");
                        })
                        gridItemHeure.addClass("Selected");
                        if (myThis.valueChange != undefined)
                            myThis.valueChange(myThis.value);
                        cb();
                    }
                })
            })

            myThis.listeGridItemHeure.push(gridItemHeure);

            if (colHeureStart == 6)
                colHeureStart = 0;
            colHeureStart++;
        }

        myThis.gridHeure.append(myThis.listeGridItemHeure);

        let colMinuteStart = 1;

        for (let i = 0; i < 60; i = i + 5) {
            let rowStart = 2;

            if (i > 14 && i < 26)
                rowStart = 3;
            else if (i > 29 && i < 41)
                rowStart = 4;
            else if (i > 44 && i < 56)
                rowStart = 5

            let classMinute = "minuteTimePicker";

            if (myThis.value.Minutes == i && myThis.isTimeInit)
                classMinute += " Selected";


            let gridItemMin = new xxGridItem({
                colStart: colMinuteStart,
                rowStart: rowStart,
                class: classMinute,
                content: new xxBouton({
                    textVariable: i < 10 ? ("0" + i.toString()) : i.toString(),
                    titleLocalise: "sélectionner",
                    optionsAffichage: { boutonArrondi: false, margin: { Tous: 0 }, padding: { Tous: 0 }, tailleBouton: enumTailleBouton.XS },
                    click: cb => {
                        myThis.value = new xTime(myThis.value.Heures, i);
                        myThis.listeGridItemMinute.forEach(item => {
                            item.removeClass("Selected");
                        })
                        gridItemMin.addClass('Selected');
                        if (myThis.valueChange != undefined)
                            myThis.valueChange(myThis.value);
                        cb();
                    }
                })
            })
            myThis.listeGridItemMinute.push(gridItemMin);

            if (colMinuteStart == 3)
                colMinuteStart = 0;
            colMinuteStart++;
        }

        myThis.gridMinute.append(myThis.listeGridItemMinute);
    }

    public setValue(time: xTime) {
        let myThis: xTimePicker = this;

        myThis.value = time;
        if (time != null)
            myThis.isTimeInit = true;
        else {
            myThis.isTimeInit = false;
            myThis.value = new xTime(0,0);
        }
            
        myThis.createTimePicker()
    }

   
    get y() {
        return this.wrapPrincipal.y;
    }

    public addClass(s: string) {
        return this.wrapPrincipal.addClass(s);
    }

}