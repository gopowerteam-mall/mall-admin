<!-- <template lang="pug">
.product-material-items
  MaterialPreview(:data='photos')
    template(#default='{ id }')
      .cursor-pointer(@click='onPhotoDelete(id)')
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
  modelValue: string[]
  limit: number
}>()

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

function onPhotoDelete(id: string) {}
</script> -->
