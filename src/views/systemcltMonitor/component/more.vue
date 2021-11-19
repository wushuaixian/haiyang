<template>
  <div class="more">
    <div class="content">
      <TitleName>更多</TitleName>
      <p style="text-align: center">
        <a-range-picker v-model:value="value3" :ranges="ranges">
          <template #suffixIcon>
            <img :src="require('@/assets/images/u595.png')" alt="" />
          </template>
        </a-range-picker>
      </p>
      <div>
        <s-Table
          :dataSource="dataSource"
          :columns="columns"
          :paginationVisible="false"
        >
          <template #wait="scoped">
            <span style="cursor: pointer" @click="goTask(scoped)">
              {{ scoped.record.wait }}</span
            >
          </template>
          <template #executing="scoped">
            <span style="cursor: pointer" @click="goTask(scoped)">
              {{ scoped.record.executing }}</span
            >
          </template>
          <template #success="scoped">
            <span style="cursor: pointer" @click="goTask(scoped)">
              {{ scoped.record.success }}</span
            >
          </template>
          <template #faild="scoped">
            <span style="cursor: pointer" @click="goTask(scoped)">
              {{ scoped.record.faild }}</span
            >
          </template>
        </s-Table>
      </div>
      <a-button class="button" @click="$emit('close')">关闭</a-button>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
export default {
  components: {},
  setup() {
    const router = useRouter();
    const state = reactive({
      value3: [moment(), moment()],
      ranges: {
        今天: [moment(), moment()],
        这个月: [moment(), moment().endOf("month")],
      },
      columns: [
        {
          title: "卫星",
          dataIndex: "satellite",
          key: "satellite",
        },
        {
          title: "等待",
          slots: { customRender: "wait" },
          key: "wait",
        },
        {
          title: "正在执行",
          slots: { customRender: "executing" },
          key: "executing",
        },
        {
          title: "完成",
          slots: { customRender: "success" },
          key: "success",
        },
        {
          title: "失败",
          slots: { customRender: "faild" },
          key: "faild",
        },
      ],
      dataSource: [
        {
          satellite: "HU1C",
          wait: "234",
          executing: 67,
          success: "575",
          faild: "46",
        },
        {
          satellite: "HY1D",
          wait: "234",
          executing: 67,
          success: "575",
          faild: "46",
        },
        {
          satellite: "HY2B",
          wait: "234",
          executing: 67,
          success: "575",
          faild: "46",
        },
        {
          satellite: "HY2D",
          wait: "234",
          executing: 67,
          success: "575",
          faild: "46",
        },
        {
          satellite: "GF3",
          wait: "234",
          executing: 67,
          success: "575",
          faild: "46",
        },
        {
          satellite: "HU1C",
          wait: "234",
          executing: 67,
          success: "575",
          faild: "46",
        },
      ],
    });
    const goTask = () => {
      router.push({ name: "taskManagement" });
    };
    return {
      ...toRefs(state),
      goTask,
    };
  },
};
</script>
<style lang="scss" scoped>
.more {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    position: relative;
    width: 764px;
    height: 579px;
    background: #2d3d88;
    padding: 0 15px;
    /deep/ .ant-calendar-picker-input.ant-input {
      background: #212d66;
      border: 1px solid#414F93;
      color: #a8c5ff;
    }
    /deep/ input {
      border: 0px;
      color: #a8c5ff;
      background: none;
    }
  }
}
.button {
  width: 83px;
  height: 32px;
  position: absolute;
  margin: 0;
  padding: 0;
  display: inline-block;
  border: 1px solid rgba(91, 146, 255, 1);
  border-radius: 2 px;
  background-color: rgba(45, 61, 136, 1);
  text-align: center;
  color: #fff;
  font-size: 14px;
  bottom: 20px;
  right: 25px;
  line-height: 18px;
  cursor: pointer;
  &:hover {
    background: #1b83ed;
  }
}
</style>
