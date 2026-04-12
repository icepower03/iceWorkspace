// @ts-nocheck
import { xElement } from '../../xElement';
﻿interface OptionsLecteurAudio
{
    id?: string;
    class?: string;
    audio?: string;
}

export class xxLecteurAudio extends xElement
{

    constructor(o: OptionsLecteurAudio)
    {
        super('audio', {});

        let classLecteur: string = "xxLecteurAudio";
        let myThis: xxLecteurAudio = this;
        myThis.y.setAttribute('src', o.audio);
        myThis.y.setAttribute('controls', "controls");
        myThis.addClass(classLecteur);
    }

    public setAudio(newAudio: string)
    {
        let myThis: xxLecteurAudio = this;

        (<HTMLAudioElement>myThis.y).src = newAudio;
    }

    public hideLecteurAudio(collapse?: boolean): void {
        let myThis: xxLecteurAudio = this;
        cacherxElements(myThis, collapse != undefined ? collapse : false);
    }

    public showLecteurAudio(): void {
        let myThis: xxLecteurAudio = this;
        afficherxElements(myThis);
    }
}