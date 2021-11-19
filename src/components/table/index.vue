<template>
  <div>
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :scroll="scroll"
      :rowKey="(record) => record.key"
      :expandedRowRender="expandedRowRender"
      :pagination="false"
      :row-selection="rowSelection"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </a-table>
    <div class="pagination" v-if="paginationVisible">
      <a-pagination
        v-model:current="current"
        v-model:pageSize="pageSize"
        show-quick-jumper
        :showSizeChanger="true"
        :page-size-options="pageSizeOptions"
        :total="total"
        @change="jump"
        @showSizeChange="onShowSizeChange"
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    expandedRowRender: {
      type: Function,
    },
    rowSelection: {
      type: Object,
      default: () => {},
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    paginationVisible: {
      type: Boolean,
      default: true,
    },
    scroll: {
      type: Object,
      default: () => {
        return {
          y: 400,
        };
      },
    },
  },
  setup(props, context) {
    const current = ref(1);
    console.log(props);
    const jump = () => {
      context.emit("getData", {
        current,
        pageSize,
      });
    };
    const onShowSizeChange = () => {
      context.emit("getData", {
        current,
        pageSize,
      });
    };
    const pageSize = ref(20);
    const pageSizeOptions = ref(["10", "20", "30", "40", "50"]);
    return {
      current,
      jump,
      pageSize,
      pageSizeOptions,
      onShowSizeChange,
    };
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  text-align: center;
  padding-bottom: 20px;
  /deep/ .ant-pagination-item {
    background: transparent;
    border: 1px solid rgba(91, 146, 255, 1);
    a {
      color: #a8c5ff;
    }
  }
  /deep/ .ant-pagination-disabled a {
    color: black;
    background: transparent;
    border: 1px solid rgba(91, 146, 255, 1);
  }
  /deep/ .ant-pagination-item-active {
    background: #5b92ff;
    a {
      color: #fff;
    }
  }
  /deep/.ant-pagination-prev .ant-pagination-item-link,
  /deep/.ant-pagination-next .ant-pagination-item-link,
  /deep/ .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background: transparent;
    border: 1px solid rgba(91, 146, 255, 1);
  }
  /deep/ .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    color: #a8c5ff;
  }
  /deep/ .ant-pagination-options-quick-jumper {
    color: #a8c5ff;
    input {
      background: transparent;
      border: 1px solid rgba(91, 146, 255, 1);
    }
  }
}
/deep/ .ant-table-thead > tr {
  border: 1px solid #3a55a9;
  height: 39px;
}
/deep/ .ant-table-tbody > tr {
  background: #2d3d88;
  color: #a8c5ff;
  & > td {
    border-bottom: 1px solid #3a55a9;
  }
}
/deep/
  .ant-table-tbody
  > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
  > td {
  background: #2d3d88;
}
/deep/ .ant-table-thead > tr > th {
  border-top: 1px solid #3a55a9;
  border-bottom: 1px solid #3a55a9;
  background: #2d3d88;
  color: #fff;
  padding: 0;
  height: 39px;
  line-height: 39px;
  text-align: center;
  &:first-child {
    border-left: 1px solid #3a55a9;
  }
  &:last-child {
    border-right: 1px solid #3a55a9;
  }
}
/deep/ .ant-table-tbody > tr > td {
  height: 39px;
  line-height: 39px;
  padding: 0;
  text-align: center;
}
/deep/ .ant-table-body {
  &::-webkit-scrollbar {
    //整体样式
    height: 10px;
    border-radius: 20px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    //滑动滑块条样式
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    // background: #00aaff;
    background: #5b92ff;
  }
  &::-webkit-scrollbar-track {
    //轨道的样式
    -webkit-box-shadow: 0;
    background: #25337b;
  }
}
/deep/.ant-table-fixed-header .ant-table-scroll .ant-table-header {
  background: #25337b;
  border: 0px;
}
/deep/
  .ant-table-fixed-header
  .ant-table-scroll
  .ant-table-header::-webkit-scrollbar {
  border: 0px;
}
/deep/ .ant-pagination-options-quick-jumper input {
  color: #a8c5ff;
}
/deep/ .ant-table-tbody > tr.ant-table-row-selected td {
  background: none;
}
/deep/ .ant-checkbox {
  .ant-checkbox-inner {
    background: #23306c;
  }
}
/deep/ .ant-checkbox-checked .ant-checkbox-inner {
  background: #5b92ff !important;
}
</style>
