<template>
  <div class="page-home">
    <group>
      <group-title>就餐时间 <span class="time-tip">需提前两天预订</span></group-title>
      <cell title="请选择" :value="datetime" @click.native="showCalendar" is-link></cell>
    </group>

    <popup v-model="calendarOptions.show">
      <popup-header
        left-text="取消"
        right-text=""
        title="请选择日期"
        @on-click-left="dateCancel">
      </popup-header>
      <inline-calendar
        ref="calendar"
        @on-change="dateChanged"
        class="inline-calendar-demo"
        v-model="calendarOptions.value"
        v-show="calendarOptions.show"
        :show-last-month="false"
        :show-next-month="false"
        :start-date="startDate"
        :return-six-rows="false"
        :replace-text-list="calendarOptions.replaceTextList"
        :render-function="calendarOptions.buildSlotFn"
        :disable-past="true"
        :disable-date-function="calendarOptions.disableDateFunction">
      </inline-calendar>
    </popup>
    <div v-show="false">
      <popup-picker
        title="选择时间"
        :data="timeOptions.available"
        v-model="timeOptions.value"
        placeholder="选择时间"
        :show="timeOptions.show"
        @on-hide="timeHide"
        @on-show="timeShow">
      </popup-picker>
    </div>

    <group-title>请选择包房</group-title>
    <grid>
      <template v-for="room of roomOptions.rooms">
        <grid-item @click.native="chooseRoom(room)" :class="['room',{'room_active':roomOptions.selected == room.id}]" :label="room.name">
          <icon slot="icon" name="chair" scale="3"></icon>
        </grid-item>
      </template>
    </grid>

    <group label-width="5em">
      <div class="meal-package" @click="showMenu"><icon name="package" scale="2.5"></icon> 查看套餐</div>
      <popup-picker title="选择套餐" :data="mealOptions.meals" v-model="mealOptions.selectedMeal" @on-hide="mealConfirm"></popup-picker>
      <popup-picker title="就餐人数" :data="mealOptions.people" v-model="mealOptions.number" @on-hide="peopleConfirm"></popup-picker>
    </group>

    <group title="联系方式">
      <x-input title="姓名" v-model="order.username" name="username"></x-input>
      <x-input title="手机号" v-model="order.mobile" keyboard="number" is-type="china-mobile"></x-input>
    </group>

    <box gap="10px 10px" class='businessTime'>
      <group-title >营业时间最晚9:30</group-title>
      <x-button @click.native="bookingRoom" :gradients="['#1D62F0', '#19D5FD']">预订包房</x-button>
    </box>

    <div v-transfer-dom>
      <popup v-model="mealOptions.show" height="100%" class="meal-page">
        <popup-header
          left-text=""
          right-text="关闭"
          title="套餐信息"
          @on-click-right="mealCancel">
        </popup-header>

        <div class="meal-content" v-for="(items,key) in mealOptions.mealPackages">
          <button-tab class="button-tab" v-model="mealOptions.tab[key]">
            <template v-for="(item, idx, j) in items">
              <button-tab-item @on-item-click="mealOptions.tab[key] = j">{{key}}元{{idx}}套餐</button-tab-item>
            </template>
          </button-tab>
          <template v-for="(item, idx, i) in items" v-if="i === mealOptions.tab[key]">
            <x-table full-bordered style="background-color:#fff;">
              <thead>
              <tr>
                <th colspan="2">{{key}}元 {{idx}}套餐</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(meal,type) in item">
                <template v-if="typeof meal === 'object'">
                  <template v-for="detail,detailIdx in meal">
                    <tr>
                      <td v-if="detailIdx === 0" :rowspan="meal.length">{{type}}</td>
                      <td>{{detail}}</td>
                    </tr>
                  </template>
                </template>
                <template v-else>
                  <tr>
                    <td width="30%">{{type}}</td>
                    <td>{{meal}}</td>
                  </tr>
                </template>
              </template>
              </tbody>
            </x-table>
          </template>
        </div>
      </popup>
    </div>
  </div>

</template>

