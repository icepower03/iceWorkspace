import { iceDiv } from './iceDiv';
import { iceImg } from './iceImg';
import { ice2DockPanelDeprecated, DockPosition } from './ice2DockPanel';
export enum enumTypeImage
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
export class ice2ImageTabByte
{
    private container: ice2DockPanelDeprecated;

  
    get y() { return this.container.y }

    constructor(options: OptionsImageTabByte)
    {
        let myThis: ice2ImageTabByte = this;


        if (options.class == null)
            options.class = "";

        myThis.container = new ice2DockPanelDeprecated({
            centrerDernier: true,
            class: "ice2ImageTabByte " + options.class
        });

        myThis.SetTabByte(options.tabByte, options.typeAffichage);
    }

    // Permet de set ou de reset une image
    public SetTabByte(tabByte: string, typeAffichage: enumTypeImage)
    {
        let myThis: ice2ImageTabByte = this;

        let image: iceImg|iceDiv;
        myThis.container.effacer();

        if (typeAffichage == enumTypeImage.domImage)
        {
            image = new iceImg(
            {
                src: "data:image/png;base64," + tabByte
            });
        }
        else
        {
            image = new iceDiv({});
            image.y.setAttribute('style', "background-image:url(data:image/png;base64," + tabByte + ")");
            image.addClass("backgroundDiv");
        }

        myThis.container.append(image, DockPosition.haut);
    }
}