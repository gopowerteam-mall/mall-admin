<template lang="pug">
page-container(title='管理员列表')
  data-table(
    ref='table'
    row-key='id'
    :pagination='pageService'
    :load-data='loadData'
    :columns='columns')
    template(#actions)
      a-button(status='success' type='outline' @click='dialog.add = true') 添加管理员
  //- 编辑模态框
  a-modal(
    v-model:visible='dialog.modify'
    title='管理员姓名'
    @before-ok='onDialogBeforOk')
    a-input(v-model.trim='modifyData.name' placeholder='请输入管理员姓名')
  //- 新增模态框
  a-modal(v-model:visible='dialog.add' :footer='false' title='添加管理员') 
    AddAdmin(@close='dialog.add = false' @success='() => table.reload()')
</template>

<script setup lang="ts">
import { useTable } from '@gopowerteam/vue-dynamic-table'
import { useRequest } from 'virtual:request'
import { PageService } from '~/http/extends/page.service'
import { Message } from '@arco-design/web-vue'
import AddAdmin from './components/add-admin.vue'
import type { Administrator } from '@/http/models/Administrator'
import type {
  LoadDataParams,
  TableColumnsOptions,
} from '@gopowerteam/vue-dynamic-table'

const adminService = useRequest((service) => service.AdministratorService)
const pageService = new PageService()

const table = $(useTable('table'))

const columns: TableColumnsOptions<Administrator> = [
  {
    key: 'username',
    title: '用户名',
    form: {
      render: (r) => r.input(),
    },
  },
  {
    key: 'realname',
    title: '姓名',
  },
  {
    key: 'createAt',
    title: '创建时间',
    render: (r) => r.date(),
  },
  {
    key: 'updateAt',
    title: '更新时间',
    render: (r) => r.date(),
  },
  {
    key: 'action',
    title: '操作',
    render: (r) =>
      r.button({
        buttons: [
          {
            text: '删除',
            confirm: true,
            confirmText: '是否确认删除?',
            callback: (record) => onDelete(record.id),
          },
          {
            text: '重置密码',
            callback: (record) => onResetPwd(record.id),
          },
          {
            text: '修改',
            callback: (record) => onUpdate(record),
          },
        ],
      }),
  },
]
/**
 * 加载表单数据
 * @param param0
 */
function loadData({ form, update }: LoadDataParams) {
  adminService
    .findAdministrator(form, [pageService])
    .then(({ data }) => update(data))
}

// 删除管理员
function onDelete(id: string) {
  adminService.deleteAdministrator(id, []).then(() => table.reload())
}

// 重置密码
function onResetPwd(id: string) {
  adminService.resetAdministratorPassword(id, []).then(({ password }) => {
    Message.success({
      content: `重置成功，新密码【${password}】,请牢记`,
      duration: 5000,
      closable: true,
    })
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
      modifyData.id,
      {
        realname: modifyData.name,
      },
      [],
    )
    .then(() => {
      done()
      Message.success('修改成功')
    })
    .catch(() => done(false))
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
    key: system-setting.admin
    icon: xxx
    title: 系统管理员
</route>
