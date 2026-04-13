// @ts-nocheck
// Restaure les méthodes builder sur xElementHolder.prototype (pattern original xElements)
// Importé au début de index.ts pour garantir l'exécution avant toute instanciation.
// Nécessaire car ESM interdit les imports circulaires dans xElement.ts lui-même.

import { xElementHolder } from './xElement';
import { xDiv } from './V2/xcontrols/xDiv';
import { xSpan } from './V2/xcontrols/xSpan';
import { xUl } from './V2/xcontrols/xUl';
import { xInputText } from './V2/xcontrols/xInput';
import { xInputCheckBox } from './V2/xcontrols/xInputCheckBox';
import { xInputDate, xInputDateAndTime } from './V2/xcontrols/xInputDate';
import { xxLabel } from './V2/xcontrols/xxLabel';
import { xxBouton } from './V2/xcontrols/xxBouton';
import { xxLabelModifiable } from './V2/xcontrols/xxLabelModifiable';
import { xxLabelContainer } from './V2/xcontrols/xxLabelContainer';
import { xxLabelTimeModifiable } from './V2/xcontrols/xxLabelTimeModifiable';
import { xxCheckBox } from './V2/xcontrols/xxCheckBox';
import { xxRadioButton } from './V2/xcontrols/xxRadioButton';
import { xxAutoComplete } from './V2/xcontrols/xxAutoComplete';
import { xxMenu } from './V2/xcontrols/xxMenu';
import { xxListChoix } from './V2/xcontrols/xxListChoix';
import { xxListWrapper } from './V2/xcontrols/xxListWrapper';
import { xxListeChoixLang } from './V2/xcontrols/xxListChoixLang';
import { xxTableauWrapper } from './V2/xcontrols/xxTableau';
import { xxStackPanel } from './V2/xcontrols/xxStackPanel';
import { xxDockPanelDeprecated } from './V2/xcontrols/xxDockPanel';
import { xxWrapPanel } from './V2/xcontrols/xxWrapPanel';
import { xxTabControl } from './V2/xcontrols/xxTabControl';
import { xxTreeTabControl } from './V2/xcontrols/xxTreeTabControl';
import { xxZoneModulable } from './V2/xcontrols/xxZoneModulable';
import { xxToolTip } from './V2/xcontrols/xxToolTip';
import { xxArbre } from './V2/xcontrols/xxArbre';
import { xxInputIntellisense } from './V2/xcontrols/xxInputIntellisense';
import { xxPageWrapper } from './V2/xcontrols/xxPageWrapper';

function _b(ctor, o, out) {
    const d = new ctor(o);
    if (out != null) out.content = d;
    this.append(d);
    return this;
}

xElementHolder.prototype.xdiv                  = function(o, out) { return _b.call(this, xDiv, o, out); };
xElementHolder.prototype.xspan                 = function(o, out) { return _b.call(this, xSpan, o, out); };
xElementHolder.prototype.xul                   = function(o, out) { return _b.call(this, xUl, o, out); };
xElementHolder.prototype.xinputText            = function(o, out) { return _b.call(this, xInputText, o, out); };
xElementHolder.prototype.xinputCheckBox        = function(o, out) { return _b.call(this, xInputCheckBox, o, out); };
xElementHolder.prototype.xinputDate            = function(o)      { this.append(new xInputDate(o)); return this; };
xElementHolder.prototype.xinputDateAndTime     = function(o)      { this.append(new xInputDateAndTime(o)); return this; };
xElementHolder.prototype.xxLabel               = function(o, out) { return _b.call(this, xxLabel, o, out); };
xElementHolder.prototype.xxBouton              = function(o, out) { return _b.call(this, xxBouton, o, out); };
xElementHolder.prototype.xxLabelModifiable     = function(o)      { this.append(new xxLabelModifiable(o)); return this; };
xElementHolder.prototype.xxLabelTimeModifiable = function(o)      { this.append(new xxLabelTimeModifiable(o)); return this; };
xElementHolder.prototype.xxLabelContainer      = function(o, out) { return _b.call(this, xxLabelContainer, o, out); };
xElementHolder.prototype.xxCheckBox            = function(o, out) { return _b.call(this, xxCheckBox, o, out); };
xElementHolder.prototype.xxRadioButton         = function(o, out) { return _b.call(this, xxRadioButton, o, out); };
xElementHolder.prototype.xxAutoComplete        = function(o)      { this.append(new xxAutoComplete(o)); return this; };
xElementHolder.prototype.xxMenu                = function(o)      { this.append(new xxMenu(o)); return this; };
xElementHolder.prototype.xxListChoix           = function(o)      { this.append(new xxListChoix(o)); return this; };
xElementHolder.prototype.xxList                = function(o, out) { return _b.call(this, xxListWrapper, o, out); };
xElementHolder.prototype.xxListeChoixLang      = function(o, out) { return _b.call(this, xxListeChoixLang, o, out); };
xElementHolder.prototype.xxTableau             = function(o, out) { return _b.call(this, xxTableauWrapper, o, out); };
xElementHolder.prototype.xxStackPanel          = function(o, out) { return _b.call(this, xxStackPanel, o, out); };
xElementHolder.prototype.xxDockPanelDeprecated = function(o, out) { return _b.call(this, xxDockPanelDeprecated, o, out); };
xElementHolder.prototype.xxWrapPanel           = function(o, out) { return _b.call(this, xxWrapPanel, o, out); };
xElementHolder.prototype.xxTabControl          = function(o)      { this.append(new xxTabControl(o)); return this; };
xElementHolder.prototype.xxTreeTabControl      = function(o, out) { return _b.call(this, xxTreeTabControl, o, out); };
xElementHolder.prototype.xxZoneModulable       = function(o, out) { return _b.call(this, xxZoneModulable, o, out); };
xElementHolder.prototype.xxToolTip             = function(o)      { this.append(new xxToolTip(o)); return this; };
xElementHolder.prototype.xxArbre               = function(o)      { this.append(new xxArbre(o)); return this; };
xElementHolder.prototype.xxInputIntellisense   = function(o, out) { return _b.call(this, xxInputIntellisense, o, out); };
xElementHolder.prototype.xxPage                = function(o, out) { return _b.call(this, xxPageWrapper, o, out); };
