<template>
  <div>
    <b-table
        hover v-if="todo.length"
        sticky-header="800px"
        :items="todoList"
        :fields="fields"
        head-variant="light"
        @row-clicked="show">
      <template v-slot:cell(edit)="row">
        <b-button variant="success" @click="editTodo(row.item.id)">Edit</b-button>
      </template>
      <template v-slot:cell(delete)="row">
        <b-button variant="danger" @click="delete_todo(row.item.id)">Delete</b-button>
      </template>
    </b-table>
    <h1 v-else>No todos</h1>
    <b-button variant="primary" @click="newTodo">New Todo</b-button>
  </div>
</template>


<script>
import router from "@/router";
import { mapState, mapActions } from 'vuex';

export default {
  name: "ToDoList",
  computed: {
    ...mapState(['todo','currentUser']),
    todoList: function (){
      let tem = [];
      for (let i = 0; i < this.todo.length; i++){
        if (this.todo[i].user === this.currentUser){
          tem.push(this.todo[i])
        }}
      return tem
    }

  },
  data() {
    return {

      fields: [
        { key: 'user' },
        { key: 'title' },
        { key: 'category' },
        { key: 'created',
          formatter: value => {
            return new Date(value).toDateString()
          }},
        { key: 'due_date',
          formatter: value => {
            return new Date(value).toDateString()
          }},
        { key: 'edit'},
        { key: 'delete' },

      ]
    }
  },
  methods: {
    ...mapActions(['delete_todo']),
    show: function (item){
      router.push({path: `/todo/${item.id}`})
    },
    editTodo: function (item, index, event) {
      router.push({path: `/edit/${item}`})
    },
    newTodo: function () {
      router.push({path: '/newTodo'})
    }

  },
  updated() {
    return{
      ...mapState(['todo']),
    }
  }

}
</script>

<style>
tr:hover td{
  background: lightgreen;
}
</style>