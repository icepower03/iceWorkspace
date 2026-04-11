interface OptionsPlanneur {
    listeRessources: PlanneurRessource[];
    dateDebut: DateSerialisable;
    nbJours: number;
    displayRdv: (ici: iXElementHolder, rdv: PlanneurRDV) => void;
    displayRessource?: (ici: iXElementHolder, ressource: PlanneurRessource,manager:xElement) => void;
    selectRessource: (ress: PlanneurRessource) => void;
    renderDateColonne?: (ici: iXElementHolder, dt: DateSerialisable) => void;
    renderClassBloc?: (d: DateSerialisable) => string;

    ligneMouseOver?: (div: xDiv, ress: PlanneurRessource) => void;
    ligneMouseOut?: (div: xDiv, ress: PlanneurRessource) => void;
    ligneMouseClick?: (div: xDiv, ress: PlanneurRessource) => void;
    taillePremiereColonne?: number;
    surchargeFondGrille?: (div: xDiv, ress: PlanneurRessource, dateCell: DateSerialisable) => void
}

class PlanneurRDV {
    public DateDebut: DateSerialisable = null; 
    public DateFin: DateSerialisable = null;
    public Libelle: string = null;
    public Id: string = null;
    public IdExterne: number = null;
    public Couleur: string = null;
    public Ressources: string[] = null;
    public width: number = 0;
    public left: number = 0;
    public ClassCss: string = null;
    public Div: xDiv = null;
    public initContent?: iXElement;
  

    constructor(libelle: string, id: string, debut: DateSerialisable, fin: DateSerialisable, ressources: string[], idExterne?: number, couleur?: string, classCss?: string, initcontent?: iXElement) {
        let myThis: PlanneurRDV = this;

        myThis.DateDebut = debut;
        myThis.DateFin = fin;
        myThis.Libelle = libelle;
        myThis.Id = id;
        myThis.IdExterne = idExterne;
        myThis.Couleur = couleur != null ? couleur : "orange"; //Par défaut on met la couleur orange
        myThis.Ressources = ressources;
        myThis.ClassCss = classCss;
        myThis.initContent = initcontent;
    }

    public isValid(): boolean {
        let myThis: PlanneurRDV = this;

        return (
            myThis.DateDebut != null
            && myThis.DateFin != null
            && myThis.Libelle != null
            && myThis.DateDebut.MaDateLong <= myThis.DateFin.MaDateLong
        );
    }
}

class PlanneurRessource {
    public Libelle: string = null;
    public Id: string = null
    public IdExterne: number|string = null;

    constructor(lib: string, id: string, idExterne: number|string = null) {
        let myThis: PlanneurRessource = this;

        myThis.Libelle = lib;
        myThis.Id = id;
        myThis.IdExterne = idExterne;
    }
}

class xxPlanneurColonne implements iXElement, iXElementHolderEnable {
    public Span6h: xSpan;
    public Span12h: xSpan;
    public Span18h: xSpan;

    private container: xDiv = new xDiv();

 

    get y() { return this.container.y; }
    get asHolder(): iXElementHolder { return this.container.asHolder; }

    constructor(planneur: xxPlanneur, index: number, dateColonne: DateSerialisable, ressource: PlanneurRessource, modeEnteteColonne: boolean,
        modeEnteteLigne: boolean, selectRessource: (ress: PlanneurRessource) => void, surchargeFondGrille :(div:xDiv, p:PlanneurRessource,date:DateSerialisable)=>void ) {
        let myThis: xxPlanneurColonne = this;

        myThis.Span6h = new xSpan({ class: "6hLabel LabelHeure", textVariable: new xLString("6h").text });
        myThis.Span12h = new xSpan({ class: "12hLabel LabelHeure", textVariable: new xLString("12h").text });
        myThis.Span18h = new xSpan({ class: "18hLabel LabelHeure", textVariable: new xLString("18h").text });
      
        let classe = planneur.renderClassBloc(dateColonne);

        myThis.container = new xDiv({ class: classe + "  block col" + index });

        if (index == 1)
            myThis.container.y.style.flex = "0 0 " + planneur.taillePremiereColonne + "px";

        surchargeFondGrille(myThis.container, ressource, dateColonne);

        //Colonne de la première ligne du planneur, on ajoute les libelles
        if (modeEnteteColonne) {    

            if (planneur.renderDateColonne != undefined) {
               planneur.renderDateColonne(myThis.container.asHolder,dateColonne);
            }
            else {
                let title: xSpan = new xSpan({ class: "titrejour", textVariable: DateSerialisable.tolocalStringOnlyDate(dateColonne) });
                myThis.container.asHolder.append(title);
            }

            myThis.container.asHolder.append(myThis.Span6h);
            myThis.container.asHolder.append(myThis.Span12h);
            myThis.container.asHolder.append(myThis.Span18h);
        }

        //Première colonne des lignes du planneur, on ajoute un événement clic
        if (modeEnteteLigne) {
            //Au clic on retourne la ressource sélectionnée
            myThis.container.y.style.cursor = "pointer";
            myThis.container.y.onclick=function (e:MouseEvent) {
                selectRessource(ressource);
                e.stopPropagation();
            };
        }
    }

}


