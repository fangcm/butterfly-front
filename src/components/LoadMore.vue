<template>
  <div>
    <div class="click_more" @click="nextPage">
      {{bottomText}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoadMore",
    props: ['totalPages'],
    data() {
      return {
        bottomText: '点击加载更多',
        pageNumber: 1
      };
    },
    created() {
    },
    methods: {
      nextPage() {
        if (this.pageNumber < this.totalPages) {
          this.pageNumber++;
          this.$emit("nextPage", this.pageNumber);
        } else {
          this.bottomText = "全部加载完成";
        }
      }
    }
  };
</script>

<style scoped lang="less">
  .click_more {
    width: 100%;
    height: 40px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0);
    border-radius: 4px;
    margin-bottom: 50px;
    color: #415967;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
</style>

