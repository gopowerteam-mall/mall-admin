<template>
  <data-table
    row-key="id"
    :pagination="pageService"
    :load-data="loadData"
    :forms="forms"
    :columns="columns"
  >
    <template #actions>
      <div>测试自定义Action</div>
    </template>
  </data-table>
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

/**
 * 加载表格数据
 * @param param0
 */
function loadData({ form, update }: LoadDataParams) {
  administratorService
    .findAdministrator(form, [pageService])
    .then(({ data }) => {
      // TEST: phone column显示
      data.forEach((row: any) => (row['phone'] = '18899992222'))
      update(data)
    })
}

/**
 * 表格配置
 * 优先级高于columns form优先级
 * 会覆盖同key配置
 */
const forms: FormItemsOptions = [
  // Select列示例
  // options支持Promise返回异步数据
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

/**
 * 表格列配置
 */
const columns: TableColumnsOptions = [
  {
    key: 'id',
    title: '名称',
  },
  // 日期列配置
  // format 支持预置格式  date datetime week time
  // format 为函数类型则支持自定义格式如: ()=>"YYYY-MM-DD"
  {
    key: 'createdAt',
    title: 'date',
    render: (r) => r.date({ format: 'datetime' }),
  },
  // 手机号列配置
  // safe 手机号脱敏
  // callable 点击可以拨号
  // separator 号码分隔符
  {
    key: 'phone',
    title: '手机号',
    render: (r) => r.phone({ safe: true, callable: true, separator: '-' }),
  },
  // 文本列
  // 测试表单支持
  // 测试表单规则
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
  // 测试表单配置
  // columns中配置表单会使用对应列的key以及title
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
