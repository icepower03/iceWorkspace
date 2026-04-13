import { iXElement, iXElementHolder, optionsAffichage } from '../iceBase';
import { iceLString } from '../iceLString';
import { iceDiv } from './iceDiv';
import { iceStyle } from './iceStyle';
import { xElementHolder } from '../../iceElement';
import { Icone, IconeSvg, enumIconeSvg, tailleIcone } from '../iceIcones';
import { ice2Label, enumHabillageLabel } from './ice2Label';
import { ice2Bouton, enumTailleBouton, enumCouleurBouton } from './ice2Bouton';
import { ice2WrapPanel, enumAlignementVerticalWrapPanel } from './ice2WrapPanel';

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

export class ice2PageWrapper implements iXElement {

    private zoneWS: iceDiv;
    private zoneTitleDiv: iceDiv;
    public zoneTitle: iXElementHolder;
    private zonePrincipaleDiv: iceDiv;
    public zonePrincipale: iXElementHolder;
    private zoneFooterDiv: iceDiv;
    public zoneFooter: iXElementHolder;

    private zonePreHeaderDiv: iceDiv;
    public zonePreHeader: iXElementHolder;

    private alignementFooter: enumAlignementZone;
    private alignementHeader: enumAlignementZone;

    private titre: iceLString;
    private localizationParams: (number | string)[];
    private divPincipal: iceDiv;
    private divSecondaire: iceDiv;
    private compteurAppelWS: number = 0;
    private iconePage: Icone;
    private ledivTitre: iceDiv;

    // Ecran de mise en attente
    private divAttente: iceDiv = null;

    public attachToContentHolder(): ice2PageWrapper {
     
        return this.attachTo(document.body.getElementsByClassName('contentHolder').item(0));
    }

    public attachToBody(): ice2PageWrapper {
        document.body.append();
        return this.attachTo(document.body);
    }

    private attachTo(parent: Element): ice2PageWrapper {
        let myThis: ice2PageWrapper = this;
        parent.append(myThis.y);
        return this;
    }

    public get Titre(): string {
        let myThis: ice2PageWrapper = this;
      
        return myThis.titre.format(myThis.localizationParams);
    }
    public set TitreLocalise(val: string) {
        let myThis: ice2PageWrapper = this;
        myThis.titre = new iceLString(val);
        myThis.ledivTitre.y.textContent=myThis.Titre;
    }
    public set TitreVariable(val: string) {
        let myThis: ice2PageWrapper = this;
        myThis.ledivTitre.y.textContent=val;
    }
    public addClass(c: string): ice2PageWrapper {
        let myThis: ice2PageWrapper = this;
       

                myThis.divPincipal.addClass(c);
        

        return myThis;
    }

    public removeClass(c: string): ice2PageWrapper {
        let myThis: ice2PageWrapper = this;


        myThis.divPincipal.removeClass(c);


        return myThis;
    }
    public ajouterWS(): iceDiv {
        let myThis: ice2PageWrapper = this;
        myThis.compteurAppelWS++;

        let couleurPaireImpaire: string = "pair";

        if (myThis.compteurAppelWS % 2 == 1) { couleurPaireImpaire = "impair"; }

        let tempDiv: iceDiv = new iceDiv({ class: 'ice2Page_wsLineElement ' + couleurPaireImpaire });

        myThis.zoneWS.asHolder.append(tempDiv);

        return tempDiv;
    }

