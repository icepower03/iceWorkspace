// @ts-nocheck
import { iXElement } from '../xBase';
import { xLString } from '../xLString';
import { xDiv } from './xDiv';
import { xxToolTip } from './xxToolTip';
import { xxListWrapper } from './xxListWrapper';
import { xxContainerEvent } from './xxContainerEvent';
import { xxLabel } from './xxLabel';

interface OptionsInputIntellisense extends OptionsInput {
    listeAutoComplete: string[];
    nbLigneAfficher: number;
}

export class xxInputIntellisense implements iXElement {
    private divContent: xDiv;
    private divContentEditable: xDiv;
    private tooltipAutoComplete: xxToolTip;
    private listeMotsAutoComplete: string[];
    private listAutoComplete: xxListWrapper<string>;
    private listEventContainers: xxContainerEvent[];
    private indexCurrent: number;
    private debutMot: string;
    private posCurseurLeftDebutMot: number;
    private widthTooltip: number;
    private myNewInputElement: HTMLInputElement;
    private posCurseurInInput: number;
    private currentNode: Node;

    private nbLigneAfficher: number;
    private bloqueLostFocus: boolean;
    public width(parame?: string | number): void | number {
        let myThis: xxInputIntellisense = this;
        return myThis.divContent.width(parame);
    }

    public height(parame?: string): void | number {
        let myThis: xxInputIntellisense = this;
        return myThis.divContent.height(parame);
    }
  
    public get y() { return this.divContent.y; }

