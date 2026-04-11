interface optionSvgImpression {
    strokeWidth?: number;
    fontSize1?: number;
    fontSize2?: number;
}


class ImpressionRessource {
    public Id: number;
    public Libelle: string;


    public constructor(id: number, libelle: string) {
        let myThis: ImpressionRessource = this;
        myThis.Id = id;
        myThis.Libelle = libelle;

    }
}

class ImpressionRdv {

    public id: number;
    public objet: string;
    public dateDebut: DateSerialisable;
    public dateFin: DateSerialisable;
    public duree: number;
    public infoPatient: string;
    public couleur: string;
    public ressource: number;
    public text: string;
    public optionSvg: optionSvgImpression = null;

    public x: number;
    public width: number;
    public y: number;
    public height: number;

    public fontSize1: number = 7;
    public fontSize2: number = 7;
    public strokeWidth: number = 2;

    public constructor(Id: number, Objet: string, DateDebut: DateSerialisable, DateFin: DateSerialisable, Duree: number, InfoPatient: string, Couleur: string, Ressource: number, TexteSupplementaire?: string, optionSvg?:optionSvgImpression) {
        let myThis: ImpressionRdv = this;

        myThis.id = Id;
        myThis.objet = Objet;
        myThis.dateDebut = DateDebut;
        myThis.dateFin = DateFin;
        myThis.duree = Duree;
        myThis.infoPatient = InfoPatient;
        myThis.couleur = Couleur;
        myThis.ressource = Ressource;
        myThis.text = TexteSupplementaire;

        if (optionSvg != null) {
            myThis.fontSize1 = optionSvg.fontSize1 != null ? optionSvg.fontSize1 : myThis.fontSize1;
            myThis.fontSize2 = optionSvg.fontSize2 != null ? optionSvg.fontSize2 : myThis.fontSize2;
            myThis.strokeWidth = optionSvg.strokeWidth != null ? optionSvg.strokeWidth : myThis.strokeWidth;
        }
    }

    public Contains(rdv: ImpressionRdv): boolean {
        let myThis: ImpressionRdv = this;

        return !(DateSerialisable.getDate(rdv.dateFin) <= DateSerialisable.getDate(myThis.dateDebut) || DateSerialisable.getDate(rdv.dateDebut) >= DateSerialisable.getDate(myThis.dateFin));
    }

    public GenerateSVG(): string {
        let myThis: ImpressionRdv = this;

        let dateDeb = DateSerialisable.getDate(myThis.dateDebut)
        let heureDeb = '' + dateDeb.getHours() + 'h';
        if (dateDeb.getMinutes() != 0)
        { heureDeb = heureDeb + dateDeb.getMinutes() }

        let dateFin = DateSerialisable.getDate(myThis.dateFin)

        let heureFin = '' + dateFin.getHours() + 'h';
        if (dateFin.getMinutes() != 0) { heureFin = heureFin + dateFin.getMinutes() }

        let text = "";
        if (myThis.objet != null && myThis.objet != "") {
            text += ' - ' + myThis.objet;
        }

        let svg = '<g transform="translate(' + myThis.x + ',' + myThis.y + ')">';
        svg += '<rect x="1" y="1" width="' + (myThis.width-2) + '" height="' + (myThis.height-2) + '" stroke-width="'+ myThis.strokeWidth +'" stroke="black" fill="' + myThis.couleur + '" /> ';
        if(myThis.height > 10)
            svg += '<text x="2" y="10" font-size="'+myThis.fontSize1+'" > ' + heureDeb + '-' + heureFin + text + ' < /text>';
        if(myThis.height >20)
            svg += '<text x="2" y ="20" font-size="' + myThis.fontSize2 +'" >' + myThis.infoPatient + ' </text>';
        if (myThis.height > 30 && myThis.text != null)
            svg += '<text x="2" y ="30" font-size="' + myThis.fontSize2 +'" >' + myThis.text + ' </text>';
        svg += '</g > ';

        return svg;
    }
}

class ColonneImpresssion {

    private date: DateSerialisable;
    private rdvs: ImpressionRdv[];
    private ressource: ImpressionRessource;
    public x: number; // xGeneral de la colonne
    public y: number;
    private nbColonnes: number;
    private nbLignes: number;
    private largeurCol: number;
    private hauteurMinute: number;
    private heureFin: number;
    private heureDeb: number;

    public constructor(Date: DateSerialisable, Rdvs: ImpressionRdv[], NbLignes: number, LargeurCol: number, HauteurMinute: number, HeureDebut: number, HeureFin: number, Ressource: ImpressionRessource, X: number, Y: number) {
        let myThis: ColonneImpresssion = this;

        myThis.date = Date;
        myThis.rdvs = Rdvs.filter(c => c.duree > 0);
        myThis.nbLignes = NbLignes;
        myThis.largeurCol = LargeurCol;
        myThis.hauteurMinute = HauteurMinute;
        myThis.heureDeb = HeureDebut;
        myThis.heureFin = HeureFin;
        myThis.ressource = Ressource;
        myThis.x = X;
        myThis.y = Y;

        // TODO: PB avec les zero je pense que ça 

        myThis.getNombreColonne();

        myThis.rdvs.forEach(e => myThis.calculerXRdv(e));
    }

