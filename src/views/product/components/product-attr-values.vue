<template lang="pug">
.product-attr-values
  a-card(title='属性表')
    a-table(
      :data='selectOptions'
      :columns='attrColumns'
      size='small'
      :pagination='false'
      :show-header='false')
      template(#valueItem='{ record }')
        a-space
          .attr-value-item.flex.flex-center(
            v-for='(value,index) of record.items'
            :key='value.id')
            ImagePreview(
              v-if='value.image'
              :src='value.image'
              width='50px'
              height='50px')
            a-tag(closable @close='() => record.items.splice(index, 1)') {{ value.name }}
  a-form.m-t-10px.w-400px(
    ref='formRef'
    :model='model'
    :rules='rules'
    @submit-success='onInsert')
    a-form-item(field='attrId' label='属性名')
      a-select(v-model='model.attrId' placeholder='请选择属性')
        a-option(
          v-for='item of selectOptions'
          :key='item.id'
          :label='item.name'
          :value='item.id')
    a-form-item(label='属性值' field='valueName')
      a-input(v-model='model.valueName')
    a-form-item(v-if='showImage' label='属性值关联图片' field='valueImage')
      ProductBasePhotos(v-model='model.valueImage')
    a-form-item(content-class='!justify-end')
      a-space
        a-button(@click='onResetClick') 重置
        a-button(html-type='submit' type='outline') 插入属性表
  .m-t-10px.flex.justify-between
    a-popconfirm(content='确定要重新设置商品属性名称吗?' @ok='emits("before")')
      a-button 上一步
    a-button(type='primary' :disabled='!!model.attrId' @click='onNext') 下一步
</template>

<script lang="ts" setup>
import type { ProductAttr } from '@/http/models/ProductAttr'
import type { ProductAttrItemInput } from '@/http/models/ProductAttrItemInput'
import { ProductService } from '@/http/services/ProductService'
import { Message } from '@arco-design/web-vue'
import type { Ref } from 'vue'
import ProductBasePhotos from './product-base-photos.vue'

const id = inject<string>('id')
const versionId = inject<Ref<string>>('versionId')

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

const emits = defineEmits(['before', 'next'])

// define option type
type SelectOptionType = Pick<ProductAttr, 'id' | 'name' | 'primary'>
type AttrType = SelectOptionType & { items: ProductAttrItemInput[] }

const selectOptions = $ref<SelectOptionType[]>([])
const attrList = $ref<AttrType[]>([])

const service = new ProductService()
onBeforeMount(() => {
  if (!versionId?.value) return
  service.getVersion(versionId.value).then((data) => {
    data.attrs.forEach((x) => {
      // set option
      const attrBase = {
        id: x.id,
        name: x.name,
        primary: x.primary,
      }
      selectOptions.push(attrBase)

      // set values
      const items = x.items.map((value) => ({
        attrId: x.id,
        name: value.name,
        image: value.image,
      }))

      attrList.push({ ...attrBase, items })
    })
  })
})

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
        const attr = attrList.find((x) => x.id === model.attrId)
        if (attr && attr.items.length) {
          if (attr.items.some((x) => x.name === value)) {
            callback('属性值不能重复')
          } else callback()
        } else callback()
      },
    },
  ],
}

const showImage = $computed(
  () => selectOptions.find((x) => x.id === model.attrId)?.primary ?? false,
)

const formRef = $ref<{ resetFields: () => void }>()
const onResetClick = () => formRef.resetFields()

// 插入属性值到属性表中
function onInsert() {
  const item = {
    attrId: model.attrId,
    name: model.valueName,
    image: model.valueImage,
  }
  const record = attrList.find((x) => x.id === model.attrId)
  if (record) {
    record.items.push(item)
    onResetClick()
  }
}

// 点击下一步验证数据完整性
function onNext() {
  const hasError = attrList.some((x) => {
    if (x.items.length === 0) {
      Message.info(`请为${x.name}设置属性值`)
      return true
    }
    if (x.items.length < 2) {
      Message.info(`属性${x.name}的值不能少于两个`)
      return true
    }
    return false
  })
  if (hasError) return
  const items = attrList.reduce<ProductAttrItemInput[]>(
    (items, attr) => items.concat(...attr.items),
    [],
  )
  if (!id) {
    Message.error('获取产品ID失败，请刷新页面重试')
    return
  }
  service.setupProductAttrItems(id, { items }).then(() => emits('next'))
}
</script>
