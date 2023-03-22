<template>
  <div class="user" ref="user">
    <div class="serarchBox">
      <a-form
        ref="queryForm"
        :labelCol="{ span: 6 }"
        :wrapperCol="{ span: 16 }"
      >
        <a-row style="line-height: 65px">
          <a-col :span="24">
            <a-row>
              <a-col :span="10">
                <a-form-item label="用户名：" style="margin-bottom: 0">
                  <a-input
                    class=""
                    v-model:value="formObj.username"
                    placeholder="请输入用户名称"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item label="" style="margin-bottom: 0">
                  <div class="data_right_btn">
                    <a-button
                      class="search"
                      style="background-color: rgb(130, 158, 213)"
                      @click="submitForm"
                    >
                      <SearchOutlined class="btn" />
                    </a-button>
                    <a-button
                      class="search"
                      style="margin-left: 10px"
                      @click="resetForm"
                    >
                      <img
                        class="btn"
                        src="@/assets/img/find_replace_u1137.svg"
                        alt=""
                      />
                    </a-button>
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="context">
      <div class="topBtn">
        <span @click="addUser">
          <plus-outlined />
        </span>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <span @click="deleteUsersSelect">
          <minus-outlined />
        </span>
      </div>
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        :row-key="(record) => record.id"
        :scroll="{
          y: tableHeight,
        }"
        :row-selection="{
          selectedRowKeys: selectedKeys,
          onChange: onSelectChange,
          getCheckboxProps: getCheckboxProps,
        }"
      >
        <template #active="{ text }">
          <a-tag v-if="text === 0" color="success">
            <template #icon><CheckCircleOutlined /></template>启用
          </a-tag>
          <a-tag v-else color="default">
            <template #icon><MinusCircleOutlined /></template>禁用
          </a-tag>
        </template>
        <template #userlevel="{ text }">
          <a-tag v-if="text === 0" color="success"> 项目管理员 </a-tag>
          <a-tag v-else-if="text === 1" color="cyan"> 部门管理员 </a-tag>
          <a-tag v-else color="blue"> 系统操作员 </a-tag>
        </template>
      </a-table>
    </div>
    <div class="addBox" v-if="addUserVisible">
      <div class="add">
        <div class="title">
          <span class="line"></span>
          <span>添加用户</span>
          <span class="line"></span>
        </div>
        <div class="content">
          <a-form :model="formState" layout="vertical">
            <a-form-item label="用户名">
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="密码">
              <a-input
                v-model:value="formState.password"
                type="password"
                autocomplete="off"
              />
            </a-form-item>
            <a-form-item label="确认密码">
              <a-input
                v-model:value="formState.password2"
                type="password"
                autocomplete="off"
              />
            </a-form-item>
            <a-form-item label="所在部门">
              <a-select
                v-model:value="formState.departmentid"
                placeholder="请选择所在部门"
              >
                <a-select-option value="0">开发</a-select-option>
                <a-select-option value="1">运行监测</a-select-option>
                <a-select-option value="2">订单服务</a-select-option>
                <a-select-option value="3">项目执行</a-select-option>
                <a-select-option value="4">市场销售</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="使用人">
              <a-input v-model:value="formState.realname" />
            </a-form-item>
            <a-form-item label="用户类型">
              <a-select
                v-model:value="formState.userlevel"
                placeholder="请选择所在部门"
              >
                <a-select-option value="0">项目管理员</a-select-option>
                <a-select-option value="1">部门管理员</a-select-option>
                <a-select-option value="2">系统操作员</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
        <div class="bottomBox">
          <a-button class="btn" @click="addUserHandle">提交</a-button>
          <button class="btn" @click="addUserVisible = false">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManageTitle from "@/components/ManageTitle";
import {
  computed,
  onMounted,
  reactive,
  ref,
  toRefs,
  createVNode,
  nextTick,
} from "vue";
import {
  PlusOutlined,
  MinusOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  RedoOutlined,
} from "@ant-design/icons-vue";
import { notification, Modal } from "ant-design-vue";
import { list, add, deleteUser, deleteUsers } from "@/api/user";
import { useStore } from "vuex";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "部门",
    dataIndex: "departmentname",
    key: "departmentname",
  },
  {
    title: "姓名",
    dataIndex: "realname",
    key: "realname",
  },
  {
    title: "创建时间",
    dataIndex: "createtime",
    key: "createtime",
  },
  {
    title: "状态",
    dataIndex: "active",
    key: "active",
    slots: { customRender: "active" },
  },
  {
    title: "用户类型",
    dataIndex: "userlevel",
    key: "userlevel",
    slots: { customRender: "userlevel" },
  },
];

