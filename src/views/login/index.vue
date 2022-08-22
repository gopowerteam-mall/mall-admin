<template lang="pug">
.login.h-screen
  page-container(title='系统登录')
    .fixed.w-360px.p-4.bg-white.bg-opacity-40.rounded(
      class='top-1/2 right-1/8 -translate-y-1/2')
      h2.bg-white.m-b-2.py-6.text-center.text-3xl.text-gray-800.rounded 管理后台登录
      a-form.bg-white.p-t-8.p-r-4.p-b-2.rounded(
        :model='model'
        :rules='formRules'
        @submit-success='handleSubmit')
        a-form-item(field='username' label='账号')
          a-input(v-model='model.username' placeholder='请输入登录账号')
        a-form-item(field='password' label='密码')
          a-input(
            v-model='model.password'
            placeholder='请输入登录密码'
            type='password')
        a-form-item
          a-button(html-type='submit' long type='primary') 登录
</template>

<script setup lang="ts">
import { useRequest } from 'virtual:http-request'
import { userAction } from '~/store/user.store'
import { assets } from 'virtual:assets'
const appService = useRequest((service) => service.AppService)
const model = $ref({
  username: '',
  password: '',
})

const formRules = {
  username: { required: true, message: '请输入管理员账号' },
  password: { required: true, message: '请输入管理员登录密码' },
}

const background = computed(() => `url(${assets.images.login_bg})`)

const router = useRouter()

function handleSubmit() {
  appService.login(model).subscribe({
    next: ({ access_token, refresh_token, expires_in }) => {
      userAction.updateToken({
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
      })
      // 替换当前路由到主页面
      router.replace('/')
    },
  })
}
</script>

<style lang="less" scoped>
.login {
  background: url('/images/login_bg.png') left top / cover no-repeat;
  background: v-bind(background) left top / cover no-repeat;
}
</style>

<route lang="yaml">
name: login
meta:
  menu:
    key: root1.page1
    icon: xxx
    title: Page1
  layout: blank
</route>
