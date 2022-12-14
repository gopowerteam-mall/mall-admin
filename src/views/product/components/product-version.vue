<template lang="pug">
.product-version.flex.space-x-2
  .attr.flex-1
    .text-gray.leading-6 产品属性
    a-table(
      :data='data.attrs'
      :columns='attrColumns'
      size='small'
      :pagination='false'
      :show-header='false')
      template(#valueItem='{ record }')
        a-space
          .attr-value-item.flex.flex-center(
            v-for='value of record.items'
            :key='value.id')
            ImagePreview(
              v-if='value.image'
              :src='value.image'
              width='50px'
              height='50px')
            a-tag {{ value.name }}
  .spce.flex-1
    .text-gray.leading-6 属性组合-价格
    a-table(
      :data='data.specs'
      :columns='skuColumns'
      size='small'
      :pagination='false'
      :show-header='false')
      template(#skuCombine='{ record }')
        a-space
          a-tag(v-for='item of record.items' :key='item.id') {{ item.name }}
</template>

<script lang="ts" setup>
import type { ProductVersion } from '@/http/models/ProductVersion'

defineProps<{ data: ProductVersion }>()

const moneyFormat = (value?: number) => (value ? value.toFixed(2) + '元' : '--')

const attrColumns = [
  {
    title: '属性名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '属性项',
    slotName: 'valueItem',
  },
]

const skuColumns = [
  {
    title: '属性组合',
    slotName: 'skuCombine',
  },
  {
    title: '价格',
    dataIndex: 'price',
    render: ({ record }: any) => moneyFormat(record.price),
  },
]
</script>
