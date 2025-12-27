import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const currentDir = dirname(fileURLToPath(import.meta.url));


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    preprocessorOptions:{
      scss:{
         additionalData:`
         @use "${join(currentDir, './src/styles/_breakpoints.scss')}" as *;
         @use "${join(currentDir, './src/styles/_media.scss')}" as *;
         ` ,
      },
    },
  },
})
