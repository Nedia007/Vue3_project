<template>
  <div>
    <svg :style="{ width, height }">
      <!-- svg 是外部容器 -->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>
<script setup lang="ts">
//接收父组件传来的参数
defineProps({
  prefix: {
    type: String,
    default: "#icon-",
  },
  name: String,
  color: {
    type: String,
    default: "red",
  },
  // 接收父组件传递过来的图标参数
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>
<style scoped></style>
