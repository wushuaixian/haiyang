<template>
  <div class="abnormaMonitoring">
    <ul class="taskListOne">
      <li v-for="item in taskList.splice(0, 3)" :key="item.name">
        <p>{{ item.name }}</p>
        <div class="content">
          <div>
            <div>
              <CloseCircleOutlined style="font-size: 28px; color: #a8c5ff" />
            </div>
            <div>
              <p>错误</p>
              <p>{{ item.error }}</p>
            </div>
          </div>
          <div>
            <div>
              <img
                :src="require('@/assets/images/alarm_off_u1650.svg')"
                alt=""
              />
            </div>
            <div>
              <p>超时</p>
              <p>{{ item.overtime }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="taskListOne taskListTwo">
      <li v-for="item in taskList" :key="item.name">
        <p>{{ item.name }}</p>
        <div class="content">
          <div>
            <div>
              <CloseCircleOutlined style="font-size: 28px; color: #a8c5ff" />
            </div>
            <div>
              <p>错误</p>
              <p>{{ item.error }}</p>
            </div>
          </div>
          <div>
            <div>
              <img
                :src="require('@/assets/images/alarm_off_u1650.svg')"
                alt=""
              />
            </div>
            <div>
              <p>超时</p>
              <p>{{ item.overtime }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="tapeLibrary">
      <p class="title">带库异常报警</p>
      <ul>
        <li v-for="item in tapeLibraryList" :key="item.ipAddress">
          <div class="serve">
            <div>
              <img :src="require('@/assets/images/u1828.png')" alt="" />
            </div>
            <div>
              <p>{{ item.serveName }}</p>
              <p>{{ item.ipAddress }}</p>
            </div>
          </div>
          <div class="status">
            <p style="color: #ff4474" v-if="item.status == 1">
              <img
                :src="require('@/assets/images/assignment_late_u2135.svg')"
              />容量即将达到上限
            </p>
            <p style="color: #41f2e7" v-else>
              <img
                :src="require('@/assets/images/assignment_turned_in_u2128.svg')"
              />运行正常
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="diskArray">
      <p class="title">盘阵异常报警</p>
      <ul>
        <li v-for="(item, index) in diskArryList" :key="index + 'disk'">
          <div class="diskArray_left">
            <div class="progressBar">
              <a-progress
                width="58px"
                type="circle"
                trailColor="#25337b"
                strokeWidth="7"
                strokeLinecap="square"
                :stroke-color="{
                  '0%': '#24e9df',
                  '100%': '#ff5f85',
                }"
                status="active"
                :percent="parseInt((item.use / item.total) * 100)"
              />
              <div class="bfb">
                <span>{{ parseInt((item.use / item.total) * 100) }}%</span>
              </div>
            </div>
          </div>
          <div class="diskArray_right">
            <p>华为OceanStor 7000</p>
            <p>
              <span>中心机房</span
              ><span>{{ item.use }}T/{{ item.total }}T</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="serveMonitor">
      s
      <p class="title">服务器监控</p>
      <ul>
        <li v-for="(item, index) in serveMonitorList" :key="index + 'serves'">
          <img :src="require('@/assets/images/airplay_u1836.svg')" alt="" />
          <span>{{ item.ip }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { CloseCircleOutlined } from "@ant-design/icons-vue";
import { reactive, toRefs } from "vue";
export default {
  components: {
    CloseCircleOutlined,
  },
  setup() {
    const state = reactive({
      serveMonitorList: [
        {
          ip: "192.168.1.112",
        },
        {
          ip: "192.168.1.143",
        },
        {
          ip: "192.168.1.109",
        },
        {
          ip: "192.168.1.152",
        },
      ],
      diskArryList: [
        {
          serveName: "华为OceanStor 7000",
          address: "中心机房",
          total: 100,
          use: 90,
        },
        {
          serveName: "华为OceanStor 7000",
          address: "中心机房",
          total: 100,
          use: 90,
        },
        {
          serveName: "华为OceanStor 7000",
          address: "中心机房",
          total: 100,
          use: 90,
        },
        {
          serveName: "华为OceanStor 7000",
          address: "中心机房",
          total: 100,
          use: 90,
        },
        {
          serveName: "华为OceanStor 7000",
          address: "中心机房",
          total: 100,
          use: 90,
        },
      ],
      taskList: [
        {
          name: "带库归档任务",
          error: 41,
          overtime: 123,
        },
        {
          name: "盘阵归档任务",
          error: 0,
          overtime: 0,
        },
        {
          name: "带库提取任务",
          error: 0,
          overtime: 65,
        },
        {
          name: "数据上传任务",
          error: 0,
          overtime: 12,
        },
        {
          name: "远程备份任务",
          error: 0,
          overtime: 2,
        },
        {
          name: "远程恢复任务",
          error: 2,
          overtime: 4,
        },
      ],
      tapeLibraryList: [
        {
          serveName: "SLK8500",
          ipAddress: "192.168.1.10",
          status: 1,
        },
        {
          serveName: "SLK8500",
          ipAddress: "192.168.1.13",
          status: 0,
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
.abnormaMonitoring {
  width: 872px;
  margin: 0 auto;
  .taskListOne {
    margin-bottom: 15px;
    width: 100%;
    li {
      vertical-align: top;
      width: 32%;
      height: 104px;
      background: #2b3b83;
      display: inline-block;
      padding: 0 22px;
      p {
        font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
        font-weight: 700;
        font-style: normal;
        color: #fff;
        font-size: 14px;
        line-height: 38px;
        margin: 0;
      }
      .content {
        height: calc(100% - 38px);
        & > div {
          width: 50%;
          height: 38px;
          display: inline-block;
          padding-left: 24px;
          div {
            display: inline-block;
            width: calc(100% - 30px);
            p {
              margin: 0;
              line-height: 16px;
              font-size: 16px;
              color: #ffffff;
              font-family: "微软雅黑", sans-serif;
              text-align: center;
              &:nth-child(1) {
                font-weight: 700;
                font-style: normal;
                font-size: 14px;
                color: #a8c5ff;
              }
            }
            &:nth-child(1) {
              width: 30px;
              vertical-align: 5px;
              img {
                margin-bottom: 17px;
              }
            }
            &:nth-child(2) {
              margin-top: 4px;
            }
          }
          &:nth-child(1) {
            border-right: 1px solid #455eb5;
          }
          &:nth-child(2) {
            padding-left: 22px;
          }
        }
      }
    }
    li:nth-child(2) {
      margin: 0 2%;
      background: #314695;
    }
  }
  .taskListTwo {
    li {
      background: #314695;
    }
    li:nth-child(2) {
      margin: 0 2%;
      background: #2b3b83;
    }
  }
  .tapeLibrary {
    background: #314695;
    margin-top: 20px;
    padding-bottom: 20px;
    ul li {
      margin: 10px 0;
      width: 50%;
      display: inline-block;
      .serve {
        width: 50%;
        height: 100%;
        display: inline-block;
        div {
          width: 55%;
          display: inline-block;
          &:nth-child(1) {
            width: 45%;
            text-align: right;
          }
        }
        img {
          width: 42px;
          height: 71px;
          vertical-align: -19px;
          margin-left: 38px;
        }
        p {
          margin: 0;
          text-align: center;
          &:nth-child(1) {
            font-size: 16px;
            color: #ffffff;
          }
          &:nth-child(2) {
            font-size: 13px;
            color: #afcaff;
          }
        }
      }
      .status {
        display: inline-block;
        text-align: center;
        width: 50%;
        p {
          width: 100%;
          font-size: 13px;
          line-height: 15px;
          img {
            margin-top: -3px;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .diskArray {
    background: #314695;
    margin-top: 20px;
    ul li {
      display: inline-block;
      width: 33%;
      padding: 0 30px;
      height: 83px;
      overflow: hidden;
      .diskArray_left {
        width: 54px;
        display: inline-block;
        height: 100%;
        vertical-align: top;
      }
      .diskArray_right {
        width: calc(100% - 54px);
        padding-top: 14px;
        text-align: center;
        display: inline-block;
        height: 100%;
        p {
          margin: 0;
          width: 100%;
          color: #ffffff;
          span:nth-child(1) {
            font-size: 13px;
            color: #afcaff;
          }
          span:nth-child(2) {
            font-size: 13px;
            color: #ff4474;
            font-weight: 700;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .serveMonitor {
    background: #314695;
    margin-top: 20px;
    padding: 0 20px;
    padding-bottom: 20px;
    .title {
      padding-left: 0px;
    }
    ul li {
      display: inline-block;
      width: 190px;
      height: 37px;
      line-height: 37px;
      font-size: 13px;
      color: #ffffff;
    }
  }
}
.title {
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
  margin: 0;
  line-height: 38px;
  padding-left: 20px;
}
.progressBar {
  margin-top: 10px;
  width: 54px;
  height: 54px;
  text-align: center;
  // position: absolute;
  .bfb {
    width: 50px;
    height: 50px;
    background: #2d3d88;
    border-radius: 50%;
    position: relative;
    top: -54px;
    left: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 14px;
      color: #41f1e6;
    }
  }
}
</style>