class xxPlanneurLigne implements iXElement,iXElementHolderEnable {
    public Colonnes: xxPlanneurColonne[] = [];

    public Libelle: string = null;
    public Id: number = null;
    public Div: xDiv = null;

  
    get y() { return this.Div.y; }

    get asHolder(): iXElementHolder { return this.Div.asHolder;}

    constructor(planneur: xxPlanneur, index: number, nbColonnes: number, datesColonnes: DateSerialisable[], ressource: PlanneurRessource, selectRessource: (ress: PlanneurRessource) => void, displayRessource: (ici: iXElementHolder, ressource: PlanneurRessource, managerLigne: xElement) => void, MouseClick: (div: xDiv, ress: PlanneurRessource) => void, MouseOut: (div: xDiv, ress: PlanneurRessource) => void,
        MouseOver: (div: xDiv, ress: PlanneurRessource) => void,surchargeFondGrille:(div: xDiv, p: PlanneurRessource, date: DateSerialisable) => void
    ) {
        let myThis: xxPlanneurLigne = this;
       
        myThis.Libelle = (ressource != null ? ressource.Libelle : "");
        myThis.Id = index;

        let classCss: string = "ligne line" + index; 
        if (index % 2 == 0 && index !=0)
            classCss += " pair";

        myThis.Div = new xDiv({ class: classCss });

        for (let i = 0; i <= nbColonnes; i++) {

            let colonne: xxPlanneurColonne;
            //Par défaut on crée une colonne simple
            colonne = new xxPlanneurColonne(planneur, i + 1, datesColonnes[i], ressource, false, false, function () { }, surchargeFondGrille );

            if (index == 0) { //Si c'est la première ligne, on place les libellés des colonnes
                if (i != 0) {
                    colonne = new xxPlanneurColonne(planneur, i + 1, datesColonnes[i], ressource, true, false, function () { }, function () { });
                }
            } else if (i == 0) { //sinon si première colonne, on place les libellés des ressources
                colonne = new xxPlanneurColonne(planneur, i + 1, datesColonnes[i], ressource, false, true, selectRessource, function () { });
                displayRessource(colonne.asHolder, ressource, myThis.Div);
            }
            

            myThis.Div.asHolder.append(colonne);
            myThis.Colonnes.push(colonne);
        }

        if (index != 0) {
            myThis.Div.asHolder.y.onmouseover= () =>{ MouseOver(myThis.Div, ressource) };
            myThis.Div.asHolder.y.onmouseout= ()=> { MouseOut(myThis.Div, ressource) };
            myThis.Div.asHolder.y.onclick = ()=> { MouseClick(myThis.Div, ressource) };
        }
    }
}

class xxPlanneur implements iXElement {
    private container: xDiv = null;
    private listeLignes: xxPlanneurLigne[] = [];
    public renderClassBloc: (d: DateSerialisable) => string;
    private dateDebut: DateSerialisable = null;
    private dateFin: DateSerialisable = null;
    
    private listeRessources: Dictionnaire<PlanneurRessource> = {};
    private listeRDV: PlanneurRDV[] = [];
    public renderDateColonne: (ici: iXElementHolder, dt: DateSerialisable) => void; 
    private Dates: DateSerialisable[] = [null];

