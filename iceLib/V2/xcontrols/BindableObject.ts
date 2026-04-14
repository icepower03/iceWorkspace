
export class BindableObject<T>
{
    private _value: T;

    private abonnements: { set: (v: T) => void }[];

    get Value(): T {
        let myThis: BindableObject<T> = this;
        return myThis._value;
    }

    set Value(newVal: T) {
        let myThis: BindableObject<T> = this;
        if (myThis._value != newVal) {
            myThis._value= newVal;
            myThis.abonnements.forEach(function (abo) {
                abo.set(myThis._value);
            });
        }
    }

    public bind(set: (v: T) => void): () => void {
        let myThis: BindableObject<T> = this;
        let abo = { set: set };
        myThis.abonnements.push(abo);

        let unbind: () => void;
        unbind = function () { myThis.abonnements.splice(myThis.abonnements.indexOf(abo), 1); };
        return unbind;
    }

    public constructor(inDonne?: T) {
        let myThis: BindableObject<T> = this;
        if (inDonne == undefined) { inDonne == null; }
        myThis._value = inDonne;
        myThis.abonnements = [];
        myThis.Value = inDonne;
        
    }
}