export default {
  components: {
    ManageTitle,
    PlusOutlined,
    MinusOutlined,
    MinusCircleOutlined,
    CheckCircleOutlined,
    SearchOutlined,
    RedoOutlined,
  },
  setup() {
    // 搜索
    const formObj = reactive({
      username: "",
    });
    const state = reactive({
      tableHeight: 0,
      dataSource: [],
      selectedKeys: [],
    });
    const addUserVisible = ref(false);
    const formState = reactive({
      username: "",
      password: "",
      password2: "",
      departmentid: undefined,
      realname: "",
      userlevel: undefined,
      active: 0,
    });
    const resetFormState = () => {
      formState.username = "";
      formState.password = "";
      formState.password2 = "";
      formState.departmentid = undefined;
      formState.realname = "";
      formState.userlevel = undefined;
    };
    let user = ref();
    onMounted(() => {
      nextTick(() => {
        state.tableHeight = user.value.clientHeight - 250;
      });
      submitForm();
    });
    const submitForm = () => {
      state.selectedKeys = [];
      list(formObj.username).then((res) => {
        state.dataSource = [...res.data];
      });
    };

    const resetForm = () => {
      formObj.username = "";
      submitForm();
    };

    const addUser = () => {
      addUserVisible.value = true;
    };
    const addUserHandle = () => {
      add(formState)
        .then((res) => {
          resetFormState();
          console.log("add ,res = ", res);
          notification["success"]({
            message: "提示",
            description: res.message,
          });
          addUserVisible.value = false;
          submitForm();
        })
        .catch((reason) => {
          notification["error"]({
            message: "警告",
            description: reason,
          });
          addUserVisible.value = false;
          submitForm();
        });
    };
    const selectedUserKeys = reactive([]);
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        selectedUserKeys.length = 0;
        selectedUserKeys.push(...selectedRowKeys);
      },
    };
    const getCheckboxProps = (record) => {
      return {
        disabled: record.username === loginUser.value.username,
        // Column configuration not to be checked
        username: record.username,
      };
    };
    const store = useStore();
    const loginUser = computed(() => {
      return JSON.parse(store.state.user.loginUser);
    });
    // const deleteUsers = () => {
    //   selectedUserKeys.forEach((item) => {
    //     console.log("selectedUserKeys", item);
    //     deleteUser(item)
    //       .then((res) => {
    //         notification["success"]({
    //           message: "提示",
    //           description: res.message,
    //         });
    //         submitForm();
    //       })
    //       .catch((reason) => {
    //         notification["error"]({
    //           message: "警告",
    //           description: reason,
    //         });
    //         submitForm();
    //       });
    //   });
    // };
    const deleteUsersSelect = () => {
      let idstr = [];
      state.selectedKeys.forEach((item) => {
        console.log("selectedUserKeys", item);
        idstr.push(item);
      });
      if (idstr.length == 0) {
        return notification["error"]({
          message: "警告",
          description: "请勾选要删除的数据！",
        });
      } else {
        Modal.confirm({
          title: "您是否要删除勾选的数据？",
          icon: createVNode(ExclamationCircleOutlined),
          okText: "确认",
          cancelText: "取消",
          onOk() {
            console.log(idstr);
            deleteUsers({ id: idstr.join(",") })
              .then((res) => {
                notification["success"]({
                  message: "提示",
                  description: res.message,
                });
                submitForm();
              })
              .catch((reason) => {
                submitForm();
              });
          },
        });
      }
    };
    const onSelectChange = (selectedRowKeys) => {
      state.selectedKeys = [...selectedRowKeys];
    };
    return {
      user,
      onSelectChange,
      getCheckboxProps,
      deleteUsersSelect,
      formObj,
      ...toRefs(state),
      addUserVisible,
      columns,
      submitForm,
      resetForm,
      addUser,
      deleteUsers,
      addUserHandle,
      formState,
      rowSelection,
      selectedUserKeys,
      labelCol: { style: { width: "140px" } },
      wrapperCol: { span: 14 },
    };
  },
};
</script>

<style lang="less" scoped>
.user {
  .serarchBox {
    padding-top: 15px;
    width: 100%;
    height: 65px;
    background: rgba(245, 247, 250, 0.894);
    border-width: 1px;
    border-style: solid;
    border-color: rgb(211, 217, 230);
    border-radius: 2px;
    line-height: 65px;
    /deep/ .ant-form-item-label > label {
      color: rgb(105, 124, 162);
      font-size: 14px;
    }
  }
  .context {
    margin-top: 20px;
  }
  padding: 20px 30px;
  .topBtn {
    width: 82px;
    height: 22px;
    font-size: 15px;
    background-color: rgba(130, 158, 213, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(96, 128, 189, 1);
    border-radius: 2px;
    color: #fff;
    span {
      &:hover {
        cursor: pointer;
        color: #1e2257;
      }
      width: 38px;
      display: inline-block;
      height: 100%;
      line-height: 22px;
      vertical-align: top;
    }
    ul {
      margin-top: 2px;
      display: inline-block;
      li {
        width: 3px;
        height: 3px;
        background: #6080bd;
        margin: 2px 0;
      }
    }
  }
}
.addBox {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  .add {
    position: absolute;
    width: 418px;
    top: calc(50% - 605px / 2);
    left: calc(50% - 418px / 2);
    background: #fff;
    .content {
      padding: 0px 32px 0;
      h3 {
        color: #697ca2;
        margin: 25px 0 10px;
        font-size: 14px;
        /deep/ .ant-switch-checked {
          background-color: #829ed5;
        }
      }
    }
    .title {
      height: 21px;
      line-height: 21px;
      text-align: center;
      font-weight: 700;
      font-style: normal;
      font-size: 16px;
      margin: 15px 0;
      color: rgb(71, 69, 84);
      .line {
        width: 32px;
        height: 1px;
        display: inline-block;
        background: linear-gradient(
          91.7899deg,
          rgb(130, 158, 213) 0%,
          rgb(134, 140, 201) 50%,
          rgb(140, 121, 185) 100%
        );
        vertical-align: middle;
      }
    }
    h3 {
    }
    .bottomBox {
      width: 100%;
      height: 38px;
      border-top: 1px solid #dcdfe6;
      text-align: right;
      .btn {
        width: 50%;
        height: 100%;
        color: rgb(130, 158, 213);
        &:hover {
          border-width: 0px;
          cursor: pointer;
        }
        &:focus {
          border-width: 0px;
        }
        &:nth-child(1) {
          background: #829ed5;
          color: #fff;
        }
      }
    }
  }
}
.data_right_btn {
  .search {
    width: 45px;
    height: 30px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(96, 128, 189);
    font-size: 19px;
    line-height: 21px;
    .btn {
      color: #fff;
      margin-left: -2px;
    }
  }
}
</style>
