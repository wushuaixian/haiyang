<template>
  <div class="orderManagement">
    <div class="title"><span></span><span>外部订单管理</span></div>
    <div class="orderManagement_top">
      <ul>
        <li>
          <TitleName>今日订单数</TitleName>
          <p class="orderNumber">126</p>
          <p class="orderNumberBottom">
            <span>周同比</span
            ><img :src="require('@/assets/images/u969.png')" alt="" /><span
              >12%</span
            ><span style="margin-left: 15px">日环比</span>
            <img :src="require('@/assets/images/u973.png')" alt="" /><span
              >11%</span
            >
          </p>
        </li>
        <li>
          <TitleName>订单状态</TitleName>
          <SectorStatistics />
        </li>
        <li>
          <TitleName>订单接收情况</TitleName>
          <AreaMap />
        </li>
      </ul>
    </div>
    <div class="orderManagement_table">
      <div class="orderManagement_table_top">
        <a-row>
          <a-col :lg="8" :xxl="2">
            <a-button class="retry"
              ><img
                :src="require('@/assets/images/autorenew_u1064.svg')"
                alt=""
              />重试</a-button
            ></a-col
          >
          <a-col :lg="8" :xxl="5">
            <a-radio-group v-model:value="statusType" button-style="solid">
              <a-radio-button value="a">全部</a-radio-button>
              <a-radio-button value="b">等待</a-radio-button>
              <a-radio-button value="e">正在执行</a-radio-button>
              <a-radio-button value="c">完成</a-radio-button>
              <a-radio-button value="d">失败</a-radio-button>
            </a-radio-group>
          </a-col>
          <a-col :lg="8" :xxl="5"
            >&nbsp;&nbsp;&nbsp;<span class="userName"
              >用户名称：<input type="text" /></span
          ></a-col>
          <a-col :lg="8" :xxl="5"
            ><span class="userName">父订单号：<input type="text" /></span
          ></a-col>
          <a-col :lg="8" :xxl="5"
            ><span class="userName">订单号：<input type="text" /></span
          ></a-col>
          <a-col :lg="8" :xxl="2">
            <a-button class="retry mixImg"
              ><img :src="require('@/assets/images/search_u1020.svg')" alt=""
            /></a-button>
            <a-button class="retry mixImg" style="margin-left: 10px"
              ><img
                :src="require('@/assets/images/cached_u1026.svg')"
                alt="" /></a-button
          ></a-col>
        </a-row>
      </div>
      <!-- <Table
        @getData="getData"
        :columns="columns"
        :dataSource="dataSource"
        :total="200"
      >
        <template #action="">
          <img
            @click="actionOnclick"
            :src="require('@/assets/images/u1105.svg')"
            style="cursor: pointer"
            alt=""
          />
        </template>
      </Table> -->
      <div class="nestingTable">
        <s-Table
          :columns="columns"
          :data-source="dataScouce"
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          total="200"
        >
          <template #expandedRowRender="{ record }">
            <a-table
              :columns="innerColumns"
              :pagination="false"
              :dataSource="innerData[record.key]"
            >
              <template #action>
                <img
                  @click="actionOnclick"
                  style="cursor: pointer"
                  :src="require('@/assets/images/u1105.svg')"
                  alt=""
                />
              </template>
            </a-table>
          </template>
        </s-Table>
      </div>
      <a-drawer
        placement="right"
        :closable="false"
        :width="351"
        :drawerStyle="{ background: 'rgb(45,61,136)', padding: 0 }"
        :bodyStyle="{ padding: '10px' }"
        v-model:visible="actionVisible"
        :after-visible-change="afterVisibleChange"
      >
        <div class="actionspeed">
          <div class="actionspeed_title">
            <TitleName>详情</TitleName>
            <p>执行进度</p>
          </div>
          <ul>
            <li>
              <div>2021-05-17 15:22</div>
              <div class="circularBox">
                <div class="circular">
                  <div></div>
                </div>
                生成提取任务，任务号：328423
              </div>
            </li>
            <li>
              <div>2021-05-17 15:30</div>
              <div class="circularBox">
                <div class="circular">
                  <div></div>
                </div>
                提取子任务：328423.数据xxxxxx在线
              </div>
            </li>
            <li>
              <div>2021-05-17 15:32</div>
              <div class="circularBox">
                <div class="circular">
                  <div></div>
                </div>
                任务执行完成
              </div>
            </li>
          </ul>
        </div>
      </a-drawer>
    </div>
  </div>
