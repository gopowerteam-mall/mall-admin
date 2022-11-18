<template lang="pug">
page-container(title='素材管理')
  MaterialGroups.p-b-2(v-model='groupId' editable)
  .p-x-2
    MaterialItems(:group-id='groupId')
</template>

<script setup lang="ts">
import MaterialGroups from './components/material-groups.vue'
import MaterialItems from './components/material-items.vue'

let groupId = $ref('')
</script>

<route lang="yaml">
name: material
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
  menu:
    key: mall-setting.material
    icon: xxx
    title: 素材管理
</route>
