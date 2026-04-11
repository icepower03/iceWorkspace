interface OptionsAssistantUser {
    page: xxPageWrapper;
    affichageSimpleSansRecap?: boolean;
}

class xxAssistantSaisieUtilisateur implements iXElement {
    private cettePage: xxPageWrapper;
    private elementPrincipal: xxStackPanel;
    private affichageSimpleSansRecap: boolean = false;
    private dataDecision: Dictionnaire<xxAssistantSaisieUtilisateurData> = {};
    private zoneRecapitulatif: xxStackPanel;
    private tabRecap: { id: string, valeur: string }[] = [];
    private zoneChoix: xDiv = new xDiv({ id: 'zoneChoix' });
    private tabHistoCheminValeur: { id: string, valeur: string, sansModifReponse: boolean }[] = [];
    private radioButtonEtapes: xxRadioButton<string>;
    private labelTitreEtape: xxLabel;
    private textSaisie: string = "";


    constructor(option: OptionsAssistantUser) {
        let myThis: xxAssistantSaisieUtilisateur = this;
        myThis.cettePage = option.page;
        myThis.zoneRecapitulatif = new xxStackPanel({ id: 'zoneRecapitulatif' });

        if (option.affichageSimpleSansRecap != null)
            myThis.affichageSimpleSansRecap = option.affichageSimpleSansRecap;

        myThis.renderStackAide();
    }



    public get y() { return this.elementPrincipal.y; }

    private renderStackAide() {
        let myThis: xxAssistantSaisieUtilisateur = this;
        myThis.tabRecap = [];
        myThis.zoneRecapitulatif.vider();

        let monStackPrincipal: xxStackPanel = new xxStackPanel({
            id: 'blockAidedecision',
            initContent: [
                myThis.zoneRecapitulatif,
                myThis.zoneChoix,
                new xxLabel({ textLocalise: "(*) champ obligatoire", class: "ChampObligatoire" })
            ]
        });



        myThis.elementPrincipal = monStackPrincipal;
    }

    public ajouterSaisieUtilisateur(saisie: xxAssistantSaisieUtilisateurData): void {
        let myThis: xxAssistantSaisieUtilisateur = this;
        myThis.dataDecision[saisie.id] = saisie;
    }

    public setChoixPossibleSaisieUtilisateur(id: string, choixPossible: string[]) {
        let myThis: xxAssistantSaisieUtilisateur = this;
        myThis.dataDecision[id].choixPossible = choixPossible;
    }

    public setDomSaisieUtilisateur(id: string, dom: iXElement) {
        let myThis: xxAssistantSaisieUtilisateur = this;
        myThis.dataDecision[id].elementDom = dom;
    }

    public setActionSaisieUtilisateur(id: string, action: () => void) {
        let myThis: xxAssistantSaisieUtilisateur = this;
        myThis.dataDecision[id].action = action;
    }

