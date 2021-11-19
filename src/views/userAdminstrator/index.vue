<template>
  <div class="storageManagement">
    <BlockTitleName>用户管理</BlockTitleName>
    <div class="content" v-if="!addUserVisible && !changePasswordVisible">
      <TitleName>用户列表</TitleName>

      <a-button class="retry" @click="addUser('add')"
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
        ><template #action>
          <div class="option">
            <a-tooltip placement="top">
              <template #title>
                <span>编辑</span>
              </template>
              <img
                @click="addUser('create')"
                :src="require('@/assets/images/bianji.svg')"
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
        <template #available="scoped">
          <img
            v-if="scoped.record.available == 1"
            :src="require('@/assets/images/u1771.svg')"
            alt=""
          />
          <img v-else :src="require('@/assets/images/u141.svg')" alt="" />
        </template>
        <template #gender="scoped">
          <img
            v-if="scoped.record.gender == 1"
            :src="require('@/assets/images/u4484.svg')"
            alt=""
          />
          <img v-else :src="require('@/assets/images/u4478.svg')" alt="" />
        </template>
      </s-Table>
    </div>
    <CreateUser
      :type="type"
      v-if="addUserVisible"
      @close="addUserVisible = false"
      @showChangePassword="changePasswordVisible = true"
    />
    <ChangePassword
      v-if="changePasswordVisible"
      @close="changePasswordVisible = false"
    />
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import CreateUser from "./component/createUser.vue";
import ChangePassword from "./changePassword.vue";
export default {
  components: {
    CreateUser,
    ChangePassword,
  },
  setup() {
    const state = reactive({
      type: "add",
      changePasswordVisible: false,
      columns: [
        { title: "用户名", dataIndex: "userName", key: "userName" },
        { title: "真实姓名", dataIndex: "realName", key: "realName" },
        { title: "性别", slots: { customRender: "gender" }, key: "gender" },
        { title: "所属部门", dataIndex: "department", key: "department" },
        {
          title: "联系方式",
          dataIndex: "contactInformation",
          key: "contactInformation",
        },
        {
          title: "权限名称",
          dataIndex: "permissionName",
          key: "permissionName",
        },
        {
          title: "可用",
          slots: { customRender: "available" },
          key: "available",
        },
        {
          title: "操作",
          dataIndex: "action",
          slots: { customRender: "action" },
        },
      ],
      dataSource: [
        {
          userName: "admin",
          realName: "admin",
          Gender: 1,
          department: "运行管理部",
          contactInformation: "12843723747",
          permissionName: "超级管理员",
          available: 1,
        },
      ],
      addUserVisible: false,
    });
    const addUser = (value) => {
      state.type = value;
      state.addUserVisible = true;
    };
    return {
      ...toRefs(state),
      addUser,
    };
  },
};
</script>
<style lang="scss" scoped>
.storageManagement {
  width: 100%;
  padding: 20px 30px;
  min-height: 800px;
  .content {
    background: #2d3d88;
    padding: 15px;
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
