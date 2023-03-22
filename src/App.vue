<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { onMounted } from "vue";
export default {
  components: {},
  setup() {
    const locale = zhCN;
    const pingSize = () => {
      let ratio = 0,
        screen = window.screen;
      //ua = navigator.userAgent.toLowerCase()
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
      } else if (~undefined.indexOf("msie")) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
      } else if (
        window.oueterWidth !== undefined &&
        window.innerWidth !== undefined
      ) {
        ratio = window.outerWidth / window.innerWidth;
      }
      if (ratio) {
        // ratio = Math.round(ratio * 100);
      }
      console.log(ratio);
      return ratio;
    };
    onMounted(() => {
      // pingSize();
      // document.getElementById("app").style.transform =
      //   "scale(" +
      //   document.body.clientWidth / 1920 +
      //   "," +
      //   document.body.clientHeight / 969 +
      //   ")";
      // window.onresize = () => {
      //   console.log(11111);
      //   document.getElementById("app").style.transform =
      //     "scale(" +
      //     document.body.clientWidth / 1920 +
      //     "," +
      //     document.body.clientHeight / 969 +
      //     ")";
      // };
    });
    return {
      locale,
      pingSize,
    };
  },
};
</script>

<style lang="scss">
#app {
  // height: 969px;
  // width: 1920px;
  width: 100%;
  height: 100%;
  // transform-origin: left top;
}

html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

p {
  margin: 0;
  padding: 0;
}

* {
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

/deep/ .ant-radio-button-wrapper {
  color: #a8c5ff;
  background: #2d3d88;
  border-color: #a8c5ff;
}

/deep/ .ant-radio-button-wrapper {
  border-color: #a8c5ff;
}

/deep/
  .ant-radio-group-solid
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  background: #5b92ff;
  color: #fff;
}

input {
  background: url("./assets/images/u1028.svg");
  background-size: 100% 100%;
  border: none;
  width: 100%;
  outline: none;
  height: 32px;
}

p {
  overflow: hidden;
  /*溢出部分消失*/
  white-space: nowrap;
  /*文本不换行显示*/
  text-overflow: ellipsis;
  /*文本溢出部分用点表示*/
}

.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  background: #5b92ff !important;
  color: #fff !important;
}

.ant-select-item-option-active:not(.ant-select-item-option-disabled) {
  background: #5b92ff !important;
  color: #fff !important;
}
</style>
