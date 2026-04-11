
/*
class xHTMLElement {

    private elem: (HTMLElement | SVGElement);

    constructor(inElem: HTMLElement | SVGElement) {
        this.elem = inElem;
    }
   // [index: number]: HTMLElement
    addClass(className: string): xHTMLElement {
        let myThis: xHTMLElement = this;
        className.split(' ').forEach(s => myThis.elem.classList.add(s));
        return myThis;
    }
    attr(attributeName: string): string
    attr(attributeName: string, value: string | number): xHTMLElement;
    attr(attributeName: any, value?: string | number): string | xHTMLElement {
        let myThis: xHTMLElement = this;
        if (value == undefined) {
            return myThis.elem.getAttribute(attributeName);}
        else {
            myThis.elem.setAttribute(attributeName, value.toString());
            return myThis;
        }
    }
    prop(propertyName: 'disabled' | 'scrollHeight'|'checked'):string;
    prop(propertyName: 'disabled' | 'checked' , value: string | number | boolean): xHTMLElement;
    prop(propertyName: 'disabled' | 'scrollHeight' | 'checked', value?: any): any {
        let myThis: xHTMLElement = this;
      
        switch (propertyName) {
            case 'disabled':
                {
                    let input = <HTMLInputElement>myThis.elem;

                    if (value == undefined) {
                        return input.disabled;
                    }
                    else {
                        input.disabled = value;
                    }
                }
                break;
            case 'checked':
                {
                    let input = <HTMLInputElement>myThis.elem;

                    if (value == undefined) {
                        return input.checked;
                    }
                    else {
                        input.checked = value;
                    }
                }
                break;
            case 'scrollHeight':
               
                    return myThis.elem.scrollHeight;
             
                break;
        }
    }
    removeClass(className?: string): xHTMLElement {
        let myThis: xHTMLElement = this;
        className.split(' ').forEach(s => myThis.elem.classList.remove(s));
        return myThis;
    }
    toggleClass(className: string, swtch?: boolean): xHTMLElement {
        let myThis: xHTMLElement = this;
        className.split(' ').forEach(s => myThis.elem.classList.toggle(s));
        return myThis;
    }
    val():string;
    val(value: string | number | string[]): xHTMLElement;
    val(value?: string | number | string[]): string | xHTMLElement {
        let myThis: xHTMLElement = this;
        if (myThis.elem.nodeName == 'input') {
            let input = <HTMLInputElement>myThis.elem;
            if (value == undefined) { return input.value; }
            else {
                input.value = value.toString();
                return myThis
            }

        }
        else {
            throw new Error("Method .val not implemented on non HtmlInputELement");

        }
    }
    css(propertyName: string): string;
    css(propertyName: string, value: string | number): xHTMLElement;
    css(propertyName: any, value?: any): string | xHTMLElement {
        throw new Error("Method not implemented.");
    }
    height(): number;
    height(value: string | number): xHTMLElement;
    height(value?: any): number | xHTMLElement {
        throw new Error("Method not implemented.");
    }
    offset(): JQueryCoordinates {
        throw new Error("Method not implemented.");
    }
    position(): JQueryCoordinates {
        throw new Error("Method not implemented.");
    }
    scrollLeft(): number;
    scrollLeft(value: number): xHTMLElement;
    scrollLeft(value?: any): number | xHTMLElement {
        throw new Error("Method not implemented.");
    }
    scrollTop(): number;
    scrollTop(value: number): xHTMLElement;
    scrollTop(value?: any): number | xHTMLElement {
        throw new Error("Method not implemented.");
    }
    width(): number;
    width(value: string | number): xHTMLElement;
    width(value?: any): number | xHTMLElement {
        throw new Error("Method not implemented.");
    }
    animate(properties: Object, duration?: string | number, complete?: Function): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    hide(duration?: string | number, complete?: Function): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    show(duration?: string | number, complete?: Function): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    bind(eventType: string, handler: (eventObject: JQueryEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    change(): xHTMLElement;
    change(handler: (eventObject: JQueryEventObject) => any): xHTMLElement;
    change(handler?: any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    click(handler: (eventObject: JQueryEventObject) => any): xHTMLElement;
    click(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): xHTMLElement;
    click(eventData?: any, handler?: any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    dblclick(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    focus(): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    focusout(handler: (eventObject: JQueryEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    keydown(handler: (eventObject: JQueryKeyEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    keyup(handler: (eventObject: JQueryKeyEventObject) => any): xHTMLElement;
    keyup(eventData?: any, handler?: (eventObject: JQueryKeyEventObject) => any): xHTMLElement;
    keyup(eventData?: any, handler?: any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    load(handler: (eventObject: JQueryEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    mousedown(handler: (eventObject: JQueryMouseEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    mousemove(handler: (eventObject: JQueryMouseEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    mouseup(handler: (eventObject: JQueryMouseEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    off(events: string, selector?: string, handler?: (eventObject: JQueryEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    on(events: string, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    scroll(handler: (eventObject: JQueryEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    select(): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    unbind(eventType?: string, handler?: (eventObject: JQueryEventObject) => any): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    detach(selector?: string): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    empty(): xQuery {
        throw new Error("Method not implemented.");
    }
    insertAfter(target: string | any[] | xHTMLElement | Element | Text): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    insertBefore(target: string | any[] | xHTMLElement | Element | Text): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    remove(selector?: string): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    text(): string;
    text(text: string | number | boolean): xHTMLElement;
    text(text?: any): string | xHTMLElement {
        throw new Error("Method not implemented.");
    }
    length: number;
    add(obj: xHTMLElement): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    children(selector?: string): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    contents(): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    find(selector: string): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    first(): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    parent(selector?: string): xHTMLElement {
        throw new Error("Method not implemented.");
    }
    parents(selector?: string): xHTMLElement {
        throw new Error("Method not implemented.");
    }


}*/