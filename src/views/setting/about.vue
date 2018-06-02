<template>
  <div>
    <div class="about-me">
      <div class="about-content">
        <h3>黑狼</h3>
        <p class="mt-20">本人热衷于计算机编程，也喜欢看小说、骑自行车等。请关注我的博客：<span class="c-fc3">http://blog.sina.com.cn/fangcm</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  // import axios from '../../libs/axios.js'
  import {Group, Cell} from 'vux'

  export default {
    name: 'about',
    components: {
      Group,
      Cell
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .about-me {
    width: 100%;
  }

  .about-content {
    margin: 0.35rem;
  }

  .about-content h3 {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.156rem;
  }

  .about-content p {
    font-size: 0.125rem;
    color: #999;
  }

  .c-fc3 {
    color: #fc3;
  }
</style>
