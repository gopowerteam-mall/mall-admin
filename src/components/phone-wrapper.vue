<template lang="pug">
.phone
  slot
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.phone {
  width: 400px;
  height: 800px;
  border: 20px solid #000;
  border-radius: 60px;
  background-color: #fff;
  overflow: auto;
}
</style>
