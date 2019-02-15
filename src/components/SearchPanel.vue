<template>
  <v-navigation-drawer right v-model="rightDrawer" :disable-resize-watcher="true" fixed>
    <v-list>
      <v-list-tile class="my-2">
        <v-list-tile-title class="title">查询</v-list-tile-title>
      </v-list-tile>
      <slot></slot>
      <v-layout class="pl-1 pt-3 ml-1" row>
        <v-btn class="purple" fab small @click.native="$emit('searchData')">
          <v-icon dark="">search</v-icon>
        </v-btn>
        <v-btn class="grey" fab small @click.native="$emit('cancelSearch')">
          <v-icon dark="">clear</v-icon>
        </v-btn>
      </v-layout>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'SearchPanel',
    props: {
      rightDrawer: ''
    }
  }
</script>
