<template>
  <div>
    <a-transfer
      :key="transkey"
      class="tree-transfer"
      :data-source="dataSource"
      :target-keys="targetKeys"
      :render="(item) => item.title"
      :show-select-all="false"
      @change="onChange"
    >
      <template #children="{ direction, selectedKeys, onItemSelect }">
        <a-tree
          v-if="direction === 'left'"
          blockNode
          checkable
          defaultExpandAll
          :treeData="treeData"
          v-model:checkedKeys="checkedKeysone"
          @check="
            (_, props) => {
              onChecked(
                _,
                props,
                [...selectedKeys, ...targetKeys],
                onItemSelect
              );
            }
          "
        />
        <a-tree
          v-if="direction === 'right'"
          checkStrictly
          blockNode
          checkable
          defaultExpandAll
          v-model:checkedKeys="checkedKey"
          :treeData="rightTreeData"
          @check="
            (_, props) => {
              onCheckedRight(_, props, selectedKeys, onItemSelect);
            }
          "
        />
      </template>
    </a-transfer>
  </div>
</template>
<script>
import { computed, reactive, ref, toRefs, watch } from "vue";
const tData = [
  {
    key: 1,
    title: "系统监控",
    type: "html",
  },
  {
    key: 2,
    title: "订单管理",
    type: "html",
  },
  {
    key: 3,
    title: "任务管理",
    type: "html",
  },
  {
    key: "任务管理",
    title: "任务管理",
    type: "html",
  },
  {
    key: "数据管理",
    title: "数据管理",
    type: "html",
  },
  {
    key: "统计分析",
    title: "统计分析",
    type: "html",
  },
  {
    key: 4,
    title: "配置管理",
    type: "catalogue",
    children: [
      {
        key: 5,
        title: "存储管理",
        type: "html",
        children: [
          {
            key: 9,
            title: "按钮1",
            type: "button",
          },
          {
            key: 10,
            title: "按钮2",
            type: "button",
          },
        ],
      },
      {
        key: 6,
        title: "数据集管理",
        type: "html",
        children: [
          {
            key: 7,
            title: "按钮1",
            type: "button",
          },
          {
            key: 8,
            title: "按钮2",
            type: "button",
          },
        ],
      },
    ],
  },
  {
    key: "用户管理",
    title: "用户管理",
    type: "catalogue",
    children: [
      {
        key: "用户管理html",
        title: "用户管理",
        type: "html",
        children: [
          {
            key: 12,
            title: "按钮1",
            type: "button",
          },
          {
            key: 13,
            title: "按钮2",
            type: "button",
          },
        ],
      },
      {
        key: "权限管理",
        title: "权限管理",
        type: "html",
        children: [
          {
            key: 14,
            title: "按钮1",
            type: "button",
          },
          {
            key: 15,
            title: "按钮2",
            type: "button",
          },
        ],
      },
    ],
  },
];
const transferDataSource = [];

function flatten(list = []) {
  list.forEach((item) => {
    transferDataSource.push(item);
    if (item.children) flatten(item.children);
  });
}
flatten(JSON.parse(JSON.stringify(tData)));

function isChecked(selectedKeys, eventKey) {
  return selectedKeys.indexOf(eventKey) !== -1;
}

