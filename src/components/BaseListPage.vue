<template>
  <v-container fluid pa-1 ma-0>
    <v-layout column>
      <v-flex v-for="data in dataList" :key="data.id" pa-0 ma-1>
        <v-card color="white">
          <v-flex xs12>
            <v-card-text class="font-weight-light">
              <slot name="row" :row="data"/>
            </v-card-text>
          </v-flex>
          <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <slot name="action" :row="data"/>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex pa-0 ma-1>
        <load-more :totalPages='totalPages' @nextPage="fetchNextPageData" v-if="showLoadMore"/>
      </v-flex>
    </v-layout>
    <slot name="other"/>
  </v-container>
</template>

<script>
  import LoadMore from '@/components/LoadMore'

  export default {
    name: "BaseListPage",
    components: {
      LoadMore
    },
    props: {
      // 数据列表
      dataList: {type: Array, required: true},
      // 当前页面
      pageNumber: {type: Number, default: 0},
      // 总页数
      totalPages: {type: Number, default: 1},
    },
    computed: {
      // 显示加载更多按钮
      showLoadMore() {
        return this.pageNumber < this.totalPages - 1;
      }
    },
    methods: {
      fetchNextPageData() {
        this.$emit('fetchNextPageData');
      }
    }
  };
</script>
