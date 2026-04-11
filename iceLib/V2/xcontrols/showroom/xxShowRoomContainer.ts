interface optionsxxShowRoomContainer
{
    CallOldShowRoom_Temporaire?: (cb: () => void)=>void
}

enum ExxShowRoomContainerTypeOption
{
    SousInterface, // Permet de definir une autre liste de IxxShowRoomDefineOption
    ListeSousInterface,
    Texte,
    TexteLocalisable,
    Enum,
    Boolean,
    Function,
    Number,
    Icone,
    CouleurHexa,
    Date,
    DateSerialisable,
    iXElement,
    ListeiXElement,
    Donnees,
    Time,
    Pagewapper,
    CotesCSS,
    Custom // A voir en tant que type four tous ou le dev pour définir dans une function comme genere l’element de saisie de l’option si c’est trop specific
}

enum ExxShowRoomContaineGoupeElement
{
    xElement="x",
    xxElement="xx",
    xxxElement="xxx",
    deprecated_DontUse="xxxx"
}

enum ExxShowRoomContaineDataType
{
    number="number",
    string="string",
    boolean = "boolean",
    CleValeur="CleValeur<string, string>",
    CustomObjet="T"
}

//#region DefineOption
interface IxxShowRoomContainerDefineOptionBase
{
    Facultatif?: boolean;
    IsDeprecated?: boolean;
    description?: string;
}

interface IxxShowRoomContainerDefineOptionTexte extends IxxShowRoomContainerDefineOptionBase
{
    NameOption: string;
    TypeOption: ExxShowRoomContainerTypeOption.Texte; //permet de definir cette interface a utilise quand type = texte 
    ValeurDefaut?: string;
}

interface IxxShowRoomContainerDefineOptionTexteLocalisable extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable; //permet de definir cette interface a utilise quand type = TexteLocalisable 
    NameOptionLocalisable: string;
    NameOptionVariable: string;
    ValeurDefaut?: string;
}

interface IxxShowRoomContainerDefineOptionSousInterface extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.SousInterface; //permet de definir cette interface a utilise quand type = SousInterface 
    NameOption: string;
    listOption: IxxShowRoomContainerDefineOption[];
}

interface IxxShowRoomContainerDefineOptionListeSousInterface extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface; //permet de definir cette interface a utilise quand type = ListeSousInterface 
    NameOption: string;
    listOption: IxxShowRoomContainerDefineOption[];
}

interface IxxShowRoomContainerDefineOptionBoolean extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.Boolean; //permet de definir cette interface a utilise quand type = Boolean 
    NameOption: string;
    ValeurDefaut?: boolean; // Si null egal false
}

interface IxxShowRoomContainerDefineOptionNumber extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.Number; //permet de definir cette interface a utilise quand type = Number 
    NameOption: string;
    ValeurDefaut?: number;
}

interface IxxShowRoomContainerDefineOptionFunction extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.Function; //permet de definir cette interface a utilise quand type = Function 
    NameOption: string;
    isDefaultSelect?: boolean;
    /** Ecrivez les paramettres meme si voulez utiliser pas, ca permet de les avoir afficher dans le code AutoGeneré */
    Function: Function;
}

interface IxxShowRoomContainerDefineOptionEnum extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.Enum; //permet de definir cette interface a utilise quand type = Enum 
    NameOption: string;
    /** Permet d'avoir le nom de l'enum pour la generation auto et d'avoir les elements de l'enum avec la fonction Eval*/
    EnumType: string;
    /** en sois une enum est un objet avec des attributs qui son soit string ou number */
    ValeurDefaut: string | number;
}

interface IxxShowRoomContainerDefineOptionIcon extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.Icone; //permet de definir cette interface a utilise quand type = Icone 
    NameOption: string;
    ValeurDefaut?: Icone;
}

interface IxxShowRoomContainerDefineOptionCouleurHexa extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.CouleurHexa; //permet de definir cette interface a utilise quand type = CouleurHexa
    NameOption: string;
}

interface IxxShowRoomContainerDefineOptionDateSerialisable extends IxxShowRoomContainerDefineOptionBase {
    TypeOption: ExxShowRoomContainerTypeOption.DateSerialisable; //permet de definir cette interface a utilise quand type = Date
    NameOption: string;
    ValeurDefaut?: DateSerialisable;
}
interface IxxShowRoomContainerDefineOptionDate extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.Date; //permet de definir cette interface a utilise quand type = Date
    NameOption: string;
    ValeurDefaut?: Date;
}

interface IxxShowRoomContainerDefineOptionIXElement extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.iXElement; //permet de definir cette interface a utilise quand type = IxElement
    NameOption: string;
    ValeurDefaut?: boolean;
    ValeurSample?: iXElement
}

interface IxxShowRoomContainerDefineOptionListeIXElement extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement; //permet de definir cette interface a utilise quand type = ListeiXElement
    NameOption: string;
    ValeurDefaut?: iXElement[];
}

interface IxxShowRoomContainerDefineOptionTime extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.Time; //permet de definir cette interface a utilise quand type = Time
    NameOption: string;
    ValeurDefaut?: xTime;
}

interface IxxShowRoomContainerDefineOptionDonnees extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.Donnees; //permet de definir cette interface a utilise quand type = Donnees
    NameOption: string;
    DataType: ExxShowRoomContaineDataType;
    ValeurDefaut?: any[];
    ValeurSample?: any[];
}

interface IxxShowRoomContainerDefineOptionPageWapper extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.Pagewapper; //permet de definir cette interface a utilise quand type = pagewapper
    NameOption: string;
    ValeurDefaut?: boolean;
}

interface IxxShowRoomContainerDefineOptionCotesCSS extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.CotesCSS; //permet de definir cette interface a utilise quand type = pagewapper
    NameOption: string;
    ValeurDefaut?: OptionsCotesCSS;
}

/** /!\ Attention si vous ne trouvez pas le type d'option qu'il vous faut car trop specifique demandé de l'aide a Aimeric-Thomas Dalvai /!\ */
interface IxxShowRoomContainerDefineOptionCustom extends IxxShowRoomContainerDefineOptionBase
{
    TypeOption: ExxShowRoomContainerTypeOption.Custom; //permet de definir cette interface a utilise quand type = Cutom
    NameOption: string;
    GenerateOption: (returnData: (data: any,dataforAutoGene: any) => void, defaultValue?: any) => iXElement
}

type IxxShowRoomContainerDefineOption = IxxShowRoomContainerDefineOptionTexte | IxxShowRoomContainerDefineOptionTexteLocalisable | IxxShowRoomContainerDefineOptionBoolean | IxxShowRoomContainerDefineOptionNumber | IxxShowRoomContainerDefineOptionSousInterface | IxxShowRoomContainerDefineOptionFunction | IxxShowRoomContainerDefineOptionEnum | IxxShowRoomContainerDefineOptionIcon | IxxShowRoomContainerDefineOptionListeSousInterface | IxxShowRoomContainerDefineOptionCouleurHexa | IxxShowRoomContainerDefineOptionDate | IxxShowRoomContainerDefineOptionDateSerialisable | IxxShowRoomContainerDefineOptionIXElement | IxxShowRoomContainerDefineOptionListeIXElement | IxxShowRoomContainerDefineOptionTime | IxxShowRoomContainerDefineOptionDonnees | IxxShowRoomContainerDefineOptionCustom | IxxShowRoomContainerDefineOptionPageWapper | IxxShowRoomContainerDefineOptionCotesCSS;

//#endregion DefineOption

interface IxxShowRoomContainerPreReglageOption<T>
{
    NomReglage: string;
    Prereglage: T;
}

interface IxxShowRoomContainerIconeDef
{
    groupe: string;
    icone: () => Icone;
    iconeName: string;
    iconeValue: number | string;
    iconeString: string;
}

interface IxxShowRoomContainerDefineElement<T>
{
    IsNotFunctionnal?: boolean;
    typeElement: Function;
    NomElement: string;
    Description: string;
    listOption: IxxShowRoomContainerDefineOption[];
    renderElement: (option: T) => iXElement;
    RenderTooltip: () => Promise<iXElement>;
    Groupe: ExxShowRoomContaineGoupeElement;
    ListePreReglageOption?: IxxShowRoomContainerPreReglageOption<T>[]
}

class xxShowRoomContainer implements iXElement
{
    private static listElements: ObservableCollection<IxxShowRoomContainerDefineElement<any>>;
    private static ListIcone: IxxShowRoomContainerIconeDef[] = [];

    //--- Properties ---//
  
    get y() { return this.Page.y; }

    //--- Attributs ---//
    // liste All icones
    private isAffichageIcone: boolean = false;

    // Liste All prereglage
    private listePrereglage: IxxShowRoomContainerDefineElement<any>[] = [];

    // Contenu
    private Page: xxPageWrapper;
    private Grid: xxGrid;
    private GridSecondaire: xxGrid;
    private ZoneDeRendu: xDiv;
    private ListeErreur: xxStackPanel;
    private GridVueIcone: xxGrid;

    // Recherche
    private stringRecherche: BindableObject<string> = new BindableObject<string>("");
    private HaveResultatListeXElement: boolean = true;

    // Theme Override
    private IsT20: BindableObject<boolean> = new BindableObject<boolean>(xClass.Theme == enumThemes.Theme2020);

    // timeOut
    private timeOutId: number;

    //xstyle
    private xstyle: xStyle = new xStyle();

    //--- constructor ---//
    constructor(options: optionsxxShowRoomContainer)
    {
        let mythis: xxShowRoomContainer = this;

        /* Recup des elementes */
        if (!xxShowRoomContainer.listElements)
            xxShowRoomContainer.listElements = new ObservableCollection<IxxShowRoomContainerDefineElement<any>>();
        mythis.listePrereglage = xxShowRoomContainer.listElements.All().filter(val => { return val.ListePreReglageOption != null && val.ListePreReglageOption.length > 0 });
        xxShowRoomContainer.listElements.bind((add) =>
        {
            mythis.listePrereglage = xxShowRoomContainer.listElements.All().filter(val => { return val.ListePreReglageOption != null && val.ListePreReglageOption.length > 0 });
        }, (add) =>
        {
            mythis.listePrereglage = xxShowRoomContainer.listElements.All().filter(val => { return val.ListePreReglageOption != null && val.ListePreReglageOption.length > 0 });
        });

        /* Init xxPage */
        mythis.Page = new xxPageWrapper({
            titleLocalise: "Showroom (Alpha)",
            class: "xxShowroomContener",
        });

        /************************************ Temporaire  **************************************/
        mythis.Page.zoneTitle.append(new xxContainerEvent({
            initContent: new xxLabel({
                textVariable: "Alpha du nouveau showroom ! Il reste donc beaucoup de bugs et de fonctionnalités non finies.\rSi vous rencontrez un problème ou un bug, contactez Aimeric-Thomas Dalvai :)\rMerci de votre compréhension ! For a better Showroom !!",
                lineBreak: true,
                miseEnForme: enumMiseEnFormeLabel.espacesEtSautsDeLignePreserves,
                optionsAffichage: {
                    margin: { Droite: 20 }
                }
            }),
            onDblClick: (cb) =>
            {
                mythis.ListeErreur.empty();
                mythis.GridSecondaire.vider();
                mythis.GridSecondaire.append([
                    new xxGridItem({
                        colStart: 1,
                        rowStart: 1,
                        nbCols: 3,
                        nbRows: 5,
                        optionsAffichage: {
                            alignementContenu: enumAlignementContenu.CentreCentre
                        },
                        content: new xxImageTabByte({ tabByte: xxShowRoomSample.E_Med, typeAffichage: enumTypeImage.domImage })
                    })
                ]);
                cb();
            }
        }));
        /**************************************************************************/

        mythis.IsT20.bind((val) =>
        {
            if (val)
            {
                Array.from(mythis.Page.y.getElementsByClassName("tleg")).forEach(function (item)
                {
                    item.classList.remove("tleg");
                    item.classList.add("t20");
                });
            }
            else
            {
                Array.from(mythis.Page.y.getElementsByClassName("t20")).forEach(function (item)
                {
                    item.classList.remove("t20");
                    item.classList.add("tleg");
                });
            }
        });

        /* Init header */
        let GridHeader: xxGrid = new xxGrid({
            colonnes: ["1", "auto"],
            fullWidth:false
        });
        GridHeader.append([
            new xxGridItem({
                colStart: 1,
                rowStart: 1,
                optionsAffichage: {
                    alignementContenu: enumAlignementContenu.CentreCentre
                },
                content: new xInputTextAvecIcone({
                    id: "searchMain",
                    icone: enumIconeSvg.recherche,
                    champLarge: true,
                    binding: {
                        value: mythis.stringRecherche
                    },
                    autoChange: true,
                })
            }),
            new xxGridItem({
                colStart: 2,
                rowStart: 1,
                content: new xxLabelContainer({
                    textVariable: "Thème de rendu : ",
                    initContent: new xxRadioButton<string>({
                        id: "radioTlegT20",
                        initElements: [
                            {
                                libelleVariable: "Tleg",
                                valeur: "1",
                                preselectionne: !mythis.IsT20.Value
                            },
                            {
                                libelleVariable: "T20",
                                valeur: "2",
                                preselectionne: mythis.IsT20.Value
                            }
                        ],
                        valueChange: function (valeur)
                        {
                            mythis.IsT20.Value = (valeur == "2");
                        },
                    })
                })
            })
        ]);
        mythis.Page.appendZoneTitle(GridHeader);

        /* Bouton icone */
        if (xxShowRoomContainer.ListIcone.length > 0)
        {
            let boutonIcone: xxBouton = new xxBouton({
                optionsAffichage: {

                    tailleBouton: (!mythis.IsT20.Value ? enumTailleBouton.L : null),
                    styleBouton: (mythis.IsT20.Value ? enumStyleBouton.SansFondAvecContour : null),
                },
                typeBouton: enumTypeBouton.Standard,
                textLocalise: "Icones",
                titleLocalise: "Afficher les icones",
                click: (cb: () => void) =>
                {
                    if (mythis.isAffichageIcone)
                    {
                        boutonIcone.changerText("Icones");
                        boutonIcone.setTitle(new xLString("Afficher les icones").text);
                        afficherxElements(mythis.Grid);
                        cacherxElements(mythis.GridVueIcone, true);

                        mythis.HaveResultatListeXElement = false;
                        listeElement.filtrer();
                        if (!!mythis.stringRecherche.Value)
                            mythis.ReGenerateGridSecondaireRecherche();
                        else
                            mythis.ReGenerateGridSecondaireEmpty();

                    }
                    else
                    {
                        boutonIcone.changerText("xElement");
                        boutonIcone.setTitle(new xLString("Afficher les xElement").text);
                        cacherxElements(mythis.Grid, true);
                        afficherxElements(mythis.GridVueIcone);

                        mythis.ReGenerateGridIcone();
                    }
                    mythis.isAffichageIcone = !mythis.isAffichageIcone;
                    cb();

                },
            });
            GridHeader.append([
                new xxGridItem({
                    colStart: 3,
                    rowStart: 1,
                    optionsAffichage: {
                        alignementContenu: enumAlignementContenu.CentreCentre
                    },
                    content: boutonIcone
                })
            ]);
        }

        /************************************ Temporaire  **************************************/
        if (options.CallOldShowRoom_Temporaire != null)
            if (mythis.IsT20.Value)
                mythis.Page.zoneTitle.append(new xxBouton({
                    typeBouton: enumTypeBouton.Standard,
                    textLocalise: "Ancien ShowRoom",
                    titleLocalise: "Afficher ancien ShowRoom",
                    click: (cb: () => void) => { options.CallOldShowRoom_Temporaire(cb); },
                }));
            else
                mythis.Page.zoneTitle.append(new xxBouton({
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.L,
                    },
                    typeBouton: enumTypeBouton.Standard,
                    textLocalise: "Ancien ShowRoom",
                    titleLocalise: "Afficher ancien ShowRoom",
                    click: (cb: () => void) => { options.CallOldShowRoom_Temporaire(cb); },
                }));
        /*************************************************************************************/

