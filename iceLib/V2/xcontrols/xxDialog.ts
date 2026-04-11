enum enumPositionAlerte {
    bas,
    bas_droite,
    centre,
    haut_droite
}

enum enumTypeAlerte {
    info,
    debug,
    reussite,
    erreur,
    alerte
}

enum enumDialogTypeBouton {
    pasDeBouton,
    validerAnnuler,
    QuitterAnnuler,
    ouiNon,
    infoImportante
}

interface gridOptions {
    rowStart: 0;
    colStart: 0;
    nbRows: 5;
    nbCols: 4;
}
interface xxDialogOption {

    texteLocalise: string;
    titreLocalise?: string;
    xElementDialog?: iXElement;
    dureeAffichageSec?: number;
    //croixFermeture?: boolean;
    dialogType?: enumDialogTypeBouton;
    type: enumTypeAlerte;
    dialogReponse?: (retour: boolean) => void;
    position?: enumPositionAlerte
}

class xxDialog implements iXElement {

    public get y(): HTMLElement {
        return null;
    }


    protected texte: string;
    private titre?: string;
    private dureeAffichageSec?: number;
    private dialogType?: enumDialogTypeBouton = null;
    private type: enumTypeAlerte;
    private position: enumPositionAlerte = enumPositionAlerte.bas;
    private mainGrid: xxGrid;
    protected iconGridItem: xxGridItem;
    protected infoGridItem: xxGridItem;
    protected titreGridItem: xxGridItem;
    protected textGridItem: xxGridItem;
    private xElementDialog?: iXElement = null;
    private idInterval: number;
    static stackPanelxxDialog: xxStackPanel;
    private xDivxxDialog: xDiv;
    private dialogReponse?: (retour: boolean) => void;
    

    constructor(o: xxDialogOption) {
        let myThis: xxDialog = this;
        myThis.texte = o.texteLocalise;
        myThis.dialogReponse = o.dialogReponse;
        if (o.dureeAffichageSec == undefined) {
            myThis.dureeAffichageSec = 4;
        } else {
            if (o.dureeAffichageSec > 10) {
                myThis.dureeAffichageSec = 10;
            } else {
                myThis.dureeAffichageSec = o.dureeAffichageSec;
            }
        }
        myThis.type = o.type;
        myThis.dialogType = o.dialogType;
        myThis.dialogReponse = o.dialogReponse;
        myThis.xElementDialog = o.xElementDialog;

        if (o.position != undefined)
            myThis.position = o.position;
        else
            myThis.position = enumPositionAlerte.bas_droite;

        let classType: string;
        let iconeType: enumIconeSvg;



        switch (myThis.type) {
            case enumTypeAlerte.info:
                if (!o.titreLocalise)
                    myThis.titre = "Information";
                classType = "typeXxDialog_information";
                iconeType = enumIconeSvg.informations;
                break;
            case enumTypeAlerte.debug:
                if (!o.titreLocalise)
                    myThis.titre = "Debug";
                classType = "typeXxDialog_debug";
                iconeType = enumIconeSvg.administration;
                break;
            case enumTypeAlerte.erreur:
                if (!o.titreLocalise)
                    myThis.titre = "Erreur";
                classType = "typeXxDialog_erreur";
                iconeType = enumIconeSvg.alerte;
                break;
            case enumTypeAlerte.reussite:
                if (!o.titreLocalise)
                    myThis.titre = "Validation";
                classType = "typeXxDialog_validation";
                iconeType = enumIconeSvg.valider;
                break;
            case enumTypeAlerte.alerte:
                if (!o.titreLocalise)
                    myThis.titre = "Alerte";
                classType = "typeXxDialog_alerte";
                iconeType = enumIconeSvg.alerte;
                break;
        }

        if (o.titreLocalise)
            myThis.titre = o.titreLocalise;

        myThis.mainGrid = new xxGrid({ class: "xxDialog " + classType, gridGap: "5px 10px", colonnes: ["auto", "1fr", "auto"], fullWidth: false });

        myThis.iconGridItem = new xxGridItem({
            content: new IconeSvg(iconeType, { taille: tailleIcone.L, couleurSvg: { couleurIconeComplete: enumCouleur.emed_blanc } }),
            colStart: 1,
            rowStart: 1,
            nbRows: 4,
            class: "gi_icone",
            optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre }
        });
        myThis.mainGrid.append([myThis.iconGridItem]);

        myThis.infoGridItem = new xxGridItem({
            content: new xxLabel({ textVariable: "" }),
            colStart: 2,
            rowStart: 1,
            nbCols: 2,
            class: "gi_infoPatient"
        });
        myThis.mainGrid.append([myThis.infoGridItem]);

