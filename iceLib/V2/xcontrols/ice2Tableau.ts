import { iceElementsFramework } from '../iceElementsFramework';
import { iXElement, iXElementHolder, enumCouleur, enumPosition, Container, Dictionnaire } from '../iceBase';
import { BindableObject } from './BindableObject';
import { iceOutils, EnumLibrairieJs } from '../../iceOutils';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { ObservableCollection } from './ObservableCollection';
import { iceDiv } from './iceDiv';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2Label, enumTypeLabel, enumHabillageLabel } from './ice2Label';
import { ice2Bouton, enumTailleBouton, enumCouleurBouton, optionButton } from './ice2Bouton';
import { ice2ToolTip, enumXxToolTipPositionHeight, ice2ToolTipBouton } from './ice2ToolTip';
import { ice2ListWrapper, enumTypeTri } from './ice2ListWrapper';
import { ice2Grid, ice2GridItem } from './ice2Grid';
import { ice2Dialog, enumTypeAlerte } from './ice2Dialog';
import { xInputText } from './iceInput';
import { ice2InputNumerique } from './ice2InputNumerique';
import { Icone, enumIconeP12, enumIconeSvg, IconeP12, IconeMiniP12, IconeSvg, tailleIcone } from '../iceIcones';
import { ice2LabelContainer, enumPositionDuContenu } from './ice2LabelContainer';
import { ice2DockPanelDeprecated, DockPosition } from './ice2DockPanel';
import { iceInputTextAvecIcone } from './iceInputTextAvecIcone';
import { iceLString } from '../iceLString';
import { HelperGeneric } from '../utils/HelperGeneric';
import { assignerObjet, cachericeElements, affichericeElements } from '../../iceStaticFunctions';
import { xElementHolder } from '../../iceElement';

interface OptionsColonnes<T> {

    titleLocalise?: string;
    titleVariable?: string;
    titleClass?: string;
    tooltipTitleLocalise?: string;
    renderMethod: (place: iXElementHolder, valeur: T, element: ITableauLigneWrapperBase<T>, tab: ice2TableauWrapper<T>) => void;
    renderTitle?: (place: iXElementHolder) => void;
    greaterThan?: (a: T, b: T, TriCourant: enumTypeTri) => number;
    greaterThanGeneric?: (a: T) => string | boolean | number | DateSerialisable | Date;
    triCourant?: enumTypeTri;
    group?: (place: iXElementHolder, valeur: T) => void;
    printGroup?: (valeur: T) => string;
    print?: (valeur: T) => string | number;
    printTitleLocalise?: () => string;
    widthPdf?: number | string;
    canDeleteColumn?: boolean;
    ordreTri?: number;
    binding?: { triCourantEtOrdreBinding?: BindableObject<{ triCourant?: enumTypeTri; ordreTri?: number }> };
    onChangeTrie?: (triCourant: enumTypeTri, ordreTri?: number) => void;
    verrouTriPrincipal?: boolean; //si true le trie ne se perd pas si on clic sur une autre colonne et se trie reste le trie principal
}

export interface dicoImagesXElement {
    '*'?: string,
    page_de_garde_paysage?: string,
    page_de_garde_portrait?: string,
    page_paysage?: string,
    page_portrait?: string

}

interface OptionsTableau<T> {
    id?: string;
    class?: string;
    data: T[];
    dataContext?: ObservableCollection<T>;
    columns: OptionsColonnes<T>[];
    fixerEntetes?: boolean;
    margin?: boolean;
    pagination?: number;
    afficherTotalElements?: boolean;
    filtreTexte?: (s: string, item: T) => boolean;
    filtreTexteAsync?: (s: string, item: T) => Promise<boolean>;

    masquerZoneFiltreTexte?: boolean;
    placeHolderFiltreTexte?: string;
    sansTableauTools?: boolean;
    autoComplete?: boolean;
    clickLigne?: (l: T, lw: ITableauLigneWrapperBase<T>) => void;
    dblClickLigne?: (l: T, lw: ITableauLigneWrapperBase<T>) => void;
    titleVariable?: string;
    titleLocalise?: string;
    titleIcone?: Icone;
    titleTypeLabel?: enumTypeLabel;
    exportPDF?: {
        sousTitreLocaliseExportPdf?: string | (() => string);
        sousTitreVariableExportPdf?: string | (() => string);
        titreLocaliseExportPdf?: string | (() => string);
        titreVariableExportPdf?: string | (() => string);
        nomExportPdf?: string;
        getImagesPdf?: () => Promise<dicoImagesXElement>;
        PdfModePaysage?: boolean;
        getCartouchePdf?: () => Promise<pdfMake.DocDefinition>;
        renderBouton?: boolean;
    },
    detailLigne?: {
        renderDetailLigne?: (place: iXElementHolder, valeur: T, lw: ITableauLigneWrapperBase<T>) => void;
        afficherDetailLigne?: (valeur: T) => boolean;
        printDetailLigne?: (valeur: T) => string;
    },
    groupeGlobal?: {
        group: (place: iXElementHolder, valeur: T, valeurPrecedente: T) => void;
        greaterThan?: (a: T, b: T) => number;
        greaterThanAsync?: (a: T, b: T) => Promise<number>;
        greaterThanGeneric?: (a: T) => string | boolean | number | DateSerialisable | Date;
        printGroupeGlobal?: (valeur: T,valeurPrecedente : T) => string;
    },
    renderNoData?: (ici: iXElementHolder) => void;
    WithHeaderRenderNoData?: boolean;
    premiereColonneFixe?: boolean;
}

class ice2Colonne<T>
{
    public wrapInEntete: ice2WrapPanel;
    private _entete: HTMLTableHeaderCellElement;
    set entete(v: HTMLTableHeaderCellElement) {
        this._entete = v;
        if (this._titleClass && this._titleClass != "")
            this._entete.classList.add(this._titleClass);
    }
    get entete(): HTMLTableHeaderCellElement {
        return this._entete;
    }
    public titre: string;
    public tooltipTitleLocalise: string;
    public renderTitre?: (place: iXElementHolder, setTriPrincipal?: (colonne: ice2Colonne<T>, withTogle: boolean) => void, trierLesDonnes?: () => ice2TableauWrapper<T>) => void;
    public renderMethod: (place: iXElementHolder, valeur: T, l: ITableauLigneWrapperBase<T>, tab: ice2TableauWrapper<T>) => void;
    public greaterThan?: (a: T, b: T, TriCourant: enumTypeTri) => number;

    public group?: (place: iXElementHolder, valeur: T) => void;
    public printGroup?: (valeur: T) => string;
    public widthPdf?: string | number;
    public print?: (val: T) => string | number;
    public printTitleLocalise?: () => string;
    public canDeleteColumn: boolean;
    public changerIcone: (a: Icone) => void;
    private _titleClass: string;

    // -- data trie -- //
    public triCourantEtOrdreBinding: BindableObject<{ triCourant?: enumTypeTri; ordreTri?: number }>;
    private onChangeTrie?: (triCourant: enumTypeTri, ordreTri?: number) => void;
    private verrouTriPrincipal: boolean;

    public get IsTriable(): boolean {
        return this.greaterThan != undefined;
    }
    public get IsVerrouTriPrincipal(): boolean {
        return this.verrouTriPrincipal;
    }

    public getOrderTri(): number { return this.triCourantEtOrdreBinding.Value.ordreTri; }
    public getTypeTri(): number { return this.triCourantEtOrdreBinding.Value.triCourant; }
    public getIconeTri(): Icone {
        let mythis: ice2Colonne<T> = this;
        let toSender: Icone = new IconeP12(enumIconeP12.action_tri_defaut);

        if (mythis.triCourantEtOrdreBinding.Value.ordreTri > 0 && mythis.triCourantEtOrdreBinding.Value.ordreTri != null) {
            if (mythis.triCourantEtOrdreBinding.Value.triCourant == enumTypeTri.asc) {
                toSender = new IconeP12(mythis.triCourantEtOrdreBinding.Value.ordreTri > 1 ? enumIconeP12.action_tri_asc : enumIconeP12.action_tri_principal_asc);
            }
            else if (mythis.triCourantEtOrdreBinding.Value.triCourant == enumTypeTri.desc) {
                toSender = new IconeP12(mythis.triCourantEtOrdreBinding.Value.ordreTri > 1 ? enumIconeP12.action_tri_desc : enumIconeP12.action_tri_principal_desc);
            }
        }
        return toSender;
    }

    private _cle: number;
    get cle(): number {
        return this._cle;
    }
    private static compteurUniverselColonnes: number = 0;
    private static getUniqueColumn(): number {
        ice2Colonne.compteurUniverselColonnes++;
        return ice2Colonne.compteurUniverselColonnes;

    }


    constructor(inOptions: OptionsColonnes<T>) {
        let mythis: ice2Colonne<T> = this;
        if (inOptions.titleLocalise != undefined) {
            mythis.titre = new iceLString(inOptions.titleLocalise).text;
        }
        else {
            if (inOptions.titleVariable != undefined) {
                mythis.titre = inOptions.titleVariable;
            }
            else if (inOptions.renderTitle != undefined) {
                mythis.titre = "";
            }
            else { alert('you have to set either titleLocalise either titleVariable for each column'); }
        }
        if (inOptions.verrouTriPrincipal !== undefined)
            mythis.verrouTriPrincipal = inOptions.verrouTriPrincipal;
        mythis.renderMethod = inOptions.renderMethod;
        if (inOptions.greaterThanGeneric !== undefined) {
            mythis.greaterThan = (a, b) => {
                return HelperGeneric.CompareGeneric(inOptions.greaterThanGeneric(a), inOptions.greaterThanGeneric(b));
            }
        }
        else
            mythis.greaterThan = inOptions.greaterThan;
        mythis.group = inOptions.group;
        mythis.printGroup = inOptions.printGroup;
        mythis.widthPdf = inOptions.widthPdf;
        mythis._cle = ice2Colonne.getUniqueColumn();
        mythis.print = inOptions.print;

        // --- Tri colonne --- //
        mythis.onChangeTrie = inOptions.onChangeTrie;
        let triCourantTemp: enumTypeTri;
        if (inOptions.binding != null && inOptions.binding.triCourantEtOrdreBinding != null) {
            mythis.triCourantEtOrdreBinding = inOptions.binding.triCourantEtOrdreBinding;
        }
        else {
            mythis.triCourantEtOrdreBinding = new BindableObject<{ triCourant: enumTypeTri; ordreTri: number }>({
                ordreTri: inOptions.ordreTri,
                triCourant: inOptions.triCourant
            });
        }
        triCourantTemp = mythis.triCourantEtOrdreBinding.Value.triCourant;
        //si aucun tri renseigné on met aucun 
        if (triCourantTemp == undefined)
            triCourantTemp = enumTypeTri.aucun;
        // mais dans le cas ou la colonne fait partie d'un tri initial on met le tri en mode asc si il n'est pas renseigné'
        if (mythis.getOrderTri() != undefined && mythis.IsTriable && triCourantTemp == enumTypeTri.aucun) {
            triCourantTemp = enumTypeTri.asc;
        }

        mythis.triCourantEtOrdreBinding.Value.triCourant = triCourantTemp; // n'active pas l'evenement du binding vu que je change une donnee dans l'objet du bind

        // --- binding --- //
        mythis.triCourantEtOrdreBinding.bind((Value) => {
            /* Trie change */
            if (mythis.onChangeTrie != undefined)
                mythis.onChangeTrie(Value.triCourant, Value.ordreTri);

            mythis.changerIcone(mythis.getIconeTri());
        });


        mythis.canDeleteColumn = inOptions.canDeleteColumn;
        mythis._titleClass = inOptions.titleClass || "";
        mythis.renderTitre = inOptions.renderTitle;
        mythis.tooltipTitleLocalise = inOptions.tooltipTitleLocalise;

        mythis.printTitleLocalise = inOptions.printTitleLocalise;

        //par defaut canDeleteColumn=false
        if (mythis.canDeleteColumn == undefined) {
            mythis.canDeleteColumn = false;
        }

        if (mythis.getOrderTri() != undefined && !this.IsTriable) { alert("pour développeur: vous ne pouvez pas effectuer de tri par défaut sur cette colonne si aucune fonction de tri (greaterThan) n'y est définie"); }
    }
}
class ice2TableauHelper
{

