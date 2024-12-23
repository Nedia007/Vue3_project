import SvgIcon from "@/components/SvgIcon/index.vue";
import Pagination from "@/components/Pagination/index.vue";
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
console.info(ElementPlusIconsVue);
// 全局对象
const allGloablComponent: any = { SvgIcon, Pagination };

//对外暴露插件对象
export default {
  // 注册项目的全部全局组件
  install(app: any) {
    Object.keys(allGloablComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGloablComponent[key]);
    });
    // 将element-plus 提供的图表作为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
