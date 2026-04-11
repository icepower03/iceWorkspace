interface OptionsContainerEvent {
    id?: string;
    class?: string;
    initContent?: iXElement;
    onClick?: (cb: () => void) => void;
    onRightClick?: (cb: () => void) => void;
    onShiftClick?: (cb: () => void) => void;
    onDblClick?: (cb: () => void) => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    onMouseLeave?: () => void;
    onMouseEnter?: () => void;
    stopPropagation?: boolean;
    titleLocalise?: string;
    titleVariable?: string;
    onTouchLong?: (cb: () => void) => void;
    disabled?: boolean;
    optionsAffichage?: optionsAffichage;
    withDelaiPourMouseEnterMs?: number;
}

class xxContainerEvent implements iXElement, iXElementHolderEnable {
    private static CLASS_CLICK_EN_COURS: string = "clicEnCours";
    private static CLASS_DISABLED: string = "xxCtnEvent-disabled";
    private divForHolder: xDiv;
    private holder: iXElementHolder;
    private content: iXElement;
    private click: () => void = function () { };
    private dblClick: () => void = function () { };
    private shiftClick: () => void = function () { };
    private rightClick: () => void = function () { };
    private mouseOver: () => void = function () { };
    private mouseOut: () => void = function () { };
    private mouseEnter: () => void = function () { };
    private mouseLeave: () => void = function () { };
    private clickOut: () => void = function () { };
    private stopPropagation: boolean;
    private title: string;
    private longTouch: () => void;
    private dureeLong: number = 500;
    private callbackTouchInterval: number;
    private disabled: boolean;
    private optionsAffichage: optionsAffichage;
    private idTimeOutDelaiPourMouseEnterMs?: number;

    public width(parame?: string): void | number {
        let myThis: xxContainerEvent = this;
        return myThis.divForHolder.width(parame);
    }

    public height(parame?: string): void | number {
        let myThis: xxContainerEvent = this;
        return myThis.divForHolder.height(parame);
    }
    get y(): HTMLElement { return this.divForHolder.y; }
    public addClass(s: string) { return this.holder.addClass(s); }
    public removeClass(s: string) { return this.holder.removeClass(s); }
    get asHolder(): iXElementHolder { return this.holder; }