    constructor(options: OptionsInputIntellisense) {
        let placeHolder: string = '';
        if (options.placeHolderlocalise != undefined) {
            placeHolder = new xLString(options.placeHolderlocalise).text;
        }
        else {
            if (options.placeHolderVariable != undefined) {
                placeHolder = options.placeHolderVariable;
            }
        }

        let myThis: xxInputIntellisense = this;
        let _myChangeCallback = options.ValueChange;
        let autoChange: boolean = false;
        let _onLostfocusCallback = options.onLostfocusCallback;
        myThis.bloqueLostFocus = false;
        myThis.divContent = new xDiv({ class: 'xxInputIntellisense' });
        myThis.divContentEditable = new xDiv({ class: 'zoneEditable' });
        myThis.divContentEditable.y.setAttribute('contenteditable', 'true');
        myThis.divContent.asHolder.append(new xDiv({ class: 'zoneInfo', title: new xLString("Assistant : commencez la saisie et obtenez des propositions pertinentes selon votre utilisation.").text }));
        myThis.divContent.asHolder.append(myThis.divContentEditable);

        myThis.listeMotsAutoComplete = options.listeAutoComplete;
        myThis.indexCurrent = -1;
        myThis.myNewInputElement = <HTMLInputElement>myThis.divContentEditable.y;

        if (options.id != undefined)
            myThis.y.setAttribute("id", options.id);

        myThis.nbLigneAfficher = 1;
        if (options.nbLigneAfficher != null && options.nbLigneAfficher > 0) {
            myThis.nbLigneAfficher = options.nbLigneAfficher;
        }


        if (options.value != undefined)
            myThis.setValue(options.value as string);

        //par défaut on garde le meme mécanisme change qu'un input classique
        if (options.autoChange != undefined) {
            autoChange = options.autoChange;
            delete options.autoChange;
        }

        delete options.listeAutoComplete;
        delete options.KeyUpEnterCallback;
        delete options.ValueChange;
        delete options.password;
        delete options.placeHolderlocalise;
        delete options.placeHolderVariable;
        delete options.onLostfocusCallback;
        delete options.value;
        delete options.multiline;

        myThis.divContentEditable.y.onchange=
            function (e: Event) {
                if (myThis.tooltipAutoComplete != null)
                    myThis.tooltipAutoComplete.HideTooltip();

                myThis.currentNode = window.getSelection().anchorNode;
                myThis.posCurseurInInput = window.getSelection().focusOffset;
                let contentEditable: HTMLInputElement = <HTMLInputElement>e.target;
                let currentLine: string = myThis.currentNode.textContent;

                if (myThis.widthTooltip == undefined) {
                    myThis.widthTooltip = 300;

                    if (myThis.y.getBoundingClientRect().width <= 300) {
                        myThis.widthTooltip = myThis.y.getBoundingClientRect().width;
                    }
                }

                if (myThis.IsEspace(currentLine, myThis.posCurseurInInput - 1)) {
                    myThis.posCurseurLeftDebutMot = window.getSelection().getRangeAt(0).getBoundingClientRect().left;
                }

                if (!myThis.IsEspace(currentLine, myThis.posCurseurInInput - 1)) {
                    //on récupère le début du mot qu'on a entre le dernier espace jusqu'au curseur
                    let lastSpaceIndex: number = 0;

                    //Récupération du dernier espace
                    for (var i = myThis.posCurseurInInput; i > 0; i--) {
                        if (currentLine.charAt(i) == ' ') {
                            lastSpaceIndex = i;
                            break;
                        }
                    }

                    if (lastSpaceIndex > -1) {
                        if (lastSpaceIndex > 0) lastSpaceIndex = lastSpaceIndex + 1;
                        myThis.debutMot = currentLine.substring(lastSpaceIndex, myThis.posCurseurInInput);

                        if (myThis.debutMot.length >= 3) {
                            let listeMotsFiltres: string[] = myThis.listeMotsAutoComplete.filter(function (w) {
                                return xOutils.rechercheString(myThis.debutMot, [w]);
                            });

                            if (listeMotsFiltres.length > 0) {
                                myThis.listEventContainers = [];
                                myThis.indexCurrent = -1;

                                if (myThis.listAutoComplete == null) {
                                    myThis.listAutoComplete = new xxListWrapper<string>({
                                        donnees: [],
                                        class: "list_auto_complete",
                                        renderItem: function (p, item) {
                                            let label: xxLabel = new xxLabel({ textVariable: item });
                                            label.setSurbrillance(myThis.debutMot);

                                            let eventContainer: xxContainerEvent = new xxContainerEvent({
                                                class: "suggestionMot",
                                                initContent: label,
                                                onClick: function (e) {
                                                    myThis.myNewInputElement.focus();
                                                    myThis.setTextAutoComplete(item);
                                                    e();
                                                }
                                            });

                                            eventContainer.y.setAttribute('tabindex', "-1");

                                            p.append(eventContainer);
                                            myThis.listEventContainers.push(eventContainer);
                                        }
                                    });

                                    myThis.listAutoComplete.width(myThis.widthTooltip);

                                    myThis.listAutoComplete.y.onkeydown = (e) => {
                                        if (e.keyCode == 38) {
                                            //on appuie sur la touche fleche haut
                                            myThis.setTabIndexAutoComplete(e, false);
                                        }
                                        else if (e.keyCode == 40) {
                                            //on appuie sur la touche fleche bas
                                            myThis.setTabIndexAutoComplete(e, true);
                                        }
                                        else if (e.keyCode == 13) {
                                            //on appuie sur la touche enter
                                            if (myThis.tooltipAutoComplete != null) {
                                                if (myThis.tooltipAutoComplete.isVisible) {
                                                    myThis.listEventContainers[myThis.indexCurrent].fakeClick();
                                                    e.preventDefault();
                                                }
                                            }
                                        }

                                    };
                                }

                                if (myThis.tooltipAutoComplete == null) {
                                    myThis.tooltipAutoComplete = new xxToolTip({
                                        class: "xxInputIntellisense_Tooltip",
                                        toolTipContent: myThis.listAutoComplete,
                                        initContent: new xDiv({ class: "divSuggestionMots" })
                                    });

                                    document.body.append(myThis.tooltipAutoComplete.y);
                                    myThis.tooltipAutoComplete.y.style.position = 'absolute';
                                }

                                myThis.listAutoComplete.supprimerItemsAll();
                                if (listeMotsFiltres.length > 10) //on prend que les 10 premiers mots
                                    listeMotsFiltres = listeMotsFiltres.slice(1, 10);
                                myThis.bloqueLostFocus = true;
                                myThis.listAutoComplete.ajouterItems(listeMotsFiltres);

                                let top: number = window.getSelection().getRangeAt(0).getBoundingClientRect().top;
                                let posCurseur: number = window.getSelection().getRangeAt(0).getBoundingClientRect().left;

                                if (!(top == 0 && posCurseur == 0)) {
                                    if (myThis.posCurseurLeftDebutMot == null) myThis.posCurseurLeftDebutMot = myThis.y.offsetLeft;
                                    myThis.tooltipAutoComplete.y.style.top = (top + 10).toString() + "px";
                                    myThis.tooltipAutoComplete.y.style.left = (myThis.posCurseurLeftDebutMot + 1 + (myThis.widthTooltip / 2)).toString() + "px";
                                    myThis.tooltipAutoComplete.ShowTooltip();
                                }

                            }
                        }
                    }

                }

                if (_myChangeCallback) {
                    _myChangeCallback(myThis.getContenuText(contentEditable));
                }

            };


        myThis.divContentEditable.y.addEventListener('focusout', (event) => {
            if (!myThis.bloqueLostFocus)
                if (_onLostfocusCallback) {
                    let contentEditable: HTMLInputElement = <HTMLInputElement>event.target;
                    _onLostfocusCallback(myThis.getContenuText(contentEditable));
                }
            
        }); 

      

        myThis.divContentEditable.y.onkeyup =
            function (e: KeyboardEvent) {
                //On déclenche pas de change si on appuie sur la touche fleche bas ou haut (utilisé pour naviguer dans le menu)
                if (e.keyCode != 40) {
                    myThis.bloqueLostFocus = false;
                    //pour les autres touches on lance le change uniquement si il est déclaré en auto
                    if (autoChange) {
                        myThis.myNewInputElement.dispatchEvent(new Event('change'));
                    }
                }
            };
        

        myThis.divContentEditable.y.onkeydown= (e)=> {
            if (e.keyCode == 9) {
                //on appuie sur la touche tab
                if (myThis.tooltipAutoComplete != null) {
                    if (myThis.tooltipAutoComplete.isVisible) {
                        let contentEditable: HTMLInputElement = <HTMLInputElement>e.target;
                        let premierMot: string = myThis.listAutoComplete.getAllData()[0];
                        e.preventDefault();
                        myThis.setTextAutoComplete(premierMot);
                    }
                }
            }
            else if (e.keyCode == 40) {
                //on appuie sur la touche fleche bas
                myThis.setTabIndexAutoComplete(e, true);
            }
            else if (e.keyCode == 13) {
                //on appuie sur la touche entrée
                myThis.posCurseurLeftDebutMot = null;
            }
        };


    }

