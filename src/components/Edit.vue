<template>
    <b-container fluid>
        <b-form>
            <b-row class="mt-2">
                <b-col sm="5" offset="4">
                    <b-form-textarea v-model="newTitle" placeholder="Some message"></b-form-textarea>
                </b-col>
                <b-col sm="2" offset="4">
                    <b-form-datepicker v-model="newDueDate" class="mb-2"></b-form-datepicker>
                </b-col>
                <b-col sm="2">
                  <b-form-select v-model="newCategory" :options="options"></b-form-select>
                </b-col>
                <b-col sm="0" >
                    <b-button variant="primary" size="lg" @click="addNew">Save</b-button>
                </b-col>
            </b-row>
        </b-form>
      <b-form>
        <b-row class="mt-2">
          <b-col sm="4" offset="5">
            <FormulateForm v-model="formValues" @submit="handleSubmit">
              <FormulateInput type= "textarea" v-model="newTitle" label="Title" validation="required" />
              <FormulateInput type="date" v-model="newDueDate" label="Due Date" validation="required" />
              <FormulateInput type="select" v-model="newCategory" label="Category" validation="required" :options="{Work:'Work',Chores:'Chores',Learning:'Learning',People:'People',Care:'Care'}"/>
              <FormulateInput type="submit" label="Sign Up" />
            </FormulateForm>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
</template>

<script>
    import { mapActions ,mapState} from 'vuex';
    import router from "@/router";


    export default {
        name: "Edit",
        props: {
            user: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            due_date:{
                type: String,
                default:''
            },
            category:{
                type: String,
                default:''
            }
        },
        data() {
            return {
              formValues:'',
                newUser: '',
                newTitle: '',
                newDueDate:'',
                newCategory:'',
              options: [
                { value: '1', text: 'Work' },
                { value: '2', text: 'Chores' },
                { value: '3', text: 'Learning' },
                { value: '4', text: 'People'},
                { value: '5', text: 'Care' },

              ]

            }
        },
      mounted: function () {
        this.newTitle = this.title;
        this.newCategory = this.category;
        this.newDueDate = this.due_date;
      },
        methods: {
            ...mapActions(['new_todo', 'change_todo']),

            addNew: function() {
                const msg = JSON.stringify({user: this.newUser, title: this.newTitle, due_date:this.newDueDate , category:this.newCategory});

                this.new_todo(msg);

            },
          handleSubmit: function (){
            const msg = JSON.stringify({user: this.currentUser, title: this.newTitle, due_date:this.newDueDate , category:this.newCategory});

            this.change_todo({id:this.$route.params.id, msg: msg});

            router.push({path: `/todoList/${this.currentUser}`})
          }
        }
    }
</script>

<style scoped>

</style>