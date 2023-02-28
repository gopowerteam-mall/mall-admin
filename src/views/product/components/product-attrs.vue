<template lang="pug">
a-card(title='商品属性')
  .product-attrs-contaienr(v-if='version')
  a-empty(v-else) 请选择左侧的商品属性
</template>
<script setup lang="ts">
import type { ProductVersion } from '@/http/models/ProductVersion'

defineProps<{
  version?: ProductVersion
}>()
</script>

<style lang="less" scoped></style>
