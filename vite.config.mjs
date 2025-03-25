import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checkerPlugin from 'vite-plugin-checker';
import eslintPlugin from 'vite-plugin-eslint';

const IS_DEV_BUILD = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    IS_DEV_BUILD && eslintPlugin({ exclude: ['/virtual:/**', 'node_modules/**'] }),
    IS_DEV_BUILD &&
      checkerPlugin({
        typescript: true,
        overlay: { initialIsOpen: false },
      }),
  ],
});
