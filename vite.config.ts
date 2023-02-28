import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const env = process.env.ENV
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
  define: {
    'process.env.ENV': JSON.stringify(process.env.ENV),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  build: {
    sourcemap: true
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      // 配置跨域
      '^/api/.*': {
        // 当有 /api开头的地址是，代理到target地址
        target: 'http://localhost:8000', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        // rewrite: (path) => path.replace(/^\/api/, ''),//rewrite的作用就是将axios请求地址的/api去掉，如果不需要去掉api的话，不写rewrite就行。
        secure: false,
        changeOrigin: true
      }
    },
    open: true
  }
})
