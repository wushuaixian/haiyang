<template>
  <div class="storageMonitor">
    <div class="diskArray">
      <div class="titleName">
        <img :src="require('../../assets/images/u131.svg')" alt="" />
        <span>盘阵监控</span>
      </div>
      <div class="diskArrayMonirot">
        <ul>
          <li
            v-for="(item, index) in diskArrayMonirotList"
            :key="item"
            :class="
              diskArrayMonirotValue == index ? 'diskArrayMonirotSelect' : ''
            "
            @click="tag(index)"
          >
            {{ item }}
          </li>
        </ul>
        <div class="diskArrayMonirot_right">
          <div
            class="List"
            v-for="(item, index) in currentSpeedPool"
            :key="index + 'jd'"
          >
            <div class="List_top">
              <img src="../../assets/images/u851.png" alt="" />
              <div class="List_bottom">
                <p>{{ item.name }}</p>
                <p>{{ item.address }}</p>
                <p>{{ item.path }}</p>
              </div>
            </div>
            <div class="List_bottom">
              <div class="progress">
                <div
                  :class="{
                    progresswidth: true,
                    colorred: parseInt((item.used / item.total) * 100) >= 90,
                  }"
                  :style="`
                  box-sizing: border-box;
                  border-width: 1px;
                  border-style: solid;
                  width: ${parseInt((item.used / item.total) * 100)}%;
                  border-radius: 4px;
                 `"
                ></div>
              </div>
              <p>
                <span>{{ item.used }}T/{{ item.total }}T</span>
                <span>{{ parseInt((item.used / item.total) * 100) }}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tapeLibraryMonirot">
      <TitleName>带库监控</TitleName>
      <div class="content">
        <ul class="List">
          <li
            v-for="(item, index) in tapeLibraryMonirotList"
            :key="item"
            :class="
              tapeLiLbrarytagValue == index ? 'diskArrayMonirotSelect' : ''
            "
            @click="tapeLiLbrarytag(index)"
          >
            <p>{{ item.name }}</p>
            <p>{{ item.ip }}</p>
          </li>
        </ul>
        <div class="Listcontent">
          <div class="left">
            <div class="progressBar">
              <a-progress
                width="210px"
                type="circle"
                trailColor="#25337b"
                strokeWidth="7"
                strokeLinecap="square"
                :stroke-color="{
                  '0%': '#24e9df',
                  '100%': '#ff4474',
                }"
                status="active"
                :percent="progressBarPercentage"
              />
              <div class="bfb">
                <span>{{ progressBarPercentage }}%</span>
              </div>
              <div class="line"></div>
            </div>
            <p class="fileTotal"><span>归档总量：</span><span>2517TB</span></p>
            <p class="tapeInfo">
              <img :src="require('../../assets/images/u707.svg')" alt="" /><span
                >磁带信息</span
              >
            </p>
            <ul class="tapeInfoList">
              <li>
                <p>总数</p>
                <p>114584</p>
              </li>
              <li>
                <p>在库</p>
                <p>114</p>
              </li>
              <li>
                <p>可用</p>
                <p>674</p>
              </li>
              <li>
                <p>异常</p>
                <p>114584</p>
              </li>
            </ul>
            <p class="tapeInfo">
              <img :src="require('../../assets/images/u707.svg')" alt="" /><span
                >状态描述</span
              >
            </p>
            <ul class="tapeInfoList">
              <li>
                <p>正在执行任务数</p>
                <p>21</p>
              </li>
              <li style="margin-right: 0">
                <p>等待执行任务数</p>
                <p>252323</p>
              </li>
            </ul>
            <div class="link">
              <p>链接</p>
              <p>
                file:///D:/%E5%BC%80%E5%8F%91%E5%AE%9E%E4%BE%8B/bootstrap/UI/argon-design-system-出现异常
              </p>
            </div>
          </div>
          <div class="right">
            <div class="table_top">
              <p class="tapeInfo">
                <img
                  :src="require('../../assets/images/u707.svg')"
                  alt=""
                /><span>驱动器列表</span>
              </p>
              <a-table
                :pagination="false"
                :dataSource="driverData"
                :columns="columns"
              />
            </div>
            <div class="table_bottom">
              <p class="tapeInfo">
                <img
                  :src="require('../../assets/images/u707.svg')"
                  alt=""
                /><span>磁带与任务</span>
              </p>
              <div class="tapesAndTasks">
                <div class="tapesAndTaskleft">
                  <a-table
                    :pagination="false"
                    :dataSource="tapesAndTasksData"
                    :columns="tapesAndTaskscolumns"
                  />
                </div>
                <div class="tapesAndTaskright">
                  <a-table
                    :pagination="false"
                    :scroll="{
                      y: tapesAndTasksDataTwo.length >= 5 ? '300' : '',
                    }"
                    :dataSource="tapesAndTasksDataTwo"
                    :columns="tapesAndTaskscolumnsTwo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
      diskArrayMonirotList: ["高速池", "低速池", "离线池"],
      diskArrayMonirotValue: 0,
      offLineSpeedPool: [],
      highSpeedPool: [
        {
          used: 60,
          total: 100,
          name: "华为OceanStor 9000",
          address: "云泰机房",
          path: "/mudanjiang/test1/dir",
        },
        {
          used: 90,
          total: 100,
          name: "华为OceanStor 9000",
          address: "云泰机房",
          path: "/mudanjiang/test1/dir",
        },
        {
          used: 30,
          total: 100,
          name: "华为OceanStor 9000",
          address: "云泰机房",
          path: "/mudanjiang/test1/dir",
        },
        {
          used: 10,
          total: 100,
          name: "华为OceanStor 9000",
          address: "云泰机房",
          path: "/mudanjiang/test1/dir",
        },
      ],
      lowSpeedPool: [],
      speedPool: ["highSpeedPool", "lowSpeedPool", "offLineSpeedPool"],
      currentSpeedPool: [],
      tapeLibraryMonirotList: [
        {
          name: "SLK8500",
          ip: "192.168.1.10",
        },
        {
          name: "SK2000",
          ip: "192.168.1.12",
        },
      ],
      tapeLiLbrarytagValue: 0,
    });
    state.currentSpeedPool = state.highSpeedPool;
    const tapeLiLbrarytag = (index) => {
      state.tapeLiLbrarytagValue = index;
    };
    const tag = (index) => {
      state.diskArrayMonirotValue = index;
      state.currentSpeedPool = state[state.speedPool[index]];
    };
    const tapeLibraryMonitoringData = reactive({
      progressBarPercentage: 80,
      columns: [
        {
          title: "驱动器",
          dataIndex: "qdq",
          key: "qdq",
        },
        {
          title: "功能",
          dataIndex: "gn",
          key: "gn",
        },
        {
          title: "驱动器状态",
          dataIndex: "qdqzt",
          key: "qdqzt",
        },
        {
          title: "装载转态",
          dataIndex: "zzzt",
          key: "zzzt",
        },
        {
          title: "MSP任务号",
          dataIndex: "rwh",
          key: "rwh",
        },
        {
          title: "任务类型",
          dataIndex: "rwlx",
          key: "rwlx",
        },
      ],
      //驱动器状态 1 检查正在执行的任务状态 2  取等待任务 3 分配任务失败
      driverData: [
        {
          qdq: "驱动器1",
          gn: "R/A",
          qdqzt: 1,
          zzzt: "SH0001",
          rwh: "424523",
          rwlx: "--",
        },
        {
          qdq: "驱动器2",
          gn: "R/A",
          qdqzt: 1,
          zzzt: "SH0001",
          rwh: "424523",
          rwlx: "--",
        },
        {
          qdq: "驱动器3",
          gn: "R/A",
          qdqzt: 1,
          zzzt: "SH0001",
          rwh: "424523",
          rwlx: "--",
        },
        {
          qdq: "驱动器4",
          gn: "R/A",
          qdqzt: 1,
          zzzt: "SH0001",
          rwh: "424523",
          rwlx: "--",
        },
        {
          qdq: "驱动器5",
          gn: "R/A",
          qdqzt: 1,
          zzzt: "SH0001",
          rwh: "424523",
          rwlx: "--",
        },
      ],
      tapesAndTaskscolumns: [
        {
          title: "磁带条码",
          dataIndex: "cdtm",
          key: "cdtm",
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
        },
      ],
      tapesAndTasksData: [
        {
          cdtm: "SH0001",
          status: "在线",
        },
      ],
      tapesAndTaskscolumnsTwo: [
        {
          title: "MSP任务号",
          dataIndex: "rwh",
          key: "rwh",
        },
        {
          title: "状态",

          dataIndex: "status",
          key: "status",
        },
        {
          title: "创建时间",
          dataIndex: "creatmTime",
          key: "creatmTime",
        },
        {
          title: "文件名",
          dataIndex: "fileName",
          key: "fileName",
        },
      ],
      // status 0 挂载 1 离线
      tapesAndTasksDataTwo: [
        {
          rwh: "424523",
          status: 1,
          creatmTime: "2021-05-08 13:18",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
        },
        {
          rwh: "424523",
          status: 1,
          creatmTime: "2021-05-08 13:18",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
        },
        {
          rwh: "424523",
          status: 1,
          creatmTime: "2021-05-08 13:18",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
        },
        {
          rwh: "424523",
          status: 1,
          creatmTime: "2021-05-08 13:18",
          fileName: "GF4_B1_E105.6_N38.8_20180823_L1A0000213501.tar.gz",
        },
      ],
    });
    return {
      ...toRefs(state),
      tag,
      tapeLiLbrarytag,
      ...toRefs(tapeLibraryMonitoringData),
    };
  },
};
</script>
<style lang="scss" scoped>
.diskArray {
  width: 100%;
  padding: 10px;
  background: #2d3d88;
  .titleName {
    width: 100%;
    height: 40px;
    line-height: 40px;
    span {
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      color: #ffffff;
      text-align: left;
      line-height: 18px;
      margin-left: 10px;
    }
  }
  .diskArrayMonirot {
    padding-left: 10px;
    width: 100%;
    display: flex;
    ul {
      width: 107px;
      text-align: center;
      padding: 0;
      li {
        cursor: pointer;
        list-style: none;
        width: 107px;
        height: 39px;
        font-family: "微软雅黑", sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 13px;
        color: #ffffff;
        line-height: 39px;
        text-align: center;
      }
    }
    .diskArrayMonirot_right {
      padding: 20px;
      flex: 1;
      background-color: rgba(37, 51, 123, 1);
      .List {
        height: 135px;
        display: inline-block;
        width: 335px;
        .List_top {
          padding: 0 17px;
          img {
            width: 83px;
            height: 83px;
            vertical-align: -10px;
          }
          .List_bottom {
            width: 218px;
            color: #afcaff;
            display: inline-block;
            p {
              font-size: 13px;
              line-height: 20px;
              margin: 0;
              padding: 0;
            }
            p:nth-child(1) {
              color: #fff;
            }
          }
        }
        .List_bottom {
          padding: 0 17px;
          margin-top: -3px;
          p {
            span {
              font-weight: 700;
              font-style: normal;
              font-size: 13px;
              color: #41f2e7;
            }
            span:nth-child(2) {
              float: right;
            }
          }
          .progress {
            width: 100%;
            height: 7px;
            background: rgb(49, 70, 149);
            border-radius: 4px;
            // overflow: hidden;
            .progresswidth {
              height: 7px;
              border-color: rgba(15, 189, 178, 1);
              background-color: rgba(65, 242, 231, 1);
              box-shadow: 0px 0px 6px rgb(65, 242, 231);
            }
            .colorred {
              box-shadow: 0px 0px 5px rgb(255, 68, 116);
              border-color: rgba(225, 31, 78, 1);
              background-color: rgba(255, 68, 116, 1);
            }
          }
        }
      }
    }
  }
}
.tapeLibraryMonirot {
  width: 100%;
  padding: 10px;
  background: #2d3d88;
  margin-top: 13px;
  .content {
    padding-left: 10px;
    display: flex;
    .List {
      width: 150px;
      list-style: none;
      padding: 0;
      li {
        cursor: pointer;
        width: 150px;
        height: 81px;
        padding-top: 24px;
        p {
          padding: 0;
          padding-left: 30px;
          margin-bottom: 7px;
          font-weight: 700;
          font-style: normal;
          font-size: 13px;
          color: #ffffff;
          line-height: 13px;
        }
        p:nth-child(2) {
          color: #afcaff;
        }
      }
    }
    .Listcontent {
      flex: 1;
      background-color: rgba(37, 51, 123, 1);
      padding: 10px 10px 10px 23px;
      display: flex;
      .left {
        width: 390px;
        .progressBar {
          width: 100%;
          height: 298px;
          text-align: center;
          padding-top: 35px;
          // position: absolute;
          .bfb {
            width: 180px;
            height: 180px;
            background: #2d3d88;
            border-radius: 50%;
            position: relative;
            top: -195px;
            left: 104px;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              font-size: 36px;
              color: #41f1e6;
            }
          }
          .line {
            width: 367px;
            height: 2px;
            background: #2d418f;
            position: relative;
            top: -161px;
            left: 10px;
          }
        }
        .fileTotal {
          width: 100%;
          height: 49px;
          background: rgba(45, 61, 136, 1);
          line-height: 49px;
          padding-left: 15px;

          span:nth-child(1) {
            font-weight: 700;
            font-style: normal;
            font-size: 16px;
            color: #a8c5ff;
            font-family: "微软雅黑", sans-serif;
          }
          span:nth-child(2) {
            font-family: "微软雅黑", sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 20px;
            color: #ffffff;
            margin-left: 10px;
          }
        }
        .tapeInfoList {
          list-style: none;
          display: flex;
          li {
            flex: 1;
            height: 81px;
            margin-right: 19px;
            background: #2d3d88;
            text-align: center;
            padding-top: 20px;
            p {
              margin: 0;
              font-size: 13px;
              color: #a8c5ff;
            }
            p:nth-child(2) {
              font-size: 16px;
              color: #ffffff;
              font-weight: 700;
            }
            &:nth-child(4) {
              background-color: rgba(255, 99, 136, 1);
              margin-right: 0;
              p {
                color: #fff;
              }
            }
          }
        }
        .link {
          padding: 10px 16px;
          background: rgba(45, 61, 136, 1);
          p {
            word-wrap: break-word;
            margin: 0;
            color: #ff4474;
            &:nth-child(2) {
              font-size: 12px;
            }
          }
        }
      }
      .right {
        margin-left: 18px;
        flex: 1;
        .table_top {
          padding: 0 10px 10px 10px;
          background: #2d3d88;
        }
        .table_bottom {
          padding: 0 10px 10px 10px;
          min-height: 407px;
          background: #2d3d88;
          .tapesAndTasks {
            width: 100%;
            display: flex;
            .tapesAndTaskleft {
              width: 283px;
              display: inline-block;
              margin-right: 10px;
            }
            .tapesAndTaskright {
              width: calc(100% - 283px);
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
.diskArrayMonirotSelect {
  border-left: 4px solid rgba(65, 242, 231, 1);
  background-color: rgba(37, 51, 123, 1);
}
.tapeInfo {
  height: 40px;
  margin-top: 13px;
  line-height: 40px;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.988235294117647);
  font-style: normal;
  font-size: 14px;
  img {
    margin-right: 20px;
  }
}
/deep/ .ant-table-thead > tr {
  border: 1px solid #3a55a9;
  height: 39px;
}
/deep/ .ant-table-tbody > tr {
  background: #2d3d88;
  color: #a8c5ff;
  & > td {
    border-bottom: 1px solid #3a55a9;
  }
}
/deep/
  .ant-table-tbody
  > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
  > td {
  background: #2d3d88;
}
/deep/ .ant-table-thead > tr > th {
  border-top: 1px solid #3a55a9;
  border-bottom: 1px solid #3a55a9;
  background: #2d3d88;
  color: #fff;
  padding: 0;
  height: 39px;
  line-height: 39px;
  text-align: center;
  &:first-child {
    border-left: 1px solid #3a55a9;
  }
  &:last-child {
    border-right: 1px solid #3a55a9;
  }
}
/deep/ .ant-table-tbody > tr > td {
  height: 39px;
  line-height: 39px;
  padding: 0;
  text-align: center;
}
</style>
<style lang="scss">
// .ant-table-body {
//   &::-webkit-scrollbar {
//     //整体样式
//     height: 10px;
//     border-radius: 20px;
//   }
//   &::-webkit-scrollbar-thumb {
//     //滑动滑块条样式
//     -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//     // background: #00aaff;
//     background: #2d3d88;
//   }
//   &::-webkit-scrollbar-track {
//     //轨道的样式
//     -webkit-box-shadow: 0;
//     background: #25337b;
//   }
// }
// .ant-table-fixed-header .ant-table-scroll .ant-table-header {
//   background: #2d3d88;
// }
</style>
