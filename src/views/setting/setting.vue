<template>
  <tab>
    <tab-item :selected="demo2 === item" v-for="item in list2" @click="demo2 = item">美食酒店</tab-item>
  </tab>
</template>

<script>
  //引入组件
  import {
    Sticky,
    Tab,
    TabItem
  } from 'vux'
  //创造构造器
  export default {
    components:{
      Tab,Sticky,TabItem
    },
    data () {
      return {
        show: false,
        demo2: '美食',
        list2: ['精选', '美食', '电影', '酒店', '外卖'],
        show1: false
      }
    }
  }
  /*创造构造器的老版本的写法，编译的时候会报错，执行没有问题。
  var MyComponent = Vue.extend{
      components: {
          Divider,FlexboxItem,Flexbox
      },
  }*/
</script>
