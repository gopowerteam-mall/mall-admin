<template lang="pug">
page-container(title='编辑产品特性')
  .product-setting.p-x-4
    a-descriptions(:data='productDesc')
    .w-600px.m-30px
      a-steps(:current='currentStep')
        a-step 属性名称配置
        a-step 属性项配置
        a-step 属性-价格配置
    ProductAttr(v-if='currentStep === 1' :id='productId')
</template>

<script lang="ts" setup>
import type { ProductVersion as ProductVersionType } from '@/http/models/ProductVersion'
import { ProductService } from '@/http/services/ProductService'
import ProductAttr from './components/product-attr.vue'

const route = useRoute()
const productId = route.params.id as string

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

let versionList = $ref<ProductVersionType[]>([])

// 初始化获取当前产品信息
onBeforeMount(() =>
  service.getProduct(productId).then((data) => {
    versionList = data.versions
    productDesc[0].value = data.title
    productDesc[1].value = data.subtitle
  }),
)
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
