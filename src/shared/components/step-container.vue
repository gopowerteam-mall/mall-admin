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
    a-button(v-if='stepIndex > 1' type='primary' @click='onPrevStep') 上一步
    a-button(
      v-if='stepIndex < steps.length'
      type='primary'
      @click='onNextStep') 下一步
    a-button(
      v-if='stepIndex === steps.length'
      type='primary'
      @click='onNextStep') 提交
</template>

<script setup lang="tsx">
import { providers } from '@/config/provider.config'
import { Message } from '@arco-design/web-vue'

let stepIndex = $ref(1)

const instance = getCurrentInstance()
const dataSource = new Map<string, any>()

const emits = defineEmits({
  submit: (data: Record<string, any>) => data,
})

let currentStepValidator =
  $ref<
    (
      resolve: (
        value: boolean | void | Record<string, any> | undefined,
      ) => void,
      reject: (reason?: string | undefined) => void,
    ) => void
  >()

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

  steps = nodes.map((node) => {
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

async function onNextStep() {
  if (!currentStepValidator) {
    return
  }

  new Promise(currentStepValidator)
    .then((data) => {
      if (data && typeof data === 'object') {
        dataSource.set(steps[stepIndex - 1].key, data)
      }

      if (stepIndex < steps.length) {
        currentStepValidator = undefined
        stepIndex += 1
      } else {
        emits('submit', Object.fromEntries(dataSource))
      }
    })
    .catch((message) => {
      Message.error(message)
    })
}

provide(providers.step, {
  dataSource,
  onNextStep: (validate) => (currentStepValidator = validate),
})

onMounted(() => {
  initSteps()
})
</script>

<style scoped lang="less"></style>
