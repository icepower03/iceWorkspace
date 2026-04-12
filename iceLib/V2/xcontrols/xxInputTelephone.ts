// @ts-nocheck
interface OptionsInputTelephone
{
    valeur?: string;
    valueChange?: (val: string) => void;
    lectureSeule?: boolean;
    class?: string;
}

class xxInputTelephone implements iXElement
{
    private retour: xDiv;
    private valueChange?: (val: string) => void;
    private class: string;

    public get y()
    {
        let myThis: xxInputTelephone = this;
        return myThis.retour.y;
    }

    constructor(o: OptionsInputTelephone)
    {
        let myThis: xxInputTelephone = this;
        myThis.retour = new xDiv({});
        myThis.valueChange = o.valueChange;
        myThis.class = o.class;

        myThis.update(o.lectureSeule, o.valeur);
    }

    public update(lectureSeule: boolean, nouveauNumero: string)
    {
        let myThis: xxInputTelephone = this;
        myThis.retour.asHolder.empty();

        if (nouveauNumero != null)
            nouveauNumero = nouveauNumero.replace(/(.{2})(?!$)/g, "$1 ");

        if (!lectureSeule)
        {
            let labelModifiable: xxLabelModifiable = new xxLabelModifiable({
                class: myThis.class,
                textVariable: nouveauNumero,
                change: (val: string) =>
                {
                    let valid: boolean = true;

                    val = val.replace(/\s/g, '');
                    if (val != "")
                        valid = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(val);
                        
                    if (valid)
                    {
                        myThis.valueChange(val);
                        labelModifiable.setValeur(val.replace(/(.{2})(?!$)/g, "$1 "));
                    }
                    else
                        xOutils.afficherMessageAlertifyLocaliseError("Le format du numéro de téléphone est incorrect.");
                }
            });
            myThis.retour.asHolder.append(labelModifiable);
        }
        else
            myThis.retour.asHolder.append(new xxLabel({
                textVariable: nouveauNumero
            }));
    }
}
