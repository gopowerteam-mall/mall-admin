<template lang="pug">
.product-attr
  a-form(:model='model' @submit-success='onSettingAttr')
    a-form-item(
      label='属性名称'
      :rules='{ required: true, message: "请输入产品的属性名称" }')
      a-input-tag(v-model='model.names' placeholder='多个属性请使用回车键分割')
    a-form-item(label='主属性名称')
      a-select(v-model='model.primaryName' placeholder='请设置主要属性')
        a-option(
          v-for='item of model.names'
          :key='item'
          :value='item'
          :label='item')
    a-form-item
      a-button(type='primary' html-type='submit') 下一步
</template>

<script lang="ts" setup>
import type { ProductAttr } from '@/http/models/ProductAttr'
import { ProductService } from '@/http/services/ProductService'

const props = defineProps<{ id: string; attrs: ProductAttr[] }>()
const emits = defineEmits(['next'])
const model = $ref({
  names: [],
  primaryName: '',
})

function onSettingAttr() {
  const attrs = model.names.map((x) => ({
    name: x,
    primary: model.primaryName === x,
  }))
  new ProductService()
    .setupProductAttrs(props.id, { attrs })
    .then(() => emits('next'))
}
</script>
