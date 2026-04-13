// @ts-nocheck
import { iXElement, enumTypeOrientation } from '../iceBase';
import { iceDiv } from './iceDiv';

export enum enumEpaisseurSeparation{
    fin = "xsep-epais_f",
    large = "xsep-epais_l"
}

interface optionXSeparateur
{
    class?: string;
    orientation: enumTypeOrientation;
    margin?: OptionsCotesCSS;
    epaisseur?: enumEpaisseurSeparation;
    tailleCustom?: number;
}

export class iceSeparateur implements iXElement
{
   
    public get y() {
        return this.separateur.y;
    }
    // --------- //
    // Constante //
    private readonly MARGIN_DEFAULT: number = 10;

    // --------- //
    // Attributs //
    private separateur: iceDiv;
    private option: optionXSeparateur;

    // ------------ //
    // Constructeur //
    constructor(option: optionXSeparateur)
    {
        let mythis: iceSeparateur = this;
        mythis.option = option;

        // Création des classes
        let classes: string = "iceSeparateur ";

        if (option.class)
            classes += option.class+" ";
        
        if (option.orientation == null)
            option.orientation = enumTypeOrientation.vertical;
        classes += option.orientation + " ";

        if (option.epaisseur == null)
            option.epaisseur = enumEpaisseurSeparation.fin;
        classes += option.epaisseur + " ";

        // Création de l'element
        mythis.separateur = new iceDiv({
            class : classes
        });

        // Margin
        mythis.setMargin();

        // Taille
        if (option.tailleCustom != null)
            if (option.orientation == enumTypeOrientation.vertical)
                mythis.separateur.asHolder.y.style.height= option.tailleCustom + "px";
            else
                mythis.separateur.asHolder.y.style.width= option.tailleCustom + "px";
    }

    private setMargin()
    {
        let mythis: iceSeparateur = this; 
        let optionMargin: OptionsCotesCSS = mythis.option.margin;
        let marginParam: string = "";

        if (optionMargin != null && optionMargin.Tous != null)
        {
            if (mythis.option.orientation == enumTypeOrientation.vertical)    
                // Right/Left
                marginParam = "0px " + optionMargin.Tous + "px";
            else// Top/Bottom
                marginParam = optionMargin.Tous + "px 0px";
        }
        else if (optionMargin !== undefined && mythis.isOptionMarginFour(optionMargin))
        {

            // Top
            marginParam = (optionMargin.Haut !== undefined ? optionMargin.Haut : mythis.getValueMarginDefault(enumTypeOrientation.vertical)) + "px ";

            // Right
            marginParam += (optionMargin.Droite !== undefined ? optionMargin.Droite : mythis.getValueMarginDefault(enumTypeOrientation.horizontal)) + "px ";

            // Bottom
            marginParam += (optionMargin.Bas !== undefined ? optionMargin.Bas : mythis.getValueMarginDefault(enumTypeOrientation.vertical)) + "px ";

            // Left
            marginParam += (optionMargin.Gauche !== undefined ? optionMargin.Gauche : mythis.getValueMarginDefault(enumTypeOrientation.horizontal)) + "px ";
        }
        else if (optionMargin !== undefined && mythis.isOptionMarginTwo(optionMargin))
        {
            // Top/Bottom
            marginParam = (optionMargin.HautEtBas !== undefined ? optionMargin.HautEtBas : mythis.getValueMarginDefault(enumTypeOrientation.vertical)) + "px ";

            // Right/Left
            marginParam += (optionMargin.GaucheEtDroite !== undefined ? optionMargin.GaucheEtDroite : mythis.getValueMarginDefault(enumTypeOrientation.horizontal)) + "px ";
        }
        else
        {
            // Top/Bottom
            marginParam =  mythis.getValueMarginDefault(enumTypeOrientation.vertical) + "px ";

            // Right/Left
            marginParam += mythis.getValueMarginDefault(enumTypeOrientation.horizontal) + "px ";
        }

        mythis.separateur.asHolder.y.style.margin= marginParam ;
    }

    private isOptionMarginFour(optionMargin: OptionsCotesCSS): boolean
    {
        let optionTemps: OptionsCotesCSS = optionMargin;
        return optionTemps.Bas !== undefined || optionTemps.Gauche !== undefined || optionTemps.Droite !== undefined || optionTemps.Haut !== undefined;
    }

    private isOptionMarginTwo(optionMargin: OptionsCotesCSS): boolean
    {
        let optionTemps: OptionsCotesCSS = optionMargin;
        return optionTemps.HautEtBas !== undefined || optionTemps.GaucheEtDroite !== undefined;
    }

    // recuperer la valeur par default par rapport a l'orientation du composent et l'orientation du margin
    private getValueMarginDefault(orientationDuMargin: enumTypeOrientation): number
    {
        let mythis: iceSeparateur = this;
        let toSender: number = 0;

        if ((orientationDuMargin == enumTypeOrientation.horizontal && mythis.option.orientation == enumTypeOrientation.vertical) ||
            (orientationDuMargin == enumTypeOrientation.vertical && mythis.option.orientation == enumTypeOrientation.horizontal))
        {
            toSender = mythis.MARGIN_DEFAULT;
        }

        return toSender
    }
}