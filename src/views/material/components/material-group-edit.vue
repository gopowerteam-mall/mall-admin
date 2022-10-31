<template lang="pug">
a-form(:model='form' @submit-success='handleSubmit')
  a-form-item(
    field='name'
    label='分组名称'
    :rules='[{ required: true, message: "请输入分组名称" }]')
    a-input(v-model='form.name' allow-clear placeholder='请输入分组名称')
  a-form-item(content-class='!justify-end')
    a-button(@click='onCancel') 取消
    a-button.m-l-4(:loading='saving' html-type='submit' type='primary') 提交
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { useModal } from '@gopowerteam/vue-modal'
import { useRequest } from 'virtual:request'

const props = defineProps<{
  id?: string
  name?: string
}>()

const form = $ref({
  name: '',
})

onMounted(() => {
  if (props.name) form.name = props.name
})

let saving = $ref(false)

const modal = useModal()

function onCancel() {
  modal.close(false)
}

function onSuncess() {
  saving = false
  Message.success('添加成功')
  modal.close(true)
}

function handleSubmit() {
  saving = true
  const service = useRequest((service) => service.MaterialService)
  if (props.id) {
    service
      .updateMaterialGroup(props.id!, form)
      .then(onSuncess)
      .catch(() => (saving = false))
  } else {
    service
      .createMaterialGroup(form)
      .then(onSuncess)
      .catch(() => (saving = false))
  }
}
</script>
