<template>
  <crud-list-page :dataList="dataList" :pageNumber="pageNumber" :totalPages="totalPages"
                  @fetchNextPageData="fetchNextPageData" @refreshData="refreshData" @searchData="fetchData"
                  @addNewItem="addNewItem" @editItem="editItem" @deleteItem="deleteItem">
    <template slot="row" slot-scope="props">
      <v-layout align-center row wrap>
        <v-flex shrink pa-2>
          <span class="subheading" v-if="props.row.model">{{props.row.model}}</span>
        </v-flex>
      </v-layout>
      <v-layout align-center row wrap>
        <v-flex shrink pa-2>
          <span>编号:</span>
          <span>{{props.row.code}}</span>
        </v-flex>
        <v-flex shrink pa-2>
          <span>类型:</span>
          <span>{{machineryTypeList[props.row.type.toString()]}}</span>
        </v-flex>
        <v-flex shrink pa-2>
          <span>工作负载:</span>
          <span>{{props.row.workload}}</span>
          <span>{{props.row.unit}}</span>
        </v-flex>
        <v-flex shrink pa-2>
          <span>归属:</span>
          <span>{{props.row.belongTo === 1 ? '公司所有': '个人私有'}}</span>
        </v-flex>
        <v-flex shrink pa-2>
          <span>使用管理人:</span>
          <span>{{props.row.personInCharge}}</span>
        </v-flex>
      </v-layout>
    </template>
    <template slot="search">
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field name="productName" label="Product" light
                        v-model="searchVm.productName"></v-text-field>
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
                    v-model="searchVm.unitPrice.former"></v-slider>
        </v-flex>
        <v-flex xs3>
          <v-text-field type="number" light v-model="searchVm.unitPrice.former"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8 offset-xs1>
          <v-slider class="text-xs-central" label="Price 2" light v-bind:max="999"
                    v-model="searchVm.unitPrice.latter"></v-slider>
        </v-flex>
        <v-flex xs3>
          <v-text-field type="number" light v-model="searchVm.unitPrice.latter"></v-text-field>
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

        machineryTypeList: {"1": "打包机", "2": "运输货车"},

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
