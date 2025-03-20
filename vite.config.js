import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.png', '**/*.PNG'], // 讓 Vite 正確處理 PNG 檔案
})
