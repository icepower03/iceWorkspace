import { iXElement } from '../iceBase';
import { iceTime } from '../iceTime';
import { ice2Grid, ice2GridItem } from './ice2Grid';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2Label } from './ice2Label';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';

interface optionTimePicker {
    value?: iceTime;
    valueChange?: (val: iceTime) => void;
    class?: string;
}

export class iceTimePicker implements iXElement {
    public gridPrincipal: ice2Grid;
    public wrapPrincipal: ice2WrapPanel;

    public gridHeure: ice2Grid;
    public gridMinute: ice2Grid;
    public listeGridItemHeure: ice2GridItem[];
    public listeGridItemMinute: ice2GridItem[];
    public value: iceTime;
    public valueChange: (val: iceTime) => void;
    public class: string;

    private isTimeInit: boolean;
    public width(parame?: string | number): void | number {
        let myThis: iceTimePicker = this;
        return myThis.wrapPrincipal.width(parame);
    }

    public height(parame?: string | number): void | number {
        let myThis: iceTimePicker = this;
        return myThis.wrapPrincipal.height(parame);
    }
    constructor(option: optionTimePicker) {
        let myThis: iceTimePicker = this;

        myThis.value = option.value;
        myThis.isTimeInit = true;
        myThis.valueChange = option.valueChange;
        myThis.class = "iceTimePicker"

        if (option.class != undefined)
            myThis.class += (" " + option.class);

        if (myThis.value == undefined) {
            myThis.value = new iceTime(0, 0);
            myThis.isTimeInit = false;
        }

        myThis.createTimePicker();
        
    }

    public createTimePicker() {
        let myThis: iceTimePicker = this;

        if (myThis.wrapPrincipal == undefined) {
            myThis.wrapPrincipal = new ice2WrapPanel({ class: myThis.class, espaceMinimaliste: true, retourALaLigne: true })

            myThis.gridHeure = new ice2Grid({
                gridGap: '1px',
                colonnes: ['repeat(6,1fr)'],
                class: "GridHeures"
            });

            myThis.gridMinute = new ice2Grid({
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

        let enteteHeure = new ice2GridItem({
            colStart: 1,
            rowStart: 1,
            nbRows: 1,
            nbCols: 6,
            class: "EnteteHeure",
            content: new ice2Label({
                textLocalise: "Heure",
            })
        })

        let enteteMinute = new ice2GridItem({
            colStart: 1,
            rowStart: 1,
            nbCols: 3,
            nbRows: 1,
            class: "EnteteMinute",
            content: new ice2Label({
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

            let gridItemHeure = new ice2GridItem({
                colStart: colHeureStart,
                rowStart: rowStart,
                class: classHeure,
                content: new ice2Bouton({
                    textVariable: i < 10 ? ("0" + i.toString()) : i.toString(),
                    titleLocalise: "Sélectionner cette heure",
                    optionsAffichage: { boutonArrondi: false, margin: {Tous:0}, padding: {Tous:0}, tailleBouton:enumTailleBouton.XS },
                    click: cb => {
                        myThis.value = new iceTime(i, myThis.value.Minutes);
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


            let gridItemMin = new ice2GridItem({
                colStart: colMinuteStart,
                rowStart: rowStart,
                class: classMinute,
                content: new ice2Bouton({
                    textVariable: i < 10 ? ("0" + i.toString()) : i.toString(),
                    titleLocalise: "sélectionner",
                    optionsAffichage: { boutonArrondi: false, margin: { Tous: 0 }, padding: { Tous: 0 }, tailleBouton: enumTailleBouton.XS },
                    click: cb => {
                        myThis.value = new iceTime(myThis.value.Heures, i);
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

    public setValue(time: iceTime) {
        let myThis: iceTimePicker = this;

        myThis.value = time;
        if (time != null)
            myThis.isTimeInit = true;
        else {
            myThis.isTimeInit = false;
            myThis.value = new iceTime(0,0);
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