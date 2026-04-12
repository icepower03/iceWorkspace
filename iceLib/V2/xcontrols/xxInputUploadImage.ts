// @ts-nocheck
import { xInputFile } from './xInputFile';
﻿

interface OptionsUploadImage extends OptionsHtml {
    //accept?: string;
    ValueChange: (fichierbase64: string) => void;
    appareilPhoto?: 'selfie' | 'appareil' | 'nimporteQuelObjectif';
    textVariable?: string;
    textLocalise?: string;
    widthMax?: number;
}

export class xxInputUploadImage extends xInputFile {
    constructor(o: OptionsUploadImage) {
        let capture: 'user' | 'environment' | '' = null;
        if (o.appareilPhoto != null) {
            switch (o.appareilPhoto) {
                case "selfie":
                    capture = 'user';
                    break;
                case "appareil":
                    capture = 'environment'
                    break;
                case "nimporteQuelObjectif":
                    capture = '';
                    break;
            }
        }
        if (o.textLocalise == undefined && o.textVariable == undefined) {
            o.textLocalise = 'Capture';
        }

        super({
            iconeAppareilPhoto:true,
            textVariable: o.textVariable,
            textLocalise: o.textLocalise,
            accept: 'image/*',
            widthMaxForImage: o.widthMax,
            ValueChange: (f, binary) =>
            {
                console.log(f);
                o.ValueChange(binary);
            },
            capture: capture,
            class:"xxInputUploadImage"
        });
    }
}