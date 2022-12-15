<template lang="pug">
.product-attr-names
  a-form(:model='model' @submit-success='onSettingAttr')
    a-form-item(
      label='属性名称'
      field='names'
      :rules='{ required: true, message: "请输入产品的属性名称" }')
      a-input-tag(
        v-model='model.names'
        unique-value
        placeholder='请输入属性名称并按回车键分割')
    a-form-item(label='主属性名称' field='primaryName')
      a-select(v-model='model.primaryName' placeholder='请设置主要属性')
        a-option(
          v-for='item of model.names'
          :key='item'
          :value='item'
          :label='item')
    a-form-item(content-class='!justify-end')
      a-button(type='primary' html-type='submit') 下一步
</template>

<script lang="ts" setup>
import { ProductService } from '@/http/services/ProductService'
import { Message } from '@arco-design/web-vue'
import type { Ref } from 'vue'

const versionId = inject<Ref<string>>('versionId')

const emits = defineEmits(['next'])

const model = $ref<{ names: string[]; primaryName: string }>({
  names: [],
  primaryName: '',
})

function onSettingAttr() {
  if (!versionId) {
    Message.error('获取版本ID失败，请刷新页面重试')
    return
  }
  const attrs = model.names.map((x) => ({
    name: x,
    primary: model.primaryName === x,
  }))
  new ProductService()
    .setupProductAttrs(versionId.value, { attrs })
    .then((data) => emits('next', data))
}
</script>