    constructor(inOptions: OptionsPage) {
        let myThis: ice2PageWrapper = this;

        let xlstringTitre = new iceLString(inOptions.titleLocalise);
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

        myThis.divPincipal = new iceDiv({ class: "ice2page " + inOptions.class, id: inOptions.id });
        myThis.divSecondaire = new iceDiv({ class: "ice2page_sousDiv"});

        myThis.zoneWS = new iceDiv({ class: 'ice2page_wsLine' });

        myThis.divPincipal.asHolder.append(myThis.zoneWS);

        if (inOptions.withPreHeader) {
            myThis.zonePreHeaderDiv = new iceDiv({ class: "ice2page_preheader" });
            myThis.zonePreHeader = myThis.zonePreHeaderDiv.asHolder;

            myThis.divPincipal.asHolder.append(myThis.zonePreHeaderDiv);
        }

        if (inOptions.withHeader) {
            myThis.zoneTitleDiv = new iceDiv({ class: "ice2page_header" });
            if (inOptions.scrollableHeader) {
                myThis.zoneTitleDiv.addClass("mobilestickyHeader");
            }
            myThis.zoneTitle = myThis.zoneTitleDiv.asHolder;
            if (myThis.iconePage != undefined) {
                myThis.zoneTitle.append(myThis.iconePage);
            }
            myThis.ledivTitre = new iceDiv({ textVariable: myThis.Titre, class: "ice2page_titre" });
            myThis.zoneTitle.append(myThis.ledivTitre);


            if (inOptions.initContentHeader != undefined) {
                inOptions.initContentHeader.forEach(a =>
                {
                    myThis.appendZoneTitle(a);
                });
            }
        }

        myThis.zonePrincipaleDiv = new iceDiv({ class: "ice2page_body " + inOptions.classBody });
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
            myThis.zoneFooterDiv = new iceDiv({ class: "ice2page_footer" });
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
        iceStyle.AppliquerOptionsAffichage(myThis.zonePrincipaleDiv, inOptions.optionsAffichage);

        if (inOptions.optionsAffichage?.styleHeader)
            myThis.zoneTitleDiv.addClass(inOptions.optionsAffichage?.styleHeader)

    }

    /** vide la zone de titre mais n'enlève pas le libellé du titre. */
    public viderZoneTitle() {
        let myThis: ice2PageWrapper = this;
        myThis.zoneTitle.vider();

        if (myThis.ledivTitre != null)
            myThis.zoneTitle.append(myThis.ledivTitre);
    }

   

    get y(): HTMLElement {
        return this.divPincipal.y;
    }

    public append(i: iXElement): ice2PageWrapper {
        let myThis: ice2PageWrapper = this;
        myThis.zonePrincipale.append(i);
        return myThis;
    }

    public appendZoneTitle(i: iXElement): ice2PageWrapper {
        let myThis: ice2PageWrapper = this;
        myThis.zoneTitle.append(i);
        return myThis;
    }

    public appendZoneFooter(i: iXElement): ice2PageWrapper {
        let myThis: ice2PageWrapper = this;
        myThis.zoneFooter.append(i);
        return myThis;
    }

    public appendZonePreHeader(i: iXElement): ice2PageWrapper {
        let myThis: ice2PageWrapper = this;

     /*   if (hideOnScroll = true) {
           iceStyle.addClass("hiddenOnScroll",i);
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
        let myThis: ice2PageWrapper = this;

        //Le bandeau d'alerte à mettre dans le ice2PageWrapper.ts en méthode
        //Quand le bandeau doit être affiché = lui appliquer la classe "openBandeau"
        let wrapAlerte = new ice2WrapPanel({
            class: "ice2page_bandeau_alerte openBandeau",
            alignementVertical: enumAlignementVerticalWrapPanel.centre,
            espaceMinimaliste: true,
            initContent: [
                new ice2Label({
                    textLocalise: o.textLocalise,
                }),
                new ice2Bouton({
                    textLocalise: o.textLocaliseBouton,
                    click: (cb) => { o.action(cb); },
                    titleLocalise: '',
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.S,
                        couleurBouton: enumCouleurBouton.Neutre
                    },
                }),
                new ice2Bouton({
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
        let myThis: ice2PageWrapper = this;

        if (myThis.divAttente == null)
        {
            myThis.divAttente = new iceDiv({
                class: "divMiseEnAttente"
            });

            myThis.divAttente.asHolder.append(new ice2Label({
                habillage: enumHabillageLabel.loading,
                textLocalise: titre != null ? titre : "Enregistrement en cours."
            }));

            myThis.divPincipal.asHolder.append(myThis.divAttente);
        }

        myThis.divAttente.showDiv();
    }

    public desactiverAttente(): void
    {
        let myThis: ice2PageWrapper = this;

        myThis.divAttente.hideDiv();
    }
}

