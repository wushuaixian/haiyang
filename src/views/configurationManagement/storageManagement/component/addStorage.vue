<template>
  <div class="addStorage">
    <p class="titleImg">
      <img :src="require('@/assets/images/titleImg.png')" alt="" />
    </p>
    <p class="addNewStorage">添加新存储</p>
    <p class="titleTip">请在下方填写存储信息</p>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      style="padding: 0 20px"
      :label-col="{
        style: {
          width: '100%',
          textAlign: 'left',
          fontSize: '14px',
        },
      }"
    >
      <a-form-item ref="name" label="存储名称" name="name">
        <input v-model="formState.storageName" />
      </a-form-item>
      <a-form-item ref="name" label="厂家" name="name">
        <input v-model="formState.manufactor" />
      </a-form-item>
      <a-form-item ref="name" label="存储类型" name="name">
        <a-select
          default-value=""
          v-model:value="formState.storageType"
          style="width: 100% height: 32px; background: #212d66"
        >
          <a-select-option
            v-for="item in storageTypeList"
            :key="item"
            :value="item"
          >
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item ref="name" label="挂载目录" name="name">
        <input v-model="formState.mountDirectory" />
      </a-form-item>
      <a-form-item ref="name" label="位置" name="name">
        <input v-model="formState.position" />
      </a-form-item>
      <a-form-item ref="name" label="火线值" name="name">
        <input v-model="formState.firewireValue" />
      </a-form-item>
      <a-form-item ref="name" label="启用" name="name">
        <a-switch
          checked-children="开"
          un-checked-children="关"
          v-model:checked="checked1"
        />
      </a-form-item>
    </a-form>
    <div class="line"></div>
    <div class="submit">
      <button>提交</button>
    </div>
    <div class="return" @click="go">
      <img :src="require('@/assets/images/u1609.svg')" alt="" />
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";
export default {
  props: {
    params: {
      type: Object,
      default: () => {},
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  setup(props, content) {
    const state = reactive({
      storageTypeList: ["集中存储"],
      formState: {
        storageName: "",
        manufactor: "",
        storageType: "",
        mountDirectory: "", // 挂载目录
        position: "",
        firewireValue: "",
      },
      rules: [],
    });
    const go = () => {
      content.emit("close");
    };
    onMounted(() => {
      console.log(props.status);
      console.log(props.params);
      if (props.status == 2) {
        let { storageName, manufactor, storageType, position, firewireValue } =
          props.params;
        state.formState.storageName = storageName;
        state.formState.manufactor = manufactor;
        state.formState.storageType = storageType;
        state.formState.firewireValue = firewireValue;
        state.formState.position = position;
      }
    });
    return {
      ...toRefs(state),
      go,
    };
  },
};
</script>
<style lang="scss" scoped>
.addStorage {
  width: 445px;
  background: #2d3d88;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom: 20px;
  p {
    margin: 0;
  }
  .titleImg {
    text-align: center;
    margin: 30px 0;
  }
  .addNewStorage {
    font-family: "微软雅黑", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 23px;
    text-align: center;
    color: #fff;
    line-height: 23px;
  }
  .titleTip {
    font-family: "微软雅黑", sans-serif;
    font-weight: 400;
    font-style: normal;
    margin-top: 10px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.647058823529412);
    text-align: center;
  }
  .line {
    width: 100%;
    border-bottom: 1px solid #263474;
    margin-top: 38px;
  }
  .submit {
    padding: 0 20px;
    margin-top: 13px;
    button {
      width: 100%;
      height: 38px;
      background: rgba($color: #5b92ff, $alpha: 1);
      border: 0px;
      color: #fff;
      outline-color: #fff;
      cursor: pointer;
      &:hover {
        background: rgba($color: #5b92ff, $alpha: 0.7);
      }
    }
  }
}
/deep/ .ant-form-item-label > label::after {
  content: "";
}
/deep/ .ant-form-item-label > label {
  color: rgba(168, 197, 255, 0.996078431372549);
  line-height: 14px;
}
/deep/ .ant-form-item {
  margin-bottom: 17px;
}
input {
  width: 100%;
  color: rgba(168, 197, 255, 0.996078431372549);
}
/deep/ .ant-select-selector {
  background: url("../../../../assets/images/u522.svg");
  background-size: 100% 100%;
  border: none;
}
/deep/ .ant-select-arrow {
  color: #a8c5ff;
}
/deep/ .ant-select:not(.ant-select-customize-input) .ant-select-selector {
  border: 0px;
  background: none;
}
.return {
  position: fixed;
  width: 40px;
  height: 40px;
  background: #4c64b9;
  bottom: 80px;
  right: 80px;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}
</style>
