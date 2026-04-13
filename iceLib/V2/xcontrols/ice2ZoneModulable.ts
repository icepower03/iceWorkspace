// @ts-nocheck
﻿import { enumTypeOrientation, iXElement, iXElementHolder } from '../iceBase';
import { iceDiv } from './iceDiv';
import { ice2Label, enumTypeLabel } from './ice2Label';
import { ice2DockPanelDeprecated, DockPosition } from './ice2DockPanel';
import { ice2Bouton, enumTailleBouton, enumStyleBouton } from './ice2Bouton';
import { enumIconeP12, IconeP12, Icone } from '../iceIcones';

interface OptionZoneModulable {
    id?: string,
    class?: string,
    typeOrientation?: enumTypeOrientation,
    initPosition?: string,
    initEtat?: EEtatZoneModulable,
    noRotation?: boolean
    initPremiereZone?: (ici: iXElementHolder) => any;
    initSecondeZone?: (ici: iXElementHolder) => any;
    savePositionKey?: string;
    // saveEtatKey?: string;
    titrePremiereZone?: () => string;
    titreDeuxiemeZone?: () => string;
    onDeplierPremierZone?: () => void;
    onDeplierDeuxiemeZone?: () => void;
    onPlierPremiereZone?: () => void;
    onPlierDeuxiemeZone?: () => void;

}

export enum EEtatZoneModulable {

    repliePremiereZone = "replie_premiere_zone",
    replieDeuxiemeZone = "replie_deuxieme_zone",
    deplie = "deplie"
}

export class ice2ZoneModulable implements iXElement {

    private currentMouseUpListener: (e: MouseEvent) => void;
    private currentMouseLeaveListener: (e: MouseEvent) => void;
    private static CleSauvegardeOrientation: string = "Orientation-Key";
    private static CleSauvegardePosition: string = "Position-Key";
    private static CleSauvegardeEtat: string = "Etat-Key";
    private onDeplierPremierZone?: () => void;
    private onDeplierDeuxiemeZone?: () => void;
    private onPlierPremiereZone?: () => void;
    private onPlierDeuxiemeZone?: () => void;
    private get KeyOrientationName(): string { return this.savePositionKey + ice2ZoneModulable.CleSauvegardeOrientation }
    private get KeyPositionName(): string { return this.savePositionKey + ice2ZoneModulable.CleSauvegardePosition }
    private get KeyEtatName(): string { return this.savePositionKey + ice2ZoneModulable.CleSauvegardeEtat }

    private titrePremiereZone: () => string;
    private titreDeuxiemeZone: () => string;
    private position: string;
   
    public get y()  {
        return this.divPrincipal.y;
    };
    public get premiereZone(): iXElementHolder {
        return this.premiereZoneDiv.asHolder;
    }

    public get secondeZone(): iXElementHolder {
        return this.secondeZondeDiv.asHolder;
    }

    private divPrincipal: iceDiv;
    private premiereZoneDiv: iceDiv;
    private secondeZondeDiv: iceDiv;

    private cache: iceDiv;
    private centralZone: iceDiv;
    private zoneRepliee: iceDiv;

    private orientation: enumTypeOrientation;
    private etat: EEtatZoneModulable;
    private doc: Document;

    private click: MouseEvent;
    private savePositionKey: string;

    private savePosition: boolean;
    //   private saveEtat: boolean;

    public noRotation: boolean;

    private initPositionFromOption: string;

    private dernierePositionHorizontale: number;
    private dernierePositionVerticale: number;

    private titreZoneReplie: ice2Label;

    private divClick: iceDiv;


