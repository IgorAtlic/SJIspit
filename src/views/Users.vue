<template>
  <div class="home">
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <b-table v-if="user.length" sticky-header="800px" :items="user" head-variant="light"></b-table>
          <h1 v-else>No messages</h1>
        </b-col>
      </b-row>
    </b-container>
    <AddTask/>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import Header from "@/components/Header";

export default {
  name: "Users",
  computed: {
    ...mapState(['user'])
  },
  props: {
    users: Array
  },
  components: {
    Header,
  }


}
</script>

<style scoped>

</style>