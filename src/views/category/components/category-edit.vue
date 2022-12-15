<template lang="pug">
a-form(:model='form' :rules='formRules' @submit-success='handleSubmit')
  a-form-item(field='parentId' label='父级分类' :disabled='isDisabledTree')
    CategorySelect(
      v-model='form.parentId'
      :disabled-keys='disabledCategory'
      placeholder='请选择父级分类')
  a-form-item(field='title' label='分类名称')
    a-input(v-model='form.title' allow-clear placeholder='请输入分类名称')
  a-form-item(field='recommended' label='推荐分类')
    a-switch(v-model='form.recommended' @change='onRecommandChange')
      template(#checked)
        span 打开
      template(#unchecked)
        span 关闭
  a-form-item(field='image' label='图片')
    media-gallery(v-model='uploadImages' :upload-button='!form.image')
  a-form-item(content-class='!justify-end')
    a-button(@click='onCancel') 取消
    a-button.m-l-4(:loading='saving' html-type='submit' type='primary') 提交
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { useModal } from '@gopowerteam/vue-modal'
import { useRequest } from 'virtual:request'
import CategorySelect from './category-select.vue'

const props = defineProps<{
  id?: string
  parentId?: string
}>()

const form = $ref({
  title: '',
  recommended: false,
  image: '',
  parentId: '',
})

const formRules = {
  title: { required: true, message: '请输入分类标题' },
}

const uploadImages = computed<string[]>({
  get: () => (form.image != '' ? [form.image] : []),
  set: (val) => (form.image = val[0] || ''),
})

let saving = $ref(false)
let isDisabledTree = $ref(false)

const modal = useModal()

function onCancel() {
  modal.close(null)
}

const service = useRequest((service) => service.CategoryService)
let disabledCategory = $ref<string[]>([])

onBeforeMount(() => {
  if (props.id) {
    disabledCategory = [props.id]
    service.getCategory(props.id).then((data) => {
      form.title = data.title
      form.recommended = data.recommended
      form.image = data.image
      form.parentId = data.parent?.id
    })
  } else {
    form.parentId = props.parentId ?? ''
    isDisabledTree = true
  }
})

function handleSubmit() {
  if (form.recommended && !form.image) {
    return Message.info('推荐分类需要设置推荐图片,请添加')
  }
  if (!props.id) createCategory()
  else updateCategory()
}

function createCategory() {
  saving = true
  service
    .createCategory(form)
    .then(() => {
      Message.success('添加成功')
      modal.close({})
    })
    .catch(() => (saving = false))
}

function updateCategory() {
  saving = true
  service
    .updateCategory(props.id!, form)
    .then(() => {
      Message.success('修改成功')
      modal.close({})
    })
    .catch(() => (saving = false))
}

function onRecommandChange(val: string | number | boolean) {
  if (!val) uploadImages.value = []
}
</script>
