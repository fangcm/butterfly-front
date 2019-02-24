<template>
  <div class="button" :class="color" @click="click()">
    <span class="button-icon">
      <i style="font-size:32px" :class="icon" v-if="icon"></i>
    </span>
    <span class="button-label">{{label}}</span>
  </div>
</template>
<script>
  export default {
    name: "IconButton",
    props: {
      label: {
        type: String,
        default: () => {
          return 'button';
        }
      },
      icon: {
        type: String,
        default: () => {
          return '';
        }
      },
      color: {
        type: String,
        default: () => {
          return '';
        }
      },
      to: {
        type: String,
        default: () => {
          return '';
        }
      }
    },
    methods: {
      click() {
        this.$router.push(this.to);
      }
    }
  }
</script>

<style scoped>
  .button {
    display: inline-block;
    border: none;
    color: black;
    padding: 0;
    text-align: center;
    text-decoration: none;
    margin: 0;
    width: 100%;
    cursor: pointer;
  }

  .button-icon {
    text-align: center;
    display: block;
  }

  .button-label {
    font-weight: 100;
    font-size: 12px;
    text-align: center;
    vertical-align: top;
    margin: 0;
    padding: 0;
  }
</style>