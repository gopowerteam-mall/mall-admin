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
  .flex.justify-between
    a-button(type='dashed' status='success' @click='onAddNewClick') 增加新属性
    a-space
      a-button(type='secondary' @click='onCancel') 取消
      a-button(type='primary' @click='onSubmit') 保存
</template>

<script lang="ts" setup>
import { ProductService } from '@/http/services/ProductService'
import type { ProductPropertyInfo } from '../product.composable'
import ProductPropertyForm from './product-property-form.vue'
import { useModal } from '@gopowerteam/vue-modal'
import { Message } from '@arco-design/web-vue'
import type { start } from 'nprogress'

const props = defineProps<{ id: string }>()

let detailInfo: any = null
let propList = $ref<ProductPropertyInfo[]>([])

const service = new ProductService()

onBeforeMount(() => {
  service.getProduct(props.id).then((data: any) => {
    // 商品原始信息
    detailInfo = data
    if (data.attrs && data.attrs.length) propList = data.attrs
    else onAddNewClick()
    // No-nullable
    setCurrentTabData(propList[0])
  })
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

// 弹框控制
const modal = useModal()
const onCancel = () => modal.close(false)

function onSubmit() {
  formRef.validate().then((r) => {
    if (!r) return
    // 再次同步表单数据到数据集
    syncSourceList()

    // 检测主属性未设置或者重复
    if (propList.filter((x) => x.primary).length > 1) {
      Message.error('主属性只能有一个，请检查')
      return
    }

    service
      .updateProduct(props.id, Object.assign(detailInfo, { attrs: propList }))
      .then(() => modal.close(true))
  })
}
</script>
