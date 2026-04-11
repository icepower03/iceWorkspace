/**
 * watch-css.mjs
 * Surveille css/ et relance build-css.mjs à chaque modification
 * Équivalent de la tâche Gulp "attacherxElements"
 */

import { watch } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, '..');
const cssDir    = resolve(root, 'css');

let debounceTimer = null;

function build() {
  console.log('\n── CSS change detected ──────────────────────────');
  try {
    execSync('node scripts/build-css.mjs', { cwd: root, stdio: 'inherit' });
  } catch {
    // l'erreur est déjà affichée via stdio: 'inherit'
  }
}

function onFileChange(event, filename) {
  if (!filename?.endsWith('.scss')) return;
  // Debounce : évite les compilations multiples si plusieurs fichiers changent en même temps
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(build, 150);
}

// Build initial
build();

// Watcher récursif sur css/
watch(cssDir, { recursive: true }, onFileChange);
console.log(`\nWatching ${cssDir} ...  (Ctrl+C pour arrêter)\n`);
