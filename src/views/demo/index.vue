<template lang="pug">
a-card(title='上传示例')
  upload-container(:filetype='FileType.image' @upload='onUploadFile')
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
      :type='FileType.image'
      :src='image'
      @delete='onDeleteFile')
    media-gallery-item(
      v-for='task in tasks'
      :key='task.key'
      :task='task'
      :type='task.type'
      @delete='onDeleteFile')
</template>

<script setup lang="ts">
import { UploadTask } from '~/shared/utils/upload.service'
import { FileType } from '@/config/enum.config'
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
