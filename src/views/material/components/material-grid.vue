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
import { PageService } from '@/http/extends/page.service'
import { Message } from '@arco-design/web-vue'
import { RequestParams } from '@gopowerteam/http-request'
import { useRequest } from 'virtual:http-request'

type PropInterface = {
  groupId: string
}

const props = defineProps<PropInterface>()
let photos = $ref<string[]>([])

const pageService = new PageService({ pageSize: 999 })

const materialService = useRequest((service) => service.MaterialService)
onMounted(() => {
  materialService
    .findMaterial(
      new RequestParams({
        data: {
          group: props.groupId,
        },
        page: pageService,
      }),
    )
    .subscribe({
      next: (data) => {
        photos = data.map((x) => x.key)
      },
    })
})

// 清空改组下所有素材
function onDelete() {
  materialService
    .deleteMaterialBatch({
      ids: photos,
    })
    .subscribe({
      next: () => {
        Message.success('已全部删除')
        photos = []
      },
    })
}

function onModelChange(data: string[]) {
  materialService
    .createMaterial(
      new RequestParams({
        data: {
          keys: data,
          group: props.groupId,
        },
      }),
    )
    .subscribe({
      next: () => (photos = data),
    })
}
</script>
