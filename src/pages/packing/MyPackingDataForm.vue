<template>
  <base-form-page @save="save">
    <v-form ref="form" validation>
      <v-text-field label="工作区域" append-outer-icon="iconfont fcm-address medium" v-model="item.address"
                    readonly required @click:append-outer="showAddressPicker"/>
      <v-text-field label="设备" append-outer-icon="iconfont fcm-nongfuguanjia" v-model="item.machinery"
                    readonly required @click:append-outer="showAddressPicker"/>
      <v-text-field label="开工时间" append-outer-icon="iconfont fcm-jizhuangxiangqiache" v-model="item.packingDate"
                    readonly required @click:append-outer="showTimePicker"/>
      <v-text-field label="收工时间" append-outer-icon="event" v-model="item.packingDate"
                    readonly required @click:append-outer="showTimePicker"/>
      <v-text-field label="Last Name" maxlength="10" hint="Last name is required"
                    value="Input text" v-model="item.lastName"
                    class="input-group--focused" required></v-text-field>
      <v-text-field name="mobile" type="text" label="Mobile" v-model="item.lastName"
                    class="input-group--focused" required></v-text-field>
      <v-text-field label="作业司机" type="text" v-model="item.operator"
                    class="input-group--focused" required></v-text-field>

      <v-text-field label="作业量" type="number" :rules="rules.workload" hint="工作时长、包数或公顷数"
                    v-model="item.workload" class="input-group--focused" required></v-text-field>

      <v-switch label="Membership" v-model="item.membership" light></v-switch>
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
            min: new Date(2008, 7, 8, 8, 0, 0),
            max: new Date(2020, 9, 20, 20, 59, 59),
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
              this.item.packingDate = this.$dateFilter(date, 'yyyy-MM-dd hh:mm');
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
      }
    },
    mounted() {
      if (this.$route.params.id) {
        this.title = 'Edit Customer'
      } else this.title = 'New Customer'
    }
  }
</script>