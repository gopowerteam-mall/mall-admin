<template lang="pug">
a-card(:title='`共有素材：${photos.length} 张`')
  template(#extra)
    a-popconfirm(content='是否删除该分组下所有素材' @ok='onDelete')
      a-button(status='danger' type='text') 清空素材
    a-button(type='text' @click='onAddClick') 上传素材
  MaterialPreview(:data='photos')
    template(#default='{ id }')
      .cursor-pointer(title='警告:删除后不可恢复!' @click='onPhotoDelete(id)')
        icon-park-outline:delete.text-red-500.text-xs
</template>

<script setup lang="ts">
// import { PageService } from '@/http/extends/page.service'
// import { LoadingService } from '@/http/extends/loading.service'
import type { Material } from '@/http/models/Material'
import { MaterialService } from '@/http/services/MaterialService'
import { Message } from '@arco-design/web-vue'
import { useModal } from '@gopowerteam/vue-modal'
import AddMaterial from './add-material.vue'
import MaterialPreview from './material-preview.vue'

const props = defineProps<{
  groupId: string
}>()

let photos = $ref<Material[]>([])

// const pageService = new PageService(1, 999)
// const loadingStatus = ref(false)
// const loadingService = new LoadingService(loadingStatus)

const materialService = new MaterialService()

// Refresh during the value initial and changes
watch(
  () => props.groupId,
  () => refreshData(),
  { immediate: true },
)

function refreshData() {
  const param: any = {}
  if (props.groupId) param.group = props.groupId

  materialService.findMaterial(param).then((data) => (photos = data.data))
}

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
      props: { groupId: props.groupId },
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
