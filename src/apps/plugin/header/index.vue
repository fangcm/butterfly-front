<template>
  <div :class="['page-header', className]">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: {
      className: {
        type: [Object, String, Array],
        default: ''
      }
    }
  }
</script>
<style lang="less">
  .page-header {
    position: absolute;
    top: 0;
    width: 100%;
    background: #35495e;
/*    padding-top: 25px;
    height: 45px;*/
    z-index: 1;
  }
</style>