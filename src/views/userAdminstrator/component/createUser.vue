<template>
  <div class="createUser">
    <p class="titleImg">
      <img :src="require('@/assets/images/titleImg.png')" alt="" />
    </p>
    <p class="createUser" v-if="type == 'add'">创建用户</p>
    <p class="createUser" v-else>编辑用户</p>
    <p class="textTip">请在下方填写用户信息</p>
    <div class="content">
      <p class="jurisdictiontTip" v-if="type == 'add'">
        您可以在此处注册用户，并给其分配对本系统的使用权限！
      </p>
      <p class="jurisdictiontTip" v-else>
        您可以在此处修改已经注册过的用户信息！<span
          class="changePassword"
          @click="changePassword"
          >点击此处修改密码</span
        >
      </p>
      <p class="accountNumberInfo">账号信息</p>
      <div class="line"></div>
      <a-form layout="vertical" :model="formState">
        <a-form-item label="用户名">
          <input v-model="formState.name" />
        </a-form-item>
        <a-form-item label="密码" v-if="type == 'add'">
          <input v-model="formState.name" />
        </a-form-item>
        <a-form-item label="权限">
          <input v-model="formState.name" />
        </a-form-item>
        <a-form-item label="确认密码" v-if="type == 'add'">
          <input v-model="formState.name" />
        </a-form-item>
        <a-form-item label="启用">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            v-model:checked="checked1"
          />
        </a-form-item>
        <a-form-item label="验证码">
          <input
            v-model="formState.name"
            style="width: 50%; vertical-align: top; margin-right: 24px"
          />
          <canvas
            id="canvas"
            :width="canvas_width"
            :height="canvas_height"
            @click="showNumber"
            style="border: 1px solid rgba(168, 197, 255, 1)"
          ></canvas>
        </a-form-item>
      </a-form>
      <p class="accountNumberInfo">基本信息</p>
      <div class="line"></div>
      <a-form layout="vertical" :model="formState">
        <a-form-item label="真实姓名">
          <input v-model="formState.name" />
        </a-form-item>
        <a-form-item label="所属部门">
          <input v-model="formState.name" />
        </a-form-item>
        <a-form-item label="性别">
          <span
            :class="{ sbutton: true, gender: true, selectGender: selectGender }"
            @click="selectGender = false"
            >男</span
          ><span
            :class="{
              sbutton: true,
              gender: true,
              selectGender: !selectGender,
            }"
            @click="selectGender = true"
            >女</span
          >
        </a-form-item>
        <a-form-item label="联系方式">
          <input v-model="formState.name" />
        </a-form-item>
      </a-form>
    </div>
    <div class="lineBottom"></div>
    <div class="bottom_button"><button class="sbutton">提交</button></div>
    <div class="bottom_button">
      <button class="sbutton" v-if="type != 'add'" style="background: #2d3d88">
        重置
      </button>
    </div>
    <div class="return" @click="go">
      <img :src="require('@/assets/images/u1609.svg')" alt="" />
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";
export default {
  props: {
    type: {
      type: String,
      default: "add",
    },
  },
  setup(props, content) {
    const state = reactive({
      formState: {},
      code: "", // 数字验证码
      canvas_width: "100",
      canvas_height: "32",
      selectGender: true,
    });
    const showNumber = () => {
      // authCode().then((res) => {
      //   if (res.success) {
      //     this.code = res.data;
      //     this.drawCode();
      //   }
      // });
      state.code = "adbc";
      drawCode();
    };
    const randomColor = () => {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    };
    const drawCode = () => {
      let canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
      let context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台

      context.fillStyle = "#2D3D88";
      context.fillRect(0, 0, 300, 200);

      for (let i = 0; i < state.code.length; i++) {
        let deg = (Math.random() * 15 * Math.PI) / 180; //产生0~30之间的随机弧度

        let x = 20 + i * 18; //文字在canvas上的x坐标
        let y = 20 + Math.random() * 8; //文字在canvas上的y坐标
        context.font = "bold 20px 微软雅黑";
        context.translate(x, y);
        context.rotate(deg);
        context.fillStyle = randomColor();
        context.fillText(state.code[i], 0, 0);
        context.rotate(-deg);
        context.translate(-x, -y);
      }
      // for (let i = 0; i <= 5; i++) {
      //   //验证码上显示线条
      //   context.strokeStyle = randomColor();
      //   context.beginPath();
      //   context.moveTo(
      //     Math.random() * state.canvas_width,
      //     Math.random() * state.canvas_height
      //   );
      //   context.lineTo(
      //     Math.random() * state.canvas_width,
      //     Math.random() * state.canvas_height
      //   );
      //   context.stroke();
      // }
      for (let i = 0; i <= 30; i++) {
        //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        let x = Math.random() * state.canvas_width;
        let y = Math.random() * state.canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }
    };
    const go = () => {
      content.emit("close");
    };
    const changePassword = () => {
      content.emit("close");
      content.emit("showChangePassword");
    };
    onMounted(() => {
      showNumber();
    });
    return {
      drawCode,
      ...toRefs(state),
      showNumber,
      go,
      changePassword,
    };
  },
};
</script>
<style lang="scss" scoped>
.createUser {
  width: 730px;
  background: #2d3d88;
  margin: 0 auto;
  overflow: hidden;
  p {
    margin: 0;
  }
  .titleImg {
    text-align: center;
    margin-top: 30px;
  }
  .createUser {
    font-family: "微软雅黑", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 23px;
    color: #ffffff;
    text-align: center;
    line-height: 23px;
    height: 23px;
    margin-top: 25px;
  }
  .textTip {
    font-family: "微软雅黑", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.647058823529412);
    text-align: center;
    margin-top: 15px;
  }
  .content {
    padding: 0 80px;
    .jurisdictiontTip {
      font-size: 14px;
      color: #fff;
      padding: 50px 0;
    }
    .accountNumberInfo {
      font-size: 20px;
      color: #ffffff;
      line-height: 20px;
    }
    .line {
      border-bottom: 1px solid #344a9a;
      margin: 20px 0;
    }
  }
  .lineBottom {
    width: 100%;
    border-bottom: 1px solid #263474;
    margin-top: 20px;
  }
  .bottom_button {
    text-align: center;
    margin: 15px 0;
    button {
      width: 585px;
      height: 38px;
      border: 1px solid rgb(115, 159, 247);
      &:active {
        border: 1px solid rgb(61, 118, 233);
      }
    }
    &:nth-child(2) {
      margin-top: 0;
    }
  }
}
/deep/ .ant-form-vertical .ant-form-item {
  flex-direction: column;
  width: 45%;
  color: rgba(168, 197, 255, 0.996078431372549);
  display: inline-block;
  &:nth-child(2n) {
    float: right;
  }
}
/deep/ .ant-form-item-label > label {
  color: rgba(168, 197, 255, 0.996078431372549);
}
.sbutton {
  color: #fff;
  outline: none;
  background-color: rgba(91, 146, 255, 1);
  border-radius: 2px;
  font-size: 14px;
  border: none;
  cursor: pointer;
}
.gender {
  width: 60px;
  height: 22px;
  display: inline-block;
  text-align: center;
  margin-right: 10px;
  border: 1px solid rgba(91, 146, 255, 1);
  line-height: 22px;
}
.selectGender {
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
.changePassword {
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  font-weight: 700;
  color: #00fff9;
  cursor: pointer;
}
</style>
