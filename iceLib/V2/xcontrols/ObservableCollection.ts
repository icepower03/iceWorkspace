


class ObservableCollection<T>
{
    private donnees: T[];

    private abonnements: { onAdd: (v: T[]) => void, onDelete: (v: T[]) => void }[];

    public get Length() { return this.donnees.length; }

    public bind(add: (v: T[]) => void, del: (v: T[]) => void): () => void {
        let myThis: ObservableCollection<T> = this;
        let abo = { onAdd: add, onDelete: del };
        myThis.abonnements.push(abo);

        let unbind: () => void;

        unbind = () => { myThis.abonnements.splice(myThis.abonnements.indexOf(abo), 1); };
        return unbind;
    }

    public forEach(fe: (t: T) => void): void {
        let myThis: ObservableCollection<T> = this;
        myThis.donnees.forEach(fe);
    }

    public find(fe: (t: T) => boolean): T {
        let myThis: ObservableCollection<T> = this;
       return myThis.donnees.find(fe);
    }
    public filter(fe: (t: T) => boolean): T[] {
        let myThis: ObservableCollection<T> = this;
       return myThis.donnees.filter(fe)
    }

    public All(): T[] {
        let retour: T[] = [];
        let myThis: ObservableCollection<T> = this;

        myThis.forEach((t: T) => { retour.push(t); });

        return retour;
    }

    public vider(): ObservableCollection<T> {
        let myThis: ObservableCollection<T> = this;

        let supp: T[] = myThis.donnees.splice(0, myThis.donnees.length);

        myThis.abonnements.forEach((abo) => { abo.onDelete(supp); });


        return myThis;
    }
    public constructor(inDonnees?: T[]) {
        this.donnees = [];
        this.abonnements = [];
        if (inDonnees != undefined) {
            this.add(inDonnees);
        }



    }

    public add(inData: T[]): ObservableCollection<T> {
        let myThis: ObservableCollection<T> = this;
        inData.forEach((t: T) => {
            myThis.donnees.push(t);
        });
        myThis.abonnements.forEach((abo) => { abo.onAdd(inData); });

        return myThis;
    }

    public del(delData: T[]): ObservableCollection<T> {
        let myThis: ObservableCollection<T> = this;
        let supp: T[] = [];

        delData.forEach((d) =>
        {
            let index: number = myThis.donnees.indexOf(d);
            if (index >= 0)
            {
                supp.push(d);
                myThis.donnees.splice(index, 1);
            }
        });

        if (supp.length > 0)
        {
            myThis.abonnements.forEach((abo) => {
                abo.onDelete(supp);
                //abo.onDelete(delData);
            });
        }

        return myThis;
    }

    public elementIndex(elem: T): number {
        let myThis: ObservableCollection<T> = this;
        return  myThis.donnees.indexOf(elem);
    }
    public elementSuivant(elem :T): T {
        let myThis: ObservableCollection<T> = this;
        let index = myThis.elementIndex(elem);
        if (index > -1 && index < myThis.donnees.length - 1) {
            return myThis.donnees[index + 1];
        }
        return undefined;
    }
    public elementPrecedent(elem: T): T {
        let myThis: ObservableCollection<T> = this;
        let index = myThis.elementIndex(elem);
        if (index > 0 ) {
            return myThis.donnees[index - 1];
        }
        return undefined;
    }
    public elementAt(position: number) {
        let myThis: ObservableCollection<T> = this;
        if (position > -1 && position < myThis.donnees.length) {
            return myThis.donnees[position];
        }
        return undefined;
    }

}