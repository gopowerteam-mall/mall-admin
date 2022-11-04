<template lang="pug">
.material-picker
  MaterialGroups.m-b-4(
    :model-value='groupId'
    @update:model-value='onGroupIdChange')
  .h-400px.overflow-auto.flex.justify-center
    a-checkbox-group(v-model='checkedValue' :max='limit')
      MaterialPreview(:data='photos' always-show-action)
        template(#default='{ key }')
          a-checkbox(:value='key')
  .flex.justify-end.p-r-4.m-b-4
    a-button(type='secondary' @click='onCancel') 取消
    a-button.m-l-2(type='primary' @click='onConfirm') 确定
</template>

<script lang="ts" setup>
import type { Material } from '@/http/models/Material'
import { MaterialService } from '@/http/services/MaterialService'
import { useModal } from '@gopowerteam/vue-modal'
import MaterialGroups from '../../material/components/material-groups.vue'
import MaterialPreview from '../../material/components/material-preview.vue'

defineProps<{ limit?: number }>()

const materialService = new MaterialService()

let groupId = $ref('')
let photos = $ref<Material[]>([])

function onGroupIdChange(id: string) {
  groupId = id
  const param: any = {}
  if (id) param.group = id
  materialService.findMaterial(param).then(({ data }) => (photos = data))
}

let checkedValue = $ref<string[]>([])

const modal = useModal()

function onCancel() {
  modal.close([])
}

function onConfirm() {
  modal.close(checkedValue)
}
</script>
