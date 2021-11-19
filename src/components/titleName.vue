<template>
  <div class="titleName">
    <img :src="require('../assets/images/u131.svg')" alt="" />
    <span><slot></slot></span>
    <a-tooltip placement="top">
      <template #title>
        <span>更多</span>
      </template>
      <img
        v-if="moreVisible"
        src="../assets/images/u130.svg"
        class="more"
        alt=""
        @click="moreFunc"
      />
    </a-tooltip>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  props: {
    moreVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, content) {
    const state = reactive({});
    const moreFunc = () => {
      content.emit("moreClick");
    };
    return {
      ...toRefs(state),
      moreFunc,
    };
  },
};
</script>
<style lang="scss" scoped>
.titleName {
  width: 100%;
  height: 40px;
  line-height: 40px;
  span {
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    color: #ffffff;
    text-align: left;
    line-height: 18px;
    margin-left: 10px;
  }
  .more {
    float: right;
    margin-top: 17px;
    cursor: pointer;
  }
}
</style>