    public constructor(options: OptionZoneModulable) {
        let mythis: ice2ZoneModulable = this;
        //    let initPosition: string;

        mythis.onDeplierDeuxiemeZone = options.onDeplierDeuxiemeZone;
        mythis.onDeplierPremierZone = options.onDeplierPremierZone;
        mythis.onPlierDeuxiemeZone = options.onPlierDeuxiemeZone;
        mythis.onPlierPremiereZone = options.onPlierPremiereZone;

        mythis.savePosition = (options.savePositionKey != null)
        mythis.savePositionKey = options.savePositionKey;
        mythis.titrePremiereZone = options.titrePremiereZone;
        mythis.titreDeuxiemeZone = options.titreDeuxiemeZone;

        mythis.position = options.initPosition;
        mythis.initPositionFromOption = options.initPosition;

        mythis.etat = EEtatZoneModulable.deplie;

        if (options.initEtat)
            mythis.etat = <EEtatZoneModulable>options.initEtat;

        mythis.doc = document

        mythis.orientation = enumTypeOrientation.horizontal;
        if (options.typeOrientation != undefined)
            mythis.orientation = options.typeOrientation;

        //chargement à partir des données du poste
        if (mythis.savePosition) {
            let valposition: string = iceOutils.getLocalStorage(mythis.KeyPositionName);


            if (valposition != undefined) {
                mythis.position = valposition;
            }

            let valOrientation = iceOutils.getLocalStorage(mythis.KeyOrientationName);
            if (valOrientation != undefined) {
                mythis.orientation = <enumTypeOrientation>valOrientation;
            }


            let valEtat = iceOutils.getLocalStorage(mythis.KeyEtatName);
            if (valEtat != undefined) {
                mythis.etat = <EEtatZoneModulable>valEtat;
            }
        }

        this.noRotation = false;
        if (options.noRotation != undefined)
            mythis.noRotation = options.noRotation;

        let classe = "";
        if (options.class != undefined)
            classe = options.class + " ";


        //creation de l'element
        mythis.divPrincipal = new iceDiv({ class: "ice2ZoneModulable " + classe + mythis.orientation, id: options.id });

        //init de la premiere zone
        mythis.premiereZoneDiv = new iceDiv({ class: "ice2ZoneModulable_premiere_zone " + mythis.orientation });
        if (options.initPremiereZone != undefined)
            options.initPremiereZone(mythis.premiereZoneDiv.asHolder);

        //init de la seconde zone
        mythis.secondeZondeDiv = new iceDiv({ class: "ice2ZoneModulable_seconde_zone" });
        if (options.initSecondeZone != undefined)
            options.initSecondeZone(mythis.secondeZondeDiv.asHolder);

        //init de la zone centrale
        mythis.centralZone = new iceDiv({ class: "ice2ZoneModulable_zone_centrale " + mythis.orientation });
        mythis.centralZone.y.addEventListener('mousedown', (ev: MouseEvent) => { mythis.attacherSouris(ev) })

        //creation du cache
        mythis.cache = new iceDiv({ class: "ice2ZoneModulable_cache_" + mythis.orientation });
        cachericeElements(mythis.cache, true);

        //Création de la zone où on peut cliquer pour déplier une zone replier
        mythis.zoneRepliee = new iceDiv({
            class: "ice2ZoneModulable_repliee_" + mythis.orientation,
            click: function () {
                mythis.deplierZone();
            }
        });
        mythis.titreZoneReplie = new ice2Label({ type: enumTypeLabel.titre, textVariable: '', class: "titreZoneReplie" });
        cachericeElements(mythis.zoneRepliee.asHolder.append(this.titreZoneReplie), true);


        mythis.divPrincipal.asHolder.append(mythis.premiereZoneDiv)
            .append(mythis.centralZone)
            .append(mythis.zoneRepliee)
            .append(mythis.secondeZondeDiv)
            .append(mythis.cache);

        //initialisation de la position initiale
        if (mythis.position != undefined) {
            mythis.setPremiereZone();
        }

        mythis.setDisplayInCache();

        if (mythis.etat == EEtatZoneModulable.repliePremiereZone)
            mythis.replierZone(mythis.premiereZoneDiv);
        else if (mythis.etat == EEtatZoneModulable.replieDeuxiemeZone)
            mythis.replierZone(mythis.secondeZondeDiv);
    }

    private setPremiereZone() {
        let mythis: ice2ZoneModulable = this;

        if (mythis.orientation == enumTypeOrientation.horizontal) {
            mythis.setPremiereZoneWidth();
            mythis.resPremiereZoneHeight();
        }
        else {
            mythis.setPremiereZoneHeight();
            mythis.resPremiereZoneWidth();
        }
    }

