<template>
  <b-container fluid>
    <Header/>
    <b-form>
      <b-row class="mt-2">
        <b-col sm="4" offset="5">
          <FormulateForm v-model="formValues" @submit="handleSubmit">
            <FormulateInput type= "textarea" name="title" label="Title" validation="required" />
            <FormulateInput type="date" name="dueDate" label="Due Date" validation="required" />
            <FormulateInput type="select" name="category" label="Category" validation="required" :options="{Work:'Work',Chores:'Chores',Learning:'Learning',People:'People',Care:'Care'}"/>
            <FormulateInput type="submit" label="Sign Up" />
          </FormulateForm>
        </b-col>
      </b-row>
    </b-form>
          <b-form>
      <b-row class="mt-2">
        <b-col sm="4" offset="4">
          <b-form-textarea v-model="newTitle" placeholder="Some message"></b-form-textarea>
        </b-col>
        <b-col sm="2" offset="4">
          <b-form-datepicker v-model="newDueDate" class="mb-2"></b-form-datepicker>
        </b-col>
        <b-col sm="0">
          <b-form-select v-model="newCategory" :options="options"></b-form-select>
        </b-col>
        <b-col sm="0" >
          <b-button variant="primary" size="lg" @click="addNew">Save</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions ,mapState} from 'vuex';
import Header from "@/components/Header";
import router from "@/router";


export default {
  name: "NewTodo",
  computed: {
    ...mapState(['currentUser']),
  },
  data() {
    return {
      formValues: {},
      newTitle: '',
      newDueDate:'',
      newCategory:'',
      options: [
        { value: 'Work', text: 'Work' },
        { value: 'Chores', text: 'Chores' },
        { value: 'Learning', text: 'Learning' },
        { value: 'People', text: 'People'},
        { value: 'Care', text: 'Care' },

      ]

    }
  },

  methods: {
    ...mapActions(['new_todo', 'change_todo']),

    addNew: function() {
      const msg = JSON.stringify({user: this.currentUser, title: this.newTitle, due_date:this.newDueDate , category:this.newCategory});

      this.new_todo(msg);

      router.push({path: `/todoList/${this.currentUser}`})

    },
    handleSubmit: function (){
      const msg = JSON.stringify({user: this.currentUser, title: this.formValues.title, due_date:this.formValues.dueDate , category:this.formValues.category});

      this.new_todo(msg);

      router.push({path: `/todoList/${this.currentUser}`})
    }

  },
  components: {
    Header,
  }
}
</script>

<style scoped>

</style>