<template>
  <div>
    <group>
      <cell title="关于" is-link link="/setting/about"></cell>
    </group>
    <group>
      <x-button type="primary" @click.native="logout">退出登录</x-button>
    </group>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Group, Cell, XButton} from 'vux'

  export default {
    name: 'setting',
    components: {
      Group,
      Cell,
      XButton
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters({token: 'getToken'})
    },
    methods: {
      logout() {
        this.$store.commit('setToken', null);
        this.$router.push({name: '/'});
      }
    }
  }
</script>

<style scoped lang="less">
  .logout {
    padding: 0 0.1rem;
    button {
      width: 100%;
      height: 0.45rem;
      border: none;
      background-color: #fc3;
      margin-top: 0.2rem;
    }
  }
</style>
