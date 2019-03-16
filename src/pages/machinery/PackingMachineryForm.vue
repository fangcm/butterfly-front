<template>
  <base-form-page @save="save">
    <v-form ref="form" validation>
      <v-text-field name="firstName" label="First Name" hint="Last name is required"
                    value="Input text"
                    v-model="customer.firstName"
                    class="input-group--focused" required></v-text-field>
      <v-text-field name="lastName" label="Last Name" maxlength="10" hint="Last name is required"
                    value="Input text" v-model="customer.lastName"
                    class="input-group--focused" required></v-text-field>
      <v-text-field name="mobile" type="text" label="Mobile" v-model="customer.lastName"
                    class="input-group--focused" required></v-text-field>
      <v-text-field name="rewards" type="number" label="Rewards" hint="Number between 0 and 9999"
                    v-bind:rules="rules.rewards"
                    v-model="customer.lastName" class="input-group--focused" required></v-text-field>
      <v-switch label="Membership" v-model="customer.membership" light></v-switch>
    </v-form>
  </base-form-page>
</template>
<script>
  import BaseFormPage from '@/components/BaseFormPage'

  export default {
    components: {
      BaseFormPage
    },
    data() {
      return {
        customer: {
          firstName: "",
          lastName: "",
          membership: false
        },
        rules: {
          rewards: [() => {
            if (this.customer && (this.customer.rewards < 0 || this.customer.rewards > 9999)) {
              return 'Reward is required. It must be bewteen 0 and 9999'
            }
            return true;
          }],
          email: [() => {
            /* eslint-disable no-useless-escape */
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.customer && !re.test(this.customer.email)) return 'Email is invalid.'
            return true;
          }]
        }
      }
    },
    methods: {
      save() {
        if (this.$refs.form.validate()) {
        }
      }
    },
    mounted() {
      if (this.$route.params.id) {
        this.title = 'Edit Customer'
      } else this.title = 'New Customer'
    }
  }
</script>