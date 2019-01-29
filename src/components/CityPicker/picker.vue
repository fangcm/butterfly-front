<template>
  <div class="cell_box v-picker">
    <div class="cell_ft">
      <div style="text-align:right;" @touchstart="showPicker">
        <input :id="'name-box-' + uuid"
               class="cell_primary"
               readonly="readonly"
               :value="value || '请选择'"
               style="border:none;text-align:right;color: #999999;"
               @input="getVal" >
      </div>
    </div>
    <div :class="'gearArea' + uuid" v-show="show"></div>
  </div>
</template>

<script>
  import Picker from './pickr.js'
  import dat from './data.json'
  export default {
    name: 'c-picker',
    props: {
      dataList: {
        type: Array
      },
      value:{
         type:String,
         default:'请选择'
      },
      dType: {
        type: Number,
        default: 1
      },
      title: {
        type: String,
        default: '居住地址'
      },
      location: {
        type: Object
      },
      column: {
        type: Number,
        default: 3
      },
      propObj:{
         type:Object,
         default(){
           return{
             id: 'id',
             name: 'name',
             mark:'mark'
           }
         }
      },
      depend:{
          type:String,
          default:'default'
      }
    },
    data() {
      return {
        uuid: Math.random().toString(36).substring(3, 8),
        show: false
      }
    },
    watch: {
      location() {
        this.setLocation()
      }
    },
    mounted() {

    },
    methods: {
      setLocation() {
        if (this.location && this.location.id) {
          this.picker.setLocation(this.location)
        }
      },
      showPicker() {
        if(this.depend && this.dataList.length > 0){
          let _promise = new Promise((resolve, reject)=>{
            this.render();
            resolve();
          }).then(()=>{
            this.setLocation();
            this.show = true;
          });
        }else{
            this.$toast({
              message:'请先选择依赖项或无数据'
            })
        }
      },
      getVal(e) {
        this.show = false;
        this.$emit('input', e.target.value);
        this.$emit('get-val', e.target.value, e.target.getAttribute('codeStr'),e.target.getAttribute('markStr'))
      },
      render() {
        const _this = this;
        this.picker = new Picker();
        this.picker.init({
          trigger: `#name-box-${this.uuid}`,
          keys: _this.propObj,
          type: _this.dType,
          data: _this.dataList,
          column: _this.column,
          uuid: _this.uuid
        })
      }
    },
    beforeDestroy (){
      let _el = document.querySelector('.gearArea'+ this.uuid);
      _el && _el.parentNode.removeChild(_el);
    }
  }

</script>
