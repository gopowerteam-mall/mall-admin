<template lang="pug">
a-card(title='上传示例')
  upload-container(:filetype='FileType.Image' @upload='onUploadFile')
    a-button 上传图片
  image-preview(
    v-for='task in tasks'
    :key='task.key'
    width='200px'
    :src='task.url')
a-card(title='画廊示例')
  media-gallery(v-model='photos' multiple)
a-card(title='字典示例')
  // 字典列表
  a-select(placeholder='字典列表示例')
    a-option(
      v-for='[value,label] of Array.from(BannerTypeDict)'
      :key='value'
      :value='value'
      :label='label')
  // 字典转换
  a-select(placeholder='字典转换示例')
    a-option(
      v-for='key of ["PAGE","PRODUCT","URL"]'
      :key='key'
      :value='key'
      :label='BannerTypeDict.get(key)')
</template>

<script setup lang="ts">
import type { UploadTask } from '@/shared/utils/upload.service'
import { FileType } from '@/config/enum.config'
import { BannerTypeDict } from '@/config/dict.config'

let photos = $ref<string[]>(['2022070812033'])
let tasks = $shallowRef<UploadTask[]>([])

const uploader = useUploader()

/**
 * 上传文件
 */
function onUploadFile(files: FileList) {
  tasks = [...tasks, ...uploader.upload(files)]
}
</script>

<route lang="yaml">
name: demo
meta:
  layout: blank
</route>
