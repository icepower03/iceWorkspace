interface OptionsStackPanel extends iTestable {
    id?: string;
    class?: string;
    initContent?: iXElement[];
    espaceMinimaliste?: boolean;
    gap?: number;
    optionsAffichage?: optionsAffichage;
    drag?: {
        drop?: (key: string) => void;
        dropAction?: 'copie' | 'deplacement' | 'lien';
    }
}

class xxStackPanel implements iXElement {
    private elemPrincipal: xDiv;

    private espaceMinimaliste: boolean;
    private conteneurDitems: Container<xDiv>;
    private gap: string;
    public toggleClass(c: string, force: boolean) {
        return this.elemPrincipal.toggleClass(c, force);
    }
    public append(element: iXElement, addClass?: string, optionsAffichage?: optionsAffichage): xxStackPanel {
        if (element != null) {
            let classStackPanelItem = "xxStackPanelItem"
            if (addClass != undefined) { classStackPanelItem += " " + addClass }
            let newDiv = new xDiv({ class: classStackPanelItem });

            if (optionsAffichage != undefined) {

                xStyle.AppliquerOptionsAffichage(newDiv, optionsAffichage);
            }




            this.conteneurDitems.content.asHolder.append(newDiv);
            newDiv.asHolder.append(element);
        }
        return this;
    }
    public appendMany(elements: iXElement[]): xxStackPanel {
        let myThis: xxStackPanel = this;
        elements.forEach((elem) => { myThis.append(elem); });
        return myThis;
    }



    constructor(o: OptionsStackPanel) {
        let myThis: xxStackPanel = this;
        this.conteneurDitems = new Container<xDiv>();
        if (o.class == undefined) { o.class = ""; }

        this.elemPrincipal = new xDiv({ id: o.id, class: "xxStackPanelMaster " + o.class,drag: o?.drag, idTest: o.idTest });
        if (o.class != "") {
            this.elemPrincipal.asHolder.xdiv({ class: "xxStackPanel " + "SP" + o.class }, this.conteneurDitems);
        }
        else {
            this.elemPrincipal.asHolder.xdiv({ class: "xxStackPanel " }, this.conteneurDitems);
        }
        if (o.initContent != undefined) {
            o.initContent.forEach(function (j: iXElement) {
                myThis.append(j);
            }
            );

        }
        myThis.espaceMinimaliste = o.espaceMinimaliste;
        if (myThis.espaceMinimaliste == undefined) {
            myThis.espaceMinimaliste = false;
        }

        if (o.optionsAffichage != undefined) {

            xStyle.AppliquerOptionsAffichage(myThis.elemPrincipal, o.optionsAffichage);
        }

        if (o.gap != undefined)
            myThis.gap = o.gap + "px";



        if (myThis.gap && myThis.gap != "")
            myThis.elemPrincipal.y.style.gap = myThis.gap;
        
    }

    public width(parame?: string | number): void | number {
        let myThis: xxStackPanel = this;
        return myThis.elemPrincipal.width(parame);
    }

    public height(parame?: string | number): void | number {
        let myThis: xxStackPanel = this;
        return myThis.elemPrincipal.height(parame);
    }
    public get y() { return this.elemPrincipal.y; }

    public cacher(collapse?: boolean): xxStackPanel {
        let myThis: xxStackPanel = this;
        cacherxElements(myThis, collapse);
        return myThis;
    }


    public afficher(): xxStackPanel {
        let myThis: xxStackPanel = this;
        afficherxElements(myThis);
        return myThis;
    }
    public vider() {
        let myThis: xxStackPanel = this;
        myThis.empty();
    }
    public empty(): xxStackPanel {
        let myThis: xxStackPanel = this;
        myThis.conteneurDitems.content.asHolder.empty();
        return myThis;
    }

    public getClasseMinimaliste(): string {
        if (this.espaceMinimaliste) { return "espaceMinimaliste"; }
        else { return ""; }
    }

    public addClass(c: string) {
        let myThis: xxStackPanel = this;
        myThis.elemPrincipal.addClass(c);
    }


    public removeClass(c: string) {
        let myThis: xxStackPanel = this;
        myThis.elemPrincipal.removeClass(c);

    }
}