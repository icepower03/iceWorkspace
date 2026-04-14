const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = 'c:/AUTRES_SOURCES/iceWorkspace/iceLib';

const BASE_MAP = {
  // iceBase.ts
  iXElement:'../iceBase', iXElementHolder:'../iceBase', iXElementHolderEnable:'../iceBase',
  optionsAffichage:'../iceBase', OptionsHtml:'../iceBase', OptionsCotesCSS:'../iceBase',
  OptionTailleCss:'../iceBase', enumCouleur:'../iceBase', enumCouleurHexa:'../iceBase',
  enumVisibility:'../iceBase', Visibility:'../iceBase', enumThemes:'../iceBase',
  enumThemeLuminosite:'../iceBase', enumCote:'../iceBase', enumStyleBorderCSS:'../iceBase',
  enumCurseur:'../iceBase', enumPosition:'../iceBase', enumTypeOrientation:'../iceBase',
  Container:'../iceBase', Arbre:'../iceBase', DictionnaireUtils:'../iceBase',
  xClass:'../iceBase', Dictionnaire:'../iceBase', CleValeur:'../iceBase',
  // iceElement.ts
  xElementHolder:'../../iceElement', iceElement:'../../iceElement',
  // iceStaticFunctions.ts
  cachericeElements:'../../iceStaticFunctions', affichericeElements:'../../iceStaticFunctions',
  videriceElements:'../../iceStaticFunctions', assignerObjet:'../../iceStaticFunctions',
  // iceOutils.ts
  iceOutils:'../../iceOutils', ETypeAlertify:'../../iceOutils', EKeys:'../../iceOutils',
  ETypeStorage:'../../iceOutils', etype_messagebox:'../../iceOutils',
  EnumLibrairieJs:'../../iceOutils', EPositionAlertify:'../../iceOutils', eventKey:'../../iceOutils',
  // iceIcones.ts
  Icone:'../iceIcones', IconeP12:'../iceIcones', IconeSvg:'../iceIcones',
  IconeTuile:'../iceIcones', IconeV2:'../iceIcones', IconeMiniP12:'../iceIcones',
  IconeExterne:'../iceIcones', IconeTypeExamen:'../iceIcones', enumIconeP12:'../iceIcones',
  enumIconeSvg:'../iceIcones', enumIconeTuile:'../iceIcones', enumIconeZeusSvg:'../iceIcones',
  tailleIcone:'../iceIcones', enumIconeAction:'../iceIcones', enumListeIcones:'../iceIcones',
  enumFormeFondIconeSvg:'../iceIcones', OptionsIconeExterne:'../iceIcones', OptionsIconeSVG:'../iceIcones',
  // utils
  iceMaths:'../iceMaths', iceTime:'../iceTime', iceLString:'../iceLString',
  DateSerialisable:'../utils/DateSerialisableExtend', HelperGeneric:'../utils/HelperGeneric',
  // xcontrols/
  iceDiv:'./iceDiv', OptionsDiv:'./iceDiv',
  iceSpan:'./iceSpan', iceStyle:'./iceStyle', iceSVG:'./iceSVG', iceBr:'./iceBr',
  BindableObject:'./BindableObject', ObservableCollection:'./ObservableCollection',
  xInputText:'./iceInput', OptionsInput:'./iceInput', enumStyleInput:'./iceInput',
  enumBackgroundInput:'./iceInput', OptionsInputNumericGenerique:'./iceInput',
  ice2Label:'./ice2Label', enumTypeLabel:'./ice2Label', enumHabillageLabel:'./ice2Label',
  enumMiseEnFormeLabel:'./ice2Label',
  ice2LabelContainer:'./ice2LabelContainer', enumPositionDuContenu:'./ice2LabelContainer',
  enumJustificationDuContenu:'./ice2LabelContainer',
  ice2LabelModifiable:'./ice2LabelModifiable',
  ice2LabelDateModifiable:'./ice2LabelDateModifiable',
  ice2LabelTimeModifiable:'./ice2LabelTimeModifiable',
  ice2Grid:'./ice2Grid', ice2GridItem:'./ice2Grid', enumAlignementContenu:'./ice2Grid',
  OptionsGridItem:'./ice2Grid',
  ice2WrapPanel:'./ice2WrapPanel', enumAlignementVerticalWrapPanel:'./ice2WrapPanel',
  enumAlignementHorizontalWrapPanel:'./ice2WrapPanel',
  ice2StackPanel:'./ice2StackPanel',
  ice2Bouton:'./ice2Bouton', enumTailleBouton:'./ice2Bouton', enumTypeBouton:'./ice2Bouton',
  enumStyleBouton:'./ice2Bouton', enumCouleurBouton:'./ice2Bouton',
  enumPositionnementResponsiveBouton:'./ice2Bouton', enumComportementBouton:'./ice2Bouton',
  ice2RadioButton:'./ice2RadioButton', itemRadioButton:'./ice2RadioButton', ETypeBouton:'./ice2RadioButton',
  ice2CheckBox:'./ice2CheckBox', enumTypeCheckbox:'./ice2CheckBox',
  ice2Dialog:'./ice2Dialog', enumTypeAlerte:'./ice2Dialog', enumDialogTypeBouton:'./ice2Dialog',
  enumPositionAlerte:'./ice2Dialog',
  ice2Menu:'./ice2Menu', ice2MenuContextuel:'./ice2MenuContextuel',
  ice2ListeDeroulante:'./ice2ListeDeroulante', ice2ListChoix:'./ice2ListChoix',
  ice2ListWrapper:'./ice2ListWrapper', enumTypeTri:'./ice2ListWrapper',
  ice2ListCheckBox:'./ice2ListCheckBox', ice2ListeSelection:'./ice2ListeSelection',
  ice2ListeDeroulanteAutomatique:'./ice2ListeDeroulanteAutomatique',
  ice2ListeDeroulanteSimple:'./ice2ListeDeroulanteSimple',
  iceInputDate:'./iceInputDate', xInputTime:'./iceInputDate', xInputDateAndTime:'./iceInputDate',
  enumTypeAffichePicker:'./iceInputDate',
  iceDatePicker:'./iceDatePicker', iceTimePicker:'./iceTimePicker',
  ice2InputNumerique:'./ice2InputNumerique', ice2InputSpeech:'./ice2InputSpeech',
  ice2TabControl:'./ice2TabControl', ice2TabItem:'./ice2TabControl', OptionsTabItem:'./ice2TabControl',
  ice2Zoom:'./ice2Zoom', enumAffichageZoom:'./ice2Zoom',
  ice2Boxer:'./ice2Boxer', enumBoxerMode:'./ice2Boxer', enumBoxerTaille:'./ice2Boxer',
  enumPositionOrigine:'./ice2Boxer',
  ice2PageWrapper:'./ice2PageWrapper', enumAlignementZone:'./ice2PageWrapper', OptionsPage:'./ice2PageWrapper',
  ice2DockPanelDeprecated:'./ice2DockPanel', DockPosition:'./ice2DockPanel',
  ice2ProgressBar:'./ice2ProgressBar',
  ice2ToolTip:'./ice2ToolTip', ice2ToolTipBouton:'./ice2ToolTip', enumXxToolTipMode:'./ice2ToolTip',
  enumXxToolTipPositionHeight:'./ice2ToolTip', enumXxToolTipPositionWidth:'./ice2ToolTip',
  ice2Volet:'./ice2Volet', enumPositionVolet:'./ice2Volet',
  ice2ZoneRepliable:'./ice2ZoneRepliable', ice2ZoneModulable:'./ice2ZoneModulable',
  ice2NavOngletControl:'./ice2NavOngletControl', ice2NavOngletItem:'./ice2NavOngletControl',
  ice2Arbre:'./ice2Arbre', ice2AutoComplete:'./ice2AutoComplete', ice2Carrousel:'./ice2Carrousel',
  ice2BloqueEcran:'./ice2BloqueEcran', ice2ChoixCouleur:'./ice2ChoixCouleur',
  ice2ChoixOuiNon:'./ice2ChoixOuiNon', ice2Linker:'./ice2Linker',
  ice2TreeTabControl:'./ice2TreeTabControl', ice2Planneur:'./ice2Planneur',
  ice2ViewerPDF:'./ice2ViewerPDF', ice2ContainerEvent:'./ice2ContainerEvent',
  ice2ImageTabByte:'./ice2ImageTabByte', ice2TexteEnrichi:'./ice2TexteEnrichi',
  ice2TableauWrapper:'./ice2Tableau', dicoImagesXElement:'./ice2Tableau',
  ice2RouteContainer:'./ice2RouteContainer', ice2QrCodeReader:'./ice2QrCodeReader',
  ice2LecteurCarteMagnetique:'./ice2LecteurCarteMagnetique',
  ice2InputUploadImage:'./ice2InputUploadImage', ice2InputIntellisense:'./ice2InputIntellisense',
  ice2AssistantSaisieUtilisateur:'./ice2AssistantSaisieUser',
  iceLi:'./iceLi', iceUl:'./iceUl', iceCanvas:'./iceCanvas', iceImg:'./iceImg',
  iceTable:'./iceTable', iceIFrame:'./iceIFrame', iceInputCheckBox:'./iceInputCheckBox',
  iceInputFile:'./iceInputFile', iceInputTextAvecIcone:'./iceInputTextAvecIcone',
  iceSeparateur:'./iceSeparateur', iceCouleur:'./iceCouleur',
  // Planning
  PlanningRdv:'./PlanningElements', PlanningRessource:'./PlanningElements',
  PlanningDisponibilite:'./PlanningElements', enumTypeDispo:'./PlanningElements',
  PlanningParamUser:'./PlanningElements',
};

