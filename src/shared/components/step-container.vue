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
let stepIndex = $ref(1)

const instance = getCurrentInstance()

let dataSource = $ref<any>({})

let steps = $ref<
  {
    title: string
    description: string
    component: Component
  }[]
>([])

/**
 * 返回StepCOntent
 */
const StepContent = () => {
  if (steps.length) {
    return steps[stepIndex - 1]?.component
  } else {
    return <div></div>
  }
}

/**
 * 初始化StepContainer
 */
function initSteps() {
  const slot = instance?.slots.default
  const nodes = (slot && slot()) || []

  steps = nodes.map((node, index) => {
    node.key = index

    return {
      title: node.props?.['title'],
      description: node.props?.['description'],
      component: node,
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