    public static rechercheString(valeur1: string, valeur2: string[]): boolean {
        if (valeur1 != null && valeur1 != "") {
            let valOu = valeur1.split(' ');
            valOu = valOu.filter(s => { return s.length > 0 });

            return valOu.some(el => {
                let valEt = el.split('+');
                return iceOutils.rechercheStringTous(valEt, valeur2);
            });
        }

        return true;
    }
}

interface ITableauLigneWrapperBase<T> {
    toggleClass(c: string): void;
    ajouterClasse(c: string): void;
    supprimerClasse(c: string): void;
    refresh(sourceObjetAAssigner?: T): void;
    afficherDetail(): void;
    masquerDetail(): void;
    togleDetail(): void;
    containsClasse(c: string): boolean;
    // TODO afficher masquer detail 


}

class ice2TableauLigneWrapper<T> implements ITableauLigneWrapperBase<T> {

    constructor(inItem: ice2TableauItem<T>) {
        this.item = inItem;
    }

    private item: ice2TableauItem<T>;
    /**
     * permet de permuter la présence d'une classe sur la ligne en cours
     * @param c
     */
    public toggleClass(c: string) {
        this.item.ligne.classList.toggle(c);
    }
    /**
    * permet d'ajouter une classe sur la ligne en cours
    * @param c
    */

    public ajouterClasse(c: string): void {
        this.item.ligne.classList.add(c);
    }
    /**
     * permet de supprimer une classe sur la ligne en cours
     * @param c
     */

    public supprimerClasse(c: string): void {
        this.item.ligne.classList.remove(c);
    }

    public refresh(sourceObjetAAssigner?: T): void {
        this.item.rendered = false;
        this.item.Detailrendered = false;

        if (sourceObjetAAssigner !== undefined) {
            if (sourceObjetAAssigner != null)
                assignerObjet(this.item.donnee, sourceObjetAAssigner);
            else
                this.item.supprimerElement();
        }

        this.item.render();
        if (this.item.ligneDetail != null && !this.item.ligneDetail.hidden)
            this.item.renderDetail();
    }

    public afficherDetail(): void {
        let myThis: ice2TableauLigneWrapper<T> = this;
        if (myThis.item.ligneDetail != null) {
            if (!myThis.item.Detailrendered)
                myThis.item.renderDetail();
            myThis.item.ligneDetail.hidden = false;
        }
    }

    public masquerDetail(): void {
        let myThis: ice2TableauLigneWrapper<T> = this;
        if (myThis.item.ligneDetail != null) {
            myThis.item.ligneDetail.hidden = true;
        }
    }

    public togleDetail(): void {
        let myThis: ice2TableauLigneWrapper<T> = this;
        if (myThis.item.ligneDetail != null) {
            if (myThis.item.ligneDetail.hidden) {
                if (!myThis.item.Detailrendered)
                    myThis.item.renderDetail();
                myThis.item.ligneDetail.hidden = false;
            }
            else
                myThis.item.ligneDetail.hidden = true;
        }
    }

    public containsClasse(classeCss: string): boolean {
        return this.item.ligne.classList.contains(classeCss);
    }
}
export class ice2TableauWrapper<T> implements iXElement {
    private renderNoData: (ici: iXElementHolder) => void;
    private getImagesPdf: () => Promise<dicoImagesXElement>;
    private getCartouchePdf: () => Promise<pdfMake.DocDefinition>;
    private PdfModePaysage: boolean;
    private divPrincipal: iceDiv;
    private footerTableau: iceDiv;
    private placeInfoNoData: iXElementHolder;
    private placeInfoLoading: iXElementHolder;

    //   private placeCompteurPagination: ice2Label;
    //   private placeTotalPage: ice2Label;
    private compteurComplet: ice2Label;
    private monTableau: HTMLTableElement;
    private ligneEntete: HTMLTableRowElement;
    private mesItemsTous: ice2TableauItem<T>[] = [];
    private mesItemsFiltres: ice2TableauItem<T>[] = [];
    private debutAffichage: number = 0;
    private pagination: number = -1;
    private colonneTri: ice2Colonne<T>[] = [];
    private filtreEnCours: string = "";
    private filtreTexte?: (s: string, item: T) => Promise<boolean>;
    private placeHolderFiltreTexte?: string;
    private autocomplete: boolean = false;
    //    private exportPDF: boolean = false;
    private nomExportPdf: string = "";
    private titre: string = "";
    private icone: Icone;
    private masquerZoneFiltreTexte: boolean;
    private sansTableauTools: boolean;
    private clickLigne: (l: T, lw: ice2TableauLigneWrapper<T>) => void;
    private dblClickLigne: (l: T, lw: ice2TableauLigneWrapper<T>) => void;
    public mesColonnes: ice2Colonne<T>[] = [];
    private dockBoutonHeader: ice2DockPanelDeprecated;
    //   private _classTitle: string;
    private labelCompteur: ice2Label;
    private afficherTotalElements: boolean;
    private inputFiltre: iceInputTextAvecIcone;
    private hasGroupGlobal: boolean;
    private groupGlobal: (place: iXElementHolder, valeur: T, valeurPre: T) => void;
    private greaterThanGlobal: (a: T, b: T) => Promise<number>;
    private printGroupeGlobal: (valeur: T,valeurPrecedente:T) => string;
    public dataContext: ObservableCollection<T>;
    private fixerEntetes: boolean;
    private sousTitrePDf: string | (() => string);
    private titrePDF: string | (() => string);
    private margin: boolean;
    private classCss: string;

    private renderDetailLigne: (place: iXElementHolder, valeur: T, lw: ice2TableauLigneWrapper<T>) => void;
    private printDetailLigne: (valeur: T) => string;
    private afficherDetailLigne: (valeur: T) => boolean;
    private _ligneSelectionne: ice2TableauLigneWrapper<T>;


    public getColonnes(): ice2Colonne<T>[] {
        return this.mesColonnes;
    }

    private renderLoading() {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.divPrincipal.addClass('LoadingMode');
        myThis.placeInfoLoading.append(new ice2Label({ textLocalise: 'Chargement en cours', type: enumTypeLabel.information, habillage: enumHabillageLabel.loading }));
    }
    private resetLoading() {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.placeInfoLoading.empty();
        myThis.divPrincipal.removeClass('LoadingMode');

    }

    private resetNoData() {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.placeInfoNoData.empty();
        myThis.divPrincipal.removeClass('NoDataWithHeader');
        myThis.divPrincipal.removeClass('NoDataWithoutHeader');


    }

