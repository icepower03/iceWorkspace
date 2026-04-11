import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            name: 'iceLib',
            fileName: 'iceLib',
            formats: ['es'],
        },
        rollupOptions: {
            // jQuery reste externe (chargé séparément via libxElements.js)
            external: ['jquery'],
            output: {
                globals: { jquery: '$' },
            },
        },
        outDir: 'dist/lib',
        sourcemap: true,
    },
});
