// @ts-nocheck
﻿import { iceDiv } from './iceDiv';
import { ice2StackPanel } from './ice2StackPanel';
import { ice2Label, enumTypeLabel } from './ice2Label';
import { iceOutils } from '../../iceOutils';
import { xClass } from '../iceBase';
import { ice2Bouton, enumTailleBouton, enumTypeBouton, enumStyleBouton } from './ice2Bouton';
import { IconeP12, enumIconeP12, enumIconeSvg, IconeSvg, Icone } from '../iceIcones';
import { ice2PageWrapper } from './ice2PageWrapper';
import { ice2DockPanelDeprecated, DockPosition } from './ice2DockPanel';
import { ice2Boxer, enumBoxerMode } from './ice2Boxer';

interface OptionViewerPDF
{
    WithBoutonTelecharger?: boolean;
    AffichagePageWrapper?: boolean;
    WithoutTitlePDF?: boolean;
}

export class ice2ViewerPDF implements iXElement
{
    private _Conteneur: iceDiv = new iceDiv();
    private _Page: ice2PageWrapper;
    private _Stackmobile: ice2StackPanel;
    private _divContenu: iceDiv = new iceDiv();
    private _bindingTitre: BindableObject<string> = new BindableObject();
    private _TabBinary: string;
    private _nameDoc: string;

 
    public get y() {
        let myThis: ice2ViewerPDF = this;

            return myThis._Conteneur.y;
        }

    public constructor(o: OptionViewerPDF)
    {
        let myThis: ice2ViewerPDF = this;
        
        // si on veux un affichage avec un ice2page
        if (o.AffichagePageWrapper)
        {
            myThis._Page = new ice2PageWrapper({
                titleLocalise: "",
                withFooter: false,
                class:"bodyContainer"
            });

            if (!o.WithoutTitlePDF)
            {
                myThis._bindingTitre.bind((v) =>
                {
                    myThis._Page.TitreVariable = v;
                });
            }

            if (o.WithBoutonTelecharger)
            {
                myThis._Page.zoneTitle.append(myThis.geneButtonDownLoad());
            }

            myThis._Page.zonePrincipale.append(myThis._divContenu);
            myThis._Conteneur.asHolder.append(myThis._Page);
        }
        else // sinon affichage normal (bien pour les telephone)
        {
            if (iceOutils.isMobile()) 
            {
                myThis._Stackmobile = new ice2StackPanel({});
                let dockTop: ice2DockPanelDeprecated = new ice2DockPanelDeprecated({ centrerDernier: false });
                if (o.WithBoutonTelecharger)
                {
                    dockTop.append(myThis.geneButtonDownLoad(), DockPosition.droite);
                }

                if (!o.WithoutTitlePDF)
                {
                    dockTop.append(new ice2Label({
                        type: enumTypeLabel.soustitre,
                        centrer: true,
                        binding: {
                            value: myThis._bindingTitre
                        }
                    }), DockPosition.gauche);
                }

                myThis._Stackmobile.append(dockTop);
                myThis._Stackmobile.append(myThis._divContenu);

                myThis._Conteneur.asHolder.append(myThis._Stackmobile);
            }
            else
            {
                myThis._Conteneur.asHolder.append(myThis._divContenu);
            }
        }

        let path: string = iceOutils.convertDevUrlToRelativeUrl(xClass.config.jsDependencyPath);
        pdfjsLib.GlobalWorkerOptions.workerSrc = path + 'pdf.worker.js';
    }

    public geneButtonDownLoad(): ice2Bouton
    {
        let myThis: ice2ViewerPDF = this;
        return new ice2Bouton({
            optionsAffichage: {
                tailleBouton: enumTailleBouton.Header
            },
            icone: new IconeP12(enumIconeP12.action_telecharger_documents),
            textLocalise: "Télécharger",
            titleLocalise: "Télécharger l'aperçu en pdf",
            click: (cb) =>
            {
                const linkSource = "data:application/pdf;base64," + myThis._TabBinary;
                const downloadLink = document.createElement("a");

                downloadLink.href = linkSource;
                downloadLink.download = myThis._nameDoc;
                downloadLink.click();
                cb();
            }
        });
    }


 

