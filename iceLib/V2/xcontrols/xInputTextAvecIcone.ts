// @ts-nocheck
import { iXElement, enumCouleur, enumCurseur } from '../xBase';
import { xxGrid, xxGridItem, enumAlignementContenu } from './xxGrid';
import { xInputText } from './xInput';
import { IconeSvg, tailleIcone, enumIconeSvg, Icone } from '../xIcones';
import { xxContainerEvent } from './xxContainerEvent';

interface OptionsInputTextAvecIcone extends OptionsInput
{
    icone: enumIconeSvg;
    positionIcone?: "Debut" | "Fin";
    couleurIcone?: enumCouleur;
    clicSurIcone?: (cb: () => void) => void;
    largeurEnPixels?: number;
}

export class xInputTextAvecIcone implements iXElement {

    private grid: xxGrid;
    private input: xInputText;
    private icone: IconeSvg;
    private couleurIcone: enumCouleur;
   
    get y() { return this.grid.y; }

    public constructor(options: OptionsInputTextAvecIcone)
    {
        let myThis: xInputTextAvecIcone = this;

        if (!options.positionIcone)
            options.positionIcone = "Fin";

        if (!options.couleurIcone)
            myThis.couleurIcone = enumCouleur.emed_grisfonce;
        else
            myThis.couleurIcone = options.couleurIcone;

        myThis.grid = new xxGrid({
            id: "xInputTextAvecIcone_grid",
            class: "xInputTextAvecIcone positionIcone" + options.positionIcone + " " + options.class,
            colonnes: ["min-content", "1fr", "min-content"],
            lignes: ["min-content", "1fr"],
            fullWidth: false,
            gridGap: "0"
        });

        let tailleIconePx: number;
        if (options.champLarge)
            tailleIconePx = 20;
        else
            tailleIconePx = 12;

        myThis.input = new xInputText(options);
        myThis.icone = new IconeSvg(options.icone, {
            taille: tailleIcone.Custom, heightCust: tailleIconePx, widthCust: tailleIconePx, couleurSvg: { couleurIconeComplete: myThis.couleurIcone }
        });

        if (options.largeurEnPixels != null && options.largeurEnPixels > 0)
        {
            myThis.grid.width(options.largeurEnPixels.toString() + "px");
            myThis.input.width(options.largeurEnPixels.toString() + "px");
        }

        myThis.grid.append([
            new xxGridItem({
                content: myThis.input,
                colStart: 1,
                nbCols: 3,
                rowStart: 1,
                nbRows: 2
            }),
            new xxGridItem({
                content: new xxContainerEvent({
                    initContent: myThis.icone,
                    onClick: options.clicSurIcone,
                    optionsAffichage: {
                        curseur: (!!options.clicSurIcone ? enumCurseur.clic : enumCurseur.defaut)
                    }
                }),
                colStart: (options.positionIcone == "Debut" ? 1 : 3),
                rowStart: 1,
                optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre, padding: { Tous: 4 } }
                })
        ]);

    }

    public setDisabled(disabled: boolean)
    {
        let myThis: xInputTextAvecIcone = this;
        myThis.input.setDisabled(disabled);

        if (disabled)
            myThis.icone.setCouleur(enumCouleur.emed_grisclair);
        else
            myThis.icone.setCouleur(myThis.couleurIcone);
    }

    public setValue(texte: string | number): void
    {
        let myThis: xInputTextAvecIcone = this;

        myThis.input.setValue(texte);
    }

    public setValueFireEvent(texte: string | number): void
    {
        let myThis: xInputTextAvecIcone = this;
        myThis.input.setValueFireEvent(texte);

    }

    public focus()
    {
        let myThis: xInputTextAvecIcone = this;
        myThis.input.focus();
    }

    public checkCondition(valeur: string): boolean
    {
        let myThis: xInputTextAvecIcone = this;

        return myThis.input.checkCondition(valeur);
    }

    public checkConditionValueChange(valeur: string): boolean
    {
        let myThis: xInputTextAvecIcone = this;

        return myThis.input.checkConditionValueChange(valeur);
    }

    public getValue(): string | number
    {
        let myThis: xInputTextAvecIcone = this;

        return myThis.input.getValue();
    }



    public setBlur(fn: () => void): xInputTextAvecIcone
    {

        let myThis: xInputTextAvecIcone = this;
        myThis.input.setBlur(fn);

        return myThis;
    }



    public addClass(classe: string): void
    {

        let myThis: xInputTextAvecIcone = this;
        myThis.grid.addClass(classe);
    }

    public removeClass(classe: string): void
    {

        let myThis: xInputTextAvecIcone = this;
        myThis.grid.removeClass(classe);
    }

    public width(parame?: string | number): void | number {
        let myThis: xInputTextAvecIcone = this;
        if (parame != undefined) {
            myThis.y.style.width = typeof parame === 'number' ? parame + 'px' : parame;
        } else {
            return myThis.y.offsetWidth;
        }
    }

    public height(parame?: string | number): void | number {
        let myThis: xInputTextAvecIcone = this;
        if (parame != undefined) {
            myThis.y.style.height = typeof parame === 'number' ? parame + 'px' : parame;
        } else {
            return myThis.y.offsetHeight;
        }
    }

}