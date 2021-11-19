<template>
  <div class="sectorStatistics" ref="sectorStatistics"></div>
</template>
<script>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "20%",
        right: "15%",
        orient: "vertical",
        itemGap: 4.5,
        icon: "circle",
        itemWidth: 10,
        data: ["正在执行", "成功", "未通过", "失败", "等待"],
        textStyle: {
          color: "#AFCAFf",
          fontSize: 13,
        },
      },
      color: ["#1b83ed", "#2fae62", "#dbb626", "#f04864", "#3ed6d8"],
      series: [
        {
          center: ["30%", "50%"],
          name: "",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          itemStyle: {
            borderColor: "#2d3d88",
            borderWidth: 1,
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "16",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "正在执行" },
            { value: 5, name: "成功" },
            { value: 580, name: "未通过" },
            { value: 484, name: "失败" },
            { value: 300, name: "等待" },
          ],
        },
      ],
      grid: {
        left: "100px",
        containLabel: true,
      },
    };
    const sectorStatistics = ref();
    onMounted(() => {
      const myChart = echarts.init(sectorStatistics.value);
      myChart.setOption(option);
    });
    return {
      sectorStatistics,
    };
  },
};
</script>
<style scoped>
.sectorStatistics {
  height: 150px;
}
</style>