    /**
     * Affiche le pdf spécifié en format base64.
     * @param dataFilepdf
     * @param div
     */
    public async afficher(dataFilepdf: string, nompdf:string)
    {
        let myThis: ice2ViewerPDF = this;
        myThis._divContenu.vider();
        myThis._TabBinary = dataFilepdf;
        myThis._nameDoc = nompdf;

        let loadingTask = pdfjsLib.getDocument({ data: iceOutils.base64ToUint8Array(dataFilepdf) });

        if (iceOutils.isMobile()) {
            //// Opening PDF by passing its binary data as a string. It is still preferable
            //// to use Uint8Array, but string or array-like structure will work too.
            loadingTask.promise.then(async function (pdf: pdfjsLib.PDFDocumentProxy) {
                if (pdf.numPages > 3) {
                    myThis._bindingTitre.Value = nompdf + " (3/" + pdf.numPages + ")";

                    for (let page: number = 1; page <= 3; page++) {
                        await myThis.afficherPage(page, pdf);
                    }

                    myThis._divContenu.asHolder.append(new ice2Bouton({
                        textLocalise: "Afficher plus de pages",
                        titleLocalise: "Afficher les autres pages du document",
                        optionsAffichage: {
                            styleBouton: enumStyleBouton.AvecFond,
                            tailleBouton: enumTailleBouton.L,
                        },
                        icone: new IconeSvg(enumIconeSvg.chevron_bas),
                        typeBouton: enumTypeBouton.Standard,
                        click: async function (cb) {
                            myThis._bindingTitre.Value = nompdf + " (" + pdf.numPages + "/" + pdf.numPages + ")";

                            for (let page: number = 4; page <= pdf.numPages; page++) {
                                await myThis.afficherPage(page, pdf);
                            }
                            cb();
                        }
                    }));
                }
                else {
                    myThis._bindingTitre.Value = nompdf;

                    for (let page: number = 1; page <= pdf.numPages; page++) {
                        await myThis.afficherPage(page, pdf);
                    }
                }

            });

        }
        else {
            let iframepdf = new iceIFrame({ id:"ice2ViewerFrame", src: "data:application/pdf;base64," + dataFilepdf });
            myThis._divContenu.asHolder.append(iframepdf);
            myThis._divContenu.y.style.height = "100%";
            myThis._divContenu.y.style.width = "100%";
        }
    }

    /**
     * Affiche le pdf spécifié dans un boxer 
     * @param dataFilepdf
     * @param nompdf
     */
    public async afficheBoxer(dataFilepdf: string, nompdf: string)
    {
        let mythis: ice2ViewerPDF = this;

        let boxer: ice2Boxer = new ice2Boxer({
            ModeAffichage: enumBoxerMode.maximize,
            initContent: mythis
        });

        mythis.afficher(dataFilepdf, nompdf);
        boxer.afficher();
    }

    /**
     * Ajoute la page spécifiée du pdf dans le canvas.
     * @param numpage
     * @param pdf
     */
    private async afficherPage(numpage: number, pdf: pdfjsLib.PDFDocumentProxy)
    {
        let myThis: ice2ViewerPDF = this;
        let page: pdfjsLib.PDFPageProxy = await pdf.getPage(numpage);

        let canvas: iceCanvas = new iceCanvas({});
        let monCanvas: HTMLCanvasElement = canvas.y as HTMLCanvasElement;
        var scale = 1;
        var viewport = page.getViewport({ scale: scale, });

        // Prepare canvas using PDF page dimensions.
        var context = monCanvas.getContext('2d');
        monCanvas.height = viewport.height;
        monCanvas.width = viewport.width;

        // Render PDF page into canvas context.
        var renderContext = {
            canvasContext: context,
            viewport: viewport,
        };

        page.render(renderContext);
        myThis._divContenu.asHolder.append(canvas);
    }
}