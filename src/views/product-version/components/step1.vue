<template lang="pug">
.a step1
</template>

<script setup lang="ts">
import { useStep } from '@/shared/hooks/use-step'

const { onNextStep } = useStep()

onNextStep((resolve, reject) => {
  resolve({ a: 1 })
})
</script>
