/**
 * build-css.mjs
 * Compile css/x.scss → jsBin/x.css
 * Remplace les url("...?embed") par des data URI base64
 */

import * as sass from 'sass';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const MIME_TYPES = {
  png:  'image/png',
  svg:  'image/svg+xml',
  jpg:  'image/jpeg',
  jpeg: 'image/jpeg',
  gif:  'image/gif',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ico:  'image/x-icon',
};

function inlineEmbedAssets(css) {
  let inlined = 0;
  let failed  = 0;

  const result = css.replace(/url\(["']?([^"')#\s]+\?embed)["']?\)/g, (match, urlWithEmbed) => {
    const filePath = urlWithEmbed.replace('?embed', '');
    const absolutePath = resolve(root, filePath);
    try {
      const data   = readFileSync(absolutePath);
      const ext    = extname(filePath).slice(1).toLowerCase();
      const mime   = MIME_TYPES[ext] ?? 'application/octet-stream';
      inlined++;
      return `url("data:${mime};base64,${data.toString('base64')}")`;
    } catch {
      process.stderr.write(`  ⚠  Cannot inline: ${filePath}\n`);
      failed++;
      return match;
    }
  });

  console.log(`  Inlined ${inlined} assets${failed ? `, ${failed} failed` : ''}`);
  return result;
}

// ── Compilation SCSS ────────────────────────────────────────────────────────
console.log('Building CSS...');
console.time('  done');

const compiled = sass.compile(resolve(root, 'css/x.scss'), {
  loadPaths: [root],
  silenceDeprecations: ['import'],  // @import deprecated dans sass >= 1.80
});

const finalCss = inlineEmbedAssets(compiled.css);
writeFileSync(resolve(root, 'jsBin/x.css'), finalCss, 'utf8');

console.timeEnd('  done');
console.log('→ jsBin/x.css');
