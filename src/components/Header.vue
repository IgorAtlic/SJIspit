<template>
  <div>
    <h3 v-if="currentUser.length" > {{currentUser}} </h3>
    <b-button v-if="currentUser.length" variant="primary" @click="logOut">Log out</b-button>
    <b-button v-if="currentUser.length" variant="primary" @click="goHome">Todo list</b-button>
    <b-jumbotron v-else header="ToDo List" :lead="'Num : ' + todo.length">
    </b-jumbotron>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import router from "@/router";
import store from '@/store'

export default {
  name: "Header",
  computed: {
    ...mapState(['todo','currentUser']),

  },
  methods: {
    ...mapMutations(['set_cUser']),

    logOut: function() {
      store.commit('set_cUser','');
      router.push({path: `/`})
  },
    goHome: function (){
      if (router.currentRoute.name === "todoList"){

      }else{
        router.push({path: `/todoList/${this.currentUser}`})
      }

    }

  }
}
</script>

<style scoped>

</style>