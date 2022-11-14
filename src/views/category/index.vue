<template lang="pug">
page-container(title='分类管理')
  a-spin(:loading='loadingStatus' class='!flex')
    a-table.p-4.flex-1(:data='dataList')
      template(#columns)
        a-table-column(data-index='title' title='名称')
        a-table-column(data-index='image' title='图片')
          template(#cell='{ record }')
            image-preview(
              v-if='record.image'
              :src='record.image'
              width='80px'
              height='40px'
              :scene='DisplayScene.List')
        a-table-column(title='推荐分类')
          template(#cell='{ record }')
            div {{ isRecommend(record['recommended']) }}
        a-table-column(align='center' data-index='createdAt' title='创建时间')
          template(#cell='{ record }')
            div {{ dateTimeFormat(record['createdAt']) }}
        a-table-column(align='center' data-index='updatedAt' title='更新时间')
          template(#cell='{ record }')
            div {{ dateTimeFormat(record['updatedAt']) }}
        a-table-column(align='right')
          template(#title)
            a-button(status='success' type='outline' @click='onEditClick()') 创建分类
          template(#cell='{ record }')
            a-popconfirm(content='是否删除该分类以及子分类' @ok='onDelete(record.id)')
              a-button(
                v-if='record.children.length === 0'
                status='danger'
                type='text') 删除
            a-button(type='text' @click='onEditClick(undefined, record.id)') 添加子分类
            a-button(type='text' @click='onEditClick(record.id)') 修改
</template>

<script setup lang="ts">
import { useRequest } from 'virtual:request'
import { LoadingService } from '~/http/extends/loading.service'
import { dateTimeFormat, yesNoFormat } from '~/shared/common'
import CategoryEdit from './components/category-edit.vue'
import { useModal } from '@gopowerteam/vue-modal'
import { DisplayScene } from '~/config/enum.config'
import { CategoryService } from '@/http/services/CategoryService'
import type { Category } from '@/http/models/Category'

// 是否推荐分类
const isRecommend = yesNoFormat('推荐', '')

const categoryService = useRequest((service) => service.CategoryService)
const loadingStatus = ref(false)
const loadingService = new LoadingService(loadingStatus)
const categroyService = new CategoryService()
const dataList = ref<Category[]>([])
function refreshData() {
  categroyService
    .findCategory({
      recursion: true,
    })
    .then((data) => (dataList.value = data))
}

onMounted(refreshData)

// 删除
function onDelete(id: string) {
  categoryService.deleteCategory(id, [loadingService]).then(refreshData)
}

const modal = useModal()

/**
 * 打开编辑页面
 * @params id 内容ID
 * @params parentId 设定的父ID
 */
function onEditClick(id?: string, parentId?: string) {
  const title = id ? '修改分类' : '添加分类'
  modal
    .open({
      component: CategoryEdit,
      width: 500,
      props: { id, parentId },
      title,
    })
    .then((data) => data && refreshData())
}
</script>

<route lang="yaml">
name: category
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
  menu:
    key: mall-setting.category
    icon: xxx
    title: 分类管理
</route>
