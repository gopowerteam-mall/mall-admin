<template lang="pug">
page-container(title='编辑产品特性')
  .product-setting.p-x-4
    .flex.justify-between
      a-descriptions.flex-1(:data='productDesc')
      a-space.product-setting_version.m-y-10px(align='end')
        a-button(
          type='outline'
          title='产品当前产品历史配置版本'
          @click='onVersionHistoryClick') 历史版本
        a-button(
          v-if='!versionId'
          title='设置新版本将开始重新设置所有属性'
          @click='createNewVersion') 创建新版本
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
    a-empty.m-t-200px(else description='请选择或创建产品版本')
      template(#image)
        icon-park-outline:arrow-right-up.m-a
</template>

<script lang="ts" setup>
import { ProductService } from '@/http/services/ProductService'
import ProductAttrNames from './components/product-attr-names.vue'
import ProductAttrValues from './components/product-attr-values.vue'
import ProductAttrPrices from './components/product-attr-prices.vue'
import type { ProductAttrBase, ProductAttrPrice } from './product.composable'
import ProductAttrSuccess from './components/product-attr-success.vue'
import { useModal } from '@gopowerteam/vue-modal'
import ProductVersionList from './components/product-version-list.vue'
import type { ProductVersion } from '@/http/models/ProductVersion'

const route = useRoute()
const productId = route.query.id as string
let versionId = ref('')
let versionList = $ref<ProductVersion[]>([])

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
    versionList = data.versions

    // 获取未编辑的versionId
    versionId.value = data.versions.find((x) => x.attrs.length === 0)?.id ?? ''
  }),
)

function createNewVersion() {
  service.createProductVersion(productId).then((data) => {
    versionId.value = data.id
  })
}

// 上一步
const onBefore = () => currentStep--

// 下一步
function onNext(data?: Array<ProductAttrBase | ProductAttrPrice>) {
  if (currentStep === 1) {
    // 第一步会回传属性集合
    attrList = data as Array<ProductAttrBase>
  } else if (currentStep === 2) {
    attrCombinedList = data as Array<ProductAttrPrice>
  } else {
    getVersionList()
  }
  currentStep++
}

//  更新版本信息
const getVersionList = () =>
  service.findVersion(productId).then((data) => (versionList = data))

function onRest() {
  currentStep = 1
  attrList = []
  attrCombinedList = []
  versionId.value = ''
  onVersionHistoryClick()
}

const modal = useModal()
function onVersionHistoryClick() {
  modal
    .open({
      title: '产品属性历史版本',
      width: 900,
      component: ProductVersionList,
      props: { data: versionList },
    })
    .then((data?: ProductVersion) => {
      if (!data) return
      versionId.value = data.id

      // 取价格设定
      attrCombinedList = data.specs.map((item) => ({
        ...item,
        price: item.price ?? null,
      }))

      // 取属性设定
      attrList = data.attrs.map((x) => ({
        id: x.id,
        name: x.name,
        primary: x.primary,
      }))

      // 当前步骤
      currentStep = data.specs.length > 0 ? 3 : 2
    })
}
</script>
<route lang="yaml">
name: product-attr
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
</route>
