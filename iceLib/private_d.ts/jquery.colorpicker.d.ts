// Type definitions for jQuery Colorpicker Plugin 1.4.3
// Project: https://github.com/vanderlee/colorpicker
// Definitions by: Jeffery Grajkowski <https://github.com/pushplay/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

 

interface JQuery {
   
    colorpicker(options?: {      
        ok?: Function,       
        altField?: string;
        altOnChange?: boolean;
        closeOnEscape?: boolean;    
        closeOnOutside?: boolean;      
    }): JQuery;
}
