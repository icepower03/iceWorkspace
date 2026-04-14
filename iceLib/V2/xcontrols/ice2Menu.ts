import { iXElement, iXElementHolder, Container } from '../iceBase';
import { iceDiv } from './iceDiv';
import { xInputText } from './iceInput';
import { ice2Bouton, enumTailleBouton } from './ice2Bouton';
import { ice2Label } from './ice2Label';
import { ice2StackPanel } from './ice2StackPanel';
import { IconeP12, enumIconeP12, Icone } from '../iceIcones';
import { affichericeElements, cachericeElements } from '../../iceStaticFunctions';




interface OptionsMenu {
    activerRecherche?: boolean;/** active la zone de saisie et le bouton de filtre   */
    toutDeplie?: boolean;/** par defaut le menu est réduit valeur= 'false' pour le forcer tout déplie mettre 'true' */
    contenu: iGroupeMenu[];
    selectFirstLigne?: boolean;
}

interface iGroupeMenu {
    libelle: string;
    icone: Icone;
    items: iGroupeMenuItem[];
}

interface iGroupeMenuItem {
    libelle: string;
    classe: string;
    Click: () => void;
    id?: string;
    titleLocalise?: string,
    titleVariable?: string,
    icone?: Icone,
    classeSelected?: string,
}

export class ice2Menu implements iXElement {
   
   
    get y() {

        return this.elementP.y;
    }
    private elementP: iceDiv;
    private groupesMenus: GroupeMenu[];
    private srchMenu: string;

    private champSaisi: Container<xInputText>
    private divRecherche: Container<iceDiv>;
 
    public constructor(options: OptionsMenu) {
        let myThis: ice2Menu = this;

        myThis.groupesMenus = options.contenu.map(c => new GroupeMenu(c));

        if (options.activerRecherche == undefined) { options.activerRecherche = true; }

        myThis.champSaisi = new Container<xInputText>();
        myThis.divRecherche = new Container<iceDiv>();
        

        myThis.elementP = new iceDiv({ class: 'ice2Menu_global' });

        //j'ajoute une zone de saisie pour filtrer la recherche
        myThis.elementP.asHolder.xdiv({ class: 'ice2Menu_recherche' }, myThis.divRecherche);

        if (options.activerRecherche) {
            myThis.divRecherche.content.asHolder.xinputText({
                id:"txtRecherche",
                ValueChange: function (v: string) { myThis.srchMenu = v; },
                autoChange: true,
                KeyUpEnterCallback: function () { myThis.filtrer(); }
            }, myThis.champSaisi)
                .append(new ice2Bouton({
                    titleLocalise: 'Filtrer les items',
                    textLocalise: 'Filtrer',
                    class:"boutonFiltre",
                    optionsAffichage: { tailleBouton: enumTailleBouton.S },
                    icone: new IconeP12(enumIconeP12.action_rechercher),
                    click: function (cb) { cb(); myThis.filtrer(); }

                }))
                .append(new ice2Bouton({
                    titleLocalise: 'Annuler le filtre',
                    class: "boutonAnnulerFiltre",
                    optionsAffichage: { tailleBouton: enumTailleBouton.S },
                    icone: new IconeP12(enumIconeP12.action_annuler),
                    click: function (cb) { cb(); myThis.annulerFiltre(); }

                }));
        }

        myThis.elementP.asHolder.appendMany(myThis.groupesMenus);

        if (options.toutDeplie)
            myThis.ouvrirTout();
        if (options.selectFirstLigne && myThis.groupesMenus[0]!=null)
            myThis.groupesMenus[0].selectLigne(0);
    }

    private filtrer(): void {
        let myThis: ice2Menu = this;

        //si l'on a saisi un filtre
        if (myThis.srchMenu != undefined && myThis.srchMenu.length > 0) {
            myThis.ouvrirTout();
            // Replacer cette parti pour filtrer avec une liste d'obj
            myThis.groupesMenus.forEach(menu => { menu.filtrer(myThis.srchMenu); });
        }
        else // si le filtre est vide, on réactive tous les items et on referme les groupes
            myThis.annulerFiltre();
        
    }