    constructor(opt: OptionsContainerEvent) {
        let myThis: xxContainerEvent = this;
        myThis.disabled = false;

        if (opt.disabled != null)
            myThis.disabled = opt.disabled;

        myThis.stopPropagation = opt.stopPropagation;
        //Récupération des options
        myThis.content = opt.initContent;

        myThis.title = opt.titleVariable;
        if (!!opt.titleLocalise)
            myThis.title = new xLString(opt.titleLocalise).text;

        let optionClass = (opt.class != null ? opt.class : "");
        let optionId = (opt.id != null ? opt.id : "");

        if (opt.onClick) {
            myThis.click = () => {
                if (!myThis.disabled) {
                    myThis.operationEnCours();
                    opt.onClick(() => { myThis.operationEnCoursRemove(); });
                }
            }
        }
        if (opt.onDblClick) {
            myThis.dblClick = () => {
                if (!myThis.disabled) {
                    myThis.operationEnCours();
                    opt.onDblClick(() => { myThis.operationEnCoursRemove(); });
                }
            }
        }

        if (opt.onShiftClick) {
            myThis.shiftClick = () => {
                if (!myThis.disabled) {
                    myThis.operationEnCours();
                    opt.onShiftClick(() => { myThis.operationEnCoursRemove(); });
                }
            }
        }

        if (opt.onMouseOver)
            myThis.mouseOver = opt.onMouseOver;
        if (opt.onMouseOut)
            myThis.mouseOut = opt.onMouseOut;
        if (opt.onRightClick)
            myThis.rightClick = () => {
                if (!myThis.disabled) {
                    myThis.operationEnCours();
                    opt.onRightClick(() => { myThis.operationEnCoursRemove(); });
                }
            }

        if (opt.onMouseEnter)
            myThis.mouseEnter = opt.onMouseEnter;

        if (opt.onMouseLeave)
            myThis.mouseLeave = opt.onMouseLeave;

        if (opt.onTouchLong != undefined) {
            myThis.longTouch = () => {
                if (!myThis.disabled) {
                    myThis.operationEnCours();
                    opt.onTouchLong(() => { myThis.operationEnCoursRemove(); });
                }
            }
        }

        //On déclare le conteneur
        myThis.divForHolder = new xDiv({
            class: "xxContainerEvent " + optionClass,
            title: myThis.title,
            id: optionId
        });

        myThis.holder = myThis.divForHolder.asHolder;

        if (myThis.content != undefined)
            myThis.holder.append(myThis.content);


        myThis.optionsAffichage = opt.optionsAffichage;

        if (!!myThis.optionsAffichage)
            xStyle.AppliquerOptionsAffichage(myThis.divForHolder, myThis.optionsAffichage);

/*
        click(cb: (a?: MouseEvent) => void, shiftcb ?: (a?: MouseEvent) => void): void {
            let myThis: xElementHolder = this;

            myThis.ye.onclick = (evt: MouseEvent) => {
                evt.preventDefault();

                if (evt.shiftKey && shiftcb != undefined) {
                    console.log('ShiftClick', evt);
                    shiftcb(evt);

                }
                else {
                    console.log('click', evt);
                    cb(evt);
                }
            };
        }
        */
        myThis.holder.y.onclick = evt => {
           
                evt.preventDefault();

            if (evt.shiftKey && myThis.shiftClick != undefined) {
                    console.log('ShiftClick', evt);
                    myThis.shiftClick();
                    if (myThis.stopPropagation) { evt.stopPropagation(); }

                }
                else {
                    console.log('click', evt);
                    myThis.click();
                    if (myThis.stopPropagation) { evt.stopPropagation(); }
                }
            };

        

      
        myThis.holder.y.onmouseover = () => { myThis.mouseOver(); };
        myThis.holder.y.onmouseleave = () =>
        {
            if (myThis.idTimeOutDelaiPourMouseEnterMs != null)
            {
                clearTimeout(myThis.idTimeOutDelaiPourMouseEnterMs);
                myThis.idTimeOutDelaiPourMouseEnterMs = null;
            }

            myThis.mouseLeave();
        };
        myThis.holder.y.onmouseout = () => 
        {
            myThis.mouseOut();
        };
        myThis.holder.y.onmouseenter = () =>
        {
            if (opt.withDelaiPourMouseEnterMs == null)
                myThis.mouseEnter();
            else
            {
                myThis.idTimeOutDelaiPourMouseEnterMs = setTimeout(function ()
                {
                    myThis.mouseEnter();
                }, opt.withDelaiPourMouseEnterMs);
            }
        };
        myThis.holder.y.oncontextmenu = () => { myThis.rightClick(); };
        myThis.holder.y.ondblclick = () => { myThis.dblClick(); };



        myThis.holder.y.addEventListener("touchstart", () => {
            myThis.callbackTouchInterval = setTimeout(() => { if (myThis.longTouch) { myThis.longTouch(); } }, myThis.dureeLong);
        }, false);

        myThis.holder.y.addEventListener("touchend", () => {
            clearInterval(myThis.callbackTouchInterval);
        }, false);
        myThis.holder.y.addEventListener("touchcancel", () => { clearInterval(myThis.callbackTouchInterval); }, false);
        myThis.holder.y.addEventListener("touchleave", () => { clearInterval(myThis.callbackTouchInterval); }, false);
        myThis.holder.y.addEventListener("touchmove", () => { clearInterval(myThis.callbackTouchInterval); }, false);

    }

    public fakeEnter() {
        let myThis: xxContainerEvent = this;
        myThis.mouseEnter();
    }

    public fakeLeave() {
        let myThis: xxContainerEvent = this;
        myThis.mouseLeave();
    }

    public fakeClick() {
        let myThis: xxContainerEvent = this;
        myThis.click();
    }

    public fakeDblClick() {
        let myThis: xxContainerEvent = this;
        myThis.dblClick();
    }
    public fakeRightClick() {
        let myThis: xxContainerEvent = this;
        myThis.rightClick();
    }

    public fakeShiftClick() {
        let myThis: xxContainerEvent = this;
        myThis.shiftClick();
    }

    public fakeOver() {
        let myThis: xxContainerEvent = this;
        myThis.mouseOver();
    }

    public fakeOut() {
        let myThis: xxContainerEvent = this;
        myThis.mouseOut();
    }

    public operationEnCours(): void {
        let myThis: xxContainerEvent = this;
        myThis.setDisabled(true);
        myThis.addClass(xxContainerEvent.CLASS_CLICK_EN_COURS);
    }

    public operationEnCoursRemove(): void {
        let myThis: xxContainerEvent = this;
        myThis.removeClass(xxContainerEvent.CLASS_CLICK_EN_COURS);
        myThis.setDisabled(false);
    }

    public setDisabled(isDisabled?: boolean): void {
        let myThis: xxContainerEvent = this;
        myThis.removeClass(xxContainerEvent.CLASS_DISABLED);
        if ((!myThis.disabled && isDisabled == null) || isDisabled == true)
            myThis.addClass(xxContainerEvent.CLASS_DISABLED);
        myThis.disabled = isDisabled != null ? isDisabled : !myThis.disabled;
    }
}