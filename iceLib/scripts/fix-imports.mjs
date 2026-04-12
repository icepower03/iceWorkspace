import fs from 'fs';
import path from 'path';

// Mapping: symbol -> source file (relative to V2/xcontrols/)
const symbolMap = {
  // From ./xxBouton
  'enumTailleBouton': './xxBouton',
  'enumTypeBouton': './xxBouton',
  'enumStyleBouton': './xxBouton',
  'enumCouleurBouton': './xxBouton',
  'enumPositionnementResponsiveBouton': './xxBouton',
  // From ./xxLabel
  'enumTypeLabel': './xxLabel',
  'enumHabillageLabel': './xxLabel',
  'enumMiseEnFormeLabel': './xxLabel',
  // From ./xxLabelContainer
  'enumJustificationDuContenu': './xxLabelContainer',
  'enumPositionDuContenu': './xxLabelContainer',
  // From ../xBase
  'enumCouleur': '../xBase',
  'enumVisibility': '../xBase',
  'enumPosition': '../xBase',
  'enumCote': '../xBase',
  'enumCurseur': '../xBase',
  'enumTypeOrientation': '../xBase',
  // From ./xxWrapPanel
  'enumAlignementContenu': './xxWrapPanel',
  'enumAlignementVerticalWrapPanel': './xxWrapPanel',
  'enumAlignementHorizontalWrapPanel': './xxWrapPanel',
  // From ./xxBoxer
  'enumBoxerMode': './xxBoxer',
  'enumBoxerTaille': './xxBoxer',
  // From ./xxDialog
  'enumTypeAlerte': './xxDialog',
  'enumDialogTypeBouton': './xxDialog',
  // From ../xIcones
  'enumIconeP12': '../xIcones',
  'enumIconeSvg': '../xIcones',
  'IconeP12': '../xIcones',
  'IconeMiniP12': '../xIcones',
  'IconeSvg': '../xIcones',
  'IconeExterne': '../xIcones',
  'tailleIcone': '../xIcones',
  'Icone': '../xIcones',
  // From ./xSeparateur
  'enumEpaisseurSeparation': './xSeparateur',
  // From ./xxImageTabByte
  'enumTypeImage': './xxImageTabByte',
  // From ./xxCheckBox
  'enumTypeCheckbox': './xxCheckBox',
  // From ./xxListWrapper
  'enumTypeTri': './xxListWrapper',
  // From ./xxToolTip
  'enumXxToolTipMode': './xxToolTip',
  'enumXxToolTipPositionHeight': './xxToolTip',
  'enumXxToolTipPositionWidth': './xxToolTip',
  // From ./xxZoneRepliable
  'enumXxZoneRepliablePosition': './xxZoneRepliable',
  'enumXxZoneRepliableCouleurFleche': './xxZoneRepliable',
  // From ./xxVolet
  'enumPositionVolet': './xxVolet',
  // From ./xIconeAvecAction
  'enumPositionIconeAction': './xIconeAvecAction',
  // From ./xHref
  'enumTypeOuvertureHref': './xHref',
  // From ./xxDockPanel
  'DockPosition': './xxDockPanel',
};

const dir = 'V2/xcontrols';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
let totalChanged = 0;

for (const fname of files) {
  const fpath = path.join(dir, fname);
  let content = fs.readFileSync(fpath, 'utf8');
  if (!content.includes('// @ts-nocheck')) continue;

  // Parse existing imports
  const importsBySource = {};
  const imported = new Set();
  const importRegex = /^import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"];?/gm;
  let m;
  while ((m = importRegex.exec(content)) !== null) {
    const symbols = m[1].split(',').map(s => s.trim().split(' as ')[0].trim()).filter(Boolean);
    const src = m[2];
    symbols.forEach(s => imported.add(s));
    if (!importsBySource[src]) importsBySource[src] = { symbols: new Set(), fullMatch: m[0] };
    symbols.forEach(s => importsBySource[src].symbols.add(s));
  }

  // Find needed imports
  const needed = {}; // source -> Set of symbols
  for (const [sym, src] of Object.entries(symbolMap)) {
    if (imported.has(sym)) continue;
    // Check if used in file (simple substring - good enough for symbols with dots or as types)
    if (!content.includes(sym)) continue;
    if (!needed[src]) needed[src] = new Set();
    needed[src].add(sym);
  }

  if (Object.keys(needed).length === 0) continue;

  let changed = false;
  const addedSymbols = [];

  for (const [src, symsSet] of Object.entries(needed)) {
    const newSyms = [...symsSet];

    if (importsBySource[src]) {
      // Extend existing import
      const existing = importsBySource[src];
      const toAdd = newSyms.filter(s => !existing.symbols.has(s));
      if (toAdd.length === 0) continue;

      const allSyms = [...existing.symbols, ...toAdd];
      const newLine = `import { ${allSyms.join(', ')} } from '${src}';`;
      content = content.replace(existing.fullMatch, newLine);
      // Update for subsequent replacements
      existing.fullMatch = newLine;
      toAdd.forEach(s => existing.symbols.add(s));
      toAdd.forEach(s => addedSymbols.push(s));
      changed = true;
    } else {
      // Add new import line after last import
      const newLine = `import { ${newSyms.join(', ')} } from '${src}';`;
      // Find position after last import
      const lastImportPos = [...content.matchAll(/^import[^;]+;/gm)].pop();
      if (lastImportPos) {
        const insertAt = lastImportPos.index + lastImportPos[0].length;
        content = content.slice(0, insertAt) + '\n' + newLine + content.slice(insertAt);
      } else {
        content = content.replace('// @ts-nocheck\n', '// @ts-nocheck\n' + newLine + '\n');
      }
      importsBySource[src] = { symbols: new Set(newSyms), fullMatch: newLine };
      newSyms.forEach(s => addedSymbols.push(s));
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(fpath, content, 'utf8');
    totalChanged++;
    console.log(`Updated ${fname}: +${addedSymbols.join(', ')}`);
  }
}
console.log(`\nTotal files updated: ${totalChanged}`);
