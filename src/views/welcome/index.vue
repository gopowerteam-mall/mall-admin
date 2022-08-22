<template lang="pug">
.welcome.h-screen
  page-container(title='系统初始化')
    .fixed.bottom-200px.w-500px.bg-white.bg-opacity-70.px-10.p-t-4.rounded(
      class='right-1/4')
      h1 请设置第一个管理员信息
      a-form(
        :model='form'
        :rules='formRules'
        layout='vertical'
        @submit-success='handleSubmit')
        a-form-item(field='username' label='管理员账号')
          a-input(v-model='form.username' placeholder='请输入管理员账号')
        a-form-item(field='password' label='登录密码')
          a-input(
            v-model='form.password'
            placeholder='请输入管理员登录密码'
            type='password')
        a-form-item
          a-button(html-type='submit' long type='primary') 提交
</template>

<script lang="ts" setup>
import { assets } from 'virtual:assets'
import { useRequest } from 'virtual:http-request'

const background = computed(() => `url(${assets.images.welcome_bg})`)

const form = $ref({
  username: '',
  password: '',
})

const formRules = {
  username: { required: true, message: '请输入管理员账号' },
  password: { required: true, message: '请输入管理员登录密码' },
}

const router = useRouter()

function handleSubmit() {
  useRequest((service) => service.AppService)
    .appInit({ admin: unref(form) })
    .subscribe({
      next: gotoLogin,
      error: (err) => {
        const code: number = err.statusCode
        if (code === 417) gotoLogin()
      },
    })
}

// 初始化完成就删除该页面路由
function gotoLogin() {
  router.replace('/login').then(() => {
    router.removeRoute('welcome')
  })
}
</script>

<style scoped>
.welcome {
  background: v-bind(background) center / cover no-repeat;
}
</style>

<route lang="yaml">
name: welcome
meta:
  layout: blank
</route>
