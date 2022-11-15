<template lang="pug">
.product-properties
  a-form.product-property-item(
    v-for='(form, index) in propList'
    :key='`form-${index}`'
    layout='vertical'
    :model='form')
    a-form-item(label='属性名称' field='name')
      a-input.w-180px(v-model='form.name' placeholder='请输入商品属性名称')
      a-checkbox(v-model='form.primary') 主属性
</template>

<script lang="ts" setup>
import { useModal } from '@gopowerteam/vue-modal'
import { ProductService } from '@/http/services/ProductService'
import type {
  PropertySpecification,
  ProductPropertyInfo,
} from '../product.composable'

const props = defineProps<{ id: string }>()

let detailInfo: any = null

let propList = $ref<ProductPropertyInfo[]>([])

const service = new ProductService()
const modal = useModal()

onBeforeMount(() => {
  service.getProduct(props.id).then((data) => {
    detailInfo = data
    if (data && data.attrs.length) {
      propList = data.attrs as any
    } else {
      // 默认创建一条
      propList = [createPropertyObj()]
    }
  })
})

/** 创建一条属性对象 */
function createPropertyObj(): ProductPropertyInfo {
  const specification = createSpecificationObj()
  return {
    name: '',
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

const onCancel = () => modal.close(false)

function save() {
  service
    .updateProduct(props.id, Object.assign(detailInfo, { attr: propList }))
    .then(() => modal.close(true))
}
</script>
