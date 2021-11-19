<template>
  <div class="storageManagement">
    <BlockTitleName>存储管理</BlockTitleName>
    <div class="content" v-if="!addStorageVisible">
      <p class="titleTip">
        <img
          :src="require('@/assets/images/report_problem_u263.svg')"
          alt=""
        />使用容量超过火线值时，该存储在下方表格u中将被标记为红色底色。
      </p>
      <a-button class="retry" @click="addStorage"
        ><img
          :src="require('@/assets/images/add_u119.svg')"
          alt=""
        />添加</a-button
      >
      <s-Table
        style="margin-top: 14px"
        :dataSource="dataSource"
        :columns="columns"
        :total="200"
        ><template #action="scoped">
          <div class="option">
            <a-tooltip placement="top">
              <template #title>
                <span>编辑</span>
              </template>
              <img
                @click="editStorge(scoped.record)"
                :src="require('@/assets/images/bianji.svg')"
                alt=""
              />
            </a-tooltip>
            <a-tooltip placement="top" v-if="scoped.record.enable == 1">
              <template #title>
                <span>停用</span>
              </template>
              <img
                :src="require('@/assets/images/pause_circle_outline_u170.svg')"
                alt=""
              />
            </a-tooltip>
            <a-tooltip placement="top" v-else>
              <template #title>
                <span>启用</span>
              </template>
              <img
                :src="require('@/assets/images/play_circle_outline_u253.svg')"
                alt=""
              />
            </a-tooltip>
            <a-tooltip placement="top">
              <template #title>
                <span>删除</span>
              </template>
              <img
                :src="require('@/assets/images/delete_forever_u182.svg')"
                alt=""
              />
            </a-tooltip>
          </div>
        </template>
        <template #usedCapacity="scoped">
          <div v-if="scoped.record.enable == 1">
            {{ scoped.record.usedCapacity }}
          </div>
          <div v-else style="background: #ff4474; color: #fff">
            {{ scoped.record.usedCapacity }}
            <a-tooltip placement="top">
              <template #title>
                <span>容量警告</span>
              </template>
              <img
                style="vertical-align: -1px"
                :src="require('@/assets/images/report_problem_u153.svg')"
                alt=""
              />
            </a-tooltip>
          </div>
        </template>
        <template #enable="scoped">
          <img
            v-if="scoped.record.enable == 1"
            :src="require('@/assets/images/u1771.svg')"
            alt=""
          />
          <img v-else :src="require('@/assets/images/u141.svg')" alt="" />
        </template>
      </s-Table>
    </div>
    <AddStorage
      v-if="addStorageVisible"
      :params="edit"
      @close="addStorageVisible = false"
      :status="editType"
    />
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import AddStorage from "./component/addStorage.vue";
export default {
  components: {
    AddStorage,
  },
  setup() {
    const state = reactive({
      columns: [
        { title: "存储名称", dataIndex: "storageName", key: "storageName" },
        { title: "位置", dataIndex: "position", key: "position" },
        { title: "厂家", dataIndex: "manufactor", key: "manufactor" },
        { title: "存储类型", dataIndex: "storageType", key: "storageType" },
        { title: "总容量", dataIndex: "totalCapacity", key: "totalCapacity" },
        {
          title: "已用容量",
          slots: { customRender: "usedCapacity" },
          key: "usedCapacity",
        },
        {
          title: "剩余容量",
          dataIndex: "residualCapacity",
          key: "residualCapacity",
        },
        { title: "火线值", dataIndex: "firewireValue", key: "firewireValue" },
        { title: "启用", slots: { customRender: "enable" }, key: "enable" },
        {
          title: "操作",
          dataIndex: "action",
          slots: { customRender: "action" },
        },
      ],
      dataSource: [
        {
          storageName: "华为OceanStor 9000",
          position: "云泰机房",
          manufactor: "华为",
          storageType: "集中存储",
          totalCapacity: "100T",
          usedCapacity: "40T",
          residualCapacity: "60T",
          firewireValue: "80% ",
          enable: 1,
        },
        {
          storageName: "华为OceanStor 8000",
          position: "云泰机房",
          manufactor: "华为",
          storageType: "集中存储",
          totalCapacity: "100T",
          usedCapacity: "40T",
          residualCapacity: "10T",
          firewireValue: "80% ",
          enable: 1,
        },
        {
          storageName: "华为OceanStor 7000",
          position: "中心机房",
          manufactor: "华为",
          storageType: "集中存储",
          totalCapacity: "100T",
          usedCapacity: "90T",
          residualCapacity: "10T",
          firewireValue: "80% ",
          enable: 0,
        },
        {
          storageName: "华为OceanStor 6000",
          position: "牡丹江机房",
          manufactor: "华为",
          storageType: "集中存储",
          totalCapacity: "100T",
          usedCapacity: "40T",
          residualCapacity: "10T",
          firewireValue: "80% ",
          enable: 1,
        },
        {
          storageName: "华为OceanStor 5000",
          position: "交换区",
          manufactor: "华为",
          storageType: "集中存储",
          totalCapacity: "100T",
          usedCapacity: "40T",
          residualCapacity: "10T",
          firewireValue: "80% ",
          enable: 1,
        },
      ],
      addStorageVisible: false,
      edit: {},
      editType: 1,
    });
    const addStorage = () => {
      state.editType = 1;
      state.addStorageVisible = true;
    };
    const editStorge = (params) => {
      state.edit = params;
      state.editType = 2;
      state.addStorageVisible = true;
    };
    return {
      ...toRefs(state),
      editStorge,
      addStorage,
    };
  },
};
</script>
<style lang="scss" scoped>
.storageManagement {
  width: 100%;
  min-height: 800px;
  padding: 20px 30px;
  .content {
    background: #2d3d88;
    padding: 15px;
    .titleTip {
      img {
        margin: 0 10px;
      }
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color: rgba(47, 76, 133, 0.996078431372549);
      line-height: 50px;
      background-color: rgba(222, 233, 255, 1);
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(209, 224, 255, 1);
      border-radius: 2px;
    }
  }
}
.retry {
  width: 83px;
  height: 32px;
  line-height: 32px;
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
  img {
    margin-right: 5px;
    margin-top: -5px;
  }
  &:hover {
    background: #1b83ed;
  }
}
.option {
  img {
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