    public getNombreColonne() {
        let myThis: ColonneImpresssion = this;
        let listeRdvEnMemetemps: number[] = [];
       
        myThis.rdvs.forEach(item => {
            let rdvEnMemeTemps = myThis.rdvs.filter(c => item.id != c.id && item.Contains(c));
            let aEnlever = 0;

            rdvEnMemeTemps.forEach(rdvTester => {
                if (rdvEnMemeTemps.some(d => d.id != rdvTester.id && !d.Contains(rdvTester)))
                    aEnlever = 1
            });

            listeRdvEnMemetemps.push(myThis.rdvs.filter(c => item.Contains(c)).length - aEnlever);
        });

        let positionMax = 1;

        let ppcmRdv = 1;
        if (listeRdvEnMemetemps.length > 0)
            ppcmRdv = xMaths.PPCMListe(listeRdvEnMemetemps);
        myThis.nbColonnes = xMaths.PPCM(ppcmRdv, positionMax);
        return myThis.nbColonnes;
    }

    private calculerXRdv(rdv: ImpressionRdv) {
        let myThis: ColonneImpresssion = this;

        let minimalWidth = myThis.largeurCol / myThis.nbColonnes

        let rdvEnMemeTemps = myThis.rdvs.filter(c => rdv.Contains(c)).sort((a, b) => {
            return DateSerialisable.CompareDate(a.dateDebut, b.dateDebut);
        });

        // Sert lors que un rdv est en même temps que deux rdv qui se suibe l'un l'autre
        let aEnlever = 0;

        rdvEnMemeTemps.forEach(rdvTester => {
            if (rdv.id != rdvTester.id) {
                if (rdvEnMemeTemps.some(d => d.id != rdvTester.id && !d.Contains(rdvTester)))
                    aEnlever = 1
            }
        });

        let nbCol = myThis.nbColonnes / (rdvEnMemeTemps.length - aEnlever);
        let indexRdv = rdvEnMemeTemps.indexOf(rdv);

        let widthRdv = nbCol * minimalWidth

        let xRdv: number = (indexRdv * nbCol) * minimalWidth;

        rdv.width = widthRdv;
        rdv.x = xRdv;
        rdv.height = rdv.duree * myThis.hauteurMinute;
        rdv.y = ((DateSerialisable.getDate(rdv.dateDebut).getHours() - myThis.heureDeb) * 60 + DateSerialisable.getDate(rdv.dateDebut).getMinutes()) * myThis.hauteurMinute
    }

    private GetNameDay(num: number): string {
        let name: string = "";

        switch (num) {
            case 0:
                name = "Dimanche";
                break;
            case 1:
                name = "Lundi";
                break;
            case 2:
                name = "Mardi";
                break;
            case 3:
                name = "Mercredi";
                break;
            case 4:
                name = "Jeudi";
                break;
            case 5:
                name = "Vendredi";
                break;
            case 6:
                name = "Samedi";
                break;
        }
        return name;
    }

    public GenerateSVG() {
        let myThis: ColonneImpresssion = this;

        let svgCol = "";

        svgCol += '<g><rect width="' + myThis.largeurCol + '" height ="' + 20 + '" stroke-width="2" stroke="black"  fill="white" transform="translate(0,10)"/>'
        if (myThis.ressource == null) {

            let date = DateSerialisable.getDate(myThis.date)

            svgCol += '< text x="2" y="25" font-size="10">' + new xLString(myThis.GetNameDay(date.getDay())).text + ' ' + DateSerialisable.tolocalStringOnlyDate(myThis.date).substring(0, 5) + '< /text> </g>';
        }
        else
            svgCol += '< text x="2" y="25" font-size="10">' + myThis.ressource.Libelle + '< /text> </g>';

        for (let y = 0; y < myThis.nbLignes; y++) {
            let posY = 30 + myThis.hauteurMinute * 60 * y;

            svgCol += '<rect width="' + myThis.largeurCol + '" height ="' + (myThis.hauteurMinute * 60) + '" stroke-width="1" stroke="black" transform="translate(0,' + posY + ')" fill="white"/>'
        }

        let tmp = '<g transform="translate(' + myThis.x + ',' + myThis.y + ')">' + svgCol + '<g transform="translate(0,30)">';

        myThis.rdvs.forEach(e => tmp += e.GenerateSVG());

        return tmp + '</g></g>';
    }
}

class PageImpression {

