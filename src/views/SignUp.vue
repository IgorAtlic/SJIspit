<template>
  <div id="login">
    <Header/>
    <b-col sm="2" offset="5">
      <FormulateForm v-model="formValues" @submit="handleSubmit">
        <FormulateInput name="username" label="Username" validation="min:4" />
        <FormulateInput type="password" name="password" label="Password" validation="min:8" />
        <FormulateInput  type="submit" label="Sign up" />
        <FormulateInput  type="submit" label="Back" @click="signUp"/>
      </FormulateForm>
    </b-col>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import router from "@/router";
import Header from "@/components/Header";

export default {
  name: 'SignUp',
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
    ...mapActions(['new_user','load_cUsers']),
    handleSubmit() {
      const u = JSON.stringify({username: this.formValues.username, password: this.formValues.password});
      this.new_user(u);
      this.load_cUsers(u);
      setTimeout(() => this.redirect(),400)

    },
    redirect(){
      if (this.currentUser.length>0){
        router.push({path: `/todoList/${this.currentUser}`})
      }
    },
    signUp: function (){
      router.push({path: `/`})
    }
  },
  components: {
    Header,
  }
}
</script>

<style scoped>
</style>