//// Type definitions for jQueryUI 1.9
//// Project: http://jqueryui.com/
//// Definitions by: Boris Yankov <https://github.com/borisyankov/>, John Reilly <https://github.com/johnnyreilly>
//// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module JQueryUIBase {




    interface DraggableEventUIParams {
        helper: JQuery;
        position: { top: number; left: number; };
        offset: { top: number; left: number; };
    }

    interface DraggableEvent {
        (event: Event, ui: DraggableEventUIParams): void;
    }

    interface DraggableOptions extends DraggableEvents {
        disabled?: boolean;
        addClasses?: boolean;
        appendTo?: any;
        axis?: string;
        cancel?: string;
        connectToSortable?: string;
        containment?: any;
        cursor?: string;
        cursorAt?: any;
        delay?: number;
        distance?: number;
        grid?: number[];
        handle?: any;
        helper?: any;
        iframeFix?: any;
        opacity?: number;
        refreshPositions?: boolean;
        revert?: any;
        revertDuration?: number;
        scope?: string;
        scroll?: boolean;
        scrollSensitivity?: number;
        scrollSpeed?: number;
        snap?: any;
        snapMode?: string;
        snapTolerance?: number;
        stack?: string;
        zIndex?: number;
    }

    interface DraggableEvents {
        create?: DraggableEvent;
        start?: DraggableEvent;
        drag?: DraggableEvent;
        stop?: DraggableEvent;
    }

    // Droppable //////////////////////////////////////////////////

    interface DroppableEventUIParam {
        draggable: JQuery;
        helper: JQuery;
        position: { top: number; left: number; };
        offset: { top: number; left: number; };
    }

    interface DroppableEvent {
        (event: Event, ui: DroppableEventUIParam): void;
    }

    interface DroppableOptions extends DroppableEvents {
        disabled?: boolean;
        accept?: any;
        activeClass?: string;
        greedy?: boolean;
        hoverClass?: string;
        scope?: string;
        tolerance?: string;
    }

    interface DroppableEvents {
        create?: DroppableEvent;
        activate?: DroppableEvent;
        deactivate?: DroppableEvent;
        over?: DroppableEvent;
        out?: DroppableEvent;
        drop?: DroppableEvent;
    }

    interface Droppable extends Widget, DroppableOptions {
    }




    // Widget //////////////////////////////////////////////////

    interface WidgetOptions {
        disabled?: boolean;
        hide?: any;
        show?: any;
    }

   export interface Widget {
        (methodName: string): JQuery;
        (options: WidgetOptions): JQuery;
       
        (optionLiteral: string, optionName: string): any;
        (optionLiteral: string, options: WidgetOptions): any;
        (optionLiteral: string, optionName: string, optionValue: any): JQuery;

        (name: string, prototype: any): JQuery;
        (name: string, base: Function, prototype: any): JQuery;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Resizable //////////////////////////////////////////////////

    interface ResizableOptions extends ResizableEvents {
        alsoResize?: any; // Selector, JQuery or Element
        animate?: boolean;
        animateDuration?: any; // number or string
        animateEasing?: string;
        aspectRatio?: any; // boolean or number
        autoHide?: boolean;
        cancel?: string;
        containment?: any; // Selector, Element or string
        delay?: number;
        disabled?: boolean;
        distance?: number;
        ghost?: boolean;
        grid?: any;
        handles?: any; // string or object
        helper?: string;
        maxHeight?: number;
        maxWidth?: number;
        minHeight?: number;
        minWidth?: number;
    }

    interface ResizableUIParams {
        element: JQuery;
        helper: JQuery;
        originalElement: JQuery;
        originalPosition: any;
        originalSize: any;
        position: any;
        size: any;
    }

    interface ResizableEvent {
        (event: Event, ui: ResizableUIParams): void;
    }

    interface ResizableEvents {
        resize?: ResizableEvent;
        start?: ResizableEvent;
        stop?: ResizableEvent;
        create?: ResizableEvents;
    }

    interface Resizable extends Widget, ResizableOptions {
    }
}

interface JQuery {

    draggable(options: JQueryUIBase.DraggableOptions): JQuery;
    droppable(options: JQueryUIBase.DroppableOptions): JQuery;
    resizable(options: JQueryUIBase.ResizableOptions): JQuery;
}
