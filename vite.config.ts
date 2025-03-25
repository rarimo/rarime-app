import react from '@vitejs/plugin-react-swc'
import * as fs from 'fs'
import * as path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import { checker } from 'vite-plugin-checker'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import tsconfigPaths from 'vite-tsconfig-paths'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relative: string) => path.resolve(appDirectory, relative)
const root = path.resolve(__dirname, resolveApp('src'))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const isAnalyze = env.VITE_ENVIRONMENT === 'analyze'

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: '[name]',
      }),
      checker({
        overlay: {
          initialIsOpen: false,
          position: 'br',
        },
        typescript: true,
        eslint: {
          lintCommand: 'eslint "{src,config}/**/*.{jsx,tsx}" --cache --max-warnings=0',
        },
      }),
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.tsx',
        inject: {
          data: { host: env.VITE_APP_HOST_URL },
        },
      }),
      ...(isAnalyze ? [visualizer({ open: true })] : []),
    ],
    resolve: {
      alias: { '@': `${root}/` },
    },
  }
})
