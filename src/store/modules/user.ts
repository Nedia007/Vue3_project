import { reqLogin } from "./../../api/user/index";
// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入接口
import request from "@/utils/request";
// 引入数据类型
import type { loginFrom, loginResponseData } from "@/api/user/type";
import type { UserState } from "./type/type";
//引入操作本地存储的方法
import { SET_TOKEN, GET_TOKEN } from "@/utils/token";
// 引入路由
import { constantRoute } from "@/router/routes";
// 创建用户小仓库
let useUserStore = defineStore("User", {
  // 创建存储数据的的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组
    };
  },
  // 异步逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginFrom) {
      //登录请求
      let result: loginResponseData = await reqLogin(data);
      //登录成功200 ->token
      //登录失败201
      if (result.code == 200) {
        // pinia仓库存储一下token
        // pina vue想存储是利用js对象
        this.token = result.data.token as string;
        //本地存储持久化 一份
        SET_TOKEN(result.data.token);
        // 保证当前async 返回一个成功的promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    // 封装一个函数获取时间
    // const getTime=()=>{

    // }
  },
  getters: {},
});
export default useUserStore;
