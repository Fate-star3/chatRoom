import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    // 配置 css-module
    modules: {
      // 开启 camelCase 格式变量名转换
      localsConvention: 'camelCase',
      // 类名 前缀
      generateScopedName: '[local]_[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true // 支持内联 JavaScript
      }
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {}
  }
})
