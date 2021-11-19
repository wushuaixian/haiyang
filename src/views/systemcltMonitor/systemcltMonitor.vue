<template>
  <div class="systemcltMonitor">
    <div class="top">
      <p class="title">
        <span class="box" /> <span class="text">系统监控</span>
      </p>
      <p class="top_tag">
        <span :class="{ selectTag: selectTag == 'rw' }" @click="tag('rw')">
          <img
            :src="
              selectTag == 'rw'
                ? require('../../assets/images/import_export_u682_white.svg')
                : require('../../assets/images/import_export_u682.svg')
            "
            alt=""
          />
          任务监控
        </span>
        <span :class="{ selectTag: selectTag == 'cc' }" @click="tag('cc')">
          <img
            :src="
              selectTag == 'cc'
                ? require('../../assets/images/storage_u679_white.svg')
                : require('../../assets/images/storage_u679.svg')
            "
            alt=""
          />
          存储监控
        </span>
        <span :class="{ selectTag: selectTag == 'yc' }" @click="tag('yc')">
          <img
            :src="
              selectTag == 'yc'
                ? require('../../assets/images/storage_u679_white.svg')
                : require('../../assets/images/storage_u679.svg')
            "
            alt=""
          />
          异常监控
        </span>
      </p>
    </div>
    <div class="bottom">
      <keep-alive>
        <component :is="bottomtag"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import ThinkMonitor from "./thinkMonitor.vue";
import StorageMonitor from "./storageMonitor.vue";
import AbnormalMonitoring from "./abnormalMonitoring.vue";
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      selectTag: "rw",
      bottomtag: "ThinkMonitor",
    });
    const tag = (val) => {
      state.selectTag = val;
      if (val == "rw") {
        state.bottomtag = "ThinkMonitor";
      } else if (val == "cc") {
        state.bottomtag = "StorageMonitor";
      } else if (val == "yc") {
        state.bottomtag = "AbnormalMonitoring";
      }
    };
    return {
      ...toRefs(state),
      tag,
    };
  },
  components: {
    ThinkMonitor,
    StorageMonitor,
    AbnormalMonitoring,
  },
};
</script>
<style lang="scss" scoped>
.systemcltMonitor {
  width: 100%;
  .title {
    line-height: 30px;
    margin-left: 15px;
    .text {
      font-weight: 700;
      font-style: normal;
      font-size: 16px;
      color: #a8c5ff;
      margin-left: 10px;
    }
    .box {
      width: 5px;
      height: 21px;
      background: inherit;
      background-color: rgba(65, 242, 231, 1);
      box-sizing: border-box;
      border-width: 1px;
      display: inline-block;
      border-style: solid;
      border-color: rgba(15, 189, 178, 1);
      border-radius: 0px;
      vertical-align: -5px;
      // box-shadow: 0px 0px 5px rgb(65 242 231);
    }
  }
}
.top {
  border-bottom: 1px solid #2c3e7f;
  padding: 10px 0 0 20px;
  width: 100%;
  height: 106px;
  .top_tag {
    cursor: pointer;
    font-weight: 400;
    font-style: normal;
    color: #5b92ff;
    line-height: 22px;
    span {
      width: 104px;
      height: 32px;
      display: inline-block;
      text-align: center;
      margin-right: 10px;
      line-height: 32px;
      img {
        margin-top: -1px;
      }
    }
  }
}
.selectTag {
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
  text-align: left;
  line-height: 22px;
  background: #5b92ff;
  border-radius: 6px;
}
.bottom {
  width: 100%;
  padding: 20px;
}
</style>
