<template lang="pug">
.media-gallery
  a-image-preview-group(infinite)
    .flex.flex-wrap.space-x-2
      slot
      .upload-button(v-if='uploadButton')
        upload-container(
          :multiple='multiple'
          @upload='(files) => emits("upload", files)')
          .upload-button-wrapper.flex-center
            icon-park:plus.text-2xl
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    uploadButton?: boolean
    multiple?: boolean
  }>(),
  {
    multiple: false,
    uploadButton: true,
    width: '150px',
    height: '150px',
  },
)

const width = toRef(props, 'width')
const height = toRef(props, 'height')

/**
 * 定义上传事件
 */
const emits = defineEmits({
  upload: (files: FileList) => files,
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'MediaGallery',
})
</script>

<style lang="less" scoped>
.upload-gallery {
  position: relative;
}

.upload-button-wrapper {
  width: v-bind(width);
  height: v-bind(height);
  border: dashed 1px rgb(0 0 0 / 10%);
}
</style>
