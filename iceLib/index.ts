// iceLib — ESM entry point
// Phase 2: exports what has been migrated to ESM

// Méthodes builder sur xElementHolder.prototype (doit être importé en premier)
import './iceElementHolderBuilders';
// Globals pour compatibilité fichiers @ts-nocheck (pattern global-scripts)
import './iceGlobals';

// Initialisation
export { xLib } from './iceInit';

// Base types & classes
export * from './V2/iceBase';
export * from './V2/iceCache';
export * from './V2/iceLString';
export * from './V2/iceDomUtils';
export * from './iceOutils';
export * from './iceStaticFunctions';
export * from './V2/iceTime';
export * from './V2/iceMaths';
export * from './V2/iceIcones';
export * from './iceElement';

// Base controls (leaf nodes)
export * from './V2/xcontrols/BindableObject';
export * from './V2/xcontrols/ObservableCollection';
export * from './V2/xcontrols/iceBr';
export * from './V2/xcontrols/iceSpan';
export * from './V2/xcontrols/iceDiv';
export * from './V2/xcontrols/iceSVG';
export * from './V2/xcontrols/iceHref';
export * from './V2/xcontrols/iceIconeAvecAction';
export * from './V2/xcontrols/iceStyle';

// Event container
export * from './V2/xcontrols/ice2ContainerEvent';

// UI controls
export * from './V2/xcontrols/ice2Label';
export * from './V2/xcontrols/ice2Bouton';
export * from './V2/xcontrols/ice2PageWrapper';

export * from './V2/xcontrols/ice2Chart';
export * from './V2/xcontrols/showroom/ice2ShowRoom';

