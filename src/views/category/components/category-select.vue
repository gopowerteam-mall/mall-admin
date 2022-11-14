<template lang="pug">
a-tree-select(
  v-model='selectValue'
  :data='categoryList'
  :field-names='{ key: "id" }'
  :selectable='treeSelectableSetting'
  allow-clear
  :placeholder='placeholder')
</template>

<script lang="ts" setup>
import type { Category } from '@/http/models/Category'
import { CategoryService } from '@/http/services/CategoryService'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  disabledKeys?: string[]
}>()

const emits = defineEmits(['update:modelValue'])

let categoryList = $ref<Category[]>([])

onBeforeMount(() =>
  new CategoryService()
    .findCategory({
      recursion: true,
    })
    .then((data) => (categoryList = data)),
)

const selectValue = $computed({
  get: () => props.modelValue,
  set: (val) => {
    const selectedItem = categoryList.find((x) => x.id === val)
    emits('update:modelValue', val, selectedItem?.title ?? '')
  },
})

const disabledKeys = $computed(() => props.disabledKeys || [])

// 可选择的节点
function treeSelectableSetting(node: { id: string; disabled?: boolean }) {
  if (disabledKeys.includes(node.id)) {
    node.disabled = true
    return false
  }
  return true
}
</script>
