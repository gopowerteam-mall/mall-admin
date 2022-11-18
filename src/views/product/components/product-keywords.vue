<template lang="pug">
a-space(wrap)
  a-tag(
    v-for='tag of modelValue'
    :key='tag'
    :closable='!disabledKeys.includes(tag)'
    @close='onRemove') {{ tag }}
  //- add new controller
  a-input(
    v-if='showInput'
    ref='inputRef'
    v-model.trim='tmpStr'
    placeholder='请输入关键字..'
    size='mini'
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
import { Message } from '@arco-design/web-vue'

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
  if (props.modelValue.includes(tmpStr)) {
    Message.error('已存在相同的关键字')
    return
  }
  emits('update:modelValue', [...props.modelValue, tmpStr])
  onCancel()
}

// 获取删除的tag，并更新vmodel
function onRemove(e: PointerEvent) {
  let el: HTMLElement | null = e.target as HTMLElement
  do {
    if (el.classList.contains('arco-tag')) {
      const delKey = el.innerText
      const newValues = props.modelValue
        .filter((x) => x !== delKey)
        .map((x) => x)
      emits('update:modelValue', newValues)
      break
    } else {
      el = el.parentElement
    }
  } while (el != null)
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