    public renderAideDecision(id: string) {
        let myThis: xxAssistantSaisieUtilisateur = this;

        myThis.textSaisie = '';

        let maCLass: string = myThis.dataDecision[id].class;
        if (maCLass != "") {
            maCLass = maCLass + "_saisie";
        }

        let content: xxStackPanel = new xxStackPanel({ class: 'hide' + " " + maCLass });

        if (myThis.dataDecision[id].libelleContenu != '') {
            myThis.ajouterQuestionAideDecision(myThis.dataDecision[id].libelleContenu, myThis.dataDecision[id].class, myThis.dataDecision[id].saisieObligatoire);
        }
        //if (myThis.dataDecision[id].elementDom == null ) {
        //    myThis.ajouterQuestionRecap(myThis.dataDecision[id].libelleContenu);
        //}


        if (myThis.dataDecision[id].saisieDemande) {
            let stackSaisie: xxStackPanel = new xxStackPanel({ gap: 20});
            let monInput: xInputText = new xInputText({
                multiline: myThis.dataDecision[id].multiline,
                ValueChange: (v) => {
                    myThis.textSaisie = v.toString();
                    if (myThis.dataDecision[id].valeurSaisieBinding != undefined) {
                        myThis.dataDecision[id].valeurSaisieBinding.Value = myThis.textSaisie;
                    }
                },
                placeHolderVariable: myThis.dataDecision[id].placeHolderVariable,
                binding: { value: myThis.dataDecision[id].valeurSaisieBinding },
                class: myThis.dataDecision[id].classPourSaisie,
            })
            stackSaisie.append(monInput);

            let poshisto = myThis.tabHistoCheminValeur.map(function (e) {
                return e.id;
            }).indexOf(id);
            if (poshisto > -1) {
                monInput.setValue(myThis.tabHistoCheminValeur[poshisto].valeur);
            }
            content.append(stackSaisie, "saisie_saisie");

        }

        if (myThis.dataDecision[id].elementDom != null) {
            content.append(myThis.dataDecision[id].elementDom, "saisie_saisie");
        }

        if (myThis.dataDecision[id].choixPossible.length > 0) {
            let wrapChoix: xxWrapPanel = new xxWrapPanel({});
            myThis.dataDecision[id].choixPossible.forEach((idchoix: string) => {
                let boutonSelection: xxBouton = myThis.dataDecision[idchoix].createButtonChoixPossible(function () {
                    let saisieValide: boolean = true;

                    if (myThis.dataDecision[id].elementDom == null) {
                        if (myThis.dataDecision[id].saisieDemande) {
                            if (myThis.dataDecision[id].saisieObligatoire && myThis.textSaisie == '') {
                                saisieValide = false;
                            }
                            else {
                                if (myThis.textSaisie == '') {
                                    if (myThis.dataDecision[id].valeurSaisieBinding != null) {
                                        myThis.dataDecision[id].valeurSaisieBinding.Value = myThis.dataDecision[id].valeurDefautVariable;
                                    }
                                    myThis.textSaisie = myThis.dataDecision[id].valeurDefautVariable;
                                }
                                myThis.ajouterReponseAideDecision(myThis.textSaisie, id);
                                //myThis.ajouterReponseRecap(textSaisie);
                                myThis.ajoutRecap(id, myThis.textSaisie);
                            }
                        }
                        else {
                            myThis.ajouterReponseAideDecision(myThis.dataDecision[idchoix].libelleSelection, id);
                            //myThis.ajouterReponseRecap(myThis.dataDecision[idchoix].libelleSelection);
                            myThis.ajoutRecap(id, myThis.dataDecision[idchoix].libelleSelection);
                        }
                    }

                    if (saisieValide) {
                        if (myThis.dataDecision[id].action != null) {
                            myThis.dataDecision[id].action();
                        }

                        if (idchoix != "fin") {
                            myThis.renderAideDecision(idchoix);
                        }
                        else {
                            myThis.zoneChoix.asHolder.vider();
                        }
                    }
                    else {
                        xOutils.afficherMessageAlertifyError("Ce champ est obligatoire");
                    }
                });

                if (myThis.dataDecision[id].cacherButtonChoixPossible != null && myThis.dataDecision[id].cacherButtonChoixPossible && !myThis.dataDecision[id].isRempli) //si étape déjà remplie on ne cache pas les boutons
                    myThis.dataDecision[idchoix].setVisibilityButtonChoix(false);

                wrapChoix.append(boutonSelection);
            });
            content.append(wrapChoix, 'saisie_choixEtape');
        }
        else {
            if (myThis.dataDecision[id].action != null) {
                myThis.dataDecision[id].action();
            }
        }

        myThis.zoneChoix.asHolder.vider();
        myThis.zoneChoix.asHolder.append(content);
        myThis.cettePage.zonePrincipale.y.scrollTop = 0;
        myThis.setEtape(myThis.dataDecision[id]);

        if (!myThis.affichageSimpleSansRecap) {
            setTimeout(function () {




                while (myThis.zoneRecapitulatif.y.getElementsByClassName('loading')[0]) {
                    myThis.zoneRecapitulatif.y.getElementsByClassName('loading')[0].classList.remove('loading');
                    console.log("loading");
                }
                while (myThis.zoneRecapitulatif.y.getElementsByClassName('question hide')[0]) {

                    myThis.zoneRecapitulatif.y.getElementsByClassName('question hide')[0].classList.remove('hide'); 
                    console.log("question");
                }

                while (myThis.zoneRecapitulatif.y.getElementsByClassName('saisieObligatoire hide')[0]) {

                    myThis.zoneRecapitulatif.y.getElementsByClassName('saisieObligatoire hide')[0].classList.remove('hide');
                    console.log("saisieObligatoire");
                }

                content.removeClass('hide');
                myThis.cettePage.zonePrincipale.y.scrollTop = myThis.cettePage.zonePrincipale.y.scrollHeight;

            }, Math.random() * 2000);
        }
        else
            content.removeClass('hide');


    }

