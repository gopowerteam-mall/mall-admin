<template lang="pug">
.product-attr-values
  a-table(
    :data='attrs'
    :columns='attrColumns'
    size='small'
    :pagination='false')
    template(#valueItem='{ record }')
      a-space
        .attr-value-item.flex.flex-center(
          v-for='(value,index) of attrValues.filter(x => x.attrId === record.id)'
          :key='`${record.id}-${index}`')
          ImagePreview(
            v-if='value.image'
            :src='value.image'
            width='50px'
            height='50px')
          a-tag(closable @close='onDelVal(record.id, value.name)') {{ value.name }}
  a-card.m-t-2(title='属性配置')
    a-form(
      ref='formRef'
      :model='model'
      :rules='rules'
      @submit-success='onInsert')
      a-form-item(field='attrId' label='属性名')
        a-select(v-model='model.attrId' placeholder='请选择属性' allow-clear)
          a-option(
            v-for='item of attrs'
            :key='item.id'
            :label='item.name'
            :value='item.id')
      a-form-item(label='属性值' field='valueName')
        a-input(
          v-model.trim='model.valueName'
          allow-clear
          placeholder='请输入属性值')
      a-form-item(v-if='showImage' label='属性值关联图片' field='valueImage')
        ProductBasePhotos(v-model='model.valueImage')
      a-form-item
        a-space
          a-button(@click='onResetClick') 重置
          a-button(html-type='submit' type='outline') 插入属性表
  .m-t-10px.flex.justify-between
    a-popconfirm(content='确定要重新设置商品属性名称吗?' @ok='emits("before")')
      a-button 上一步
    a-button(type='primary' @click='onNext') 下一步
</template>

<script lang="ts" setup>
import type { ProductAttrItemInput } from '@/http/models/ProductAttrItemInput'
import { ProductService } from '@/http/services/ProductService'
import { Message } from '@arco-design/web-vue'
import type { Ref } from 'vue'
import type { ProductAttrBase } from '../product.composable'
import ProductBasePhotos from './product-base-photos.vue'

const versionId = inject<Ref<string>>('versionId')

const props = defineProps<{ attrs: ProductAttrBase[] }>()

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

const attrValues = $ref<ProductAttrItemInput[]>([])

const emits = defineEmits(['before', 'next'])

const service = new ProductService()

const model = $ref({
  attrId: '',
  valueName: '',
  valueImage: '',
})

const rules = {
  attrId: { required: true, message: '请选择要插入的属性名称' },
  valueImage: { required: true, message: '请为属性值设置关联图片' },
  valueName: [
    { required: true, message: '请输入属性值名称' },
    {
      validator: (value: string, callback: Function) => {
        const hasSameValue = attrValues.some(
          (x) => x.attrId === model.attrId && x.name === value,
        )
        if (hasSameValue) {
          callback('属性值不能重复')
        } else {
          callback()
        }
      },
    },
  ],
}

const showImage = $computed(
  () => props.attrs.find((x) => x.id === model.attrId)?.primary ?? false,
)

const formRef = $ref<{ resetFields: () => void }>()
const onResetClick = () => formRef.resetFields()

// 插入属性值到属性表中
function onInsert() {
  attrValues.push({
    attrId: model.attrId,
    name: model.valueName,
    image: model.valueImage,
  })
  model.valueImage = ''
  model.valueName = ''
}

function onDelVal(attrId: string, valueName: string) {
  const index = attrValues.findIndex(
    (x) => x.attrId === attrId && x.name === valueName,
  )
  attrValues.splice(index, 1)
}

// 点击下一步验证数据完整性
function onNext() {
  const hasError = props.attrs.some((x) => {
    const valLens = attrValues.filter((v) => v.attrId === x.id).length
    if (valLens < 2) {
      const message =
        valLens === 0
          ? `请为${x.name}设置属性值`
          : `属性${x.name}的值不能少于两个`
      Message.info(message)
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
  service
    .setupProductAttrItems(versionId.value, { items: attrValues })
    .then(() => emits('next'))
}
</script>
