// @ts-nocheck
import { iXElement } from '../xBase';
import { xElement } from '../../xElement';
import { xDiv } from './xDiv';
import { xSpan } from './xSpan';
import { xxBouton } from './xxBouton';
import { Icone, IconeP12, enumIconeP12, enumIconeSvg, IconeSvg } from '../xIcones';

interface OptionsInputFile {
    accept?: string;
    capture?: 'user' | 'environment' | '';
    class?: string;
    ValueChange: (val: File, binary: string) => void;
   
    id?: string;
    textLocalise?: string;
    textVariable?: string;
    titleLocalise?: string;
    titleVariable?: string;
    textChangeWhenUpload?: boolean;
    widthMaxForImage?: number;
    iconeAppareilPhoto?: boolean;
}

export class xInputFile implements iXElement {

    private element: xDiv;
    private monFile: xElement;
    private label: HTMLElement;
    private textAAfficher: string;
    private span: xSpan;
    private icone: Icone;

   
    get y() { return this.element.y; }
    public constructor(options: OptionsInputFile) {
        let myThis: xInputFile = this;
        let _valueChange: (f: File, binary: string) => void = options.ValueChange;

        if (options.ValueChange != undefined)
            delete options.ValueChange;

        let LeTitle: string = "";
        if (options.titleLocalise != null && options.titleLocalise != "")
            LeTitle = new xLString(options.titleLocalise).text;
        else if (options.titleVariable != null && options.titleVariable != "")
            LeTitle = options.titleVariable;

        if (options.class == undefined) { options.class = ''; }
        let optionsDiv: OptionsDiv = { class: 'xInputFile ' + options.class, title: LeTitle };

        this.element = new xDiv( optionsDiv);
        delete options.class;
        
       // myThis.monFile = new xElement("input", $.extend(options, { type: "file" }));

        myThis.monFile = new xElement("input", options);
        (<HTMLInputElement>myThis.monFile.y).type = 'file';

        if (options.id != undefined)
            myThis.monFile.y.setAttribute("id", options.id);

        delete options.id;

        if (options?.accept != undefined) {
            (<HTMLInputElement>myThis.monFile.y).accept = options.accept;
        }

        if (options?.capture != undefined) {
            (<any>myThis.monFile.y).capture = options.capture;
        }
       

        let textAAfficher = 'Choisir un fichier';
        if (options.textLocalise != undefined) {
            textAAfficher = new xLString(options.textLocalise).text;
        }
        else {
            if (options.textVariable != undefined) {
                textAAfficher = options.textVariable;
            }
        }

        myThis.textAAfficher = textAAfficher;
        myThis.span = new xSpan({ textVariable: textAAfficher });
        myThis.label = document.createElement("Label");
        
        if (options.iconeAppareilPhoto != null && options.iconeAppareilPhoto)
            myThis.icone = new IconeSvg(enumIconeSvg.appareil_photo);
        else
            myThis.icone = new IconeSvg(enumIconeSvg.upload);
        
        myThis.label.prepend(myThis.monFile.y);
        myThis.label.append(myThis.icone.y);
        myThis.label.append(myThis.span.y);

        this.element.asHolder.y.append(myThis.label);
        

        myThis.monFile.y.onchange= ()=>
        {
            let input: HTMLInputElement = <HTMLInputElement>myThis.monFile.y;
            let fileReader = new FileReader();
            fileReader.readAsDataURL(input.files[0]);  //Fonction en Async, on doit attendre que la récupération se fasse
            fileReader.onloadend =  ()=>  //Correspond au .then() des webservices, permet d'attendre que le fileReader soit chargé, et charge les valeurs pour stringFile
            {
                let type: string = input.files[0].type;
                let stringFiles = fileReader.result.toString().split(",");
                let binary = stringFiles[1];

                //option de réduction d'image activée
                if (type.split('/')[0] == "image" && options.widthMaxForImage != undefined)
                {
                    let img = new Image();
                    img.src = "data:image/png;base64," + binary;

                    img.onload = () =>
                    {
                        if (img.width > options.widthMaxForImage)
                        {

                            let ratio = options.widthMaxForImage / img.width;
                            const elem = document.createElement('canvas');
                            //document.body.appendChild(elem);
                            elem.width = options.widthMaxForImage;
                            elem.height = img.height * ratio;
                            const ctx = elem.getContext('2d');

                            ctx.drawImage(img, 0, 0, options.widthMaxForImage, elem.height);

                            let compression = ctx.canvas.toDataURL("image/png");
                            let monImageCompression = compression.replace(/^data:image\/(png|jpg);base64,/, "")

                            if (options.textChangeWhenUpload == undefined || options.textChangeWhenUpload)
                                myThis.span.y.textContent=input.files[0].name;
                            _valueChange(input.files[0], monImageCompression);
                        }
                        else
                        {
                            _valueChange(input.files[0], stringFiles[1]);
                        }
                    }

                }
                else {
                    if (options.textChangeWhenUpload == undefined || options.textChangeWhenUpload)
                        myThis.span.y.textContent=input.files[0].name;
                    _valueChange(input.files[0], binary);
                }
            };
        };
    }

    public reset(): void {
        let myThis: xInputFile = this;

        if (myThis.monFile != null) {
            let input: HTMLInputElement = <HTMLInputElement>myThis.monFile.y;
            input.value = "";
            myThis.span.y.textContent=myThis.textAAfficher;
        }

    }

    public test(): void {
        let myThis: xInputFile = this;
        
        cacherxElements( myThis.monFile,true);
        myThis.monFile.y.click();
        //myThis.element.x.val("C:\Users\r.pean\Pictures\Document Joint\annulervolet.png";
        //myThis.element.x.change(function () {
        //    _valueChange(inpu)
        //})
    }

    public ModifierPhotoPatient(): void
    {
        let myThis: xInputFile = this;
        cacherxElements(myThis.monFile,true);
        myThis.monFile.y.click();

    }

}