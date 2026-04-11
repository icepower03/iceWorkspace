interface OptionsListeDeroulanteSimpleNePlusUtiliser<T> {
    defaultKeyValue: string;
    //liste des données à afficher
    donnees: T[];
//    defaultLibelle?: string;
    asyncLoading?: () => Promise<T[]>;
 //   iconeDefaut?: Icone;
    //permet de définir comment afficher l'élément sélectionné et comment déclencher la sélection
    //renderSelectItem: (p: JQuery, item: CleValeur<string, string>, selecteur: (a: CleValeur<string, string>) => void) => void;
    //permet de définir l'affichage des éléments à choisir
    //renderSelected: (p: JQuery, item: CleValeur<string, string>, openSelect: (typeSelection: enumConteneurListeDeroulante, itemSelectionne: CleValeur<string, string>) => void, data: CleValeur<string, string>[]) => void;
    selected: (cle: T) => void;

    getKey: (item: T) => string;
    getLibelle: (item: T) => string;
    getIcone?: (item: T) => Icone;

    class?: string;

}
 /** @deprecated Ne sert que pour rétrocompatibilité, ne pas utiliser*/
class xxListeDeroulanteSimpleNePlusUtiliser<T> extends xxListeDeroulante<T>
{/** @deprecated Ne sert que pour rétrocompatibilité, ne pas utiliser*/
    constructor(inOpt: OptionsListeDeroulanteSimpleNePlusUtiliser<T>) {
        if (inOpt.getIcone == undefined) {
            inOpt.getIcone = function (a:T) { return undefined; }}


        let options: OptionsListeDeroulante<T> =
            {
                defaultValue: null, 
                asyncLoading: inOpt.asyncLoading,
                renderSelected: function (p: iXElementHolder, item: T,
                    openSelect: (itemSelectionne: T) => void,
                    data: T[]) {

                        if (item == null && inOpt.defaultKeyValue!=null) {
                            let rech: T[] = data.filter(function (a) { return inOpt.getKey(a) == inOpt.defaultKeyValue });
                            item = rech[0];
                        }

                        let libelle: string = 'Aucun';

                        libelle = inOpt.getLibelle(item); 
                        let classeIcone: string = "";
                        if (inOpt.getIcone(item) != undefined) {
                            classeIcone = "withIcone";
                        }

                    p.addClass("itemxxListeDeroulanteSimple").addClass(classeIcone);
                    if (inOpt.getIcone != undefined && inOpt.getIcone(item) != undefined)
                    {
                        p.append(inOpt.getIcone(item));
                    }
                      
                        p.append(new xxBouton({
                            textVariable: libelle,
                            icone: new IconeSvg(enumIconeSvg.chevron_bas, { couleurSvg: { couleurIconeComplete: enumCouleur.emed_grisfonce } }),
                            optionsAffichage: { tailleBouton: enumTailleBouton.XS, positionIconeBouton: enumPosition.Right },
                            click: function (cb) { cb(); openSelect(item); },
                            titleLocalise: 'Choisir un élément'
                        }));
                },
                renderSelectItem: function (p: iXElementHolder, item: T, selecteur: (a: T) => void){
                    p.append(new xxBouton({
                        textVariable: inOpt.getLibelle(item),
                        icone: inOpt.getIcone(item),
                        optionsAffichage: { tailleBouton: enumTailleBouton.XS },
                        click: function (cb) { cb(); selecteur(item); },
                        titleLocalise: 'Choisir un élément'
                    }));
                },
                class: inOpt.class,
                donnees: inOpt.donnees,
                selected: function (item: T) {
                        inOpt.selected(item);
                }
            }
        super(options);

    }
}