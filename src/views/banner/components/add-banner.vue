<template lang="pug">
a-form(
  ref='refForm'
  :model='form'
  :rules='formRules'
  @submit-success='handleSubmit')
  a-form-item(field='title' label='名称')
    a-input(v-model='form.title' allow-clear placeholder='Banner图的名称')
  a-form-item(field='type' label='类型')
    a-select(v-model='form.type' placeholder='请选择Banner类型')
      a-option(v-for='item of BannerTypeDict' :key='item[0]' :label='item[0]')
  a-form-item(content-class='!justify-end')
    a-button(@click='onCancel') 取消
    a-button.m-l-4(:loading='saving' html-type='submit' type='primary') 提交
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { useRequest } from 'virtual:http-request'
import { BannerTypeDict } from '~/config/dict.config'

const refForm = $ref<any>()

const form = $ref({
  title: '',
  type: '',
})

const formRules = {
  username: { required: true, message: '请输入账号' },
  password: { required: true, message: '请输入密码' },
}

let saving = $ref(false)

const emits = defineEmits(['close', 'success'])

function onCancel() {
  emits('close')
  refForm.resetFields()
}

function onSuncess() {
  Message.success('添加成功')
  emits('success')
  saving = false
  onCancel()
}

function handleSubmit() {
  saving = true
  useRequest((service) => service.AdministratorService)
    .createAdministrator(form)
    .subscribe({
      next: onSuncess,
      error: () => (saving = false),
    })
}
</script>