    //dom
    public ajouterReponseAideDecision(val: string, id: string, sansModifReponse: boolean = false) {
        let myThis: xxAssistantSaisieUtilisateur = this;

        if (!myThis.affichageSimpleSansRecap) {
            let wrapTemp: xxWrapPanel = new xxWrapPanel({ retourALaLigne: false, class: myThis.dataDecision[id].class + "_reponse" });
            wrapTemp.append(new xxLabel({ textVariable: val, class: 'reponse' }));
            if (!sansModifReponse) {
                wrapTemp.append(new xxBouton({
                    titleLocalise: 'Modifier cette réponse',
                    icone: new IconeSvg(enumIconeSvg.modifier),
                    click: (cb) => {
                        this.retourEtapeSelectionner(id);
                    }
                }));
            }
            myThis.zoneRecapitulatif.append(wrapTemp, 'stackReponse');
        }

        myThis.tabHistoCheminValeur.push({ id: id, valeur: val, sansModifReponse });
    }

    public ajouterQuestionAideDecision(val: string, maClass: string, Obligatoire?: boolean) {
        let myThis: xxAssistantSaisieUtilisateur = this;
        if (maClass != "") {
            maClass = maClass + "_question";
        }
        if (!myThis.affichageSimpleSansRecap) {
            let monWrap: xxWrapPanel = new xxWrapPanel({ class: maClass });
            monWrap.append(new xDiv({ class: 'loading' }).asHolder.append(new xxLabel({ textVariable: '' })).append(new xxLabel({ textVariable: '' })).append(new xxLabel({ textVariable: '' })));
            monWrap.append(new xxLabel({ textLocalise: val, class: 'question hide' }));

            if (Obligatoire) {
                monWrap.append(new xxLabel({
                    textVariable: "*",
                    class: "saisieObligatoire hide"
                }));
            }

            myThis.zoneRecapitulatif.append(monWrap, 'stackQuestion');
        }

    }

    //text retourné
    private ajoutRecap(id: string, valeur: string) {
        if (valeur == undefined) {
            valeur = "";
        }

        let myThis: xxAssistantSaisieUtilisateur = this;
        if (myThis.dataDecision[id].withResume) {
            let monResume: string = myThis.dataDecision[id].libelleResumeSpecifique + ": ";
            if (myThis.dataDecision[id].withRetourLigneResume) {
                monResume = monResume + ' \r\n ';
            }

            monResume = monResume + valeur;
            monResume = monResume + " \r\n\r\n ";

            myThis.tabRecap.push({ id: id, valeur: monResume });
        }
    }
    private getRecap() {
        let myThis: xxAssistantSaisieUtilisateur = this;

        let resume: string = "";

        myThis.tabRecap.forEach((value) => {
            resume = resume + value.valeur;
        });

        return resume;
    }
    //private ajouterQuestionRecap(val: string) {
    //    let myThis: xxAssistantSaisieUtilisateur = this;
    //    myThis.textRecap = myThis.textRecap + '*** ' + val;
    //}
    //private ajouterReponseRecap(val: string) {
    //    let myThis: xxAssistantSaisieUtilisateur = this;
    //    myThis.textRecap = myThis.textRecap + ' \r\n ' + val + "\r\n\r\n";
    //}

    public ajouterReponseEtResume(val: string, id: string) {
        let myThis: xxAssistantSaisieUtilisateur = this;
        myThis.ajouterReponseAideDecision(val, id);
        myThis.ajoutRecap(id, val);
        //myThis.ajouterReponseRecap(val);
    }

    public retourEtapeSelectionner(selection: string) {
        let myThis: xxAssistantSaisieUtilisateur = this;
        myThis.tabRecap = [];
        myThis.zoneRecapitulatif.vider();

        let tempTabHistoCheminValeur: { id: string, valeur: string, sansModifReponse: boolean }[] = [];

        let trouver: boolean = false;
        myThis.tabHistoCheminValeur.forEach((etape) => {
            if (etape.id != selection && !trouver) {
                tempTabHistoCheminValeur.push(etape);

                myThis.ajouterQuestionAideDecision(myThis.dataDecision[etape.id].libelleContenu, myThis.dataDecision[etape.id].class);
                myThis.ajouterReponseAideDecision(etape.valeur, etape.id, etape.sansModifReponse);
                if (myThis.dataDecision[etape.id].elementDom == null) {
                    myThis.ajoutRecap(etape.id, etape.valeur);
                    //myThis.ajouterQuestionRecap(myThis.dataDecision[etape.id].libelleContenu);
                    //myThis.ajouterReponseRecap(etape.valeur);
                }
            }
            else {
                if (etape.id == selection) {
                    myThis.renderAideDecision(etape.id);
                    trouver = true;
                }
            }
        });

        myThis.tabHistoCheminValeur = tempTabHistoCheminValeur;
    }

