
/*
class iceHTMLElement {

    private elem: (HTMLElement | SVGElement);

    constructor(inElem: HTMLElement | SVGElement) {
        this.elem = inElem;
    }
   // [index: number]: HTMLElement
    addClass(className: string): iceHTMLElement {
        let myThis: iceHTMLElement = this;
        className.split(' ').forEach(s => myThis.elem.classList.add(s));
        return myThis;
    }
    attr(attributeName: string): string
    attr(attributeName: string, value: string | number): iceHTMLElement;
    attr(attributeName: any, value?: string | number): string | iceHTMLElement {
        let myThis: iceHTMLElement = this;
        if (value == undefined) {
            return myThis.elem.getAttribute(attributeName);}
        else {
            myThis.elem.setAttribute(attributeName, value.toString());
            return myThis;
        }
    }
    prop(propertyName: 'disabled' | 'scrollHeight'|'checked'):string;
    prop(propertyName: 'disabled' | 'checked' , value: string | number | boolean): iceHTMLElement;
    prop(propertyName: 'disabled' | 'scrollHeight' | 'checked', value?: any): any {
        let myThis: iceHTMLElement = this;
      
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
    removeClass(className?: string): iceHTMLElement {
        let myThis: iceHTMLElement = this;
        className.split(' ').forEach(s => myThis.elem.classList.remove(s));
        return myThis;
    }
    toggleClass(className: string, swtch?: boolean): iceHTMLElement {
        let myThis: iceHTMLElement = this;
        className.split(' ').forEach(s => myThis.elem.classList.toggle(s));
        return myThis;
    }
    val():string;
    val(value: string | number | string[]): iceHTMLElement;
    val(value?: string | number | string[]): string | iceHTMLElement {
        let myThis: iceHTMLElement = this;
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
    css(propertyName: string, value: string | number): iceHTMLElement;
    css(propertyName: any, value?: any): string | iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    height(): number;
    height(value: string | number): iceHTMLElement;
    height(value?: any): number | iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    offset(): JQueryCoordinates {
        throw new Error("Method not implemented.");
    }
    position(): JQueryCoordinates {
        throw new Error("Method not implemented.");
    }
    scrollLeft(): number;
    scrollLeft(value: number): iceHTMLElement;
    scrollLeft(value?: any): number | iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    scrollTop(): number;
    scrollTop(value: number): iceHTMLElement;
    scrollTop(value?: any): number | iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    width(): number;
    width(value: string | number): iceHTMLElement;
    width(value?: any): number | iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    animate(properties: Object, duration?: string | number, complete?: Function): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    hide(duration?: string | number, complete?: Function): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    show(duration?: string | number, complete?: Function): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    bind(eventType: string, handler: (eventObject: JQueryEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    change(): iceHTMLElement;
    change(handler: (eventObject: JQueryEventObject) => any): iceHTMLElement;
    change(handler?: any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    click(handler: (eventObject: JQueryEventObject) => any): iceHTMLElement;
    click(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): iceHTMLElement;
    click(eventData?: any, handler?: any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    dblclick(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    focus(): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    focusout(handler: (eventObject: JQueryEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    keydown(handler: (eventObject: JQueryKeyEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    keyup(handler: (eventObject: JQueryKeyEventObject) => any): iceHTMLElement;
    keyup(eventData?: any, handler?: (eventObject: JQueryKeyEventObject) => any): iceHTMLElement;
    keyup(eventData?: any, handler?: any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    load(handler: (eventObject: JQueryEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    mousedown(handler: (eventObject: JQueryMouseEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    mousemove(handler: (eventObject: JQueryMouseEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    mouseup(handler: (eventObject: JQueryMouseEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    off(events: string, selector?: string, handler?: (eventObject: JQueryEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    on(events: string, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    scroll(handler: (eventObject: JQueryEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    select(): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    unbind(eventType?: string, handler?: (eventObject: JQueryEventObject) => any): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    detach(selector?: string): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    empty(): iceQuery {
        throw new Error("Method not implemented.");
    }
    insertAfter(target: string | any[] | iceHTMLElement | Element | Text): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    insertBefore(target: string | any[] | iceHTMLElement | Element | Text): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    remove(selector?: string): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    text(): string;
    text(text: string | number | boolean): iceHTMLElement;
    text(text?: any): string | iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    length: number;
    add(obj: iceHTMLElement): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    children(selector?: string): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    contents(): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    find(selector: string): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    first(): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    parent(selector?: string): iceHTMLElement {
        throw new Error("Method not implemented.");
    }
    parents(selector?: string): iceHTMLElement {
        throw new Error("Method not implemented.");
    }


}*/