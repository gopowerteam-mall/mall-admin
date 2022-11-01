<template lang="pug">
a-space(wrap)
  a-tag(
    v-for='tag of modelValue'
    :key='tag'
    :closable='!disabledKeys.includes(tag)')
  //- add new controller
  a-input(
    v-if='showInput'
    ref='inputRef'
    v-model.trim='tmpStr'
    placeholder='请输入关键字..'
    size='small'
    @keyup.enter='onInputed'
    @blur='onCancel')
    template(#suffix)
      icon-park-outline:check-small
  a-tag(v-else @click='onAddClick')
    template(#icon)
      icon-park-outline:add
    template(#default)
      div 添加关键字
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string[]
  disabledKeys?: string[]
}>()

const emits = defineEmits(['update:modelValue'])
const inputRef = $ref<{ focus: Function }>()

const disabledKeys = $computed(() => props.disabledKeys || [])

let showInput = $ref(false)
let tmpStr = $ref('')

// 更新vmodel
function onInputed() {
  emits('update:modelValue', [...props.modelValue, tmpStr])
  onCancel()
}

function onCancel() {
  showInput = false
  tmpStr = ''
}

function onAddClick() {
  showInput = true
  nextTick(() => inputRef.focus())
}
</script>
