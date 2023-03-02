<template lang="pug">
.a step2
</template>

<script setup lang="ts">
import { useStep } from '@/shared/hooks/use-step'

const { onNextStep } = useStep()

onNextStep((resolve, reject) => {
  resolve({ a: 2 })
})
</script>
