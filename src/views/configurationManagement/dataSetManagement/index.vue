<template>
  <div class="storageManagement">
    <BlockTitleName>数据集管理</BlockTitleName>
    <div class="content">
      <p class="titleTip">
        <img
          :src="require('@/assets/images/report_problem_u263.svg')"
          alt=""
        />数据集由接口传入，无法手动添加
      </p>
      <div class="titleSelect">
        <span class="title">卫星：</span>
        <a-select
          default-value=""
          style="width: 260px; height: 32px; background: #212d66"
          :dropdownStyle="{ background: '#2d3d88' }"
        >
          <a-select-option
            v-for="item in satelliteList"
            style="color: #a8c5ff"
            :value="item"
            :key="item"
          >
          </a-select-option>
        </a-select>
      </div>
      <s-Table
        style="margin-top: 14px"
        :dataSource="dataSource"
        :columns="columns"
        :total="200"
      >
        <template #archive="scoped">
          <img
            v-if="scoped.record.archive == 1"
            :src="require('@/assets/images/u1771.svg')"
            alt=""
          />
          <img v-else :src="require('@/assets/images/u141.svg')" alt="" />
        </template>
        <template #remoteDisasterRecovery="scoped">
          <img
            v-if="scoped.record.remoteDisasterRecovery == 1"
            :src="require('@/assets/images/u1771.svg')"
            alt=""
          />
          <img v-else :src="require('@/assets/images/u141.svg')" alt="" />
        </template>
      </s-Table>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      satelliteList: ["HU1C", "HY1D", "HY2B", "HY2D", "GF3"],
      columns: [
        { title: "数据集名称", dataIndex: "dataSetName", key: "dataSetName" },
        {
          title: "所属中心磁带池",
          dataIndex: "centralTapePool",
          key: "centralTapePool",
        },
        {
          title: "所属云泰磁带池",
          dataIndex: "yuntaiTapePool",
          key: "yuntaiTapePool",
        },
        {
          title: "一级在线保存天数",
          dataIndex: "primaryOnline",
          key: "primaryOnline",
        },
        { title: "二级在线保存天数", dataIndex: "twoOnline", key: "twoOnline" },
        {
          title: "是否归档",
          slots: { customRender: "archive" },
          key: "archive",
        },
        {
          title: "是否远程灾备",
          slots: { customRender: "remoteDisasterRecovery" },
          key: "remoteDisasterRecovery",
        },
        {
          title: "归档存储",
          dataIndex: "archivalStorage",
          key: "archivalStorage",
        },
      ],
      dataSource: [
        {
          dataSetName: "中法-SCA-0A产品",
          centralTapePool: "--",
          yuntaiTapePool: "--",
          primaryOnline: "365",
          twoOnline: "--",
          archive: 1,
          remoteDisasterRecovery: 1,
          archivalStorage: "华为OceanStor 9000",
        },
        {
          dataSetName: "中法-SCA-0A产品",
          centralTapePool: "CFOSAT_PRODUCT_ARCHIVE",
          yuntaiTapePool: "--",
          primaryOnline: "365",
          twoOnline: "--",
          archive: 1,
          remoteDisasterRecovery: 0,
          archivalStorage: "华为OceanStor 9000",
        },
        {
          dataSetName: "中法-SCA-0A产品",
          centralTapePool: "CFOSAT_PRODUCT_ARCHIVE",
          yuntaiTapePool: "--",
          primaryOnline: "365",
          twoOnline: "--",
          archive: 0,
          remoteDisasterRecovery: 0,
          archivalStorage: "华为OceanStor 9000",
        },
        {
          dataSetName: "中法-SCA-0A产品",
          centralTapePool: "CFOSAT_PRODUCT_ARCHIVE",
          yuntaiTapePool: "--",
          primaryOnline: "365",
          twoOnline: "--",
          archive: 1,
          remoteDisasterRecovery: 0,
          archivalStorage: "华为OceanStor 9000",
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.storageManagement {
  width: 100%;
  min-height: 800px;
  padding: 20px 30px;
  .content {
    background: #2d3d88;
    padding: 15px;
    .titleTip {
      img {
        margin: 0 10px;
      }
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color: rgba(47, 76, 133, 0.996078431372549);
      line-height: 50px;
      background-color: rgba(222, 233, 255, 1);
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(209, 224, 255, 1);
      border-radius: 2px;
    }
  }
}
.retry {
  width: 83px;
  height: 32px;
  line-height: 32px;
  margin: 0;
  padding: 0;
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
    margin-right: 5px;
    margin-top: -5px;
  }
  &:hover {
    background: #1b83ed;
  }
}
.option {
  img {
    margin: 0 5px;
    cursor: pointer;
  }
}
.titleSelect {
  color: #a8c5ff;
  text-align: right;
  /deep/ .ant-select-selector {
    background: url("../../../assets/images/u522.svg");
    background-size: 100% 100%;
    border: none;
  }
  /deep/ .ant-select-arrow {
    color: #a8c5ff;
  }
}
</style>
