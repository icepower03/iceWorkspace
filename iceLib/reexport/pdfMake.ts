
declare module pdfMake {
    export function createPdf(doc: DocDefinition): DocumentPdfMake;




    export interface pdfMakeElementTableElement {
        headerRows?: number,
        widths?: (string | number)[] | Function,
        heights?: (string | number)[] | Function,
        body: (pdfMakeElement | pdfMakeElement[] | string | string[])[];
    }
    export interface pdfMakeElement {
        table?: pdfMakeElementTableElement;
        text?: string | pdfMakeElement | pdfMakeElement[];
        margin?: [number, number, number, number] | [number, number];
        fit?: [number, number];
        pageBreak?: 'after' | 'before';
        image?: string;//base 64 image: 'data:image/jpeg;base64,...encodedContent...', ou clée de DocDefinition.image
        width?: number | string;
        height?: number | string;
        fontSize?: number;
        italics?: boolean;
        bold?: boolean;
        columns?: pdfMakeElement[] | any[] | string;
        stack?: pdfMakeElement[];
        ul?: pdfMakeElement[];
        ol?: pdfMakeElement[];
        reversed?: boolean;
        columnGap?: number; //pour les columns
        style?: any;
        colSpan?: number;
        alignment?: string;
        layout?: any;
        color?: string;
        start?: number;
        counter?: number;
        type?: string;
        markerColor?: string;
        separator?: string | string[];
        border?: [boolean, boolean, boolean, boolean];
        absolutePosition?: { x: number, y: number };
        svg?: string;

    }

    export interface DocDefinition {
        content?: (pdfMakeElement | string)[] | string;
        // a string or { width: number, height: number }
        pageSize?: '4A0' | '2A0' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10' | 'B0' | 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6' | 'B7' | 'B8' | 'B9' | 'B10' | 'C0' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7' | 'C8' | 'C9' | 'C10' | 'RA0' | 'RA1' | 'RA2' | 'RA3' | 'RA4' | 'SRA0' | 'SRA1' | 'SRA2' | 'SRA3' | 'SRA4' | 'EXECUTIVE' | 'FOLIO' | 'LEGAL' | 'LETTER' | 'TABLOID';

        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation?: 'portrait' | 'landscape';

        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins?: [number, number, number, number];

        images?: any[] | any;
        background?: ((currentPage: number) => pdfMakeElement) | pdfMakeElement;
        styles?: any[] | any;
        defaultStyle?: any;
        footer?: ((currentPage: number, pageCount: number) => pdfMakeElement) | pdfMakeElement;
        header?: ((currentPage: number, pageCount: number) => pdfMakeElement) | pdfMakeElement | (pdfMakeElement | string)[] | string;
    }



    interface DocumentPdfMake {
        docDefinition: DocDefinition;
        tableLayouts: any;
        fonts: any;
        vfs: any;
        open: (options: any, win: any) => any;
        print: (options: any, win: any) => any;
        download: (defaultFileName: string, cb?: any, options?: any) => any;
        getBase64: (cb?: any, options?: any) => any;
        getDataUrl: (cb?: any, options?: any) => any;
        getBlob: (cb?: any, options?: any) => any;


    }
}