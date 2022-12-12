<template lang="pug">
.product-attr-names
  a-form(:model='model' @submit-success='onSettingAttr')
    a-form-item(
      label='属性名称'
      field='names'
      :rules='{ required: true, message: "请输入产品的属性名称" }')
      a-input-tag(v-model='model.names' placeholder='多个属性请使用回车键分割')
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

const id = inject<string>('id')
const versionId = inject<Ref<string>>('versionId')

const emits = defineEmits(['next'])

const model = $ref<{ names: string[]; primaryName: string }>({
  names: [],
  primaryName: '',
})

const service = new ProductService()
onBeforeMount(() => {
  if (!versionId?.value) return
  service.getVersion(versionId.value).then((data) => {
    data.attrs.forEach((x) => {
      model.names.push(x.name)
      if (x.primary) model.primaryName = x.name
    })
  })
})

function onSettingAttr() {
  if (!id) {
    Message.error('获取产品ID失败，请刷新页面重试')
    return
  }
  const attrs = model.names.map((x) => ({
    name: x,
    primary: model.primaryName === x,
  }))
  new ProductService()
    .setupProductAttrs(id, { attrs })
    .then(() => emits('next'))
}
</script>
