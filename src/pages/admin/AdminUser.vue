<template>
  <base-list-page :dataList="dataList" :pageNumber="pageNumber" :totalPages="totalPages" addNewPath="/addNew"
                  @fetchNextPageData="fetchNextPageData" @refreshData="refreshData" @searchData="fetchData">
    <template slot="row" slot-scope="props">
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
                <span class="subheading" v-if="props.row.nickName">{{props.row.nickName}}</span>
              </v-flex>
              <v-flex shrink pa-2>
                <v-icon small>phone</v-icon>
                <span>{{props.row.mobile}}</span>
              </v-flex>
            </v-layout>
            <v-layout align-center row wrap>
              <v-flex shrink pa-1>
                <v-chip outline color="blue">
                  <v-icon left small>accessibility</v-icon>
                  经纪人
                </v-chip>
                <v-chip outline color="blue" v-if="props.row.status===1">
                  <v-icon left small>accessibility</v-icon>
                  系统管理员
                </v-chip>
              </v-flex>
              <v-flex shrink pa-2>
                <v-icon small>email</v-icon>
                <span>{{props.row.email}}</span>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-flex>

        <v-card-actions class="pa-0">
          <v-flex shrink>
            <span class="red--text subheading ml-3" v-if="props.row.status===1">已禁用</span>
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
          <v-btn icon v-if="props.row.status===0">
            <v-icon color="red darken-2" title="禁用">block</v-icon>
          </v-btn>
          <v-btn icon v-if="props.row.status===1">
            <v-icon color="green darken-3" title="启用">check_circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
    <template slot="search">
    </template>
  </base-list-page>
</template>

<script>
  import {adminUserList} from '@/api/core-api'
  import BaseListPage from '@/components/BaseListPage'

  export default {
    components: {
      BaseListPage
    },
    data() {
      return {
        pageNumber: 0,
        totalPages: 1,
        dataList: [],
      }
    },
    methods: {
      refreshData() {
        console.log("refreshData ...");
        this.pageNumber = 0;
        this.dataList = [];
        this.fetchData();
      },
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
            console.log("pageNumber :" + this.pageNumber)
            console.log("totalPages :" + this.totalPages)
          }
        ).catch((e) => {
        });
      },
      edit(item) {
        this.$router.push({
          name: "Product",
          params: {id: item.id}
        });
      },
      remove(item) {
        this.productId = item.id;
        this.dialog = true;
      }
    },
    created() {
      this.refreshData();
    }
  }
</script>