    private getContenuText(contentEditable: HTMLInputElement): string {
        let value: string = contentEditable.innerHTML;
        return value;
    }

    private setTabIndexAutoComplete(e: Event, directionBas: boolean): void {
        let myThis: xxInputIntellisense = this;

        if (myThis.tooltipAutoComplete != null) {
            if (myThis.tooltipAutoComplete.isVisible) {
                if (directionBas) {
                    if (myThis.indexCurrent < myThis.listEventContainers.length - 1)
                        myThis.indexCurrent++;
                }
                else {
                    if (myThis.indexCurrent > 0)
                        myThis.indexCurrent--;
                }


                myThis.listEventContainers[myThis.indexCurrent].y.focus();
                e.preventDefault();
            }
        }
    }

    private setTextAutoComplete(texte: string): void {
        let myThis: xxInputIntellisense = this;
        let range: Range = window.getSelection().getRangeAt(0);
        //on récupère le début du mot qu'on a entre le dernier espace jusqu'au curseur
        let lastSpaceIndex: number = 0;

        //Récupération du dernier espace
        for (let i = myThis.posCurseurInInput; i > 0; i--) {
            if (myThis.currentNode.textContent.charAt(i) == ' ') {
                lastSpaceIndex = i;
                break;
            }
        }

        if (lastSpaceIndex > 0) lastSpaceIndex = lastSpaceIndex + 1;

        range.setStart(myThis.currentNode, lastSpaceIndex);
        range.setEnd(myThis.currentNode, myThis.posCurseurInInput);
        range.deleteContents();
        range.insertNode(document.createTextNode(texte + "\u00a0"));

        myThis.setCursorAtEnd();

        myThis.tooltipAutoComplete.HideTooltip();
        myThis.myNewInputElement.dispatchEvent(new Event("change"));
        myThis.bloqueLostFocus = false;
    }

