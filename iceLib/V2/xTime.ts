
export class xTime {
    constructor(hr: number, min: number) {
        this.Minutes = min%60;

        this.Heures = hr + Math.floor(min / 60);
    }

    public parse(inStr: string) {
        if (inStr != null) {
            let tab: string[] = inStr.split(':');
            if (tab.length == 2) {
                this.Heures = Number(tab[0]);
                this.Minutes = Number(tab[1]);
            }
        }
    }

  
    private minutes: number;

    get Minutes(): number {
        return this.minutes;
    }

    set Minutes(min: number) {
        if (min < 60 && min >= 0) { this.minutes = min; }
        else { throw ("nb minutes invalide"); }
    }

    private heures: number;

    get Heures(): number {
        return this.heures;
    }

    set Heures(hr: number) {
        if (hr < 24 && hr >= 0) { this.heures = hr; }
        else { throw ("nb heures invalide"); }
    }

    public getString(): string {
        let min: string;
        let hr: string;
        if (this.Minutes >= 10) { min = '' + this.Minutes; }
        else { min = '0' + this.Minutes; } 

        if (this.Heures >= 10) { hr = '' + this.Heures; }
        else { hr = '0' + this.Heures; }

        return hr + ':' + min;
    }

    public get TotalMinutes() {
        return this.Heures * 60 + this.Minutes;
    }

}