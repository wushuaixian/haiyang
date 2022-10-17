<template>
  <div class="home">
    <a-layout-header class="header">
      <div class="left-img">
        <!-- <a-button
          type="primary"
          @click="toggleCollapsed"
          style="margin-bottom: 16px"
        >
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </a-button> -->
        <img src="@/assets/images/u31.png" style="height: 100%" alt="" />
      </div>
      <div class="right-img">
        <!-- <div class="tv_img_group"> -->
        <!-- <img class="head" src="@/assets/images/u26.svg" alt="" />
          <img class="fir" src="@/assets/images/c4_u14.svg" alt="" />
          <img class="sec" src="@/assets/images/c3_u15.svg" alt="" /> -->
        <!-- <img class="thir" src="@/assets/images/c2_u16.svg" alt="" /> -->
        <!-- </div> -->
        <!-- <div class="message_img">
          <img
            src="@/assets/images/u10.svg"
            style="width: 19px; height: 21px"
            alt=""
          /> -->
        <!-- </div> -->
        <div class="admin_img">
          <!-- <a-popover v-model:visible="visible" trigger="click">
            <template #content>
              <span>sksldjfkls</span>
            </template>
            <span style="cursor: pointer" class="myButton">
              <img src="@/assets/images/u7.svg" alt="" />
              <span class="people">admin</span>
            </span>
          </a-popover> -->
          <a-popover trigger="click">
            <template #content>
              <span style="cursor: pointer">
                <img
                  style="width: 20px; margin-right: 10px"
                  src="@/assets/images/dengchu.svg"
                  alt=""
                />
                <span>登出</span>
              </span>
            </template>
            <span style="cursor: pointer" class="myButton">
              <img src="@/assets/images/u7.svg" alt="" />
              <span class="people">admin</span>
            </span>
          </a-popover>
        </div>
      </div>
    </a-layout-header>
    <div class="content">
      <a-menu
        mode="inline"
        theme="dark"
        class="home_menu"
        :style="`width:${menuWidth}px;position: relative`"
        :inline-collapsed="collapsed"
        v-model:openKeys="openKeys"
        @click="toPath"
        v-model:selectedKeys="selectedKeys"
      >
        <template :key="item.index" v-for="item in menuOptions">
          <a-menu-item :key="item.index" v-if="!item.children">
            <template #icon>
              <div class="svgimgbox">
                <img :title="item.label" :src="item.imgsrc" alt="" />
              </div>
            </template>
            <span>{{ item.label }}</span>
          </a-menu-item>
          <a-sub-menu :key="item.index" v-else>
            <template #icon
              ><img :title="item.label" :src="item.imgsrc" alt="" />
            </template>
            <template #title>{{ item.label }}</template>
            <a-menu-item v-for="item in item.children" :key="item.index">{{
              item.label
            }}</a-menu-item>
          </a-sub-menu>
        </template>
        <li class="collapsed" @click="toggleCollapsed">
          <component
            :is="collapsed ? 'LeftOutlined' : 'RightOutlined'"
          ></component>
        </li>
      </a-menu>
      <div class="right-cotent">
        <div class="content1">
          <router-view></router-view>
        </div>
        <div class="bottontext">
          copyright
          <img
            style="margin-top: -4px"
            :src="require('@/assets/images/copyright_u948.svg')"
            alt=""
          />
          2021
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { getDetail } from "@/api/task.js";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { onMounted, reactive, toRefs, toRaw, watch } from "vue";
import u37 from "@/assets/images/u37.svg";
import u39 from "@/assets/images/u39.svg";
import u49 from "@/assets/images/u49.svg";
import u45 from "@/assets/images/u45.svg";
import u43 from "@/assets/images/u43.svg";
import u53 from "@/assets/images/dengpao3.svg";
import u96 from "@/assets/images/u96.svg";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LeftOutlined,
    RightOutlined,
  },
  provide() {
    return {
      collapsed: this.collapsed,
    };
  },

  setup(props) {
    console.log(toRaw(route));
    const store = useStore(); // 获取store 实例
    console.log(props);
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      visible: true,
      menuWidth: 240,
      menuOptions: [],
      collapsed: store.state.collapsed,
      selectedKeys: [route.name],
      openKeys: [route.name],
      preOpenKeys: ["systemcltMonitor"],
      haha: route,
      tree: [
        {
          label: "系统监控",
          index: "systemcltMonitor",
          imgsrc: u37,
        },
        {
          label: "订单管理",
          index: "orderManagement",
          imgsrc: u39,
        },
        {
          label: "任务管理",
          index: "taskManagement",
          imgsrc: u49,
        },
        {
          label: "数据管理",
          index: "dataManagement",
          imgsrc: u45,
        },
        {
          label: "统计分析",
          index: "statisticalAnalysis",
          imgsrc: u43,
        },
        {
          label: "配置管理",
          index: "configurationManagement",
          imgsrc: u96,
          children: [
            {
              label: "存储管理",
              index: "storageManagement",
            },
            {
              label: "数据集管理",
              index: "dataSetManagement",
            },
          ],
        },
        {
          label: "用户管理",
          index: "userAdminstratordir",
          imgsrc: u53,
          children: [
            {
              label: "用户管理",
              index: "userAdminstrator",
            },
            {
              label: "权限管理",
              index: "jurisdiction",
            },
          ],
        },
      ],
    });
    const diguitree = (arr) => {
      let newarr = [];
      const fun = (arr, newarr) => {
        for (let i = 0; i < arr.length; i++) {
          if (store.state.jurisdictionList.includes(arr[i].index)) {
            newarr.push(JSON.parse(JSON.stringify(arr[i])));
            if (arr[i].children) {
              newarr[newarr.length - 1].children = [];
              console.log(arr[i].children);
              fun(arr[i].children, newarr[newarr.length - 1].children);
            }
          }
        }
      };
      fun(arr, newarr);
      console.log(newarr);
      return newarr;
    };
    // const menuOptions = computed(() => {
    //   let newarr = [];
    //   diguitree(state.tree, newarr);
    //   return newarr;
    // });

    const toggleCollapsed = () => {
      store.commit("changeCollapsed");
      state.collapsed = store.state.collapsed;
      if (state.collapsed) {
        state.menuWidth = 80;
      } else {
        state.menuWidth = 240;
      }
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };
    onMounted(() => {
      state.menuOptions = diguitree(state.tree);
      getDetail({ a: 1, b: 2 }).then(() => {
        console.log(11111111111);
      });
    });
    const toPath = (item, key) => {
      console.log(item, key, item.key.indexOf("/"));
      if (item.key.indexOf("/") == -1) router.push({ name: item.key });
      console.log(route.name);
    };
    watch(state.haha, () => {
      state.selectedKeys = [route.name];
    });
    return {
      ...toRefs(state),
      toggleCollapsed,
      toPath,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.header {
  display: flex;
  padding: 0px;
  justify-content: space-between;
  background: linear-gradient(
    90deg,
    rgba(22, 30, 67, 1) 27%,
    rgba(32, 43, 104, 1) 96%
  );
  box-shadow: -3px -3px 5px black;
}
.home_menu {
  /* width: 100px; */
  width: 256px;
  height: 100%;
  background: rgba(22, 30, 67, 1);
}
.home_menu li {
  padding-left: 0 !important;
  text-align: center;
}
.content {
  display: flex;
  width: 100%;
  height: calc(100% - 64px);
}
.content .right-cotent {
  flex: 1;
  padding: 14px 0 0 14px;
  overflow-y: auto;
  background: #161e43;
  border: 3px solid #0e153c;
  &::-webkit-scrollbar {
    // 滚动条的背景
    width: 7px;
    background: #191a37;
    height: 14px;
  }

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    width: 5px;
    border: 5px solid transparent;
  }

  &::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px #191a37 inset;
  }

  &::-webkit-scrollbar-thumb {
    //滚动条的滑块样式修改
    width: 5px;
    min-height: 20px;
    background: #222e68;
    transition-delay: 2s;
  }
  // &::-webkit-scrollbar-thumb:hover {
  //   background: #222e68;
  // }
  &::-webkit-scrollbar-corner {
    background: #191a37;
  }
  // background: linear-gradient(
  //   90deg,
  //   rgba(22, 30, 67, 1) 27%,
  //   rgba(32, 43, 104, 1) 96%
  // );
  .content1 {
    margin: 0 auto;
    max-width: 1819px;
    background: url("../assets/images/u664.svg");
    background-size: 100% 100%;
  }
}

