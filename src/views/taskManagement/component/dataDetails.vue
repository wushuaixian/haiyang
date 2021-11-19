<template>
  <div class="dataDetailsBox">
    <div class="dataDetailsBoxContent">
      <TitleName>数据详情</TitleName>
      <div class="table" v-for="(item, index) in data" :key="index">
        <div>{{ item.label }}</div>
        <div>{{ item.value }}</div>
      </div>
      <div class="close">
        <a-button class="closeButton" @click="$emit('dataDetailClose')"
          >关闭</a-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  components: {},
  setup() {
    const state = reactive({
      data: [
        { label: "数据ID", value: "532453" },
        { label: "卫星", value: "HY1A" },
        { label: "载荷", value: "TMS" },
        { label: "级别", value: "1级" },
        { label: "对象号", value: "2354234" },
        { label: "磁带条码", value: "SH2343" },
        { label: "文件名", value: "D:ascat_14234234_435232_metopa" },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.dataDetailsBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba($color: #000000, $alpha: 0.3);
  .dataDetailsBoxContent {
    padding: 0 12px;
    width: 764px;
    height: 513px;
    position: relative;
    background: #2d3d88;
    .table {
      width: 100%;
      height: 37px;
      line-height: 37px;
      div:nth-child(1) {
        background: #25337b;
        text-align: center;
        border: 1px solid #2e61c4;
        width: 165px;
        height: 100%;
        display: inline-block;
        color: #fff;
      }
      div:nth-child(2) {
        padding-left: 20px;
        background: #2d3d88;
        color: #a8c5ff;
        border: 1px solid #2e61c4;
        width: calc(100% - 165px);
        height: 100%;
        display: inline-block;
      }
    }
    .close {
      position: absolute;
      bottom: 20px;
      right: 20px;
      .closeButton {
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
      }
    }
  }
}
</style>
