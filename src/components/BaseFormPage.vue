<template>
  <v-container fluid fill-height>
    <v-layout column pa-1 ma-0>
      <v-flex xs12 sm8 md4 lg4 xl4>
        <slot/>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn dark color="blue-grey" @click.native="cancel()">
              <v-icon left>cancel</v-icon>
              取消
            </v-btn>
            <v-btn dark color="primary" @click.native="save()">
              <v-icon left>save</v-icon>
              保存
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    methods: {
      save() {
        this.$emit("save");
      },
      cancel() {
        this.$router.back(-1)
      }
    }
  }
</script>