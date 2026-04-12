// @ts-nocheck
import { iXElement, enumCouleur } from '../xBase';
import { xxWrapPanel } from './xxWrapPanel';
import { xxLabel } from './xxLabel';
import { xxBouton, enumTailleBouton } from './xxBouton';
import { xxLecteurAudio } from './xxLecteurAudio';
import { enumIconeP12, enumIconeSvg, IconeP12, IconeSvg, tailleIcone, Icone } from '../xIcones';

interface OptionsRecorder
{
    id?: string;
    class?: string;
    valueChange?: (url: string) => void;
}
interface Window
{
    webkitAudioContext: typeof AudioContext
}

export class xxRecorder implements iXElement
{
    private wrap: xxWrapPanel;
 
    public get y() { return this.wrap.y; }

    private leftchannel: Float32Array[] = [];
    private rightchannel: Float32Array[] = [];
    private recorder: ScriptProcessorNode = null;
    private recordingLength = 0;
    private volume = 0;
    private mediaStream: MediaStreamAudioSourceNode = null;
    private sampleRate = 44100;
    private blob: Blob = null;
    private url: string = "";
    private audio: HTMLAudioElement;
    private lecteurAudio: xxLecteurAudio;
    private valueChange: (url: string) => void;
    private temps: number;
    private timerLabel: xxLabel = new xxLabel({ class: "labelTimer" });
    private interval: number;
    private timerIsRunning: boolean;
    private btnPause: xxBouton;
    private alreadyPause: boolean;

    // test
    private mediarecorder: any;
    private audioChunks: any = [];

    constructor(o: OptionsRecorder)
    {
        let myThis: xxRecorder = this;
        myThis.timerIsRunning = false;
        myThis.alreadyPause = false;
        myThis.temps = 0;
        if (o.valueChange != null)
            myThis.valueChange = o.valueChange;
        myThis.wrap = new xxWrapPanel({ class: "xxRecorder" });

        myThis.lecteurAudio = new xxLecteurAudio({});



        let btnEnregistrer: xxBouton = new xxBouton({
            click: async cb =>
            {
                // Initialize recorder
                //n.mediaDevices.getUserMedia = n.mediaDevices.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
                try
                {
                    let mediaDevices = navigator.mediaDevices;

                    if (mediaDevices != null)
                    {
                        let val = await mediaDevices.enumerateDevices();

                        if (val.length > 0)
                        {
                            let value = await mediaDevices.getUserMedia(
                                {
                                    audio: true,
                                    video: false,
                                } as MediaStreamConstraints)

                            //démarrage du timer au clic
                            myThis.temps = 0;
                            myThis.StartTimer();
                            myThis.timerIsRunning = true;
                            myThis.audioChunks = [];

                            // creates the audio context

                            myThis.mediarecorder = new MediaRecorder(value);
                            myThis.mediarecorder.start();


                            myThis.mediarecorder.addEventListener("dataavailable", (event: any) =>
                            {
                                myThis.audioChunks.push(event.data);
                            });

                            myThis.lecteurAudio.hideLecteurAudio(true);
                            btnStop.showButton();
                            myThis.btnPause.showButton();
                            btnEnregistrer.hideButton(true);
                            btnTelecharger.hideButton(true);
                            cb();
                        }
                        else
                            xOutils.afficherMessageAlertifyLocaliseError("Aucun périphérique micro branché");
                    }
                    else
                    {
                        //media device est null sous chrome si on est pas en https.
                        //en bref, le micro fonctionne sous chrome que en https.
                        if (!xOutils.isHttps())
                            xOutils.afficherMessageAlertifyLocaliseError("Votre site doit être en Https pour activer cette fonctionnalité. Veuillez contacter votre administrateur.");
                    }

                } catch (e)
                {
                    xOutils.afficherMessageAlertifyLocaliseError("Une erreur est survenue");
                    let result = e.message; // error under useUnknownInCatchVariables 
                    if (typeof e === "string")
                    {
                        result = e.toUpperCase() // works, `e` narrowed to string
                    } else if (e instanceof Error)
                    {
                        result = e.message;
                    }
                    console.log(result);
                }

                //  cb();
            },
            titleLocalise: "Enregistrer",
            textLocalise: "Enregistrer",
            icone: new IconeP12(enumIconeP12.action_enregistrer_periode)
        })

        myThis.btnPause = new xxBouton({
            optionsAffichage: {
                tailleBouton: enumTailleBouton.Fit,

            },
            click: cb =>
            {
                console.log(myThis.timerIsRunning);
                if (myThis.timerIsRunning)
                {
                    myThis.PauseTimer();
                    myThis.mediarecorder.pause();
                }
                else if (!myThis.timerIsRunning)
                {
                    myThis.ResumeTimer();
                    myThis.mediarecorder.resume();
                }
                cb()
            },
            titleLocalise: "Pause",
            textLocalise: "",
            icone: new IconeSvg(enumIconeSvg.suspendre, { taille: tailleIcone.S, couleurSvg: { couleurIconeComplete: enumCouleur.emed_bleu } })
        })


        let btnStop: xxBouton = new xxBouton({
            click: cb =>
            {
                myThis.timerIsRunning = false;
                myThis.ArreterTimer();
                myThis.btnPause.hideButton(true);
                btnTelecharger.showButton();
                btnEnregistrer.showButton();
                myThis.lecteurAudio.showLecteurAudio();
                // stop recording
                myThis.mediarecorder.addEventListener("stop", () =>
                {
                    myThis.blob = new Blob(myThis.audioChunks);
                    var reader = new FileReader();

                    reader.readAsDataURL(myThis.blob);
                    reader.onloadend = async function ()
                    {
                        var base64data = reader.result;
                        if (myThis.valueChange != null)
                            myThis.valueChange(base64data.toString());
                        myThis.lecteurAudio.setAudio(base64data.toString());
                        cb();
                        btnStop.hideButton(true);
                    }
                });
                myThis.mediarecorder.stop();

            },
            titleLocalise: "Arrêter",
            textLocalise: "Arrêter",
            icone: new IconeP12(enumIconeP12.etat_arrete)
        });

        let btnTelecharger: xxBouton = new xxBouton({
            optionsAffichage: {
                tailleBouton: enumTailleBouton.Fit,

            },
            click: cb =>
            {
                if (myThis.blob == null)
                {
                    cb();
                }

                var url = URL.createObjectURL(myThis.blob);

                var a = document.createElement("a");
                document.body.appendChild(a);
                a.setAttribute("style", "display: none")
                a.href = url;
                a.download = "sample.wav";
                a.click();
                window.URL.revokeObjectURL(url);
                cb();
            },
            titleLocalise: "",
            textLocalise: "",
            icone: new IconeSvg(enumIconeSvg.download)
        });


        myThis.wrap.append(btnEnregistrer);
        myThis.wrap.append(btnStop);
        myThis.wrap.append(myThis.btnPause);
        myThis.wrap.append(myThis.lecteurAudio);
        myThis.wrap.append(btnTelecharger);
        myThis.btnPause.hideButton(true);
        btnStop.hideButton(true);
        btnTelecharger.hideButton(true);
        myThis.lecteurAudio.hideLecteurAudio(true);

    }

