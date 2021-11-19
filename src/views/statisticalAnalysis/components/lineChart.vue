<template>
  <div class="areaMap" ref="areaMap"></div>
</template>
<script>
import * as echarts from "echarts";
import { onMounted, ref, nextTick } from "vue";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  setup() {
    const option = {
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
      xAxis: {
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        axisLabel: {
          textStyle: {
            color: "#afcaff",
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
            color: "#afcaff",
          },
        },
        splitLine: {
          show: false,
        },
      },
      grid: {
        top: "4%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260, 100, 5, 130, 210, 160],
          type: "line",
          itemStyle: {
            normal: {
              color: "#b7519d",
            },
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
        formatter: function (item) {
          console.log(item);
          return `<div class="haha">${item[0].axisValue}<br/>提取任务数：&nbsp;${item[0].value}</div>`;
        },
      },
    };
    const areaMap = ref();
    onMounted(() => {
      const myChart = echarts.init(areaMap.value);
      myChart.setOption(option);
      let erd = elementResizeDetectorMaker();
      erd.listenTo(areaMap.value, () => {
        nextTick(() => {
          myChart.resize();
        });
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    });
    return {
      areaMap,
    };
  },
};
</script>
<style scoped>
.areaMap {
  height: 370px;
}
</style>
