// @ts-nocheck
interface optionsXSeparateurAvecFleche
{
    class?: string;
    positionFleche: enumPosition;
    optionsxSeparateur: optionXSeparateur;
}

class iceSeparateurAvecFleche implements iXElement
{
   
    public get y() {
        return this.grid.y;
    }

    // --------- //
    // Attributs //
    private grid: ice2Grid;
    private option: optionsXSeparateurAvecFleche;

    // ------------ //
    // Constructeur //
    constructor(option: optionsXSeparateurAvecFleche)
    {
        let mythis: iceSeparateurAvecFleche = this;
        mythis.option = option;

        // Création des classes
        let classes: string = "iceSeparateurAvecFleche ";

        if (option.class)
            classes += option.class + " ";

        let colonnes: Array<string>;
        let lignes: Array<string>;

        let colStartFleche: number;
        let rowStartFleche: number;
        let colStartXSeparateur: number;
        let nbColXSeparateur: number;
        let rowStartXSeparateur: number;
        let nbRowXSeparateur: number;
        let classFleche: string = "flecheXSeparateur";
        let fullHeight: boolean = false;
        let fullWidth: boolean = false;

        if (option.positionFleche == enumPosition.Top || option.positionFleche == enumPosition.Bottom)
        {
            colonnes = ["1fr", "40px", "1fr"];
            lignes = ["10px", "auto", "10px"];
            colStartFleche = 2;
            colStartXSeparateur = 1;
            nbColXSeparateur = 3;
            rowStartXSeparateur = 2;
            nbRowXSeparateur = 1;
            fullWidth = true;
        }
        else
        {
            colonnes = ["10px", "auto", "10px"];
            lignes = ["1fr", "40px", "1fr"];
            rowStartFleche = 2;
            colStartXSeparateur = 2;
            nbColXSeparateur = 1;
            rowStartXSeparateur = 1;
            nbRowXSeparateur = 3;
            fullHeight = true;
        }
        switch (option.positionFleche)
        {
            case enumPosition.Top:
                rowStartFleche = 1;
                classFleche += " Haut";
                break;
            case enumPosition.Bottom:
                rowStartFleche = 3;
                classFleche += " Bas";
                break;
            case enumPosition.Left:
                colStartFleche = 1;
                classFleche += " Gauche";
                break;
            case enumPosition.Right:
                colStartFleche = 3;
                classFleche += " Droite";
                break;
        }

        // Création de l'element
        mythis.grid = new ice2Grid({
            class: classes,
            gridGap: "2px",
            lignes: lignes,
            colonnes: colonnes,            
            fullHeight: fullHeight,
            fullWidth: fullWidth,
        });

        mythis.grid.append([

            new ice2GridItem({
                colStart: colStartXSeparateur,
                rowStart: rowStartXSeparateur,
                nbCols: nbColXSeparateur,
                nbRows: nbRowXSeparateur,
                content: new iceSeparateur(option.optionsxSeparateur),
                class: "gi_xSeparateur"
            }),
            new ice2GridItem({
                colStart: colStartFleche,
                rowStart: rowStartFleche,
                content: new iceDiv({
                    class: classFleche
                })
            })

        ])

        

    }
}
