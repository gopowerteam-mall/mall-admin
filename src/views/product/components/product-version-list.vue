<template lang="pug">
a-drawer.product-version-list(
  :width='500'
  :visible='modelValue'
  :closable='false') 
  template(#title) 
    .flex 
      .font-bold 产品历史版本
      a-button 添加新产品
  .text-base 123455
</template>

<script lang="ts" setup>
const props = defineProps<{ modelValue: boolean }>()
const emits = defineEmits(['update:modelValue'])
</script>
