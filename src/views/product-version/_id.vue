<template lang="pug">
page-container(title='创建商品属性')
  step-container(@submit='onSubmit')
    step-item(title='1' step-key='product1')
      step1
    step-item(title='2' step-key='product2')
      step2
    step-item(title='3' step-key='product3')
      step3
</template>

<script lang="ts" setup>
import Step1 from './components/step1.vue'
import Step2 from './components/step2.vue'
import Step3 from './components/step3.vue'

const route = useRoute()
const id = route.params.id as string

function onSubmit(data: any) {
  console.log(data)
}
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
