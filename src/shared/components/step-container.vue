<template lang="pug">
.step-container.space-y-4
  .step-header
    a-steps(:current='stepIndex')
      a-step(
        v-for='(step, index) in steps'
        :key='index'
        :title='step.title'
        :description='step.description')
  .step-content
    StepContent
  .step-actions.space-x-4.text-center
    a-button(type='primary' @click='onPrevStep' v-if='stepIndex > 1') 上一步
    a-button(
      type='primary'
      @click='onNextStep'
      v-if='stepIndex < steps.length') 下一步
    a-button(type='primary' v-if='stepIndex === steps.length') 提交
</template>

<script setup lang="tsx">
import type { FunctionalComponent } from 'vue'

let stepIndex = $ref(1)

const instance = getCurrentInstance()
let current: any

let dataSource = $ref<any>({})

let steps = $ref<
  {
    key: string
    title: string
    description: string
    component: VNode
  }[]
>([])

/**
 * 返回StepCOntent
 */
const StepContent = () => {
  if (steps.length) {
    return steps[stepIndex - 1]?.component
  }
}

/**
 * 初始化StepContainer
 */
function initSteps() {
  const slot = instance?.slots.default
  const nodes = (slot && slot()) || []

  steps = nodes.map((node, index) => {
    const key = (node.props?.['stepKey'] || node.props?.['step-key']) as string
    const vnode = h(node, { key })

    return {
      key,
      title: node.props?.['title'] as string,
      description: node.props?.['description'] as string,
      component: vnode,
    }
  })
}

function onPrevStep() {
  stepIndex -= 1
}

function onNextStep() {
  stepIndex += 1
}

onMounted(() => {
  initSteps()
})
</script>

<style scoped lang="less"></style>
