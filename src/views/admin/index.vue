<template lang="pug">
page-container(title='管理员列表')
  a-table.p-4(
    :data='dataList'
    :pagination='pageService'
    @page-change='refreshData')
    template(#columns)
      a-table-column(data-index='username' title='用户名')
      a-table-column(data-index='realname' title='姓名')
      a-table-column(align='center' data-index='createdAt' title='创建时间')
        template(#cell='{ record }')
          div {{ dateTimeFormat(record['createdAt']) }}
      a-table-column(align='center' data-index='updatedAt' title='更新时间')
        template(#cell='{ record }')
          div {{ dateTimeFormat(record['updatedAt']) }}
      a-table-column(align='center')
        template(#title)
          a-button(status='success' type='outline' @click='dialog.add = true') 添加管理员
        template(#cell='{ record }')
          a-popconfirm(
            v-if='showDelete'
            content='是否删除该管理员'
            @ok='onDelete(record.id)')
            a-button(status='danger' type='text') 删除
          a-button(type='text' @click='onResetPwd(record.id)') 重置密码
          a-button(type='text' @click='onUpdate(record)') 修改
  //- 编辑模态框
  a-modal(
    v-model:visible='dialog.modify'
    title='管理员姓名'
    @before-ok='onDialogBeforOk')
    a-input(v-model.trim='modifyData.name' placeholder='请输入管理员姓名')
  //- 新增模态框
  a-modal(v-model:visible='dialog.add' :footer='false' title='添加管理员') 
    AddAdmin(@close='dialog.add = false' @success='refreshData')
</template>

<script setup lang="ts">
import { RequestParams } from '@gopowerteam/http-request'
import { useRequest } from 'virtual:http-request'
import { Administrator } from '~/http/model'
import { PageService } from '~/http/extends/page.service'
import { Message } from '@arco-design/web-vue'
import AddAdmin from './components/add-admin.vue'
import dayjs from 'dayjs'

// 管理员列表
let dataList = $ref<Administrator[]>([])

const adminService = useRequest((service) => service.AdministratorService)
const pageService = new PageService()

onMounted(refreshData)

function dateTimeFormat(date: string) {
  return dayjs(date).format('YYYY-MM-DD')
}

function refreshData() {
  adminService
    .findAdministrator(
      new RequestParams({
        page: pageService,
      }),
    )
    .subscribe({
      next: (data) => {
        dataList = data
      },
    })
}

// 大于一个管理员的时候才允许删除
const showDelete = computed(() => dataList.length > 1)

// 删除管理员
function onDelete(id: string) {
  adminService
    .removeAdministrator(
      new RequestParams({
        append: { id },
      }),
    )
    .subscribe(refreshData)
}

// 重置密码
function onResetPwd(id: string) {
  adminService
    .resetAdministratorPassword(
      new RequestParams({
        append: { id },
      }),
    )
    .subscribe({
      next: () => {
        Message.success('操作成功')
      },
    })
}

const dialog = $ref({
  modify: false,
  add: false,
})

const modifyData = $ref({
  id: '',
  name: '',
})

// 点击修改
function onUpdate(data: Administrator) {
  modifyData.id = data.id
  modifyData.name = data.realname
  dialog.modify = true
}

// 修改模态框点击保存时
function onDialogBeforOk(done: Function) {
  if (!modifyData.name) {
    Message.error('请输入管理员姓名')
    return done(false)
  }
  adminService
    .updateAdministrator(
      new RequestParams({
        data: {
          realname: modifyData.name,
        },
        append: { id: modifyData.id },
      }),
    )
    .subscribe({
      next: () => {
        done()
        Message.success('修改成功')
        refreshData()
      },
      error: () => done(false),
    })
}
</script>

<route lang="yaml">
name: admin
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
  menu:
    key: root1.admin
    icon: xxx
    title: 系统管理员
</route>