    private nbCol: number;
    private dateDebut: DateSerialisable;
    private rdvs: ImpressionRdv[];
    private ressources: ImpressionRessource[];
    private heureDeb: number;
    private heureFin: number;
    private numeroPage: number;
    private largeurCol: number;
    private largeurPage = 582;
    private hauteurPage = 832;
    private hauteurMinute: number;


    private svgEntete: string;
    private svgHeure: string;

    public constructor(nombreCol: number, DateDebut: DateSerialisable, Rdvs: ImpressionRdv[], Ressources: ImpressionRessource[], Hdebut: number, Hfin: number, numeroPage: number, largeurCol: number, hauteurMinute: number, svgEntete: string, svgHeure: string) {
        let myThis: PageImpression = this;

        myThis.nbCol = nombreCol;
        myThis.dateDebut = DateDebut;
        myThis.rdvs = Rdvs;
        myThis.ressources = Ressources;
        myThis.heureDeb = Hdebut;
        myThis.heureFin = Hfin;
        myThis.numeroPage = numeroPage;
        myThis.largeurCol = largeurCol;
        myThis.hauteurMinute = hauteurMinute;

        myThis.svgEntete = svgEntete;
        myThis.svgHeure = svgHeure;
    }

    public GeneratePage(): pdfMake.pdfMakeElement[] {
        let myThis: PageImpression = this;

        let nbLignes = myThis.heureFin - myThis.heureDeb;

        let svgPlanning = '<svg xmlns="http://www.w3.org/2000/svg" width="' + myThis.hauteurPage + '" height="' + myThis.largeurPage + '">';

        if (myThis.ressources == null) {
            for (let jour = 0; jour < myThis.nbCol; jour++) {
                let dateTmp = DateSerialisable.addDaysSerialisable(myThis.dateDebut, jour);
                let posX = myThis.largeurCol * jour;

                let debutJour = DateSerialisable.setHeures(dateTmp, 0, 0, 0, 0);
                let finJour = DateSerialisable.setHeures(dateTmp, 23, 59, 59, 59);


                //let dateDate = DateSerialisable.getDate(dateTmp);
                //let dateDebutJour = DateSerialisable.Factory(new Date(dateDate.getFullYear(), dateDate.getMonth(), dateDate.getDate(), 0, 0, 0, 0));
                //let dateFinJour = DateSerialisable.Factory(new Date(dateDate.getFullYear(), dateDate.getMonth(), dateDate.getDate(), 23, 59, 59, 59));

                let col = new ColonneImpresssion(dateTmp,
                    myThis.rdvs.filter(e => DateSerialisable.CompareDate(e.dateDebut, debutJour) != -1 && DateSerialisable.CompareDate(e.dateFin, finJour) == -1), // myThis.rdvs.filter(e => DateSerialisable.CompareDate(e.dateDebut, fin) != -1 && DateSerialisable.CompareDate(e.dateFin, dateFinJour)==-1),
                    nbLignes, myThis.largeurCol, myThis.hauteurMinute, myThis.heureDeb, myThis.heureFin, null, posX, 0);
                svgPlanning += col.GenerateSVG();
            }
        }
        else {
            for (let res = 0; res < myThis.ressources.length; res++) {
                let dateTmp = DateSerialisable.addDaysSerialisable(myThis.dateDebut, res);
                let posX = myThis.largeurCol * res;

                let col = new ColonneImpresssion(dateTmp,
                    myThis.rdvs.filter(e => e.ressource == myThis.ressources[res].Id),
                    nbLignes, myThis.largeurCol, myThis.hauteurMinute, myThis.heureDeb, myThis.heureFin, myThis.ressources[res], posX, 0);
                svgPlanning += col.GenerateSVG();
            }
        }

        svgPlanning += '</svg>';
        let svgNumeroPage = '<svg><text x="2" y="15" font-size="10">' + myThis.numeroPage + '</text> </svg>';
        let svgDateEditionImpression = '<svg><text x="2" y="15" font-size="10"> ' + new xLString("édité le {0} à {1}").format([xOutils.DateToFrenchDateString(DateSerialisable.Now(), false, false), xOutils.DateToFrenchTimeString(DateSerialisable.Now(), false)]) + '</text> </svg>';
        svgDateEditionImpression
        let elementPdfEntete: pdfMake.pdfMakeElement = myThis.numeroPage != 1 ? { svg: myThis.svgEntete, pageBreak: "before" } : {
            svg: myThis.svgEntete, absolutePosition: {x:0,y:10} }

        return [elementPdfEntete,
            { svg: myThis.svgHeure, absolutePosition: { x: 20, y: 60 } },
            { svg: svgPlanning, absolutePosition: { x: 50, y: 30 } },
            { svg: svgDateEditionImpression, absolutePosition: { x: 700, y: 577 } },
            { svg: svgNumeroPage, absolutePosition: { x: 810, y: 10 } },            
        ];
    }
}