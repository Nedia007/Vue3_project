// 关于layout组件相关配置仓库
import { defineStore } from "pinia";

let useLayOutSettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false, //用户已控制菜单折叠还是收起
    };
  },
});

export default useLayOutSettingStore;
