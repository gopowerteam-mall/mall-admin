<template lang="pug">
.product-properties
  .min-h-200px
    a-empty.m-t-40px(v-if='propList.length == 0')
    a-collapse(v-model='activedKey' :bordered='false')
      a-collapse-item.product-property-item(
        v-for='form in propList'
        :key='form.name'
        :header='form.name')
  .flex.justify-between
    a-button(type='dashed' status='success' @click='modifyData.dialog = true') 增加新属性
    a-space
      a-button(type='secondary' @click='onCancel') 取消
      a-button(type='primary') 确定
  a-modal(
    v-model:visible='modifyData.dialog'
    title='属性名称设置'
    @before-ok='onDialogBeforOk'
    @close='clearModifyData')
    a-input(v-model.trim='modifyData.name' placeholder='请输入属性名称')
</template>

<script lang="ts" setup>
import { useModal } from '@gopowerteam/vue-modal'
import { ProductService } from '@/http/services/ProductService'
import type {
  PropertySpecification,
  ProductPropertyInfo,
} from '../product.composable'
import { Message } from '@arco-design/web-vue'

const props = defineProps<{ id: string }>()

let detailInfo: any = null
let propList = $ref<ProductPropertyInfo[]>([])

const service = new ProductService()
const modal = useModal()

onBeforeMount(() => {
  service.getProduct(props.id).then((data: any) => {
    if (data.attrs) propList = data.attr
  })
})

// 当前展开的折叠面板
let activedKey = $ref('')
// 修改属性名称
const modifyData = $ref({
  dialog: false,
  name: '',
})
let editItem: ProductPropertyInfo | null = null

/** 创建一条属性对象 */
function createPropertyObj(name?: string): ProductPropertyInfo {
  const specification = createSpecificationObj()
  return {
    name: name ?? '',
    primary: false,
    items: [specification],
  }
}
/** 创建一个特性 */
function createSpecificationObj(): PropertySpecification {
  return {
    id: Date.now().toString(),
    name: '',
    image: '',
  }
}

// 表单清理
function clearModifyData() {
  modifyData.name = ''
  modifyData.dialog = false
  editItem = null
}
// 属性名称校验
function onDialogBeforOk(done: Function) {
  if (!modifyData.name) {
    Message.info('请输入属性名称')
    return done(false)
  }
  if (propList.some((x) => x.name === modifyData.name)) {
    Message.error('已存在相同的属性名称')
    return done(false)
  }

  if (!editItem) {
    const newProperty = createPropertyObj(modifyData.name)
    propList.push(newProperty)
  } else {
    editItem.name = modifyData.name
    activedKey = modifyData.name
  }
  done()
}

const onCancel = () => modal.close(false)

function save() {
  service
    .updateProduct(props.id, Object.assign(detailInfo, { attr: propList }))
    .then(() => modal.close(true))
}
</script>
