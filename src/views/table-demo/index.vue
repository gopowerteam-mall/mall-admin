<template>
  <dynamic-table
    :pagination="pageService"
    row-key="id"
    :load-data="loadData"
    :forms="forms"
    :columns="columns"
  ></dynamic-table>
</template>

<script lang="ts" setup>
import type {
  LoadDataParams,
  FormItemsOptions,
  TableColumnsOptions,
} from '@gopowerteam/vue-dynamic-table'
import { PageService } from '@/http/extends/page.service'
import { AdministratorService } from '@/http/services/AdministratorService'

const administratorService = new AdministratorService()

const pageService = new PageService(1, 1)

function loadData({ form, update }: LoadDataParams) {
  administratorService
    .findAdministrator(form, [pageService])
    .then(({ data }) => {
      update(
        data.map((x) => {
          ;(x as any)['phone'] = '18899992222'
          return x
        }),
      )
    })
}

const forms: FormItemsOptions = [
  {
    key: 'test1',
    title: 'test1',
    render: (r) =>
      r.select({
        default: 'b',
        options: new Map([
          ['a', 'aaa'],
          ['b', 'bbb'],
        ]),
        autoSumbit: true,
      }),
  },
]

const columns: TableColumnsOptions = [
  {
    key: 'id',
    title: '名称',
  },
  {
    key: 'createdAt',
    title: 'date',
    render: (r) => r.date(),
  },
  {
    key: 'phone',
    title: '手机号',
    render: (r) => r.phone({ safe: true, callable: true }),
  },
  {
    key: 'username',
    title: '用户名',
    render: (r) =>
      r.text({
        color: 'red',
        text: 'aa123123123123120389012830120398aa123123123123120389012830120398aa123123123123120389012830120398aa123123123123120389012830120398aa123123123123120389012830120398',
      }),
    form: {
      rules: [{ required: true, message: '请输入名称' }],
      render: (r) => r.input({ placeholder: 'asd' }),
    },
  },
  {
    key: 'realname',
    title: '真实姓名',
    form: {
      collapsed: true,
      render: (r) => r.input({ placeholder: 'asd' }),
    },
  },
]
</script>

<route lang="yaml">
name: table-demo
meta:
  layout: workspace
  menu:
    key: table-demo
    title: 表格案例
</route>
