<template>
  <div class="changePassword">
    <div class="content">
      <div>
        <p class="titleImg">
          <img :src="require('@/assets/images/titleImg.png')" alt="" />
        </p>
        <p class="changePasswordText">修改密码</p>
        <p class="titTip">请在右侧修改用户密码</p>
        <p class="titTipTwo" style="margin-top: 45px">
          请谨慎修改您的密码，并确保您能记住
        </p>
        <p class="titTipTwo">
          它！如果您忘记了密码，请联系<span style="color: #f98686">管理员</span
          >!
        </p>
      </div>
      <div>
        <a-form layout="vertical" :model="formState">
          <a-form-item label="旧密码">
            <input v-model="formState.name" />
          </a-form-item>
          <a-form-item label="新密码">
            <input v-model="formState.name" />
          </a-form-item>
          <a-form-item label="确认密码">
            <input v-model="formState.name" />
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="line"></div>
    <div class="bottom_button"><button class="sbutton">提交</button></div>
    <div class="return" @click="go">
      <img :src="require('@/assets/images/u1609.svg')" alt="" />
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  setup(props, content) {
    const state = reactive({
      formState: {},
    });
    const go = () => {
      content.emit("close");
    };
    return {
      ...toRefs(state),
      go,
    };
  },
};
</script>
<style lang="scss" scoped>
.changePassword {
  margin: 0 auto;
  text-align: center;
  p {
    margin: 0;
  }
  .content {
    padding: 0 60px;
    & > div {
      vertical-align: top;
      width: 50%;
      display: inline-block;
      &:nth-child(2) {
        padding-top: 32px;
      }
    }
    .titleImg {
      margin: 35px 0;
    }
    .changePasswordText {
      font-size: 23px;
      color: #ffffff;
    }
    .titTip {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.647058823529412);
      margin-top: 5px;
    }
    .titTipTwo {
      color: #ffffff;
      font-size: 14px;
      line-height: 14px;
    }
  }
  .line {
    width: 100%;
    border-bottom: 1px solid #263474;
    margin-top: 10px;
  }
  .bottom_button {
    text-align: center;
    margin: 15px 0;
    button {
      width: 585px;
      height: 38px;
      background: #5b92ff;
      color: #fff;
      border: 1px solid rgb(115, 159, 247);
      &:active {
        border: 1px solid rgb(61, 118, 233);
      }
    }
    &:nth-child(2) {
      margin-top: 0;
    }
  }
  width: 730px;
  height: 337px;
  background: #2d3d88;
}
.return {
  position: fixed;
  width: 40px;
  height: 40px;
  background: #4c64b9;
  bottom: 80px;
  right: 80px;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}
/deep/ .ant-form-item {
  margin-bottom: 13px;
}
/deep/ .ant-form-item-label > label {
  color: #a8c5ff;
}
input {
  color: #a8c5ff;
}
</style>
