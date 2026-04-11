
enum enumTypeDispo {
    Planning,
    Barre,
    Bloc,
}

class PlanningRdv {

    public Id: number;
    public IdExterne: number;
    public IdExterne2: number;
    public Libelle: string;
    public DateDebut: DateSerialisable;
    public DateFin: DateSerialisable;
    public Couleur: string;
    public IsRdvCompared: boolean;
    public Ressource: number;
    public Class: string;
    public Item: xxGrid | xxToolTip | xxLabel | xxWrapPanel | xxStackPanel|xxGridItem|xDiv;
    public DureeMin: number;
    public isAggrandisable: boolean;
    public isDeplacable: boolean;

    constructor(libelle: string, id: number, idExterne?: number, IdExterne2?: number, debut?: DateSerialisable, fin?: DateSerialisable, ressources?: number, couleur?: string, Class?: string, isAggrandisable: boolean = true, isDeplacable = true, isRdvCompared: boolean = false) {
        let myThis: PlanningRdv = this;

        myThis.DateDebut = debut;
        myThis.DateFin = fin;
        myThis.Libelle = libelle;
        myThis.Id = id;
        myThis.IdExterne = idExterne;
        myThis.IdExterne2 = IdExterne2;
        myThis.Couleur = couleur;
        myThis.Ressource = ressources;
        myThis.Class = Class;
        myThis.isAggrandisable = isAggrandisable;
        myThis.isDeplacable = isDeplacable;
        myThis.Item = null;
        myThis.IsRdvCompared = isRdvCompared;
        // myThis.DureeMin = Math.round((myThis.DateFin.getTime() - myThis.DateDebut.getTime()) / 60000);
        myThis.DureeMin = Math.round((myThis.DateFin.MaDateLong - myThis.DateDebut.MaDateLong) / 60000);
    }

    public renderRdv(): iXElement {
        let myThis: PlanningRdv = this;

        let divDefaut = new xDiv({
            class: "rdv",
            textVariable: myThis.Libelle
        });

        divDefaut.y.style.backgroundColor = "#" + myThis.Couleur;

        return divDefaut;
    }

    public Contains(rdv: PlanningRdv): boolean {
        let myThis: PlanningRdv = this;

        //return !(rdv.DateFin <= myThis.DateDebut || rdv.DateDebut >= myThis.DateFin);        
        //return !(rdv.DateFin.MaDateLong <= myThis.DateDebut.MaDateLong || rdv.DateDebut.MaDateLong >= myThis.DateFin.MaDateLong);        
        return !(DateSerialisable.getDate(rdv.DateFin) <= DateSerialisable.getDate(myThis.DateDebut) || DateSerialisable.getDate(rdv.DateDebut) >= DateSerialisable.getDate(myThis.DateFin));        
    }

    public AddClassCss(classCss: string) {
        let myThis: PlanningRdv = this;

        myThis.Item.addClass(classCss);
    }

    public RemoveClassCss(classCss: string) {
        let myThis: PlanningRdv = this;

        myThis.Item.removeClass(classCss);
    }
}

class PlanningRessource {

    public Libelle: string;
    public Id: number;

    constructor(libelle: string, id: number) {
        let myThis: PlanningRessource = this;

        myThis.Libelle = libelle;
        myThis.Id = id;
    }
}

class PlanningDisponibilite {

    public Id: string;
    public Libelle: string;
    public IdRessource: string;
    public DateDebut: DateSerialisable;
    public DateFin: DateSerialisable;
    public Couleur: string;
    public Item: xxGridItem;
    public Type: enumTypeDispo;
    public Position: number;

    constructor(Libelle: string, Id: string, Debut: DateSerialisable, Fin: DateSerialisable, Couleur: string = null, type: enumTypeDispo = enumTypeDispo.Planning, IdRessource: string = "", Position: number = 1) {
        let myThis: PlanningDisponibilite = this;

        myThis.Libelle = Libelle;
        myThis.Id = Id;
        myThis.DateDebut = Debut;
        myThis.DateFin = Fin;
        myThis.Couleur = Couleur
        myThis.IdRessource = IdRessource;
        myThis.Item = null;
        myThis.Type = type;
        myThis.Position = Position;
    }

    public renderDispo(): iXElement {
        let myThis: PlanningDisponibilite = this;

        let divDefaut = new xDiv({
            class: "dispo",
            textVariable: myThis.Libelle
        })

        divDefaut.y.style.backgroundColor = "#" + myThis.Couleur;

        return divDefaut;
    }

    public Contains(dispo: PlanningDisponibilite): boolean {
        let myThis: PlanningDisponibilite = this;

        return !(dispo.DateFin.MaDateLong <= myThis.DateDebut.MaDateLong || dispo.DateDebut.MaDateLong >= myThis.DateFin.MaDateLong);        
    }
}

class PlanningParamUser {
    public KeyPlanning: string;
    public Zoom?: number;
    public Arrondissement?: number;
    public DureeRdv?: number;
    public PrevisualisationRdv?: boolean;

    constructor(KeyPlanning: string, zoom?: number, arrondissement?: number, dureeRdv?: number, previsualisationRdv?: boolean) {
        let myThis: PlanningParamUser = this;

        myThis.KeyPlanning = KeyPlanning;
        myThis.Zoom = zoom;
        myThis.Arrondissement = arrondissement;
        myThis.DureeRdv = dureeRdv;
        myThis.PrevisualisationRdv = previsualisationRdv
    }





}