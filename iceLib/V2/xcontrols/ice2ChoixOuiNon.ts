// @ts-nocheck
import { iXElement, enumTypeOrientation } from '../iceBase';
import { ice2RadioButton } from './ice2RadioButton';

interface OptionsChoixOuiNon {
    valeurParDefaut: boolean;
    valueChange: (val: boolean) => void;
    inactif?: boolean;
}

export class ice2ChoixOuiNon implements iXElement {
    private radioOuiNon: ice2RadioButton<boolean>;

   

    get y() {
        let myThis: ice2ChoixOuiNon = this;
        return myThis.radioOuiNon.y;
    }

    public constructor(o: OptionsChoixOuiNon) {
        let myThis: ice2ChoixOuiNon = this;
        myThis.radioOuiNon = new ice2RadioButton<boolean>(
            {
                class: 'ice2ChoixOuiNon',
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