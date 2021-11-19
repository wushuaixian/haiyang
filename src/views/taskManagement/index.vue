<template>
  <div class="taskManagement">
    <blockTitleName>任务管理</blockTitleName>
    <div class="taskManagement_top" v-if="false">
      <div class="taskManagement_top_left">
        <TitleName>今日任务数 </TitleName>
        <!-- <span>123</span> -->
      </div>
      <div class="taskManagement_top_middle">
        <TransverseView />
      </div>
      <ul class="taskManagement_top_middle_total">
        <li>1200</li>
        <li>960</li>
        <li>856</li>
        <li>794</li>
        <li>828</li>
        <li>810</li>
      </ul>
      <div class="taskManagement_top_right">
        <TitleName>任务执行情况</TitleName>
        <LineCharts />
      </div>
    </div>
    <div class="taskManagement_bottom" v-if="!detailsShowVisible">
      <ul class="listTables">
        <li
          :class="{ selectTab: selectTab == index }"
          v-for="(item, index) in listTables"
          :key="index"
          @click="selectTab = index"
        >
          {{ item }}
        </li>
      </ul>
      <div class="taskManagement_bottom_query">
        <div class="query_left">
          <a-row>
            <a-col :span="6">
              <span class="title">任务状态：</span>
              <a-select
                v-model:value="taskTypeValue"
                class="select"
                :dropdownStyle="{ background: '#2d3d88' }"
                @change="handleChange"
              >
                <a-select-option
                  v-for="item in taskStatus"
                  :key="item"
                  style="color: #a8c5ff"
                  :value="item"
                >
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="6">
              <span class="title">卫星：</span>
              <a-select
                default-value=""
                class="select"
                :dropdownStyle="{ background: '#2d3d88' }"
                @change="handleChange"
              >
                <a-select-option
                  v-for="item in satelliteList"
                  :key="item"
                  style="color: #a8c5ff"
                  :value="item"
                >
                  {{ item }}</a-select-option
                >
              </a-select>
            </a-col>
            <!-- <a-col :span="5">
            <span class="title">任务类型：</span>
            <a-select
              default-value=""
              style="width: 74% height: 32px; background: #212d66"
              :dropdownStyle="{ background: '#212d66' }"
              @change="handleChange"
            >
              <a-select-option style="" value="jack"> </a-select-option>
            </a-select>
          </a-col> -->
            <a-col :span="6">
              <span class="title">数据集：</span>
              <a-select
                default-value=""
                class="select"
                :dropdownStyle="{ background: '#2d3d88' }"
                @change="handleChange"
              >
                <a-select-option style="color: #a8c5ff" value="环境2A星2级产品	"
                  >环境2A星2级产品</a-select-option
                >
              </a-select>
            </a-col>
            <a-col :span="6"
              ><span class="title">任务号：</span
              ><input style="width: calc(100% - 90px)" type="text"
            /></a-col>
          </a-row>
        </div>
        <div class="query_right">
          <a-button class="retry mixImg"
            ><img :src="require('@/assets/images/search_u1020.svg')" alt=""
          /></a-button>
          <a-button class="retry mixImg" style="margin-left: 10px"
            ><img :src="require('@/assets/images/cached_u1026.svg')" alt=""
          /></a-button>
          <span class="showQueryButton" @click="showQueryfun">{{
            showQuery ? "收起" : "展开"
          }}</span>
        </div>
        <transition name="fade">
          <div v-if="showQuery" class="showQuery">
            <a-row style="margin-top: 10px">
              <a-col
                :span="6"
                v-if="
                  !(
                    selectTab == 0 ||
                    selectTab == 1 ||
                    selectTab == 3 ||
                    selectTab == 4
                  )
                "
                ><span class="title"> 用户名：</span
                ><input style="width: calc(100% - 90px)" type="text"
              /></a-col>
              <a-col :span="6"
                ><span class="title">产品号：</span
                ><input style="width: calc(100% - 90px)" type="text"
              /></a-col>

              <a-col
                :span="6"
                v-if="
                  !(
                    selectTab == 0 ||
                    selectTab == 1 ||
                    selectTab == 3 ||
                    selectTab == 4
                  )
                "
                ><span class="title">订单号：</span
                ><input style="width: calc(100% - 90px)" type="text"
              /></a-col>
              <a-col :span="6"
                ><span class="title">起始时间：</span
                ><input style="width: calc(100% - 90px)" type="text"
              /></a-col>
              <a-col :span="6"
                ><span class="title">结束时间：</span
                ><input style="width: calc(100% - 90px)" type="text"
              /></a-col>
            </a-row>
          </div>
        </transition>
      </div>
      <div class="taskManagement_bottom_table">
        <p class="action">
          <a-button
            class="retry mixImg"
            v-if="
              store.state.buttonJurisdiction.includes('taskManagementRetry')
            "
            ><img
              :src="require('@/assets/images/autorenew_u1064.svg')"
              alt=""
            />重试</a-button
          >
          <a-button
            class="retry mixImg"
            v-if="
              store.state.buttonJurisdiction.includes('taskManagementDelete')
            "
            ><img
              :src="require('@/assets/images/delete_forever_u1319.svg')"
              alt=""
            />删除</a-button
          >
          <a-button
            class="retry mixImg"
            v-if="
              store.state.buttonJurisdiction.includes('taskManagementUrgent')
            "
            ><img
              :src="require('@/assets/images/trending_up_u1322.svg')"
              alt=""
            />加急</a-button
          >
          <a-button
            class="retry mixImg"
            v-if="
              store.state.buttonJurisdiction.includes('taskManagementCancel')
            "
            ><img
              :src="require('@/assets/images/not_interested_u1325.svg')"
              alt=""
            />取消</a-button
          >
        </p>
        <Table
          @getData="getData"
          :columns="columns"
          :dataSource="dataSource"
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :total="200"
        >
          <template #action="scoped">
            {{ scoped.record.orderNumber }}
            <img
              @click="detailsShow"
              style="cursor: pointer"
              :src="require('@/assets/images/u1105.svg')"
              alt=""
            />
          </template>
        </Table>
      </div>
    </div>
    <div v-if="detailsShowVisible" class="taskManagement_bottom_details">
      <div class="taskManagement_bottom_details_content">
        <div>
          <p>
            <img :src="require('@/assets/images/u1513.png')" alt="" /><span
              class="left"
              >任务号：2342310294311</span
            ><span class="right">
              <a-button class="retry mixImg"
                ><img
                  :src="require('@/assets/images/autorenew_u1064.svg')"
                  alt=""
                />重试</a-button
              >
              <a-button class="retry mixImg"
                ><img
                  :src="require('@/assets/images/delete_forever_u1319.svg')"
                  alt=""
                />删除</a-button
              >
              <a-button class="retry mixImg"
                ><img
                  :src="require('@/assets/images/trending_up_u1322.svg')"
                  alt=""
                />加急</a-button
              >
              <a-button class="retry mixImg"
                ><img
                  :src="require('@/assets/images/not_interested_u1325.svg')"
                  alt=""
                />取消</a-button
              ></span
            >
          </p>
          <a-row class="row">
            <a-col :span="6"><span>卫星：</span>HY1A</a-col>
            <a-col :span="6"><span>任务类型：</span>元数据更新</a-col>
            <a-col :span="6"><span>创建时间：</span>2021-02-18 16:31:29 </a-col>
            <a-col :span="6"><span>订单号：</span>2453443 </a-col>
            <a-col :span="6"><span>状态：</span>进行中 </a-col>
            <a-col :span="6"><span>产品类型：</span>环境2A星2级产品 </a-col>
            <a-col :span="6"><span>开始时间：</span>2021-02-18 16:31:29</a-col>
            <a-col :span="6"><span>产品号：</span>532453</a-col>
            <a-col :span="6"><span>优先级：</span>普通</a-col>
            <a-col :span="6"><span>执行节点：</span> 192.168.1.1 </a-col>
            <a-col :span="6"><span>结束时间：</span>2021-02-18 16:31:29</a-col>
          </a-row>
          <Table
            :columns="detailscolumns"
            :dataSource="detailsdataSource"
            :total="200"
            :scroll="{ y: 1200 }"
          >
            <template #dataId="scoped">
              <span
                style="color: #41f2e7; cursor: pointer"
                @click="dataDetails(scoped)"
              >
                {{ scoped.record.dataId }}</span
              >
            </template>
          </Table>
        </div>
      </div>
      <div class="return" @click="detailsShow">
        <img :src="require('../../assets/images/u1609.svg')" alt="" />
      </div>
    </div>
    <DataDetails v-if="dataDetailsVisible" @dataDetailClose="dataDetailClose" />
  </div>
