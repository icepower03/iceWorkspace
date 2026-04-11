interface OptionsChoixOuiNon {
    valeurParDefaut: boolean;
    valueChange: (val: boolean) => void;
    inactif?: boolean;
}

class xxChoixOuiNon implements iXElement {
    private radioOuiNon: xxRadioButton<boolean>;

   

    get y() {
        let myThis: xxChoixOuiNon = this;
        return myThis.radioOuiNon.y;
    }

    public constructor(o: OptionsChoixOuiNon) {
        let myThis: xxChoixOuiNon = this;
        myThis.radioOuiNon = new xxRadioButton<boolean>(
            {
                class: 'xxChoixOuiNon',
                typeOrientation: enumTypeOrientation.horizontal,
                valueChange: (item) => {
                    o.valueChange(item);
                },
                initElements:
                    [
                        { valeur: true, libelleVariable: "Oui", preselectionne: (o.valeurParDefaut) ? true : false },
                        { valeur: false, libelleVariable: "Non", preselectionne: (!o.valeurParDefaut) ? true : false }
                    ],
                readonly: o.inactif != undefined ? o.inactif : false


            })
    }

    public setInactif(inactif: boolean): void {
        this.radioOuiNon.setReadonly(inactif);
    }

}
