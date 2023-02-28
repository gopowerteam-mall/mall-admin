<template lang="pug">
.product-attr-success
  a-result(status='success' title='产品特性配置完成')
    template(#icon)
      icon-park-outline:success.text-3xl
    template(#extra)
      a-button(type='primary' @click='$emit("rest")') 查看历史版本
</template>

<script lang="ts" setup>
defineEmits(['rest'])
</script>
