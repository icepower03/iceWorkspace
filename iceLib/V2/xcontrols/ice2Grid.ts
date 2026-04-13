// @ts-nocheck
import { ObservableCollection } from './ObservableCollection';
import { iceDiv } from './iceDiv';
import { iceStyle } from './iceStyle';
import { iceMaths } from '../iceMaths';

export enum enumAlignementContenu { HautGauche, HautCentre, HautDroite, CentreGauche, CentreCentre, CentreDroite, BasGauche, BasCentre, BasDroite }

interface optionsAffichageGrid extends optionsAffichage
{
    alignementContenu?: enumAlignementContenu;
}


interface OptionsGrid
{
    id?: string;
    class?: string;
    colonnes?: string[];
    colonnes_auto?: string;
    lignes?: string[];
    lignes_auto?: string;
    fullWidth?: boolean;
    fullHeight?: boolean;
    initMatrix?: iXElement[][];
    gridGap?: string;
    padding?: boolean;
    optionsAffichage?: optionsAffichageGrid;
    
    drag?: {
        
        dragKey: () => string;
    }
}

export interface OptionsGridItem {
    content: iXElement;
    rowStart: number;
    colStart: number;
    nbRows?: number;
    nbCols?: number;
    class?: string;
    id?: string;
    optionsAffichage?: optionsAffichageGrid;

}

interface OptionsGridItemCssOnly
{
    content: iXElement;
    class?: string;
    id?: string;
    cssOnly: true;
    optionsAffichage?: optionsAffichageGrid;

}



export class ice2GridItem implements iXElement {

    private elementPrincipalItem: iceDiv;
    content: iXElement;
    rowStart: number;
    colStart: number;
    nbRows: number;
    nbCols: number;
    class?: string;
    cssOnly: boolean = false;// dans ce cas on ne force pas l'affichage des éléments, c'est le css qui va les placer dans les colonnnes / lignes
    id?: string;
    alignementContenu?: enumAlignementContenu;
    optionsAffichage?: optionsAffichageGrid;

    private isGridCssOnly(obj: OptionsGridItem | OptionsGridItemCssOnly): obj is OptionsGridItemCssOnly {
        return (<OptionsGridItemCssOnly>obj)?.cssOnly !== undefined;
    }

    public width(parame?: string): void | number {
        let myThis: ice2GridItem = this;
        return myThis.elementPrincipalItem.width(parame);
    }

    public height(parame?: string): void | number {
        let myThis: ice2GridItem = this;
        return myThis.elementPrincipalItem.height(parame);
    }
    addClass(strClasses: string):ice2GridItem {
        let myThis: ice2GridItem = this;
        myThis.elementPrincipalItem.addClass(strClasses);
        
        return myThis;
    }
    removeClass(strClasses: string):ice2GridItem {
        let myThis: ice2GridItem = this;
        myThis.elementPrincipalItem.removeClass(strClasses);

        return myThis;
    }

