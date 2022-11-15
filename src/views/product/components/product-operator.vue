<template lang="pug">
a-dropdown.product-item-operator 
  a-button(type='outline') 操作
  template(#content)
    a-doption(@click='onPreviewClick') 预览页面
      template(#icon)
        icon-park-outline:preview-open
    a-doption(@click='onBaseClick') 编辑基本信息
      template(#icon)
        icon-park-outline:title-level
    a-doption(@click='onAttrClick') 编辑商品属性
      template(#icon)
        icon-park-outline:list-alphabet
    a-doption(@click='onSkuClick') 编辑商品特性
      template(#icon)
        icon-park-outline:color-filter
    a-doption(@click='onDetailClick') 编辑详情页
      template(#icon)
        icon-park-outline:view-grid-detail
</template>

<script lang="ts" setup>
import { useModal } from '@gopowerteam/vue-modal'
import ProductBase from './product-base.vue'
import ProductProperties from './product-properties.vue'

const props = defineProps<{
  id: string
}>()

const emits = defineEmits(['refresh', 'preview'])
const modal = useModal()

function onBaseClick() {
  modal
    .open({
      title: '修改产品基础信息',
      component: ProductBase,
      props: { id: props.id },
      width: 800,
    })
    .then((status) => {
      if (status) emits('refresh', props.id)
    })
}
function onAttrClick() {
  modal.open({
    title: '配置产品属性信息',
    component: ProductProperties,
    props: { id: props.id },
    width: 800,
  })
}
function onSkuClick() {}
function onDetailClick() {}

const onPreviewClick = () => emits('preview', props.id)
</script>
