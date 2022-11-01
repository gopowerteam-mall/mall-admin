<template lang="pug">
a-form(:model='model')
  a-form-item(label='标题' field='title')
    a-input(v-model='model.title')
  a-form-item(label='副标题' field='subtitle')
    a-input(v-model='model.subtitle')
  a-form-item(label='关键字' field='subtitle')
    ProductKeywords(v-model='model.keyword')
  a-form-item(label='是否推荐' field='recommended')
    a-switch(v-model='model.recommended')
</template>

<script lang="ts" setup>
import ProductKeywords from './product-keywords.vue'

const model = $ref({
  title: '',
  subtitle: '',
  recommended: false,
  contents: [],
  keyword: ['test'],
})
</script>
