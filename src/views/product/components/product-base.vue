<template lang="pug">
.product-base
  a-form(:model='model' :rules='rules' @submit-success='save')
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
    a-form-item(label='关键字' field='keyword')
      ProductKeywords(v-model='model.keyword')
    a-form-item(label='是否推荐' field='recommended')
      a-switch(v-model='model.recommended')
        template(#checked)
          span 是
        template(#unchecked)
          span 否
    a-form-item(label='商品Banner图' field='banners')
      ProductBasePhotos(v-model='model.banners' :limit='5')
    a-form-item(label='商品列表封面图' field='cover')
      ProductBasePhotos(v-model='model.cover')
    a-form-item(content-class='!justify-end p-r-4')
      a-button(type='secondary' @click='onCancel') 取消
      a-button.m-l-2(type='primary' html-type='submit') 确定
</template>

<script lang="ts" setup>
import ProductKeywords from './product-keywords.vue'
import type { Category } from '@/http/models/Category'
import { CategoryService } from '@/http/services/CategoryService'
import ProductBasePhotos from './product-base-photos.vue'
import { useModal } from '@gopowerteam/vue-modal'
import { ProductService } from '@/http/services/ProductService'

const model = $ref({
  title: '',
  subtitle: '',
  recommended: false,
  keyword: [],
  banners: [],
  cover: '',
  categoryId: '',
})

const rules = {
  title: { required: true, message: '请输入商品标题' },
  subtitle: { required: true, message: '请输入商品副标题' },
  keyword: [
    { required: true, message: '请输入关键字' },
    { maxLength: 10, message: '关键字最多有10个' },
  ],
  banners: { required: true, message: '请配置商品缩略图' },
  cover: { required: true, message: '请配置商品列表封面图' },
  categoryId: { required: true, message: '请选择商品细分类目' },
}

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

const modal = useModal()

const onCancel = () => modal.close(false)

function save() {
  new ProductService()
    .createProduct({
      ...model,
      attrs: [],
      specs: [],
      contents: [],
    })
    .then(() => modal.close(true))
}
</script>
