

interface SpeechRecognition extends EventTarget {
//    grammars: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    serviceURI: string;

    start(): void;
    stop(): void;
    abort(): void;

    onaudiostart: (ev: Event) => any;
    onsoundstart: (ev: Event) => any;
    onspeechstart: (ev: Event) => any;
    onspeechend: (ev: Event) => any;
    onsoundend: (ev: Event) => any;
    onaudioend: (ev: Event) => any;
   /* onresult: (ev: any) => any;
    onnomatch: (ev: any) => any;
    onerror: (ev: any) => any;*/
    onstart: (ev: Event) => any;
    onend: (ev: Event) => any;
}
interface SpeechRecognitionStatic {
    prototype: SpeechRecognition;
    new(): SpeechRecognition;
}
declare var SpeechRecognition: SpeechRecognitionStatic;
declare var webkitSpeechRecognition: SpeechRecognitionStatic;

interface SpeechGrammar {
    src: string;
    weight: number;
}
interface SpeechGrammarStatic {
    prototype: SpeechGrammar;
    new(): SpeechGrammar;
}
declare var SpeechGrammar: SpeechGrammarStatic;
declare var webkitSpeechGrammar: SpeechGrammarStatic;

interface SpeechGrammarListStatic {
    prototype: SpeechGrammarListStatic;
    new(): SpeechGrammarListStatic;
}
//declare var SpeechGrammarList: any;
declare var webkitSpeechGrammarList: SpeechGrammarListStatic;

class xxInputSpeech implements iXElement 
{
    private elementPrincipal: xDiv;

    private xInput: xInputText;

    constructor(options: OptionsInput)

    {
        this.elementPrincipal = new xDiv({
            class: "xxInputSpeech " + (options.class ?? ''),
            id: options.id
        });

        delete options.class;
        delete options.id;

      this.xInput  = new xInputText(options);
      this.xInput.addClass("texteInputSpeech");

        let myThis: xxInputSpeech = this;
        // let xInputPourcent: xxLabel = new xxLabel({textVariable:"%"});
        this.elementPrincipal.asHolder.append(this.xInput);
        this.elementPrincipal.asHolder.append(new xxBouton({
            class: "boutonInputSpeech",
            optionsAffichage: { tailleBouton: enumTailleBouton.XS },
            titleLocalise: "Start",
            textLocalise:"",
            click: function (cb)
            {
                var SpeechRecognition:any = SpeechRecognition || webkitSpeechRecognition;
                let recognition: any = new SpeechRecognition();
                recognition.continuous = true;
                recognition.lang = "fr-FR";

                recognition.onresult = function (event:any)
                {
                    for (var i = event.resultIndex; i < event.results.length; i++)
                    {
                        myThis.xInput.setValueFireEvent(event.results[i][0].transcript);
                        
                     //   xInputPourcent.changerTextVariable(Math.round(event.results[i][0].confidence * 100) + " %");
                    }
                }

                recognition.start();
                cb();
            }
        }));
        //this.elementPrincipal.append(xInputPourcent);
    }

 
    public get y() { return this.elementPrincipal.y; }


    public setValue(texte: string): void {// marche pas 
        let myThis: xxInputSpeech = this;
        myThis.xInput.setValue(texte);
    }
    
}