</template>
<script>
import DataDetails from "./component/dataDetails.vue";
import BlockTitleName from "@/components/blockTitleName";
import TransverseView from "./component/transverseView.vue";
import LineCharts from "./component/lineCharts.vue";
import Table from "@/components/table/";
import { onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    BlockTitleName,
    TransverseView,
    LineCharts,
    Table,
    DataDetails,
  },
  setup() {
    const showQuery = ref(false);
    const store = useStore();
    const showQueryfun = () => {
      showQuery.value = !showQuery.value;
    };
    const columns = [
      { title: "任务号", dataIndex: "taskNumber", key: "taskNumber" },
      { title: "卫星", dataIndex: "satellite", key: "satellite" },
      { title: "任务类型", dataIndex: "taskType", key: "taskType" },
      { title: "数据集", dataIndex: "productType", key: "productType" },
      { title: "产品号", dataIndex: "productNumber", key: "productNumber" },
      { title: "优先级", dataIndex: "priority", key: "priority" },
      { title: "状态", dataIndex: "status", key: "status" },
      { title: "创建时间", dataIndex: "createTime", key: "createTime" },
      { title: "开始时间", dataIndex: "startTime", key: "startTime" },
      { title: "结束时间", dataIndex: "endTime", key: "endTime" },
      { title: "订单号", dataIndex: "orderNumber", key: "orderNumber" },
      { title: "执行节点", dataIndex: "executionNode", key: "executionNode" },
      {
        title: "操作",
        dataIndex: "action",
        slots: { customRender: "action" },
      },
    ];
    const dataSource = ref([
      {
        taskNumber: "532453",
        satellite: "HY1A",
        taskType: "元数据更新",
        productType: "环境2A星2级产品",
        productNumber: "532453",
        priority: "普通",
        status: "等待",
        createTime: "2021-02-03 11:30:34",
        startTime: "2021-02-03 11:30:34",
        endTime: "2021-02-03 11:30:34",
        orderNumber: "",
        executionNode: "",
      },
      {
        taskNumber: "532453",
        satellite: "HY1A",
        taskType: "元数据更新",
        productType: "环境2A星2级产品",
        productNumber: "532453",
        priority: "普通",
        status: "等待",
        createTime: "2021-02-03 11:30:34",
        startTime: "2021-02-03 11:30:34",
        endTime: "2021-02-03 11:30:34",
        orderNumber: "",
        executionNode: "",
      },
      {
        taskNumber: "532453",
        satellite: "HY1A",
        taskType: "元数据更新",
        productType: "环境2A星2级产品",
        productNumber: "532453",
        priority: "普通",
        status: "等待",
        createTime: "2021-02-03 11:30:34",
        startTime: "2021-02-03 11:30:34",
        endTime: "2021-02-03 11:30:34",
        orderNumber: "",
        executionNode: "",
      },
      {
        taskNumber: "532453",
        satellite: "HY1A",
        taskType: "元数据更新",
        productType: "环境2A星2级产品",
        productNumber: "532453",
        priority: "普通",
        status: "等待",
        createTime: "2021-02-03 11:30:34",
        startTime: "2021-02-03 11:30:34",
        endTime: "2021-02-03 11:30:34",
        orderNumber: "",
        executionNode: "",
      },
    ]);
    const detailsShowVisible = ref(false);
    const detailsShow = () => {
      detailsShowVisible.value = !detailsShowVisible.value;
    };
    const state = reactive({
      taskTypeValue: "",
      selectedRowKeys: [],
      satelliteList: ["HY1C", "AQUA", "TERRA", "中法卫星", "海洋1C"],
      taskStatus: ["等待", "正在执行", "完成", "失败"],
      selectTab: 0,
      detailscolumns: [
        { title: "子任务号", dataIndex: "subtaskNumber", key: "subtaskNumber" },
        { title: "数据ID", slots: { customRender: "dataId" }, key: "dataId" },
        { title: "卫星", dataIndex: "satellite", key: "satellite" },
        { title: "任务类型", dataIndex: "taskType", key: "taskType" },
        { title: "状态", dataIndex: "status", key: "status" },
        { title: "开始时间", dataIndex: "createTime", key: "createTime" },
        { title: "结束时间", dataIndex: "endTime", key: "endTime" },
        { title: "错误描述", dataIndex: "errorDescribe", key: "errorDescribe" },
      ],
      detailsdataSource: [
        {
          subtaskNumber: "111111",
          dataId: "4352242",
          satellite: "HJ2B",
          taskType: "RESTORE",
          status: "等待",
          createTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          errorDescribe: "--",
        },
        {
          subtaskNumber: "111111",
          dataId: "4352242",
          satellite: "HJ2B",
          taskType: "RESTORE",
          status: "等待",
          createTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          errorDescribe: "--",
        },
        {
          subtaskNumber: "111111",
          dataId: "4352242",
          satellite: "HJ2B",
          taskType: "RESTORE",
          status: "等待",
          createTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          errorDescribe: "--",
        },
        {
          subtaskNumber: "111111",
          dataId: "4352242",
          satellite: "HJ2B",
          taskType: "RESTORE",
          status: "等待",
          createTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          errorDescribe: "--",
        },
      ],
      listTables: [
        "带库归档",
        "盘阵归档",
        "带库提取",
        "远程备份",
        "远程恢复",
        "数据上传",
      ],
    });
    const dataDetail = reactive({
      dataDetailsVisible: false,
    });

    const dataDetails = () => {
      dataDetail.dataDetailsVisible = true;
    };
    const dataDetailClose = () => {
      dataDetail.dataDetailsVisible = false;
    };
    const onSelectChange = (selectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };
    onMounted(() => {
      console.log(
        store.state.buttonJurisdiction.includes("taskManagementRetry")
      );
    });
    return {
      showQuery,
      showQueryfun,
      columns,
      dataSource,
      detailsShowVisible,
      detailsShow,
      ...toRefs(state),
      ...toRefs(dataDetail),
      dataDetails,
      dataDetailClose,
      onSelectChange,
      store,
    };
  },
};
</script>
<style lang="scss" scoped>
.taskManagement {
  width: 100%;
  min-height: 800px;
  padding: 22px 30px 22px;
  color: #a8c5ff;
  .taskManagement_top {
    padding-left: 16px;
    width: 100%;
    background: #2d3d88;
    display: flex;
    height: 194px;
    .taskManagement_top_left {
      display: inline-block;
      vertical-align: top;
      width: 140px;
      height: 100%;

      span {
        text-align: center;
        font-size: 48px;
        color: #41f2e7;
        line-height: 117px;
        overflow: hidden; /*溢出部分消失*/
        white-space: nowrap; /*文本不换行显示*/
        text-overflow: ellipsis;
        display: inline-block;
        width: 140px;
      }
    }
    .taskManagement_top_middle {
      display: inline-block;
      width: 404px;
      height: 100%;
      margin-left: -142px;
    }
    .taskManagement_top_middle_total {
      display: inline-block;
      height: 100%;
      margin-top: 59px;
      font-size: 10px;
      margin-left: -5px;
      li {
        line-height: 19px;
        color: #41f2e7;
      }
    }
    .taskManagement_top_right {
      flex: 1;
    }
  }
  .taskManagement_bottom {
    min-height: 795px;
    background: #2d3d88;
    margin-top: 16px;
    padding-top: 10px;
    .listTables {
      width: 100%;
      line-height: 30px;
      font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
      font-weight: 600;
      height: 42px;
      margin-bottom: 19 px;
      border-bottom: 1px solid #344a9a;
      li {
        float: left;
        width: 100px;
        text-align: center;
        cursor: pointer;
        height: 41px;
        color: #fff;
      }
    }
    .taskManagement_bottom_query {
      .query_left {
        width: 80%;
        display: inline-block;
      }
      .query_right {
        width: 20%;
        display: inline-block;
      }
      border-bottom: 1px solid #344a9a;
      span {
        display: inline-block;
        width: 70px;
        text-align: right;
      }
      .showQueryButton {
        width: 47px;
        cursor: pointer;
        color: #a8c5ff;
      }
      padding: 0 20px;
      padding-bottom: 20px;
      /deep/ .ant-select {
        width: calc(100% - 90px);
      }
      /deep/ .ant-select-selector {
        background: url("../../assets/images/u522.svg");
        background-size: 100% 100%;
        border: none;
      }
      /deep/ .ant-select-arrow {
        color: #a8c5ff;
      }
      .title {
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        color: rgba(168, 197, 255, 0.996078431372549);
      }
    }
    .taskManagement_bottom_table {
      padding: 0 10px;
      .action {
        line-height: 27px;
        margin: 15px 0;
        .retry {
          width: 83px;
          height: 27px;
          margin-right: 5px;
          img {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .taskManagement_bottom_details {
    background: #2d3d88;
    width: 100%;
    min-height: 720px;
    margin-top: 16px;
    .taskManagement_bottom_details_content {
      width: 66%;
      height: 100%;
      margin: 0 auto;
      padding-top: 50px;

      p {
        line-height: 20px;
        & > img {
          width: 28px;
          vertical-align: -8px;
          margin-right: 10px;
        }
        .left {
          font-size: 20px;
          color: #ffffff;
          font-weight: 700;
        }
        .right {
          float: right;
          img {
            width: 12px;
            margin-right: 10px;
          }
          .retry {
            margin-right: 10px;
            width: 83px;
            height: 27px;
          }
        }
      }
      .row {
        margin: 20px 0;
        /deep/ .ant-col {
          span {
            width: 100px;
            display: inline-block;
            text-align: right;
          }
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          line-height: 30px;
          color: #a8c5ff;
        }
      }
      /deep/.ant-table-fixed-header .ant-table-scroll .ant-table-header {
        background: #25337b;
        border: 0px;
      }
      /deep/
        .ant-table-tbody
        > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
        > td {
        background: #25337b;
      }
      /deep/ .ant-table-tbody > tr {
        background: #25337b;
      }
      /deep/ .ant-table-thead > tr > th {
        border-top: 1px solid #3a55a9;
        border-bottom: 1px solid #3a55a9;
        background: #25337b;
        &:first-child {
          border-left: 1px solid #3a55a9;
        }
        &:last-child {
          border-right: 1px solid #3a55a9;
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
.mixImg {
  width: 42px;
  padding: 0;
  img {
    margin: 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  height: 0 !important;
}
.showQuery {
  height: 84px;
  width: 80%;
  overflow: hidden;
  .ant-col-6 {
    margin-bottom: 10px;
  }
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
.selectTab {
  border-bottom: 2px solid #41f2e7;
  color: #3aefe7 !important;
}
.select {
  width: 74%;
  height: 32px;
  background: #212d66;
  color: #a8c5ff;
}
</style>