.sec {
  animation: mymove1 1s 300ms infinite;
}
.left-img {
  height: 100%;
}
.right-img {
  width: 120px;
  display: flex;
  line-height: 60px;
  justify-content: space-around;
}
.people {
  margin-left: 10px;
  color: rgba(94, 189, 255, 0.96078431372549);
}
.admin_img {
  display: flex;
  align-items: center;
}
// .admin_img::before {
//   content: "";
//   width: 2px;
//   margin-right: 15px;
//   height: 15px;
//   background-color: rgba(128, 140, 209, 0.8);
// }

.tv_img_group {
  margin-top: 3px;
  position: relative;
}
.head,
.fir,
.sec,
.thir {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
.fir {
  animation: mymove1 1s infinite;
}
@keyframes mymove1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
}
.sec {
  animation: mymove1 1s 300ms infinite;
}
@keyframes mymove1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
}
.thir {
  animation: mymove1 1s 600ms infinite;
}
@keyframes mymove1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
}
/deep/ .ant-menu-item {
  img {
    filter: drop-shadow(#5b92ff 20px 0);
    margin-left: -18px;
    width: 18.4px;
  }
}
/deep/ .ant-menu-item-selected {
  background: #5b92ff !important;
  img {
    filter: drop-shadow(#ffffff 20px 0);
  }
  .ant-menu-title-content {
    color: #fff;
  }
}
/deep/ .ant-menu-title-content {
  color: #a8c5ff;
}
/deep/ .ant-menu {
  background: #161e43 !important;
}
/deep/ .ant-menu-item-icon {
  overflow: hidden;
  width: 20px;
}
.svgimgbox {
  width: 20px;
  height: 20px;
  img {
    left: 80px;
  }
}
.collapsed {
  height: 30px;
  line-height: 30px;
  position: absolute;
  text-align: center;
  bottom: 0px;
  width: 100%;
  font-size: 20px;
  background: #222f68;
  &:hover {
    cursor: pointer;
  }
}
.bottontext {
  width: 100%;
  height: 70px;
  color: #909db5;
  text-align: center;
  line-height: 70px;
}
.myButton {
  width: 100px;
  text-align: center;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
.myButton:hover {
  // background-color: #5cbf2a;
  background: #151e52;
}
.myButton:active {
  border: 1px solid #2d3d88;
}
</style>
<style lang="scss">
.ant-popover-inner {
  background: #2d3d88;

  &:hover {
    background: #5b92ff;
  }
}
.ant-popover-inner-content {
  color: #8dc5ec;
  &:hover {
    color: #fff;
  }
}
.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow {
  border-top-color: #2d3d88;
  border-left-color: #2d3d88;
}
</style>