    public setAudio(audio: string)
    {
        let myThis: xxRecorder = this;
        myThis.lecteurAudio.setAudio(audio);
    }


    private StartTimer()
    {
        let myThis: xxRecorder = this;
        myThis.timerLabel.showLabel();
        if (!myThis.alreadyPause)
            myThis.timerLabel.changerTextVariable("00 : 00");

        myThis.interval = setInterval(() =>
        {
            let minutes: number = myThis.temps / 60;
            minutes = Math.floor(minutes);
            let secondes: number = myThis.temps % 60 + 1;

            myThis.timerLabel.changerTextVariable((minutes < 10 ? "0" : "") + minutes + " : " + (secondes < 10 ? "0" : "") + secondes);
            myThis.temps++;
        }, 1000)
        myThis.wrap.append(myThis.timerLabel);
    }

    private ArreterTimer()
    {
        let myThis: xxRecorder = this;
        clearInterval(myThis.interval);
        myThis.timerLabel.changerTextVariable("00 : 00");
        myThis.btnPause.setIcone(new IconeSvg(enumIconeSvg.suspendre, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_bleu } }));
        myThis.timerLabel.hideLabel(true);
    }

    private PauseTimer()
    {
        let myThis: xxRecorder = this;
        myThis.alreadyPause = true;
        myThis.timerIsRunning = false;
        clearInterval(myThis.interval);
        myThis.btnPause.setIcone(new IconeSvg(enumIconeSvg.reprendre, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_vert } }));
        myThis.timerLabel.addClass("pause");

    }

    private ResumeTimer()
    {
        let myThis: xxRecorder = this;

        myThis.timerIsRunning = true;
        myThis.StartTimer();
        myThis.btnPause.setIcone(new IconeSvg(enumIconeSvg.suspendre, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_bleu } }));
        myThis.timerLabel.removeClass("pause");
    }
}