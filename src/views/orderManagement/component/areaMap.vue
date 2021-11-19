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
        boundaryGap: true,
        data: ["0", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
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
          data: [0, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          areaStyle: {
            color: "#2656ac",
          },
          symbol: "none",
          itemStyle: {
            normal: {
              lineStyle: {
                color: "#1890ff",
                width: 2,
              },
            },
          },
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
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        trigger: "axis",
        formatter: function (item) {
          console.log(item);
          return `<div class="haha">${item[0].axisValue}<br/>订单数量：&nbsp;&nbsp;${item[0].value}</div>`;
        },
        axisPointer: {
          type: "none",
          label: {
            backgroundColor: "#6a7985",
          },
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
  height: 150px;
}
.haha {
  background: red;
  color: red;
}
</style>
