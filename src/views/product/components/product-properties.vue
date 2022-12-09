<template lang="pug">
.product-properties
  a-tabs(:active-key='activedKey' hide-content @tab-click='onTabClick')
    a-tab-pane.product-property-item(
      v-for='propItem in propList'
      :key='propItem.id')
      template(#title)
        .flex
          span(:class='{ "font-blod": propItem.primary }') {{ propItem.name }}
          icon-park:star.text-xs.m-l-2(v-if='propItem.primary')
  .min-h-300px.m-t-4
    ProductPropertyForm(
      v-if='tabData'
      ref='formRef'
      :data='tabData'
      :disable-list='usedNames'
      @delete='onDeleteClick')
  .flex.justify-end
    a-space
      a-button(type='dashed' status='success' @click='onAddNewClick') 增加新属性
      a-button(type='primary' @click='onSubmit') 保存
</template>

<script lang="ts" setup>
import { ProductService } from '@/http/services/ProductService'
import type {
  ProductPropertyInfo,
  PropertySpecification,
} from '../product.composable'
import ProductPropertyForm from './product-property-form.vue'
import { useModal } from '@gopowerteam/vue-modal'
import { Message } from '@arco-design/web-vue'

const props = defineProps<{ id: string; attrs: ProductPropertyInfo[] }>()

let propList = $ref<ProductPropertyInfo[]>([])

const service = new ProductService()

onMounted(() => {
  if (props.attrs.length) propList = props.attrs
  else onAddNewClick()
  // No-nullable
  setCurrentTabData(propList[0])
})

let formRef = $ref<{ validate: () => Promise<boolean> }>()
// 当前激活的属性
let activedKey = $ref('')
// 设置显示输入框
let tabData = $ref<ProductPropertyInfo>()
// 编辑时不可用的属性名称
const usedNames = $computed(() =>
  propList.filter((x) => x.id !== activedKey).map((x) => x.name),
)

function getRandomName() {
  const keys = '1234567890qwertyuiopasdfghjklzxcvbnm'
  let str = ''
  while (str.length < 4) {
    str += keys[Math.floor(Math.random() * 36)]
  }
  return str
}

// 属性名称校验
function onAddNewClick() {
  const newProperty = {
    id: Date.now().toString(),
    name: '新属性-' + getRandomName(),
    primary: false,
    items: [],
  }

  propList.push(newProperty)
}

// 删除操作
function onDeleteClick() {
  const index = propList.findIndex((x) => x.id === activedKey)
  propList.splice(index, 1)
  // 重新设置选中tab
  setCurrentTabData(propList[0])
}

// 点击tab时校验属性，并切换tab
async function onTabClick(key: string) {
  const result = await formRef.validate()
  if (!result) return
  syncSourceList()
  if (activedKey !== key) {
    const srouceData = propList.find((x) => x.id === key)!
    setCurrentTabData(srouceData)
  }
}

// 设置当前选中的数据
function setCurrentTabData(data: ProductPropertyInfo) {
  tabData = Object.assign({}, data)
  activedKey = data.id
}

// 同步数据源
function syncSourceList() {
  const sourceItem = propList.find((x) => x.id === activedKey)!
  sourceItem.name = tabData.name
  sourceItem.primary = tabData.primary
  sourceItem.items = tabData.items
}

async function onSubmit() {
  if (!(await formRef.validate())) return

  // 再次同步表单数据到数据集
  syncSourceList()

  // 检测主属性未设置或者重复
  if (propList.filter((x) => x.primary).length > 1) {
    Message.error('主属性只能有一个，请检查')
    return
  }

  // setp1 保存attrNames
  const param = propList.map((x) => ({ name: x.name, primary: x.primary }))
  const attrResponse = await service.updateProductAttr(props.id, {
    attr: param,
  } as any)

  // const valueList: PropertySpecification[]
  // attrResponse.

  // = ([] = propList.reduce(
  //   (list: PropertySpecification[], attr) => {
  //     const serverAttr = attrResponse.find((x) => x.name === attr.name)
  //     if (!serverAttr) return list
  //     attr.items.forEach((x) => list.push({ ...x, id: serverAttr.id }))
  //     return attr
  //   },
  //   [],
  // ))
}
</script>
