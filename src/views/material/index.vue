<template lang="pug">
page-container(title='素材分组管理')
  a-spin(:loading='loadingStatus' class='!flex')
    a-table.p-4.flex-1(:data='dataList' :expandable='expandable' row-key='id')
      template(#columns)
        a-table-column(data-index='name' title='分组名称')
        a-table-column(data-index='count' title='素材数量')
        a-table-column
          template(#title)
            a-button(status='success' type='outline' @click='openEdit()') 添加分组
          template(#cell='{ record }')
            a-button(type='text' @click='openEdit(record)') 修改
            a-popconfirm(content='是否删除该分组' @ok='onDelete(record.id)') 
              a-button(v-if='record.count > 0' status='danger' type='text') 删除
</template>

<script setup lang="ts">
import { RequestParams } from '@gopowerteam/http-request'
import { useRequest } from 'virtual:http-request'
import type { MaterialGroupResponse } from '~/http/model'
import { LoadingService } from '~/http/extends/loading.service'
import { useModal } from '@gopowerteam/vue-modal'
import MaterialGroupEdit from './components/material-group-edit.vue'
import MaterialGrid from './components/material-grid.vue'

// 列表
let dataList = $ref<MaterialGroupResponse[]>([])

const materialService = useRequest((service) => service.MaterialService)
const loadingStatus = ref(false)
const loadingService = new LoadingService(loadingStatus)

onMounted(refreshData)

function refreshData() {
  materialService
    .findMaterialGroup(
      new RequestParams({
        loading: loadingService,
      }),
    )
    .subscribe({
      next: (data) => {
        dataList = data
      },
    })
}

// 删除
function onDelete(id: string) {
  materialService
    .deleteMaterialGroup(
      new RequestParams({
        append: { id },
        loading: loadingService,
      }),
    )
    .subscribe(refreshData)
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

const expandable = $ref({
  title: '展开',
  width: 100,
  expandedRowRender: (record: MaterialGroupResponse) =>
    h(MaterialGrid, {
      groupId: record.id,
    }),
})
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
    key: root1.material
    icon: xxx
    title: 素材管理
</route>
