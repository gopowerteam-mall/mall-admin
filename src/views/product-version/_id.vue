<template lang="pug">
page-container(title='创建商品属性')
  step-container(@submit='onSubmit')
    step-item(title='1' step-key='product1') 
      .a 890890890890
      a-input
    step-item(title='2' step-key='product2')
      .b 2354
    step-item(title='3' step-key='product3')
      .c 455
</template>

<script lang="ts" setup>
const route = useRoute()
const id = route.params.id as string

function onSubmit() {}
</script>

<route lang="yaml">
name: product-version
meta:
  layout: workspace
  auth:
    required: true
    roles:
      - ADMIN
</route>
