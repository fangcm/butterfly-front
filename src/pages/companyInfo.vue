<template>
    <div class="company-info-container">
       <div class="info-form">
          <div class="ry-input">
            <label><em>*</em>公司名称</label>
            <input type="text" placeholder="请输入公司名称" v-model="companyInfo.name" @input="handleChange">
          </div>
         <div class="ry-input">
           <label><em>*</em>商户名称</label>
           <input type="text" placeholder="请输入商户名称" v-model="companyInfo.shopName" @input="handleChange">
         </div>
         <div class="ry-input">
           <label><em>*</em>联系电话</label>
           <input type="tel" placeholder="请输入联系电话" maxlength="13" v-model="companyInfo.mobile" @input="handleChange">
         </div>
         <div class="ry-input select">
           <label><em>*</em>地区</label>
           <city-picker
             v-model="companyInfo.codeName"
             :data-list="regionList"
             :location = "location"
             @get-val="addressPick"></city-picker>
         </div>
         <div class="ry-input area">
           <label><em>*</em>详细地址</label>
           <textarea rows="4" placeholder="请填写详细地址，不少于5字" v-model="companyInfo.detailAddr" @input="handleChange"></textarea>
         </div>
         <div class="ry-input mt20">
           <label><em> </em>传真</label>
           <input type="tel" placeholder="请输入传真号码" maxlength="13" v-model="companyInfo.fax" @input="handleChange">
         </div>
         <div class="ry-tips"><em>*</em>为必填项</div>
         <div class="ry-button">
           <button @click="handleSubmit" :style="this.companyInfo.status == 2 ? 'font-size:12px':''" :disabled=" disabled || companyInfo.status == 10 || companyInfo.status == 2"> {{this.companyInfo.status == 10 ? '等待审核': (this.companyInfo.status == 2 ? '企业资料禁用,请联系客服': (this.companyInfo.status == 1 ? '返回' : '提交'))}}</button>
         </div>
       </div>
    </div>
</template>

<script>
    import CityPicker from '@/components/CityPicker'
    import { regionAllList } from '@/api/common-api'
    import { entitySave,companyInfoSearch } from '@/api/company-api'
    import{ mapState } from 'vuex'
    import api from '@/api/api-config'
    export default {
        name: 'companyInfo',
        data () {
            return {
              regionList:[],
              companyInfo:{
                id: 0,
                name: '',
                mobile: '',
                shopName:'',
                provinceCode: '',
                codeName:'请选择',
                cityCode: '',
                countyCode:'',
                detailAddr: '',
                fax:'',
                industryId: 0,
                adminId: 0,
                status:9
              },
              disabled:false,
              location:null
            }
        },
        components: {
          CityPicker
        },
        methods: {
          addressPick(name, code) {
            code && ([this.companyInfo.provinceCode, this.companyInfo.cityCode, this.companyInfo.countyCode] = code.split(' '));
            name && (this.companyInfo.codeName = name);
            this.location = {
              id: code,
              name
            };
            this.handleChange();
          },

          handleSubmit(){
            if(this.companyInfo.status == 1){
              setTimeout( this.$router.push({path:'/' + this.$route.params.orgCode + '/account'}),1000)
              return false;
            }
            if(!!!this.companyInfo.name){
              this.$toast({
                message: '请输入企业名称',
              });
              return false;
            }
            if(!!!this.companyInfo.shopName){
              this.$toast({
                message: '请输入商户名称',
              });
              return false;
            }
            let reg = /^1[345789]\d{9}$/;
            let regx =  /^(0\d{2}-?\d{8})|(0\d{3}-?\d{7,8})$/;
            if(!!!this.companyInfo.mobile || this.companyInfo.mobile.length < 11 || !!!(reg.test(this.companyInfo.mobile) || regx.test(this.companyInfo.mobile)) ){
              this.$toast({
                message: '请输入合法手机号或固话',
              });
              return false;
            }
            if(!this.companyInfo.codeName || this.companyInfo.codeName == '请选择'){
              this.$toast({
                message: '请选择区域',
              });
              return false;
            }
            if(this.companyInfo.codeName.indexOf('全部')> -1){
              this.$toast({
                message: '请选择市区',
              });
              return false;
            }
            if(!!!this.companyInfo.detailAddr || this.companyInfo.detailAddr.length < 5){
              this.$toast({
                message: '请填写至少5字符以上地址',
              });
              return false;
            }
            this.companyInfo.adminId = this.userId;
            this.disabled  = true;
            entitySave(this.companyInfo).then(data =>{
              this.disabled  = false;
              this.$toast({
                message: '企业信息保存成功',
              });
              //sessionStorage.setItem('enterprise',null);
              setTimeout( this.$router.push({path:'/' + this.$route.params.orgCode + '/account'}),1000)
            });
          },
          handleChange(){
            let _enterprise = JSON.parse(sessionStorage.getItem('enterprise'));
            if (_enterprise){
              this.companyInfo.status = 9;
            }
          }
        },
        computed: {
          ...mapState({
            userId:state => state.user.userInfo.id,
          })
        },
        created() {
          if(sessionStorage.getItem('regionAllList')){
            this.regionList = JSON.parse(sessionStorage.getItem('regionAllList'));
          }else{
            regionAllList().then(data => {
              if(data.data.length > 0){
                this.regionList = data.data;
                sessionStorage.setItem('regionAllList',JSON.stringify(data.data));
              }
            })
          }
          let _enterprise = JSON.parse(sessionStorage.getItem('enterprise'));
          if(!!!_enterprise){
            let _region = JSON.parse(sessionStorage.getItem('regionList'));

            let _obj = {};

            _region = _region.filter(item =>{
                item.child = item.child.filter(cell => {
                    cell.child = cell.child.filter(_cell => _cell.name !='全部')
                    return cell.name != '全部' && cell.child.length
                });
                return item.name != '全部' && item.child.length ;
            });

            this.$set(_obj,'provinceCode',_region[0].id);
            this.$set(_obj,'cityCode',_region[0].child[0].id);
            this.$set(_obj,'countyCode',_region[0].child[0].child[0].id);
            this.$set(_obj,'codeName',_region[0].name + ' ' + _region[0].child[0].name + ' ' + _region[0].child[0].child[0].name);

            //**************************************************************
            // 暂时设置  江苏省 苏州市 姑苏区  10892 10942 10944
            //*************************************************************
            this.$set(_obj,'provinceCode',10892);
            this.$set(_obj,'cityCode',10942);
            this.$set(_obj,'countyCode',10944);
            this.$set(_obj,'codeName','江苏省 苏州市 姑苏区');
            //*******************************************************************
            //后期维护成员，请删除此设置信息，逻辑是根据组织设定的省市区进行配置
            //*******************************************************************

            _enterprise = _obj;
          }


          let _areaCode = _enterprise && (_enterprise.provinceCode + ' ' + _enterprise.cityCode + ' ' + _enterprise.countyCode);
          let _areaNameTxt = _enterprise && _enterprise.codeName;
          this.location = {
            id: _areaCode,
            name: _areaNameTxt
          };
          _enterprise && (this.companyInfo = _enterprise);
        }
    }
</script>