</template>
<script>
import SectorStatistics from "./component/sectorStatistics.vue";
import AreaMap from "./component/areaMap.vue";
import { reactive, ref, toRefs } from "vue";
export default {
  components: {
    SectorStatistics,
    AreaMap,
  },
  setup() {
    const statusType = ref("a");
    const getData = (item) => {
      console.log(item);
    };
    const stats = reactive({
      selectedRowKeys: [],
      columns: [
        { title: "父订单号", dataIndex: "orderNumber", key: "orderNumber" },
        // { title: "数据ID", dataIndex: "dataID", key: "dataID" },
        { title: "用户名称", dataIndex: "userName", key: "userName" },
        { title: "用户单位", dataIndex: "userCompany", key: "userCompany" },
        { title: "状态", dataIndex: "status", key: "status" },
        { title: "接收时间", dataIndex: "receiveTime", key: "receiveTime" },
        { title: "完成时间", dataIndex: "completeTime", key: "completeTime" },
      ],
      dataScouce: [
        {
          key: "one",
          orderNumber: "45457",
          dataID: "1234",
          userName: "admin",
          userCompany: "应用中心",
          status: "等待",
          receiveTime: "2021-02-03 11:30:34",
          completeTime: "2021-02-03 11:30:34",
        },
        {
          key: "two",
          orderNumber: "561357",
          dataID: "2225",
          userName: "admin",
          userCompany: "应用中心",
          status: "等待",
          receiveTime: "2021-02-03 11:30:34",
          completeTime: "2021-02-03 11:30:34",
        },
        {
          key: "three",
          orderNumber: "89745",
          dataID: "6325",
          userName: "admin",
          userCompany: "应用中心",
          status: "等待",
          receiveTime: "2021-02-03 11:30:34",
          completeTime: "2021-02-03 11:30:34",
        },
        {
          key: "five",
          orderNumber: "741258",
          dataID: "5124",
          userName: "admin",
          userCompany: "应用中心",
          status: "等待",
          receiveTime: "2021-02-03 11:30:34",
          completeTime: "2021-02-03 11:30:34",
          children: [
            {
              key: "sssr",
              orderNumber: "12477",
              dataID: "3685",
              userName: "admin",
              userCompany: "应用中心",
              status: "等待",
              receiveTime: "2021-02-03 11:30:34",
              completeTime: "2021-02-03 11:30:34",
            },
          ],
        },
        {
          key: "sssr",
          orderNumber: "745896",
          dataID: "1425",
          userName: "admin",
          userCompany: "应用中心",
          status: "等待",
          receiveTime: "2021-02-03 11:30:34",
          completeTime: "2021-02-03 11:30:34",
        },
      ],
      innerColumns: [
        { title: "订单号", dataIndex: "orderNumber", key: "orderNumber" },
        { title: "数据ID", dataIndex: "dataID", key: "dataID" },
        { title: "状态", dataIndex: "status", key: "status" },
        { title: "开始时间", dataIndex: "receiveTime", key: "receiveTime" },
        { title: "完成时间", dataIndex: "completeTime", key: "completeTime" },
        {
          title: "操作",
          // dataIndex: "action",
          slots: { customRender: "action" },
          key: "action",
        },
      ],
      innerData: {
        one: [
          {
            key: "sssr",
            orderNumber: "128574",
            dataID: "3685",
            userName: "admin",
            userCompany: "应用中心",
            status: "等待",
            receiveTime: "2021-02-03 11:30:34",
            completeTime: "2021-02-03 11:30:34",
          },
          {
            key: "sssr",
            orderNumber: "555555",
            dataID: "1111",
            userName: "admin",
            userCompany: "应用中心",
            status: "等待",
            receiveTime: "2021-02-03 11:30:34",
            completeTime: "2021-02-03 11:30:34",
          },
        ],
        two: [
          {
            key: "ssr",
            orderNumber: "532453",
            dataID: "5315",
            userName: "admin",
            userCompany: "应用中心",
            status: "等待",
            receiveTime: "2021-02-03 11:30:34",
            completeTime: "2021-02-03 11:30:34",
          },
        ],
      },
    });
    const onSelectChange = (selectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      stats.selectedRowKeys = selectedRowKeys;
    };
    const actionVisible = ref(false);
    const actionOnclick = () => {
      actionVisible.value = true;
    };
    return {
      statusType,
      getData,
      ...toRefs(stats),
      actionOnclick,
      actionVisible,
      onSelectChange,
    };
  },
};
</script>
<style lang="scss" scoped>
.orderManagement {
  width: 100%;
  padding: 22px 30px 22px;
  .title {
    margin-bottom: 24px;
    span:nth-child(1) {
      height: 21px;
      background-color: rgba(65, 242, 231, 1);
      border-width: 2px;
      border-style: solid;
      border-color: rgba(15, 189, 178, 1);
      box-shadow: 0px 0px 5px rgb(65, 242, 231);
    }
    span:nth-child(2) {
      font-weight: 700;
      font-style: normal;
      font-size: 16px;
      color: #a8c5ff;
      margin-left: 18px;
    }
  }
  .orderManagement_top {
    padding-top: 2 px;
    height: 200px;
    background: #2d3d88;
    padding-left: 17px;

    ul li {
      float: left;
      padding-left: 16px;
      width: 264px;
      .orderNumber {
        font-size: 60px;
        color: #41f2e7;
        text-align: center;
        font-family: "Arial Normal", "Arial", sans-serif;
        margin: 0;
        line-height: 114px;
      }
      .orderNumberBottom {
        color: rgba(175, 202, 255, 0.996078431372549);
        line-height: 22px;
        padding-left: 12px;
        font-size: 14px;
        img {
          width: 10px;
          height: 11px;
          margin: 0 7px;
        }
      }
      &:nth-child(3) {
        width: calc(100% - 530px);
      }
    }
  }
  .orderManagement_table {
    margin-top: 16px;
    min-height: 570px;
    background: #2d3d88;
    padding: 0 8px;
    .orderManagement_table_top {
      padding: 18px 0;
      .retry {
        width: 83px;
        height: 27px;
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
        .ant-radio-button-wrapper-checked:not(
          .ant-radio-button-wrapper-disabled
        ) {
        background: #5b92ff;
        color: #fff;
      }
      .userName {
        font-size: 14px;
        color: rgba(168, 197, 255, 0.996078431372549);
        input {
          background: url("../../assets/images/u1028.svg");
          background-size: 100% 100%;
          border: none;
          outline: none;
          color: #1b83ed;
          width: 60%;
          height: 32px;
        }
      }
      .mixImg {
        width: 42px;
        padding: 0;
        img {
          margin: 0;
        }
      }
      @media (min-width: 992px) {
        .ant-col-lg-8 {
          margin-top: 5px;
        }
      }
    }
  }
}
/deep/ .ant-drawer-body {
  padding: 0;
}
.actionspeed {
  .actionspeed_title {
    p {
      margin: 0;
      padding-left: 26px;
      margin-top: -10px;
      color: rgba(168, 197, 255, 0.996078);
    }
  }
  ul li {
    display: flex;
    border: 1px solid rgb(52, 74, 194);
    &:hover {
      background: rgb(56, 82, 165);
    }
    div {
      flex: 1;
      padding: 18px 10px;
      line-height: 16px;
      color: #fff;
      text-align: center;
      &:nth-child(1) {
        border-right: 1px solid rgb(52, 74, 194);
      }
    }
  }
}
.nestingTable {
  background: #25337b;
  /deep/.ant-pagination-prev .ant-pagination-item-link,
  /deep/.ant-pagination-next .ant-pagination-item-link,
  /deep/ .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background: #25337b;
    border: 0px solid rgba(91, 146, 255, 1);
  }
  /deep/ .ant-table-tbody > tr {
    background: #25337b;
    color: #a8c5ff;
    & > td {
      border-bottom: 0px solid #3a55a9;
    }
  }
  /deep/ .ant-table-row-expand-icon {
    background: #3663e1;
    border: 1px solid #2f3cb9;
  }
}
/deep/ tr.ant-table-expanded-row td > .ant-table-wrapper {
  margin: 0;
}
/deep/ .ant-table-content {
  border: 10px solid #2d3d88 !important;
  .ant-table-thead > tr > th {
    background: #25337b !important;
  }
}
/deep/ .ant-table-thead > tr > th {
  border: 0px !important;
}
/deep/ .ant-table-tbody > tr.ant-table-row-selected td {
  background: none;
}
.circularBox {
  position: relative;
  .circular {
    position: absolute;
    left: -7px;
    border-radius: 50%;
    width: 15px !important;
    height: 15px !important;
    padding: 0;
    display: flex;
    border: 2px solid #41f2e7 !important;
    justify-content: center;
    align-items: center;
    & > div {
      border-radius: 50%;
      width: 11px;
      padding: 0;
      height: 11px;
      border: 2px solid #2d3d88;
      background: #41f2e7;
    }
  }
}
</style>
