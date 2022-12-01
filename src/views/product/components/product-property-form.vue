<!-- eslint-disable vue/no-mutating-props -->
<template lang="pug">
.product-property-form
  a-form(
    ref='refForm'
    :model='data'
    :rules='rules'
    :label-col-props='{ span: 4 }')
    a-form-item(
      label='属性名称'
      field='name'
      :rules='[{ required: true, message: "请输入属性名称" }, { validator: validatorName }]')
      a-input(v-model='data.name' class='!w-220px' placeholder='请输入属性名称')
      a-checkbox.m-l-4(v-model='data.primary') 设为主要属性
      a-checkbox.m-l-2(v-model='showImage') 有属性缩略图
      .flex-1.text-right(v-if='disableList.length')
        a-popconfirm(content='是否删除该属性' @ok='$emit("delete")')
          a-button(status='danger') 删除该属性
    a-form-item(label='属性可选值' field='items')
      a-table.w-full(:data='data.items' :pagination='false' size='small')
        template(#columns)
          a-table-column(title='值名称' data-index='name')
            template(#cell='{ record }')
              a-input(v-model.trim='record.name' placeholder='请输入属性值')
          a-table-column(title='封面图' data-index='image')
            template(v-if='showImage' #cell='{ record }')
              ProductBasePhotos(v-model='record.image')
          a-table-column(:width='80' align='center')
            template(#title)
              a-button(@click='addNewValue')
                icon-park-outline:add.text-primary
            template(#cell='{ rowIndex }')
              a-button(
                shape='circle'
                size='mini'
                @click='data.items.splice(rowIndex, 1)')
                icon-park-outline:close.text-xs
</template>

<script lang="ts" setup>
import type {
  ProductPropertyInfo,
  PropertySpecification,
} from '../product.composable'
import ProductBasePhotos from './product-base-photos.vue'

defineEmits(['delete'])

const props = defineProps<{
  data: ProductPropertyInfo
  disableList: string[]
}>()
const refForm = $ref()

defineExpose({
  validate: async () => (await (refForm as any).validate()) === undefined,
})

const showImage = $ref(false)

// 验证规则
const rules = {
  name: [
    { required: true, message: '请输入属性名称' },
    {
      validator: (val: string, cb: Function) => {
        if (props.disableList.includes(val)) {
          cb('属性名称不可重复')
        } else cb()
      },
    },
  ],
  items: [
    {
      required: true,
      minLength: 2,
      message: '可选择属性值至少有两个',
    },
    {
      validator: (val: PropertySpecification[], cb: Function) => {
        if (val.some((x) => x.name === '')) {
          cb('请完善属性值')
        } else cb()
      },
    },
  ],
}

function validatorName(val: string, cb: Function) {
  if (props.disableList.includes(val)) {
    cb('属性名称不可重复')
  } else cb()
}

/** 创建一个特性 */
function addNewValue() {
  // eslint-disable-next-line vue/no-mutating-props
  props.data.items.push({
    id: Date.now().toString(),
    name: '',
    image: '',
  })
}
</script>
