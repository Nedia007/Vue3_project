// 进行axios二次封装：使用请求与响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
// 引入用户相关的仓库
import useUserStore from "@/store/modules/user";
// 第一步：利用axios对象的create方法去创建axios实例（其他配置：基础路径，超时的时间）
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});
// 第二步：requests实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // 获取用户仓库，获取仓库内部token，登录成功后携带给服务器
  let userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  // config配置对象，headers属性请求头，经常给服务器携带公共参数
  return config;
});
// 第三步:响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //处理网络错误
    let msg = "";
    let status = error.response.status;
    switch (status) {
      case 401:
        msg = "token过期";
        break;
      case 403:
        msg = "无权访问";
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "服务器出现问题";
        break;
      default:
        msg = "无网络";
    }
    ElMessage({
      type: "error",
      message: msg,
    });
    return Promise.reject(error);
  },
);
// 对外暴露
export default request;
