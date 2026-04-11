/**
 * concat-libs.mjs
 * Concatène les librairies externes → dist/libxElements.js
 * Équivalent de la tâche Gulp "jsLib"
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const LIBS = [
  'include/d3.js',
  'include/d3pie.min.js',
  'include/jquery-2.1.4.js',
  'include/alertify.js',
  'include/FileSaver.js',
  'include/jquery-ui-1.11.4.js',
  'include/jquery.ui.datepicker-fr.js',
  'include/dropzone.js',
  'include/jquery.colorpicker.js',
  'include/xlsx.full.min.js',
  'include/jsCookie.js',
];

console.log('Bundling external libs...');
console.time('  done');

const content = LIBS.map((lib, i) => {
  const file = resolve(root, lib);
  const src  = readFileSync(file, 'utf8');
  console.log(`  [${i + 1}/${LIBS.length}] ${lib}`);
  return src;
}).join('\n\n');

writeFileSync(resolve(root, 'dist/libxElements.js'), content, 'utf8');

console.timeEnd('  done');
console.log('→ dist/libxElements.js');
