/**
 * rename-x-to-ice.mjs
 * Passe 1 : fichiers .ts  — renomme les fichiers + remplace dans le contenu
 * Passe 2 : fichiers .scss — renomme les fichiers + remplace dans le contenu
 *           (uniquement sur les lignes de moins de 100 caractères)
 */

import fs   from 'fs';
import path from 'path';

function findFiles(dir, ext, ignore = ['node_modules', 'dist'], result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignore.includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findFiles(full, ext, ignore, result);
    else if (entry.name.endsWith(ext)) result.push(full);
  }
  return result;
}

// ── Table de correspondance (ordre : les plus longs d'abord) ────────────────
const RENAMES = [
  // contrôles (les plus longs d'abord)
  ['xSeparateurAvecFleche', 'iceSeparateurAvecFleche'],
  ['xInputTextAvecIcone',   'iceInputTextAvecIcone'],
  ['xIconeAvecAction',      'iceIconeAvecAction'],
  ['xInputCheckBox',        'iceInputCheckBox'],
  ['xInputDate',            'iceInputDate'],
  ['xInputFile',            'iceInputFile'],
  ['xDatePicker',           'iceDatePicker'],
  ['xTimePicker',           'iceTimePicker'],
  ['xSeparateur',           'iceSeparateur'],
  ['xCouleur',              'iceCouleur'],
  ['xIFrame',               'iceIFrame'],
  ['xCanvas',               'iceCanvas'],
  ['xInput',                'iceInput'],
  ['xStyle',                'iceStyle'],
  ['xTable',                'iceTable'],
  ['xImage',                'iceImage'],
  ['xHref',                 'iceHref'],
  ['xSpan',                 'iceSpan'],
  ['xSVG',                  'iceSVG'],
  ['xImg',                  'iceImg'],
  ['xDiv',                  'iceDiv'],
  ['xBr',                   'iceBr'],
  ['xLi',                   'iceLi'],
  ['xUl',                   'iceUl'],
  // racine iceLib
  ['xElementHolderBuilders','iceElementHolderBuilders'],
  ['xStaticFunctions',      'iceStaticFunctions'],
  ['xElement',              'iceElement'],
  ['xGlobals',              'iceGlobals'],
  ['xQuery',                'iceQuery'],
  ['xInit',                 'iceInit'],
  // infrastructure V2
  ['xElementsFramework',    'iceElementsFramework'],
  ['xListeIconeSVG',        'iceListeIconeSVG'],
  ['xHTMLElement',          'iceHTMLElement'],
  ['xDomUtils',             'iceDomUtils'],
  ['xLString',              'iceLString'],
  ['xOutils',               'iceOutils'],
  ['xIcones',               'iceIcones'],
  ['xCache',                'iceCache'],
  ['xMaths',                'iceMaths'],
  ['xBase',                 'iceBase'],
  ['xTime',                 'iceTime'],
];

const ROOT = path.resolve(import.meta.dirname, '..');

// ── Utilitaires ─────────────────────────────────────────────────────────────

function applyRenames(text) {
  for (const [from, to] of RENAMES) {
    // word-boundary côté gauche : pas précédé d'une lettre/chiffre/underscore
    // word-boundary côté droit  : pas suivi  d'une lettre/chiffre/underscore
    const re = new RegExp(`(?<![\\w])${from}(?![\\w])`, 'g');
    text = text.replace(re, to);
  }
  return text;
}

function applyRenamesShortLines(text) {
  const lines = text.split('\n');
  const result = lines.map(line =>
    line.length < 100 ? applyRenames(line) : line
  );
  return result.join('\n');
}

function renameFile(oldPath) {
  const dir  = path.dirname(oldPath);
  const base = path.basename(oldPath);
  const newBase = applyRenames(base);
  if (newBase === base) return null;
  const newPath = path.join(dir, newBase);
  fs.renameSync(oldPath, newPath);
  return newPath;
}

function processContent(filePath, shortLinesOnly = false) {
  const original = fs.readFileSync(filePath, 'utf8');
  const updated  = shortLinesOnly
    ? applyRenamesShortLines(original)
    : applyRenames(original);
  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    return true;
  }
  return false;
}

// ── Passe 1 : TypeScript ─────────────────────────────────────────────────────
console.log('\n══ Passe 1 — TypeScript (.ts) ══════════════════════════════');

const tsFiles = findFiles(ROOT, '.ts');

let tsRenamed = 0, tsContentChanged = 0;

// 1a. Remplacer le contenu d'abord (les imports référencent encore les anciens noms)
for (const f of tsFiles) {
  if (processContent(f)) tsContentChanged++;
}

// 1b. Renommer les fichiers
for (const f of tsFiles) {
  // le fichier a peut-être déjà été renommé — on vérifie l'existence
  if (!fs.existsSync(f)) continue;
  const newPath = renameFile(f);
  if (newPath) {
    console.log(`  ${path.relative(ROOT, f)}  →  ${path.basename(newPath)}`);
    tsRenamed++;
  }
}

console.log(`  Fichiers renommés : ${tsRenamed}`);
console.log(`  Contenus modifiés : ${tsContentChanged}`);

// ── Passe 2 : SCSS ───────────────────────────────────────────────────────────
console.log('\n══ Passe 2 — SCSS (.scss) ═══════════════════════════════════');

const scssFiles = findFiles(ROOT, '.scss');

let scssRenamed = 0, scssContentChanged = 0;

// 2a. Remplacer le contenu (lignes < 100 car. seulement)
for (const f of scssFiles) {
  if (processContent(f, true)) scssContentChanged++;
}

// 2b. Renommer les fichiers
for (const f of scssFiles) {
  if (!fs.existsSync(f)) continue;
  const newPath = renameFile(f);
  if (newPath) {
    console.log(`  ${path.relative(ROOT, f)}  →  ${path.basename(newPath)}`);
    scssRenamed++;
  }
}

console.log(`  Fichiers renommés : ${scssRenamed}`);
console.log(`  Contenus modifiés : ${scssContentChanged}`);

console.log('\n✓ Terminé.\n');
