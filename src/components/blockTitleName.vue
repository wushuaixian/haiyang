<template>
  <div class="title">
    <span></span><span><slot /></span>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 24px;
  span:nth-child(1) {
    height: 21px;
    background-color: rgba(65, 242, 231, 1);
    border-width: 2px;
    border-style: solid;
    border-color: rgba(15, 189, 178, 1);
    box-shadow: 0px 0px 5px rgb(65, 242, 231);
  }
  span:nth-child(2) {
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #a8c5ff;
    margin-left: 18px;
  }
}
</style>
