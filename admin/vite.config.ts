import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_PORT, VITE_BASE_API, VITE_PUBLIC_PATH } = env

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: Number(VITE_PORT),
      host: true,
      proxy: {
        '/api': {
          target: VITE_BASE_API,
          changeOrigin: true,
          secure: false,
          timeout: 30000,
          proxyTimeout: 30000,
        }
      }
    }
  }
})
