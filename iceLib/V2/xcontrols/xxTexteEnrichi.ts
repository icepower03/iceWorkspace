// @ts-nocheck
import { iXElement } from '../xBase';
import { xDiv } from './xDiv';
import { xInputText } from './xInput';

interface optionsTexteEnrichi extends OptionsInput
{
    /** dans zeus utiliser la méthode générique: OutilsJSZeus.insertListeMotsInCkEditor; */
    insertListeMotsInCkEditor?: (htmlVal: string, listeMot: boolean) => void;
}
var gestion_editor: any;

export class xxTexteEnrichi implements iXElement{
 
    public get y() { return this.elementPrincipal.y; }

    private textArea: xInputText;  
    private elementPrincipal: xDiv;
    private insertListeMotsInCkEditor: (htmlVal: string, listeMot: boolean) => void;
    private change: (str: string | number) => void;

    constructor(options: optionsTexteEnrichi)
    {
        let myThis: xxTexteEnrichi = this;
        myThis.elementPrincipal = new xDiv({
            class: "xxTexteEnrichi " + (options.class != undefined) ? options.class : '',
        });

        options.multiline = true;

        if (options.ValueChange != null)
            myThis.change = options.ValueChange;

        if (options.insertListeMotsInCkEditor != undefined)
            myThis.insertListeMotsInCkEditor = options.insertListeMotsInCkEditor;

        myThis.textArea = new xInputText(options);
        myThis.textArea.addClass("InputTexteEnrichi");
        if (options.id != null)
            myThis.textArea.y.id = options.id; 
        else
            myThis.textArea.y.id = "id_xxTexteEnrichi"; 

        myThis.elementPrincipal.asHolder.append(this.textArea);

    }

    // remplacer le texteArea par ckeditor : l'appeler après la construction
    public setCkEditor()
    {
        let myThis: xxTexteEnrichi = this;

        gestion_editor = CKEDITOR.replace(myThis.textArea.y.id, {
            width: '98%',
            height: 340,
        });

        gestion_editor.on("change", function ()
        {
            let value: string = CKEDITOR.instances[myThis.textArea.y.id].getData();
            myThis.textArea.setValue(value);
            if (myThis.change)
                myThis.change(value);
        });


        if (myThis.insertListeMotsInCkEditor == undefined)
            gestion_editor.insertHtml(myThis.textArea.getValue().toString());
        else
        {
            gestion_editor.on('instanceReady', function (evt: any)
            {
                // le menu popup de la liste des mots à choisir
                 let menu_list_mots: HTMLElement = document.getElementById("div_liste_mots");
                if (menu_list_mots == undefined)
                {
                    menu_list_mots = document.createElement("div");
                    menu_list_mots.id = 'div_liste_mots';
                    menu_list_mots.className = 'menu_liste_mots';
                    menu_list_mots.innerHTML = new xLString('Chargement en cours...').text;
                    document.body.appendChild(menu_list_mots);
                }

                let txtCourrier = "";
                if (myThis.textArea.getValue() != null)
                    txtCourrier = myThis.textArea.getValue().toString();

                let indexListeMots = txtCourrier.indexOf('[[LISTE_MOTS_');

                //Si dans le modèle on veut gérer une liste de mots
                if (indexListeMots > 0)
                {
                    gestion_editor.setData("", function ()
                    {
                        let tabs = txtCourrier.split('[[LISTE_');
                        tabs.forEach(function (element, index)
                        {
                            if (element.indexOf('MOTS_') == 0)
                            {
                                let tabLignes = element.split(']]');
                                myThis.insertListeMotsInCkEditor("[[LISTE_" + tabLignes[0] + ']]', true);
                                tabLignes.shift();
                                tabLignes.forEach(function (element2, index2)
                                {
                                    // reconstruire l'élément en enlevant les balises </p> inutiles (génèrent des <br>)
                                    let tabp = element2.split('</p>');
                                    if (tabp.length > 0) {
                                        element2 = "";
                                        tabp.forEach(function (elt, ind)
                                        {
                                            if (elt != '<p>')
                                                element2 += elt;
                                        });
                                    }
                                    // fermer la balise <p> si besoin
                                    myThis.insertListeMotsInCkEditor(myThis.fermerBaliseP(element2), false);
                                });
                            }
                            else
                            {
                                    // fermer la balise <p> si besoin
                                myThis.insertListeMotsInCkEditor(myThis.fermerBaliseP(element), false);
                            }
                        });
                    });
                }
            });
        }
    }

    private fermerBaliseP(element: string): string
    {
        //CKEditor ne ferme pas certaines balises <p> !! Du coup ça fait n'importe quoi je dois refermer.
        let countBaliseP = element.split("<p>").length - 1;
        let countBaliseCloseP = element.split("</p>").length - 1;
        if (countBaliseP > countBaliseCloseP)
            return element + '</p>';
        else
            return element;
    }

    public getContenu(): string
    {
        let myThis: xxTexteEnrichi = this;

        myThis.textArea.setValue(CKEDITOR.instances[myThis.textArea.y.id].getData());
        return myThis.textArea.getValue().toString();
    }

    public setContenu(txtCourrier: string): void
    {
        let myThis: xxTexteEnrichi = this;

        CKEDITOR.instances[myThis.textArea.y.id].destroy();

        myThis.textArea.setValue(txtCourrier == null ? "" : txtCourrier);

        myThis.setCkEditor();
    }

    public setDisabled(disabled: boolean): void
    {
        let myThis: xxTexteEnrichi = this;
        let texte: HTMLElement = document.getElementById(myThis.textArea.y.id);
        if (texte != null) {
            if (disabled)
                texte.setAttribute("disabled", "true");
            else
                texte.removeAttribute("disabled");
        }
    }

}