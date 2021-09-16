<template>
    <div>
        <Header/>
        <b-container>
            <b-row>
                <b-col cm="6" >
                        <ShowTodo v-if="todo.length" :todo="todos"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import ShowTodo from "@/components/ShowTodo";
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "showTodo",
        components: {
            Header,
            ShowTodo
        },
        computed: {
            ...mapState(['todo',"currentUser"]),

            todos: function () {
                for (let i = 0; i < this.todo.length; i++)
                    if (this.todo[i].id === parseInt(this.$route.params.id))
                        return this.todo[i];
            }
        },

    }
</script>

<style scoped>

</style>