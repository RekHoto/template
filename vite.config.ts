import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig((configEnv: ConfigEnv) => {
  const { mode } = configEnv;
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';
  const isDev = !isProd;

  const PORT = Number(env.VITE_PORT || 5000);
  const API_URL = env.VITE_API_URL || '';

  return {
    plugins: [
      react(),
      svgr({ svgrOptions: { icon: true } }),
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    css: {
      modules: {
        generateScopedName: isDev
          ? '[name]_[local]__[hash:base64:5]'
          : '[hash:base64:8]',
      },
    },
    define: {
      __API_URL__: JSON.stringify(API_URL),
      __IS_DEV__: JSON.stringify(isDev),
      'process.env': {},
    },
    server: {
      port: PORT,
      open: true,
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'build',
      sourcemap: true,
    },
  };
});
