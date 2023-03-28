<template>
  <div class="dataManagement">
    <BlockTitleName>数据管理</BlockTitleName>
    <div class="content">
      <div class="query">
        <a-row>
          <a-col :span="6">
            <span>卫星：</span>
            <a-select
              v-model:value="satellite"
              style="height: 32px; background: #212d66; color: #a8c5ff"
              :dropdownStyle="{ background: '#2d3d88' }"
            >
              <a-select-option
                v-for="item in satelliteList"
                style="color: #a8c5ff"
                :key="item.index"
                :value="item.value"
              >
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="6"
            ><span>数据集：</span>
            <a-select
              default-value=""
              style="height: 32px; background: #212d66; color: #a8c5ff"
              :dropdownStyle="{ background: '#2d3d88' }"
            >
              <a-select-option style="color: #a8c5ff" value="HY1C-A">
                HY1C-A
              </a-select-option>
            </a-select></a-col
          >
          <a-col :span="6"><span>数据ID：</span><input type="text" /></a-col>
          <a-col :span="6"><span>磁带条码：</span><input type="text" /></a-col>
        </a-row>
        <a-row style="margin-top: 10px">
          <a-col :span="6"><span>入库起始时间：</span><a-date-picker /></a-col>
          <a-col :span="6"><span>入库结束时间：</span><a-date-picker /></a-col>
          <a-col :span="6"><span>文件名：</span><input type="text" /></a-col>
          <a-col :span="6"
            ><span class="querybutton">
              <a-button class="retry"
                ><img :src="require('@/assets/images/search_u1020.svg')" alt=""
              /></a-button>
              <a-button class="retry" style="margin-left: 10px"
                ><img
                  :src="require('@/assets/images/cached_u1026.svg')"
                  alt="" /></a-button></span
          ></a-col>
        </a-row>
      </div>
      <div class="table">
        <p>
          <a-button class="retry"
            ><img
              :src="require('@/assets/images/reply_u1751.svg')"
              alt=""
            />数据回迁</a-button
          >
          <!-- <a-button class="retry" style="margin-left: 10px"
            ><img
              :src="require('@/assets/images/cached_u1026.svg')"
              alt=""
            />数据复制</a-button
          > -->
          <a-button class="retry" style="margin-left: 10px"
            ><img
              :src="require('@/assets/images/reply_u1751.svg')"
              alt=""
            />远程回迁</a-button
          >
        </p>
        <s-Table
          :dataSource="dataSource"
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :columns="columns"
          :total="200"
        >
          <template #action="">
            <!-- {{ scoped.record.orderNumber }} -->
            <img
              @click="detailsShow(true)"
              style="cursor: pointer"
              :src="require('@/assets/images/u1105.svg')"
              alt=""
            />
          </template>
          <template #isDisasterRecovery="scoped">
            <div>
              <img
                v-show="scoped.record.isDisasterRecovery == 1"
                :src="require('@/assets/images/u1771.svg')"
                alt=""
              />
              <img
                v-show="scoped.record.isDisasterRecovery == 0"
                :src="require('@/assets/images/u1775.svg')"
                alt=""
              />
            </div>
          </template>
          <template #tapeLibraryStatus="scoped">
            <div>
              <span v-show="scoped.record.tapeLibraryStatus == 1">
                <img
                  :src="require('@/assets/images/u1771.svg')"
                  alt=""
                />在线</span
              >
              <span v-show="scoped.record.tapeLibraryStatus == 0">
                <img
                  :src="require('@/assets/images/u1775.svg')"
                  alt=""
                />离线</span
              >
            </div>
          </template>
          <template #diskArrayStatus="scoped">
            <div>
              <span v-show="scoped.record.diskArrayStatus == 1">
                <img
                  :src="require('@/assets/images/u1771.svg')"
                  alt=""
                />在线</span
              >
              <span v-show="scoped.record.diskArrayStatus == 0">
                <img
                  :src="require('@/assets/images/u1775.svg')"
                  alt=""
                />离线</span
              >
            </div>
          </template>
        </s-Table>
      </div>
    </div>
    <DataDetails
      v-if="detailsVisible"
      @dataDetailClose="detailsVisible = false"
    />
  </div>
