<template>
  <div class="jurisdiction">
    <BlockTitleName>权限管理</BlockTitleName>
    <div class="content">
      <ul class="userList">
        <li>
          <a-button class="retry"
            ><img
              :src="require('@/assets/images/add_circle_outline_u4263.svg')"
              alt=""
          /></a-button>
        </li>
        <li
          v-for="item in userTypeList"
          :class="{ selectuser: selectuser == item.title }"
          :key="item.title"
        >
          <span>{{ item.title }}</span
          ><img
            :src="require('@/assets/images/delete_forever_u2690.svg')"
            alt=""
          />
        </li>
      </ul>
      <div class="content_right">
        <div class="content_right_top">
          <div class="permissionName">
            <p>权限名称</p>
            <input type="text" style="width: 100%" />
            <p style="margin-top: 25px">描述</p>
            <a-textarea
              class="textarea"
              :auto-size="{ minRows: 8, maxRows: 8 }"
            />
            <p style="margin-top: 25px">启用</p>
            <a-switch
              checked-children="是"
              un-checked-children="否"
              v-model:checked="isEnable"
            />
          </div>
          <div class="jurisdictionTreeBox">
            <p>权限树</p>
            <div class="jurisdictionTree">
              <JurisdictionTree />
            </div>
          </div>
        </div>
        <div class="content_right_bottom">
          <a-button class="retry"
            ><img
              :src="require('@/assets/images/autorenew_u1064.svg')"
              alt=""
            />重置</a-button
          >
          <a-button class="retry"
            ><img
              :src="require('@/assets/images/done_u4162.svg')"
              alt=""
            />提交</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JurisdictionTree from "./component/jurisdictionTree.vue";
import { onMounted, reactive, toRefs } from "vue";
export default {
  components: {
    JurisdictionTree,
  },
  setup() {
    const state = reactive({
      userTypeList: [
        { title: "超级管理员", describe: "" },
        { title: "普通用户", describe: "" },
      ],
      selectuser: "",
      isEnable: true,
    });
    onMounted(() => {
      state.selectuser = state.userTypeList[0].title;
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.jurisdiction {
  width: 100%;
  height: 100%;
  padding: 22px 30px 22px;
  .content {
    width: 77%;
    height: 792px;
    margin: 0 auto;
    .userList {
      display: inline-block;
      width: 15%;
      height: 792px;
      vertical-align: top;
      background: #23306b;
      border: 1px solid #2d3d88;
      li {
        width: 100%;
        height: 38px;
        line-height: 38px;
        margin-bottom: 1px;
        color: #5b92ff;
        .retry {
          width: 100%;
          height: 100%;
          img {
            margin: 0;
          }
        }
        span {
          margin-left: 20px;
          font-size: 14px;
        }
        & > img {
          float: right;
          margin: 10px 10px 0 0;
        }
        &:hover {
          cursor: pointer;
          background: #5b92ff;
          color: rgba(255, 255, 255, 0.996078431372549);
        }
      }
    }
    .content_right {
      background: #2d3d87;
      width: 80%;
      display: inline-block;
      height: 100%;
      color: #a8c5ff;
      .content_right_top {
        height: 93%;
        width: 100%;
        border-bottom: 1px solid #344a99;
        .permissionName {
          width: 30%;
          height: 93%;
          display: inline-block;
          vertical-align: top;
          padding: 12px 20px;
          p {
            margin-bottom: 5px;
            font-size: 14px;
          }
          .textarea {
            color: #a8c5ff;
            background: #212d66;
            outline: none;
            border: none;
          }
        }
        .jurisdictionTreeBox {
          display: inline-block;
          width: 70%;
          height: 100%;
          p {
            padding: 10px;
            font-weight: 700;
            font-size: 14px;
            margin: 0;
          }
          .jurisdictionTree {
            border-left: 1px solid #344a99;
            height: calc(100% - 41px);
            padding: 0 20px;
          }
        }
      }
      .content_right_bottom {
        padding: 0 20px;
        .retry {
          margin-top: 12px;
          img {
            vertical-align: -2px;
          }
          &:nth-child(2) {
            float: right;
            background: #5b92ff;
          }
        }
      }
    }
  }
}
.retry {
  width: 83px;
  height: 32px;
  display: inline-block;
  border: 1px solid rgba(91, 146, 255, 1);
  border-radius: 2 px;
  background-color: rgba(45, 61, 136, 1);
  text-align: center;
  color: #fff;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  img {
    margin-right: 10px;
  }
  &:hover {
    background: #1b83ed;
  }
}
.selectuser {
  background: #5b92ff;
  color: rgba(255, 255, 255, 0.996078431372549) !important;
}
</style>
