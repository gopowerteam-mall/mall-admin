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
        a-table-column(data-index='image' title='图片')
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
            a-button(
              status='success'
              type='outline'
              @click='dialog.add = true') 添加Banner
          template(#cell='{ record }')
            a-popconfirm(content='是否删除该Banner' @ok='onDelete(record.id)')
              a-button(status='danger' type='text') 删除
  //- 编辑模态框
  //- a-modal(
  //-   v-model:visible='dialog.modify'
  //-   title='管理员姓名'
  //-   @before-ok='onDialogBeforOk')
  //-   a-input(v-model.trim='modifyData.name' placeholder='请输入管理员姓名')
  //- //- 新增模态框
  a-modal(v-model:visible='dialog.add' :footer='false' title='添加Banner') 
    AddBanner(@close='dialog.add = false' @success='refreshData')
</template>

<script setup lang="ts">
import { RequestParams } from '@gopowerteam/http-request'
import { useRequest } from 'virtual:http-request'
import { Banner } from '~/http/model'
import { PageService } from '~/http/extends/page.service'
// import { Message } from '@arco-design/web-vue'
import { LoadingService } from '~/http/extends/loading.service'
import { dateTimeFormat } from '~/utils/format.hooks'
import { BannerTypeDict } from '~/config/dict.config'
import AddBanner from './components/add-banner.vue'

// 列表
let dataList = $ref<Banner[]>([])

const adminService = useRequest((service) => service.BannerService)
const pageService = new PageService()
const loadingStatus = ref(false)
const loadingService = new LoadingService(loadingStatus)

onMounted(refreshData)

function bannerTypeFormat(type: string) {
  return BannerTypeDict.get(type) || '--'
}

function refreshData() {
  adminService
    .findBanner(
      new RequestParams({
        page: pageService,
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
  adminService
    .removeBanner(
      new RequestParams({
        append: { id },
        loading: loadingService,
      }),
    )
    .subscribe(refreshData)
}

const dialog = $ref({
  modify: false,
  add: false,
})

// 点击修改
// function onUpdate(data: Administrator) {
//   modifyData.id = data.id
//   modifyData.name = data.realname
//   dialog.modify = true
// }

// 修改模态框点击保存时
// function onDialogBeforOk(done: Function) {
//   if (!modifyData.name) {
//     Message.error('请输入管理员姓名')
//     return done(false)
//   }
//   adminService
//     .updateAdministrator(
//       new RequestParams({
//         data: {
//           realname: modifyData.name,
//         },
//         append: { id: modifyData.id },
//         loading: loadingService,
//       }),
//     )
//     .subscribe({
//       next: () => {
//         done()
//         Message.success('修改成功')
//         refreshData()
//       },
//       error: () => done(false),
//     })
// }

function onPageChange(index: number) {
  pageService.update(index, pageService.pageSize).then(refreshData)
}
function onPageSizeChange(size: number) {
  pageService.update(pageService.default.pageIndex, size).then(refreshData)
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
    key: root1.banner
    icon: xxx
    title: Banner管理
</route>