    private IdsLignes: string[] = [];
    public taillePremiereColonne: number = 60;
    private cssTotalWidth: number = null;
    private spaceMinute: number = null;

    private NbColonnes: number;
    private NbLignes: number;

    private displayRdv: (ici: iXElementHolder, rdv: PlanneurRDV) => void;

    private displayRessource: (ici: iXElementHolder, ressource: PlanneurRessource, manager: xElement) => void;
    private selectRessource: (ress: PlanneurRessource) => void;

    private ligneMouseOver: (div: xDiv, ress: PlanneurRessource) => void = function () { };
    private ligneMouseOut: (div: xDiv, ress: PlanneurRessource) => void = function () { };
    private ligneMouseClick: (div: xDiv, ress: PlanneurRessource) => void = function () { };
    private surchargeFondGrille: (div: xDiv, ress: PlanneurRessource,dateCell:DateSerialisable) => void = function () { };
  
    get y() { return this.container.y; }

    constructor(opt: OptionsPlanneur) {
        let myThis: xxPlanneur = this;
        if (opt.surchargeFondGrille != null) { myThis.surchargeFondGrille = opt.surchargeFondGrille; }

        if (opt.taillePremiereColonne != null) { myThis.taillePremiereColonne = opt.taillePremiereColonne; }
        if (opt.listeRessources != undefined && opt.listeRessources != null)
            opt.listeRessources.forEach(function (e) {
                myThis.listeRessources[e.Id] = e;
                myThis.IdsLignes.push(e.Id);
            });

        if (opt.renderDateColonne != undefined) {
            myThis.renderDateColonne = opt.renderDateColonne;
        }

        if (opt.renderClassBloc != undefined) {
            myThis.renderClassBloc = opt.renderClassBloc;
        }
        else {
            myThis.renderClassBloc = (d: DateSerialisable) => ''; // myThis.renderClassBloc = (d:Date) => '';
        }
        myThis.NbColonnes = opt.nbJours;
        myThis.dateDebut = opt.dateDebut;
        myThis.dateDebut = DateSerialisable.setHeures(myThis.dateDebut, 0, 0, 0, 0); // myThis.dateDebut.setHours(0, 0, 0, 0); //on force le démarrage du planning à l'heure 00:00:00
        myThis.NbLignes = opt.listeRessources.length;

        myThis.displayRdv = opt.displayRdv;
        myThis.selectRessource = opt.selectRessource;

        if (opt.ligneMouseClick)
            myThis.ligneMouseClick = opt.ligneMouseClick;
        if (opt.ligneMouseOver)
            myThis.ligneMouseOver = opt.ligneMouseOver;
        if (opt.ligneMouseOut)
            myThis.ligneMouseOut = opt.ligneMouseOut;

        if (opt.displayRessource != null)
            myThis.displayRessource = opt.displayRessource;
        else
            myThis.displayRessource = function (ici : iXElementHolder, ressource: PlanneurRessource,manager:xElement) {
                let span: xSpan = new xSpan({ class: "libelleRessource", textVariable: ressource.Libelle });
                ici.append(span);
            };
        
        myThis.container = new xDiv({ class: "xxPlanneur" });

        //Génération des libellés des colonnes
        let date: DateSerialisable = DateSerialisable.CopyDateSerialisable(opt.dateDebut);
        myThis.Dates.push(DateSerialisable.CopyDateSerialisable(date)); 
        for (let i = 1; i < myThis.NbColonnes; i++) {
            date = DateSerialisable.addDaysSerialisable(date, 1) 
            //sauvegarde de la date dans un tableau pour y avoir un accès direct dans la colonne par la suite
            myThis.Dates.push(DateSerialisable.CopyDateSerialisable(date));
        }

        myThis.creerPlanneur();

        window.addEventListener('resize', function () {
            myThis.refreshRdv();
        });

    }

    private creerPlanneur():void {
        let myThis: xxPlanneur = this;

        //Construction des lignes du Planneur
        for (let i = 0; i <= myThis.NbLignes; i++) {
            myThis.creerLigne(i);
        }
    }

    private refreshRdv() {
        let myThis: xxPlanneur = this;
        let rdvs: PlanneurRDV[] = [];
        rdvs = rdvs.concat(myThis.listeRDV);
        myThis.supprimerRdv(myThis.listeRDV);
        myThis.ajouterRdv(rdvs);
    }

