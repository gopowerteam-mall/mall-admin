<template lang="pug">
a-form(
  ref='refForm'
  :model='form'
  :rules='formRules'
  @submit-success='handleSubmit')
  a-form-item(field='username' label='账号')
    a-input(v-model='form.username' allow-clear placeholder='请输入账号')
  a-form-item(field='password' label='密码')
    a-input(
      v-model='form.password'
      allow-clear
      autocomplete='new-password'
      placeholder='请输入登录密码'
      type='password')
  a-form-item(content-class='!justify-end')
    a-button(@click='onCancel') 取消
    a-button.m-l-4(:loading='saving' html-type='submit' type='primary') 提交
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { useRequest } from 'virtual:request'

const refForm = $ref<any>()

const form = $ref({
  username: '',
  password: '',
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
    .then(onSuncess)
    .catch(() => (saving = false))
}
</script>
