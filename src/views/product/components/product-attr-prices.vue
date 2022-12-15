<template lang="pug">
.product-attr-prices
  a-table(:data='data' :columns='attrColumns' size='small' :pagination='false')
    template(#attrCombind='{ record }')
      a-space
        .product-attr-value.flex.flex-center(
          v-for='item of record.items'
          :key='item.id')
          ImagePreview.m-r-2(
            v-if='item.image'
            :src='item.image'
            width='50px'
            height='50px')
          a-tag {{ item.name }}
    template(#valueItem='{ record }')
      a-input-number(
        v-model='record.price'
        placeholder='请输入价格'
        :step='1'
        :precision='2')
  .m-t-10px.flex.justify-between
    a-popconfirm(content='确定要重新设置商品属性项吗?' @ok='emits("before")')
      a-button 上一步
    a-button(type='primary' @click='onNext') 下一步
</template>

<script lang="ts" setup>
import type { ProductAttrItemInput } from '@/http/models/ProductAttrItemInput'
import { ProductService } from '@/http/services/ProductService'
import { Message } from '@arco-design/web-vue'
import type { Ref } from 'vue'
import type { ProductAttrPrice } from '../product.composable'

const versionId = inject<Ref<string>>('versionId')

const props = defineProps<{ data: ProductAttrPrice[] }>()

const attrColumns = [
  {
    title: '属性组合',
    slotName: 'attrCombind',
  },
  {
    title: '价格',
    slotName: 'valueItem',
  },
]

const _attrValues = $ref<ProductAttrItemInput[]>([])

const emits = defineEmits(['before', 'next'])

const service = new ProductService()

const formRef = $ref<{ resetFields: () => void }>()
const _onResetClick = () => formRef.resetFields()

// 点击下一步验证数据完整性
function onNext() {
  const hasError = props.data.some((x, index) => {
    if (x.price === null) {
      Message.info(`请填写第${index + 1}行的价格`)
      return true
    } else {
      return false
    }
  })
  if (hasError) return

  if (!versionId) {
    Message.error('获取产品版本失败，请刷新页面重试')
    return
  }

  const specs = props.data.map((x) => ({ id: x.id, price: x.price! }))
  service.setupProductSpecs({ specs }).then(() => emits('next'))
}
</script>
