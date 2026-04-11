import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Root = dossier parent (AUTRES_SOURCES/) pour que iceLib/ et iceSample/
  // soient tous deux accessibles via des chemins relatifs depuis l'HTML.
  //   /iceSample/index.html   → AUTRES_SOURCES/iceSample/index.html
  //   /iceLib/jsBin/x.js      → AUTRES_SOURCES/iceLib/jsBin/x.js  (via "../iceLib/...")
  root: resolve(__dirname, '..'),

  server: {
    port: 5173,
    open: '/iceSample/index.html',
  },
});
