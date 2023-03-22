<template>
  <div>
    <div class="TableHeadBox" ref="TableHeadBox">
      <table
        class="x-table"
        :style="'width:' + (scrollTable ? scrollTable + 'px' : 'initial')"
      >
        <thead>
          <tr class="x-headTable">
            <th v-show="selectKey" style="width: 50px" class="x-table-item">
              <input
                class="checkbox"
                :disabled="list.length == 0"
                type="checkbox"
                v-model="allCheckout"
              />
            </th>
            <th
              class="x-table-item"
              v-for="item in columns"
              :key="item.key"
              :style="'width:' + (item.width ? item.width : 'initial')"
              v-show="!item.fixed"
            >
              {{ item.title }}
            </th>
            <th
              class="x-table-item"
              v-for="item in columns"
              :key="item.key"
              :style="'width:' + (item.width ? item.width : 'initial')"
              v-show="item.fixed"
              :class="{
                youxuanfu: item.fixed == 'right',
                zuoxuanfu: item.fixed == 'left',
              }"
            >
              {{ item.title }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="TableContextBox" @scroll="scrollLinkage" ref="TableContextBox">
      <table
        class="x-table"
        :style="'width:' + (scrollTable ? scrollTable + 'px' : 'initial')"
      >
        <transition-group name="list" tag="tbody" mode="out-in">
          <tr
            v-for="(x, index) in list"
            :key="index"
            class="x-tableContent"
            style="width: 100%"
          >
            <td style="width: 50px" v-show="selectKey">
              <input
                class="checkbox"
                type="checkbox"
                :ref="'checkList' + index"
                v-model="x.isCheckout"
                @change="changeCheckoutStatus(x)"
              />
            </td>
            <td
              v-for="(item, indexcol) in columns"
              :style="'width:' + (item.width ? item.width : 'initial')"
              :key="'col' + indexcol"
              v-show="!item.fixed"
            >
              <span v-if="!item.slot">{{ x[item["dataIndex"]] }}</span>
              <slot v-else :item="x" :name="item.slot"></slot>
            </td>
            <td
              v-for="(item, indexcol) in columns"
              :style="'width:' + (item.width ? item.width : 'initial')"
              :key="'col' + indexcol"
              v-show="item.fixed"
              :class="{
                youxuanfu: item.fixed == 'right',
              }"
            >
              <span v-if="!item.slot">{{ x[item["dataIndex"]] }}</span>
              <slot v-else :item="x" :name="item.slot"></slot>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    scrollTable: {
      type: String,
      default: "",
    },
    selectKey: {
      type: String,
      default: "",
    },
  },
  watch: {
    dataList() {
      console.log(1111);
      this.list = [];
      this.i = 0;
      this.allCheckout = false;
      setTimeout(() => {
        this.jsq = setInterval(() => {
          if (this.list.length == this.dataList.length) {
            clearInterval(this.jsq);
            return;
          }
          let x = this.dataList[this.i];
          x.isCheckout = false;
          this.list.push(x);
          this.i++;
        }, 500);
      }, 500);
    },
    allCheckout(val) {
      console.log(val);
      if (val) {
        this.list.map((item) => {
          item.isCheckout = true;
        });
        this.selectList = JSON.parse(JSON.stringify(this.list));
      } else {
        this.list.map((item) => {
          item.isCheckout = false;
        });
        this.selectList = [];
      }
      this.deleteSelectIsCheckout();
      this.$emit("selectValue", this.selectList);
    },
  },

  data() {
    return {
      list: [],
      i: 0,
      jsq: null,
      selectCheck: false,
      allCheckout: false,
      selectList: [],
    };
  },
  mounted() {
    console.log(this.scrollTable);
  },
  methods: {
    deleteSelectIsCheckout() {
      this.selectList.map((item) => {
        delete item.isCheckout;
      });
    },
    scrollLinkage() {
      this.$refs.TableHeadBox.scrollLeft =
        this.$refs.TableContextBox.scrollLeft;
    },
    changeCheckoutStatus(item) {
      if (item.isCheckout) {
        this.selectList.push(item);
      } else {
        this.selectList.splice(
          this.selectList.findIndex(
            (v) => item[this.selectKey] == v[this.selectKey]
          ),
          1
        );
      }
      this.deleteSelectIsCheckout();
      this.$emit("selectValue", this.selectList);
    },
  },
};
</script>
<style lang="scss" scoped>
.list-leave-to {
  opacity: 0;
  transform: translateX(200px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-200px);
}
.x-table {
  width: 100%;
  table-layout: fixed;
}

.x-table-item {
  color: #000000d9;
  font-weight: 500;
  padding: 16px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s ease;
  border-right: 1px solid #ebebeb;
  text-align: left;
  word-break: break-all;
}
td {
  word-break: break-all;
}
.TableContextBox {
  box-sizing: border-box;
  overflow-y: scroll;
}

.x-tableContent {
  color: #000000d9;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  background-color: #fff;
  font-size: 14px;
}

.x-tableContent > td {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px;
}

.TableContextBox {
  height: 300px;
  min-height: 300px;
  // width: 100%;
  overflow: auto;
  overflow-y: scroll;
  background: #fff;
}
.TableHeadBox {
  // width: 100%;
  overflow: auto;
  background: #fff;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 4px;
    height: 0px;
  }
}
.TableContextBox::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.TableContextBox::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.TableContextBox::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.youxuanfu {
  z-index: 2;
  position: sticky;
  box-shadow: inset 10px 0 8px -8px #00000026;
  right: 0px;
  background: #fff;
}
.zuoxuanfu {
  z-index: 2;
  position: sticky;
  box-shadow: inset 10px 0 8px -8px #00000026;
  left: 0px;
  background: #fff;
}
.checkbox {
  width: 20px;
  height: 20px;
}
</style>
