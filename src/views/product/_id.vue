<template lang="pug">
page-container(title='编辑产品特性')
  .product-setting.p-x-4
    a-descriptions(:data='productDesc')
    .product-setting_version.flex.items-end.m-y-10px(v-if='!versionId')
      a-button(@click='createNewVersion') 创建新版本
      .m-l-4.text-xs.text-gray-300 设置新版本将开始重新设置所有属性
    .product-setting_steps.w-800px.m-auto(v-if='versionId')
      a-steps.m-a.m-y-40px(:current='currentStep')
        a-step 设置商品属性名称
        a-step 设置属性名称值
        a-step 属性组合-价格
      .product-setting_step_container
        ProductAttrNames(v-if='currentStep === 1' @next='onNext')
        ProductAttrValues(
          v-if='currentStep === 2'
          :attrs='attrList'
          @before='onBefore'
          @next='onNext')
        ProductAttrPrices(
          v-if='currentStep === 3'
          :data='attrCombinedList'
          @before='onBefore'
          @next='onNext')
        ProductAttrSuccess(v-if='currentStep === 4' @rest='onRest')
</template>

<script lang="ts" setup>
import { ProductService } from '@/http/services/ProductService'
import ProductAttrNames from './components/product-attr-names.vue'
import ProductAttrValues from './components/product-attr-values.vue'
import ProductAttrPrices from './components/product-attr-prices.vue'
import type { ProductAttrBase, ProductAttrPrice } from './product.composable'
import ProductAttrSuccess from './components/product-attr-success.vue'

const route = useRoute()
const productId = route.params.id as string
let versionId = ref('')

provide('id', productId)
provide('versionId', versionId)

let currentStep = $ref(1)

const productDesc = $ref([
  {
    label: '产品标题',
    value: '',
  },
  {
    label: '副标题',
    value: '',
  },
])

// service
const service = new ProductService()
let attrList = $ref<ProductAttrBase[]>([])
let attrCombinedList = $ref<ProductAttrPrice[]>([])

// 初始化获取当前产品信息
onBeforeMount(() =>
  service.getProduct(productId).then((data) => {
    productDesc[0].value = data.title
    productDesc[1].value = data.subtitle

    // 获取未编辑的versionId
    versionId.value = data.versions.find((x) => x.attrs.length === 0)?.id ?? ''
  }),
)

function createNewVersion() {
  service.createProductVersion(productId).then((data) => {
    versionId.value = data.id
  })
}

function onBefore() {
  if (currentStep === 2) {
    // 返回第一步需要重置属性集合
    attrList = []
  } else if (currentStep === 3) {
    attrCombinedList = []
  }
  currentStep--
}

function onNext(data?: Array<ProductAttrBase | ProductAttrPrice>) {
  if (currentStep === 1) {
    // 第一步会回传属性集合
    attrList = data as Array<ProductAttrBase>
  } else if (currentStep === 2) {
    attrCombinedList = data as Array<ProductAttrPrice>
  }
  currentStep++
}

function onRest() {
  currentStep = 1
  attrList = []
  attrCombinedList = []
  versionId.value = ''
}
</script>
<route lang="yaml">
name: product-setting
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
</route>

<style lang="less" scoped>
.product-setting {
  :deep(.arco-collapse-item-header-extra) {
    height: 24px;
  }
}
</style>
