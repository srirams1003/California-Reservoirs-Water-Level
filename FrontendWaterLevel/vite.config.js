import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [reactRefresh()],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    },
  proxy: {
      '/api': {
        target: 'http://localhost:6005',
        changeOrigin: true,
        secure: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
