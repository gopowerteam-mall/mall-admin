<template lang="pug">
.product-base
  a-form(:model='model' :rules='rules' @submit-success='save')
    a-form-item(label='标题' field='title')
      a-input(v-model='model.title' placeholder='请输入商品标题')
    a-form-item(label='副标题' field='subtitle')
      a-input(v-model='model.subtitle' placeholder='请输入副标题(详情页展示)')
    a-form-item(label='所属分类' field='categoryId')
      CategorySelect(v-model='model.categoryId' placeholder='请选择商品细分分类')
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
import ProductBasePhotos from './product-base-photos.vue'
import { useModal } from '@gopowerteam/vue-modal'
import { ProductService } from '@/http/services/ProductService'
import CategorySelect from '@/views/category/components/category-select.vue'
import type { ProductBaseType } from '../product.composable'

const props = defineProps<{ id?: string }>()

let detailInfo: any = null

const model = $ref<ProductBaseType>({
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

const service = new ProductService()
const modal = useModal()

onBeforeMount(() => {
  if (!props.id) return
  service.getProduct(props.id).then((data) => {
    detailInfo = data
    model.title = data.title
    model.subtitle = data.subtitle
    model.recommended = data.recommended
    model.keyword = data.keyword
    model.banners = data.banners
    model.cover = data.cover
    model.categoryId = data.category.id
  })
})

const onCancel = () => modal.close(false)

function save() {
  if (props.id) {
    service
      .updateProduct(props.id, Object.assign(detailInfo, model))
      .then(() => modal.close(true))
  } else {
    service
      .createProduct({
        ...model,
        attrs: [],
        specs: [],
        contents: [],
      })
      .then(() => modal.close(true))
  }
}
</script>