    constructor(inOptions: OptionsTableau<T>) {
        let myThis: ice2TableauWrapper<T> = this;
        // lecture des options
        if (inOptions.class != undefined)
            myThis.classCss = " " + inOptions.class;
        else
            myThis.classCss = "";

        if (inOptions.dataContext == undefined) {
            myThis.dataContext = new ObservableCollection<T>();
        }
        else {
            myThis.dataContext = inOptions.dataContext;
        }

        if (inOptions.titleTypeLabel == undefined) {
            inOptions.titleTypeLabel = enumTypeLabel.titre;
        }

        if (inOptions.renderNoData == undefined) {
            if (inOptions.WithHeaderRenderNoData == null)
                inOptions.WithHeaderRenderNoData = true;

            myThis.renderNoData = (ici) => {
                myThis.divPrincipal.addClass(inOptions.WithHeaderRenderNoData ? 'NoDataWithHeader' : 'NoDataWithoutHeader');
                ici.append(new ice2Label({ textLocalise: 'Aucune donnée présente dans le tableau.', type: enumTypeLabel.information }));
            }
        }
        else {
            if (inOptions.WithHeaderRenderNoData == null)
                inOptions.WithHeaderRenderNoData = false;

            myThis.renderNoData = (ici) => {
                myThis.divPrincipal.addClass(inOptions.WithHeaderRenderNoData ? 'NoDataWithHeader' : 'NoDataWithoutHeader');
                inOptions.renderNoData(ici)
            };
        }
            
        myThis.dataContext.bind(
            (t: T[]) => { myThis.addDatas(t); },
            (t: T[]) => { myThis.delDatas(t); }
        );

        myThis.fixerEntetes = inOptions.fixerEntetes;
        if (myThis.fixerEntetes == undefined) { myThis.fixerEntetes = true; }

        myThis.margin = inOptions.margin;
        if (myThis.margin == undefined) {
            myThis.margin = false;
        }

        if (inOptions.groupeGlobal != undefined) {
            myThis.hasGroupGlobal = true;
            myThis.groupGlobal = inOptions.groupeGlobal.group;
            if (inOptions.groupeGlobal.greaterThanGeneric != undefined) {
                myThis.greaterThanGlobal = (a, b) => {
                    return new Promise<number>(ok => ok(HelperGeneric.CompareGeneric(inOptions.groupeGlobal.greaterThanGeneric(a), inOptions.groupeGlobal.greaterThanGeneric(b))));
                }
            }
            else {
                if (inOptions.groupeGlobal.greaterThanAsync) {
                    myThis.greaterThanGlobal = (a, b) => inOptions.groupeGlobal.greaterThanAsync(a, b);
                }
                else {
                    myThis.greaterThanGlobal = (a, b) => new Promise<number>(ok => ok(inOptions.groupeGlobal.greaterThan(a, b)));
                }

            }


            if (inOptions.groupeGlobal.printGroupeGlobal != undefined) {
                myThis.printGroupeGlobal = inOptions.groupeGlobal.printGroupeGlobal;
            }
        }

        if (inOptions.detailLigne != undefined) {
            myThis.renderDetailLigne = inOptions.detailLigne.renderDetailLigne;
            myThis.printDetailLigne = inOptions.detailLigne.printDetailLigne;
            myThis.afficherDetailLigne = inOptions.detailLigne.afficherDetailLigne;

        }


        if (inOptions.exportPDF != undefined) {
            //   myThis.exportPDF = true
            myThis.getImagesPdf = inOptions.exportPDF.getImagesPdf;
            myThis.getCartouchePdf = inOptions.exportPDF.getCartouchePdf;
            myThis.PdfModePaysage = inOptions.exportPDF.PdfModePaysage;
            if (myThis.PdfModePaysage == undefined)
                myThis.PdfModePaysage = true;

            myThis.nomExportPdf = inOptions.exportPDF.nomExportPdf;
            if (inOptions.exportPDF.sousTitreLocaliseExportPdf != undefined) {
                if (typeof inOptions.exportPDF.sousTitreLocaliseExportPdf === "string")
                    myThis.sousTitrePDf = new iceLString(inOptions.exportPDF.sousTitreLocaliseExportPdf).text;
                else
                    myThis.sousTitrePDf = inOptions.exportPDF.sousTitreLocaliseExportPdf;
            }
            else if (inOptions.exportPDF.sousTitreVariableExportPdf != undefined)
                myThis.sousTitrePDf = inOptions.exportPDF.sousTitreVariableExportPdf;
            else
                myThis.sousTitrePDf = "";

            if (inOptions.exportPDF.titreLocaliseExportPdf != undefined) {
                if (typeof inOptions.exportPDF.titreLocaliseExportPdf === "string")
                    myThis.titrePDF = new iceLString(inOptions.exportPDF.titreLocaliseExportPdf).text;
                else
                    myThis.titrePDF = inOptions.exportPDF.titreLocaliseExportPdf;
            }
            else if (inOptions.exportPDF.titreVariableExportPdf != undefined)
                myThis.titrePDF = inOptions.exportPDF.titreVariableExportPdf;
            else
                myThis.titrePDF = "";

        } //else
        //  myThis.exportPDF = false

        myThis.afficherTotalElements = inOptions.afficherTotalElements;
        // myThis.maPage = inOptions.page;
        myThis.masquerZoneFiltreTexte = inOptions.masquerZoneFiltreTexte;
        myThis.sansTableauTools = inOptions.sansTableauTools;
        if (inOptions.filtreTexteAsync != undefined) {
            myThis.filtreTexte = inOptions.filtreTexteAsync;
        }
        else if (inOptions.filtreTexte) {
            myThis.filtreTexte = (s: string, o: T) => { return new Promise<boolean>(ok => { ok(inOptions.filtreTexte(s, o)) }); }
        }
        myThis.pagination = inOptions.pagination;
        myThis.autocomplete = inOptions.autoComplete == true;
        myThis.clickLigne = inOptions.clickLigne;
        myThis.dblClickLigne = inOptions.dblClickLigne;
        myThis.titre = inOptions.titleVariable;
        myThis.icone = inOptions.titleIcone;

        if (inOptions.titleLocalise != undefined) {
            myThis.titre = new iceLString(inOptions.titleLocalise).text;
            if (inOptions.exportPDF != undefined && inOptions.exportPDF.titreLocaliseExportPdf == undefined)
                myThis.titrePDF = myThis.titre;
        }

        //initialisation des options undefined
        if (myThis.nomExportPdf == undefined || myThis.nomExportPdf.length == 0) {
            let maintenant: DateSerialisable = DateSerialisable.Now();

            let str: string = "exportTableau";
            str += DateSerialisable.getJours(maintenant) + '-' + (DateSerialisable.getMois(maintenant) + 1) + '-' + DateSerialisable.getAnnees( maintenant) + '.pdf'; //str += maintenant.getDate() + '-' + (maintenant.getMonth() + 1) + '-' + maintenant.getFullYear() + '.pdf'; 
            myThis.nomExportPdf = str;
        }


        //si il n'y a pas de filtre je n'affiche jamais la zone de recherche
        if (myThis.filtreTexte == undefined) { myThis.masquerZoneFiltreTexte = true; }

        if (myThis.masquerZoneFiltreTexte == undefined) { myThis.masquerZoneFiltreTexte = false; }

        if (myThis.sansTableauTools == undefined) { myThis.sansTableauTools = false; }

        /*
        * ice2Tableau est composé de 3 grandes zones : une entete / le tableau ( avec l'entête de tableau) / un footer
        *
        */
        myThis.divPrincipal = new iceDiv();
        myThis.divPrincipal.addClass("ice2TableauDivPrincipal");
        if (myThis.classCss)
            myThis.divPrincipal.addClass(myThis.classCss.trim());
        if (inOptions.detailLigne != undefined) {

            myThis.divPrincipal.addClass("ice2Tableau_avecLignesDepliables");
        }
        if (myThis.margin == true) {
            myThis.divPrincipal.addClass("AvecMarge");
        }

        let tableauHeader: Container<ice2DockPanelDeprecated> = new Container<ice2DockPanelDeprecated>();

        //ici j'ajoute ma zone d'entête globale

        // if (!myThis.sansTableauTools) {
        myThis.divPrincipal.asHolder.ice2DockPanelDeprecated({ class: !myThis.sansTableauTools ? 'ice2TableauTools' : 'ice2TableauTools maskey', centrerDernier: false }, tableauHeader);
        // }

        if (myThis.titre != null) //Si le tableau a un titre
        {
            if (myThis.icone != null) { //Si le tableau a aussi une icone
                tableauHeader.content.append(new ice2LabelContainer({
                    class: 'ice2Tableau-LC_title',
                    textVariable: myThis.titre,
                    type: inOptions.titleTypeLabel,
                    labelLargeurLibre: true,
                    optionsAffichage: { positionDuContenu: enumPositionDuContenu.gauche },
                    initContent: myThis.icone
                }), DockPosition.gauche);
            }
            else { //titre sans icone
                tableauHeader.content.append(new ice2Label({ textVariable: myThis.titre, type: inOptions.titleTypeLabel }), DockPosition.gauche);
            }
        }
        else if (myThis.icone != null) //Si le tableau a une icone mais pas de titre
        {
            tableauHeader.content.append(myThis.icone, DockPosition.gauche);
        }

		myThis.dockBoutonHeader = new ice2DockPanelDeprecated({});
		myThis.labelCompteur = new ice2Label({ textVariable: '0' });
		if (myThis.afficherTotalElements)
		{
            tableauHeader.content.append(new ice2LabelContainer({ class: 'compteurElements', textLocalise: 'élément(s)', optionsAffichage: { positionDuContenu: enumPositionDuContenu.gauche, margin: { Droite : 10 } }, initContent: myThis.labelCompteur, labelLargeurLibre:true, }), DockPosition.gauche);
		}

        tableauHeader.content.append(myThis.dockBoutonHeader, DockPosition.droite);

        let renderBouton: boolean = false;
        if (inOptions.exportPDF != undefined) {

            if (inOptions.exportPDF.renderBouton != undefined) {
                renderBouton = inOptions.exportPDF.renderBouton;
            }
            else {
                renderBouton = true;
            }
        }

        if (renderBouton) {
            myThis.ajouterElement(
                new ice2Bouton({
                    titleLocalise: 'Export PDF',
                    icone: new IconeP12(enumIconeP12.action_pdf, { taille: tailleIcone.S }),
                    optionsAffichage: {
                        margin: { HautEtBas: 0, GaucheEtDroite: 5 }, tailleBouton: enumTailleBouton.Fit
                    },
                    click: function (cb) {
                        myThis.exporterPDF(cb);
                    }
                }), DockPosition.droite);

            myThis.ajouterElement(new ice2Bouton({
                titleLocalise: 'Export EXCEL',
                icone: new IconeP12(enumIconeP12.action_xls, { taille: tailleIcone.S }),
                optionsAffichage: { margin: { HautEtBas: 0, GaucheEtDroite: 5 }, tailleBouton: enumTailleBouton.Fit },
                click: function (cb) { myThis.exporterExcel(); cb(); }
            }), DockPosition.droite);
        }

        if (!myThis.masquerZoneFiltreTexte) {


            myThis.placeHolderFiltreTexte = inOptions.placeHolderFiltreTexte;
            if (myThis.placeHolderFiltreTexte == undefined) { myThis.placeHolderFiltreTexte = 'Rechercher' }

            myThis.inputFiltre = new iceInputTextAvecIcone({
                placeHolderlocalise: myThis.placeHolderFiltreTexte,
                id:"inputFiltreice2Tableau",
                class: 'saisie',
                icone: enumIconeSvg.recherche,
                champLarge: true,
                KeyUpEnterCallback: function (val: string) {
                    myThis.filtreEnCours = val;
                    myThis.filtrerParTexte();
                },
                autoChange: myThis.autocomplete,
                ValueChange: function (val: string) {
                    myThis.filtreEnCours = val;
                    myThis.filtrerParTexte();
                }
            });


            tableauHeader.content.append(new ice2LabelContainer({
                initContent: myThis.inputFiltre,
                class: "xtbl-zone_recherche",
            }), DockPosition.droite);



        }

        //création d'un tableau avec un header
        myThis.monTableau = document.createElement('table');
        if (inOptions.id != undefined) { myThis.monTableau.id = inOptions.id; }
        myThis.monTableau.classList.add("ice2Tableau");
        if (myThis.fixerEntetes) { myThis.monTableau.classList.add("fixed_headers"); }
        if (inOptions.premiereColonneFixe) { myThis.monTableau.classList.add("premiereColonneFixe"); }

        myThis.ligneEntete = myThis.monTableau.insertRow(0);
        myThis.ligneEntete.classList.add("ice2TableauHeader");
        //ajout du tableau pour définir la deuxième zone

        myThis.divPrincipal.asHolder.y.append(myThis.monTableau);
        myThis.placeInfoNoData = new iceDiv({ class: 'divCentreNoData' }).asHolder;

        myThis.placeInfoLoading = new iceDiv({ class: 'divCentreDataLoading' }).asHolder;


        myThis.divPrincipal.asHolder.append(myThis.placeInfoNoData);
        myThis.divPrincipal.asHolder.append(myThis.placeInfoLoading);


        //cration du footer comme 3ème zone
        myThis.footerTableau = new iceDiv({ class: 'footerTableau' });
        myThis.divPrincipal.asHolder.append(myThis.footerTableau);


        let infosPagination: Container<iceDiv> = new Container<iceDiv>();
        //       myThis.placeCompteurPagination = new ice2Label({textVariable:''});
        //       myThis.placeTotalPage = new ice2Label({ textVariable: '' });


        if (myThis.pagination > 0) {

            myThis.compteurComplet = new ice2Label({ textVariable: '' });
            myThis.footerTableau.asHolder
                .append(new ice2Bouton({ icone: new IconeMiniP12(enumIconeP12.action_fleche_double_gauche), optionsAffichage: { tailleBouton: enumTailleBouton.Fit }, titleLocalise: 'première page', click: function (cb) { myThis.setPagination(0); cb(); } }))
                .append(new ice2Bouton({ icone: new IconeMiniP12(enumIconeP12.action_fleche_simple_gauche), optionsAffichage: { tailleBouton: enumTailleBouton.Fit }, titleLocalise: 'page précédente', click: function (cb) { myThis.setPagePrecedente(); cb() } }))
                .xdiv({ class: 'infosPagination' }, infosPagination)
                .append(new ice2Bouton({ icone: new IconeMiniP12(enumIconeP12.action_fleche_simple_droite), optionsAffichage: { tailleBouton: enumTailleBouton.Fit }, titleLocalise: 'page suivante', click: function (cb) { myThis.setPageSuivante(); cb(); } }))
                .append(new ice2Bouton({ icone: new IconeMiniP12(enumIconeP12.action_fleche_double_droite), optionsAffichage: { tailleBouton: enumTailleBouton.Fit }, titleLocalise: 'dernière page', click: function (cb) { myThis.setPaginationMax(); cb(); } }));
            infosPagination.content.asHolder
                .append(myThis.compteurComplet);
            /*
                .ice2LabelContainer({ textLocalise: 'Page', labelLargeurLibre:true, initContent: myThis.placeCompteurPagination })
                .ice2LabelContainer({ textLocalise: '/', initContent: myThis.placeTotalPage });
                */
            myThis.setPagination(0);
        }
        else { myThis.masquerPagination(); }



        //je transforme les options de colonne en classe colonne pour gérer la clé
        inOptions.columns.forEach(function (c: OptionsColonnes<T>) {
            let nvlCol: ice2Colonne<T> = new ice2Colonne<T>(c);
            myThis.ajouterColonneNoData(nvlCol);
        });

        //si l'observable Collection contenanit déja des données:on les ajoute au tableau

        myThis.addDatas(myThis.dataContext.All());

        //pour les données d'init (dans options.data) je les ajoute comme si c'était un ajout dynamique
        myThis.dataContext.add(inOptions.data);

        //n ne garde que les colonnes qui ont une valeur ordreTri>0 et on les tri
        //myThis.colonneTri

        myThis.initTri();
    }

