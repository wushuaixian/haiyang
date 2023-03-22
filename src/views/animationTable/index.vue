<template>
  <div>
    <a-button @click="query">查询</a-button>
    <a-button @click="del">清空</a-button>
    <Xtable
      :columns="columns"
      :rowSelection="rowSelection"
      :dataList="dataList"
      selectKey="id"
      @selectValue="selectValue"
      scrollTable="2000"
    >
      <template #xx="scope"
        ><span
          style="
            width: 100px;
            height: 100px;
            background: red;
            display: inline-block;
          "
          >{{ scope.item.createTime2 }}</span
        ></template
      >
    </Xtable>
    <img class="img" src="@/assets/images/titleImg.png" alt="" />
  </div>
</template>
<script>
import Xtable from "./component/x-table";
import { reactive, toRefs } from "vue";

export default {
  setup() {
    let state = reactive({
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          width: "100px",
        },
        {
          title: "书名",
          dataIndex: "name",
          key: "name",
          width: "100px",
        },
        {
          title: "大小",
          dataIndex: "dx",
          key: "dx",
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime",
          slot: "xx",
          fixed: "right",
          width: "200px",
        },
      ],
      dataList: [],
      rowSelection: {},
    });
    const query = () => {
      state.dataList = [
        {
          id: 1,
          name: "三ss国演义",
          createTime: "10101010",
          createTime2: "123",
        },
        { id: 12312, name: "三国dfa演义", createTime: "10101010", dx: "大小" },
        { id: 123222, name: "三国s演义", createTime: "10101010" },
        { id: 1222, name: "三国演义", createTime: "12" },
        { id: 123, name: "三国f演义", createTime: "123123" },
        { id: 1313, name: "三国演义", createTime: "10101010" },
        {
          id: 12453,
          name: "三国演义",
          createTime: "11111111111111111111111111",
        },
      ];
    };
    const del = () => {
      state.dataList = [];
    };
    return {
      del,
      ...toRefs(state),
      query,
    };
  },
  components: {
    Xtable,
  },
  methods: {
    selectValue(val) {
      console.log(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.img {
  width: 100px;
  height: 100px;
  // animation-name: identifier;
  // animation-duration: 4s;
  // animation-timing-function: ease;
  position: absolute;
  left: 0;
  animation: example 1s ease;
  // // animation-iteration-count: infinite; // 是动画永远进行
  animation-fill-mode: forwards; // 元素保留在最后一针
  &:hover {
    animation: fz 1s ease;
    animation-fill-mode: forwards;
  }
}
@keyframes fz {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}
@keyframes example {
  from {
    // left: 0;
    transform: rotateY(180deg);
  }
  to {
    // left: 100px;
    transform: rotateY(0deg);
  }
}
</style>
