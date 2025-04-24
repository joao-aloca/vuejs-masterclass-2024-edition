import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [VueRouter(), vue(), vueDevTools()],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
