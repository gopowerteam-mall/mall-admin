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
    a-doption(@click='onSettingClick') 产品特性配置
      template(#icon)
        icon-park-outline:color-filter
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: string
}>()

const emits = defineEmits(['refresh', 'preview'])

const onBaseClick = () =>
  router.push({ name: 'product-base', query: { id: props.id } })

const router = useRouter()
const onSettingClick = () =>
  router.push({ name: 'product-attr', query: { id: props.id } })

const onPreviewClick = () => emits('preview', props.id)
</script>
