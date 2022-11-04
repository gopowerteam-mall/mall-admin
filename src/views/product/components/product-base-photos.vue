<template lang="pug">
.product-base-photos.flex.flex-wrap.space-x-2
  a-image-preview-group(infinite)
    .product-base-photos_item.w-80px.h-80px.border.flex-center.opacity-90.bg-gray-50.relative(
      v-for='src of photos'
      :key='src')
      ImagePreview(:src='src' width='80px' height='80px')
      .product-base-photos_item--del.hidden.absolute.top-0.right-0.p-b-1.p-l-1.bg-white.opacity-90.rounded-bl-2xl.cursor-pointer(
        @click='onPhotoDelete(src)')
        icon-park-outline:close-one.text-gray-500.text-xs
  .w-80px.h-80px.space-x-2.flex-center.bg-gray-50.border(
    v-show='showChooseBtn'
    @click='onChooseMaterialClick')
    icon-park-outline:plus.text-gray-300.text-4xl
</template>

<script setup lang="ts">
import { useModal } from '@gopowerteam/vue-modal'
import MaterialPicker from './material-picker.vue'

const props = defineProps<{
  modelValue: string[] | string
  limit?: number
}>()

const emits = defineEmits(['update:modelValue'])

const modal = useModal()
function onChooseMaterialClick() {
  modal
    .open({
      component: MaterialPicker,
      width: 1090,
      props: { limit: maxLens ? maxLens - photos.length : undefined },
      title: '选择素材',
    })
    .then((data: string[]) => {
      if (!data.length) return
      if (single) {
        emits('update:modelValue', data[0])
      } else {
        emits('update:modelValue', [...props.modelValue, ...data])
      }
    })
}

const single = $computed(() => typeof props.modelValue === 'string')
const photos = $computed(() =>
  single
    ? props.modelValue
      ? [props.modelValue as string]
      : []
    : (props.modelValue as string[]),
)

const maxLens = $computed(() => (single ? 1 : props.limit || 0))
const showChooseBtn = $computed(() =>
  maxLens ? maxLens - photos.length > 0 : true,
)

function onPhotoDelete(src: string) {
  if (single) {
    emits('update:modelValue', '')
  } else {
    const newPhotos = photos.filter((x) => x != src)
    emits('update:modelValue', [...newPhotos])
  }
}
</script>

<style lang="less" scoped>
.product-base-photos {
  &_item:hover {
    /* stylelint-disable-next-line selector-class-pattern */
    .product-base-photos_item--del {
      display: block;
    }
  }
}
</style>