    constructor(o: OptionsGridItem | OptionsGridItemCssOnly) {
        let myThis: ice2GridItem = this;
        myThis.class = o.class?? "";
        myThis.content = o.content;

        myThis.optionsAffichage = o.optionsAffichage;

        if (myThis.optionsAffichage == undefined)
            myThis.alignementContenu = enumAlignementContenu.HautGauche;
        else {
            if (myThis.optionsAffichage.alignementContenu == undefined)
                myThis.alignementContenu = enumAlignementContenu.HautGauche;
            else
                myThis.alignementContenu = myThis.optionsAffichage.alignementContenu;
        }

        switch (myThis.alignementContenu)
        {

            case enumAlignementContenu.HautGauche:
                myThis.class += ' align-HautGauche';
                break;

            case enumAlignementContenu.HautCentre:
                myThis.class += ' align-HautCentre';
                break;

            case enumAlignementContenu.HautDroite:
                myThis.class += ' align-HautDroite';
                break;

            case enumAlignementContenu.CentreGauche:
                myThis.class += ' align-CentreGauche';
                break;

            case enumAlignementContenu.CentreCentre:
                myThis.class += ' align-CentreCentre';
                break;

            case enumAlignementContenu.CentreDroite:
                myThis.class += ' align-CentreDroite';
                break;

            case enumAlignementContenu.BasGauche:
                myThis.class += ' align-BasGauche';
                break;

            case enumAlignementContenu.BasCentre:
                myThis.class += ' align-BasCentre';
                break;

            case enumAlignementContenu.BasDroite:
                myThis.class += ' align-BasDroite';
                break;

            default:
                myThis.class += ' align-HautGauche';
                break;

        }


        


        myThis.id = o.id;

        if (myThis.isGridCssOnly(o)) {
            myThis.cssOnly = true;
        }
        else {

            myThis.rowStart = o.rowStart;
            myThis.nbRows = o.nbRows;
            myThis.colStart = o.colStart;
            myThis.nbCols = o.nbCols;

            if (myThis.nbCols == undefined) { myThis.nbCols = 1; }
            if (myThis.nbRows == undefined) { myThis.nbRows = 1; }


        }

        myThis.setProperties();
    }

    private setProperties() {
        let myThis: ice2GridItem = this;
        if (myThis.elementPrincipalItem != null) {

            myThis.content.y.remove();
            myThis.elementPrincipalItem.y.className = '';
        }
        else {
            myThis.elementPrincipalItem = new iceDiv({ id: myThis.id });
        }

        myThis.elementPrincipalItem.addClass("ice2GridItem");

        if (myThis.class != undefined) { myThis.elementPrincipalItem.addClass(myThis.class); }

        
        if (myThis.optionsAffichage != undefined)
        {

            iceStyle.AppliquerOptionsAffichage(myThis.elementPrincipalItem, myThis.optionsAffichage);

        }
        


        if (!myThis.cssOnly) {
            let a: HTMLDivElement = <HTMLDivElement>myThis.elementPrincipalItem.y;

            let endCol: string = '';
            if (myThis.nbCols == -1) { endCol = '-1'; }
            else { endCol = '' + (myThis.colStart + myThis.nbCols); }

            let endRow: string = '';
            if (myThis.nbRows == -1) { endRow = '-1'; }
            else { endRow = '' + (myThis.rowStart + myThis.nbRows); }
            
            let strArea: string = '' + myThis.rowStart + ' / ' + myThis.colStart + ' / ' + endRow + ' / ' + endCol;
            let modeRenduIE: boolean = false;

            //seuls ie et edge connaissent msGrid.....
            //le but est d'utiliser les webkits pour ie uniquement

            // pour différencier ie et edge : 

            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

            // Edge 12 (Spartan)
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

            // Edge 13
            // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';


            if (a.style.gridArea == undefined ) {
                modeRenduIE = true;
            }

            if (!modeRenduIE) {  //mode edge / chrome / firefox
                a.style.gridArea = strArea;
            }
            else {
             /*   a.style.gridRow = myThis.rowStart;
                a.style.grid = myThis.nbRows;
                a.style['msGridColumn'] = myThis.colStart;
                a.style['msGridColumnSpan'] = myThis.nbCols;*/
            }
        }

        myThis.elementPrincipalItem.asHolder.append(myThis.content);
    }

    public ChangeContent(element: iXElement) {
        let myThis: ice2GridItem = this;
        myThis.elementPrincipalItem.asHolder.empty();
        myThis.elementPrincipalItem.asHolder.append(element);
    }

    public changeRowsProperties(rowStart: number, nbsRows: number) {
        let myThis: ice2GridItem = this;
        let a: HTMLDivElement = <HTMLDivElement>myThis.elementPrincipalItem.y;
        myThis.rowStart = rowStart;
        myThis.nbRows = nbsRows;

        if (!myThis.cssOnly) {
            let endCol: string = '';
            if (myThis.nbCols == -1) { endCol = '-1'; }
            else { endCol = '' + (myThis.colStart + myThis.nbCols); }

            let endRow: string = '';
            if (nbsRows == -1) { endRow = '-1'; }
            else { endRow = '' + (rowStart + nbsRows); }

            let strArea: string = '' + rowStart + ' / ' + myThis.colStart + ' / ' + endRow + ' / ' + endCol;
            let modeRenduIE: boolean = false;

            if (a.style.gridArea == undefined)
                modeRenduIE = true;
            

            if (!modeRenduIE)  //mode edge / chrome / firefox
                a.style.gridArea = strArea;
        }
    }

