<template lang="pug">
.product-version-list.min-h-500px
  a-collapse(v-model:active-key='current' accordion)
    a-collapse-item(v-for='version of data' :key='version.id')
      template(#header)
        .flex
          .text-gray 版本号：
          .text-blod.w-60px {{ version.version }}
          .text-gray 修改日期：
          .text-blod {{ dateTimeFormat(version.updatedAt) }}
      template(#extra)
        a-button(
          v-show='versionId === version.id'
          type='outline'
          @click.stop='onClick(version)') 编辑此版本
      ProductVersion(:data='version')
</template>

<script lang="ts" setup>
import type { ProductVersion as ProductVersionType } from '@/http/models/ProductVersion'
import ProductVersion from './product-version.vue'
import { dateTimeFormat } from '~/shared/common'
import { useModal } from '@gopowerteam/vue-modal'

defineProps<{ data: ProductVersionType[] }>()

const current = $ref<string[]>([])

const versionId = $computed(() => current[0])

const modal = useModal()
const onClick = (data: ProductVersionType) => modal.close(data)
</script>
<style lang="less" scoped>
.product-version-list {
  :deep(.arco-collapse-item-header-extra) {
    height: 24px;
  }
}
</style>