    public ajouterRessource(ress: PlanneurRessource)
    {
        let myThis: xxPlanneur = this;
        myThis.NbLignes = myThis.NbLignes + 1;

        myThis.listeRessources[ress.Id] = ress;
        myThis.IdsLignes.push(ress.Id);
        myThis.creerLigne(myThis.NbLignes);
    }

    public idRdvExist(id: string)
    {
        let myThis: xxPlanneur = this;
        return myThis.listeRDV.filter(r => r.Id == id).length > 0;
    }

    public  ajouterRdv(rdvs: PlanneurRDV[]):void {
        let myThis: xxPlanneur = this;
        let filtre = myThis.filterRDV(rdvs);
        myThis.listeRDV = myThis.listeRDV.concat(filtre);        

        // On récupère le nombre de pixel correspondant à 1 minute
        myThis.cssTotalWidth = <number>myThis.container.width() - myThis.taillePremiereColonne -1; //On supprime la première colonne
        console.log("taille premiereColonne " + myThis.taillePremiereColonne);
        myThis.spaceMinute = (myThis.cssTotalWidth / (myThis.NbColonnes * 24 * 60));

        //On récupère les spans associés aux heures pour mettre à jour la position des libellés heures du planneur
        let Spans6h = myThis.listeLignes[0].Colonnes.map(function (e) { return e.Span6h; }).forEach(function (elt) { elt.y.style.left = 6 * 60 * myThis.spaceMinute + "px"; });
        let Spans12h = myThis.listeLignes[0].Colonnes.map(function (e) { return e.Span12h; }).forEach(function (elt) { elt.y.style.left = 12 * 60 * myThis.spaceMinute + "px"; });
        let Spans18h = myThis.listeLignes[0].Colonnes.map(function (e) { return e.Span18h; }).forEach(function (elt) { elt.y.style.left = 18 * 60 * myThis.spaceMinute + "px"; });

        //Placement des rendez-vous
        filtre.forEach(function (e) {
            myThis.placerRDV(e);
        });       
    }

    public supprimerAllRdv(): void
    {
        let myThis: xxPlanneur = this;
        myThis.supprimerRdv(myThis.listeRDV);
    }

    public supprimerRdv(rdvs: PlanneurRDV[]): void {
        let myThis: xxPlanneur = this;

        rdvs.forEach(function (e) {
            let index = myThis.searchRdv(e);

            if (index >= 0 && myThis.listeRDV[index].Div != null) {
                myThis.listeRDV[index].Div.y.remove();
                myThis.listeRDV.splice(index, 1);
            }
        });

    }

    //Retourne l'index total à partir duquel placer la date dans le planneur
    public getPosition(d: DateSerialisable) {
        let myThis: xxPlanneur = this;

        let rdv = new PlanneurRDV("", "", d, d, []);

        let positions: number[] = myThis.calculerPosition(rdv);

        return positions[0];
    }

    private filterRDV(rdvs: PlanneurRDV[]): PlanneurRDV[] {
        let myThis: xxPlanneur = this;

        let res: PlanneurRDV[] = [];

        // Calcul de la date de fin du planning
        if (myThis.dateDebut == null)
            myThis.dateDebut = DateSerialisable.Now();

        myThis.dateFin = DateSerialisable.addDaysSerialisable(myThis.dateDebut, myThis.NbColonnes - 1);
        myThis.dateFin = DateSerialisable.setHeures(myThis.dateFin, 23, 59, 59, 59);

        //Pour chaque rdv, on vérifie sa validité dans la plage horaire du planning
        rdvs.forEach(function (rdv) 
        {
            if (rdv.isValid()) 
            {
                //On enlève les rdv qui sont en dehors des bornes du planning.
                if (rdv.DateFin.MaDateLong >= myThis.dateDebut.MaDateLong && rdv.DateDebut.MaDateLong <= myThis.dateFin.MaDateLong)
                {
                    if (rdv.Ressources != null)
                    {
                        let ok: boolean = rdv.Ressources.some(function (val, index) { return myThis.listeRessources[val] != null });

                        if (ok)
                            res.push(rdv);
                    }
                }

            }    
        });

        return res;
    }

