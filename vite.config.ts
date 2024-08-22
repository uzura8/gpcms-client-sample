// import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
      // '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  publicDir: 'static',
  build: {
    outDir: 'public'
  }
})
