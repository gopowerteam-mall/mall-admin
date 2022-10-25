<template lang="pug">
page-container(title='素材分组管理')
  a-spin(:loading='loadingStatus' class='!flex')
    a-table.p-4.flex-1(:data='dataList' :expandable='expandable' row-key='id')
      template(#columns)
        a-table-column(data-index='name' title='分组名称')
        a-table-column(data-index='count' title='素材数量')
        a-table-column(align='center')
          template(#title)
            a-button(status='success' type='outline' @click='openEdit()') 添加分组
          template(#cell='{ record }')
            a-button(type='text' @click='openEdit(record)') 修改
            a-popconfirm(content='是否删除该分组' @ok='onDelete(record.id)') 
              a-button(status='danger' type='text') 删除
</template>

<script setup lang="tsx">
import { useRequest } from 'virtual:request'
import { PageService } from '~/http/extends/page.service'
import { LoadingService } from '~/http/extends/loading.service'
import { useModal } from '@gopowerteam/vue-modal'
import MaterialGroupEdit from './components/material-group-edit.vue'
import MaterialGrid from './components/material-grid.vue'
import type { MaterialGroupResponse } from '@/http/models/MaterialGroupResponse'

// 列表
let dataList = $ref<MaterialGroupResponse[]>([])

const materialService = useRequest((service) => service.MaterialService)
const pageService = new PageService()
const loadingStatus = ref(false)
const loadingService = new LoadingService(loadingStatus)

onMounted(refreshData)

function refreshData() {
  materialService.findMaterialGroup([loadingService]).then((data) => {
    dataList = data
  })
}

// 删除
function onDelete(id: string) {
  materialService
    // TODO: 设置TARGET
    .deleteMaterialGroup(id, { target: '' }, [loadingService])
    .then(refreshData)
}

const modal = useModal()

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

const expandable: any = {
  title: '展开',
  width: 100,
  expandedRowRender: (record: MaterialGroupResponse) => {
    if (record.count > 0) {
      return h(MaterialGrid, { groupId: record.id! })
    }
  },
}
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
