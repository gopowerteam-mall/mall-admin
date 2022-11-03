<template lang="pug">
.material-picker
  MaterialGroups(:model-value='groupId' @update:model-value='onGroupIdChange')
  a-checkbox-group(v-model='checkedValue')
    MaterialPreview(:data='photos')
      template(#default='{ id }')
        a-checkbox(:value='id')
</template>

<script lang="ts" setup>
import type { Material } from '@/http/models/Material'
import { MaterialService } from '@/http/services/MaterialService'
import MaterialGroups from '../../material/components/material-groups.vue'
import MaterialPreview from '../../material/components/material-preview.vue'

const materialService = new MaterialService()

let groupId = $ref('')
let photos = $ref<Material[]>([])

function onGroupIdChange(id: string) {
  groupId = id
  materialService
    .findMaterial({ group: groupId })
    .then(({ data }) => (photos = data))
}

let checkedValue = $ref<string[]>([])
</script>
