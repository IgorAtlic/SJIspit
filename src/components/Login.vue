<template>
  <div id="login">
    <b-col sm="2" offset="5">
    <FormulateForm v-model="formValues" @submit="handleSubmit">
      <FormulateInput name="username" label="Username" validation="min:4" />
      <FormulateInput type="password" name="password" label="Password" validation="min:8" />
      <FormulateInput type="submit" label="Sign Up" />
    </FormulateForm>
    </b-col>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import router from "@/router";

export default {
  name: 'Login',
  computed: {
    ...mapState(['currentUser'])
  },
  data() {
    return {
      formValues: {},
      username: "",
      password: ""
    }
  },

  methods: {
    ...mapActions(['load_cUsers']),
    handleSubmit() {
      const u = JSON.stringify({username: this.formValues.username, password: this.formValues.password});
      this.load_cUsers(u);
      setTimeout(() => this.redirect(),400)

    },
    redirect(){
      if (this.currentUser.length>0){
        router.push({path: `/todoList/${this.currentUser}`})
      }
    },



  }
}
</script>

<style scoped>
</style>