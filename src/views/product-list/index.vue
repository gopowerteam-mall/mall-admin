<template lang="pug">
page-container(title='产品列表')
  template(#actions)
    a-button(type='primary' @click='router.push("/product-basic")') 添加产品
  data-table(
    ref='tableRef'
    row-key='id'
    :pagination='pageService'
    :load-data='onloadData'
    :search-forms='forms'
    :columns='columns')
</template>

<script lang="ts" setup>
import { PageService } from '@/http/extends/page.service'
import { ProductService } from '@/http/services/ProductService'
import type {
  FormItemsOptions,
  LoadDataParams,
  TableColumnsOptions,
} from '@gopowerteam/vue-dynamic-table'
import { appQuery } from '@/store/app.store'
import { PublishTypeDict, RecommendTypeDict } from '@/config/dict.config'
import type { DynamicTableInstance } from '@gopowerteam/vue-dynamic-table/dist/dynamic-table'

const productService = new ProductService()

const pageService = new PageService()

const qiniuDomain = $(useStore(appQuery, (state) => state.base?.qiniu?.domain))

const router = useRouter()
const tableRef = $ref<DynamicTableInstance>()

/**
 * 表格配置
 * 优先级高于columns form优先级
 * 会覆盖同key配置
 */
const forms: FormItemsOptions = [
  // Select列示例
  // options支持Promise返回异步数据
  {
    key: 'title',
    title: '标题',
    render: (r) => r.input(),
  },
  {
    key: 'enable',
    title: '发布状态',
    render: (r) => r.select({ options: PublishTypeDict, clearable: true }),
  },
  {
    key: 'recommended',
    title: '是否推荐',
    render: (r) => r.select({ options: RecommendTypeDict, clearable: true }),
  },
]

/**
 * 表格列配置
 */
const columns: TableColumnsOptions<any> = [
  {
    key: 'title',
    title: '商品名称',
  },
  {
    key: 'banner',
    title: '封面',
    formatter: ({ cover }) => `https://${qiniuDomain}/${cover}`,
    render: (r) => r.image(),
  },
  {
    key: 'createdAt',
    title: '创建时间',
    render: (r) => r.date(),
  },
  {
    key: 'enable',
    title: '发布状态',
    render: (r) => r.dict({ dict: PublishTypeDict }),
  },
  {
    key: 'action',
    title: '操作',
    width: '300px',
    render: (r) =>
      r.button({
        buttons: [
          {
            text: '详情',
            callback: ({ id }) => {
              router.push({ name: 'product', params: { id } })
            },
          },
          {
            text: '下架商品',
            disabled: (r) => !r.enable,
            confirm: true,
            confirmText: '是否确认删除该商品',
            callback: ({ id }) => {
              requestDeleteProduct(id)
            },
          },
        ],
      }),
  },
]

function requestDeleteProduct(id: string) {
  productService.unpublishProduct(id).then(() => {
    tableRef?.reload()
  })
}

function onloadData({ search, update }: LoadDataParams) {
  productService.findProduct(search, [pageService]).then(({ data }) => {
    update(data)
  })
}
</script>

<route lang="yaml">
name: product-list
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
  menu:
    key: mall-setting.products
    title: 商品管理
</route>
