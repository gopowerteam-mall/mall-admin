<template lang="pug">
a-card(title='素材列表')
  template(#extra)
    a-popconfirm(content='是否删除该分组下所有素材' @ok='onDelete')
      a-button(status='danger' type='text') 清空素材
  media-gallery(
    :model-value='photos'
    multiple
    @update:modelValue='onModelChange')
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { useRequest } from 'virtual:request'

const props = defineProps<{
  groupId: string
}>()
let photos = $ref<string[]>([])

const materialService = useRequest((service) => service.MaterialService)
onMounted(() => {
  materialService.findMaterial({ group: props.groupId }).then((data) => {
    photos = data.map((x) => x.key)
  })
})

// 清空改组下所有素材
function onDelete() {
  materialService
    .deleteMaterialBatch({
      ids: photos,
    })
    .then(() => {
      Message.success('已全部删除')
      photos = []
    })
}

function onModelChange(data: string[]) {
  data.forEach((key) => {
    if (photos.includes(key)) return
    materialService
      .createMaterial({
        keys: [key],
        group: props.groupId,
      })

      .then(() => photos.push(key))
  })
}
</script>
