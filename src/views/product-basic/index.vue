<template lang="pug">
page-container(:title='id ? "编辑商品" : "创建商品"')
  template(#actions)
    .space-x-10
      a-button(type='secondary' @click='() => router.back()') 取消
      a-button(type='primary' @click='() => (id ? onUpdate() : onCreate())') 提交
  a-form(
    v-if='a'
    ref='formRef'
    :model='formModel'
    :rules='formRules'
    :label-col-props='{ flex: "120px" }'
    :wrapper-col-props='{ flex: "500px" }')
    a-form-item(label='标题' field='title')
      a-input(v-model='formModel.title' placeholder='请输入商品标题')
    a-form-item(label='副标题' field='subtitle')
      a-input(v-model='formModel.subtitle' placeholder='请输入副标题(详情页展示)')
    a-form-item(label='所属分类' field='categoryId')
      a-tree-select(
        v-model='formModel.categoryId'
        :data='categories'
        :field-names='{ key: "id" }'
        allow-clear
        placeholder='请选择商品分类')
    a-form-item(label='关键字' field='keyword')
      a-input-tag(
        v-model='formModel.keyword'
        unique-value
        placeholder='请输入搜索关键字,多个关键字可使用回车键分割')
    a-form-item(label='是否推荐' field='recommended')
      a-switch(v-model='formModel.recommended' checked-text)
        template(#checked) 是
        template(#unchecked) 否
    a-form-item(
      label='列表封面图'
      field='cover'
      :wrapper-col-props='{ flex: "auto" }')
      media-gallery(v-model='formModel.cover' :limit='1')
    a-form-item(
      label='商品简介图'
      field='banners'
      :wrapper-col-props='{ flex: "auto" }')
      media-gallery(v-model='formModel.banners' multiple :limit='3')
    a-form-item(
      label='商品详情图'
      field='contents'
      :wrapper-col-props='{ flex: "auto" }')
      media-gallery(v-model='formModel.contents' multiple :limit='10')
</template>

<script lang="ts" setup>
import type { Category } from '@/http/models/Category'
import type { Product } from '@/http/models/Product'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { useRequest } from 'virtual:request'

const router = useRouter()
const route = useRoute()

const id = route.query.id as string
const productService = useRequest((service) => service.ProductService)
const categoryService = useRequest((service) => service.CategoryService)
let a = $ref(false)
const formRef = $ref<FormInstance>()
let formModel = $ref<
  Pick<
    Product,
    | 'title'
    | 'subtitle'
    | 'recommended'
    | 'keyword'
    | 'banners'
    | 'cover'
    | 'contents'
  > & { categoryId: string }
>({
  title: '',
  subtitle: '',
  recommended: false,
  keyword: [],
  banners: [],
  cover: '',
  categoryId: '',
  contents: [],
})

const formRules = {
  title: { required: true, message: '请输入商品标题' },
  subtitle: { required: true, message: '请输入商品副标题' },
  keyword: [
    { required: true, message: '请输入关键字' },
    { maxLength: 10, message: '关键字最多有10个' },
  ],

  cover: { required: true, message: '请配置商品列表封面图' },
  categoryId: { required: true, message: '请选择商品细分类目' },
  banners: [
    { required: true, message: '请配置商品缩略图' },
    { minLength: 1, message: '最少选择1个图片' },
  ],
  contents: [
    { required: true, message: '请选择商品详情图片' },
    { minLength: 1, message: '最少选择1个图片' },
    { maxLength: 10, message: '最多选择20个图片' },
  ],
}

let categories = $ref<Category[]>()

/**
 * 请求商品分类
 */
function requestCategorys() {
  categoryService.findCategory({ recursion: true }).then((data) => {
    categories = data
  })
}

/**
 * 请求商品详情
 */
function requestProduct() {
  if (!id) {
    return
  }

  productService.getProduct(id).then((data) => {
    formModel.title = data.title
    formModel.subtitle = data.subtitle
    formModel.recommended = data.recommended
    formModel.keyword = data.keyword
    formModel.banners = data.banners
    formModel.cover = data.cover
    formModel.contents = data.contents
    formModel.categoryId = data.category?.id ?? ''

    formModel = {
      title: data.title,
      subtitle: data.subtitle,
      recommended: data.recommended,
      keyword: data.keyword,
      banners: data.banners,
      cover: data.cover,
      contents: data.contents,
      categoryId: data.category?.id ?? '',
    }

    a = true
  })
}

function onCreate() {
  formRef?.validate((error) => {
    if (!error) {
      productService.createProduct(formModel).then(() => {
        Message.success('商品创建成功')
        router.push({ name: 'product-versions' })
      })
    }
  })
}

function onUpdate() {
  formRef?.validate((error) => {
    if (!error) {
      productService.updateProduct(id, formModel).then(() => {
        Message.success('商品更新成功')
        router.back()
      })
    }
  })
}

onMounted(() => {
  requestCategorys()
  requestProduct()
})
</script>

<route lang="yaml">
name: product-basic
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
</route>
