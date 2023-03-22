<template>
  <div class="thinkMonitor">
    <div class="titleSelect">
      <span class="title">卫星：</span>
      <a-select
        default-value=""
        class="select"
        :dropdownStyle="{ background: '#2d3d88' }"
      >
        <a-select-option
          v-for="item in satelliteList"
          style="color: #a8c5ff"
          :value="item"
          :key="item"
        >
          {{ item }}</a-select-option
        >
      </a-select>
    </div>
    <div class="historgrams">
      <div>
        <Historgram
          style="margin-left: 0"
          :timeArray="datalist[0].timeArray"
          :dataNumber="datalist[0].dataNumber"
          :params="datalist[0].params"
          title="盘阵归档"
          @moreVisible="moreVisibefunc(1)"
        />
        <Historgram
          :timeArray="datalist[1].timeArray"
          :dataNumber="datalist[1].dataNumber"
          :params="datalist[1].params"
          @moreVisible="moreVisibefunc(1)"
          title="带库归档"
        />
        <Historgram
          :timeArray="datalist[2].timeArray"
          :dataNumber="datalist[2].dataNumber"
          :params="datalist[2].params"
          @moreVisible="moreVisibefunc(1)"
          title="远程备份"
        />
      </div>
      <div class="middle">
        <div class="intranetOrder" style="margin-right: 11px">
          <TitleName>内网订单</TitleName>
          <ul>
            <li>
              <div class="intranetOrderOneLine">
                <p>订单总量</p>
                <p>{{ intranetOrder[0].total }}</p>
              </div>
              <img :src="require('@/assets/images/u353.svg')" alt="" />
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/query_builder_u178.svg')"
                    alt=""
                  />
                </p>
                <p>等待</p>
                <p>{{ intranetOrder[0].wait }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/cached_u173.svg')"
                    alt=""
                  />
                </p>
                <p>正在执行</p>
                <p>{{ intranetOrder[0].executing }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img :src="require('@/assets/images/done_u184.svg')" alt="" />
                </p>
                <p>完成</p>
                <p>{{ intranetOrder[0].success }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/report_problem_u188.svg')"
                    alt=""
                  />
                </p>
                <p>失败</p>
                <p>{{ intranetOrder[0].faild }}</p>
              </div>
            </li>
            <li>
              <div>在线提取</div>
              <img :src="require('@/assets/images/u353.svg')" alt="" />
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/query_builder_u178.svg')"
                    alt=""
                  />
                </p>
                <p>等待</p>
                <p>{{ intranetOrder[1].wait }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/cached_u173.svg')"
                    alt=""
                  />
                </p>
                <p>正在执行</p>
                <p>{{ intranetOrder[1].executing }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img :src="require('@/assets/images/done_u184.svg')" alt="" />
                </p>
                <p>完成</p>
                <p>{{ intranetOrder[1].success }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/report_problem_u188.svg')"
                    alt=""
                  />
                </p>
                <p>失败</p>
                <p>{{ intranetOrder[1].faild }}</p>
              </div>
            </li>
            <li>
              <div>离线提取</div>
              <img :src="require('@/assets/images/u353.svg')" alt="" />
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/query_builder_u178.svg')"
                    alt=""
                  />
                </p>
                <p>等待</p>
                <p>{{ intranetOrder[2].wait }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/cached_u173.svg')"
                    alt=""
                  />
                </p>
                <p>正在执行</p>
                <p>{{ intranetOrder[2].executing }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img :src="require('@/assets/images/done_u184.svg')" alt="" />
                </p>
                <p>完成</p>
                <p>{{ intranetOrder[2].success }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/report_problem_u188.svg')"
                    alt=""
                  />
                </p>
                <p>失败</p>
                <p>{{ intranetOrder[2].faild }}</p>
              </div>
            </li>
            <li>
              <div>数据上传</div>
              <img :src="require('@/assets/images/u353.svg')" alt="" />
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/query_builder_u178.svg')"
                    alt=""
                  />
                </p>
                <p>等待</p>
                <p>{{ intranetOrder[3].wait }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/cached_u173.svg')"
                    alt=""
                  />
                </p>
                <p>正在执行</p>
                <p>{{ intranetOrder[3].executing }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img :src="require('@/assets/images/done_u184.svg')" alt="" />
                </p>
                <p>完成</p>
                <p>{{ intranetOrder[3].success }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/report_problem_u188.svg')"
                    alt=""
                  />
                </p>
                <p>失败</p>
                <p>{{ intranetOrder[3].faild }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="intranetOrder" style="float: right">
          <TitleName>外网分发</TitleName>
          <ul>
            <li>
              <div class="intranetOrderOneLine">
                <p>订单总量</p>
                <p>{{ internetDistribution[0].total }}</p>
              </div>
              <img :src="require('@/assets/images/u353.svg')" alt="" />
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/query_builder_u178.svg')"
                    alt=""
                  />
                </p>
                <p>等待</p>
                <p>{{ internetDistribution[0].wait }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/cached_u173.svg')"
                    alt=""
                  />
                </p>
                <p>正在执行</p>
                <p>{{ internetDistribution[0].executing }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img :src="require('@/assets/images/done_u184.svg')" alt="" />
                </p>
                <p>完成</p>
                <p>{{ internetDistribution[0].success }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/report_problem_u188.svg')"
                    alt=""
                  />
                </p>
                <p>失败</p>
                <p>{{ internetDistribution[0].faild }}</p>
              </div>
            </li>
            <li>
              <div>离线提取</div>
              <img :src="require('@/assets/images/u353.svg')" alt="" />
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/query_builder_u178.svg')"
                    alt=""
                  />
                </p>
                <p>等待</p>
                <p>{{ internetDistribution[1].wait }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/cached_u173.svg')"
                    alt=""
                  />
                </p>
                <p>正在执行</p>
                <p>{{ internetDistribution[1].executing }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img :src="require('@/assets/images/done_u184.svg')" alt="" />
                </p>
                <p>完成</p>
                <p>{{ internetDistribution[1].success }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/report_problem_u188.svg')"
                    alt=""
                  />
                </p>
                <p>失败</p>
                <p>{{ internetDistribution[1].faild }}</p>
              </div>
            </li>
            <li>
              <div>数据拷贝</div>
              <img :src="require('@/assets/images/u353.svg')" alt="" />
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/query_builder_u178.svg')"
                    alt=""
                  />
                </p>
                <p>等待</p>
                <p>{{ internetDistribution[2].wait }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/cached_u173.svg')"
                    alt=""
                  />
                </p>
                <p>正在执行</p>
                <p>{{ internetDistribution[2].executing }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img :src="require('@/assets/images/done_u184.svg')" alt="" />
                </p>
                <p>完成</p>
                <p>{{ internetDistribution[2].success }}</p>
              </div>
              <div class="statuslist">
                <p>
                  <img
                    :src="require('@/assets/images/report_problem_u188.svg')"
                    alt=""
                  />
                </p>
                <p>失败</p>
                <p>{{ internetDistribution[2].faild }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="InternetDistribution">
          <TitleName>任务量趋势图</TitleName>
          <div class="InternetDistribution_bottom">
            <ul>
              <li
                @click="changeTrendChartValue(1)"
                :class="{ trendChart: trendChartType == 1 }"
              >
                盘阵归档
              </li>
              <li
                @click="changeTrendChartValue(2)"
                :class="{ trendChart: trendChartType == 2 }"
              >
                带库归档
              </li>
              <li
                @click="changeTrendChartValue(3)"
                :class="{ trendChart: trendChartType == 3 }"
              >
                提取任务
              </li>
            </ul>
            <div class="InternetDistribution_bottom_right">
              <InternetDistribution :dataObj="InternetDistributionData" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <More v-if="moreVisible" @close="moreVisible = false" />
  </div>
</template>
<script>
import InternetDistribution from "./component/internetDistribution.vue";
import Historgram from "./component/histogram.vue";
import { reactive, toRefs, ref } from "vue";
import More from "./component/more.vue";
export default {
  components: {
    Historgram,
    InternetDistribution,
    More,
  },
  setup() {
    const state = reactive({
      satelliteList: ["HU1C", "HY1D", "HY2B", "HY2D", "GF3"],
      intranetOrder: [
        {
          total: 47000,
          wait: 12434,
          executing: 68,
          success: 34433,
          faild: 65,
        },
        {
          wait: 1342,
          executing: 32,
          success: 22974,
          faild: 43,
        },
        {
          wait: 11092,
          executing: 32,
          success: 11459,
          faild: 14,
        },
        {
          wait: 12434,
          executing: 4,
          success: 34433,
          faild: 8,
        },
      ],
      internetDistribution: [
        {
          total: 106193,
          wait: 2341,
          executing: 92372,
          success: 11459,
          faild: 21,
        },
        {
          wait: 2110,
          executing: 12342,
          success: 3238,
          faild: 0,
        },
        {
          wait: 2341,
          executing: 37568,
          success: 1456,
          faild: 21,
        },
      ],
      datalist: [
        {
          timeArray: [
            "2021-05-01",
            "2021-05-02",
            "2021-05-03",
            "2021-05-04",
            "2021-05-05",
            "2021-05-06",
            "2021-05-07",
          ],
          dataNumber: [120, 250, 150, 80, 70, 110, 130],
          params: {
            total: 2341,
            wait: 341,
            executing: 972,
            success: 459,
            faild: 21,
          },
        },
        {
          timeArray: [
            "2021-05-01",
            "2021-05-02",
            "2021-05-03",
            "2021-05-04",
            "2021-05-05",
            "2021-05-06",
            "2021-05-07",
          ],
          dataNumber: [120, 250, 150, 80, 70, 110, 130],
          params: {
            total: 733,
            wait: 241,
            executing: 372,
            success: 119,
            faild: 1,
          },
        },
        {
          timeArray: [
            "2021-05-01",
            "2021-05-02",
            "2021-05-03",
            "2021-05-04",
            "2021-05-05",
            "2021-05-06",
            "2021-05-07",
          ],
          dataNumber: [120, 250, 150, 80, 70, 110, 130],
          params: {
            total: 232,
            wait: 41,
            executing: 32,
            success: 159,
            faild: 0,
          },
        },
      ],
      InternetDistributionData: {
        timeList: [
          "06-01",
          "06-02",
          "06-03",
          "06-04",
          "06-05",
          "06-06",
          "06-07",
          "06-01",
          "06-02",
          "06-03",
          "06-04",
          "06-05",
          "06-06",
          "06-07",
        ],
        dataList: [
          150, 230, 224, 218, 135, 147, 260, 150, 230, 224, 218, 135, 147, 260,
        ],
      },
      moreVisible: false,
    });
    let trendChartType = ref(1);
    const changeTrendChartValue = (value) => {
      trendChartType.value = value;
    };
    const moreVisibefunc = () => {
      state.moreVisible = true;
    };
    return {
      ...toRefs(state),
      trendChartType,
      changeTrendChartValue,
      moreVisibefunc,
    };
  },
};
</script>
<style lang="scss" scoped>
.thinkMonitor {
  .title {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgba(168, 197, 255, 0.996078431372549);
  }
  .titleSelect {
    text-align: right;
    /deep/ .ant-select-selector {
      background: url("../../assets/images/u522.svg");
      background-size: 100% 100%;
      border: none;
    }
    /deep/ .ant-select-arrow {
      color: #a8c5ff;
    }
  }
  .historgrams {
    margin-top: 17px;
    // & > div > div {
    //   text-align: initial;
    // }
    // & > div > div:nth-child(1) {
    //   float: left;
    // }
    // & > div > div:nth-child(3) {
    //   margin-right: 0px;
    //   float: right;
    //   &::before {
    //     content: "";
    //     clear: both;
    //   }
    // }
  }
  // @media only screen and (max-width: 1079px) {
  //   .historgrams {
  //     & > div > div {
  //       text-align: initial;
  //     }
  //     & > div > div:nth-child(1) {
  //       float: initial;
  //     }
  //     & > div > div:nth-child(3) {
  //       margin-right: 5px;
  //       float: initial;
  //       &::after {
  //         content: "";
  //         clear: both;
  //       }
  //     }
  //   }
  // }
  .middle {
    width: 100%;
    .intranetOrder {
      vertical-align: top;
      padding: 0 20px;
      display: inline-block;
      width: 49.5%;
      height: 521px;
      background: #314695;
      ul {
        li {
          padding: 0 50px;
          width: 100%;
          height: 109px;
          margin: 5px auto;
          background: #2b3b83;
          &:nth-child(1) {
            background: none;
          }
          div:nth-child(1) {
            width: 95px;
            height: 75px;
            line-height: 75px;
            font-weight: 700;
            font-style: normal;
            font-size: 15px;
            color: #a8c5ff;
            margin-top: 18px;
            display: inline-block;
            vertical-align: top;
          }
          .intranetOrderOneLine {
            padding-top: 12px;
            p {
              margin: 0;
            }
            p:nth-child(1) {
              height: 17px;
              line-height: 17px;
              font-weight: 700;
              font-style: normal;
              font-size: 13px;
              color: #a8c5ff;
            }
            p:nth-child(2) {
              height: 33px;
              line-height: 33px;
              font-weight: 400;
              font-style: normal;
              font-size: 25px;
              color: #ffffff;
              margin-left: -27px;
              text-align: center;
              width: 100px;
              margin-top: 8px;
            }
          }
          img {
            vertical-align: -8px;
          }
          .statuslist {
            width: 18%;
            height: 103px;
            display: inline-block;
            text-align: center;
            padding-top: 10px;
            p {
              margin: 6px 0;
              &:nth-child(2) {
                font-weight: 700;
                font-style: normal;
                font-size: 13px;
                color: #a8c5ff;
              }
              &:nth-child(3) {
                font-weight: 700;
                font-style: normal;
                font-size: 16px;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
    .InternetDistribution {
      width: 100%;
      height: 425px;
      background: #314695;
      margin-top: 18px;
      .InternetDistribution_bottom {
        height: calc(100% - 40px);
        width: 100%;
        ul {
          display: inline-block;
          vertical-align: top;
          width: 131px;
          padding-top: 13px;
          height: 100%;
          background: #25337b;
          li {
            overflow: hidden;
            width: 131px;
            cursor: pointer;
            height: 38px;
            margin: 0 0 13px 0;
            font-weight: 700;
            font-style: normal;
            font-size: 13px;
            color: #ffffff;
            line-height: 38px;
            text-align: center;
          }
        }
        .InternetDistribution_bottom_right {
          width: calc(100% - 131px);
          display: inline-block;
          height: 425px;
        }
      }
    }
  }
}
.historgramsList1 {
  margin: 0 20px;
}
.trendChart {
  border-right: 4px solid #41f2e7;
  color: #41f2e7;
}
.select {
  width: 260px;
  height: 32px;
  background: #212d66;
  color: #a8c5ff;
}
</style>
