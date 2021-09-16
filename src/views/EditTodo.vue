<template>
  <b-container fluid>
    <Header/>
    <Edit :title="todos.title" :due_date="todos.due_date" :category="todos.category"/>
  </b-container>
</template>

<script>
import Header from "@/components/Header";
import Edit from "@/components/Edit";
import {mapState} from "vuex";

export default {
  name: "EditTodo",

  computed: {
    ...mapState(['currentUser','todo']),
    todos: function () {
      for (let i = 0; i < this.todo.length; i++)
        if (this.todo[i].id === parseInt(this.$route.params.id))
          return this.todo[i];
    }
  },
  components: {
    Header,
    Edit
  }
}
</script>

<style scoped>

</style>