<template>
  <div class="transverseView" ref="transverseView"></div>
</template>
<script>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
export default {
  setup() {
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "0",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        show: false,
      },
      yAxis: {
        type: "category",
        data: [
          "带库归档",
          "盘阵归档",
          "带库提取",
          "远程备份",
          "远程恢复",
          "数据上传",
        ],
        axisLabel: {
          textStyle: {
            color: "#A8C5FF",
          },
        },
        splitLine: {
          lineStyle: {
            width: 1,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        max: 5,
      },
      series: [
        {
          name: "等待",
          type: "bar",
          stack: "总量",
          label: {
            show: false,
            position: "insideRight",
          },
          showBackground: true,
          backgroundStyle: {
            color: "#212d65",
          },
          barWidth: 10,
          itemStyle: {
            emphasis: {
              barBorderRadius: 3,
            },
            normal: {
              color: "#00f9d4",
              barBorderRadius: 3,
            },
          },
          data: [320, 302, 301, 334, 390, 330],
        },
        {
          name: "出错",
          type: "bar",
          stack: "总量",
          label: {
            show: false,
            position: "insideRight",
          },
          barWidth: 6,
          data: [120, 132, 101, 134, 90, 230],
          itemStyle: {
            emphasis: {
              barBorderRadius: 3,
            },
            normal: {
              color: "#fe6ed1",
              barBorderRadius: 3,
            },
          },
        },
        {
          name: "完成",
          type: "bar",
          stack: "总量",
          barWidth: 10,
          label: {
            show: false,
            position: "insideRight",
          },
          data: [220, 182, 191, 234, 290, 330],
          itemStyle: {
            emphasis: {
              barBorderRadius: 3,
            },
            normal: {
              color: "#516ef8",
              barBorderRadius: 3,
            },
          },
        },
        {
          name: "正在执行",
          type: "bar",
          stack: "总量",
          barWidth: 10,
          label: {
            show: false,
            position: "insideRight",
          },
          itemStyle: {
            emphasis: {
              barBorderRadius: 3,
            },
            normal: {
              color: "#fc9174",
              barBorderRadius: 3,
            },
          },
          data: [150, 212, 201, 154, 190, 330],
        },
      ],
    };
    const transverseView = ref();
    onMounted(() => {
      const myChart = echarts.init(transverseView.value);
      myChart.setOption(option);
    });
    return {
      transverseView,
    };
  },
};
</script>
<style scoped>
.transverseView {
  height: 190px;
}
</style>
