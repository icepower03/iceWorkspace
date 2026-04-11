import { iXElement, iXElementHolder, optionsAffichage } from '../xBase';
import { xLString } from '../xLString';
import { xDiv } from './xDiv';
import { xStyle } from './xStyle';
import { xElementHolder } from '../../xElement';
import { Icone, IconeSvg, enumIconeSvg, tailleIcone } from '../xIcones';
import { xxLabel, enumHabillageLabel } from './xxLabel';
import { xxBouton, enumTailleBouton, enumCouleurBouton } from './xxBouton';
declare const xxWrapPanel: any;
declare const enumAlignementVerticalWrapPanel: any;

export enum enumAlignementZone {
    gauche = "xpag-align_gauche",
    centre = "xpag-align_centre",
    droite = "xpag-align_droite"
}

export enum enumStyleHeader
{
    avecOmbreT20 = "xpag-header_avecombre",
    sansOmbreT20 = "xpag-header_sansombre",
}

export interface optionsAffichagePageWrapper extends optionsAffichage
{
    styleHeader?: enumStyleHeader;
}

export interface OptionsPage {
    titleLocalise: string;
    localizationParams?: (number | string)[],
    /* defaut:true */
    withFooter?: boolean;
    icone?: Icone;
    id?: string;
    class?: string;
    classBody?: string;
    withHeader?: boolean;
    withPreHeader?: boolean;
    scrollableHeader?: boolean;
    centrerContenu?: boolean;
    initContent?: iXElement[],
    initContentFooter?: iXElement[],
    initContentHeader?: iXElement[],
    alignementFooter?: enumAlignementZone;
    alignementHeader?: enumAlignementZone;
    optionsAffichage?: optionsAffichagePageWrapper;
}

export class xxPageWrapper implements iXElement {

    private zoneWS: xDiv;
    private zoneTitleDiv: xDiv;
    public zoneTitle: iXElementHolder;
    private zonePrincipaleDiv: xDiv;
    public zonePrincipale: iXElementHolder;
    private zoneFooterDiv: xDiv;
    public zoneFooter: iXElementHolder;

    private zonePreHeaderDiv: xDiv;
    public zonePreHeader: iXElementHolder;

    private alignementFooter: enumAlignementZone;
    private alignementHeader: enumAlignementZone;

    private titre: xLString;
    private localizationParams: (number | string)[];
    private divPincipal: xDiv;
    private divSecondaire: xDiv;
    private compteurAppelWS: number = 0;
    private iconePage: Icone;
    private ledivTitre: xDiv;

    // Ecran de mise en attente
    private divAttente: xDiv = null;

    public attachToContentHolder(): xxPageWrapper {
     
        return this.attachTo(document.body.getElementsByClassName('contentHolder').item(0));
    }

    public attachToBody(): xxPageWrapper {
        document.body.append();
        return this.attachTo(document.body);
    }

    private attachTo(parent: Element): xxPageWrapper {
        let myThis: xxPageWrapper = this;
        parent.append(myThis.y);
        return this;
    }

    public get Titre(): string {
        let myThis: xxPageWrapper = this;
      
        return myThis.titre.format(myThis.localizationParams);
    }
    public set TitreLocalise(val: string) {
        let myThis: xxPageWrapper = this;
        myThis.titre = new xLString(val);
        myThis.ledivTitre.y.textContent=myThis.Titre;
    }
    public set TitreVariable(val: string) {
        let myThis: xxPageWrapper = this;
        myThis.ledivTitre.y.textContent=val;
    }
    public addClass(c: string): xxPageWrapper {
        let myThis: xxPageWrapper = this;
       

                myThis.divPincipal.addClass(c);
        

        return myThis;
    }

    public removeClass(c: string): xxPageWrapper {
        let myThis: xxPageWrapper = this;


        myThis.divPincipal.removeClass(c);


        return myThis;
    }
    public ajouterWS(): xDiv {
        let myThis: xxPageWrapper = this;
        myThis.compteurAppelWS++;

        let couleurPaireImpaire: string = "pair";

        if (myThis.compteurAppelWS % 2 == 1) { couleurPaireImpaire = "impair"; }

        let tempDiv: xDiv = new xDiv({ class: 'xxPage_wsLineElement ' + couleurPaireImpaire });

        myThis.zoneWS.asHolder.append(tempDiv);

        return tempDiv;
    }

