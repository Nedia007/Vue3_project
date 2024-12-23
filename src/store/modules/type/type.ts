//定义小仓库数据地方
import type { RouteRecordRaw } from "vue-router";
interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
}
