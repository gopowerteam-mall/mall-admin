<template lang="pug">
.material-preview-item.flex-center.m-5px.opacity-90.bg-gray-50
  image-preview(width='150px' height='150px' :src='src')
  .action.flex.justify-end.space-x-2.p-2
    .remove(@click='emits("delete")')
      icon-park-outline:delete.text-xs
</template>

<script setup lang="ts">
defineProps<{
  src: string
}>()

const emits = defineEmits(['delete'])
</script>

<style lang="less" scoped>
.material-preview-item {
  position: relative;
  width: 150px;
  height: 150px;
  font-size: 0;

  .action {
    position: absolute;
    top: 0;
    right: 0;
    display: none;

    & > * {
      cursor: pointer;
    }
  }

  &:hover {
    background: none;
    border: solid 1px #fefefe;
    opacity: 1;
    transition: 0.5s;

    .action {
      display: block;
    }
  }
}
</style>
