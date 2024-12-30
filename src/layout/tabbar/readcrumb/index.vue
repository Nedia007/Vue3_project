<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="margin: 0 2px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import useLayOutSettingStore from "@/store/modules/setting";
// 获取layout配置相关的仓库
let LayOutSettingStore = useLayOutSettingStore();
// 定义一个响应式数据控制图标的切换
let fold = ref(false);
//  点击图标的方法
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold;
};
let $route = useRoute();

const handler = () => {
  console.info($route.matched);
};
</script>

<style scoped></style>