        // RechercheBinding
        let timeOutRecheche: number;
        mythis.stringRecherche.bind((val) =>
        {
            if (mythis.timeOutId)
                clearTimeout(mythis.timeOutId);
            if (timeOutRecheche)
                clearTimeout(timeOutRecheche);
            timeOutRecheche = setTimeout(() =>
            {
                if (mythis.isAffichageIcone)
                    mythis.ReGenerateGridIcone();
                else
                {
                    mythis.HaveResultatListeXElement = false;
                    listeElement.filtrer();
                    if (!!val)
                        mythis.ReGenerateGridSecondaireRecherche();
                    else
                        mythis.ReGenerateGridSecondaireEmpty();
                }

            }, 500);
        });

        //#region "init Affichage xElement"
        /* Init xxGrid Master */
        mythis.Grid = new xxGrid({
            colonnes: ["250px", "1fr"],
            lignes: ["auto", "1fr"],
            fullHeight: true,
            fullWidth:true,
            gridGap: "0",
        });
        mythis.Page.append(mythis.Grid);

        /* Init liste */
        let listeElement: xxListWrapper<IxxShowRoomContainerDefineElement<any>> = new xxListWrapper<IxxShowRoomContainerDefineElement<any>>({
            donnees: [],
            class: "listeXelements",
            sort: enumTypeTri.asc,
            LibelleSiVide:"Aucun xelement trouvé",
            greaterThan: function (a, b)
            {
                return a.NomElement.localeCompare(b.NomElement);
            },
            regroupementUniqueBy: {
                GroupBy: (item) => item.Groupe,
                groupHeaderCustom: (place,items) =>
                {
                    let groupName = "";
                    switch (items[0].Groupe)
                    {
                        case ExxShowRoomContaineGoupeElement.xElement:
                            groupName = "xElements";
                            break;
                        case ExxShowRoomContaineGoupeElement.xxElement:
                            groupName = "xxElements";
                            break;
                        case ExxShowRoomContaineGoupeElement.xxxElement:
                            groupName = "xxxElements";
                            break;
                        case ExxShowRoomContaineGoupeElement.deprecated_DontUse:
                            groupName = "Deprecated / Ne pas utiliser";
                            break;
                    }

                    place.append(new xxLabel({
                        type: enumTypeLabel.important,
                        textVariable: groupName,
                        optionsAffichage: {
                            padding: {Tous:5} }
                    }));
                }
            },
            dataContext: xxShowRoomContainer.listElements,
            renderItem: (p: iXElementHolder, item: IxxShowRoomContainerDefineElement<any>) =>
            {
                let label: xxLabel = new xxLabel({
                    textVariable: item.NomElement
                });

                mythis.stringRecherche.bind((val) =>
                {
                    let stringrecherche = mythis.stringRecherche.Value.split(";").map(r => r.toLowerCase());
                    let itemString: string = item.NomElement.toLowerCase();
                    let sublim: string;
                    stringrecherche.some(r =>
                    {
                        if (itemString.includes(r))
                        {
                            sublim = r;
                            return true;
                        }
                        return false;
                    });

                    label.setSurbrillance(sublim);
                });

                p.append(new xxToolTip({
                    ToolTipPosition_by_Width_extremity: true,
                    ToolTipPositionWidthSouhaite: enumXxToolTipPositionWidth.extremiteDroite,
                    TooltipStopPropagation: true,
                    class: "containerXelements",
                    initContent: new xxContainerEvent({
                        class: "boutonListeElements",
                        onClick: function (cb)
                        {
                            try
                            {
                                mythis.ReGenerateGridSecondaire(item);
                            }
                            catch (error)
                            {
                                console.error(error);
                                mythis.AddErreur(item.NomElement, error);
                            }
                            cb();
                        },
                        initContent: label
                    }),
                    onShow: function (thisTooltip)
                    {
                        thisTooltip.viderTooltip();

                        thisTooltip.setToolTip(new xxLabel({
                            habillage: enumHabillageLabel.loading
                        }));

                        thisTooltip.CalculPosition();
                        // Chargement async du render
                        item.RenderTooltip().then((element) =>
                        {
                            thisTooltip.viderTooltip();
                            thisTooltip.setToolTip(new xxLabel({
                                textVariable: item.Description,
                                centrer: true,
                                type: enumTypeLabel.description
                            }));
                            thisTooltip.setToolTip(new xSeparateur({
                                orientation: enumTypeOrientation.horizontal,
                            }));

                            thisTooltip.setToolTip(element);
                            if (mythis.IsT20.Value)
                            {
                                Array.from(element.y.getElementsByClassName("tleg")).forEach(function (item)
                                {
                                    item.classList.remove("tleg");
                                    item.classList.add("t20");
                                });
                            }

                            thisTooltip.CalculPosition();
                        }).catch(() =>
                        {
                            thisTooltip.viderTooltip();
                            thisTooltip.setToolTip(new xxLabel({
                                textVariable: "Une Erreur est survenue, pendant la génération du contenu de la tooltip",
                                centrer: true,
                                type: enumTypeLabel.important,
                                habillage: enumHabillageLabel.warning
                            }));

                        });
                    },
                    onHide: (thisTooltip) =>
                    {
                        thisTooltip.viderTooltip();
                    }
                }));
            }
        });

        listeElement.setFiltre((item) =>
        {
            let stringitem = item.NomElement.toLowerCase();
            let stringsearch = mythis.stringRecherche?.Value?.split(";").map(r => r.toLowerCase());
            let tempo = (stringsearch.length == 0 || stringsearch.some(r => stringitem.includes(r)));
            if (!mythis.HaveResultatListeXElement && tempo)
                mythis.HaveResultatListeXElement = true;
            return tempo;
        });

        mythis.Grid.append([
            new xxGridItem({
                colStart: 1,
                rowStart: 1,
                nbCols: 1,
                nbRows: 2,
                content: listeElement
            })
        ]);

        /* Init Affichage Element (droite)*/
        mythis.GridSecondaire = new xxGrid({
            colonnes: ["300px", "auto" ,"1fr" ,"auto" ,"auto"],
            lignes: ["auto", "auto", "auto", "auto", "auto", "1fr", "auto"],
            fullHeight: true,
            fullWidth: true,
            gridGap: "0"
        });
        mythis.Grid.append([new xxGridItem({
            colStart: 2,
            rowStart: 2,
            nbCols: 1,
            nbRows: 1,
            class:"TheScrollAutoForShowroom",
            content: mythis.GridSecondaire
        })]);
     
        /* Init Liste Erreur */
        mythis.ListeErreur = new xxStackPanel({});
        mythis.Grid.append([new xxGridItem({
            colStart: 2,
            rowStart: 1,
            nbCols: 1,
            nbRows: 1,
            optionsAffichage: {
                alignementContenu: enumAlignementContenu.CentreCentre
            },
            content: mythis.ListeErreur
        })]);

        /* init GridSecondaire contenue */
        mythis.ReGenerateGridSecondaireEmpty();

        //#endregion "init Affichage xElement"

        //#region "init Affichage Icone"

        mythis.GridVueIcone = new xxGrid({
            class:"xxShowRoomContainerGridIcone",
            colonnes_auto: "1fr",
            lignes_auto:"min-content",
            fullHeight: true,
            gridGap: "20px",
            padding:true
        });

        cacherxElements(mythis.GridVueIcone, true);

        mythis.Page.append(mythis.GridVueIcone);

