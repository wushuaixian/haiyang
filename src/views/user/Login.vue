<template>
  <div class="login-container">
    <div class="login-title"></div>
    <!--        <div class="login-earth"></div>-->
    <a-form
      ref="formLogin"
      :rules="rules"
      class="login-form"
      :model="formLoginObj"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <!--            <p style="font-size: 30px;color: #00bed7;line-height: 80px;">用户登录</p>-->
      <a-form-item class="login-rectangle login-form-item" name="username">
        <span class="login-form-label">账 号</span>
        <a-input
          class="login-rectangle-input"
          v-model:value="formLoginObj.username"
          allowClear
        >
          <template #prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
        <div v-show="usernameEmpty" class="login-rectangle-error">
          请输入账号
        </div>
      </a-form-item>
      <a-form-item class="login-rectangle login-form-item" name="password">
        <span class="login-form-label">密 码</span>
        <a-input
          class="login-rectangle-input"
          v-model:value="formLoginObj.password"
          type="password"
          allowClear
        >
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
        <div v-show="passwordEmpty" class="login-rectangle-error">
          请输入密码
        </div>
      </a-form-item>
      <a-form-item style="height: 38px" name="code" class="login-form-item">
        <div
          style="
            display: inline-flex;
            flex-direction: row;
            justify-content: space-between;
            width: 383px;
          "
        >
          <a-input
            class="login-code"
            v-model:value="formLoginObj.code"
            placeholder="请输入验证码"
          ></a-input>
          <verify-code ref="verifyCode" @getIdentifyCode="saveCode" />
          <div v-show="codeEmpty" class="login-code-error">请输入验证码</div>
          <div v-show="codeError" class="login-code-error">验证码错误</div>
        </div>
      </a-form-item>
      <a-form-item class="login-form-item">
        <a-button class="login-btn" type="primary" html-type="submit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import VerifyCode from "./components/VerifyCode";
// import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

export default {
  components: { VerifyCode, UserOutlined, LockOutlined },
  setup() {
    const router = useRouter();
    // const store = useStore();
    // 登录表单
    const formLoginObj = reactive({
      username: "",
      password: "",
      code: "",
    });
    let code = "";
    const saveCode = (verifyCode) => {
      code = verifyCode;
    };
    const formLogin = ref(null);
    const handleFinish = (values) => {
      if (values.username == "admin" && values.password == "admin") {
        router.push("/");
      } else {
        verifyCode.value.createdCode();
        formLoginObj.code = "";
        notification["error"]({
          message: "提示",
          description: "用户名或密码错误！！！",
        });
      }
      // login(values.username, values.password).then((res) => {
      //   const code = res.code;
      //   if (code === 200) {
      //     store.commit("user/$_setToken", res.data.Authorization);
      //     store.commit("user/$_setUserName", res.data.username);
      //     notification["success"]({
      //       message: "提示",
      //       description: "登录成功",
      //     });
      //     router.push("/");
      //     getUser(res.data.username)
      //   } else {
      //     // 各类登录失败统一根据后台返回信息提示
      //     // 失败后清空验证码输入，并刷新验证码
      //     verifyCode.value.createdCode();
      //     formLoginObj.code = "";
      //     notification["error"]({
      //       message: "提示",
      //       description: res.data.message,
      //     });
      //   }
      // });
    };
    const handleFinishFailed = (errors) => {
      console.log("handleFinishFailed", errors);
    };
    const verifyCode = ref();
    let checkUsername = async (rule, value) => {
      if (!value) {
        usernameEmpty.value = true;
        return Promise.reject("");
      } else {
        usernameEmpty.value = false;
        return Promise.resolve();
      }
    };
    let checkPassword = async (rule, value) => {
      if (!value) {
        passwordEmpty.value = true;
        return Promise.reject("");
      } else {
        passwordEmpty.value = false;
        return Promise.resolve();
      }
    };
    let checkCode = async (rule, value) => {
      if (!value) {
        codeEmpty.value = true;
        codeError.value = false;
        return Promise.reject("");
      }
      if (value.toLowerCase() !== code.toLowerCase()) {
        verifyCode.value.createdCode();
        codeEmpty.value = false;
        codeError.value = true;
        return Promise.reject("");
      } else {
        codeEmpty.value = false;
        codeError.value = false;
        return Promise.resolve();
      }
    };
    const rules = {
      username: [
        {
          validator: checkUsername,
          trigger: "blur",
        },
      ],
      password: [
        {
          validator: checkPassword,
          trigger: "blur",
        },
      ],
      code: [
        {
          validator: checkCode,
          trigger: "blur",
        },
      ],
    };
    const usernameEmpty = ref(false);
    const passwordEmpty = ref(false);
    const codeEmpty = ref(false);
    const codeError = ref(false);

    return {
      // 登录表单
      formLoginObj,
      formLogin,
      handleFinish,
      handleFinishFailed,
      saveCode,
      rules,
      verifyCode,
      usernameEmpty,
      passwordEmpty,
      codeEmpty,
      codeError,
    };
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  /*min-height: 1080px;*/
  /*min-width: 1920px;*/
  overflow-y: hidden;
  background: url("../../assets/images/bg2.jpg") no-repeat;
  background-size: cover;
}

.login-title {
  position: absolute;
  top: 18%;
  right: 12%;
  width: 752px;
  height: 86px;
  background: url("../../assets/images/system.png") no-repeat;
}

/*.login-earth {
        position: absolute;
        top: 10%;
        left: 6%;
        width: 1038px;
        height: 952px;
        background: url('../../assets/img/login/earth.png') no-repeat;
        background-size: 80% 80%;
    }*/

.login-form {
  padding-top: 30px;
  position: absolute;
  top: 30%;
  right: 15%;
  width: 500px;
  height: 400px;
  background: url("../../assets/images/border.png") no-repeat;
  background-size: 100% 100%;
}

.login-form-item {
  margin: 24px auto;
  width: 383px;
}

.login-form-label {
  color: rgb(10, 221, 255);
  font-size: 20px;
  position: absolute;
  width: 50px;
  top: 17px;
  left: 22px;
}

.login-rectangle {
  /*z-index: 20;*/
  width: 383px;
  height: 71px;
  background: url("../../assets/images/rectangle.png") no-repeat;
}

.login-rectangle-input {
  position: absolute;
  top: 22px;
  left: 92px;
  /*width: max-content;*/
  width: 250px;
  margin-top: -7px;
}

.login-rectangle-error {
  color: red;
  position: absolute;
  width: 100px;
  line-height: 16px;
  top: 56px;
  left: 92px;
  text-align: left;
  margin-top: 6px;
}

.login-btn {
  color: white;
  background-color: #0057ff;
  border-color: #0057ff;
  width: 383px;
  height: 56px;
  font-size: 22px;
}

.login-code {
  /*position: absolute;*/
  /*top: 22px;*/
  /*left: 92px;*/
  width: max-content;
}

.login-code-error {
  color: red;
  position: absolute;
  width: 100px;
  line-height: 16px;
  top: 39px;
  left: 0;
  text-align: left;
}
</style>
