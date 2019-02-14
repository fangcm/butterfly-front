<template>
  <v-container fluid pa-1 ma-0>
    <v-layout column>
      <v-flex v-for="data in dataList" :key="data.id" pa-0 ma-1>
        <v-card color="white">
          <v-flex xs12>
            <v-card-text class="font-weight-light">
              <v-layout align-center row wrap>
                <v-flex shrink pa-1>
                  <v-avatar slot="activator" size="36px">
                    <v-img class="elevation-6" :src="require('@/assets/image/head.jpg')"/>
                  </v-avatar>
                </v-flex>
                <v-flex shrink pa-2>
                  <span class="subheading" v-if="data.nickName">{{data.nickName}}</span>
                </v-flex>
                <v-flex shrink pa-2>
                  <v-icon small>phone</v-icon>
                  <span>{{data.mobile}}</span>
                </v-flex>
              </v-layout>
              <v-layout align-center row wrap>
                <v-flex shrink pa-1>
                  <v-chip outline color="blue">
                    <v-icon left small>accessibility</v-icon>
                    经纪人
                  </v-chip>
                  <v-chip outline color="blue" v-if="data.status===1">
                    <v-icon left small>accessibility</v-icon>
                    系统管理员
                  </v-chip>
                </v-flex>
                <v-flex shrink pa-2>
                  <v-icon small>email</v-icon>
                  <span>{{data.email}}</span>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>

          <v-card-actions class="pa-0">
            <v-flex shrink>
              <span class="red--text subheading ml-3" v-if="data.status===1">已禁用</span>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon color="blue darken-2" title="编辑">edit</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="orange darken-2" title="删除">delete</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="blue darken-1" title="设置角色">accessibility</v-icon>
            </v-btn>
            <v-btn icon v-if="data.status===0">
              <v-icon color="red darken-2" title="禁用">block</v-icon>
            </v-btn>
            <v-btn icon v-if="data.status===1">
              <v-icon color="green darken-3" title="启用">check_circle</v-icon>
            </v-btn>
          </v-card-actions>

        </v-card>

      </v-flex>
      <load-more :totalPages='totalPages' @nextPage="fetchNextPageData" v-if="isShowLoadMore"/>
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
  import {adminUserList} from '@/api/core-api'
  import SearchPanel from "@/components/SearchPanel"
  import LoadMore from '@/components/LoadMore'

  export default {
    components: {
      SearchPanel, LoadMore
    },
    data() {
      return {
        isShowLoadMore: false,
        pageNumber: 0,
        totalPages: 1,
        dataList: [],

        dialog: false
      }
    },
    methods: {
      fetchNextPageData() {
        console.log("fetchNextPageData ...");
        this.pageNumber = this.pageNumber + 1;
        this.fetchData();
      },
      fetchData() {
        console.log("fetchData ...");
        let _data = {'pageNumber': this.pageNumber};
        adminUserList(_data).then(
          data => {
            // 保存登录状态和信息
            this.dataList = this.dataList.concat(data.data.content);
            this.pageNumber = data.data.number;
            this.totalPages = data.data.totalPages;
            this.isShowLoadMore = !data.data.last;
            console.log("pageNumber :" + this.pageNumber)
            console.log("this.isShowLoadMore :" + this.isShowLoadMore)
          }
        ).catch((e) => {
        });
      },
    },
    created() {
      this.fetchData();
    }
  }
</script>