    private annulerFiltre(): void {
        let myThis: ice2Menu = this;

        myThis.champSaisi.content.setValue('');
        myThis.fermerTout();
    }

    private ouvrirTout(): void {
        let myThis: ice2Menu = this;

        myThis.groupesMenus.forEach(item => item.afficherTout());
    }

    private fermerTout(): void {
        let myThis: ice2Menu = this;

        myThis.groupesMenus.forEach(item => item.cacherTout());
    }
}

class GroupeMenu implements iXElement {
    private contenu: iceDiv;

    private libelle: string;
    private icone: Icone;
    private items: GroupeMenuItem[];

    
    constructor(options: iGroupeMenu) {
        let myThis: GroupeMenu = this;

        myThis.libelle = options.libelle;
        myThis.icone = options.icone;
        myThis.items = options.items.map(c => new GroupeMenuItem(c));

        let bouton = new ice2Bouton({
            class: "ice2Menu_itemGroupe ",
            icone: myThis.icone,
            textLocalise: myThis.libelle,
            click: function (cb) {
                cb();
                myThis.items.forEach(c => c.tooggle());
            },
            titleLocalise: 'plier/déplier ce groupe'
        });

        myThis.contenu = new iceDiv();
        myThis.contenu.asHolder.append(bouton);
        myThis.contenu.asHolder.appendMany(myThis.items);
    }

  
    get y() {
        let myThis: GroupeMenu = this;
        return myThis.contenu.y;
    }

    public selectLigne(index: number)
    {
        let myThis: GroupeMenu = this;
        myThis.items[index].fakeClick();
    }

    public afficherTout() {
        let myThis: GroupeMenu = this;

        myThis.items.forEach(item => item.afficher());
    }

    public cacherTout() {
        let myThis: GroupeMenu = this;
        myThis.items.forEach(item => item.cacher());
    }

    public filtrer(recherche: string) {
        let myThis: GroupeMenu = this;

        myThis.items.forEach(sousMenu => {
            if (sousMenu.libelle.toLowerCase().indexOf(recherche.toLowerCase()) < 0)
                sousMenu.cacher();
            else
                sousMenu.afficher();            
        })
    }
}

class GroupeMenuItem implements iXElement {
    private bouton: ice2Bouton;

    public libelle: string;
    private titleLocalise: string;
    private titleVariable: string;
    private icone: Icone;
    private classe: string;
    private Click: () => void;
    private isAfficher: boolean;
    private classeSelected: string;

    constructor(options: iGroupeMenuItem) {
        let myThis: GroupeMenuItem = this;

        myThis.libelle = options.libelle;
        myThis.classe = options.classe;
        myThis.Click = options.Click;
        myThis.titleLocalise = options.titleLocalise;
        myThis.titleVariable = options.titleVariable;
        myThis.icone = options.icone;
        myThis.classeSelected = options.classeSelected;
        myThis.bouton = new ice2Bouton({
            class: "ice2Menu_itemListElement " + myThis.classe,
            textLocalise: myThis.libelle,
            click: function (cb) { cb(); myThis.Click(); if (myThis.classeSelected != null) myThis.bouton.addClass(myThis.classeSelected);},
            titleLocalise: myThis.titleLocalise,
            titleVariable: myThis.titleVariable,
            icone: myThis.icone,
            id: options.id,
        });

        myThis.cacher();
    }

  
    get y() {
        let myThis: GroupeMenuItem = this;
        return myThis.bouton.y;
    }
    public tooggle() {
        let myThis: GroupeMenuItem = this;
        if (myThis.isAfficher)
            myThis.cacher();
        else
            myThis.afficher();
    }

    public afficher() {
        let myThis: GroupeMenuItem = this;
        affichericeElements(myThis.bouton);
        myThis.isAfficher = true;
    }

    public fakeClick()
    {
        let myThis: GroupeMenuItem = this;
        myThis.bouton.fakeClick();
    }

    public cacher() {
        let myThis: GroupeMenuItem = this;
        cachericeElements(myThis.bouton, true);
        myThis.isAfficher = false;
    }    
}