<template lang="pug">
page-container(title='产品列表')
  .p-4
    a-form(
      ref='refForm'
      layout='inline'
      :model='form'
      allow-clear
      @submit='handleSubmit')
      a-form-item(field='title' label='标题')
        a-input(v-model='form.title')
      a-form-item(field='category' label='分类')
        CategorySelect(v-model='formCategory')
      a-form-item(field='recommended' label='是否推荐')
        a-select(v-model='formRecommended' allow-clear)
          a-option(value='true') 是
          a-option(value='false') 否
      a-form-item
        a-space
          a-button(@click='onResetClick') 重置
          a-button(html-type='submit' type='primary') 查询
    a-table.m-t-30px(:data='dataList' :columns='tableColumns')
      template(#cover='{ record }')
        ImagePreview(:src='record.cover' width='80px' height='80px')
      template(#enable='{ record }')
        span {{ record.enable ? '是' : '否' }}
      template(#operatorTitle)
        a-button(status='success' @click='onClickNew')
          template(#icon)
            icon-park-outline:add
          template(#default)
            span 添加新产品
      template(#operatorCell='{ record }')
        ProductOperator(:id='record.id' @refresh='refreshData')
</template>

<script lang="ts" setup>
import { PageService } from '@/http/extends/page.service'
import { ProductService } from '@/http/services/ProductService'
import { useModal } from '@gopowerteam/vue-modal'
import ProductBase from './components/product-base.vue'
import ProductOperator from './components/product-operator.vue'
import { LoadingService } from '@/http/extends/loading.service'
import type { Product } from '@/http/models/Product'
import ImagePreview from '@/shared/components/image-preview.vue'
import { tableColumns, type FindProduct } from './product.composable'
import CategorySelect from '../category/components/category-select.vue'

const productService = new ProductService()

const pageService = new PageService()
const loadingStatus = ref(false)

const lodingService = new LoadingService(loadingStatus)

const refForm = $ref<{ resetFields: Function }>()

let dataList = $ref<Product[]>([])

let form = $ref<FindProduct>({
  title: undefined,
  category: undefined,
  recommended: undefined,
})

// 因为type.d 设计数据不含boolean，需要计算是否推荐
const formRecommended = $computed({
  get: () => (form.recommended != undefined ? form.recommended.toString() : ''),
  set: (val: string) => {
    if (val === 'true') {
      form.recommended = true
    } else if (val === 'false') {
      form.recommended = false
    } else {
      form.recommended = undefined
    }
  },
})

const formCategory = $computed({
  get: () => form.category || '',
  set: (val: string) => {
    if (val === '') {
      form.category = undefined
    } else {
      form.category = val
    }
  },
})

onMounted(refreshData)

/**
 * 加载表格数据
 * @param param0
 */
function refreshData() {
  productService
    .findProduct(form, [pageService, lodingService])
    .then(({ data }) => {
      dataList = data
    })
}

const modal = useModal()
const router = useRouter()
function onClickNew() {
  // modal
  //   .open({
  //     title: '添加产品基础信息',
  //     component: ProductBase,
  //     props: {},
  //     width: 800,
  //   })
  //   .then((status) => status && refreshData())
  router.push('/product/new')
}

const onResetClick = () => refForm.resetFields()
// 查询数据
function handleSubmit() {
  pageService.reset()
  refreshData()
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
