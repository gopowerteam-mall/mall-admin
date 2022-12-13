<template lang="pug">
.product-attr-success
  a-result(status='success' title='配置商品属性版本完成')
    template(#extra)
      a-button(type='primary' @click='$emit("rest")') 查看历史版本
</template>

<script lang="ts" setup>
defineEmits(['rest'])
</script>
