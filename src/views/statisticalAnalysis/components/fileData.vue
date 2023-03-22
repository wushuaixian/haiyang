<template>
  <div class="fileData">
    <TitleName> 柱状图 </TitleName>
    <div class="histogram2" ref="histogram2"></div>
    <div class="nestingTable">
      <TitleName> 统计表 </TitleName>
      <s-Table
        :columns="columns"
        :data-source="dataScouce"
        :expandedRowRender="expandedRowRender"
        total="200"
      >
      </s-Table>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { onMounted, reactive, toRefs, ref, nextTick } from "vue";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  components: {},
  setup() {
    const state = reactive({
      columns: [
        {
          title: "统计",
          dataIndex: "statistics",
          key: "statistics",
        },
        {
          title: "卫星",
          dataIndex: "platform",
          key: "platform",
        },
        {
          title: "数据分类",
          dataIndex: "dataClassification",
          key: "dataClassification",
        },
        {
          title: "传感器",
          dataIndex: "sensor",
          key: "sensor",
        },
        {
          title: "产品数据量",
          dataIndex: "productDataVolume",
          key: "productDataVolume",
        },
        {
          title: "产品个数",
          dataIndex: "NumberOfProducts",
          key: "NumberOfProducts",
        },
        {
          title: "百分比",
          dataIndex: "percentage",
          key: "percentage",
        },
      ],
      dataScouce: [
        {
          key: "one",
          statistics: "总计",
          platform: "GF7",
          dataClassification: "ALL",
          sensor: "ALL",
          productDataVolume: "338.5T",
          NumberOfProducts: "333个",
          percentage: "100%",
        },
        {
          key: "two",
          statistics: "总计",
          platform: "GF7",
          dataClassification: "ALL",
          sensor: "ALL",
          productDataVolume: "338.5T",
          NumberOfProducts: "444个",
          percentage: "100%",
        },
      ],
      innerColumns: [
        {
          title: "统计",
          dataIndex: "statistics",
          key: "statistics",
        },
        {
          title: "卫星",
          dataIndex: "platform",
          key: "platform",
        },
        {
          title: "数据分类",
          dataIndex: "dataClassification",
          key: "dataClassification",
        },
        {
          title: "传感器",
          dataIndex: "sensor",
          key: "sensor",
        },
        {
          title: "产品数据量",
          dataIndex: "productDataVolume",
          key: "productDataVolume",
        },
        {
          title: "产品个数",
          dataIndex: "NumberOfProducts",
          key: "NumberOfProducts",
        },
        {
          title: "百分比",
          dataIndex: "percentage",
          key: "percentage",
        },
      ],
      innerData: {
        one: [
          {
            key: "1",
            statistics: "总计",
            platform: "GF7",
            dataClassification: "ALL",
            sensor: "ALL",
            productDataVolume: "338.5T",
            NumberOfProducts: "555个",
            percentage: "100%",
          },
        ],
        two: [
          {
            key: "1",
            statistics: "总计",
            platform: "GF7",
            dataClassification: "ALL",
            sensor: "ALL",
            productDataVolume: "338.5T",
            NumberOfProducts: "999个",
            percentage: "100%",
          },
        ],
      },
      option: {
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["数量", "个数"],
          textStyle: {
            color: "#fff",
          },
        },
        // toolbox: {
        //   show: true,
        //   orient: "vertical",
        //   left: "right",
        //   top: "center",
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ["line", "bar", "stack"] },
        //     restore: { show: true },
        //     saveAsImage: { show: true },
        //   },
        // },
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
              // 320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332, 301,
              // 334, 390,
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
              // 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 220, 182, 191,
              // 234, 290,
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
      },
    });
    const expandedRowRender = (item) => {
      console.log(item.record.key);
      return (
        // 子表格
        <a-table
          columns={state.innerColumns}
          pagination={false}
          class="childrenTable"
          dataSource={state.innerData[item.record.key]}
        />
      );
    };
    const histogram2 = ref();
    onMounted(() => {
      const myChart = echarts.init(histogram2.value);
      myChart.setOption(state.option);
      let erd = elementResizeDetectorMaker();
      erd.listenTo(histogram2.value, () => {
        nextTick(() => {
          myChart.resize();
          setTimeout(() => {
            console.log(1111111111);
            state.option.series[0].data = [
              320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332, 301,
              334, 390,
            ];
            state.option.series[1].data = [
              220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 220, 182, 191,
              234, 290,
            ];
            myChart.setOption(state.option);
            console.log(state.option.series);
          }, 500);
        });
      });
    });
    return {
      ...toRefs(state),
      histogram2,
      expandedRowRender,
    };
  },
};
</script>
<style lang="scss" scoped>
.fileData {
  width: 100%;
  padding: 24px 17px;
  .histogram2 {
    width: 100%;
    height: 374px;
  }
  .nestingTable {
    background: #25337b;
    /deep/.ant-pagination-prev .ant-pagination-item-link,
    /deep/.ant-pagination-next .ant-pagination-item-link,
    /deep/ .ant-select:not(.ant-select-customize-input) .ant-select-selector {
      background: #25337b;
      border: 0px solid rgba(91, 146, 255, 1);
    }
    /deep/ .ant-table-tbody > tr {
      background: #25337b;
      color: #a8c5ff;
      & > td {
        border-bottom: 0px solid #3a55a9;
      }
    }
    /deep/ .ant-table-row-expand-icon {
      background: #3663e1;
      border: 1px solid #2f3cb9;
    }
  }
}
/deep/ tr.ant-table-expanded-row td > .ant-table-wrapper {
  margin: 0;
}
/deep/ .ant-table-content {
  border: 10px solid #2d3d88 !important;
  .ant-table-thead > tr > th {
    background: #25337b !important;
  }
}
/deep/ .ant-table-thead > tr > th {
  border: 0px !important;
}
</style>