    private initTri() {
        let myThis: ice2TableauWrapper<T> = this;
        let tempTri: ice2Colonne<T>[] = myThis.mesColonnes
            .filter(function (c: ice2Colonne<T>) { return c.getOrderTri() != undefined && c.getOrderTri() > 0; })
            .sort(function (c1: ice2Colonne<T>, c2: ice2Colonne<T>) { return c1.getOrderTri() - c2.getOrderTri(); }
            )

        tempTri.forEach(
            function (col: ice2Colonne<T>, idx: number) {
                if (idx == 0) {
                    myThis.setTriPrincipal(tempTri[idx], false);
                }
                else {
                    myThis.addTriSupplementaire(tempTri[idx], false);
                }
            });

        myThis.trierlesDonnees();
    }

    public fakeClic(val: T) {
        let myThis: ice2TableauWrapper<T> = this;
        if (myThis.clickLigne != undefined) {
            let maLigne = myThis.getLigneByValue(val);
            if (maLigne != undefined) {
                myThis.clickLigne(val, maLigne);
            }

        }
    }

    public setLoadingPromise(p: Promise<void>) {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.renderLoading();
        p.then(() => {
            myThis.resetLoading();
        }, () => {
            myThis.resetLoading();
        });
    }

    public fakedblClic(val: T) {
        let myThis: ice2TableauWrapper<T> = this;
        if (myThis.dblClickLigne != undefined) {
            let maLigne = myThis.getLigneByValue(val);
            if (maLigne != undefined) {
                myThis.dblClickLigne(val, maLigne);
            }

        }
    }

    public getDatasFiltres(): T[] {
        let tableau: T[] = [];

        this.mesItemsFiltres.forEach(function (t) {
            tableau.push(t.donnee);
        })

        return tableau;
    }

