<template lang="pug">
a-form(:model='form' @submit='handleSubmit')
  a-form-item(field='keys' hide-label)
    media-gallery(ref='mediaGallyRef' v-model='form.keys' multiple)
  a-form-item(content-class='!justify-end')
    a-button(@click='onCancel') 取消
    a-button.m-l-4(:loading='saving' html-type='submit' type='primary') 提交
</template>

<script lang="ts" setup>
import type { Material } from '@/http/model'
import { Message } from '@arco-design/web-vue'
import { RequestParams } from '@gopowerteam/http-request'
import { useModal } from '@gopowerteam/vue-modal'
import { useRequest } from 'virtual:http-request'

type PropInterface = {
  groupId: string
}

let saving = $ref(false)
const props = defineProps<PropInterface>()

const form = $ref({
  keys: [],
})

const mediaGallyRef = $ref<{ uploaded: () => boolean }>()

function handleSubmit() {
  // check whether the upload tasks are completed ?
  if (!mediaGallyRef.uploaded()) {
    Message.error('上传未完成,请稍后重试')
    return
  }

  saving = true
  useRequest((service) => service.MaterialService)
    .createMaterial(
      new RequestParams({
        data: {
          keys: form.keys,
          group: props.groupId,
        },
      }),
    )
    .subscribe({
      next: onSuncess,
      error: () => (saving = false),
    })
}

const modal = useModal()
function onCancel() {
  modal.close(null)
}

function onSuncess(data: Material[]) {
  saving = false
  Message.success('添加成功')
  modal.close(data)
}
</script>