    constructor(inOptions: OptionsPage) {
        let myThis: xxPageWrapper = this;

        let xlstringTitre = new xLString(inOptions.titleLocalise);
        if (inOptions.localizationParams != null && inOptions.localizationParams.length > 0) {
            myThis.localizationParams = inOptions.localizationParams;
        }
      
        myThis.titre = xlstringTitre;
       

        if (inOptions.icone != undefined) {
            myThis.iconePage = inOptions.icone;
        }


        if (inOptions.class == undefined) { inOptions.class = ""; }
        if (inOptions.classBody == undefined) { inOptions.classBody = ""; }

        if (inOptions.centrerContenu) { inOptions.class += " contenuCentre"; }

        if (inOptions.withFooter == undefined) { inOptions.withFooter = false; }

        if (inOptions.withHeader == undefined) { inOptions.withHeader = true; }

        if (inOptions.withPreHeader == undefined) { inOptions.withPreHeader = true; }

        if (inOptions.scrollableHeader == undefined) { inOptions.scrollableHeader = false; }

        myThis.divPincipal = new xDiv({ class: "xxpage " + inOptions.class, id: inOptions.id });
        myThis.divSecondaire = new xDiv({ class: "xxpage_sousDiv"});

        myThis.zoneWS = new xDiv({ class: 'xxpage_wsLine' });

        myThis.divPincipal.asHolder.append(myThis.zoneWS);

        if (inOptions.withPreHeader) {
            myThis.zonePreHeaderDiv = new xDiv({ class: "xxpage_preheader" });
            myThis.zonePreHeader = myThis.zonePreHeaderDiv.asHolder;

            myThis.divPincipal.asHolder.append(myThis.zonePreHeaderDiv);
        }

        if (inOptions.withHeader) {
            myThis.zoneTitleDiv = new xDiv({ class: "xxpage_header" });
            if (inOptions.scrollableHeader) {
                myThis.zoneTitleDiv.addClass("mobilestickyHeader");
            }
            myThis.zoneTitle = myThis.zoneTitleDiv.asHolder;
            if (myThis.iconePage != undefined) {
                myThis.zoneTitle.append(myThis.iconePage);
            }
            myThis.ledivTitre = new xDiv({ textVariable: myThis.Titre, class: "xxpage_titre" });
            myThis.zoneTitle.append(myThis.ledivTitre);


            if (inOptions.initContentHeader != undefined) {
                inOptions.initContentHeader.forEach(a =>
                {
                    myThis.appendZoneTitle(a);
                });
            }
        }

        myThis.zonePrincipaleDiv = new xDiv({ class: "xxpage_body " + inOptions.classBody });
        myThis.zonePrincipale = new xElementHolder(myThis.zonePrincipaleDiv);

        //Gestion des cas header+body imbriqués/pas imbriqués
        if (inOptions.withHeader) {

            if (inOptions.alignementHeader == undefined)
                inOptions.alignementHeader = enumAlignementZone.gauche;

            myThis.zoneTitleDiv.addClass(inOptions.alignementHeader);

            // Si header + scrollable true, on crée une div secondaire et on met body + header dedans
            if (inOptions.scrollableHeader) {
                myThis.divSecondaire.asHolder.append(myThis.zoneTitleDiv);
                myThis.divSecondaire.asHolder.append(myThis.zonePrincipaleDiv);
                myThis.divPincipal.asHolder.append(myThis.divSecondaire);
            }
             // Si header simple, pas de div secondaire
            else {
                myThis.divPincipal.asHolder.append(myThis.zoneTitleDiv);
                myThis.divPincipal.asHolder.append(myThis.zonePrincipaleDiv);
            }
        }
        // Si pas de header on ajoute juste le body dans le div principal
        else {
            myThis.divPincipal.asHolder.append(myThis.zonePrincipaleDiv);
        }

        if (inOptions.withFooter) {
            myThis.zoneFooterDiv = new xDiv({ class: "xxpage_footer" });
            myThis.zoneFooter = new xElementHolder(myThis.zoneFooterDiv);
            myThis.divPincipal.asHolder.append(myThis.zoneFooterDiv);

            if (inOptions.alignementFooter == undefined)
                inOptions.alignementFooter = enumAlignementZone.droite;

            myThis.zoneFooter.addClass(inOptions.alignementFooter);

            if (inOptions.initContentFooter != undefined) {
                inOptions.initContentFooter.forEach(a =>
                {
                    myThis.appendZoneFooter(a);
                });
            }

        }

        if (inOptions.initContent != undefined) {
            inOptions.initContent.forEach(a =>
            {
                myThis.append(a);
            });
        }

        if (inOptions.optionsAffichage != undefined)
        {
            if (!inOptions.optionsAffichage.padding)
                inOptions.optionsAffichage.padding = { Tous: 20 };
        }
        xStyle.AppliquerOptionsAffichage(myThis.zonePrincipaleDiv, inOptions.optionsAffichage);

        if (inOptions.optionsAffichage?.styleHeader)
            myThis.zoneTitleDiv.addClass(inOptions.optionsAffichage?.styleHeader)

    }

