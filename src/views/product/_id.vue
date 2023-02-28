<template lang="pug">
page-container(title='商品详情' :space='5' v-if='product')
  ProductBasic(:product='product')
  .flex.space-x-5
    .w-300px
      ProductVersions(v-model='currentVersion')
    .flex-auto
      ProductAttrs(:version='currentVersion')
</template>

<script lang="ts" setup>
import type { Product } from '@/http/models/Product'
import { useRequest } from 'virtual:request'

import ProductBasic from './components/product-basic.vue'
import ProductVersions from './components/product-versions.vue'
import ProductAttrs from './components/product-attrs.vue'
import { providers } from '@/config/provider.config'
import type { ProductVersion } from '@/http/models/ProductVersion'

const route = useRoute()

const productService = useRequest((service) => service.ProductService)

const id = route.params.id as string

const product = ref<Product>()
const currentVersion = ref<ProductVersion>()

provide(providers.product, product)

/**
 * 请求商品详情
 */
async function requestProduct() {
  product.value = await productService.getProduct(id)

  const version = product.value?.versions?.[0]

  if (version) {
    currentVersion.value = version
  }
}

onMounted(() => {
  requestProduct()
})

onActivated(() => {
  requestProduct()
})
</script>

<route lang="yaml">
name: product
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
</route>
