<template>
  <crud-list-page :dataList="dataList" :pageNumber="pageNumber" :totalPages="totalPages"
                  @fetchNextPageData="fetchNextPageData" @refreshData="refreshData" @searchData="fetchData"
                  @addNewItem="addNewItem" @editItem="editItem" @deleteItem="deleteItem">
    <template slot="row" slot-scope="props">
      <v-layout align-center row wrap>
        <v-flex shrink pa-2>
          <span class="subheading">开工时间&nbsp;:&nbsp;</span>
          <span>{{props.row.startDate}}</span>
        </v-flex>
        <v-flex shrink pa-2>
          <span class="subheading">收工时间&nbsp;:&nbsp;</span>
          <span>{{props.row.endDate}}</span>
        </v-flex>
      </v-layout>
      <v-layout align-center row wrap>
        <v-flex shrink pa-2>
          <span>操作员&nbsp;:&nbsp;</span>
          <span>{{props.row.operator}}</span>
        </v-flex>
        <v-flex shrink pa-2>
          <span>作业量&nbsp;:&nbsp;</span>
          <span>{{props.row.workload}}</span>
          <span>{{props.row.unit}}</span>
        </v-flex>
        <v-flex shrink pa-2>
          <span>工作区域&nbsp;:&nbsp;</span>
          <span>{{props.row.address}}</span>
        </v-flex>
        <v-flex shrink pa-2 v-if="props.row.abnormalFlag">
          <span class="red--text text--darken-2">异常描述&nbsp;:&nbsp;</span>
          <span class="red--text text--darken-2">{{props.row.abnormalDesc}}</span>
        </v-flex>
      </v-layout>
    </template>
    <template slot="search">
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-text-field name="productName" label="开工时间" light
                        v-model="searchVm.productName"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-text-field name="productName" label="操作员" light
                        v-model="searchVm.productName"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-text-field name="productName" label="工作区域" light
                        v-model="searchVm.productName"></v-text-field>
        </v-flex>
      </v-layout>
    </template>
  </crud-list-page>
</template>

<script>
  import {myPackingDataList} from '@/api/machinery-api'
  import CrudListPage from '@/components/CrudListPage'

  export default {
    components: {
      CrudListPage
    },
    data() {
      return {
        pageNumber: 0,
        totalPages: 1,
        dataList: [],

        searchVm: {
          productName: "",
          category: "",
          unitPrice: {
            former: 0,
            latter: 0
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
      searchData() {
      },
      fetchNextPageData() {
        console.log("fetchNextPageData ...");
        this.pageNumber = this.pageNumber + 1;
        this.fetchData();
      },
      fetchData() {
        console.log("fetchData ...");
        let _data = {'pageNumber': this.pageNumber};
        myPackingDataList(_data).then(
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
      addNewItem() {
        this.$router.push({
          name: "myPackagingDataForm"
        });
      },
      editItem(item) {
        this.$router.push({
          name: "myPackagingDataForm",
          params: {id: item.id}
        });
      },
      deleteItem(item) {
        this.$createDialog({
          type: 'confirm',
          title: '删除',
          content: '确认要删除【设备:' + item.model + ',编号:' + item.code + '】吗？',
          confirmBtn: {
            text: '删除',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '点击确认按钮'
            }).show()
          }
        }).show();
      }
    },
    created() {
      this.refreshData();
    }
  }
</script>
