<template lang="pug">
.product-detail-photos.relative
  .product-photos-container.min-h-400px.w-802px.box-content.flex.flex-col.border.border-dashed.border-gray
    a-empty.m-t-150px(v-if='modelValue.length === 0')
    .product-detail-photos_item.relative(
      v-for='item in modelValue'
      :key='item')
      upload-progress(v-if='getTask(item)' :task='getTask(item)')
        .media-wrapper
          image-preview(
            :src='getTask(item)?.url'
            :preview='false'
            width='800px')
      .media-wrapper(v-else)
        image-preview(:src='item' :preview='false' width='800px')
      .product-detail-photos_item--del(@click='onDeleteMedia(item)')
        icon-park-outline:delete
  .upload-operators.absolute.bottom-50px.right--150px(v-show='showAddButton')
    .font-base.text-gray-600.m-b-10px(v-if='freeSize') 还可选择{{ freeSize }}张图片
    .upload-button.bg-gray-100(class='hover:bg-gray-200')
      upload-container.m-20px(
        multiple
        :filetype='uploadType'
        @upload='onAddMedia')
        .flex.flex-col.flex-center(class='h-auto!') 
          icon-park-outline:plus.text-3xl
          .text-gray-600 添加临时素材
    .selective-button.m-t-20px
      a-button.flex-col(class='h-auto! p-14px!' @click='onChooseClick') 选择已上传素材
        template(#icon)
          icon-park-outline:filter.h-50px.text-2xl
</template>

<script setup lang="ts">
import type { UploadTask } from '@/shared/utils/upload.service'
import { useModal } from '@gopowerteam/vue-modal'
import MaterialPicker from './material-picker.vue'
import { FileType } from '@/config/enum.config'

export type ExposeType = {
  // 获取当前组件临时上传资源任务
  getTasks: () => UploadTask[]
  // 重置上传组件状态
  reset: () => void
}

const props = defineProps<{
  modelValue: string[]
  limit?: number
}>()

const uploadType = FileType.Image
const emits = defineEmits(['update:modelValue'])

const uploader = useUploader()
let tasks = $shallowRef<UploadTask[]>([])

const showAddButton = $computed(() =>
  props.limit ? props.limit - props.modelValue.length > 0 : true,
)

const getTask = (key: string) => tasks.find((x) => x.key === key)

// 需要导出tasks的所有上传状态
defineExpose({
  getTasks: () => [...tasks],
  reset: () => {
    tasks = []
    emits('update:modelValue', [])
  },
})

/**
 * 添加媒体
 */
function onAddMedia(files: FileList) {
  let newTasks = uploader.upload(files)
  // 计算可以被追加的图片数量
  if (freeSize && newTasks.length > freeSize) {
    newTasks = newTasks.slice(0, freeSize)
  }
  // 添加任务
  tasks.push(...newTasks)
  // 获取刚选择的素材key
  const newKeys = newTasks.map((x) => x.key)
  emits('update:modelValue', [...props.modelValue, ...newKeys])
}

/**
 * 删除媒体
 * @param key
 */
function onDeleteMedia(key: string) {
  // 获取key在tasks中的索引
  const taskIndex = tasks.findIndex((x) => x.key === key)
  emits(
    'update:modelValue',
    props.modelValue.filter((x) => x !== key),
  )
  // 先更新vmodel 再更新task
  if (taskIndex > -1) tasks.splice(taskIndex, 1)
}

const freeSize = $computed(() =>
  props.limit ? props.limit - props.modelValue.length : undefined,
)

const modal = useModal()
function onChooseClick() {
  modal
    .open({
      component: MaterialPicker,
      width: 1090,
      props: { limit: freeSize },
      title: '选择素材',
    })
    .then((data: string[]) => {
      // 更新model
      emits('update:modelValue', [...props.modelValue, ...data])
    })
}
</script>

<style lang="less" scoped>
.product-detail-photos {
  &_item {
    font-size: 0;
    &--del {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      padding: 2px 2px 10px 10px;
      font-size: 14px;
      cursor: pointer;
      background-color: rgb(229 231 235);
      border-bottom-left-radius: 2rem;
      opacity: 0.9;
    }
    &:hover {
      background-color: rgb(251 251 251 / 30%);

      /* stylelint-disable-next-line selector-class-pattern */
      .product-detail-photos_item--del {
        display: block;
      }
    }
  }
}
</style>
