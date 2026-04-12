// @ts-nocheck
﻿import { xDiv } from './xDiv';
import { xxStackPanel } from './xxStackPanel';
import { xxLabel, enumTypeLabel } from './xxLabel';
import { xOutils } from '../../xOutils';
import { xClass } from '../xBase';
import { xxBouton, enumTailleBouton, enumTypeBouton, enumStyleBouton } from './xxBouton';
import { IconeP12, enumIconeP12, enumIconeSvg, IconeSvg, Icone } from '../xIcones';
import { xxPageWrapper } from './xxPageWrapper';
import { xxDockPanelDeprecated, DockPosition } from './xxDockPanel';
import { xxBoxer, enumBoxerMode } from './xxBoxer';

interface OptionViewerPDF
{
    WithBoutonTelecharger?: boolean;
    AffichagePageWrapper?: boolean;
    WithoutTitlePDF?: boolean;
}

export class xxViewerPDF implements iXElement
{
    private _Conteneur: xDiv = new xDiv();
    private _Page: xxPageWrapper;
    private _Stackmobile: xxStackPanel;
    private _divContenu: xDiv = new xDiv();
    private _bindingTitre: BindableObject<string> = new BindableObject();
    private _TabBinary: string;
    private _nameDoc: string;

 
    public get y() {
        let myThis: xxViewerPDF = this;

            return myThis._Conteneur.y;
        }

    public constructor(o: OptionViewerPDF)
    {
        let myThis: xxViewerPDF = this;
        
        // si on veux un affichage avec un xxpage
        if (o.AffichagePageWrapper)
        {
            myThis._Page = new xxPageWrapper({
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
            if (xOutils.isMobile()) 
            {
                myThis._Stackmobile = new xxStackPanel({});
                let dockTop: xxDockPanelDeprecated = new xxDockPanelDeprecated({ centrerDernier: false });
                if (o.WithBoutonTelecharger)
                {
                    dockTop.append(myThis.geneButtonDownLoad(), DockPosition.droite);
                }

                if (!o.WithoutTitlePDF)
                {
                    dockTop.append(new xxLabel({
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

        let path: string = xOutils.convertDevUrlToRelativeUrl(xClass.config.jsDependencyPath);
        pdfjsLib.GlobalWorkerOptions.workerSrc = path + 'pdf.worker.js';
    }

    public geneButtonDownLoad(): xxBouton
    {
        let myThis: xxViewerPDF = this;
        return new xxBouton({
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
        let myThis: xxViewerPDF = this;
        myThis._divContenu.vider();
        myThis._TabBinary = dataFilepdf;
        myThis._nameDoc = nompdf;

        let loadingTask = pdfjsLib.getDocument({ data: xOutils.base64ToUint8Array(dataFilepdf) });

        if (xOutils.isMobile()) {
            //// Opening PDF by passing its binary data as a string. It is still preferable
            //// to use Uint8Array, but string or array-like structure will work too.
            loadingTask.promise.then(async function (pdf: pdfjsLib.PDFDocumentProxy) {
                if (pdf.numPages > 3) {
                    myThis._bindingTitre.Value = nompdf + " (3/" + pdf.numPages + ")";

                    for (let page: number = 1; page <= 3; page++) {
                        await myThis.afficherPage(page, pdf);
                    }

                    myThis._divContenu.asHolder.append(new xxBouton({
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
            let iframepdf = new xIFrame({ id:"xxViewerFrame", src: "data:application/pdf;base64," + dataFilepdf });
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
        let mythis: xxViewerPDF = this;

        let boxer: xxBoxer = new xxBoxer({
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
        let myThis: xxViewerPDF = this;
        let page: pdfjsLib.PDFPageProxy = await pdf.getPage(numpage);

        let canvas: xCanvas = new xCanvas({});
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