<template>
  <div class="circularStatistical" ref="circularStatistical"></div>
</template>
<script>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
export default {
  setup() {
    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        bottom: "5%",
        right: "5%",
        orient: "vertical",
        textStyle: {
          color: "#fff",
          fontSize: 13,
        },
      },
      yAxis: {
        show: false,
      },
      xAxis: {
        show: false,
      },
      series: [
        {
          name: "任务数量",
          type: "pie",
          radius: [50, 180],
          center: ["40%", "50%"],
          roseType: "area",
          itemStyle: {
            // borderRadius: 8,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "16",
              fontWeight: "bold",
            },
          },
          data: [
            { value: 40, name: "系统A" },
            { value: 38, name: "系统B" },
            { value: 32, name: "系统C" },
            { value: 30, name: "系统D" },
            { value: 28, name: "系统E" },
          ],
        },
      ],
    };

    const circularStatistical = ref();
    onMounted(() => {
      const myChart = echarts.init(circularStatistical.value);
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    });
    return {
      circularStatistical,
    };
  },
};
</script>
<style scoped>
.circularStatistical {
  height: 370px;
}
</style>
