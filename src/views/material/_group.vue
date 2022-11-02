<template lang="pug">
page-container(:title='`素材组-${n}`')
  a-card(:title='`共有素材：${photos.length} 张`')
    template(#extra)
      a-popconfirm(content='是否删除该分组下所有素材' @ok='onDelete')
        a-button(status='danger' type='text') 清空素材
      a-button(type='text' @click='onAddClick') 上传素材
    MaterialPreview(:data='photos')
      template(#default='{ id }')
        a-popconfirm(content='是否删除该素材' @ok='onPhotoDelete(id)')
          a-button(type='text')
            icon-park-outline:delete.text-xs(@click='onPhotoDelete(id)')
</template>

<script setup lang="ts">
// import { PageService } from '@/http/extends/page.service'
import type { Material } from '@/http/models/Material'
import { MaterialService } from '@/http/services/MaterialService'
import { Message } from '@arco-design/web-vue'
import { useModal } from '@gopowerteam/vue-modal'
import AddMaterial from './components/add-material.vue'
import MaterialPreview from './components/material-preview.vue'

const route = useRoute()

const { n } = route.query
const { group } = route.params

let photos = $ref<Material[]>([])

// const pageService = new PageService(1, 999)

const materialService = new MaterialService()
onMounted(() => {
  materialService
    .findMaterial(
      {
        group: group.toString(),
      },
      // [pageService],
    )
    .then((data) => (photos = data.data))
})

// 清空改组下所有素材
function onDelete() {
  const ids = photos.map((x) => x.id)
  materialService
    .deleteMaterialBatch({
      ids: ids,
    })
    .then(() => {
      Message.success('已全部删除')
      photos = []
    })
}

const modal = useModal()
function onAddClick() {
  modal
    .open({
      component: AddMaterial,
      width: 550,
      props: { groupId: group },
      title: '添加素材',
    })
    .then((keys: Material[] | null) => keys && photos.push(...keys))
}

function onPhotoDelete(id: string) {
  materialService.deleteMaterialBatch({ ids: [id] }).then(() => {
    const index = photos.findIndex((x) => x.id === id)
    if (index > -1) photos.splice(index, 1)
  })
}
</script>

<route lang="yaml">
name: material-group
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
</route>
