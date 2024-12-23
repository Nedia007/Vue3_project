<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"> </el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          ref="loginForms"
          :rules="rules"
        >
          <h1>Hello</h1>
          <h2>欢迎欢迎</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              size="default"
              class="login_btn"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
//引入获取当前时间的函数
import { getTime } from "@/utils/time";
// 引入用户相关的仓库
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

let useStore = useUserStore();
let $router = useRouter();
//获取el-form组件
let loginForms = ref();
//收集账号与密码的数据
let loginForm = reactive({ username: "admin", password: "atguigu123" });
let loading = ref(false);

// 登录按钮回调
const login = async () => {
  // 保证全部表单校验通过再发请求
  await loginForms.value.validate();
  loading.value = true;
  // 1.发登录请求
  // 请求成功->首页展示数据的地方
  // 请求失败->弹出登录失败信息
  // let result = useStore.userLogin(loginForm);
  try {
    await useStore.userLogin(loginForm);
    //编程式导航到首页
    $router.push("/");
    ElNotification({
      type: "success",
      message: "登录成功",
      title: `HI,${getTime()}好`,
    });
    loading.value = false;
  } catch (error) {
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
    loading.value = false;
  }

  // console.info(result)
};
//定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("账号长度至少5位"));
  }
};
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码长度至少6位"));
  }
};
// 定义表单校验需要配置对象
const rules = {
  username: [{ trigger: "change", validator: validatorUserName }],
  password: [{ trigger: "change", validator: validatorPassword }],
};
</script>
<style scoped lang="scss">
.login_container {
  width: 130vh;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
