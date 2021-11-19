<template>
  <div class="internetDistributionBox" ref="internetDistributionBox"></div>
</template>
<script>
import * as echarts from "echarts";
import { ref, onMounted, nextTick } from "vue";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  props: {
    dataObj: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const internetDistributionBox = ref();
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
        data: props.dataObj.timeList,
        axisLabel: {
          textStyle: {
            color: "#ffffff",
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
            color: "#ffffff",
          },
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: props.dataObj.dataList,
          type: "line",
          symbolSize: 0,
          itemStyle: {
            normal: {
              lineStyle: {
                color: "#41f2e7",
                width: 4,
              },
            },
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
    };
    onMounted(() => {
      const myChart = echarts.init(internetDistributionBox.value);
      myChart.setOption(option);
      let erd = elementResizeDetectorMaker();
      erd.listenTo(internetDistributionBox.value, () => {
        nextTick(() => {
          myChart.resize();
        });
      });
      // window.addEventListener("resize", () => {
      //   myChart.resize();
      // });
    });
    return {
      internetDistributionBox,
    };
  },
};
</script>
<style lang="scss" scoped>
.internetDistributionBox {
  width: 100%;
  height: 100%;
}
</style>
