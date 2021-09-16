<template>
  <b-container>
    <Header/>
    <b-row>
      <b-col cm="6" >
        <ToDoList/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Header from "@/components/Header";
import ToDoList from "@/components/ToDoList";


export default {
  name: "TodoList",
  components: {
    Header,
    ToDoList
  }
}

</script>

<style scoped>

</style>