interface CkeditorInstances
{
    id: string;
    getData(): string;
    setData(a: string, d: {}): void;
    insertHtml(a: string): void;
    destroy(): void;
}

interface Ckeditor
{
    replace(a: string, d: {}): void;
    base: any;
    config: any;
    dom: any;
    tools: any;
    instances: Dictionnaire<CkeditorInstances>;
}


declare var CKEDITOR: Ckeditor;
