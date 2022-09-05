<template lang="pug">
.flex
  .w-6
    span(v-if='rowIndex != 0' title='上移')
      icon-park:sort-amount-down.rotate-180.cursor-pointer(
        @click='$emit("change", "up")')
  .w-6
    span(v-if='rowIndex != total - 1' title='下移')
      icon-park:sort-amount-down.cursor-pointer(
        @click='$emit("change", "down")')
</template>

<script lang="ts" setup>
type propTypes = {
  rowIndex: number
  total: number
}

defineProps<propTypes>()

defineEmits(['change'])
</script>
