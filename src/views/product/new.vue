<template lang="pug">
page-container(title='创建新产品')
  a-form.min-w-1200px.p-x-10(
    ref='formRef'
    :model='model'
    :rules='rules'
    @submit-success='onSave')
    .flex
      a-form-item(class='w-500px!' label='标题' field='title')
        a-input(v-model='model.title' placeholder='请输入商品标题')
      a-form-item.flex-1(
        label='副标题'
        field='subtitle'
        :label-col-style='{ "flex-basis": "120px" }'
        :wrapper-col-style='{ flex: 1 }')
        a-input(v-model='model.subtitle' placeholder='请输入副标题(详情页展示)')
    .flex
      a-form-item(class='w-500px!' label='所属分类' field='categoryId')
        CategorySelect(v-model='model.categoryId' placeholder='请选择商品细分分类')
      a-form-item.flex-1(
        label='关键字'
        field='keyword'
        :label-col-style='{ "flex-basis": "120px" }'
        :wrapper-col-style='{ flex: 1 }')
        a-input-tag(
          v-model='model.keyword'
          unique-value
          placeholder='请输入搜索关键字,多个关键字可使用回车键分割')
      a-form-item(
        class='w-300px!'
        label='是否推荐'
        field='recommended'
        :label-col-props='{ span: 12, offset: 0 }'
        :wrapper-col-props='{ span: 12, offset: 0 }')
        a-switch(v-model='model.recommended')
          template(#checked)
            span 是
          template(#unchecked)
            span 否
    .flex
      a-form-item(class='w-500px!' label='列表封面图' field='cover')
        ProductBasePhotos(v-model='model.cover')
      a-form-item.flex-1(
        label='商品简介图'
        field='banners'
        :label-col-style='{ "flex-basis": "120px" }'
        :wrapper-col-style='{ flex: 1 }')
        ProductBasePhotos(v-model='model.banners' :limit='5')
    a-form-item(
      label='商品详情图'
      :label-col-style='{ "flex-basis": "100px", "font-weight": "bold" }'
      :wrapper-col-style='{ flex: 1 }'
      field='contents')
      ProductDetailPhotos(ref='photosRef' v-model='model.contents' :limit='5')
    a-form-item.m-t-30px(content-class='p-l-520px')
      a-button(@click='onReset') 重置
      a-button.m-l-4(:loading='saving' html-type='submit' type='primary') 提交
</template>

<script lang="ts" setup>
import type { ProductBaseType } from './product.composable'
import ProductBasePhotos from './components/product-base-photos.vue'
import CategorySelect from '@/views/category/components/category-select.vue'
import ProductDetailPhotos, {
  type ExposeType as PhotosRefType,
} from './components/product-detail-photos.vue'
import { LoadingService } from '@/http/extends/loading.service'
import { Message, Modal } from '@arco-design/web-vue'
import { ProductService } from '@/http/services/ProductService'
import { MaterialService } from '@/http/services/MaterialService'

const model = $ref<ProductBaseType>({
  title: '',
  subtitle: '',
  recommended: false,
  keyword: [],
  banners: [],
  cover: '',
  categoryId: '',
  contents: [],
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
  contents: [
    { required: true, message: '请选择商品详情图片' },
    { minLength: 1, message: '最少选择1个图片详情' },
    { maxLength: 20, message: '最多选择20个图片详情' },
  ],
}

const photosRef = $ref<PhotosRefType>()
const formRef = $ref<any>()
const saving = ref(false)
const loadingService = new LoadingService(saving)

function onReset() {
  photosRef.reset()
  // 重置表单
  formRef.resetFields()
}

function onSave() {
  const tasks = photosRef.getTasks()
  if (tasks.length) {
    // 检测图片上传状态
    if (tasks.some((x) => !x.completed)) {
      Message.error('图片还在上传中,请稍后')
      return
    }
    // 上传图片之后再创建产品数据
    new MaterialService()
      .createMaterial(
        {
          keys: tasks.map((x) => x.key),
        },
        [loadingService],
      )
      .then(createNewData)
  } else {
    createNewData()
  }
}

const router = useRouter()
async function createNewData() {
  function toListPage() {
    setTimeout(() => {
      router.push('/product').then(onReset)
    }, 1000)
  }

  function toAttrEdit(vId: string) {
    setTimeout(() => {
      router
        .push({ name: 'product-setting', params: { id: vId } })
        .then(onReset)
    }, 100)
  }

  const service = new ProductService()
  try {
    const product = await service.createProduct(model, [loadingService])
    await service.createProductVersion(product.id)
    Message.success('添加成功，请移步列表操作')
    Modal.confirm({
      content: '是否继续编辑属性?',
      onOk: () => toAttrEdit(product.id),
      onCancel: toListPage,
    })
  } catch (error: any) {
    Message.error(error)
  }
}
</script>

<route lang="yaml">
name: product-create
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
</route>
