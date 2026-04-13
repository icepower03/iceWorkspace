// @ts-nocheck
import { iXElement, enumVisibility } from '../iceBase';
import { BindableObject } from './BindableObject';
import { iceCanvas } from './iceCanvas';

interface optionsQrCodeBasics {
    autosize?: boolean;
    id?: string;
    class?: string;
    onError?: (err:any) => void
}

interface optionsQrCodeChange extends optionsQrCodeBasics {
    onDetect: (s: string) => void;
}

interface optionsQrCodeReaderBinding extends optionsQrCodeBasics{
    binding: {
        value?: BindableObject<string>;
        visibility?: BindableObject<enumVisibility>
    }
}


declare function jsQR(data: Uint8ClampedArray, width: number, height: number, providedOptions?: any): any | null;
export class ice2QrCodeReader implements iXElement {
    myCanvas: iceCanvas;
    canvasElement: HTMLCanvasElement;
    canvas2D: CanvasRenderingContext2D;
    video: HTMLVideoElement;
    autosize: boolean = false;
    qrcode :BindableObject<string>;

    onchange: (s: string) => void;
    onError: (err:any) => void;


    constructor(o: optionsQrCodeReaderBinding|optionsQrCodeChange) {
        let myThis: ice2QrCodeReader = this;

        if (o.autosize != undefined) {
            myThis.autosize = o.autosize;
        }
        
        if (!myThis.isBindingOptions(o)) {


            myThis.qrcode = new BindableObject<string>();
            myThis.onchange = o.onDetect;
            myThis.qrcode.bind((s) => { myThis.onchange(s); });

        }
        else {
            if (o.binding.value != undefined)
                myThis.qrcode = o.binding.value;
            if (o.binding.visibility != undefined) {
                o.binding.visibility.bind((s) => {
                    switch (s) {
                        case enumVisibility.afficher:
                            affichericeElements(myThis.myCanvas);
                            break;
                        case enumVisibility.masquer:
                            cachericeElements(myThis.myCanvas, false);
                            break;
                        case enumVisibility.masquerAvecCollapse:
                            cachericeElements(myThis.myCanvas, true);
                            break;
                    }
                })
            }
        }

        if (o.onError != undefined) {
            myThis.onError = (err: any) => {
                o.onError(err);
            };
        }
        else {
            myThis.onError = (err) => {
                console.log(err);
                iceOutils.afficherMessageAlertifyLocaliseError('Appareil non disponible');
            };
        }

        myThis.myCanvas = new iceCanvas({class:"ice2QrCodeReader "+o.class,id:o.id});
        myThis.canvasElement = <HTMLCanvasElement>myThis.myCanvas.y;
        myThis.canvas2D = myThis.canvasElement.getContext("2d");


    }

    private isBindingOptions(obj: optionsQrCodeReaderBinding | optionsQrCodeChange): obj is optionsQrCodeReaderBinding {
        return (<optionsQrCodeReaderBinding>obj).binding !== undefined;
    }

    private  drawLine(begin: any, end: any, color: any) {
        let myThis: ice2QrCodeReader = this;
        myThis.canvas2D.beginPath();
        myThis.canvas2D.moveTo(begin.x, begin.y);
        myThis.canvas2D.lineTo(end.x, end.y);
        myThis.canvas2D.lineWidth = 4;
        myThis.canvas2D.strokeStyle = color;
        myThis.canvas2D.stroke();
    }

    public stop() {
        let myThis: ice2QrCodeReader = this;
        myThis.video.pause();
    }

    public start() {
        let myThis: ice2QrCodeReader = this;
        if (myThis.video == null)
        {
         myThis.video = document.createElement("video");
        }
        if (myThis.video != null) {
            iceOutils.afficherMessageAlertifyLocaliseLog('démarrage');

            if (myThis.video.srcObject == null) {
                // Use facingMode: environment to attemt to get the front camera on phones
                navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
                    .then(function (stream) {
                        myThis.video.srcObject = stream;
                        myThis.video.setAttribute("playsinline", 'true'); // required to tell iOS safari we don't want fullscreen
                        myThis.video.play();
                        requestAnimationFrame(() => { myThis.tick(); });

                    })
                    .catch((err) => { myThis.onError(err); });
            }
            else {
                //attention ne peut pas etre factorise avec le bloc précédent car celui la est synchrone et l'autre est dans une promesse
                myThis.video.play();
                requestAnimationFrame(() => { myThis.tick(); });
            }
        }
        else {

            iceOutils.afficherMessageAlertifyLocaliseError('Vidéo non disponible');
        }
       
    
    }


     private tick() {
         let myThis: ice2QrCodeReader = this;
         if (myThis.video.readyState === myThis.video.HAVE_ENOUGH_DATA) {
             if (myThis.autosize) {
                 myThis.canvasElement.width = myThis.video.videoWidth;
                 myThis.canvasElement.height = myThis.video.videoHeight;
             }

          

    
             myThis.canvas2D.drawImage(myThis.video, 0, 0, myThis.canvasElement.width, myThis.canvasElement.height);
             let imageData = myThis.canvas2D.getImageData(0, 0, myThis.canvasElement.width, myThis.canvasElement.height);
             let code:any = jsQR(imageData.data, imageData.width, imageData.height, {
                 inversionAttempts: "dontInvert",
             });

         

             if (code) {

          
            myThis.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#16e067");
            myThis.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#16e067");
            myThis.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#16e067");
            myThis.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#16e067");

            myThis.qrcode.Value = code.data;
          
        } else {
            //   iceOutils.afficherMessageAlertifyError('erreur');
        }
         }
         if (!myThis.video.paused) {
             requestAnimationFrame(() => { myThis.tick(); });
         }
}

 
    public get y() {
        let mythis: ice2QrCodeReader = this;
        return mythis.myCanvas.y;
    }

}