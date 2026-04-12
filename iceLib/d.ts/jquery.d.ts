// Minimal jQuery stub — le fichier original (~3000 lignes) a été réduit car
// seuls xxZoom.ts (.draggable) et xxChoixCouleur.ts (.colorpicker) utilisent
// encore jQuery. Ces deux fichiers sont @ts-nocheck donc les types ne sont pas
// vérifiés par TypeScript, mais l'interface JQuery doit exister pour que
// jquery.ui.base.d.ts et jquery.colorpicker.d.ts puissent l'étendre.

interface JQuery {}

declare var $: (selector: any) => JQuery;
declare var jQuery: (selector: any) => JQuery;