function handleTreeData(data, targetKeys = []) {
  data.forEach((item) => {
    item["disabled"] = targetKeys.includes(item.key);
    if (item.children) {
      handleTreeData(item.children, targetKeys);
    }
  });
  return data;
}
function handleTreeDataRight(data, targetKeys, arr) {
  for (let i = 0; i < data.length; i++) {
    if (targetKeys.includes(data[i].key)) {
      arr[arr.length] = {
        key: data[i].key,
        title: data[i].title,
      };
    }
    if (targetKeys.includes(data[i].key) && data[i].children) {
      arr[arr.length - 1].children = [];
      handleTreeDataRight(
        data[i].children,
        targetKeys,
        arr[arr.length - 1].children
      );
    }
  }
}
export default {
  setup() {
    const selectedKeyAll = ref();
    const targetKeys = ref([1, 2]); //右侧选中的值
    const dataSource = ref(transferDataSource);
    const treeData = computed(() => {
      return handleTreeData(tData, targetKeys.value);
    });
    const state = reactive({
      checkedKeysone: [1, 2], // 左侧默认勾选的值
      transkey: 1,
      typeStatue: false,
    });
    watch(targetKeys, (newValue, old) => {
      if (state.typeStatue) return;
      state.typeStatue = true;
      let newarr = newValue;
      if (old.length > newValue.length) {
        let del = [];
        for (let i = 0; i < old.length; i++) {
          if (!newValue.includes(old[i])) {
            del.push(old[i]);
          }
        }
        for (let i = 0; i < del.length; i++) {
          if (keydigui(del[i], tData)) {
            let obj = keydigui(del[i], tData);
            if (obj.children) {
              let all = [];
              allkey(obj.children, all);
              all.map((item) => {
                if (newarr.includes(item)) {
                  newarr.splice(newarr.indexOf(item), 1);
                }
              });
            }
          }
        }
        for (let h = 0; h < newarr.length; h++) {
          let keyarry = [];
          let obj = keydigui(newarr[h], tData);
          if (obj.type == "catalogue") {
            allkey(obj.children, keyarry);
            if (
              obj.type &&
              obj.type == "catalogue" &&
              !youzhi(newarr, keyarry)
            ) {
              newarr.splice(h, 1);
            }
          }
        }

        state.checkedKeysone = newarr;
      } else if (old.length < newValue.length) {
        let add = [];
        for (let i = 0; i < newValue.length; i++) {
          if (!old.includes(newValue[i])) {
            add.push(newValue[i]);
          }
        }
        for (let s = 0; s < add.length; s++) {
          let parentkeyall = parentkeyallfun(add[s], tData);
          for (let i = 0; i < parentkeyall.length; i++) {
            if (!targetKeys.value.includes(parentkeyall[i])) {
              targetKeys.value.push(parentkeyall[i]);
            }
          }
        }
        let arrchildren = [];
        for (let z = 0; z < add.length; z++) {
          allkeychildren(add[z], arrchildren);
        }
        for (let q = 0; q < arrchildren.length; q++) {
          for (let r = 0; r < arrchildren[q].length; r++) {
            if (
              !targetKeys.value.includes(arrchildren[q][r]) &&
              r == arrchildren[q].length - 1
            ) {
              targetKeys.value = [...targetKeys.value, ...arrchildren[q]];
            } else if (targetKeys.value.includes(arrchildren[q][r])) {
              break;
            }
          }
        }
        state.checkedKeysone = targetKeys.value;
      }
    });
    const youzhi = (newkey, keyarry) => {
      for (let i = 0; i < newkey.length; i++) {
        if (keyarry.includes(newkey[i])) {
          return true;
        }
      }
    };
    // 查询key的递归返回key所在对象
    const keydigui = (key, arr) => {
      let obj;
      const haha = (key, arr) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].key == key) {
            return (obj = arr[i]);
          } else if (arr[i].children) {
            haha(key, arr[i].children);
          }
        }
      };
      haha(key, arr);
      return obj;
    };
    // 递归子集所有key
    const allkey = (arr, keyarry) => {
      arr.map((item) => {
        keyarry.push(item.key);
        if (item.children) {
          return allkey(item.children, keyarry);
        }
      });
    };
    // 查询所有子集
    const allkeychildren = (key, keyarry) => {
      let arr = [];
      let obj = keydigui(key, tData);
      if (obj.children) {
        obj.children.map((item) => {
          arr.push(item.key);
        });
        keyarry.push(arr);
        obj.children.map((item) => {
          allkeychildren(item.key, keyarry);
        });
      }
    };
    // 递归查询key所有父节点
    const parentkeyallfun = (key, arr1) => {
      let parentKey = [];
      const fun = (key, arr, arrkey) => {
        for (let i = 0; i < arr.length; i++) {
          let c = JSON.parse(JSON.stringify(arrkey)) || [];
          if (arr[i].key == key) {
            parentKey = c;
            return;
          } else if (arr[i].children) {
            c.push(arr[i].key);
            fun(key, arr[i].children, c);
          }
        }
      };
      fun(key, arr1, []);
      return parentKey;
    };
    const onChange = (keys) => {
      state.typeStatue = false;
      targetKeys.value = keys;
      state.checkedKeysone = keys;
      checkedKey.value.checked = [];
      state.transkey++;
    };

    const onChecked = (_, e, checkedKeys, onItemSelect) => {
      const { eventKey } = e.node;
      onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
    };
    //------------------------------------------------------------------
    const checkedKey = ref([]);
    const onCheckedRight = (_, e, checkedKeys, onItemSelect) => {
      const { eventKey } = e.node;
      if (checkedKey.value.checked.length == 0) {
        checkedKey.value.checked = [];
        state.transkey++;
      }
      onItemSelect(
        eventKey,
        (checkedKey.value.checked.length &&
          checkedKey.value.checked.length > 0) == true
          ? true
          : false
      );
    };

    const rightTreeData = computed(() => {
      let arr = [];
      handleTreeDataRight(tData, targetKeys.value, arr);
      return arr;
    });
    return {
      targetKeys,
      dataSource,
      treeData,
      onChange,
      onChecked,
      rightTreeData,
      onCheckedRight,
      checkedKey,
      selectedKeyAll,
      keydigui,
      allkey,
      ...toRefs(state),
      parentkeyallfun,
      allkeychildren,
      youzhi,
    };
  },
};
</script>
<style lang="scss" scoped>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
.tree-transfer {
  background: #314695;
  min-height: 677px;
}
/deep/ .ant-transfer-customize-list .ant-transfer-list {
  width: 30% !important;
  border-color: #263473;
}
/deep/ .ant-transfer-list-header {
  display: none;
}
/deep/ .ant-tree li .ant-tree-node-content-wrapper {
  color: rgba(228, 230, 236, 0.996078431372549);
  &:hover {
    color: black;
  }
}
/deep/ li.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper span {
  color: #fff;
}
/deep/ .ant-tree-checkbox-disabled .ant-tree-checkbox-inner {
  background: #1890ff;
  color: #fff;
}
/deep/
  .ant-tree-checkbox-disabled.ant-tree-checkbox-checked
  .ant-tree-checkbox-inner::after {
  border-color: #fff;
}
/deep/
  .ant-tree
  li
  span.ant-tree-switcher.ant-tree-switcher_open
  .ant-tree-switcher-icon
  svg {
  color: #1890ff;
}
/deep/ .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
  background: none;
}
/deep/ .ant-transfer-list {
  padding-top: 0;
}
/deep/ .ant-transfer-list-body {
  overflow-y: auto;
  &::-webkit-scrollbar {
    // 滚动条的背景
    width: 7px;
    background: #191a37;
    height: 14px;
  }

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    width: 5px;
    border: 5px solid transparent;
  }

  &::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px #191a37 inset;
  }

  &::-webkit-scrollbar-thumb {
    //滚动条的滑块样式修改
    width: 5px;
    min-height: 20px;
    background: #222e68;
    transition-delay: 2s;
  }
}
</style>
