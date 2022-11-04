<template lang="pug">
page-container(title='产品列表')
  data-table.p-2(
    row-key='id'
    :pagination='pageService'
    :load-data='loadData'
    :forms='forms'
    :columns='columns')
  .absolute.right-0.top-20
    a-button.absolute.right-2(status='success' @click='onClickNew')
      template(#icon)
        icon-park-outline:add
      template(#default)
        span 添加新产品
</template>

<script lang="ts" setup>
import type {
  LoadDataParams,
  FormItemsOptions,
  TableColumnsOptions,
} from '@gopowerteam/vue-dynamic-table'
import { PageService } from '@/http/extends/page.service'
import { ProductService } from '@/http/services/ProductService'
import { useModal } from '@gopowerteam/vue-modal'
import ProductBase from './components/product-base.vue'

const productService = new ProductService()

const pageService = new PageService()

let updateFun: any

/**
 * 加载表格数据
 * @param param0
 */
function loadData({ form, update }: LoadDataParams) {
  updateFun = update
  productService.findProduct(form, [pageService]).then(({ data }) => {
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
    key: 'title',
    title: '商品标题',
  },
  // 日期列配置
  // format 支持预置格式  date datetime week time
  // format 为函数类型则支持自定义格式如: ()=>"YYYY-MM-DD"
  {
    key: 'createdAt',
    title: '创建日期',
    render: (r) => r.date({ format: 'datetime' }),
  },
  // 手机号列配置
  // safe 手机号脱敏
  // callable 点击可以拨号
  // separator 号码分隔符
  // {
  //   key: 'phone',
  //   title: '手机号',
  //   render: (r) => r.phone({ safe: true, callable: true, separator: '-' }),
  // },
  // 文本列
  // 测试表单支持
  // 测试表单规则
  // {
  //   key: 'username',
  //   title: '用户名',
  //   render: (r) =>
  //     r.text({
  //       color: 'red',
  //       text: 'aa123123123123120389012830120398aa123123123123120389012830120398aa123123123123120389012830120398aa123123123123120389012830120398aa123123123123120389012830120398',
  //     }),
  //   form: {
  //     rules: [{ required: true, message: '请输入名称' }],
  //     render: (r) => r.input({ placeholder: 'asd' }),
  //   },
  // },
  // 测试表单配置
  // columns中配置表单会使用对应列的key以及title
  // {
  //   key: 'realname',
  //   title: '真实姓名',
  //   form: {
  //     collapsed: true,
  //     render: (r) => r.input({ placeholder: 'asd' }),
  //   },
  // },
]

const modal = useModal()
function onClickNew() {
  modal
    .open({
      title: '添加产品基础信息',
      component: ProductBase,
      props: {},
      width: 800,
    })
    .then((status) => status && loadData({ form: forms, update: updateFun }))
}
</script>

<route lang="yaml">
name: products
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
  menu:
    key: mall-setting.products
    title: 产品管理
</route>