    public changeColsProperties(colStart: number, nbsCols: number) {
        let myThis: ice2GridItem = this;
        let a: HTMLDivElement = <HTMLDivElement>myThis.elementPrincipalItem.y;

        myThis.colStart = colStart;
        myThis.nbCols = nbsCols;
        if (!myThis.cssOnly) {
            let endCol: string = '';
            if (myThis.nbCols == -1) { endCol = '-1'; }
            else { endCol = '' + (colStart + nbsCols); }

            let endRow: string = '';
            if (myThis.nbRows == -1) { endRow = '-1'; }
            else { endRow = '' + (myThis.rowStart + myThis.nbRows); }

            let strArea: string = '' + myThis.rowStart + ' / ' + colStart + ' / ' + endRow + ' / ' + endCol;
            let modeRenduIE: boolean = false;

            if (a.style.gridArea == undefined)
                modeRenduIE = true;


            if (!modeRenduIE)  //mode edge / chrome / firefox
                a.style.gridArea = strArea;
        }
    }

    public get y() { return this.elementPrincipalItem.y; }

}

interface iXElementGridPoperty { xelem: iXElement, nbCols: number, nbRows?: number,class?:string }

export class ice2Grid {
   public  Length():number {
        return this.mesElements.Length;
    }
    private elemPrincipal: iceDiv;
    private mesElements: ObservableCollection<ice2GridItem> = new ObservableCollection<ice2GridItem>();
    private paramsColonnes: string[];
    private autoColonnes: string;
    private paramsLignes: string[];
    private autoLignes: string;
    private fullWidth: boolean;
    private fullHeight: boolean;
    private class: string;
    private gridGap?: string;
    padding: boolean;
    optionsAffichage: optionsAffichage;
    public width(parame?: string|number): void | number {
        let myThis: ice2Grid = this;
        return myThis.elemPrincipal.width(parame);
    }

    public height(parame?: string): void | number {
        let myThis: ice2Grid = this;
        return myThis.elemPrincipal.height(parame);
    }
    public toggleClass(c: string, force: boolean) {
        return this.elemPrincipal.toggleClass(c, force);
    }
    private setProperties() {
        let myThis: ice2Grid = this;

        myThis.elemPrincipal.y.setAttribute('style', '');

        let cssColumns: string[];
        cssColumns = myThis.paramsColonnes.map(function (s) {
           
            if (iceMaths.isNumeric(s)) {
                return s + 'fr'
            }
            else { return s; }
        });

        let cssColumnsAuto: string = "";
      
        if (iceMaths.isNumeric(myThis.autoColonnes)) {
            cssColumnsAuto = myThis.autoColonnes + 'fr'
        } else {
            cssColumnsAuto = myThis.autoColonnes;
        }


        let cssRows: string[];
        cssRows = myThis.paramsLignes.map(function (s) {
           
            if (iceMaths.isNumeric(s)) {
                return s + 'fr'
            }
            else { return s; }
        });

        let cssRowsAuto: string = "";
     
        if (iceMaths.isNumeric(myThis.autoLignes)) {
            cssRowsAuto = myThis.autoLignes + 'fr'
        } else {
            cssRowsAuto = myThis.autoLignes;
        }

        if (myThis.optionsAffichage != undefined)
        {

            iceStyle.AppliquerOptionsAffichage(myThis.elemPrincipal, myThis.optionsAffichage);

        }


        let a: CSSStyleDeclaration = myThis.elemPrincipal.y.style;
        //seuls ie et edge connaissent msGrid.....
        //le but est d'utiliser les webkits pour ie uniquement

        // pour différencier ie et edge : 

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
        let modeRenduIE: boolean = false;
   /*     if (a.msGridRow != undefined && navigator.userAgent.indexOf('Edge/') <= 0) {
            modeRenduIE = true;
            a.display = '-ms-grid'
        }*/
        //
        if (!modeRenduIE) {
            a.gridTemplateColumns = cssColumns.join(' ');
            a.gridTemplateRows = cssRows.join(' ');
            a.gridAutoColumns = cssColumnsAuto;
            a.gridAutoRows = cssRowsAuto;

            a.gridGap = myThis.gridGap;


        }
        else {
        //    a.msGridColumns = cssColumns.join(' ');
        //    a.msGridRow = cssRows.join(' ');
        }
    }

