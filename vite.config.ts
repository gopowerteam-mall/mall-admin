import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'
import icons from 'unplugin-icons/vite'
import iconsResolver from 'unplugin-icons/resolver'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import unocss from 'unocss/vite'
import extractorPug from '@unocss/extractor-pug'
import { extractorSplit } from '@unocss/core'
import assets from './scripts/vite/asset.plugin'
import lessToJs from 'less-vars-to-js'
import { readFileSync } from 'node:fs'
import request from '@gopowerteam/request-generate/vite-plugin'

// 全局样式变量
const globalLessVaribles = resolve(__dirname, 'src', 'styles', 'variables.less')
const globalLessTheme = resolve(__dirname, 'src', 'styles', 'theme.less')

const themeVaribles = lessToJs(readFileSync(globalLessTheme, 'utf8'), {
  resolveVariables: true,
  stripPrefix: true,
})

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      '@/': `${resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${globalLessVaribles}";`,
        modifyVars: themeVaribles,
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    // Vue语法支持配置
    vue({ include: [/\.vue$/], reactivityTransform: true }),
    // 自动导入插件配置
    autoImport({
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
        {
          '@/shared/hooks': [
            'useStore',
            'useInstance',
            'useLogger',
            'useUploader',
          ],
        },
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    // 自动布局插件配置
    layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'blank',
    }),
    // 自动路由插件配置
    pages({
      pagesDir: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue'],
      extensions: ['vue'],
      routeStyle: 'nuxt',
    }),
    // 自动引入组件插件配置
    components({
      dts: 'src/types/components.d.ts',
      dirs: ['src/shared/components'],
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
        iconsResolver({
          prefix: 'icon',
          alias: {
            park: 'icon-park',
            'park-outline': 'icon-park-outline',
          },
          enabledCollections: ['icon-park', 'icon-park-outline'],
        }),
      ],
      include: [/\.vue$/, /\.vue\?vue/],
    }),
    request({
      alias: '@',
      dir: 'src/http/services',
      dts: 'src/types/request.d.ts',
    }),
    // 自动导入图标插件配置
    icons({
      scale: 1.5,
    }),
    unocss({
      extractors: [extractorPug(), extractorSplit],
    }),
    assets({
      dts: 'src/types/assets.d.ts',
      dirs: {
        images: 'images',
      },
    }),
  ],
})
