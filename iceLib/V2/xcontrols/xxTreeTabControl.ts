
interface OptionsTreeTabControl {
    id?: string;
    class?: string;
    typeOrientation?: enumTypeOrientation;
    textLocalise?: string;
    textVariable?: string;
    onglets: (OptionsTreeTabControl | OptionsTabItem)[];
    withDefault?: boolean;
    favoriteGlobalKey?: {
        key: string;
        cdperso: string;
    };
    favoriteAutoSave?: boolean;
    color?: string;
    modeNavigation?: boolean;
    addContentTreeTabControl?: xxTreeTabControl;
    postZoneAligneeADroite?: boolean;

}

class xxTreeTabControl implements iXElement  {
   
    public get y() { return this.TabControlPrincipal.y; }
    private favoriteGlobalKey?: string;
    private TabControlPrincipal: xxTabControl;
    private modeNavigation?: boolean;
    
    public appendPreZoneTab(i: iXElement): xxTreeTabControl {
        let myThis: xxTreeTabControl = this;
        myThis.TabControlPrincipal.appendPreZoneTab(i);
        return myThis;
    }

    public appendPostZoneTab(i: iXElement): xxTreeTabControl {
        let myThis: xxTreeTabControl = this;
        myThis.TabControlPrincipal.appendPostZoneTab(i);
        return myThis;
    }

    public ajouterOnglet(op: OptionsTabItem) {
        let myThis: xxTreeTabControl = this;
        myThis.TabControlPrincipal.ajouterOnglet(op);
    }

    public ajouterGroupeOnglets(op: OptionsTreeTabControl) :xxTreeTabControl {
        let myThis: xxTreeTabControl = this;
        op.modeNavigation = myThis.modeNavigation;
        
        let newOptions: OptionsTreeTabControl = op;
        
        if (op.favoriteGlobalKey != undefined)
            newOptions.favoriteGlobalKey.key = myThis.favoriteGlobalKey + op.favoriteGlobalKey.cdperso + '_' + op.favoriteGlobalKey.key;

        newOptions.withDefault = op.withDefault;

        myThis.TabControlPrincipal.ajouterOnglet({
            textVariable: op.textVariable,
            textLocalise: op.textLocalise,            
            class: op.class,
            id: op.id,
            color: op.color,
            decorateur: true,
            favoriteTabKey: op.favoriteGlobalKey != undefined ? op.favoriteGlobalKey.key : undefined, // op
            
            addContent: function (ici: xElementHolder) {
                let newTab: xxTreeTabControl;
                if (newOptions.addContentTreeTabControl != undefined) {
                    newOptions.addContentTreeTabControl.favoriteGlobalKey = newOptions.favoriteGlobalKey.key;
                    newOptions.addContentTreeTabControl.modeNavigation = myThis.modeNavigation;
                    newTab = newOptions.addContentTreeTabControl;
                }
                else
                    newTab = new xxTreeTabControl(newOptions);
                ici.append(newTab);
            },
            onSelect: function () {
                // selectionner et recharger le premier sous-onglet ou le favori
                if (newOptions.addContentTreeTabControl != undefined) {
                    let tabItems: xxTabItem[] = newOptions.addContentTreeTabControl.TabControlPrincipal.tabItems.filter(e => e.id == newOptions.addContentTreeTabControl.TabControlPrincipal.CurrentFavoriteTabKey);
                    if (tabItems.length > 0) {
                        newOptions.addContentTreeTabControl.TabControlPrincipal.selectTabItem(tabItems[0], true);
                    } else {
                        newOptions.addContentTreeTabControl.TabControlPrincipal.selectTabItem(newOptions.addContentTreeTabControl.TabControlPrincipal.tabItems[0], true);
                    }
                  
                }
            }

        });

        return myThis;
    }

    public selectTabItem(itemId: string, avecRechargement: boolean): boolean {
        let myThis: xxTreeTabControl = this;
        let tabItems: xxTabItem[] = myThis.TabControlPrincipal.tabItems.filter(e => e.id == itemId);
        if (tabItems.length > 0) {
            // selectionner l'onglet du TabControl
            myThis.TabControlPrincipal.selectTabItem(tabItems[0], avecRechargement);
            return true;
        }
        return false;
    }

    public setTabItemHasContenu(itemId: string, hasContenu: boolean): void {
        let myThis: xxTreeTabControl = this;
        let tabItems: xxTabItem[] = myThis.TabControlPrincipal.tabItems.filter(e => e.id == itemId);
        if (tabItems.length > 0) {
            // signaler à l'onglet du TabControl
            myThis.TabControlPrincipal.setTabItemHasContenu(itemId, hasContenu);
        }
    }

    public afficherTabItem(itemId: string, bShow: boolean): boolean {
        let myThis: xxTreeTabControl = this;
        let tabItems: xxTabItem[] = myThis.TabControlPrincipal.tabItems.filter(e => e.id == itemId);
        if (tabItems.length > 0) {
            // signaler à l'onglet du TabControl
            myThis.TabControlPrincipal.afficherTabItem(itemId, bShow);
            return true;
        }
        return false;
    }

    public hasContenu(): boolean {
        let myThis: xxTreeTabControl = this;
        let nb: number = 0;
        myThis.TabControlPrincipal.tabItems.forEach(e => {
            if (myThis.TabControlPrincipal.hasContenu()) {
                nb++;
            }
        });
        
        return (nb > 0);
    }

    


    constructor(o: OptionsTreeTabControl) {
        let myThis: xxTreeTabControl = this;
        if (o.favoriteGlobalKey != undefined)
            myThis.favoriteGlobalKey = o.favoriteGlobalKey.cdperso + "_" + o.favoriteGlobalKey.key;

        if (o.modeNavigation != undefined) { myThis.modeNavigation = o.modeNavigation; }

        myThis.TabControlPrincipal = new xxTabControl({
            id: o.id,
            class: o.class,
            modeNavigation: o.modeNavigation,
            typeOrientation: o.typeOrientation,
            withDefault: o.withDefault,
            favoriteGlobalKey:o.favoriteGlobalKey,
            favoriteAutoSave: o.favoriteAutoSave,
            postZoneAligneeADroite: o.postZoneAligneeADroite,
        });

        o.onglets.forEach(function (op: (OptionsTreeTabControl | OptionsTabItem)) {
            //il y a des sous onglets
            if ((<OptionsTabItem>op).addContent == undefined) {
                op = <OptionsTreeTabControl>op;
                //ici op n'a pas de fonction addcontent donc c'est un OptionsTreeTabControl
                myThis.ajouterGroupeOnglets(op);                
            }
            else
            {  //ici op a une fonction addcontent donc c'est un OptionsTabItem
                myThis.ajouterOnglet(<OptionsTabItem>op);
            }
         
        });

    }


}