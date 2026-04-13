// iceLib — ESM entry point
// Phase 2: exports what has been migrated to ESM

// Méthodes builder sur xElementHolder.prototype (doit être importé en premier)
import './xElementHolderBuilders';
// Globals pour compatibilité fichiers @ts-nocheck (pattern global-scripts)
import './xGlobals';

// Initialisation
export { xLib } from './xInit';

// Base types & classes
export * from './V2/xBase';
export * from './V2/xCache';
export * from './V2/xLString';
export * from './V2/xDomUtils';
export * from './xOutils';
export * from './xStaticFunctions';
export * from './V2/xTime';
export * from './V2/xMaths';
export * from './V2/xIcones';
export * from './xElement';

// Base controls (leaf nodes)
export * from './V2/xcontrols/BindableObject';
export * from './V2/xcontrols/ObservableCollection';
export * from './V2/xcontrols/xBr';
export * from './V2/xcontrols/xSpan';
export * from './V2/xcontrols/xDiv';
export * from './V2/xcontrols/xSVG';
export * from './V2/xcontrols/xHref';
export * from './V2/xcontrols/xIconeAvecAction';
export * from './V2/xcontrols/xStyle';

// Event container
export * from './V2/xcontrols/xxContainerEvent';

// UI controls
export * from './V2/xcontrols/xxLabel';
export * from './V2/xcontrols/xxBouton';
export * from './V2/xcontrols/xxPageWrapper';

export * from './V2/xcontrols/xxChart';
export * from './V2/xcontrols/showroom/xxShowRoom';

