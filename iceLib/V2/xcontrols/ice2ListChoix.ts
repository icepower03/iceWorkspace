// @ts-nocheck
import { iXElement, OptionsHtml, enumCouleur } from '../iceBase';
import { iceDiv } from './iceDiv';
import { ice2Bouton } from './ice2Bouton';
import { iceIconeAvecAction } from './iceIconeAvecAction';
import { Icone, enumIconeP12, enumIconeSvg, IconeP12, IconeSvg, tailleIcone } from '../iceIcones';

export class ice2ListChoix implements iXElement {
    private element: iceDiv;
    private optionsSelect: OptionsSelect;
    private classElementList: string;
    private classIsSelected: string;
    private iconeAAfficher: Icone | iceIconeAvecAction;
    private boutonSelection: ice2Bouton;
    private buttonDefault: ice2Bouton;

    private _list: Container<iceDiv>;
    private _cache: Container<iceDiv>;


    get y() { return this.element.y; }
    public addClass(s: string) {
        return this.element.addClass(s);
    }
    /*  public attacher(to: JQuery) {
          this.element.appendTo(to);
      }
  */
    constructor(options: OptionsSelect) {
        let myThis: ice2ListChoix = this;
        options.valueDefault = (options.valueDefault != undefined ? options.valueDefault : '');
        myThis.optionsSelect = options;
        let texteDefault = "";

        if (options.valueDefault != '') {
            let list: CleValeur<string, string>[] = options.listeValeurs.filter(function (element) {
                return element.cle == options.valueDefault;
            });


            if (list.length > 0)
                texteDefault = list[0].valeur;
        }

        if (texteDefault == "" && options.optionTous)
            texteDefault = "Tous";

     
        myThis.classIsSelected = "ice2ListChoix_selected";
        myThis.classElementList = "ice2ListChoix_item";


        //mon conteneur de base est un div
        myThis.element = new iceDiv({ class: "ice2ListChoix" });
      

        let listContainer = new Container<iceDiv>();
        myThis._list = new Container<iceDiv>();
        myThis._cache = new Container<iceDiv>();
       
        let classParDefaut = "ice2ListChoix_zone_bouton";

        if (options.icone == undefined)
            classParDefaut += " ice2ListChoixSansIcone";

        // j'ajoute à mon conteneur un div qui hebergera les items possibles
        // et un bouton qui correspond à la zone de click repliée
        myThis.element.asHolder
            .xdiv({
                class: "ice2ListChoix_cache", click: function () {
                    myThis.closeList();
                }
            }, myThis._cache);
       
        myThis.boutonSelection = new ice2Bouton(
            {
                class: classParDefaut,
                titleLocalise: 'sélectionner un élément',
                textLocalise: '',
                icone: new IconeSvg(enumIconeSvg.chevron_bas, { taille: tailleIcone.XS, couleurSvg: { couleurIconeComplete:enumCouleur.zeus_grisfonce } }),
                click: function (callback) {
                    callback();

                    if (myThis._list.content != null) {
                        affichericeElements(myThis._list.content);
                        affichericeElements(myThis._cache.content);

                        if (typeof (options.click) == "function") {
                            try {
                                options.click();
                            } catch (ex) {
                                console.log("problème dans click de ice2listChoix " + ex);
                            }
                        }
                    }
                }
            });
        myThis.element.asHolder.append(myThis.boutonSelection);

        myThis.element.asHolder.xdiv({ class: "ice2ListChoix_list_Container" }, listContainer);
        cachericeElements(myThis._cache.content, true);

        listContainer.content.asHolder.xdiv({ class: "ice2ListChoix_list_items" }, myThis._list);

        // si on a mis un chois toux en option, on le met en premier
        if (options.optionTous) {
            let iconeTous: IconeP12 = new IconeP12(enumIconeP12.ice2ListChoix_tous);
            myThis.buttonDefault = new ice2Bouton({
                class: myThis.classElementList + " " + (options.valueDefault == "" ? myThis.classIsSelected : ''),
                icone: iconeTous,
                titleLocalise: 'sélectionner cet élement',
                textLocalise: "Tous",

                click: function (callback) {

                    myThis.boutonSelection.changerText('Tous');
                    myThis.boutonSelection.setIcone(iconeTous);
                    let tab = myThis._list.content.y.getElementsByClassName(myThis.classElementList);
                    for (let i = 0; i < tab.length; i++) {
                        tab.item(i).classList.remove(myThis.classIsSelected)
                    }

                    myThis.buttonDefault.addClass(myThis.classIsSelected);

                    if (options != null && options.change != undefined)
                        options.change('Tous');

                    myThis.closeList();
                    //_list.content.hide();

                    //if (_cache && _cache.content != null) {
                    //    _cache.content.hide();
                    //}
                    callback();
                }

            });
            myThis._list.content.asHolder.append(myThis.buttonDefault);
                
            cachericeElements(myThis._list.content, true);

            if (options.valueDefault == "") {
                myThis.boutonSelection.changerText(myThis.buttonDefault.getText());
                myThis.boutonSelection.setIcone(myThis.buttonDefault.getIcone());
                myThis.buttonDefault.addClass(myThis.classIsSelected);
            }
        }

        if (options.icone != undefined) { myThis.iconeAAfficher = options.icone; }

        let chargement: Promise<{}>;

        chargement = new Promise<{}>(function (resolve, reject) {
            if (options.asyncLoading == undefined) {
                resolve({});
            }
            else {
                options.asyncLoading(options, resolve);

            }
        });

        chargement.then(function () {
            myThis.loadList();
        });


    }

