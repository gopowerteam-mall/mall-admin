<template lang="pug">
.material-preview
  a-empty(v-if='data.length == 0')
  .flex.flex-wrap(v-else)
    a-image-preview-group(infinite)
      .material-preview_item.w-150px.h-120px.m-b-2.m-r-2.flex-center.opacity-90.bg-gray-50.relative(
        v-for='item of data'
        :key='item.id')
        ImagePreview(
          v-if='item.type === "IMAGE"'
          :src='item.key'
          width='150px'
          height='120px')
        VideoPreview(v-else-if='item.type === "VIDEO"' :src='item.key')
        .w-150px.h-120px.flex.flex-center(v-else)
          icon-park-outline:file-tips-one.text-lg
        .material-preview_item__action.absolute.w-full.overflow-hidden.bottom-0(
          :class='{ hidden: alwaysShowAction != true }')
          .action-container.p-1.bg-gray-200.bg-opacity-60.flex.justify-end.space-x-2
            slot(v-bind='item')
</template>

<script setup lang="ts">
import type { Material } from '@/http/models/Material'

defineProps<{
  data: Material[]
  alwaysShowAction?: boolean
}>()
</script>

<style lang="less" scoped>
.material-preview {
  &_item:hover {
    :deep(img.arco-image-img) {
      scale: 1.3;
      transition: all 0.8s ease-out;
    }

    overflow: hidden;
    opacity: 1;

    /* stylelint-disable-next-line selector-class-pattern */
    .material-preview_item__action {
      display: block;
    }
  }
}
</style>
