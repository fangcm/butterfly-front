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
          <v-card-actions class="pa-1">
            <v-spacer></v-spacer>
            <v-btn icon @click.native="editItem(data)">
              <v-icon color="blue darken-2" title="编辑">edit</v-icon>
            </v-btn>
            <v-btn icon @click.native="deleteItem(data)">
              <v-icon color="orange darken-2" title="删除">delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex pa-0 ma-1>
        <load-more :totalPages='totalPages' @nextPage="fetchNextPageData" v-if="showLoadMore"/>
      </v-flex>
    </v-layout>

    <!-- 搜索栏 -->
    <v-navigation-drawer right v-model="showSearchDrawer" :disable-resize-watcher="true" fixed>
      <v-list>
        <v-list-tile class="my-2">
          <v-list-tile-title class="title">查询</v-list-tile-title>
        </v-list-tile>
        <slot name="search"/>
        <v-layout class="pl-1 pt-3 ml-1" row>
          <v-btn class="purple" fab small @click.native="searchData">
            <v-icon dark="">search</v-icon>
          </v-btn>
          <v-btn class="grey" fab small @click.native="showSearchDrawer = false">
            <v-icon dark="">clear</v-icon>
          </v-btn>
        </v-layout>
      </v-list>
    </v-navigation-drawer>

    <!-- 快捷按钮 -->
    <v-speed-dial top right fixed direction="bottom">
      <v-btn slot="activator" color="green" dark fab>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-tooltip left v-if="showSearchBtn">
        <v-btn fab dark small color="indigo" slot="activator" @click.native.stop="showSearchDrawer = !showSearchDrawer">
          <v-icon>search</v-icon>
        </v-btn>
        <span>条件查询</span>
      </v-tooltip>
      <v-tooltip left v-if="showAddNewBtn">
        <v-btn fab dark small color="red" slot="activator" @click.native="addNewItem">
          <v-icon>add</v-icon>
        </v-btn>
        <span>新增</span>
      </v-tooltip>
      <v-tooltip left>
        <v-btn fab dark small color="blue" slot="activator" @click.native="refreshData">
          <v-icon>refresh</v-icon>
        </v-btn>
        <span>刷新</span>
      </v-tooltip>
    </v-speed-dial>
  </v-container>
</template>

<script>
  import LoadMore from '@/components/LoadMore'

  export default {
    name: "CrudListPage",
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
      // 显示搜索按钮
      showSearchBtn: {type: Boolean, default: true},
      // 显示新增按钮
      showAddNewBtn: {type: Boolean, default: true},
    },
    data() {
      return {
        // 显示搜索框
        showSearchDrawer: false
      };
    },
    computed: {
      // 显示加载更多按钮
      showLoadMore() {
        return this.pageNumber < this.totalPages - 1;
      }
    },
    methods: {
      refreshData() {
        this.$emit("refreshData");
      },
      searchData() {
        this.showSearchDrawer = !this.showSearchDrawer;
        this.$emit('searchData');
      },
      fetchNextPageData() {
        this.$emit('fetchNextPageData');
      },
      addNewItem() {
        this.$emit("addNewItem");
      },
      editItem(item) {
        this.$emit("editItem", item);
      },
      deleteItem(item) {
        this.$emit('deleteItem', item);
      }
    }
  };
</script>
