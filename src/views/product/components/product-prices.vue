<template lang="pug">
.product-prices
  a-table(:data='skuList')
    template(#columns)
      a-table-column(
        v-for='property of attrs'
        :key='property.id'
        :title='property.name')
        template(#cell='{ record }')
          a-select(v-model='record[property.name]')
            a-option(
              v-for='item of property.items'
              :key='item.id'
              :label='item.name'
              :value='item.name')
      a-table-column(align='center')
        template(#title)
          a-button 添加一行
        template(#cell='{ rowIndex }')
          a-button(
            shape='circle'
            size='mini'
            @click='skuList.splice(rowIndex, 1)')
            icon-park-outline:close.text-xs
</template>

<script lang="ts" setup>
import { useModal } from '@gopowerteam/vue-modal'
import { ProductService } from '@/http/services/ProductService'
import type { ProductPropertyInfo } from '../product.composable'

const props = defineProps<{ id: string }>()

let detailInfo: any = null

const model = $ref({})

// Test datas
const attrs = [
  {
    id: '1669877471070',
    name: '内存大小',
    primary: false,
    items: [
      {
        id: '1669877485119',
        name: '6GB',
        image: '',
      },
      {
        id: '1669877491584',
        name: '8GB',
        image: '',
      },
    ],
  },
  {
    id: '1669877012667',
    name: '颜色',
    primary: true,
    items: [
      {
        id: '1669877461246',
        name: '红色',
        image: 'ftdux_Q7YvPBvKOIX5Z8c',
      },
      {
        id: '1669877464411',
        name: '绿色',
        image: 'DRMoDI4acj9GQpg6mhuSx',
      },
      {
        id: '1669877467142',
        name: '黑色',
        image: 'n5WxRvHX9bBVblIXcbRK9',
      },
    ],
  },

  {
    id: '1669877471071',
    name: '存储容量',
    primary: false,
    items: [
      {
        id: '1269877485119',
        name: '128GB',
        image: '',
      },
      {
        id: '1269877491584',
        name: '256GB',
        image: '',
      },
      {
        id: '1269877485120',
        name: '512GB',
        image: '',
      },
      {
        id: '1269877491521',
        name: '1TB',
        image: '',
      },
    ],
  },
]

const propertiesList = $computed(() =>
  attrs.map((x) => ({ label: x.name, value: x.id })),
)

let skuColumns = $ref<ProductPropertyInfo[]>([])
let skuList = $ref<any[]>([])

const service = new ProductService()
const modal = useModal()

onBeforeMount(() => {
  service.getProduct(props.id).then((data) => {
    detailInfo = data
  })
})

const onCancel = () => modal.close(false)

function save() {
  service
    .updateProduct(props.id, Object.assign(detailInfo, model))
    .then(() => modal.close(true))
}
</script>