    public append(items: (ice2GridItem | iXElement)[]): ice2Grid {
        let myThis: ice2Grid = this;

        let lstGridItems: ice2GridItem[] = [];

        items.forEach(a => {
            if (myThis.isice2GridItem(a)) {

                lstGridItems.push(a);

            }
            else {
                lstGridItems.push(new ice2GridItem({cssOnly:true, content:a}));
            }
        }
        );

        myThis.mesElements.add(lstGridItems);
        return myThis;
    }
    addClass(strClasses: string): ice2Grid {
        let myThis: ice2Grid = this;
        myThis.elemPrincipal.addClass(strClasses);

        return myThis;
    }
    removeClass(strClasses: string): ice2Grid {
        let myThis: ice2Grid = this;
        myThis.elemPrincipal.removeClass(strClasses);

        return myThis;
    }
    public supprimer(items: ice2GridItem[]) {
        let myThis: ice2Grid = this;
        myThis.mesElements.del(items);
        return myThis;
    }
    constructor(o: OptionsGrid) {
        let myThis: ice2Grid = this;
       
        if (o.class == undefined) { o.class = ""; }
        if (o.colonnes == undefined) { o.colonnes = []; }
        if (o.colonnes_auto == undefined) { o.colonnes_auto = "" }
        if (o.lignes == undefined) { o.lignes = []; }
        if (o.lignes_auto == undefined) { o.lignes_auto = "" }
        if (o.fullWidth == undefined) { o.fullWidth = true; }
        if (o.fullHeight == undefined) { o.fullHeight = false; }
        if (o.padding == undefined) { o.padding = false; }

        myThis.gridGap = o.gridGap;
        if (myThis.gridGap == undefined || myThis.gridGap == '') { myThis.gridGap = '10px'; }

        myThis.class = o.class;
        myThis.paramsColonnes = o.colonnes;
        myThis.autoColonnes = o.colonnes_auto;
        myThis.paramsLignes = o.lignes;
        myThis.autoLignes = o.lignes_auto;
        myThis.fullWidth = o.fullWidth;
        myThis.fullHeight = o.fullHeight;
        myThis.padding = o.padding;
        myThis.optionsAffichage = o.optionsAffichage;

        let strClassAuto: string = "";
        if (myThis.fullWidth) {
            strClassAuto += " xgrd-fullwidth";
        }
        if (myThis.fullHeight) {
            strClassAuto += " xgrd-fullheight";
        }

        if (myThis.padding) {
            strClassAuto += " xgrd-padding";
        }

        myThis.elemPrincipal = new iceDiv({ id: o.id,drag:o?.drag, class: "ice2GridMaster " + strClassAuto + " " + myThis.class });
        


        myThis.setProperties();

        

        myThis.mesElements.bind( (ajouts)=> {

            myThis.elemPrincipal.asHolder.appendMany(ajouts);
        },
            function (suppressions) {
                suppressions.forEach( (a)=> { a?.y?.remove(); });
            });

        if (o.initMatrix != undefined) {
            myThis.appendMatrix(o.initMatrix);
        }
    }

    public setColonnes(colonnes: string[])
    {
        let myThis: ice2Grid = this;
        myThis.paramsColonnes = colonnes;
        myThis.setProperties();
    }

