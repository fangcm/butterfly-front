<template>
    <div class="create-task-container">
      <div class="ry-card">
        <div class="ry-picker select">
          <label>行业</label>
          <city-picker
            :column = "column.industry"
            :data-list = "industry"
            :prop-obj="prop.industry"
            v-model="task.industryTxt"
            @get-val="industryPick"></city-picker>
        </div>
        <div class="ry-picker select">
          <label for="">区域</label>
          <city-picker
            :column = "column.region"
            :data-list = "regionList"
            :prop-obj="prop.region"
            :location = "this.location.region"
            v-model="task.areaNameTxt"
            @get-val="addressPick"></city-picker>
        </div>
        <div class="ry-input target" v-show="false">
          <label for="">目标人群</label>
          <input type="text" placeholder="请输入目标数量" readonly  v-model="task.target">
        </div>
        <div class="ry-picker select">
          <label for="">任务时间</label>
          <city-picker
            :column = "column.timer"
            :data-list = "timeDtList"
            :prop-obj="prop.time"
            :depend = "task.industryCode.toString()"
            v-model="task.sendTimeTxt"
            @get-val="timePick"></city-picker>
        </div>
      </div>
      <div class="ry-card">
        <div class="ry-picker select">
          <label>模板类型</label>
          <city-picker
            :column = "column.template"
            :data-list = "templateList"
            :prop-obj="prop.template"
            :depend = "task.industryCode.toString()"
            v-model="task.templateTxt"
            @get-val="templatePick"></city-picker>
        </div>
        <div class="ry-input template" v-show="!!task.templateType">
          <p>{{task.templateContent}}</p>
        </div>
<!--        <div class="ry-input">
          <label for="">商户名</label>
          <input type="text" placeholder="请输入商户名称"  v-model="task.num">
        </div>
        <div class="ry-input">
          <label for="">电话</label>
          <input type="text" placeholder="请输入商户电话"  v-model="task.num">
        </div>
        <div class="ry-input">
          <label for="">链接</label>
          <input type="text" placeholder="请输入商户电话"  v-model="task.num">
        </div>
        <div class="ry-input">
          <label for="">活动内容</label>
          <input type="text" placeholder="请输入商户电话"  v-model="task.num">
        </div>
        <div class="ry-input area">
        <label>活动内容</label>
        <textarea rows="4" placeholder="请填写详细地址，不少于5字"></textarea>
      </div>-->
      </div>
      <div class="ry-card">
        <div class="task-fee">
          <span>
            <em><input type="tel" v-model="task.sendCount" oninput="this.value=this.value.replace(/[^\d]/g,'')" maxlength="6" placeholder="请输入投放量"></em>
            <em>投放量(个)</em>
          </span>
          <span><em :type="feeSum">{{ task.feeTransForm }}</em><em>费用合(元)</em></span>
        </div>
      </div>
      <div class="ry-button">
        <template v-if="this.task.fee > this.account">
          <p>余额不足,请充值</p>
          <button @click="handleCharge">充值</button>
        </template>
        <template v-else>
          <button :disabled="disabled" @click="taskSubmit">提交任务</button>
        </template>
      </div>
    </div>
</template>

