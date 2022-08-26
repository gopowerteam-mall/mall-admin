<template lang="pug">
.image-preview
  a-image(:preview='preview' :src='url' show-loader)
</template>

<script setup lang="ts">
import { DisplayScene } from '~/config/enum.config'
import { asyncComputed } from '@vueuse/core'
import { appQuery } from '~/store/app.store'

interface Props {
  src?: string
  scene?: DisplayScene
  width?: string | number
  height?: number | string
  preview?: boolean
  rotate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  preview: true,
  rotate: false,
  width: 'auto',
  height: 'auto',
  src: '',
  scene: DisplayScene.Normal,
  title: '',
  description: '',
})

function getImageSuffix(scene: DisplayScene) {
  // TODO:获取图片样式

  return scene === DisplayScene.Normal ? '' : ''
}

/**
 * 获取图片相应地址
 * @param key
 * @param scene
 */
function getImageUrl(key: string, scene: DisplayScene) {
  const appBase = appQuery.select((state) => state.base)

  // 获取样式后缀
  const suffix = getImageSuffix(scene)

  return `https://${appBase?.qiniu.domain}/${key}${suffix}`
}

/**
 * 获取地址URL
 */
const url = asyncComputed(
  async () => {
    const prefixs = ['blob:', 'http://', 'https://']

    if (prefixs.some((prefix) => props.src.startsWith(prefix))) {
      return props.src
    } else {
      return getImageUrl(props.src, props.scene)
    }
  },
  '',
  {
    lazy: true,
  },
)
</script>

<style lang="less" scoped>
.image-preview {
  position: relative;
  display: inline-block;
  font-size: 0;

  :deep(img.arco-image-img) {
    max-width: v-bind(width);
    max-height: v-bind(height);
  }
}
</style>