</template>
<script>
import { reactive, toRefs } from "@vue/reactivity";
import DataDetails from "./component/dataDetails.vue";
export default {
  components: {
    DataDetails,
  },
  setup() {
    const state = reactive({
      satelliteList: [
        {
          value: "HY1C",
          label: "HY1C",
        },
        {
          value: "AQUA",
          label: "AQUA",
        },
        {
          value: "TERRA",
          label: "TERRA",
        },
        {
          value: "中法卫星",
          label: "中法卫星",
        },
        {
          value: "海洋1C",
          label: "海洋1C",
        },
      ],
      satellite: "",
      selectedRowKeys: [],
      columns: [
        { title: "数据ID", dataIndex: "dataID", key: "dataID", width: 80 },
        { title: "卫星", dataIndex: "satellite", key: "satellite", width: 80 },
        { title: "数据集", dataIndex: "dataSet", key: "dataSet", width: 80 },
        {
          title: "磁带条码",
          dataIndex: "tapeTbarcode",
          key: "tapeTbarcode",
          width: 80,
        },
        {
          title: "是否灾备",
          key: "isDisasterRecovery",
          slots: { customRender: "isDisasterRecovery" },
          width: 80,
        },
        {
          title: "盘阵状态",
          slots: { customRender: "diskArrayStatus" },
          key: "diskArrayStatus",
          width: 80,
        },
        {
          title: "带库状态",
          slots: { customRender: "tapeLibraryStatus" },
          key: "tapeLibraryStatus",
          width: 100,
        },
        {
          title: "入库时间",
          dataIndex: "warehousingTime",
          key: "warehousingTime",
          width: 130,
        },
        {
          title: "文件名",
          dataIndex: "fileName",
          key: "fileName",
          width: 300,
        },
        {
          title: "文件大小",
          dataIndex: "fileSize",
          key: "fileSize",
          width: 100,
        },
        {
          title: "操作",
          dataIndex: "action",
          slots: { customRender: "action" },
          width: 100,
        },
      ],
      dataSource: [
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 1,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 0,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 0,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 1,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 1,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 1,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 1,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 1,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 1,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 1,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
        {
          dataID: "532453",
          satellite: "HY1C",
          dataSet: "HY1C-A",
          tapeTbarcode: "SH0001",
          isDisasterRecovery: 1,
          diskArrayStatus: 1,
          tapeLibraryStatus: 1,
          warehousingTime: "2021-02-03 11:30:34",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
          fileSize: "2G",
        },
      ],
      detailsVisible: false,
    });
    const detailsShow = (value) => {
      state.detailsVisible = value;
    };
    const onSelectChange = (selectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };
    return {
      ...toRefs(state),
      detailsShow,
      onSelectChange,
    };
  },
};
</script>
<style lang="scss" scoped>
.dataManagement {
  width: 100%;
  padding: 22px 30px 22px;
  .content {
    width: 100%;
    background: #2d3d88;
    .query {
      padding: 33px 88px;
      font-size: 14px;
      color: #a8c5ff;
      border: 1px solid #344a9a;
      span {
        width: 100px;
        text-align: right;
        display: inline-block;
      }
      /deep/ .ant-calendar-picker {
        width: calc(100% - 120px);
        input {
          background: #212d66;
          border: 0px;
          color: #a8c5ff;
        }
      }
      /deep/ .ant-select {
        width: calc(100% - 120px);
      }
      /deep/ .ant-select-selector {
        background: url("../../assets/images/u522.svg");
        background-size: 100% 100%;
        border: none;
      }
      /deep/ .ant-select-arrow {
        color: #a8c5ff;
      }
      input {
        width: calc(100% - 120px);
        border-radius: 0;
      }
      .querybutton {
        padding-right: 20px;
        width: 100%;
        .retry {
          width: 43px;
          height: 27px;
          line-height: 17px;
        }
      }
    }
    .table {
      min-height: 640px;

      padding: 0 10px;
      p {
        margin: 15px 0;
        .retry {
          width: 117px;
          height: 27px;
          img {
            margin-right: 12px;
          }
        }
      }
    }
  }
}
.retry {
  width: 83px;
  height: 32px;
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
  &:hover {
    background: #1b83ed;
  }
}
</style>
