<template>
  <div class="extractDate">
    <TitleName> 柱状图 </TitleName>
    <div class="histogram2" ref="histogram2"></div>
    <div class="nestingTable">
      <div class="nestingTable_left">
        <TitleName> 各系统提取数据量统计 </TitleName>
        <CircularStatistical />
      </div>
      <div class="nestingTable_right">
        <TitleName> 各系统提取数据量统计</TitleName>
        <LineChart />
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { onMounted, reactive, toRefs, ref, nextTick } from "vue";
import elementResizeDetectorMaker from "element-resize-detector";
import CircularStatistical from "./circularStatistical.vue";
import LineChart from "./lineChart.vue";
export default {
  components: {
    CircularStatistical,
    LineChart,
  },
  setup() {
    const state = reactive({});
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            excludeComponents: ["toolbox"],
            backgroundColor: "#314695",
            pixelRatio: 1,
          },
        },
        iconStyle: {
          color: "#00c3ff",
          shadowColor: "#00c3ff",
          borderColor: "#00c3ff",
        },
        left: "93%",
      },
      legend: {
        data: ["数量", "个数"],
        textStyle: {
          color: "#fff",
        },
      },
      xAxis: [
        {
          type: "category",
          data: [
            "数据集1",
            "数据集2",
            "数据集3",
            "数据集4",
            "数据集5",
            "数据集6",
            "数据集7",
            "数据集8",
            "数据集9",
            "数据集10",
            "数据集11",
            "数据集12",
            "数据集13",
            "数据集14",
            "数据集15",
          ],
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
      ],
      yAxis: [
        {
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
      ],
      series: [
        {
          name: "数量",
          type: "bar",
          barGap: 0,

          emphasis: {
            focus: "series",
          },
          data: [
            320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332, 301,
            334, 390,
          ],
          backgroundStyle: {
            color: "#212d65",
          },
          barWidth: 10,
          showBackground: true,
          itemStyle: {
            normal: {
              barBorderRadius: 2,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#E15AA6",
                },
                {
                  offset: 1,
                  color: "#E7357E",
                },
              ]),
            },
          },
        },
        {
          name: "个数",
          type: "bar",
          emphasis: {
            focus: "series",
          },
          barWidth: 10,
          data: [
            220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 220, 182, 191,
            234, 290,
          ],
          showBackground: true,
          backgroundStyle: {
            color: "#212d65",
          },
          itemStyle: {
            normal: {
              barBorderRadius: 2,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#00EDFF",
                },
                {
                  offset: 1,
                  color: "#00BDFF",
                },
              ]),
            },
          },
        },
      ],
    };
    const histogram2 = ref();
    onMounted(() => {
      const myChart = echarts.init(histogram2.value);
      myChart.setOption(option);
      let erd = elementResizeDetectorMaker();
      erd.listenTo(histogram2.value, () => {
        nextTick(() => {
          myChart.resize();
        });
      });
    });
    return {
      ...toRefs(state),
      histogram2,
    };
  },
};
</script>
<style lang="scss" scoped>
.extractDate {
  width: 100%;
  padding: 24px 17px;
  .histogram2 {
    width: 100%;
    height: 374px;
  }
  .nestingTable {
    width: 100%;
    height: 407px;
    .nestingTable_left {
      width: 499px;
      height: 100%;
      background: #25337b;
      padding: 0 10px;
      display: inline-block;
      vertical-align: top;
    }
    .nestingTable_right {
      width: calc(100% - 510px);
      display: inline-block;
      margin-left: 10px;
      height: 100%;
      background: #25337b;
    }
  }
}
</style>
