<template lang="pug">
page-container(title='Banner管理')
  a-spin(:loading='loadingStatus' class='!flex')
    a-table.p-4.flex-1(
      :data='dataList'
      :pagination='pageService'
      @page-change='onPageChange'
      @page-size-change='onPageSizeChange')
      template(#columns)
        a-table-column(data-index='title' title='名称')
        a-table-column(title='排序')
          template(#cell='{ rowIndex }')
            BannerSortIcon(
              :row-index='rowIndex'
              :total='dataList.length'
              @change='(type) => onOrderChange(type, rowIndex)')
        a-table-column(data-index='image' title='图片')
          template(#cell='{ record }')
            image-preview(
              :src='record.image'
              width='80px'
              height='40px'
              :scene='DisplayScene.List')
        a-table-column(title='类型')
          template(#cell='{ record }')
            div {{ bannerTypeFormat(record['type']) }}
        a-table-column(data-index='target' title='参数')
        a-table-column(align='center' data-index='createdAt' title='创建时间')
          template(#cell='{ record }')
            div {{ dateTimeFormat(record['createdAt']) }}
        a-table-column(align='center' data-index='updatedAt' title='更新时间')
          template(#cell='{ record }')
            div {{ dateTimeFormat(record['updatedAt']) }}
        a-table-column(align='center')
          template(#title)
            a-button(status='success' type='outline' @click='openEdit()') 添加Banner
          template(#cell='{ record }')
            a-button(type='text' @click='openEdit(record.id)') 修改
            a-popconfirm(content='是否删除该Banner' @ok='onDelete(record.id)')
              a-button(status='danger' type='text') 删除
</template>

<script setup lang="ts">
import { useRequest } from 'virtual:request'
import { PageService } from '~/http/extends/page.service'
import { LoadingService } from '~/http/extends/loading.service'
import { dateTimeFormat } from '~/shared/common'
import { BannerTypeDict } from '~/config/dict.config'
import BannerEdit from './components/banner-edit.vue'
import { useModal } from '@gopowerteam/vue-modal'
import { DisplayScene } from '~/config/enum.config'
import BannerSortIcon from './components/banner-sort-icon.vue'
import type { Banner } from '@/http/models/Banner'

// 列表
let dataList = $ref<Banner[]>([])

const bannerService = useRequest((service) => service.BannerService)
const pageService = new PageService()
const loadingStatus = ref(false)
const loadingService = new LoadingService(loadingStatus)

onMounted(refreshData)

function bannerTypeFormat(type: string) {
  return BannerTypeDict.get(type) || '--'
}

function refreshData() {
  bannerService.findBanner({}, [loadingService]).then((data) => {
    dataList = data
  })
}

// 删除
function onDelete(id: string) {
  bannerService.deleteBanner(id, [loadingService]).then(refreshData)
}

const modal = useModal()

function openEdit(id?: string) {
  const title = id ? '修改Banner' : '添加Banner图片'
  modal
    .open({
      component: BannerEdit,
      width: 500,
      props: { id },
      title,
    })
    .then((data) => data && refreshData())
}

function onPageChange(index: number) {
  pageService.update(index, pageService.pageSize).then(refreshData)
}
function onPageSizeChange(size: number) {
  pageService.update(pageService.default.pageIndex, size).then(refreshData)
}

// 更改顺序
function onOrderChange(type: 'down' | 'up', index: number) {
  let targetRow: Banner
  const sourceId = dataList[index].id
  if (type === 'down') {
    targetRow = dataList[index + 1]
  } else {
    targetRow = dataList[index - 1]
  }

  const target = targetRow.id
  bannerService
    .changeBannerOrder(sourceId, {
      target,
    })
    .then(refreshData)
}
</script>

<route lang="yaml">
name: banner
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
  menu:
    key: mall-setting.banner
    icon: xxx
    title: Banner管理
</route>
