<template>
  <base-list-page :dataList="dataList" :pageNumber="pageNumber" :totalPages="totalPages"
                  :addNewPath="/addNew"
                  @refreshData="refreshData" @searchData="fetchData">
    <template slot="row" slot-scope="{ data }">
    <v-card color="white" >
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
        <v-btn icon @click.native="edit(data.id)">
          <v-icon color="blue darken-2" title="编辑">edit</v-icon>
        </v-btn>
        <v-btn icon @click.native="remove(data.id)">
          <v-icon color="orange darken-2" title="删除">delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <template slot="search">
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field name="productName" label="Product" light v-model="searchVm.contains.productName"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <label class="heading text-sm-central" light>Price Range</label>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8 offset-xs1>
          <v-slider class="text-xs-central" label="Price 1" light v-bind:max="100"
                    v-model="searchVm.between.unitPrice.former"></v-slider>
        </v-flex>
        <v-flex xs3>
          <v-text-field type="number" light v-model="searchVm.between.unitPrice.former"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8 offset-xs1>
          <v-slider class="text-xs-central" label="Price 2" light v-bind:max="999"
                    v-model="searchVm.between.unitPrice.latter"></v-slider>
        </v-flex>
        <v-flex xs3>
          <v-text-field type="number" light v-model="searchVm.between.unitPrice.latter"></v-text-field>
        </v-flex>
      </v-layout>
    </template>
  </base-list-page>
</template>

<script>
  import {packagingMachineryList} from '@/api/machinery-api'
  import BaseListPage from '@/components/BaseListPage'

  export default {
    components: {
      BaseListPage
    },
    data() {
      return {
        isShowLoadMore: false,
        pageNumber: 0,
        totalPages: 1,
        dataList: [],

        machineryTypeList: {"1": "打包机", "2": "运输货车"},

        searchVm: {
          contains: {
            productName: "",
            category: ""
          },
          between: {
            unitPrice: {
              former: 0,
              latter: 0
            }
          }
        }
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
        packagingMachineryList(_data).then(
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
