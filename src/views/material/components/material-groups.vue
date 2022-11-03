<template lang="pug">
.flex.flex-nowrap
  a-tabs.flex-1(
    :active-key='modelValue'
    default-active-key='``'
    type='rounded'
    hide-content
    @change='onTabpaneChange')
    a-tab-pane(v-for='group of dataList' :key='group.id' :title='group.name')
  a-dropdown-button(v-if='editable' @click='onAddClick') 增加素材组
    template(#content)
      a-doption(:disabled='!modelValue' @click='onEditClick') 编辑组信息
        template(#icon)
          icon-park-outline:edit
      a-doption(:disabled='!modelValue' @click='onDeleteClick') 删除素材组
        template(#icon)
          icon-park-outline:delete
</template>

<script setup lang="ts">
import { MaterialService } from '@/http/services/MaterialService'
import { Message, Modal } from '@arco-design/web-vue'
import { useModal } from '@gopowerteam/vue-modal'
import type { MaterialGroupResponse } from '~/http/models/MaterialGroupResponse'
import MaterialGroupEdit from './material-group-edit.vue'

type GroupTabsProp = {
  modelValue: string
  editable?: boolean
}

const props = defineProps<GroupTabsProp>()
const emits = defineEmits(['update:modelValue'])

const materialService = new MaterialService()
let dataList = $ref<MaterialGroupResponse[]>()

function refreshData() {
  materialService.findMaterialGroup().then((data) => {
    dataList = data
    onTabpaneChange('')
  })
}

// initial
onMounted(refreshData)

const onTabpaneChange = (key: string) => emits('update:modelValue', key)

// 删除
function onDeleteClick() {
  const delFun = () =>
    materialService
      .deleteMaterialGroup(props.modelValue, { target: '' })
      .then(() => {
        Message.success('删除成功')
        refreshData()
      })

  Modal.info({
    title: '删除提醒',
    content: '若该组内还有素材，将移动到未分组下',
    onOk: delFun,
  })
}

const modal = useModal()
const onAddClick = () => openEdit()
const onEditClick = () => {
  const groupInfo = dataList.find((x) => x.id === props.modelValue)
  openEdit(groupInfo)
}
// modify group
function openEdit(record?: MaterialGroupResponse) {
  const title = record ? '修改分组名称' : '添加分组'
  modal
    .open({
      component: MaterialGroupEdit,
      width: 500,
      props: { id: record?.id, name: record?.name },
      title,
    })
    .then((data) => data && refreshData())
}
</script>
