<template lang="pug">
page-container(:title='`素材组-${n}`')
  a-card(:title='`共有素材：${photos.length} 张`')
    template(#extra)
      a-popconfirm(content='是否删除该分组下所有素材' @ok='onDelete')
        a-button(status='danger' type='text') 清空素材
      a-button(type='text' @click='onAddClick') 上传素材
    a-empty(v-if='!photos.length')
    .flex.flex-wrap(v-else)
      a-image-preview-group(infinite)
        MaterialPreviewItem(
          v-for='{key,id} of photos'
          :key='key'
          :src='key'
          @delete='onPhotoDelete(id)')
</template>

<script setup lang="ts">
import { PageService } from '@/http/extends/page.service'
import type { Material } from '@/http/model'
import { Message } from '@arco-design/web-vue'
import { RequestParams } from '@gopowerteam/http-request'
import { useModal } from '@gopowerteam/vue-modal'
import { useRequest } from 'virtual:http-request'
import AddMaterial from './components/add-material.vue'
import MaterialPreviewItem from './components/material-preview-item.vue'

const route = useRoute()

const { n } = route.query
const { group } = route.params

let photos = $ref<Material[]>([])

const pageService = new PageService({ pageSize: 999 })

const materialService = useRequest((service) => service.MaterialService)
onMounted(() => {
  materialService
    .findMaterial(
      new RequestParams({
        data: {
          group,
        },
        page: pageService,
      }),
    )
    .subscribe({
      next: (data) => (photos = data),
    })
})

// 清空改组下所有素材
function onDelete() {
  const ids = photos.map((x) => x.id)
  materialService
    .deleteMaterialBatch({
      ids,
    })
    .subscribe({
      next: () => {
        Message.success('已全部删除')
        photos = []
      },
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
  materialService.deleteMaterialBatch({ ids: [id] }).subscribe({
    next: () => {
      const index = photos.findIndex((x) => x.id === id)
      if (index > -1) photos.splice(index, 1)
    },
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