    public setLignes(lignes: string[])
    {
        let myThis: ice2Grid = this;
        myThis.paramsLignes = lignes;
        myThis.setProperties();
    }

    private isGridProperty(obj: iXElement | iXElementGridPoperty): obj is iXElementGridPoperty {
        return (<iXElementGridPoperty>obj).nbCols !== undefined;
    }

    private isice2GridItem(obj: iXElement | ice2GridItem): obj is ice2GridItem {
        return (<ice2GridItem>obj).cssOnly !== undefined;
    }

    public appendMatrix(tabelem: (iXElement | iXElementGridPoperty)[][]): ice2Grid {
        let myThis: ice2Grid = this;
        return myThis.appendMatrixStd(tabelem, false);

    }
    /*
    public appendMatrixCssOnly(tabelem: (iXElement | iXElementGridPoperty)[][]) :ice2Grid{
        let myThis: ice2Grid = this;
        return myThis.appendMatrixStd(tabelem, true);

    }
    */

    private appendMatrixStd(tabelem: (iXElement | iXElementGridPoperty)[][],cssOnly:boolean):ice2Grid {
        let myThis: ice2Grid = this;
        let tab: ice2GridItem[] = [];
      //  let decalageLigne: number = 0;

        tabelem.forEach((ligne: (iXElement | iXElementGridPoperty)[], indexLigne) => {
            if (ligne != undefined) {
                let decalageColonne: number = 0;
                ligne.forEach((elem: (iXElement | iXElementGridPoperty), indexColonne) => {
                    if (elem != null) {
                        if (myThis.isGridProperty(elem)) {

                            tab.push(new ice2GridItem({ content: elem.xelem, rowStart: indexLigne + 1, colStart: indexColonne + decalageColonne + 1, nbCols: elem.nbCols, nbRows: elem.nbRows, class:elem.class }));

                            decalageColonne += (elem.nbCols - 1);

                        }
                        else {
                            if (cssOnly) {
                                tab.push(new ice2GridItem({ content: elem,cssOnly:true }));
                            }
                            else {
                                tab.push(new ice2GridItem({ content: elem, rowStart: indexLigne + 1, colStart: decalageColonne + indexColonne + 1 }));
                            }
                        }

                    }
                })
            }
        })
        myThis.append(tab);
        return myThis;
    }

 
    public get y():HTMLElement { return this.elemPrincipal.y; }

    public cacher(collapse?: boolean): ice2Grid {
        let myThis: ice2Grid = this;
        cachericeElements(myThis, collapse);
        return myThis;
    }


    public afficher(): ice2Grid {
        let myThis: ice2Grid = this;
        affichericeElements(myThis);
        return myThis;
    }

    public vider(): ice2Grid {
        let myThis: ice2Grid = this;
        myThis.mesElements.vider();
        return myThis;
    }
    
    public setAutoColonnes(autoColonnes: string): ice2Grid {
        let myThis: ice2Grid = this;
        myThis.autoColonnes = autoColonnes;
        myThis.y.style.gridAutoColumns = autoColonnes;
        return myThis;
    }

    public removeClassFromAllElements(laclasse: string): ice2Grid {
        let myThis: ice2Grid = this;

        myThis.mesElements.forEach(a => {
            if (myThis.isice2GridItem(a)) {
                a.removeClass(laclasse);
            }
        });
        return myThis;
    }

    public addClassToElement(colstart: number, laclasse: string): ice2Grid {
        let myThis: ice2Grid = this;

        myThis.mesElements.forEach(a => {
            if (myThis.isice2GridItem(a)) {
                if (colstart == a.colStart) {
                    a.addClass(laclasse);
                }
            }
        });
        return myThis;
    }

    public removeClassFromElement(colstart: number, laclasse: string): ice2Grid {
        let myThis: ice2Grid = this;

        myThis.mesElements.forEach(a => {
            if (myThis.isice2GridItem(a)) {
                if (colstart == a.colStart) {
                    a.removeClass(laclasse);
                }
            }
        });
        return myThis;
    }

}