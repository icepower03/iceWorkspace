import { iXElement } from '../iceBase';
import { iceDiv } from '../xcontrols/iceDiv';
import { DateSerialisable } from '../utils/DateSerialisableExtend';
import { ice2StackPanel } from '../xcontrols/ice2StackPanel';
import { PlanningRdv } from './PlanningElements';
import { ice2Grid } from '../xcontrols/ice2Grid';
import { ice2ToolTip } from '../xcontrols/ice2ToolTip';
import { ice2Label } from '../xcontrols/ice2Label';
import { ice2WrapPanel } from '../xcontrols/ice2WrapPanel';
import { ice2LabelContainer, enumPositionDuContenu } from '../xcontrols/ice2LabelContainer';
export class CelluleMoisJour implements iXElement
{
    private _div: iceDiv;
    private _dateJour: DateSerialisable;
    private _stackRdvs: ice2StackPanel;
    private _rdvs: PlanningRdv[];
    private _renderRdv: (rdv: PlanningRdv) => ice2Grid | ice2ToolTip | ice2Label | ice2WrapPanel | ice2StackPanel |iceDiv;

    constructor(clickSurJour: (date: DateSerialisable) => void, dateCellule: DateSerialisable, RenderRdv: (rdv: PlanningRdv) => ice2Grid | ice2ToolTip | ice2Label | ice2WrapPanel | ice2StackPanel|iceDiv)
    {
        let myThis: CelluleMoisJour = this;
        myThis._dateJour = dateCellule;
        myThis._rdvs = [];
        myThis._renderRdv = RenderRdv;

        if (clickSurJour != null)
        {
            myThis._div = new iceDiv({
                id: "divToDay",
                click: () => clickSurJour(myThis._dateJour)
            });
        }
        else
        {
            myThis._div = new iceDiv({ id: "NoClick" });
        }

        myThis._stackRdvs = new ice2StackPanel({ espaceMinimaliste: true });

        let intituleJourMois: string;
        let premierDuMois: string = "";
        if (DateSerialisable.getDate(myThis._dateJour).getDate() == 1)
            premierDuMois = "er";
        else
            premierDuMois = "";

        intituleJourMois = DateSerialisable.getDate(myThis._dateJour).getDate().toString() + premierDuMois + " " + DateSerialisable.getDate(myThis._dateJour).getMonthName().toString();
        intituleJourMois = intituleJourMois.toLowerCase();

        let labelContainerToDay = new ice2LabelContainer({
            textVariable: intituleJourMois,
            initContent: myThis._stackRdvs,
            optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
            class: "labelContainerAujourdhui"
        });

        myThis._div.asHolder.append(labelContainerToDay);
    }

  
    public get y()
    {
        return this._div.y;
    }

    public supprimerAllRdvs()
    {
        let myThis: CelluleMoisJour = this;
        myThis._rdvs = [];
        myThis._stackRdvs.vider();
    }

    public isDate(maDate: DateSerialisable): boolean
    {
        let myThis: CelluleMoisJour = this;
        maDate = DateSerialisable.DateWithoutTime(maDate);

        return myThis._dateJour.MaDateLong == maDate.MaDateLong;
    }

    public AjouterRdvs(rdvs: PlanningRdv[])
    {
        let myThis: CelluleMoisJour = this;
        myThis._rdvs = myThis._rdvs.concat(rdvs);

        rdvs.forEach(function (r)
        {
            let elementDom = myThis._renderRdv(r);
            r.Item = elementDom;
            myThis._stackRdvs.append(r.Item);
        });
    }

    public SupprimerRdvs(rdvs: PlanningRdv[])
    {
        let myThis: CelluleMoisJour = this;
        let rdvsAsuppr: PlanningRdv[] = rdvs.slice();

        rdvsAsuppr.forEach(function (r)
        {
            let index: number = myThis._rdvs.indexOf(r);
            myThis._rdvs.splice(index, 1);
            r.Item.y.remove();
        });
    }

    public GetAllRendezVous(): PlanningRdv[]
    {
        let myThis: CelluleMoisJour = this;
        return myThis._rdvs;
    }
}