    private setPremiereZoneWidth() {
        let mythis: ice2ZoneModulable = this;
        mythis.premiereZoneDiv.y.style.width = mythis.position;
        // mythis.premiereZoneDiv.x.width(mythis.position);
    }
    private setPremiereZoneHeight() {
        let mythis: ice2ZoneModulable = this;
        //mythis.premiereZoneDiv.x.height(mythis.position);
        mythis.premiereZoneDiv.y.style.height = mythis.position;
    }

    private resPremiereZoneWidth() {
        let mythis: ice2ZoneModulable = this;
        //mythis.premiereZoneDiv.x.width("");
        mythis.premiereZoneDiv.y.style.width = "";
    }
    private resPremiereZoneHeight() {
        let mythis: ice2ZoneModulable = this;
        //mythis.premiereZoneDiv.x.height("");
        mythis.premiereZoneDiv.y.style.height = "";
    }


    private setDisplayInCache() {
        let mythis: ice2ZoneModulable = this;

        let dockposition: DockPosition;
        if (mythis.orientation == enumTypeOrientation.horizontal)
            dockposition = DockPosition.haut;
        else
            dockposition = DockPosition.gauche;

        let cacheDocker: ice2DockPanelDeprecated = new ice2DockPanelDeprecated({ centrerDernier: true });

        if (!mythis.noRotation) {
            //ajout du bouton de changement d'orientation
            cacheDocker.append(new ice2Bouton({
                optionsAffichage: {
                    tailleBouton: enumTailleBouton.XL,
                    styleBouton: enumStyleBouton.AvecFondBlancAvecContour
                }, 
                icone: new IconeP12(enumIconeP12.action_rotation),
                textLocalise: "changer l'orientation",
                titleLocalise: "changer l'orientation",
                click: function (cb) {
                    cb();
                    mythis.flipOrientation();
                    cachericeElements(mythis.cache, true);
                    mythis.setDisplayInCache();
                }
            }), dockposition, "zonedock_action");
        }

        //ajout de la div où l'on click pour le déplacement de la barre
        mythis.divClick = new iceDiv({
            class: "zone_deplacement",
        });

        mythis.divClick.y.addEventListener('click', (ev) => {
            let pos: number = 0;
            let infoDivClick = mythis.divClick.y.getBoundingClientRect();
            let infoMyThis = mythis.y.getBoundingClientRect();
            if (mythis.orientation == enumTypeOrientation.horizontal) {
                pos = Math.floor((ev.clientX - infoDivClick.left) * infoMyThis.width / infoDivClick.width);
                mythis.position = pos.toString() + "px";
                mythis.setPremiereZoneWidth();
                mythis.dernierePositionHorizontale = pos;
            }
            else {
                pos = Math.floor((ev.clientY - infoDivClick.top) * infoMyThis.height / infoDivClick.height);
                mythis.position = pos.toString() + "px";

                mythis.setPremiereZoneHeight();
                mythis.dernierePositionVerticale = pos;
            }

            if (mythis.savePosition)
                iceOutils.setLocalStorage(mythis.KeyPositionName, mythis.position);
            

            cachericeElements(mythis.cache, true);
        });

        mythis.divClick.asHolder.xdiv({
            click: function (e) {

                mythis.replierZone(mythis.premiereZoneDiv);
                mythis.etat = EEtatZoneModulable.repliePremiereZone;

                if (mythis.savePosition) {
                    iceOutils.setLocalStorage(mythis.KeyEtatName, mythis.etat);
                }


                cachericeElements(mythis.cache, true);

                e.stopImmediatePropagation();
                e.stopPropagation();
            }, class: "zone_replie premiere"
        }).append(new ice2Label({
            type: enumTypeLabel.titre,
            textLocalise: "Touchez à l'endroit où vous souhaitez déplacer la barre de séparation",
        }))
            .xdiv({
                click: function (e) {
                    mythis.replierZone(mythis.secondeZondeDiv);
                    mythis.etat = EEtatZoneModulable.replieDeuxiemeZone;

                    if (mythis.savePosition) {
                        iceOutils.setLocalStorage(mythis.KeyEtatName, mythis.etat);
                    }


                    cachericeElements(mythis.cache, true);

                    e.stopImmediatePropagation();
                    e.stopPropagation();
                }, class: "zone_replie deuxieme"
            });

        cacheDocker.append(mythis.divClick, dockposition, "zonedock_deplacement " + this.orientation);

        //ajout des éléments au cache
        // Remplace x.empty
       // mythis.cache.x.empty
        while (mythis.cache.y.hasChildNodes()) {
            mythis.cache.y.removeChild(mythis.cache.y.lastChild);
        }

        mythis.cache.asHolder.append(cacheDocker);
    }