<script>
    import CityPicker from '@/components/CityPicker'
    import { regionList,industryList,availableLimit } from '@/api/common-api'
    import { timeList,taskSave,assTemplate,calculateFee } from '@/api/task-api'
    import { balanceInfo } from '@/api/user-api'
    import api from '@/api/api-config'
    import { numTransform } from '@/util/util'
    export default {
        name: 'createTask',
        data () {
            return {
              defaultIn:{
                id:'d3',
                name:'美容行业'
              },
              prop:{
                  industry:{
                    id:'insCode',
                    name:'insName',
                    mark:'insId'
                  },
                  time:{
                    id:'dayTimeStr',
                    name:'period',
                    mark:'dayTimeStr'
                  },
                  region:{
                    id:'id',
                    name:'name',
                    mark:'id'
                  },
                  template:{
                    id:'templateId',
                    name:'templateType',
                    mark:'templateContent'
                  }
              },
              location:{
                 industry:{
                   insCode:'3232323',
                   insName:'培训'
                 },
                 region:{
                   id:'10892 10942 10953',
                   name:'江苏省 苏州市 吴中区'
                 },
                 time:null,
                 template:null
              },
              column:{
                  industry:1,
                  timer:2,
                  template:1,
                region:3,
              },
              defaultColumn:1,
              timeDtList:[],
              industry:[],
              regionList:[],
              templateList:[],
              task:{
                 id: 0,
                 industryCode: 0,
                 industryId: 0,
                 areaCode: '',
                 target: 0,
                 sendTime: '',
                 templateType: 0,
                 fee: 0,
                 feeTransForm:'0.00',
                 sendCount: '',
                 industryTxt:'请选择行业',
                 areaNameTxt:'请选择地区',
                 sendTimeTxt:'请选择任务时间',
                 templateTxt:'请选择模板',
                 templateContent:''
              },
              disabled:false,
              account:0,
              paramsFlag:false
            }
        },
        components: {
          CityPicker,
        },
        methods: {
          industryPick(name,code,mark) {
            if(code){
              this.task.industryCode = code;
              this.task.industryId = mark;
              this.task.industryTxt = name;
              this.selectTime(code,api.orgId);
              this.selectTemplate(code,api.orgId)
              if(this.task.industryId && this.task.areaCode) {
                this.selectLimit(api.orgId, this.task.industryId, this.task.areaCode.split(' ')[2]);
              }
              this.task.templateTxt = '请选择模板';
              this.task.templateType = 0 ;
            }
          },
          addressPick(name, code) {
            if(code){
              this.task.areaCode = code;
              this.task.areaNameTxt = name;
              this.location.region = {
                id:code,
                name
              };
              this.task.templateTxt = '请选择模板';
              this.task.templateType = 0 ;
            }
            if(this.task.industryId && this.task.areaCode) {
               this.selectLimit(api.orgId, this.task.industryId, this.task.areaCode.split(' ')[2]);
            }
          },
          timePick(name, code) {
            if(code){
              this.task.sendTime = code;
            }
          },
          templatePick(name, code, mark) {
            if(code){
              this.task.templateType = code ;
              this.task.templateContent = mark;
            }
          },
          selectTime(insCode,orgCode){
            let _data ={
              insCode,
              orgCode
            };
            timeList(_data).then(data=>{
                this.timeDtList = data.data
            })
          },
          selectTemplate(industCode,orgId){
            let _data ={
              industCode,
              orgId,
              pageIndex: 1,
              pageSize: 1000
            };
            assTemplate(_data).then( data => {
                this.templateList = data.data;
            })
          },
          selectFee(orgCode,industryCode,count,templateId){
            let _data ={
               orgCode,
               industryCode,
               count,
               templateId
            };
            let _fee = 0;
            calculateFee(_data).then(data=>{
              _fee = data.data;
              this.task.fee = data.data;
              this.task.feeTransForm = numTransform(data.data);
            });
            return _fee;
          },
          selectLimit(orgCode,industryId,areaId){
            let _data ={
              orgCode,
              industryId,
              areaId
            };
            availableLimit(_data).then(data=>{
                data.data.length ? this.task.target = data.data[0].showAmount : this.task.target = 0;
            });
          },
          taskSubmit(){
            if(!this.task.industryCode){
              this.$toast({
                message: '请选择行业',
              });
              return false;
            }
            if(!this.task.areaCode){
              this.$toast({
                message: '请选择区域',
              });
              return false;
            }
            if(!this.task.sendTime){
              this.$toast({
                message: '请选择任务时间',
              });
              return false;
            }
            if(!this.task.templateType){
              this.$toast({
                message: '请选择模板',
              })
              return false;
            }
            if(!this.task.sendCount){
              this.$toast({
                message: '请输入任务量',
              });
              return false;
            }
            if(!this.task.sendTime){
              this.$toast({
                message: '请选择任务时间',
              })
            }
            this.disabled = true;
            taskSave(this.task).then(data=>{
                this.$toast({
                  message: '任务创建成功',
                });
                sessionStorage.setItem('taskInfo','');
                this.disabled = false;
                this.$router.push({path:'/'+this.$route.params.orgCode+'/account'});
            }).catch(()=>{
              this.disabled = false;
            })
          },
          checkBalance(balance){
              return Number(sessionStorage.getItem('account')) < Number(balance)
          },
          defaultArea(){
            if(sessionStorage.getItem('enterprise')){
              let _enterprise = JSON.parse(sessionStorage.getItem('enterprise'));
              let _provinceCode = _enterprise.provinceCode;
              let _cityCode = _enterprise.cityCode;
              let _countyCode = _enterprise.countyCode;
              let _region = JSON.parse(JSON.stringify(this.regionList));
              let provArr = _region.filter( item =>{
                return item.id == _provinceCode;
              });
              if(provArr.length){
                this.task.areaCode = _enterprise && (_enterprise.provinceCode + ' ' + _enterprise.cityCode + ' ' + _enterprise.countyCode);
                this.task.areaNameTxt = _enterprise && _enterprise.codeName;
                this.location.region = {
                  id:this.task.areaCode,
                  name:this.task.areaNameTxt
                };
              }
            }
          },
          handleCharge(){
            sessionStorage.setItem('taskInfo',JSON.stringify(this.task));
            this.$router.push({path:'/' + this.$route.params.orgCode +'/rechargeInfo',query:{type:1}})
          }
        },
        computed: {
            feeSum(){
                if(this.task.industryCode && this.task.templateType){
                   return this.selectFee(api.orgId,this.task.industryCode,this.task.sendCount || 0,this.task.templateType);
                }else{
                    return 0;
                }
            }
        },
        created() {

          balanceInfo().then(data=>{
            this.account = data.data && data.data.balanceOut || 0;
            sessionStorage.setItem('account',this.account);
          });

          let _data = {
            currPage:1,
            prePageResult:1000
          };
          industryList(_data).then(data=>{
             this.industry = data.data ;
          });
          if(sessionStorage.getItem('regionList')){
            this.regionList = JSON.parse(sessionStorage.getItem('regionList'));
          }else{
            regionList().then(data => {
              if(data.data.length > 0){
                this.regionList = data.data;
                sessionStorage.setItem('regionList',JSON.stringify(data.data));
              }
            })
          }
          this.defaultArea();

          if(sessionStorage.getItem('taskInfo')){
            this.task =  JSON.parse(sessionStorage.getItem('taskInfo'))
          }

        }
    }
</script>
