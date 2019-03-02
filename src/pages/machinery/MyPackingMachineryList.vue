<template>
  <base-list-page :dataList="dataList" :pageNumber="pageNumber" :totalPages="totalPages"
                  @fetchNextPageData="fetchNextPageData">
    <template slot="row" slot-scope="props">
      <v-layout align-center row wrap>
        <v-flex shrink pa-2>
          <span class="subheading">{{props.row.type|packingMachineryTypeFilter}}</span>
          <span v-if="props.row.code">&nbsp;:&nbsp;{{props.row.code}}</span>
        </v-flex>
      </v-layout>
      <v-layout align-center row wrap>
        <v-flex shrink pa-2>
          <span>型号&nbsp;:&nbsp;</span>
          <span>{{props.row.model}}</span>
        </v-flex>
        <v-flex shrink pa-2>
          <span>工作负载&nbsp;:&nbsp;</span>
          <span>{{props.row.workload}}</span>
          <span>{{props.row.unit}}</span>
        </v-flex>
        <v-flex shrink pa-2>
          <span>今日打包量&nbsp;:&nbsp;</span>
          <span class="red--text text--darken-2">{{props.row.workload}}</span>
          <span>{{props.row.unit}}</span>
        </v-flex>
      </v-layout>
    </template>
    <template slot="action" slot-scope="props">
      <v-spacer></v-spacer>
      <v-btn dark color="indigo" @click.native="packingData(props.row)">
        <v-icon left>gavel</v-icon>
        打包数据
      </v-btn>
    </template>
  </base-list-page>
</template>

<script>
  import {myPackingMachineryList} from '@/api/machinery-api'
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
      fetchNextPageData() {
        console.log("fetchNextPageData ...");
        this.pageNumber = this.pageNumber + 1;
        this.fetchData();
      },
      fetchData() {
        console.log("fetchData ...");
        let _data = {'pageNumber': this.pageNumber};
        myPackingMachineryList(_data).then(
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
      packingData(item) {
        console.log(item)
        this.$router.push({
          name: "myPackingDataList",
          params: {id: item.id}
        });
      },

    },
    created() {
      this.pageNumber = 0;
      this.dataList = [];
      this.fetchData();
    }
  }
</script>
