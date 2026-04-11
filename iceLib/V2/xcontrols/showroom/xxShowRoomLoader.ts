class xxShowRoomLoader
{
    public static XElement_Load() : void
    {
        // xBr - deprecated_DontUse
        xxShowRoomContainer.AjouterElementShowroom({
            typeElement: xBr,
            NomElement: "xBr",
            Description: "Fait un retour à la ligne",
            Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
            renderElement: function ()
            {
                let textSample: xxLabel = new xxLabel({ textVariable: "Aucune option n'est disponible pour le xBr" });
                return textSample;
            },
            RenderTooltip: async () =>
            {
                return new xBr();
            },
            listOption: []
        });

        // xCanvas
        xxShowRoomContainer.AjouterElementShowroom<OptionsCanvas>({
            typeElement: xCanvas,
            NomElement: "xCanvas",
            Description: "Insère un élément HTML Canvas",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            renderElement: function (option)
            {
                return new xCanvas(option);
            },
            RenderTooltip: async () =>
            {
                return new xCanvas({ class: xxShowRoomSample.classSampleDiv_Red });
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                    ValeurDefaut: xxShowRoomSample.classSampleDiv_Red
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
            ]
        });

        // xCouleur
        xxShowRoomContainer.AjouterElementShowroom<OptionsCouleur>({
            typeElement: xCouleur,
            NomElement: "xCouleur",
            Description: "Insère une zone de couleur",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            renderElement: (option) =>
            {
                return new xCouleur(option);
            },
            RenderTooltip: async () =>
            {
                return new xCouleur({
                    codeCouleur: "#FF0000",
                });
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.CouleurHexa,
                    NameOption: "codeCouleur",
                    Facultatif: true,
                },
            ]
        });

        // xDatePicker
        xxShowRoomContainer.AjouterElementShowroom<OptionDatePicker>({
            typeElement: xDatePicker,
            NomElement: "xDatePicker",
            Description: "Permet de sélectionner une date au format calendrier",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xDatePicker({

                });
            },
            renderElement: (option) =>
            {
                return new xDatePicker(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "choixAnnee",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "affichageNumSemaine",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "affichageBtnAujourdhui",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "affichageBtnAucuneDate",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "ToogleSelectedDefaut",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Date,
                    NameOption: "value",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "valueChange",
                    Facultatif: true,
                    Function: (val: Date) =>
                    {
                    }
                }
            ]
        });

        //xxDialog
        xxShowRoomContainer.AjouterElementShowroom<xxDialogOption>({
            typeElement: xxDialog,
            NomElement: "xxDialog",
            Description: "Change",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () => {
                return new xxImageTabByte({ tabByte: xxShowRoomImageTooltipPreview.xxDialog, typeAffichage: enumTypeImage.domImage })
            },
            renderElement: (option) => {
                let dialog = new xxDialog(option);
                return new xxBouton({
                    titleVariable: "Change moi",
                    click: (cb) => {
                        /*Complète-moi*/
                        dialog.afficher();
                        cb();
                    },
                    textVariable: "Afficher notification",
                });
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "texteLocalise",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "titleLocalise",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "dureeAffichageSec",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "dialogType",
                    Facultatif: true,
                    EnumType: "enumDialogTypeBouton",
                    ValeurDefaut: enumDialogTypeBouton.pasDeBouton
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "type",
                    Facultatif: false,
                    EnumType: "enumTypeAlerte",
                    ValeurDefaut: enumTypeAlerte.info
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "dialogResponse",
                    Facultatif: true,
                    Function: (retour: boolean) => {
                        //A completer
                    }
                }


            ]
        });

        //xDiv
        xxShowRoomContainer.AjouterElementShowroom<OptionsDiv>({
            typeElement: xDiv,
            NomElement: "xDiv",
            Description: "Ajoute un div à la DOM",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return xxShowRoomSample.divSample();
            },
            renderElement: (option) =>
            {
                return new xDiv(option);
            },
            listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "title",
                    Facultatif: true
                },
            ])
        });

        //xHref
        xxShowRoomContainer.AjouterElementShowroom<OptionsHref>({
            typeElement: xHref,
            NomElement: "xHref",
            Description: "Crée un lien hypertexte",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xHref({
                    url: "#",
                    typeOuverture: enumTypeOuvertureHref.MemeEmplacement,
                    textLocalise: "Je redirige !",

                });
            },
            renderElement: (option) =>
            {
                return new xHref(option);
            },
            listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeOuvertureHref",
                    NameOption: "typeOuverture",
                    Facultatif: true,
                    ValeurDefaut: enumTypeOuvertureHref.EmplacementParent
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "url",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "optionsAffichage",
                    listOption: xxShowRoomOptionRecurrente.get_OptionsAffichage([
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            EnumType: "enumCouleur",
                            NameOption: "couleur",
                            Facultatif: true,
                            ValeurDefaut: enumCouleur.emed_bleu,
                        },
                    ])
                }
            ])
        });

        //xIframe
        xxShowRoomContainer.AjouterElementShowroom<OptionsIFrame>({
            typeElement: xIFrame,
            NomElement: "xIFrame",
            Description: "Crée une iframe (insertion d'une page html complète)",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xIFrame({
                    src: xxShowRoomSample.urlIFrame(),
                    name: "test",


                })
            },
            renderElement: (option: OptionsIFrame) =>
            {
                return new xIFrame(option);
            },
            listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "src",
                    Facultatif: true,
                    ValeurDefaut: xxShowRoomSample.urlIFrame(),
                }
            ])
        });

        // xImg
        xxShowRoomContainer.AjouterElementShowroom<OptionsImg>({
            typeElement: xImg,
            NomElement: "xImg",
            Description: "Insère une image",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xImg({
                    src: "https://www.nexus-france.fr/files/nexus-france/Downloads/logo_nexus_france.png",
                    class: "sampleImg",
                });
            },
            renderElement: (option: OptionsImg) =>
            {
                return new xImg(option);
            },
            listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "src",
                    Facultatif: true,
                    ValeurDefaut: "https://www.nexus-france.fr/files/nexus-france/Downloads/logo_nexus_france.png"
                },
            ])
        });

        // xInputText
        xxShowRoomContainer.AjouterElementShowroom<OptionsInput>({
            typeElement: xInputText,
            Description: "Crée un champ de saisie",
            NomElement: "xInputText",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xInputText({});
            },
            renderElement: (option) =>
            {
                return new xInputText(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (eventClick: MouseEvent) =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "click",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "value",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "longueurMaxi",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "multiline",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumStyleInput",
                    NameOption: "style",
                    ValeurDefaut: enumStyleInput.Filled,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumBackgroundInput",
                    NameOption: "background",
                    Facultatif: true,
                    ValeurDefaut: enumBackgroundInput.Transparent
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "numeric",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "plus",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "minus",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "decimalSeparator",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "nbDigits",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "nbDecimal",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "max",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "min",
                            Facultatif: true,
                        },
                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (val: number | string) =>
                    {
                        //complète-moi
                    },
                    NameOption: "KeyUpEnterCallback",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: () =>
                    {
                        //complète-moi
                    },
                    NameOption: "KeyUpCancelCallback",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (val: number | string) =>
                    {
                        //complète-moi
                    },
                    NameOption: "ValueChange",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "autoChange",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "password",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "placeHolderVariable",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "placeHolderlocalise",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (val: number | string) =>
                    {
                        //complète-moi
                    },
                    NameOption: "onLostfocusCallback",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface, //GANON binding
                    NameOption: "binding",
                    Facultatif: true,
                    listOption: [

                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "disabled",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "champLarge",
                    Facultatif: true,
                    ValeurDefaut: false
                },
            ]
        });

        // xInputTextAvecIcone
        xxShowRoomContainer.AjouterElementShowroom<OptionsInputTextAvecIcone>({
            typeElement: xInputTextAvecIcone,
            Description: "Crée un champ de saisie avec une icone",
            NomElement: "xInputTextAvecIcone",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xInputTextAvecIcone({ icone:enumIconeSvg.recherche });
            },
            renderElement: (option) =>
            {
                return new xInputTextAvecIcone(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (eventClick: MouseEvent) =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "click",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "value",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "longueurMaxi",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "multiline",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumStyleInput",
                    NameOption: "style",
                    ValeurDefaut: enumStyleInput.Filled,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumBackgroundInput",
                    NameOption: "background",
                    Facultatif: true,
                    ValeurDefaut: enumBackgroundInput.Transparent
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "numeric",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "plus",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "minus",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "decimalSeparator",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "nbDigits",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "nbDecimal",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "max",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "min",
                            Facultatif: true,
                        },
                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (val: number | string) =>
                    {
                        //complète-moi
                    },
                    NameOption: "KeyUpEnterCallback",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: () =>
                    {
                        //complète-moi
                    },
                    NameOption: "KeyUpCancelCallback",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (val: number | string) =>
                    {
                        //complète-moi
                    },
                    NameOption: "ValueChange",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "autoChange",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "password",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "placeHolderVariable",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "placeHolderlocalise",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (val: number | string) =>
                    {
                        //complète-moi
                    },
                    NameOption: "onLostfocusCallback",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface, //GANON binding
                    NameOption: "binding",
                    Facultatif: true,
                    listOption: [

                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "disabled",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumIconeSvg",
                    NameOption: "icone",
                    ValeurDefaut: enumIconeSvg.recherche
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumCouleur",
                    NameOption: "couleurIcone",
                    Facultatif: true,
                    ValeurDefaut: enumCouleur.emed_grisfonce
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Custom,
                    NameOption: "positionIcone",
                    GenerateOption: (returnData) =>
                    {
                        return new xxRadioButton<string>({
                            initElements: [
                                {
                                    valeur: "Debut",
                                    libelleVariable: "Debut",
                                },
                                {
                                    valeur: "Fin",
                                    libelleVariable: "Fin",
                                    preselectionne: true,
                                }
                            ],
                            valueChange: (val) =>
                            {
                                if (val == "Debut")
                                    returnData(val, "\""+val+"\"");
                                else
                                    returnData(null, null);
                            }
                        });
                    },
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "champLarge",
                    Facultatif: true,
                    ValeurDefaut: false
                },

            ]
        });

        // xInputCheckBox - deprecated_DontUse --GANON binding
        xxShowRoomContainer.AjouterElementShowroom<OptionsInputCheckBox>({
            typeElement: xInputCheckBox,
            Description: "Permet d'ajouter du texte dans une checkbox",
            NomElement: "xInputCheckBox",
            Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
            RenderTooltip: async () =>
            {
                return new xInputCheckBox({});
            },
            renderElement: (option) =>
            {
                return new xInputCheckBox(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "titleLocalise",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "titleVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (eventClick: MouseEvent) =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "click",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "espaceMinimaliste",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "AffichageBoutonWapper2",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            EnumType: "enumCouleurBouton",
                            NameOption: "color",
                            Facultatif: false,
                            ValeurDefaut: enumCouleurBouton.Utilisateur
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "margin",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            EnumType: "enumPosition",
                            NameOption: "positionIcone",
                            ValeurDefaut: enumPosition.Left
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            EnumType: "enumPositionnementResponsiveBouton",
                            NameOption: "positionnementResponsiveBouton",
                            Facultatif: true,
                            ValeurDefaut: enumPositionnementResponsiveBouton.Defaut
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "rounded",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            EnumType: "enumTailleBouton",
                            NameOption: "tailleBouton",
                            ValeurDefaut: enumTailleBouton.M
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            EnumType: "enumStyleBouton",
                            NameOption: "styleBouton",
                            ValeurDefaut: enumStyleBouton.Simple
                        }
                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "canbePartiel",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (val: boolean) =>
                    {
                        /*complet moi*/
                        return false;
                    },
                    NameOption: "CanValueChange",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "IconeBoutonWapper2",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "imageDisable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "imageEnable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "inactif",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: () =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "renderIntermediaire",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "tabIndex",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeCheckbox",
                    NameOption: "typeCheckbox",
                    Facultatif: true,
                    ValeurDefaut: enumTypeCheckbox.standard
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "value",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ValueChange",
                    Function: (val: boolean) =>
                    {
                        alert(val);
                        /*Complète-moi*/
                    },
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "WithChangeValueWhenNull",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "withLabelContainer",
                    Facultatif: true,
                    ValeurDefaut: false
                }
            ]
        });

        // xInputDate  --GANON binding
        xxShowRoomContainer.AjouterElementShowroom<OptionsInputDate>({ 
            typeElement: xInputDate,
            NomElement: "xInputDate",
            Description: "Permet de renseigner une date",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xInputDate({});
            },
            renderElement: (option) =>
            {
                return new xInputDate(option);
            },
            listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Date,
                    NameOption: "value",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (date: Date) =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "appuyeToucheEntree",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AvecBoutonToday",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AvecChoixAnnee",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AvecCodeJour",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AvecNumSemaine",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "CanSelectDateNull",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "disabled",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "nonResponsive",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (Val: Date) =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "onClose",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "placeHolderlocalise",
                    Facultatif: true,
                },
                
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "todayDefaultValue",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeAffichePicker",
                    NameOption: "typeAffichage",
                    Facultatif: true,
                    ValeurDefaut: enumTypeAffichePicker.AvecPicker
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (Val: Date) =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "ValueChange",
                    Facultatif: false
                },
            ])
        });

        // xInputDateAndTime
        xxShowRoomContainer.AjouterElementShowroom<OptionsInputDateAndTime>({ //GANON binding
            typeElement: xInputDateAndTime,
            NomElement: "xInputDateAndTime",
            Description: "Permet de renseigner une date et une heure",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xInputDateAndTime({});
            },
            renderElement: (option) =>
            {
                return new xInputDateAndTime(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (eventClick: MouseEvent) =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "click",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Date,
                    NameOption: "value",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AvecBoutonToday",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AvecChoixAnnee",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AvecCodeJour",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AvecNumSemaine",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AvesLabels",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "btnValiderChange",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "disabled",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "nonResponsive",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "placeHolderlocalise",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeAffichePicker",
                    NameOption: "typeAffichage",
                    Facultatif: true,
                    ValeurDefaut: enumTypeAffichePicker.AvecPicker
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (Val: Date) =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "ValueChange",
                    Facultatif: false
                },
            ]
        });

        // xInputTime
        xxShowRoomContainer.AjouterElementShowroom<OptionsInputTime>({ //GANON binding
            typeElement: xInputTime,
            NomElement: "xInputTime",
            Description: "Permet de renseigner une heure",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xInputTime({});
            },
            renderElement: (option) =>
            {
                return new xInputTime(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (eventClick: MouseEvent) =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "click",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Date,
                    NameOption: "value",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "btnValiderChange",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "disabled",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "nonResponsive",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "placeHolderlocalise",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeAffichePicker",
                    NameOption: "typeAffichage",
                    Facultatif: true,
                    ValeurDefaut: enumTypeAffichePicker.AvecPicker
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (Val: Date) =>
                    {
                        /*Complet moi*/
                    },
                    NameOption: "ValueChange",
                    Facultatif: false
                },
            ]
        });

        // xInputFile
        xxShowRoomContainer.AjouterElementShowroom<OptionsInputFile>({
            typeElement: xInputFile,
            Description: "Permet d'importer un fichier",
            NomElement: "xInputFile",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xInputFile({ ValueChange: (val, binary) => { }, });
            },
            renderElement: (option) =>
            {
                return new xInputFile(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "titleLocalise",
                    Facultatif: true,

                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "titleVariable",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ValueChange",
                    Facultatif: false,
                    Function: (val: File, binary: string) =>
                    {
                        /*Complet moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "accept",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "capture",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "iconeAppareilPhoto",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "textChangeWhenUpload",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "widthMaxForImage",
                    Facultatif: true,
                },
            ]
        });

        

        // xLi - deprecated_DontUse
        xxShowRoomContainer.AjouterElementShowroom<OptionsLi>({
            typeElement: xLi,
            Description: "Permet de faire une liste",
            NomElement: "xLi",
            Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
            RenderTooltip: async () =>
            {
                return new xLi({});
            },
            renderElement: (option) =>
            {
                return new xLi(option);
            },
            listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "text",
                    Facultatif: true,
                    ValeurDefaut: "Texte par défaut"
                }
            ])
        });

        // xSeparateur
        xxShowRoomContainer.AjouterElementShowroom<optionXSeparateur>({
            typeElement: xSeparateur,
            NomElement: "xSeparateur",
            Description: "Crée une ligne de séparation",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            renderElement: function (option)
            {
                let gridSeparateur: xxGrid = new xxGrid({
                }).append([
                    new xxGridItem({
                        rowStart: 2,
                        colStart: 2,
                        nbCols: 1,
                        nbRows: 1,
                        content: new xSeparateur(option)
                    }),
                    new xxGridItem({
                        rowStart: option.orientation == enumTypeOrientation.horizontal ? 1 : 2,
                        colStart: option.orientation == enumTypeOrientation.horizontal ? 2 : 1,
                        nbCols: 1,
                        nbRows: 1,
                        content: xxShowRoomSample.divSample()
                    }),
                    new xxGridItem({
                        rowStart: option.orientation == enumTypeOrientation.horizontal ? 3 : 2,
                        colStart: option.orientation == enumTypeOrientation.horizontal ? 2 : 3,
                        nbCols: 1,
                        nbRows: 1,
                        content: xxShowRoomSample.divSample(2)
                    })
                ])

                return gridSeparateur;
            },
            RenderTooltip: async () =>
            {
                return new xSeparateur({
                    orientation: enumTypeOrientation.vertical,
                    tailleCustom: 100,
                    margin: { GaucheEtDroite: 60 }
                });
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                    ValeurDefaut: "petitTest",
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "tailleCustom",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "orientation",
                    EnumType: "enumTypeOrientation",
                    ValeurDefaut: enumTypeOrientation.horizontal,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.CotesCSS,
                    NameOption: "margin",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "epaisseur",
                    EnumType: "enumEpaisseurSeparation",
                    ValeurDefaut: enumEpaisseurSeparation.fin,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "optionsAffichage",
                    Facultatif: true,
                    listOption: xxShowRoomOptionRecurrente.get_OptionsAffichage(),
                }
            ]
        });

        // xSpan - deprecated_DontUse
        xxShowRoomContainer.AjouterElementShowroom<OptionsSpan>({
            typeElement: xSpan,
            Description: "Permet de renseigner du texte",
            NomElement: "xSpan",
            Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
            RenderTooltip: async () =>
            {
                return new xSpan({ textVariable: "Texte par défaut" });
            },
            renderElement: (option) =>
            {
                return new xSpan(option);
            },
            listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true,
                    ValeurDefaut: "Texte par défaut"
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "title",
                    Facultatif: true
                },
            ])
        });

        // xTable - deprecated_DontUse
        xxShowRoomContainer.AjouterElementShowroom<OptionsHtml>({
            typeElement: xTable,
            NomElement: "xTable",
            Description: "Permet de créer un tableau",
            Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
            RenderTooltip: async () =>
            {
                return new xTable({});
            },
            renderElement: (option) =>
            {
                return new xTable(option);
            },
            listOption: xxShowRoomOptionRecurrente.get_OptionsHtml()
        });

        //xTimePicker
        xxShowRoomContainer.AjouterElementShowroom<optionTimePicker>({
            typeElement: xTimePicker,
            NomElement: "xTimePicker",
            Description: "Permet de choisir des heures et minutes",
            Groupe: ExxShowRoomContaineGoupeElement.xElement,
            RenderTooltip: async () =>
            {
                return new xTimePicker({});
            },
            renderElement: (option) =>
            {
                return new xTimePicker(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (val: xTime) =>
                    {
                        /* Complete moi */
                    },
                    NameOption: "ValueChange",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Time,
                    NameOption: "value",
                    Facultatif: true,
                }
            ]
        });

        //xUl - deprecated_DontUse
        xxShowRoomContainer.AjouterElementShowroom<OptionsHtml>({
            typeElement: xUl,
            NomElement: "xUl",
            Description: "Permet d'ajouter une liste non-ordonnée",
            Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
            RenderTooltip: async () =>
            {
                return new xUl({ class: "sampleUl" });
            },
            renderElement: (option) =>
            {
                return new xUl(option);
            },
            listOption: xxShowRoomOptionRecurrente.get_OptionsHtml()
        });
    }

    public static XXElement_Load(): void
    {

        //xxArbre
        xxShowRoomContainer.AjouterElementShowroom<IOptionsxxArbre<any>>({
            typeElement: xxArbre,
            NomElement: "xxArbre",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            Description: "Permet d'ajoueter un arbre",
            RenderTooltip: async () => {
                let mesDesserts: Dessert[] = []; class Dessert {
                    sucre: number;
                    farine: number;
                    typeFarine: string;
                    modeCuisson: string;
                    oeufs: number;
                }
                let obs: ObservableCollection<Dessert> = new ObservableCollection(mesDesserts);
                return new xxArbre({
                    donnees: obs,
                    defaultvalue: null,
                    valueChange: v => {

                    },
                    renderDetail: (v, place, select) => {
                        let container: xxContainerEvent = new xxContainerEvent({
                            initContent: new xxLabelContainer({ textVariable: v.modeCuisson, initContent: new xxLabel({ textVariable: v.typeFarine }) }),
                            onClick: (cb) => {
                                select(v);
                                cb();
                            }
                        });
                        place.append(container);
                    },
                    renderTitre: (v, place) => {
                        place.append(new xxLabelContainer({ textVariable: v.modeCuisson, initContent: new xxLabel({ textVariable: v.typeFarine }) }));

                    },
                    renderEndList: (place, liste) => {

                    },
                    renderSelected: (v, place, os) => {
                        place.xxBouton({
                            titleLocalise: "changer d'exigence",
                            textVariable: v != null ? v.modeCuisson + " - " + v.typeFarine : 'aucune',
                            click: cb => {
                                os(v);
                            }
                        })
                    },
                    getEnfants: v => {
                        return mesDesserts;
                    },
                    getPere: v => {
                        return null;
                    }
                });
            },
            renderElement: (options) => {
                return new xxArbre(options);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (t: any) => { },
                    NameOption: "getEnfants",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (t: any) => { },
                    NameOption: "getPere",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (t: any, place: iXElementHolder, selecteur: (t: any) => {}) => { },
                    NameOption: "renderDetail",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (place: iXElementHolder, liste: xxListeDeroulante<any>) => { },
                    NameOption: "renderEndList",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (t: any, place: iXElementHolder, openSelect: (itemSelectionne: any) => {}) => { },
                    NameOption: "renderSelected",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (t: any, place: iXElementHolder, selecteur: (t: any) => {}) => { },
                    NameOption: "renderTitre",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Function: (t: any) => { },
                    NameOption: "valueChange",
                    Facultatif: false
                }
            ]
        });

        // xxAssistantSaisieUser
        xxShowRoomContainer.AjouterElementShowroom<OptionsAssistantUser>({
            typeElement: xxAssistantSaisieUtilisateur,
            NomElement: "xxAssistantSaisieUtilisateur",
            Description: "",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxAssistantSaisieUtilisateur({ page: null, });
            },
            renderElement: (option) =>
            {
                return new xxAssistantSaisieUtilisateur(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "affichageSimpleSansRecap",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Pagewapper,
                    NameOption: "page",
                },
            ]
        });

        // xxAutoComplete - GANON binding
        xxShowRoomContainer.AjouterElementShowroom<OptionsAutoComplete<any>>({
            typeElement: xxAutoComplete,
            NomElement: "xxAutoComplete",
            Description: "Permet de creer une entre texte avec une liste d'element contenent la saisie",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxImageTabByte({ tabByte: xxShowRoomImageTooltipPreview.xxAutoComplete, typeAffichage: enumTypeImage.domImage });
            },
            renderElement: (option) =>
            {
                return new xxAutoComplete(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Donnees,
                    NameOption: "listeValeurs",
                    DataType: ExxShowRoomContaineDataType.string,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "getLibelle",
                    Function: (elem: string, datas?: string[]) => { return elem; }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "getClass",
                    Function: (elem: string, datas?: string[]) => { return elem; },
                    Facultatif:true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "getIdTest",
                    Function: (elem: string,) => { return elem; },
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "valueChange",
                    Function: (elem: string,) => { xOutils.afficherMessageAlertifySuccess(elem); },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "placeholder",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "libelleNullChoice",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "value",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "getKey",
                    Function: (elem: string,) => { return elem; },
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "typeValue",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "asyncLoading",
                    Function: () => { return xxShowRoomSample.listeStringsAsync(); },
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "goasyncResearch",
                    Function: (search: string) => { return search.length > 3; },
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "asyncResearch",
                    Function: (search: string) =>
                    {
                        return new Promise((resole) =>
                        {
                            resole(xxShowRoomSample.listeStrings().filter((item) => { return item.search(search) >= 0; }))
                        });
                    },
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "taille",
                    EnumType: "enumAutoCompleteTaille",
                    ValeurDefaut: null,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderItemInListe",
                    Function: (p: iXElementHolder, item: string, selecteur: (a: string) => void) =>
                    {
                        p.append(new xxBouton({
                            titleVariable: item+ " - overrideRender",
                            click: (cb) =>
                            {
                                selecteur(item);
                                /*Complète-moi*/
                                cb();
                            },
                            textVariable: item,
                        }));
                    },
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "regroupementUniqueBy",
                    Facultatif: true,
                    description: "ReGroupement sous une seule bannier (modification de l'ordre des données)",
                    listOption: [{
                        TypeOption: ExxShowRoomContainerTypeOption.Function,
                        NameOption: "groupHeaderCustom",
                        Facultatif: true,
                        Function: (place: iXElementHolder, listGroup: xxShowroomCustomSample[]) =>
                        {
                            place.append(new xxLabel({
                                textVariable: listGroup[0].Group + " - " + listGroup.length
                            }));
                        }
                    },
                    {
                        TypeOption: ExxShowRoomContainerTypeOption.Function,
                        NameOption: "GroupBy",
                        Facultatif: true,
                        Function: (a: xxShowroomCustomSample) =>
                        {
                            return a.Group;
                        }
                    }
                    ]
                }
            ]
        });

        // xxBloqueEcran
        xxShowRoomContainer.AjouterElementShowroom<OptionsBloqueEcran>({
            typeElement: xxBloqueEcran,
            NomElement: "xxBloqueEcran",
            Description: "Permet de bloquer l'écran", 
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxBloqueEcran({ textVariable: "sample" });
            },
            renderElement: (option) =>
            {

                return new xxBouton({
                    textLocalise: "Bloquer l'écran 3 secondes",
                    titleLocalise: "Bloquer l'écran 3 secondes",
                    click: (cb: () => void) =>
                    {
                        let bloqueEcran: xxBloqueEcran = new xxBloqueEcran(option);

                        setTimeout(() =>
                        {
                            bloqueEcran.fermer();
                        }, 3000);

                        cb();
                    },
                });

            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "fondVisible",
                    Facultatif: true,
                    ValeurDefaut: false
                },
            ]
        });

        // xxBouton
        xxShowRoomContainer.AjouterElementShowroom<optionButton>({
            typeElement: xxBouton,
            NomElement: "xxBouton",
            Description: "Insère un bouton",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            renderElement: function (option)
            {
                return new xxBouton(option);
            },
            RenderTooltip: async () =>
            {
                return new xxBouton({
                    titleLocalise: "Valider",
                    click: (cb) =>{cb();},
                    textLocalise: "Valider",
                    icone: new IconeCs3i(enumIconeCs3i.action_valider),
                });
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "typeBouton",
                    EnumType: "enumTypeBouton",
                    Facultatif: true,
                    ValeurDefaut: enumTypeBouton.Standard,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "titleLocalise",
                    NameOptionVariable: "titleVariable",
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true,
                    ValeurDefaut: "Change moi"
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "disabled",
                    ValeurDefaut: false,
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "click",
                    Function: (cb: () => void) =>
                    {
                        xOutils.afficherMessageAlertifyLog("Click");
                        /*Complète-moi*/
                        cb();
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "dblclick",
                    Facultatif: true,
                    Function: (cb: () => void) =>
                    {
                        xOutils.afficherMessageAlertifyLog("double Click");
                        /*Complet moi*/
                        cb();
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "touchLong",
                    Facultatif: true,
                    Function: (cb: () => void) =>
                    {
                        xOutils.afficherMessageAlertifyLog("Long touch");
                        /*Complet moi*/
                        cb();
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "icone",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "optionsAffichage",
                    Facultatif: true,
                    listOption: xxShowRoomOptionRecurrente.get_OptionsAffichageBouton()
                }
            ],
            ListePreReglageOption: [
                {
                    NomReglage: "Valider horizontal M",
                    Prereglage:
                    {
                        click: (cb) =>
                        {
                            /*Complète-moi*/
                            cb();
                        },
                        optionsAffichage: {
                            tailleBouton: enumTailleBouton.M,
                        },
                        textLocalise: "Valider",
                        titleLocalise: "Valider",
                        icone: new IconeCs3i(enumIconeCs3i.action_valider),
                    }
                },
                {
                    NomReglage: "Supprimer horizontal M",
                    Prereglage:

                    {
                        titleLocalise: "Change moi",
                        click: (cb) =>
                        {
                            /*Complète-moi*/
                            cb();
                        },
                        textLocalise: "Supprimer",
                        icone: new IconeCs3i(enumIconeCs3i.action_supprimer),
                    }
                },
                {
                    NomReglage: "Annuler horizontal M",
                    Prereglage: {
                        titleLocalise: "Change moi",
                        click: (cb) =>
                        {
                            /*Complète-moi*/
                            cb();
                        },
                        textLocalise: "Annuler",
                        icone: new IconeCs3i(enumIconeCs3i.action_annuler),
                    }
                },
                {
                    NomReglage: "Supprimer vertical M",
                    Prereglage: {
                        titleLocalise: "Change moi",
                        click: (cb) =>
                        {
                            /*Complète-moi*/
                            cb();
                        },
                        textLocalise: "Supprimer",
                        icone: new IconeCs3i(enumIconeCs3i.action_supprimer),
                        optionsAffichage: {
                            positionIconeBouton: enumPosition.Top,
                        },
                    },
                },
                {
                    NomReglage: "Supprimer icone only",
                    Prereglage: {
                        titleLocalise: "Change moi",
                        click: (cb) =>
                        {
                            /*Complète-moi*/
                            cb();
                        },
                        icone: new IconeCs3i(enumIconeCs3i.action_supprimer),
                        optionsAffichage: {
                            positionIconeBouton: enumPosition.Top,
                            tailleBouton: enumTailleBouton.Fit,
                        },
                    }
                },
                {
                    NomReglage: "Annuler icone only",
                    Prereglage: {
                        titleLocalise: "Change moi",
                        click: (cb) =>
                        {
                            /*Complète-moi*/
                            cb();
                        },
                        icone: new IconeCs3i(enumIconeCs3i.action_annuler),
                        optionsAffichage: {
                            positionIconeBouton: enumPosition.Top,
                            tailleBouton: enumTailleBouton.Fit,
                        },
                    }
                },
            ]
        });               

        // xxBoxer 
        xxShowRoomContainer.AjouterElementShowroom<OptionsBoxer>({ 
            typeElement: xxBoxer,
            Description: "Ouvre un boxer",
            NomElement: "xxBoxer",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxLabel({ textVariable: "Rendu du composant impossible", type: enumTypeLabel.information })
            },
            renderElement: (option) =>
            {
                let boxerTrue: xxBoxer = new xxBoxer(option);
                let boutonBoxer: xxBouton = new xxBouton({

                    click: (cb: () => void) =>
                    {
                        boxerTrue.afficher();
                        cb();
                    },
                    titleVariable: "Ouvrir le boxer",
                    textVariable: "Ouvrir le boxer"
                })
                return boutonBoxer;
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "titleLocalise",
                    NameOptionVariable:"titleVariable",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "afterClose",
                    Facultatif: true,
                    Function: (myBoxer: xxBoxer) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "beforeClose",
                    Facultatif: true,
                    Function: () =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "beforeShow",
                    Facultatif: true,
                    Function: (myBoxer: xxBoxer) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                    NameOption: "initContent",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "modal",
                    description:"Rend le background exterieur du boxer inclickable, le boxer pourra être fermé uniquement avec le bouton ou avec la méthode fermer() dans le code.",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "ModeAffichage",
                    EnumType: "enumBoxerMode",
                    ValeurDefaut: enumBoxerMode.standard,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "nonPersistent",
                    description: "Supprime le boxer de la dom lorsqu'il a été fermé",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "positionHorizontale",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "positionVerticale",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumPositionOrigine",
                    NameOption: "positionOriginie",
                    ValeurDefaut: enumPositionOrigine.top_left
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "sansBtnClose",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "tailleBoxer",
                    EnumType: "enumBoxerTaille",
                    ValeurDefaut: enumBoxerTaille.m,
                    Facultatif: true
                },
            ]
        });

        // xxCarrousel
        xxShowRoomContainer.AjouterElementShowroom<OptionCarrousel>({
            typeElement: xxCarrousel,
            NomElement: "xxCarrousel",
            Description: "Créer un carrousel d'images",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxCarrousel({
                    indice_depart: 0, photos64: [xxShowRoomSample.imageBase64(), xxShowRoomSample.imageBase64(2)],
                    valueChange: (index: number) => { }
                })
            },
            renderElement: (option) =>
            {
                return new xxCarrousel(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "indice_depart",
                    Facultatif: false,
                    ValeurDefaut: 0
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "valueChange",
                    Facultatif: false,
                    Function: (index: number) =>
                    {
                        /*Complète-moi !*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Donnees,
                    NameOption: "photos64",
                    Facultatif: false,
                    DataType: ExxShowRoomContaineDataType.string,
                    ValeurDefaut: [xxShowRoomSample.imageBase64()],
                    ValeurSample: [xxShowRoomSample.imageBase64(2), xxShowRoomSample.imageBase64(3),xxShowRoomSample.imageBase64()]
                },

            ]
        });

        // xxCheckBox --GANON Binding
        xxShowRoomContainer.AjouterElementShowroom<OptionsInputCheckBox>({
            typeElement: xxCheckBox,
            NomElement: "xxCheckBox",
            Description: "Créer une case à cocher",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxCheckBox({});
            },
            renderElement: (option) =>
            {
                return new xxCheckBox(option);
            },
            listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "titleLocalise",
                    NameOptionVariable: "titleVariable",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "canbePartiel",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "CanValueChange",
                    Facultatif: true,
                    Function: (val: boolean) =>
                    {
                        return val;
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "espaceMinimaliste",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "IconeBoutonWapper2",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "imageDisable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "imageEnable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "inactif",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderIntermediaire",
                    Facultatif: true,
                    Function: () =>
                    {
                        /*Complète-moi*/
                        return xxShowRoomSample.divSample();
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeCheckbox",
                    NameOption: "typeCheckbox",
                    ValeurDefaut: enumTypeCheckbox.standard,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "value",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ValueChange",
                    Function: (val: boolean) =>
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "WithChangeValueWhenNull",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "withLabelContainer",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "AffichageBoutonWapper2",
                    Facultatif: true,
                    listOption: xxShowRoomOptionRecurrente.get_OptionsAffichageBouton(),
                },
            ])
        });

        // xxChoixCouleur - deprecated_DontUse --GANON Binding
        xxShowRoomContainer.AjouterElementShowroom<OptionsChoixCouleur>({ 
            typeElement: xxChoixCouleur,
            NomElement: "xxChoixCouleur",
            Description: "Permet de choisir une couleur",
            Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
            RenderTooltip: async () =>
            {
                return new xxLabel({ textVariable: "xxChoixCouleur ne fonctionne qu'avec un xCouleur pour le rendu", type: enumTypeLabel.information });
            },
            renderElement: (option) =>
            {
                return new xxChoixCouleur(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "value",
                    Facultatif: true,
                    ValeurDefaut: "FF0000"
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ValueChange",
                    Facultatif: true,
                    Function: (couleurHexa: string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "choixCouleurLibre",
                    Facultatif: false,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "nuancierCouleurs",
                    EnumType: "enumNuancierCouleurs",
                    ValeurDefaut: enumNuancierCouleurs.defaut                    
                },
            ],
            
        });

        // xxChoixOuiNon - deprecated_DontUse
        xxShowRoomContainer.AjouterElementShowroom<OptionsChoixOuiNon>({
            typeElement: xxChoixOuiNon,
            NomElement: "xxChoixOuiNon",
            Description: "Raccourci de RadioButton pour choisir oui ou non",
            Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
            RenderTooltip: async () =>
            {
                return new xxChoixOuiNon({ valeurParDefaut: true, valueChange: (val: boolean) => { } });
            },
            renderElement: (option) =>
            {
                return new xxChoixOuiNon(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "valeurParDefaut",
                    Facultatif: false,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "valueChange",
                    Facultatif: false,
                    Function: (val: boolean) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "inactif",
                    Facultatif: true,
                    ValeurDefaut: false
                }
            ]
        });

        // xxContainerEvent
        xxShowRoomContainer.AjouterElementShowroom<OptionsContainerEvent>({
            typeElement: xxContainerEvent,
            NomElement: "xxContainerEvent",
            Description: "Permet de créer un conteneur intéractif (au clic, double-clic, survol... )",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxContainerEvent({
                    class: "sampleContainer",
                    initContent: new xxLabel({ textVariable: "sampleContainer" }),
                });
            },
            renderElement: (option) =>
            {
                return new xxContainerEvent(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "titleLocalise",
                    NameOptionVariable: "titleVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onClick",
                    Facultatif: true,
                    Function: (cb: () => void) =>
                    {
                        xOutils.afficherMessageAlertifyLog("onClick");
                        /*Complète-moi*/
                        cb();
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onMouseEnter",
                    Facultatif: true,
                    Function: () =>
                    {
                        xOutils.afficherMessageAlertifyLog("onMouseEnter");
                        /*Complète-moi*/
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onDblClick",
                    Facultatif: true,
                    Function: (cb: () => void) =>
                    {
                        xOutils.afficherMessageAlertifyLog("onDblClick");
                        /*complète-moi*/
                        cb();
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onMouseLeave",
                    Facultatif: true,
                    Function: () =>
                    {
                        xOutils.afficherMessageAlertifyLog("onMouseLeave");
                        /*Complète-moi*/
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Facultatif: true,
                    NameOption: "onMouseOut",
                    Function: () =>
                    {
                        xOutils.afficherMessageAlertifyLog("onMouseOut");
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Facultatif: true,
                    NameOption: "onMouseOver",
                    Function: () =>
                    {
                        xOutils.afficherMessageAlertifyLog("onMouseOver");
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Facultatif: true,
                    NameOption: "onRightClick",
                    Function: (cb: () => void) =>
                    {

                        xOutils.afficherMessageAlertifyLog("onRightClick");
                        /*Complète-moi*/
                        cb();
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Facultatif: true,
                    NameOption: "onShiftClick",
                    Function: (cb: () => void) =>
                    {
                        /*Complète-moi*/
                        cb();
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Facultatif: true,
                    NameOption: "onTouchLong",
                    Function: (cb: () => void) =>
                    {
                        /*Complète-moi*/
                        cb();
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "stopPropagation",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                    NameOption: "initContent",
                    Facultatif: true
                }
            ]
        });

        // xxDockPanel - deprecated_DontUse
        xxShowRoomContainer.AjouterElementShowroom<OptionsxxDockPanel>({
            typeElement: xxDockPanelDeprecated,
            NomElement: "xxDockPanelDeprecated",
            Description: "Permet d'agencer les xElements",
            Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
            RenderTooltip: async () =>
            {
                return new xxDockPanelDeprecated({ class: xxShowRoomSample.classSampleDiv_Red });
            },
            renderElement: (option) =>
            {
                return new xxDockPanelDeprecated(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                    ValeurDefaut: "sampleDiv",
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "centrerDernier",
                    Facultatif: true,
                    ValeurDefaut: true
                },
            ],
        });

        // xxGrid --GANON Affichage custom
        xxShowRoomContainer.AjouterElementShowroom<OptionsGrid>({
            typeElement: xxGrid,
            Description: "Permet de créer une grille",
            NomElement: "xxGrid",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxGrid({});
            },
            renderElement: (option) =>
            {
                return new xxGrid(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "colonnes_auto",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "lignes_auto",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "fullHeight",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "fullWidth",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "padding",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "gridGap",
                    Facultatif: true
                }
            ]
        });

        // ImageTabByte
        xxShowRoomContainer.AjouterElementShowroom<OptionsImageTabByte>({
            typeElement: xxImageTabByte,
            NomElement: "xxImageTabByte",
            Description: "Permet d'afficher une image en base64",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxImageTabByte({
                    tabByte: xxShowRoomSample.imageBase64(),
                    typeAffichage: enumTypeImage.domImage

                });
            },
            renderElement: (option) =>
            {
                return new xxImageTabByte(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "tabByte",
                    Facultatif: false,
                    ValeurDefaut: xxShowRoomSample.imageBase64()
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeImage",
                    NameOption: "typeAffichage",
                    ValeurDefaut: enumTypeImage.domImage,
                    Facultatif: false
                }
            ]
        });

        // xxIMC
        xxShowRoomContainer.AjouterElementShowroom<OptionsIMC>({
            typeElement: xxIMC,
            NomElement: "xxIMC",
            Description: "Permet d'avoir la signification d'un IMC",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxIMC({ value: 20, });
            },
            renderElement: (option) =>
            {
                return new xxIMC(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "value",
                    Facultatif: false,
                    ValeurDefaut: 20
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                }
            ]
        });

        // xxIndicateur
        xxShowRoomContainer.AjouterElementShowroom<optionXxIndicateur>({
            typeElement: xxIndicateur,
            NomElement: "xxIndicateur",
            Description: "Indique une notification sur un xElement",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxIndicateur({
                    indicateur: new IconeCs3i(enumIconeCs3i.action_envoi_message),

                    Notif: [
                        {
                            NotifColor: EnumXxIndicateurNotifColor.Bleu,
                            nbNotif: 3
                        }
                    ]
                });
            },
            renderElement: (option) =>
            {
                return new xxIndicateur(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "titleLocalise",
                    NameOptionVariable: "titleVariable"
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "NotifAlwaysShow",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "NotifHideAlwaysTakePlace",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "tooltipIsContentLoadOnShow",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "click",
                    Facultatif: true,
                    Function: (cb: () => void) =>
                    {
                        cb();
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "tooltipOnHide",
                    Facultatif: true,
                    Function: (thisTooltip: xxToolTip) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "tooltipOnShow",
                    Facultatif: true,
                    Function: (thisTooltip: xxToolTip) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "TooltipStopPropagation",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "tooltipTitreHeaderLocalise",
                    NameOptionVariable: "tooltipTitreHeaderVariable",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                    NameOption: "indicateur",
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                    NameOption: "toolTipContent",
                    Facultatif: true,
                },
                { 
                    TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface,
                    NameOption: "Notif",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            NameOption: "NotifColor",
                            EnumType: "EnumXxIndicateurNotifColor",
                            ValeurDefaut: EnumXxIndicateurNotifColor.Bleu,
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "nbNotif",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "Caractere",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                            NameOptionLocalisable: "NotifTitleLocalise",
                            NameOptionVariable: "NotifTitleVariable",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                            NameOption: "NotifTitleToolTipContent",
                            Facultatif:true
                        }
                    ]
                },
            ]
        });

        // xxInputIntellisense --GANON binding
        xxShowRoomContainer.AjouterElementShowroom<OptionsInputIntellisense>({
            typeElement: xxInputIntellisense,
            NomElement: "xxInputIntellisense",
            Description: "Pré-remplit les champs de saisie",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxInputIntellisense({
                    listeAutoComplete: ["test", "fefe", "maxime"], nbLigneAfficher: 2
                });
            },
            renderElement: (option) =>
            {
                return new xxInputIntellisense(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "nbLigneAfficher",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "autoChange",
                    Facultatif: false,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumBackgroundInput",
                    NameOption: "background",
                    ValeurDefaut: enumBackgroundInput.Transparent,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "click",
                    Facultatif: true,
                    Function: (e?: MouseEvent) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "disabled",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "KeyUpCancelCallback",
                    Facultatif: true,
                    Function: () =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "KeyUpEnterCallback",
                    Facultatif: true,
                    Function: (val: number | string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    Facultatif: true,
                    NameOption: "longueurMaxi"
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "multiline",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "name",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onLostfocusCallback",
                    Facultatif: true,
                    Function: (val: number | string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "password",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "placeHolderLocalise",
                    NameOptionVariable: "placeHolderVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "rounded",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "style",
                    EnumType: "enumStyleInput",
                    ValeurDefaut: enumStyleInput.Simple,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "tabindex",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "value",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ValueChange",
                    Function: (val: string | number) =>
                    {

                    },
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Donnees,
                    NameOption: "listeAutoComplete",
                    DataType: ExxShowRoomContaineDataType.string,
                    ValeurDefaut: [xxShowRoomSample.listeStrings()[0]]
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "numeric",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "plus",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "minus",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "decimalSeparator",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "nbDigits",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "nbDecimal",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "max",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "min",
                            Facultatif: true,
                        },
                    ],
                },
            ]
        });

        // xxInputNumerique --GANON option binding
        xxShowRoomContainer.AjouterElementShowroom<OptionsInputNumerir>({
            typeElement: xxInputNumerique,
            Description: "Champ de saisie numérique only",
            NomElement: "xxInputNumerique",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            renderElement: (option) =>
            {
                return new xxInputNumerique(option);
            },
            RenderTooltip: async () =>
            {
                return new xxInputNumerique({});
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AfficheplusMinusButtonFleche",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "autoChange",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumBackgroundInput",
                    NameOption: "background",
                    ValeurDefaut: enumBackgroundInput.Transparent
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "decimalSeparator",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "KeyUpCancelCallback",
                    Facultatif: true,
                    Function: () =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "KeyUpEnterCallback",
                    Facultatif: true,
                    Function: (val: number | string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "max",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "min",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "minus",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "nbDecimal",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "nbDigits",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "plus",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "plusMinusButton",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "rounded",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "value",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ValueChange",
                    Function: (val: string | number) =>
                    {

                    },
                    Facultatif: false
                },
            ]
        });

        // xxInputSpeech --GANON option binding
        xxShowRoomContainer.AjouterElementShowroom<OptionsInput>({
            typeElement: xxInputSpeech,
            NomElement: "xxInputSpeech",
            Description: "Permet d'effectuer une reconnaissance vocale",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxInputSpeech({})
            },
            renderElement: (option) =>
            {
                return new xxInputSpeech(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "nbLigneAfficher",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "autoChange",
                    Facultatif: false,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumBackgroundInput",
                    NameOption: "background",
                    ValeurDefaut: enumBackgroundInput.Transparent,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "click",
                    Facultatif: true,
                    Function: (e?: MouseEvent) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "disabled",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "KeyUpCancelCallback",
                    Facultatif: true,
                    Function: () =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "KeyUpEnterCallback",
                    Facultatif: true,
                    Function: (val: number | string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    Facultatif: true,
                    NameOption: "longueurMaxi"
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "multiline",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "name",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onLostfocusCallback",
                    Facultatif: true,
                    Function: (val: number | string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "password",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "placeHolderLocalise",
                    NameOptionVariable: "placeHolderVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "rounded",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "style",
                    EnumType: "enumStyleInput",
                    ValeurDefaut: enumStyleInput.Simple,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "tabindex",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "value",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ValueChange",
                    Function: (val: string | number) =>
                    {

                    },
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "numeric",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "plus",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "minus",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "decimalSeparator",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "nbDigits",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "nbDecimal",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "max",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "min",
                            Facultatif: true,
                        },
                    ],
                },
            ]
        });

        // xxInputUploadImage --GANON appareilPhoto
        xxShowRoomContainer.AjouterElementShowroom<OptionsUploadImage>({
            typeElement: xxInputUploadImage,
            NomElement: "xxInputUploadImage",
            Description: "Permet d'uploader une image",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxInputUploadImage({ ValueChange: (fichierBase64: string) => { } });
            },
            renderElement: (option) =>
            {
                return new xxInputUploadImage(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ValueChange",
                    Facultatif: false,
                    Function: (fichierBase64: string) =>
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "click",
                    Facultatif: true,
                    Function: (e?: MouseEvent) =>
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "name",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "tabIndex",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "widthMax",
                    Facultatif: true
                },

            ]
        });

        // xxLabel --GANON Binding
        xxShowRoomContainer.AjouterElementShowroom<OptionsLabel>({
            typeElement: xxLabel,
            NomElement: "xxLabel",
            Description: "Affiche un texte formaté",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxLabel({ textVariable: "Sample Label" });
            },
            renderElement: (option) =>
            {
                return new xxLabel(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: false,
                    ValeurDefaut: "Sample Label"
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "titleLocalise",
                    NameOptionVariable: "titleVariable",
                    Facultatif: true,
                    ValeurDefaut: "Sample title Label"
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "centrer",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "espaceMinimaliste",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumHabillageLabel",
                    NameOption: "habillage",
                    ValeurDefaut: enumHabillageLabel.standard,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "icone",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "lineBreak",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumMiseEnFormeLabel",
                    NameOption: "miseEnForme",
                    ValeurDefaut: enumMiseEnFormeLabel.standard,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "police",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "tabindex",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "taillePolice",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeLabel",
                    NameOption: "type",
                    ValeurDefaut: enumTypeLabel.standard,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "lien",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            EnumType: "enumTypeOuvertureHref",
                            NameOption: "typeOuverture",
                            ValeurDefaut: enumTypeOuvertureHref.MemeEmplacement,
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "url",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "class",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "id",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "click",
                            Facultatif: true,
                            Function: (e?: MouseEvent) =>
                            {

                            },
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "name",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "tabindex",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                            NameOptionLocalisable: "textLocalise",
                            NameOptionVariable: "textVariable",
                            Facultatif: true
                        },
                    ],
                }
            ]
        });

        // xxLabelContainer 
        xxShowRoomContainer.AjouterElementShowroom<OptionsLabelContainer>({
            typeElement: xxLabelContainer,
            NomElement: "xxLabelContainer",
            Description: "Permet d'ajouter un label avec un autre élément à côté",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxLabelContainer({
                    initContent: new IconeCs3i(enumIconeCs3i.action_envoi_message),
                    textVariable: "Sample Label Container"
                })
            },
            renderElement: (option) =>
            {
                return new xxLabelContainer(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "inverserLabel",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "inverserLabelDom",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "justifieAGauche",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "labelLargeurLibre",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "lineBreak",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "taillePolice",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeLabel",
                    NameOption: "type",
                    ValeurDefaut: enumTypeLabel.standard,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumHabillageLabel",
                    NameOption: "habillage",
                    ValeurDefaut: enumHabillageLabel.standard,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeOrientation",
                    NameOption: "typeOrientation",
                    ValeurDefaut: enumTypeOrientation.horizontal,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                    NameOption: "InitContent",
                    Facultatif: true
                },
                {
                TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                            NameOption: "optionsAffichage",
                    listOption: xxShowRoomOptionRecurrente.get_OptionsAffichage([
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            NameOption: "justificationDuContenu",
                            EnumType: "enumJustificationDuContenu",
                            ValeurDefaut: enumJustificationDuContenu.centre,
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            NameOption: "positionDuContenu",
                            EnumType: "enumPositionDuContenu",
                            ValeurDefaut: enumPositionDuContenu.gauche,
                            Facultatif: true
                        },
                            ]),
                            Facultatif: true,
                },
            ]
        });

        // xxLabelDateModifiable --GANON binding & option DateSerializable
        xxShowRoomContainer.AjouterElementShowroom<OptionsLabelDateModifiable>({
            typeElement: xxLabelDateModifiable,
            NomElement: "xxLabelDateModifiable",
            Description: "Permet de modifier une date",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxLabelDateModifiable({ change: () => { } });
            },
            renderElement: (option) =>
            {
                return new xxLabelDateModifiable(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "change",
                    Facultatif: false,
                    Function: (t: DateSerialisable) => { },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "CanSelectDateNull",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "libelleLabelSiVide",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "testValidInput",
                    Facultatif: true,
                    Function: (s: DateSerialisable) =>
                    {
                        DateSerialisable.CompareDate(s, DateSerialisable.NowWithoutTime()) == 0; return true
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "testValidInputAsync",
                    Facultatif: true,
                    Function: async (s: DateSerialisable) =>
                    {
                        DateSerialisable.CompareDate(s, DateSerialisable.NowWithoutTime()) == 0; return true;
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "texteLocaliseInvalideInput",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeLabel",
                    NameOption: "type",
                    ValeurDefaut: enumTypeLabel.standard,
                    Facultatif: true
                }
            ],
        });

        // xxLabelModifiable --GANON binding
        xxShowRoomContainer.AjouterElementShowroom<OptionsLabelModifiable>({
            typeElement: xxLabelModifiable,
            NomElement: "xxLabelModifiable",
            Description: "Texte pouvant être modifié",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxLabelModifiable({ textVariable: "Sample Label Modifiable" });
            },
            renderElement: (option) =>
            {
                return new xxLabelModifiable(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "textVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "multiline",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "change",
                    Facultatif: true,
                    Function: (s: string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "libelleLabelSiVide",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "longueurMaxi",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "testValidInput",
                    Facultatif: true,
                    Function: (s: DateSerialisable) =>
                    {
                        DateSerialisable.CompareDate(s, DateSerialisable.NowWithoutTime()) == 0; return true;
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "testValidInputAsync",
                    Facultatif: true,
                    Function: async (s: DateSerialisable) =>
                    {
                        DateSerialisable.CompareDate(s, DateSerialisable.NowWithoutTime()) == 0; return true;
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeLabel",
                    NameOption: "type",
                    ValeurDefaut: enumTypeLabel.standard,
                    Facultatif: true
                }
            ]
        });

        // xxLabelTimeModifiable
        xxShowRoomContainer.AjouterElementShowroom<OptionsLabelTimeModifiable>({
            typeElement: xxLabelTimeModifiable,
            NomElement: "xxLabelTimeModifiable",
            Description: "Crée une heure modifiable",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxLabelTimeModifiable({ change: () => { }, textVariable: "hello" });
            },
            renderElement: (option) =>
            {
                return new xxLabelTimeModifiable(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "textVariable",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "change",
                    Facultatif: false,
                    Function: (time: xTime) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeLabel",
                    NameOption: "type",
                    ValeurDefaut: enumTypeLabel.standard,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "libelleLabelSiVide",
                    Facultatif: true
                },
            ]
        });

        // xxLecteurAudio
        xxShowRoomContainer.AjouterElementShowroom<OptionsLecteurAudio>({
            typeElement: xxLecteurAudio,
            NomElement: "xxLecteurAudio",
            Description: "Insère une zone de lecture audio",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxLecteurAudio({});
            },
            renderElement: (option) =>
            {
                return new xxLecteurAudio(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "audio",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                }
            ]
        });

        // xxLecteurCarteMagnetique
        xxShowRoomContainer.AjouterElementShowroom<OptionsLecteurCarteMagnetique>({
            typeElement: xxLecteurCarteMagnetique,
            NomElement: "xxLecteurCarteMagnetique",
            Description: "Permet d'effectuer une lecture d'une carte magnétique",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxLecteurCarteMagnetique({ callbackScan: () => { } });
            },
            renderElement: (option) =>
            {
                return new xxLecteurCarteMagnetique(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "callbackScan",
                    Facultatif: false,
                    Function: (idCarte: string) =>
                    {

                    },
                },
            ]
        });

        // xxLinker --GANON option xxRouteContener
        xxShowRoomContainer.AjouterElementShowroom<OptionsxxLinker>({
            typeElement: xxLinker,
            NomElement: "xxLinker",
            Description: "Lien direct vers une page",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxLinker({
                    routeur: new xxRouteContainer({
                        desktopMenuEnabled: true,
                        createInternalUrl: (chemin: string) =>
                        {
                            return chemin; //parametres.urlPubliqueApplication +

                        },
                        createExternalUrl: (chemin: string) =>
                        {
                            return chemin;


                        },
                        isFavori: (chemin: string) =>
                        {
                            return Promise.resolve(false);
                        },

                        createMenuCustom: (g) =>
                        {


                        },
                        toggleFavori: async (chemin: string, b: boolean) =>
                        {

                        }
                    }),
                    renderLienTheorique: null,
                })
            },
            renderElement: (option) =>
            {
                return new xxLinker(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "desktopMenuEnabled",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "createInternalUrl",
                    Facultatif: false,
                    Function: (chemin: string) =>
                    {

                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "createExternalUrl",
                    Facultatif: false,
                    Function: (chemin: string) =>
                    {

                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "isFavori",
                    Facultatif: false,
                    Function: (chemin: string) =>
                    {
                        return Promise.resolve(false);
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "createMenuCustom",
                    Facultatif: true,
                    Function: (ici: xxStackPanel) =>
                    {

                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "toggleFavori",
                    Facultatif: false,
                    Function: async (chemin: string, b: boolean) =>
                    {

                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderLienTheorique",
                    Facultatif: false,
                    Function: () =>
                    {

                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "icone",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true
                }

            ]
        });

        // xxListCheckBox --GANON options dynamiques; 
        xxShowRoomContainer.AjouterElementShowroom<OptionsListCheckBox<any>>({
            typeElement: xxListCheckBox,
            NomElement: "xxListCheckBox<T>",
            Description: "Permet de faire une liste de cases à cocher",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxListCheckBox<string>({
                    data: xxShowRoomSample.listeStrings(),

                    renderItem: function (ici, item)
                    {

                        ici.append(new xxLabel({ textVariable: item }));
                    },
                    renderTitre: function (ici)
                    {
                        ici.append(new xxLabel({ textVariable: "Ingrédients", type: enumTypeLabel.titre, class: "titre" }));
                    },
                    valueChange: function (liste)
                    {

                    },
                    withTous: true,
                    typeOrientation: enumTypeOrientation.vertical
                });
            },
            renderElement: (option) =>
            {
                option.data = xxShowRoomSample.listeStrings();
                return new xxListCheckBox(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderItem",
                    Facultatif: false,
                    Function: (ici: iXElementHolder, item: any) =>
                    {
                        ici.append(new xxLabel({ textVariable: item }));
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderTitre",
                    Facultatif: false,
                    Function: (ici: iXElementHolder) =>
                    {
                        ici.append(new xxLabel({ textVariable: "Liste des aliments" }));
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "valueChange",
                    Facultatif: false,
                    Function: (listeValeurs: string[]) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "withTous",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "getId",
                    Facultatif: true,
                    Function: (item: string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "itemChecked",
                    Facultatif: true,
                    Function: (item: string, isCheck: boolean) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "enumTypeOrientation",
                    Facultatif: true,
                    EnumType: "enumTypeOrientation",
                    ValeurDefaut: enumTypeOrientation.vertical
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Donnees,
                    NameOption: "data",
                    DataType: ExxShowRoomContaineDataType.CustomObjet,
                    
                },
            ]
        });

        // xxRecorder
        xxShowRoomContainer.AjouterElementShowroom<OptionsRecorder>({
            typeElement: xxRecorder,
            NomElement: "xxRecorder",
            Description: "Permet d'enregistrer sa voix",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxRecorder({});
            },
            renderElement: (option) =>
            {
                return new xxRecorder(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "valueChange",
                    Facultatif: true,
                    Function: (url: string) =>
                    {

                    }
                },
            ]
        });

        // xxListChoix
        xxShowRoomContainer.AjouterElementShowroom<OptionsSelect>({
            typeElement: xxListChoix,
            Description: "Permet de créer une liste déroulante de choix",
            NomElement: "xxListChoix",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxListChoix({});
            },
            renderElement: (option) =>
            {
                option.listeValeurs = xxShowRoomSample.listeCleValeurs();
                return new xxListChoix(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "asyncLoading",
                    Facultatif: true,
                    Function: async (opt: OptionsSelect, cb: () => void) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "change",
                    Facultatif: true,
                    Function: (code: string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "click",
                    Facultatif: true,
                    Function: (e?: MouseEvent) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "icone",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "name",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Facultatif: true,
                    NameOption: "onClose",
                    Function: () =>
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "optionTous",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "tabindex",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "valueDefault",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Donnees,
                    NameOption: "listeValeurs",
                    DataType: ExxShowRoomContaineDataType.CleValeur,
                    Facultatif: true,
                    ValeurSample: xxShowRoomSample.listeCleValeurs()
                }
            ]
        });

        // xxListeChoixLang 
        xxShowRoomContainer.AjouterElementShowroom<OptionsListeChoixLang>({
            typeElement: xxListeChoixLang,
            NomElement: "xxListeChoixLang",
            Description: "Permet de choisir la langue",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxListeChoixLang({ defaultValue: "fr", selected: (lang) => { }, });
            },
            renderElement: (option) =>
            {
                return new xxListeChoixLang(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "defaultValue",
                    Facultatif: false,
                    ValeurDefaut: "fr",
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Donnees,
                    NameOption: "",
                    DataType: ExxShowRoomContaineDataType.string,
                    Facultatif: true,
                    ValeurSample: ['fr', 'de', 'en', 'es', 'ca']
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "selected",
                    Facultatif: false,
                    Function: (lang: string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "renderSelectedClass",
                    Facultatif: true,
                }
            ]
        });

        // xxListeDeroulante --GANON fonctions & ObservableCollection & defaultValue & groupeGlobal 
        xxShowRoomContainer.AjouterElementShowroom<OptionsListeDeroulante<any>>({
            typeElement: xxListeDeroulante,
            NomElement: "xxListeDeroulante<T>",
            Description: "Permet de créer une liste déroulante de valeurs",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxListeDeroulante<string>({
                    donnees: xxShowRoomSample.listeStrings(),
                    renderSelected: (ici, item, oepn) =>
                    {
                        ici.append(new xxBouton({
                            titleVariable: "Change moi",
                            click: (cb) =>
                            {
                                xOutils.afficherMessageAlertifyLog("Click");
                                /*Complète-moi*/
                                cb();
                            },
                            textVariable: "Change moi",

                        }));
                    }, renderSelectItem: (ici,item,select) =>
                    {

                    }, selected: (valeur) =>
                    {

                    },
                });
            },
            renderElement: (option) =>
            {
                return new xxListeDeroulante(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "equals",
                    Facultatif: true,
                    Function: (a: string, b: string) =>
                    {
                        return a.localeCompare(b);
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "getId",
                    Facultatif: true,
                    Function: (elem: string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "justifieAGauche",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "nonResponsive",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onClose",
                    Facultatif: true,
                    Function: () =>
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onShow",
                    Facultatif: true,
                    Function: () =>
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "readOnly",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderEndList",
                    Facultatif: true,
                    Function: (iciFin: iXElementHolder, listeDeroulante: xxListeDeroulante<any>) =>
                    {
                        /*complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderReadOnly",
                    Facultatif: true,
                    Function: (p: iXElementHolder, item: any) =>
                    {
                        /*complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "retourALaLigne",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocaliseMobile",
                    NameOptionVariable: "textVariableMobile",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Donnees,
                    DataType: ExxShowRoomContaineDataType.CustomObjet,
                    NameOption:"donnees",
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "groupeGlobal",
                    Facultatif:true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "groupHeaderCustom",
                            Facultatif: true,
                            Function: (listGroup: any[]) =>
                            {
                                
                            }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "groupHeaderCustom",
                            Facultatif: true,
                            Function: (a: any) => 
                            {

                            }
                        }
                    ]
                }
            ]
        });

        // xxListeDeroulanteAutomatique --GANON liste string []
        xxShowRoomContainer.AjouterElementShowroom<OptionListeDeroulanteAutomatique>({
            typeElement: xxListeDeroulanteAutomatique,
            NomElement: "xxListeDeroulanteAutomatique",
            Description: "Permet de créer une liste automatique",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            IsNotFunctionnal: true,
            RenderTooltip: async () =>
            {
                return new xxListeDeroulanteAutomatique({ data: xxShowRoomSample.listeStrings(), libelle: "test", renderSelected: () => { }, valeurSaisie: (val: string) => { }, });
            },
            renderElement: (option) =>
            {
                return new xxListeDeroulanteAutomatique(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "libelle",
                    Facultatif: false,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderSelected",
                    Facultatif: false,
                    Function: () =>
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "valeurSaisie",
                    Facultatif: false,
                    Function: (val: string) =>
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "nbElemMaxBouttonsRadio",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "versionMobile",
                    Facultatif: true,
                    ValeurDefaut: false
                }
            ]
        });

        // xxListeDeroulanteSimple - deprecated_DontUse --GANON option tableau string
        xxShowRoomContainer.AjouterElementShowroom<any>({
            typeElement: xxListeDeroulanteSimpleNePlusUtiliser,
            NomElement: "xxListeDeroulanteSimpleNePlusUtiliser",
            Description: "Permettait de créer une liste déroulante",
            Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
            RenderTooltip: async () =>
            {
                return new xxListeDeroulanteSimpleNePlusUtiliser({
                    defaultKeyValue: "Hello",
                    donnees: xxShowRoomSample.listeStrings(),
                    getKey: (item: string) => { return item },
                    getLibelle: (item: string) => { return item },
                    selected: (cle: string) => { },

                });
            },
            renderElement: (option) =>
            {
                return new xxListeDeroulanteSimpleNePlusUtiliser(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "defaultKeyValue",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "getKey",
                    Facultatif: false,
                    Function: (item: string) =>
                    {

                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "getLibelle",
                    Facultatif: false,
                    Function: (item: string) =>
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "selected",
                    Facultatif: false,
                    Function: (cle: string) =>
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "getIcone",
                    Facultatif: true,
                    Function: (item: string) =>
                    {
                        /*Complète-moi*/
                    },
                },
            ]
        });

        // xxListeSelection --GANON Aimeric (options complexes)
        xxShowRoomContainer.AjouterElementShowroom<OptionListeSelection<any>>({
            typeElement: xxListeSelection,
            NomElement: "xxListeSelection",
            Description: "Permet de faire une liste à plusieurs sélections",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxListeSelection({
                    binding: null,
                    DonneeCompleteAsync: new Promise < string[] >((resolve) =>
                    {
                        resolve(xxShowRoomSample.listeStrings());
                    }),
                    DonneeComplete: xxShowRoomSample.listeStrings(),
                    DonneeSelectionnees: xxShowRoomSample.listeStrings(),
                    RenderItemListeComplete: () => { },
                    RenderItemListeSelectionee: () => { }
                });
            },
            renderElement: (option) =>
            {
                return new xxListeSelection(option);
            },
            listOption: [
                //GANON
            ]
        });

        // xxListWrapper --GANON  option dataContext,  option groupeGlobal, 
        xxShowRoomContainer.AjouterElementShowroom<OptionsList<any>>({
            typeElement: xxListWrapper,
            NomElement: "xxListWrapper<T>",
            Description: "Permet de faire une liste au typage dynamique",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxListWrapper<xxShowroomCustomSample>({
                    donnees: xxShowRoomSample.listeCustom(), renderItem: (p,item) =>
                    {
                        p.append(new xxLabel({
                            textVariable: item.toString(),
                        }));
                    },
                });
            },
            renderElement: (option) =>
            {
                return new xxListWrapper<xxShowroomCustomSample>(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderItem",
                    Facultatif: false,
                    Function: (p: iXElementHolder, item: xxShowroomCustomSample, id: string) =>
                    {
                        /*Complète-moi*/
                        p.append(new xxLabel({
                            textVariable: item.toString(),
                        }));
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Donnees,
                    NameOption: "donnees",
                    Facultatif: false,
                    DataType: ExxShowRoomContaineDataType.CustomObjet,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "equals",
                    Facultatif: true,
                    Function: (a: string, b: string) =>
                    {
                        /*Complète-moi*/
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "getId",
                    Facultatif: true,
                    Function: (valeur: string) =>
                    {
                        /*Complète-moi*/
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "greaterThan",
                    Facultatif: true,
                    Function: (a: string, b: string) =>
                    {
                        /*Complète-moi*/
                    }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "horizontal",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "LibelleSiVide",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "limite",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    ValeurDefaut: enumTypeTri.aucun,
                    EnumType: "enumTypeTri",
                    NameOption: "sort",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "unique",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "espaceMinimaliste",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "groupeGlobal",
                    Facultatif: true,
                    description:"Groupe par fracturation (pas de modification de l'ordre des données)",
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "group",
                            Function: (place: iXElementHolder, valeur: xxShowroomCustomSample, valeurPrecedente: xxShowroomCustomSample ) =>
                            {
                                place.append(new xxLabel({
                                    textVariable: valeur.couleur,
                                    type: enumTypeLabel.important
                                }));
                            }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "greaterThan",
                            Facultatif: true,
                            Function: (a: xxShowroomCustomSample, b: xxShowroomCustomSample) =>
                            {
                                return a.couleur != b.couleur;
                            }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "greaterThanGeneric",
                            Facultatif: true,
                            Function: (a: xxShowroomCustomSample) =>
                            {
                                return a.couleur;
                            }
                        }
                    ]
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "regroupementUniqueBy",
                    Facultatif: true,
                    description : "ReGroupement sous une seule bannier (modification de l'ordre des données)",
                    listOption: [{
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "groupHeaderCustom",
                            Facultatif:true,
                            Function: (place: iXElementHolder, listGroup: xxShowroomCustomSample[]) =>
                            {
                                place.append(new xxLabel({
                                    textVariable: listGroup[0].Group + " - " + listGroup.length
                                }));
                            }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "GroupBy",
                            Facultatif: true,
                            Function: (a: xxShowroomCustomSample) =>
                            {
                                return a.Group;
                            }
                        }
                    ]
                },
            ]
        });

        // xxMenu --GANON option contenu
        xxShowRoomContainer.AjouterElementShowroom<OptionsMenu>({
            typeElement: xxMenu,
            Description: "Permet de créer un menu",
            NomElement: "xxMenu",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            IsNotFunctionnal: true,
            RenderTooltip: async () =>
            {
                return new xxMenu({
                    contenu: [{ icone: new IconeCs3i(enumIconeCs3i.action_agrandir_horizontal), libelle: "test", items: null }],
                });
            },
            renderElement: (option) =>
            {
                return new xxMenu(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "activerRecherche",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "selectFirstLigne",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "toutDeplie",
                    Facultatif: true,
                    ValeurDefaut: false
                }
            ]
        });

        // xxNavOngletControl
        xxShowRoomContainer.AjouterElementShowroom<OptionsxxNavOngletControl>({
            typeElement: xxNavOngletControl,
            Description: "Permet de créer une barre de navigation a onglet",
            NomElement: "xxNavOngletControl",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxNavOngletControl({
                    initOnglets: [
                        {
                            textVariable: "Onglet 1",
                            isOngletPreselected: true,
                            color:"#AFFFE0",
                            GenerateContent: () =>
                            { 
                                return xxShowRoomSample.divSample(0);
                            }
                        },
                        {
                            textVariable: "Onglet 2",
                            color: "#20FF37",
                            GenerateContent: () =>
                            {
                                return xxShowRoomSample.divSample(1);
                            }
                        },
                        {
                            textVariable: "Onglet 3",
                            GenerateContent: () =>
                            {
                                return xxShowRoomSample.divSample(2);
                            }
                        },
                        {
                            textVariable: "Onglet 4",
                            color: "#FACFAC",
                            GenerateContent: () =>
                            {
                                return xxShowRoomSample.divSample(0);
                            }
                        },
                    ]
                });
            },
            renderElement: (option) =>
            {
                return new xxNavOngletControl(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    description: "Permet d'afficher au survole les sous-onglets de l'onglet survolé",
                    NameOption: "WithSousOngletTooltip",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    description: "Permet de reduire l'affichage de l'arboresence des sous-onglets",
                    NameOption: "CanReduireSousOnglet",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface,
                    NameOption: "initOnglets",
                    Facultatif: true,
                    listOption: xxShowRoomOptionRecurrente.get_OptionsXxNavOngletItem()
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                    NameOption: "initZoneAvantOnglet",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                    NameOption: "initZoneApresOnglet",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "OnOngletChange",
                    Facultatif: true,
                    Function: (OngleSelect: xxNavOngletItem) =>
                    {
                        xOutils.afficherMessageAlertifyLog("Coucou");
                    }
                },
            ]
        });

        // xxPageWrapper --GANON option localizationParams; 
        xxShowRoomContainer.AjouterElementShowroom<OptionsPage>({
            typeElement: xxPageWrapper,
            NomElement: "xxPageWrapper",
            Description: "Permet de créer une page",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxPageWrapper({ titleLocalise: "samplePage", });
            },
            renderElement: (option) =>
            {
                return new xxPageWrapper(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "titleLocalise",
                    Facultatif: false,
                    ValeurDefaut: "Change moi"
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumAlignementZone",
                    NameOption: "alignementFooter",
                    Facultatif: true,
                    ValeurDefaut: enumAlignementZone.gauche
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumAlignementZone",
                    NameOption: "alignementHeader",
                    Facultatif: true,
                    ValeurDefaut: enumAlignementZone.gauche
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "centrerContenu",
                    Facultatif: true,
                    ValeurDefaut: false
                },

                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "classBody",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "icone",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "scrollableHeader",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "withFooter",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "withHeader",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "withPreHeader",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
                    NameOption: "initContent",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
                    NameOption: "initContentFooter",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
                    NameOption: "initContentHeader",
                    Facultatif: true,
                },
            ]
        });

        // xxPlanneur --GANON option PlanneurRessources[]
        xxShowRoomContainer.AjouterElementShowroom<OptionsPlanneur>({
            typeElement: xxPlanneur,
            NomElement: "xxPlanneur",
            Description: "Permet de faire un planning",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            IsNotFunctionnal: true,
            RenderTooltip: async () =>
            {
                return new xxPlanneur({ dateDebut: DateSerialisable.Now(), displayRdv: () => { }, listeRessources: [], nbJours: 4, selectRessource: () => { }, });
            },
            renderElement: (option) =>
            {
                return new xxPlanneur(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Date,
                    NameOption: "dateDebut",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "displayRdv",
                    Facultatif: false,
                    Function: (ici: iXElementHolder, rdv: PlanneurRDV) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "nbJours",
                    Facultatif: false,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "selectRessource",
                    Facultatif: false,
                    Function: (ressource: PlanneurRessource) => {/*Compète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "displayRessource",
                    Facultatif: true,
                    Function: (ici: iXElementHolder, ressource: PlanneurRessource) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ligneMouseClick",
                    Facultatif: true,
                    Function: (div: xDiv, ressource: PlanneurRessource) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ligneMouseOut",
                    Facultatif: true,
                    Function: (div: xDiv, ressource: PlanneurRessource) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ligneMouseOver",
                    Facultatif: true,
                    Function: (div: xDiv, ressource: PlanneurRessource) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ligneMouseOver",
                    Facultatif: true,
                    Function: (div: xDiv, ressource: PlanneurRessource) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderClassBloc",
                    Facultatif: true,
                    Function: (date: Date) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderDateColonne",
                    Facultatif: false,
                    Function: (ici: iXElementHolder, date: Date) => {/*Complète-moi*/ }
                }
            ]
        });

        //xxPlanning
        xxShowRoomContainer.AjouterElementShowroom<optionPlanning>({
            typeElement: xxPlanning,
            NomElement: "xxPlanning",
            Description: "Permet de creer un planning",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () => {
                let rdvs: PlanningRdv[] = [];
                let dispos: PlanningDisponibilite[] = [];

                dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 12:00')), "", enumTypeDispo.Planning));
                dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/03/2020 08:00')), DateSerialisable.Factory(new Date('10/03/2020 12:00')), "", enumTypeDispo.Planning));
                dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/04/2020 08:00')), DateSerialisable.Factory(new Date('10/04/2020 12:00')), "", enumTypeDispo.Planning));

                dispos.push(new PlanningDisponibilite("Barre 1", "1", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 10:00')), "#B0FFED", enumTypeDispo.Barre));
                dispos.push(new PlanningDisponibilite("Barre 1(bis)", "2", DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "#A3D7FF", enumTypeDispo.Barre));

                dispos.push(new PlanningDisponibilite("Barre 2", "", DateSerialisable.Factory(new Date('10/03/2020 08:00')), DateSerialisable.Factory(new Date('10/03/2020 12:00')), "forestgreen", enumTypeDispo.Barre));
                dispos.push(new PlanningDisponibilite("Barre 3", "", DateSerialisable.Factory(new Date('10/04/2020 08:00')), DateSerialisable.Factory(new Date('10/04/2020 12:00')), "coral", enumTypeDispo.Barre));
                dispos.push(new PlanningDisponibilite("Barre 4", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 19:00')), "cornflowerblue", enumTypeDispo.Barre));

                dispos.push(new PlanningDisponibilite("bloc 1 col 1", "", DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "palevioletred", enumTypeDispo.Bloc, "", 1));
                dispos.push(new PlanningDisponibilite("bloc 2 col 1", "", DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "forestgreen", enumTypeDispo.Bloc, "", 2));

                dispos.push(new PlanningDisponibilite("bloc 1 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 13:00')), DateSerialisable.Factory(new Date('10/02/2020 17:00')), "cornflowerblue", enumTypeDispo.Bloc, "", 1));
                dispos.push(new PlanningDisponibilite("bloc 2 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 18:00')), "cornflowerblue", enumTypeDispo.Bloc, "", 2));

                rdvs.push(new PlanningRdv("Libelle 1 planning 1", 1, null, null, DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00'))));
                rdvs.push(new PlanningRdv("Libelle 2 planning 1", 2, null, null, DateSerialisable.Factory(new Date('10/02/2020 09:15')), DateSerialisable.Factory(new Date('10/02/2020 11:35'))));
                rdvs.push(new PlanningRdv("Libelle 3 planning 1", 3, null, null, DateSerialisable.Factory(new Date('10/02/2020 15:00')), DateSerialisable.Factory(new Date('10/02/2020 17:30'))));

                return new xxPlanning({
                    DateDebut: DateSerialisable.Factory(new Date('10/02/2020')),
                    Rdv: rdvs,
                    HeureDebut: 8,
                    TimeLineNow: true,
                    HeureFin: 20,
                    ZoomPlanning: {
                        ZoomChoisi: 100,
                    },
                    Dispo: dispos,
                    ClickSurDispoBarre: (dispo) => {
                    },
                    ClickSurEnteteColonne: (div, colonne) => {
                    },
                    ClickSurRdv: (rdv) => {
                    }
                })
            },
            renderElement: (options) => {
                console.log(options);
                let rdvs: PlanningRdv[] = [];
                let dispos: PlanningDisponibilite[] = [];

                dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 12:00')), "", enumTypeDispo.Planning));
                dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/03/2020 08:00')), DateSerialisable.Factory(new Date('10/03/2020 12:00')), "", enumTypeDispo.Planning));
                dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/04/2020 08:00')), DateSerialisable.Factory(new Date('10/04/2020 12:00')), "", enumTypeDispo.Planning));

                dispos.push(new PlanningDisponibilite("Barre 1", "1", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 10:00')), "#B0FFED", enumTypeDispo.Barre));
                dispos.push(new PlanningDisponibilite("Barre 1(bis)", "2", DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "#A3D7FF", enumTypeDispo.Barre));

                dispos.push(new PlanningDisponibilite("Barre 2", "", DateSerialisable.Factory(new Date('10/03/2020 08:00')), DateSerialisable.Factory(new Date('10/03/2020 12:00')), "forestgreen", enumTypeDispo.Barre));
                dispos.push(new PlanningDisponibilite("Barre 3", "", DateSerialisable.Factory(new Date('10/04/2020 08:00')), DateSerialisable.Factory(new Date('10/04/2020 12:00')), "coral", enumTypeDispo.Barre));
                dispos.push(new PlanningDisponibilite("Barre 4", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 19:00')), "cornflowerblue", enumTypeDispo.Barre));

                dispos.push(new PlanningDisponibilite("bloc 1 col 1", "", DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "palevioletred", enumTypeDispo.Bloc, "", 1));
                dispos.push(new PlanningDisponibilite("bloc 2 col 1", "", DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "forestgreen", enumTypeDispo.Bloc, "", 2));

                dispos.push(new PlanningDisponibilite("bloc 1 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 13:00')), DateSerialisable.Factory(new Date('10/02/2020 17:00')), "cornflowerblue", enumTypeDispo.Bloc, "", 1));
                dispos.push(new PlanningDisponibilite("bloc 2 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 18:00')), "cornflowerblue", enumTypeDispo.Bloc, "", 2));

                rdvs.push(new PlanningRdv("Libelle 1 planning 1", 1, null, null, DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00'))));
                rdvs.push(new PlanningRdv("Libelle 2 planning 1", 2, null, null, DateSerialisable.Factory(new Date('10/02/2020 09:15')), DateSerialisable.Factory(new Date('10/02/2020 11:35'))));
                rdvs.push(new PlanningRdv("Libelle 3 planning 1", 3, null, null, DateSerialisable.Factory(new Date('10/02/2020 15:00')), DateSerialisable.Factory(new Date('10/02/2020 17:30'))));
                let opt2:optionPlanningResDate= {
                    DateDebut: options?.DateDebut ?? DateSerialisable.Factory(new Date('10/02/2020')),
                    Rdv: rdvs,
                    HeureDebut: options?.HeureDebut?? 8,
                    TimeLineNow: options?.TimeLineNow?? false,
                    HeureFin: options?.HeureFin ?? 20,
                    KeyPlanning: options?.KeyPlanning,
                    DayToAffiche:options?.DayToAffiche,
                        typeAffichageParDefaut:options?.typeAffichageParDefaut,
                    ZoomPlanning: {
                        ZoomChoisi: 100,
                    },
                    Dispo: dispos,
                    ClickSurDispoBarre: (dispo) => {
                    },
                    ClickSurEnteteColonne: (div, colonne) => {
                    },
                    ClickSurRdv: (rdv) => {
                    }
                };
                return new xxPlanning(opt2)


             //   return new xxPlanning(options);
            },
            listOption: [
                //{
                //    TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface,
                //    NameOption: "rdvs",
                //    listOption: [],
                //    Facultatif: false
                //},
                //{
                //    TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface,
                //    NameOption: "dispos",
                //    listOption: [],
                //    Facultatif: false
                //},
                {
                    TypeOption: ExxShowRoomContainerTypeOption.DateSerialisable,
                    NameOption: "DateDebut",
                    ValeurDefaut: DateSerialisable.Factory(new Date("15/12/2022 14:45")),
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "HeureDebut",
                    ValeurDefaut:9,
                    Facultatif:true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "HeureFin",
                    ValeurDefaut:22,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "TimeLineNow",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "KeyPlanning",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "EPlanningTypeAffichage",
                    ValeurDefaut: EPlanningTypeAffichage.Standard,
                    NameOption: "typeAffichageParDefaut",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "DaysToAffiche",
                    Facultatif: true
                },





            ]
        })

        //xxProgressBar
        xxShowRoomContainer.AjouterElementShowroom<OptionsProgressBar>({
            typeElement: xxProgressBar,
            NomElement: "xxProgressBar",
            Description: "Permet de faire une barre de chargement",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () => {
                return new xxProgressBar({ nbTotalElements: 5, titre: "ProgressBar" });
            },
            renderElement: (options) => {
                return new xxProgressBar(options);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "nbTotalElements",
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "hauteur",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "largeur",
                    ValeurDefaut: "144px",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                    NameOption: "page",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "titre",
                    Facultatif: true
                }
            ]
        });

        // xxQrCodeReader --GANON option Binding
        xxShowRoomContainer.AjouterElementShowroom<optionsQrCodeReaderBinding>({
            typeElement: xxQrCodeReader,
            NomElement: "xxQrCodeReader",
            Description: "Permet de lire un QR Code",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxQrCodeReader({ binding: undefined });
            },
            renderElement: (option) =>
            {
                return new xxQrCodeReader(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onDetect",
                    Facultatif: true,
                    Function: (s: string) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "autosize",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onError",
                    Facultatif: true,
                    Function: (err: any) => {/*Complète-moi*/ }
                }
            ]
        });

        // xxRadioButton
        xxShowRoomContainer.AjouterElementShowroom<OptionsRadioButton<any>>({ 
            IsNotFunctionnal:true,
            typeElement: xxRadioButton,
            NomElement: "xxRadioButton<T>",
            Description: "Permet de créer des boutons radio",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxRadioButton<string>({
                    initElements: [{
                        valeur: "Sample1",
                        libelleLocalise: "Sample 1"
                    },
                    {
                        valeur: "Sample2",
                        libelleLocalise: "Sample 2"
                    }
                    ],
                    valueChange: () => { },
                });
            },
            renderElement: (option) =>
            {
                return new xxRadioButton(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Facultatif: false,
                    NameOption: "valueChange",
                    Function: (a: any) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Facultatif: true,
                    NameOption: "clickOnSelected",
                    Function: (a: any, reset: () => void) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    Facultatif: true,
                    NameOption: "renderDecorator",
                    Function: (i: itemRadioButton<any>) => {/*Complète-moi*/ }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "displayOnlySelected",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "FakeClickPreselectionOnInit",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "readonly",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "SelectedClassCustonGlobal",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    ValeurDefaut: ETypeBouton.boutonClassique,
                    EnumType: "ETypeBouton",
                    NameOption: "typeBouton",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    ValeurDefaut: enumTypeOrientation.horizontal,
                    EnumType: "enumTypeOrientation",
                    NameOption: "typeOrientation",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    ValeurDefaut: enumTypeOrientation.horizontal,
                    EnumType: "enumTypeOrientation",
                    NameOption: "typeOrientationBouton",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface,
                    NameOption: "initElements",
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "id",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "Valeur",
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Icone,
                            NameOption: "icone",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                            NameOptionLocalisable: "libelleLocalise",
                            NameOptionVariable:"libelleVariable",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                            NameOptionLocalisable: "titleLocalise",
                            NameOptionVariable: "titleVariable",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "preselectionne",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "class",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "espaceMinimaliste",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "inactif",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "SelectedClassCuston",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                            NameOption: "optionBoutonWrapper2",
                            listOption: [
                                {
                                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                                    NameOption: "optionsAffichage",
                                    listOption: xxShowRoomOptionRecurrente.get_OptionsAffichage([
                                        {
                                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                                            NameOption: "styleBouton",
                                            EnumType: "enumStyleBouton",
                                            ValeurDefaut: enumStyleBouton.Simple,
                                            Facultatif: true
                                        },
                                        {
                                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                                            NameOption: "positionnementResponsiveBouton",
                                            EnumType: "enumPositionnementResponsiveBouton",
                                            ValeurDefaut: enumPositionnementResponsiveBouton.Defaut,
                                            Facultatif: true
                                        },
                                        {
                                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                                            NameOption: "tailleBouton",
                                            EnumType: "enumTailleBouton",
                                            ValeurDefaut: enumTailleBouton.M,
                                            Facultatif: true
                                        },
                                        {
                                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                                            NameOption: "couleurBouton",
                                            EnumType: "enumCouleurBouton",
                                            ValeurDefaut: enumCouleurBouton.Utilisateur,
                                            Facultatif: true
                                        },
                                        {
                                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                                            NameOption: "positionIconeBouton",
                                            EnumType: "enumPosition",
                                            ValeurDefaut: enumPosition.Left,
                                            Facultatif: true
                                        },
                                        {
                                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                                            NameOption: "boutonArrondi",
                                            ValeurDefaut: true,
                                            Facultatif: true
                                        },
                                    ]),
                                    Facultatif: true
                                },
                                {
                                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                                    NameOption: "SelectedcolorCuston",
                                    EnumType: "enumCouleurBouton",
                                    ValeurDefaut: enumCouleurBouton.Valide,
                                    Facultatif: true
                                },
                                {
                                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                                    NameOption: "SelectedcolorCuston",
                                    EnumType: "enumCouleurBouton",
                                    ValeurDefaut: enumCouleurBouton.Blanc,
                                    Facultatif: true
                                },
                                {
                                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                                    NameOption: "typeBouton",
                                    EnumType: "enumTypeBouton",
                                    ValeurDefaut: enumTypeBouton.Standard,
                                    Facultatif: true
                                },
                            ],
                            Facultatif: true
                        },
                    ]
                },
            ]
        });

        // xxRouteContainer
        xxShowRoomContainer.AjouterElementShowroom<optionsxxRouteContainer>({
            typeElement: xxRouteContainer,
            NomElement: "xxRouteContainer",
            Description: "Menu de navigation permettant de partager des liens de n'importe quel écran",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxImageTabByte({ tabByte: xxShowRoomImageTooltipPreview.xxRouteContainer, typeAffichage: enumTypeImage.domImage });
            },
            renderElement: (option) =>
            {
                return new xxRouteContainer(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "createExternalUrl",
                    Facultatif: false,
                    Function: (str: string) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "createInternalUrl",
                    Facultatif: false,
                    Function: (str: string) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "isFavori",
                    Facultatif: false,
                    Function: (cheminPhysique: string) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "toogleFavori",
                    Facultatif: false,
                    Function: (cheminPhysique: string, ajout: boolean) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "ajouterHistoriquePersonnalise",
                    Facultatif: true,
                    Function: (chemin: string) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "createMenuCustom",
                    Facultatif: true,
                    Function: (ici: xxStackPanel) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "desktopMenuEnabled",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "gestionBackBrowser",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "verboseMode",
                    Facultatif: true,
                    ValeurDefaut: false
                }
            ]
        });

        // xxSpecificationCreneaux --GANON Option pas en interface
        xxShowRoomContainer.AjouterElementShowroom<OptionsInfosCreneaux>({
            typeElement: xxSpecificationCreneaux,
            NomElement: "xxSpecificationCreneaux",
            Description: "Permet de définir des créneaux",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return null //GANON
            },
            renderElement: (option: OptionsInfosCreneaux) =>
            {
                return new xxSpecificationCreneaux(null);
            },
            listOption: [

            ]
        });

        // xxStackPanel
        xxShowRoomContainer.AjouterElementShowroom<OptionsStackPanel>({
            typeElement: xxStackPanel,
            NomElement: "xxStackPanel",
            Description: "Permet d'empiler verticalement des éléments",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxStackPanel({
                    initContent: [
                        xxShowRoomSample.divSample(),
                        xxShowRoomSample.divSample(2),
                        xxShowRoomSample.divSample(3)
                    ]
                });
            },
            renderElement: (option) =>
            {
                return new xxStackPanel(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "espaceMinimaliste",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
                    NameOption: "initContent",
                    Facultatif: true,
                },
            ]
        });

        // xxTabControl --GANON option initElements, ongletAjout
        xxShowRoomContainer.AjouterElementShowroom<OptionsTabItem>({
            typeElement: xxTabControl,
            NomElement: "xxTabControl",
            Description: "Permet de faire des onglets",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            IsNotFunctionnal: true,
            RenderTooltip: async () =>
            {
                return new xxTabControl({
                    initElements: [
                        {
                            textLocalise: "Sample 1",
                            addContent: (ici) => { }
                        },
                        {
                            textLocalise: "Sample 2",
                            addContent: (ici) => { }
                        }
                    ]
                });
            },
            renderElement: (option) =>
            {
                return new xxTabControl(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "favoriteAutoSave",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "favoriteGlobalKey",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "cdperso",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "key",
                            Facultatif: true
                        },
                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "gererGroupe",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "deleteGroupe",
                            Facultatif: true,
                            Function: async (key: string, custom: CustomGroupeOnglets) =>
                            {
                                /*Complète-moi*/
                            },
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "derniersOuvertsKey",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "getDerniersOuverts",
                            Facultatif: true,
                            Function: async (key: string) =>
                            {
                                /*Complète-moi*/
                            },
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "getListeGroupe",
                            Facultatif: true,
                            Function: async (key: string) => 
                            {
                                /*Complète-moi*/
                            },
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "groupesKey",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "saveDerniersOuverts",
                            Facultatif: true,
                            Function: async (key: string, custom: CustomGroupeOnglets) => 
                            {
                                /*Complète-moi*/
                            },
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "saveGroupe",
                            Facultatif: true,
                            Function: async (key: string, custom: CustomGroupeOnglets) =>
                            {
                                /*Complète-moi*/
                            },
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "textAjoutGroupeLocalise",
                            Facultatif: true
                        },
                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "modeFermerOnglets",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "modeNavigation",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "postZoneAligneeADroite",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "styleArrondi",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "tabChange",
                    Facultatif: true,
                    Function: (tabSelectionne: xxTabItem) => 
                    {
                        /*Complète-moi*/
                    },
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeOrientation",
                    NameOption: "typeOrientation",
                    ValeurDefaut: enumTypeOrientation.horizontal,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeOrientation",
                    NameOption: "typeOrientationBouton",
                    ValeurDefaut: enumTypeOrientation.horizontal,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "withDefault",
                    Facultatif: true,
                    ValeurDefaut: false
                },
            ]
        });

        // xxTableauWrapper --GANON binding columns, data,  dataContext
        xxShowRoomContainer.AjouterElementShowroom<OptionsTableau<any>>({
            IsNotFunctionnal:true,
            typeElement: xxTableauWrapper,
            NomElement: "xxTableauWrapper<T>",
            Description: "Permet de créer un tableau",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxTableauWrapper<string>({
                    columns: [
                        {
                            renderMethod: (ici) =>
                            {
                                ici.xxLabel({ textVariable: "Sample", type: enumTypeLabel.important });
                            },
                            titleVariable: "Sample Colonne",

                        },
                        {
                            renderMethod: (ici) =>
                            {
                                ici.append(new xxBouton({
                                    optionsAffichage: {
                                        tailleBouton: enumTailleBouton.Fit
                                    },
                                    titleLocalise:"",
                                    icone: new IconeCs3i(enumIconeCs3i.action_agrandir),
                                    click: () => { }
                                }));
                            },
                            titleVariable: "Sample Colonne 2",
                        },
                        {
                            renderMethod: (ici) =>
                            {
                                ici.xxCheckBox({ AffichageBoutonWapper2: {}, value: true });
                            },
                            titleVariable: "Sample Colonne 3",
                        },
                    ],
                    data: ["hello", "hello", "hello", "hello", "hello",],

                })
            },
            renderElement: (option) =>
            {
                return new xxTableauWrapper(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "columns",
                    Facultatif: false,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "renderMethod",
                            Facultatif: false,
                            Function: (ici: iXElementHolder, valeur: string) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "titleLocalise",
                            Facultatif: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "canDeleteColumn",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "greaterThan",
                            Facultatif: true,
                            Function: (a: any, b: any, triCourant: enumTypeTri) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "greaterThanGeneric",
                            Facultatif: true,
                            Function: (a: any) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "group",
                            Facultatif: true,
                            Function: (place: iXElementHolder, valeur: string) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "onChangeTrie",
                            Facultatif: true,
                            Function: (triCourant: enumTypeTri, ordreTri: number) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Number,
                            NameOption: "ordreTri",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "print",
                            Facultatif: true,
                            Function: (valeur: string) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "printGroup",
                            Facultatif: true,
                            Function: (valeur: string) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "printTitleLocalise",
                            Facultatif: true,
                            Function: () => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "renderTitle",
                            Facultatif: true,
                            Function: (place: iXElementHolder) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "titleClass",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "tooltipTitleLocalise",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Enum,
                            NameOption: "triCourant",
                            EnumType: "enumTypeTri",
                            ValeurDefaut: enumTypeTri.aucun,
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "verrouTriPrincipal",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "widthPdf",
                            Facultatif: true
                        }
                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "afficherTotalElements",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "autoComplete",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "clickLigne",
                    Facultatif: true,
                    Function: (l: string, lw: ITableauLigneWrapperBase<any>) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "dblClickLigne",
                    Facultatif: true,
                    Function: (l: string, lw: ITableauLigneWrapperBase<any>) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "detailLigne",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "afficherDetailLigne",
                            Facultatif: true,
                            Function: (valeur: string) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "printDetailLigne",
                            Facultatif: true,
                            Function: (valeur: string) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "renderDetailLigne",
                            Facultatif: true,
                            Function: (place: iXElementHolder, valeur: string, lw: ITableauLigneWrapperBase<any>) => { }
                        },
                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "exportPDF",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "getCartouchePdf",
                            Facultatif: true,
                            Function: () => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "getImagesPdf",
                            Facultatif: true,
                            Function: () => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "nomExportPdf",
                            Facultatif: true,
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "PdfModePaysage",
                            Facultatif: true,
                            ValeurDefaut: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                            NameOption: "renderBouton",
                            Facultatif: true,
                            ValeurDefaut: false
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                            NameOptionLocalisable: "sousTitreLocaliseExportPdf",
                            NameOptionVariable: "sousTitreVariableExportPdf",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                            NameOptionLocalisable: "titreLocaliseExportPdf",
                            NameOptionVariable: "titreVariableExportPdf",
                            Facultatif: true
                        },
                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "filtreTexte",
                    Facultatif: true,
                    Function: (s: string, item: string) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "fixerEntetes",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "groupeGlobal",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "group",
                            Facultatif: true,
                            Function: (place: iXElementHolder, valeur: string, valeurPrecedente: string) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "greaterThan",
                            Facultatif: true,
                            Function: (a: string, b: string) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "greaterThanGeneric",
                            Facultatif: true,
                            Function: (a: string) => { }
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Function,
                            NameOption: "printGroupeGlobal",
                            Facultatif: true,
                            Function: (valeur: string) => { }
                        },
                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "margin",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "masquerZoneFiltreTexte",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "pagination",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "placeHolderFiltreTexte",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderNoData",
                    Facultatif: true,
                    Function: (ici: iXElementHolder) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "sansTableauTools",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "titleIcone",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "titleLocalise",
                    NameOptionVariable: "titleVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeLabel",
                    NameOption: "titleTypeLabel",
                    ValeurDefaut: enumTypeLabel.titre,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "WithHeaderRenderNoData",
                    Facultatif: true,
                    ValeurDefaut: true
                }
            ]
        });

        // xxTexteEnrichi
        xxShowRoomContainer.AjouterElementShowroom<optionsTexteEnrichi>({
            typeElement: xxTexteEnrichi,
            NomElement: "xxTexteEnrichi",
            Description: "En cours de développement...",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxLabel({ textLocalise: "En cours de développement", type: enumTypeLabel.information });
            },
            listOption: [
            ],
            renderElement: (option) =>
            {
                return new xxLabel({ textLocalise: "En cours de développement", type: enumTypeLabel.information });
            },
        });

        // xxTooltip
        xxShowRoomContainer.AjouterElementShowroom<OptionsToolTip>({
            typeElement: xxToolTip,
            NomElement: "xxTooltip",
            Description: "Permet de créer une infobulle",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxImageTabByte({
                    tabByte: xxShowRoomImageTooltipPreview.xxTooltip,
                    typeAffichage: enumTypeImage.domImage
                })
            },
            renderElement: (option) =>
            {
                return new xxToolTip(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "isIndependenteToolTip",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "nonResponsive",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "NotAbsoluteTooltip",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onHide",
                    Facultatif: true,
                    Function: (thisTooltip: xxToolTip) => { thisTooltip.viderTooltip(); }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onShow",
                    Facultatif: true,
                    Function: (thisTooltip: xxToolTip) => { thisTooltip.setToolTip(xxShowRoomSample.divSample()).CalculPosition(); }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderCustomHeader",
                    Facultatif: true,
                    Function: (ici: iXElementHolder, thisTooltip: xxToolTip) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "titreHeaderLocalise",
                    NameOptionVariable: "titreHeaderVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "ToolTipHeigthFix",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "ToolTipWidthFix",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumXxToolTipMode",
                    ValeurDefaut: enumXxToolTipMode.OnHover,
                    NameOption: "TooltipMode",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumXxToolTipPositionHeight",
                    ValeurDefaut: enumXxToolTipPositionHeight.center,
                    NameOption: "ToolTipPositionHeightSouhaite",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "ToolTipPositionWidthNeverCenter",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "ToolTipPositionWidthSouhaite",
                    EnumType: "enumXxToolTipPositionWidth",
                    ValeurDefaut: enumXxToolTipPositionWidth.center,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "ToolTipPosition_by_Width_extremity",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "ToolTipPosition_Heigth_NeverCenter",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "TooltipStopPropagation",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "WithoutFleche",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                    NameOption: "initContent",
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.iXElement,
                    NameOption: "toolTipContent",
                    Facultatif: true
                }
            ]
        });

        // xxTreeTabControl --GANON option Onglets, addContentTreeTabControl + image base64
        xxShowRoomContainer.AjouterElementShowroom<OptionsTreeTabControl>({
            typeElement: xxTreeTabControl,
            NomElement: "xxTreeTabControl",
            Description: "Permet de créer des onglets et sous-onglets",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            IsNotFunctionnal: true,
            RenderTooltip: async () =>
            {
                return new xxImageTabByte({
                    tabByte: xxShowRoomImageTooltipPreview.xxTreeTabControl,
                    typeAffichage: enumTypeImage.domImage
                })
            },
            renderElement: (option) =>
            {
                return new xxTreeTabControl(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.CouleurHexa,
                    NameOption: "color",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "favoriteAutoSave",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
                    NameOption: "favoriteGlobalKey",
                    Facultatif: true,
                    listOption: [
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "cdperso",
                            Facultatif: true
                        },
                        {
                            TypeOption: ExxShowRoomContainerTypeOption.Texte,
                            NameOption: "key",
                            Facultatif: true
                        },
                    ],
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "modeNavigation",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "postZoneAligneeADroite",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
                    NameOptionLocalisable: "textLocalise",
                    NameOptionVariable: "textVariable",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumTypeOrientation",
                    NameOption: "typeOrientation",
                    ValeurDefaut: enumTypeOrientation.horizontal,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "withDefault",
                    Facultatif: true,
                    ValeurDefaut: false
                }
            ]
        });

        // xxViewerPDF
        xxShowRoomContainer.AjouterElementShowroom<OptionViewerPDF>({
            typeElement: xxViewerPDF,
            NomElement: "xxViewerPDF",
            Description: "Permet de lire les PDF",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            IsNotFunctionnal: true,
            RenderTooltip: async () =>
            {
                let pdf: xxViewerPDF = new xxViewerPDF({});
                await pdf.afficher(xxShowRoomSample.PDFBase64(), "sample");
                return pdf;
            },
            renderElement: (option) =>
            {
                let pdf: xxViewerPDF = new xxViewerPDF(option);
                pdf.afficheBoxer(xxShowRoomSample.PDFBase64(), "sample");
                return pdf;
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "AffichagePageWrapper",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "WithBoutonTelecharger",
                    Facultatif: true,
                    ValeurDefaut: false
                }
            ]
        });

        // xxVolet
        xxShowRoomContainer.AjouterElementShowroom<OptionVolet>({ 
            typeElement: xxVolet,
            NomElement: "xxVolet",
            Description: "Permet de créer un volet dépliable sur la page",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxVolet({ position: enumPositionVolet.bas, });
            },
            renderElement: (option) =>
            {
                return new xxVolet(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "position",
                    EnumType: "enumPositionVolet",
                    ValeurDefaut: enumPositionVolet.bas,
                    Facultatif: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onClose",
                    Function: () =>
                    {
                        /*Complète-moi*/
                    },
                    Facultatif: true
                }, {
                    TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
                    NameOption: "initContent",
                    Facultatif: true,
                },
            ]
        });

        // xxWrapPanel
        xxShowRoomContainer.AjouterElementShowroom<OptionsWrapPanel>({
            typeElement: xxWrapPanel,
            NomElement: "xxWrapPanel",
            Description: "Permet d'ajouter de placer côté à côté des éléments",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxWrapPanel({
                    initContent: [
                        new xxLabel({ textLocalise: "sample" }),
                        new IconeCs3i(enumIconeCs3i.action_copier_gauche),
                        new xxLabel({ textLocalise: "SAMPLE", type: enumTypeLabel.important }),
                        new xxBouton({ click: () => { }, textVariable: "Sample Bouton", titleVariable: "Sample Bouton" })
                    ], padding: true,
                })
            },
            renderElement: (option) =>
            {
                return new xxWrapPanel(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumAlignementHorizontalWrapPanel",
                    NameOption: "alignementHorizontable",
                    ValeurDefaut: enumAlignementHorizontalWrapPanel.Centre,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumAlignementVerticalWrapPanel",
                    NameOption: "alignementVertical",
                    ValeurDefaut: enumAlignementVerticalWrapPanel.centre,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "espaceMinimaliste",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "itemsLargeurEgale",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "padding",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "retourALaLigne",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
                    NameOption: "initContent",
                    Facultatif: true,
                }
            ]
        });

        // xxZoneModulable
        xxShowRoomContainer.AjouterElementShowroom<OptionZoneModulable>({
            typeElement: xxZoneModulable,
            Description: "Permet de créer une zone de taille modulable",
            NomElement: "xxZoneModulable",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxZoneModulable({
                    initPremiereZone: (ici) =>
                    {
                        ici.append(new xDiv({
                            class: xxShowRoomSample.classSampleDiv_Red
                        }))
                    },
                    initSecondeZone: (ici) =>
                    {
                        ici.append(new xDiv({
                            class: xxShowRoomSample.classSampleDiv_Bleu
                        }))
                    },
                })
            },
            renderElement: (option) =>
            {
                return new xxZoneModulable(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "id",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "EEtatZoneModulable",
                    NameOption: "initEtat",
                    ValeurDefaut: EEtatZoneModulable.deplie,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "initPosition",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "initPremiereZone",
                    Facultatif: true,
                    Function: (ici: iXElementHolder) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "initSecondeZone",
                    Facultatif: true,
                    Function: (ici: iXElementHolder) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "noRotation",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onDeplierDeuxiemeZone",
                    Facultatif: true,
                    Function: () => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onDeplierPremierZone",
                    Facultatif: true,
                    Function: () => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onPlierDeuxiemeZone",
                    Facultatif: true,
                    Function: () => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onPlierPremiereZone",
                    Facultatif: true,
                    Function: () => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "savePositionKey",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "titreDeuxiemeZone",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "titrePremiereZone",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "typeOrientation",
                    EnumType: "enumTypeOrientation",
                    ValeurDefaut: enumTypeOrientation.horizontal,
                    Facultatif: true
                }
            ],
        });

        // xxZoneRepliante
        xxShowRoomContainer.AjouterElementShowroom<OptionsZoneRepliable>({
            typeElement: xxZoneRepliable,
            NomElement: "xxZoneRepliable",
            Description: "Permet de créer une zone qui se replie et se déplie",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            RenderTooltip: async () =>
            {
                return new xxZoneRepliable({
                    renderDetail: () => { }, renderTitre: () => { },
                });
            },
            renderElement: (option) =>
            {
                return new xxZoneRepliable(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderDetail",
                    Facultatif: false,
                    Function: (ici: iXElementHolder) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "renderTitre",
                    Facultatif: false,
                    Function: (ici: iXElementHolder) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "class",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumXxZoneRepliableCouleurFleche",
                    NameOption: "CouleurFleche",
                    ValeurDefaut: enumXxZoneRepliableCouleurFleche.Bleu,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "fleche",
                    Facultatif: true,
                    ValeurDefaut: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    EnumType: "enumXxZoneRepliablePosition",
                    NameOption: "flechePosition",
                    ValeurDefaut: enumXxZoneRepliablePosition.droite,
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "fullTitleToggle",
                    Facultatif: true,
                    ValeurDefaut: false
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Icone,
                    NameOption: "iconeDepliePerso",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "iconeRepliePerso",
                    Facultatif: true
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "onToggle",
                    Facultatif: true,
                    Function: (plie?: boolean, refreshTitre?: () => void) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Boolean,
                    NameOption: "plie",
                    Facultatif: true,
                    ValeurDefaut: false
                }
            ]
        });

        // xxZoom --GANON option niveauxZoomPerCent number[]
        xxShowRoomContainer.AjouterElementShowroom<OptionsZoom>({ 
            typeElement: xxZoom,
            NomElement: "xxZoom",
            Description: "Permet d'afficher une icône de loupe pour zoomer",
            Groupe: ExxShowRoomContaineGoupeElement.xxElement,
            IsNotFunctionnal: true,
            RenderTooltip: async () =>
            {
                return new xxZoom({ afterZoom: () => { }, niveauxZoomPerCent: [4, 4, 5], modeAffichage: enumAffichageZoom.modeSlider, });
            },
            renderElement: (option) =>
            {
                return new xxZoom(option);
            },
            listOption: [
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Function,
                    NameOption: "afterZoom",
                    Facultatif: false,
                    Function: (zoom: number) => { }
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Enum,
                    NameOption: "modeAffichage",
                    Facultatif: true,
                    EnumType: "enumAffichageZoom",
                    ValeurDefaut: enumAffichageZoom.modeSlider
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Texte,
                    NameOption: "idTest",
                    Facultatif: true,
                },
                {
                    TypeOption: ExxShowRoomContainerTypeOption.Number,
                    NameOption: "zoomChoisi",
                    Facultatif: true
                }
            ]
        });

    }

    public static XElement_Icone_Load(): void
    {
        let getIcone: (dico: string, numberEnum: number) => IxxShowRoomContainerIconeDef =
            (dico: string, numberEnum: number) => 
            {
                let toSender: IxxShowRoomContainerIconeDef = null;
                switch (dico)
                {
                    case "IconeCs3i":
                        toSender = {
                            groupe: "iconeCs3i",
                            icone: () => new IconeCs3i(<enumIconeCs3i>numberEnum),
                            iconeName: enumIconeCs3i[numberEnum],
                            iconeValue: numberEnum,
                            iconeString: "new IconeCs3i(enumIconeCs3i." + enumIconeCs3i[numberEnum] + ")"
                        };
                        break;
                    case "IconeSvg":
                        toSender = {
                            groupe: "iconeSvg",
                            icone: () => new IconeSvg(<enumIconeSvg>numberEnum),
                            iconeName: enumIconeSvg[numberEnum],
                            iconeValue: numberEnum,
                            iconeString: "new IconeSvg(enumIconeSvg." + enumIconeSvg[numberEnum] + ")"
                        };
                        break;
                    case "IconeEmedSvg":
                        toSender = {
                            groupe: "iconeEmedSvg",
                            icone: () => new IconeSvg(<enumIconeEmedSvg>numberEnum),
                            iconeName: enumIconeEmedSvg[numberEnum],
                            iconeValue: numberEnum,
                            iconeString: "new IconeSvg(enumIconeEmedSvg." + enumIconeEmedSvg[numberEnum] + ")"
                        };
                        break;
                    case "IconeTuileSvg":
                        toSender = {
                            groupe: "iconeTuileSvg",
                            icone: () => new IconeSvg(<enumIconeTuile>numberEnum),
                            iconeName: enumIconeTuile[numberEnum],
                            iconeValue: numberEnum,
                            iconeString: "new IconeSvg(enumIconeTuile." + enumIconeTuile[numberEnum] + ")"
                        };
                        break;
                    case "IconeTuile":
                        toSender = {
                            groupe: "iconeTuile",
                            icone: () => new IconeTuile(<enumIconeTuile>numberEnum),
                            iconeName: enumIconeTuile[numberEnum],
                            iconeValue: numberEnum,
                            iconeString: "new IconeTuile(enumIconeTuile." + enumIconeTuile[numberEnum] + ")"
                        };
                        break;
                }
                return toSender;
            };

        // enumIconeCs3i
        xxShowRoomContainer.AjouterIconeShowroom(Object.keys(enumIconeCs3i).filter(key => !isNaN(parseInt(key))).map(key => getIcone("IconeCs3i", parseInt(key))));

        // enumIconeSvg
        xxShowRoomContainer.AjouterIconeShowroom(Object.keys(enumIconeSvg).filter(key => !isNaN(parseInt(key))).map(key => getIcone("IconeSvg", parseInt(key))));

        // enumIconeEmedSvg
        xxShowRoomContainer.AjouterIconeShowroom(Object.keys(enumIconeEmedSvg).filter(key => !isNaN(parseInt(key))).map(key => getIcone("IconeEmedSvg", parseInt(key))));

        // enumIconeTuileSvg
        xxShowRoomContainer.AjouterIconeShowroom(Object.keys(enumIconeTuile).filter(key => !isNaN(parseInt(key))).map(key => getIcone("IconeTuileSvg", parseInt(key))));

        // enumIconeTuile
        xxShowRoomContainer.AjouterIconeShowroom(Object.keys(enumIconeTuile).filter(key => !isNaN(parseInt(key))).map(key => getIcone("IconeTuile", parseInt(key))));
    }
}