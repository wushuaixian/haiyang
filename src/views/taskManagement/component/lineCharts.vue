<template>
  <div class="lineCharts" ref="lineCharts"></div>
</template>
<script>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
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
        data: ["0", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00"],
        axisLabel: {
          textStyle: {
            color: "#a2a2a5",
          },
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          name: "归档任务数",
          type: "line",
          stack: "Total",
          data: [0, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "提取任务数",
          type: "line",
          stack: "Total",
          data: [0, 182, 191, 234, 290, 330, 310],
        },
      ],

      grid: {
        top: "4%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
      },
    };
    const lineCharts = ref();
    onMounted(() => {
      const myChart = echarts.init(lineCharts.value);
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    });
    return {
      lineCharts,
    };
  },
};
</script>
<style scoped>
.lineCharts {
  height: 140px;
}
</style>
