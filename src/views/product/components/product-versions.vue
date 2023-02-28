<template lang="pug">
a-card(title='商品版本' v-if='product')
  template(#extra)
    a-button(type='text' size='mini') 
      IconParkOutline:plus(
        @click='() => router.push({ name: "product-version", params: { id: product?.id } })')
  .product-versions-container.space-y-4(v-if='product.versions.length')
    .product-version.flex.justify-between.items-center.h-20px(
      v-for='version in product.versions'
      :class='{ active: version.enable, selected: version.id === currentVersion?.id }'
      :key='version.id')
      .title(@click='() => (currentVersion = version)') {{ dateTimeFormat(version.createdAt) }}
      .action
        a-button(type='text' size='mini' v-if='!version.enable') 
          IconParkOutline:checkSmall
      .state(v-if='version.enable') (当前)
  a-empty(v-else) 请创建商品属性信息
</template>
<script setup lang="ts">
import { providers } from '@/config/provider.config'
import type { ProductVersion } from '@/http/models/ProductVersion'
import { dateTimeFormat } from '@/shared/common'

const router = useRouter()
const product = inject(providers.product)

const props = defineProps<{
  modelValue?: ProductVersion
}>()

const emit = defineEmits(['update:modelValue'])

const currentVersion = useVModel(props, 'modelValue', emit)
</script>

<style lang="less" scoped>
.product-version {
  cursor: pointer;
  &.selected {
    color: rgb(var(--arcoblue-6));
  }
}
</style>
