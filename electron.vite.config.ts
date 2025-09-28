import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
      },
    },
    // @ts-expect-error 忽略tailwindcss类型错误
    plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react(), tailwindcss()],
  },
})