            myThis.mainGrid.append([new xxGridItem({
                content: new xxBouton({
                    titleLocalise: "Fermer",
                    click: (cb) => {
                        myThis.fermer();
                        if (myThis.dialogReponse != null) {
                            myThis.dialogReponse(false);
                        }
                        cb();
                    },
                    icone: new IconeSvg(enumIconeSvg.croix, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_blanc } }),
                    optionsAffichage: {
                        tailleBouton: enumTailleBouton.Fit,
                    }   
                }),
                colStart: 4,
                rowStart: 1,
                nbRows: 3,
                class: "gi_croix",
                optionsAffichage: { alignementContenu: enumAlignementContenu.HautDroite },
            })]);

        myThis.titreGridItem = new xxGridItem({
            content: new xxLabel({ textLocalise: myThis.titre, type: enumTypeLabel.titre }),
            colStart: 2,
            rowStart: 2,
            nbCols: 2,
            class: "gi_titre"
        });
        myThis.mainGrid.append([myThis.titreGridItem]);

        if (myThis.xElementDialog == null) {
            myThis.textGridItem = new xxGridItem({
                content: new xxLabel({ textLocalise: myThis.texte }),
                colStart: 2,
                rowStart: 3,
                nbCols: 2,
                class: "gi_label"
            });
        } else {
            myThis.textGridItem = new xxGridItem({
                content: myThis.xElementDialog,
                colStart: 2,
                rowStart: 3,
                nbCols: 2,
                class: "gi_label"
            });
        }

        

        myThis.mainGrid.append([myThis.textGridItem]);

        if (myThis.dialogType == enumDialogTypeBouton.infoImportante) {
            xStyle.addClass("dialogCentre", myThis.mainGrid);
        }else if (myThis.dialogType != null) {
            xStyle.addClass("dialogCentre", myThis.mainGrid);
            let wrapBouton = new xxWrapPanel({ class: "wrapBouton", gap: 10 });
            let boutonSecondaireTitleLocalise: string;
            let boutonSecondaireTexteLocalise: string;
            let boutonPrimaireTitleLocalise: string;
            let boutonPrimaireTexteLocalise: string;

            switch (myThis.dialogType)
            {
                case enumDialogTypeBouton.ouiNon:
                    boutonPrimaireTexteLocalise = "Oui";
                    boutonPrimaireTitleLocalise = "Confirmer l'action";

                    boutonSecondaireTexteLocalise = "Non";
                    boutonSecondaireTitleLocalise = "Annuler";
                    break;
                case enumDialogTypeBouton.QuitterAnnuler:
                    boutonPrimaireTexteLocalise = "Quitter";
                    boutonPrimaireTitleLocalise = "Quitter";

                    boutonSecondaireTexteLocalise = "Annuler";
                    boutonSecondaireTitleLocalise = "Annuler l'action";
                    break;
                default:
                    boutonPrimaireTexteLocalise = "Valider";
                    boutonPrimaireTitleLocalise = "Valider l'action";

                    boutonSecondaireTexteLocalise = "Annuler";
                    boutonSecondaireTitleLocalise = "Annuler l'action";
                    break;

            }

            wrapBouton.append(new xxBouton({
                class: "boutonSecondaire xxDialog-bouton-annuler",
                titleLocalise: boutonSecondaireTitleLocalise, textLocalise: boutonSecondaireTexteLocalise, click: (cb) => {
                    myThis.fermer();
                    if (myThis.dialogReponse != null) {
                        myThis.dialogReponse(false);
                    }
                    cb();
                },
                optionsAffichage: {
                    couleurBouton: enumCouleurBouton.Blanc,
                }
            }));
            wrapBouton.append(new xxBouton({
                class: "boutonPrimaire xxDialog-bouton-valider",
                titleLocalise: boutonPrimaireTitleLocalise, textLocalise: boutonPrimaireTexteLocalise, click: (cb) => {
                    myThis.fermer();
                    if (myThis.dialogReponse != null) {
                        myThis.dialogReponse(true);
                    }
                    cb();
                },
                optionsAffichage: {
                    styleBouton: enumStyleBouton.AvecFond,
                    couleurBouton: enumCouleurBouton.Blanc
                }
            }));

            myThis.mainGrid.append([new xxGridItem({
                content: wrapBouton,
                colStart: 2,
                rowStart: 4,
                nbCols: 3,
                class: "gi_bouton",
                optionsAffichage: { alignementContenu: enumAlignementContenu.CentreDroite}
            })]);
        }
    }

    private getSP(): xxStackPanel {
        let myThis: xxDialog = this;
        if (xxDialog.stackPanelxxDialog == null) {
            xxDialog.stackPanelxxDialog = new xxStackPanel({ class: "stackPanelxxDialog", gap: 10 });
            if (xOutils.isMobile() == true) {
                xStyle.addClass("dialogMobile", xxDialog.stackPanelxxDialog);
            } else {
                xStyle.addClass("dialogDesktop", xxDialog.stackPanelxxDialog);
            }
            xxDialog.stackPanelxxDialog.addClass("xxdg_position-" + enumPositionAlerte[myThis.position]);
            window.document.body.append(xxDialog.stackPanelxxDialog.y);
        }
        return xxDialog.stackPanelxxDialog;
    }

    public afficher(): void {
        let myThis: xxDialog = this;
        if (myThis.dialogType == null) {
            let notifStackPanel = myThis.getSP();
            notifStackPanel.append(myThis.mainGrid);
            let progressBar = new xxProgressBar({ nbTotalElements: myThis.dureeAffichageSec, valeurDepart: "100%", dureeAnimCSS: myThis.dureeAffichageSec });

            myThis.mainGrid.append([new xxGridItem({
                content: progressBar,
                colStart: 1,
                rowStart: 5,
                nbCols: 4,
                class: "gi_durationBar"
            })]);

            progressBar.setProgression(0);
            setTimeout(function () { myThis.fermer() }, myThis.dureeAffichageSec * 1000);            
            
        } else {
            myThis.xDivxxDialog = new xDiv({ class: "xDivxxDialog" });
            if (xOutils.isMobile() == true)
            {
                xStyle.addClass("dialogMobile", myThis.xDivxxDialog);
            } else
            {
                xStyle.addClass("dialogDesktop", myThis.xDivxxDialog);
            }
            myThis.xDivxxDialog.asHolder.append(myThis.mainGrid);
            window.document.body.append(myThis.xDivxxDialog.y);
        }
    }
    

    public fermer(): void {
        let myThis: xxDialog = this;
        if (myThis.dialogType == null)
        {
            myThis.mainGrid.y.remove();
        } else {
            window.document.body.removeChild(myThis.xDivxxDialog.y);
        }
    }
    
    public static afficherMessageDialog(message: string, type: ETypeAlertify, options?: alertify.IProperties): void {
        if (options == null)
            options = { delay: 4, position: enumPositionAlerte.bas_droite };
            
        if (options.delay == undefined) {
            options.delay = 4;
        }
        if (options?.position == undefined) {
            options.position = enumPositionAlerte.bas_droite;
        }
        switch (type) {
            case ETypeAlertify.error:
                new xxDialog({ texteLocalise: message, type: enumTypeAlerte.erreur, dureeAffichageSec: options.delay, position: options.position }).afficher();
                break;
            case ETypeAlertify.log:
                new xxDialog({ texteLocalise: message, type: enumTypeAlerte.info, dureeAffichageSec: options.delay, position: options.position }).afficher();
                break;
            case ETypeAlertify.success:
                new xxDialog({ texteLocalise: message, type: enumTypeAlerte.reussite, dureeAffichageSec: options.delay, position: options.position }).afficher();
                break;
            case ETypeAlertify.alert:
                new xxDialog({ texteLocalise: message, type: enumTypeAlerte.alerte, dureeAffichageSec: options.delay, position: options.position }).afficher();
                break;
        }
    }
    
    public static afficherMessageDialogLog(message: string) {
        xxDialog.afficherMessageDialog(message, ETypeAlertify.log);
    }
    public static afficherMessageDialogError(message: string) {
        xxDialog.afficherMessageDialog(message, ETypeAlertify.error);
    }
    public static afficherMessageDialogSuccess(message: string)
    {
        xxDialog.afficherMessageDialog(message, ETypeAlertify.success);
    }
    public static afficherMessageDialogAlert(message: string)
    {
        xxDialog.afficherMessageDialog(message, ETypeAlertify.alert);
    }

    public static afficherMessageDialogLocalise(message: string, type: ETypeAlertify, options?: alertify.IProperties): void {
        if (options == null)
            options = { delay: 4, position: enumPositionAlerte.bas_droite };

        if (options.delay == undefined) {
            options.delay = 4;
        }
        xxDialog.afficherMessageDialog(new xLString(message).text, type, options);
    }

    public static afficherMessageDialogLocaliseLog(message: string) {
        xxDialog.afficherMessageDialogLocalise(message, ETypeAlertify.log);
    }
    public static afficherMessageDialogLocaliseError(message: string) {
        xxDialog.afficherMessageDialogLocalise(message, ETypeAlertify.error);
    }
    public static afficherMessageDialogLocaliseSuccess(message: string)
    {
        xxDialog.afficherMessageDialogLocalise(message, ETypeAlertify.success);
    }
    public static afficherMessageDialogLocaliseAlert(message: string)
    {
        xxDialog.afficherMessageDialogLocalise(message, ETypeAlertify.alert);
    }

    public static afficherMessageDialogContent(content: iXElement, type: ETypeAlertify, options?: alertify.IProperties): void {
        switch (type) {
            case ETypeAlertify.error:
                new xxDialog({ texteLocalise: "", xElementDialog: content, type: enumTypeAlerte.erreur, dureeAffichageSec: options.delay, position: options.position }).afficher();
                break;
            case ETypeAlertify.log:
                new xxDialog({ texteLocalise: "", xElementDialog: content, type: enumTypeAlerte.info, dureeAffichageSec: options.delay, position: options.position }).afficher();
                break;
            case ETypeAlertify.success:
                new xxDialog({ texteLocalise: "", xElementDialog: content, type: enumTypeAlerte.reussite, dureeAffichageSec: options.delay, position: options.position }).afficher();
                break;
            case ETypeAlertify.alert:
                new xxDialog({ texteLocalise: "", xElementDialog: content, type: enumTypeAlerte.alerte, dureeAffichageSec: options.delay, position: options.position }).afficher();
                break;
        }
    }

    public static afficherMessageConfirmationLocalise(message: string, afficherOuiNon: boolean, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox/*, bloquerBtnValider: boolean = false, NomDeBoutonCustom?: { ok: string, cancel: string }*/, sansBoutons?: boolean): void {
        xxDialog.afficherMessageConfirmation(new xLString(message).text, afficherOuiNon, delegueReponse, type_messagebox/*, bloquerBtnValider, NomDeBoutonCustom*/, sansBoutons);
    }
    public static afficherMessageConfirmation(message: string, afficherOuiNon: boolean, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox/*, bloquerBtnValider: boolean = false, NomDeBoutonCustom?: { ok: string, cancel: string }*/, sansBoutons?: boolean): void {
        ///<summary>affiche un message pour une confirmation utilisateur</summary>
        if (type_messagebox == undefined) {
            type_messagebox = etype_messagebox.Normal;
        }

        let typeMessageDialog = enumTypeAlerte.info;
        if (type_messagebox == etype_messagebox.Avertissement) {
            typeMessageDialog = enumTypeAlerte.erreur;
        }
        if (sansBoutons)
        {
            new xxDialog({ texteLocalise: message, type: typeMessageDialog, dialogType: enumDialogTypeBouton.pasDeBouton, dialogReponse: delegueReponse }).afficher();
        }
        else if (afficherOuiNon) {
            new xxDialog({ texteLocalise: message, type: typeMessageDialog, dialogType: enumDialogTypeBouton.ouiNon, dialogReponse: delegueReponse }).afficher();
        } else {
            new xxDialog({ texteLocalise: message, type: typeMessageDialog, dialogType: enumDialogTypeBouton.validerAnnuler, dialogReponse: delegueReponse }).afficher();
        }
    };

    public static afficherErreurConfirmation(message: string, delegueReponse: (sucess?: boolean) => void, type_messagebox?: etype_messagebox, sansBoutons?: boolean): void {

        let typeBoutons: enumDialogTypeBouton;

        if (sansBoutons)
            typeBoutons = enumDialogTypeBouton.pasDeBouton
        else
            typeBoutons = enumDialogTypeBouton.infoImportante

        if (type_messagebox == etype_messagebox.Avertissement) {
            new xxDialog({ texteLocalise: message, type: enumTypeAlerte.erreur, dialogType: typeBoutons, dialogReponse: delegueReponse }).afficher()
        } else {
            new xxDialog({ texteLocalise: message, type: enumTypeAlerte.info, dialogType: typeBoutons, dialogReponse: delegueReponse }).afficher()
        }
    };

    public static afficherMessageConfirmationPromise(message: string, afficherOuiNon: boolean, type_messagebox?: etype_messagebox/*, bloquerBtnValider: boolean = false, NomDeBoutonCustom?: { ok: string, cancel: string }*/, sansBoutons?: boolean): Promise<boolean> {
        let myThis = this;
        return new Promise<boolean>(async function (resolve, reject) {
            myThis.afficherMessageConfirmation(message, afficherOuiNon, function (ok) {
                resolve(ok);
            }, type_messagebox/*, bloquerBtnValider, NomDeBoutonCustom*/);
        });
    }
}