// @ts-nocheck

interface optionsShowRoom {
    page: xxPageWrapper
}



class BoxerDetail {

    private page: xxPageWrapper;
    private boxer: xxBoxer;

    public constructor(composant: Function, options?: any) {

        //creation de la page
        this.page = new xxPageWrapper({ titleLocalise: "", withFooter: true });
        this.page.TitreVariable = <string>(composant.toString()).split("function ")[1].split("(")[0];

        //récuperation des methodes
        let methods: string[] = Object.getOwnPropertyNames(composant.prototype);
        let methodElements: Methode[] = []
        for (let method of methods) {
            methodElements.push(new Methode(method, Object.getOwnPropertyDescriptor(composant.prototype, method)));
        }

        //création du tableau
        this.page.zonePrincipale.xxTableau<Methode>({
            data: methodElements,
            columns: [
                {
                    titleVariable: "Nom",
                    renderMethod: function (place: xElementHolder, val: Methode) {
                        place.xspan({ textVariable: val.nom });
                    }
                },
                {
                    titleVariable: "Description",
                    renderMethod: function (place: xElementHolder, val: Methode) {
                        place.xspan({ textVariable: val.description });
                    }
                }
            ]
        })

        //creation du boxer
        this.boxer = new xxBoxer({ initContent: this.page });
        this.boxer.afficher();
    }

}

class Methode {
    public nom: string;
    public description: string;

    public constructor(nom: string, descriptor: PropertyDescriptor) {

        this.nom = nom;

        if (descriptor.value != undefined) {
            this.description = descriptor.value.toString().split("{")[0];
        }
        else if (descriptor.get != undefined) {
            this.description = descriptor.get.toString().split("{")[1].split("}")[0];
        }
        else {
            this.description = "?"
        }
    }
}


class ElementSR {
    public titre: string;
    public commentaire: string;
    public render: (ici: xElementHolder) => void;
    public classe?: Function;

    constructor(inT: string, inC: string, inR: (ici: xElementHolder) => void, inCl?: Function) {
        this.titre = inT;
        this.commentaire = inC;
        this.render = inR;
        this.classe = inCl;
    }
}
export class xxShowRoom implements iXElement {
    pageShowRoom: xxPageWrapper;


    get y() { return this.pageShowRoom.y; }

    constructor(options: optionsShowRoom) {

        let mythis: xxShowRoom = this;

        mythis.pageShowRoom = options.page;
        mythis.pageShowRoom.addClass('xxShowroom');

        let dataTabx: ElementSR[] = [];
        let dataTabxx: ElementSR[] = [];
        let dataDockPanel: ElementSR[] = [];
        let dataBoutonWapper2: ElementSR[] = [];
        let dataListeIcones: ElementSR[] = [];
        let dataCharts: ElementSR[] = [];
        let dataBindings: ElementSR[] = [];

        let planneur: xxPlanneur;
        let rdvs: PlanneurRDV[] = [];

        function ajouter(inT: string, inC: string, inR: (ici: xElementHolder) => void, nbX: number, classe?: Function) {
            if (nbX == 1)
                dataTabx.push(new ElementSR(inT, inC, inR, classe));
            else if (nbX == 2)
                dataTabxx.push(new ElementSR(inT, inC, inR, classe));
            else if (nbX == 4)
                dataDockPanel.push(new ElementSR(inT, inC, inR, classe));
            else if (nbX == 5)
                dataListeIcones.push(new ElementSR(inT, inC, inR, classe));
            else if (nbX == 6)
                dataCharts.push(new ElementSR(inT, inC, inR, classe));
            else if (nbX == 7)
                dataBindings.push(new ElementSR(inT, inC, inR, classe));
            else if (nbX == 8)
                dataBoutonWapper2.push(new ElementSR(inT, inC, inR, classe));

        }
        let divChartBar: xDiv = new xDiv({ id: "div_contenant_chart_bar" });
        let divChartCamembert: xDiv = new xDiv({ id: "div_contenant_chart" });
        let tableau_xElement: xxTableauWrapper<ElementSR> = new xxTableauWrapper<ElementSR>({
            id: 'showroom_tab',
            data: [],

            filtreTexte: (p, item) => { return xOutils.rechercheString(p, [item.commentaire, item.titre]); },
            columns: [{
                titleVariable: 'composant',
                renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    if (valeur.classe != undefined)
                        place.append(new xxBouton({ titleVariable: "afficher détails", textVariable: valeur.titre, click: function (cb) { cb(); new BoxerDetail(valeur.classe); } }))
                    else
                        place.xspan({ textVariable: valeur.titre });
                    place.addClass("col_composant");
                }
            },
            {
                titleVariable: 'commentaire', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.commentaire });
                    place.addClass("col_commentaire");
                }
            },
            {
                titleVariable: 'sample', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    valeur.render(place);
                    place.addClass("col_sample");
                }
            }]
        });
        let tableau_xxElement: xxTableauWrapper<ElementSR> = new xxTableauWrapper<ElementSR>({
            id: 'showroom_tab',
            data: [],
            filtreTexte: (p, item) => { return xOutils.rechercheString(p, [item.commentaire, item.titre]); },
            columns: [{
                titleVariable: 'composant',
                renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    if (valeur.classe != undefined)
                        place.append(new xxBouton({ titleVariable: "afficher détails", textVariable: valeur.titre, click: function (cb) { cb(); new BoxerDetail(valeur.classe); } }))
                    else
                        place.xspan({ textVariable: valeur.titre });
                    place.addClass("col_composant");
                }
            },
            {
                titleVariable: 'commentaire', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.commentaire });
                    place.addClass("col_commentaire");
                }
            },
            {
                titleVariable: 'sample', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    valeur.render(place);
                    place.addClass("col_sample");
                }
            }]
        });

        let tableau_DockPanel: xxTableauWrapper<ElementSR> = new xxTableauWrapper<ElementSR>({
            id: 'showroom_tab',
            data: [],
            columns: [{
                titleVariable: 'composant',
                renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.titre });
                    place.addClass("col_composant");
                }
            },
            {
                titleVariable: 'commentaire', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.commentaire });
                    place.addClass("col_commentaire");
                }
            },
            {
                titleVariable: 'sample', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    valeur.render(place);
                    place.addClass("col_sample");
                }
            }]
        });

        let tableau_BoutonWapper2: xxTableauWrapper<ElementSR> = new xxTableauWrapper<ElementSR>({
            id: 'showroom_tab',
            data: [],
            columns: [{
                titleVariable: 'composant',
                renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.titre });
                    place.addClass("col_composant");
                }
            },
            {
                titleVariable: 'commentaire', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.commentaire });
                    place.addClass("col_commentaire");
                }
            },
            {
                titleVariable: 'sample', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    valeur.render(place);
                    place.addClass("col_sample");
                }
            }]
        });

        let tableau_ListeIcones: xxTableauWrapper<ElementSR> = new xxTableauWrapper<ElementSR>({
            id: 'showroom_tab',
            data: [],
            columns: [{
                titleVariable: 'composant',
                renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.titre });
                    place.addClass("col_composant");
                }
            },
            {
                titleVariable: 'commentaire', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.commentaire });
                    place.addClass("col_commentaire");
                }
            },
            {
                titleVariable: 'sample', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    valeur.render(place);
                    place.addClass("col_sample");
                }
            }]
        });
        let tableau_charts: xxTableauWrapper<ElementSR> = new xxTableauWrapper<ElementSR>({
            id: 'showroom_charts',
            data: [],
            columns: [{
                titleVariable: 'composant',
                renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.titre });
                    place.addClass("col_composant");
                }
            },
            {
                titleVariable: 'commentaire', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.commentaire });
                    place.addClass("col_commentaire");
                }
            },
            {
                titleVariable: 'sample', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    valeur.render(place);
                    place.addClass("col_sample");
                }
            }]
        });

        let tableau_bindings: xxTableauWrapper<ElementSR> = new xxTableauWrapper({
            id: 'showroom_bindings',
            data: [],
            columns: [{
                titleVariable: 'composant',
                renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.titre });
                    place.addClass("col_composant");
                }
            },
            {
                titleVariable: 'commentaire', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    place.xspan({ textVariable: valeur.commentaire });
                    place.addClass("col_commentaire");
                }
            },
            {
                titleVariable: 'sample', renderMethod: function (place: xElementHolder, valeur: ElementSR, lw: xxTableauLigneWrapper<ElementSR>) {
                    valeur.render(place);
                    place.addClass("col_sample");
                }
            }]
        })

        // Création des onglets de navigation
        let optionsTabPage: OptionsTabControl =
        {
            class: "xxTabControlShowroom",
            tabChange: function (i: xxTabItem) {
                xOutils.afficherMessageAlertify("changement d'onglet", ETypeAlertify.log);
            },
            initElements: [
                {
                    textVariable: 'xElements',
                    addContent: function (ici: xElementHolder) {
                        ici.append(tableau_xElement);
                    }
                },
                {
                    textVariable: 'xxElements',
                    addContent: function (ici: xElementHolder) {
                        ici.append(tableau_xxElement);

                        //On attend le rendu des cellules du tableau puis on lance le rendu des rdv du xxPlanneur
                        setTimeout(function () {
                            planneur.ajouterRdv(rdvs);
                        }, 0);
                    }
                },
                {
                    textVariable: 'Charts',
                    addContent: function (ici: xElementHolder) {
                        ici.append(tableau_charts);

                        initChart(divChartCamembert, divChartBar);
                    }
                },
                {
                    textVariable: 'DockPanel',
                    addContent: function (ici: xElementHolder) {
                        ici.append(tableau_DockPanel)
                    }
                },
                {
                    textVariable: 'BoutonWapper2',
                    addContent: function (ici: xElementHolder) {
                        ici.append(tableau_BoutonWapper2);
                    }
                },
                {
                    textVariable: 'Liste d\'icônes',
                    addContent: function (ici: xElementHolder) {
                        ici.append(tableau_ListeIcones)
                    }
                },
                {
                    textVariable: 'Bindings',
                    addContent: ici => {
                        ici.append(tableau_bindings);
                    }
                }

            ]
        }


        mythis.pageShowRoom.zonePrincipale.xxTabControl(optionsTabPage);

        let ct: xxRadioButton<string>;
        let bindText = new BindableObject<string>();
        let o: OptionsRadioButton<string>;
        o = {
            typeOrientation: enumTypeOrientation.horizontal,
            valueChange: function (val: string) {
                xOutils.afficherMessageAlertifyLog(val); ct.ajouterItems([new itemRadioButton<string>({ icone: new IconeP12(enumIconeP12.action_admission), valeur: "ajout", libelleVariable: "ajout" }),
                ]);
            },
            initElements: [

                { icone: new IconeP12(enumIconeP12.action_ajouter), espaceMinimaliste: true,  valeur: "vanille" },
                { icone: new IconeP12(enumIconeP12.action_admission), valeur: "noix de coco", libelleVariable: "choix coco" },

                { icone: new IconeP12(enumIconeP12.action_admission), valeur: "chocolat noir", libelleVariable: "choix chocolat noir" },
                { valeur: "chocolat au lait", libelleVariable: "choix chocolat au lait" },

                { icone: new IconeP12(enumIconeP12.action_ajouter), valeur: "banane", libelleVariable: "choix chocolat" },
                { icone: new IconeP12(enumIconeP12.action_annuler), valeur: "fraise" },
                { valeur: '', binding: { texteVariable: bindText } }]

        };


        //**************** xElement ****************//

        ajouter('xCouleur', 'conteneur avec option de couleur', function (ici: xElementHolder) {
            class Couleur {
                id: number;
                codeCouleur: string;
                pastelle: boolean;
            }

            let mesCouleur: Couleur[] = [];
            mesCouleur.push({ id: 0, codeCouleur: '283F55', pastelle: false });
            mesCouleur.push({ id: 1, codeCouleur: '108632', pastelle: false });
            mesCouleur.push({ id: 2, codeCouleur: '800C7D', pastelle: false });
            mesCouleur.push({ id: 3, codeCouleur: '550355', pastelle: true });
            mesCouleur.push({ id: 4, codeCouleur: '7F5F10', pastelle: false });
            mesCouleur.push({ id: 5, codeCouleur: 'AB7DBB', pastelle: true });


            let plop: xxListeDeroulante<Couleur> = new xxListeDeroulante<Couleur>({
                donnees: mesCouleur,
                renderSelected: function (ici, maCouleur, cbOuvrir) {
                    ici.append(new xCouleur({
                        //textVariable: 'hello world',
                        codeCouleur: maCouleur.codeCouleur,
                        title: 'test de couleur',
                        click: function (cb) {
                            cb();
                            cbOuvrir(maCouleur);
                        }
                    }));
                },
                renderSelectItem: function (ici, maCouleur, cbCoisir) {
                    ici.append(new xCouleur({
                        //textVariable: 'hello world',
                        codeCouleur: maCouleur.codeCouleur,
                        title: 'test de couleur',
                        click: function (cb) {
                            cb();
                            cbCoisir(maCouleur);
                        }
                    }));
                },
                selected: function (maSelection) {
                    alert("changement de couleur:" + maSelection.id);
                },
                defaultValue: mesCouleur[0]
            });
            let labelComboCouleur: xxLabelContainer = new xxLabelContainer({
                textVariable: 'sélectionner une couleur',
                initContent: plop
            });
            ici.append(labelComboCouleur);

            let it: xCouleur = new xCouleur({
                //textVariable: 'hello world',
                codeCouleur: '800C7D',
                title: 'test de couleur',
                //click: function ()
                //{
                //    xOutils.afficherMessageAlertify("hello world", ETypeAlertify.success);
                //}
            });
            let labelCouleurSimple: xxLabel = new xxLabel({
                textVariable: 'affichage de couleur',
            });

            let wrappanelCouleurSimple = new xxWrapPanel({
                initContent: [
                    labelCouleurSimple,
                    it,
                    new xxBouton({
                        textVariable: "Changer Couleur",
                        titleVariable: "Changer",
                        click: cb => {
                            cb();
                            it.changerCouleur("7F5F10");
                        }
                    })
                ]
            })




            ici.append(wrappanelCouleurSimple);
        }, 1, xCouleur);

        ajouter('xinput', 'Champ de saisie texte', function (ici: xElementHolder) {
            let it: xDiv = new xDiv();

            ici.append(new xInputText({

                ValueChange: function (valeur: string) {
                    it.y.textContent = valeur;
                    console.log(valeur, parseFloat(valeur));
                },
                value: 'texte par defaut',

            })).append(it);

        }, 1, xInputText);

        ajouter('xinput', 'Champ de saisie texte (autochange:true)', function (ici: xElementHolder) {
            let it: xDiv = new xDiv();
            ici.xinputText({
                value: 'test',
                autoChange: true,
                ValueChange: function (valeur: string) {
                    it.y.textContent = valeur;
                }
            }).append(it);
        }, 1, xInputText);

        ajouter('xinput', 'Champ de saisie textarea (multiline:true)', function (ici: xElementHolder) {
            let it: xDiv = new xDiv();
            ici.xinputText({
                value: 'test',
                autoChange: true,
                multiline: true,
                ValueChange: function (valeur: string) {
                    it.y.textContent = valeur;
                }
            }).append(it);
        }, 1, xInputText);

        ajouter('xinput', 'Champ de saisie texte avec autocomplete', function (ici: xElementHolder) {
            let it: xDiv = new xDiv();
            ici.xxInputIntellisense({
                value: 'test',
                autoChange: true,
                listeAutoComplete: ['coucou', 'coucou tout le monde', 'test1', 'test2', 'test3'],
                ValueChange: function (valeur: string) {
                    it.y.textContent = valeur;
                },
                nbLigneAfficher: 1
            }).append(it);
        }, 1, xxInputIntellisense);

        ajouter('xinput', 'Champ de saisie numérique', function (ici: xElementHolder) {
            let inu: xDiv = new xDiv({});

            ici.xinputText({
                numeric: {
                },
                ValueChange: function (valeur: number) {
                    inu.y.textContent = '' + valeur;
                }
            }).append(inu);
        }, 1, xInputText);

        ajouter('xinputFile', 'Champ de saisie de fichier', function (ici: xElementHolder) {
            let it: xDiv = new xDiv();
            let f = new xInputFile({
                ValueChange: function (valeur: File, binary: string) {
                    it.asHolder.empty().xxStackPanel({
                        initContent: [
                            new xxLabelContainer({
                                textVariable: "fichier",
                                initContent: new xSpan({ textVariable: valeur.name })
                            }),
                            new xxLabelContainer({
                                textVariable: "taille",
                                initContent: new xSpan({ textVariable: "" + valeur.size })
                            }),
                            new xxLabelContainer({
                                textVariable: "type",
                                initContent: new xSpan({ textVariable: valeur.type })
                            })
                        ]
                    });
                },

            });
            ici.append(f).append(it);

        }, 1, xInputFile);

        ajouter('xinputFile', 'accept: ".txt"', function (ici: xElementHolder) {
            let it: xDiv = new xDiv();
            let f = new xInputFile({
                ValueChange: function (valeur: File, binary: string) {
                    it.asHolder.empty().xxStackPanel({
                        initContent: [
                            new xxLabelContainer({
                                textVariable: "fichier",
                                initContent: new xSpan({ textVariable: valeur.name })
                            }),
                            new xxLabelContainer({
                                textVariable: "taille",
                                initContent: new xSpan({ textVariable: "" + valeur.size })
                            }),
                            new xxLabelContainer({
                                textVariable: "type",
                                initContent: new xSpan({ textVariable: valeur.type })
                            })
                        ]
                    });
                },
                accept: ".txt"

            });

            ici.append(f).append(it);

        }, 1, xInputFile);

        ajouter('xinputTime', 'Champ de saisie texte de type heure', function (ici: xElementHolder) {
            ici.append(new xInputTime({
                value: new xTime(15, 45),
                ValueChange: function (a: xTime) { xOutils.afficherMessageAlertifySuccess(a.getString()) }
            }));

        }, 1, xInputTime);

        ajouter('xinputTime', 'Champ de saisie texte de type heure (typeAffichage: enumTypeAffichePicker.SansPicker)', function (ici: xElementHolder) {
            ici.append(new xInputTime({
                typeAffichage: enumTypeAffichePicker.SansPicker,
                value: new xTime(11, 25),
                ValueChange: function (a: xTime) { xOutils.afficherMessageAlertifySuccess(a.getString()) }
            }));

        }, 1, xInputTime);

        ajouter('xinputTime', 'Champ de saisie texte de type heure (typeAffichage: enumTypeAffichePicker.InLine)', function (ici: xElementHolder) {
            ici.append(new xInputTime({
                typeAffichage: enumTypeAffichePicker.InLine,
                value: new xTime(7, 5),
                ValueChange: function (a: xTime) { xOutils.afficherMessageAlertifySuccess(a.getString()) }
            }));

        }, 1, xInputTime);

        ajouter('xinputTime', 'Avec bouton valuechange', function (ici: xElementHolder) {
            ici.append(new xInputTime({
                btnValiderChange: true,
                value: new xTime(7, 5),
                ValueChange: function (a: xTime) { xOutils.afficherMessageAlertifySuccess(a.getString()) }
            }));

        }, 1, xInputTime);


        ajouter('xinputDate', 'Champ de saisie texte de type date', function (ici: xElementHolder) {

            let id = new xDiv();
            let id2 = new xDiv();

            let inputPicker = new xInputDate({
                value: DateSerialisable.Now(),
                ValueChange: function (resultat: DateSerialisable) {
                    id.y.textContent = "number ( préférable ):" + resultat.MaDateLong;
                    id2.y.textContent = "en string:" + DateSerialisable.toLocalDateStringComplete(resultat) //resultat.toLocaleDateString();

                }
            });

            ici.append(inputPicker).append(id).append(id2);
        }, 1, xInputDate);

        ajouter('xinputDate', 'Champ de saisie graphique de type date (typeAffichage:enumTypeAffichePicker.InLine)', function (ici: xElementHolder) {

            let id: xDiv = new xDiv();
            let id2: xDiv = new xDiv();
            let inputPicker: xInputDate = new xInputDate({

                value: DateSerialisable.Now(),
                AvecBoutonToday: true,
                AvecChoixAnnee: true,
                AvecNumSemaine: true,
                ValueChange: function (resultat: DateSerialisable) {
                    id.y.textContent = "number ( préférable ):" + resultat.MaDateLong;
                    id2.y.textContent = "en string:" + DateSerialisable.toLocalDateStringComplete(resultat)//resultat.toLocaleDateString();

                },
                typeAffichage: enumTypeAffichePicker.InLine
            });

            ici.append(inputPicker).append(id).append(id2);
        }, 1, xInputDate);


        ajouter('xinputDate', 'Champ de saisie graphique de type date (typeAffichage:enumTypeAffichePicker.SansPicker)', function (ici: xElementHolder) {

            let id: xDiv = new xDiv();
            let id2: xDiv = new xDiv();
            let inputPicker: xInputDate = new xInputDate({

                value: DateSerialisable.Now(),
                AvecBoutonToday: true,
                AvecChoixAnnee: true,
                AvecNumSemaine: true,
                ValueChange: function (resultat: DateSerialisable) {
                    id.y.textContent = "number ( préférable ):" + resultat.MaDateLong;
                    id2.y.textContent = "en string:" + DateSerialisable.toLocalDateStringComplete(resultat) //resultat.toLocaleDateString();

                },
                typeAffichage: enumTypeAffichePicker.SansPicker
            });

            ici.append(inputPicker).append(id).append(id2);
        }, 1, xInputDate);


        ajouter('xinputDateAndTime', 'Champ de saisie texte de type date/heure', function (ici: xElementHolder) {

            let dateInit: Date = new Date();

            let id = new xxLabel({ textVariable: "" });
            let inputAddDate = new xInputDateAndTime({
                value: null,
                AvecBoutonToday: true,
                ValueChange: function (a: DateSerialisable) { id.changerTextVariable(DateSerialisable.toLocalDateStringComplete(a)); } // a.toLocaleDateString() + " " + a.toLocaleTimeString()); }
            });
            ici.append(inputAddDate).append(id);

        }, 1, xInputDateAndTime);

        ajouter('xinputDateAndTime', 'Avec code jour', function (ici: xElementHolder) {

            let dateInit: Date = new Date();

            let id = new xxLabel({ textVariable: "" });
            let inputAddDate = new xInputDateAndTime({
                value: null,
                AvecCodeJour: true,
                AvecBoutonToday: true,
                ValueChange: function (a: DateSerialisable) { id.changerTextVariable(DateSerialisable.toLocalDateStringComplete(a)); } //a.toLocaleDateString() + " " + a.toLocaleTimeString()); }
            });
            ici.append(inputAddDate).append(id);

        }, 1, xInputDateAndTime);

        ajouter('xinputDateAndTime', 'Champ de saisie texte de type date/heure (typeAffichage: enumTypeAffichePicker.SansPicker,)', function (ici: xElementHolder) {

            let dateInit: DateSerialisable = DateSerialisable.FactoryByNumber(1984, 4, 13, 14, 53);
            //dateInit.setDate(13);
            //dateInit.setMonth(4);
            //dateInit.setFullYear(1984);
            //dateInit.setHours(14, 53);  

            let id = new xxLabel({ textVariable: "" });
            let inputAddDate = new xInputDateAndTime({
                typeAffichage: enumTypeAffichePicker.SansPicker,
                value: dateInit,
                ValueChange: function (a: DateSerialisable) { id.changerTextVariable(DateSerialisable.toLocalDateStringComplete(a)); }// a.toLocaleDateString() + " " + a.toLocaleTimeString()); }
            });
            ici.append(inputAddDate).append(id);

        }, 1, xInputDateAndTime);

        ajouter('xinputDateAndTime', 'Champ de saisie texte de type date/heure (typeAffichage: enumTypeAffichePicker.InLine)', function (ici: xElementHolder) {

            let dateInit: DateSerialisable = DateSerialisable.FactoryByNumber(1984, 4, 13, 14, 53);
            //let dateInit: Date = new Date();
            //dateInit.setDate(13);
            //dateInit.setMonth(4);
            //dateInit.setFullYear(1984);
            //dateInit.setHours(14);
            //dateInit.setMinutes(53);

            let id = new xxLabel({ textVariable: "" });
            let inputAddDate = new xInputDateAndTime({
                typeAffichage: enumTypeAffichePicker.InLine,
                value: dateInit,
                ValueChange: function (a: DateSerialisable) { id.changerTextVariable(DateSerialisable.toLocalDateStringComplete(a)) }//a.toLocaleDateString() + " " + a.toLocaleTimeString()); }
            });
            ici.append(inputAddDate).append(id);

        }, 1, xInputDateAndTime);


        ajouter('xinputDateAndTime', 'autochange: false', function (ici: xElementHolder) {
            let dateInit: DateSerialisable = DateSerialisable.FactoryByNumber(1984, 4, 13, 14, 53);
            //let dateInit: Date = new Date();
            //dateInit.setDate(13);
            //dateInit.setMonth(4);
            //dateInit.setFullYear(1984);
            //dateInit.setHours(14);
            //dateInit.setMinutes(53);

            let id = new xxLabel({ textVariable: "" });
            let inputAddDate = new xInputDateAndTime({
                value: dateInit,
                btnValiderChange: true,
                ValueChange: function (a: DateSerialisable) { id.changerTextVariable(DateSerialisable.toLocalDateStringComplete(a)); } //a.toLocaleDateString() + " " + a.toLocaleTimeString());
            });
            ici.append(inputAddDate).append(id);

        }, 1, xInputDateAndTime);

        ajouter('xinputCheckBox', 'Champ de saisie de type checkbox', function (ici: xElementHolder) {
            let i = new xDiv();
            let c = new xInputCheckBox({

                ValueChange: function (valeur: boolean) {
                    i.y.textContent = '' + valeur;
                }
            });
            ici.append(c);
            ici.append(i);


        }, 1, xInputCheckBox);

        ajouter('xImg', 'Permet d\'afficher une image via son URL', (ici: xElementHolder) => {
            let img = new xImg({
                src: "https://fr.wikipedia.org/wiki/Image#/media/Fichier:Image_created_with_a_mobile_phone.png",
                class: "test_class"
            })

            ici.append(img);
        }, 1, xImg)


        /*     ajouter('logos', 'Image en base 64', function (ici: xElementHolder) {
                 let monLogo: string;
                 let a = new xDiv();
                 CacheEmed.getdicoImages(pageShowRoom).then(function (dico: Dictionnaire<string>) {
                     ici.append(a);
 
                     a.asHolder.append($("<img src='data:image/png;base64, " + dico["*"] + "'/>").toHolder());
                 }
                 )
 
             }, 1);*/

        //**************** End xElement ****************//


        //**************** xxElement ****************//

        ajouter('xxGrid', 'xxGrid', function (ici: xElementHolder) {

            let g = new xxGrid({ colonnes: ['1', '2', '3', '1'], lignes: ['1', '2', '1'] });
            let div1 = new xxGridItem({
                class: "xxgriditem1",
                rowStart: 1,
                colStart: 4,

                nbCols: 2,
                content: new xxLabel({ textVariable: 'un' })
            });
            let div2 = new xxGridItem({
                class: "xxgriditem2",
                rowStart: 2,
                colStart: 1,

                nbCols: 1,
                content: new xxLabel({ textVariable: 'deux' })
            });
            let div3 = new xxGridItem({
                class: "xxgriditem3",
                rowStart: 3,
                colStart: 1,


                content: new xxLabel({ textVariable: 'trois' })
            });
            let div4 = new xxGridItem({
                class: "xxgriditem4",
                rowStart: 4,
                colStart: 1,

                content: new xxLabel({ textVariable: 'quatre' })
            });
            let div5 = new xxGridItem({
                class: "xxgriditem5",
                rowStart: 5,
                colStart: 1,

                nbCols: 4,
                content: new xxLabel({ textVariable: 'cinq' })
            });
            let div6 = new xxGridItem({
                class: "xxgriditem6",
                rowStart: 2,
                colStart: 2,
                nbRows: 4,

                content: new xxLabel({ textVariable: 'six' })
            });
            g.append([div1, div2, div3, div4, div5, div6]);
            ici.append(g);

        }, 2, xxGrid);

        ajouter('xxContainerEvent', 'Conteneur avec gestion des événements (click, survol, click droit)', function (ici: xElementHolder) {
            let container: xxContainerEvent = new xxContainerEvent({
                initContent: new xxLabel({ textVariable: "lorem ipsum dolor sit amet consegetur" }),
                onClick: function (cb) {
                    cb();
                    xOutils.afficherMessageAlertify("Click détecté !", ETypeAlertify.log);
                },
                onRightClick: function (cb) {
                    cb();
                    container.asHolder.toggleClass("red");
                },
                onMouseOver: function () {
                    container.asHolder.addClass("hover");
                },
                onMouseOut: function () {
                    container.asHolder.removeClass("hover");
                },
                class: "containerEventShowcase"
            });

            ici.append(container);

        }, 2, xxContainerEvent);

        ajouter('xxListCheckBox', 'Liste à choix multiples, renvoie la liste des éléments sélectionnés', function (ici: xElementHolder) {

            class Ingredient {
                public Nom: string;
                public id: string;

                constructor(nom: string, id: string) {
                    this.Nom = nom;
                    this.id = id;
                }
            }

            let donnees: Ingredient[] = [];
            donnees.push(new Ingredient("Sucre", "su"));
            donnees.push(new Ingredient("Farine", "f"));
            donnees.push(new Ingredient("Beurre", "b"));
            donnees.push(new Ingredient("Chocolat", "c"));
            donnees.push(new Ingredient("Levure", "l"));
            donnees.push(new Ingredient("Sel", "se"));

            let donnees2: Ingredient[] = [];
            donnees2.push(donnees[2]);

            let list = new xxListCheckBox<Ingredient>({
                data: donnees,
                equals: function (a, b) { return a.id == b.id },
                renderItem: function (ici, item) {

                    ici.append(new xxLabel({ textVariable: item.Nom }));
                },
                renderTitre: function (ici) {
                    ici.append(new xxLabel({ textVariable: "Ingrédients", type: enumTypeLabel.titre, class: "titre" }));
                },
                valueChange: function (liste) {
                    let elts: string = "";
                    liste.forEach(function (value: Ingredient, index: number) {
                        elts += value.id + " - " + value.Nom;
                    });

                    xOutils.afficherMessageAlertify("Elément(s) sélectionné(s) : " + elts, ETypeAlertify.log);
                },
                dataSelected: donnees2,
                withTous: true
            });

            ici.append(list);

        }, 2, xxListCheckBox);

        ajouter('xxRadioButton', 'Boutons radio par défaut en mode horizontal', function (ici: xElementHolder) {
            ct = new xxRadioButton(o);
            ici.append(ct);
            ici.append(new xInputText({ binding: { value: bindText } }));
            //ct.setValue("noix de coco");

        }, 2, xxRadioButton);

        ajouter('xxRadioButton', 'Boutons radio en mode vertical avec présélection', function (ici: xElementHolder) {
            o.typeOrientation = enumTypeOrientation.vertical;
            o.initElements.push({ icone: new IconeP12(enumIconeP12.action_apercu), preselectionne: true, libelleVariable: 'test', valeur: 'homard' })
            ici.xxRadioButton(o);

        }, 2, xxRadioButton);



        ajouter('xxRadioButton', 'Boutons avec displayOnlySelected true vertical', function (ici: xElementHolder) {
            o.typeOrientation = enumTypeOrientation.vertical;
            o.displayOnlySelected = true;

            o.initElements = [
                { libelleVariable: '1', class: 'couleur1', valeur: '1' },
                { libelleVariable: '2', class: 'couleur2', valeur: '2' },
                { libelleVariable: '3', class: 'couleur3', valeur: '3' },
                { libelleVariable: '4', class: 'couleur4', valeur: '4' },
                { libelleVariable: '5', class: 'couleur5', valeur: '5' }
            ];


            ici.xxRadioButton(o);

        }, 2, xxRadioButton);

        ajouter('xxRadioButton', 'Boutons avec displayOnlySelected true horizontal', function (ici: xElementHolder) {
            o.typeOrientation = enumTypeOrientation.horizontal;
            o.displayOnlySelected = true;

            o.initElements = [
                { libelleVariable: '1', class: 'couleur1', valeur: '1' },
                { libelleVariable: '2', class: 'couleur2', valeur: '2' },
                { libelleVariable: '3', class: 'couleur3', valeur: '3' },
                { libelleVariable: '4', class: 'couleur4', valeur: '4' },
                { libelleVariable: '5', class: 'couleur5', valeur: '5' }
            ];


            ici.xxRadioButton(o);

        }, 2, xxRadioButton);


        ajouter('xxRadioButton', 'Boutons avec displayOnlySelected true horizontal avec présélection', function (ici: xElementHolder) {
            o.typeOrientation = enumTypeOrientation.horizontal;
            o.displayOnlySelected = true;

            o.initElements = [{ libelleVariable: '1', class: 'couleur1', valeur: '1' },
            { libelleVariable: '2', class: 'couleur2', valeur: '2' },
            { libelleVariable: '3', class: 'couleur3', valeur: '3' },
            { libelleVariable: '4', class: 'couleur4', valeur: '4', preselectionne: true },
            { libelleVariable: '5', class: 'couleur5', valeur: '5' }];


            ici.xxRadioButton(o);

        }, 2, xxRadioButton);


        ajouter('xxRadioButton', 'Boutons en mode Boutons classiques', function (ici: xElementHolder) {
            o.typeBouton = ETypeBouton.boutonClassique;
            o.displayOnlySelected = false;

            o.initElements = [
                { libelleVariable: 'Option 1', class: 'option1', valeur: '1' },
                { libelleVariable: 'Option 2', class: 'option2', valeur: '2' },
                { libelleVariable: 'Option 3', class: 'option3', valeur: '3' },
                { libelleVariable: 'Option 4', class: 'option4', valeur: '4', preselectionne: true },
                { libelleVariable: 'Option 5', class: 'option5', valeur: '5' }
            ];


            ici.xxRadioButton(o);

        }, 2, xxRadioButton);

        ajouter('xxInputUploadImage', 'upload image mode selfie', function (ici: xElementHolder) {
            let image = new xxImageTabByte({ typeAffichage: enumTypeImage.domImage, tabByte: '' });

            let a = new xxInputUploadImage({
                appareilPhoto: "selfie",
                ValueChange: s => { image.SetTabByte(s, enumTypeImage.domImage); }
            });

            ici.append(a).append(image);
        }, 2, xxInputUploadImage);



        ajouter('xxChoixCouleur (nuancier)', 'choix de couleur via nuancier prédéfini', function (ici: iXElementHolder) {
            ici.append(new xxChoixCouleur({ choixCouleurLibre: false, value: '000000', ValueChange: function (s) { ici.y.style.backgroundColor = '#' + s; } }))
        }, 2, xxChoixCouleur);

        ajouter('xxChoixCouleur (libre)', 'choix de couleur libre via <input type="color"> natif', function (ici: iXElementHolder) {
            let binding = new BindableObject();
            binding.Value = 'ff3333';
            ici.append(new xxChoixCouleur({
                choixCouleurLibre: true,
                value: 'ff3333',
                ValueChange: function (s) { ici.y.style.backgroundColor = '#' + s; },
                binding: { value: binding }
            }));
        }, 2, xxChoixCouleur);
        let binding2emeOnglet = new BindableObject<string>();
        let input2emeOnglet = new xInputText({ binding: { value: binding2emeOnglet } });
        let optionsTab: OptionsTabControl =
        {
            tabChange: function (i: xxTabItem) {
                xOutils.afficherMessageAlertify("changement d'onglet", ETypeAlertify.log);
            },
            initElements: [
                {
                    textVariable: 'test onglet 1',
                    addContent: function (ici: xElementHolder) {
                        ici.xxLabel({ textVariable: 'ceci est le 1er onglet' });
                    }
                },
                {
                    textVariable: 'test onglet 2',
                    addContent: function (ici: xElementHolder) {
                        ici.xxLabel({ textVariable: 'ceci est le 2eme onglet' });
                    }
                },
                {
                    textVariable: 'test onglet 3r',
                    addContent: function (ici: xElementHolder) {
                        ici.xxLabel({ textVariable: 'ceci est le 3eme onglet' });
                    }
                },
                {
                    //textVariable: 'test onglet 2',
                    addContent: function (ici: xElementHolder) {
                        ici.xxLabel({ textVariable: 'ceci est le 2eme onglet' });
                        ici.append(input2emeOnglet);
                    },
                    binding: { textVariable: binding2emeOnglet }
                }
            ]
        }

        ajouter('xxTabControl', 'Zone d\'affichage avec onglets mode horizontal - Style arrondi', function (ici: xElementHolder) {
            optionsTab.styleArrondi = true;
            optionsTab.typeOrientation = enumTypeOrientation.horizontal;
            optionsTab.initElements.push({
                icone: new IconeP12(enumIconeP12.action_desepingler),
                textVariable: 'test onglet 3', addContent: function (ici: xElementHolder) {
                    ici.xxLabel({ textVariable: 'ceci est le 3eme onglet' });
                }
            }
            );
            ici.xxTabControl(optionsTab);


        }, 2, xxTabControl);

        ajouter('xxTabcontrol', 'Zone d\'affichage avec onglets mode vertical', function (ici: xElementHolder) {

            optionsTab.typeOrientation = enumTypeOrientation.vertical;
            ici.xxTabControl(optionsTab);

        }, 2, xxTabControl);

        ajouter('xxTabControl', 'onglets que l\'on peut fermer', function (ici: xElementHolder) {

            let tabcontrol: xxTabControl = new xxTabControl({
                typeOrientationBouton: enumTypeOrientation.horizontal,
                withDefault: true,
                styleArrondi: true,
                modeFermerOnglets: true
            });


            tabcontrol.ajouterOnglet({
                addContent: function (ici) {
                    ici.append(new xxLabel({ textVariable: "Onglet A" }));
                },
                textVariable: "Onglet A",
                defaultTab: true,
                onSelect: function () {

                },
                onClose: function (opt) {

                }
            })
                .ajouterOnglet({
                    addContent: function (ici) {
                        ici.append(new xxLabel({ textVariable: "Onglet B" }));
                    },
                    textVariable: "Onglet B",
                    defaultTab: true,
                    onSelect: function () {

                    },
                    onClose: function (opt) {

                    }
                })
                .ajouterOnglet({
                    addContent: function (ici) {
                        ici.append(new xxLabel({ textVariable: "Onglet C" }));
                    },
                    textVariable: "Onglet C",
                    defaultTab: true,
                    onSelect: function () {

                    },
                    onClose: function (opt) {

                    }
                });

            ici.append(tabcontrol);

        }, 2, xxTabControl);

        ajouter('xxTabControl', 'Bouton d\'ajout d\'onglets prédéfinis', function (ici: xElementHolder) {
            let onglets: OptionsTabItem[] = [{
                addContent: function (ici) {
                },
                textVariable: "Onglet A",
                onSelect: function () {

                },
                onClose: function (opt) {

                },
                id: "Onglet A"

            },
            {
                addContent: function (ici) {
                },
                textVariable: "Onglet B",
                onSelect: function () {

                },
                onClose: function (opt) {

                },
                id: "Onglet B"

            },
            {
                addContent: function (ici) {
                },
                textVariable: "Onglet C",
                onSelect: function () {

                },
                onClose: function (opt) {

                },
                id: "Onglet C"

            },
            ]
            let tabcontrol: xxTabControl = new xxTabControl({
                typeOrientationBouton: enumTypeOrientation.horizontal,
                ongletAjout: {
                    textAjoutLocalise: "Nouvel onglet",
                    listeOngletsAjout: onglets
                },
                modeFermerOnglets: true,
                initElements: [onglets[0]]

            });

            ici.append(tabcontrol);

        }, 2, xxTabControl);


        ajouter('xxTreeTabControl', 'Gestion d\'un menu', function (ici: xElementHolder) {
            let treeTabControl: xxTreeTabControl = new xxTreeTabControl({
                class: "MenuEmed",
                onglets:
                    [{
                        textVariable: 'Onglet 1',
                        onglets: [{
                            textVariable: 'Sous Onglet 1',
                            addContent: function (icimeme: xElementHolder) {
                                icimeme.append(new xIFrame({ src: '' }));
                            }
                        },
                        {
                            textVariable: 'Sous Onglet 2',
                            addContent: function (icimeme: xElementHolder) {
                                icimeme.append(new xIFrame({ src: '' }));
                            }
                        }
                        ]
                    },
                    {
                        textVariable: 'Onglet 2',
                        addContent: function (icimeme: xElementHolder) {
                            icimeme.append(new xIFrame({ src: '' }));
                        }

                    },
                    {
                        textVariable: 'Onglet 3',
                        onglets: [{
                            textVariable: 'Sous Onglet 1',
                            addContent: function (icimeme: xElementHolder) {
                                icimeme.append(new xIFrame({ src: '' }));
                            }
                        },
                        {
                            textVariable: 'Sous Onglet 2',
                            addContent: function (icimeme: xElementHolder) {
                                icimeme.append(new xIFrame({ src: '' }));
                            }
                        }
                        ]
                    }]
            });
            ici.append(treeTabControl);
        }, 2, xxTreeTabControl);


        ajouter('xxBoxer', 'Affichage d\'une fenêtre isolée dans un écran, le click en dehors de cette fenêtre ferme le xxBoxer', function (ici: xElementHolder) {
            let myBox: xxBoxer = new xxBoxer({

                afterClose: function () { alert('afterClose'); },
                beforeShow: function () { alert('beforeShow'); },
                initContent: new xxLabel({ textVariable: 'test' })
            });

            ici.append(new xxBouton({ textVariable: 'ouvrir', titleVariable: 'ouvrir', click: function (cb) { myBox.afficher(); cb(); } }));
            ;
        }, 2, xxBoxer);

        ajouter('xxSpecificationCreneau', 'Affichage d\'un boxer de filtrage des créneaux à rechercher', function (ici: xElementHolder) {
            let specCreneau: xxSpecificationCreneaux = new xxSpecificationCreneaux(function (o: OptionsInfosCreneaux) { });

            ici.append(specCreneau);
            ;
        }, 2, xxBoxer);

        ajouter('xxBloqueEcran', "Le xxBloqueEcran bloque tout l'écran", function (ici: xElementHolder) {
            ici.append(new xxBouton({
                titleVariable: 'ouvrir', textVariable: 'ouvrir', click: function (cb) {
                    let myBox: xxBloqueEcran = new xxBloqueEcran({
                        textVariable: "Ecran bloqué , pas de panique on debloque dans 10 secondes..."
                    }); cb(); setTimeout(function () { myBox.fermer(); }, 10000);
                }
            }));
            ;
        }, 2, xxBloqueEcran);

        ajouter('xxBoxer', 'Le click en dehors de cette fenêtre ne ferme pas le xxBoxer (mode:modal)', function (ici: xElementHolder) {
            let myBox: xxBoxer = new xxBoxer({
                modal: true,
                //afterClose: function () { alert('afterClose'); },
                //beforeShow: function () { alert('beforeShow'); },

                initContent: new xxLabel({ textVariable: 'test' })
            });

            ici.append(new xxBouton({ titleVariable: 'ouvrir', textVariable: 'ouvrir', click: function (cb) { myBox.afficher(); cb(); } }));
            ;
        }, 2, xxBoxer);

        ajouter('xxBoxer', 'Exemple d\'une iframe avec préchargement', function (ici: xElementHolder) {
            let myBox: xxBoxer = new xxBoxer({
                initContent: new xIFrame({ src: 'https://www.google.fr' })
            });

            ici.append(new xxBouton({ titleVariable: 'ouvrir', textVariable: 'ouvrir', click: function (cb) { myBox.afficher(); cb(); } }));
            ;
        }, 2, xxBoxer);

        ajouter('xxBoxer', 'Exemple d\'une iframe qui se charge à l\'ouverture du boxer', function (ici: xElementHolder) {
            let myBox: xxBoxer = new xxBoxer({
                beforeShow: function (ceBoxer: xxBoxer) {
                    ceBoxer.vider();
                    ceBoxer.ajouterContenu(new xIFrame({ src: 'https://www.google.fr' }));
                }
            });

            ici.append(new xxBouton({ titleVariable: 'ouvrir', textVariable: 'ouvrir', click: function (cb) { myBox.afficher(); cb(); } }));
            ;
        }, 2, xxBoxer);

        ajouter('xxBoxer', 'Boxer avec choix de la taille (ex: m ) (enum : s, m , l)', function (ici: xElementHolder) {
            let myBox: xxBoxer = new xxBoxer({
                initContent: new xxLabel({
                    textVariable: 'taille m'
                }),
                tailleBoxer: enumBoxerTaille.m
            })
            ici.append(new xxBouton({ titleVariable: 'ouvrir', textVariable: 'ouvrir', click: (cb) => { myBox.afficher(); cb(); } }));
        }, 2, xxBoxer);







        ajouter('xxCheckBox', 'Case à cocher partielle', (ici) => {
            let checkbox_intermediaire = new xxCheckBox({
                value: null,
                canbePartiel: true,
                ValueChange: (value) => {
                    console.log(value);
                }
            })

            ici.xxWrapPanel({
                initContent: [
                    checkbox_intermediaire,
                    new xxBouton({
                        titleVariable: "NULL",
                        textVariable: "NULL",
                        click: cb => {
                            checkbox_intermediaire.setValue(null);
                            cb();
                        }
                    }),
                    new xxBouton({
                        titleVariable: "TRUE",
                        textVariable: "TRUE",
                        click: cb => {
                            checkbox_intermediaire.setValue(true);
                            cb();
                        }
                    }),
                    new xxBouton({
                        titleVariable: "FALSE",
                        textVariable: "FALSE",
                        click: cb => {
                            checkbox_intermediaire.setValue(false);
                            cb();
                        }
                    })
                ]
            })




        }, 2, xxCheckBox);

        ajouter('xxCheckBox', 'Case à cocher', function (ici: xElementHolder) {
            let i = new xDiv();
            ici.xxCheckBox({
                ValueChange: function (valeur: boolean) {
                    i.y.textContent = '' + valeur;
                }

            }).append(i);

        }, 2, xxCheckBox);


        ajouter('xxCheckBox', 'Case à cocher en mode slider', function (ici: xElementHolder) {
            let i = new xDiv();
            ici.xxCheckBox({

                typeCheckbox: enumTypeCheckbox.slide,
                ValueChange: function (valeur: boolean) {
                    i.y.textContent = '' + valeur;
                }
            }).append(i);

        }, 2, xxCheckBox);

        ajouter('xxCheckBox', 'Case à cocher en mode slider avec une initialisation de l\'état', function (ici: xElementHolder) {
            let i = new xDiv();
            ici.xxCheckBox({
                value: true,
                typeCheckbox: enumTypeCheckbox.slide,
                ValueChange: function (valeur: boolean) {
                    i.y.textContent = '' + valeur;
                }
            }).append(i);

        }, 2, xxCheckBox);

        ajouter('xxCheckBox', 'Case à cocher inactive', function (ici: xElementHolder) {
            let i = new xDiv();
            ici.xxCheckBox({
                value: true,
                inactif: true,
            }).append(i)

            ici.xxCheckBox({
                value: true,
                typeCheckbox: enumTypeCheckbox.slide,
                inactif: true,
            }).append(i);

        }, 2, xxCheckBox);

        ajouter('xxCheckBox', 'Case à cocher en mode texte', function (ici: xElementHolder) {
            let i = new xDiv();
            ici.xxCheckBox({
                value: true,
                typeCheckbox: enumTypeCheckbox.texte,
                ValueChange: function (valeur: boolean) {
                    i.y.textContent = '' + valeur;
                },
                textVariable: "Test"
            }).append(i);

        }, 2, xxCheckBox);

        ajouter('xxCheckBox', "Case à cocher en mode image", function (ici: xElementHolder) {
            let i = new xDiv();
            ici.xxCheckBox({
                value: true,
                typeCheckbox: enumTypeCheckbox.image,
                ValueChange: function (valeur: boolean) {
                    i.y.textContent = '' + valeur;
                },
                imageEnable: new IconeP12(enumIconeP12.xxRouteContainer_FavoriOn),
                imageDisable: new IconeP12(enumIconeP12.xxRouteContainer_FavoriOff),
                titleVariable: "Afficher / masquer"
            }).append(i);

        }, 2, xxCheckBox);

        ajouter('xxRecorder', 'xxRecorder', ici => {
            ici.append(new xxRecorder({

            }));

        }, 2, xxRecorder)

        ajouter('xxLecteurAudio', 'xxLecteurAudio', ici => {
            ici.append(new xxLecteurAudio({
                audio: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
            }));

        }, 2, xxLecteurAudio)

        ajouter('xxIMC', 'xxIMC', ici =>
            ici.append(new xxIMC({
                value: 28.5
            })), 2, xxIMC)

   

        ajouter('xxBouton', 'xxBouton', ici => {
            ici.append(new xxBouton({
                titleVariable: "",
                click: (cb) => {
                    xOutils.afficherMessageAlertifyLog("Bouton home type default");
                    cb();
                }
            }))

        }, 2, xxBouton)


        ajouter('xxBouton', 'xxBouton avec iconeSvg, typeBouton: enumtypeBouton.Standard, positionIcon: enumPosition.Right', ici => {
            ici.append(new xxBouton({
                icone: new IconeSvg(enumIconeSvg.home),
                optionsAffichage: {
                    positionIconeBouton: enumPosition.Right
                },
                typeBouton: enumTypeBouton.Standard,
                textVariable: "Home",
                titleVariable: "test",
                click: cb => {
                    xOutils.afficherMessageAlertifyLog("Bouton home type svg cliqué")
                    cb();
                }
            }))

        }, 2, xxBouton)

        ajouter('xxBouton', 'xxBouton avec iconeSvg, type: labelled, with shiftClick, with  optionLabelled: optionLabel', ici => {
            ici.append(new xxBouton({
                icone: new IconeSvg(enumIconeSvg.home),
                typeBouton: enumTypeBouton.TexteHorsBouton,
                titleVariable: "test",
                shiftClick: cb => {
                    xOutils.afficherMessageAlertifySuccess("shiftClik exécuté");
                    cb();
                },
                optionsLabel: {
                    textVariable: "test",
                    type: enumTypeLabel.description
                },
                click: cb => {
                    xOutils.afficherMessageAlertifyLog("Bouton home type svg cliqué")
                    cb();
                }
            }))

        }, 2, xxBouton)

        ajouter('xxBouton', 'xxBouton avec iconeSvg, type: labelled, with shiftClick, with  optionLabelled: optionLabel', ici => {
            ici.append(new xxBouton({
                icone: new IconeSvg(enumIconeSvg.home),
                typeBouton: enumTypeBouton.TexteHorsBouton,
                titleVariable: "Ah oui oui ",
                shiftClick: cb => {
                    xOutils.afficherMessageAlertifySuccess("shiftClik executé");
                    cb();
                },
                textVariable: "on teste",
                click: cb => {
                    xOutils.afficherMessageAlertifyLog("Bouton home type svg cliqué")
                    cb();
                }
            }))

        }, 2, xxBouton)

        ajouter('xxBouton', 'confirm: { enumComportementBouton.ActionAConfirmer }', ici => {
            ici.append(new xxBouton({
                icone: new IconeSvg(enumIconeSvg.home),
                confirm: {
                    comportement: enumComportementBouton.ActionAConfirmer
                },
                textVariable: "Home",
                titleVariable: "Ah oui oui ",
                click: cb => {
                    xOutils.afficherMessageAlertifyLog("Bouton home type svg cliqué")
                    cb();
                }
            }))

        }, 2, xxBouton)

        ajouter('xxBouton', 'confirm: { enumComportementBouton.ActionDifferee }', ici => {
            ici.append(new xxBouton({
                icone: new IconeSvg(enumIconeSvg.home),
                titleVariable: "Ah oui oui ",
                confirm: {
                    comportement: enumComportementBouton.ActionDifferee
                },
                textVariable: "Home",
                click: cb => {
                    xOutils.afficherMessageAlertifyLog("Bouton home type svg cliqué")
                    cb();
                }
            }))

        }, 2, xxBouton)

        ajouter('xxBouton', 'confirm: { enumComportementBouton.ValidationBloquante, stringConfirm: () => { return "test" } }', ici => {
            ici.append(new xxBouton({
                icone: new IconeSvg(enumIconeSvg.home),
                titleVariable: "Ah oui oui ",
                confirm: {
                    comportement: enumComportementBouton.ValidationBloquante,
                    stringConfirm: () => { return "test" },
                },
                textVariable: "Home",
                click: cb => {
                    xOutils.afficherMessageAlertifyLog("Bouton home type svg cliqué")
                    cb();
                }
            }))

        }, 2, xxBouton)


        //ajouter('xxBouton', 'avec état enregistrer: utilisation dans la méthode click', ici => {
        //    ici.append(new xxBouton({
        //        icon: new IconeSvg(enumIconeSvg.actualiser),
        //        titleVariable: "Ah oui oui ",
        //        textVariable: "Save",
        //        click: (cb, retour) => {
        //            xOutils.afficherMessageAlertifyLog("Bouton home type svg cliqué")
        //            retour.showLoading();

        //            setTimeout(() => { retour.hideLoading(); }, 3000);

        //            // cb();
        //        }
        //    }))

        //}, 2, xxBouton)        

        ajouter('xxBouton', 'xxBouton avec old icone', ici => {
            ici.append(new xxBouton({
                titleVariable: "Ah oui oui ",
                icone: new IconeP12(enumIconeP12.xxRouteContainer_Home),
                textVariable: "Home",
                click: cb => {
                    xOutils.afficherMessageAlertifyLog("Bouton home type old icone cliqué");
                    cb();
                }
            }))

        }, 2, xxBouton)

        ajouter('xxBouton', 'xxBouton disabled', ici => {
            ici.append(new xxBouton({
                titleVariable: "Bouton désactivé",
                icone: new IconeP12(enumIconeP12.xxRouteContainer_Home),
                textVariable: "Désactivé",
                disabled: true,
                click: cb => {
                    xOutils.afficherMessageAlertifyLog("ce message ne doit jamais apparaitre : le bouton est désactivé.");
                    cb();
                }
            }))

        }, 2, xxBouton)

     

     
        /**
         * test 
         */



        class fruit {
            nom: string;
            couleur: string;
            vitamines: number;
        }

        let listFruit: fruit[] = [];
        listFruit.push({ nom: 'poire', couleur: 'jaune', vitamines: 42 });
        listFruit.push({ nom: 'pomme', couleur: 'vert', vitamines: 12 });
        listFruit.push({ nom: 'péche', couleur: 'rouge', vitamines: 35 });
        listFruit.push({ nom: 'abricot', couleur: 'orange', vitamines: 5 });
        listFruit.push({ nom: 'cerise', couleur: 'rouge', vitamines: 2 });
        listFruit.push({ nom: 'myrtille', couleur: 'violet', vitamines: 1 });
        listFruit.push({ nom: 'raisin', couleur: 'bleu', vitamines: 6 });

        ajouter('xxInputNumeric', 'Permet de creer un xInpuT text avec une option numerique', ici => {
            ici.append(new xxInputNumerique({
                ValueChange: (val) => {
                    xOutils.afficherMessageAlertifySuccess(val.toString());
                },
                value: 12
            }))

        }, 2, xxInputNumerique)

        ajouter('xxInputNumeric', 'Permet de créer un xInpuT text avec une option numérique', ici => {
            ici.append(new xxInputNumerique({
                plusMinusButton: {},
                ValueChange: (val) => {
                    xOutils.afficherMessageAlertifySuccess(val.toString());
                },
                min: 11,
                max: 23,
                value: 12
            }))

        }, 2, xxInputNumerique)


        ajouter('xxAutocomplete', 'Permet de faire une recherche dans une liste via le input', function (ici: xElementHolder) {

            let divResultat = new xDiv({ class: 'resultat_autocomplete' });
            ici.append(divResultat);

            ici.xxAutoComplete<fruit>({
                typeValue: null,
                listeValeurs: listFruit,
                getLibelle: function (f: fruit) { return f.nom },
                getKey: (value) => { return value.nom },
                valueChange: function (f: fruit) {
                    divResultat.asHolder.empty()
                        .xxLabelContainer({
                            textVariable: new xLString('nom').text + ' : ',
                            initContent: new xDiv({ textVariable: f.nom })
                        })
                        .xxLabelContainer({
                            textVariable: new xLString('couleur').text + ' : ',
                            initContent: new xDiv({ textVariable: f.couleur })
                        })
                        .xxLabelContainer({
                            textVariable: new xLString('vitamines').text + ' : ',
                            initContent: new xDiv({ textVariable: "" + f.vitamines })
                        });
                }
            });

        }, 2, xxAutoComplete);

        ajouter('xxAutocomplete', 'Si la recherche ne matche pas un choix null est sélectionné (libelleNullChoice:aucun)', function (ici: xElementHolder) {

            let divResultat = new xDiv({ class: 'resultat_autocomplete' });
            ici.append(divResultat);

            ici.xxAutoComplete<fruit>({
                libelleNullChoice: 'aucun',
                typeValue: null,
                listeValeurs: listFruit,
                getLibelle: function (f: fruit) { return f.nom },
                valueChange: function (f: fruit) {
                    viderxElements(divResultat);

                    if (f != null)
                        divResultat.asHolder
                            .xxLabelContainer({
                                textVariable: new xLString('nom').text + ' : ',
                                initContent: new xDiv({ textVariable: f.nom })
                            })
                            .xxLabelContainer({
                                textVariable: new xLString('couleur').text + ' : ',
                                initContent: new xDiv({ textVariable: f.couleur })
                            })
                            .xxLabelContainer({
                                textVariable: new xLString('vitamines').text + ' : ',
                                initContent: new xDiv({ textVariable: "" + f.vitamines })
                            });
                    else
                        divResultat.asHolder.xdiv({ textVariable: 'aucun fruit sélectionné' });

                }
            });

        }, 2, xxAutoComplete);

        let listeVal: CleValeur<string, string>[] = [];
        listeVal.push({ cle: "jkh", valeur: "gfhfg" });
        listeVal.push({ cle: "clef2", valeur: "valeur2" });
        listeVal.push({ cle: "clef3", valeur: "valeur3" });
        listeVal.push({ cle: "clef4", valeur: "valeur4" });
        listeVal.push({ cle: "clef5", valeur: "valeur5" });

        ajouter('xxListChoix', 'Liste déroulante', function (ici: xElementHolder) {
            let optionsChoix: OptionsSelect = {};

            optionsChoix.listeValeurs = listeVal;

            ici.xxListChoix(optionsChoix);
        }, 2, xxListChoix);

        ajouter('xxListChoix', 'Liste déroulante avec un choix par défaut', function (ici: xElementHolder) {
            let optionsChoixAvecDefaut: OptionsSelect = {};

            optionsChoixAvecDefaut.listeValeurs = listeVal;
            optionsChoixAvecDefaut.valueDefault = "clef3";

            ici.xxListChoix(optionsChoixAvecDefaut);
        }, 2, xxListChoix);

        ajouter('xxImageTabByte', 'Créer une image à partir d\'un tableau de byte', function (ici: xElementHolder) {
            let imgByte: xxImageTabByte = new xxImageTabByte({ typeAffichage: enumTypeImage.domImage, tabByte: "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" })
            ici.append(imgByte);
        }, 2, xxImageTabByte);
        let actionMenu = function (lien: String) {
            alert(lien);
        }
        ajouter('xxMenu', 'Menu avec catégorisation et recherche', function (ici: xElementHolder) {
            let optionsMenu: OptionsMenu = {
                contenu:
                    [{
                        icone: new IconeP12(enumIconeP12.admin_agendas),
                        libelle: "test groupe 1",
                        items: [{
                            Click: function () { actionMenu('google.fr') },
                            libelle: "google", classe: "go"
                        },
                        {
                            Click: function () { actionMenu('sports.fr') },
                            libelle: "sports", classe: "sp"
                        }
                        ]
                    }, {
                        icone: new IconeP12(enumIconeP12.admin_user),
                        libelle: "test groupe 2",
                        items: [{
                            Click: function () { actionMenu('chocolat.com') },
                            libelle: "cora", classe: "co"
                        },
                        {
                            Click: function () { actionMenu('fightandfurious.KB') },
                            libelle: "mcdo", classe: "mc"
                        }
                        ]
                    }]

            };

            ici.xxMenu(optionsMenu);
        }, 2, xxMenu);

        ajouter('xxMenu', 'Menu avec catégorisation sans recherche', function (ici: xElementHolder) {
            let optionsMenu: OptionsMenu = {
                contenu:
                    [{
                        icone: new IconeP12(enumIconeP12.admin_agendas),
                        libelle: "test groupe 1",
                        items: [{
                            Click: function () { actionMenu('google.fr') },
                            libelle: "google", classe: "go"
                        },
                        {
                            Click: function () { actionMenu('sports.fr') },
                            libelle: "sports", classe: "sp"
                        }
                        ]
                    }, {
                        icone: new IconeP12(enumIconeP12.admin_user),
                        libelle: "test groupe 2",
                        items: [{
                            Click: function () { actionMenu('chocolat.com') },
                            libelle: "cora", classe: "co"
                        },
                        {
                            Click: function () { actionMenu('fightandfurious.KB') },
                            libelle: "mcdo", classe: "mc"
                        }
                        ]
                    }]

            };
            optionsMenu.activerRecherche = false;

            ici.xxMenu(optionsMenu);
        }, 2, xxMenu);

        class Dessert {
            sucre: number;
            farine: number;
            typeFarine: string;
            modeCuisson: string;
            oeufs: number;
        }

        /* emed xxList */

        let mesDesserts: Dessert[] = [];

        for (let i: number = 0; i < 50; i++) {
            let monDessert: Dessert = new Dessert();
            monDessert.farine = 250 + i;
            if (i % 2 == 0) {
                monDessert.modeCuisson = 'FOUR';
            }
            else {
                monDessert.modeCuisson = 'POELE';
            }

            monDessert.oeufs = i % 11;
            monDessert.typeFarine = 'BLE';
            mesDesserts.push(monDessert);
        }
        let obs: ObservableCollection<Dessert> = new ObservableCollection(mesDesserts);
        ajouter('xxArbre', 'xxArbre', ici =>
            ici.append(new xxArbre({
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
                    place.append(new xxBouton({
                        titleLocalise: "changer d'exigence",
                        textVariable: v != null ? v.modeCuisson + " - " + v.typeFarine : 'aucune',
                        click: cb => {
                            os(v);
                        }
                    }));
                },
                getEnfants: (v): any => {
                    return mesDesserts;
                },
                getPere: (v): any => {
                    return null;
                }
            })), 2, xxArbre)

        ajouter('xxList<T>', 'Liste d\'éléments', function (ici: xElementHolder) {


            let monxxListWrapper: xxListWrapper<Dessert> = new xxListWrapper<Dessert>({

                donnees: mesDesserts.splice(0, 10),
                renderItem: function (ici, item: Dessert) {

                    ici.xxLabelContainer({ textVariable: "farine:" + item.farine })
                        .xxLabelContainer({ textVariable: "cuisson:" + item.modeCuisson })
                        .xxLabelContainer({ textVariable: "oeufs:" + item.oeufs })

                        .append(new xxBouton({
                            titleVariable: "supprimer l'élément",
                            icone: new IconeP12(enumIconeP12.action_supprimer),
                           
                            click: function (cb) {
                                monxxListWrapper.supprimerItem(item);
                                cb();
                            }
                        }));


                },

                equals: function (a: Dessert, b: Dessert) {
                    return a.farine == b.farine;
                },
                sort: enumTypeTri.asc,
                greaterThan: function (a: Dessert, b: Dessert) {
                    return a.farine - b.farine;
                }


            });


            ici.append(monxxListWrapper)
                //j'ajoute aussi un bouton pour ajouter des éléments
                .append(new xxBouton({
                    titleVariable: "ajouter des éléments",
                    icone: new IconeP12(enumIconeP12.action_ajouter),
                    textVariable: "ajouter des éléments",
                    click: function (cb: () => void) {
                        monxxListWrapper.ajouterItems(mesDesserts.slice(10, 20));
                        cb();
                    }
                }))
                .append(new xxBouton({
                    titleVariable: "changer l'ordre",
                    icone: new IconeP12(enumIconeP12.action_rafraichir),
                    textVariable: "tri descendant",
                    click: function (cb) {
                        monxxListWrapper.changerTri();
                        cb();
                    }
                }));

            ici.append(new xxBouton({
                titleVariable: 'set filtre', textVariable: 'appliquer filtre', click:
                    cb => {
                        cb();
                        monxxListWrapper.setFiltre((d) => {
                            return d.farine < 255;
                        })
                    }
            }));

            ici.append(new xxBouton({
                titleVariable: 'filtrer', textVariable: 'filtrer la liste', click:
                    cb => {
                        cb();
                        monxxListWrapper.filtrer();
                    }
            }));
        }, 2, xxListWrapper);

        ajouter('xxListDeroulante', 'Liste déroulante avec un choix par défaut, mode classique', function (ici: xElementHolder) {
            let listeDessert = new xxListeDeroulante<Dessert>({
                defaultValue: null,
                donnees: mesDesserts,
                renderSelected: function (ici, monDessert, cbOuvrir) {
                    ici.append(new xxBouton({
                        //  inverser:true,
                        click: function (cb) {
                            cbOuvrir(monDessert);
                            cb();
                        },
                        titleVariable: 'changer de dessert',
                        textVariable: monDessert == null || monDessert == undefined ? 'aucun dessert' : 'cuisson:' + monDessert.modeCuisson + '/ farine:' + monDessert.typeFarine,
                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                        optionsAffichage: {positionIconeBouton:enumPosition.Right}
                    }));

                },
                renderSelectItem: function (ici, monDessert, cbChoisir) {
                    ici.append(new xxBouton({
                        click: function (cb) { cbChoisir(monDessert); },
                        titleVariable: 'choisir ce dessert',
                        textVariable: 'cuisson:' + monDessert.modeCuisson + '/ farine:' + monDessert.typeFarine,
                        icone: new IconeP12(enumIconeP12.action_epingler),

                    }));
                },
                selected: function (maSelection) {
                    if (maSelection != null) {
                        alert("changement de dessert:" + maSelection.modeCuisson + '/ farine:' + maSelection.typeFarine);
                    }
                }

            });

            ici.append(new xxBouton({
                click: (cb) => {
                    listeDessert.selecteur(null);
                    cb();
                },
                titleVariable: 'RAZ',
                textVariable: 'RAZ'
            }));

            ici.xxLabelContainer({
                textVariable: 'choisissez un dessert', initContent: listeDessert

            });


        }, 2, xxListeDeroulante);

        ajouter('xxListDeroulante', 'Liste déroulante lecture seule', function (ici: xElementHolder) {

            let listeDessert = new xxListeDeroulante<Dessert>({
                lectureSeule: true,
                renderLectureSeule: function (ici, monDessert) {
                    ici.xxWrapPanel({
                        retourALaLigne: false,
                        initContent: [
                            new IconeP12(enumIconeP12.action_epingler),
                            new xxLabel({
                                textVariable: monDessert.typeFarine,
                            })
                        ]
                    })
                },
                donnees: mesDesserts,
                renderSelected: function (ici, monDessert, cbOuvrir) {
                    ici.append(new xxBouton({
                        //  inverser:true,
                        click: function (cb) {
                            cbOuvrir(monDessert);
                            cb();
                        },
                        titleVariable: 'changer de dessert',
                        textVariable: monDessert == null || monDessert == undefined ? 'aucun dessert' : 'cuisson:' + monDessert.modeCuisson + '/ farine:' + monDessert.typeFarine,
                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                        optionsAffichage: { positionIconeBouton: enumPosition.Right }
                    }));

                },
                renderSelectItem: function (ici, monDessert, cbChoisir) {
                    ici.append(new xxBouton({
                        click: function (cb) { cbChoisir(monDessert); },
                        titleVariable: 'choisir ce dessert',
                        textVariable: 'cuisson:' + monDessert.modeCuisson + '/ farine:' + monDessert.typeFarine,
                        icone: new IconeP12(enumIconeP12.action_epingler),
                    }));
                },
                selected: function (maSelection) {
                    if (maSelection != null) {
                        alert("changement de dessert:" + maSelection.modeCuisson + '/ farine:' + maSelection.typeFarine);
                    }
                },
                defaultValue: mesDesserts[0],

            });

            ici.xxLabelContainer({
                initContent: listeDessert
            });
        }, 2, xxListeDeroulante);


        ajouter('xxListDeroulante', 'fonction ouverture ', function (ici: xElementHolder) {
            let listeDessert = new xxListeDeroulante<Dessert>({
                defaultValue: null,
                donnees: mesDesserts,
                renderSelected: function (ici, monDessert, cbOuvrir) {
                    ici.append(new xxBouton({
                        //  inverser:true,
                        click: function (cb) {
                            cbOuvrir(monDessert);
                            cb();
                        },
                        titleVariable: 'changer de dessert',
                        textVariable: monDessert == null || monDessert == undefined ? 'aucun dessert' : 'cuisson:' + monDessert.modeCuisson + '/ farine:' + monDessert.typeFarine,
                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                        optionsAffichage: { positionIconeBouton: enumPosition.Right },
                    }));

                },
                renderSelectItem: function (ici, monDessert, cbChoisir) {
                    ici.append(new xxBouton({
                        click: function (cb) { cbChoisir(monDessert); },
                        titleVariable: 'choisir ce dessert',
                        textVariable: 'cuisson:' + monDessert.modeCuisson + '/ farine:' + monDessert.typeFarine,
                        icone: new IconeP12(enumIconeP12.action_epingler),

                    }));
                },
                selected: function (maSelection) {
                    if (maSelection != null) {
                        alert("changement de dessert:" + maSelection.modeCuisson + '/ farine:' + maSelection.typeFarine);
                    }
                }

            });

            ici.append(listeDessert);

            ici.append(new xxBouton({
                click: (cb) => {
                    listeDessert.ouvrirSelection()
                    cb();
                },
                titleVariable: 'Ouvrir',
                textVariable: 'Ouvrir'
            }));

        }, 2, xxListeDeroulante);

        ajouter('xxListDeroulante', 'Liste déroulante avec titre mobile', function (ici: xElementHolder) {
            let listeDessert = new xxListeDeroulante<Dessert>({
                defaultValue: null,
                donnees: mesDesserts,
                textLocaliseMobile: "Choisissez un dessert :",
                renderSelected: function (ici, monDessert, cbOuvrir) {
                    ici.append(new xxBouton({
                        //  inverser:true,
                        click: function (cb) {
                            cbOuvrir(monDessert);
                            cb();
                        },
                        titleVariable: 'changer de dessert',
                        textVariable: monDessert == null || monDessert == undefined ? 'aucun dessert' : 'cuisson:' + monDessert.modeCuisson + '/ farine:' + monDessert.typeFarine,
                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                        optionsAffichage: { positionIconeBouton: enumPosition.Right },
                    }));

                },
                renderSelectItem: function (ici, monDessert, cbChoisir) {
                    ici.append(new xxBouton({
                        click: function (cb) { cbChoisir(monDessert); },
                        titleVariable: 'choisir ce dessert',
                        textVariable: 'cuisson:' + monDessert.modeCuisson + '/ farine:' + monDessert.typeFarine,
                        icone: new IconeP12(enumIconeP12.action_epingler),

                    }));
                },
                selected: function (maSelection) {
                    if (maSelection != null) {
                        alert("changement de dessert:" + maSelection.modeCuisson + '/ farine:' + maSelection.typeFarine);
                    }
                }

            });

            ici.append(new xxBouton({
                click: (cb) => {
                    listeDessert.selecteur(null);
                    cb();
                },
                titleVariable: 'RAZ',
                textVariable: 'RAZ'
            }));

            ici.xxLabelContainer({
                textVariable: 'choisissez un dessert', initContent: listeDessert

            });


        }, 2, xxListeDeroulante);


        ajouter('xxListDeroulanteSimple', 'Liste déroulante simple avec un choix defaut [le comportement est fixé: code/libellé sert juste à refactoriser des anciens composants, préférer xxListeDeroulante qui lui est très personnalisable et pas plus compliqué]', function (ici: xElementHolder) {

            ici.xxLabelContainer({
                textVariable: 'choisissez un dessert', initContent:
                    new xxListeDeroulanteSimpleNePlusUtiliser<Dessert>({

                        defaultKeyValue: "",
                        getKey: function (item: Dessert) {
                            return "";
                        },
                        getLibelle: function (item: Dessert) {
                            return "cuisson:" + item.modeCuisson + "/farine:" + item.typeFarine;
                        },
                        donnees: mesDesserts,

                        selected: function (maSelection) {
                            alert("changement de dessert:" + maSelection.modeCuisson + '/ farine:' + maSelection.typeFarine);
                        }

                    })
            });


        }, 2, xxListeDeroulanteSimpleNePlusUtiliser);

        ajouter('xxListeSelection', "Permet de choisir une sélection d'éléments dans une liste", ici => {
            class legumes {
                public libelle: string;
                public couleur: string;

                constructor(libelle: string, couleur: string) {
                    this.libelle = libelle;
                    this.couleur = couleur
                }
            }


            let salade = new legumes("salade", "verte");
            let carotte = new legumes("carotte", "orange");
            let tomate = new legumes("tomate", "rouge")
            let haricot = new legumes("haricot", "vert");
            let citrouille = new legumes("citrouille", "orange");


            let listeChoixTest = new xxListeSelection<legumes>({
                DonneeComplete: [salade, carotte, tomate, haricot, citrouille],
                DonneeSelectionnees: [salade, tomate],
                getId: (item) => item.libelle,
                RenderItemListeComplete: (place, item) => {
                    place.append(new xxLabel({
                        textVariable: item.libelle
                    }))
                },
                RenderItemListeSelectionee: (place, item) => {
                    place.append(new xxLabel({
                        textVariable: item.libelle
                    }))
                },
                ValueChange: (liste) => {
                    console.log(liste)
                }

            })

            ici.append(listeChoixTest);
            listeChoixTest.appendToHeaderListeComplete(new xInputText({
                autoChange: true,
                value: "",
                ValueChange: (val: string) => {
                    listeChoixTest.FiltreListeComplete((item) => {
                        if (val != "") {
                            if (item.libelle.indexOf(val) >= 0)
                                return true;
                            else
                                return false
                        } else
                            return true;
                    })
                }
            }))

            listeChoixTest.appendToHeaderListeSelectionne(new xInputText({
                autoChange: true,
                value: "",
                ValueChange: (val: string) => {
                    listeChoixTest.FiltreListeSelectionne((item) => {
                        if (val != "") {
                            if (item.libelle.indexOf(val) >= 0)
                                return true;
                            else
                                return false
                        } else
                            return true;
                    })
                }
            }))

        }, 2, xxListeSelection);


        ajouter('xxTableau<T>', 'Tableau (avec xxTableau<T>.setPagination(1)', function (ici: xElementHolder) {


            let mesDesserts: Dessert[] = [];

            for (let i: number = 0; i < 50; i++) {
                let monDessert: Dessert = new Dessert();
                monDessert.farine = 250 + i;
                if (i % 2 == 0) {
                    monDessert.modeCuisson = 'FOUR';
                }
                else {
                    monDessert.modeCuisson = 'POELE';
                }

                monDessert.oeufs = i % 11;
                monDessert.typeFarine = 'BLE';
                mesDesserts.push(monDessert);
            }


            let w: xxTableauWrapper<Dessert> = new xxTableauWrapper<Dessert>({

                id: "xxTableauExemple",
                clickLigne: function (d: Dessert, lw: xxTableauLigneWrapper<Dessert>) {

                    alert(d.modeCuisson + '-' + d.typeFarine);
                },
                titleVariable: "recettes de cuisine",
                data: mesDesserts,
                pagination: 5,
                fixerEntetes: true,
                masquerZoneFiltreTexte: false,
                filtreTexte: function (s: string, item: Dessert): boolean {

                    if (item.modeCuisson.indexOf(s) > -1) { return true; }
                    if (item.typeFarine.indexOf(s) > -1) { return true; }
                    return false;
                },
                autoComplete: true,

                exportPDF: {
                    PdfModePaysage: false,
                    //getCartouchePdf: () => {
                    //    try {
                    //        return outilsJSEmed.getCartoucheEntete(162387, pageShowRoom); //cdpatient=567107|ancddossier=EM10002808|nom=TEST 08/12/2017|prenom=Prenom_Test                        
                    //    } catch (ex) {
                    //        console.log(ex);
                    //    }
                    //},
                    nomExportPdf: "RecettesDeCuisine.pdf",
                    titreLocaliseExportPdf: "Recettes de cuisine (avec tooltip)",
                },
                columns: [
                    {
                        titleVariable: "quantité de farine",
                        renderMethod: function (place: xElementHolder, valeur: Dessert) {
                            place.append(
                                new xxLabel({ textVariable: valeur.farine + ' g' })
                            ).append(
                                new xxBouton({
                                  
                                    icone: new IconeP12(enumIconeP12.action_supprimer),
                                    titleVariable: 'supprimer',
                                    click: function (cb) {
                                        w.supprimerDatas([valeur]); cb();
                                    }
                                }));


                        },
                        print: function (a: Dessert) { return a.farine + ' g'; },

                        greaterThan: (a: Dessert, b: Dessert): number => { return a.farine - b.farine; },
                        group: (place, a: Dessert): void => { place.append(new xDiv({ textVariable: a.typeFarine })); },
                        printGroup: (a: Dessert) => {
                            return a.typeFarine;
                        },
                        ordreTri: 2
                    },
                    {
                        titleVariable: "mode de cuisson",
                        tooltipTitleLocalise: "ça c'est le tooltipTitleLocalise de la colonne",
                        renderMethod: function (place: xElementHolder, valeur: Dessert, lw: xxTableauLigneWrapper<Dessert>) {
                            place.append(new xDiv({ textVariable: valeur.modeCuisson }))
                                .append(new xxBouton({
                                    optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                    icone: new IconeP12(enumIconeP12.action_epingler),
                                    titleVariable: 'select',
                                    click: function (cb) { lw.toggleClass("selected"); cb(); }
                                }));


                        },
                        print: function (a: Dessert) { return a.modeCuisson; },
                        greaterThan: (a: Dessert, b: Dessert): number => { return a.modeCuisson.localeCompare(b.modeCuisson); },
                        group: (place, a: Dessert): void => { place.xdiv({ textVariable: a.modeCuisson }); },
                        printGroup: (a: Dessert) => {
                            return a.modeCuisson;
                        },
                        ordreTri: 1
                    },
                    {
                        titleVariable: "type de farine",
                        renderMethod: function (place: xElementHolder, valeur: Dessert, lw: xxTableauLigneWrapper<Dessert>) {
                            place.xdiv({ textVariable: valeur.typeFarine })
                                .append(new xxBouton({
                                    
                                    icone: new IconeP12(enumIconeP12.action_rafraichir),
                                    titleVariable: 'select',
                                    click: function (cb) {
                                        valeur.typeFarine = 'SUPER STYLE FARINE';
                                        valeur.modeCuisson = 'MICRO-ONDES';
                                        lw.refresh(); cb();
                                    }
                                }));


                        },
                        canDeleteColumn: true
                    }
                ]
            });
            w.setPagination(0);

            let monTableau: xxTableauWrapper<Dessert>

            ici.append(w)
                .append(new xxBouton({
                    textVariable: 'supprimer 5 1ers desserts',
                    icone: new IconeP12(enumIconeP12.action_supprimer),
                    click: function (cb) {

                        w.supprimerDatas(
                            [mesDesserts[0],
                            mesDesserts[1],
                            mesDesserts[2],
                            mesDesserts[3],
                            mesDesserts[4]
                            ]);
                        cb();
                    },
                    titleVariable: 'supprimer'
                }))
                .append(new xxBouton({
                    textVariable: 'Tout supprimer',
                    icone: new IconeP12(enumIconeP12.action_supprimer),
                    click: function (cb) {

                        w.supprimerDatasAll();
                        cb();
                    },
                    titleVariable: 'Tout supprimer'
                }))
                .append(new xxBouton({
                    textVariable: 'ajouter colonne oeufs',
                    icone: new IconeP12(enumIconeP12.action_ajouter),
                    click: function (cb) {
                        w.ajouterColonne(new xxColonne<Dessert>({
                            titleVariable: 'oeufs',
                            renderMethod: function (place: xElementHolder, valeur: Dessert) {
                                place.xdiv({ textVariable: valeur.oeufs + ' oeufs' });

                            },
                            print: function (a: Dessert) { return a.oeufs + ''; },
                            canDeleteColumn: true

                        }));
                        cb();
                    },
                    titleVariable: 'ajouter la colonne oeuf'
                }))
                .append(new xxBouton({
                    textVariable: 'ajouter 1000 Desserts',
                    icone: new IconeP12(enumIconeP12.action_ajouter),
                    titleVariable: 'ajouter',
                    click: function (cb) {
                        let ajoutDesserts: Dessert[] = [];

                        for (let i: number = 0; i < 1000; i++) {
                            let plusDessert: Dessert = new Dessert();
                            plusDessert.farine = 4250 + i;
                            if (i % 2 == 0) {
                                plusDessert.modeCuisson = 'COCOTTE';
                            }
                            else {
                                plusDessert.modeCuisson = 'FRITEUSE';
                            }

                            plusDessert.oeufs = i % 11;
                            plusDessert.typeFarine = 'SARRAZIN';
                            ajoutDesserts.push(plusDessert);
                        };
                        w.ajouterDatas(ajoutDesserts);
                        cb();
                    }
                }))
                .xinputText({
                    autoChange: true,
                    ValueChange: function (val: string) {
                        w.filtrerParTexteExterne(val);
                    }
                })
                ;
        }, 2, xxTableauWrapper);

        ajouter('xxTableau<T>', 'Tableau avec regroupement global', function (ici: xElementHolder) {


            let mesDesserts: Dessert[] = [];

            for (let i: number = 0; i < 50; i++) {
                let monDessert: Dessert = new Dessert();
                monDessert.farine = 250 + i;
                if (i % 2 == 0) {
                    monDessert.modeCuisson = 'FOUR';
                }
                else {
                    monDessert.modeCuisson = 'POELE';
                }

                monDessert.oeufs = i % 11;
                monDessert.typeFarine = 'BLE';
                mesDesserts.push(monDessert);
            }

            let w: xxTableauWrapper<Dessert> = new xxTableauWrapper<Dessert>(
                {

                    id: "xxTableauExemple",
                    clickLigne: function (d: Dessert, lw: xxTableauLigneWrapper<Dessert>) {
                        alert(d.modeCuisson + '-' + d.typeFarine);

                    },
                    data: mesDesserts,
                    pagination: 10,
                    fixerEntetes: true,
                    masquerZoneFiltreTexte: false,
                    filtreTexte: function (s: string, item: Dessert): boolean {

                        if (item.modeCuisson.indexOf(s) > -1) { return true; }
                        if (item.typeFarine.indexOf(s) > -1) { return true; }
                        return false;

                    },
                    autoComplete: true,

                    exportPDF: {
                        titreLocaliseExportPdf: () => {
                            return "Titre issue d'une fonction";
                        },
                        sousTitreLocaliseExportPdf: () => {
                            return "Sous titre issue d'une fonction"
                        }
                    },
                    groupeGlobal: {
                        group: (place: xElementHolder, a: Dessert, b: Dessert): void => {
                            let stack: xxStackPanel = new xxStackPanel({});
                            place.append(stack);
                            if (b == null || a.modeCuisson != b.modeCuisson) {
                                stack.append(new xxLabel({ textVariable: a.modeCuisson }));
                                stack.append(new xxLabel({ textVariable: a.typeFarine }));
                            }
                            else {
                                if (b == null || a.typeFarine != b.typeFarine) {
                                    stack.append(new xxLabel({ textVariable: a.typeFarine }));
                                }
                            }
                        },
                        greaterThan: (a: Dessert, b: Dessert): number => {
                            if (a.modeCuisson.localeCompare(b.modeCuisson) != 0) {
                                return 1;
                            }

                            if (a.typeFarine.localeCompare(b.typeFarine) != 0) {
                                return 1;
                            }

                            return 0;


                        },
                        printGroupeGlobal: (a) => {
                            return a.modeCuisson;
                        }
                    },
                    columns: [
                        {
                            titleVariable: "quantité de farine",
                            renderMethod: function (place: xElementHolder, valeur: Dessert) {
                                place.xdiv({ textVariable: valeur.farine + ' g' })
                                    .append(new xxBouton({
                                      
                                        icone: new IconeP12(enumIconeP12.action_supprimer),
                                        titleVariable: 'supprimer',
                                        click: function (cb) {
                                            w.supprimerDatas([valeur]); cb();
                                        }
                                    }));


                            },
                            print: function (a: Dessert) { return a.farine + ' g'; },

                            greaterThan: (a: Dessert, b: Dessert): number => { return a.farine - b.farine; },
                            group: (place: xElementHolder, a: Dessert): void => { place.xdiv({ textVariable: a.typeFarine }); },
                            printGroup: (a) => { return a.typeFarine },
                            ordreTri: 2
                        },
                        {
                            titleVariable: "mode de cuisson",
                            renderMethod: function (place: xElementHolder, valeur: Dessert, lw: xxTableauLigneWrapper<Dessert>) {
                                place.xdiv({ textVariable: valeur.modeCuisson })
                                    .append(new xxBouton({
                                     
                                        icone: new IconeP12(enumIconeP12.action_epingler),
                                        titleVariable: 'select',
                                        click: function (cb) { lw.toggleClass("selected"); cb(); }
                                    }));


                            },
                            print: function (a: Dessert) { return a.modeCuisson; },
                            greaterThan: (a: Dessert, b: Dessert): number => { return a.modeCuisson.localeCompare(b.modeCuisson); },
                            group: (place: xElementHolder, a: Dessert): void => { place.xdiv({ textVariable: a.modeCuisson }); },
                            printGroup: (a) => { return a.modeCuisson },
                            ordreTri: 1
                        },
                        {
                            titleVariable: "type de farine",
                            renderMethod: function (place: xElementHolder, valeur: Dessert, lw: xxTableauLigneWrapper<Dessert>) {
                                place.xdiv({ textVariable: valeur.typeFarine })
                                    .append(new xxBouton({
                                       
                                        icone: new IconeP12(enumIconeP12.action_rafraichir),
                                        titleVariable: 'select',
                                        click: function (cb) {
                                            valeur.typeFarine = 'SUPER STYLE FARINE';
                                            valeur.modeCuisson = 'MICRO-ONDES';
                                            lw.refresh(); cb();
                                        }
                                    }));


                            },
                            canDeleteColumn: true


                        }
                    ]
                }
            );
            let monTableau: xxTableauWrapper<Dessert>

            ici.append(w)
                .append(new xxBouton({
                    textVariable: 'supprimer 5 1ers desserts',
                    icone: new IconeP12(enumIconeP12.action_supprimer),
                    click: function (cb) {

                        w.supprimerDatas(
                            [mesDesserts[0],
                            mesDesserts[1],
                            mesDesserts[2],
                            mesDesserts[3],
                            mesDesserts[4]
                            ]);
                        cb();
                    },
                    titleVariable: 'supprimer'
                }))
                .append(new xxBouton({
                    textVariable: 'Tout supprimer',
                    icone: new IconeP12(enumIconeP12.action_supprimer),
                    click: function (cb) {

                        w.supprimerDatasAll();
                        cb();
                    },
                    titleVariable: 'Tout supprimer'
                }))
                .append(new xxBouton({
                    textVariable: 'ajouter colonne oeufs',
                    icone: new IconeP12(enumIconeP12.action_ajouter),
                    click: function (cb) {
                        w.ajouterColonne(new xxColonne<Dessert>({
                            titleVariable: 'oeufs',
                            renderMethod: function (place: xElementHolder, valeur: Dessert) {
                                place.xdiv({ textVariable: valeur.oeufs + ' oeufs' });

                            },
                            print: function (a: Dessert) { return a.oeufs + ''; },
                            canDeleteColumn: true

                        }));
                        cb();
                    },
                    titleVariable: 'ajouter la colonne oeuf'
                }))
                .append(new xxBouton({
                    textVariable: 'ajouter 1000 Desserts',
                    icone: new IconeP12(enumIconeP12.action_ajouter),
                    titleVariable: 'ajouter',
                    click: function (cb) {
                        let ajoutDesserts: Dessert[] = [];

                        for (let i: number = 0; i < 1000; i++) {
                            let plusDessert: Dessert = new Dessert();
                            plusDessert.farine = 4250 + i;
                            if (i % 2 == 0) {
                                plusDessert.modeCuisson = 'COCOTTE';
                            }
                            else {
                                plusDessert.modeCuisson = 'FRITEUSE';
                            }

                            plusDessert.oeufs = i % 11;
                            plusDessert.typeFarine = 'SARRAZIN';
                            ajoutDesserts.push(plusDessert);
                        };
                        w.ajouterDatas(ajoutDesserts);
                        cb();
                    }
                }))
                .xinputText({
                    autoChange: true,
                    ValueChange: function (val: string) {
                        w.filtrerParTexteExterne(val);
                    }
                })
                ;
        }, 2, xxTableauWrapper);

        ajouter("xxTableau", "Avec utilisation d'une fonction de rendu pour les titres des colonnes", (ici) => {
            let tableau_rendertitle = new xxTableauWrapper<Dessert>({
                data: mesDesserts,
                pagination: 10,
                columns: [
                    {
                        renderTitle: (place) => {
                            place.append(new xxLabelContainer({
                                textVariable: "Qt farine",
                                initContent: new xxCheckBox({
                                    value: true,
                                    ValueChange: value => { }
                                })
                            }))
                        },
                        renderMethod: (place: xElementHolder, valeur: Dessert) => {
                            place.xdiv({ textVariable: valeur.farine + ' g' })
                        },
                    },
                    {
                        renderTitle: (place) => {
                            place.append(new xxLabelContainer({
                                textVariable: "Mode cuisson",
                                initContent: new xxCheckBox({
                                    value: false,
                                    ValueChange: value => {
                                        xOutils.afficherMessageAlertifySuccess("Vous avez cliqué sur la checkbox");
                                    }
                                })
                            }))
                        },
                        renderMethod: (place: xElementHolder, valeur: Dessert, lw: xxTableauLigneWrapper<Dessert>) => {
                            place.xdiv({ textVariable: valeur.modeCuisson })
                                .append(new xxBouton({
                                   
                                    icone: new IconeP12(enumIconeP12.action_epingler),
                                    titleVariable: 'select',
                                    click: function (cb) { cb(); }
                                }));


                        },
                    }
                ]
            })

            ici.append(tableau_rendertitle);
        }, 2, xxTableauWrapper);

        ajouter("xxTableau", "Avec utilisation du detail par ligne", ici => {
            let w = new xxTableauWrapper({
                data: [],
                pagination: 10,
                exportPDF: {
                    PdfModePaysage: false,
                    nomExportPdf: "RecettesDeCuisine.pdf",
                    titreLocaliseExportPdf: "Recettes de cuisine (avec tooltip)",
                },
                columns: [
                    {
                        titleVariable: "quantité de farine",
                        renderMethod: function (place: xElementHolder, valeur: Dessert) {
                            place.xdiv({ textVariable: valeur.farine + ' g' })
                                .append(new xxBouton({
                                   
                                    icone: new IconeP12(enumIconeP12.action_supprimer),
                                    titleVariable: 'supprimer',
                                    click: function (cb) {
                                        w.supprimerDatas([valeur]); cb();
                                    }
                                }));


                        },
                        print: function (a: Dessert) { return a.farine + ' g'; },

                        greaterThan: (a: Dessert, b: Dessert): number => { return a.farine - b.farine; },
                        group: (place, a: Dessert): void => { place.append(new xDiv({ textVariable: a.typeFarine })); },
                        printGroup: (a: Dessert) => {
                            return a.typeFarine;
                        },
                        ordreTri: 2
                    },
                    {
                        titleVariable: "mode de cuisson",
                        tooltipTitleLocalise: "ça c'est le tooltipTitleLocalise de la colonne",
                        renderMethod: function (place: xElementHolder, valeur: Dessert, lw: xxTableauLigneWrapper<Dessert>) {
                            place.append(new xDiv({ textVariable: valeur.modeCuisson }))
                                .append(new xxBouton({
                                 
                                    icone: new IconeP12(enumIconeP12.action_epingler),
                                    titleVariable: 'select',
                                    click: function (cb) { lw.toggleClass("selected"); cb(); }
                                }));


                        },
                        print: function (a: Dessert) { return a.modeCuisson; },
                        greaterThan: (a: Dessert, b: Dessert): number => { return a.modeCuisson.localeCompare(b.modeCuisson); },
                        group: (place, a: Dessert): void => { place.xdiv({ textVariable: a.modeCuisson }); },
                        printGroup: (a: Dessert) => {
                            return a.modeCuisson;
                        },
                        ordreTri: 1
                    },
                    {
                        titleVariable: "type de farine",
                        renderMethod: function (place: xElementHolder, valeur: Dessert, lw: xxTableauLigneWrapper<Dessert>) {
                            place.xdiv({ textVariable: valeur.typeFarine })
                                .append(new xxBouton({
                                  
                                    icone: new IconeP12(enumIconeP12.action_rafraichir),
                                    titleVariable: 'select',
                                    click: function (cb) {
                                        valeur.typeFarine = 'SUPER STYLE FARINE';
                                        valeur.modeCuisson = 'MICRO-ONDES';
                                        lw.refresh(); cb();
                                    }
                                }));


                        },
                        canDeleteColumn: true
                    },
                    {
                        titleVariable: "Ouvrir detail",
                        renderMethod: function (place: xElementHolder, valeur: Dessert, lw: xxTableauLigneWrapper<Dessert>) {
                            place.append(new xxBouton({
                              
                                icone: new IconeP12(enumIconeP12.fleche_bleue_droite),
                                titleVariable: 'Ouvrir detail',
                                click: function (cb) {
                                    lw.afficherDetail();
                                    cb();
                                },
                            }));


                        },
                    }
                ],
                detailLigne: {
                    renderDetailLigne: (place, valeur, lw) => {
                        place.append(new xxLabelContainer({
                            textVariable: "detail de la ligne : " + valeur.farine + "/" + valeur.modeCuisson + "/" + valeur.oeufs + "/" + valeur.sucre,
                            initContent: new xxBouton({
                                
                                icone: new IconeP12(enumIconeP12.fleche_bleue_haut),
                                titleVariable: 'Fermer detail',
                                click: function (cb) {
                                    lw.masquerDetail();
                                    cb();
                                },
                            })
                        }))
                    },
                    printDetailLigne: (valeur) => {
                        return "detail de la ligne : " + valeur.farine + "/" + valeur.modeCuisson + "/" + valeur.oeufs + "/" + valeur.sucre;
                    },
                    afficherDetailLigne: (valeur) => {
                        if (valeur.modeCuisson == "POELE")
                            return false;
                        else
                            return true;
                    }
                }
            });

            ici.append(w);

            w.ajouterDatas(mesDesserts);

            // Changer la façon de rechercher et comprendre pourquoi ça ne marche pas 
            w.ajouterElement(
                new xxLabelContainer({
                    textVariable: "Qte farine :",
                    initContent: new xInputText({
                        autoChange: true,
                        numeric: {
                            minus: false
                        },
                        ValueChange: (val) => {
                            w.filtrerParFonction((dessert: Dessert) => {
                                if (val != null && val != "") {
                                    if (dessert.farine == val)
                                        return true;
                                    else
                                        return false;
                                } else
                                    return true;
                            });
                        }
                    })
                }), DockPosition.droite);

        }, 2, xxTableauWrapper);

        ajouter("xxTableau", "Avec utilisation du ClickLigne", ici => {
            let w = new xxTableauWrapper({
                data: [],
                columns: [
                    {
                        titleVariable: "type de farine",
                        renderMethod: function (place: xElementHolder, valeur: Dessert, lw: xxTableauLigneWrapper<Dessert>) {
                            place.xdiv({ textVariable: valeur.typeFarine })
                        },
                    },
                ],
                id: "TabDessertClick",
                clickLigne: (i, lw) => {

                }
            });

            ici.append(w);

            w.ajouterDatas(mesDesserts);
        }, 2, xxTableauWrapper);

        //ajouter('xxLabel', 'Permet d\'afficher du texte', function (ici: xElementHolder) { ici.xxLabel({ textVariable: 'bonjour', icone: new IconeP12(enumIconeP12.action_urgent) }); }, 2, xxLabel);
        ajouter('xxLabel', 'Permet d\'afficher du texte en mode bloc (type:bloc)', (ici => {
            ici.append(new xxLabel({
                type: enumTypeLabel.bloc,
                textVariable: `test
sur
plusieurs
lignes `
            }))
        }), 2, xxLabel);

        ajouter('xxLabel', 'Permet d\'afficher du texte en mode titre (type:titre)', function (ici: xElementHolder) { ici.xxLabel({ textVariable: 'bonjour', type: enumTypeLabel.titre }); }, 2, xxLabel);
        ajouter('xxLabel', 'Permet d\'afficher du texte en mode important (type:important)', function (ici: xElementHolder) { ici.xxLabel({ textVariable: 'bonjour', type: enumTypeLabel.important }); }, 2, xxLabel);
        ajouter('xxLabel', 'Permet d\'afficher du texte en mode description (type:description)', function (ici: xElementHolder) { ici.xxLabel({ textVariable: 'bonjour', type: enumTypeLabel.description }); }, 2, xxLabel);
        let labelExSubrillance: xxLabel = new xxLabel({ textVariable: 'bonjour' });
        ajouter('xxLabel', 'Permet d\'afficher du texte et de surligner une text donné (label.setSurbrillance(\'njo\'))', function (ici: xElementHolder) { ici.append(labelExSubrillance); }, 2, xxLabel);
        labelExSubrillance.setSurbrillance('njo');
        ajouter('xxLabel', 'Permet d\'afficher une durée en faisant ressortir les chiffres utiles (type:temps)', function (ici: xElementHolder) {
            ici.xxLabel({ textVariable: '00h30', type: enumTypeLabel.temps });
        }, 2, xxLabel);

        ajouter('xxLabelContainer', 'Imbrication de xxLabelContainer', function (ici: xElementHolder) {
            ici.xxLabelContainer({
                textVariable: 'toto1',
                optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                initContent: new xxLabelContainer({
                    textVariable: 'toto2',
                    initContent: new xxLabelContainer({
                        textVariable: 'toto3',
                        optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                        initContent: new xxLabel({
                            textVariable: "Hello world !",

                        })
                    })
                })
            });
        }, 2, xxLabelContainer);

        ajouter('xxLabelContainer', 'Un container qui permet d\'associer un xlabel à un autre élément', function (ici: xElementHolder) {
            ici.xxLabelContainer({
                textVariable: 'bonjour',
                initContent: new xxBouton({
                    titleVariable: 'over',
                    textVariable: 'test',
                    click: function (cb) { alert('vanille'); cb(); }
                })
            });
        }, 2, xxLabelContainer);

        ajouter('xxLabelContainer', 'xxLabelContainer en mode vertical', function (ici: xElementHolder) {
            ici.xxLabelContainer({
                optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                textVariable: 'bonjour',
                initContent: new xxBouton({
                    titleVariable: 'over',
                    textVariable: 'test',
                    click: function (cb) { alert('vanille'); cb(); }
                })
            });
        }, 2, xxLabelContainer);

        ajouter('xxLabelContainer', 'xxLabelContainer avec le label à droite du contenu', function (ici: xElementHolder) {
            ici.xxLabelContainer({
                textVariable: 'bonjour',
                optionsAffichage: { positionDuContenu: enumPositionDuContenu.gauche },
                initContent: new xxBouton({
                    titleVariable: 'over',
                    textVariable: 'test',
                    click: function (cb) { alert('vanille'); cb(); }
                })
            });
        }, 2, xxLabelContainer);


        ajouter('xxLabelContainer', 'xxLabelContainer en mode vertical avec le label en dessous du contenu', function (ici: xElementHolder) {
            ici.xxLabelContainer({
                optionsAffichage: { positionDuContenu: enumPositionDuContenu.haut },
                textVariable: 'bonjour',
                initContent: new xxBouton({
                    titleVariable: 'over',
                    textVariable: 'test',
                    click: function (cb) { alert('vanille'); cb(); }
                })
            });
        }, 2, xxLabelContainer);

        ajouter('xxLabelContainer', 'xxLabelContainer avec un label de type titre', function (ici: xElementHolder) {
            ici.xxLabelContainer({
                textVariable: 'bonjour',
                type: enumTypeLabel.titre,
                initContent: new xxBouton({
                    titleVariable: 'over',
                    textVariable: 'test',
                    click: function (cb) { alert('vanille'); cb(); }
                })
            });
        }, 2, xxLabelContainer);

        ajouter('xxLabelContainer', 'Un container qui permet d\'associer un xlabel à un autre élément avec un post ajout', function (ici: xElementHolder) {

            let lc = new xxLabelContainer({ textVariable: 'bonjour' });
            ici.append(lc)
                .append(new xxBouton({
                    titleVariable: 'ajout', textVariable: 'ajouter contenu', click: function (cb) {
                        lc.append(new xxLabel({ textVariable: 'parfait!' }));
                    }
                }));
        }, 2, xxLabelContainer);

        let surbrillance: string = '';
        ajouter('xxLabelContainer', 'Un container qui permet de mettre le label en surbrillance (ex : onClick: () => { xxLabel.setSurbrillance(\'bonjour\')}))', function (ici: xElementHolder) {
            let lc = new xxLabelContainer({
                textVariable: 'bonjour',
                optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
                initContent: new xxBouton({
                    titleVariable: 'Ajout surbrillance',
                    textVariable: 'Surbrillance',
                    click: (cb) => {
                        if (surbrillance == '') {
                            surbrillance = 'bonjour'
                        } else {
                            surbrillance = ''
                        }
                        lc.setSurbrillance(surbrillance);
                        cb();
                    }
                })
            });
            ici.append(lc);

        }, 2, xxLabelContainer)

        ajouter('xxLabelModifiable', 'zone texte qui réagit comme un input après dbclic', function (ici: xElementHolder) {
            ici.xxLabelModifiable({ textVariable: 'texte initial', change: function (s: string) { alert("nouvelle valeur:" + s); } });
        }, 2, xxLabelModifiable);

        ajouter('xxLabelModifiable', 'zone texte qui réagit comme un input après dbclic en mode titre', function (ici: xElementHolder) {
            ici.xxLabelModifiable({ textVariable: 'texte initial', type: enumTypeLabel.standard, change: function (s: string) { alert("nouvelle valeur:" + s); } });
        }, 2, xxLabelModifiable);

        ajouter('xxLabelTimeModifiable', '', ici => {
            ici.append(new xxLabelTimeModifiable({
                libelleLabelSiVide: "00:00",
                textVariable: "02:35",
                change: time => {
                    xOutils.afficherMessageAlertifySuccess("Heures : " + time.Heures + " Minutes : " + time.Minutes);
                },
                type: enumTypeLabel.standard,
                id: "TimeModif"
            }));
        }, 2, xxLabelTimeModifiable);

        ajouter('xxWrapPanel', 'Container qui empile les éléments l\'un à la suite de l\'autre avec retour à la ligne automatique', function (ici: xElementHolder) {
            let wrap = new xxWrapPanel({
                id: "monWrap",
                class: "stylePanels",
                initContent: [new xxLabel({ textVariable: 'coucou' }), new xxLabel({ textVariable: 'MR Smith ' })]
            });

            ici.append(wrap);

            wrap.append(new xxBouton({
                titleVariable: 'ajouter', textVariable: "ajouter un bouton",
                click: function (cb) {
                    wrap.append(new xxBouton({
                        titleVariable: 'rien', textVariable: "oui",
                        click: function (cb) { cb(); }
                    }));

                    cb();
                }
            }));
        }, 2, xxWrapPanel);

        ajouter('xxWrapPanel', 'Container qui empile les éléments l\'un à la suite de l\'autre sans retour à la ligne', function (ici: xElementHolder) {
            let wrap = new xxWrapPanel({
                id: "monWrapNoReturn",
                class: "stylePanels",
                retourALaLigne: false,
                initContent: [new xxLabel({ textVariable: 'coucou' }), new xxLabel({ textVariable: 'MR Smith ' })]
            });



            ici.append(wrap);

            wrap.append(new xxBouton({
                titleVariable: 'ajouter', textVariable: "ajouter un bouton",
                click: function (cb) {
                    wrap.append(new xxBouton({
                        titleVariable: 'rien', textVariable: "oui",
                        click: function (cb) { cb(); }
                    }));

                    cb();
                }
            }));
        }, 2, xxWrapPanel);


        ajouter('xxStackPanel', 'Container qui empile les éléments l\'un en dessous de l\'autre', function (ici: xElementHolder) {
            let wrap = new xxStackPanel({
                id: "monStack",
                class: "stylePanels",
                initContent: [new xxLabel({ textVariable: 'coucou' }), new xxLabel({ textVariable: 'MR Smith ' })]
            });



            ici.append(wrap);

            wrap.append(new xxBouton({
                titleVariable: 'ajouter', textVariable: "ajouter un bouton",
                click: function (cb) {
                    wrap.append(new xxBouton({
                        titleVariable: 'rien', textVariable: "oui",
                        click: function (cb) { cb(); }
                    }));

                    cb();
                }
            }));
        }, 2, xxStackPanel);

        ajouter('xxZoneModulable', 'Container divisé en deux permettant de régler la taille entre les deux zones', function (ici: xElementHolder) {

            ici.xxZoneModulable({
                class: "xxZoneModulableShowroom",
                initPremiereZone: function (ici) {
                    ici.xspan({ textVariable: "premiere zone" });
                },
                initSecondeZone: function (ici) {
                    ici.xspan({ textVariable: "seconde zone" });
                },
                titrePremiereZone: () => { return "premiere_zone" },
                titreDeuxiemeZone: () => { return "seconde_zone" }
            });

        }, 2, xxZoneModulable);

        ajouter('xxZoneModulable', 'Container divisé en deux permettant de régler la taille entre les deux zones sans rotation', function (ici: xElementHolder) {

            ici.xxZoneModulable({
                class: "xxZoneModulableShowroom",
                noRotation: true,
                initPremiereZone: function (ici) {
                    ici.xspan({ textVariable: "premiere zone" });
                    ici.xxZoneModulable({
                        class: "xxZoneModulableShowroom",
                        typeOrientation: enumTypeOrientation.vertical,
                        initPremiereZone: function (ici) {
                            ici.xspan({ textVariable: "1" });
                            ici.xxZoneModulable({
                                class: "xxZoneModulableShowroom",
                                initPremiereZone: function (ici) {
                                    ici.xspan({ textVariable: "a" });
                                },
                                initSecondeZone: function (ici) {
                                    ici.xspan({ textVariable: "b" });
                                }
                            });
                        },
                        initSecondeZone: function (ici) {
                            ici.xspan({ textVariable: "2" });
                        }
                    });
                },
                initSecondeZone: function (ici) {
                    ici.xspan({ textVariable: "seconde zone" });
                }
            });

        }, 2, xxZoneModulable);

        ajouter('xxZoneModulable', 'Zone modulable avec une position initiale de 20% pour la zone de gauche (initPosition:20%)', function (ici: xElementHolder) {

            ici.xxZoneModulable({
                initPosition: "20%",
                class: "xxZoneModulableShowroom",
                initPremiereZone: function (ici) {
                    ici.xspan({ textVariable: "premiere zone" });
                },
                initSecondeZone: function (ici) {
                    ici.xspan({ textVariable: "seconde zone" });
                }
            });

        }, 2, xxZoneModulable);

        ajouter('xxZoneModulable', 'Container diviser en deux verticalement permettant de régler la taille entre les deux zones (typeOrientation:vertical)', function (ici: xElementHolder) {

            ici.xxZoneModulable({
                class: "xxZoneModulableShowroom",
                typeOrientation: enumTypeOrientation.vertical,
                initPremiereZone: function (ici) {
                    ici.xspan({ textVariable: "premiere zone" });
                },
                initSecondeZone: function (ici) {
                    ici.xspan({ textVariable: "seconde zone" });
                }
            });

        }, 2, xxZoneModulable);

        ajouter('xxToolTip', 'xxTooltip Mode Hover exemple', function (ici: xElementHolder) {
            ici.xxToolTip({
                initContent: new xxLabel({ textVariable: "test tooltip" }),
                toolTipContent: new xxStackPanel({
                    initContent: [
                        new xxLabel({ textVariable: "contenu du tooltip" }),
                        new xxBouton({
                            titleVariable: "bouton contenu dans le tooltip",
                          
                            icone: new IconeP12(enumIconeP12.action_enregistrer),
                            click: function (cb) {
                                cb();
                            }
                        })
                    ]
                })
            });

        }, 2, xxToolTip);

        ajouter('xxToolTip', 'xxTooltip Mode Hover exemple position au dessus', function (ici: xElementHolder) {
            ici.xxToolTip({
                initContent: new xxLabel({ textVariable: "test tooltip au dessus" }),
                toolTipContent: new xxLabel({ textVariable: "ToolTipPositionHeight à enumXxToolTipPositionHeight.haut donne le contenu du tooltip au dessus (si il y a la place)" }),
                ToolTipPositionHeightSouhaite: enumXxToolTipPositionHeight.haut
            })
        }, 2, xxToolTip);

        ajouter('xxToolTip', 'xxTooltip Mode Hover with Header', function (ici: xElementHolder) {
            ici.xxToolTip({
                titreHeaderLocalise: "Enregistrement :",
                contenuFooter: new xxBouton({ textLocalise: "Marquer comme lu", titleLocalise: "Bouton de test", icone: new IconeP12(enumIconeP12.etat_vu), optionsAffichage: { margin: { Tous: 0 } }, click: function (cb) { cb(); } }),
                initContent: new xxLabel({ textVariable: "test tooltip" }),
                toolTipContent: new xxStackPanel({
                    initContent: [
                        new xxLabel({ textVariable: "contenu du tooltip" }),
                        new xxBouton({
                            textVariable: "bouton contenu dans le tooltip",
                            titleLocalise:'c',
                            icone: new IconeP12(enumIconeP12.action_enregistrer),
                            click: function (cb) {
                                cb();
                            }
                        })
                    ]
                })
            });

        }, 2, xxToolTip);

        ajouter('xxToolTipBouton', 'xxTooltipBouton exemple', function (ici: xElementHolder) {
            ici.append(new xxToolTipBouton({
                textVariable: "test tooltip",
                titleVariable: "test tooltip",
                toolTipContent: new xxStackPanel({
                    initContent: [
                        new xxLabel({ textVariable: "contenu du tooltip" }),
                        new xxBouton({
                            titleVariable: "bouton contenu dans le tooltip",
                          
                            icone: new IconeP12(enumIconeP12.action_enregistrer),
                            click: function (cb) {
                                cb();
                            }
                        })
                    ]
                })
            }));

        }, 2, xxToolTip);

        ajouter('xxToolTipBouton', 'xxTooltipBouton sans backGround exemple', function (ici: xElementHolder) {
            ici.append(new xxToolTipBouton({
                textVariable: "test tooltip",
                titleVariable: "test tooltip",
                WithOutBackGround: true,
                toolTipContent: new xxStackPanel({
                    initContent: [
                        new xxLabel({ textVariable: "contenu du tooltip" }),
                        new xxBouton({
                            titleVariable: "bouton contenu dans le tooltip",
                           
                            icone: new IconeP12(enumIconeP12.action_enregistrer),
                            click: function (cb) {
                                cb();
                            }
                        })
                    ]
                })
            }));

        }, 2, xxToolTip);

        ajouter('xxToolTip', 'xxTooltip notAbsolute', function (ici: xElementHolder) {
            ici.append(new xxToolTip({
                initContent: new xxLabel({ textVariable: "test tooltip" }),
                NotAbsoluteTooltip: true,
                toolTipContent: new xxStackPanel({
                    initContent: [
                        new xxLabel({ textVariable: "contenu du tooltip" }),
                        new xxBouton({
                            titleVariable: "bouton contenu dans le tooltip",
                           
                            icone: new IconeP12(enumIconeP12.action_enregistrer),
                            click: function (cb) {
                                cb();
                            }
                        })
                    ]
                })
            }));

        }, 2, xxToolTip);

        ajouter("xxVolet", "", (ici) => {
            let div: xDiv = new xDiv({
                textVariable: "Le conteneur du volet"
            })

            let volet = new xxVolet({
                initContent: [new xxLabel({ textVariable: "Le volet" })],
                onClose: () => { },
                position: enumPositionVolet.droite
            })

            div.asHolder.append(volet)

            volet.fermer();

            ici.append(new xxBouton({
                textVariable: "Ouvrir volet",
                titleVariable: "Ouvrir le volet",
                click: cb => {
                    volet.afficher();
                    cb();
                }
            }))

            ici.append(div);

        }, 2, xxVolet)

        ajouter('xxZoneRepliable', '', function (ici: xElementHolder) {
            let zoneRepliable = new xxZoneRepliable({
                renderTitre: function (titre) {
                    titre.append(new xxLabel({ textVariable: "Je suis une zone repliable", type: enumTypeLabel.titre }));
                },
                renderDetail: function (details, plier) {
                    details.append(new xxLabel({ textVariable: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/> Quisque volutpat sit amet risus id faucibus. <br/> Curabitur finibus ut ipsum laoreet dictum. <br/> Cras vehicula ex quis ligula rutrum consequat. <br/>" }));
                    details.append(new xxBouton({
                        click: function (cb) { plier(true); cb(); },
                        titleVariable: "Replier",
                        textVariable: "Replier"
                    }));
                },
                plie: true,
                fullTitleToggle: true,
                flechePosition: enumXxZoneRepliablePosition.droite
            });

            ici.append(zoneRepliable);

        }, 2, xxZoneRepliable);


        ajouter('xxPlanningBis', 'Planning Dates', (ici: xElementHolder) => {

            let rdvs: PlanningRdv[] = [];
            let dispos: PlanningDisponibilite[] = [];

            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 12:00')), "", enumTypeDispo.Planning));
            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/03/2020 08:00')), DateSerialisable.Factory(new Date('10/03/2020 12:00')), "", enumTypeDispo.Planning));
            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/04/2020 08:00')), DateSerialisable.Factory(new Date('10/04/2020 12:00')), "", enumTypeDispo.Planning));
            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 19:00')), "", enumTypeDispo.Planning));
            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/03/2020 14:00')), DateSerialisable.Factory(new Date('10/03/2020 19:00')), "", enumTypeDispo.Planning));
            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/04/2020 14:00')), DateSerialisable.Factory(new Date('10/04/2020 19:00')), "", enumTypeDispo.Planning));

            dispos.push(new PlanningDisponibilite("Barre 1", "1", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 10:00')), "#B0FFED", enumTypeDispo.Barre));
            dispos.push(new PlanningDisponibilite("Barre 1(bis)", "2", DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "#A3D7FF", enumTypeDispo.Barre));
            dispos.push(new PlanningDisponibilite("Barre 1(ter)", "3", DateSerialisable.Factory(new Date('10/02/2020 10:00')), DateSerialisable.Factory(new Date('10/02/2020 12:00')), "#A3FFA9", enumTypeDispo.Barre));

            dispos.push(new PlanningDisponibilite("Barre 2", "", DateSerialisable.Factory(new Date('10/03/2020 08:00')), DateSerialisable.Factory(new Date('10/03/2020 12:00')), "forestgreen", enumTypeDispo.Barre));
            dispos.push(new PlanningDisponibilite("Barre 3", "", DateSerialisable.Factory(new Date('10/04/2020 08:00')), DateSerialisable.Factory(new Date('10/04/2020 12:00')), "coral", enumTypeDispo.Barre));
            dispos.push(new PlanningDisponibilite("Barre 4", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 19:00')), "cornflowerblue", enumTypeDispo.Barre));
            dispos.push(new PlanningDisponibilite("Barre 5", "", DateSerialisable.Factory(new Date('10/03/2020 14:00')), DateSerialisable.Factory(new Date('10/03/2020 19:00')), "cornflowerblue", enumTypeDispo.Barre));
            dispos.push(new PlanningDisponibilite("Barre 6", "", DateSerialisable.Factory(new Date('10/04/2020 14:00')), DateSerialisable.Factory(new Date('10/04/2020 19:00')), "cornflowerblue", enumTypeDispo.Barre));

            dispos.push(new PlanningDisponibilite("bloc 1 col 1", "", DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "palevioletred", enumTypeDispo.Bloc, "", 1));
            dispos.push(new PlanningDisponibilite("bloc 2 col 1", "", DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "forestgreen", enumTypeDispo.Bloc, "", 2));
            dispos.push(new PlanningDisponibilite("bloc 3 col 1", "", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "coral", enumTypeDispo.Bloc, "", 3));

            dispos.push(new PlanningDisponibilite("bloc 1 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 13:00')), DateSerialisable.Factory(new Date('10/02/2020 17:00')), "cornflowerblue", enumTypeDispo.Bloc, "", 1));
            dispos.push(new PlanningDisponibilite("bloc 2 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 18:00')), "cornflowerblue", enumTypeDispo.Bloc, "", 2));
            dispos.push(new PlanningDisponibilite("bloc 3 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 15:00')), DateSerialisable.Factory(new Date('10/02/2020 18:00')), "cornflowerblue", enumTypeDispo.Bloc, "", 3));

            rdvs.push(new PlanningRdv("Libelle 1 planning 1", 1, null, null, DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00'))));
            rdvs.push(new PlanningRdv("Libelle 2 planning 1", 2, null, null, DateSerialisable.Factory(new Date('10/02/2020 09:15')), DateSerialisable.Factory(new Date('10/02/2020 11:35'))));
            rdvs.push(new PlanningRdv("Libelle 3 planning 1", 3, null, null, DateSerialisable.Factory(new Date('10/02/2020 15:00')), DateSerialisable.Factory(new Date('10/02/2020 17:30'))));
            rdvs.push(new PlanningRdv("Libelle 4 planning 1", 4, null, null, DateSerialisable.Factory(new Date('10/02/2020 15:10')), DateSerialisable.Factory(new Date('10/02/2020 18:00'))));
            rdvs.push(new PlanningRdv("Libelle 5 planning 1", 5, null, null, DateSerialisable.Factory(new Date('10/02/2020 16:30')), DateSerialisable.Factory(new Date('10/02/2020 18:30'))));
            rdvs.push(new PlanningRdv("Libelle 6 planning 1", 6, null, null, DateSerialisable.Factory(new Date('10/02/2020 12:00')), DateSerialisable.Factory(new Date('10/02/2020 14:30'))));


            let planningBis = new xxPlanning({
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


            ici.append(planningBis);

        }, 2, xxPlanning);

        ajouter('xxPlanningBis', 'Planning Ressources', ici => {

            let rdvs: PlanningRdv[] = [];
            let dispos: PlanningDisponibilite[] = [];
            let ressources: PlanningRessource[] = [];

            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 12:00')), "", enumTypeDispo.Planning, "1"));
            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 12:00')), "", enumTypeDispo.Planning, "2"));
            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 12:00')), "", enumTypeDispo.Planning, "3"));
            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 19:00')), "", enumTypeDispo.Planning, "1"));
            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 19:00')), "", enumTypeDispo.Planning, "2"));
            dispos.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 19:00')), "", enumTypeDispo.Planning, "3"));

            dispos.push(new PlanningDisponibilite("bloc 1 col 1", "", DateSerialisable.Factory(new Date('10/02/2020 08:00')), DateSerialisable.Factory(new Date('10/02/2020 10:00')), "#1E35FF", enumTypeDispo.Bloc, "2", 1));
            dispos.push(new PlanningDisponibilite("bloc 1 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), "#9B10E8", enumTypeDispo.Bloc, "2", 2));
            dispos.push(new PlanningDisponibilite("bloc 1 col 3", "", DateSerialisable.Factory(new Date('10/02/2020 10:00')), DateSerialisable.Factory(new Date('10/02/2020 12:00')), "#FF7100", enumTypeDispo.Bloc, "2", 3));
            dispos.push(new PlanningDisponibilite("bloc 1 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 13:00')), DateSerialisable.Factory(new Date('10/02/2020 17:00')), "#9B10E8", enumTypeDispo.Bloc, "1", 1));
            dispos.push(new PlanningDisponibilite("bloc 2 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 14:00')), DateSerialisable.Factory(new Date('10/02/2020 18:00')), "#1E35FF", enumTypeDispo.Bloc, "1", 2));
            dispos.push(new PlanningDisponibilite("bloc 3 col 2", "", DateSerialisable.Factory(new Date('10/02/2020 15:00')), DateSerialisable.Factory(new Date('10/02/2020 18:00')), "#FF7100", enumTypeDispo.Bloc, "1", 3));

            rdvs.push(new PlanningRdv("Libelle 1", 1, 0, 0, DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), 1, "#0DFF94"));
            rdvs.push(new PlanningRdv("Libelle 2", 2, 1, 1, DateSerialisable.Factory(new Date('10/02/2020 09:15')), DateSerialisable.Factory(new Date('10/02/2020 11:35')), 1, "#0D63FF"));
            rdvs.push(new PlanningRdv("Libelle 3", 3, 2, 2, DateSerialisable.Factory(new Date('10/02/2020 15:00')), DateSerialisable.Factory(new Date('10/02/2020 17:30')), 2, "#FF0D6D"));
            rdvs.push(new PlanningRdv("Libelle 4", 4, 3, 3, DateSerialisable.Factory(new Date('10/02/2020 15:10')), DateSerialisable.Factory(new Date('10/02/2020 18:00')), 3, "#0D63FF"));
            rdvs.push(new PlanningRdv("Libelle 5", 5, 4, 4, DateSerialisable.Factory(new Date('10/02/2020 16:30')), DateSerialisable.Factory(new Date('10/02/2020 18:30')), 3, "#FF0D6D"));
            rdvs.push(new PlanningRdv("Libelle 6", 6, 5, 5, DateSerialisable.Factory(new Date('10/02/2020 12:00')), DateSerialisable.Factory(new Date('10/02/2020 14:30')), 1, "#FFAA69"));

            ressources.push(new PlanningRessource("Salle 1", 1));
            ressources.push(new PlanningRessource("Salle 2", 2));
            ressources.push(new PlanningRessource("Salle 3", 3));
            ressources.push(new PlanningRessource("Salle 4", 4));
            ressources.push(new PlanningRessource("Salle 5", 5));

            let planningBis = new xxPlanning({
                DateDebut: DateSerialisable.Factory(new Date('10/02/2020')),
                Rdv: rdvs,
                Ressources: ressources,
                Dispo: dispos,
                HeureDebut: 8,
                TimeLineNow: true,
                HeureFin: 20,
                AddRdvOnClick: {
                    CouleurRdv: "", DureeRdv: 30, Id: 0, IdExterne: 0, LibelleRdv: "new", RdvAdded: (rdv) => { alert("new rdv"); }
                },
                ZoomPlanning: {
                    ZoomChoisi: 100,
                },
                ClickSurDispoBarre: (dispo) => {
                    // console.log(dispo);
                },
                ClickSurEnteteColonne: (div, colonne) => {
                    //console.log(colonne);
                },
                ClickSurRdv: (rdv) => {
                    console.log(rdv);
                }
            })

            ici.append(planningBis);

        }, 2, xxPlanning)

        ajouter('xxPlanningBis', 'Drag&Drop, agrandissement', ici => {

            let rdvs: PlanningRdv[] = [];

            let ressources: PlanningRessource[] = [];

            rdvs.push(new PlanningRdv("Libelle 1", 1, 0, 0, DateSerialisable.Factory(new Date('10/02/2020 09:00')), DateSerialisable.Factory(new Date('10/02/2020 11:00')), 1, "#0DFF94"));
            rdvs.push(new PlanningRdv("Libelle 2", 2, 1, 1, DateSerialisable.Factory(new Date('10/02/2020 09:15')), DateSerialisable.Factory(new Date('10/02/2020 11:35')), 1, "#0D63FF"));
            rdvs.push(new PlanningRdv("Libelle 3", 3, 2, 2, DateSerialisable.Factory(new Date('10/02/2020 15:00')), DateSerialisable.Factory(new Date('10/02/2020 17:30')), 2, "#FF0D6D"));
            rdvs.push(new PlanningRdv("Libelle 4", 4, 3, 3, DateSerialisable.Factory(new Date('10/02/2020 15:10')), DateSerialisable.Factory(new Date('10/02/2020 18:00')), 3, "#0D63FF"));
            rdvs.push(new PlanningRdv("Libelle 5", 5, 4, 4, DateSerialisable.Factory(new Date('10/02/2020 16:30')), DateSerialisable.Factory(new Date('10/02/2020 18:30')), 3, "#FF0D6D"));
            rdvs.push(new PlanningRdv("Libelle 6", 6, 5, 5, DateSerialisable.Factory(new Date('10/02/2020 12:00')), DateSerialisable.Factory(new Date('10/02/2020 14:30')), 1, "#FFAA69"));

            ressources.push(new PlanningRessource("Salle 1", 1));
            ressources.push(new PlanningRessource("Salle 2", 2));
            ressources.push(new PlanningRessource("Salle 3", 3));

            let planningBis = new xxPlanning({
                DateDebut: DateSerialisable.Factory(new Date('10/02/2020')),
                Rdv: rdvs,
                Ressources: ressources,
                HeureDebut: 8,
                TimeLineNow: true,
                HeureFin: 20,
                DragAndDropRdv: {
                },
                AgrandirRdv: {
                    ApresAgrandissement: rdv => {
                        console.log(rdv)
                    }
                },
                ClickSurRdv: (rdv) => {
                    console.log(rdv);
                }
            })

            ici.append(planningBis);

        }, 2, xxPlanning)

        ajouter('xxPlanneur', 'Affiche des rdv asociés à une ressource en fonction du temps ', function (ici: xElementHolder) {
            let ressources: PlanneurRessource[] = [];
            ressources.push(new PlanneurRessource("Salle 201", '201'));
            ressources.push(new PlanneurRessource("Salle 211", '211'));
            ressources.push(new PlanneurRessource("Salle 203", '203'));
            ressources.push(new PlanneurRessource("Salle 205", '205'));
            ressources.push(new PlanneurRessource("Salle 208", '208'));
            ressources.push(new PlanneurRessource("Salle 215", '215'));


            rdvs.push(new PlanneurRDV("rdv 1", '1', DateSerialisable.FactoryByFrenchDateString('05/08/2018 08:52'), DateSerialisable.FactoryByFrenchDateString('05/10/2018 08:00'), ['201'], null, "orange"));
            rdvs.push(new PlanneurRDV("rdv 2", '2', DateSerialisable.FactoryByFrenchDateString('05/08/2018 14:00'), DateSerialisable.FactoryByFrenchDateString('05/12/2018 23:59'), ['203'], null, "chocolate"));
            rdvs.push(new PlanneurRDV("rdv 3", '3', DateSerialisable.FactoryByFrenchDateString('05/10/2018 09:00'), DateSerialisable.FactoryByFrenchDateString('05/11/2018 12:30'), ['208'], null, "blueviolet"));
            rdvs.push(new PlanneurRDV("rdv 4", '4', DateSerialisable.FactoryByFrenchDateString('05/09/2018 08:00'), DateSerialisable.FactoryByFrenchDateString('05/10/2018 09:30'), ['208'], null, "cornflowerblue"));
            rdvs.push(new PlanneurRDV("rdv 5", '4', DateSerialisable.FactoryByFrenchDateString('05/10/2018 13:00'), DateSerialisable.FactoryByFrenchDateString('05/11/2018 14:00'), ['215'], null, "forestgreen"));
            rdvs.push(new PlanneurRDV("rdv 6", '1', DateSerialisable.FactoryByFrenchDateString('05/12/2018 08:50'), DateSerialisable.FactoryByFrenchDateString('05/12/2018 16:00'), ['215'], null, "orange"));

            planneur = new xxPlanneur({
                listeRessources: ressources,
                dateDebut: DateSerialisable.FactoryByFrenchDateString('05/08/2018'),
                nbJours: 4,
                displayRdv: function (ici, rdv) {
                    ici.append(new xSpan({ class: "titre", textVariable: rdv.Libelle }));
                    ici.y.style.background = rdv.Couleur;
                },
                selectRessource: function (ressource) {
                    xOutils.afficherMessageAlertify(ressource.Id.toString(), ETypeAlertify.log);
                }
            });

            ici.append(planneur);

        }, 2, xxPlanneur);

        ajouter("xxInputSpeech", "Input avec reconnaissance vocale", function (ici: xElementHolder) {
            //ici.append(new xxInputSpeech({}));
        }, 2, xxInputSpeech);

        // ************ //
        // xxIndicateur //
        // ************ //
        ajouter("xxIndicateur", "xxIndicateur Title simple", function (ici: xElementHolder) {
            ici.append(new xxIndicateur({
                indicateur: new IconeP12(enumIconeP12.action_envoi_message),
                titleVariable: "Prescription prolongées"
            }));

        }, 2, xxIndicateur);

        ajouter("xxIndicateur", "xxIndicateur Title avec un ou plusieurs nombres en Notif(la notif peut-etre de differente couleur)", function (ici: xElementHolder) {
            let divtest: xDiv = new xDiv({});

            let notifbind: BindableObject<number> = new BindableObject<number>(8);
            let indica: xxIndicateur = new xxIndicateur({
                indicateur: new IconeP12(enumIconeP12.action_envoi_message),
                titleVariable: "Nombre de prescription prolongées",
                Notif: [{
                    nbNotifBindable: notifbind,
                    NotifColor: EnumXxIndicateurNotifColor.Bleu
                },
                {
                    nbNotif: 5,
                    NotifColor: EnumXxIndicateurNotifColor.Orange
                }]
            });

            ici.append(new xxListeDeroulante<EnumXxIndicateurNotifColor>({
                defaultValue: EnumXxIndicateurNotifColor.Bleu,
                donnees: [EnumXxIndicateurNotifColor.Bleu, EnumXxIndicateurNotifColor.Orange, EnumXxIndicateurNotifColor.Rouge],
                renderSelected: (p, item, op) => {
                    p.append(new xxBouton({
                        textVariable: item.toString(),
                        titleVariable: "sélection",
                        click: (e) => {
                            op(item);
                            e();
                        },
                       
                    }))
                },
                renderSelectItem: (p, item, sele) => {
                    p.append(new xxBouton({
                        textVariable: item.toString(),
                        titleVariable: "sélection",
                        click: (e) => {
                            sele(item);
                            e();
                        },
                       
                    }));
                },
                selected: (enu) => {
                    indica.removeNotif(0);
                    indica.addNotif({
                        nbNotifBindable: notifbind,
                        NotifColor: enu,
                        NotifTitleLocalise: "Nouvelle Notif"
                    }, 0);
                }
            }));

            ici.append(new xxBouton({
                textVariable: "ajouter 1 au nombre de notif",
                titleVariable: "click",
                click: (e) => {
                    notifbind.Value++;
                    e();
                }
            }));

            divtest.asHolder.empty().append(indica);

            ici.append(divtest);

        }, 2, xxIndicateur);

        ajouter("xxIndicateur", "xxIndicateur Tooltip simple", function (ici: xElementHolder) {
            ici.append(new xxIndicateur({
                indicateur: new IconeP12(enumIconeP12.action_envoi_message),
                toolTipContent: new xxStackPanel({
                    initContent: [
                        new xxLabel({ textVariable: "------------------1------------------" }),
                        new xxLabel({ textVariable: "------------------2------------------" }),
                        new xxLabel({ textVariable: "------------------3------------------" }),
                        new xxLabel({ textVariable: "------------------4------------------" })
                    ]
                }),
                TooltipStopPropagation: true
            }));

        }, 2, xxIndicateur);

        ajouter("xxIndicateur", "xxIndicateur Tooltip avec un ou plusieur nombre en Notif(la notif peut-etre de differente couleur)", function (ici: xElementHolder) {
            let divtest: xDiv = new xDiv({});

            let notifbind: BindableObject<number> = new BindableObject<number>(8);
            let indica: xxIndicateur = new xxIndicateur({
                indicateur: new IconeP12(enumIconeP12.action_envoi_message),
                toolTipContent: new xxStackPanel({
                    initContent: [
                        new xxLabel({ textVariable: "------------------1------------------" }),
                        new xxLabel({ textVariable: "------------------2------------------" }),
                        new xxLabel({ textVariable: "------------------3------------------" }),
                        new xxLabel({ textVariable: "------------------4------------------" })
                    ]
                }),
                TooltipStopPropagation: true,
                Notif: [{
                    nbNotif: 8,
                    NotifColor: EnumXxIndicateurNotifColor.Bleu
                },
                {
                    nbNotif: 5,
                    NotifColor: EnumXxIndicateurNotifColor.Orange
                }]
            });

            ici.append(new xxListeDeroulante<EnumXxIndicateurNotifColor>({
                defaultValue: EnumXxIndicateurNotifColor.Bleu,
                donnees: [EnumXxIndicateurNotifColor.Bleu, EnumXxIndicateurNotifColor.Orange, EnumXxIndicateurNotifColor.Rouge],
                renderSelected: (p, item, op) => {
                    p.append(new xxBouton({
                        textVariable: item.toString(),
                        titleVariable: "sélection",
                        click: (e) => {
                            op(item);
                            e();
                        },
                      
                    }))
                },
                renderSelectItem: (p, item, sele) => {
                    p.append(new xxBouton({
                        textVariable: item.toString(),
                        titleVariable: "sélection",
                        click: (e) => {
                            sele(item);
                            e();
                        },
                      
                    }));
                },
                selected: (enu) => {
                    indica.removeNotif(0);
                    indica.addNotif({
                        nbNotifBindable: notifbind,
                        NotifColor: enu,
                        NotifTitleLocalise: "Nouvelle Notif"
                    }, 0);
                }
            }));

            ici.append(new xxBouton({
                textVariable: "ajouter 1 au nombre de notif",
                titleVariable: "click",
                click: (e) => {
                    notifbind.Value++;
                    e();
                }
            }));

            divtest.asHolder.empty().append(indica);

            ici.append(divtest);

        }, 2, xxIndicateur);

        ajouter("xxIndicateur", "xxIndicateur avec les notifications toujours affichées ou qui gardent leurs places, mêmes cachées", function (ici: xElementHolder) {
            let divtest: xDiv = new xDiv({});
            let indica: xxIndicateur;

            let functionGenerateIndica: (AlwaysNotif?: boolean, AlwaysTakePlace?: boolean) => void =
                (AlwaysNotif?: boolean, AlwaysTakePlace?: boolean) => {
                    indica = new xxIndicateur({
                        NotifAlwaysShow: AlwaysNotif,
                        NotifHideAlwaysTakePlace: AlwaysTakePlace,
                        indicateur: new IconeP12(enumIconeP12.action_envoi_message),
                        titleVariable: "Nombre de prescriptions prolongées",
                        Notif: [{
                            nbNotif: 0,
                            NotifColor: EnumXxIndicateurNotifColor.Bleu
                        },
                        {
                            nbNotif: 5,
                            NotifColor: EnumXxIndicateurNotifColor.Orange
                        }]
                    });
                    divtest.asHolder.empty().append(indica);
                };

            ici.append(new xxBouton({
                textVariable: "notification cachée si égale a 0",
                titleVariable: "click",
                click: (e) => {
                    functionGenerateIndica();
                    e();
                }
            }));

            ici.append(new xxBouton({
                textVariable: "notification toujours affichée",
                titleVariable: "click",
                click: (e) => {
                    functionGenerateIndica(true, false);
                    e();
                }
            }));

            ici.append(new xxBouton({
                textVariable: "notification qui garde sa place, même cachée",
                titleVariable: "click",
                click: (e) => {
                    functionGenerateIndica(false, true);
                    e();
                }
            }));

            functionGenerateIndica();

            ici.append(divtest);

        }, 2, xxIndicateur);

        ajouter("xxZoom", "enumAffichageZoom : modeSlider", ici => {
            ici.append(new xxZoom({
                afterZoom: (zoom) => {
                    xOutils.afficherMessageAlertifyLog("Le zoom choisi : " + zoom.toString());
                },
                niveauxZoomPerCent: [25, 50, 75, 100, 125, 150, 175, 200]
            }))
        }, 2, xxZoom);

        ajouter("xxZoom", "enumAffichageZoom : modeListeHorizontale", ici => {
            ici.append(new xxZoom({
                afterZoom: (zoom) => {
                    xOutils.afficherMessageAlertifyLog("Le zoom choisi : " + zoom.toString());
                },
                modeAffichage: enumAffichageZoom.modeListeHorizontale,
                niveauxZoomPerCent: [100, 125, 150, 175, 200]
            }))
        }, 2, xxZoom);

        ajouter("xxZoom", "enumAffichageZoom : modeListeVerticale", ici => {
            ici.append(new xxZoom({
                afterZoom: (zoom) => {
                    xOutils.afficherMessageAlertifyLog("Le zoom choisi : " + zoom.toString());
                },
                modeAffichage: enumAffichageZoom.modeListeVerticale,
                niveauxZoomPerCent: [100, 125, 150, 175, 200]
            }))
        }, 2, xxZoom);



        ajouter("xxQrCodeReader", "mode onDetect", ici => {
            let q = new xxQrCodeReader({
                onDetect: (s) => {
                    xOutils.afficherMessageAlertifySuccess(s);
                    q.stop();
                }
            });
            let c = new xxBouton({
                textVariable: 'go',
                titleVariable: 'demarrer la webcam',
                click: (cb) => { cb(); q.start(); }
            })

            ici.append(c).append(q);
        }, 2, xxQrCodeReader);


        ajouter("xxQrCodeReader", "mode binding", ici => {
            let b = new BindableObject<string>();

            let q = new xxQrCodeReader({ binding: { value: b } });
            let l = new xxLabel({ binding: { value: b } });

            let c = new xxBouton({
                textVariable: 'go',
                titleVariable: 'demarrer la webcam',
                click: (cb) => { cb(); q.start(); }
            })
            let c2 = new xxBouton({
                textVariable: 'stop',
                titleVariable: 'arrêter la webcam',
                click: (cb) => { cb(); q.stop(); }
            })

            ici.append(c).append(c2)
                .append(q)
                .append(l);

        }, 2, xxQrCodeReader);

        ajouter('xxProgressBar', "Barre de progression avec titre: Elements validés et nbTotalElements: 50", function (ici: xElementHolder) {
            let barreProgression: xxProgressBar;
            let nb = 0;
            let stackPanel: xxStackPanel = new xxStackPanel({
                initContent: [
                    new xxBouton({
                        titleVariable: "+1 à la barre de progression ",
                        textVariable: "Faire avancer la barre de progression :",
                        click: cb => {
                            nb += 1;
                            barreProgression.setProgression(nb);
                            cb();
                        }
                    }),
                    barreProgression = new xxProgressBar({
                        nbTotalElements: 50,
                        titre: "Elements validés : "
                    })
                ]
            });

            ici.append(stackPanel);
        }, 2, xxProgressBar);


        let tabPhoto: string[] = ["iVBORw0KGgoAAAANSUhEUgAAASwAAADHCAYAAACjiW6AAAAgAElEQVR4XnS9WYwkZ5LnZ + 4RHmeedWXdVawii0UW2TxmenamZweDmV1JgPZBwOpF0Iv0JkGABO3b6noTIEDvEvQmCAKEFbCLFRZYaSWsMLO709sckk2yik128yaLxbrzzrg83MOF39 / si0z2jJJIFKsyI8Ldv + 8z + 9vf / maW / dP / 6x82Fl + ZZZblmRl / 8oct4jv9xonfzDJrtdonftd / lmW8Vi / +0ddi0Sx / lmV85PJj9X / pFby2aeJ9dC3 + lfO + ea6f8YLFgmszy / P8R5 / j7 + 1f + t0Tn / Pb19T4L / h1W2Z5nlme5bpOfpZ + rus7cS16OHHRXFcd13LyOv3zG72v2fE1Ns0iXvpXn5E / tuN / b5raFovasiy3Viu3qqr0DPTeC64vrdNf87wtPW8tirXylp5ZXddmTWatrG0N / +nafc2W3 / lCt8ia8fm8ztfPrGU8n + On2vD / TWPcle40ntvy2Z7YC1X943VPz8if9ULfCz2zWHOtN9fQmDWt5efwO / w768W1L9LjzWPv8euLhbUWpvvO81b86dd + 8qtq5tbOc8uztm5qXs6t0XVmtsgWVje19hCfpX1h / N33C08jXZ + uX2vCUzWruQ / to4U1VW2WLaypa / 1dzzl + j73B / uGuuc20b / 330vstYm9mVrQLfXJ6vq1Wy6 + HG8u4npa / f55ZXdVab77n1dyahVlV11bNK6urSn + ms9rYzBbNPN630c / 4XdafYzKrMr1PVc2tnJW2aBbaj3zPZ6Vx7Drtll26cN5uvnDNzl84Z4PVgbU7XSvr2nZ39u3 + dw / s4w / v2heffGJNWRo7cL7IbFpWZkXPusNVa / WGlncHZnlho3JmT58 / s53tbTvY39OaZj8yWNq06aCzTL5Yy684pHog + kc2QL7cOHpmS4P1453BMvq / 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",
            "/9j/4AAQSkZJRgABAQEBLAEsAAD / 4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD / 7QAsUGhvdG9zaG9wIDMuMAA4QklNA + 0AAAAAABABLAAAAAEAAQEsAAAAAQAB / +IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA / gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA + wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB + gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA + wD + QQGBBMEIAQtBDsESARVBGMEcQR + BIwEmgSoBLYExATTBOEE8AT + BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe / B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC + EL + QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5 / DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw / PD + wQCRAmEEMQYRB + EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE + UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF / cYGxhAGGUYihivGNUY + hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6 + HukfEx8 + H2kflB + /H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL / 4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M / E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA + ID5gPqA + 4D8hP2E / oj / iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU / ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV + zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY + tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ + loP2iWaOxpQ2maafFqSGqfavdrT2una / 9sV2yvbQhtYG25bhJua27Ebx5veG / RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY + dpt2 + HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ + wn8jf4R / 5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5 + IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN / 45mjs6PNo + ekAaQbpDWkT + RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5 / 6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS + /796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8 + 40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1 + DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36 / gNuC94UThzOJT4tvjY + Pr5HPk / OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///+FJKmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4NCgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPg0KCQkJPGRjOmZvcm1hdD5pbWFnZS9qcGVnPC9kYzpmb3JtYXQ+DQoJCQk8ZGM6dGl0bGU+DQoJCQkJPHJkZjpBbHQ+DQoJCQkJCTxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q2hyb25pYyBXb3VuZCBpbnRybyBpbWFnZTwvcmRmOmxpPg0KCQkJCTwvcmRmOkFsdD4NCgkJCTwvZGM6dGl0bGU+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcEdJbWc9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9nL2ltZy8iPg0KCQkJPHhtcDpNZXRhZGF0YURhdGU+MjAxMy0wNC0xMlQwOTozOTozNS0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4NCgkJCTx4bXA6TW9kaWZ5RGF0ZT4yMDEzLTA0LTEyVDEzOjM5OjM3WjwveG1wOk1vZGlmeURhdGU+DQoJCQk8eG1wOkNyZWF0ZURhdGU+MjAxMy0wNC0xMlQwOTozOTozNC0wNDowMDwveG1wOkNyZWF0ZURhdGU+DQoJCQk8eG1wOkNyZWF0b3JUb29sPkFkb2JlIElsbHVzdHJhdG9yIENTNiAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4NCgkJCTx4bXA6VGh1bWJuYWlscz4NCgkJCQk8cmRmOkFsdD4NCgkJCQkJPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+DQoJCQkJCQk8eG1wR0ltZzp3aWR0aD4yNTY8L3htcEdJbWc6d2lkdGg+DQoJCQkJCQk8eG1wR0ltZzpoZWlnaHQ+MTAwPC94bXBHSW1nOmhlaWdodD4NCgkJCQkJCTx4bXBHSW1nOmZvcm1hdD5KUEVHPC94bXBHSW1nOmZvcm1hdD4NCgkJCQkJCTx4bXBHSW1nOmltYWdlPi85ai80QUFRU2taSlJnQUJBZ0VBU0FCSUFBRC83UUFzVUdodmRHOXphRzl3SURNdU1BQTRRa2xOQSswQUFBQUFBQkFBU0FBQUFBRUENCkFRQklBQUFBQVFBQi8rNEFEa0ZrYjJKbEFHVEFBQUFBQWYvYkFJUUFCZ1FFQkFVRUJnVUZCZ2tHQlFZSkN3Z0dCZ2dMREFvS0N3b0sNCkRCQU1EQXdNREF3UURBNFBFQThPREJNVEZCUVRFeHdiR3hzY0h4OGZIeDhmSHg4Zkh3RUhCd2NOREEwWUVCQVlHaFVSRlJvZkh4OGYNCkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zi84QUFFUWdBWkFFQUF3RVINCkFBSVJBUU1SQWYvRUFhSUFBQUFIQVFFQkFRRUFBQUFBQUFBQUFBUUZBd0lHQVFBSENBa0tDd0VBQWdJREFRRUJBUUVBQUFBQUFBQUENCkFRQUNBd1FGQmdjSUNRb0xFQUFDQVFNREFnUUNCZ2NEQkFJR0FuTUJBZ01SQkFBRklSSXhRVkVHRTJFaWNZRVVNcEdoQnhXeFFpUEINClV0SGhNeFppOENSeWd2RWxRelJUa3FLeVkzUENOVVFuazZPek5oZFVaSFREMHVJSUpvTUpDaGdaaEpSRlJxUzBWdE5WS0JyeTQvUEUNCjFPVDBaWFdGbGFXMXhkWGw5V1oyaHBhbXRzYlc1dlkzUjFkbmQ0ZVhwN2ZIMStmM09FaFlhSGlJbUtpNHlOam8rQ2s1U1ZscGVZbVoNCnFibkoyZW41S2pwS1dtcDZpcHFxdXNyYTZ2b1JBQUlDQVFJREJRVUVCUVlFQ0FNRGJRRUFBaEVEQkNFU01VRUZVUk5oSWdaeGdaRXkNCm9iSHdGTUhSNFNOQ0ZWSmljdkV6SkRSRGdoYVNVeVdpWTdMQ0IzUFNOZUpFZ3hkVWt3Z0pDaGdaSmpaRkdpZGtkRlUzOHFPend5Z3ANCjArUHpoSlNrdE1UVTVQUmxkWVdWcGJYRjFlWDFSbFptZG9hV3ByYkcxdWIyUjFkbmQ0ZVhwN2ZIMStmM09FaFlhSGlJbUtpNHlOam8NCitEbEpXV2w1aVptcHVjblo2ZmtxT2twYWFucUttcXE2eXRycSt2L2FBQXdEQVFBQ0VRTVJBRDhBa1duK1Z2OEFuSVMyK3N5V3pYd3YNCkE2eVFtKzFBU1FOS2tzN0lTcmFoZmM0aXJ4aHdxUWlnQTlOajhRVlRLTFJmenV1L01HbVhtc1I2ck5wc1BKVEdsMWJRekJSY0t5bTcNCmowN1U5S3RmVTQ4Nk1xVHJ3NGhvMmFveFZDNlpZLzhBT1VsbmJSd1NUdTluQnA5aEUwVmRObXZES3Nkc0xob0xtNGtrRWx3WDlmMUQNCmNmdTZVNEZpM3dxb3JSOUMvd0NjaGJLM3ZYTnpMRmR6Rzl2N3NJZExsUzR1NXZxU1J4VzVsVm1SVWpOeVllZkVjMFVTSGdSVlYxOXANCjMvT1NWNXA5N0cxemNSckxaM052YjI4YjZYQktUSmFhZ1lKWG5nNFBIY3BNdGtyR0tSWXd6TVYrSGRWVlM1UC9BRGs3SFB5aWk5YTMNClMvWDFJWXBkS2pkNEEwdkpZWkpZNWVOcVU5TDRwQWJnTnkySXhWWjU4OHNmbnZjL21OZVhmbHk1dTE4clhGOXBkd2lKZkpFcXcyYVENCnBQSEhHMHlsRW1NMHJTS0YrUDB0NjFXcXFCVFQvd0RuS0s2c0xTMzFlZTRjdmR3eVNOWXRwZG5JcVIzTnJKSXQwOGNuTDBQVFdjUi8NClYyNXZ0NmdveFFLcWtOdC96bERhYUhGWXdDVnJsTEMxaEZ3WnRMbmVPVllyTU5JclhKZDU1L1VGMExqMW5DTU9KamF2VlZPbDBYODENCjdqeWJwMzZidDlUdU5WYlhWdk5Zc3ROMUtPMXVUWU5ac0hqaG5TN3RrV01YRENrYXpENVV4VkJhVlkvODVNMmMwcXZjcE5aV1dtUVMNCldkcGNHeGxhNHVZQmJ5TmJQZGttWnBwNlR3eVNPb1JSUmxjc2FxcTNhNmYvQU01SldlcUFwT0xtSzRuZ2tubG1rczJnNWl5c2t1ZWMNCmJFdkZiK290ejZTV3dWdlUzZjRUVXFwaHAybS9uVGQrUWJHUHpTMTFlYXNtc0NYVTdYVHByWFRiK2JTaENSNlNUV3R4REFqaTRJZXENCnpvV2pGQ1F4SXhWS2YwSi96a1BhM01yNlpkM3NWdmRyYXcramQzV20zN1c2cGFXNnZLSkpvNCtVcXlMS3I4VUN1YXRSaWVSVlJPcjINCmYvT1NSMU9hMTA2K25Xd1M2bVUzeFhSU1d0a1M0K3F0YnEwZkw0NlEvV2ZWUUgxRCs3QVN1S296eTlhL24xYmVZOU9OOEhiU0o3MXANCnRTRHpXVXNheFB4OVVTY21lWkVDL3dDODZXMUtQWG1PTk1WU1hWL0ozNS9uelRxVXVsNmxjRFNEZVBCcHF5My9BTzcrcU5kUHFpenUNCm9sOVRad2xqVDdYbzFGT09Lb3hKZitjbEk0b0ZXR2VaSm5WQTh4MFVYTUtyY1diU1BkQ05saElhSVhhSjZISThTbkljOXdxaHJqVC8NCkFQbkpPYXl0Yk83bnU1bE1sdEpOYzJzbWsyODVZcnA4c3lUc25vMHQwZjY2aStoKzhKQzh1U0dwVlIvbWp5ditkaStjZGExN3k3ZVMNCm0yYTRtWFNMSjd1UXg4RHBLUnhPYmVXNitwZWo5Y0xuaWJjU0NRSzFTaE5GVU5acC93QTVScERHdHhMSFBNTFNiOTZ5YVpFQzM3LzANCi9VUldrcGVWOURpRVkyOUtoaVR1VlVVOFAvT1NKZ3VCYlhBVkRaM1U5bTkyTk1hN0U2elN3MjF0TXNLcmJtUnJkNHArU042ZnFJVkwNCmNXNDRxZ2xmL25JNncwZExyVU5RbG0xcWE0dHJDdzA5TEt5a3RuVzZpa1NTNnVqYXhUdEMxczdKSzVNeXhWUmxISU11S3Zjb0VlT0cNCk5KSkROSWloWGxZQUZ5QlFzUW9DZ25yc01WWDRxN0ZYWXE3RlhZcTdGWFlxN0ZYbTlucVA1d1c5dEE4bGg5Y2tjTUpsdVBxcU1yVWcNCnFmM0xvT05mVkVmZitZSGJGVmFIVmZ6ZmF6dElYMHEzV1V4eGZXYnJsR0pDNG1SWlBnOVJveCs3NWZQcUtmWnhWSHRKK1k5N3BGcEgNCndYVGRTK3ZCTHFSUkF3Rm1zTG5ueVkzQ2tzNFd0SXdRVFNsTjhWUTgrcmZtdkpBcXg2UGJReU16ZXBLckk1VkZvYWhXbW9UV3FqK2INCjdYdzlNVlhYMTMrWnFheEtMTzBFdGpETmNGUS8xY0pMR1k1R3R3cERDVFpnZ2F2SGZ2U3B4VkZXV28vbVBjWDg4TjFwdHRhMlN3eXQNCkRjTFF5TktJMTlOS2VzeXFTN0UvdERhbitWaXFWdGNmbS9hMmNGdDZVTjdNMEtUVDNvV0VPc2p5Z0dBQVBGR2VNZTViMDZmUEZWZWINClZQellNRXlKcGR0RzZ0TXNjbndTT1ZSUjZUMDlaVjVNYTlxZkxGV2VDdEJYcmlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGkNCnJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZmS3RqNTQ4MnVvOVRYYitoQXFUZFRkZitDekE0ejN1N0dLSGNQa20xbjV4ODBPM3gNCmF2ZTA4UHJNMy9OV0VaRDN0bmdRcmtQa24wSG1qekJJZy8zSlhmdy9hL2Z5ZC9mbGsrTXRNc01lNE1kMTNXUE85dGR4M3Rycm1vZWwNCjltNWlOMVA2ZnBBL2JDOC9oWlI5L1R3b2VJb0dLQTZCTXJEekg1cmVPc21yM3RBTzl4TFU5L0U5c2tDVXl4dzdoOGxXYnpKNWtFSi8NCjNNWGdrNmNmckV3b1BIWS94eU1pZTlJaEMvcEh5RER0WTg1K2NGdUQ2Zm1IVUZWd0dIQzd1RkEyNkQ0d2R1blRLakk5NWE1d2pmSUoNCldmUFBubFRRK1lkVC93Q2t5NC81cnpHbE9ZNmxqNGNlNEt0eitaM21qVDc2U0M1MTdVaEU3VmhsYTV1Q3A1VStFSGtSMTZETXdtWGUNCjM0bzR4c1FQa244WG0zejFORXJIV3J5RUU3Y3JtWW1udlI4ck9TWGU1UGc0K2tSOGdoTC9BTTBmbURBamVyck4vd0RFQ1E4VjVPTmoNCjBJSEx0Z0U1ZDdWTERBamFJK1NVYWw1Njg3TmFxNitZZFRqWWdjdUY1Y0x2VGZvK01ja2dlYmh6eFI3bUUzLzVrL21IQklmK2RzMWcNCktmOEF0WVhXMy9KVE13RWtPRklBSWIvbFpQNWtrY2g1dDFuaWR3ZjBoZGY5Vk1iS0tDMC9tYitaWC9VMmF6LzNFTHIvQUtxWWJSU2YNCmVYUE1INXA2ckp6bTgyYTNGYWdmYkdvWFFxZitSbVdSaVMxVHlBTXRzUFBmblIxSFBYOVJhdmY2M09mK044MS9pUzczYStISHVES04NCkU4MCthcGVKazFpL2N0Mk56TWR2K0N5bnhwRTh5NUVjRUs1Qk9aL01YbUlPa0RhbmVBU2lqTUxpWUVBN0doRGJIZkxQRWwzcU1FRDANCkh5Uk0ybzY5eENqV2I2TUlvTWNndXBqVStEVlk4dnB4bE9YZVdZeFFIOElQd0RHOWQ4NCthWWJDU1JkWHZZcFVVRWdYTW9vZm9iRXoNCmwzbFpZb2Z6UjhrQkQ1dTh5TklwbDE3VVZVZGY5TW4vQU9hOHFobGxmTXVETEVPNU4yODRYTXNWRDVqdmtJSFZidWNIL2lXWlFtZTkNCnBNQjNNUDhBTTNuanpYYWY4Yy96VHFNaFBRRzhtUDhBeHZqNDYvbDNxZWgrWmRiZFVJMUc2bjVmQ2ZVbWtQVC9BR1JvYWRjc0VqM3ANCkVSWEprNmExZnRIeFM1bjUwQnFaSDZrWk95bmdCNkpCcEhtRHpGRGZ0YTNsM2NzeU5SUzh4YmtvTkZhZ2FueFU3NGdsdGxqald3REkNCkx2Vk5SYyt1TG1hTkJzRUV6RGVuZWhwa2lqSEdQS2d3SHpici9tQzN1b0hqMW0rUmFrRklybVZCUXFkMkFZYmpJZ2xobXhnYmdKSFANCjVzODJMRVlKTmExQkhYKzZsK3N6QXVCNC9GMUdIZHBvTWZ1dk9YbmNNVkhtRFUxcDFwZVhBLzQzd0FvTVFvU2VjZlBQRGJ6SHFnLzYNClBiai9BSnJ4SktnQktMTytYaWdIM2Q4eEhieExJN0dkU0FWTkNQNjR0Z0tmMjF3T1c1cDIzT1NCVXBweVdhSGlwK01pbFR2V3UzZkwNCkFXbVVVTUlHaFFxQ1dHLzNkY2tGb0VwVnFGOHFJd1dwSFJSeG9NaVpNdUJpRHM4MS9PNUZZd2hxS2QrUTNvTXFMUlBtaEo0aUN5dHMNCnlIWTAramZLNVJ0UW51dmFmSEhhbTVWUXhpZFdmeENnaXArN0xxMmI2Rm8vU3RVdFR4am1vWVc3K0gzWUkrYmNicXdtZDNZMi9wQm8NCnlIallWQkc5QjRWd1NnQnlSREtUellqNWgwNlAwMjlQNFhxVFFDbGRzZ0FiWVpzWUlzUE10ZTBEVlpIWm9BSm8vYlp1dmdjeXNlU1ANClYxR1RGTG9sK2wyR29DZU8xdTBraGprZFVXUjFJQURHbGQ4dmlCSWdXMFRKaUNhNVBZdEwvTHJ5dzFtZ01Qck1SVXlzeDVFK094emUNCncwT091VHplVHRMTHhiR2s5aDBGYlMzRU1OUFRIUWNhSDd4bFowQUhJczQ5cEU4d3dMU2I3MUpGakIrMlFBZm1hWnljOWc5eEY2Ym8NCkVhTFJ5YURZRDVaVGpOYnVVZVNKMUpuL0FFbGJQQ0NZM0JFaDhDS0ZhZmRsdkh1aUZzaU1VamFjQngyNi93QzNsdzNERUdwTUE4N2cNCjJ0c0xsRTlZYzBFMElIMjBNZ0JIVEt5RTVUdFlRZDJMR2UwU2FIY01ONjlSdDBQdmxCalJhZWJISnRGMCs2Y2h3eUU5MUpHVEVpR0gNCmh4UU4zNUpRME1OMjZnZGp2aU12a3ZBOUc4cDY0WjdOSlVKTEtuSWtkUEUxMzcvNTB6T0RoMnpXMDFOZUtzYUx2MEIycDg4bUMzeEMNCk9ZeFRuMTFOSmU3QVY1ZXhPRkJHNnlhOGs5T2prbEl6OWpzVDkrRkkyWVA1ajFXTlp2M3ZKNlB6NURyeFUvSFJmZGE1QU5tY2VoSjcNCnFKZlVhMVpqUUV0RTFhRWY3V0xocFcwUlppa24yaDF5VEdXeWkxdlVFZmRnS0JKak9tM0hxRWIvQUJDaEZlbVk4ZzdDRXJaUFlYRW8NClJUMS9zeUZ1UkZQYlc0REVWUDhBbWNiWkFwellTZ1NLV0pBRysvVGJMWW9sdUdRenRHTEpTaUFJb29XQTIrTDVlT1h1S0J1d20vYXINCk5Xdnl5Z2h6U05rZ3RJV20xQ1FnVkNWTk4vQTc3WkZ3c25OWmNobDVoQUFHWU1EUUZnUUtVRGRSL243WkJES281NFpMVmhJb2JsWGINCit1V0NXemt5aFpZbmM2THFGdkszMUtaVVRaaEE2L0NBUjBEZFZyOU9SdG5FRU1qMGVXNFcwbGd1STJEa0Jnd0hVZ0dnN1pLRzRSS1ENCjJLVzY0aktTQ09MVkMwTlFha1VPMk5JTTltT1RRRGtRS2NSU3YwOThCRnVLUXRTMnA5b0JnZTNYR0d4WVRqWXBQZEwxeWV5akNzREoNCkN2N0krMFBsWHJtKzBuYU8xVGVhMTNaTm5paHpaTlk2L2IzRVhxd3VKVkgybDZNUDgvZk5zSmdpdzZHV014TkhtOGUwVzRXSyt0MEQNClZYbCtyZk9HeURZdm91S1c3MkhTTGhmcTYrQnB2N2RCbUZ4VTdHSVRtQ1pwREg2WHhjSEpHOUFPZzNyVGZmTmhqZ1BpeU9NRGRINnQNCnJVYVdjTmtZZlRrVThqSXdJSjI2QVZPMWZITDdGVUdySGhKUEV3ZnpiZXFiVmVCTEUxcVBvcVAxWlJQbUV5RkFwTkE3Y1NxamY5dFQNCjNIOWNybUhGaU5scW9HbHFLL0xJMGhORnQrUzlNcklaaEt0TGROSDFxNDB5V3FoR0xxdEFhcTVVclR3L2x6WXlGRjF1TTJBejNUZFENCnQ1UW9FaENtaEpKMnJTcEhUeHJpSExISmt0bmR4Q0hkakpYWmZsOU9TWWtGU3VweEtlRDBSRjY4ZHpXblNvNzRVMVRFZGJ0NG1haUoNCjhCQkRNZDZpaDhmbmdDTWhzSlpORzdzcGVzamNSMy9hRzNieEdDWXNOQVF0eUlISzhkbUFxclY3ZEtmUEl4bXlsQzFGVlYxS2phUWYNCmo4c3NhZUdubTFyS3lPckwxSFQ1aktwQnlvR21VYVhlbzRGZTQremxKRG1Sa24xak9kdm9BOGNJcWtwM2FTTWRnS25xQU9wOXFaS0oNCloyblp1Wm1zaEhJS0oxVlFlL3k5c3U0dG1uYml0SUxwYW1yZkNEMEdRY2k5a2lkaEJlcW9Pem5mSUZ4c2dWYjZOYUFMV24yUUFkcWYNCmRnYVZlMnZ1SUJQajBydCtHVjI1NFJLVHhOUndkeHYvQUxlU0JaWDBSOEY2aXhtVGdvOU9oTzNiL01aWUNDNCtTS1g2amVRVHU4amcNClBHcFZVNEtXQm9PTlFRT1c1RzFjR1E3S01aNUJJWE1Za0xxcDlLUWRldmZDQnN4bEdqdXVlQ3ExVG9OMU9MWFc3bHR6c2UvK2RNSWwNClRDY0xVNUxPV1NibGFoa3ZEdEM4ZjJqWHNRZW8rZVptbnl6NGdJM2JyZFZneG1OenF1OTUxRGRDT1ZIcjlrZy9jY3dTSE1CZXg2T1oNCkpvYlNPTS9GSUZxSzlxRTErV2E0UXVWTzN4eTJ0UGYwd2xqZENPM1Y1WGgvdjJVb2dCSDhyTVJ2c2N6Z2VEcmJreHhtY2Jsc0c5WDENCldDNG5TWUpKSEpJUzBnbFlGaFVuZ0F1NSt5T3ZNK0cyV2VJSkxpd0dqWEx5WTdxVWw1ZVc3aHdFb2F0eDNGYUZhcjN5cklkcjduR3oNCjQ2Mjcxa0VYN3YxSEh4S0tIdjB5TXQzR3hxYlErbEo2eUE4bSsyblkrNDk4ckJwTW8yam9ydEFnSzdqcGhJdHF1bU8rZjdrVzJ0dzMNCndHOU9FbnVwSFhObGtkWGhOSjE1YTFJeVJtTldWbk5CVWtWSU9WMjUwU3pHT2FkWVNvb0IwSnFCU3Z1TVEyaEhXRUViRmhkYzJaZWwNClNRdFR2dDkrU3BiSjVKWnJOdWxTSWw2anI3NFFHcVpTVlZiZ1VadHdkL2ZyZ0xTQ2dKNDFpVThSVmFWQjZkZnY3NVdZZFF6QlMxSlcNCmpsbEFweFduSHg2VjJ3ZzBpUXNQUHJ0QkRjc0YvdXlhcDh2REl3bFlaU0ZGRzJsMDBkRFhZL2hna0d5RW1YYVZjaVJkeWVRTkJ0V28NCkk2NVhMWnZFbVFKSXRRRUpBQXB5TzQvamtZRmVKUmcxdmhlaUpaR1hpZmlZVk5CVUR0bHNxcGtZV0xST3N4K2s1WWtqYXZMZmd4MkINCjRzYVZHK1FpU2VhTWVUb3hhOXVDYnlJVi9hQkxEZkxDRVpEYWF2U1MzVnlhZ0RmeHI0YlV4Y2VtUDJtb00zd3RVYmJFOThwSWN5TTANCmREZk9wSzFxUjFHQzJaS3pVNzY2Rm9xclB3am1iaEtpL2FLMUczVWJHdmZyazRBMWFSUitERjlWODIzVFNmN2pyY2kxaU5ER3pFdUkNCndRQTVjVUFEY2h0U25iTWc0eFc3Z2pXeTR1bGU1T3JIekdtb1dnV1NNTE9aUW9BWGlmaVhseHFCeDhUL0FHWUFLY2d6akxrbkduZ3QNCkdGYzcvd0JQOXJCTmhGSHRBUkdkaHQxcDkyVkJqSkU2RWx1Sld2SjNWUWxRbGZicVZyMTY5czZEc3ZDQU9NODNsZTJ0UVpId3h5NnYNCkVDdWFPM29IcTNrWFV2VmdzbVlxWkZRb09SQU5ZNnJUNmVXWW9xT1J6OEp1TDBMU29yQzRzQkZlMjVrYUtWSldVcjZpODFaU0pEVUUNCmJIYnhHVlNNdUl1Vm1NcjJQUkl2T0dtbTMxQVF3TXIxa2VaeXJLT0VLcTNwbmZwV2hTbGQycFR3d2l4SjJQWitRY08vVWZiYVRDWjcNCmgxVGo5c0VNM1RwMU9aTWhjUzQrcmlBbXhoS3JzdXpiazdFanRUSUFiT3RpRkNXRWhkdHEvd0JNaVEyRUlOZ0lwZ3pieG5hVmY0L1ANCkRBMGQrVGpaWVdOdWFWZm1iYXNIVnZBL3d6T3ltblU0a2c4bzNzb1NSUzI4UlVBTnZVRWcwNlpBOG5MeG5kNjNvOTBKWVYzTEFVcU8NCjVIaDg4QWNvOGs4aHVCNndSb21CcnUreXFldndHcEJyOEo2Q2dIZnBoR1FjWEMxQUVkVUhxWDh5bW5nQjg4dFlUU0NVRU42bEQxN1kNCjAxQkJUcWVKVldvblllTlA5dkJUSzBpdVBVSmRWMi9lY1I0a0FaV1IwU0N3NjhpUm82ZHgzekdoS2kyeTNDR2dja2NUMUhmTWd0WUsNCmQ2UGZOSEtpU2RLL1Q5R1Z5RGtZeXp5enBQYk5KQ2ViS3RkNnRRa1UrSURjWkFCRWpURDlXVStvRmtwekRPMGc0MUpEQ2dVSGJwaEwNCnNNRWs1czB0bzlPam94VUp1UUdKWUR3TmVJM3lRaUNYRnpTOVJTeFZNdHh5MlZWK0gzT1dTTFVVOVNKamJnVXFCdDI3aklLODN0ZFcNCllNT1JxRGtwWTJySGxUY2FpcktyeDdNQWVZL3BsSmc1UGlKaGJYc0Z4REZWV2xNZkZpRllMOWxxMGJrR1UvZGxzQllycXZIejgwbHYNCnRFVDZxenlEbEdoM1VGcTFZN0R4RzNqbFhpeUVxTGpTeFdYZVh0TGtqZ250enhraTlXS2NiZ0JDQU9YeGZhTGZFS0Q1K0daUmxiWmgNCnhVTExMTGVSVVVPVFFyV21WekRlSTBtK25DUzc1Vk5FVUF0NDc5QjlPWmVnMG5peTM1QjAzYXV0OENJcjZwSTlMV0NGT2dGQlFBWjANCjBjWWlLRHlFODBweXM4M2lUNmZlSUt0Q3crWU9jYlQzUEVHUytRWlhONjFwd1l5UmxwbzZWcjlpaE8xUHNrQTVSbGp1QzVPbXlVYWUNCnZhVHJNZEdXNWthTkdIRlNBRkFHeTdoYUwrSHo2NHo5VHN6aHNBeFMvV2JrM01xbVFtV0JReVJ0VUFoUVNkcWNxZUhmNk1ZWXUvZHkNCjhlM3ZTMjBnVXVmUlFoVVB3S2ZBNy81N1piTFlVNDJhUmtkMDJNTXJNQzNYcVdwUWRRVHNQbmxZNU5YQUdybTBMQ29YWWRQQWJZQ3cNCklTMlMyRHEyM0RqMEp5SkRXUWhmekVzMmVFc1IwTmMyR2FPem9NSjNlY2FmL285NlpGMkRDakE5RFRjWmp3UFJ5NDgzcUhsdlVTaUkNCkdhaG9PbE10aUhKQlpsRGR4U2hXUEd0Tm1IZ2ZmNWpMT0ZnU2dkU2s1TlJUOElQV25qODhKWWMwc2tvUVZyeXAwQXhhenNncFk2TVYNCnFLLzU5Y0JWS2JtMFVSSklha25reDdiK09RbWtKWkgrVlA1Z1hmeFcybWVwRzNMaWZyRnNLOERSdXNnNkU1VjRFdTVmSGozcGZMK1cNCm5udUc3TUIwdGpPcG9VU1NGelhjN2NYTmVuYkxCamxYSmo0c2U5Vms4bmViTFRnOXpvOTNDU2VJSmhrb1NGTGJFQ2gyVW5JbkhMdWINClk1bzk2ZWFWcEhtMk9qRFI3NGNUVG1MV1pscU5pRDhOTWlJUzdtNDVZRWMwMWV4dWI2QVN2cHp0SXhxOGp4UFFrZ243UkZONmREa3gNCkFzQmxya1VoMUthZFQ2SVQwcUU4Z2NnUlRJRzErblJJUnlwOFFvU08yUkp0bVV5UTh4OFZhK0EycU1ReEplR1dsM0lpZ1A4QUdnKy8NCjc4ekRGMW9tbWxyZnNwQkoyOGNyTUhJaGtaYjVkMEhYOVRkSDA3VDdpZFpDQjZpeHQ2Vy9qSVFGSDM1VjRjdWdieG1nT1paenBQa0gNCnpOY1RUV2R6REJhU29sVDlaa1VxT1ZPbkFTNzdqdytlWERGSTh3d2xxb0RrV1NXSDVUOHdSZDNCdHBaRHhqZ2loQ29EeHIvZWM1QjANClUrK1hEQ0IxYXBhK1I1QlA5UDhBeXg4dVdrQ05keHZKT3NnQ1BLL3FDUjYwK0tOUWk4Q1JXbmgxT0VZbzMzdFU5WmtsMXBmNW84cHkNClIyQ3o2VlpSZldJbnBMRGJLc1FlSmdLc0UvbVFnVUhMY1Y2bWd6TTAyWVl6eTJkWHJNSnlqYzdoNXRmNnJhMnNyUTNVcTIwbyszRkwNCldOeDdNcjBZWnNocW9IcUhVL2s4ZzZGa3NmazNUcnV4Wnl4TmEwYmJPVWpLdzloT0ZHbmtNRU9zNlg1M1ZOTmlua3VJWFpGTUVaa2INCmc2bFNhS0QyYkp5aHhSWVFud3lGdlZJZEcxdDdTSG5wZDJKcHQxRFF5RG1LQTBBNC9mMXpHRVo4cUx1OE9weDlaQWZGRVcvbFRYWmsNCll5V0U4TzQ1czZtTlFQRDR3dS8wNWFNY3lPVGZMV1loeWtDbk1Ya0hYNGJsTFlXb1dWeHpDbVdJMUhpUGk5dW1Jd3k3bkVPdXhkU2oNCmg1TDExa2NMYjhsU3F5SG5IVVVPOWZpeVJ3U2F2ejJQdis5WGovTGJYWlVWaTBLY3dDdFdZamJ4NHEyUDVhVEE5b1kxS1g4cTllYVQNCjB6TGJqbHZ5ckpUb1QxOVAyeC9LbnZhZjVRajNGSS9PUGx5OHVMVmhIYnRLWkdDTHdGVFVqcnQyN1ptengySFVSblR6NC9rMzVwa2QNCm1qbXRRb2JqUjJtUS9NY291bnZtTCtWa0QwY29hcUt0SDVUMWpTcFlJYnh3OGp1VVFJV0tzVUlVbjQxWDRkOHQ4RXR3MWNHV2FkYTMNCnp3Z0tuN3ZjcXhLcUtxZUpGYWs1TGdLZkhnZXJkKzhWc3Arc3lwSFNoTlhUWUUwclVIeHdjSlVaSTk2WHFSSXhaR0RSL3dBd05SOTQNCnlKQlFaQXFONm9VSGlLcysxUjA2NEZ0QlhhL0FpRURrQlR1UmtDVTArakkvSnR4Qk1rbHMwTWFJa2kraUN3VW1Rb2VWUXUxUFQ4TysNClpMaFUxTDVITWx4OVpiMGhjcVNZNVE4bndraWxhQUFINmNOclNuZGVUdFN2V2hTNUZ1SVlaR2I0WlpHWmxNY3NYKysxb2VMcWV2aU8NCjFTb3BWdFBLTi9aSkpIYnZDMGNrbk1JenVPSVBFTUs4WHIwWnZ3OThiV2tQWmVRYnF6YTNhR2RBWTNEektXWWcvQkl0RitFVStLWDcNCmhqYWtLc3ZrYWVYVWZycG5WWEFRQUt4QVBGZzI5VVA4bzc0MnRMdFM4bTMxMmljWm8wa1YwUEtyZEFTRy9aUDdMbjZjYlVCMm9lUzcNCnU5bGhaNUlhUkE5YW12eG8zUXIvQUpHQkl0NW5wdjhBemlwNVpzN1pWS3JjWEFma1pMcWFTWUFlSEdOTFpUOUs1TDBydXpLMC9KN1MNCnJLNSt0YWZaMk9uWFlVckhjV2NTd3NBZXV3VGpqWTdrVVUzSGttNDlTSXVMZVQwaDhNcmtsK2RSdjlpbGRxMXg0aXZDcngrVk5RUXgNCmdUUkZFVXEzTGtYWTdVUE9uc2E3YjRMV2xZZVdic0d2T1BicDhUVS9WamFhWEh5NWVVKzNGOTdmODA0RnBiL2h1Ky9uaSs5dithY04NCnNlRkMzM2tnWDBMUTNrTnJjd3Q5cUtaZWFINWhrSXh0UENtRnQ1WmpncWtVY01VWVdpK21PSnFhOHFnQ2xPbVJFUU9UWVpFOHlpSTkNCkRWWlEzcHhmQW9FVW01Y1ZyVVZJMkcvamtyWU5ybzFaMmVSWWpHdkgwRnBYaVJVbCtnb3hKN2VHTnJTcU5LQW1sa1BBaVZWVXJUc3QNCmV2ald1TnJTdUxPaDViY2lBQ2ZZZFAxNDJ0TytxdnpKNURoUUFKVG9kNm12dmphS2N0b1ZPeEhBQUtxVUFBcFhwUVkydE9hejVPakUNCjBNWkpBQjJOUVJ2OStOclRIVjhxWDZKQ3EraXhaaWJqbks3Y0F3Wmp3SmpQUDQ2S0FlUHcvS2hueGhxOElxVUhrYWFHV2VSWi9VTTcNCmNtRXNqdUY2N0p5SHdydjBHUEdGOElvYVh5RGZEVUV1a2tpbEQxamtTU1Fxc1VaV3BhSUNJbG1aMFFFTXcycWE3VUx4aGZESzgrUUoNCnFVUm9GRlNhQWtic2FrN0w0bXVQR0Y4T1NDdnZ5dE41QzhNcndsSEJWdXBORDgwT1BFRThFa3R2UHlXU1ZUNlVkZ2tsT0lab3lWb1MNCkNRVkNyWHBnNGdrUktFay9JNjY0T3NVMXJENm03bUpwSXFucFg0RUdEWmtCSWRVcG4vNXg3OHdsbmUzMWlPTmlTVUR5U1NJTmgreTgNCmJWK2s1RXhEUGlrOTJ4VjJLdXhWNURlZmtkNWkvVCtwNjFwZm5DYlQ3aS9tdkpvZ2tMMWcrdDNTM0hGR1dkTnYzYWh0cU40WXB0a3UNCmplUU5TYXowSStZOVEvU1Y3cE45SnFEdE5XNFlsWTJpdGtTWitETDZZQ1NQUmZqa0ZlKzZobk9LdXhWMkt1eFYyS3V4VjVrLzVXK2MNCjMxUzZ2UjUwbmdYVUxsTG0rZ3RvWklGYjBvVGJqaDZjNjhUSW5FdlQ5cFJTbEJpbEZXbjVYNnhMb1Y5cEhtRHpITHIwVjlMWU14dkkNCnVZamp0Q2h1RmlETzNCcHdwSElmWisxdTJLSG9ZQUFBQW9Cc0FNVmRpcnNWZGlxeTR1SUxlQ1NlNGtXR0NKUzhzc2pCVVZWRlN6TWENCkFBWXFnN3VTZlV0SWVUUTcrR09hWlExbmZoVnVZYWcxcnhWbERxYVVOR0h6eFY1L28vNVQrYnRNaXRiYUx6cmQvVTdFV3kyMFFTVlINCnh0K1pjTXZyOFNITDA0OU9LZ0d1S1ZYVS9JTThlaDZIRDVpOHpwS21rcGZSWGVyM3ZLS2FWcjVHalRqUDZ5TW5BUFNuSWxxRDVZb1oNCnBZVGFab1dpNlhaWHVvd0tJb0lyYUc0bWRJaE0wY2FyeVRrMi9LbGFBbkZVMGpramtqV1NOZzhiZ01qcVFRUVJVRUVkUWNWWFlxN0YNClhZcXd2ejU1SDh4K1pMcUNYVGZNVGFLbHRFVnR6REN4bVNaMnBKSUprbGlOR2lQSGpUWWl0ZW94Vkpwdnl4OC9OTE5MRDU4dTBNLzENCmdzakpNVlZwcGZVUW9CY0FLSTFDb0F0QlN0S1Z4U2pOQThnK2N0TjErd3U3M3pUZDZuWlFxVGVwSkxLcXltSzJpZ3QwOUFzNkFlb0oNClpwSERBc1NBMWFWeFFyZVNQeTN1L0xtclEzODk3QmNlbFpUV2hTQ0Y0YXZQZHRjczI4cmpnS2dLbFBoM0kzWmlWV2Q0cTdGWFlxN0YNClhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxZzlaMHVEVmRKdTlNblpraHZJbmhrZEtCZ3JpaEsxQkZmb3hWNXYNCnJHaGVRZEIxWDZ0ZjZoZlc4c05ySExFZ1VTeE5FOTFJNnJUMDVBVzlSYVZjYmtnMUxFbkNxRmswejhyWnRQRUVtc1gwZlAxT0tzc2kNCnlHUjJDQmFlbFJuQmlkQUI5c21UcWEwVlU3YlNmeXl1bzFmOUxYRVZuUGFDZVczNFNDY2w1cExneTNFaUt5MVJSNmZMc0ZvV08yS3MNCmk4dFdma0RWYnU1MCsxYzZ3azBNTnpKNjhTaUZQUlVJcXA4RWZGdU1vTEpUYXRkaVRnVm5zRU1VRU1jRUtoSVlsQ1JvT2lxb29BUGsNCk1WWDRxN0ZVbTg1TnA0OHJha21vWFRXVnBQQzF1OTBxTkt5R2Y5MGhDSUN6Zkc0MkdLc0l0OU50a01sM0Q1emh0NU5SU1c0bWFJUEQNCkdqWGZPWkpDUFhCVGo5WUhwcktkL0RsU2lxdnFXZzJkeFp5YUpmZWFwZnIxb0htdWIyYjFlQ0pMWkcyVkdra2N4TFV6aDJYbHlZTjcNCjhzVlVadEg5YTZqZ204K1J5d3RjVHlTV3hZTWhVUEhTRTBtNEw2Yk1uRUhmZmJyaXJXbjJWckZldEhkZWRsdmJsZEx1YmVPNGw1TWkNCmZXSkVYMWhJMGhoUEZpb3BYa1R0WFlVVlpmNUZpdExQUTEwZURVazFSOUpjMnM4OGE4UXJmYkVmVmdTaXVBVFg1ME8yS3NoeFYyS3UNCnhWMkt1eFYyS3V4VjJLdXhWMkt1eFYyS3V4VjJLdXhWMkt1eFYyS3V4Vkk5Yi93VjljUDZiL1IvMXYwbzYvWFBSNStqNnA5UCs4MzQNCityV25hdUtvTS84QUt0ZlJpcitpdlM0U2VqWDBLY1BVUHFjYS93REZsYSs5Y1ZXUmY4cXVxZlQvQUVQOW1Pdis4OU9QcG4wdXUxUFQNCnJURlV3MFQvQUFaOWNmOEFRbjFINjU2S2VwOVY5TDFmUm92RGx3K0xqVGoxOXNWVHZGWFlxN0ZVczh5L29UOUVQK20rUDZOOVczOVgNCm55NDgvWFQwdVhIOW4xZU5lM2p0aXJDNy93RDVWSCtuZFErdGN2MGp3VDYxeCt0K242ZndjT0hEOTF4NmNlUDBiWXFqZFUvNVZ2NmwNCjE5YTliajZOdDlZOVA2NzZYKzZmcTM5MzhIcjA5R243ZkduYkZVRFpmOHFlK3R3L1ZxZXJXVDB2OTZ1RlBySTUvYStIajYxUG85c1YNClFrLy9BQ3BUNnVucmMvUzlFOGZVK3ZWOVA2d2xhOHQvNzNqMTdZcXpIeVgvQUlWOUMvOEE4Tzh2UytzLzZYeTlYKzk5TmVQSDFmMmYNClQ0OGVPMU1WWkZpci85az08L3htcEdJbWc6aW1hZ2U+DQoJCQkJCTwvcmRmOmxpPg0KCQkJCTwvcmRmOkFsdD4NCgkJCTwveG1wOlRodW1ibmFpbHM+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiPg0KCQkJPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpDN0Q0QkQ2OTc2QTNFMjExQkVENkZDQ0Q5OTI5OTg3ODwveG1wTU06SW5zdGFuY2VJRD4NCgkJCTx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6QzdENEJENjk3NkEzRTIxMUJFRDZGQ0NEOTkyOTk4Nzg8L3htcE1NOkRvY3VtZW50SUQ+DQoJCQk8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnV1aWQ6NUQyMDg5MjQ5M0JGREIxMTkxNEE4NTkwRDMxNTA4Qzg8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4NCgkJCTx4bXBNTTpSZW5kaXRpb25DbGFzcz5wcm9vZjpwZGY8L3htcE1NOlJlbmRpdGlvbkNsYXNzPg0KCQkJPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4NCgkJCQk8c3RSZWY6aW5zdGFuY2VJRD51dWlkOjUzZGE1MGQyLTI1ZDUtNDE4My05ZDk0LWQxZDY3ZDM2MDEwOTwvc3RSZWY6aW5zdGFuY2VJRD4NCgkJCQk8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOkU5MjY5NERDNTlBMUUyMTFCRjIyQTA2QUY2NTA0OTg3PC9zdFJlZjpkb2N1bWVudElEPg0KCQkJCTxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+dXVpZDo1RDIwODkyNDkzQkZEQjExOTE0QTg1OTBEMzE1MDhDODwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPg0KCQkJCTxzdFJlZjpyZW5kaXRpb25DbGFzcz5wcm9vZjpwZGY8L3N0UmVmOnJlbmRpdGlvbkNsYXNzPg0KCQkJPC94bXBNTTpEZXJpdmVkRnJvbT4NCgkJCTx4bXBNTTpIaXN0b3J5Pg0KCQkJCTxyZGY6U2VxPg0KCQkJCQk8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4NCgkJCQkJCTxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4NCgkJCQkJCTxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6RTkyNjk0REM1OUExRTIxMUJGMjJBMDZBRjY1MDQ5ODc8L3N0RXZ0Omluc3RhbmNlSUQ+DQoJCQkJCQk8c3RFdnQ6d2hlbj4yMDEzLTA0LTA5VDE3OjExOjA3LTA0OjAwPC9zdEV2dDp3aGVuPg0KCQkJCQkJPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgSWxsdXN0cmF0b3IgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4NCgkJCQkJCTxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+DQoJCQkJCTwvcmRmOmxpPg0KCQkJCQk8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4NCgkJCQkJCTxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4NCgkJCQkJCTxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6QzdENEJENjk3NkEzRTIxMUJFRDZGQ0NEOTkyOTk4Nzg8L3N0RXZ0Omluc3RhbmNlSUQ+DQoJCQkJCQk8c3RFdnQ6d2hlbj4yMDEzLTA0LTEyVDA5OjM5OjM1LTA0OjAwPC9zdEV2dDp3aGVuPg0KCQkJCQkJPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgSWxsdXN0cmF0b3IgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4NCgkJCQkJCTxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+DQoJCQkJCTwvcmRmOmxpPg0KCQkJCTwvcmRmOlNlcT4NCgkJCTwveG1wTU06SGlzdG9yeT4NCgkJPC9yZGY6RGVzY3JpcHRpb24+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOmlsbHVzdHJhdG9yPSJodHRwOi8vbnMuYWRvYmUuY29tL2lsbHVzdHJhdG9yLzEuMC8iPg0KCQkJPGlsbHVzdHJhdG9yOlN0YXJ0dXBQcm9maWxlPlByaW50PC9pbGx1c3RyYXRvcjpTdGFydHVwUHJvZmlsZT4NCgkJPC9yZGY6RGVzY3JpcHRpb24+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBkZj0iaHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyI+DQoJCQk8cGRmOlByb2R1Y2VyPkFkb2JlIFBERiBsaWJyYXJ5IDEwLjAxPC9wZGY6UHJvZHVjZXI+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCTwvcmRmOlJERj4NCjwveDp4bXBtZXRhPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwACAQECAQECAgICAgICAgMFAwMDAwMGBAQDBQcGBwcHBgcHCAkLCQgICggHBwoNCgoLDAwMDAcJDg8NDA4LDAwM/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LzEuMS8iPg0KCQkJPGRjOmZvcm1hdD5pbWFnZS9qcGVnPC9kYzpmb3JtYXQ+DQoJCQk8ZGM6dGl0bGU+DQoJCQkJPHJkZjpBbHQ+DQoJCQkJCTxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q2hyb25pYyBXb3VuZCBpbnRybyBpbWFnZTwvcmRmOmxpPg0KCQkJCTwvcmRmOkFsdD4NCgkJCTwvZGM6dGl0bGU+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcEdJbWc9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9nL2ltZy8iPg0KCQkJPHhtcDpNZXRhZGF0YURhdGU+MjAxMy0wNC0xMlQwOTozOTozNS0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4NCgkJCTx4bXA6TW9kaWZ5RGF0ZT4yMDEzLTA0LTEyVDEzOjM5OjM3WjwveG1wOk1vZGlmeURhdGU+DQoJCQk8eG1wOkNyZWF0ZURhdGU+MjAxMy0wNC0xMlQwOTozOTozNC0wNDowMDwveG1wOkNyZWF0ZURhdGU+DQoJCQk8eG1wOkNyZWF0b3JUb29sPkFkb2JlIElsbHVzdHJhdG9yIENTNiAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4NCgkJCTx4bXA6VGh1bWJuYWlscz4NCgkJCQk8cmRmOkFsdD4NCgkJCQkJPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+DQoJCQkJCQk8eG1wR0ltZzp3aWR0aD4yNTY8L3htcEdJbWc6d2lkdGg+DQoJCQkJCQk8eG1wR0ltZzpoZWlnaHQ+MTAwPC94bXBHSW1nOmhlaWdodD4NCgkJCQkJCTx4bXBHSW1nOmZvcm1hdD5KUEVHPC94bXBHSW1nOmZvcm1hdD4NCgkJCQkJCTx4bXBHSW1nOmltYWdlPi85ai80QUFRU2taSlJnQUJBZ0VBU0FCSUFBRC83UUFzVUdodmRHOXphRzl3SURNdU1BQTRRa2xOQSswQUFBQUFBQkFBU0FBQUFBRUENCkFRQklBQUFBQVFBQi8rNEFEa0ZrYjJKbEFHVEFBQUFBQWYvYkFJUUFCZ1FFQkFVRUJnVUZCZ2tHQlFZSkN3Z0dCZ2dMREFvS0N3b0sNCkRCQU1EQXdNREF3UURBNFBFQThPREJNVEZCUVRFeHdiR3hzY0h4OGZIeDhmSHg4Zkh3RUhCd2NOREEwWUVCQVlHaFVSRlJvZkh4OGYNCkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zi84QUFFUWdBWkFFQUF3RVINCkFBSVJBUU1SQWYvRUFhSUFBQUFIQVFFQkFRRUFBQUFBQUFBQUFBUUZBd0lHQVFBSENBa0tDd0VBQWdJREFRRUJBUUVBQUFBQUFBQUENCkFRQUNBd1FGQmdjSUNRb0xFQUFDQVFNREFnUUNCZ2NEQkFJR0FuTUJBZ01SQkFBRklSSXhRVkVHRTJFaWNZRVVNcEdoQnhXeFFpUEINClV0SGhNeFppOENSeWd2RWxRelJUa3FLeVkzUENOVVFuazZPek5oZFVaSFREMHVJSUpvTUpDaGdaaEpSRlJxUzBWdE5WS0JyeTQvUEUNCjFPVDBaWFdGbGFXMXhkWGw5V1oyaHBhbXRzYlc1dlkzUjFkbmQ0ZVhwN2ZIMStmM09FaFlhSGlJbUtpNHlOam8rQ2s1U1ZscGVZbVoNCnFibkoyZW41S2pwS1dtcDZpcHFxdXNyYTZ2b1JBQUlDQVFJREJRVUVCUVlFQ0FNRGJRRUFBaEVEQkNFU01VRUZVUk5oSWdaeGdaRXkNCm9iSHdGTUhSNFNOQ0ZWSmljdkV6SkRSRGdoYVNVeVdpWTdMQ0IzUFNOZUpFZ3hkVWt3Z0pDaGdaSmpaRkdpZGtkRlUzOHFPend5Z3ANCjArUHpoSlNrdE1UVTVQUmxkWVdWcGJYRjFlWDFSbFptZG9hV3ByYkcxdWIyUjFkbmQ0ZVhwN2ZIMStmM09FaFlhSGlJbUtpNHlOam8NCitEbEpXV2w1aVptcHVjblo2ZmtxT2twYWFucUttcXE2eXRycSt2L2FBQXdEQVFBQ0VRTVJBRDhBa1duK1Z2OEFuSVMyK3N5V3pYd3YNCkE2eVFtKzFBU1FOS2tzN0lTcmFoZmM0aXJ4aHdxUWlnQTlOajhRVlRLTFJmenV1L01HbVhtc1I2ck5wc1BKVEdsMWJRekJSY0t5bTcNCmowN1U5S3RmVTQ4Nk1xVHJ3NGhvMmFveFZDNlpZLzhBT1VsbmJSd1NUdTluQnA5aEUwVmRObXZES3Nkc0xob0xtNGtrRWx3WDlmMUQNCmNmdTZVNEZpM3dxb3JSOUMvd0NjaGJLM3ZYTnpMRmR6Rzl2N3NJZExsUzR1NXZxU1J4VzVsVm1SVWpOeVllZkVjMFVTSGdSVlYxOXANCjMvT1NWNXA5N0cxemNSckxaM052YjI4YjZYQktUSmFhZ1lKWG5nNFBIY3BNdGtyR0tSWXd6TVYrSGRWVlM1UC9BRGs3SFB5aWk5YTMNClMvWDFJWXBkS2pkNEEwdkpZWkpZNWVOcVU5TDRwQWJnTnkySXhWWjU4OHNmbnZjL21OZVhmbHk1dTE4clhGOXBkd2lKZkpFcXcyYVENCnBQSEhHMHlsRW1NMHJTS0YrUDB0NjFXcXFCVFQvd0RuS0s2c0xTMzFlZTRjdmR3eVNOWXRwZG5JcVIzTnJKSXQwOGNuTDBQVFdjUi8NClYyNXZ0NmdveFFLcWtOdC96bERhYUhGWXdDVnJsTEMxaEZ3WnRMbmVPVllyTU5JclhKZDU1L1VGMExqMW5DTU9KamF2VlZPbDBYODENCjdqeWJwMzZidDlUdU5WYlhWdk5Zc3ROMUtPMXVUWU5ac0hqaG5TN3RrV01YRENrYXpENVV4VkJhVlkvODVNMmMwcXZjcE5aV1dtUVMNCldkcGNHeGxhNHVZQmJ5TmJQZGttWnBwNlR3eVNPb1JSUmxjc2FxcTNhNmYvQU01SldlcUFwT0xtSzRuZ2tubG1rczJnNWl5c2t1ZWMNCmJFdkZiK290ejZTV3dWdlUzZjRUVXFwaHAybS9uVGQrUWJHUHpTMTFlYXNtc0NYVTdYVHByWFRiK2JTaENSNlNUV3R4REFqaTRJZXENCnpvV2pGQ1F4SXhWS2YwSi96a1BhM01yNlpkM3NWdmRyYXcramQzV20zN1c2cGFXNnZLSkpvNCtVcXlMS3I4VUN1YXRSaWVSVlJPcjINCmYvT1NSMU9hMTA2K25Xd1M2bVUzeFhSU1d0a1M0K3F0YnEwZkw0NlEvV2ZWUUgxRCs3QVN1S296eTlhL24xYmVZOU9OOEhiU0o3MXANCnRTRHpXVXNheFB4OVVTY21lWkVDL3dDODZXMUtQWG1PTk1WU1hWL0ozNS9uelRxVXVsNmxjRFNEZVBCcHF5My9BTzcrcU5kUHFpenUNCm9sOVRad2xqVDdYbzFGT09Lb3hKZitjbEk0b0ZXR2VaSm5WQTh4MFVYTUtyY1diU1BkQ05saElhSVhhSjZISThTbkljOXdxaHJqVC8NCkFQbkpPYXl0Yk83bnU1bE1sdEpOYzJzbWsyODVZcnA4c3lUc25vMHQwZjY2aStoKzhKQzh1U0dwVlIvbWp5ditkaStjZGExN3k3ZVMNCm0yYTRtWFNMSjd1UXg4RHBLUnhPYmVXNitwZWo5Y0xuaWJjU0NRSzFTaE5GVU5acC93QTVScERHdHhMSFBNTFNiOTZ5YVpFQzM3LzANCi9VUldrcGVWOURpRVkyOUtoaVR1VlVVOFAvT1NKZ3VCYlhBVkRaM1U5bTkyTk1hN0U2elN3MjF0TXNLcmJtUnJkNHArU042ZnFJVkwNCmNXNDRxZ2xmL25JNncwZExyVU5RbG0xcWE0dHJDdzA5TEt5a3RuVzZpa1NTNnVqYXhUdEMxczdKSzVNeXhWUmxISU11S3Zjb0VlT0cNCk5KSkROSWloWGxZQUZ5QlFzUW9DZ25yc01WWDRxN0ZYWXE3RlhZcTdGWFlxN0ZYbTlucVA1d1c5dEE4bGg5Y2tjTUpsdVBxcU1yVWcNCnFmM0xvT05mVkVmZitZSGJGVmFIVmZ6ZmF6dElYMHEzV1V4eGZXYnJsR0pDNG1SWlBnOVJveCs3NWZQcUtmWnhWSHRKK1k5N3BGcEgNCndYVGRTK3ZCTHFSUkF3Rm1zTG5ueVkzQ2tzNFd0SXdRVFNsTjhWUTgrcmZtdkpBcXg2UGJReU16ZXBLckk1VkZvYWhXbW9UV3FqK2INCjdYdzlNVlhYMTMrWnFheEtMTzBFdGpETmNGUS8xY0pMR1k1R3R3cERDVFpnZ2F2SGZ2U3B4VkZXV28vbVBjWDg4TjFwdHRhMlN3eXQNCkRjTFF5TktJMTlOS2VzeXFTN0UvdERhbitWaXFWdGNmbS9hMmNGdDZVTjdNMEtUVDNvV0VPc2p5Z0dBQVBGR2VNZTViMDZmUEZWZWINClZQellNRXlKcGR0RzZ0TXNjbndTT1ZSUjZUMDlaVjVNYTlxZkxGV2VDdEJYcmlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGkNCnJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZmS3RqNTQ4MnVvOVRYYitoQXFUZFRkZitDekE0ejN1N0dLSGNQa20xbjV4ODBPM3gNCmF2ZTA4UHJNMy9OV0VaRDN0bmdRcmtQa24wSG1qekJJZy8zSlhmdy9hL2Z5ZC9mbGsrTXRNc01lNE1kMTNXUE85dGR4M3Rycm1vZWwNCjltNWlOMVA2ZnBBL2JDOC9oWlI5L1R3b2VJb0dLQTZCTXJEekg1cmVPc21yM3RBTzl4TFU5L0U5c2tDVXl4dzdoOGxXYnpKNWtFSi8NCjNNWGdrNmNmckV3b1BIWS94eU1pZTlJaEMvcEh5RER0WTg1K2NGdUQ2Zm1IVUZWd0dIQzd1RkEyNkQ0d2R1blRLakk5NWE1d2pmSUoNCldmUFBubFRRK1lkVC93Q2t5NC81cnpHbE9ZNmxqNGNlNEt0eitaM21qVDc2U0M1MTdVaEU3VmhsYTV1Q3A1VStFSGtSMTZETXdtWGUNCjM0bzR4c1FQa244WG0zejFORXJIV3J5RUU3Y3JtWW1udlI4ck9TWGU1UGc0K2tSOGdoTC9BTTBmbURBamVyck4vd0RFQ1E4VjVPTmoNCjBJSEx0Z0U1ZDdWTERBamFJK1NVYWw1Njg3TmFxNitZZFRqWWdjdUY1Y0x2VGZvK01ja2dlYmh6eFI3bUUzLzVrL21IQklmK2RzMWcNCktmOEF0WVhXMy9KVE13RWtPRklBSWIvbFpQNWtrY2g1dDFuaWR3ZjBoZGY5Vk1iS0tDMC9tYitaWC9VMmF6LzNFTHIvQUtxWWJSU2YNCmVYUE1INXA2ckp6bTgyYTNGYWdmYkdvWFFxZitSbVdSaVMxVHlBTXRzUFBmblIxSFBYOVJhdmY2M09mK044MS9pUzczYStISHVES04NCkU4MCthcGVKazFpL2N0Mk56TWR2K0N5bnhwRTh5NUVjRUs1Qk9aL01YbUlPa0RhbmVBU2lqTUxpWUVBN0doRGJIZkxQRWwzcU1FRDANCkh5Uk0ybzY5eENqV2I2TUlvTWNndXBqVStEVlk4dnB4bE9YZVdZeFFIOElQd0RHOWQ4NCthWWJDU1JkWHZZcFVVRWdYTW9vZm9iRXoNCmwzbFpZb2Z6UjhrQkQ1dTh5TklwbDE3VVZVZGY5TW4vQU9hOHFobGxmTXVETEVPNU4yODRYTXNWRDVqdmtJSFZidWNIL2lXWlFtZTkNCnBNQjNNUDhBTTNuanpYYWY4Yy96VHFNaFBRRzhtUDhBeHZqNDYvbDNxZWgrWmRiZFVJMUc2bjVmQ2ZVbWtQVC9BR1JvYWRjc0VqM3ANCkVSWEprNmExZnRIeFM1bjUwQnFaSDZrWk95bmdCNkpCcEhtRHpGRGZ0YTNsM2NzeU5SUzh4YmtvTkZhZ2FueFU3NGdsdGxqald3REkNCkx2Vk5SYyt1TG1hTkJzRUV6RGVuZWhwa2lqSEdQS2d3SHpici9tQzN1b0hqMW0rUmFrRklybVZCUXFkMkFZYmpJZ2xobXhnYmdKSFANCjVzODJMRVlKTmExQkhYKzZsK3N6QXVCNC9GMUdIZHBvTWZ1dk9YbmNNVkhtRFUxcDFwZVhBLzQzd0FvTVFvU2VjZlBQRGJ6SHFnLzYNClBiai9BSnJ4SktnQktMTytYaWdIM2Q4eEhieExJN0dkU0FWTkNQNjR0Z0tmMjF3T1c1cDIzT1NCVXBweVdhSGlwK01pbFR2V3UzZkwNCkFXbVVVTUlHaFFxQ1dHLzNkY2tGb0VwVnFGOHFJd1dwSFJSeG9NaVpNdUJpRHM4MS9PNUZZd2hxS2QrUTNvTXFMUlBtaEo0aUN5dHMNCnlIWTAramZLNVJ0UW51dmFmSEhhbTVWUXhpZFdmeENnaXArN0xxMmI2Rm8vU3RVdFR4am1vWVc3K0gzWUkrYmNicXdtZDNZMi9wQm8NCnlIallWQkc5QjRWd1NnQnlSREtUellqNWgwNlAwMjlQNFhxVFFDbGRzZ0FiWVpzWUlzUE10ZTBEVlpIWm9BSm8vYlp1dmdjeXNlU1ANClYxR1RGTG9sK2wyR29DZU8xdTBraGprZFVXUjFJQURHbGQ4dmlCSWdXMFRKaUNhNVBZdEwvTHJ5dzFtZ01Qck1SVXlzeDVFK094emUNCncwT091VHplVHRMTHhiR2s5aDBGYlMzRU1OUFRIUWNhSDd4bFowQUhJczQ5cEU4d3dMU2I3MUpGakIrMlFBZm1hWnljOWc5eEY2Ym8NCkVhTFJ5YURZRDVaVGpOYnVVZVNKMUpuL0FFbGJQQ0NZM0JFaDhDS0ZhZmRsdkh1aUZzaU1VamFjQngyNi93QzNsdzNERUdwTUE4N2cNCjJ0c0xsRTlZYzBFMElIMjBNZ0JIVEt5RTVUdFlRZDJMR2UwU2FIY01ONjlSdDBQdmxCalJhZWJISnRGMCs2Y2h3eUU5MUpHVEVpR0gNCmh4UU4zNUpRME1OMjZnZGp2aU12a3ZBOUc4cDY0WjdOSlVKTEtuSWtkUEUxMzcvNTB6T0RoMnpXMDFOZUtzYUx2MEIycDg4bUMzeEMNCk9ZeFRuMTFOSmU3QVY1ZXhPRkJHNnlhOGs5T2prbEl6OWpzVDkrRkkyWVA1ajFXTlp2M3ZKNlB6NURyeFUvSFJmZGE1QU5tY2VoSjcNCnFKZlVhMVpqUUV0RTFhRWY3V0xocFcwUlppa24yaDF5VEdXeWkxdlVFZmRnS0JKak9tM0hxRWIvQUJDaEZlbVk4ZzdDRXJaUFlYRW8NClJUMS9zeUZ1UkZQYlc0REVWUDhBbWNiWkFwellTZ1NLV0pBRysvVGJMWW9sdUdRenRHTEpTaUFJb29XQTIrTDVlT1h1S0J1d20vYXINCk5Xdnl5Z2h6U05rZ3RJV20xQ1FnVkNWTk4vQTc3WkZ3c25OWmNobDVoQUFHWU1EUUZnUUtVRGRSL243WkJES281NFpMVmhJb2JsWGINCit1V0NXemt5aFpZbmM2THFGdkszMUtaVVRaaEE2L0NBUjBEZFZyOU9SdG5FRU1qMGVXNFcwbGd1STJEa0Jnd0hVZ0dnN1pLRzRSS1ENCjJLVzY0aktTQ09MVkMwTlFha1VPMk5JTTltT1RRRGtRS2NSU3YwOThCRnVLUXRTMnA5b0JnZTNYR0d4WVRqWXBQZEwxeWV5akNzREoNCkN2N0krMFBsWHJtKzBuYU8xVGVhMTNaTm5paHpaTlk2L2IzRVhxd3VKVkgybDZNUDgvZk5zSmdpdzZHV014TkhtOGUwVzRXSyt0MEQNClZYbCtyZk9HeURZdm91S1c3MkhTTGhmcTYrQnB2N2RCbUZ4VTdHSVRtQ1pwREg2WHhjSEpHOUFPZzNyVGZmTmhqZ1BpeU9NRGRINnQNCnJVYVdjTmtZZlRrVThqSXdJSjI2QVZPMWZITDdGVUdySGhKUEV3ZnpiZXFiVmVCTEUxcVBvcVAxWlJQbUV5RkFwTkE3Y1NxamY5dFQNCjNIOWNybUhGaU5scW9HbHFLL0xJMGhORnQrUzlNcklaaEt0TGROSDFxNDB5V3FoR0xxdEFhcTVVclR3L2x6WXlGRjF1TTJBejNUZFENCnQ1UW9FaENtaEpKMnJTcEhUeHJpSExISmt0bmR4Q0hkakpYWmZsOU9TWWtGU3VweEtlRDBSRjY4ZHpXblNvNzRVMVRFZGJ0NG1haUoNCjhCQkRNZDZpaDhmbmdDTWhzSlpORzdzcGVzamNSMy9hRzNieEdDWXNOQVF0eUlISzhkbUFxclY3ZEtmUEl4bXlsQzFGVlYxS2phUWYNCmo4c3NhZUdubTFyS3lPckwxSFQ1aktwQnlvR21VYVhlbzRGZTQremxKRG1Sa24xak9kdm9BOGNJcWtwM2FTTWRnS25xQU9wOXFaS0oNCloyblp1Wm1zaEhJS0oxVlFlL3k5c3U0dG1uYml0SUxwYW1yZkNEMEdRY2k5a2lkaEJlcW9Pem5mSUZ4c2dWYjZOYUFMV24yUUFkcWYNCmRnYVZlMnZ1SUJQajBydCtHVjI1NFJLVHhOUndkeHYvQUxlU0JaWDBSOEY2aXhtVGdvOU9oTzNiL01aWUNDNCtTS1g2amVRVHU4amcNClBHcFZVNEtXQm9PTlFRT1c1RzFjR1E3S01aNUJJWE1Za0xxcDlLUWRldmZDQnN4bEdqdXVlQ3ExVG9OMU9MWFc3bHR6c2UvK2RNSWwNClRDY0xVNUxPV1NibGFoa3ZEdEM4ZjJqWHNRZW8rZVptbnl6NGdJM2JyZFZneG1OenF1OTUxRGRDT1ZIcjlrZy9jY3dTSE1CZXg2T1oNCkpvYlNPTS9GSUZxSzlxRTErV2E0UXVWTzN4eTJ0UGYwd2xqZENPM1Y1WGgvdjJVb2dCSDhyTVJ2c2N6Z2VEcmJreHhtY2Jsc0c5WDENCldDNG5TWUpKSEpJUzBnbFlGaFVuZ0F1NSt5T3ZNK0cyV2VJSkxpd0dqWEx5WTdxVWw1ZVc3aHdFb2F0eDNGYUZhcjN5cklkcjduR3oNCjQ2Mjcxa0VYN3YxSEh4S0tIdjB5TXQzR3hxYlErbEo2eUE4bSsyblkrNDk4ckJwTW8yam9ydEFnSzdqcGhJdHF1bU8rZjdrVzJ0dzMNCndHOU9FbnVwSFhObGtkWGhOSjE1YTFJeVJtTldWbk5CVWtWSU9WMjUwU3pHT2FkWVNvb0IwSnFCU3Z1TVEyaEhXRUViRmhkYzJaZWwNClNRdFR2dDkrU3BiSjVKWnJOdWxTSWw2anI3NFFHcVpTVlZiZ1VadHdkL2ZyZ0xTQ2dKNDFpVThSVmFWQjZkZnY3NVdZZFF6QlMxSlcNCmpsbEFweFduSHg2VjJ3ZzBpUXNQUHJ0QkRjc0YvdXlhcDh2REl3bFlaU0ZGRzJsMDBkRFhZL2hna0d5RW1YYVZjaVJkeWVRTkJ0V28NCkk2NVhMWnZFbVFKSXRRRUpBQXB5TzQvamtZRmVKUmcxdmhlaUpaR1hpZmlZVk5CVUR0bHNxcGtZV0xST3N4K2s1WWtqYXZMZmd4MkINCjRzYVZHK1FpU2VhTWVUb3hhOXVDYnlJVi9hQkxEZkxDRVpEYWF2U1MzVnlhZ0RmeHI0YlV4Y2VtUDJtb00zd3RVYmJFOThwSWN5TTANCmREZk9wSzFxUjFHQzJaS3pVNzY2Rm9xclB3am1iaEtpL2FLMUczVWJHdmZyazRBMWFSUitERjlWODIzVFNmN2pyY2kxaU5ER3pFdUkNCndRQTVjVUFEY2h0U25iTWc0eFc3Z2pXeTR1bGU1T3JIekdtb1dnV1NNTE9aUW9BWGlmaVhseHFCeDhUL0FHWUFLY2d6akxrbkduZ3QNCkdGYzcvd0JQOXJCTmhGSHRBUkdkaHQxcDkyVkJqSkU2RWx1Sld2SjNWUWxRbGZicVZyMTY5czZEc3ZDQU9NODNsZTJ0UVpId3h5NnYNCkVDdWFPM29IcTNrWFV2VmdzbVlxWkZRb09SQU5ZNnJUNmVXWW9xT1J6OEp1TDBMU29yQzRzQkZlMjVrYUtWSldVcjZpODFaU0pEVUUNCmJIYnhHVlNNdUl1Vm1NcjJQUkl2T0dtbTMxQVF3TXIxa2VaeXJLT0VLcTNwbmZwV2hTbGQycFR3d2l4SjJQWitRY08vVWZiYVRDWjcNCmgxVGo5c0VNM1RwMU9aTWhjUzQrcmlBbXhoS3JzdXpiazdFanRUSUFiT3RpRkNXRWhkdHEvd0JNaVEyRUlOZ0lwZ3pieG5hVmY0L1ANCkRBMGQrVGpaWVdOdWFWZm1iYXNIVnZBL3d6T3ltblU0a2c4bzNzb1NSUzI4UlVBTnZVRWcwNlpBOG5MeG5kNjNvOTBKWVYzTEFVcU8NCjVIaDg4QWNvOGs4aHVCNndSb21CcnUreXFldndHcEJyOEo2Q2dIZnBoR1FjWEMxQUVkVUhxWDh5bW5nQjg4dFlUU0NVRU42bEQxN1kNCjAxQkJUcWVKVldvblllTlA5dkJUSzBpdVBVSmRWMi9lY1I0a0FaV1IwU0N3NjhpUm82ZHgzekdoS2kyeTNDR2dja2NUMUhmTWd0WUsNCmQ2UGZOSEtpU2RLL1Q5R1Z5RGtZeXp5enBQYk5KQ2ViS3RkNnRRa1UrSURjWkFCRWpURDlXVStvRmtwekRPMGc0MUpEQ2dVSGJwaEwNCnNNRWs1czB0bzlPam94VUp1UUdKWUR3TmVJM3lRaUNYRnpTOVJTeFZNdHh5MlZWK0gzT1dTTFVVOVNKamJnVXFCdDI3aklLODN0ZFcNCllNT1JxRGtwWTJySGxUY2FpcktyeDdNQWVZL3BsSmc1UGlKaGJYc0Z4REZWV2xNZkZpRllMOWxxMGJrR1UvZGxzQllycXZIejgwbHYNCnRFVDZxenlEbEdoM1VGcTFZN0R4RzNqbFhpeUVxTGpTeFdYZVh0TGtqZ250enhraTlXS2NiZ0JDQU9YeGZhTGZFS0Q1K0daUmxiWmgNCnhVTExMTGVSVVVPVFFyV21WekRlSTBtK25DUzc1Vk5FVUF0NDc5QjlPWmVnMG5peTM1QjAzYXV0OENJcjZwSTlMV0NGT2dGQlFBWjANCjBjWWlLRHlFODBweXM4M2lUNmZlSUt0Q3crWU9jYlQzUEVHUytRWlhONjFwd1l5UmxwbzZWcjlpaE8xUHNrQTVSbGp1QzVPbXlVYWUNCnZhVHJNZEdXNWthTkdIRlNBRkFHeTdoYUwrSHo2NHo5VHN6aHNBeFMvV2JrM01xbVFtV0JReVJ0VUFoUVNkcWNxZUhmNk1ZWXUvZHkNCjhlM3ZTMjBnVXVmUlFoVVB3S2ZBNy81N1piTFlVNDJhUmtkMDJNTXJNQzNYcVdwUWRRVHNQbmxZNU5YQUdybTBMQ29YWWRQQWJZQ3cNCklTMlMyRHEyM0RqMEp5SkRXUWhmekVzMmVFc1IwTmMyR2FPem9NSjNlY2FmL285NlpGMkRDakE5RFRjWmp3UFJ5NDgzcUhsdlVTaUkNCkdhaG9PbE10aUhKQlpsRGR4U2hXUEd0Tm1IZ2ZmNWpMT0ZnU2dkU2s1TlJUOElQV25qODhKWWMwc2tvUVZyeXAwQXhhenNncFk2TVYNCnFLLzU5Y0JWS2JtMFVSSklha25reDdiK09RbWtKWkgrVlA1Z1hmeFcybWVwRzNMaWZyRnNLOERSdXNnNkU1VjRFdTVmSGozcGZMK1cNCm5udUc3TUIwdGpPcG9VU1NGelhjN2NYTmVuYkxCamxYSmo0c2U5Vms4bmViTFRnOXpvOTNDU2VJSmhrb1NGTGJFQ2gyVW5JbkhMdWINClk1bzk2ZWFWcEhtMk9qRFI3NGNUVG1MV1pscU5pRDhOTWlJUzdtNDVZRWMwMWV4dWI2QVN2cHp0SXhxOGp4UFFrZ243UkZONmREa3gNCkFzQmxya1VoMUthZFQ2SVQwcUU4Z2NnUlRJRzErblJJUnlwOFFvU08yUkp0bVV5UTh4OFZhK0EycU1ReEplR1dsM0lpZ1A4QUdnKy8NCjc4ekRGMW9tbWxyZnNwQkoyOGNyTUhJaGtaYjVkMEhYOVRkSDA3VDdpZFpDQjZpeHQ2Vy9qSVFGSDM1VjRjdWdieG1nT1paenBQa0gNCnpOY1RUV2R6REJhU29sVDlaa1VxT1ZPbkFTNzdqdytlWERGSTh3d2xxb0RrV1NXSDVUOHdSZDNCdHBaRHhqZ2loQ29EeHIvZWM1QjANClUrK1hEQ0IxYXBhK1I1QlA5UDhBeXg4dVdrQ05keHZKT3NnQ1BLL3FDUjYwK0tOUWk4Q1JXbmgxT0VZbzMzdFU5WmtsMXBmNW84cHkNClIyQ3o2VlpSZldJbnBMRGJLc1FlSmdLc0UvbVFnVUhMY1Y2bWd6TTAyWVl6eTJkWHJNSnlqYzdoNXRmNnJhMnNyUTNVcTIwbyszRkwNCldOeDdNcjBZWnNocW9IcUhVL2s4ZzZGa3NmazNUcnV4Wnl4TmEwYmJPVWpLdzloT0ZHbmtNRU9zNlg1M1ZOTmlua3VJWFpGTUVaa2INCmc2bFNhS0QyYkp5aHhSWVFud3lGdlZJZEcxdDdTSG5wZDJKcHQxRFF5RG1LQTBBNC9mMXpHRVo4cUx1OE9weDlaQWZGRVcvbFRYWmsNCll5V0U4TzQ1czZtTlFQRDR3dS8wNWFNY3lPVGZMV1loeWtDbk1Ya0hYNGJsTFlXb1dWeHpDbVdJMUhpUGk5dW1Jd3k3bkVPdXhkU2oNCmg1TDExa2NMYjhsU3F5SG5IVVVPOWZpeVJ3U2F2ejJQdis5WGovTGJYWlVWaTBLY3dDdFdZamJ4NHEyUDVhVEE5b1kxS1g4cTllYVQNCjB6TGJqbHZ5ckpUb1QxOVAyeC9LbnZhZjVRajNGSS9PUGx5OHVMVmhIYnRLWkdDTHdGVFVqcnQyN1ptengySFVSblR6NC9rMzVwa2QNCm1qbXRRb2JqUjJtUS9NY291bnZtTCtWa0QwY29hcUt0SDVUMWpTcFlJYnh3OGp1VVFJV0tzVUlVbjQxWDRkOHQ4RXR3MWNHV2FkYTMNCnp3Z0tuN3ZjcXhLcUtxZUpGYWs1TGdLZkhnZXJkKzhWc3Arc3lwSFNoTlhUWUUwclVIeHdjSlVaSTk2WHFSSXhaR0RSL3dBd05SOTQNCnlKQlFaQXFONm9VSGlLcysxUjA2NEZ0QlhhL0FpRURrQlR1UmtDVTArakkvSnR4Qk1rbHMwTWFJa2kraUN3VW1Rb2VWUXUxUFQ4TysNClpMaFUxTDVITWx4OVpiMGhjcVNZNVE4bndraWxhQUFINmNOclNuZGVUdFN2V2hTNUZ1SVlaR2I0WlpHWmxNY3NYKysxb2VMcWV2aU8NCjFTb3BWdFBLTi9aSkpIYnZDMGNrbk1JenVPSVBFTUs4WHIwWnZ3OThiV2tQWmVRYnF6YTNhR2RBWTNEektXWWcvQkl0RitFVStLWDcNCmhqYWtLc3ZrYWVYVWZycG5WWEFRQUt4QVBGZzI5VVA4bzc0MnRMdFM4bTMxMmljWm8wa1YwUEtyZEFTRy9aUDdMbjZjYlVCMm9lUzcNCnU5bGhaNUlhUkE5YW12eG8zUXIvQUpHQkl0NW5wdjhBemlwNVpzN1pWS3JjWEFma1pMcWFTWUFlSEdOTFpUOUs1TDBydXpLMC9KN1MNCnJLNSt0YWZaMk9uWFlVckhjV2NTd3NBZXV3VGpqWTdrVVUzSGttNDlTSXVMZVQwaDhNcmtsK2RSdjlpbGRxMXg0aXZDcngrVk5RUXgNCmdUUkZFVXEzTGtYWTdVUE9uc2E3YjRMV2xZZVdic0d2T1BicDhUVS9WamFhWEh5NWVVKzNGOTdmODA0RnBiL2h1Ky9uaSs5dithY04NCnNlRkMzM2tnWDBMUTNrTnJjd3Q5cUtaZWFINWhrSXh0UENtRnQ1WmpncWtVY01VWVdpK21PSnFhOHFnQ2xPbVJFUU9UWVpFOHlpSTkNCkRWWlEzcHhmQW9FVW01Y1ZyVVZJMkcvamtyWU5ybzFaMmVSWWpHdkgwRnBYaVJVbCtnb3hKN2VHTnJTcU5LQW1sa1BBaVZWVXJUc3QNCmV2ald1TnJTdUxPaDViY2lBQ2ZZZFAxNDJ0TytxdnpKNURoUUFKVG9kNm12dmphS2N0b1ZPeEhBQUtxVUFBcFhwUVkydE9hejVPakUNCjBNWkpBQjJOUVJ2OStOclRIVjhxWDZKQ3EraXhaaWJqbks3Y0F3Wmp3SmpQUDQ2S0FlUHcvS2hueGhxOElxVUhrYWFHV2VSWi9VTTcNCmNtRXNqdUY2N0p5SHdydjBHUEdGOElvYVh5RGZEVUV1a2tpbEQxamtTU1Fxc1VaV3BhSUNJbG1aMFFFTXcycWE3VUx4aGZESzgrUUoNCnFVUm9GRlNhQWtic2FrN0w0bXVQR0Y4T1NDdnZ5dE41QzhNcndsSEJWdXBORDgwT1BFRThFa3R2UHlXU1ZUNlVkZ2tsT0lab3lWb1MNCkNRVkNyWHBnNGdrUktFay9JNjY0T3NVMXJENm03bUpwSXFucFg0RUdEWmtCSWRVcG4vNXg3OHdsbmUzMWlPTmlTVUR5U1NJTmgreTgNCmJWK2s1RXhEUGlrOTJ4VjJLdXhWNURlZmtkNWkvVCtwNjFwZm5DYlQ3aS9tdkpvZ2tMMWcrdDNTM0hGR1dkTnYzYWh0cU40WXB0a3UNCmplUU5TYXowSStZOVEvU1Y3cE45SnFEdE5XNFlsWTJpdGtTWitETDZZQ1NQUmZqa0ZlKzZobk9LdXhWMkt1eFYyS3V4VjVrLzVXK2MNCjMxUzZ2UjUwbmdYVUxsTG0rZ3RvWklGYjBvVGJqaDZjNjhUSW5FdlQ5cFJTbEJpbEZXbjVYNnhMb1Y5cEhtRHpITHIwVjlMWU14dkkNCnVZamp0Q2h1RmlETzNCcHdwSElmWisxdTJLSG9ZQUFBQW9Cc0FNVmRpcnNWZGlxeTR1SUxlQ1NlNGtXR0NKUzhzc2pCVVZWRlN6TWENCkFBWXFnN3VTZlV0SWVUUTcrR09hWlExbmZoVnVZYWcxcnhWbERxYVVOR0h6eFY1L28vNVQrYnRNaXRiYUx6cmQvVTdFV3kyMFFTVlINCnh0K1pjTXZyOFNITDA0OU9LZ0d1S1ZYVS9JTThlaDZIRDVpOHpwS21rcGZSWGVyM3ZLS2FWcjVHalRqUDZ5TW5BUFNuSWxxRDVZb1oNCnBZVGFab1dpNlhaWHVvd0tJb0lyYUc0bWRJaE0wY2FyeVRrMi9LbGFBbkZVMGpramtqV1NOZzhiZ01qcVFRUVJVRUVkUWNWWFlxN0YNClhZcXd2ejU1SDh4K1pMcUNYVGZNVGFLbHRFVnR6REN4bVNaMnBKSUprbGlOR2lQSGpUWWl0ZW94Vkpwdnl4OC9OTE5MRDU4dTBNLzENCmdzakpNVlZwcGZVUW9CY0FLSTFDb0F0QlN0S1Z4U2pOQThnK2N0TjErd3U3M3pUZDZuWlFxVGVwSkxLcXltSzJpZ3QwOUFzNkFlb0oNClpwSERBc1NBMWFWeFFyZVNQeTN1L0xtclEzODk3QmNlbFpUV2hTQ0Y0YXZQZHRjczI4cmpnS2dLbFBoM0kzWmlWV2Q0cTdGWFlxN0YNClhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxZzlaMHVEVmRKdTlNblpraHZJbmhrZEtCZ3JpaEsxQkZmb3hWNXYNCnJHaGVRZEIxWDZ0ZjZoZlc4c05ySExFZ1VTeE5FOTFJNnJUMDVBVzlSYVZjYmtnMUxFbkNxRmswejhyWnRQRUVtc1gwZlAxT0tzc2kNCnlHUjJDQmFlbFJuQmlkQUI5c21UcWEwVlU3YlNmeXl1bzFmOUxYRVZuUGFDZVczNFNDY2w1cExneTNFaUt5MVJSNmZMc0ZvV08yS3MNCmk4dFdma0RWYnU1MCsxYzZ3azBNTnpKNjhTaUZQUlVJcXA4RWZGdU1vTEpUYXRkaVRnVm5zRU1VRU1jRUtoSVlsQ1JvT2lxb29BUGsNCk1WWDRxN0ZVbTg1TnA0OHJha21vWFRXVnBQQzF1OTBxTkt5R2Y5MGhDSUN6Zkc0MkdLc0l0OU50a01sM0Q1emh0NU5SU1c0bWFJUEQNCkdqWGZPWkpDUFhCVGo5WUhwcktkL0RsU2lxdnFXZzJkeFp5YUpmZWFwZnIxb0htdWIyYjFlQ0pMWkcyVkdra2N4TFV6aDJYbHlZTjcNCjhzVlVadEg5YTZqZ204K1J5d3RjVHlTV3hZTWhVUEhTRTBtNEw2Yk1uRUhmZmJyaXJXbjJWckZldEhkZWRsdmJsZEx1YmVPNGw1TWkNCmZXSkVYMWhJMGhoUEZpb3BYa1R0WFlVVlpmNUZpdExQUTEwZURVazFSOUpjMnM4OGE4UXJmYkVmVmdTaXVBVFg1ME8yS3NoeFYyS3UNCnhWMkt1eFYyS3V4VjJLdXhWMkt1eFYyS3V4VjJLdXhWMkt1eFYyS3V4Vkk5Yi93VjljUDZiL1IvMXYwbzYvWFBSNStqNnA5UCs4MzQNCityV25hdUtvTS84QUt0ZlJpcitpdlM0U2VqWDBLY1BVUHFjYS93REZsYSs5Y1ZXUmY4cXVxZlQvQUVQOW1Pdis4OU9QcG4wdXUxUFQNCnJURlV3MFQvQUFaOWNmOEFRbjFINjU2S2VwOVY5TDFmUm92RGx3K0xqVGoxOXNWVHZGWFlxN0ZVczh5L29UOUVQK20rUDZOOVczOVgNCm55NDgvWFQwdVhIOW4xZU5lM2p0aXJDNy93RDVWSCtuZFErdGN2MGp3VDYxeCt0K242ZndjT0hEOTF4NmNlUDBiWXFqZFUvNVZ2NmwNCjE5YTliajZOdDlZOVA2NzZYKzZmcTM5MzhIcjA5R243ZkduYkZVRFpmOHFlK3R3L1ZxZXJXVDB2OTZ1RlBySTUvYStIajYxUG85c1YNClFrLy9BQ3BUNnVucmMvUzlFOGZVK3ZWOVA2d2xhOHQvNzNqMTdZcXpIeVgvQUlWOUMvOEE4Tzh2UytzLzZYeTlYKzk5TmVQSDFmMmYNClQ0OGVPMU1WWkZpci85az08L3htcEdJbWc6aW1hZ2U+DQoJCQkJCTwvcmRmOmxpPg0KCQkJCTwvcmRmOkFsdD4NCgkJCTwveG1wOlRodW1ibmFpbHM+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiPg0KCQkJPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpDN0Q0QkQ2OTc2QTNFMjExQkVENkZDQ0Q5OTI5OTg3ODwveG1wTU06SW5zdGFuY2VJRD4NCgkJCTx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6QzdENEJENjk3NkEzRTIxMUJFRDZGQ0NEOTkyOTk4Nzg8L3htcE1NOkRvY3VtZW50SUQ+DQoJCQk8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnV1aWQ6NUQyMDg5MjQ5M0JGREIxMTkxNEE4NTkwRDMxNTA4Qzg8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4NCgkJCTx4bXBNTTpSZW5kaXRpb25DbGFzcz5wcm9vZjpwZGY8L3htcE1NOlJlbmRpdGlvbkNsYXNzPg0KCQkJPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4NCgkJCQk8c3RSZWY6aW5zdGFuY2VJRD51dWlkOjUzZGE1MGQyLTI1ZDUtNDE4My05ZDk0LWQxZDY3ZDM2MDEwOTwvc3RSZWY6aW5zdGFuY2VJRD4NCgkJCQk8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOkU5MjY5NERDNTlBMUUyMTFCRjIyQTA2QUY2NTA0OTg3PC9zdFJlZjpkb2N1bWVudElEPg0KCQkJCTxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+dXVpZDo1RDIwODkyNDkzQkZEQjExOTE0QTg1OTBEMzE1MDhDODwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPg0KCQkJCTxzdFJlZjpyZW5kaXRpb25DbGFzcz5wcm9vZjpwZGY8L3N0UmVmOnJlbmRpdGlvbkNsYXNzPg0KCQkJPC94bXBNTTpEZXJpdmVkRnJvbT4NCgkJCTx4bXBNTTpIaXN0b3J5Pg0KCQkJCTxyZGY6U2VxPg0KCQkJCQk8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4NCgkJCQkJCTxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4NCgkJCQkJCTxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6RTkyNjk0REM1OUExRTIxMUJGMjJBMDZBRjY1MDQ5ODc8L3N0RXZ0Omluc3RhbmNlSUQ+DQoJCQkJCQk8c3RFdnQ6d2hlbj4yMDEzLTA0LTA5VDE3OjExOjA3LTA0OjAwPC9zdEV2dDp3aGVuPg0KCQkJCQkJPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgSWxsdXN0cmF0b3IgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4NCgkJCQkJCTxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+DQoJCQkJCTwvcmRmOmxpPg0KCQkJCQk8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4NCgkJCQkJCTxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4NCgkJCQkJCTxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6QzdENEJENjk3NkEzRTIxMUJFRDZGQ0NEOTkyOTk4Nzg8L3N0RXZ0Omluc3RhbmNlSUQ+DQoJCQkJCQk8c3RFdnQ6d2hlbj4yMDEzLTA0LTEyVDA5OjM5OjM1LTA0OjAwPC9zdEV2dDp3aGVuPg0KCQkJCQkJPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgSWxsdXN0cmF0b3IgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4NCgkJCQkJCTxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+DQoJCQkJCTwvcmRmOmxpPg0KCQkJCTwvcmRmOlNlcT4NCgkJCTwveG1wTU06SGlzdG9yeT4NCgkJPC9yZGY6RGVzY3JpcHRpb24+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOmlsbHVzdHJhdG9yPSJodHRwOi8vbnMuYWRvYmUuY29tL2lsbHVzdHJhdG9yLzEuMC8iPg0KCQkJPGlsbHVzdHJhdG9yOlN0YXJ0dXBQcm9maWxlPlByaW50PC9pbGx1c3RyYXRvcjpTdGFydHVwUHJvZmlsZT4NCgkJPC9yZGY6RGVzY3JpcHRpb24+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBkZj0iaHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyI+DQoJCQk8cGRmOlByb2R1Y2VyPkFkb2JlIFBERiBsaWJyYXJ5IDEwLjAxPC9wZGY6UHJvZHVjZXI+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCTwvcmRmOlJERj4NCjwveDp4bXBtZXRhPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwACAQECAQECAgICAgICAgMFAwMDAwMGBAQDBQcGBwcHBgcHCAkLCQgICggHBwoNCgoLDAwMDAcJDg8NDA4LDAwM/9sAQwECAgIDAwMGAwMGDAgHCAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgA4wDyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2Rl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LzEuMS8iPg0KCQkJPGRjOmZvcm1hdD5pbWFnZS9qcGVnPC9kYzpmb3JtYXQ+DQoJCQk8ZGM6dGl0bGU+DQoJCQkJPHJkZjpBbHQ+DQoJCQkJCTxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q2hyb25pYyBXb3VuZCBpbnRybyBpbWFnZTwvcmRmOmxpPg0KCQkJCTwvcmRmOkFsdD4NCgkJCTwvZGM6dGl0bGU+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcEdJbWc9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9nL2ltZy8iPg0KCQkJPHhtcDpNZXRhZGF0YURhdGU+MjAxMy0wNC0xMlQwOTozOTozNS0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4NCgkJCTx4bXA6TW9kaWZ5RGF0ZT4yMDEzLTA0LTEyVDEzOjM5OjM3WjwveG1wOk1vZGlmeURhdGU+DQoJCQk8eG1wOkNyZWF0ZURhdGU+MjAxMy0wNC0xMlQwOTozOTozNC0wNDowMDwveG1wOkNyZWF0ZURhdGU+DQoJCQk8eG1wOkNyZWF0b3JUb29sPkFkb2JlIElsbHVzdHJhdG9yIENTNiAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4NCgkJCTx4bXA6VGh1bWJuYWlscz4NCgkJCQk8cmRmOkFsdD4NCgkJCQkJPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+DQoJCQkJCQk8eG1wR0ltZzp3aWR0aD4yNTY8L3htcEdJbWc6d2lkdGg+DQoJCQkJCQk8eG1wR0ltZzpoZWlnaHQ+MTAwPC94bXBHSW1nOmhlaWdodD4NCgkJCQkJCTx4bXBHSW1nOmZvcm1hdD5KUEVHPC94bXBHSW1nOmZvcm1hdD4NCgkJCQkJCTx4bXBHSW1nOmltYWdlPi85ai80QUFRU2taSlJnQUJBZ0VBU0FCSUFBRC83UUFzVUdodmRHOXphRzl3SURNdU1BQTRRa2xOQSswQUFBQUFBQkFBU0FBQUFBRUENCkFRQklBQUFBQVFBQi8rNEFEa0ZrYjJKbEFHVEFBQUFBQWYvYkFJUUFCZ1FFQkFVRUJnVUZCZ2tHQlFZSkN3Z0dCZ2dMREFvS0N3b0sNCkRCQU1EQXdNREF3UURBNFBFQThPREJNVEZCUVRFeHdiR3hzY0h4OGZIeDhmSHg4Zkh3RUhCd2NOREEwWUVCQVlHaFVSRlJvZkh4OGYNCkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zi84QUFFUWdBWkFFQUF3RVINCkFBSVJBUU1SQWYvRUFhSUFBQUFIQVFFQkFRRUFBQUFBQUFBQUFBUUZBd0lHQVFBSENBa0tDd0VBQWdJREFRRUJBUUVBQUFBQUFBQUENCkFRQUNBd1FGQmdjSUNRb0xFQUFDQVFNREFnUUNCZ2NEQkFJR0FuTUJBZ01SQkFBRklSSXhRVkVHRTJFaWNZRVVNcEdoQnhXeFFpUEINClV0SGhNeFppOENSeWd2RWxRelJUa3FLeVkzUENOVVFuazZPek5oZFVaSFREMHVJSUpvTUpDaGdaaEpSRlJxUzBWdE5WS0JyeTQvUEUNCjFPVDBaWFdGbGFXMXhkWGw5V1oyaHBhbXRzYlc1dlkzUjFkbmQ0ZVhwN2ZIMStmM09FaFlhSGlJbUtpNHlOam8rQ2s1U1ZscGVZbVoNCnFibkoyZW41S2pwS1dtcDZpcHFxdXNyYTZ2b1JBQUlDQVFJREJRVUVCUVlFQ0FNRGJRRUFBaEVEQkNFU01VRUZVUk5oSWdaeGdaRXkNCm9iSHdGTUhSNFNOQ0ZWSmljdkV6SkRSRGdoYVNVeVdpWTdMQ0IzUFNOZUpFZ3hkVWt3Z0pDaGdaSmpaRkdpZGtkRlUzOHFPend5Z3ANCjArUHpoSlNrdE1UVTVQUmxkWVdWcGJYRjFlWDFSbFptZG9hV3ByYkcxdWIyUjFkbmQ0ZVhwN2ZIMStmM09FaFlhSGlJbUtpNHlOam8NCitEbEpXV2w1aVptcHVjblo2ZmtxT2twYWFucUttcXE2eXRycSt2L2FBQXdEQVFBQ0VRTVJBRDhBa1duK1Z2OEFuSVMyK3N5V3pYd3YNCkE2eVFtKzFBU1FOS2tzN0lTcmFoZmM0aXJ4aHdxUWlnQTlOajhRVlRLTFJmenV1L01HbVhtc1I2ck5wc1BKVEdsMWJRekJSY0t5bTcNCmowN1U5S3RmVTQ4Nk1xVHJ3NGhvMmFveFZDNlpZLzhBT1VsbmJSd1NUdTluQnA5aEUwVmRObXZES3Nkc0xob0xtNGtrRWx3WDlmMUQNCmNmdTZVNEZpM3dxb3JSOUMvd0NjaGJLM3ZYTnpMRmR6Rzl2N3NJZExsUzR1NXZxU1J4VzVsVm1SVWpOeVllZkVjMFVTSGdSVlYxOXANCjMvT1NWNXA5N0cxemNSckxaM052YjI4YjZYQktUSmFhZ1lKWG5nNFBIY3BNdGtyR0tSWXd6TVYrSGRWVlM1UC9BRGs3SFB5aWk5YTMNClMvWDFJWXBkS2pkNEEwdkpZWkpZNWVOcVU5TDRwQWJnTnkySXhWWjU4OHNmbnZjL21OZVhmbHk1dTE4clhGOXBkd2lKZkpFcXcyYVENCnBQSEhHMHlsRW1NMHJTS0YrUDB0NjFXcXFCVFQvd0RuS0s2c0xTMzFlZTRjdmR3eVNOWXRwZG5JcVIzTnJKSXQwOGNuTDBQVFdjUi8NClYyNXZ0NmdveFFLcWtOdC96bERhYUhGWXdDVnJsTEMxaEZ3WnRMbmVPVllyTU5JclhKZDU1L1VGMExqMW5DTU9KamF2VlZPbDBYODENCjdqeWJwMzZidDlUdU5WYlhWdk5Zc3ROMUtPMXVUWU5ac0hqaG5TN3RrV01YRENrYXpENVV4VkJhVlkvODVNMmMwcXZjcE5aV1dtUVMNCldkcGNHeGxhNHVZQmJ5TmJQZGttWnBwNlR3eVNPb1JSUmxjc2FxcTNhNmYvQU01SldlcUFwT0xtSzRuZ2tubG1rczJnNWl5c2t1ZWMNCmJFdkZiK290ejZTV3dWdlUzZjRUVXFwaHAybS9uVGQrUWJHUHpTMTFlYXNtc0NYVTdYVHByWFRiK2JTaENSNlNUV3R4REFqaTRJZXENCnpvV2pGQ1F4SXhWS2YwSi96a1BhM01yNlpkM3NWdmRyYXcramQzV20zN1c2cGFXNnZLSkpvNCtVcXlMS3I4VUN1YXRSaWVSVlJPcjINCmYvT1NSMU9hMTA2K25Xd1M2bVUzeFhSU1d0a1M0K3F0YnEwZkw0NlEvV2ZWUUgxRCs3QVN1S296eTlhL24xYmVZOU9OOEhiU0o3MXANCnRTRHpXVXNheFB4OVVTY21lWkVDL3dDODZXMUtQWG1PTk1WU1hWL0ozNS9uelRxVXVsNmxjRFNEZVBCcHF5My9BTzcrcU5kUHFpenUNCm9sOVRad2xqVDdYbzFGT09Lb3hKZitjbEk0b0ZXR2VaSm5WQTh4MFVYTUtyY1diU1BkQ05saElhSVhhSjZISThTbkljOXdxaHJqVC8NCkFQbkpPYXl0Yk83bnU1bE1sdEpOYzJzbWsyODVZcnA4c3lUc25vMHQwZjY2aStoKzhKQzh1U0dwVlIvbWp5ditkaStjZGExN3k3ZVMNCm0yYTRtWFNMSjd1UXg4RHBLUnhPYmVXNitwZWo5Y0xuaWJjU0NRSzFTaE5GVU5acC93QTVScERHdHhMSFBNTFNiOTZ5YVpFQzM3LzANCi9VUldrcGVWOURpRVkyOUtoaVR1VlVVOFAvT1NKZ3VCYlhBVkRaM1U5bTkyTk1hN0U2elN3MjF0TXNLcmJtUnJkNHArU042ZnFJVkwNCmNXNDRxZ2xmL25JNncwZExyVU5RbG0xcWE0dHJDdzA5TEt5a3RuVzZpa1NTNnVqYXhUdEMxczdKSzVNeXhWUmxISU11S3Zjb0VlT0cNCk5KSkROSWloWGxZQUZ5QlFzUW9DZ25yc01WWDRxN0ZYWXE3RlhZcTdGWFlxN0ZYbTlucVA1d1c5dEE4bGg5Y2tjTUpsdVBxcU1yVWcNCnFmM0xvT05mVkVmZitZSGJGVmFIVmZ6ZmF6dElYMHEzV1V4eGZXYnJsR0pDNG1SWlBnOVJveCs3NWZQcUtmWnhWSHRKK1k5N3BGcEgNCndYVGRTK3ZCTHFSUkF3Rm1zTG5ueVkzQ2tzNFd0SXdRVFNsTjhWUTgrcmZtdkpBcXg2UGJReU16ZXBLckk1VkZvYWhXbW9UV3FqK2INCjdYdzlNVlhYMTMrWnFheEtMTzBFdGpETmNGUS8xY0pMR1k1R3R3cERDVFpnZ2F2SGZ2U3B4VkZXV28vbVBjWDg4TjFwdHRhMlN3eXQNCkRjTFF5TktJMTlOS2VzeXFTN0UvdERhbitWaXFWdGNmbS9hMmNGdDZVTjdNMEtUVDNvV0VPc2p5Z0dBQVBGR2VNZTViMDZmUEZWZWINClZQellNRXlKcGR0RzZ0TXNjbndTT1ZSUjZUMDlaVjVNYTlxZkxGV2VDdEJYcmlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGkNCnJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZmS3RqNTQ4MnVvOVRYYitoQXFUZFRkZitDekE0ejN1N0dLSGNQa20xbjV4ODBPM3gNCmF2ZTA4UHJNMy9OV0VaRDN0bmdRcmtQa24wSG1qekJJZy8zSlhmdy9hL2Z5ZC9mbGsrTXRNc01lNE1kMTNXUE85dGR4M3Rycm1vZWwNCjltNWlOMVA2ZnBBL2JDOC9oWlI5L1R3b2VJb0dLQTZCTXJEekg1cmVPc21yM3RBTzl4TFU5L0U5c2tDVXl4dzdoOGxXYnpKNWtFSi8NCjNNWGdrNmNmckV3b1BIWS94eU1pZTlJaEMvcEh5RER0WTg1K2NGdUQ2Zm1IVUZWd0dIQzd1RkEyNkQ0d2R1blRLakk5NWE1d2pmSUoNCldmUFBubFRRK1lkVC93Q2t5NC81cnpHbE9ZNmxqNGNlNEt0eitaM21qVDc2U0M1MTdVaEU3VmhsYTV1Q3A1VStFSGtSMTZETXdtWGUNCjM0bzR4c1FQa244WG0zejFORXJIV3J5RUU3Y3JtWW1udlI4ck9TWGU1UGc0K2tSOGdoTC9BTTBmbURBamVyck4vd0RFQ1E4VjVPTmoNCjBJSEx0Z0U1ZDdWTERBamFJK1NVYWw1Njg3TmFxNitZZFRqWWdjdUY1Y0x2VGZvK01ja2dlYmh6eFI3bUUzLzVrL21IQklmK2RzMWcNCktmOEF0WVhXMy9KVE13RWtPRklBSWIvbFpQNWtrY2g1dDFuaWR3ZjBoZGY5Vk1iS0tDMC9tYitaWC9VMmF6LzNFTHIvQUtxWWJSU2YNCmVYUE1INXA2ckp6bTgyYTNGYWdmYkdvWFFxZitSbVdSaVMxVHlBTXRzUFBmblIxSFBYOVJhdmY2M09mK044MS9pUzczYStISHVES04NCkU4MCthcGVKazFpL2N0Mk56TWR2K0N5bnhwRTh5NUVjRUs1Qk9aL01YbUlPa0RhbmVBU2lqTUxpWUVBN0doRGJIZkxQRWwzcU1FRDANCkh5Uk0ybzY5eENqV2I2TUlvTWNndXBqVStEVlk4dnB4bE9YZVdZeFFIOElQd0RHOWQ4NCthWWJDU1JkWHZZcFVVRWdYTW9vZm9iRXoNCmwzbFpZb2Z6UjhrQkQ1dTh5TklwbDE3VVZVZGY5TW4vQU9hOHFobGxmTXVETEVPNU4yODRYTXNWRDVqdmtJSFZidWNIL2lXWlFtZTkNCnBNQjNNUDhBTTNuanpYYWY4Yy96VHFNaFBRRzhtUDhBeHZqNDYvbDNxZWgrWmRiZFVJMUc2bjVmQ2ZVbWtQVC9BR1JvYWRjc0VqM3ANCkVSWEprNmExZnRIeFM1bjUwQnFaSDZrWk95bmdCNkpCcEhtRHpGRGZ0YTNsM2NzeU5SUzh4YmtvTkZhZ2FueFU3NGdsdGxqald3REkNCkx2Vk5SYyt1TG1hTkJzRUV6RGVuZWhwa2lqSEdQS2d3SHpici9tQzN1b0hqMW0rUmFrRklybVZCUXFkMkFZYmpJZ2xobXhnYmdKSFANCjVzODJMRVlKTmExQkhYKzZsK3N6QXVCNC9GMUdIZHBvTWZ1dk9YbmNNVkhtRFUxcDFwZVhBLzQzd0FvTVFvU2VjZlBQRGJ6SHFnLzYNClBiai9BSnJ4SktnQktMTytYaWdIM2Q4eEhieExJN0dkU0FWTkNQNjR0Z0tmMjF3T1c1cDIzT1NCVXBweVdhSGlwK01pbFR2V3UzZkwNCkFXbVVVTUlHaFFxQ1dHLzNkY2tGb0VwVnFGOHFJd1dwSFJSeG9NaVpNdUJpRHM4MS9PNUZZd2hxS2QrUTNvTXFMUlBtaEo0aUN5dHMNCnlIWTAramZLNVJ0UW51dmFmSEhhbTVWUXhpZFdmeENnaXArN0xxMmI2Rm8vU3RVdFR4am1vWVc3K0gzWUkrYmNicXdtZDNZMi9wQm8NCnlIallWQkc5QjRWd1NnQnlSREtUellqNWgwNlAwMjlQNFhxVFFDbGRzZ0FiWVpzWUlzUE10ZTBEVlpIWm9BSm8vYlp1dmdjeXNlU1ANClYxR1RGTG9sK2wyR29DZU8xdTBraGprZFVXUjFJQURHbGQ4dmlCSWdXMFRKaUNhNVBZdEwvTHJ5dzFtZ01Qck1SVXlzeDVFK094emUNCncwT091VHplVHRMTHhiR2s5aDBGYlMzRU1OUFRIUWNhSDd4bFowQUhJczQ5cEU4d3dMU2I3MUpGakIrMlFBZm1hWnljOWc5eEY2Ym8NCkVhTFJ5YURZRDVaVGpOYnVVZVNKMUpuL0FFbGJQQ0NZM0JFaDhDS0ZhZmRsdkh1aUZzaU1VamFjQngyNi93QzNsdzNERUdwTUE4N2cNCjJ0c0xsRTlZYzBFMElIMjBNZ0JIVEt5RTVUdFlRZDJMR2UwU2FIY01ONjlSdDBQdmxCalJhZWJISnRGMCs2Y2h3eUU5MUpHVEVpR0gNCmh4UU4zNUpRME1OMjZnZGp2aU12a3ZBOUc4cDY0WjdOSlVKTEtuSWtkUEUxMzcvNTB6T0RoMnpXMDFOZUtzYUx2MEIycDg4bUMzeEMNCk9ZeFRuMTFOSmU3QVY1ZXhPRkJHNnlhOGs5T2prbEl6OWpzVDkrRkkyWVA1ajFXTlp2M3ZKNlB6NURyeFUvSFJmZGE1QU5tY2VoSjcNCnFKZlVhMVpqUUV0RTFhRWY3V0xocFcwUlppa24yaDF5VEdXeWkxdlVFZmRnS0JKak9tM0hxRWIvQUJDaEZlbVk4ZzdDRXJaUFlYRW8NClJUMS9zeUZ1UkZQYlc0REVWUDhBbWNiWkFwellTZ1NLV0pBRysvVGJMWW9sdUdRenRHTEpTaUFJb29XQTIrTDVlT1h1S0J1d20vYXINCk5Xdnl5Z2h6U05rZ3RJV20xQ1FnVkNWTk4vQTc3WkZ3c25OWmNobDVoQUFHWU1EUUZnUUtVRGRSL243WkJES281NFpMVmhJb2JsWGINCit1V0NXemt5aFpZbmM2THFGdkszMUtaVVRaaEE2L0NBUjBEZFZyOU9SdG5FRU1qMGVXNFcwbGd1STJEa0Jnd0hVZ0dnN1pLRzRSS1ENCjJLVzY0aktTQ09MVkMwTlFha1VPMk5JTTltT1RRRGtRS2NSU3YwOThCRnVLUXRTMnA5b0JnZTNYR0d4WVRqWXBQZEwxeWV5akNzREoNCkN2N0krMFBsWHJtKzBuYU8xVGVhMTNaTm5paHpaTlk2L2IzRVhxd3VKVkgybDZNUDgvZk5zSmdpdzZHV014TkhtOGUwVzRXSyt0MEQNClZYbCtyZk9HeURZdm91S1c3MkhTTGhmcTYrQnB2N2RCbUZ4VTdHSVRtQ1pwREg2WHhjSEpHOUFPZzNyVGZmTmhqZ1BpeU9NRGRINnQNCnJVYVdjTmtZZlRrVThqSXdJSjI2QVZPMWZITDdGVUdySGhKUEV3ZnpiZXFiVmVCTEUxcVBvcVAxWlJQbUV5RkFwTkE3Y1NxamY5dFQNCjNIOWNybUhGaU5scW9HbHFLL0xJMGhORnQrUzlNcklaaEt0TGROSDFxNDB5V3FoR0xxdEFhcTVVclR3L2x6WXlGRjF1TTJBejNUZFENCnQ1UW9FaENtaEpKMnJTcEhUeHJpSExISmt0bmR4Q0hkakpYWmZsOU9TWWtGU3VweEtlRDBSRjY4ZHpXblNvNzRVMVRFZGJ0NG1haUoNCjhCQkRNZDZpaDhmbmdDTWhzSlpORzdzcGVzamNSMy9hRzNieEdDWXNOQVF0eUlISzhkbUFxclY3ZEtmUEl4bXlsQzFGVlYxS2phUWYNCmo4c3NhZUdubTFyS3lPckwxSFQ1aktwQnlvR21VYVhlbzRGZTQremxKRG1Sa24xak9kdm9BOGNJcWtwM2FTTWRnS25xQU9wOXFaS0oNCloyblp1Wm1zaEhJS0oxVlFlL3k5c3U0dG1uYml0SUxwYW1yZkNEMEdRY2k5a2lkaEJlcW9Pem5mSUZ4c2dWYjZOYUFMV24yUUFkcWYNCmRnYVZlMnZ1SUJQajBydCtHVjI1NFJLVHhOUndkeHYvQUxlU0JaWDBSOEY2aXhtVGdvOU9oTzNiL01aWUNDNCtTS1g2amVRVHU4amcNClBHcFZVNEtXQm9PTlFRT1c1RzFjR1E3S01aNUJJWE1Za0xxcDlLUWRldmZDQnN4bEdqdXVlQ3ExVG9OMU9MWFc3bHR6c2UvK2RNSWwNClRDY0xVNUxPV1NibGFoa3ZEdEM4ZjJqWHNRZW8rZVptbnl6NGdJM2JyZFZneG1OenF1OTUxRGRDT1ZIcjlrZy9jY3dTSE1CZXg2T1oNCkpvYlNPTS9GSUZxSzlxRTErV2E0UXVWTzN4eTJ0UGYwd2xqZENPM1Y1WGgvdjJVb2dCSDhyTVJ2c2N6Z2VEcmJreHhtY2Jsc0c5WDENCldDNG5TWUpKSEpJUzBnbFlGaFVuZ0F1NSt5T3ZNK0cyV2VJSkxpd0dqWEx5WTdxVWw1ZVc3aHdFb2F0eDNGYUZhcjN5cklkcjduR3oNCjQ2Mjcxa0VYN3YxSEh4S0tIdjB5TXQzR3hxYlErbEo2eUE4bSsyblkrNDk4ckJwTW8yam9ydEFnSzdqcGhJdHF1bU8rZjdrVzJ0dzMNCndHOU9FbnVwSFhObGtkWGhOSjE1YTFJeVJtTldWbk5CVWtWSU9WMjUwU3pHT2FkWVNvb0IwSnFCU3Z1TVEyaEhXRUViRmhkYzJaZWwNClNRdFR2dDkrU3BiSjVKWnJOdWxTSWw2anI3NFFHcVpTVlZiZ1VadHdkL2ZyZ0xTQ2dKNDFpVThSVmFWQjZkZnY3NVdZZFF6QlMxSlcNCmpsbEFweFduSHg2VjJ3ZzBpUXNQUHJ0QkRjc0YvdXlhcDh2REl3bFlaU0ZGRzJsMDBkRFhZL2hna0d5RW1YYVZjaVJkeWVRTkJ0V28NCkk2NVhMWnZFbVFKSXRRRUpBQXB5TzQvamtZRmVKUmcxdmhlaUpaR1hpZmlZVk5CVUR0bHNxcGtZV0xST3N4K2s1WWtqYXZMZmd4MkINCjRzYVZHK1FpU2VhTWVUb3hhOXVDYnlJVi9hQkxEZkxDRVpEYWF2U1MzVnlhZ0RmeHI0YlV4Y2VtUDJtb00zd3RVYmJFOThwSWN5TTANCmREZk9wSzFxUjFHQzJaS3pVNzY2Rm9xclB3am1iaEtpL2FLMUczVWJHdmZyazRBMWFSUitERjlWODIzVFNmN2pyY2kxaU5ER3pFdUkNCndRQTVjVUFEY2h0U25iTWc0eFc3Z2pXeTR1bGU1T3JIekdtb1dnV1NNTE9aUW9BWGlmaVhseHFCeDhUL0FHWUFLY2d6akxrbkduZ3QNCkdGYzcvd0JQOXJCTmhGSHRBUkdkaHQxcDkyVkJqSkU2RWx1Sld2SjNWUWxRbGZicVZyMTY5czZEc3ZDQU9NODNsZTJ0UVpId3h5NnYNCkVDdWFPM29IcTNrWFV2VmdzbVlxWkZRb09SQU5ZNnJUNmVXWW9xT1J6OEp1TDBMU29yQzRzQkZlMjVrYUtWSldVcjZpODFaU0pEVUUNCmJIYnhHVlNNdUl1Vm1NcjJQUkl2T0dtbTMxQVF3TXIxa2VaeXJLT0VLcTNwbmZwV2hTbGQycFR3d2l4SjJQWitRY08vVWZiYVRDWjcNCmgxVGo5c0VNM1RwMU9aTWhjUzQrcmlBbXhoS3JzdXpiazdFanRUSUFiT3RpRkNXRWhkdHEvd0JNaVEyRUlOZ0lwZ3pieG5hVmY0L1ANCkRBMGQrVGpaWVdOdWFWZm1iYXNIVnZBL3d6T3ltblU0a2c4bzNzb1NSUzI4UlVBTnZVRWcwNlpBOG5MeG5kNjNvOTBKWVYzTEFVcU8NCjVIaDg4QWNvOGs4aHVCNndSb21CcnUreXFldndHcEJyOEo2Q2dIZnBoR1FjWEMxQUVkVUhxWDh5bW5nQjg4dFlUU0NVRU42bEQxN1kNCjAxQkJUcWVKVldvblllTlA5dkJUSzBpdVBVSmRWMi9lY1I0a0FaV1IwU0N3NjhpUm82ZHgzekdoS2kyeTNDR2dja2NUMUhmTWd0WUsNCmQ2UGZOSEtpU2RLL1Q5R1Z5RGtZeXp5enBQYk5KQ2ViS3RkNnRRa1UrSURjWkFCRWpURDlXVStvRmtwekRPMGc0MUpEQ2dVSGJwaEwNCnNNRWs1czB0bzlPam94VUp1UUdKWUR3TmVJM3lRaUNYRnpTOVJTeFZNdHh5MlZWK0gzT1dTTFVVOVNKamJnVXFCdDI3aklLODN0ZFcNCllNT1JxRGtwWTJySGxUY2FpcktyeDdNQWVZL3BsSmc1UGlKaGJYc0Z4REZWV2xNZkZpRllMOWxxMGJrR1UvZGxzQllycXZIejgwbHYNCnRFVDZxenlEbEdoM1VGcTFZN0R4RzNqbFhpeUVxTGpTeFdYZVh0TGtqZ250enhraTlXS2NiZ0JDQU9YeGZhTGZFS0Q1K0daUmxiWmgNCnhVTExMTGVSVVVPVFFyV21WekRlSTBtK25DUzc1Vk5FVUF0NDc5QjlPWmVnMG5peTM1QjAzYXV0OENJcjZwSTlMV0NGT2dGQlFBWjANCjBjWWlLRHlFODBweXM4M2lUNmZlSUt0Q3crWU9jYlQzUEVHUytRWlhONjFwd1l5UmxwbzZWcjlpaE8xUHNrQTVSbGp1QzVPbXlVYWUNCnZhVHJNZEdXNWthTkdIRlNBRkFHeTdoYUwrSHo2NHo5VHN6aHNBeFMvV2JrM01xbVFtV0JReVJ0VUFoUVNkcWNxZUhmNk1ZWXUvZHkNCjhlM3ZTMjBnVXVmUlFoVVB3S2ZBNy81N1piTFlVNDJhUmtkMDJNTXJNQzNYcVdwUWRRVHNQbmxZNU5YQUdybTBMQ29YWWRQQWJZQ3cNCklTMlMyRHEyM0RqMEp5SkRXUWhmekVzMmVFc1IwTmMyR2FPem9NSjNlY2FmL285NlpGMkRDakE5RFRjWmp3UFJ5NDgzcUhsdlVTaUkNCkdhaG9PbE10aUhKQlpsRGR4U2hXUEd0Tm1IZ2ZmNWpMT0ZnU2dkU2s1TlJUOElQV25qODhKWWMwc2tvUVZyeXAwQXhhenNncFk2TVYNCnFLLzU5Y0JWS2JtMFVSSklha25reDdiK09RbWtKWkgrVlA1Z1hmeFcybWVwRzNMaWZyRnNLOERSdXNnNkU1VjRFdTVmSGozcGZMK1cNCm5udUc3TUIwdGpPcG9VU1NGelhjN2NYTmVuYkxCamxYSmo0c2U5Vms4bmViTFRnOXpvOTNDU2VJSmhrb1NGTGJFQ2gyVW5JbkhMdWINClk1bzk2ZWFWcEhtMk9qRFI3NGNUVG1MV1pscU5pRDhOTWlJUzdtNDVZRWMwMWV4dWI2QVN2cHp0SXhxOGp4UFFrZ243UkZONmREa3gNCkFzQmxya1VoMUthZFQ2SVQwcUU4Z2NnUlRJRzErblJJUnlwOFFvU08yUkp0bVV5UTh4OFZhK0EycU1ReEplR1dsM0lpZ1A4QUdnKy8NCjc4ekRGMW9tbWxyZnNwQkoyOGNyTUhJaGtaYjVkMEhYOVRkSDA3VDdpZFpDQjZpeHQ2Vy9qSVFGSDM1VjRjdWdieG1nT1paenBQa0gNCnpOY1RUV2R6REJhU29sVDlaa1VxT1ZPbkFTNzdqdytlWERGSTh3d2xxb0RrV1NXSDVUOHdSZDNCdHBaRHhqZ2loQ29EeHIvZWM1QjANClUrK1hEQ0IxYXBhK1I1QlA5UDhBeXg4dVdrQ05keHZKT3NnQ1BLL3FDUjYwK0tOUWk4Q1JXbmgxT0VZbzMzdFU5WmtsMXBmNW84cHkNClIyQ3o2VlpSZldJbnBMRGJLc1FlSmdLc0UvbVFnVUhMY1Y2bWd6TTAyWVl6eTJkWHJNSnlqYzdoNXRmNnJhMnNyUTNVcTIwbyszRkwNCldOeDdNcjBZWnNocW9IcUhVL2s4ZzZGa3NmazNUcnV4Wnl4TmEwYmJPVWpLdzloT0ZHbmtNRU9zNlg1M1ZOTmlua3VJWFpGTUVaa2INCmc2bFNhS0QyYkp5aHhSWVFud3lGdlZJZEcxdDdTSG5wZDJKcHQxRFF5RG1LQTBBNC9mMXpHRVo4cUx1OE9weDlaQWZGRVcvbFRYWmsNCll5V0U4TzQ1czZtTlFQRDR3dS8wNWFNY3lPVGZMV1loeWtDbk1Ya0hYNGJsTFlXb1dWeHpDbVdJMUhpUGk5dW1Jd3k3bkVPdXhkU2oNCmg1TDExa2NMYjhsU3F5SG5IVVVPOWZpeVJ3U2F2ejJQdis5WGovTGJYWlVWaTBLY3dDdFdZamJ4NHEyUDVhVEE5b1kxS1g4cTllYVQNCjB6TGJqbHZ5ckpUb1QxOVAyeC9LbnZhZjVRajNGSS9PUGx5OHVMVmhIYnRLWkdDTHdGVFVqcnQyN1ptengySFVSblR6NC9rMzVwa2QNCm1qbXRRb2JqUjJtUS9NY291bnZtTCtWa0QwY29hcUt0SDVUMWpTcFlJYnh3OGp1VVFJV0tzVUlVbjQxWDRkOHQ4RXR3MWNHV2FkYTMNCnp3Z0tuN3ZjcXhLcUtxZUpGYWs1TGdLZkhnZXJkKzhWc3Arc3lwSFNoTlhUWUUwclVIeHdjSlVaSTk2WHFSSXhaR0RSL3dBd05SOTQNCnlKQlFaQXFONm9VSGlLcysxUjA2NEZ0QlhhL0FpRURrQlR1UmtDVTArakkvSnR4Qk1rbHMwTWFJa2kraUN3VW1Rb2VWUXUxUFQ4TysNClpMaFUxTDVITWx4OVpiMGhjcVNZNVE4bndraWxhQUFINmNOclNuZGVUdFN2V2hTNUZ1SVlaR2I0WlpHWmxNY3NYKysxb2VMcWV2aU8NCjFTb3BWdFBLTi9aSkpIYnZDMGNrbk1JenVPSVBFTUs4WHIwWnZ3OThiV2tQWmVRYnF6YTNhR2RBWTNEektXWWcvQkl0RitFVStLWDcNCmhqYWtLc3ZrYWVYVWZycG5WWEFRQUt4QVBGZzI5VVA4bzc0MnRMdFM4bTMxMmljWm8wa1YwUEtyZEFTRy9aUDdMbjZjYlVCMm9lUzcNCnU5bGhaNUlhUkE5YW12eG8zUXIvQUpHQkl0NW5wdjhBemlwNVpzN1pWS3JjWEFma1pMcWFTWUFlSEdOTFpUOUs1TDBydXpLMC9KN1MNCnJLNSt0YWZaMk9uWFlVckhjV2NTd3NBZXV3VGpqWTdrVVUzSGttNDlTSXVMZVQwaDhNcmtsK2RSdjlpbGRxMXg0aXZDcngrVk5RUXgNCmdUUkZFVXEzTGtYWTdVUE9uc2E3YjRMV2xZZVdic0d2T1BicDhUVS9WamFhWEh5NWVVKzNGOTdmODA0RnBiL2h1Ky9uaSs5dithY04NCnNlRkMzM2tnWDBMUTNrTnJjd3Q5cUtaZWFINWhrSXh0UENtRnQ1WmpncWtVY01VWVdpK21PSnFhOHFnQ2xPbVJFUU9UWVpFOHlpSTkNCkRWWlEzcHhmQW9FVW01Y1ZyVVZJMkcvamtyWU5ybzFaMmVSWWpHdkgwRnBYaVJVbCtnb3hKN2VHTnJTcU5LQW1sa1BBaVZWVXJUc3QNCmV2ald1TnJTdUxPaDViY2lBQ2ZZZFAxNDJ0TytxdnpKNURoUUFKVG9kNm12dmphS2N0b1ZPeEhBQUtxVUFBcFhwUVkydE9hejVPakUNCjBNWkpBQjJOUVJ2OStOclRIVjhxWDZKQ3EraXhaaWJqbks3Y0F3Wmp3SmpQUDQ2S0FlUHcvS2hueGhxOElxVUhrYWFHV2VSWi9VTTcNCmNtRXNqdUY2N0p5SHdydjBHUEdGOElvYVh5RGZEVUV1a2tpbEQxamtTU1Fxc1VaV3BhSUNJbG1aMFFFTXcycWE3VUx4aGZESzgrUUoNCnFVUm9GRlNhQWtic2FrN0w0bXVQR0Y4T1NDdnZ5dE41QzhNcndsSEJWdXBORDgwT1BFRThFa3R2UHlXU1ZUNlVkZ2tsT0lab3lWb1MNCkNRVkNyWHBnNGdrUktFay9JNjY0T3NVMXJENm03bUpwSXFucFg0RUdEWmtCSWRVcG4vNXg3OHdsbmUzMWlPTmlTVUR5U1NJTmgreTgNCmJWK2s1RXhEUGlrOTJ4VjJLdXhWNURlZmtkNWkvVCtwNjFwZm5DYlQ3aS9tdkpvZ2tMMWcrdDNTM0hGR1dkTnYzYWh0cU40WXB0a3UNCmplUU5TYXowSStZOVEvU1Y3cE45SnFEdE5XNFlsWTJpdGtTWitETDZZQ1NQUmZqa0ZlKzZobk9LdXhWMkt1eFYyS3V4VjVrLzVXK2MNCjMxUzZ2UjUwbmdYVUxsTG0rZ3RvWklGYjBvVGJqaDZjNjhUSW5FdlQ5cFJTbEJpbEZXbjVYNnhMb1Y5cEhtRHpITHIwVjlMWU14dkkNCnVZamp0Q2h1RmlETzNCcHdwSElmWisxdTJLSG9ZQUFBQW9Cc0FNVmRpcnNWZGlxeTR1SUxlQ1NlNGtXR0NKUzhzc2pCVVZWRlN6TWENCkFBWXFnN3VTZlV0SWVUUTcrR09hWlExbmZoVnVZYWcxcnhWbERxYVVOR0h6eFY1L28vNVQrYnRNaXRiYUx6cmQvVTdFV3kyMFFTVlINCnh0K1pjTXZyOFNITDA0OU9LZ0d1S1ZYVS9JTThlaDZIRDVpOHpwS21rcGZSWGVyM3ZLS2FWcjVHalRqUDZ5TW5BUFNuSWxxRDVZb1oNCnBZVGFab1dpNlhaWHVvd0tJb0lyYUc0bWRJaE0wY2FyeVRrMi9LbGFBbkZVMGpramtqV1NOZzhiZ01qcVFRUVJVRUVkUWNWWFlxN0YNClhZcXd2ejU1SDh4K1pMcUNYVGZNVGFLbHRFVnR6REN4bVNaMnBKSUprbGlOR2lQSGpUWWl0ZW94Vkpwdnl4OC9OTE5MRDU4dTBNLzENCmdzakpNVlZwcGZVUW9CY0FLSTFDb0F0QlN0S1Z4U2pOQThnK2N0TjErd3U3M3pUZDZuWlFxVGVwSkxLcXltSzJpZ3QwOUFzNkFlb0oNClpwSERBc1NBMWFWeFFyZVNQeTN1L0xtclEzODk3QmNlbFpUV2hTQ0Y0YXZQZHRjczI4cmpnS2dLbFBoM0kzWmlWV2Q0cTdGWFlxN0YNClhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxZzlaMHVEVmRKdTlNblpraHZJbmhrZEtCZ3JpaEsxQkZmb3hWNXYNCnJHaGVRZEIxWDZ0ZjZoZlc4c05ySExFZ1VTeE5FOTFJNnJUMDVBVzlSYVZjYmtnMUxFbkNxRmswejhyWnRQRUVtc1gwZlAxT0tzc2kNCnlHUjJDQmFlbFJuQmlkQUI5c21UcWEwVlU3YlNmeXl1bzFmOUxYRVZuUGFDZVczNFNDY2w1cExneTNFaUt5MVJSNmZMc0ZvV08yS3MNCmk4dFdma0RWYnU1MCsxYzZ3azBNTnpKNjhTaUZQUlVJcXA4RWZGdU1vTEpUYXRkaVRnVm5zRU1VRU1jRUtoSVlsQ1JvT2lxb29BUGsNCk1WWDRxN0ZVbTg1TnA0OHJha21vWFRXVnBQQzF1OTBxTkt5R2Y5MGhDSUN6Zkc0MkdLc0l0OU50a01sM0Q1emh0NU5SU1c0bWFJUEQNCkdqWGZPWkpDUFhCVGo5WUhwcktkL0RsU2lxdnFXZzJkeFp5YUpmZWFwZnIxb0htdWIyYjFlQ0pMWkcyVkdra2N4TFV6aDJYbHlZTjcNCjhzVlVadEg5YTZqZ204K1J5d3RjVHlTV3hZTWhVUEhTRTBtNEw2Yk1uRUhmZmJyaXJXbjJWckZldEhkZWRsdmJsZEx1YmVPNGw1TWkNCmZXSkVYMWhJMGhoUEZpb3BYa1R0WFlVVlpmNUZpdExQUTEwZURVazFSOUpjMnM4OGE4UXJmYkVmVmdTaXVBVFg1ME8yS3NoeFYyS3UNCnhWMkt1eFYyS3V4VjJLdXhWMkt1eFYyS3V4VjJLdXhWMkt1eFYyS3V4Vkk5Yi93VjljUDZiL1IvMXYwbzYvWFBSNStqNnA5UCs4MzQNCityV25hdUtvTS84QUt0ZlJpcitpdlM0U2VqWDBLY1BVUHFjYS93REZsYSs5Y1ZXUmY4cXVxZlQvQUVQOW1Pdis4OU9QcG4wdXUxUFQNCnJURlV3MFQvQUFaOWNmOEFRbjFINjU2S2VwOVY5TDFmUm92RGx3K0xqVGoxOXNWVHZGWFlxN0ZVczh5L29UOUVQK20rUDZOOVczOVgNCm55NDgvWFQwdVhIOW4xZU5lM2p0aXJDNy93RDVWSCtuZFErdGN2MGp3VDYxeCt0K242ZndjT0hEOTF4NmNlUDBiWXFqZFUvNVZ2NmwNCjE5YTliajZOdDlZOVA2NzZYKzZmcTM5MzhIcjA5R243ZkduYkZVRFpmOHFlK3R3L1ZxZXJXVDB2OTZ1RlBySTUvYStIajYxUG85c1YNClFrLy9BQ3BUNnVucmMvUzlFOGZVK3ZWOVA2d2xhOHQvNzNqMTdZcXpIeVgvQUlWOUMvOEE4Tzh2UytzLzZYeTlYKzk5TmVQSDFmMmYNClQ0OGVPMU1WWkZpci85az08L3htcEdJbWc6aW1hZ2U+DQoJCQkJCTwvcmRmOmxpPg0KCQkJCTwvcmRmOkFsdD4NCgkJCTwveG1wOlRodW1ibmFpbHM+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiPg0KCQkJPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpDN0Q0QkQ2OTc2QTNFMjExQkVENkZDQ0Q5OTI5OTg3ODwveG1wTU06SW5zdGFuY2VJRD4NCgkJCTx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6QzdENEJENjk3NkEzRTIxMUJFRDZGQ0NEOTkyOTk4Nzg8L3htcE1NOkRvY3VtZW50SUQ+DQoJCQk8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnV1aWQ6NUQyMDg5MjQ5M0JGREIxMTkxNEE4NTkwRDMxNTA4Qzg8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4NCgkJCTx4bXBNTTpSZW5kaXRpb25DbGFzcz5wcm9vZjpwZGY8L3htcE1NOlJlbmRpdGlvbkNsYXNzPg0KCQkJPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4NCgkJCQk8c3RSZWY6aW5zdGFuY2VJRD51dWlkOjUzZGE1MGQyLTI1ZDUtNDE4My05ZDk0LWQxZDY3ZDM2MDEwOTwvc3RSZWY6aW5zdGFuY2VJRD4NCgkJCQk8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOkU5MjY5NERDNTlBMUUyMTFCRjIyQTA2QUY2NTA0OTg3PC9zdFJlZjpkb2N1bWVudElEPg0KCQkJCTxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+dXVpZDo1RDIwODkyNDkzQkZEQjExOTE0QTg1OTBEMzE1MDhDODwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPg0KCQkJCTxzdFJlZjpyZW5kaXRpb25DbGFzcz5wcm9vZjpwZGY8L3N0UmVmOnJlbmRpdGlvbkNsYXNzPg0KCQkJPC94bXBNTTpEZXJpdmVkRnJvbT4NCgkJCTx4bXBNTTpIaXN0b3J5Pg0KCQkJCTxyZGY6U2VxPg0KCQkJCQk8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4NCgkJCQkJCTxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4NCgkJCQkJCTxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6RTkyNjk0REM1OUExRTIxMUJGMjJBMDZBRjY1MDQ5ODc8L3N0RXZ0Omluc3RhbmNlSUQ+DQoJCQkJCQk8c3RFdnQ6d2hlbj4yMDEzLTA0LTA5VDE3OjExOjA3LTA0OjAwPC9zdEV2dDp3aGVuPg0KCQkJCQkJPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgSWxsdXN0cmF0b3IgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4NCgkJCQkJCTxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+DQoJCQkJCTwvcmRmOmxpPg0KCQkJCQk8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4NCgkJCQkJCTxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4NCgkJCQkJCTxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6QzdENEJENjk3NkEzRTIxMUJFRDZGQ0NEOTkyOTk4Nzg8L3N0RXZ0Omluc3RhbmNlSUQ+DQoJCQkJCQk8c3RFdnQ6d2hlbj4yMDEzLTA0LTEyVDA5OjM5OjM1LTA0OjAwPC9zdEV2dDp3aGVuPg0KCQkJCQkJPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgSWxsdXN0cmF0b3IgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4NCgkJCQkJCTxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+DQoJCQkJCTwvcmRmOmxpPg0KCQkJCTwvcmRmOlNlcT4NCgkJCTwveG1wTU06SGlzdG9yeT4NCgkJPC9yZGY6RGVzY3JpcHRpb24+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOmlsbHVzdHJhdG9yPSJodHRwOi8vbnMuYWRvYmUuY29tL2lsbHVzdHJhdG9yLzEuMC8iPg0KCQkJPGlsbHVzdHJhdG9yOlN0YXJ0dXBQcm9maWxlPlByaW50PC9pbGx1c3RyYXRvcjpTdGFydHVwUHJvZmlsZT4NCgkJPC9yZGY6RGVzY3JpcHRpb24+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBkZj0iaHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyI+DQoJCQk8cGRmOlByb2R1Y2VyPkFkb2JlIFBERiBsaWJyYXJ5IDEwLjAxPC9wZGY6UHJvZHVjZXI+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCTwvcmRmOlJERj4NCjwveDp4bXBtZXRhPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwACAQECAQECAgICAgICAgMFAwMDAwMGBAQDBQcGBwcHBgcHCAkLCQgICggHBwoNCgoLDAwMDAcJDg8NDA4LDAwM/9sAQwECAgIDAwMGAwMGDAgHCAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgA4wDyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+XdK1Td5Y3bcnqBjjt/Ouy0S5UquWGfXn/GvP9Js2VlwPzrqNLnaIivgbtn6bGK7HXpcejfl/wDrq7aXb8fN/n86xLCfea1rdlSPcflx61n7Sy1Y1TTfuo1bG4kvLlYQ3U84z0r0Pw7YRwwJGgz6nNcL4HtwzNcN1OQM+ma9F8Oxbjvb5ea8mpiXzaM+jwuHioapXOw8P2asgBX7tbq6V9qXbtXaR6ViaFJub7+B7da6iyl88Dy9y7euR1rqozbV7kSpRvcjttNNunythVGMBeatRyfZpV37XUfeORwPyqvcNcebIqtt2jOcda5XxRqstsFt1J865JXrWzrNaELDqehY+JemWvj7RX0VFeRbhvnaNvujnuOe9J8Of2ddD+H+krFaWQ6ZaR3LsT75q34BtfJvhx90dfU16dpVo99AsaKm1ufmq4yctTpjRVNWscj/AMI5ZiyZTHHIo4wOcfhXD+OPgbFfH7RpD/ZLhskLzsYivRNT02S0vmVFX72CA2MV0nhXSUvtP2eYslwNwKuoGzPvSrVNNzom/q8VONmfOuj6rq3hW/8As2pbYWXGHZflrrYdRa8XiTztwB3CPg5rp/i98Lm1SwmZYyGVOOc5YA9K828AawYbKSzmuHW4tTsK561y0Kk27Nm6qU6tPnsrmvfR43Btu7vgYrgfGcCybl7YOcmu01OKWJNwPyuc8nPNcD49u2tgW/vDGa6JSlfVmdob2PNdJ8u7124t5NuYxuHXkZ+tbw0C3nPO3PqM1x+hXjf8LCk3hcNFwfXmu4t5VZF9ua8zEVJRnufIY+nF1+axm3vgqGQbfvH6mq9j8LIprkN5bcn1P+NdJG6ykCum8OpFuTOKvDynJ3Tf3nn1IxsN8GfDWNI1UoeB2zXeWfw5hMHyjt3qx4b8lEGNvNdJZyxkdhjiveoynbU4WoHnet/C1bot8g/WuP1z4N7tzLH/ADr6ARI267TTbjSLa4DZx0rrVZnJKjGW6PknxB8JprYttVuOnWuJ17w7qOlK4Csw64wT/OvsrXvCNrIrHA6V5j4/8K26xyfKo4/OtPrTS1MpZfCR8n6z4om09sMpUjg5ArmtV+IjRbsNuYjgKBXo3xZ8LwgzMq4x/wDXrwTxdYSRuyqdvPUjj8RTp46MnY555e46o66P4n7Y12zfLjj5lorhLK2kezhPmXS5QHCygAcdhtorb2iK5JHtOi3/AMyfkc101qWbGK5HTGWOVWFdVpUykL8x69K+f57aH2sU0bWnh3Pyqw7VqbXkdY+TnrVXTpliPt7Ve0OP7dqi7Wbk1y4ufLT0OvC0lKZ3Xhax8iyTj0xXZ6OpkkX+FT0zXPaTb+SkYb/9ddZ4P0z+0bsMzFo1PIFeNGXNLQ+ijaKOr8NaS9xCsjNtU9uldxoGjRmGNssvmdQe31rG0OJC0aspVe4x0rsLVIVQLn5pBjA717tGKUUcNW9zJ1+yht43X5m2qc47nGB/OvL9Zn/tDxZcSR/8uoUIfQ4wa9G8azLBazKztCqqenJHHWvHvBmoNc6jdN5jXCl2O49cCrnK0kmbUfdV2eifDotHCxflmzjP1Feo6Dew2Nwqsysq9x0ryfwWWhulZpP3fUCvQdEnF+Y40UFc8E8V0wpo0rSu7ljxhoTNcfaLXDZO7GOtLpNwtn+8CsG4zk9T711GnWUc80cL52j06A1B4h0m3060UsNrSAlTwQ3NVUwV1zGbxcZr2ckcl4p1ga3bmFhhRlWAOM15f4k8N2qOzJGFkUHG3g//AF67zVbKRTKw9SRgVzGs25kiPmDa2OveuVU1E7Fh4xjaJxFprseTazbvMjz171yPxKkSe1+Rv85q147ll0rUUulwvlvtcj+6f8is3xnqUY0KSZtv3M7v5fnVaNHBWm4SseN+Hb37T8RJFZW/dwn+ddylw0adTXKfCjSG17xZqd595EQRj2Oa7q50FsAbfrXjYvWZ5FaKnIr22pqOvFaVn4jFoynfWBqGkzQE7dy1jamblFIDNnFRRrcjucdbCqS0PTLX4srp/AmXjsa1LT47RKP9cv5j/GvnHxNc34jYpu3YrgtY8Xavpsn7tpBt68mvbw2KUtGePWwsou6PtqP49wKObiP/AL6H+NK/7QFuEP8ApEf/AH0P8a+AtS+NOv2LYzIw9nb/ABrA1L9pLXoHZWMgXH99v8a74+9scri0fodffH21dP8Aj4j/AO+h/jXI+L/jNZ3qNuljPHZh/jXwzB+0Pqd2mGmZc+rt/jTpvi7eXYHmXLH1+Yn+ZrkrU530PSwsYte8e8fEn4hWeoGTay8+9eTa28N8SygNkZPGa4bVPHrtKzNNu/Gq8XxA2AbnFYQo1FqdUo02eh2lrGLWP9yv3B39qK5yx8WwyWULeYPmRT19qK7/AN4ed7OB6RZ6j5TLyvFdBpGsiQhi3PtXBxapn/ez+la2j6qYpV4HWuKUXY9/l6I9Osb9vILbu2a7X4Y6eJpVfr5hzn0rzLTNTE1oV3DLYGK9l+HFj9h05ZB3AxntXj5hVasj0MDBHXWMQYqu7POK7nweDZxqsSEN9Otcf4Yj+1ys21cL0r0bwZZKzruYbm7DtWeFp9T2JStE6fwzA0m0M25wcnjv6V20OlCDa8n3sema5jw0i20/8P3uv+NdKdWWELJNMuMdM17UJpaM8uve+hynj7RZr7Tb2TciwqNuCME54/rXzp4R8XyeFvEVxpa7CLVmUlurKwzz+lfT3iia3uLIyTLI0bfNtLcHHNfJHxm0b+yfi1a30MciWd/kShegO3A/lWWIlpzo6cJUUvcke2+GdRN5Esm3buI4z9K9R8P3Aie38tfmYdeoH1rx/wCHmTZQ+Zn5gDg/TivVPDVuxdWLH5fmAB9K66NTmSkjStDoj0TQ5mSEyeYsaycEjqfaneKbqGa2+YFpAPu7xhfp0qpoiPHCy+WJAwyCx6dD0qC7s/t1zG0i7Wb7sY5xjua9D2kpRsebTilK7OX1orDArBW5PIPauP8AEMfn3G0Rlq7TWbmZr2SNot6ocZx0rB1S0aO6ZvJHY/eFefKLufQ06kbanlPjjw5/aNjcr/FgjB+lfPPxF8bTaVaTaXcMzNb4j3Y+8oIxX11428PyG1aTytjSqcbSDnINfIv7U3h5rGym1JAN8Yy3v0rNKSdjzcck4uot0dR+zZoKN4Ja4V1aS8meR+eQOMfzr0l/CoYN/exXyB+xx+0ddaLf/Yb9t9pJKQGz90ErX2xYaza6tpkd1byeYki54OcV52KozUtTw6NZSXMtzk9Z8MKsXTtzXD+IdJWKQ5WvTNdudwYf3a4LxCWaRu/FcHJqdDUrHFalp8cn93pWBqPg61vA33cnjkV1GpbR6VkPcYbPHWuiMWtUZOK6nJ3vwet71PuKf+A1z+s/s7Q3gb932xwK9as7vcVBrTt5VfsPetFiKsdmQ8PTfQ+aNT/Zo+zvmNG/Kuf1T4F3VuGwr8egr7Dj06C7XlFqlf8Agu1nDfu+vpWn9oVFuZ/VInwzrfwn1CAt978j/hWK/wAPtRU87uPavtzV/hbZzn7mfwrBv/g/amQYjHHtXRHNrLVGUsv10Z8kxeFdSjiVf7oA6Givqpvhhaq2BHwOBxRXd9eR5n1N9zxjS9X81Vy3bB/IVt2l4QoK9M15v4d1twVUr1x1/Cu20q/WVVXcOaqcEelQrcx3vhC8869gVmPLivpLQbtbfQl/3QBjvXy94MbfrNuoPRwf1r6O8NXDTvbxtt2qcnNfN5lH30e3gFeJ6T4UjNvaKSPTPvXoXhmQQBWVcbhya4LQX+0Ko6D0ru/Ctr8iyOzeWOxNZU61tD1JJcp09vqCiMKu4ufQ9aWPVN07LC24qeGf5lFZMd7hvkxlcirmlstluZU8xk5C461000nrJ3RHsU1dkusXNxcpuk3S8Yzt2qBXmfxI05dWijQwsfLkByByMc/0r2jR9IjEm6+HmzL8whL/ALtPf9az/iFZWVx4fl+xwwtLCvBVfmOSAcn8aqNOu3aK905vaWmopHIeCNIlaFWaNowRvyegBxXp/gLQ/ts0TPJ5MOSCQfmIxjisHwBpn2jRIZtwaSF9jp6qOgNd9o1gJ5I8xRwxqckqv8PtXrYfBSdkmbYrEJ3Wx2Gj6Zot9p+61guLhg21o5f3bjA5Y4JBA9c1DqGiaZp8cm/zYXcZyv7xU7jGSD0rtvCfhRpdGlvPLjhMfOD0kzhtv0OTn2rz34soNPZtzEbSQABt29yPfrx7CvovqqpxufOUZupU5bnN+IxY6ZeusO658xARzt5PrXOz6bBrU/ktfLZzH5Shi3If+Bdf0rPn1dluXYnIycZPbtWdqGpzMrHBVn53g4KiuKVFNnvxoyXUyvGVy+iriObzoVcqHH3SR6Z/GvAPjxoEfiDw/eW7EfvEKjA6Y25r3O5Vtb860fbJG6PtGfutjgivDfGuqBYHVhuY8Hd/n2rzsV7jSOmVHnpuJ8j/AAv+HUmhJIjK37qZgGHsRX0F8I/iVeeF9lrdOzWuQvzHOK5PS0jS6u4fLVf3zHj3reh06O4tflGe1TWinG7Pk6VPlnyHst9fx6larNC25JBnINcd4gmYOR+tYvhvxbNoG23nG6HoCe1buool/b+bHyrDIry5QO5St8Ryuold+Caybm2z9361s6jbbH+ZazbiTGfSpiTUd9ijFI0MmfStrTpvOC+9Yckm4kCtLSXKlB81aOnoZc1jpLaXYMqfrVprhtv1qrZfPH938auCzYha5XCzN7opznJxn35rPvk3E5/OtmXT8npVWe0YNhlFYyiaI5aZ1ErZHc9KK1J9IzO/3vvHtRXqRp6Hlytc+K7XSVt2z+I/CtKw1I27KPu896QyRsg5qhfSbX3KVr1I6uzOCnW5HoepfC28F9rNu25f9YB16819I+EB5998xwq4NfInwf1dh4rt1P3VYHGevIr6q8F6iyp5jgKqgZOfevAzSLU7n0uV1FKGh674OnbAYjIztH0r0PTJo7S1Mf8AEB615j4Rulznd8pI212CX5jjO5vxryJSstT3oRudVYSxyNgMFJ4/Wtq1C2Nu9x9o8oso2sR93PH+frXI6dK00KovyzN0J7Z4GfzrQ1fUGkHkGRdqMqjP+fUV1ZXWU6/IdXseZqJsJ4lGoTfZoR5MO7nJ78ZYn9ame0jTR7iPzvLm8vJBPXPOP0rP8HrZweJPOaZjawknHG6TBGAe2CAB+dWI7mRb683BbgjCs7HK4Bxxx1NfcU4Ll0NKmHjz2S0L3gPxL/Zs0kSwKLeSEBhu+Yse9epfD/xEt/fW8NvZska+UAzclSTg+3NeS+HrGTUrmVYYwJJH2opAGe4H14rufA/iC48I2ayywyeZexHYpK5DoT2znggV10Ywjqzz8yw8bWjufR/g3xRYpoclncW1wscakOAh4ccd8A/TNeD/ALQ3xDj1fxK0kaiG3VQAuc7jjr7Vm+J/2gJFiC+TJGWYvKQWXce46+vtXlXifxgmu3+7O2NgAq9egA5P4V116ycLI8vLcllGo6s1+JpvqSvIC23169agvJ/Pjbc3HYVz2pa5bWdzH9nkZomGXLj7relSXGvfaIPlI8sjGR78Vw+p7NXDuOsSYaedLikupG8tVJ2ljtBI5zn0r518aXvmXE65DCM9VbPTj/CvcPEHiU6nojWs0iNJMxjaPafkUDAxXzT4lvmtdVuIWO4Ru6naeDivIzC3MrGNHm5ZtmLYvEusXSs2GYBhXQae62roOGVuozXF2N0174hk3R7dsWQR7YroI5mSCORvusOKuMeaB8pPSszq7vS4b2xZ+nGMVQ0bxE+mS/ZphmPopqHSrySb5f4frVnVdFW8iyqndjqK86ouV2Oz2alEtaiFufmXo3I5rEu7YjcMUWF7Lav5cxwF4Bq5cSrMMjp/Oo5Vujn2dmY8Vkef6VpafF5ZXkE+lNUj9altE/efU1TTaI6m/px3qK1kXAHXNUtHtd6D6VqC02lTzXJUizdJDYrbzBzUV5p25Tw3vWhbw4Yfe6+lTXdtvGea5pG0TnDYqpwd2RwaK3fsP+w1Fe1GGiPBlU1PzZF87AfN/nihrkuO/wCNVlI45/D/AD9KVpMn/Zr1lHU8zm0sdR8MdTWz8WQGT+I8V9PeDNc8yxVd27ccYz1r5D0e7+yarbyejjmvo74aat9oEPzfIxH1FeLm1PqfQ5LWs+U+kfCNz5FisedrDBNddo2qo05kKSSIpH0PbmuM0RFt9LXnOY87/wAK2NKvP7OtWkaTcmN2B07GvlJ6txPtMPJSWh21tqXm63Avz7N29sHnAqS+1BLhV+z78rksx+tcF4c1qS+v5rppG2yscA8Y+ldnozpNbbT+7IA6HrXTkLkqkpHr0YKErs2PDsspu4/lYqjb3BHaus0aby76C6aNWUyqxjPRgMZ/rXK6deLYwyNceYitjnqcV0Wk3sF1DD5fMXVW9u9fa4PE0ZvkT1KxV1G6Oq8LR3FtqFvcbo4fPCgttAAJwR+oHTtmvRPEHwvbWL0315HNbXFsXkSct/orY75xxnsQD74rifDXiSzhkjbHmyQxgKAPl+7jPTr7V0XiL46appHhyWzTS1uNMulBleWMnK7s/uwTkemMda91U6claZ8hi1VlVSgtep434pttQ09JbabV01KYkltke1Iugxnq3Q84rhLmRwzfK/mKflO4/nXWeJbm31DUMRNNZqm+ZyzeZI+Szbc/wjBHGOoFcxeNCRuWbfj+EHqOPX61y+zUXZH1WDn7t3roRBZpImaQ5De/NL58lrZ7JI5gZB+7GM/jVzTbiITRt95MgE90rU1q0t2ikk8xPLUZU9SeP0rnqRctEceKxS5locnfWt0nmXE0cmxo85OQAcH2/SvBfFOnNDq9xH92RXZX2jjdn0r2qXxbsM0byv5a52I3T0z+teY+L1ju/HV95MjMWmLK4HTPrXn49JcjZ5fNKLlpucZ4f0/y/EskUkfyyQkA9+1aUehSNpxRct5fA9qx7jxH/ZnjVIY0VXYncx53YOCf0r0XSrY3mjTTKqFFG4kDGKcX7t0fNSkpVJX7nK6BO0JkSRfm9DXW6UjGFd2MHsaxp9K8q5jZud+CAO+a2rJNin5fu8VxV5cx6VKNijrujxzo+NoJPSuYFw9jN5bNxnAzXeX2nma28xeeOa4fxroUoPnRhsgZrmjU1sxzw6lsXra388/hmtWz0rgH5a5XwX4h2MsNz8rHjmvQoEXyl242nnIroi09jy6kXF6j9KLRjaFbbW7a5ccdayrGInv37Vu2iBY147c1lNFQY9LUjnrUsdtk/Nj8aXzemf0qxAVJ7/jXFUi0dHNoPFhn1oq0JVH8VFe7FaHzMpan5PCTcfm9e1KZcjGRg+lU1u+31oN1uHZa9DbY5+a+rLvneSyndyMV758FNQXUNPtCzfLldx9M8V85LeAuATnmvYf2dtfMtiYd3zKBgfTJrgzKm5Uj0ssqctY+0vD08d7oIQsY5IoCwA/5ajAOPrz+lWdS1yOXTNsEZWF1G7np061g+DrqW+hWFY2VfszfN/EOM/yrT1KNbrwxcLGph+VMBfXivht6jhI++wskoo0fDTLdIqwsVjU7ee9ejeCvDs1/dxpGu2Nj8xPSuL+EHhdtWnjtwSyo2SR9QP617h/Zq+HdMDwndGgw23selfSZXlsqkFfZHbi8ZyS5IbsfaaJb2HMy/M2Wyy5znk49s1gSazJpeqMrS2kdpGGC7m2vz7AYrkfiB+0K2l+ZYwyK0y/IpILEYz6Y4ryXWZfEvjHVx5t55ckgzHEhbLenUkV7cVRou1NI9vLMqr1I82JaimfRPhj4jRtewxR3UiW7H95L5PmKvPI45zXo8GnX9rfQy6NrlvqFruYoko8pWAP8Od3cd8V8YXfw58TaDp7T2l7qBVQZHRZR8jkE9M+orqfhl4u8eeFr2OK21JZogRtgu2LxSZyeccgfN69qyo5s4ScZ7dwxvDtCpDnw9VXXfqfX3ifwh4T0rwVqeo61Iiaq8bPHPJKvliUjI44BHvnPtXzZJe293AI7aMeY2GMm8OrDrkAcDnPeu1n8Zx/H+xh0XWkj0vUIZFcW8TGOCXnGAGLZzzzxwBXi/jGCP4a/ETVdPt1mf7FN5YVjt2YAGMDg5/rXqPFJpS3TM8hyWclKlOTc1r5NeR1F9qhsdPlm+ZdowW3Y/wDrVx+nfGyDUd0IZ5mU7JCW+4fetbX7b+2LKOO4Z1julWQxr8oPfHHFcbqfhOOx8RzRRpCkcuMoBjoPXFcOIqTpSUujOz6jRdOUai13NC41K3167zGyiSNtuC3ANc7LpyxeKZt06Rgu33j9TUtl4LvtDmW4jka8j3ljuO1lGRxWj4j8NSNHJeNEuGUtj7zDPTiuPMqSrUW9U49D5PH0lSqKMdmeUS6c1xrbXcmR8zBR6gsx/OvTfAkzWekzQvllmiOFPWsi40iHWoE+y/JJH99RxnFXbF5LOeP+790KOTnpzWOArKpQ0Pk61HlrWNLTbBZBGzMX4AX2rSjhV1CupXB5I71Np1lGkRjUbQuME+uOanjkURNGwGc9T3py3O6ldsydSmk0uYKoMkb9MUpgg1CHayru9Kjaf7ZePHnhCRzToIZLG5DGMlO9cco3eh1PRHOeIvB6w/vo49vPUCpPD/iX7Oy28/G04BNdLc3CX0LRK/ynkg9q5jVtA/eyMv8ADyMVMaji7M5KtHmjqdhZkJhlbKtWhFeMONy9K4jw34lksyIJ/wADXUW9yk8aspznmuuPLJXPNs4OzNZbvPU/dFTJqfAXcv41hzX/AJf9386rw37ebnINZ1Kd9zXmR1X9o57r+dFYa3x2j6UV6kYqyPn5SVz8sRJsY7cj8aT7Uc0pjOf8+tNMeBn3r0tDDlbBpfUe9d9+z74gXTvFKwsyjzCFHP1/xrgGiwa1/AV6uleLLWVtqrv5NZYiPNBo1o+7JNH6LeDrtYdAa7hTDC3I357bef5VaXVJZtN/ebZA8pUMvcA4/pXLfCfUVufBIbcWWS1YgZz/AAZ/rWt4f1EXvh2aJmBmtmQx49+ufzr4B0ksRZn3mCqe7c9t+BSix09Zdu5pG3gAcnoa6b4s+OW8NeH51hi2ztlCgzyc5/rWH8JRNpul6d5ka/uxEylT1B2Z/Sj4hRtdeLbVJGafy1L5J5c4xkj8K+2w/LCheJ6GX0VXxV57ep5nc/DbVNc1u3W2txJqV46ykk7ljXOeeldR8XtP1z4U+GGvILPT7ydnw3lXG1hjGTtCk8AnnpXpnwF8EQrHdtcSywyuWDSSEndnpjiut8JfB7T5reSOab+0biRd0puoN5YnPAJGAOMYr5l411KnJE9/Ns+VOapyV+RpeT+Z8heFP2grzxxqsfhvR7O6vtSUie8Pks62sJzuJOOw/mK9K8O2VpZaY+paSBfzWwKum7O4ngHH49PavZvhp8HPDOm/EvXr+xsYrO6uh5U4MSqGyFyFwOmOAfrWP8V/hLY/BvwpJJpUf+meYzmDau7BYEDOB0rWpGKjc86OOo4rFeyiuWWlu2u54r4n16Px60K2Oba9syCJFYq2VPA9RzXC+N/F2oa54yvJNRjaG4bGCfvhto5PrnArp5tTmguv7Wi017fyW3zDbuV0BDNgj+XrXP8A7S+oaPLHY65pFxIZmX9/bIu5+AAPx68Z71hSxjp6X0P1Hhy3t44SrHo0muhseAPFcd5HHb3rBmC9v429/SruqSxprE0lw+7a37vj7g9K870QNewRXEcmM4dSOMnrXdW15HrGjLNMv76MfNj+I96+il+/p8y6HJnWX+wrNw9CxDqbWV4GViY8dOxFSXfiZpLfEa5B+Zt3RcVl3F0jEgN8uOh7VTuL+aKJ4Y4w32gYbH9K7OXnpfKx+d5vh03eXQpFEuNemji2iSQk7lH+fStGPQX0+PzAu2SB/mJHU1U8J6HJF4qZvvIwYA++a63xBCfs207lEhAP+10r5PKm4SnRl0Z8rjornXKAjXzY22ttkUDp61HeaezRiB2/eRkngda6Sx0eH+zIcsxZduCR2xmqk0sYvpvM+badoIHXNetUi0FGVlY5CCxFpuZuJJHOKuXYaKNWGWCjkCr1/bKzNJsz5eQM1Wm/fRr5IYMw5Fc7p21Oq3VmUNIEjtNGG5GSGNVTpjSzNJkDA5WumiA061+Zc7uv1rJurpZJWaNPrg1jUityZRctjn7/AEj7QGcbUYHik0jV20i6VJc+XWn50b7sqd3QVR1LTlmVt33l9KUZNPQ461Hm3NyULdw+ZHyrdKzZJmtWPFZfh7xE2jagsEp3RNxk9q66+8P/AG+38yL5lk5BFezh6Hto+6fOYrFfV58s9mZqagCg5bpRQvh6RVA2twMUV6kcK7bHhPHQvufmbn5sgdf5UjqAae3I5x7Ej2FMbp15zWdz0JaN2GsMmlV9kikHG054pQRiljTH3uxzRcmNz7G/Z48VSah8P7ORW+YxiNgD1GwDFejfDuaKTWZrNmVWuY1wpORvGSPz4FfPP7JOvBdGayaQFkbIXr2Ar2iVrjwj4jsL792qzOrMfRgRj9cZr4/MKfLX5kfZZVVTp2Po74d+Iv8AiTW+3PlwsIwMf3CF/kBR4h8WQaf4r0m6ut23ycSY6/dAJ/Wsn4er5WmTRtIgy/mRjP3gecj61ofEvw4t9c6TIpXKjbuB+U8bTzXv/wATC2i+h9Zkfs/a/vFpqexfDXxba+P9TSK3O2NMAZG3zFXGK9S8N67HoEtpavFEIVYrI4AO7ceN2Tnj2r5j8K2OpeELy0uIdga0YblZj80eR0AGc161pHjTTfEFpeSbb576NwYWKGNYm4wD618Zh8PKEnJbnnZ3gYSq2jL3fyOy8YPaxfGTTbizkjEd5biEwqR8zBsk49OBVX9rz4eXGvaBY67p/wBojNlH5kwjOTyQASOhx3HpXleg+IdV/wCFi2V9qHEFnMCxVtzY3deg7Zr6e8YPDqvhcQq37i6jaPdn5W7jNephYznRakzknF4LF0aq1WiPl3w7caH418FXmnNGftC2zJISuFMgXbnA9T3r4j+NOp6t8GvHKXEk1rqUE+RDtUp9nZQAQy8gkHvX3D4g02HwHdMzqtrExa1md8qdwJwcY56ZzXzN8Zf2d77462d5d6FMs0n2oC33uqDDOFdmz6DJx7CuGdGXLqfs3CuKoYPHSrVXanLW71MHwNG8OhxtctumYCQk9CrAMMfnXS+F7+Gae6jWQbmPC+2K0viF8NLL4ZS6VoNreyahdWumQee5QKM7cN36hhiuN06wa012Fi7KzZXCn1r6jAytSS7nsZhiKONhOvTejNLU9aa26fd+nNQ6Lq322+jj3DfIcKSfu8Y5qvfygwyL8xbHfnvUXhTQLjXNdSOJWAfOG6bcCvRp0nGLsz8xzNxcXc7jwrdK2qwsqnbGijPuepNdJreiSS3UChvMjPzKV+vesnwr4fLam1rBueWKU5VRnKZ/+tXcSaZ5ephW+WONmB56GvCwOFg7ylvds+LxME5mVNqkVrpogk3I0QCAkdeBWSjS2upxxyLuBIJOfvDrWnr9i11cRs3+rR+T61Hqdqskn2hpcmMcAdhXoOL2JoxSM/UEkklbaUXcxwMc4qvDaSJOM8Fefar7RJdMsm7945woFSS2Elwen+rHPNcstz0VFOOhlapIy8j5t46elZK2HlbmVjluorqm0tBYLJndIvasWS2M0rSKpHPT3rGcLmSunZGXZ6etvcbpG3bu1LfaWkqkru3e1X7ezUbmkzuPNREFZd277tZSjbY4atm7HAa9pskd0du7OfyruvhL4o+0QLZXmMrwpP1ArJ1i3jnnaRT8xqnIf7MCzQ8SL6V2YPEPD1OaG3U8rNcEsVR5Jb9D2CTw/amRuvWivPrf4jzeQmfMztGaK+xjmFOx+cvKaydj8yWi55/z/nFI0YH8NWmjyelNaP2rxz6dxK6pk/dp23IwO9TLHk01l2tzSuTynefs+eIW0PxgqdBL057gg/0r6N8V6pJqNlbSN/E+Quem7rXyB4a1U6NrlrcA7dkqnPtmvqa2ujr3h+OSJtw2GTn9K8LNqN1zI9vJ63LLlZ7N4T8Q3X2XT54ZlXMCRg46FTjmvaLizm8S6BDapi4eTi3liXH8W7p1z16V4H8NEt9T+G858zZfafKGCHunA/ma9k8I6tcXfhXybV/JulBktj2SQDI79+n41OU04Op7SV9j9Dwc20uXRnqPh/wnHp0UU+oTOsiusZJj3lDx1PBH416roeh2esxWt34avrbbCElv4XQsJW6jvkV5j4a8ayeO5rW7khS1kmthFOpGEacL0Hpux39eorqLTwhd2Zm1DwvMtv8AbofMlWSQomBnIx64BIxnkV0Y2jGjZwW552Owbqz5qzs9vI3fFXhbQ9O01ZCTJJNEF2xAgK7JnBJJOQxxjGOetXfCPiW48Q+Fr7S5nFu0YVYZXPAOcgH8hXO3Pg/WIbKF9Qvvtc0bKxgKMAAOuDk5bIPXHTrVHxp4oeHw9HY2NnFbzQli84DIWJO7LHI6dOeOBXjuU07y/D9RZfRpNKjJ3d930Kv7VHwF1D4p/ByOS4b7H4gsZRM0/mnYAgOTgcBD1yfyrwf4c+JLzwj4Ut47jbFPdKQqDA3v6gEc811fjvxB4wvNLvpNV8RNeWEYOIrR2y0SqThs+2QevTvWLpUkPj74ZyXkMcKrdMo0+TjfG6Pg4GcjO3ktt6ng8V1UaP1v3VpY+uqXp0o4ebUk5broeVeLTfL4lvdQvpG3THy41L72Vcn+LuO34Vi6Z5mp+JrRPmj3P0bsB6122seELjxFqlrZ28E3kQyrZCRwRGGLAZz1PXcT9ay5PAV54D+IN7Z3mP8AiWnh92Q+VB/L5q9TD0ZUVGO59jWxlGGH9nzK9tER3Gixw3Lr94qM59ef/r1seB7eKwlDySiLywxY7cjJBxWaY5HdpCQWzxg9a2tN03yreIrmSS4B2qP4/wDPWvWi+ZNeR+a5hJt2Z0nwqtJodUvpmyrTowjH8WSeK2ptOmS8gjYN5s2TKC3IJJ61U0C/TSYY7mNPMktguX3YUn0qeO7ndpLqR9shAbB+8pbPX8DXz9OPLJtPqeIqTnJso61dp9tSyiyVViWP94j0qVo1m0SbIVZTw2frUkdjawWU1xOSbiP5YgO47GoLZXstGmWZdxkwS34g13S2uONK+iEXS5IXhdI9wHB9qtxaUDaFmY7mJDZrQ0eVZ0Vd2Wb7w7YqTX2Wzs2j24bcSD7GuZxXUIxd+U5HUxJYy/u/9Ww445rMDbVYqcs3JAro7myF3Ht3bmFY82jf2XcHB3bhn2FRyhKPRGabpl6p8x4wapXCtPE2Mjd2Hat8Wa3A3N94dMVXFnHDdNgNhucGsZRuc3utnL3lv5UYG3nvmqGo6d58O6Nu3Sul8SacblS8Y6HmufNtLanvtYVPwbnNKPOU4tOdYlHoBRWohXaPm7UV7UaqsfKSp6s/OTLBV6fNz1pTuDdq7x/gxeQA7lBwTjj0wKrz/Cu+RM7R+FdLps81YrWxw7fMe/4VHIrGuqu/AN5bD5ojis268MXEH3o2qbM09tc5+6JC7fyINfQ37Ovjr/hJfBkdq0g863GxweSRz/hXhN7o7hfut1BrrP2c9b/4RnxylrJ8sV8dpPoQCawxNJVKVjTC4pwqpn2v8EbG3uLLUrNo2xKhkU+/GBXovg3VYbe1jhk2xtGOcnGCK82+DNheXd3NPDHORbx4cIhb5Tjr+ldjJpkljdyM23yn/gPIbqK8fL7wjJdUfpGW4iLlbud7/wAJa7arDb2sVzN5qCV9h+VAOWBHqMZH+6K9W8O/FHTbTTtMmurj7RprfNKYZD5yZJyhXHy7SMDGc+tfPmi2ksLpIs06TR48sbsfL3rcuCtvrMF0nmRpIQ0sajG7A47/AOcCumFb20GprVbH2dXD0MRFRbtp97PoKPV08S+K/PbVoxp0aswtXQxyqmTt5JBbAwOnasH4tz6frmnXUdxJcvBN+7W4ituHXjtuG76fj2rznS/i40euLDIJo0wdtyrAlR0wcgnvVvxd4707WJ7S3mvr7y5HEiBDuVxwDyPu9/yNZSymjyuSm73POwuVujiFOXwrscvc37jT1so3Eduo8vAYsz/MckjGAevU1nXfiyfw34fk0eziW10/cHKHBywA+Zm6nnsK7DVbyyntkS0jRV2hG2r973b+9mvOfE3h+zk1ZZVe6WQFiU3fKc+3avShh/ZL9z959Jh8RQm3zwsaun+MtSsIJbVtuwEZMgO5uByBjjjpWB4z8VR+JNXaRBJ5sgHn7h1IGBg59AKsXWoTTqzTMzPnblj8xUDA5rNktGeQiONdzH7xNbU6VSTVzhxHJz+0fYq6epScszMqMQFyvSus090kvDJCyyKAESPAG1QMDHueKxdP8Ofaf31xI8NnnbvUE7j6Cuu8M6Ksi+TYwsyj5t8i/Nj3/SqqV1FciPm8Vyyd0Ra7fR21xawCHbiNGaNPfnH19au2CyTWXnKrfvHPLfxKP8Kv2Pgjzb5nZlZZHLbifunOePw4rTk0kqoWNS+CSuRwBXg0adRTftNugoSjyWMeXUZlsFSZ42IYsAF5Ap/kf2lPH8reWwG8mtHUdG8kbmjRtwx8vYmr1no01pYbZPLj87CqfSvUkrrQVSMbe6FhoscUDSBlXAwAOuKr39nJe3ibvuqprQNjJDeJ5e6RcAHB9gadq9qI51VR83GSP1FZThoc8Y2Zi2ttHbodqrn7xLVhX9hJfvNIzbQpwqjqa7O48PGJGbcNsmcDuKx5tCNqxkkLYU8CsNjGSW6OWWB7SNh/EOc1my6zJJHIdq71OAa3dctZGDbFbDVgWWiyC4ZsEqp5FDsc8YJ3ZbgK3mnqrY8xuSKp6xokccJYrgBa3LXTfs8iyMgwBkVFfTRyMUbBRjnBrHl5tzlkrP3Ti10gMoO5efeiulXSoSoxjGOKK9qNNWR8jKTuzzV/hjDJ91QOOePzqtefCOF03Be38QP+Jr2zT/hy3mxqQxrp7X4P/aYP9STXdGrc+fqUWtT5D8SfCZUVv3WP+A15r4t8CrZl/wB30/2cV93eKfgdI8Dfujn6V8//ABw+E9xpVvK4RvSiLTMZcyV7nyX4l0ZbZm7ba5e3vv7H1aG4jba8T7h9a7Lx3M9jeSRt2OOfxrz/AFW7Vp89Mc8VtGhGRlHENan6nf8ABMzxfo/iXw7qi3jqJtRt0YyyyBVRW2Bup9xxXSfFXwvp2keJJ7Wx1C01COJtqtbsCMYzg4+tfn3+zf49vJPBb2lpeT281swU+VMUJTgdvfFfT/wh8SyWdlHbyXDTeY5YySMzHn1J/AV8niafsKrdj9ByWftIqopHp1pp6xRpJGOV4K1ftn/eZEeO4APSo/Dlhc63qdra2sfmz3kixQqTgMzHAGfXJqRpF81F2sjE5yO/T/GuqjjKdj7rCVL+71Oe8X6pqT39vbWtqk0MzbZFZRlQeNwPHIyKTS/DU2nxtN5kcM0hLP5f3c/Q+nP51rxSXFzqUkjBVhhf5ckZbHOKj1i+jNuzMqcZA2/x85qoyTvJs+ijWk1GEfmQWV7dpbMs0itN9xSBtyvbgZ5qO7mt0+WS3aST1bOc1cTTWuxHJGv7yQDK4zj0HFOvtCe1cCfcrf3VBz9cmu6nUTiZ8/LKxzuoytJPhYfu/wAOMU14nuNqR27I2Crh+hyMcfz/AAra0zQ9k6iQyN5rEFickD6f4V02keEpdVuPs8NvI284SNEy7dskdRxmuOpKpbmRlisQoqzOfsoofENjbwxsXtLUCLjgM4+834nJrp9KtmsEaZcL2rZ1nwfpfgLTrbT0nW41eMlrkQ4aGAf3Q3RmB4OMgEdaybS0l1QszArGh/OhVbx8zxuZTjpsaGmAuVXbvC5JcjGBWpBor3pK2p8xgu4beRiq+lL9qmWOFQFXufXpzWta202nXJaOTLkYOz5ccGtpfDc46mjKGneHY2VnyzeX1HvVmfSfttnGzfL94gMPyq19nawiWGPiNsF2JyfeptTZbRFVCzMANq45rN7Ftu1zmre1a2v2uGy1urlQvTnmrt1HI1ssgxErZ6io7+zuLIL5g25k8zae9XdU232nRRRqVDHLE9qz1YpS95MznUogd8tjoR3rN1N3nkHUZ7Y61sS6c09pG0TZXbjk/wCfSq9zpxt1VmI+Xn1rBwZnKUUrIx73R91puP3uoGKzYLJYTIhQfMea6i6IugrEHbjpg1kzWSWzZb7zngmly6nme0exnXEPl220xnawx0rn7y1jaT7v4V1N9vYcsPLJ4APNZ8mmLJcgqvf86zejLi1Yp2+kL9nj/d/wjtRW9Bb5gT7n3R/EKK9qMtD42cXzM9E03wzbrcr93rmvQNA8MReQu1Qa888Cav8A2peBn+6CenPQ+1eyaFtEAXhen+f0P5VOFnz+8ceZUeRqBiax4PilgOY159q+ff2j/hzHLpVwyxqOCeB7ivqLVpBFD8zYHX+Zx/n1FeQ/Ge0XU9KmCq7ZB6Lk9j/nFdTunoeZ7O61PyH/AGj9L/sTxLIu3+Mj9W/wryLUpMt2Br63/a3/AGe/Emu63JJpfh3W7x9+VEFlJJuyzYxtU8HOPrXiFr+xn8WNfbNr8OvF7GQlfn0uVeV6jkdq9fD05OJ5Nf3WYn7PPiyPw54+hhuGxb3x8o84GSR/hX2Z4Fu1RJFLFFjKsqHuM8V4h8OP+CU/x012+t7j/hAtWtVWaMBp5Y4csSCg+Zh14xX1/wDD3/gnF8abTTo5L3wrHGsUZlkLapa5wmd3HmZ4Irxs3yupVd6aZ9JkOaQoe5UehN4R1x43jkO6NUkDBQfmU9yD29q6qNFeOSdplk7nAwR04/Q/nXoPhj/gnj8ULO8WK80vRoJGmWL5tSiOGfBXO0nqOa6U/wDBP7xtJ4ee6jutAtd1qbt/MupGAQHBPyxtXkwybEpaRZ9rh+IsHGes0j53uoLmRW8pxtbcSSORWbOl9qUrR4CxqOSAMAcdK+stC/4Jk+L/ADljvNc8Px75jCQks5AYKSOsQ6gcVqaT/wAE1ppdK+3XPiOGO1ktEu2EURZghbB6gcjn8q6KeS4t7xPp6XHmU0V700/kfKfhS2mmVvOysy4Vseg6dPWtyHSmvH2iORmJwWJyRz9a+uNC/wCCZeki4SObxNqHmNcy274tF52Aled3t+Rra0b9gvw3/YcV7Lq+r7WtYrrARF3K5AOevIzn8K9TD5LXS10PJxnH+WOV4Sf3Hybomk2ul28TXFnJIULNksVJ74yAf8muks/EepS2ckNjbw6bHcEbooE+eTGerdc8eor6y0P9hbwesywySatIq3M9tgzLysYbYT8vfaCaveHv2RPBel6XHqQtbtn+zQXYLzL8u87WP3a6P7Eq23PCxHHWCn0bPjE+G/tHzbfLiByePmdsc5/Af40r6XPfssdvAyR4HOMfX8u/0r7x0j9mHwa1yyyaPFL/AKddwjzQrYRC2zjA52gfrVrRfg14VsvDgu18P6Z5jWkF1/qBjsHA49z+YqY5DV+1I4/9fsPD4YM+IdD8HSQRjnaqnJfGA3pj61rRaOtwixorM6ttYhc8192aL8NNBtbry10XTUU315Cqi3XG3DGMdO3GPpTdL8I2Nl4VjmTS7UTSadBcfLAPvgDPbr611RyV8tmzz8Rxwpu8af4nwq3gy+Ljy7G6uAWwFSIt9fyq0fhlr15KskegaxIseMOLOTDA9DnFfflr4ft7O9UNYwKP7QuAv7ofMGB6cVHDoUy+DAi2zfaP7MjXCpzvDDjtzzVLIY9WYS46qpWUPxPgW7+BvjHxLq8c0fhfWmAO1QbVxhgOR07c1oWX7PPjabS5Jv8AhGdQwY1mDsqqCh+pr7+nsZLG+VvL2eZqLKh/vB1ycfiSKhbwffXHg826wt5z6V9nC7lX5gxPHHpWiyGjfVs5anG2IlqopHwtZ/sf+PrmNFbQ5IQreXhpUGG6+voanl/Yh8a3lqbiS1tIY1jMp3zA/Lkjt9K+8Nd0uW0vEkddqXWpwsnK87lVWplx4CvpdGFuu0D7LJbn5vVmK9vcVX9h4daNs5JcZYx9j4hf/gnr4ujkCyXmjx/v0t8F2b5mAI6L7j9anl/4Jz69OIXbWtHhZhJgASE/ISG/hHoa+2vEeiTWE0Mz7MSahaMo9CNqnPHsasSeAbhprdsxhYXuWb1IlZiB+APNaRyPC9jjlxTjW9/wPiG8/wCCamqzqrSeKNLXLRgAW0jcPjHcdmqe0/4JkyW8brceLLYhWuAQLJv+WRGP46+y9Y8IS6XZpNI6ttS3jPXqnfp7VpP4F81mZpgu955Pu55l5pxybDR15TN8TY56c34HxbZf8E1PtNnDIPFD4kQMMWmByM/36K+z7Hwlb6fZQ25+YwosZbHXAxmit1ltO2x57zvFN3ufN3hb9ivwt4asZFUXVxcKhCSPIYwGGcfKC30qbwt4Rsf7Fjvl0v5Ghtr0R7S7Iquvnr9SC9e3W1pgr/Dk9G78/wD16yPh7bra3us6WI4/+JfcllU9CkpLgZ9COPxqKWEo01ZRR0VcdXqe9ORw2m+AZnS8jhsXh3m+soyIj8i4dopfqePzFaHh7R5/ElwurW9jttrie0ntAIhtWNwBL164DE/lXq0Wnqq7ePlztJPPt37YA+lVfCHhVfDOiQ2MfzQ2+5YiT9xSen5cfhWqhBdDldaXc8vn+Hd9Bpt1LJp+1bLTJYISVBLPDlopPq20E/U1uaf4JuNZ1uK8hhWTTRctPA2ceak0eHPGOjNXoWpPCkKwzyQxtcfIiyOF3nBwoyeeB09M1k/Cm0ZPh3pkUn+uhhEMvIzuUlTx+FbRlZaGbk3ucVq/gC/0rQUvJ9nl6bYQ3T853XFuwYfhhM89q27z4UTahPCjSR/ZfOuyyHOWjmDYHTsT613WoaTHqthcW8y7o7qNopMDqrKVI/I/nVi0tPsyKOTt7Z/z61SmTzHnPiXwdc6TpMN1JcK3lXFlPOFzz5JTPPphTWpdfCj7XZSW8d0IlkjnhPyFspIWIGM/w7gPzq38Q/EljJp+raCzSDUJrGfylEL7WPlsRhsYrqdOuV1GxgmXG2Rd6kds+tVclnE+M/Cp0WG1ufNMhk1OzZjtwI1BVW79xWkvwjtW0ZrMyP5LWjWeB/cZif5Gupms47hNsirKud21hxkdP1xVlkDfd28DGTxjmlzX0FqcP4w0CLRXsrmP/l41a2WTns7JGf8Ax3Na0Pw706LSFsvLZYVthaY3dUBrB8a+M4tQ1a60drO4t5NPVNSSVipjZI5MH5gxG7gtjrgV6J5eScj6cGiQ9epyPiXw4umyafJZ27Nv1KPzVBzhXIQn/vknNa0fgjTxp/2ZrdfI8kQYP9wcqK2lhDU6NSfvewOehHA/likiNDk/F+nw6TPpc8cSxtJqMQcDuZCFP+fetyPw9bJbrCsEflqnlBccBfT+tcbfeLbrxZrV3YyafcW8el6tbmBjCw81FaMM2SMdckc9K9GEQ3Hafy+uKctNhmD4g0GSafT5LdBuhuhI5AxlfX+n41rLZRxxeWsahdpQIABgAc/pVxod20c/MaasW88HuePUeh4pXHc5nx0uz+yZF7ajCpwe7PjP4kflXQBAMlfXIH0/+uK4m20TWtQvJIrhJpreHVEu45JJB8iLIG2KPQDOK75oNoA9M5q5S0EZGu6E2sCz2yeX9nuY5zx12tkgfWtLYpDZ79T0xU/lELxQitjdt/Os9SbHO+O4C9lYs25duoQMy7evzDmtxYfl5GGbrXF6H8ONYtL7UPtFzDNBNctPEzOxb/Wsy57DCkDjvXeeXhu/U/lVkmfqeiR6vEiS7tsciyDHHzLyP1qwqlQxbk43H8hnn8KsCNTxub1p3k5blVZR2Peo5nsOzOb8Yata3ml31nHcRvdW8Zdov4kwcZNbSr/dDcLnjtVO88JQ3VxfTPhpryIRF9gDKoHA/PmtSNfLbcrY2njI688U76BZmPdRRpcyKw5ViD8x9aKuO0MblWZQynBBZeP1oroujmOPSJUaPCr19KxdDjW3+I+rbFC+ZbW7Nx94hFA/SiiuE9XojqB98f4VYAyw6flRRQZy3OY+JdnFcWuiyOgaSLWrDY3dc3KA/oSPxrY8IwLDp95t3f8AH7P1Yt/y0b1oorQRrwnA/H0p0rlQuPXHT2NFFZilscjqWj2//C1VuNrebNaeS53ttKkcjGcfjjNdVoVrHaaTbxRqEjjhQKo6D5RRRWstiC5u+Sk3lI5GH3lQkH0oopAVoPC+nrfSX32OH7VeIsM0hXPmI2dwI6c9z1rViG+2jkP3mC5P/Af/AK1FFXLYuWwSDLUo+VPwNFFZy2IJPKU26yYy2V5P0NPUbYlI9AP50UUPoBL5Cg/d7ZqOSRk2BWwKKKJbAOVF2fdX5iM8daNvH4miiiXQAxilXlh9aKKYCyDBb/eH8jQRgUUUARSHL0/NFFAAzECm7ztP4fzoopx3A5fVLWN9TuCY1JMrEnHuaKKK6znP/9k="]

        ajouter('xxCarrousel', "Affichage d'un carrousel", function (ici: xElementHolder) {

            ici.append(new xxCarrousel({
                photos64: tabPhoto,
                indice_depart: 0,
                valueChange: () => { }
            }));



        }, 3, xxCarrousel);

        ajouter('xxxListeDeroulanteAutomatique', "Affichage d'une liste déroulante automatique avec 3 éléments (max 3 : boutton radio sinon liste)", function (ici: xElementHolder) {

            ici.append(new xxListeDeroulanteAutomatique({
                data: ["1", "2", "3"],
                libelle: "Test",
                renderSelected: () => { }, //Déclenchée quand click sur la liste pour l'ouvrir ou sur un bouton radio
                valeurSaisie: (val) => { },
                nbElemMaxBouttonsRadio: 3,
            }));



        }, 3, xxListeDeroulanteAutomatique);

        ajouter('xxxListeDeroulanteAutomatique', "Affichage d'une liste déroulante automatique avec 4 éléments (max 3 : boutton radio sinon liste)", function (ici: xElementHolder) {

            ici.append(new xxListeDeroulanteAutomatique({
                data: ["1", "2", "3", "4"],
                libelle: "Test",
                renderSelected: () => { }, //Déclenchée quand click sur la liste pour l'ouvrir ou sur un bouton radio
                valeurSaisie: (val) => { },
                nbElemMaxBouttonsRadio: 3,
            }));



        }, 3, xxListeDeroulanteAutomatique);


        ajouter('liste des icones existantes', 'cliquez sur le bouton', function (ici: xElementHolder) {

            let a = new xxWrapPanel({ class: "wrapIconesShowroom" });
            ici.append(a);

            let listeIcones: string[] = xOutils.enumNamesToStringArray(enumIconeP12);

            listeIcones.forEach((val: string) => {

                let iconeTemp = new IconeP12(xOutils.stringToEnum<enumIconeP12>(val, enumIconeP12));
                a.append(new xxBouton({
                    icone: iconeTemp, click: function () { }, titleVariable: '', optionsAffichage: {positionIconeBouton:enumPosition.Top} , textVariable: val
                }))

            });

        }, 5);


        ajouter('liste des mini icones existantes', 'Survolez pour les noms', function (ici: xElementHolder) {


            let a = new xxWrapPanel({ class: "wrapIconesShowroom" });
            let div: xDiv = new xDiv();
            ici.append(a);

            let listeIcones: string[] = xOutils.enumNamesToStringArray(enumIconeP12);

            listeIcones.forEach((val: string) => {

                let iconeTemp = new IconeMiniP12(xOutils.stringToEnum<enumIconeP12>(val, enumIconeP12));
                a.append(new xxIndicateur({
                    indicateur: iconeTemp,
                    toolTipContent: new xxLabel({ textVariable: val })
                }));

            });
        }, 5);

        ajouter('liste des icones svg existantes', 'Survolez pour les noms', function (ici: xElementHolder) {


            let a = new xxWrapPanel({ class: "wrapIconesShowroom" });
            let div: xDiv = new xDiv();
            ici.append(a);

            let listeIconesSvg: string[] = xOutils.enumNamesToStringArray(enumIconeSvg);

            listeIconesSvg.forEach((val: string) => {

                let iconeTemp = new IconeSvg(xOutils.stringToEnum<enumIconeSvg>(val, enumIconeSvg));
                a.append(new xxIndicateur({
                    indicateur: iconeTemp,
                    toolTipContent: new xxLabel({ textVariable: val })
                }));

            });
        }, 5);

        ajouter('liste des icones tuile existantes', 'Survolez pour les noms', function (ici: xElementHolder) {


            let a = new xxWrapPanel({ class: "wrapIconesShowroom" });
            let div: xDiv = new xDiv();
            ici.append(a);

            let listeIconesTuile: string[] = xOutils.enumNamesToStringArray(enumIconeTuile);

            listeIconesTuile.forEach((val: string) => {

                let iconeTemp = new IconeSvg(xOutils.stringToEnum<enumIconeTuile>(val, enumIconeTuile));
                a.append(new xxIndicateur({
                    indicateur: iconeTemp,
                    toolTipContent: new xxLabel({ textVariable: val })
                }));

            });
        }, 5);

        ajouter('xxCharts', 'Graphique camembert', function (ici: xElementHolder) {

            ici.append(divChartCamembert);
        }, 6);


        ajouter('xxCharts bar', 'Graphique en bar', function (ici: xElementHolder) {


            ici.append(divChartBar);
        }, 6);

        //Je suis obligé de faire cette méthode qui est appelé au chargement des divs.
        //Sinon d3Js trouve pas la div et il plante.
        function initChart(divChart: xDiv, divChartBar: xDiv) {
            let datasChart: mChart.DataChart[] = [];
            datasChart.push(new mChart.DataChart(60, "Farine", "white", 1));
            datasChart.push(new mChart.DataChart(30, "Beurre", "yellow", 2));
            datasChart.push(new mChart.DataChart(10, "Sucre", "green", 3));
            let chart: mChart.xxChart = new mChart.xxChart({ data: datasChart, title: "Gâteau au chocolat", desc: "Répartition par ingrédients", divContenant: divChart });

            let datasChartBar: mChart.DataChart[] = [];
            datasChartBar.push(new mChart.DataChart(60, "Farine", "white", 1));
            datasChartBar.push(new mChart.DataChart(30, "Beurre", "yellow", 2));
            datasChartBar.push(new mChart.DataChart(10, "Sucre", "green", 3));
            let chartBar: mChart.xxBarChart = new mChart.xxBarChart({
                id: 'gogo',
                data: datasChartBar, desc: "", title: "",
                width: 400,
                height: 300,
                click: null,
                divContenant: divChartBar.asHolder
            });
        }

        /**
         * xxTableau.........................
         */

        /** boutonWapper2 */
        // Fonction recursive qui permet de generé les options pour les copie,coller
        function generationStringOptionRecur(Element: any, nbTab: number) {
            let toSender: string = "";
            if (typeof (Element) == "string") {
                toSender += Element;
            }
            else if (typeof (Element) == "object") {
                nbTab++;
                toSender += "{\n";
                let listkeys: string[] = Object.keys(Element);
                if (listkeys.length > 0) {
                    listkeys.forEach((item) => {
                        if (typeof (Element[item]) == "string" || (typeof (Element[item]) == "object" && Object.keys(Element[item]).length > 0)) {
                            toSender += ("\t").repeat(nbTab) + item + ":";
                            toSender += generationStringOptionRecur(Element[item], nbTab);
                            toSender += ",\n";
                        }
                    });
                }
                nbTab--;
                toSender += ("\t").repeat(nbTab) + "}";
            }

            return toSender
        };

        ajouter('xxBouton', 'Bouton Generator', function (ici: xElementHolder) {
            // THE grid //
            let gridGenerator: xxGrid = new xxGrid({
                colonnes: ["auto"],
                lignes: ["auto"],
                gridGap: "5px",
                class: "GridGenerator"
            });

            let ligne = 1;
            // Bidouille pour quand tu es pas en T20
            let isForcingT20: boolean = false;
            if (xClass.Theme != enumThemes.Theme2020) {
                gridGenerator.append([
                    new xxGridItem({
                        colStart: 1,
                        nbCols: 10,
                        rowStart: ligne++,
                        content: new xxLabel({
                            type: enumTypeLabel.important,
                            centrer: true,
                            habillage: enumHabillageLabel.warning,
                            textVariable: "Attention ce site n'est pas en Theme \"t20\", beaucoup d'options d'affichage ne fonctionneront pas!"
                        })
                    }),
                    new xxGridItem({
                        colStart: 1,
                        nbCols: 10,
                        rowStart: ligne++,
                        content: new xxLabel({
                            type: enumTypeLabel.important,
                            centrer: true,
                            habillage: enumHabillageLabel.warning,
                            textVariable: "Le bouton ci-dessous permet de force l'affchage en t20, apres F5/Rafraîchissement de la page tous redeviendra normal :)"
                        })
                    }),
                    new xxGridItem({
                        colStart: 1,
                        nbCols: 10,
                        rowStart: ligne++,
                        class: "GridResult",
                        content: new xxBouton({
                            textVariable: "Forcing t20",
                            titleVariable:'',
                            click: (cb) => {
                                Array.from(document.getElementsByClassName("tleg")).forEach(function (item) {
                                    item.classList.remove("tleg");
                                    item.classList.add("t20");
                                });
                                isForcingT20 = true;
                            }
                        })
                    })
                ]);
            }

            // data
            let isCheckbox: boolean = false;
            let dicoAttributOption: any =
            {
                optionsAffichage: {},
                confirm: {},
                optionLabelled: {},
                typeBouton: "enumtypeBouton.Standard",
                textLocalise: "\"Change moi\"",
                titleLocalise: "\"Change moi\"",
                click: "(cb: () => void,retours:optionClick)=>{/*Complet moi*/}"
            };
            let dicoAttributLabelledOption: any = {};
            let optionString: string = "";
            let optionboutonTempo: optionButton =
            {
                optionsAffichage: {},
                confirm: { comportement: enumComportementBouton.Standard },
                typeBouton: enumTypeBouton.Standard,
                textVariable: "Change moi",
                titleVariable: "Change moi",
                click: (cb) => {
                    cb();
                }
            };
            let optionLabelledTempo: OptionsLabel = {
                textVariable: "Change moi",
            };

            // Contenue
            let DivTempoBouton: xDiv = new xDiv({});
            let lableOptionbouton: xInputText = new xInputText({
                multiline: true,
                background: enumBackgroundInput.Transparent,
                ValueChange: () => {
                    lableOptionbouton.setValue(optionString);
                }
            });
            lableOptionbouton.y.style.width = "500px";
            lableOptionbouton.y.style.height = "300px";

            // gereneration du Bouton de rendu
            function GenerationBouton() {
                if ((optionboutonTempo as optionBoutonLabelled).optionsLabel != null)
                    (optionboutonTempo as optionBoutonLabelled).optionsLabel.class = "";
                console.log(optionboutonTempo);

                DivTempoBouton.asHolder.empty();
                if (isCheckbox) {
                    DivTempoBouton.asHolder.append(new xxCheckBox({
                        textVariable: optionboutonTempo.textVariable ?? <string>optionLabelledTempo.textVariable,
                        typeCheckbox: enumTypeCheckbox.xxBouton,
                        IconeBoutonWapper2: optionboutonTempo.icone,
                        AffichageBoutonWapper2: optionboutonTempo.optionsAffichage,
                        ValueChange: (val: boolean) => { }
                    }));
                    optionString = generationStringOptionRecur({
                        textVariable: (dicoAttributOption.textVariable ?? dicoAttributLabelledOption.textVariable),
                        textLocalise: (dicoAttributOption.textLocalise ?? dicoAttributLabelledOption.textLocalise),
                        IconeBoutonWapper2: dicoAttributOption.icon,
                        typeCheckbox: "enumTypeCheckbox.xxBouton",
                        AffichageBoutonWapper2: dicoAttributOption.affichageBouton,
                        ValueChange: "(val:boolean) => {/* Complet moi */}"
                    }, 0);
                    optionString = "new xxCheckBox(" + optionString + ")";
                }
                else {
                    DivTempoBouton.asHolder.append(new xxBouton(optionboutonTempo));
                    // Generateur de code (car le stringify donne trop de modification a faire dans le code)
                    optionString = generationStringOptionRecur(dicoAttributOption, 0);
                    optionString = "new xxBouton(" + optionString + ")";
                }

                if (isForcingT20) {
                    Array.from(DivTempoBouton.y.getElementsByClassName("tleg")).forEach(function (item) {
                        item.classList.remove("tleg");
                        item.classList.add("t20");
                    });
                }

                lableOptionbouton.setValue(optionString);
            };

            //#region optionGlobal
            let ZoneOptionGlobal: xxZoneRepliable = new xxZoneRepliable({
                renderTitre: (ici) => {
                    ici.append(new xxLabel({
                        textVariable: "option Global",
                        type: enumTypeLabel.important,
                        taillePolice: 16,
                        centrer: true
                    }));
                },
                CouleurFleche: enumXxZoneRepliableCouleurFleche.Blanc,
                renderDetail: (ici) => {
                    let gridOptionGlobal: xxGrid = new xxGrid({
                        colonnes: ["15%", "auto", "auto", "auto", "auto", "15%"],
                        lignes: ["auto"],
                        gridGap: "20px 10px",
                    });
                    let ligneOption: number = 1;
                    // ------------------------------- //
                    // Texte - C 2 > 3
                    let sansTexte: boolean = false;
                    let TextBouton: string = "Change moi";
                    let Textvariable: boolean = false;
                    function TextboutonChange() {
                        if (!sansTexte) {
                            optionboutonTempo.textVariable = TextBouton;
                            optionLabelledTempo.textVariable = TextBouton;
                            if (!Textvariable) {
                                delete dicoAttributOption.textVariable;
                                delete dicoAttributLabelledOption.textVariable;
                                if (optionboutonTempo.typeBouton != enumTypeBouton.TexteHorsBouton)
                                    dicoAttributOption.textLocalise = "\"" + TextBouton + "\"";
                                else
                                    delete dicoAttributOption.textLocalise;
                                dicoAttributLabelledOption.textLocalise = "\"" + TextBouton + "\"";
                            }
                            else {
                                delete dicoAttributOption.textLocalise;
                                delete dicoAttributLabelledOption.textLocalise;
                                if (optionboutonTempo.typeBouton != enumTypeBouton.TexteHorsBouton)
                                    dicoAttributOption.textVariable = "\"" + TextBouton + "\"";
                                else
                                    delete dicoAttributOption.textVariable;
                                dicoAttributLabelledOption.textVariable = "\"" + TextBouton + "\"";
                            }
                        }
                        else {
                            delete dicoAttributLabelledOption.textLocalise;
                            delete dicoAttributLabelledOption.textVariable;

                            delete dicoAttributOption.textLocalise;
                            delete dicoAttributOption.textVariable;

                            optionboutonTempo.textVariable = null;
                            optionLabelledTempo.textVariable = null;
                        }
                    }
                    gridOptionGlobal.append([new xxGridItem({
                        colStart: 2,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Texte",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xInputText({
                                placeHolderVariable: "Change moi",
                                ValueChange: (val: string) => {
                                    TextBouton = val;
                                    if (TextBouton == null || TextBouton == "")
                                        TextBouton = "Change moi";

                                    TextboutonChange();
                                    GenerationBouton();
                                }
                            })
                        })
                    }), new xxGridItem({
                        colStart: 3,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Texte variable",
                            labelLargeurLibre: true,
                            initContent: new xxCheckBox({
                                ValueChange: (val) => {
                                    Textvariable = val;
                                    TextboutonChange();
                                    GenerationBouton();
                                }
                            })
                        })
                    }),
                    ]);

                    // Title - C 4 > 5 - L ++
                    let TitleBouton: string = "Change moi";
                    let Titlevariable: boolean = false;
                    gridOptionGlobal.append([new xxGridItem({
                        colStart: 4,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Title",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xInputText({
                                placeHolderVariable: "Change moi",
                                ValueChange: (val: string) => {
                                    TitleBouton = val;
                                    if (TitleBouton == null || TitleBouton == "")
                                        TitleBouton = "Change moi";
                                    optionboutonTempo.titleVariable = TitleBouton;
                                    if (!Titlevariable) {
                                        delete dicoAttributOption.titleVariable;
                                        dicoAttributOption.titleLocalise = "\"" + TitleBouton + "\"";
                                    }
                                    else {
                                        delete dicoAttributOption.titleLocalise;
                                        dicoAttributOption.titleVariable = "\"" + TitleBouton + "\"";
                                    }
                                    GenerationBouton();
                                }
                            })
                        })
                    }), new xxGridItem({
                        colStart: 5,
                        nbCols: 1,
                        rowStart: ligneOption++,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Title variable",
                            labelLargeurLibre: true,
                            initContent: new xxCheckBox({
                                ValueChange: (val) => {
                                    Titlevariable = val;
                                    if (!Titlevariable) {
                                        delete dicoAttributOption.titleVariable;
                                        dicoAttributOption.titleLocalise = "\"" + TitleBouton + "\"";
                                    }
                                    else {
                                        delete dicoAttributOption.titleLocalise;
                                        dicoAttributOption.titleVariable = "\"" + TitleBouton + "\"";
                                    }
                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    // ------------------------------- //
                    // typeBouton - C 2 > 2 
                    gridOptionGlobal.append([new xxGridItem({
                        colStart: 2,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Type Button",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<enumTypeBouton>({
                                donnees: Object.keys(enumTypeBouton).filter(key => !isNaN(parseInt(key))).map(key => <enumTypeBouton>parseInt(key)),
                                defaultValue: enumTypeBouton.Standard,
                                renderSelected: (ici, item, open) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton:enumTailleBouton.Fit },
                                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                        click: (cb) => {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: enumTypeBouton[item],
                                        titleVariable:'clic'
                                    }))
                                },
                                renderSelectItem: (ici, item, select) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        click: (cb) => {
                                            select(item);
                                            cb();
                                        },
                                        textVariable: enumTypeBouton[item],
                                        titleLocalise:'clic'
                                    }))
                                },
                                selected: (val) => {
                                    optionboutonTempo.typeBouton = val;
                                    dicoAttributOption.typeBouton = "enumtypeBouton." + enumTypeBouton[val];
                                    switch (val) {
                                        case enumTypeBouton.Standard:
                                            cacherxElements(ZoneOptionLabel, true);

                                            delete (optionboutonTempo as unknown as optionBoutonLabelled).optionsLabel;
                                            optionboutonTempo.textVariable = TextBouton;

                                            delete dicoAttributOption.optionLabelled;

                                            break;
                                        case enumTypeBouton.TexteHorsBouton:
                                            afficherxElements(ZoneOptionLabel);

                                            delete optionboutonTempo.textVariable;
                                            (optionboutonTempo as unknown as optionBoutonLabelled).optionsLabel = optionLabelledTempo;

                                            dicoAttributOption.optionLabelled = dicoAttributLabelledOption;

                                            break;
                                    }
                                    TextboutonChange();

                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    // icon - C 3 > 5 - L++
                    let dicoIcon: any = {
                        IconeP12: Object.keys(enumIconeP12).filter(key => !isNaN(parseInt(key))).map(key => parseInt(key)),
                        IconeSvg: Object.keys(enumIconeSvg).filter(key => !isNaN(parseInt(key))).map(key => parseInt(key)),
                        IconeEmedSvg: Object.keys(enumIconeEmedSvg).filter(key => !isNaN(parseInt(key))).map(key => parseInt(key)),
                        IconeTuileSvg: Object.keys(enumIconeTuile).filter(key => !isNaN(parseInt(key))).map(key => parseInt(key)),
                        IconeTuile: Object.keys(enumIconeTuile).filter(key => !isNaN(parseInt(key))).map(key => parseInt(key)),
                    }
                    let ListIconeID: ObservableCollection<number> = new ObservableCollection<number>(dicoIcon.IconeSvg);
                    let dicoEnCours: BindableObject<string> = new BindableObject<string>("IconeSvg");
                    dicoEnCours.bind((val) => {
                        ListIconeID.vider().add([null]).add(dicoIcon[val]);
                    });

                    function getIcone(dico: string, numberEnum: number): { icone: Icone, iconeName: string, iconeString: string } {
                        let toSender: { icone: Icone, iconeName: string, iconeString: string } = null;
                        switch (dico) {
                            case "IconeP12":
                                toSender = {
                                    icone: new IconeP12(<enumIconeP12>numberEnum),
                                    iconeName: enumIconeP12[numberEnum],
                                    iconeString: "new IconeP12(enumIconeP12." + enumIconeP12[numberEnum] + ")"
                                };
                                break;
                            case "IconeSvg":
                                toSender = {
                                    icone: new IconeSvg(<enumIconeSvg>numberEnum),
                                    iconeName: enumIconeSvg[numberEnum],
                                    iconeString: "new IconeSvg(enumIconeSvg." + enumIconeSvg[numberEnum] + ")"
                                };
                                break;
                            case "IconeEmedSvg":
                                toSender = {
                                    icone: new IconeSvg(<enumIconeEmedSvg>numberEnum),
                                    iconeName: enumIconeEmedSvg[numberEnum],
                                    iconeString: "new IconeSvg(enumIconeEmedSvg." + enumIconeEmedSvg[numberEnum] + ")"
                                };
                                break;
                            case "IconeTuileSvg":
                                toSender = {
                                    icone: new IconeSvg(<enumIconeTuile>numberEnum),
                                    iconeName: enumIconeTuile[numberEnum],
                                    iconeString: "new IconeSvg(enumIconeTuile." + enumIconeTuile[numberEnum] + ")"
                                };
                                break;
                            case "IconeTuile":
                                toSender = {
                                    icone: new IconeTuile(<enumIconeTuile>numberEnum),
                                    iconeName: enumIconeTuile[numberEnum],
                                    iconeString: "new IconeTuile(enumIconeTuile." + enumIconeTuile[numberEnum] + ")"
                                };
                                break;
                        }

                        return toSender;
                    }

                    gridOptionGlobal.append([new xxGridItem({
                        colStart: 3,
                        nbCols: 1,
                        class: "LabelOption",
                        rowStart: ligneOption,
                        content: new xxLabelContainer({
                            textVariable: "Type icone",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<string>({
                                donnees: Object.keys(dicoIcon),
                                defaultValue: "IconeSvg",
                                renderSelected: (ici, item, open) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                        click: (cb) => {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: item,
                                        titleVariable:item
                                    }))
                                },
                                renderSelectItem: (ici, item, select) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        click: (cb) => {
                                            select(item);
                                            cb();
                                        },
                                        textVariable: item,
                                        titleVariable:item
                                    }))
                                },
                                selected: (val) => {
                                    dicoEnCours.Value = val;
                                }
                            })
                        })
                    }),
                    new xxGridItem({
                        colStart: 4,
                        nbCols: 1,
                        class: "LabelOption",
                        rowStart: ligneOption,
                        content: new xxLabelContainer({
                            textVariable: "Icone",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<number>({
                                donnees: [],
                                dataContext: ListIconeID,
                                renderSelected: (ici, item, open) => {
                                    if (item == null) {
                                        ici.append(new xxBouton({
                                            icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                            optionsAffichage: {
                                                margin: { Tous: 0 },
                                                positionIconeBouton: enumPosition.Right,
                                                couleurBouton: enumCouleurBouton.Neutre,
                                            },
                                            textVariable: "aucune",
                                            titleVariable: "select",
                                            typeBouton: enumTypeBouton.Standard,
                                            click: (cb) => {
                                                open(item);
                                                cb();
                                            },
                                        }));
                                    }
                                    else {
                                        let Iconeinfo = getIcone(dicoEnCours.Value, item);
                                        ici.append(new xxBouton({
                                            icone: Iconeinfo.icone,
                                            titleVariable: "select",
                                            optionsAffichage: {
                                                margin: { Tous: 0 },
                                                couleurBouton: enumCouleurBouton.Neutre,
                                            },
                                            textVariable: Iconeinfo.iconeName,
                                            typeBouton: enumTypeBouton.Standard,
                                            click: (cb) => {
                                                open(item);
                                                cb();
                                            },
                                        }));
                                    }
                                },
                                renderSelectItem: (ici, item, select) => {
                                    if (item == null) {
                                        ici.append(new xxBouton({
                                            optionsAffichage: {
                                                margin: { Tous: 0 },
                                                positionnementResponsiveBouton: enumPositionnementResponsiveBouton.PleineLargeur,
                                                couleurBouton: enumCouleurBouton.Neutre,
                                            },
                                            textVariable: "aucune",
                                            titleVariable: "select",
                                            typeBouton: enumTypeBouton.Standard,
                                            click: (cb) => {
                                                select(item);
                                                cb();
                                            },
                                        }));
                                    }
                                    else {
                                        let Iconeinfo = getIcone(dicoEnCours.Value, item);
                                        ici.append(new xxBouton({
                                            icone: Iconeinfo.icone,
                                            optionsAffichage: {
                                                margin: { Tous: 0 },
                                                positionnementResponsiveBouton: enumPositionnementResponsiveBouton.PleineLargeur,
                                                couleurBouton: enumCouleurBouton.Neutre,
                                            },
                                            titleVariable: "select",
                                            textVariable: Iconeinfo.iconeName,
                                            typeBouton: enumTypeBouton.Standard,
                                            click: (cb) => {
                                                select(item);
                                                cb();
                                            },
                                        }));
                                    }
                                },
                                selected: (val) => {
                                    if (val != null) {
                                        let Iconeinfo = getIcone(dicoEnCours.Value, val);
                                        optionboutonTempo.icone = Iconeinfo.icone;
                                        dicoAttributOption.icon = Iconeinfo.iconeString;
                                    }
                                    else {
                                        optionboutonTempo.icone = null;
                                        delete dicoAttributOption.icon;
                                    }
                                    GenerationBouton();
                                }
                            })
                        })
                    }),
                    new xxGridItem({
                        colStart: 5,
                        nbCols: 1,
                        class: "LabelOption",
                        rowStart: ligneOption++,
                        content: new xxLabelContainer({
                            textVariable: "Sans texte",
                            labelLargeurLibre: true,
                            initContent: new xxCheckBox({
                                ValueChange: (val) => {
                                    sansTexte = val;
                                    TextboutonChange();
                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    // ------------------------------- //
                    // Confirmation - C 2 > 2
                    let stringConfirmMethode: string = null;
                    let ConfirmMethode: () => string = null;
                    let isConfirm: boolean = false;
                    gridOptionGlobal.append([new xxGridItem({
                        colStart: 2,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Confirmation click",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<enumComportementBouton>({
                                donnees: Object.keys(enumComportementBouton).filter(key => !isNaN(parseInt(key))).map(key => <enumComportementBouton>parseInt(key)),
                                defaultValue: enumComportementBouton.Standard,
                                renderSelected: (ici, item, open) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                        click: (cb) => {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: enumComportementBouton[item],
                                        titleLocalise:enumComportementBouton[item]
                                    }))
                                },
                                renderSelectItem: (ici, item, select) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        click: (cb) => {
                                            select(item);
                                            cb();
                                        },
                                        textVariable: enumComportementBouton[item],
                                        titleVariable: enumComportementBouton[item],
                                    }))
                                },
                                selected: (val) => {
                                    optionboutonTempo.confirm.comportement = val;

                                    if (val != enumComportementBouton.Standard) {
                                        dicoAttributOption.confirm.behaviour = "enumComportementBouton." + enumComportementBouton[val];
                                        if (val == enumComportementBouton.ValidationBloquante) {
                                            if (stringConfirmMethode != null)
                                                dicoAttributOption.confirm.stringConfirm = stringConfirmMethode;
                                            else
                                                delete dicoAttributOption.confirm.stringConfirm;
                                            optionboutonTempo.confirm.stringConfirm = ConfirmMethode;
                                            isConfirm = true;
                                        }
                                        else
                                            delete dicoAttributOption.confirm.stringConfirm;
                                    }
                                    else {
                                        delete dicoAttributOption.confirm.behaviour;
                                        delete dicoAttributOption.confirm.stringConfirm;
                                        isConfirm = false;
                                    }
                                    GenerationBouton();
                                }
                            })
                        })
                    })]);

                    // stringConfirm - C 3 > 3
                    gridOptionGlobal.append([new xxGridItem({
                        colStart: 3,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "String confirm",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xInputText({
                                ValueChange: (val: string) => {
                                    if (val != null && val! != "") {
                                        stringConfirmMethode = "()=>{return \"" + val + "\";}";
                                        ConfirmMethode = () => { return val; };
                                    }
                                    else {
                                        stringConfirmMethode = null;
                                        ConfirmMethode = null;
                                    }

                                    optionboutonTempo.confirm.stringConfirm = ConfirmMethode;

                                    if (isConfirm && stringConfirmMethode != null)
                                        dicoAttributOption.confirm.stringConfirm = stringConfirmMethode;
                                    else
                                        delete dicoAttributOption.confirm.stringConfirm;

                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    // Mode Checkbox - C 4 > 4
                    gridOptionGlobal.append([new xxGridItem({
                        colStart: 4,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Mode checkbox",
                            labelLargeurLibre: true,
                            initContent: new xxCheckBox({
                                value: false,
                                ValueChange: (val) => {
                                    isCheckbox = val;
                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    ici.append(gridOptionGlobal);
                },
                fullTitleToggle: true,
            });

            gridGenerator.append([
                new xxGridItem({
                    colStart: 1,
                    nbCols: 10,
                    rowStart: ligne++,
                    content: ZoneOptionGlobal
                })
            ]);
            //#endregion

            //#region optionLabel
            let ZoneOptionLabel: xxZoneRepliable = new xxZoneRepliable({
                renderTitre: (ici) => {
                    ici.append(new xxLabel({
                        textVariable: "option Label",
                        type: enumTypeLabel.important,
                        taillePolice: 16,
                        centrer: true
                    }));
                },
                CouleurFleche: enumXxZoneRepliableCouleurFleche.Blanc,
                renderDetail: (ici) => {
                    let gridOption: xxGrid = new xxGrid({
                        colonnes: ["15%", "auto", "auto", "auto", "auto", "15%"],
                        lignes: ["auto"],
                        gridGap: "20px 10px",
                    });
                    let ligneOption: number = 1;

                    // type - C 2 > 2
                    gridOption.append([new xxGridItem({
                        colStart: 2,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Type",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<enumTypeLabel>({
                                donnees: [],
                                asyncLoading: async () => {
                                    let listTempo = Object.keys(enumTypeLabel).filter(key => !isNaN(parseInt(key))).map(key => <enumTypeLabel>parseInt(key));
                                    listTempo.unshift(null);
                                    return listTempo;
                                },
                                renderSelected: (ici, item, open) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                        click: (cb) => {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: enumTypeLabel[item],
  titleVariable: enumTypeLabel[item],
                                    }))
                                },
                                renderSelectItem: (ici, item, select) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        click: (cb) => {
                                            select(item);
                                            cb();
                                        },
                                        textVariable: enumTypeLabel[item],
                                        titleVariable:enumTypeLabel[item]
                                    }))
                                },
                                selected: (val) => {
                                    optionLabelledTempo.type = val;
                                    if (val != null)
                                        dicoAttributLabelledOption.type = "enumTypeLabel." + enumTypeLabel[val];
                                    else
                                        delete dicoAttributLabelledOption.type;
                                    GenerationBouton();
                                }
                            })
                        })
                    })]);

                    // habillage - C 3 > 3
                    gridOption.append([new xxGridItem({
                        colStart: 3,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Habillage",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<enumHabillageLabel>({
                                donnees: [],
                                asyncLoading: async () => {
                                    let listTempo = Object.keys(enumHabillageLabel).filter(key => !isNaN(parseInt(key))).map(key => <enumHabillageLabel>parseInt(key));
                                    listTempo.unshift(null);
                                    return listTempo;
                                },
                                renderSelected: (ici, item, open) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                        click: (cb) => {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: enumHabillageLabel[item],
                                        titleVariable:enumHabillageLabel[item]
                                    }))
                                },
                                renderSelectItem: (ici, item, select) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        click: (cb) => {
                                            select(item);
                                            cb();
                                        },
                                        textVariable: enumHabillageLabel[item],
                                        titleVariable:enumHabillageLabel[item]
                                    }))
                                },
                                selected: (val) => {
                                    optionLabelledTempo.habillage = val;
                                    if (val != null)
                                        dicoAttributLabelledOption.habillage = "enumHabillageLabel." + enumHabillageLabel[val];
                                    else
                                        delete dicoAttributLabelledOption.habillage;
                                    GenerationBouton();
                                }
                            })
                        })
                    })]);

                    // taillePolice - C 4 > 4
                    gridOption.append([new xxGridItem({
                        colStart: 4,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Taille police",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxInputNumerique({
                                ValueChange: (val) => {
                                    let valstring = val.toString();
                                    if (valstring != "" && valstring != null) {
                                        optionLabelledTempo.taillePolice = parseInt(valstring);
                                        dicoAttributLabelledOption.taillePolice = valstring;
                                    }
                                    else {
                                        optionLabelledTempo.taillePolice = null;
                                        delete dicoAttributLabelledOption.taillePolice;
                                    }
                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    // police - C 5 > 5 - L++
                    gridOption.append([new xxGridItem({
                        colStart: 5,
                        nbCols: 1,
                        rowStart: ligneOption++,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "police",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xInputText({
                                ValueChange: (val: string) => {
                                    if (val != "" && val != null) {
                                        optionLabelledTempo.police = val.toString();
                                        dicoAttributLabelledOption.police = val.toString();
                                    }
                                    else {
                                        optionLabelledTempo.police = null;
                                        delete dicoAttributLabelledOption.police;
                                    }
                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    // ----------------------- //
                    // lineBreak - C 2 > 2
                    gridOption.append([new xxGridItem({
                        colStart: 2,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Line break",
                            labelLargeurLibre: true,
                            initContent: new xxCheckBox({
                                value: true,
                                ValueChange: (val) => {
                                    optionLabelledTempo.lineBreak = val;
                                    if (val)
                                        delete dicoAttributLabelledOption.lineBreak;
                                    else
                                        dicoAttributLabelledOption.lineBreak = "false";
                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    // tabindex - C 3 > 3
                    gridOption.append([new xxGridItem({
                        colStart: 3,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Tab index",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxInputNumerique({
                                ValueChange: (val) => {
                                    let valstring = val.toString();
                                    if (valstring != "" && valstring != null) {
                                        optionLabelledTempo.tabindex = parseInt(valstring);
                                        dicoAttributLabelledOption.tabindex = valstring;
                                    }
                                    else {
                                        optionLabelledTempo.tabindex = null;
                                        delete dicoAttributLabelledOption.tabindex;
                                    }
                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    // espaceMinimaliste C 4 > 4
                    gridOption.append([new xxGridItem({
                        colStart: 4,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Espace minimaliste",
                            labelLargeurLibre: true,
                            initContent: new xxCheckBox({
                                value: false,
                                ValueChange: (val) => {
                                    optionLabelledTempo.espaceMinimaliste = val;
                                    if (val)
                                        dicoAttributLabelledOption.espaceMinimaliste = "true";
                                    else
                                        delete dicoAttributLabelledOption.espaceMinimaliste;
                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);


                    ici.append(gridOption);
                },
                fullTitleToggle: true,
            });

            gridGenerator.append([
                new xxGridItem({
                    colStart: 1,
                    nbCols: 10,
                    rowStart: ligne++,
                    content: ZoneOptionLabel
                })
            ]);

            cacherxElements(ZoneOptionLabel, true);
            //#endregion

            //#region optionAffichageBouton
            let ZoneOptionAffichage: xxZoneRepliable = new xxZoneRepliable({
                renderTitre: (ici) => {
                    ici.append(new xxLabel({
                        textVariable: "option Affichage",
                        type: enumTypeLabel.important,
                        taillePolice: 16,
                        centrer: true
                    }));
                },
                CouleurFleche: enumXxZoneRepliableCouleurFleche.Blanc,
                renderDetail: (ici) => {
                    let gridOption: xxGrid = new xxGrid({
                        colonnes: ["15%", "auto", "auto", "auto", "auto", "15%"],
                        lignes: ["auto"],
                        gridGap: "20px 10px",
                    });
                    let ligneOption: number = 1;

                    // ------------------------------- //
                    // styleBouton - C 2 > 2 
                    gridOption.append([new xxGridItem({
                        colStart: 2,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Style bouton",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<enumStyleBouton>({
                                donnees: [],
                                asyncLoading: async () => {
                                    let listTempo = Object.keys(enumStyleBouton).filter(key => !isNaN(parseInt(key))).map(key => <enumStyleBouton>parseInt(key));
                                    listTempo.unshift(null);
                                    return listTempo;
                                },
                                renderSelected: (ici, item, open) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                        click: (cb) => {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: enumStyleBouton[item],
                                        titleVariable: enumStyleBouton[item],
                                    }))
                                },
                                renderSelectItem: (ici, item, select) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        click: (cb) => {
                                            select(item);
                                            cb();
                                        },
                                        textVariable: enumStyleBouton[item],
                                        titleVariable: enumStyleBouton[item],
                                    }))
                                },
                                selected: (val) => {
                                    optionboutonTempo.optionsAffichage.styleBouton = val;
                                    if (val != null)
                                        dicoAttributOption.affichageBouton.styleBouton = "enumStyleBouton." + enumStyleBouton[val];
                                    else
                                        delete dicoAttributOption.affichageBouton.styleBouton;

                                    GenerationBouton();
                                }
                            })
                        })
                    })]);

                    // SizeButton - C 3 > 3 
                    gridOption.append([new xxGridItem({
                        colStart: 3,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Size bouton",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<enumTailleBouton>({
                                donnees: [],
                                asyncLoading: async () => {
                                    let listTempo = Object.keys(enumTailleBouton).filter(key => !isNaN(parseInt(key))).map(key => <enumTailleBouton>parseInt(key));
                                    listTempo.unshift(null);
                                    return listTempo;
                                },
                                renderSelected: (ici, item, open) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                        click: (cb) => {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: enumTailleBouton[item],
                                        titleVariable: enumTailleBouton[item],
                                    }))
                                },
                                renderSelectItem: (ici, item, select) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        click: (cb) => {
                                            select(item);
                                            cb();
                                        },
                                        textVariable: enumTailleBouton[item],
                                        titleVariable: enumTailleBouton[item],
                                    }))
                                },
                                selected: (val) => {
                                    optionboutonTempo.optionsAffichage.tailleBouton = val;
                                    if (val != null)
                                        dicoAttributOption.affichageBouton.size = "enumTailleBouton." + enumTailleBouton[val];
                                    else
                                        delete dicoAttributOption.affichageBouton.size;
                                    GenerationBouton();
                                }
                            })
                        })
                    })]);

                    // ColorButton - C 4 > 4 
                    gridOption.append([new xxGridItem({
                        colStart: 4,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Color bouton",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<enumCouleurBouton>({
                                donnees: [],
                                asyncLoading: async () => {
                                    let listTempo = Object.keys(enumCouleurBouton).filter(key => !isNaN(parseInt(key))).map(key => <enumCouleurBouton>parseInt(key));
                                    listTempo.unshift(null);
                                    return listTempo;
                                },
                                renderSelected: (ici, item, open) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                        click: (cb) => {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: enumCouleurBouton[item],
                                        titleVariable: enumCouleurBouton[item],
                                    }))
                                },
                                renderSelectItem: (ici, item, select) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        click: (cb) => {
                                            select(item);
                                            cb();
                                        },
                                        textVariable: enumCouleurBouton[item],
                                        titleVariable: enumCouleurBouton[item],
                                    }))
                                },
                                selected: (val) => {
                                    optionboutonTempo.optionsAffichage.couleurBouton = val;
                                    if (val != null)
                                        dicoAttributOption.affichageBouton.color = "enumCouleurBouton." + enumCouleurBouton[val];
                                    else
                                        delete dicoAttributOption.affichageBouton.color;
                                    GenerationBouton();
                                }
                            })
                        })
                    })]);

                    // responsiveButton - C 5 > 5 - L++
                    gridOption.append([new xxGridItem({
                        colStart: 5,
                        nbCols: 1,
                        rowStart: ligneOption++,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Responsive bouton",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<enumPositionnementResponsiveBouton>({
                                donnees: [],
                                asyncLoading: async () => {
                                    let listTempo = Object.keys(enumPositionnementResponsiveBouton).filter(key => !isNaN(parseInt(key))).map(key => <enumPositionnementResponsiveBouton>parseInt(key));
                                    listTempo.unshift(null);
                                    return listTempo;
                                },
                                renderSelected: (ici, item, open) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                        click: (cb) => {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: enumPositionnementResponsiveBouton[item],
                                        titleVariable: enumPositionnementResponsiveBouton[item],
                                    }))
                                },
                                renderSelectItem: (ici, item, select) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        click: (cb) => {
                                            select(item);
                                            cb();
                                        },
                                        textVariable: enumPositionnementResponsiveBouton[item],
                                        titleVariable: enumPositionnementResponsiveBouton[item],
                                    }))
                                },
                                selected: (val) => {
                                    optionboutonTempo.optionsAffichage.positionnementResponsiveBouton = val;
                                    if (val != null)
                                        dicoAttributOption.affichageBouton.responsiveButton = "enumPositionnementResponsiveBouton." + enumPositionnementResponsiveBouton[val];
                                    else
                                        delete dicoAttributOption.affichageBouton.responsiveButton;
                                    GenerationBouton();
                                }
                            })
                        })
                    })]);

                    // ------------------------------- //

                    // PositionIcone - C 2 > 2
                    gridOption.append([new xxGridItem({
                        colStart: 2,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Position icone",
                            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
                            initContent: new xxListeDeroulante<enumPosition>({
                                donnees: [],
                                asyncLoading: async () => {
                                    let listTempo = Object.keys(enumPosition).filter(key => !isNaN(parseInt(key))).map(key => <enumPosition>parseInt(key));
                                    listTempo.unshift(null);
                                    return listTempo;
                                },
                                renderSelected: (ici, item, open) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                                        click: (cb) => {
                                            open(item);
                                            cb();
                                        },
                                        textVariable: enumPosition[item],
                                         titleVariable: enumPosition[item],
                                    }))
                                },
                                renderSelectItem: (ici, item, select) => {
                                    ici.append(new xxBouton({
                                        optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                                        click: (cb) => {
                                            select(item);
                                            cb();
                                        },
                                        textVariable: enumPosition[item],
                                        titleVariable:enumPosition[item]
                                    }))
                                },
                                selected: (val) => {
                                    optionboutonTempo.optionsAffichage.positionIconeBouton = val;
                                    if (val != null)
                                        dicoAttributOption.affichageBouton.positionIcon = "enumPosition." + enumPosition[val];
                                    else
                                        delete dicoAttributOption.affichageBouton.positionIcon;
                                    GenerationBouton();
                                }
                            })
                        })
                    })]);

                    // rounded - C 3 > 3
                    gridOption.append([new xxGridItem({
                        colStart: 3,
                        nbCols: 1,
                        rowStart: ligneOption,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Rounded",
                            labelLargeurLibre: true,
                            initContent: new xxCheckBox({
                                value: false,
                                ValueChange: (val) => {
                                    optionboutonTempo.optionsAffichage.boutonArrondi = val;
                                    if (val)
                                        dicoAttributOption.affichageBouton.rounded = "true";
                                    else
                                        delete dicoAttributOption.affichageBouton.rounded;
                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    //// margin - C 4 > 4 
                    //gridOption.append([new xxGridItem({
                    //    colStart: 4,
                    //    nbCols: 1,
                    //    rowStart: ligneOption,
                    //    class: "LabelOption",
                    //    content: new xxLabelContainer({
                    //        textVariable: "Margin",
                    //        labelLargeurLibre: true,
                    //        initContent: new xxCheckBox({
                    //            value: true,
                    //            ValueChange: (val) =>
                    //            {
                    //                optionboutonTempo.affichageBouton.margin = val;
                    //                if (val)
                    //                    delete dicoAttributOption.affichageBouton.margin;
                    //                else
                    //                    dicoAttributOption.affichageBouton.margin = "false";
                    //                GenerationBouton();
                    //            }
                    //        })
                    //    })
                    //})
                    //]);

                    // disabled - C 5 > 5 - L ++ 
                    gridOption.append([new xxGridItem({
                        colStart: 5,
                        nbCols: 1,
                        rowStart: ligneOption++,
                        class: "LabelOption",
                        content: new xxLabelContainer({
                            textVariable: "Disabled",
                            labelLargeurLibre: true,
                            initContent: new xxCheckBox({
                                value: false,
                                ValueChange: (val) => {
                                    optionboutonTempo.disabled = val;
                                    if (val)
                                        dicoAttributOption.affichageBouton.disabled = "true";
                                    else
                                        delete dicoAttributOption.affichageBouton.disabled;
                                    GenerationBouton();
                                }
                            })
                        })
                    })
                    ]);

                    ici.append(gridOption);
                },
                fullTitleToggle: true,
            });

            gridGenerator.append([
                new xxGridItem({
                    colStart: 1,
                    nbCols: 10,
                    rowStart: ligne++,
                    content: ZoneOptionAffichage
                })
            ]);

            //#endregion

            // ---- Affichage bouton ---- //
            // Label - C 1 > 10 - L++
            // bouton - C 1 > 10 - L++
            // Option generate - C 1 > 10 - L++
            gridGenerator.append([new xxGridItem({
                colStart: 1,
                nbCols: 10,
                class: "TitreGrid",
                rowStart: ligne++,
                content: new xxLabel({
                    textVariable: "Resultat",
                    type: enumTypeLabel.important,
                    taillePolice: 16,
                    centrer: true
                })
            }),
            new xxGridItem({
                colStart: 1,
                nbCols: 10,
                class: "GridResult",
                rowStart: ligne++,
                content: DivTempoBouton
            }), new xxGridItem({
                colStart: 1,
                nbCols: 10,
                class: "GridResult",
                rowStart: ligne++,
                content: lableOptionbouton
            })]);

            ici.append(gridGenerator);
            GenerationBouton();
        }, 8)

        /**
         * boutonWapper2.........................
         */

        /** Bindings */

        ajouter('xInputText', 'binding: {value: BindableObject<string | number>, visibility: BindableObject<enumVisibility> }', ici => {
            let stringB = new BindableObject<string>("La valeur de base");
            let visibilite = new BindableObject<enumVisibility>(enumVisibility.afficher);

            ici.append(new xInputText({
                binding: { value: stringB, visibility: visibilite },
            }))

            ici.append(new xxLabel({
                binding: { value: stringB }
            }))

            ici.append(new xxBouton({
                titleVariable: "changer",
                textVariable: "Valeur",
                optionsAffichage: {tailleBouton:enumTailleBouton.Fit},
                click: cb => {
                    stringB.Value = "Test";
                    cb();
                }
            }))
            let affiche = false;

            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visibilite.Value = enumVisibility.afficher;
                    else
                        visibilite.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))

        }, 7);

        ajouter('xInputDate', 'binding: {value: BindableObject<Date>, visibility: BindableObject<enumVisibility> }', ici => {
            let dateB = new BindableObject<DateSerialisable>();
            let visiB = new BindableObject<enumVisibility>(enumVisibility.afficher);


            ici.append(new xInputDate({
                binding: { value: dateB, visibility: visiB }
            }))



            let stringB = new BindableObject<string>("");

            dateB.bind(d => {
                stringB.Value = DateSerialisable.tolocalStringOnlyDate(d) //xOutils.DateToFrenchDateString(d, false, false);
            })

            ici.append(new xxLabel({
                binding: { value: stringB },
            }))

            dateB.Value = DateSerialisable.Now();

            ici.append(new xxBouton({
                titleVariable: "changer",
                textVariable: "Valeur",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    dateB.Value = DateSerialisable.FactoryByNumber(2015, 3, 25);
                    cb();
                }
            }))
            let affiche = false;

            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visiB.Value = enumVisibility.afficher;
                    else
                        visiB.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))


        }, 7);

        ajouter('xInputTime', 'binding: {value: BindableObject<xTime>, visibility: BindableObject<enumVisibility> }', ici => {
            let timeB = new BindableObject<xTime>();
            let visiB = new BindableObject<enumVisibility>(enumVisibility.afficher);


            ici.append(new xInputTime({
                binding: { value: timeB, visibility: visiB }
            }))

            let stringB = new BindableObject<string>("");

            timeB.bind(d => {
                stringB.Value = d.getString();
            })

            timeB.Value = new xTime(20, 0);

            ici.append(new xxLabel({
                binding: { value: stringB },
            }))

            ici.append(new xxBouton({
                titleVariable: "changer",
                textVariable: "Valeur",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    timeB.Value = new xTime(12, 30);
                    cb();
                }
            }))
            let affiche = false;

            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visiB.Value = enumVisibility.afficher;
                    else
                        visiB.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))

        }, 7)


        ajouter('xxAutoComplete', 'binding: {value: BindableObject<T>, visibility: BindableObject<enumVisibility> }', ici => {

            let stringliste = ["un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"]
            let stringB = new BindableObject<string>("");
            let visiB = new BindableObject<enumVisibility>(enumVisibility.afficher);

            ici.append(new xxAutoComplete<string>({
                listeValeurs: stringliste,
                getLibelle: (valeur) => {
                    return valeur;
                },
                valueChange: (val) => {
                    console.log(val);
                },
                binding: {
                    value: stringB,
                    visibility: visiB
                },

            }))

            ici.append(new xxLabel({
                binding: { value: stringB },
            }))
            let affiche = false;

            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visiB.Value = enumVisibility.afficher;
                    else
                        visiB.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))

        }, 7);

        ajouter('xxBoutonDeprecated', 'binding: {visibility: BindableObject<enumVisibility>', ici => {

            let visiB = new BindableObject<enumVisibility>(enumVisibility.masquer);

            ici.append(new xxBouton({
                titleVariable: "Exemple",
                textVariable: "Bouton exemple",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                binding: { visibility: visiB },
                click: cb => {
                    cb();
                }
            }))

            let affiche = true;
            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visiB.Value = enumVisibility.afficher;
                    else
                        visiB.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))

        }, 7);

        ajouter('xxCheckBox', 'binding: {value: BindableObject<boolean>, visibility: BindableObject<enumVisibility> }', ici => {
            let boolB = new BindableObject<boolean>();
            let visiB = new BindableObject<enumVisibility>(enumVisibility.afficher);

            ici.append(new xxCheckBox({
                binding: {
                    value: boolB,
                    visibility: visiB
                }
            }))

            let affiche = false;

            let stringB = new BindableObject<string>("");

            boolB.bind(d => {
                if (d)
                    stringB.Value = "True";
                else
                    stringB.Value = "False";
            })

            ici.append(new xxLabel({
                binding: { value: stringB },
            }))

            boolB.Value = true;

            ici.append(new xxBouton({
                titleVariable: "changer",
                textVariable: "Valeur",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    boolB.Value = !boolB.Value;
                    cb();
                }
            }))


            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visiB.Value = enumVisibility.afficher;
                    else
                        visiB.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))
        }, 7);

        ajouter('xxLabel', 'binding: {value: BindableObject<string>, visibility: BindableObject<enumVisibility> }', ici => {
            let stringB = new BindableObject<string>("La valeur de base");
            let visiB = new BindableObject<enumVisibility>(enumVisibility.afficher);

            ici.append(new xxLabel({
                binding: {
                    value: stringB,
                    visibility: visiB
                }
            }));

            ici.append(new xxBouton({
                titleVariable: "changer",
                textVariable: "Valeur",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    stringB.Value = "Test";
                    cb();
                }
            }));

            let affiche = false;

            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visiB.Value = enumVisibility.afficher;
                    else
                        visiB.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))

        }, 7);

        ajouter('xxLabelContainer', 'binding: {value: BindableObject<string>, visibility: BindableObject<enumVisibility> }', ici => {
            let stringB = new BindableObject<string>("La valeur de base");
            let visiB = new BindableObject<enumVisibility>(enumVisibility.afficher);

            ici.append(new xxLabelContainer({
                binding: {
                    value: stringB,
                    visibility: visiB
                },
                initContent: new xxBouton({
                    titleVariable: "changer",
                    textVariable: "Valeur",
                    optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                    click: cb => {
                        stringB.Value = "Test";
                        cb();
                    }
                })
            }));

            let affiche = false;

            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visiB.Value = enumVisibility.afficher;
                    else
                        visiB.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))

        }, 7);

        ajouter('xxQrCodeReader', 'binding: {value: BindableObject<string>, visibility: BindableObject<enumVisibility>', ici => {
            let stringB = new BindableObject<string>("La valeur de base");
            let visiB = new BindableObject<enumVisibility>(enumVisibility.afficher);

            ici.append(new xxQrCodeReader({
                binding: {
                    value: stringB,
                    visibility: visiB
                }
            }));

            ici.append(new xxLabel({
                binding: { value: stringB }
            }))

            ici.append(new xxBouton({
                titleVariable: "changer",
                textVariable: "Valeur",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    stringB.Value = "Test";
                    cb();
                }
            }));

            let affiche = false;

            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visiB.Value = enumVisibility.afficher;
                    else
                        visiB.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))

        }, 7);

        ajouter('xCouleur', 'binding: {value: BindableObject<string>, visibility: BindableObject<enumVisibility>', ici => {

            let stringB = new BindableObject<string>("283F55");
            let visiB = new BindableObject<enumVisibility>(enumVisibility.afficher);

            ici.append(new xCouleur({
                binding: {
                    value: stringB,
                    visibility: visiB
                }
            }));

            ici.append(new xxLabel({
                binding: { value: stringB }
            }))

            ici.append(new xxBouton({
                titleVariable: "changer",
                textVariable: "Valeur",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    stringB.Value = "7F5F10";
                    cb();
                }
            }));

            let affiche = false;

            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visiB.Value = enumVisibility.afficher;
                    else
                        visiB.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))

        }, 7);

        ajouter('xxChoixCouleur', 'binding: {value: BindableObject<string>, visibility: BindableObject<enumVisibility>', ici => {

            let stringB = new BindableObject<string>("283F55");
            let visiB = new BindableObject<enumVisibility>(enumVisibility.afficher);

            ici.append(new xxChoixCouleur({
                choixCouleurLibre: false,
                binding: {
                    value: stringB,
                    visibility: visiB
                }
            }));

            ici.append(new xxLabel({
                binding: { value: stringB }
            }))

            ici.append(new xxBouton({
                titleVariable: "changer",
                textVariable: "Valeur",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    stringB.Value = "7F5F10";
                    cb();
                }
            }));

            let affiche = false;

            ici.append(new xxBouton({
                titleVariable: "changer la visibilité",
                textVariable: "Visibilite",
                optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
                click: cb => {
                    if (affiche)
                        visiB.Value = enumVisibility.afficher;
                    else
                        visiB.Value = enumVisibility.masquer;

                    affiche = !affiche;
                    cb();
                }
            }))

        }, 7);


        /**PluginContainer*/




        tableau_xElement.ajouterDatas(dataTabx);
        tableau_xxElement.ajouterDatas(dataTabxx);
        //     tableau_xxxElement.ajouterDatas(dataTabxxx);
        tableau_DockPanel.ajouterDatas(dataDockPanel);
        tableau_BoutonWapper2.ajouterDatas(dataBoutonWapper2);
        tableau_ListeIcones.ajouterDatas(dataListeIcones);
        tableau_charts.ajouterDatas(dataCharts);
        tableau_bindings.ajouterDatas(dataBindings);

        /* tests promises */

        let p: Promise<{}> = new Promise<{}>((setoui, setnon) => {
            setTimeout(function () {
                xOutils.afficherMessageAlertify("oui", ETypeAlertify.log);
                setoui({});
            }, 10000)
        });


        setTimeout(function () { xOutils.afficherMessageAlertify("timeout", ETypeAlertify.log); p.then(() => { xOutils.afficherMessageAlertify("then", ETypeAlertify.log); }) }, 3000);




        /* test pour gérer le ctrl+S et ctrl+P */


        /*
                let listener: Keypress.Listener = new window.keypress.Listener();
        
                let ctrlS: Keypress.Combo =
                {
                    keys: "meta s",
                    on_keydown: function (e: Event) {
                        xOutils.afficherMessageAlertify("enregistrement en cours", ETypeAlertify.log);
                    },
                    on_keyup: null,
                    on_release: null,
                    this: this,
                    prevent_default: false,
                    prevent_repeat: false,
                    is_unordered: false,
                    is_counting: false,
                    is_exclusive: true,
                    is_sequence: false,
                    is_solitary: false
                }
        
                let ctrlP: Keypress.Combo =
                {
                    keys: "meta p",
                    on_keydown: function (e: Event) {
                        xOutils.afficherMessageAlertify("impression en cours", ETypeAlertify.log);
                    },
                    on_keyup: null,
                    on_release: null,
                    this: this,
                    prevent_default: false,
                    prevent_repeat: false,
                    is_unordered: false,
                    is_counting: false,
                    is_exclusive: true,
                    is_sequence: false,
                    is_solitary: false
                }
        
                listener.register_combo(ctrlS);
                listener.register_combo(ctrlP);
                */


    }




}

