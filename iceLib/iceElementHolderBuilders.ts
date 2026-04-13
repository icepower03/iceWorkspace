// @ts-nocheck
// Restaure les méthodes builder sur xElementHolder.prototype (pattern original iceElements)
// Importé au début de index.ts pour garantir l'exécution avant toute instanciation.
// Nécessaire car ESM interdit les imports circulaires dans iceElement.ts lui-même.

import { xElementHolder } from './iceElement';
import { iceDiv } from './V2/xcontrols/iceDiv';
import { iceSpan } from './V2/xcontrols/iceSpan';
import { iceUl } from './V2/xcontrols/iceUl';
import { xInputText } from './V2/xcontrols/iceInput';
import { iceInputCheckBox } from './V2/xcontrols/iceInputCheckBox';
import { iceInputDate, xInputDateAndTime } from './V2/xcontrols/iceInputDate';
import { ice2Label } from './V2/xcontrols/ice2Label';
import { ice2Bouton } from './V2/xcontrols/ice2Bouton';
import { ice2LabelModifiable } from './V2/xcontrols/ice2LabelModifiable';
import { ice2LabelContainer } from './V2/xcontrols/ice2LabelContainer';
import { ice2LabelTimeModifiable } from './V2/xcontrols/ice2LabelTimeModifiable';
import { ice2CheckBox } from './V2/xcontrols/ice2CheckBox';
import { ice2RadioButton } from './V2/xcontrols/ice2RadioButton';
import { ice2AutoComplete } from './V2/xcontrols/ice2AutoComplete';
import { ice2Menu } from './V2/xcontrols/ice2Menu';
import { ice2ListChoix } from './V2/xcontrols/ice2ListChoix';
import { ice2ListWrapper } from './V2/xcontrols/ice2ListWrapper';
import { ice2ListeChoixLang } from './V2/xcontrols/ice2ListChoixLang';
import { ice2TableauWrapper } from './V2/xcontrols/ice2Tableau';
import { ice2StackPanel } from './V2/xcontrols/ice2StackPanel';
import { ice2DockPanelDeprecated } from './V2/xcontrols/ice2DockPanel';
import { ice2WrapPanel } from './V2/xcontrols/ice2WrapPanel';
import { ice2TabControl } from './V2/xcontrols/ice2TabControl';
import { ice2TreeTabControl } from './V2/xcontrols/ice2TreeTabControl';
import { ice2ZoneModulable } from './V2/xcontrols/ice2ZoneModulable';
import { ice2ToolTip } from './V2/xcontrols/ice2ToolTip';
import { ice2Arbre } from './V2/xcontrols/ice2Arbre';
import { ice2InputIntellisense } from './V2/xcontrols/ice2InputIntellisense';
import { ice2PageWrapper } from './V2/xcontrols/ice2PageWrapper';

function _b(ctor, o, out) {
    const d = new ctor(o);
    if (out != null) out.content = d;
    this.append(d);
    return this;
}

xElementHolder.prototype.xdiv                  = function(o, out) { return _b.call(this, iceDiv, o, out); };
xElementHolder.prototype.xspan                 = function(o, out) { return _b.call(this, iceSpan, o, out); };
xElementHolder.prototype.xul                   = function(o, out) { return _b.call(this, iceUl, o, out); };
xElementHolder.prototype.xinputText            = function(o, out) { return _b.call(this, xInputText, o, out); };
xElementHolder.prototype.xinputCheckBox        = function(o, out) { return _b.call(this, iceInputCheckBox, o, out); };
xElementHolder.prototype.xinputDate            = function(o)      { this.append(new iceInputDate(o)); return this; };
xElementHolder.prototype.xinputDateAndTime     = function(o)      { this.append(new xInputDateAndTime(o)); return this; };
xElementHolder.prototype.ice2Label               = function(o, out) { return _b.call(this, ice2Label, o, out); };
xElementHolder.prototype.ice2Bouton              = function(o, out) { return _b.call(this, ice2Bouton, o, out); };
xElementHolder.prototype.ice2LabelModifiable     = function(o)      { this.append(new ice2LabelModifiable(o)); return this; };
xElementHolder.prototype.ice2LabelTimeModifiable = function(o)      { this.append(new ice2LabelTimeModifiable(o)); return this; };
xElementHolder.prototype.ice2LabelContainer      = function(o, out) { return _b.call(this, ice2LabelContainer, o, out); };
xElementHolder.prototype.ice2CheckBox            = function(o, out) { return _b.call(this, ice2CheckBox, o, out); };
xElementHolder.prototype.ice2RadioButton         = function(o, out) { return _b.call(this, ice2RadioButton, o, out); };
xElementHolder.prototype.ice2AutoComplete        = function(o)      { this.append(new ice2AutoComplete(o)); return this; };
xElementHolder.prototype.ice2Menu                = function(o)      { this.append(new ice2Menu(o)); return this; };
xElementHolder.prototype.ice2ListChoix           = function(o)      { this.append(new ice2ListChoix(o)); return this; };
xElementHolder.prototype.ice2List                = function(o, out) { return _b.call(this, ice2ListWrapper, o, out); };
xElementHolder.prototype.ice2ListeChoixLang      = function(o, out) { return _b.call(this, ice2ListeChoixLang, o, out); };
xElementHolder.prototype.ice2Tableau             = function(o, out) { return _b.call(this, ice2TableauWrapper, o, out); };
xElementHolder.prototype.ice2StackPanel          = function(o, out) { return _b.call(this, ice2StackPanel, o, out); };
xElementHolder.prototype.ice2DockPanelDeprecated = function(o, out) { return _b.call(this, ice2DockPanelDeprecated, o, out); };
xElementHolder.prototype.ice2WrapPanel           = function(o, out) { return _b.call(this, ice2WrapPanel, o, out); };
xElementHolder.prototype.ice2TabControl          = function(o)      { this.append(new ice2TabControl(o)); return this; };
xElementHolder.prototype.ice2TreeTabControl      = function(o, out) { return _b.call(this, ice2TreeTabControl, o, out); };
xElementHolder.prototype.ice2ZoneModulable       = function(o, out) { return _b.call(this, ice2ZoneModulable, o, out); };
xElementHolder.prototype.ice2ToolTip             = function(o)      { this.append(new ice2ToolTip(o)); return this; };
xElementHolder.prototype.ice2Arbre               = function(o)      { this.append(new ice2Arbre(o)); return this; };
xElementHolder.prototype.ice2InputIntellisense   = function(o, out) { return _b.call(this, ice2InputIntellisense, o, out); };
xElementHolder.prototype.ice2Page                = function(o, out) { return _b.call(this, ice2PageWrapper, o, out); };
