<template lang="pug">
a-card(title='商品信息' v-if='product')
  template(#extra)
    a-button(
      type='primary'
      size='mini'
      @click='() => router.push({ name: "product-basic", query: { id: product?.id } })') 编辑
  .product-container.flex.space-x-5
    image-preview(:src='product?.cover' width='100px')
    a-descriptions.flex-auto(:column='2')
      a-descriptions-item(label='商品名称') {{ product?.title }}
      a-descriptions-item(label='商品子标题') {{ product?.subtitle }}
      a-descriptions-item(label='商品分类') {{ product?.category?.title }}
      a-descriptions-item(label='商品关键字') {{ product?.keyword.join(',') }}
      a-descriptions-item(label='发布状态') {{ PublishTypeDict.get(product?.enable) }}
      a-descriptions-item(label='推荐状态') {{ RecommendTypeDict.get(product?.recommended) }}
</template>
<script setup lang="ts">
import { PublishTypeDict, RecommendTypeDict } from '@/config/dict.config'
import { providers } from '@/config/provider.config'

const router = useRouter()
const product = inject(providers.product)
</script>

<style lang="less" scoped></style>
