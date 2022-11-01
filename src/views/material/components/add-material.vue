<template lang="pug">
a-form(:model='form' @submit='handleSubmit')
  a-form-item(field='keys' hide-label)
    media-gallery(ref='mediaGallyRef' v-model='form.keys' multiple)
  a-form-item(content-class='!justify-end')
    a-button(@click='onCancel') 取消
    a-button.m-l-4(:loading='loadingStatus' html-type='submit' type='primary') 提交
</template>

<script lang="ts" setup>
import { LoadingService } from '@/http/extends/loading.service'
import { MaterialService } from '@/http/services/MaterialService'
import { Message } from '@arco-design/web-vue'
import { useModal } from '@gopowerteam/vue-modal'

const loadingStatus = ref(false)
const props = defineProps<{
  groupId: string
}>()

const form = $ref({
  keys: [],
})

const mediaGallyRef = $ref<{ uploaded: () => boolean }>()

const materialService = new MaterialService()
const loadingService = new LoadingService(loadingStatus)

function handleSubmit() {
  // check whether the upload tasks are completed ?
  if (!mediaGallyRef.uploaded()) {
    Message.error('上传未完成,请稍后重试')
    return
  }

  materialService
    .createMaterial(
      {
        keys: form.keys,
        group: props.groupId,
      },
      [loadingService],
    )
    .then((data) => {
      Message.success('添加成功')
      modal.close(data)
    })
}

const modal = useModal()
function onCancel() {
  modal.close(null)
}
</script>
