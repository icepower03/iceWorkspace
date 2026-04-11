


class xElementHolder implements iXElementHolder {
    //private e: JQuery;
    private _y: HTMLElement;


    constructor(elem: iXElement) {
        this._y = <HTMLElement>elem.y;

        


    } 

    cacher(collapse?: boolean): xElementHolder {
        let myThis: xElementHolder = this;
        cacherxElements(xElementHolder.fromHtmlElement(myThis.y), collapse);
        return myThis;
    }

    /* get x(): xQuery {
         return $(this.y);
     }*/

    get y(): HTMLElement {
        return this._y;

    }

    afficher(): xElementHolder {
        let myThis: xElementHolder = this;
        afficherxElements(xElementHolder.fromHtmlElement(myThis.y));
        return myThis;
    }

    appendMany(ajouts: iXElement[]): xElementHolder {
        ajouts.forEach((item: iXElement) => { this.append(item); });

        return this;
    }
    append(ajout: iXElement): xElementHolder {

        this.y?.append(ajout?.y);
        return this;
    }

    empty(): xElementHolder {

        return this.vider();
    }
    vider(): xElementHolder {
        if (this.y != null) {
            while (this.y.hasChildNodes()) {
                this.y.removeChild(this.y.lastChild);
            }
        }

        return this;
    }
    addClass(s: string): xElementHolder {
        this.y.className = this.y.className + ' ' + s;
        /*        s.split(' ').forEach(c => {
                    if (!this.y.classList.contains(c)&& c!=null &&c.length>0 )
                    { this.y.classList.add(c); }
                    
                })*/
        return this;
    }
    hasClass(s: string): boolean {
        return this.y.classList.contains(s);
    }

    setAttribute(nom: string, valeur: string) {
        let myThis: xElementHolder = this;
        myThis.y.setAttribute(nom, valeur);
    }
    getAttribute(nom: string): string {
        let myThis: xElementHolder = this;
        return myThis.y.getAttribute(nom);
    }
    /*
    css(prop: string, val?: string): xElementHolder | string {
        if (val == undefined) {
            return this.ye.style.getPropertyValue(prop);
        }
        else {
            this.ye.style.setProperty(prop, val);
            return this;
        }


    }*/

    toggleClass(s: string, force?: boolean): xElementHolder {

        s.split(' ').forEach(c => {
            this.y.classList.toggle(c, force);

        })
        return this;

    }

    removeClass(s: string): xElementHolder {
        s.split(' ').forEach(c => {
            this.y.classList.remove(c);

        })
        return this;
    }



    public static fromHtmlElement(h: HTMLElement): iXElementHolder {
        return new xElementHolder({ y: h });
    }
    public static fromSVGElement(h: SVGElement): iXElementHolder {
        return new xElementHolder({ y: h });
    }