    private afficherCache() {
        let mythis: ice2ZoneModulable = this;
        //placement de la barre de la position actuelle
        if (mythis.orientation == enumTypeOrientation.horizontal) {
            let position: number = mythis.premiereZoneDiv.y.getBoundingClientRect().width + 1;
            
            mythis.divClick.y.parentElement.style.backgroundPosition = '' + position + "px" + " 0";
        }
        else {
            let position: number = mythis.premiereZoneDiv.y.getBoundingClientRect().height + 1;
            mythis.divClick.y.parentElement.style.backgroundPosition = "0 " + position + "px";
        }
        affichericeElements(mythis.cache);
    }

    private attacherSouris(ev: MouseEvent) 
    {
        let mythis: ice2ZoneModulable = this;
        let dragEnCour: boolean = true;
        mythis.click = ev;

        mythis.centralZone.addClass("selected");

        mythis.currentMouseUpListener = (e: MouseEvent) => {
            if (mythis.orientation == enumTypeOrientation.horizontal && (e.clientX == mythis.click.clientX) || mythis.orientation == enumTypeOrientation.vertical && (e.clientY == mythis.click.clientY))
                mythis.afficherCache();
            mythis.detacherSouris();
            dragEnCour = false;

            //si il y a une iframe ça bloque les événement on cache l'iframe le temps de resizer la zone
            if (mythis.deuxiemeZoneHasIframe())
                affichericeElements(mythis.secondeZondeDiv);
        };

        mythis.currentMouseLeaveListener = () => { mythis.detacherSouris(); dragEnCour = false; }

        mythis.y.addEventListener('mousemove', ev => {
            if (dragEnCour) {
                if (mythis.deuxiemeZoneHasIframe())
                    cachericeElements(mythis.secondeZondeDiv, false);
                    

                let pos: number = 0;
                let infoPremierZone: DOMRect = mythis.premiereZoneDiv.y.getBoundingClientRect();

                if (mythis.orientation == enumTypeOrientation.horizontal) {
                    pos = (ev.clientX - infoPremierZone.left);
                    mythis.position = pos.toString() + "px";
                    mythis.setPremiereZoneWidth();
                    mythis.dernierePositionHorizontale = pos;
                }
                else {
                    pos = (ev.clientY - infoPremierZone.top);
                    mythis.position = pos.toString() + "px";
                    mythis.setPremiereZoneHeight();
                    mythis.dernierePositionVerticale = pos;
                }

                if (mythis.savePosition)
                    iceOutils.setLocalStorage(mythis.KeyPositionName, mythis.position);
            }
        })

        mythis.divPrincipal.y.addEventListener("mouseup", mythis.currentMouseUpListener);
        mythis.divPrincipal.y.addEventListener("mouseleave", mythis.currentMouseLeaveListener);
        mythis.divClick.y.addEventListener("mouseleave", mythis.currentMouseLeaveListener);
    }

    /**renvoie true si la deuxième zone possède une iframe */
    private deuxiemeZoneHasIframe(): boolean
    {
        let mythis: ice2ZoneModulable = this;
        return mythis.secondeZondeDiv.y.getElementsByTagName("iframe").length > 0;
    }

    private detacherSouris() {
        let mythis: ice2ZoneModulable = this;
      
        mythis.divPrincipal.y.removeEventListener("mouseup",mythis.currentMouseUpListener);
        mythis.divPrincipal.y.removeEventListener("mouseleave",mythis.currentMouseLeaveListener);

        mythis.centralZone.removeClass("selected");
    }

