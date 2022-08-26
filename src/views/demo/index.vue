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
  media-gallery(multiple @upload='onUploadGallery')
    media-gallery-item(
      v-for='image in images'
      :key='image'
      :type='FileType.Image'
      :src='image'
      @delete='onDeleteFile')
    media-gallery-item(
      v-for='task in tasks'
      :key='task.key'
      :task='task'
      :type='task.type'
      @delete='onDeleteFile')
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
import { UploadTask } from '~/shared/utils/upload.service'
import { FileType } from '@/config/enum.config'
import { BannerTypeDict } from '@/config/dict.config'
const images = ref<string[]>(['2022070812033'])
const tasks = ref<UploadTask[]>()

const uploader = useUploader()

/**
 * 上传文件
 */
function onUploadFile(files: FileList) {
  set(tasks, (value) => [...(value || []), ...uploader.upload(files)])
}
/**
 * 上传文件
 */
function onUploadGallery(files: FileList) {
  set(tasks, (value) => [...(value || []), ...uploader.upload(files)])
}

/**
 * 删除文件
 */
function onDeleteFile(key: string) {
  set(images, (value) => (value || []).filter((image) => image !== key))

  set(tasks, (value) => (value || []).filter((task) => task.key !== key))
}
</script>

<route lang="yaml">
name: demo
meta:
  layout: blank
</route>
