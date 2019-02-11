<template>
  <v-container fluid pa-1 ma-0>
    <v-layout column>
      <v-flex v-for="data in dataList" :key="data.id" pa-0 ma-1>
        <v-card color="white">
          <v-flex xs12>
            <v-card-text class="font-weight-light">
              <v-layout align-center row wrap>
                <v-flex shrink pa-2>
                  <span class="subheading" v-if="data.model">{{data.model}}</span>
                </v-flex>
              </v-layout>
              <v-layout align-center row wrap>
                <v-flex shrink pa-2>
                  <span>编号:</span>
                  <span>{{data.code}}</span>
                </v-flex>
                <v-flex shrink pa-2>
                  <span>类型:</span>
                  <span>{{machineryTypeList[data.type.toString()]}}</span>
                </v-flex>
                <v-flex shrink pa-2>
                  <span>工作负载:</span>
                  <span>{{data.workload}}</span>
                  <span>{{data.unit}}</span>
                </v-flex>
                <v-flex shrink pa-2>
                  <span>归属:</span>
                  <span>{{data.belongTo === 1 ? '公司所有': '个人私有'}}</span>
                </v-flex>
                <v-flex shrink pa-2>
                  <span>使用管理人:</span>
                  <span>{{data.personInCharge}}</span>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>

          <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon color="blue darken-2" title="编辑">edit</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="orange darken-2" title="删除">delete</v-icon>
            </v-btn>
          </v-card-actions>

        </v-card>

      </v-flex>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"/>
    </v-layout>

    <v-speed-dial top right fixed direction="bottom">
      <v-btn slot="activator" color="green" dark fab>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <v-tooltip left>
        <v-btn fab dark small color="indigo" slot="activator" @click="dialog=!dialog">
          <v-icon>search</v-icon>
        </v-btn>
        <span>条件查询</span>
      </v-tooltip>
      <v-tooltip left>
        <v-btn fab dark small color="red" slot="activator" @click="dialog=!dialog">
          <v-icon>add</v-icon>
        </v-btn>
        <span>新增</span>
      </v-tooltip>
    </v-speed-dial>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">Add New</v-card-title>
        <v-container>
          <v-textarea full-width></v-textarea>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

</template>

<script>
  import {packagingMachineryList} from '@/api/machinery-api'

  export default {
    data() {
      return {
        pageNumber: 0,
        pageSize: 10,
        isLoading: false,
        isLoadAll: false,
        dataList: [],
        machineryTypeList: {"1": "打包机", "2": "运输货车"},

        atThisPage: true, // 在使用了keep-alive包裹显示组件的情况下，需要判断当前激活的组件是不是此组件，是的话才加载数据
        dialog: false
      }
    },
    methods: {
      async loadMore() {
        console.log("load data ...")
        if (!this.isLoading && !this.isLoadAll) {
          await this.fetchData();
          this.pageNumber++
        }
      },
      fetchData() {
        console.log("fetchData ...");
        this.isLoading = true;
        if (this.atThisPage) {
          let _data = {'pageSize': this.pageSize};
          packagingMachineryList(_data).then(
            data => {
              this.isLoading = false;
              // 保存登录状态和信息
              this.dataList = data.data.content;
              this.isLoadAll = data.data.last;
              this.pageNumber = data.data.number;
            },
            err => {
              console.log(err);
              this.isLoading = false
            }
          );
        }
        console.log(this.isLoading)
      }
    },
    created() {
      this.isLoadAll = false;
      this.pageNumber = 0;
      this.loadMore();
    },
    activated() {
      this.atThisPage = true
    },
    deactivated() {
      this.atThisPage = false
    }
  }
</script>
