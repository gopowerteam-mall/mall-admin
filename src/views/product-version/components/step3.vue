<template lang="pug">
.a step3
</template>

<script setup lang="ts">
import { useStep } from '@/shared/hooks/use-step'

const { onNextStep, dataSource } = useStep()

onNextStep((resolve, reject) => {
  resolve({ a: 3 })
})
</script>