    public setFiltre(str: string): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        if (myThis.inputFiltre != undefined) {
            myThis.inputFiltre.setValue(str);
        }
        return myThis;
    }

    public getFiltre(): string {
        let myThis: ice2TableauWrapper<T> = this;
        return myThis.filtreEnCours;
    }

    public async exporterExcel() {
        let myThis: ice2TableauWrapper<T> = this;
        let fic: string = myThis.nomExportPdf.replace(".pdf", "");
        fic += ".xlsx";
        let wb = await this.genererworksheetDonneeFichierXLSX();
        const wbout = XLSX.writeFile(wb, fic, { WTF: true });
    }

    public async exporterFichierExcel(): Promise<string[]> {
        let myThis: ice2TableauWrapper<T> = this;
        let fic: string = myThis.nomExportPdf.replace(".pdf", ".xlsx");


        let wb = await this.genererworksheetDonneeFichierXLSX();
        //const wbout = XLSX.writeFile(wb, fic, { WTF: true });

        var fichierdata = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'base64' });

        let ret: string[];
        ret = [];
        ret.push(fic);
        ret.push(fichierdata);

        return ret;
    }

    private async genererworksheetDonneeFichierXLSX() {
        let myThis: ice2TableauWrapper<T> = this;
        let fic: string = myThis.nomExportPdf.replace(".pdf", "");
        fic += ".xlsx";
        let titreOnglet = myThis.titre != undefined ? myThis.titre : "1";

        let enteteColonnes: string[] = [];
        let colonnesImprimables = myThis.mesColonnes.filter(function (c: ice2Colonne<T>) { return c.print != undefined; })


        enteteColonnes = colonnesImprimables.map((col) => {
            if (col.printTitleLocalise != undefined)
                return col.printTitleLocalise();
            else
                return col.titre;
        })

        let withGroup: boolean = false;

        //dois-je afficher des groupes ?

        let donneesEtEntetes: string[][] = [enteteColonnes];  //a row with 2 columns
        let itemPrecedent: ice2TableauItem<T> = null;
        await myThis.mesItemsFiltres.forEach(async function (item: ice2TableauItem<T>, i) {
            let uneLigne: string[] = [];
            let uneLigneGroup: string[] = [];
            let uneLigneGroupGlobal: string[] = [];
            let uneLigneDetail: string[] = [];

            if (myThis.hasGroupGlobal) {
                if (myThis.printGroupeGlobal != undefined) {
                    if (i != 0) {
                        let diff = await myThis.greaterThanGlobal(item.donnee, myThis.mesItemsFiltres[i - 1].donnee);

                        if (diff != 0)
                            uneLigneGroupGlobal.push(myThis.printGroupeGlobal(item.donnee, myThis.mesItemsFiltres[i - 1].donnee));

                    } else // Si i == 0
                        uneLigneGroupGlobal.push(myThis.printGroupeGlobal(item.donnee,null));
                }
            }

            colonnesImprimables.forEach(async (col: ice2Colonne<T>, i: number) => {
                if (col != undefined) {
                    if (col != undefined) { withGroup = true; }
                }

                if (withGroup) {
                    if ((itemPrecedent == null || (myThis.colonneTri[0] != undefined && myThis.colonneTri[0].greaterThan(item.donnee, itemPrecedent.donnee, myThis.colonneTri[0].getTypeTri()) != 0))) {
                        if (col.printGroup != undefined) {
                            uneLigneGroup.push(myThis.colonneTri[0].printGroup(item.donnee));
                        }
                    }
                }

                uneLigne.push(col.print(item.donnee)?.toString());

                if (myThis.printDetailLigne != null && i == 0) {
                    uneLigneDetail.push(myThis.printDetailLigne(item.donnee));
                }
            });

            itemPrecedent = item;
            if (uneLigneGroupGlobal.length > 0)
                donneesEtEntetes.push(uneLigneGroupGlobal);

            if (uneLigneGroup.length > 0)
                donneesEtEntetes.push(uneLigneGroup);


            donneesEtEntetes.push(uneLigne);

            if (myThis.printDetailLigne != null) {
                donneesEtEntetes.push(uneLigneDetail)
            }
        })
        /* generate worksheet */
        let ws = XLSX.utils.aoa_to_sheet(donneesEtEntetes);

        let wb = XLSX.utils.book_new();
        const sheetName = "sheet1";
        wb.SheetNames.push(sheetName);
        wb.Sheets[sheetName] = ws;

        return wb;
    }

    public exporterCSV() {
        let myThis: ice2TableauWrapper<T> = this;
        let tableauDonnees: string[] = [];
        let enteteColonnes: string[] = [];
        let colonnesImprimables = myThis.mesColonnes.filter(function (c: ice2Colonne<T>) { return c.print != undefined; })

        let prepareData = (s: string) => {
            if (s == null)
                return null;

            s = s.split('\r').join(' ');
            s = s.split('\n').join(' ');

            iceOutils.replaceAll(s, '"', '');
            s = '"' + s + '"';
            return s;
        };


        colonnesImprimables.forEach(function (col: ice2Colonne<T>) { enteteColonnes.push(prepareData(col.titre)) });
        tableauDonnees.push(enteteColonnes.join(";") + String.fromCharCode(13) + String.fromCharCode(10));

        myThis.mesItemsFiltres.forEach(function (item: ice2TableauItem<T>) {
            let tableauAffiche: string[] = [];

            colonnesImprimables.forEach(function (col: ice2Colonne<T>) { tableauAffiche.push(prepareData(col.print(item.donnee).toString())); });

            tableauDonnees.push(tableauAffiche.join(";") + String.fromCharCode(13) + String.fromCharCode(10));
        });

        let blob = new Blob(tableauDonnees, {
            //type: "application/vnd.ms-excel;charset=charset=utf-8"
            type: 'application/xml;charset=utf-8;encoding=utf8;',
        });

        let fic: string = myThis.nomExportPdf.replace(".pdf", "");
        fic += ".csv";
        saveAs(blob, fic);

    }

    private getImagesPdfWrapper(): Promise<dicoImagesXElement> {
        let myThis: ice2TableauWrapper<T> = this;
        //si la méthode statique est surchargée on l'utilise'
        if (myThis.getImagesPdf != undefined) {
            return myThis.getImagesPdf();
        }
        else {

            if (iceElementsFramework.getImages != undefined) {
                return iceElementsFramework.getImages();
            }
            else {
                return new Promise<dicoImagesXElement>(function (ok, nok) {
                    var vide: dicoImagesXElement = {};
                    ok(vide);
                });
            }
        }
    }

    private getCartouchePdfWrapper(): Promise<pdfMake.DocDefinition> {
        let myThis: ice2TableauWrapper<T> = this;
        //si la méthode statique est surchargée on l'utilise'
        if (myThis.getCartouchePdf != undefined) {
            return myThis.getCartouchePdf();
        }
        else {
            return new Promise<pdfMake.DocDefinition>(function (ok, nok) {
                let vide: pdfMake.DocDefinition = undefined;
                ok(vide);
            })
        }

    }
    /**
     * permet de récupérer une ligne wrapper correspondant à une donnéee du tableau
     * @param o
     */
    public getLigneByValue(o: T): ice2TableauLigneWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        let retour: ice2TableauItem<T>;
        myThis.mesItemsTous.forEach(
            function (i: ice2TableauItem<T>) {
                if (o == i.donnee) { retour = i; }
            }
        )

        return new ice2TableauLigneWrapper<T>(retour);

    }

    public async exporterPDF(cb: () => void) {

        await iceOutils.inclureLibrairie(EnumLibrairieJs.pdfMake);

        let myThis: ice2TableauWrapper<T> = this;
        let docDefinition: pdfMake.DocDefinition;
        let orientation: 'portrait' | 'landscape' = 'portrait';

        let itemPrecedent: ice2TableauItem<T> = null;
        let widthBackground: number;
        let widthpage: number;
        let marginAjuste: number;

        let withGroup: boolean = false;





        if (myThis.PdfModePaysage) { orientation = 'landscape'; widthBackground = 842; widthpage = 842; marginAjuste = 80; } else { widthBackground = 595; widthpage = 594; marginAjuste = 50 }

        docDefinition = {
            pageOrientation: orientation,
            footer: function (currentPage, pageCount) {
                return {
                    style: 'footer',
                    columns: [
                        { text: currentPage.toString() + ' / ' + pageCount, width: (widthpage / 2) - marginAjuste },
                        { text: new iceLString("Edité le {0}").format([DateSerialisable.ToStringDateHeure(DateSerialisable.Now())]), width: (widthpage / 2) + marginAjuste } //iceOutils.DateToFrenchDateString(new Date(), true, false)])
                    ]
                };
            },
            header: [],
            pageMargins: [14, 65, 14, 40],
            content: [{ table: { body: [[]] } }],
            styles: {
                marghearder: {
                    margin: [62, 10, 14, 0]
                },
                logoHeader: {
                    alignment: 'right'
                },
                titreHeader:
                {
                    fontSize: 18,
                    bold: true,
                    alignment: 'left',
                    margin: [0, 1, 0, 0],
                },
                sousTitreHeader: {
                    fontSize: 12,
                    margin: [0, 8, 0, 0],
                    alignment: 'left'
                },
                footer: {
                    fontSize: 12,
                    alignment: 'left',
                    margin: [14, 10, 0, 0]
                }
            }
        };


        let mesImages: dicoImagesXElement = await myThis.getImagesPdfWrapper();

        (<pdfMake.pdfMakeElement[]>docDefinition.header).push({
            style: 'marghearder',
            columns:
                [
                    [
                        { text: typeof myThis.sousTitrePDf === "string" ? myThis.sousTitrePDf : myThis.sousTitrePDf(), width: widthpage / 2, color: '#5692ae', style: "sousTitreHeader" },
                        { text: typeof myThis.titrePDF === "string" ? myThis.titrePDF : myThis.titrePDF(), width: widthpage / 2, color: '#5692ae', style: "titreHeader" }
                    ],
                    mesImages["*"] != undefined ? { image: 'data:image/png;base64, ' + mesImages["*"], fit: [widthpage / 2, 40], style: 'logoHeader' } : { text: "" },
                ]
        });


        docDefinition.background = function (currentPage) {
            let img: string = myThis.getBackgroundImage(mesImages, myThis.PdfModePaysage, currentPage);
            if (img != undefined && img != null) {
                return { image: 'data:image/png;base64, ' + img, width: widthBackground }
            }
            else {
                return null;
            }
        }


        let cartouche: pdfMake.DocDefinition = await myThis.getCartouchePdfWrapper();
        if (cartouche != undefined) {
            (<pdfMake.pdfMakeElement[]>docDefinition.content).push(<pdfMake.pdfMakeElement>cartouche.content);

            for (var key in cartouche.styles) {
                docDefinition.styles[key] = cartouche.styles[key];
            }
        }


        let enteteColonnes: pdfMake.pdfMakeElement[] = [];
        let widthColonne: (number | string)[] = [];
        let colonnesImprimables = myThis.mesColonnes.filter(function (c: ice2Colonne<T>) { return c.print != undefined; })
        colonnesImprimables.forEach(function (col: ice2Colonne<T>) {
            let titreImpression: string = "";
            if (col.printTitleLocalise != undefined && (col.titre == null || col.titre == "")) {
                titreImpression = col.printTitleLocalise();
            } else {
                titreImpression = col.titre;
            }
            enteteColonnes.push({ text: titreImpression, style: { fillColor: '#5692ae', bold: true }, color: '#ffffff', alignment: 'center', fontSize: 10 })
            if (col.widthPdf != undefined)
                widthColonne.push(col.widthPdf);
        });

        let t: pdfMake.pdfMakeElementTableElement = { body: [] };

        t.body.push(enteteColonnes);

        await myThis.mesItemsFiltres.forEach(async function (item: ice2TableauItem<T>, i) {
            let tableauAffiche: pdfMake.pdfMakeElement[] = []
            let ligneGroupGlobal: pdfMake.pdfMakeElement[] = []
            let ligneGroup: pdfMake.pdfMakeElement[] = []
            let ligneDetail: pdfMake.pdfMakeElement[] = [];
            let nbGroup: number = 0;

            item.donnee = item.donnee
            colonnesImprimables.forEach(col => {
                if (col.printGroup != undefined && col.printGroup != null) {
                    nbGroup++;
                }
            })


            if (myThis.hasGroupGlobal) {
                if (myThis.printGroupeGlobal != undefined) {
                    if (i != 0) {
                        let diff = await myThis.greaterThanGlobal(item.donnee, myThis.mesItemsFiltres[i - 1].donnee);

                        if (diff != 0)
                            ligneGroupGlobal.push({ text: myThis.printGroupeGlobal(item.donnee, myThis.mesItemsFiltres[i - 1].donnee), style: { fillColor: '#dddddd', bold: true }, colSpan: colonnesImprimables.length, alignment: 'center', fontSize: 10 });

                    } else // Si i == 0
                        ligneGroupGlobal.push({ text: myThis.printGroupeGlobal(item.donnee,null), style: { fillColor: '#dddddd', bold: true }, colSpan: colonnesImprimables.length, alignment: 'center', fontSize: 10 });                        
                }
            }

            colonnesImprimables.forEach(async (col: ice2Colonne<T>, i: number) => {

                //dois-je afficher des groupes ?
                if (col != undefined) {
                    if (col.group != undefined) { withGroup = true; }
                }

                if (withGroup) {
                    if ((itemPrecedent == null || myThis.colonneTri[0].greaterThan(item.donnee, itemPrecedent.donnee, myThis.colonneTri[0].getTypeTri()) != 0)) {
                        if (col.printGroup != undefined) {

                            ligneGroup.push({ text: col.printGroup(item.donnee), style: { fillColor: '#dddddd', bold: true }, colSpan: colonnesImprimables.length / nbGroup, alignment: 'center', fontSize: 10 });
                        }
                    }
                }

                tableauAffiche.push({ text: col.print(item.donnee) != null ? col.print(item.donnee).toString().replace("<br>", "\r\n") : "", fontSize: 10, colSpan: 1 });
            });

            itemPrecedent = item;

            if (ligneGroupGlobal.length > 0)
                t.body.push(ligneGroupGlobal);

            if (ligneGroup.length > 0)
                t.body.push(ligneGroup);

            if (myThis.printDetailLigne != null)
                ligneDetail.push({ text: myThis.printDetailLigne(item.donnee) != null ? myThis.printDetailLigne(item.donnee).toString().replace("<br>", "\r\n") : "", fontSize: 10, colSpan: colonnesImprimables.length });

            t.body.push(tableauAffiche);

            if (ligneDetail.length > 0)
                t.body.push(ligneDetail);
        });

        t.headerRows = 1;

        (<pdfMake.pdfMakeElement[]>docDefinition.content).push({
            table: t,
            layout: {
                fillColor: function (rowIndex: number, node: pdfMake.pdfMakeElement, columnIndex: number) {
                    return (rowIndex % 2 === 0) ? '#ffffff' : '#eeeeee';
                },
                hLineWidth: function (i: number, node: pdfMake.pdfMakeElement) {
                    return 0;
                },
                vLineWidth: function (i: number, node: pdfMake.pdfMakeElement) {
                    return (i === 0 || i === node.table.widths.length) ? 0 : 0.5;
                },
                vLineColor: function (i: number, node: pdfMake.pdfMakeElement) {
                    return 'gray';
                }
            }
        });
        if (colonnesImprimables.length == widthColonne.length)
            t.widths = widthColonne;


        let document: pdfMake.DocumentPdfMake = pdfMake.createPdf(docDefinition);

        document.download(this.nomExportPdf);

        cb();
    }


    /**
     * Retourne l'image de fond pour le pdf en fonction du mode d'édition et de la page courante.
     * @param sources
     * @param modePaysage
     * @param currentPage
     */
    private getBackgroundImage(sources: dicoImagesXElement, modePaysage: boolean, currentPage: number): string {
        let img: string;

        if (currentPage == 1) {
            if (modePaysage)
                img = sources.page_de_garde_paysage;
            else
                img = sources.page_de_garde_portrait;
        }
        else {
            if (modePaysage)
                img = sources.page_paysage;
            else
                img = sources.page_portrait;
        }

        return img;
    }

    /**
     * permet d'ajouter un bouton dans le header tableau
     * @param boutonWrapper
     * @param position Dockposition
     */
    public ajouterBouton(b: ice2ToolTipBouton | ice2Bouton, position: DockPosition): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.dockBoutonHeader.append(b, position);
        if (!myThis.sansTableauTools)
            myThis.divPrincipal.asHolder.removeClass("maskey");

        return myThis;
    }

    /**
   * permet d'ajouter un bouton dans le header tableau
   * @param labelContainer
   * @param position Dockposition
   */
    public ajouterLabelContainer(b: ice2LabelContainer, position: DockPosition): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.dockBoutonHeader.append(b, position);
        return myThis;
    }

    /**
     * Permet d'ajouter un element dans le header
     * @param b
     * @param position
     */
    public ajouterElement(b: iXElement, position: DockPosition): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.dockBoutonHeader.append(b, position);
        return myThis;
    }
    /**
     * affiche le bandeau aucune donnée si nécessaire
     * @param oui
     */
    private afficheNoData() {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.resetNoData();


        if (myThis.mesItemsTous.length == 0) {
            myThis.renderNoData(myThis.placeInfoNoData);
        }


    }

    private addDatas(tabVal: T[]): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;

        tabVal.forEach(function (val: T, index: number) {
            let ligne: HTMLTableRowElement;
            let item: ice2TableauItem<T>;

            ligne = document.createElement("tr");
            ligne.classList.add("ice2TableauItem");

            let renderPlaces: Dictionnaire<HTMLTableDataCellElement> = {};

            item = new ice2TableauItem<T>(ligne, renderPlaces, val, myThis);

            if (myThis.clickLigne != undefined) {
                ligne.addEventListener('click', (ev: MouseEvent) => {
                    if (myThis._ligneSelectionne != null) {
                        myThis._ligneSelectionne.supprimerClasse("ligneSelectionnee");
                    }
                    let lw = new ice2TableauLigneWrapper<T>(item);
                    lw.toggleClass("ligneSelectionnee");
                    myThis._ligneSelectionne = lw;

                    return myThis.clickLigne(val, lw);
                });
                //				(ligne).click(function (e: Event) { return myThis.clickLigne(val, new ice2TableauLigneWrapper<T>(item)); });
            }


            if (myThis.dblClickLigne != undefined) {
                ligne.addEventListener('dblclick', (ev: MouseEvent) => { return myThis.dblClickLigne(val, new ice2TableauLigneWrapper<T>(item)); });
                //(ligne).dblclick(function (e: Event) { return myThis.dblClickLigne(val, new ice2TableauLigneWrapper<T>(item)); });
            }
            myThis.mesItemsTous.push(item);

            if (myThis.renderDetailLigne != null)
                myThis.createLigneDetail(item, index);

            // si l'ajout est compatible avec le filtre en cours
            if (myThis.filtreTexte == undefined || myThis.filtreEnCours === "" || myThis.filtreTexte(myThis.filtreEnCours, item.donnee)) { myThis.mesItemsFiltres.push(item); }

        });

        myThis.rafraichirCompteurs();
        myThis.trierlesDonnees();

        myThis.afficheNoData();

        if (myThis.pagination > 0) {
            if (myThis.mesItemsTous.length > myThis.pagination) {
                myThis.afficherPagination();
            }
            else {
                myThis.masquerPagination();
            }
        }
        return myThis;
    }
    /**
     * permet d'ajouter des éléments de type <T>
     * privilégier l'ajout par liste pour améliorer les performances
     * @param tabVal
     */
    public ajouterDatas(tabVal: T[]): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.dataContext.add(tabVal);

        return myThis;

    }

    public masquerPagination(): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;

        cachericeElements(myThis.footerTableau, true);
        return myThis;
    }

    public afficherPagination(): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;

        if (myThis.pagination > 0) {
            affichericeElements(myThis.footerTableau);
        }
        return myThis;
    }

    private delDatas(val: T[]): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        val.forEach(function (a: T) {
            let supp: ice2TableauItem<T>[] = myThis.mesItemsTous.filter(function (i: ice2TableauItem<T>) { return a == i.donnee; });

            if (supp.length > 0) {


                if (supp.length > 0) {
                    for (let p of supp) {
                        p.detruire();

                        let idxT: number =
                            myThis.mesItemsTous.indexOf(p);
                        if (idxT > -1) { myThis.mesItemsTous.splice(idxT, 1); }
                        let idxF: number =
                            myThis.mesItemsFiltres.indexOf(p);
                        if (idxF > -1) {
                            myThis.mesItemsFiltres.splice(idxF, 1);
                        }
                    }
                }



            }
        });

        myThis.rafraichirCompteurs();
        myThis.trierlesDonnees();
        myThis.afficheNoData();
        return myThis;
    }

    /**
     * permet de supprimer des éléments de type <T>
     * la sélection des objets à supprimer se fait par référence
     * privilégier la suppression par liste pour améliorer les performances
     * @param tabVal
     */

    public supprimerDatas(val: T[]): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        if( val!=null)
            myThis.dataContext.del(val);
        return myThis;
    }
    /**
    * permet de vider le tableau
    */
    public supprimerDatasAll(): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        let exportListe: T[] = [];
        myThis.dataContext.forEach(function (item: T) { exportListe.push(item); });
        myThis.dataContext.del(exportListe);
        /*  myThis.mesItemsTous.forEach(function (item: ice2TableauItem<T>)
          {
              item.detruire();
          });*/
        myThis.mesItemsFiltres = [];
        myThis.mesItemsTous = [];

        myThis.rafraichirCompteurs();
        myThis.afficheNoData();

        return myThis;
    }
    /**
     * fonction donnant le nbre de pages total
     */
    public getNbPages(): number { return Math.ceil(this.mesItemsFiltres.length / this.pagination); }
    /**
     * fonction donnant le numero de la page active (démarre à 1)
     */
    public getPageCourante(): number
    {
        return Math.trunc((this.debutAffichage) / this.pagination) + 1;
    }
    

    public getColonnesBySelecteur(filtre: ((colonne: ice2Colonne<T>) => boolean)): ice2Colonne<T>[] {
        let myThis: ice2TableauWrapper<T> = this;
        return myThis.getColonnes().filter(filtre);
    }

    public getColonneByClef(clef:number): ice2Colonne<T>{
        let myThis: ice2TableauWrapper<T> = this;
        return myThis.getColonnes().find(a=>a.cle==clef);
    }
    /**
     * fonction permettant d'ajouter dynamiquement une colonne au tableau
     * @param colonne
     */
    public ajouterColonne(colonne: ice2Colonne<T>): ice2TableauWrapper<T> {   //création de la zone titre de la colonne
        let myThis: ice2TableauWrapper<T> = this;

        myThis.ajouterColonneNoData(colonne);

        //pour chaque élément je dois rajouter un tr et le remplir:

        myThis.mesItemsTous.forEach(function (item: ice2TableauItem<T>) {
            myThis.ajouterColonnePourItem(colonne, item, myThis);


        });

        myThis.initTri();

        return myThis;
    }
    /**
     * fonction permettant de supprimer une colonne
     * @param colonne
     */
    public supprimerColonne(colonne: ice2Colonne<T>): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        //suppression de la cellule d'entete
        if (colonne.entete != null) {
            colonne.entete.remove();
            //(colonne.entete).remove();
        }
        colonne.wrapInEntete = null;

        //suppression des cellules de chaque ligne
        myThis.mesItemsTous.forEach(function (i: ice2TableauItem<T>) {

            if (i.rendered) {
                i.renderPlaces[colonne.cle].remove();
                i.renderPlaces[colonne.cle]=undefined;
//                i.rendered = false;
            }
            //	(i.renderPlaces[colonne.cle]).remove();
        });

        //suppression de la colonne dans le paramétrage et dans les tris en cours
        myThis.mesColonnes = myThis.mesColonnes.filter(function (c: ice2Colonne<T>) { return c != colonne; });
        myThis.colonneTri = myThis.colonneTri.filter(function (c: ice2Colonne<T>) { return c != colonne; });
        return myThis;
    }
    public decalerColonnePositionFixe(colonne: ice2Colonne<T>, position: number ): ice2TableauWrapper<T> {


        let myThis: ice2TableauWrapper<T> = this;
        let indexDeLaColonneADeplacer = myThis.mesColonnes.findIndex(a => a == colonne);
        if (indexDeLaColonneADeplacer < position) { position--; }
        myThis.supprimerColonne(colonne);

        myThis.ajouterColonnePositionFixe(colonne, position);
      

        return myThis;
    }
    public ajouterColonnePositionFixe(colonne: ice2Colonne<T>, position: number = -1): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;

        //par defaut on ajoute la colonne a la fin
        if (position == -1) {
            myThis.ajouterColonne(colonne);
        }
        else {
            //on charge la liste des colonnes à partir de la position d'insertion souhaité
            let mesColonneApres: ice2Colonne<T>[];
            mesColonneApres = myThis.mesColonnes.slice(position, myThis.mesColonnes.length);

            //on retire les colonnes chargées précédement
            mesColonneApres.forEach((colone) => {
                myThis.supprimerColonne(colone);
            });

            //on ajoute la nouvelle colonne puis on remet les colonnes chargé
            myThis.ajouterColonne(colonne);
            mesColonneApres.forEach((colone) => {
                myThis.ajouterColonne(colone);
            });
        }
        myThis.initTri();

        return myThis;
    }

    public ajouterColonnePourItem(c: ice2Colonne<T>, item: ice2TableauItem<T>, tab: ice2TableauWrapper<T>) {
        // item.ajouterColonnePourItem(colonne);
        //afin de ne pas donner la main sur les éléments du tableau je donne le tr avant de lui faire un render
        //   let td: HTMLTableDataCellElement;
        if (item.rendered) {
            if (item.renderPlaces[c.cle] == undefined) {
                item.renderPlaces[c.cle] = item.ligne.insertCell();
            }
            else {
                while (item.renderPlaces[c.cle].firstChild) {
                    item.renderPlaces[c.cle].removeChild(item.renderPlaces[c.cle].firstChild);
                }

            }

            c.renderMethod(xElementHolder.fromHtmlElement(item.renderPlaces[c.cle]),
                item.donnee,
                new ice2TableauLigneWrapper<T>(item),
                tab
            );
            //  this.ligne.appendChild(td);
        }

    }
    /**
     * fonction permettant de récupérérer l'élément de base de la DOM pour pouvoir l'attacher dans un écran
     */

    get y(): HTMLElement { return this.divPrincipal.y; }

    /**
     * fonction permettant de placer la pagination sur la dernière page
     */
    public setPaginationMax(): void {
        let dernierePage: number = Math.floor(this.mesItemsFiltres.length / this.pagination);
        this.setPagination(dernierePage * this.pagination);
    }


    /**
     * fonction permettant de définir le numéro de l'élément à partir duquel on veut afficher une page d'éléments
     * démarre à 0
     * @param index
     */
    public setPagination(index: number): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;

        if (index != myThis.debutAffichage)
        {
            myThis.debutAffichage = index;

            if (myThis.debutAffichage < 0) { myThis.debutAffichage = 0; }

            if (myThis.debutAffichage > myThis.mesItemsFiltres.length-1 && myThis.mesItemsFiltres.length > 0)
            {
                myThis.debutAffichage = Math.trunc(myThis.mesItemsFiltres.length / myThis.pagination) * myThis.pagination;
                if ((myThis.mesItemsFiltres.length % myThis.pagination) == 0)
                    myThis.debutAffichage -= myThis.pagination;
            }

            myThis.rafraichirCompteurs();

            myThis.rafraichirContenuTableau();
        }
        return myThis;
    }

    private setPagePrecedente() {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.setPagination(myThis.debutAffichage - myThis.pagination);
    }

    private setPageSuivante() {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.setPagination(myThis.debutAffichage + myThis.pagination);
    }
    /**
     * fonction permettant de rechercher les éléments du tableau à parti d'un string fourni
     * @param s
     */

    public async filtrerParTexteExterne(s: string): Promise<ice2TableauWrapper<T>> {
        let myThis: ice2TableauWrapper<T> = this;
        return await myThis.filtrerParFonctionAsync((t) => { return myThis.filtreTexte(s, t); });
    }

    public async filtrerParFonctionAsync(fi: (t: T) => Promise<boolean>): Promise<ice2TableauWrapper<T>> {
        let myThis: ice2TableauWrapper<T> = this;
        let tabFiltre: ice2TableauItem<T>[];
        const asyncFilter = async (arr: any[], predicate: (t: ice2TableauItem<T>) => Promise<boolean>) => Promise.all(arr.map(predicate))
            .then((results) => arr.filter((_v, index) => results[index]));

        tabFiltre = await asyncFilter(myThis.mesItemsTous, (item: ice2TableauItem<T>) => {
            return fi(item.donnee);
        });

        myThis.SetMesItemsFiltres(tabFiltre);

        myThis.trierlesDonnees();
        return myThis;
    }

    public async filtrerParFonction(fi: (t: T) => boolean): Promise<ice2TableauWrapper<T>> {
        let myThis: ice2TableauWrapper<T> = this;
        return myThis.filtrerParFonctionAsync((t: T) => new Promise<boolean>(ok => { ok(fi(t)); }));
    }

    //ici on rafraichit juste le texte affiché qui donne les pages en cours et total

    private rafraichirCompteurs(): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        if (myThis.compteurComplet != null) {
            //            myThis.placeCompteurPagination.changerTextVariable(myThis.getPageCourante());
            myThis.compteurComplet.changerTextVariable(new iceLString('Page {0}/{1}').format([myThis.getPageCourante(), myThis.getNbPages()]));

        }
        /*
        if (myThis.placeTotalPage != null) {
            myThis.placeTotalPage.changerTextVariable(myThis.getNbPages());
        }
        */
        myThis.labelCompteur.changerTextVariable(myThis.mesItemsFiltres.length.toString());
        return myThis;
    }

    //je rafraichis les données donc je revient en première page
    private SetMesItemsFiltres(tabFiltre: ice2TableauItem<T>[]): ice2TableauWrapper<T> {

        this.mesItemsFiltres = tabFiltre;
        this.rafraichirContenuTableau();
        this.setPagination(0);
        return this;
    }
    private filtrerParTexte(): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        myThis.filtrerParTexteExterne(myThis.filtreEnCours);
        return myThis;
    }

    ///ajouter des colonnes sans mettre à jour les cellules qui lui correspondent
    private ajouterColonneNoData(colonne: ice2Colonne<T>): ice2TableauWrapper<T> {   //création de la zone titre de la colonne
        let myThis: ice2TableauWrapper<T> = this;
        myThis.mesColonnes.push(colonne);
        colonne.triCourantEtOrdreBinding.bind((value) => {
            myThis.trierlesDonnees();
        });

        //   colonne.entete = myThis.ligneEntete.insertCell();

        colonne.entete = <HTMLTableHeaderCellElement>document.createElement('th');
        if (myThis.fixerEntetes) {
            colonne.entete.classList.add("fixed_headers");
        }
        myThis.ligneEntete.append(colonne.entete);
        //  myThis.ligneEntete.append(colonne.entete);


        colonne.wrapInEntete = new ice2WrapPanel({
            retourALaLigne: false,
            drag: {
                dragKey: () => colonne.cle.toString() ,
                drop: (cleAinserer) => {
                    let indexColonneRemplacee = myThis.mesColonnes.findIndex(a => a == colonne);
                   

                    let clefNum = Number.parseInt(cleAinserer);
                    let colonneADecaler = myThis.getColonneByClef(clefNum)
                    myThis.decalerColonnePositionFixe(colonneADecaler ,indexColonneRemplacee  )
                },
                dropAction:"deplacement"
            }
        });
        //si il y a un tooltip sur l'entete de colonne
        if (colonne.tooltipTitleLocalise != undefined) {
            xElementHolder.fromHtmlElement(colonne.entete).ice2ToolTip({
                initContent: colonne.wrapInEntete,
                toolTipContent: new ice2Label({ textLocalise: colonne.tooltipTitleLocalise }),
                ToolTipPositionHeightSouhaite: enumXxToolTipPositionHeight.haut
            })
        }
        else
            xElementHolder.fromHtmlElement(colonne.entete).append(colonne.wrapInEntete);
        //fin init wrap        

        //si je suis une colonne triable
        {
            let btnTri: ice2Bouton;


            if (colonne.renderTitre != undefined) {
                if (colonne.IsTriable)
                {
                    let optionsBoutonEntete: optionButton;

                    optionsBoutonEntete = {
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit,
                            couleurBouton: enumCouleurBouton.Sans
                        },
                        icone: colonne.getIconeTri(),
                        titleLocalise: 'Trier',
                        click: function (cb) {
                            myThis.setTriPrincipal(colonne, true);
                            cb();
                        }
                    };



                    optionsBoutonEntete.shiftClick = function (cb) {
                        //si je suis la colonne de tri principal ou qu'il n'y a pas de tri principal , je ne fais rien 

                        if (myThis.colonneTri.length > 0 && colonne != myThis.colonneTri[0]) {
                            myThis.addTriSupplementaire(colonne, true);
                        }
                        cb();
                    }

                    //optionsBoutonEntete.icone = iconInit;
                    optionsBoutonEntete.class = 'btnTrieSeul';
                    btnTri = new ice2Bouton(optionsBoutonEntete);

                    colonne.wrapInEntete.append(btnTri);
                }

                let div = new iceDiv({});

                if (colonne.IsTriable) {
                    colonne.renderTitre(div.asHolder, myThis.setTriPrincipal, myThis.trierlesDonnees);
                } else {
                    colonne.renderTitre(div.asHolder);
                }
                colonne.wrapInEntete.append(div);

            } else {
                let textTri: string = colonne.titre;

                if (colonne.IsTriable) {

                    let optionsBoutonEntete: optionButton;

                    optionsBoutonEntete = {
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.Fit,
                            couleurBouton: enumCouleurBouton.Sans
                        },
                        textVariable: textTri,
                        titleLocalise: 'Trier',
                        icone: colonne.getIconeTri(),
                        click: function (cb) {
                            myThis.setTriPrincipal(colonne, true);
                            cb();
                        }
                    };



                    optionsBoutonEntete.shiftClick = function (cb) {
                        //si je suis la colonne de tri principal ou qu'il n'y a pas de tri principal , je ne fais rien 

                        if (myThis.colonneTri.length > 0 && colonne != myThis.colonneTri[0]) {
                            myThis.addTriSupplementaire(colonne, true);
                        }
                        cb();
                    }
                    optionsBoutonEntete.class = 'titreColonne';
                    btnTri = new ice2Bouton(optionsBoutonEntete);

                    colonne.wrapInEntete.append(btnTri);
                } else {
                    colonne.wrapInEntete.append(new ice2Label({ textVariable: textTri }));
                }
            }
            colonne.changerIcone = function (ic: IconeP12) {
                btnTri.setIcone(ic);
            };
        }
        if (colonne.canDeleteColumn) {


            colonne.wrapInEntete.append(new ice2Bouton({
                titleLocalise: 'Supprimer cette colonne',
                class: "btnSupprimerColonne",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                icone: new IconeMiniP12(enumIconeP12.action_annuler_blanc, { taille: tailleIcone.XS }),
                click: function (cb) { myThis.supprimerColonne(colonne); cb(); }
            }
            ), "noFlexWrapItem");

        }
        return myThis;
    }

    private getColonneTrieVerrouille(): ice2Colonne<T> {
        let myThis: ice2TableauWrapper<T> = this;
        let recherche_col_lock: ice2Colonne<T>[] = myThis.mesColonnes.filter(function (col: ice2Colonne<T>) { return col.IsVerrouTriPrincipal; });
        if (recherche_col_lock.length > 0)
            return recherche_col_lock[0];
        return null;
    }

    private setTriPrincipal(colonne: ice2Colonne<T>, withToggle: boolean): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;

        //si il y a une colonne en trie verouillé c'est celle qui reste en trie principal et celle que l'on recoit passe en secondaire
        let colonne_lock: ice2Colonne<T> = myThis.getColonneTrieVerrouille();
        let colonne_source: ice2Colonne<T> = null;
        let tempTypeTri: enumTypeTri = colonne.getTypeTri();
        // test si le trie principale et lobk
        if (colonne_lock != null && colonne != colonne_lock) //on a demandé u trie sur une autre colonne de la colonne verrouillé
        {
            colonne_source = colonne;
            colonne = colonne_lock;
        }
        else {
            //je mets l'icone no tri sur toutes les colonnes triables sauf celle en cours de tri
            myThis.colonneTri
                .filter(function (col: ice2Colonne<T>) { return col != colonne && col.IsTriable; })
                .forEach(function (col: ice2Colonne<T>) {
                    col.triCourantEtOrdreBinding.Value = {
                        ordreTri: null,
                        triCourant: null
                    };
                });
            myThis.colonneTri = [colonne];

            if (withToggle) {
                if (tempTypeTri != enumTypeTri.asc)
                    tempTypeTri = enumTypeTri.asc;
                else
                    tempTypeTri = enumTypeTri.desc;
            }
        }

        // test si le trie principal est lock 
        if (colonne_source != null) {
            myThis.addTriSupplementaire(colonne_source, withToggle);
        }
        else if (withToggle) {
            colonne.triCourantEtOrdreBinding.Value = {
                ordreTri: 1,
                triCourant: tempTypeTri
            };
        }


        return myThis;
    }

    private addTriSupplementaire(colonne: ice2Colonne<T>, withToggle: boolean): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        let tempTypeTri: enumTypeTri = colonne.getTypeTri();
        let indextrie: number = myThis.colonneTri.indexOf(colonne);
        if (indextrie < 0) {
            //si colonne déja présente je permute le tri:
            myThis.colonneTri.push(colonne);
            indextrie = myThis.colonneTri.indexOf(colonne);
        }
        if (withToggle) {
            if (tempTypeTri != enumTypeTri.asc)
                tempTypeTri = enumTypeTri.asc;
            else
                tempTypeTri = enumTypeTri.desc;

            colonne.triCourantEtOrdreBinding.Value = {
                ordreTri: indextrie + 1,
                triCourant: tempTypeTri
            };
        }

        return myThis;

    }

    private trierlesDonnees(): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;

        if (myThis.colonneTri.length > 0) {

            myThis.mesItemsFiltres.sort(
                function (a: ice2TableauItem<T>, b: ice2TableauItem<T>): number {
                    let valeur: number = 0;
                    let ixColonneEnCours = 0;
                    while (valeur == 0 && ixColonneEnCours < myThis.colonneTri.length) {
                        let col: ice2Colonne<T> = myThis.colonneTri[ixColonneEnCours];
                        if (col.getTypeTri() == enumTypeTri.desc) { valeur = col.greaterThan(b.donnee, a.donnee, col.getTypeTri()); }
                        else { valeur = col.greaterThan(a.donnee, b.donnee, col.getTypeTri()); }

                        ixColonneEnCours++;

                    }
                    return valeur;
                }
            );
        }

        this.viderLaListeGraphique();
        //ici la liste est triée dans l'ordre prévu
        //on replace la dom dans le bon ordre

        this.attacherALalisteGraphique(0, this.pagination);
        return myThis;
    }

    private rafraichirContenuTableau(): ice2TableauWrapper<T> {
        // if (this.pagination > 0) {
        this.viderLaListeGraphique();
        this.attacherALalisteGraphique(this.debutAffichage, this.pagination);
        return this;
        // }
    }

    private attacherALalisteGraphique(debut: number, pagination: number): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;
        let itemPrecedent: ice2TableauItem<T> = null;
        let withGroup: boolean = false;

        //dois-je afficher des groupes ?

        if (this.colonneTri[0] != undefined)
            if (this.colonneTri[0].group != undefined) { withGroup = true; }

        let elementsAAfficher: ice2TableauItem<T>[];

        // si une pagination est active je filtre les éléments
        if (this.pagination > 0) { elementsAAfficher = this.mesItemsFiltres.slice(debut, debut + pagination) }
        else { elementsAAfficher = this.mesItemsFiltres; }



        ////dd



        //if (myThis.hasGroupGlobal || withGroup) {
        //    elementsAAfficher.forEach(function (item: ice2TableauItem<T>, index: number) {

        //        //j'ajoute le groupe si nécessaire	
        //        if (myThis.hasGroupGlobal && (itemPrecedent == null || myThis.greaterThanGlobal(item.donnee, itemPrecedent.donnee) != 0)
        //            ||
        //            withGroup && (itemPrecedent == null || myThis.colonneTri[0].greaterThan(item.donnee, itemPrecedent.donnee, myThis.colonneTri[0].getTypeTri()) != 0)
        //        ) {
        //            let groupeCourant: HTMLTableRowElement;
        //            groupeCourant = myThis.monTableau.insertRow();
        //            let td: HTMLTableDataCellElement = groupeCourant.insertCell();
        //            td.classList.add("ice2TableauGroup");
        //            td.colSpan = myThis.mesColonnes.length;

        //            if (myThis.hasGroupGlobal) {
        //                myThis.groupGlobal(xElementHolder.fromHtmlElement(td), item.donnee, itemPrecedent == null ? null : itemPrecedent.donnee);
        //            }
        //            else {
        //                myThis.colonneTri[0].group(xElementHolder.fromHtmlElement(td), item.donnee);
        //            }
        //        }

        //        itemPrecedent = item;

        //        //puis j'ajoutes l'élément
        //        myThis.monTableau.tBodies[0].appendChild(item.ligne);

        //        // Ensuite on regarde si un detail est ajouter ou pas 
        //        if (myThis.renderDetailLigne != null)
        //            myThis.createLigneDetail(item, index);
        //    });
        //}
        //else {
        //    //ajout  des éléments
        //    elementsAAfficher.forEach((item: ice2TableauItem<T>, index: number) => {
        //        //puis j'ajoutes l'élément
        //        myThis.monTableau.tBodies[0].appendChild(item.ligne);

        //        // Ensuite on regarde si un detail est ajouter ou pas 
        //        if (myThis.renderDetailLigne != null)
        //            myThis.createLigneDetail(item, index);
        //    });
        //}

        /////ddd




        //gestion des groupes mais optim ( else ) dans les cas ou il n'y a pas de groupe
        if (myThis.hasGroupGlobal || withGroup) {
            elementsAAfficher.forEach((item: ice2TableauItem<T>, index: number) => {

                let prec = itemPrecedent;
                let groupeCourant: HTMLTableRowElement;
                groupeCourant = myThis.monTableau.insertRow();

                let fn = async () => {
                    let testGroupe: number = prec != null && myThis.hasGroupGlobal ? await myThis.greaterThanGlobal(item?.donnee, prec?.donnee) : 1;
                    //j'ajoute le groupe si nécessaire	
                    if (myThis.hasGroupGlobal && (prec == null || testGroupe != 0)
                        ||
                        withGroup && (prec == null || myThis.colonneTri[0].greaterThan(item.donnee, prec.donnee, myThis.colonneTri[0].getTypeTri()) != 0)
                    ) {

                        let td: HTMLTableDataCellElement = groupeCourant.insertCell();
                        td.classList.add("ice2TableauGroup");
                        td.colSpan = myThis.mesColonnes.length;
                        if (myThis.hasGroupGlobal) {
                            myThis.groupGlobal(xElementHolder.fromHtmlElement(td), item.donnee, prec == null ? null : prec.donnee);
                        }
                        else {
                            myThis.colonneTri[0].group(xElementHolder.fromHtmlElement(td), item.donnee);
                        }
                    }
                    else {
                        groupeCourant.remove();
                    }
                }
                fn();
                itemPrecedent = item;

                //puis j'ajoutes l'élément
                myThis.monTableau.tBodies[0].appendChild(item.ligne);

                // Ensuite on regarde si un detail est à ajouter ou pas 
                if (myThis.renderDetailLigne != null)
                    myThis.createLigneDetail(item, index);
            });
        }
        else {
            //ajout  des éléments
            elementsAAfficher.forEach((item: ice2TableauItem<T>, index: number) => {
                //puis j'ajoutes l'élément
                myThis.monTableau.tBodies[0].appendChild(item.ligne);

                // Ensuite on regarde si un detail est ajouter ou pas 
                if (myThis.renderDetailLigne != null)
                    myThis.createLigneDetail(item, index);
            });
        }

        //on affiche les éléments
        elementsAAfficher.forEach((item: ice2TableauItem<T>) => { if (!item.rendered) item.render(); });

        return myThis;
    }

    private viderLaListeGraphique(): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;

        //je détache toutes les lignes de données
        myThis.mesItemsTous.forEach(function (item: ice2TableauItem<T>) {
            item.ligne.remove();
        });

        //puis je supprime tous les groupes
        while (myThis.monTableau.rows.length > 1) { myThis.monTableau.deleteRow(1); }
        return myThis;
    }

    /**
     * Permet de créer la ligne de détail d'une ligne
     * @param item 
     * @param index = index ici sert d'id pour que l'on puisse faire correspondre ligne et ligne détail
     */
    private createLigneDetail(item: ice2TableauItem<T>, index: number): void {
        let myThis: ice2TableauWrapper<T> = this;

        let detailLigne: HTMLTableRowElement;
        detailLigne = myThis.monTableau.insertRow();
        detailLigne.classList.add('ice2TableauLigneDetail');
        item.ligneDetail = detailLigne;
        item.Detailrendered = false;

        let ligneTab: ice2TableauLigneWrapper<T> = myThis.getLigneByValue(item.donnee);

        item.renderDetail = () => {
            while (detailLigne.firstChild) {
                detailLigne.removeChild(detailLigne.firstChild);
            }
            let tdDetail: HTMLTableDataCellElement = detailLigne.insertCell();
            tdDetail.classList.add("ice2TableauDetail");
            tdDetail.colSpan = myThis.mesColonnes.length;
            tdDetail.id = "ice2TableauDetail_" + index;


            myThis.renderDetailLigne(xElementHolder.fromHtmlElement(tdDetail), item.donnee, ligneTab);
            item.Detailrendered = true;
        }

        if (myThis.afficherDetailLigne != null && !myThis.afficherDetailLigne(item.donnee))
            ligneTab.masquerDetail();
        else
            ligneTab.afficherDetail();
    }

    public SelectLigne(numeroLigne: number) {
        let myThis: ice2TableauWrapper<T> = this;
        if (myThis.mesItemsTous != null && myThis.mesItemsTous.length > 0) {
            myThis.mesItemsTous[numeroLigne].ligne.click();
        }
    }

    //public Arborescence(getParent: (a: T) => T, getEnfants: (a: T) => T[]) {
    //    let myThis: ice2TableauWrapper<T> = this;
    //    myThis.mesColonnes[0].renderMethod = function (place: xElementHolder, valeur: T, lw: ice2TableauLigneWrapper<T>) {
    //        place.append(new ice2Label({
    //            textVariable: ">"
    //        }))
    //    }

    //    if (getEnfants != null && getParent != null) {
    //        let list: ice2TableauItem<T>[] = [];
    //        let listDonne: T[] = [];

    //        myThis.mesItemsTous.forEach(v => {
    //            if (!list.includes(v) && !listDonne.includes(v.donnee)) {
    //                v.ligne.className += "parent"
    //                list.push(v);
    //                listDonne.push(v.donnee);
    //            }
    //            let enfants: T[] = getEnfants(v.donnee);
    //            if (enfants != null && enfants.length > 0)
    //                myThis.AjoutEnfantListe(1, enfants, listDonne, list, getEnfants, getParent);
    //        });
    //        myThis.mesItemsTous = list;
    //        myThis.SetMesItemsFiltres(list);
    //    }
    //}

    //private AjoutEnfantListe(niveau: number, enfants: T[], listDonne: T[], list: ice2TableauItem<T>[], getEnfants: (a: T) => T[], getParent: (a: T) => T) {
    //    let myThis: ice2TableauWrapper<T> = this;
    //    if (enfants != null && enfants.length > 0)
    //        enfants.forEach(e => {
    //            if (!listDonne.includes(e)) {
    //                let ligne: HTMLTableRowElement;
    //                let item: ice2TableauItem<T>;
    //                ligne = document.createElement("tr");
    //                ligne.classList.add("ice2TableauItem");

    //                let renderPlaces: Dictionnaire<HTMLTableDataCellElement> = {};
    //                item = new ice2TableauItem<T>(ligne, renderPlaces, e, myThis);
    //                let css = "";
    //                css += niveau.toString();
    //                //if (niveau % 2 == 0)
    //                //	css = "pair"
    //                //else
    //                //	css = "impair"
    //                item.ligne.className += "enfant" + css;
    //                list.push(item);
    //                listDonne.push(e);

    //                myThis.mesColonnes[0].renderMethod = function (place: xElementHolder, valeur: T, lw: ice2TableauLigneWrapper<T>) {
    //                    let bo = true;
    //                    let en = getParent(valeur)
    //                    let niv = 1;
    //                    while (bo) {
    //                        en = getParent(en);
    //                        if (en == null)
    //                            bo = false;
    //                        else
    //                            niv += 1;
    //                    }
    //                    let enfant: string = "";
    //                    for (let i = 0; i < niv; i++) {
    //                        enfant += "=";
    //                        //place.append(new IconeP12(enumIconeP12.action_fleche_angle_bas_droite));
    //                    }

    //                    place.append(new ice2Label({
    //                        textVariable: enfant + ">"
    //                    }))
    //                }
    //            }
    //            let petitEnfants: T[] = getEnfants(e);
    //            if (petitEnfants != null && petitEnfants.length > 0)
    //                myThis.AjoutEnfantListe(niveau + 1, petitEnfants, listDonne, list, getEnfants, getParent);
    //        })
    //}
    public addClass(c: string): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;


        myThis.divPrincipal.addClass(c);


        return myThis;

      
    }

    public removeClass(c: string): ice2TableauWrapper<T> {
        let myThis: ice2TableauWrapper<T> = this;


        myThis.divPrincipal.removeClass(c);


        return myThis;
    }
}
//cette classe permet de gérer une ligne
//elle est liée à un éléments de type T
//elle gère la représentation graphiques dans des objets des colonnes 
class ice2TableauItem<T> {
    renderPlaces: Dictionnaire<HTMLTableDataCellElement>;
    donnee: T;
    ligne: HTMLTableRowElement;
    ligneDetail: HTMLTableRowElement;
    rendered: boolean;
    Detailrendered: boolean;
    supprimerElement: () => void;

    //fonction qui affiche le contenu des lignes
    public render: () => void;

    public renderDetail: () => void;

   
    constructor(ligneComplete: HTMLTableRowElement, rPlaces: Dictionnaire<HTMLTableDataCellElement>,
        inDonnee: T, leTableau: ice2TableauWrapper<T>) {
        let myThis: ice2TableauItem<T> = this;
        myThis.ligne = ligneComplete;
        myThis.renderPlaces = rPlaces;
        myThis.donnee = inDonnee;
        myThis.rendered = false;
        myThis.render = () => {
            myThis.rendered = true;

            leTableau.mesColonnes.forEach(function (c: ice2Colonne<T>) {  //nettoyage de toutes les cellules

                while (rPlaces[c.cle]?.firstChild) {
                    rPlaces[c.cle].removeChild(rPlaces[c.cle].firstChild);
                }
                //pour chaque colonne on lance la méthode spécifique
                leTableau.ajouterColonnePourItem(c, myThis, leTableau);
            });

        };

        myThis.supprimerElement = () => {
            leTableau.supprimerDatas([myThis.donnee]);
        };
    }

    public detruire(): void {
        let myThis: ice2TableauItem<T> = this;
        myThis.ligne.remove();
    }
}