    private closeList(): void {
        let myThis: ice2ListChoix = this;
        cachericeElements(myThis._list.content, true);

        if (myThis._cache && myThis._cache.content != null) {
            cachericeElements(myThis._cache.content, true);
        }

        if (typeof (myThis.optionsSelect.onClose) == "function") {

            try {
                myThis.optionsSelect.onClose();

            } catch (ex) {
                console.log("problème fonction onClose ice2ListChoix " + ex);
            }
        }
    }

    private loadList(): void {
        let myThis: ice2ListChoix = this;

        // puis j'ajoute toutes les valeurs
        if (myThis.optionsSelect.listeValeurs != undefined) {

            myThis.optionsSelect.listeValeurs.forEach(function (item: CleValeur<string, string>, idx: number, tableau: CleValeur<string, string>[]) {
                
                let button: ice2Bouton;

                button = new ice2Bouton({
                    class: myThis.classElementList,
                    titleLocalise: 'sélectionner cet élément',
                    textVariable: item.valeur,
                    icone: myThis.iconeAAfficher ? myThis.iconeAAfficher : null,
                    //    data: item,
                    click: function (callback) {
                        myThis.boutonSelection.changerText(button.getText());
                        if(myThis.iconeAAfficher)
                            myThis.boutonSelection.setIcone(myThis.iconeAAfficher);



                        let tab = myThis._list.content.y.getElementsByClassName(myThis.classElementList);
                        for (let i = 0; i < tab.length; i++) {
                            tab.item(i).classList.remove(myThis.classIsSelected)
                        }

                        button.addClass(myThis.classIsSelected);

                        if (myThis.optionsSelect != null && myThis.optionsSelect.change != undefined)
                            myThis.optionsSelect.change(item.cle);

                        //_list.content.hide();
                        //if (_cache && _cache.content != null) {
                        //    _cache.content.hide();
                        //}
                        myThis.closeList();
                        callback();
                    }
                });
                //j'aoute un buoton pour chaque choix possible
                myThis._list.content.asHolder.append(button);

                cachericeElements(myThis._list.content, true);

                if (myThis.optionsSelect.valueDefault != "" && item.cle == myThis.optionsSelect.valueDefault) {

                    myThis.boutonSelection.changerText(button.getText());
                    myThis.boutonSelection.setIcone(button.getIcone());
                    button.addClass(myThis.classIsSelected);

                } else if (myThis.optionsSelect.optionTous && idx == 0) {

                    myThis.boutonSelection.changerText(myThis.buttonDefault.getText());
                    myThis.boutonSelection.setIcone(myThis.buttonDefault.getIcone());
                    myThis.buttonDefault.addClass(myThis.classIsSelected);
                }
            });
        }
    }

    public addElements(elements: CleValeur<string, string>[]): void {
        let myThis: ice2ListChoix = this;
        myThis.optionsSelect.listeValeurs = elements;

        myThis.loadList();
    }
}