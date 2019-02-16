<template>
  <base-list-page :dataList="dataList" :pageNumber="pageNumber" :totalPages="totalPages" addNewPath="/addNew"
                  @fetchNextPageData="fetchNextPageData" @refreshData="refreshData" @searchData="fetchData">
    <template slot="row" slot-scope="props">
      <v-card color="white">
        <v-flex xs12>
          <v-card-text class="font-weight-light">
            <v-layout row wrap>
              <v-flex shrink pa-2>
                <v-icon>accessibility</v-icon>
                <span class="subheading mr-2"> {{props.row.name}}</span>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex shrink pa-2>
                <span class=" mr-2" v-if="props.row.roleCode">代码 {{props.row.roleCode}}</span>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-flex>

        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon color="blue-grey darken-3" title="编辑">edit</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="blue-grey darken-3" title="删除">delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
    <template slot="search">
    </template>
  </base-list-page>
</template>

<script>
  import {adminRoleList} from '@/api/core-api'
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
        adminRoleList(_data).then(
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