<script>
  import { Grid, GridItem, GroupTitle, InlineCalendar, Popup, PopupPicker, Group, Cell,
    PopupHeader, XInput, Box, XButton, Divider, ButtonTab, ButtonTabItem, XTable } from 'vux'

  export default {
    data() {
      return {
        calendarOptions:{
          show: false,
          value: '',
          listValue: '',
          replaceTextList: {'TODAY':'今'},
          useCustomFn: false,
          buildSlotFn: (line, index, data) => {
//                        return /8/.test(data.date) ? '<div style="font-size:12px;text-align:center;">订满</div>' : '<div style="height:19px;"></div>'
          },
          disablePast: true,
          disableFuture: false,
          disableWeekend: false,
          disableDateFunction (date) {
            //    if (date.formatedDate === '2018-1-16') {
            //        return false
            //    }
          },
        },
        timeOptions:{
          available: [['中午','晚饭']],
          value: [],
          show: false
        },
        roomOptions: {
          rooms: {
            room_1: {
              id: 1,
              name: '包房一 (1~6人)',
              active: false,
              people: [1,2,3,4,5,6]
            },
            room_2: {
              id: 2,
              name: '包房二 (7~16人)',
              active: false,
              people: [7,8,9,10,11,12,13,14,15,16]
            }
          },
          selected: null,
        },
        order: {
          date: '',
          hour: '',
          room_id: null,
          room_name: null,
          username: null,
          mobile: null,
          employee_id: null,
          people: null,
          meal: null
        },
        mealOptions: {
          meals: [['1000元','1200元','1500元','1800元','2000元','2600元','3000元','4000元'],
            ['A 套餐','B 套餐', 'C 套餐']],
          selectedMeal: [],
          number: [],
          people: [],
          show: false,
          tab:{
            '1000':0,
            '1200':0,
            '1500':0,
            '1800':0,
            '2000':0,
            '2600':0,
            '3000':0,
            '4000':0
          }
        },
      }
    },
    computed:{
      datetime() {
        return this.calendarOptions.value+' '+this.timeOptions.value
      },
      startDate() {
        const nowDate = new Date();
        nowDate.setDate(nowDate.getDate() + 2);
        var y = nowDate.getFullYear();
        var m = nowDate.getMonth() + 1;
        var d = nowDate.getDate();
        var startDate = y + "-" + m + "-" + d;
        console.log(startDate);
        return startDate;
      },
    },
    methods: {
      chooseRoom(room) {
        this.roomOptions.selected = room.id
        this.order.room_id = room.id
        this.order.room_name = room.name
        this.mealOptions.people = []
        this.mealOptions.people.push(room.people)
      },
      showCalendar() {
        this.calendarOptions.show = !this.calendarOptions.show
      },
      dateChanged(){
        this.timeOptions.show = true
      },
      dateCancel() {
        this.calendarOptions.show = false
      },
      timeShow() {
        this.calendarOptions.show = false
      },
      timeHide(confirm) {
        this.timeOptions.show = false
        if (confirm){
          this.calendarOptions.show = false
          this.order.date = this.calendarOptions.value
          this.order.hour = this.timeOptions.value[0]
        }else {
          this.calendarOptions.show = true
        }
      },
      bookingRoom() {
        let result = this.validate()
        if (result.code === 'error') {
          this.$vux.toast.show({
            text: result.msg,
            type: 'text'
          })
          return false
        }

        this.$http.post('/zhongrong/api/booking-room',{ZhongrongRoomOrder:this.order}).then((response) => {
          if (response.data.status == 1) {
            this.$vux.toast.show({
              text: '预订成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({path:'/user'});
            }, 1000)
          } else {
            this.$vux.toast.show({
              text: response.data.message,
              type: 'cancel'
            })
          }
        }).catch((error) => {
          this.$vux.toast.show({
            text: '预订错误:网络出现问题',
            type: 'cancel'
          })
        })
      },
      validate(){
        if (this.order.date === '' || this.order.hour === '') {
          return { code : 'error', msg: '请选择时间'}
        }

        if (this.order.room_id === null) {
          return { code : 'error', msg: '请选择包房'}
        }

        if (this.order.mobile === null) {
          return { code : 'error', msg: '请输入手机号'}
        }

        if (this.order.username === null || this.order.username === '') {
          return { code : 'error', msg: '请填写贵姓'}
        }

        if (this.order.meal === null || this.order.meal === '') {
          return { code : 'error', msg: '请选择套餐'}
        }

        if (this.order. people === null || this.order.people === '') {
          return { code : 'error', msg: '请选择人数'}
        }

        return {code :'success'}
      },
      showMenu() {
        this.$http.get('/zhongrong/api/get-meal-package').then((response) => {
          if (response.data.status == 1) {
            console.log(response.data)
            this.$nextTick(() => {
              this.mealOptions.mealPackages = response.data.data
              this.mealOptions.show = true
            })
          } else {
            this.$vux.toast.show({
              text: '加载套餐信息失败',
              type: 'cancel'
            })
          }
        }).catch((error) => {
          this.$vux.toast.show({
            text: '网络出现问题',
            type: 'cancel'
          })
        })
      },
      mealCancel(){
        this.mealOptions.show = false
      },
      mealConfirm(confirm) {
        if(confirm){
          this.order.meal = this.mealOptions.selectedMeal.join(' ')
        }
      },
      peopleConfirm(confirm) {
        if(confirm){
          this.order.people = this.mealOptions.number[0]
        }
      }
    },
    mounted(){
      this.order.employee_id = document.getElementById('employee-id').value
    },
    components: {
      Grid,
      GridItem,
      GroupTitle,
      InlineCalendar,
      Popup,
      PopupPicker,
      Group,
      Cell,
      PopupHeader,
      XInput,
      XButton,
      Box,
      Divider,
      ButtonTab,
      ButtonTabItem,
      XTable
    }
  }
</script>

<style lang="scss">
  .room{
    color: #242424;
  }
  .room_active {
    .weui-grid__label{
      color: #09bb07;
    }
    color: #09bb07;
  }

  .time-tip{
    float: right;
    color: #00b3ee;
  }
  .meal-package{
    line-height:2.5em;
    color: #00b3ee;
    text-align: center;

    > svg{
      vertical-align: sub;
    }
  }
  .meal-content{
    margin: 0px 10px 15px 10px;
  }
  .button-tab{
    margin: 15px 10px;
  }
</style>