    /** Retourne un récapitulatif final des étapes sous forme de texte. */
    public getRecapitulatif(): string {
        let myThis: xxAssistantSaisieUtilisateur = this;
        //return myThis.textRecap;
        return myThis.getRecap();
    }

    /** Retourne un xelement avec les étapes de l'assistant. */
    public getEtapes(): iXElement {
        let myThis: xxAssistantSaisieUtilisateur = this;
        let sp: xxStackPanel = new xxStackPanel({ class: "xxAssistantUser-etapes", gap: 10 });
        let tabdata: xxAssistantSaisieUtilisateurData[] = DictionnaireUtils.getData<xxAssistantSaisieUtilisateurData>(myThis.dataDecision);
        let index: number = 1;

        if (tabdata.length > 0) {
            myThis.labelTitreEtape = new xxLabel({ textVariable: tabdata[0].libelleContenu, type: enumTypeLabel.soustitre });
            sp.append(myThis.labelTitreEtape);

            myThis.radioButtonEtapes = new xxRadioButton<string>({      
                class: "rb-etapes",
                typeBouton: ETypeBouton.boutonWrapper2,  
                initElements: [],
                valueChange: function (val) {
                    let indexCourant: number = tabdata.indexOf(myThis.dataDecision[val]);

                    for (var i = indexCourant; i < tabdata.length; i++) {
                        tabdata[i].desactiverRadioButton();
                    }

                    myThis.retourEtapeSelectionner(val);
                }
            });

            tabdata.forEach(function (element) {
                myThis.radioButtonEtapes.ajouterItems([element.createItemRadioButton(index)]);
                index++;
            });

            sp.append(myThis.radioButtonEtapes);
        }


        return sp;
    }

    private setEtape(data: xxAssistantSaisieUtilisateurData) {
        let myThis: xxAssistantSaisieUtilisateur = this;

        if (myThis.radioButtonEtapes != null) {
            myThis.radioButtonEtapes.setValue(data.id);
            myThis.labelTitreEtape.changerTextVariable(data.libelleContenu);
            data.activerRadioButton();
        }

    }

    /**
     * Rend visible les boutons des étapes suivantes.
     * @param id
     */
    public showButtonsEtapeSuivante(id: string) {
        let myThis: xxAssistantSaisieUtilisateur = this;

        if (myThis.dataDecision[id].choixPossible != null) {
            myThis.dataDecision[id].isRempli = true; //étape remplie
            myThis.dataDecision[id].choixPossible.forEach(function (idchoix: string) {
                myThis.dataDecision[idchoix].setVisibilityButtonChoix(true);
            });
        }

    }

    /**
     * Rend invisible les boutons des étapes suivantes.
     * @param id
     */
    public hideButtonsEtapeSuivante(id: string) {
        let myThis: xxAssistantSaisieUtilisateur = this;

        if (myThis.dataDecision[id].choixPossible != null) {
            myThis.dataDecision[id].choixPossible.forEach(function (idchoix: string) {
                myThis.dataDecision[idchoix].setVisibilityButtonChoix(false);
            });
        }

    }
}

class xxAssistantSaisieUtilisateurData {
    public id: string;
    public libelleSelection: string;
    public libelleContenu: string;
    public choixPossible: string[];
    public saisieDemande: boolean;
    public elementDom: iXElement;
    public action: () => void;
    public placeHolderVariable: string;
    public valeurDefautVariable: string;
    public valeurSaisieBinding: BindableObject<string>;
    public multiline: boolean;
    public saisieObligatoire: boolean;
    public classPourSaisie: string;
    public class: string;
    private itemRadioButton: itemRadioButton<string>;
    public iconeSelection: Icone;
    private buttonChoixPossible: xxBouton;
    public cacherButtonChoixPossible?: boolean;
    public withResume: boolean;
    public libelleResumeSpecifique: string;
    public withRetourLigneResume: boolean;

