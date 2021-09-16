<template>

    <b-container fluid>
        <b-row>
            <b-col sm="2">
                <label for="user">User:</label>
            </b-col>
            <b-col sm="10">
                <p id="user" style="text-align: left">{{ todo.user }}</p>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col sm="2">
                <label for="msg">Title:</label>
            </b-col>
            <b-col sm="10">
                <p id="msg" style="text-align: left">{{ todo.title }}</p>
            </b-col>
        </b-row>
      <b-row>
        <b-col sm="2">
          <label for="category">Category:</label>
        </b-col>
        <b-col sm="10">
          <p id="category" style="text-align: left">{{ todo.category }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="2">
          <label for="created">Created:</label>
        </b-col>
        <b-col sm="10">
          <p id="created" style="text-align: left" >{{ todo.created }} </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="2">
          <label for="due_date">Due date:</label>
        </b-col>
        <b-col sm="10">
          <p id="due_date" style="text-align: left">{{ todo.due_date }}</p>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "ShowTodo",
        props: {
            todo: Object
        },
    }
</script>