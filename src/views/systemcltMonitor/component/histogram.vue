<template>
  <div ref="histogram" class="histogram">
    <TitleName :moreVisible="true" @moreClick="moreVisible">{{
      title
    }}</TitleName>
    <p class="numtext">接受总数</p>
    <p class="number">{{ params.total }}</p>
    <div class="echarts" ref="echarts"></div>
    <ul class="list">
      <li @click="goTaskManagment">
        <p>
          <img
            :src="require('@/assets/images/query_builder_u178.svg')"
            alt=""
          />
        </p>
        <p>等待</p>
        <p>{{ params.wait }}</p>
      </li>
      <li @click="goTaskManagment">
        <p>
          <img :src="require('@/assets/images/cached_u173.svg')" alt="" />
        </p>
        <p>正在执行</p>
        <p>{{ params.executing }}</p>
      </li>
      <li @click="goTaskManagment">
        <p>
          <img :src="require('@/assets/images/done_u184.svg')" alt="" />
        </p>
        <p>完成</p>
        <p>{{ params.success }}</p>
      </li>
      <li @click="goTaskManagment">
        <p>
          <img
            :src="require('@/assets/images/report_problem_u188.svg')"
            alt=""
          />
        </p>
        <p>失败</p>
        <p>{{ params.faild }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import * as echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  inject: ["collapsed"],
  props: {
    title: {
      type: String,
    },
    timeArray: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Object,
      default: () => {},
    },
    dataNumber: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.myfun();
  },
  watch: {
    // "$store.state.collapsed"() {
    //   this.myChart.resize();
    // },
  },
  methods: {
    myfun() {
      this.myChart = echarts.init(this.$refs.echarts);
      this.myChart.setOption({
        xAxis: {
          type: "category",
          data: this.timeArray,
          // data: [
          //   "2021-05-01",
          //   "2021-05-02",
          //   "2021-05-03",
          //   "2021-05-04",
          //   "2021-05-05",
          //   "2021-05-06",
          //   "2021-05-07",
          // ],
          axisLabel: {
            textStyle: {
              color: "#A8C5FF",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#A8C5FF",
            },
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            //   data: [120, 250, 150, 80, 70, 110, 130],
            data: this.dataNumber,
            type: "bar",
            barWidth: 10,
            showBackground: true,
            backgroundStyle: {
              color: "#212d65",
            },
            itemStyle: {
              normal: {
                color: "#01fec8",
              },
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "4%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
      });
      let _this = this;
      let erd = elementResizeDetectorMaker();
      erd.listenTo(this.$refs["histogram"], () => {
        _this.$nextTick(() => {
          _this.myChart.resize();
        });
      });
    },
    moreVisible() {
      this.$emit("moreVisible");
    },
    goTaskManagment() {
      this.$router.push({ name: "taskManagement" });
    },
  },
};
</script>
<style lang="scss" scoped>
.histogram {
  padding: 0 25px 22px 25px;
  margin: 10px 10px 10px 5px;
  width: 32.49%;
  min-width: 487px;
  height: 425px;
  display: inline-block;
  background: #314695;
  P {
    margin: 0;
    padding: 0;
  }
  .numtext {
    margin: 18px 0 14px;
    text-align: center;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;
    color: #a8c5ff;
  }
  .number {
    text-align: center;
    font-family: "微软雅黑", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
    color: #ffffff;
    margin-bottom: 20px;
  }
  .echarts {
    width: 100%;
    height: 143px;
  }
  .list {
    li {
      cursor: pointer;
      padding-top: 12px;
      width: 21.55%;
      height: 103px;
      background: #2b3b83;
      text-align: center;
      display: inline-block;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
      p:nth-child(2) {
        font-weight: 700;
        font-style: normal;
        font-size: 13px;
        color: #a8c5ff;
        margin-top: 10px;
        margin-bottom: 7px;
      }
      p:nth-child(3) {
        font-weight: 700;
        font-style: normal;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
}
</style>
