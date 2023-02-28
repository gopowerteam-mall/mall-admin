<template lang="pug">
.step-item-container
  slot
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="less"></style>
