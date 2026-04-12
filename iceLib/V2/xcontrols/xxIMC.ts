// @ts-nocheck
import { iXElement } from '../xBase';
import { xLString } from '../xLString';
import { xxToolTip } from './xxToolTip';
import { xxLabel, enumTypeLabel } from './xxLabel';
import { xxWrapPanel } from './xxWrapPanel';
import { xxLabelContainer } from './xxLabelContainer';
import { xxGrid, xxGridItem } from './xxGrid';
import { enumIconeP12, IconeP12, tailleIcone, Icone } from '../xIcones';

interface OptionsIMC
{
    id?: string;
    class?: string;
    value: number;
    disabledTooltip?:boolean
}

export class xxIMC implements iXElement
{
    private tooltip: xxToolTip;
 
    public get y() { return this.tooltip.y; }   

    constructor(o: OptionsIMC)
    {
        
        let myThis: xxIMC = this;
        let lib = "";
        let cssLbl = "";
        if (o.value == 0 || o.value == null)
        {
            o.value = 0;
            lib = new xLString("Non renseigné").text;
            cssLbl = "nonrenseigne";
        }
        else if (o.value < 16.5)
        {
            lib = new xLString("Dénutrition").text;
            cssLbl = "denutrition";
            
        }
        else if (o.value < 18.5)
        {
            lib = new xLString("Maigreur").text;
            cssLbl = "maigreur";
        }
        else if (o.value < 24.9)
        {
            lib = new xLString("Poids normal").text;
            cssLbl = "normal";
        }
        else if (o.value < 29.9)
        {
            lib = new xLString("Surpoids").text;
            cssLbl = "surpoids";
        }
        else if (o.value < 34.9)
        {
            lib = new xLString("Obésité modérée").text;
            cssLbl = "moderee";
        }
        else if (o.value < 39.9)
        {
            lib = new xLString("Obésité sévère").text;
            cssLbl = "severe";
        }
        else if (40 <= o.value)
        {
            lib = new xLString("Obésité massive").text;
            cssLbl = "morbide";
            
        }
        let lbl = new xxLabelContainer({
            textVariable: (o.value == 0 || o.value == null) ? "-" : o.value.toString(),
            type : enumTypeLabel.important,
            initContent: new xxLabel({
                textVariable: lib,
            }),
            class: "xxIMC " + cssLbl,
            labelLargeurLibre: true,
            
        });

        let disableInfoBulle: boolean = false;

        if (o.disabledTooltip != null)
            disableInfoBulle = o.disabledTooltip;

        myThis.tooltip = new xxToolTip({
            initContent: lbl,
            toolTipContent: myThis.ToolTipContent(o.value.toString()),
            disabled: disableInfoBulle,
            class: "tooltipImc"
        })
    }

    private ToolTipContent(value: string): xxGrid
    {
        let grid = new xxGrid({
            gridGap: "1px",
            colonnes_auto: "15px 1fr",
            lignes_auto: "2fr 5fr 5fr 5fr 6.5fr 2fr 2fr",
            class: "gridIMC"
        });

        let icon = new IconeP12(enumIconeP12.fleche_noire_droite, {
            taille: tailleIcone.XS,
          
        });
        icon.addClass("flecheImc");
        let imc: number = +value;


        let gridItemFleche = new xxGridItem({
            colStart: 1,
            nbCols: 1,
            rowStart: 2,
            nbRows: 5,
            content: icon,
            class: "fleche"
        })
        if (imc == 0 || imc == null)
        {
            cacherxElements(gridItemFleche, true)
        }
        if (imc < 16.5)
        {
            gridItemFleche.changeRowsProperties(7, 1);
            gridItemFleche.addClass("sansPosition");
        }
        else if (imc < 40) {
            icon.y.style.bottom = (imc - 16.5) * 100 / 23.5 + "%";
        }

        else if (imc >= 40)
        {
            gridItemFleche.changeRowsProperties(1, 1);
            gridItemFleche.addClass("sansPosition");
        }


        let gridItemMassive = new xxGridItem({
            colStart: 2,
            nbCols: 1,
            rowStart: 1,
            nbRows: 1,
            content: new xxLabel({
                textLocalise: "Obésité massive/morbide (40 et +)",
            }),
            class : "morbide"
        });

        let gridItemSevere = new xxGridItem({
            colStart: 2,
            nbCols: 1,
            rowStart: 2,
            nbRows: 1,
            content: new xxLabel({
                textLocalise: "Obésité sévère (35 à 40)",
            }),
            class: "severe"
        });

        let gridItemModeree = new xxGridItem({
            colStart: 2,
            nbCols: 1,
            rowStart: 3,
            nbRows: 1,
            content: new xxLabel({
                textLocalise: "Obésité Modérée (30 à 35)",
            }),
            class: "moderee"
        });

        let gridItemSurpoids = new xxGridItem({
            colStart: 2,
            nbCols: 1,
            rowStart: 4,
            nbRows: 1,
            content: new xxLabel({
                textLocalise: "Surpoids (25 à 30)",
            }),
            class: "surpoids"
        });

        let gridItemNormal = new xxGridItem({
            colStart: 2,
            nbCols: 1,
            rowStart: 5,
            nbRows: 1,
            content: new xxLabel({
                textLocalise: "Poids normal (18.5 à 25)",
            }),
            class: "normal"
        });

        let gridItemMaigreur = new xxGridItem({
            colStart: 2,
            nbCols: 1,
            rowStart: 6,
            nbRows: 1,
            content: new xxLabel({
                textLocalise: "Maigreur (16.5  à 18.5)",
            }),
            class: "maigreur"
        });

        let gridItemDenutrition = new xxGridItem({
            colStart: 2,
            nbCols: 1,
            rowStart: 7,
            nbRows: 1,
            content: new xxLabel({
                textLocalise: "Dénutrition (- de 16.5)",
            }),
            class: "denutrition"
        });

        grid.append([gridItemFleche,gridItemMassive, gridItemSevere, gridItemModeree, gridItemSurpoids, gridItemNormal, gridItemMaigreur, gridItemDenutrition])

        return grid;
    }
}