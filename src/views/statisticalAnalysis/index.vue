<template>
  <div class="statisticalAnalysis">
    <BlockTitleName>用户下载统计</BlockTitleName>
    <div class="statisticalAnalysis_query">
      <a-row style="width: 90%; margin: 0 auto">
        <a-col :span="8">
          <span>卫星：</span>
          <a-tree-select
            v-model:value="satellite"
            :tree-data="treeData"
            tree-checkable
            allow-clear
            style="color: #2d88ec"
            dropdownClassName="selectTree"
            :dropdownStyle="{ background: '#2d3d88' }"
            :show-checked-strategy="SHOW_PARENT"
            search-placeholder="Please
          select"
        /></a-col>

        <a-col :span="8">
          <span>用户单位：</span>
          <input type="text" />
        </a-col>
        <a-col :span="6"
          ><span class="querybutton">
            <a-button class="retry"
              ><img :src="require('@/assets/images/search_u1020.svg')" alt=""
            /></a-button>
            <a-button class="retry" style="margin-left: 10px"
              ><img
                :src="require('@/assets/images/cached_u1026.svg')"
                alt="" /></a-button></span
        ></a-col>
      </a-row>
      <a-row style="width: 90%; margin: 0 auto; margin-top: 12px"
        ><a-col :span="8">
          <span>起始时间：</span>
          <input type="text" />
        </a-col>
        <a-col :span="8">
          <span>截至时间：</span>
          <input type="text" />
        </a-col>
        <a-col :span="6"></a-col>
      </a-row>
    </div>
    <div class="statisticalAnalysis_chart">
      <ul>
        <li
          @click="changeTrendChartValue(1)"
          :class="{ trendChart: trendChartType == 1 }"
        >
          归档数据统计
        </li>
        <li
          @click="changeTrendChartValue(2)"
          :class="{ trendChart: trendChartType == 2 }"
        >
          提取数据统计
        </li>
        <li
          @click="changeTrendChartValue(3)"
          :class="{ trendChart: trendChartType == 3 }"
        >
          数据灾备统计
        </li>
      </ul>
      <div class="component">
        <component :is="cutTab" />
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "@vue/reactivity";
import FileData from "./components/fileData.vue";
import ExtractData from "./components/extractData.vue";
import { TreeSelect } from "ant-design-vue";
export default {
  components: {
    FileData,
    ExtractData,
  },
  setup() {
    const SHOW_PARENT = TreeSelect.SHOW_PARENT;
    const state = reactive({
      trendChartType: 1,
      cutTab: "FileData",
      satellite: null,
      treeData: [
        {
          title: "AQUA",
          value: "AQUA",
          key: "AQUA",
          children: [
            {
              title: "AIRS",
              value: "AIRS",
              key: "AIRS",
            },
            {
              title: "MODIS",
              value: "MODIS",
              key: "MODIS",
            },
          ],
        },
        {
          title: "TERRA",
          key: "TERRA",
          value: "TERRA",
          children: [
            {
              title: "MODIS",
              value: "MODIS2",
              key: "MODIS2",
            },
          ],
        },
        {
          title: "中法卫星",
          key: "zfwx",
          value: "zfwx",
          children: [
            {
              title: "SCA",
              key: "SCA",
              value: "SCA",
            },
            {
              title: "SWI",
              key: "SWI",
              value: "SWI",
            },
            {
              title: "ORG",
              key: "ORG",
              value: "ORG",
            },
          ],
        },
        {
          title: "海洋1C",
          key: "hy1c",
          value: "hy1c",
          children: [
            {
              title: "AIS",
              key: "AIS",
              value: "AIS",
            },
          ],
        },
      ],
    });
    const changeTrendChartValue = (value) => {
      state.trendChartType = value;
      value == 1 ? (state.cutTab = "FileData") : (state.cutTab = "ExtractData");
    };
    return {
      ...toRefs(state),
      changeTrendChartValue,
      SHOW_PARENT,
    };
  },
};
</script>
<style lang="scss" scoped>
.statisticalAnalysis {
  width: 100%;
  padding: 22px 30px 22px;
  .statisticalAnalysis_query {
    color: #a7c4ff;
    padding: 20px 0;
    background: #2d3d88;
    width: 100%;
    span {
      width: 100px;
      text-align: right;
      display: inline-block;
    }
    /deep/ .ant-select {
      width: calc(100% - 120px);
    }
    /deep/ .ant-select-selector {
      background: url("../../assets/images/u522.svg");
      background-size: 100% 100%;
      border: none;
    }
    /deep/ .ant-select-arrow {
      color: #a8c5ff;
    }
    input {
      width: calc(100% - 120px);
      border-radius: 0;
    }
  }
  .statisticalAnalysis_chart {
    margin-top: 15px;
    background: #25337b;
    ul {
      display: inline-block;
      vertical-align: top;
      width: 131px;
      height: 100%;
      background: #25337b;
      li {
        overflow: hidden;
        width: 131px;
        cursor: pointer;
        height: 38px;
        margin: 0 0 13px 0;
        font-weight: 700;
        font-style: normal;
        font-size: 13px;
        color: #ffffff;
        line-height: 38px;
        text-align: center;
      }
    }
    .component {
      width: calc(100% - 131px);
      display: inline-block;
      background: #2d3d88;
    }
  }
}
.trendChart {
  border-right: 4px solid #41f2e7;
  color: #41f2e7 !important;
}
.retry {
  width: 83px;
  height: 32px;
  margin: 0;
  padding: 0;
  display: inline-block;
  border: 1px solid rgba(91, 146, 255, 1);
  border-radius: 2 px;
  background-color: rgba(45, 61, 136, 1);
  text-align: center;
  color: #fff;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  &:hover {
    background: #1b83ed;
  }
}
.querybutton {
  padding-right: 20px;
  width: 100% !important;
  .retry {
    width: 43px;
    height: 27px;
    line-height: 17px;
  }
}
/deep/ .ant-select-multiple .ant-select-selection-item {
  background: #2d3d88;
  border: 0;
}
</style>
<style>
.ant-select-tree li .ant-select-tree-node-content-wrapper {
  color: #a7c4ff;
}
</style>