    public isRempli: boolean; //Permet de voir si l'étape a déjà été remplie ou pas

    constructor(o: ixxAssistantSaisieUtilisateurData) {
        this.action = o.action;
        this.choixPossible = o.choixPossible;
        this.elementDom = o.elementDom;
        this.id = o.id;
        this.libelleContenu = o.libelleContenu;
        this.libelleSelection = o.libelleSelection;
        this.placeHolderVariable = o?.saisieDemande?.placeHolderVariable;
        this.saisieDemande = (o.saisieDemande != null);
        this.valeurDefautVariable = o?.saisieDemande?.valeurDefautVariable;
        this.valeurSaisieBinding = o?.saisieDemande?.binding;
        this.cacherButtonChoixPossible = o.cacherChoixPossible;

        this.isRempli = false;

        if (o?.saisieDemande?.multiline != null) {
            this.multiline = o.saisieDemande.multiline;
        }
        else {
            this.multiline = true;
        }
        this.saisieObligatoire = false;
        if (o?.saisieDemande?.saisieObligatoire) {
            this.saisieObligatoire = true;
        }
        this.classPourSaisie = o?.saisieDemande?.classSaisie;
        this.class = "";
        if (o.class != null)
            this.class = o.class;
        this.iconeSelection = null;
        if (o.iconeSelection != null)
            this.iconeSelection = o.iconeSelection;
        if (o.resume != null) {
            this.withResume = true;
            this.withRetourLigneResume = o.resume.retourLigne;
            if (o.resume.libelleResume != undefined && o.resume.libelleResume != "") {
                this.libelleResumeSpecifique = o.resume.libelleResume;
            }
            else {
                this.libelleResumeSpecifique = o.libelleContenu;
            }
        }
    }

    public activerRadioButton(): void {
        let myThis: xxAssistantSaisieUtilisateurData = this;
        if (myThis.itemRadioButton != null)
            myThis.itemRadioButton.activer();
    }

    public desactiverRadioButton(): void {
        let myThis: xxAssistantSaisieUtilisateurData = this;
        if (myThis.itemRadioButton != null)
            myThis.itemRadioButton.desactiver();
    }

    public createItemRadioButton(index: number): itemRadioButton<string> {
        let myThis: xxAssistantSaisieUtilisateurData = this;

        myThis.itemRadioButton = new itemRadioButton<string>({
            valeur: myThis.id,
            libelleVariable: index.toString(),
            titleVariable: myThis.libelleContenu,
            preselectionne: index == 1,
            inactif: index != 1,
        });

        return myThis.itemRadioButton;
    }

    public createButtonChoixPossible(click: () => void): xxBouton {
        let myThis: xxAssistantSaisieUtilisateurData = this;

        if (myThis.buttonChoixPossible == null) {
            myThis.buttonChoixPossible = new xxBouton({
                icone: myThis.iconeSelection,
                titleLocalise: myThis.libelleSelection,
                typeBouton: enumTypeBouton.Standard,
                textLocalise: myThis.libelleSelection,
                optionsAffichage: {
                    styleBouton: enumStyleBouton.AvecFond,
                },
                click: function (cb) {
                    click();
                    cb();
                }
            });
        }

        return myThis.buttonChoixPossible;
    }

    public setVisibilityButtonChoix(visible: boolean): void {
        let myThis: xxAssistantSaisieUtilisateurData = this;

        if (myThis.buttonChoixPossible != null) {
            if (visible)
                myThis.buttonChoixPossible.showButton();
            else
                myThis.buttonChoixPossible.hideButton();
        }
    }
}

interface ixxAssistantSaisieUtilisateurData {
    id: string,
    libelleSelection: string,
    iconeSelection?: Icone,
    libelleContenu: string,
    choixPossible: string[],
    saisieDemande?: {
        multiline?: boolean,
        placeHolderVariable?: string,
        valeurDefautVariable?: string,
        binding?: BindableObject<string>,
        saisieObligatoire?: boolean,
        classSaisie?: string
    },
    elementDom?: iXElement,
    action?: () => void,
    class?: string,
    cacherChoixPossible?: boolean,
    resume?: {
        libelleResume?: string,
        retourLigne: boolean,
    }
}