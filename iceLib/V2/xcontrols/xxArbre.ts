// @ts-nocheck
import { iXElement, iXElementHolder } from '../xBase';
import { ObservableCollection } from './ObservableCollection';
import { xDiv } from './xDiv';
import { xxListeDeroulante } from './xxListeDeroulante';
import { xxZoneRepliable, enumXxZoneRepliablePosition } from './xxZoneRepliable';
import { xxLabel } from './xxLabel';

interface IOptionsxxArbre<T>
{
    donnees: ObservableCollection<T>;
    getEnfants: (t: T) => T[];
    getPere: (t: T) => T;
    valueChange: (t: T) => void;
    renderDetail: (t: T, place: iXElementHolder, selecteur: (t: T) => void) => void;
    renderTitre: (t: T, place: iXElementHolder, selecteur: (t: T) => void) => void;
    renderSelected: (t: T, place: iXElementHolder, openSelect: (itemSelectionne: T) => void) => void;
    defaultvalue: T;
    renderEndList: (place: iXElementHolder, liste: xxListeDeroulante<T>) => void;
}

export class xxArbre<T> implements iXElement
{
    private div: xDiv;
    private donnees: ObservableCollection<T>;
    private getEnfants: (t: T) => T[];
  
    public get y()
    {
        return this.div.y;
    }
    constructor(o: IOptionsxxArbre<T>)
    {
        let myThis: xxArbre<T> = this;
        myThis.div = new xDiv({});
        myThis.donnees = o.donnees;
        myThis.getEnfants = o.getEnfants;
        myThis.div.asHolder.append(new xxListeDeroulante<T>({
            donnees: myThis.donnees.All(),
            renderSelected: async (ren, cetItem, os) =>
            {
                o.renderSelected(cetItem, ren, os);
            },
            renderSelectItem: async (ren, cetItem, select) =>
            {
                if (o.getPere(cetItem) == null)
                {
                    ren.append(new xxZoneRepliable({
                        class: "parent",
                        renderDetail: (ici) =>
                        {
                            let enfantItem = o.getEnfants(cetItem);
                            if (enfantItem.length > 0 && enfantItem != null)
                            {
                                myThis.RenderEnfants(enfantItem, null, select, ici, o.renderDetail, o.renderTitre, 1);
                            }
                            else
                                ici.append(new xxLabel({ textLocalise: "aucun enfant" }))
                        },
                        renderTitre: (ici) =>
                        {
                            o.renderTitre(cetItem, ici, select)
                        },
                        plie: true,
                        fullTitleToggle: true,
                        flechePosition: enumXxZoneRepliablePosition.droite,
                    }));
                }
            },
            defaultValue: o.defaultvalue,
            selected: async va =>
            {
                o.valueChange(va);
            },
            renderEndList: (ici, liste) =>
            {
                o.renderEndList(ici, liste);
            }
        }))
    }
    private RenderEnfants(enfantsOriginaux: T[], parent: T, select: (t: T) => void, ici: iXElementHolder, renderDetail: (t: T, place: iXElementHolder, selecteur: (t: T) => void) => void, renderTitre: (t: T, place: iXElementHolder, selecteur: (t: T) => void) => void, niveau: number)
    {
        let myThis: xxArbre<T> = this;
        if (parent != null)
        {
            let css = "niveau";
            if (niveau % 2 == 0)
                css += "pair"
            else
                css += "impair"
            if (enfantsOriginaux != null && enfantsOriginaux.length > 0)
                ici.append(new xxZoneRepliable({
                    class: css,
                    renderDetail: (place) =>
                    {
                        enfantsOriginaux.forEach(e =>
                        {
                            let enfants = myThis.getEnfants(e);
                            if (enfants != null && enfants.length > 0)
                                myThis.RenderEnfants(enfants, e, select, place, renderDetail, renderTitre, niveau + 1)
                            else
                                renderDetail(e, place, select);
                        })
                    },
                    renderTitre: (place) =>
                    {
                        renderTitre(parent, place, select)
                    },
                    plie: true,
                    fullTitleToggle: true,
                    flechePosition: enumXxZoneRepliablePosition.droite,
                }))
            else
            {
                renderDetail(parent, ici, select);
            }
        }
        else
        {
            enfantsOriginaux.forEach(enfant =>
            {
                let enfantsSecond = myThis.getEnfants(enfant);
                let css = "niveau";
                if (niveau % 2 == 0)
                    css += "pair"
                else
                    css += "impair"
                if (enfantsSecond != null && enfantsSecond.length > 0)
                    ici.append(new xxZoneRepliable({
                        class: css,
                        renderDetail: (place) =>
                        {
                            enfantsSecond?.forEach(e =>
                            {
                                let enfants = myThis.getEnfants(e);
                                if (enfants != null && enfants.length > 0)
                                    myThis.RenderEnfants(enfants, e, select, place, renderDetail, renderTitre, niveau + 1)
                                else
                                    renderDetail(e, place, select);
                            })
                        },
                        renderTitre: (place) =>
                        {
                            renderTitre(enfant, place, select)
                        },
                        plie: true,
                        fullTitleToggle: true,
                        flechePosition: enumXxZoneRepliablePosition.droite,
                    }))
                else
                {
                    renderDetail(enfant, ici, select);
                }
            })

        }
    }
}