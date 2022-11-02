<template lang="pug">
.material-picker
  a-select(v-model='groupId' placeholder='请选择一个素材组')
    a-option(
      v-for='item of groupList'
      :key='item.id'
      :value='item.id'
      :label='`${item.name}--${item.count}张`')
</template>

<script lang="ts" setup>
import type { MaterialGroupResponse } from '@/http/models/MaterialGroupResponse'
import { MaterialService } from '@/http/services/MaterialService'

const materialService = new MaterialService()

let groupList = $ref<MaterialGroupResponse[]>([])

let groupId = $ref('')

onMounted(() => {
  materialService.findMaterialGroup().then((data) => (groupList = data))
})
</script>
