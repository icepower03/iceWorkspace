interface OptionsGridLayout {
    id?: string;
    class?: string;
    gridGap?: string;
    lignes_auto?: string;
    container_fluid?: boolean;
    noMargin?: boolean;
    structureDePage?: boolean;
}

interface iDisplayDevice {
    nbCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    nbRows?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    hidden?: boolean
}

interface iDisplay<T> {
    pc?: T,
    tablette?: T,
    mobile?: T
}

interface ixGridLayoutElement {
    element: iXElement,
    display?: iDisplay<iDisplayDevice>,
    dispositionContenu?: {
        horizontal?: 'gauche' | 'centre' | 'droite' | 'fullHauteur',
        vertical?: 'haut' | 'centre' | 'bas' | 'fullHauteur'
    },
    id?: string,
    class?:string
}

class xxGridLayout {
    private elemPrincipal: xxGrid;

    private static getClassesFromixGridLayoutElement(i: ixGridLayoutElement): string {
        let retour = ' xxGridLayoutItem';
        if (i.display != undefined) {
            if (i.display.pc != undefined) {
                if (i.display.pc.nbCols != undefined) { retour += ' col-pc-' + i.display.pc.nbCols; }
                if (i.display.pc.nbRows != undefined) { retour += ' row-pc-' + i.display.pc.nbRows; }
                if (i.display.pc.colStart != undefined) { retour += ' colstart-pc-' + i.display.pc.colStart; }
                if (i.display.pc.hidden) { retour += ' GLI_hidden_pc'; }
            }
            if (i.display.tablette != undefined) {
                if (i.display.tablette.nbCols != undefined) { retour += ' col-tab-' + i.display.tablette.nbCols; }
                if (i.display.tablette.nbRows != undefined) { retour += ' row-tab-' + i.display.tablette.nbRows; }
                if (i.display.tablette.colStart != undefined) { retour += ' colstart-tab-' + i.display.tablette.colStart; }
                if (i.display.tablette.hidden) { retour += ' GLI_hidden_tab'; }
            }
            if (i.display.mobile != undefined) {
                if (i.display.mobile.nbCols != undefined) { retour += ' col-mob-' + i.display.mobile.nbCols; }
                if (i.display.mobile.nbRows != undefined) { retour += ' row-mob-' + i.display.mobile.nbRows; }
                if (i.display.mobile.colStart != undefined) { retour += ' colstart-mob-' + i.display.mobile.colStart; }
                if (i.display.mobile.hidden) { retour += ' GLI_hidden_mob'; }
            }
            retour += ' GLI_halign_' + i.dispositionContenu.horizontal;
            retour += ' GLI_valign_' + i.dispositionContenu.vertical;
        }
        return retour;
    }

    public append(listItem: ixGridLayoutElement[]): xxGridLayout {
        let myThis: xxGridLayout = this;
        let listGriditem: xxGridItem[] = [];
        listItem.forEach(item => {

            if (item.dispositionContenu == undefined) { item.dispositionContenu = {}; }
            if (item.dispositionContenu.vertical == undefined) { item.dispositionContenu.vertical = 'centre'; }
            if (item.dispositionContenu.horizontal == undefined) { item.dispositionContenu.horizontal = 'centre'; }
            listGriditem.push(new xxGridItem({
                content: item.element, class: (item.class == undefined ? '' : item.class)+' '+
                xxGridLayout.getClassesFromixGridLayoutElement(item),
                cssOnly: true,
                id:item.id
            }));
        })

        myThis.elemPrincipal.append(listGriditem);

        return myThis;
    }

    constructor(o: OptionsGridLayout) {
        let myThis: xxGridLayout = this;
        if (o == undefined) {
            o = {};
        }

        let classeFluide = 'GL_fluid ';
        let classeNoMargin = 'GL_NoMargin ';
        let classeStructure = 'GL_Page ';
        
        if (o.class == undefined) { o.class = ''; }
        if (o.container_fluid == undefined) { o.container_fluid = true; }
        if (o.noMargin == undefined) {
            o.noMargin = false;
        }
        if (o.structureDePage == undefined) { o.structureDePage = false; }

        myThis.elemPrincipal = new xxGrid({
            id: o.id, class:
                'xxGridLayout ' +
                    (o.container_fluid ? classeFluide : ' ') +
                     (   o.noMargin ? classeNoMargin : ' ') +
                       (     o.structureDePage ? classeStructure : ' ' )+
                            o.class,
            gridGap: o.gridGap,
            lignes_auto: o.lignes_auto,
            colonnes: ['1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr'],

        });
    }
    
  
    public get y() { return this.elemPrincipal.y; }

    public cacher(collapse?: boolean): xxGridLayout {
        let myThis: xxGridLayout = this;
        cacherxElements(myThis, collapse);
        return myThis;
    }

    public afficher(): xxGridLayout {
        let myThis: xxGridLayout = this;
        afficherxElements(myThis);
        return myThis;
    }

    public vider(): xxGridLayout {
        let myThis: xxGridLayout = this;
        myThis.elemPrincipal.vider();
        return myThis;
    }
}