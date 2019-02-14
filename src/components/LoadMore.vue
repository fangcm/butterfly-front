<template>
  <div>
    <div class="click_more" @click="next">
      {{moreText}}
    </div>
  </div>
</template>

<script>
  /**
   * 加载更多
   * @param  {String} isPage  页面总页数
   * @return  next事件，返回当前页数
   */
  export default {
    name: "LoadMore",
    props: ['isPage'],
    data() {
      return {
        moreText: '点击加载更多',
        page: 1
      };
    },
    mounted: function () {
      this.$nextTick(function () {

      })
    },
    created() {
    },
    methods: {
      // 点击加载更多
      next() {
        if (this.page < this.isPage) {
          this.page++;
          this.$emit("next", this.page);
        } else {
          this.moreText = "全部加载完成";
        }
      }
    }
  };
</script>

<style scoped lang="less">
  .click_more {
    width: 100%;
    height: 40px;
    background: #FFFFFF;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin-bottom: 100px;
    color: #415967;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
</style>

