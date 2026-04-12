import { iXElement, optionsAffichage } from '../xBase';
import { enumIconeP12, enumIconeAction, Icone, IconeV2, IconeSvg, IconeP12, tailleIcone } from '../xIcones';
import { xxGrid, xxGridItem } from './xxGrid';

export enum enumPositionIconeAction {HautDroite, BasDroite}

export interface OptionsIconeAvecAction
{
    iconePrincipale: IconeV2 | IconeSvg;
    iconeSecondaire: enumIconeAction;
    positionIconeAction?: enumPositionIconeAction,
    tailleIcone?: tailleIcone;
    heightCust?: number;
    widthCust?: number;
    optionsAffichage?: optionsAffichage;
}

export class xIconeAvecAction implements iXElement
{
    private grid: any;
    private iconePrincipale: IconeV2 | IconeSvg;
    private iconeSecondaire: IconeP12;


    constructor(options: OptionsIconeAvecAction)
    {

        let myThis: xIconeAvecAction = this;

        if (!options.tailleIcone) { options.tailleIcone = tailleIcone.M; }
        if (options.positionIconeAction == undefined) { options.positionIconeAction = enumPositionIconeAction.BasDroite; }

        let classeTaille: string = " taille_" + tailleIcone[options.tailleIcone];
        let classePosition: string = " positionIconeAction_" + enumPositionIconeAction[options.positionIconeAction];

        myThis.grid = new xxGrid({
            class: "xIconeAvecAction" + classePosition + classeTaille,
            colonnes: ["12fr 7fr 5fr"],
            lignes: ["5fr 7fr 7fr 5fr"],
            gridGap: "0",
            fullWidth: false,
            fullHeight: false,
        });

        myThis.iconePrincipale = options.iconePrincipale;
        myThis.iconeSecondaire = new IconeP12(options.iconeSecondaire);

        myThis.grid.append([
            new xxGridItem({
                content: myThis.iconePrincipale,
                colStart: 1,
                nbCols: 2,
                rowStart: options.positionIconeAction == enumPositionIconeAction.BasDroite ? 1 : 2,
                nbRows: 3,
                class: "gi_xIconeAvecAction iconePrincipale",
            }),
            new xxGridItem({
                content: myThis.iconeSecondaire,
                colStart: 2,
                nbCols: 2,
                rowStart: options.positionIconeAction == enumPositionIconeAction.BasDroite ? 3 : 1,
                nbRows: 2,
                class : "gi_xIconeAvecAction iconeSecondaire",
            }),
        ]);
    }

    public addClass(s: string) {
        return this.grid.addClass(s);
    }
    public removeClass(s: string) {
        return this.grid.removeClass(s);
    }

    public getClasse(): string
    {
        let myThis = this;
        return myThis.getClasse();
    }
    getTypeIcone(): string
    {
        return null;
    }
    getValeurIcone(): Icone
    {
        let myThis = this;

        return myThis.iconePrincipale;
    }

    get y(): HTMLElement {
        let myThis: xIconeAvecAction = this;
        return myThis.grid.y;
    }
}