    private replierZone(zone: iceDiv) {
        let mythis: ice2ZoneModulable = this;
        affichericeElements(mythis.zoneRepliee);
        cachericeElements(mythis.centralZone, true);
        cachericeElements(zone, true);

        if (zone == mythis.secondeZondeDiv) {

            if (mythis.onPlierDeuxiemeZone != null)
                mythis.onPlierDeuxiemeZone();
            
            mythis.position = "100%";
            mythis.setPremiereZone();

            if (mythis.titreDeuxiemeZone != undefined)
                mythis.titreZoneReplie.changerTextVariable(mythis.titreDeuxiemeZone());
            
            mythis.etat = EEtatZoneModulable.replieDeuxiemeZone;
        } else {
            if (mythis.onPlierPremiereZone != null) 
                mythis.onPlierPremiereZone();
            
            if (mythis.titrePremiereZone != undefined)
                mythis.titreZoneReplie.changerTextVariable(mythis.titrePremiereZone());

            mythis.etat = EEtatZoneModulable.repliePremiereZone;           
        }

        if (mythis.savePosition)
            iceOutils.setLocalStorage(mythis.KeyEtatName, mythis.etat);
    }

    public flipOrientation() {
        let mythis: ice2ZoneModulable = this;

        mythis.removeClass(mythis.orientation)
        
        let oldOrientation: string;

        mythis.position = "";
        oldOrientation = mythis.orientation.toString();

        if (mythis.orientation == enumTypeOrientation.horizontal)
            mythis.orientation = enumTypeOrientation.vertical;        
        else
            mythis.orientation = enumTypeOrientation.horizontal;

        mythis.setPremiereZone();

        mythis.premiereZoneDiv.removeClass(oldOrientation);
        mythis.centralZone.removeClass(oldOrientation);
        mythis.zoneRepliee.removeClass("ice2ZoneModulable_repliee_" + oldOrientation);
        mythis.premiereZoneDiv.addClass(mythis.orientation.toString());
        mythis.centralZone.addClass(mythis.orientation.toString());
        mythis.zoneRepliee.addClass("ice2ZoneModulable_repliee_" + mythis.orientation.toString());

        if (mythis.savePosition) {
            iceOutils.setLocalStorage(mythis.KeyOrientationName, mythis.orientation);
            iceOutils.setLocalStorage(mythis.KeyPositionName, mythis.position);
            iceOutils.setLocalStorage(mythis.KeyEtatName, mythis.etat);
        }

        mythis.addClass(mythis.orientation);
    }
    public addClass(s: string) {
        return this.divPrincipal.addClass(s);
    }
    public removeClass(s: string) {
        return this.divPrincipal.removeClass(s);
    }
    public deplierZone(position?: string) {
        let mythis: ice2ZoneModulable = this;

        cachericeElements(mythis.zoneRepliee, true);
        affichericeElements(mythis.centralZone);

        if (mythis.etat == EEtatZoneModulable.repliePremiereZone) {
            if (mythis.onDeplierPremierZone != null) {
                mythis.onDeplierPremierZone();
            }
            affichericeElements(mythis.premiereZoneDiv);
        }
        else if (mythis.etat == EEtatZoneModulable.replieDeuxiemeZone) {
            if (mythis.onDeplierDeuxiemeZone != null) {
                mythis.onDeplierDeuxiemeZone();
            }
            affichericeElements(mythis.secondeZondeDiv);
        }
        mythis.position = mythis.orientation == enumTypeOrientation.horizontal && mythis.dernierePositionHorizontale ? mythis.dernierePositionHorizontale.toString() + "px" : mythis.dernierePositionVerticale ? mythis.dernierePositionVerticale.toString() + "px" : mythis.initPositionFromOption;

            if (!mythis.position) 
                {
                    mythis.position = "50%";
                }
                mythis.setPremiereZone();            
        
        mythis.etat = EEtatZoneModulable.deplie;

        if (mythis.savePosition)
            iceOutils.setLocalStorage(mythis.KeyEtatName, mythis.etat);

    }

    public replierPremiereZone() {
        let mythis: ice2ZoneModulable = this;
        mythis.replierZone(mythis.premiereZoneDiv);

    }


    public replierDeuxiemeZone() {
        let mythis: ice2ZoneModulable = this;
        mythis.replierZone(mythis.secondeZondeDiv);
    }




}