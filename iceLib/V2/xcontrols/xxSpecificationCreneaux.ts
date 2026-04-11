
interface OptionsInfosCreneaux
{
    dateDebut: DateSerialisable,
    joursSelectionnes: number[],
    heureDebut: xTime,
    heureFin: xTime
}

enum EJoursSemaine
{
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

class xxSpecificationCreneaux implements iXElement
{
    // --------- //
    // Attributs //
    // --------- //
    private dateDebut: DateSerialisable;
    private joursSelectionnes: number[] = [];
    private heureDebut: xTime;
    private heureFin: xTime;

    private monLabel: xxLabel;
    private btnAnnuler: xxBouton;
    private btnValider: xxBouton;
    private choixHeureDebut: xInputTime;
    private choixHeureFin: xInputTime;
    private monBoxer: xxBoxer;
    private callbackValider?: (o :OptionsInfosCreneaux) => void;

    // ------------ //
    // Constructeur //
    // ------------ //
    constructor(callbackValider: (o: OptionsInfosCreneaux) => void, debutCrenaux: DateSerialisable = null)
    {
        let myThis: xxSpecificationCreneaux = this;

        myThis.callbackValider = callbackValider;

        myThis.monBoxer = new xxBoxer({
            tailleBoxer: enumBoxerTaille.fit,
            class:"xxSpecificationCreneaux"
        });

        myThis.monLabel = new xxLabel({
            textLocalise: "Créneaux spécifiques",
            type: enumTypeLabel.description,
            lien: {
                url: "#",
                click: function (e)
                {
                    e.stopPropagation();
                    myThis.monBoxer.afficher();
                },
                typeOuverture: enumTypeOuvertureHref.MemeEmplacement
            },
            
        });

        let contenuBoxer: xxPageWrapper = new xxPageWrapper({
            titleLocalise: "Choisir des créneaux",
            withFooter: true
        });

        if (debutCrenaux != null)
            myThis.dateDebut = debutCrenaux;
        else
            myThis.dateDebut = DateSerialisable.Now();

        console.log(DateSerialisable.getDate(myThis.dateDebut))
        

        let coupleChoixDate: xxLabelContainer = new xxLabelContainer({
            textLocalise: "À partir du",
            class:"coupleChoixDate",
            labelLargeurLibre:true,
            initContent: new xInputDate({
                value: DateSerialisable.CopyDateSerialisable(myThis.dateDebut),
                ValueChange: function (val)
                {
                    myThis.dateDebut = DateSerialisable.CopyDateSerialisable(val);
                }
            })
        });

        let wrapSemaine: xxWrapPanel = new xxWrapPanel({ class: "wrapSemaine" });

        let tab = [EJoursSemaine.Monday, EJoursSemaine.Tuesday, EJoursSemaine.Wednesday, EJoursSemaine.Thursday, EJoursSemaine.Friday, EJoursSemaine.Saturday, EJoursSemaine.Sunday];

        tab.forEach(function (item)
        {
            myThis.joursSelectionnes.push(Number(item));
            wrapSemaine.append(new xxCheckBox({
                typeCheckbox: enumTypeCheckbox.texte,
                value: true,
                ValueChange: function (val)
                {
                    if (val)
                    {
                        myThis.joursSelectionnes.push(Number(item));
                    }
                    else
                    {
                        myThis.joursSelectionnes.splice(myThis.joursSelectionnes.indexOf(Number(item)), 1);
                    }
                },
                titleVariable: myThis.getJourSemaineLibelle(item),
                textVariable: myThis.getJourSemaineLibelle(item).charAt(0)
            }));

        });

        let coupleChoixJour: xxLabelContainer = new xxLabelContainer({
            textLocalise: "Jours spécifiques",
            labelLargeurLibre: true,
            initContent: wrapSemaine,
            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas }
        });

        myThis.choixHeureDebut = new xInputTime({
            ValueChange: (val) =>
            {
                myThis.heureDebut = val;
            }
        });
        myThis.choixHeureFin = new xInputTime({
            ValueChange: (val) =>
            {
                myThis.heureFin = val;
            }
        });

        let choixHeureDebut: xxLabelContainer = new xxLabelContainer({
            textLocalise: "De",
            labelLargeurLibre: true,
            initContent: myThis.choixHeureDebut
        });

        let choixHeureFin: xxLabelContainer = new xxLabelContainer({
            textLocalise: "à",
            labelLargeurLibre: true,
            initContent: myThis.choixHeureFin
        });

        let choixHeure: xxWrapPanel = new xxWrapPanel({
            initContent: [
                choixHeureDebut,
                choixHeureFin
            ]
        });

        myThis.btnAnnuler = new xxBouton({
            textLocalise: "Recherche manuelle",
            id: "xxSpecificationCreneaux_recherche_manuelle",
            class: "btnAnnulerFooter",
            titleLocalise: "Rechercher un créneau manuellement",
            icone: new IconeCs3i(enumIconeCs3i.action_apercu),
            click: async (cb) =>
            {
                myThis.monBoxer.fermer();
                cb();
            }
        });

        myThis.btnValider = new xxBouton({
            textLocalise: "Recherche automatique",
            id: "xxSpecificationCreneaux_automatique",
            class: "btnValiderFooter",
            titleLocalise: "Rechercher un créneau via l'assistant de planification",
            icone: new IconeCs3i(enumIconeCs3i.action_baguette_auto),
            click: async (cb) =>
            {
                myThis.callbackValider({
                    dateDebut: myThis.dateDebut,
                    joursSelectionnes: myThis.joursSelectionnes,
                    heureDebut: myThis.heureDebut,
                    heureFin: myThis.heureFin
                });
                myThis.monBoxer.fermer();
                cb();
            }
        });

        contenuBoxer.append(coupleChoixDate);
        contenuBoxer.append(coupleChoixJour);
        contenuBoxer.append(choixHeure);
        contenuBoxer.appendZoneFooter(myThis.btnAnnuler);
        contenuBoxer.appendZoneFooter(myThis.btnValider);
        myThis.monBoxer.ajouterContenu(contenuBoxer);
    }

    private getJourSemaineLibelle(jour: EJoursSemaine): string
    {
        switch (jour)
        {
            case EJoursSemaine.Monday:
                return new xLString("Lundi").text;
            case EJoursSemaine.Tuesday:
                return new xLString("Mardi").text;
            case EJoursSemaine.Wednesday:
                return new xLString("Mercredi").text;
            case EJoursSemaine.Thursday:
                return new xLString("Jeudi").text;
            case EJoursSemaine.Friday:
                return new xLString("Vendredi").text;
            case EJoursSemaine.Saturday:
                return new xLString("Samedi").text;
            case EJoursSemaine.Sunday:
                return new xLString("Dimanche").text;
            default:
                return "";
        }
    }

    // -------- //
    // Methodes //
    // -------- //

    get y() {
        let myThis: xxSpecificationCreneaux = this;

        return myThis.monLabel.y;
    }

    public afficher() {
        let myThis: xxSpecificationCreneaux = this;

        myThis.monBoxer.afficher();
    }
}