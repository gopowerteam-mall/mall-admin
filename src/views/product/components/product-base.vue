<template lang="pug">
a-form(:model='model')
  a-form-item(label='标题' field='title')
    a-input(v-model='model.title' placeholder='请输入商品标题')
  a-form-item(label='副标题' field='subtitle')
    a-input(v-model='model.subtitle' placeholder='请输入副标题(详情页展示)')
  a-form-item(label='所属分类' field='categoryId')
    a-tree-select(
      v-model='model.categoryId'
      :data='categoryList'
      :field-names='{ key: "id" }'
      :selectable='treeSelectableSetting'
      allow-clear
      placeholder='请选择商品细分分类')
  a-form-item(label='关键字' field='subtitle')
    ProductKeywords(v-model='model.keyword')
  a-form-item(label='是否推荐' field='recommended')
    a-switch(v-model='model.recommended')
      template(#checked)
        span 是
      template(#unchecked)
        span 否
  a-form-item(label='商品Banner图' field='banners')
  a-form-item(label='商品列表封面图' field='cover')
</template>

<script lang="ts" setup>
import ProductKeywords from './product-keywords.vue'
import type { Category } from '@/http/models/Category'
import { CategoryService } from '@/http/services/CategoryService'

const model = $ref({
  title: '',
  subtitle: '',
  recommended: false,
  keyword: [],
  banners: [],
  cover: '',
  categoryId: '',
})

// 商品分类
let categoryList = $ref<Category[]>([])

onMounted(() => {
  new CategoryService()
    .findCategory({
      recursion: true,
    })
    .then((data) => (categoryList = data))
})

function treeSelectableSetting(node: { id: string }) {
  return node.id !== model.categoryId
}
</script>
