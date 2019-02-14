<template>
  <v-container fluid pa-1 ma-0>
    <v-layout column>
      <v-flex v-for="item in list" :key="item.id" pa-0 ma-1>
        <v-card color="white">
          <v-flex xs12>
            <v-card-text class="font-weight-light">
              <v-layout row wrap>
                <v-flex shrink pa-2>
                  <v-icon>accessibility</v-icon>
                  <span class="subheading mr-2"> {{item.name}}</span>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex shrink pa-2>
                  <span class=" mr-2" v-if="item.roleCode">代码 {{item.roleCode}}</span>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>

          <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon color="blue-grey darken-3" title="编辑">edit</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="blue-grey darken-3" title="删除">delete</v-icon>
            </v-btn>
          </v-card-actions>

        </v-card>

      </v-flex>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0"/>
    </v-layout>

    <v-speed-dial bottom right fixed>
      <v-btn slot="activator" color="blue darken-2" dark fab>
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>

      <v-tooltip left>
        <v-btn fab dark small color="indigo" slot="activator" @click="dialog=!dialog">
          <v-icon>edit</v-icon>
        </v-btn>
        <span>Add Note</span>
      </v-tooltip>
      <v-tooltip left>
        <v-btn fab dark small color="yellow" slot="activator" @click="dialog=!dialog">
          <v-icon>edit</v-icon>
        </v-btn>
        <span>Add Log Entry</span>
      </v-tooltip>
      <v-tooltip left>
        <v-btn fab dark small color="green" slot="activator" @click="dialog=!dialog">
          <v-icon>add</v-icon>
        </v-btn>
        <span>Add and Activate New Task</span>
      </v-tooltip>
      <v-tooltip left>
        <v-btn fab dark small color="gray" slot="activator" @click="dialog=!dialog">
          <v-icon>add</v-icon>
        </v-btn>
        <span>Add New Inactive Task</span>
      </v-tooltip>
      <v-tooltip left>
        <v-btn fab dark small color="red" slot="activator">
          <v-icon>delete</v-icon>
        </v-btn>
        <span>Delete Task</span>
      </v-tooltip>

    </v-speed-dial>

  </v-container>

</template>

<script>
  import {adminRoleList} from '@/api/core-api'


  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {},
    created() {
      let _data = {};
      adminRoleList(_data).then((data) => {
        // 保存登录状态和信息
        this.list = data.data.content;
      });
    }
  }
</script>
