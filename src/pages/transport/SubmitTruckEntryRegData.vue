<template>
  <base-form-page @save="save">
    <v-form ref="form" validation>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-text-field label="工作区域" append-outer-icon="iconfont fcm-address" v-model="item.address"
                        readonly required @click:append-outer="showAddressPicker"/>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-text-field label="设备" append-outer-icon="iconfont fcm-nongfuguanjia" v-model="item.machinery"
                        readonly required @click:append-outer="showAddressPicker"/>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-text-field label="开工时间" append-outer-icon="date_range" v-model="item.startDate"
                        readonly required @click:append-outer="showTimePicker"/>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-text-field label="收工时间" append-outer-icon="date_range" v-model="item.endDate"
                        readonly required @click:append-outer="showTimePicker"/>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-text-field label="操作员" type="text" maxlength="16" v-model="item.operator"
                        class="input-group--focused" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-text-field label="作业量" type="number" :rules="rules.workload" hint="工作时长、数包或公顷数"
                        v-model="item.workload" class="input-group--focused" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-switch label="运行异常" v-model="item.abnormalFlag" light></v-switch>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-text-field label="异常描述" hint="简单描述异常情况" v-model="item.abnormalDesc"
                        class="input-group--focused" v-if="item.abnormalFlag"></v-text-field>
        </v-flex>
      </v-layout>
    </v-form>
  </base-form-page>
</template>
<script>
  import BaseFormPage from '@/components/BaseFormPage'
  import {addressList} from '@/api/core-api'

  export default {
    components: {
      BaseFormPage
    },
    data() {
      return {
        item: {
          address: "",
          machinery: "",
          startDate: this.$dateFilter(new Date(), 'yyyy-MM-dd hh:mm'),
          endDate: this.$dateFilter(new Date(), 'yyyy-MM-dd hh:mm'),
          workload: 0,
          operator: "",
          abnormalFlag: false,
          abnormalDesc: ""
        },
        addressData: [],
        rules: {
          workload: [() => {
            if (this.item && (this.item.workload < 0 || this.item.workload > 9999)) {
              return '作业量数据填写有误'
            }
            return true;
          }]
        }
      }
    },
    methods: {
      showTimePicker(e) {
        if (!this.dateTimePicker) {
          this.dateTimePicker = this.$createDatePicker({
            title: '时间选择',
            min: new Date(2019, 1, 23, 0, 0, 0),
            max: new Date(2019, 2, 20, 23, 59, 59),
            value: new Date(),
            columnCount: 5,
            format: {
              year: 'YYYY年',
              month: 'M月',
              date: 'D日',
              hour: 'h点',
              minute: 'm分'
            },
            onSelect: (selectedVal, selectedIndex, selectedText) => {
              this.item.startDate = this.$dateFilter(selectedVal, 'yyyy-MM-dd hh:mm');
            }
          })
        }

        this.dateTimePicker.show()
      },
      showAddressPicker() {
        if (!this.addressPicker) {

          this.addressPicker = this.$createCascadePicker({
            title: '选择工作区域',
            onSelect: (selectedVal, selectedIndex, selectedText) => {
              this.item.address = selectedVal.join(' ');
              /**
               const self = this
               selectedVal.forEach(function (value, index) {
            if (index === 0) {
              self.area = value
            }
          })
               */
            }
          })


        }
        this.addressPicker.show();

        if (this.addressData.length === 0) {
          let _data = {};
          addressList(_data).then((data) => {
            this.addressData = data.data;
            this.addressPicker.setData(this.addressData)
          });
        }
      },
      save() {
        if (this.$refs.form.validate()) {
        }
        this.$router.back(-1)
      }
    },
    mounted() {
      if (this.$route.params.id) {
        this.title = 'Edit Customer'
      } else this.title = 'New Customer'
    }
  }
</script>