    /** vide la zone de titre mais n'enlève pas le libellé du titre. */
    public viderZoneTitle() {
        let myThis: xxPageWrapper = this;
        myThis.zoneTitle.vider();

        if (myThis.ledivTitre != null)
            myThis.zoneTitle.append(myThis.ledivTitre);
    }

   

    get y(): HTMLElement {
        return this.divPincipal.y;
    }

    public append(i: iXElement): xxPageWrapper {
        let myThis: xxPageWrapper = this;
        myThis.zonePrincipale.append(i);
        return myThis;
    }

    public appendZoneTitle(i: iXElement): xxPageWrapper {
        let myThis: xxPageWrapper = this;
        myThis.zoneTitle.append(i);
        return myThis;
    }

    public appendZoneFooter(i: iXElement): xxPageWrapper {
        let myThis: xxPageWrapper = this;
        myThis.zoneFooter.append(i);
        return myThis;
    }

    public appendZonePreHeader(i: iXElement): xxPageWrapper {
        let myThis: xxPageWrapper = this;

     /*   if (hideOnScroll = true) {
           xStyle.addClass("hiddenOnScroll",i);
        }
        */
        myThis.zonePreHeader.append(i);
        return myThis;
    }

    public activerAlerte(o: {
        textLocalise: string,
        textLocaliseBouton: string,
        action: (cb:()=>void) => void
    }) {
        let myThis: xxPageWrapper = this;

        //Le bandeau d'alerte à mettre dans le xxPageWrapper.ts en méthode
        //Quand le bandeau doit être affiché = lui appliquer la classe "openBandeau"
        let wrapAlerte = new xxWrapPanel({
            class: "xxpage_bandeau_alerte openBandeau",
            alignementVertical: enumAlignementVerticalWrapPanel.centre,
            espaceMinimaliste: true,
            initContent: [
                new xxLabel({
                    textLocalise: o.textLocalise,
                }),
                new xxBouton({
                    textLocalise: o.textLocaliseBouton,
                    click: (cb) => { o.action(cb); },
                    titleLocalise: '',
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.S,
                        couleurBouton: enumCouleurBouton.Neutre
                    },
                }),
                new xxBouton({
                    icone: new IconeSvg(enumIconeSvg.croix, { taille: tailleIcone.XS }),
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.Fit,
                        couleurBouton: enumCouleurBouton.Neutre,
                        margin: { Tous: 0 },
                    },
                    click: (cb) => { wrapAlerte.y.remove(); },
                    titleLocalise: ''
                })
            ]
        });
        myThis.zonePreHeader.append(wrapAlerte);
    }

    public activerAttente(titre?: string): void
    {
        let myThis: xxPageWrapper = this;

        if (myThis.divAttente == null)
        {
            myThis.divAttente = new xDiv({
                class: "divMiseEnAttente"
            });

            myThis.divAttente.asHolder.append(new xxLabel({
                habillage: enumHabillageLabel.loading,
                textLocalise: titre != null ? titre : "Enregistrement en cours."
            }));

            myThis.divPincipal.asHolder.append(myThis.divAttente);
        }

        myThis.divAttente.showDiv();
    }

    public desactiverAttente(): void
    {
        let myThis: xxPageWrapper = this;

        myThis.divAttente.hideDiv();
    }
}