        //#endregion "init Affichage Icone"
    }

    //--- methodes ---//
    // *** methodes qui permet d'ajoute des elements
    public static AjouterElementShowroom<T>(item: IxxShowRoomContainerDefineElement<T>)
    {
        if (!xxShowRoomContainer.listElements)
            xxShowRoomContainer.listElements = new ObservableCollection<IxxShowRoomContainerDefineElement<any>>();
        xxShowRoomContainer.listElements.add([item]);
    }

    public static AjouterIconeShowroom(ListeIcone: IxxShowRoomContainerIconeDef[])
    {
        xxShowRoomContainer.ListIcone = xxShowRoomContainer.ListIcone.concat(ListeIcone);
    }

    //#region "Affichage xElement"
    private ReGenerateGridSecondaireEmpty()
    {
        let mythis: xxShowRoomContainer = this;

        // Empty GridSecondaire and liste erreur
        mythis.ListeErreur.empty();
        mythis.GridSecondaire.vider();

        // Generation Message ZoneVide
        mythis.GridSecondaire.append([
            new xxGridItem({
                colStart: 1,
                rowStart: 1,
                nbCols: 3,
                nbRows: 6,
                optionsAffichage: {
                    alignementContenu: enumAlignementContenu.CentreCentre
                },
                content: new xxLabel({
                    textVariable: "Sélectionner un élément dans la liste ou saisir une recherche",
                    type: enumTypeLabel.soustitre
                }) 
            })
        ]);
    }

    private ReGenerateGridSecondaireRecherche()
    {
        let mythis: xxShowRoomContainer = this;

        // Empty GridSecondaire and liste erreur
        mythis.ListeErreur.empty();
        mythis.GridSecondaire.vider();

        // Generation WrapPanel
        let wrap: xxWrapPanel = new xxWrapPanel({
            espaceMinimaliste: true,
        });

        mythis.GridSecondaire.append([
            new xxGridItem({
                colStart: 1,
                rowStart: 1,
                nbCols: 3,
                nbRows: 6,
                content: wrap
            })
        ]);

        let haveResultat: boolean = false;

        let stringrecherche = mythis.stringRecherche.Value.split(";").map(r => r.toLowerCase());

        // Recheche prereglage
        mythis.listePrereglage.forEach((item) =>
        {
            let ElementString: string = item.NomElement.toLowerCase();
            let sublimElement: string;
            stringrecherche.some(r =>
            {
                if (ElementString.includes(r))
                {
                    sublimElement = r;
                    return true;
                }
                return false;
            });

            item.ListePreReglageOption.forEach(prereglage =>
            {
                let ReglageString: string = prereglage.NomReglage.toLowerCase();
                let sublimReglage: string;
                stringrecherche.some(r =>
                {
                    if (ReglageString.includes(r))
                    {
                        sublimReglage = r;
                        return true;
                    }
                    return false;
                });

                if ((stringrecherche.length > 1 && !!sublimReglage && !!sublimElement) || (stringrecherche.length == 1 && (!!sublimReglage || !!sublimElement)))
                {
                    haveResultat = true;
                    let grid: xxGrid = new xxGrid({
                        colonnes: ["20px", "1fr", "20px"],
                        lignes: ["10px", "1fr", "10px", "20px"],
                        class: "TuileSearch",
                    });

                    let labelcopie: xxLabel = new xxLabel({
                        class: "isCopieLabel",
                        textVariable: "Copie !",
                    });
                    labelcopie.hideLabel(true);

                    grid.append([
                        
                        new xxGridItem({
                            colStart: 1, nbCols: 3,
                            rowStart: 1, nbRows: 1,
                            optionsAffichage: {
                                alignementContenu: enumAlignementContenu.CentreCentre
                            },
                            content: new xxLabel({
                                textVariable: item.NomElement,
                                type: enumTypeLabel.description,
                                optionsAffichage: {
                                    padding: {
                                        Bas: 6
                                    }
                                }
                            }).setSurbrillance(sublimElement)
                        }),
                        new xxGridItem({
                            colStart: 2, nbCols: 1,
                            rowStart: 2, nbRows: 1,
                            optionsAffichage: {
                                alignementContenu: enumAlignementContenu.CentreCentre
                            },
                            content: item.renderElement(prereglage.Prereglage)
                        }),
                        new xxGridItem({
                            colStart: 1, nbCols: 3,
                            rowStart: 3, nbRows: 1,
                            optionsAffichage: {
                                alignementContenu: enumAlignementContenu.CentreCentre
                            },
                            content: new xxLabel({
                                textVariable: prereglage.NomReglage,
                                type: enumTypeLabel.important
                            }).setSurbrillance(sublimReglage)
                        }),
                        new xxGridItem({
                            colStart: 1, nbCols: 2,
                            rowStart: 4, nbRows: 1,
                            content: labelcopie
                        }),
                        new xxGridItem({
                            colStart: 3, nbCols: 1,
                            rowStart: 4, nbRows: 1,
                            optionsAffichage: {
                                alignementContenu: enumAlignementContenu.CentreCentre
                            },
                            content: new IconeCs3i(enumIconeCs3i.action_copier, { taille: tailleIcone.XS })
                        })
                    ]);

                    let CEvent: xxContainerEvent = new xxContainerEvent({
                        initContent: grid,
                        onClick: (cb) =>
                        {
                            let optionForAutoGenerate: any = {};
                            mythis.GenerationRecursiveOptionsAffichage(item.listOption, {}, optionForAutoGenerate, null, null, null, prereglage.Prereglage);

                            let aCopier: string = "new " + item.NomElement + "(" + mythis.GenerationRecursiveOptionsStringCode(optionForAutoGenerate, 0) + ");";

                            if (navigator.clipboard)
                            {
                                navigator.clipboard.writeText(aCopier).then(() =>
                                {
                                    labelcopie.showLabel();
                                    //fonction pour supprimer la classe après 3 secondes

                                    setTimeout(function ()
                                    {
                                        labelcopie.hideLabel(true);
                                    }, 2800);
                                }, () =>
                                {
                                    xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le code", false).then(() =>
                                    {
                                        xOutils.copyToClipboard(aCopier);
                                    })
                                });
                            }
                            else
                            {
                                xOutils.copyToClipboard(aCopier);
                                labelcopie.showLabel();
                                //fonction pour supprimer la classe après 3 secondes

                                setTimeout(function ()
                                {
                                    labelcopie.hideLabel(true);
                                }, 2800);
                            }

                            cb();
                        }
                    })

                    wrap.append(CEvent, "TuileSearch_WrapItem");
                }
            });
        });

        // Recheche Icone
        xxShowRoomContainer.ListIcone.forEach((item) =>
        {
            let itemString: string = item.iconeName.toLowerCase();
            let itemGroup: string = item.groupe.toLowerCase();
            let sublimName: string;
            let sublimGroup:string ;
            stringrecherche.some(r =>
            {
                if (itemString.includes(r))
                {
                    sublimName = r;
                    return true;
                }
                return false;
            });
            stringrecherche.some(r =>
            {
                if (itemGroup.includes(r))
                {
                    sublimGroup = r;
                    return true;
                }
                return false;
            });

            if ((stringrecherche.length > 1 && !!sublimGroup && !!sublimName) || (stringrecherche.length == 1 && (!!sublimGroup || !!sublimName)))
            {
                haveResultat = true;
                let grid: xxGrid = new xxGrid({
                    colonnes: ["20px", "1fr", "20px"],
                    lignes: ["10px", "1fr", "10px", "20px"],
                    class: "TuileSearch",
                });

                let labelcopie: xxLabel = new xxLabel({
                    class: "isCopieLabel",
                    textVariable: "Copie !",
                });
                labelcopie.hideLabel(true);

                grid.append([
                    new xxGridItem({
                        colStart: 1, nbCols: 3,
                        rowStart: 1, nbRows: 1,
                        optionsAffichage: {
                            alignementContenu: enumAlignementContenu.CentreCentre
                        },
                        content: new xxLabel({
                            textVariable: item.groupe,
                            type: enumTypeLabel.description
                        }).setSurbrillance(sublimGroup)
                    }),
                    new xxGridItem({
                        colStart: 2, nbCols: 1,
                        rowStart: 2, nbRows: 1,
                        optionsAffichage: {
                            alignementContenu: enumAlignementContenu.CentreCentre
                        },
                        content: item.icone()
                    }),
                    new xxGridItem({
                        colStart: 1, nbCols: 3,
                        rowStart: 3, nbRows: 1,
                        optionsAffichage: {
                            alignementContenu: enumAlignementContenu.CentreCentre
                        },
                        content: new xxLabel({
                            textVariable: item.iconeName,
                            type: enumTypeLabel.important
                        }).setSurbrillance(sublimName)
                    }),
                    new xxGridItem({
                        colStart: 1, nbCols: 2,
                        rowStart: 4, nbRows: 1,
                        content: labelcopie
                    }),
                    new xxGridItem({
                        colStart: 3, nbCols: 1,
                        rowStart: 4, nbRows: 1,
                        optionsAffichage: {
                            alignementContenu: enumAlignementContenu.CentreCentre
                        },
                        content: new IconeCs3i(enumIconeCs3i.action_copier, { taille: tailleIcone.XS })
                    })
                ]);

                let CEvent: xxContainerEvent = new xxContainerEvent({
                    initContent: grid,
                    onClick: (cb) =>
                    {

                        if (navigator.clipboard)
                        {
                            navigator.clipboard.writeText(item.iconeString).then(() =>
                            {
                                labelcopie.showLabel();
                                //fonction pour supprimer la classe après 3 secondes

                                setTimeout(function ()
                                {
                                    labelcopie.hideLabel(true);
                                }, 2800);
                            }, () =>
                            {
                                xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le code", false).then(() =>
                                {
                                    xOutils.copyToClipboard(item.iconeString);
                                })
                            });
                        }
                        else
                        {
                            xOutils.copyToClipboard(item.iconeString);
                            labelcopie.showLabel();
                            //fonction pour supprimer la classe après 3 secondes

                            setTimeout(function ()
                            {
                                labelcopie.hideLabel(true);
                            }, 2800);
                        }

                        cb();
                    }
                })

                wrap.append(CEvent, "TuileSearch_WrapItem");
            }
        });

        if (!haveResultat && stringrecherche.length > 0)
        {
            mythis.GridSecondaire.append([
                new xxGridItem({
                    colStart: 1,
                    rowStart: 1,
                    nbCols: 3,
                    nbRows: 6,
                    optionsAffichage: {
                        alignementContenu: enumAlignementContenu.CentreCentre
                    },
                    content: new xxLabel({
                        textVariable: "Aucun resultat trouvé pour cette recherche",
                        type: enumTypeLabel.soustitre
                    })
                })
            ]);
            if (!mythis.HaveResultatListeXElement)
                mythis.timeOutId = setTimeout(() =>
                {
                    mythis.GridSecondaire.vider();
                    mythis.GridSecondaire.append([
                        new xxGridItem({
                            colStart: 1,
                            rowStart: 1,
                            nbCols: 3,
                            nbRows: 6,
                            optionsAffichage: {
                                alignementContenu: enumAlignementContenu.CentreCentre
                            },
                            content: new xxImageTabByte({ tabByte: xxShowRoomSample.RMarecheche, typeAffichage: enumTypeImage.domImage })
                        })
                    ]);
                },5000);
        }
        else if(stringrecherche.length == 0)
            mythis.ReGenerateGridSecondaireEmpty();
    }

    private ReGenerateGridSecondaire(item: IxxShowRoomContainerDefineElement<any>)
    {
        let mythis: xxShowRoomContainer = this;

        let havePreReglage: boolean = item.ListePreReglageOption != null && item.ListePreReglageOption.length > 0;

        // Empty GridSecondaire and liste erreur
        mythis.ListeErreur.empty();
        mythis.GridSecondaire.vider();

        if (item.IsNotFunctionnal)
            mythis.AddErreur(item.NomElement, "/!\\ Attention, ce composant n'est pas entièrement implémenté, il est possible qu'il y ait des options qui ne fonctionnent pas... Il le sera dans un futur plus ou moins proche :) Merci de votre compréhension. /!\\");

        if (item.Groupe == ExxShowRoomContaineGoupeElement.deprecated_DontUse)
            mythis.AddErreur(item.NomElement, "/!\\ Attention, ce composant est obsolète et ne doit pas être utilisé, merci de votre compréhension. /!\\");

        if (item.Groupe == ExxShowRoomContaineGoupeElement.deprecated_DontUse)
            mythis.AddErreur(item.NomElement, "/!\\ Attention, ce composant est obsolète et ne doit pas être utilisé, merci de votre compréhension. /!\\");

        // init les options pour l'element
        let option: any = {};
        let optionForAutoGenerate: any = {};

        // init string AutoGeneCode
        let codeAutoGene: BindableObject<string> = new BindableObject<string>();

        /* Init info */
        mythis.GridSecondaire.append([
            new xxGridItem({
                colStart: 1,
                rowStart: 1,
                nbRows: 1,
                nbCols: 3 + (havePreReglage?2:0),
                optionsAffichage: {
                    alignementContenu: enumAlignementContenu.CentreCentre
                },
                content:
                    new xxLabelContainer({
                        textLocalise: mythis.htmlEntities(item.NomElement), type: enumTypeLabel.titre, labelLargeurLibre: true, initContent:
                            new xxBouton({
                                icone: new IconeMiniCs3i(enumIconeCs3i.admin_parametres_simple),
                                optionsAffichage: { tailleBouton: enumTailleBouton.Fit, },
                                click: function (cb)
                                {
                                    mythis.GenerateBoxerViewMethode(item.typeElement);
                                    cb();
                                },
                                typeBouton: enumTypeBouton.Standard,
                                titleLocalise: "Afficher les méthodes de l'élément"

                            }),
                    }),
            }), new xxGridItem({
                colStart: 1,
                rowStart: 2,
                nbRows: 1,
                nbCols: 3 + (havePreReglage ? 2 : 0),
                optionsAffichage: {
                    alignementContenu: enumAlignementContenu.CentreCentre
                },
                content:
                    new xxLabel({ textLocalise: item.Description, centrer: true, type: enumTypeLabel.description, optionsAffichage: { margin: { Bas: 5 } } }),
            }), new xxGridItem({
                colStart: 1,
                rowStart: 3,
                nbCols: 3 + (havePreReglage ? 2 : 0),
                nbRows: 1,
                content: new xSeparateur({ orientation: enumTypeOrientation.horizontal, epaisseur: enumEpaisseurSeparation.fin,  margin: { Tous: 0 } }),
            })
        ]);

        /* Render Element*/
        mythis.ZoneDeRendu = new xDiv({});
        mythis.GridSecondaire.append([
            new xxGridItem({
                colStart: 3,
                rowStart: 4,
                nbCols: 1,
                nbRows: 1,
                optionsAffichage: {
                    alignementContenu: enumAlignementContenu.CentreCentre
                },
                content: new xxLabel({ textLocalise: "Rendu du composant", type: enumTypeLabel.soustitre })
            }),
            new xxGridItem({
                optionsAffichage: {
                    alignementContenu: enumAlignementContenu.CentreCentre
                },
                colStart: 3,
                rowStart: 5,
                nbCols: 1,
                nbRows: 2,
                content: mythis.ZoneDeRendu
            })
        ]);

        let regenerateRender: () => void = () =>
        {
            let optionCopy = Object.assign({}, option);
            mythis.ZoneDeRendu.asHolder.empty();
            mythis.ZoneDeRendu.asHolder.append(item.renderElement(optionCopy));

            codeAutoGene.Value = "new " + item.NomElement + "(" + mythis.GenerationRecursiveOptionsStringCode(optionForAutoGenerate, 0)+");";
        }

        /* OPTIONS generator*/
        mythis.GridSecondaire.append([new xxGridItem({
            colStart: 1,
            rowStart: 4,
            nbRows: 1,
            nbCols: 1,
            optionsAffichage: {
                alignementContenu: enumAlignementContenu.CentreCentre
            },
            content: new xxLabel({ textLocalise: "Options du composant", type: enumTypeLabel.soustitre})
        })]);

        let optionOngletList: OptionsxxNavOngletItem[] = [];
        let optionOnglet: OptionsxxNavOngletItem = {
            textVariable: "General",
            class:"TheScrollAutoForOptionShowroom",
            isOngletPreselected:true,
            CheckNeedRegeneration: async() => { return false; },
            GenerateContent: () => { return null;/* Temporaire function */ }
        };
        optionOngletList.push(optionOnglet);
        mythis.GenerationRecursiveOptionsAffichage(item.listOption, option, optionForAutoGenerate, optionOnglet, optionOngletList, regenerateRender);

        mythis.GridSecondaire.append([new xxGridItem({
            colStart: 1,
            rowStart: 5,
            nbRows: 1,
            nbCols: 1,
            content: new xxNavOngletBar({
                GridForAddContent: mythis.GridSecondaire,
                GridItemContentOption: {
                    colStart: 1,
                    rowStart: 6,
                    nbRows: 1,
                    nbCols: 1,
                },
                initOnglets: optionOngletList,
                Style: mythis.xstyle
                })
        })]);

        // first render
        regenerateRender();

        /* SEPARATEUR ENTRE OPTIONS ET RENDU */
        mythis.GridSecondaire.append([new xxGridItem({
            colStart: 2,
            rowStart: 4,
            nbRows: 3,
            nbCols: 1,
            content: new xSeparateur({ orientation: enumTypeOrientation.vertical,  margin: { Tous: 0 } })
        })]);

        /* Prereglage */
        if (havePreReglage)
        {
            mythis.GridSecondaire.append([
                new xxGridItem({
                    colStart: 4,
                    rowStart: 4,
                    nbRows: 3,
                    nbCols: 1,
                    content: new xSeparateur({ orientation: enumTypeOrientation.vertical,  margin: { Tous: 0 }  })
                }), // /* SEPARATEUR ENTRE Rendu ET Prereglage */
                new xxGridItem({
                    colStart: 5,
                    rowStart: 4,
                    nbRows: 1,
                    nbCols: 1,
                    content: new xxLabel({ textLocalise: "Réglages les plus utilisés", type: enumTypeLabel.soustitre}),
                    optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre }
                }),
                new xxGridItem({
                    colStart: 5,
                    rowStart: 5,
                    nbRows: 2,
                    nbCols: 1,
                    optionsAffichage: {
                        padding: {
                            Haut: 6
                        }
                    },
                    class:"xxGridItem_ListePreReglageOption",
                    content: new xxListWrapper<IxxShowRoomContainerPreReglageOption<any>>({
                        donnees: item.ListePreReglageOption,
                        class: "ListePreReglageOption",  
                        gap: 10,
                        renderItem: (ici, reglage) =>
                        {
                            ici.append(new xxContainerEvent({
                                class: "PrereglageContainerEvent",
                                onClick: (cb) =>
                                {
                                    optionForAutoGenerate = {};
                                    option = {};

                                    let optionOngletList: OptionsxxNavOngletItem[] = [];
                                    let optionOnglet: OptionsxxNavOngletItem = {
                                        textVariable: "General",
                                        class: "TheScrollAutoForOptionShowroom",
                                        CheckNeedRegeneration: async () => { return false; },
                                        GenerateContent: () => { return null/* Temporaire function */ }
                                    };
                                    mythis.GenerationRecursiveOptionsAffichage(item.listOption, option, optionForAutoGenerate, optionOnglet, optionOngletList, regenerateRender);

                                    regenerateRender();

                                    if (navigator.clipboard)
                                    {
                                        navigator.clipboard.writeText(codeAutoGene.Value).then(() =>
                                        {
                                            xOutils.afficherMessageAlertifyLog("Copie!");
                                        }, () =>
                                        {
                                            xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le code", false).then(() =>
                                            {
                                                xOutils.copyToClipboard(codeAutoGene.Value);
                                            })
                                        });
                                    }
                                    else
                                    {
                                        xOutils.copyToClipboard(codeAutoGene.Value);
                                    }

                                    cb();
                                },
                                initContent: new xxStackPanel({
                                    initContent: [
                                        new xxLabel({ textVariable: reglage.NomReglage }),
                                        item.renderElement(reglage.Prereglage),
                                        new xSeparateur({ orientation: enumTypeOrientation.horizontal, margin: { Tous: 0 }  })
                                    ]
                                })
                            }));
                        }
                    })
                })]);
        }

        //#region volet Code autoGene

        let boutonCopie: xxBouton = new xxBouton({
            class: "boutonCopie",
            click: (cb) =>
            {
                if (navigator.clipboard)
                {
                    navigator.clipboard.writeText(codeAutoGene.Value).then(() =>
                    {
                        boutonCopie.addClass("isCopie");

                        //fonction pour supprimer la classe après 3 secondes

                        setTimeout(function ()
                        {
                            boutonCopie.removeClass("isCopie");
                        }, 2800);

                    }, () =>
                    {
                        xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le code", false).then(() =>
                        {
                            xOutils.copyToClipboard(codeAutoGene.Value);
                        })
                    });
                }
                else
                {
                    xOutils.copyToClipboard(codeAutoGene.Value);
                    boutonCopie.addClass("isCopie");

                    //fonction pour supprimer la classe après 3 secondes

                    setTimeout(function ()
                    {
                        boutonCopie.removeClass("isCopie");
                    }, 2800);

                }

                cb();

            },
            titleVariable: "Copier le code",
            optionsAffichage: {
                tailleBouton: enumTailleBouton.Fit,
            },
            icone: new IconeCs3i(enumIconeCs3i.action_copier),
        });

        let voletCode: xxVolet = new xxVolet({
            class: "xxShowroomContener_voletCode",
            position: enumPositionVolet.bas,
            initContent: [new xInputText({
                id: "AutoCodeVoletInput",
                multiline: true,
                disabled: true,
                binding: { value: codeAutoGene }
            }),
                boutonCopie,
            ],
        });


        mythis.GridSecondaire.append([
            new xxGridItem({
                colStart: 1,
                rowStart: 7,
                nbCols: 3 + (havePreReglage ? 2 : 0),
                nbRows: 1,
                content: voletCode
            }),
            new xxGridItem({
                colStart: 1,
                rowStart: 7,
                nbCols: 3 + (havePreReglage ? 2 : 0),
                nbRows: 1,
                content: new xxBouton({
                    id: "boutonVolet",
                    icone: new IconeCs3i(enumIconeCs3i.fleche_bleue_haut),
                    click: function (cb) { voletCode.afficher(); cb(); },
                    textLocalise: "Voir le code",
                    titleVariable: "Cliquer pour ouvrir le code",
                    typeBouton: enumTypeBouton.Standard,
                    optionsAffichage: {
                        margin: {
                            Tous: 0
                        },
                        positionIconeBouton: enumPosition.Top,
                    }

                })
            })
        ]);
        voletCode.fermer();
        //#endregion volet Code autoGene
    }

    // fonctions récursive
    private GenerationRecursiveOptionsAffichage(listOption: IxxShowRoomContainerDefineOption[], option: any, optionForAutoGenerate: any, currentOngletOption: OptionsxxNavOngletItem, currentOngletOptionlist: OptionsxxNavOngletItem[], regenerateRender: () => void, optionValueSelectSurcharge: any = null, disable: boolean=false)
    {
        let mythis: xxShowRoomContainer = this;

        let stackPanel: xxStackPanel = new xxStackPanel({ class: "ListeOption" });

        // On remplace la methode d'ajoute du contenu
        if (currentOngletOption)
            currentOngletOption.GenerateContent = () =>
            {
                return stackPanel;
            }

        let groupe: string = "";

        listOption.sort((a,b) =>
        {
            if (a.IsDeprecated == b.IsDeprecated && a.Facultatif == b.Facultatif)
                return 0;

            if ((!a.Facultatif && !a.IsDeprecated && (b.Facultatif || b.IsDeprecated))
                || (a.Facultatif && b.IsDeprecated))
                return -1;
            else
                return 1;
        }).forEach((optionTemp, index) =>
        {
            let FactatifSign: string = !optionTemp.Facultatif ? "*" : "";
            let ClassCouleurAlternance: string = index % 2 ? "ListeOption_CouleurAlternance" : "";
            let ValueSelect : any;

            if (groupe != "Obligatoire" && !optionTemp.Facultatif && !optionTemp.IsDeprecated)
            {
                groupe = "Obligatoire";
                stackPanel.append(new xxLabel({
                    textVariable: "Obligatoire",
                    type: enumTypeLabel.important,
                }), "GroupeOption");
            }
            if (groupe != "Facultatif" && optionTemp.Facultatif)
            {
                groupe = "Facultatif";
                stackPanel.append(new xxLabel({
                    textVariable: "Facultatif",
                    type: enumTypeLabel.important,
                }),"GroupeOption");
            }
            else if (groupe != "Deprecated" && optionTemp.IsDeprecated)
            {
                groupe = "Deprecated";
                stackPanel.append(new xxLabel({
                    textVariable: "Deprecated/do not use",
                    type: enumTypeLabel.important,
                }), "GroupeOption");
            }

            switch (optionTemp.TypeOption)
            {
                case ExxShowRoomContainerTypeOption.ListeSousInterface:
                    if (!option[optionTemp.NameOption])
                        option[optionTemp.NameOption] = [];
                    if (!optionForAutoGenerate[optionTemp.NameOption])
                        optionForAutoGenerate[optionTemp.NameOption] = [];

                    let xxNavOngletBarTemp: xxNavOngletBar;
                    let OngletListeSousInterfaceOptionlist: OptionsxxNavOngletItem[] = [];
                    let ListeSousInterfaceOnglet: OptionsxxNavOngletItem;
                    let _sousGridListeSousInterface: xxGrid = new xxGrid({
                        lignes: ["auto", "auto", "1fr"],
                        colonnes: ["1fr", "auto", "auto"],
                        class: "TheScrollAutoForOptionShowroom",
                        fullHeight: true,
                        fullWidth: true,
                        gridGap: "0"
                    });

                    let bindListeOption: ObservableCollection<{ Option: any, forAutoGenerate: any, isNew: boolean }> = new ObservableCollection<{ Option: any, forAutoGenerate: any, isNew: boolean }>();
                    let optionInterfacetempSelection: { Option: any, forAutoGenerate: any, isNew: boolean } = { Option: null, forAutoGenerate: null, isNew:false};
                    if (option[optionTemp.NameOption].length > 0)
                    {
                        let indexMax = option[optionTemp.NameOption].length ;
                        let listeOptionTemps = [];
                        for (let i = 0; i < indexMax; i++)
                        {
                            listeOptionTemps.push({
                                Option: option[optionTemp.NameOption][i], forAutoGenerate: optionForAutoGenerate[optionTemp.NameOption][i], isNew:false
                            });
                        }
                        bindListeOption.add(listeOptionTemps);
                        optionInterfacetempSelection = listeOptionTemps[0];
                    }


                    // On ajoute une couche a la function de rerender
                    let regenerateRenderListeSousInterface: () => void = () =>
                    {
                      
                        let listInterfacetemp = bindListeOption.All().map((item) => { return Object.assign({}, item.Option); });
                        if (listInterfacetemp.length > 0)
                            option[optionTemp.NameOption] = listInterfacetemp;
                        else
                            delete option[optionTemp.NameOption];
                        optionForAutoGenerate[optionTemp.NameOption] = bindListeOption.All().map((item) => { return item.forAutoGenerate; });
                        regenerateRender();
                    };

                    if (bindListeOption.Length == 0)
                        _sousGridListeSousInterface.addClass("Disabled");

                    bindListeOption.bind(
                        () =>
                        {
                            if (bindListeOption.Length > 0)
                                _sousGridListeSousInterface.removeClass("Disabled");
                            else
                                _sousGridListeSousInterface.addClass("Disabled");
                            regenerateRenderListeSousInterface();
                        },
                        () =>
                        {
                            if (bindListeOption.Length > 0)
                                _sousGridListeSousInterface.removeClass("Disabled");
                            else
                                _sousGridListeSousInterface.addClass("Disabled");
                            regenerateRenderListeSousInterface();
                        });

                    if (currentOngletOption)
                    {
                        // Gestion des interface
                        let listeInterface: xxListeDeroulante<{ Option: any, forAutoGenerate: any, isNew: boolean }> = new xxListeDeroulante<{ Option: any, forAutoGenerate: any, isNew: boolean }>({
                            donnees: [],
                            dataContext: bindListeOption,
                            renderSelected: (ici, item, open) =>
                            {
                                if (item != null && bindListeOption.Length > 0 && bindListeOption.All().indexOf(item) >= 0)
                                    ici.append(new xxBouton({
                                        titleVariable: "Change d'option",
                                        icone: new IconeCs3i(enumIconeCs3i.fleche_select, { taille: tailleIcone.XS }),
                                        optionsAffichage: {
                                            positionIconeBouton: enumPosition.Right,
                                            tailleBouton: enumTailleBouton.S,
                                        },
                                        click: (cb) =>
                                        {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: optionTemp.NameOption + " - " + (bindListeOption.All().indexOf(item) + 1),
                                    }));
                                else
                                    ici.append(new xxBouton({
                                        titleVariable: "Change d'option",
                                        icone: new IconeCs3i(enumIconeCs3i.fleche_select, { taille: tailleIcone.XS }),
                                        disabled: true,
                                        optionsAffichage: {
                                            positionIconeBouton: enumPosition.Right,
                                            tailleBouton: enumTailleBouton.S,
                                        },
                                        click: (cb) =>
                                        {
                                            cb();
                                        },
                                        textVariable: "Aucune " + optionTemp.NameOption
                                    }));
                            },
                            renderSelectItem: (ici, item, select) =>
                            {
                                ici.append(new xxBouton({
                                    titleVariable: "Change d'option",
                                    click: (cb) =>
                                    {
                                        select(item);
                                        cb();
                                    },
                                    optionsAffichage: {
                                        margin: { Tous: 0 },
                                        tailleBouton: enumTailleBouton.M,
                                    },
                                    textVariable: optionTemp.NameOption + " - " + (bindListeOption.All().indexOf(item) + 1),

                                }));
                            }, selected: (valeur) =>
                            {
                                optionInterfacetempSelection = valeur;
                                OngletListeSousInterfaceOptionlist = [];
                                ListeSousInterfaceOnglet = {
                                    textVariable: "Base",
                                    class: "TheScrollAutoForOptionShowroom",
                                    isOngletPreselected: true,
                                    CheckNeedRegeneration: async () => { return false; },
                                    GenerateContent: () => { return null;/* Temporaire function */ }
                                };
                                OngletListeSousInterfaceOptionlist.push(ListeSousInterfaceOnglet);

                                if (optionInterfacetempSelection.Option != null)
                                {
                                    let optionCopy = null;
                                    if (!valeur.isNew)
                                        optionCopy = Object.assign({}, optionInterfacetempSelection.Option);
                                    else
                                        valeur.isNew = false;
                                    mythis.GenerationRecursiveOptionsAffichage(optionTemp.listOption, optionInterfacetempSelection.Option, optionInterfacetempSelection.forAutoGenerate, ListeSousInterfaceOnglet, OngletListeSousInterfaceOptionlist, () => { regenerateRenderListeSousInterface(); }, optionCopy );
                                }
                                else
                                    mythis.GenerationRecursiveOptionsAffichage(optionTemp.listOption, {}, {}, ListeSousInterfaceOnglet, OngletListeSousInterfaceOptionlist, () => { }, null,true);
                                xxNavOngletBarTemp.SupprimerAllOnglet();
                                OngletListeSousInterfaceOptionlist.forEach((item) =>
                                {
                                    xxNavOngletBarTemp.AjouteOnglet(item);
                                });
                            },
                        })

                        _sousGridListeSousInterface.append([
                            new xxGridItem({
                                colStart: 1, nbCols: 1,
                                rowStart: 1, nbRows: 1,
                                content: listeInterface,
                            }),
                            new xxGridItem({
                                colStart: 2, nbCols: 1,
                                rowStart: 1, nbRows: 1,
                                content: new xxBouton({
                                    titleLocalise: "Ajouter",
                                    disabled: disable,
                                    click: (cb) =>
                                    {
                                        if (!disable)
                                        {
                                            let temp: { Option: any, forAutoGenerate: any, isNew: boolean } = { Option: {}, forAutoGenerate: {}, isNew:true };
                                            bindListeOption.add([temp]);
                                            listeInterface.selecteur(temp);
                                        }
                                        cb();
                                    },
                                    icone: new IconeSvg(enumIconeSvg.ajouter_rond),
                                    optionsAffichage: {
                                        tailleBouton: enumTailleBouton.Fit,
                                    },
                                }),
                            }),
                            new xxGridItem({
                                colStart: 3, nbCols: 1,
                                rowStart: 1, nbRows: 1,
                                content: new xxBouton({
                                    titleLocalise: "Supprimer",
                                    disabled: disable,
                                    click: (cb) =>
                                    {
                                        if (!disable)
                                        {
                                            let indexTemp: number = bindListeOption.All().indexOf(optionInterfacetempSelection);
                                            if (indexTemp >= 0)
                                            {
                                                bindListeOption.del([optionInterfacetempSelection]);
                                                if (indexTemp >= bindListeOption.Length)
                                                    indexTemp--;
                                                if (indexTemp < 0)
                                                    listeInterface.selecteur({ forAutoGenerate: null, Option: null, isNew:false });
                                                else
                                                    listeInterface.selecteur(bindListeOption.All()[indexTemp]);
                                            }
                                        }
                                        cb();
                                    },
                                    icone: new IconeSvg(enumIconeSvg.supprimer),
                                    optionsAffichage: {
                                        tailleBouton: enumTailleBouton.Fit,
                                    },
                                })
                            })]);

                        ListeSousInterfaceOnglet = {
                            textVariable: "Base", 
                            class: "TheScrollAutoForOptionShowroom",
                            isOngletPreselected: true,
                            CheckNeedRegeneration: async () => { return false; },
                            GenerateContent: () => { return null;/* Temporaire function */ }
                        };
                        OngletListeSousInterfaceOptionlist.push(ListeSousInterfaceOnglet);
                        currentOngletOptionlist.push({
                            textVariable: optionTemp.NameOption,
                            class: "TheScrollAutoForOptionShowroom",
                            CheckNeedRegeneration: async () => { return false; },
                            GenerateContent: () => { return _sousGridListeSousInterface; }
                        });
                        if (bindListeOption.Length > 0)
                            listeInterface.selecteur(bindListeOption.All()[0]);
                    }

                    if (!optionInterfacetempSelection.Option)
                        mythis.GenerationRecursiveOptionsAffichage(optionTemp.listOption, {}, {}, ListeSousInterfaceOnglet, OngletListeSousInterfaceOptionlist, () => { }, null, true);

                    if (currentOngletOption)
                    {
                        xxNavOngletBarTemp = new xxNavOngletBar({
                            GridForAddContent: _sousGridListeSousInterface,
                            GridItemContentOption: {
                                colStart: 1,
                                rowStart: 3,
                                nbRows: 1,
                                nbCols: 3,
                            },
                            initOnglets: OngletListeSousInterfaceOptionlist,
                            Style: mythis.xstyle
                        });
                        _sousGridListeSousInterface.append([new xxGridItem({
                            colStart: 1,
                            rowStart: 2,
                            nbRows: 1,
                            nbCols: 3,
                            content: xxNavOngletBarTemp
                        })]);
                        if (!optionTemp.listOption.some(item => item.TypeOption == ExxShowRoomContainerTypeOption.ListeSousInterface || item.TypeOption == ExxShowRoomContainerTypeOption.SousInterface))
                            cacherxElements(xxNavOngletBarTemp, true);
                    }

                    break;
                case ExxShowRoomContainerTypeOption.SousInterface:
                    let optionSousInterfacetemp= {};
                    let optionSousInterfacetempForAutoGenerate = {};

                    ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] : null;

                    let AffichageFacultatif: boolean = optionTemp.Facultatif && optionTemp.listOption.some(o => { return !o.Facultatif; });

                    let isUsed: boolean = !AffichageFacultatif || ValueSelect != null;
                    if (isUsed)
                    {
                        if (!optionTemp.Facultatif || Object.keys(optionSousInterfacetemp).length > 0)
                        {
                            option[optionTemp.NameOption] = optionSousInterfacetemp;
                            optionForAutoGenerate[optionTemp.NameOption] = optionSousInterfacetempForAutoGenerate;
                        }
                    }
                    else
                    {
                        delete option[optionTemp.NameOption];
                        delete optionForAutoGenerate[optionTemp.NameOption];
                    }

                    let OngletOptionlist: OptionsxxNavOngletItem[] = [];
                    let SousInterfaceOnglet: OptionsxxNavOngletItem;
                    let _sousGrid: xxGrid = new xxGrid({
                        lignes: ["auto", "auto", "1fr"],
                        class:"TheScrollAutoForOptionShowroom",
                        fullHeight: true,
                        fullWidth: true,
                        gridGap: "0"
                    });
                    if (!isUsed)
                        _sousGrid.addClass("Disabled");

                    if (currentOngletOption)
                    {
                        SousInterfaceOnglet = {
                            textVariable: "Base",
                            class: "TheScrollAutoForOptionShowroom",
                            isOngletPreselected: true,
                            CheckNeedRegeneration: async () => { return false; },
                            GenerateContent: () => { return null;/* Temporaire function */ }
                        };
                        OngletOptionlist.push(SousInterfaceOnglet);
                        currentOngletOptionlist.push({
                            textVariable: optionTemp.NameOption,
                            class : "TheScrollAutoForOptionShowroom",
                            CheckNeedRegeneration: async () => { return false; },
                            GenerateContent: () => { return _sousGrid; }
                        });
                    }

                    // On ajoute une couche a la function de rerender afin de supprime ou non l'interface
                    let regenerateRenderSousInterface: () => void = () =>
                    {
                        if (isUsed)
                        {
                            if (!optionTemp.Facultatif || Object.keys(optionSousInterfacetemp).length > 0)
                            {
                                option[optionTemp.NameOption] = optionSousInterfacetemp;
                                optionForAutoGenerate[optionTemp.NameOption] = optionSousInterfacetempForAutoGenerate;
                            }
                        }
                        else
                        {
                            delete option[optionTemp.NameOption];
                            delete optionForAutoGenerate[optionTemp.NameOption];
                        }
                        regenerateRender();
                    };

                    let labelFacultatif: xxLabelContainer = new xxLabelContainer({
                        optionsAffichage: {
                            justificationDuContenu:enumJustificationDuContenu.centre,
                            padding: { Gauche: 6 },
                            positionDuContenu: enumPositionDuContenu.droite
                        },
                        textVariable: "Ajouter l'interface",
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: new xxCheckBox({
                            value: isUsed,
                            ValueChange: (val) =>
                            {
                                isUsed = val
                                if (isUsed)
                                    _sousGrid.removeClass("Disabled");
                                else
                                    _sousGrid.addClass("Disabled");
                                regenerateRenderSousInterface();
                            }
                        })
                    });
                    if (AffichageFacultatif)
                    {
                        _sousGrid.append([new xxGridItem({
                            colStart: 1, nbCols: 1,
                            rowStart: 1, nbRows: 1,
                            content: labelFacultatif,
                        })]);
                    }

                    mythis.GenerationRecursiveOptionsAffichage(optionTemp.listOption, optionSousInterfacetemp, optionSousInterfacetempForAutoGenerate, SousInterfaceOnglet, OngletOptionlist, regenerateRenderSousInterface);

                    if (currentOngletOption)
                    {
                        let xxNavOngletBarTemp: xxNavOngletBar = new xxNavOngletBar({
                            GridForAddContent: _sousGrid,
                            GridItemContentOption: {
                                colStart: 1,
                                rowStart: 3,
                                nbRows: 1,
                                nbCols: 1,
                            },
                            initOnglets: OngletOptionlist,
                            Style: mythis.xstyle
                        });
                        _sousGrid.append([new xxGridItem({
                            colStart: 1,
                            rowStart: 2,
                            nbRows: 1,
                            nbCols: 1,
                            content: xxNavOngletBarTemp
                        })]);
                        if (!optionTemp.listOption.some(item => item.TypeOption == ExxShowRoomContainerTypeOption.ListeSousInterface || item.TypeOption == ExxShowRoomContainerTypeOption.SousInterface))
                            cacherxElements(xxNavOngletBarTemp, true);
                    }

                    mythis.GenerationRecursiveOptionsAffichage(optionTemp.listOption, optionSousInterfacetemp, optionSousInterfacetempForAutoGenerate, SousInterfaceOnglet, OngletOptionlist, regenerateRenderSousInterface);

                    if (currentOngletOption)
                    {
                        let xxNavOngletBarTemp: xxNavOngletBar = new xxNavOngletBar({
                            GridForAddContent: _sousGrid,
                            GridItemContentOption: {
                                colStart: 1,
                                rowStart: 3,
                                nbRows: 1,
                                nbCols: 1,
                            },
                            initOnglets: OngletOptionlist,
                            Style: mythis.xstyle
                        });
                        _sousGrid.append([new xxGridItem({
                            colStart: 1,
                            rowStart: 2,
                            nbRows: 1,
                            nbCols: 1,
                            content: xxNavOngletBarTemp
                        })]);
                        if (!optionTemp.listOption.some(item => item.TypeOption == ExxShowRoomContainerTypeOption.ListeSousInterface || item.TypeOption == ExxShowRoomContainerTypeOption.SousInterface))
                            cacherxElements(xxNavOngletBarTemp, true);
                    }

                    break;
                case ExxShowRoomContainerTypeOption.Texte:
                    ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] : optionTemp.ValeurDefaut;

                    if (!ValueSelect && !optionTemp.Facultatif)
                    {
                        option[optionTemp.NameOption] = "Change moi";
                        optionForAutoGenerate[optionTemp.NameOption] = "\"Change moi\"";
                    }
                    else if (!!optionTemp.ValeurDefaut)
                    {
                        option[optionTemp.NameOption] = ValueSelect;
                        optionForAutoGenerate[optionTemp.NameOption] = "\"" + ValueSelect + "\"";
                    }

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                        class: (!!optionTemp.description ? "LabelWithDescription" : ""),
                        textVariable: optionTemp.NameOption + FactatifSign + " (string)",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                        titleVariable: optionTemp.description, 
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: new xInputText({
                            value: ValueSelect,
                            placeHolderVariable: optionTemp.Facultatif ? "Facultatif" : "Change moi",
                            ValueChange: (val) =>
                            {
                                option[optionTemp.NameOption] = val;
                                optionForAutoGenerate[optionTemp.NameOption] = "\"" + val + "\"";

                                if (!val)
                                    if (optionTemp.Facultatif)
                                    {
                                        delete option[optionTemp.NameOption];
                                        delete optionForAutoGenerate[optionTemp.NameOption];
                                    }
                                    else
                                    {
                                        option[optionTemp.NameOption] = "Change moi";
                                        optionForAutoGenerate[optionTemp.NameOption] = "\"Change moi\"";
                                    }
                                regenerateRender();
                            }
                        }),
                    }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.TexteLocalisable:
                    let isTextLocalisable: boolean = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOptionLocalisable] != null : false;
                    ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOptionLocalisable] ?? optionValueSelectSurcharge[optionTemp.NameOptionVariable] : optionTemp.ValeurDefaut;

                    let textLocalVaria: string = ValueSelect ;

                    let TextboutonChange = () =>
                    {
                        if (!!textLocalVaria || !optionTemp.Facultatif) // si le texte n'est pas null/empty ou si c'est obligatoire
                        {
                            if (isTextLocalisable)
                            {
                                delete option[optionTemp.NameOptionVariable];
                                delete optionForAutoGenerate[optionTemp.NameOptionVariable];
                                if (!textLocalVaria) // si le texte est pas null/empty
                                {
                                    option[optionTemp.NameOptionLocalisable] = "Change moi";
                                    optionForAutoGenerate[optionTemp.NameOptionLocalisable] = "\"Change moi\"";
                                }
                                else
                                {
                                    option[optionTemp.NameOptionLocalisable] = textLocalVaria;
                                    optionForAutoGenerate[optionTemp.NameOptionLocalisable] = "\"" + textLocalVaria + "\"";
                                }
                            }
                            else
                            {
                                delete option[optionTemp.NameOptionLocalisable];
                                delete optionForAutoGenerate[optionTemp.NameOptionLocalisable];
                                if (!textLocalVaria) // si le texte est pas null/empty
                                {
                                    option[optionTemp.NameOptionVariable] = "Change moi";
                                    optionForAutoGenerate[optionTemp.NameOptionVariable] = "\"Change moi\"";
                                }
                                else
                                {
                                    option[optionTemp.NameOptionVariable] = textLocalVaria;
                                    optionForAutoGenerate[optionTemp.NameOptionVariable] = "\"" + textLocalVaria + "\"";
                                }
                            }
                        }
                        else
                        {
                            delete option[optionTemp.NameOptionLocalisable];
                            delete option[optionTemp.NameOptionVariable];

                            delete optionForAutoGenerate[optionTemp.NameOptionLocalisable];
                            delete optionForAutoGenerate[optionTemp.NameOptionVariable];
                        }
                    }

                    TextboutonChange();

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                        class: (!!optionTemp.description ? "LabelWithDescription" : ""),
                        textVariable: optionTemp.NameOptionVariable + "/" + optionTemp.NameOptionLocalisable + FactatifSign + " (string)",
                        optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                        titleVariable: optionTemp.description,
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: new xxStackPanel({
                            espaceMinimaliste: true,
                            initContent: [
                                new xxWrapPanel({
                                    espaceMinimaliste: true,
                                    retourALaLigne: false,
                                    initContent: [
                                        new xxLabel({ textLocalise: "Variable" }),
                                        new xxCheckBox({
                                            value: isTextLocalisable,
                                            typeCheckbox: enumTypeCheckbox.slide,
                                            ValueChange: (val) =>
                                            {
                                                isTextLocalisable = val;
                                                TextboutonChange();
                                                regenerateRender();
                                            }
                                        }),
                                        new xxLabel({ textLocalise: "Localise" })
                                    ]
                                }),
                                new xInputText({
                                    value: textLocalVaria,
                                    placeHolderVariable: optionTemp.Facultatif ? "Facultatif" : "Change moi",
                                    ValueChange: (val: string) =>
                                    {
                                        textLocalVaria = val;
                                        TextboutonChange();
                                        regenerateRender();
                                    }
                                })
                            ]
                        })
                    }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.Boolean:
                    ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] : null;
                    if (ValueSelect == null)
                        ValueSelect = !!optionTemp.ValeurDefaut;

                    if (!optionTemp.Facultatif || ValueSelect != !!optionTemp.ValeurDefaut) // Si valeurDefaut n'est pas null ou que c'est obligatoir
                    {   // la double negation transforme null en false
                        option[optionTemp.NameOption] = ValueSelect;
                        optionForAutoGenerate[optionTemp.NameOption] = ValueSelect;
                    }

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                        class: "inputShowroom " + (!!optionTemp.description ? "LabelWithDescription" : ""),
                        titleVariable: optionTemp.description,
                        textVariable: optionTemp.NameOption + FactatifSign + " (boolean)",
                        optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: new xxCheckBox({
                            value: ValueSelect,
                            ValueChange: (val) =>
                            {
                                option[optionTemp.NameOption] = val;
                                optionForAutoGenerate[optionTemp.NameOption] = val;
                                if ((val == optionTemp.ValeurDefaut && optionTemp.ValeurDefaut != null) || !val)
                                {
                                    if (optionTemp.Facultatif)
                                    {
                                        delete option[optionTemp.NameOption];
                                        delete optionForAutoGenerate[optionTemp.NameOption];
                                    }
                                    else
                                    {
                                        option[optionTemp.NameOption] = optionTemp.ValeurDefaut;
                                        optionForAutoGenerate[optionTemp.NameOption] = optionTemp.ValeurDefaut;
                                    }
                                }
                                regenerateRender();
                            }
                        }),
                    }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.Number:

                    ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] : null;
                    if (ValueSelect == null)
                        ValueSelect = optionTemp.ValeurDefaut;

                    if (ValueSelect == null && !optionTemp.Facultatif)
                    {
                        option[optionTemp.NameOption] = 6;
                        optionForAutoGenerate[optionTemp.NameOption] = 6;
                    }
                    else if (ValueSelect != null)
                    {
                        option[optionTemp.NameOption] = ValueSelect;
                        optionForAutoGenerate[optionTemp.NameOption] = ValueSelect;
                    }

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                        class: (!!optionTemp.description ? "LabelWithDescription" : ""),
                        titleVariable: optionTemp.description,
                        textVariable: optionTemp.NameOption + FactatifSign + " (number)",
                        optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: new xxInputNumerique({
                            value: ValueSelect,
                            ValueChange: (val: any) =>
                            {
                                let vraiIntCarXXInputNumeriqueRenvoirUnString: number = parseInt(val);

                                if (isNaN(vraiIntCarXXInputNumeriqueRenvoirUnString))
                                    if (optionTemp.Facultatif)
                                    {
                                        delete option[optionTemp.NameOption];
                                        delete optionForAutoGenerate[optionTemp.NameOption];
                                    }
                                    else
                                    {
                                        option[optionTemp.NameOption] = 6;
                                        optionForAutoGenerate[optionTemp.NameOption] = 6;
                                        xOutils.afficherMessageAlertifyError("Attention une value est obligatoire");
                                    }
                                else
                                {
                                    option[optionTemp.NameOption] = vraiIntCarXXInputNumeriqueRenvoirUnString;
                                    optionForAutoGenerate[optionTemp.NameOption] = vraiIntCarXXInputNumeriqueRenvoirUnString;
                                }
                                regenerateRender();
                            }
                        }),
                    }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.Enum:
                    try
                    {
                        let enumtemp = eval(optionTemp.EnumType);

                        // key egale intitulé de la valeur de l'enum
                        let listKeyValeurEnum: { key: string, valeur: string | number }[] = [];

                        if (typeof (enumtemp) == "object")
                        {
                            ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] : null;
                            if (ValueSelect == null)
                                ValueSelect = optionTemp.ValeurDefaut;
                            // Recuperation et creation d'une liste de key valeur avec l'enum
                            let valeurDefautKeyVal: { key: string, valeur: string | number };
                            let valeurSelectKeyVal: { key: string, valeur: string | number };

                            if (optionTemp.Facultatif && optionTemp.ValeurDefaut == null)
                            {
                                let undefinetempEnum: { key: string, valeur: string | number } = { key: "non defini", valeur: null };
                                listKeyValeurEnum.push(undefinetempEnum);
                                valeurDefautKeyVal = undefinetempEnum;
                                valeurSelectKeyVal = undefinetempEnum;
                            }
                            Object.keys(enumtemp).filter((key) => isNaN(parseInt(key))).forEach((key) =>
                            {
                                let valueTemp = enumtemp[key];
                                if (valueTemp != null && (typeof (valueTemp) == "string" || typeof (valueTemp) == "number"))
                                {
                                    let keyvaltemp = { key: key, valeur: valueTemp };

                                    if (keyvaltemp.valeur == optionTemp.ValeurDefaut)
                                        valeurDefautKeyVal = keyvaltemp;

                                    if (keyvaltemp.valeur == ValueSelect)
                                        valeurSelectKeyVal = keyvaltemp;

                                    listKeyValeurEnum.push(keyvaltemp);
                                }
                                else
                                    mythis.AddErreurOption(optionTemp.NameOption, `"${optionTemp.EnumType}" contient des valeurs autre que string et number. Es-que c'est bien une enum ?`);
                            });

                            if (valeurDefautKeyVal != null && valeurSelectKeyVal != null)
                            {
                                if (!optionTemp.Facultatif || valeurSelectKeyVal.key != valeurDefautKeyVal.key)
                                {
                                    optionForAutoGenerate[optionTemp.NameOption] = optionTemp.EnumType + "." + valeurSelectKeyVal.key;
                                    option[optionTemp.NameOption] = valeurSelectKeyVal.valeur;
                                }
                            }
                            else
                                mythis.AddErreurOption(optionTemp.NameOption, `Aucun valeur utilisable trouvé dans "${optionTemp.EnumType}"`);

                            if (currentOngletOption)
                                stackPanel.append(new xxLabelContainer({
                                titleVariable: optionTemp.description,
                                class: (!!optionTemp.description ? "LabelWithDescription" : ""),
                                textVariable: optionTemp.NameOption + FactatifSign + " (" + optionTemp.EnumType + ")",
                                optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                                type: enumTypeLabel.important,
                                labelLargeurLibre: true,
                                initContent: new xxAutoComplete<{ key: string, valeur: string | number }>({
                                    listeValeurs: listKeyValeurEnum,
                                    typeValue: valeurSelectKeyVal,
                                    getLibelle: (item) =>
                                    {
                                        if (item == valeurDefautKeyVal)
                                        {
                                            return item.key + " (Default)";
                                        }
                                        return item.key;
                                    },
                                    valueChange: (item) =>
                                    {
                                        if (item != valeurDefautKeyVal)
                                        {
                                            option[optionTemp.NameOption] = item.valeur;
                                            optionForAutoGenerate[optionTemp.NameOption] = optionTemp.EnumType + "." + item.key;
                                        }
                                        else if (optionTemp.Facultatif)
                                        {
                                            delete option[optionTemp.NameOption];
                                            delete optionForAutoGenerate[optionTemp.NameOption];
                                        }
                                        else
                                        {
                                            option[optionTemp.NameOption] = valeurDefautKeyVal.valeur
                                            optionForAutoGenerate[optionTemp.NameOption] = optionTemp.EnumType + "." + valeurDefautKeyVal.key;
                                        }
                                        regenerateRender();
                                    }
                                }),
                            }), ClassCouleurAlternance);
                        }
                        else
                            mythis.AddErreurOption(optionTemp.NameOption, `"${optionTemp.EnumType}" n'est pas enumerable.`);
                    }
                    catch (e)
                    {
                        mythis.AddErreurOption(optionTemp.NameOption, `L'enum "${optionTemp.EnumType}" est introuvable.`);
                    }
                    break;
                case ExxShowRoomContainerTypeOption.Function:

                    ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] : null;
                    let haveFunction: boolean = false;
                    if (ValueSelect == null)
                        ValueSelect = optionTemp.Function;
                    else
                        haveFunction = true;
                    if (!optionTemp.Facultatif || (optionValueSelectSurcharge == null && optionTemp.isDefaultSelect) || haveFunction) 
                    {
                        option[optionTemp.NameOption] = ValueSelect;
                        optionForAutoGenerate[optionTemp.NameOption] = ValueSelect.toString();
                    }

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                        class: "inputShowroom " + (!!optionTemp.description ? "LabelWithDescription" : ""),
                        titleVariable: optionTemp.description,
                        textVariable: optionTemp.NameOption + FactatifSign + " (Function)",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: new xxCheckBox({
                            value: !optionTemp.Facultatif || haveFunction || (optionValueSelectSurcharge == null && optionTemp.isDefaultSelect),
                            inactif: !optionTemp.Facultatif,
                            ValueChange: (val) =>
                            {
                                if (val)
                                {
                                    option[optionTemp.NameOption] = ValueSelect;
                                    optionForAutoGenerate[optionTemp.NameOption] = ValueSelect.toString();
                                }
                                else
                                {
                                    delete option[optionTemp.NameOption];
                                    delete optionForAutoGenerate[optionTemp.NameOption];
                                }
                                regenerateRender();
                            }
                        }),
                    }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.Icone:

                    ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] : null;
                    if (ValueSelect == null && optionTemp.ValeurDefaut != null)
                        ValueSelect = optionTemp.ValeurDefaut;

                    let valueSelectIcone: { groupe: string, icone: () => Icone, iconeName: string, iconeValue:number|string, iconeString: string };
                    if (ValueSelect != null)
                    {
                        valueSelectIcone = xxShowRoomContainer.ListIcone.find((item) => item.groupe == ValueSelect.getTypeIcone() && item.iconeValue == ValueSelect.getValeurIcone())
                    }

                    // GANON Default Surcharge
                    if (!optionTemp.Facultatif || valueSelectIcone != null)
                    {
                        option[optionTemp.NameOption] = valueSelectIcone == null ? xxShowRoomContainer.ListIcone[0].icone() : valueSelectIcone.icone();
                        optionForAutoGenerate[optionTemp.NameOption] = valueSelectIcone == null ? xxShowRoomContainer.ListIcone[0].iconeString : valueSelectIcone.iconeString;
                    }

                    if (currentOngletOption)
                        stackPanel.append(
                        new xxLabelContainer({
                            class: (!!optionTemp.description ? "LabelWithDescription" : ""),
                            textVariable:optionTemp.NameOption + FactatifSign + " (Icone)",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            type: enumTypeLabel.important,
                            titleVariable: optionTemp.description,
                            labelLargeurLibre: true,
                            initContent: new xxAutoComplete<{ groupe: string, icone: () => Icone, iconeName: string, iconeValue:number|string, iconeString: string }>({
                                listeValeurs: xxShowRoomContainer.ListIcone.slice(),
                                getLibelle: (item) => { return item.iconeName; },
                                value: valueSelectIcone != null ? valueSelectIcone.iconeName : null,
                                libelleNullChoice: optionTemp.Facultatif ? "Aucun icone" : null,
                                placeholder: optionTemp.Facultatif ? "Facultatif" : null,
                                regroupementUniqueBy: {
                                    GroupBy: (a) => a.groupe,
                                },
                                renderItemInListe: (ici, item, selecteur) =>
                                {
                                    ici.append(new xxBouton({
                                        class: "BoutonAutoCompleteIcon",
                                        typeBouton: enumTypeBouton.Standard,
                                        textVariable: item.iconeName,
                                        titleVariable: item.iconeName,
                                        optionsAffichage: {
                                            tailleBouton: enumTailleBouton.Fit,
                                            margin: { Tous: 0 },
                                        },
                                        icone: item.icone(),
                                        click: (cb) =>
                                        {
                                            selecteur(item);
                                            cb();
                                        }
                                    }));
                                },
                                valueChange: (item) =>
                                {
                                    if (item != null)
                                    {
                                        option[optionTemp.NameOption] = item.icone();
                                        optionForAutoGenerate[optionTemp.NameOption] = item.iconeString;
                                    }
                                    else if (optionTemp.Facultatif)
                                    {
                                        delete option[optionTemp.NameOption];
                                        delete optionForAutoGenerate[optionTemp.NameOption];
                                    }
                                    else
                                    {
                                        option[optionTemp.NameOption] = xxShowRoomContainer.ListIcone[0].icone();
                                        optionForAutoGenerate[optionTemp.NameOption] = xxShowRoomContainer.ListIcone[0].iconeString;
                                    }
                                    regenerateRender();
                                }
                            }) 
                        })
                    , ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.CouleurHexa:

                    ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] : null;
                    let haveColor = false;
                    if (!ValueSelect)
                        ValueSelect = "ff0000";
                    else
                        haveColor = true;
                    // GANON Default Surcharge
                    if (!optionTemp.Facultatif)
                    {
                        option[optionTemp.NameOption] = ValueSelect;
                        optionForAutoGenerate[optionTemp.NameOption] = "\"" + ValueSelect +"\"";
                    }

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                        class: (!!optionTemp.description ? "LabelWithDescription" : ""),
                        textVariable: optionTemp.NameOption + FactatifSign + " (string)",
                        optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                        titleVariable: optionTemp.description,
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: new xxChoixCouleur({
                            value: (!optionTemp.Facultatif || haveColor) ? ValueSelect : null,
                            choixCouleurLibre: false,
                            ValueChange: (val) =>
                            {
                                option[optionTemp.NameOption] = val;
                                optionForAutoGenerate[optionTemp.NameOption] = "\"" + val + "\"";

                                if (!val)
                                    if (optionTemp.Facultatif)
                                    {
                                        delete option[optionTemp.NameOption];
                                        delete optionForAutoGenerate[optionTemp.NameOption];
                                    }
                                    else
                                    {
                                        option[optionTemp.NameOption] = "ff0000";
                                        optionForAutoGenerate[optionTemp.NameOption] = "\"ff0000\"";
                                    }
                                regenerateRender();
                            }
                        }),
                    }), ClassCouleurAlternance);
                    break;

                case ExxShowRoomContainerTypeOption.DateSerialisable:
                    // GANON Default Surcharge
                    if (!optionTemp.Facultatif) {
                        option[optionTemp.NameOption] = DateSerialisable.Factory(new Date(Date.now()));
                        optionForAutoGenerate[optionTemp.NameOption] = "new Date(Date.now())";
                    }

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                            class: (!!optionTemp.description ? "LabelWithDescription" : ""),
                            textVariable: optionTemp.NameOption + FactatifSign + " (Date)",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            titleVariable: optionTemp.description,
                            type: enumTypeLabel.important,
                            labelLargeurLibre: true,
                            initContent: new xInputDate({
                                CanSelectDateNull: true,
                                ValueChange: (val: DateSerialisable) => {


                                    if (!val)
                                        if (optionTemp.Facultatif) {
                                            delete option[optionTemp.NameOption];
                                            delete optionForAutoGenerate[optionTemp.NameOption];
                                        }
                                        else {
                                            option[optionTemp.NameOption] = DateSerialisable.Factory(new Date(Date.now()));
                                            optionForAutoGenerate[optionTemp.NameOption] = "DateSerialisable.Factory(new Date(Date.now()))";
                                        }
                                    else {
                                        option[optionTemp.NameOption] =DateSerialisable.getDate(val).getTime();
                                        optionForAutoGenerate[optionTemp.NameOption] = "DateSerialisable.getDate(val).getTime()";
                                    }
                                    regenerateRender();
                                }
                            }),
                        }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.Donnees:
                    ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] : null;
                    if (ValueSelect == null)
                        ValueSelect = optionTemp.ValeurDefaut;
                    if (ValueSelect == null)
                        ValueSelect = [];
                    if (!optionTemp.Facultatif) 
                    {
                        option[optionTemp.NameOption] = ValueSelect;
                        optionForAutoGenerate[optionTemp.NameOption] = "[]";
                    }

                    let nbData: BindableObject<string> = new BindableObject<string>(ValueSelect.length);

                    let sampleData: any[] = null;

                    if (optionTemp.ValeurSample != null  && optionTemp.ValeurSample.length > 0)
                        sampleData = optionTemp.ValeurSample;
                    else
                        switch (optionTemp.DataType)
                        {
                            case ExxShowRoomContaineDataType.number:
                                sampleData = xxShowRoomSample.listeNombre(); 
                                break;
                            case ExxShowRoomContaineDataType.string:
                                sampleData = xxShowRoomSample.listeStrings(); 
                                break;
                            case ExxShowRoomContaineDataType.boolean:
                                sampleData = xxShowRoomSample.listeboolean(); 
                                break;
                            case ExxShowRoomContaineDataType.CustomObjet:
                                sampleData = xxShowRoomSample.listeCustom();
                                break;
                            case ExxShowRoomContaineDataType.CleValeur:
                                sampleData = xxShowRoomSample.listeCustom();
                                break;
                            default:
                                mythis.AddErreur(optionTemp.NameOption, "Le type \"" + optionTemp.DataType + "\" n'a pas de sample pas default! Veuillez ajoute des \"ValeurSample\" a l'option \"" + optionTemp.NameOption +"\" ");
                        }

                    if (currentOngletOption)
                    {
                        if (sampleData != null)
                            stackPanel.append(new xxLabelContainer({
                                class: "inputShowroom " + (!!optionTemp.description ? "LabelWithDescription" : ""),
                                titleVariable: optionTemp.description,
                                textVariable: optionTemp.NameOption + FactatifSign + " (" + optionTemp.DataType + "[])",
                                optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
                                type: enumTypeLabel.important,
                                labelLargeurLibre: true,
                                initContent: new xxWrapPanel({
                                    retourALaLigne: false,
                                    espaceMinimaliste: true,
                                    initContent: [
                                        new xxBouton({
                                            titleVariable: "Supprimer une donnée",
                                            click: (cb) =>
                                            {
                                                if (option[optionTemp.NameOption] != null && (option[optionTemp.NameOption] as any[]).length > 0)
                                                {
                                                    (option[optionTemp.NameOption] as any[]).shift();
                                                    optionForAutoGenerate[optionTemp.NameOption] = "[]";
                                                    nbData.Value = (option[optionTemp.NameOption] as any[]).length.toString();

                                                    if (optionTemp.Facultatif && (option[optionTemp.NameOption] as any[]).length == 0)
                                                    {
                                                        delete option[optionTemp.NameOption];
                                                        delete optionForAutoGenerate[optionTemp.NameOption];
                                                    }

                                                    regenerateRender();
                                                }
                                                cb();
                                            },
                                            optionsAffichage: {
                                                tailleBouton: enumTailleBouton.Fit,
                                            },
                                            icone: new IconeSvg(enumIconeSvg.moins),
                                        }),
                                        new xxLabel({
                                            binding: {
                                                value: nbData
                                            }
                                        }),
                                        new xxBouton({
                                            titleLocalise: "Ajouter une donnée",
                                            click: (cb) =>
                                            {
                                                if (option[optionTemp.NameOption] == null)
                                                    option[optionTemp.NameOption] = [];

                                                (option[optionTemp.NameOption] as any[]).push(sampleData[((option[optionTemp.NameOption] as any[]).length % sampleData.length)]);
                                                optionForAutoGenerate[optionTemp.NameOption] = "[]";
                                                nbData.Value = (option[optionTemp.NameOption] as any[]).length.toString();
                                                regenerateRender();
                                                cb();
                                            },
                                            optionsAffichage: {
                                                tailleBouton: enumTailleBouton.Fit,
                                            },
                                            icone: new IconeSvg(enumIconeSvg.plus),
                                        })
                                    ]
                                })
                            }), ClassCouleurAlternance);
                        else
                            stackPanel.append(new xxLabelContainer({
                                class: "inputShowroom " + (!!optionTemp.description ? "LabelWithDescription" : ""),
                                textVariable: optionTemp.NameOption + FactatifSign + " (" + optionTemp.DataType + "[])",
                                optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
                                type: enumTypeLabel.important,
                                labelLargeurLibre: true,
                                initContent: new IconeCs3i(enumIconeCs3i.action_erreur)
                            }));
                    }
                    break;
                case ExxShowRoomContainerTypeOption.iXElement:
                    ValueSelect = (optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] != null : false )|| optionTemp.ValeurDefaut;

                    let ValeurSample: iXElement = optionTemp.ValeurSample;
                    if (optionValueSelectSurcharge != null)
                        ValeurSample = optionValueSelectSurcharge[optionTemp.NameOption];
                    if (ValeurSample == null)
                        ValeurSample = xxShowRoomSample.divSample();

                    if (!optionTemp.Facultatif) 
                    {
                        option[optionTemp.NameOption] = ValeurSample;
                        optionForAutoGenerate[optionTemp.NameOption] = "new xDiv({})";
                        ValueSelect = true;
                    }

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                        titleVariable: optionTemp.description,
                        class: "inputShowroom " + (!!optionTemp.description ? "LabelWithDescription" : ""),
                        textVariable: optionTemp.NameOption + FactatifSign + " (iXElement)",
                        optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: new xxCheckBox({
                            value: ValueSelect,
                            inactif: !optionTemp.Facultatif,
                            ValueChange: (val) =>
                            {
                                if (val)
                                {
                                    option[optionTemp.NameOption] = ValeurSample;
                                    optionForAutoGenerate[optionTemp.NameOption] = "new xDiv({})";
                                }
                                else
                                {
                                    delete option[optionTemp.NameOption];
                                    delete optionForAutoGenerate[optionTemp.NameOption];
                                }
                                regenerateRender();
                            }
                        }),
                    }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.ListeiXElement:
                    ValueSelect = optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] : null;
                    if (ValueSelect == null)
                        ValueSelect = optionTemp.ValeurDefaut;
                    if (ValueSelect == null)
                        ValueSelect = [];

                    if (!optionTemp.Facultatif) 
                    {
                        option[optionTemp.NameOption] = ValueSelect;
                        optionForAutoGenerate[optionTemp.NameOption] = "[]";
                    }

                    let nbElement: BindableObject<string> = new BindableObject<string>(ValueSelect.length);

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                        class: "inputShowroom " + (!!optionTemp.description ? "LabelWithDescription" : ""),
                        titleVariable: optionTemp.description,
                        textVariable: optionTemp.NameOption + FactatifSign + " (iXElement[])",
                        optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: new xxWrapPanel({
                            retourALaLigne: false,
                            espaceMinimaliste: true,
                            initContent: [
                                new xxBouton({
                                    titleVariable: "Supprimer un XElement",
                                    click: (cb) =>
                                    {
                                        if (option[optionTemp.NameOption] != null && (option[optionTemp.NameOption] as iXElement[]).length > 0)
                                        {
                                            (option[optionTemp.NameOption] as iXElement[]).shift();
                                            optionForAutoGenerate[optionTemp.NameOption] = "[]";
                                            nbElement.Value = (option[optionTemp.NameOption] as iXElement[]).length.toString();

                                            if (optionTemp.Facultatif && (option[optionTemp.NameOption] as iXElement[]).length == 0)
                                            {
                                                delete option[optionTemp.NameOption];
                                                delete optionForAutoGenerate[optionTemp.NameOption];
                                            }
                                            
                                            regenerateRender();
                                        }
                                        cb();
                                    },
                                    optionsAffichage: {
                                        tailleBouton: enumTailleBouton.Fit,
                                    },
                                    icone: new IconeSvg(enumIconeSvg.moins),
                                }),
                                new xxLabel({
                                    binding: {
                                        value: nbElement
                                    }
                                }),
                                new xxBouton({
                                    titleLocalise:"Ajouter un xelement",
                                    click: (cb) =>
                                    {
                                        if (option[optionTemp.NameOption] == null)
                                            option[optionTemp.NameOption] = [];

                                        (option[optionTemp.NameOption] as iXElement[]).push(xxShowRoomSample.divSample(((option[optionTemp.NameOption] as iXElement[]).length %3)+1));
                                        optionForAutoGenerate[optionTemp.NameOption] = "[]";
                                        nbElement.Value = (option[optionTemp.NameOption] as iXElement[]).length.toString();
                                        regenerateRender();
                                        cb();
                                    },
                                    optionsAffichage: {
                                        tailleBouton: enumTailleBouton.Fit,
                                    },
                                    icone: new IconeSvg(enumIconeSvg.plus),
                                })
                            ]
                        })
                    }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.Time:
                    // GANON Default Surcharge
                    if (!optionTemp.Facultatif)
                    {
                        option[optionTemp.NameOption] = DateSerialisable.getXTime(DateSerialisable.Now());
                        optionForAutoGenerate[optionTemp.NameOption] = "DateSerialisable.getXTime(DateSerialisable.Now())";
                    }

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                            class: (!!optionTemp.description ? "LabelWithDescription" : ""),
                            textVariable: optionTemp.NameOption + FactatifSign + " (Time)",
                            optionsAffichage: {
                                positionDuContenu: enumPositionDuContenu.bas
                            },
                            titleVariable: optionTemp.description,
                            type: enumTypeLabel.important,
                            labelLargeurLibre: true,
                            initContent: new xInputTime({
                                value: optionTemp.Facultatif ? null : DateSerialisable.getXTime(DateSerialisable.Now()),
                                ValueChange: (val: xTime) =>
                                {
                                    if (!val)
                                        if (optionTemp.Facultatif)
                                        {
                                            delete option[optionTemp.NameOption];
                                            delete optionForAutoGenerate[optionTemp.NameOption];
                                        }
                                        else
                                        {
                                            option[optionTemp.NameOption] = DateSerialisable.getXTime(DateSerialisable.Now());
                                            optionForAutoGenerate[optionTemp.NameOption] = "DateSerialisable.getXTime(DateSerialisable.Now())";
                                        }
                                    else
                                    {
                                        option[optionTemp.NameOption] = new xTime(val.Heures, val.Minutes);
                                        optionForAutoGenerate[optionTemp.NameOption] = "new xTime(" + val.Heures+","+ val.Minutes + ")";
                                    }
                                    regenerateRender();
                                }
                            }),
                        }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.Pagewapper:
                    ValueSelect = (optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] != null : false) || optionTemp.ValeurDefaut;

                    if (!optionTemp.Facultatif) 
                    {
                        option[optionTemp.NameOption] = mythis.Page;
                        optionForAutoGenerate[optionTemp.NameOption] = "new xxPageWrapper({ titleLocalise:\"sample\" })";
                        ValueSelect = true; 
                    }

                    if (currentOngletOption)
                        stackPanel.append(new xxLabelContainer({
                            titleVariable: optionTemp.description,
                            class: "inputShowroom " + (!!optionTemp.description ? "LabelWithDescription" : ""),
                            textVariable: optionTemp.NameOption + FactatifSign + " (xxPageWrapper)",
                            type: enumTypeLabel.important,
                            labelLargeurLibre: true,
                            initContent: new xxCheckBox({
                                value: ValueSelect,
                                inactif: !optionTemp.Facultatif,
                                ValueChange: (val) =>
                                {
                                    if (val)
                                    {
                                        option[optionTemp.NameOption] = mythis.Page;
                                        optionForAutoGenerate[optionTemp.NameOption] = "new xxPageWrapper({ titleLocalise:\"sample\" })";
                                    }
                                    else
                                    {
                                        delete option[optionTemp.NameOption];
                                        delete optionForAutoGenerate[optionTemp.NameOption];
                                    }
                                    regenerateRender();
                                }
                            }),
                        }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.CotesCSS:
                    ValueSelect = (optionValueSelectSurcharge != null ? optionValueSelectSurcharge[optionTemp.NameOption] != null : false) || optionTemp.ValeurDefaut;

                    let interfaceMagin: OptionsCotesCSS = !ValueSelect ? assignerObjet({}, ValueSelect) : {};

                    if (!optionTemp.Facultatif) 
                    {
                        option[optionTemp.NameOption] = interfaceMagin;
                        optionForAutoGenerate[optionTemp.NameOption] = interfaceMagin;
                    }

                    let regenerateRenderCotesCSS: () => void = () =>
                    {
                        if (!optionTemp.Facultatif || Object.keys(interfaceMagin).length > 0)
                        {
                            option[optionTemp.NameOption] = interfaceMagin;
                            optionForAutoGenerate[optionTemp.NameOption] = interfaceMagin;
                        }
                        else
                        {
                            delete option[optionTemp.NameOption];
                            delete optionForAutoGenerate[optionTemp.NameOption];
                        }
                        regenerateRender();
                    };

                    let gridCotesCSS: xxGrid = new xxGrid({
                        gridGap: "5px",
                    });

                    // All
                    gridCotesCSS.append([new xxGridItem({
                        colStart: 2, nbCols: 1,
                        rowStart: 2, nbRows: 1,
                        content: new xxInputNumerique({
                            placeHolderVariable: "Tous",
                            value: ValueSelect?.Tous,
                            ValueChange: (val) =>
                            {
                                if (!!val)
                                    interfaceMagin.Tous = val;
                                else
                                    delete interfaceMagin.Tous;
                                regenerateRenderCotesCSS();
                            },
                        })
                    })]);

                    // Top 
                    gridCotesCSS.append([new xxGridItem({
                        colStart: 2, nbCols: 1,
                        rowStart: 1, nbRows: 1,
                        content: new xxInputNumerique({
                            placeHolderVariable: "Haut",
                            value: ValueSelect?.Haut,
                            ValueChange: (val) =>
                            {
                                if (!!val)
                                    interfaceMagin.Haut = val;
                                else
                                    delete interfaceMagin.Haut;
                                regenerateRenderCotesCSS();
                            },
                        })
                    })]);

                    // bottom
                    gridCotesCSS.append([new xxGridItem({
                        colStart: 2, nbCols: 1,
                        rowStart: 3, nbRows: 1,
                        content: new xxInputNumerique({
                            placeHolderVariable: "Bas",
                            value: ValueSelect?.Bas,
                            ValueChange: (val) =>
                            {
                                if (!!val)
                                    interfaceMagin.Bas = val;
                                else
                                    delete interfaceMagin.Bas;
                                regenerateRenderCotesCSS();
                            },
                        })
                    })]);

                    // Left
                    gridCotesCSS.append([new xxGridItem({
                        colStart: 1, nbCols: 1,
                        rowStart: 2, nbRows: 1,
                        content: new xxInputNumerique({
                            placeHolderVariable: "Gauche",
                            value: ValueSelect?.Gauche,
                            ValueChange: (val) =>
                            {
                                if (!!val)
                                    interfaceMagin.Gauche = val;
                                else
                                    delete interfaceMagin.Gauche;
                                regenerateRenderCotesCSS();
                            },
                        })
                    })]);

                    // Rigth
                    gridCotesCSS.append([new xxGridItem({
                        colStart: 3, nbCols: 1,
                        rowStart: 2, nbRows: 1,
                        content: new xxInputNumerique({
                            placeHolderVariable: "Droite",
                            value: ValueSelect?.Droite,
                            ValueChange: (val) =>
                            {
                                if (!!val)
                                    interfaceMagin.Droite = val;
                                else
                                    delete interfaceMagin.Droite;
                                regenerateRenderCotesCSS();
                            },
                        })
                    })]);

                    // TopBottom
                    gridCotesCSS.append([new xxGridItem({
                        colStart: 4, nbCols: 1,
                        rowStart: 1, nbRows: 1,
                        content: new xxInputNumerique({
                            placeHolderVariable: "H/B",
                            value: ValueSelect?.HautEtBas,
                            ValueChange: (val) =>
                            {
                                if (!!val)
                                    interfaceMagin.HautEtBas = val;
                                else
                                    delete interfaceMagin.HautEtBas;
                                regenerateRenderCotesCSS();
                            },
                        })
                    })]);

                    // LeftRight
                    gridCotesCSS.append([new xxGridItem({
                        colStart: 4, nbCols: 1,
                        rowStart: 3, nbRows: 1,
                        content: new xxInputNumerique({
                            placeHolderVariable: "G/D",
                            value: ValueSelect?.GaucheEtDroite,
                            ValueChange: (val) =>
                            {
                                if (!!val)
                                    interfaceMagin.GaucheEtDroite = val;
                                else
                                    delete interfaceMagin.GaucheEtDroite;
                                regenerateRenderCotesCSS();
                            },
                        })
                    })]);
                    stackPanel.append(new xxLabelContainer({
                        class: (!!optionTemp.description ? "LabelWithDescription" : ""),
                        textVariable: optionTemp.NameOption + FactatifSign + " (CotesCss)",
                        optionsAffichage: {
                            positionDuContenu: enumPositionDuContenu.bas
                        },
                        titleVariable: optionTemp.description,
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: gridCotesCSS
                    }), ClassCouleurAlternance);
                    break;
                case ExxShowRoomContainerTypeOption.Custom:
                    let regenerateRenderCustom = (data:any,dataforAutoGene:any)=>
                    {
                        if (data)
                        {
                            option[optionTemp.NameOption] = data;
                            optionForAutoGenerate[optionTemp.NameOption] = dataforAutoGene;
                        }
                        else
                        {
                            delete option[optionTemp.NameOption];
                            delete optionForAutoGenerate[optionTemp.NameOption];
                        }
                        regenerateRender();
                    }
                    stackPanel.append(new xxLabelContainer({
                        class: (!!optionTemp.description ? "LabelWithDescription" : ""),
                        textVariable: optionTemp.NameOption + FactatifSign + " (Custom)",
                        optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                        titleVariable: optionTemp.description,
                        type: enumTypeLabel.important,
                        labelLargeurLibre: true,
                        initContent: optionTemp.GenerateOption(regenerateRenderCustom),
                    }), ClassCouleurAlternance);
                    break;
            }
        });
    }

    private GenerationRecursiveOptionsStringCode(Element: any, nbTab: number)
    {
        let mythis: xxShowRoomContainer = this;
        let toSender: string = "";
        let typeElement = typeof (Element);
        if (typeElement == "string" || typeElement == "number")
        {
            toSender += Element;
        }
        else if (typeElement == "boolean")
        {
            toSender += Element ? "true" : "false";
        }
        else if (typeof(Element) == "object" && Array.isArray(Element)){
            nbTab++;
            toSender += "[\n";
            Element.forEach((item) =>
            {
                toSender += ("\t").repeat(nbTab);
                toSender += mythis.GenerationRecursiveOptionsStringCode(item, nbTab);
                toSender += ",\n";
            });
            nbTab--;
            toSender += ("\t").repeat(nbTab) + "]";
        }
        else if (typeof (Element) == "object")
        {
            nbTab++;
            toSender += "{\n";
            let listkeys: string[] = Object.keys(Element);
            if (listkeys.length > 0)
            {
                listkeys.forEach((item) =>
                {
                    if (typeof (Element[item]) != "object" || (typeof (Element[item]) == "object" && Object.keys(Element[item]).length > 0))
                    {
                        toSender += ("\t").repeat(nbTab) + item + ":";
                        toSender += mythis.GenerationRecursiveOptionsStringCode(Element[item], nbTab);
                        toSender += ",\n";
                    }
                });
            }
            nbTab--;
            toSender += ("\t").repeat(nbTab) + "}";
        }

        return toSender;
    }
    //#endregion "Affichage xElement"

    //#region "Affichage Icone"

    private ReGenerateGridIcone()
    {
        let mythis: xxShowRoomContainer = this;

        // Empty GridSecondaire and liste erreur
        mythis.GridVueIcone.vider();

        let Ligne: number = 1;
        let column: number = 1, columnMax = 6;
        let GroupeCurrent: string = null; 

        let haveResultat: boolean = false;

        let stringrecherche = mythis.stringRecherche.Value.split(";").map(r => r.toLowerCase());

        // Recheche Icone
        xxShowRoomContainer.ListIcone.sort((a, b) =>
        {
            if (a.groupe == b.groupe)
                return 0;
            else if (a.groupe < b.groupe)
                return -1;
            else
                return 1;
        }).forEach((item) =>
        {
            let itemString: string = item.iconeName.toLowerCase();
            let itemGroup: string = item.groupe.toLowerCase();
            let sublimName: string;
            let sublimGroup: string;
            stringrecherche.some(r =>
            {
                if (itemString.includes(r))
                {
                    sublimName = r;
                    return true;
                }
                return false;
            });
            stringrecherche.some(r =>
            {
                if (itemGroup.includes(r))
                {
                    sublimGroup = r;
                    return true;
                }
                return false;
            });

            if ((stringrecherche.length > 1 && !!sublimGroup && !!sublimName) || (stringrecherche.length == 1 && (!!sublimGroup || !!sublimName || !stringrecherche[0])))
            {
                haveResultat = true;
                if (GroupeCurrent == null || GroupeCurrent != item.groupe)
                {
                    if (column > 1)
                    {
                        column = 1;
                        Ligne++;
                    }

                    GroupeCurrent = item.groupe;
                    mythis.GridVueIcone.append([new xxGridItem({
                        colStart: 1, nbCols: columnMax,
                        rowStart: Ligne, nbRows: 1,
                        content: new xxLabel({
                            textVariable: GroupeCurrent,
                            type: enumTypeLabel.soustitre,
                        }).setSurbrillance(sublimGroup)
                    })]);
                    Ligne++;
                }

                let grid: xxGrid = new xxGrid({
                    colonnes: ["20px", "1fr", "20px"],
                    lignes: ["10px", "1fr", "10px", "20px"],
                    class: "TuileSearch",
                });

                let labelcopie: xxLabel = new xxLabel({
                    class: "isCopieLabel",
                    textVariable: "Copie !",
                });
                labelcopie.hideLabel(true);

                grid.append([
                    new xxGridItem({
                        colStart: 2, nbCols: 1,
                        rowStart: 2, nbRows: 1,
                        optionsAffichage: {
                            alignementContenu: enumAlignementContenu.CentreCentre
                        },
                        content: item.icone()
                    }),
                    new xxGridItem({
                        colStart: 1, nbCols: 3,
                        rowStart: 3, nbRows: 1,
                        optionsAffichage: {
                            alignementContenu: enumAlignementContenu.CentreCentre
                        },
                        content: new xxLabel({
                            lineBreak: true,
                            textVariable: item.iconeName,
                            type: enumTypeLabel.important
                        }).setSurbrillance(sublimName)
                    }),
                    new xxGridItem({
                        colStart: 1, nbCols: 2,
                        rowStart: 4, nbRows: 1,
                        content: labelcopie
                    }),
                    new xxGridItem({
                        colStart: 3, nbCols: 1,
                        rowStart: 4, nbRows: 1,
                        optionsAffichage: {
                            alignementContenu: enumAlignementContenu.CentreCentre,
                            margin: {
                                Droite: 5,
                                Bas: 5
                            }
                        },
                        content: new IconeCs3i(enumIconeCs3i.action_copier, { taille: tailleIcone.XS })
                    })
                ]);

                let CEvent: xxContainerEvent = new xxContainerEvent({
                    initContent: grid,
                    class: "TuileAffichageIcone",
                    onClick: (cb) =>
                    {

                        if (navigator.clipboard)
                        {
                            navigator.clipboard.writeText(item.iconeString).then(() =>
                            {
                                labelcopie.showLabel();
                                //fonction pour supprimer la classe après 3 secondes

                                setTimeout(function ()
                                {
                                    labelcopie.hideLabel(true);
                                }, 2800);
                            }, () =>
                            {
                                xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le code", false).then(() =>
                                {
                                    xOutils.copyToClipboard(item.iconeString);
                                })
                            });
                        }
                        else
                        {
                            xOutils.copyToClipboard(item.iconeString);
                            labelcopie.showLabel();
                            //fonction pour supprimer la classe après 3 secondes

                            setTimeout(function ()
                            {
                                labelcopie.hideLabel(true);
                            }, 2800);
                        }

                        cb();
                    }
                })

                mythis.GridVueIcone.append([new xxGridItem({
                    colStart: column, nbCols: 1,
                    rowStart: Ligne, nbRows: 1,
                    content: CEvent
                })]);
                column++;
                if (column > columnMax)
                {
                    column = 1;
                    Ligne++;
                }
            }
        });

        if (!haveResultat && stringrecherche.length > 0)
        {
            mythis.GridVueIcone.append([
                new xxGridItem({
                    colStart: 1,
                    rowStart: 1,
                    nbCols: columnMax,
                    nbRows: 1,
                    optionsAffichage: {
                        alignementContenu: enumAlignementContenu.CentreCentre
                    },
                    content: new xxLabel({
                        textVariable: "Aucun resultat trouvé pour cette recherche",
                        type: enumTypeLabel.soustitre
                    })
                })
            ]);
        }
    }

    //#endregion "Affichage Icone"

    //#region "Affichage Methode de l'element"
    private GenerateBoxerViewMethode(composant: Function)
    {
        let mythis: xxShowRoomContainer = this;
        let page: xxPageWrapper;
        let boxer: xxBoxer;
        //creation de la page
        page = new xxPageWrapper({ titleLocalise: "", withFooter: true });
        let listefunction = composant.toString().split("function ")[1];
        if (listefunction != null)
        {
            page.TitreVariable = <string>listefunction.split("(")[0];



            //récuperation des methodes
            let methods: string[] = Object.getOwnPropertyNames(composant.prototype);
            let methodElements: { nom: string, description: string }[] = []
            for (let method of methods)
            {
                methodElements.push(mythis.GetMethodDescription(method, Object.getOwnPropertyDescriptor(composant.prototype, method)));
            }



            //création du tableau
            page.zonePrincipale.xxTableau<{ nom: string, description: string }>({
                data: methodElements,
                columns: [
                    {
                        titleVariable: "Nom",
                        renderMethod: function (place: xElementHolder, val: { nom: string, description: string })
                        {
                            place.xspan({ textVariable: val.nom });
                        }
                    },
                    {
                        titleVariable: "Description",
                        renderMethod: function (place: xElementHolder, val: { nom: string, description: string })
                        {
                            place.xspan({ textVariable: val.description });
                        }
                    }
                ]
            })



            //creation du boxer
            boxer = new xxBoxer({ initContent: page });
            boxer.afficher();
        }
        else
        {
            xOutils.afficherMessageAlertifyLog("Cet Element ne contient aucune methode public");
        }
    }

    private GetMethodDescription(nom: string, descriptor: PropertyDescriptor)
    {
        let Methode = {
            nom: nom,
            description: ""
        };

        if (descriptor.value != undefined)
        {
            Methode.description = descriptor.value.toString().split("{")[0];
        }
        else if (descriptor.get != undefined)
        {
            Methode.description = descriptor.get.toString().split("{")[1].split("}")[0];
        }
        else
        {
            Methode.description = "?"
        }
        return Methode;
    }

    private htmlEntities(str:string)
    {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    //#endregion "Affichage Methode de l'element"

    //#region "Methode pour ajouté une erreur a la liste"
    private AddErreur(ElementName: string, msg: string)
    {
        let mythis: xxShowRoomContainer = this;
        mythis.ListeErreur.append(new xxLabel({
            textVariable: `${ElementName} - ${msg}`,
            habillage: enumHabillageLabel.warning,
        }));
    }
    private AddErreurOption(ElementName: string, msg: string)
    {
        let mythis: xxShowRoomContainer = this;
        mythis.AddErreur(`Option "${ElementName}"`,msg);
    }
    //#endregion "Methode pour ajouté une erreur a la liste"
}