    private placerRDV(rdv: PlanneurRDV) :void{
        let myThis: xxPlanneur = this;

        if (rdv.isValid()) {
            //On construit le tableau de string associé aux lignes
            let tab: string[] = myThis.listeLignes.map(function (e) { return e.Libelle; });
            //On parcourt toutes les ressources associées au rdv
            rdv.Ressources.forEach(function (ressource) {
                let indexLigne = myThis.rechercheTableau(myThis.listeRessources[ressource].Libelle, tab);

                //Si on a trouvé la ressource correspondante
                if (indexLigne > -1) {
                    myThis.renderRDV(indexLigne, rdv);
                }
            });
        }
    }

    private renderRDV(indexLigne: number, rdv: PlanneurRDV): void {
        let myThis: xxPlanneur = this;

        let getPosition = myThis.calculerPosition(rdv);

        let surchargeCSS: string = "";
        if (rdv.ClassCss != undefined) { surchargeCSS = rdv.ClassCss; }
        
        rdv.Div = new xDiv({ class: "rdv "+ surchargeCSS, id: rdv.Id });

        rdv.left = getPosition[0];
        rdv.width = getPosition[1];

        rdv.Div.y.style.left = rdv.left + "px";
        rdv.Div.y.style.width = rdv.width + "px";

        if (rdv.initContent != undefined && rdv.initContent!=null) {
            rdv.Div.asHolder.append(rdv.initContent);
        }
        myThis.displayRdv(rdv.Div.asHolder, rdv);

        if (myThis.listeLignes[indexLigne] != undefined)
            myThis.listeLignes[indexLigne].asHolder.append(rdv.Div);
    }

    private calculerPosition(rdv: PlanneurRDV): number[] 
    {
        let myThis: xxPlanneur = this;
     
        let dateDebutCalcul: DateSerialisable = rdv.DateDebut;
        let dateFinCalcul: DateSerialisable = rdv.DateFin;

        if (rdv.DateDebut.MaDateLong < myThis.dateDebut.MaDateLong)
            dateDebutCalcul = myThis.dateDebut;

        if (rdv.DateFin.MaDateLong > myThis.dateFin.MaDateLong)
            dateFinCalcul = myThis.dateFin;

        let duree: number = myThis.dateDiff(dateDebutCalcul, dateFinCalcul);
        let dureeFromDebut: number = myThis.dateDiff(myThis.dateDebut, dateDebutCalcul);

        let left: number = dureeFromDebut * myThis.spaceMinute + myThis.taillePremiereColonne-2; //58 car on doit supprimer les pixels correspondants aux bordures !

        let width: number = duree * myThis.spaceMinute;
        let widthMax = myThis.cssTotalWidth - left + myThis.taillePremiereColonne - 2;

        if (width > widthMax)
            width = widthMax; 

        return [left, width];
    }

    private creerLigne(index: number) {
        let myThis: xxPlanneur = this;

        let ressource = index != 0 ? myThis.listeRessources[myThis.IdsLignes[index-1]] : null;
        let ligne = new xxPlanneurLigne(myThis,index, myThis.NbColonnes, myThis.Dates, ressource, myThis.selectRessource, myThis.displayRessource, myThis.ligneMouseClick, myThis.ligneMouseOut, myThis.ligneMouseOver,myThis.surchargeFondGrille);

        myThis.listeLignes.push(ligne);
        myThis.container.asHolder.append(ligne);
    }

    private rechercheTableau(libelle: string, tab: string[]): number {
        let res = -1;
        let i: number = 0;
        while (i < tab.length && tab[i] != libelle)
            i++;

        //Si trouvé
        if (i < tab.length)
            res = i;

        return res;
    }

    private searchRdv(rdv: PlanneurRDV): number {
        let myThis: xxPlanneur = this;

        let i: number = 0;
        let retour: number = -1;

        while (i < myThis.listeRDV.length && myThis.listeRDV[i].Id != rdv.Id)
            i++;

        if (i < myThis.listeRDV.length)
            retour = i;

        return retour;
    }

    //Retourne la différence entre 2 dates en minutes
    private dateDiff(d1: DateSerialisable, d2: DateSerialisable): number {

        let ms = Math.abs(d2.MaDateLong - d1.MaDateLong);
  
        return (ms/(60*1000));
    }

}