const XCONTROLS_BASE = path.join(ROOT, 'V2', 'xcontrols');

function resolveModPath(baseMod, filePath) {
  // baseMod est relatif à V2/xcontrols/
  // On calcule le chemin absolu de la cible puis on le relativise par rapport au fichier
  const absTarget = path.resolve(XCONTROLS_BASE, baseMod);
  let rel = path.relative(path.dirname(filePath), absTarget).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

function parseExistingImports(content) {
  const imports = {};
  const regex = /^import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/mg;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const symbols = m[1].split(',').map(s => s.trim()).filter(Boolean);
    const mod = m[2];
    if (!imports[mod]) imports[mod] = new Set();
    symbols.forEach(s => imports[mod].add(s));
  }
  return imports;
}

function addImports(filePath, missingSymbols) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf-8');
  const existingImports = parseExistingImports(content);

  // Groupe symboles → module résolu
  const toAdd = {};
  for (const sym of missingSymbols) {
    const baseMod = BASE_MAP[sym];
    if (!baseMod) continue;
    const mod = resolveModPath(baseMod, filePath);
    if (existingImports[mod] && existingImports[mod].has(sym)) continue;
    if (!toAdd[mod]) toAdd[mod] = [];
    if (!toAdd[mod].includes(sym)) toAdd[mod].push(sym);
  }

  if (Object.keys(toAdd).length === 0) return false;

  for (const [mod, symbols] of Object.entries(toAdd)) {
    const escaped = mod.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const importRegex = new RegExp(`(import\\s*\\{)([^}]*)(\\}\\s*from\\s*['"]${escaped}['"])`);
    if (importRegex.test(content)) {
      content = content.replace(importRegex, (match, p1, p2, p3) => {
        const existing = p2.split(',').map(s => s.trim()).filter(Boolean);
        const merged = [...new Set([...existing, ...symbols])].join(', ');
        return p1 + ' ' + merged + ' ' + p3;
      });
    } else {
      // Insère après le dernier import
      const lastImportIdx = content.lastIndexOf('\nimport ');
      const afterImport = content.indexOf('\n', lastImportIdx + 1);
      const insertPos = afterImport >= 0 ? afterImport + 1 : 0;
      const importLine = `import { ${symbols.join(', ')} } from '${mod}';\n`;
      content = content.slice(0, insertPos) + importLine + content.slice(insertPos);
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

function getTscErrors() {
  try {
    execSync('npx tsc --noEmit --project tsconfig.esm.json', { cwd: ROOT, stdio: 'pipe' });
    return '';
  } catch(e) {
    return (e.stdout || e.stderr || '').toString();
  }
}

function parseMissingSymbols(tscOutput) {
  const result = {};
  const regex = /^([^(]+)\(\d+,\d+\): error TS2304: Cannot find name '([^']+)'/mg;
  let m;
  while ((m = regex.exec(tscOutput)) !== null) {
    const rel = m[1].trim();
    const filePath = path.resolve(ROOT, rel);
    const symbol = m[2];
    if (!result[filePath]) result[filePath] = new Set();
    result[filePath].add(symbol);
  }
  return result;
}

console.log('Running tsc...');
const tscOutput = getTscErrors();
const missingByFile = parseMissingSymbols(tscOutput);
console.log('Files with missing symbols:', Object.keys(missingByFile).length);

let totalFixed = 0;
for (const [filePath, symbols] of Object.entries(missingByFile)) {
  if (addImports(filePath, symbols)) {
    totalFixed++;
    console.log('Fixed:', path.relative(ROOT, filePath).replace(/\\/g, '/'));
  }
}
console.log('\nTotal files fixed:', totalFixed);
