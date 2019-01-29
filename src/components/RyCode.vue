<template>
    <div class="ry-code" :style="'width: '+ width">
      <button :disabled="disabled || time > 0" @click="sendEmit">
        <span>{{ text }}</span>
      </button>
    </div>
</template>

<script>
    export default {
        name: 'ryCode',
        data () {
            return {
              time: 0
            }
        },
        props:{
           disabled:{
             type:Boolean ,
             default:false
           },
           second:{
             type:Number,
             default:60
           },
           width:{
             type:String,
             default:'230px'
           }
        },
        components: {},
        methods: {
          run: function () {
            this.time = this.second;
            this.timer()
          },
          timer: function () {
            if (this.time > 0) {
              this.time--;
              setTimeout(this.timer, 1000);
            }
          },
          sendEmit(){
              this.$emit('handleSend');
          }
        },
        computed: {
          text: function () {
            return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
          }
        },
        created() {

        }
    }
</script>
