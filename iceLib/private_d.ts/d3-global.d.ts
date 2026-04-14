// d3 and pdfjsLib are loaded as global CDN scripts. These declarations make them available in module-context files.
// d3 is typed as 'any' because the custom d3.d.ts re-exports via sub-module IDs that don't resolve without npm packages.
declare const d3: any;
declare const pdfjsLib: typeof import('./jspdf/pdf');
