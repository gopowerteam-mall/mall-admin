<template lang="pug">
.product-prices
</template>

<script lang="ts" setup>
import { useModal } from '@gopowerteam/vue-modal'
import { ProductService } from '@/http/services/ProductService'

const props = defineProps<{ id: string }>()

let detailInfo: any = null

const model = $ref({})

const rules = {}

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