    public xxList<T>(o: OptionsList<T>, outElement?: Container<xxListWrapper<T>>): iXElementHolder {
        let d = new xxListWrapper<T>(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }
    public xxZoneModulable(o: OptionZoneModulable, outElement?: Container<xxZoneModulable>): xElementHolder {
        let d = new xxZoneModulable(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }

    public xxTreeTabControl(o: OptionsTreeTabControl, outElement?: Container<xxTreeTabControl>) {
        let d = new xxTreeTabControl(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }
    public xxTabControl(o: OptionsTabControl): xElementHolder {
        this.append(new xxTabControl(o));
        return this;
    }

    public xxAutoComplete<T>(o: OptionsAutoComplete<T>): xElementHolder {
        this.append(new xxAutoComplete<T>(o));
        return this;
    }
    public xxMenu(o: OptionsMenu): xElementHolder {
        this.append(new xxMenu(o));
        return this;
    }
    public xxListChoix(o: OptionsSelect): xElementHolder {
        this.append(new xxListChoix(o));
        return this;
    }
    public xul(o: OptionsHtml, outElement?: Container<xUl>): xElementHolder {
        let d = new xUl(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }

    public xxListeChoixLang(o: OptionsListeChoixLang, outElement?: Container<xxListeChoixLang>): xElementHolder {
        let d = new xxListeChoixLang(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }

    public xinputCheckBox(o: OptionsInputCheckBox, outElement?: Container<xInputCheckBox>): xElementHolder {
        let d = new xInputCheckBox(o)
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }

    public xxTableau<T>(o: OptionsTableau<T>, outElement?: Container<xxTableauWrapper<T>>): xElementHolder {
        let d = new xxTableauWrapper(o);

        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }
    public xxStackPanel(o: OptionsStackPanel, outElement?: Container<xxStackPanel>): xElementHolder {
        let d = new xxStackPanel(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }
    public xxDockPanelDeprecated(o: OptionsxxDockPanel, outElement?: Container<xxDockPanelDeprecated>): xElementHolder {
        let d = new xxDockPanelDeprecated(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }
    public xinputDateAndTime(o: OptionsInputDateAndTime): xElementHolder {
        this.append(new xInputDateAndTime(o));
        return this;
    }



    public xdiv(o: OptionsDiv, outElement?: Container<xDiv>): xElementHolder {
        let d = new xDiv(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }
    public xxRadioButton<T>(o: OptionsRadioButton<T>, outElement?: Container<xxRadioButton<T>>): xElementHolder {
        let d = new xxRadioButton(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }

    public xxCheckBox(o: OptionsInputCheckBox, outElement?: Container<xxCheckBox>): xElementHolder {
        let d = new xxCheckBox(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }

    public xxLabel(o: OptionsLabel, outElement?: Container<xxLabel>): xElementHolder {
        let d = new xxLabel(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }

    public xinputText(o: OptionsInput, outElement?: Container<xInputText>): xElementHolder {
        let d = new xInputText(o);

        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }

    public xxInputIntellisense(o: OptionsInputIntellisense, outElement?: Container<xxInputIntellisense>): xElementHolder {
        let d = new xxInputIntellisense(o);

        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;
    }


    public xinputDate(o: OptionsInputDate): xElementHolder {
        this.append(new xInputDate(o));
        return this;
    }
  /*  public xxBoutonDeprecated(o: OptionsBoutons, outElement?: Container<xxBoutonDeprecated>): xElementHolder {

        let d = new xxBoutonDeprecated(o);

        if (outElement != undefined && outElement != null) {
            outElement.content = d;
        }

        this.append(d);
        return this;
    }   
    */
     public xxBouton(o: optionButton, outElement?: Container<xxBouton>): xElementHolder {

        let d = new xxBouton(o);

        if (outElement != undefined && outElement != null) {
            outElement.content = d;
        }

        this.append(d);
        return this;
    }

    public xxLabelModifiable(o: OptionsLabelModifiable): xElementHolder {
        this.append(new xxLabelModifiable(o));
        return this;
    }

    public xxLabelContainer(o: OptionsLabelContainer, outElement?: Container<xxLabelContainer>): xElementHolder {
        let d = new xxLabelContainer(o);

        if (outElement != undefined && outElement != null) {
            outElement.content = d;
        }
        this.append(d);
        return this;
    }
    public xxWrapPanel(o: OptionsWrapPanel, outElement?: Container<xxWrapPanel>): xElementHolder {
        let d = new xxWrapPanel(o);
        this.append(d);
        if (outElement != undefined && outElement != null) {
            outElement.content = d;
        }
        return this;
    }
    public xspan(o: OptionsSpan, outElement?: Container<xSpan>): xElementHolder {
        let d = new xSpan(o);
        this.append(d);
        if (outElement != undefined && outElement != null) {
            outElement.content = d;
        }
        return this;
    }

    public xxToolTip(o: OptionsToolTip): xElementHolder {
        this.append(new xxToolTip(o));
        return this;

    }

    public xxRecorder(o: OptionsRecorder): xElementHolder {
        this.append(new xxRecorder(o));
        return this;

    }

    public xxArbre<T>(o: IOptionsxxArbre<T>): xElementHolder {
        this.append(new xxArbre<T>(o));
        return this;

    }
    public xxIMC(o: OptionsIMC): xElementHolder {
        this.append(new xxIMC(o));
        return this
    }

    public xxPage(o: OptionsPage, outElement?: Container<xxPageWrapper>): xElementHolder {
        let d = new xxPageWrapper(o);
        if (outElement != undefined && outElement != null) { outElement.content = d; }
        this.append(d);
        return this;

    }
}
class xElement implements iXElement {
    //  private jq: xQuery;
    private elem: HTMLElement;



    public get y(): HTMLElement {
        let myThis: xElement = this;
        return myThis.elem;
    }

    public width(parame?: string | number): void | number {
        let myThis: xElement = this;
        if (parame != undefined) {
            $(myThis.y).width(parame);
        }
        else {
            return $(myThis.y).width();
        }
    }

    public height(parame?: string | number): void | number {
        let myThis: xElement = this;
        if (parame != undefined) {
            $(myThis.y).height(parame);
        }
        else {
            return $(myThis.y).height();
        }
    }

    public hasClass(c: string): boolean {
        let myThis: xElement = this;
        return myThis.elem.classList.contains(c);

    }
    public addClass(c: string): xElement {
        let myThis: xElement = this;
        if (!myThis.hasClass(c)) {
            myThis.elem.className += ' ' + c;
        }
        return myThis;
    }
    public cacher(collapse?: boolean) {
        let myThis: xElement = this;
        cacherxElements(myThis, collapse);
    }
    public afficher() {
        let myThis: xElement = this;
        afficherxElements(myThis);
    }

    static setCouleurFondAvecContrasteTexteAuto(element: iXElement, couleurFondADefinir: string)
    {
        /* Couleur de fond imposée dans le cas où celle passée est aux fraises */
        if (couleurFondADefinir == null || couleurFondADefinir == "" || (couleurFondADefinir != null && couleurFondADefinir.length != 6))
            couleurFondADefinir = "F1F1F1";

        couleurFondADefinir = couleurFondADefinir.replace("#", "");

        xStyle.setCouleurFond(element, couleurFondADefinir);

        let classCouleurTexte: string;

        let r: number = parseInt(couleurFondADefinir.substr(0, 2), 16);
        let v: number = parseInt(couleurFondADefinir.substr(2, 2), 16);
        let b: number = parseInt(couleurFondADefinir.substr(4, 2), 16);

        let luminosite: number = Math.round(Math.sqrt(r * r * .241 + v * v * .691 + b * b * .068));

        element.y.classList.remove("couleurAutoBlanc", "couleurAutoNoir");

        if (luminosite < 155)
            classCouleurTexte = "couleurAutoBlanc";
        else
            classCouleurTexte = "couleurAutoNoir";

        element.y.classList.add(classCouleurTexte);
    }
    public removeClass(c: string): xElement {
        let myThis: xElement = this;
        c.split(' ').forEach(s => { if (s != "") myThis.elem.classList.remove(s); });
        return myThis;
    }
    public toggleClass(classe: string, etatPlie?: boolean) {
        let myThis: xElement = this;
        classe.split(' ').forEach(s => { if (s != "") myThis.elem.classList.toggle(s, etatPlie); });
        return myThis;
    }

    private static isChildOf(enfant: HTMLElement, parent: HTMLElement) {

        let elem = enfant;
        while (elem.parentElement != null) {
            if (elem.parentElement == parent) {
                return true;
            }
            elem = elem.parentElement;
        }

        return false;
    }

    private _dropActive: boolean = false;

    constructor(typeElementBase: 'input' | 'span' | 'div' | 'br' | 'canvas' | 'textarea' | 'table' | 'iframe' | 'select' | 'option' | 'ul' | 'li' | 'a' | 'img' | 'audio' | 'style', options: OptionsHtml) {
        let myThis: xElement = this;
        let dropActionHtml: 'move' | 'copy' | 'link' = 'move';
        if (options?.drag?.dropAction != undefined) {
            switch (options.drag.dropAction) {
                case "copie": dropActionHtml = 'copy'; break;
                case "lien": dropActionHtml = 'link'; break;
                case "deplacement": dropActionHtml = 'move'; break;
            }
        }
        // typeElementBase = typeElementBase.replace('<', '').replace('>', '').replace('/', '').replace(' ', '');
        let _clickFunction: (m: MouseEvent) => void;
        // let _data: any;
        if (options?.privateForceElement != null) {
            myThis.elem = options.privateForceElement;
        }
        else {
            myThis.elem = document.createElement(typeElementBase);
        }

        if (options != undefined) {

            if (options.id != undefined) {
                myThis.elem.id = options.id;
            }


            if (options.click != undefined) {
                _clickFunction = options.click;
                delete options.click;
                myThis.elem.addEventListener('click', (evt) => { _clickFunction(evt); })
            }
            if (options.class != null && options.class != undefined) {
                myThis.addClass(options.class);
            }

            if (options.idTest != undefined) {
                myThis.elem.setAttribute('data-id-test', options.idTest);

            }

            if (options.autocomplete) {
                myThis.elem.setAttribute('autocomplete', options.autocomplete);

            }

            //pas affectation direct pour éviter de polluer la dom avec draggable=false sur tous les éléments
            if (options?.drag?.dragKey) { myThis.elem.draggable = true; }

            if (options?.drag?.dragKey != null && options?.drag?.dragKey != undefined)
            { myThis.elem.addEventListener('dragstart', (ev) => {  ev.dataTransfer.setData('text', options.drag.dragKey()); });}

            if (options?.drag?.drop != null && options?.drag?.drop != undefined) {
                myThis.elem.addEventListener('drop', (e) => {
                   
                    console.log('drop');
                    options.drag.drop(e.dataTransfer.getData('text'));
                    myThis.removeClass('isCibleDrop');
                });
                
                myThis.elem.addEventListener('dragenter', (e) => {
                    console.log('dragenter');
                    if (!myThis._dropActive) {
                        myThis.addClass('isCibleDrop');
                        myThis._dropActive = true;
                      
                    }
                 //   myThis.addClass('isCibleDrop');
                    // est ce l'element target est un enfant de currentTarget'
                    //if (e.target == e.currentTarget || xElement.isChildOf(<HTMLElement>e.currentTarget, <HTMLElement>e.target)) {
                    //    console.log('dragenter current');
                    //    myThis.addClass('isCibleDrop');
                    //    e.stopImmediatePropagation();
                    //}
                    //else {
                    //    console.log('dragenter not current');
                    //}
                });
                myThis.elem.addEventListener('dragleave', (e) => {
                    myThis.removeClass('isCibleDrop');
                    myThis._dropActive = false;
                    console.log('dragleave');
                    //if (e.target == e.currentTarget) {
                    //    console.log('dragleave current');
                    ////    myThis.removeClass('isCibleDrop');
                    //    e.stopImmediatePropagation();
                    //}
                    //else {
                    //    console.log('dragleave not current');
                    //    }
                   
                   
                  
                });
                myThis.elem.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = dropActionHtml;
                    console.log('dragover');
                    if (!myThis._dropActive) {
                        myThis.addClass('isCibleDrop');
                        myThis._dropActive = true;
                    }

                    
                });
                myThis.elem.addEventListener('dragend', (e) => {
                    console.log('dragend');
                    myThis.removeClass('isCibleDrop');
                   
                });
            }


            myThis.addClass(xClass.Theme).addClass(xClass.ThemeLuminosite);
        }

    }
}

