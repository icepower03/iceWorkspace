// @ts-nocheck
import { xDiv } from './xDiv';
import { xImg } from './xImg';
import { xxDockPanelDeprecated, DockPosition } from './xxDockPanel';
﻿export enum enumTypeImage
{
    backgroundImage,
    domImage
}

interface OptionsImageTabByte
{
    class?: string;
    tabByte: string;    //Un tableau de byte sous forme d'une string doit être passé
    typeAffichage: enumTypeImage;       
}
export class xxImageTabByte
{
    private container: xxDockPanelDeprecated;

  
    get y() { return this.container.y }

    constructor(options: OptionsImageTabByte)
    {
        let myThis: xxImageTabByte = this;


        if (options.class == null)
            options.class = "";

        myThis.container = new xxDockPanelDeprecated({
            centrerDernier: true,
            class: "xxImageTabByte " + options.class
        });

        myThis.SetTabByte(options.tabByte, options.typeAffichage);
    }

    // Permet de set ou de reset une image
    public SetTabByte(tabByte: string, typeAffichage: enumTypeImage)
    {
        let myThis: xxImageTabByte = this;

        let image: xImg|xDiv;
        myThis.container.effacer();

        if (typeAffichage == enumTypeImage.domImage)
        {
            image = new xImg(
            {
                src: "data:image/png;base64," + tabByte
            });
        }
        else
        {
            image = new xDiv({});
            image.y.setAttribute('style', "background-image:url(data:image/png;base64," + tabByte + ")");
            image.addClass("backgroundDiv");
        }

        myThis.container.append(image, DockPosition.haut);
    }
}