<template>
  <v-btn block flat large @click.native="nextPage">
    {{bottomText}}
  </v-btn>
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
