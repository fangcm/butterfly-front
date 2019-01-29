<template>
  <div class="compoenent-countlist">
    <button class="count-list-btn"
            @click="showCounts"></button>
    <div class="count-list-container" v-show="countList.length && countListShow">
      <p v-for="(item, index) in countList"
         @click="insertCount($event,item.userName)"
         :user="item.userName"><span>{{ item.userName }}</span><i @click.stop.prevent="removeUser(index,$event)"></i></p>
    </div>
  </div>
</template>

<script>
    export default {
      props:{
        countList:Array,
        countListShow:Boolean
      },
      data () {
        return {

        }
      },
      methods:{
        showCounts(){
            this.$emit('tapShow');
        },
        hideCounts(){
            this.$emit('tapHide')
        },
        insertCount(event,userName){
          if (event) event.preventDefault();
          this.$emit('changeUser',[userName]);
        },
        removeUser(index,event){
          if (event) event.preventDefault();
          this.$emit('removeUser',[index]);
        }
      }
    }
</script>
