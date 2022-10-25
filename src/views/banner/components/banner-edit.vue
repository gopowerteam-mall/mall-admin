<template lang="pug">
a-form(:model='form' :rules='formRules' @submit-success='handleSubmit')
  a-form-item(field='title' label='名称')
    a-input(v-model='form.title' allow-clear placeholder='请输入标题名称')
  a-form-item(field='type' label='类型')
    a-select(v-model='form.type' placeholder='请选择Banner类型' allow-clear)
      a-option(
        v-for='[value,label] of Array.from(BannerTypeDict)'
        :key='value'
        :value='value'
        :label='label')
  a-form-item(field='image' label='图片')
    media-gallery(v-model='uploadImages' :upload-button='!form.image')
  a-form-item(field='target' label='目标')
    a-input(v-model='form.target' allow-clear placeholder='请输入目标地址或参数')
  a-form-item(content-class='!justify-end')
    a-button(@click='onCancel') 取消
    a-button.m-l-4(:loading='saving' html-type='submit' type='primary') 提交
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { useModal } from '@gopowerteam/vue-modal'
import { useRequest } from 'virtual:request'
import { BannerTypeDict } from '~/config/dict.config'
import type { UploadTask } from '~/shared/utils/upload.service'

const props = defineProps({
  id: {
    type: String,
    default: undefined,
  },
})

const uploadTask = ref<UploadTask>()

const form = $ref({
  title: '',
  type: '',
  image: '',
  target: '',
})

const uploadImages = computed<string[]>({
  get: () => (form.image !== '' ? [form.image] : []),
  set: (val) => (form.image = val[0] || ''),
})

const formRules = {
  image: { required: true, message: '请上传一张Banner图片' },
  type: { required: true, message: '请选择Banner类型' },
  target: { required: true, message: '请输入目标地址或参数' },
}

let saving = $ref(false)

const modal = useModal()

function onCancel() {
  modal.close(null)
}

const service = useRequest((service) => service.BannerService)

onBeforeMount(() => {
  if (!props.id) return
  service.getBanner(props.id).then((data) => {
    form.title = data.title
    form.type = data.type
    form.image = data.image
    form.target = data.target
  })
})

function handleSubmit() {
  if (!form.image && uploadTask.value != undefined) {
    Message.info('请等待上传完毕再试')
    return
  }

  if (!props.id) createBanner()
  else updateBanner()
}

function createBanner() {
  saving = true
  service
    // TODO: form 类型待修复
    .createBanner(form as any)
    .then(() => {
      Message.success('添加成功')
      modal.close({})
    })
    .catch(() => (saving = false))
}

function updateBanner() {
  saving = true
  // TODO: form类型待修复
  service
    .updateBanner(props.id!, form as any)
    .then(() => {
      Message.success('修改成功')
      modal.close({})
    })
    .catch(() => (saving = false))
}
</script>