    //ça c'est pour mettre le curseur à la fin de la ligne... oui faut tout ça. Quel m...
    private setCursorAtEnd(): void {
        let myThis: xxInputIntellisense = this;
        myThis.myNewInputElement.focus();

        if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            var range = document.createRange();
            var sel = window.getSelection();

            range.setStart(window.getSelection().anchorNode, window.getSelection().anchorNode.textContent.length);
            range.selectNodeContents(myThis.myNewInputElement);
            range.collapse(false);

            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    public setValue(texte: string): void {
        let myThis: xxInputIntellisense = this;
        myThis.divContentEditable.y.innerHTML = texte;
    }

    //Modifie la liste des mots suggérés par l'intellissense.
    public setListMotsAutoComplete(mots: string[]) {
        let myThis: xxInputIntellisense = this;
        myThis.listeMotsAutoComplete = mots;
    }

    private IsEspace(texte: string, cursor: number) {
        let myThis: xxInputIntellisense = this;

        if (texte.charCodeAt(cursor) == 160 || texte.charAt(cursor) == ' ')
            return true;
        else
            return false;
    }

    private setTextPourRecherche(s: string): string {
        var accent = [
            /[\xc0-\xc6]/g, /[\xe0-\xe6]/g, // A, a
            /[\xc8-\xcb]/g, /[\xe8-\xeb]/g, // E, e
            /[\xcc-\xcf]/g, /[\xec-\xef]/g, // I, i
            /[\xd2-\xd8]/g, /[\xf2-\xf8]/g, // O, o
            /[\xd9-\xdc]/g, /[\xf9-\xfc]/g, // U, u
            /[\xd1]/g, /[\xf1]/g, // N, n
            /[\xc7]/g, /[\xe7]/g, // C, c
        ];
        var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

        for (var i = 0; i < accent.length; i++) {
            s = s.replace(accent[i], noaccent[i]);
        }

        return s.toLowerCase();
    }

    public setHeight() {
        let myThis: xxInputIntellisense = this;
        let newHeight = myThis.getHeightInPx();
        myThis.divContent.height(newHeight);
    }

    private getHeightInPx(): string {
        let myThis: xxInputIntellisense = this;
        //hauteur d'une ligne
        let height: number = 0;

        let element: Element = myThis.divContentEditable.y;
        element.innerHTML = "A";
        let style = window.getComputedStyle(element);
        let lineHeight = style.getPropertyValue('line-height');
        if (lineHeight == "normal") {
            lineHeight = style.getPropertyValue('font-size');
            lineHeight = lineHeight.replace("px", "");
            height = parseInt(lineHeight);
            //height = font-size + 20%
            height = Math.round(height * 1.2);
        }
        else {
            height = parseInt(lineHeight);
        }
        element.innerHTML = "";

        height = height * myThis.nbLigneAfficher;

        return height + "px";
    }
}