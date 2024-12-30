<template>
  <el-button icon="Refresh" circle @click="updateRefresh" />
  <el-button icon="FullScreen" circle @click="fullScreen" />
  <el-button icon="Setting" circle />
  <img
    src="../../../../public/logo.png"
    alt=""
    style="width: 24px; height: 24px; margin: 0 10px"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//获取骨架的小仓库
import useLayOutSettingStore from "@/store/modules/setting";
let LayOutSettingStore = useLayOutSettingStore();
const updateRefresh = () => {
  LayOutSettingStore.refresh = !LayOutSettingStore.refresh;
};
// 全屏按钮点击
const fullScreen = () => {
  // DOM对象的一个属性：可以用来判断当前是不是全屏模式
  let full = document.fullscreenElement;
  if (!full) {
    // 实现全屏
    document.documentElement.requestFullscreen();
  } else {
    // 变为不是全屏，退出全屏
    document.exitFullscreen();
  }
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>
<style scoped></style>
