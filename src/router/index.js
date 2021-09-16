import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import showTodo from "@/views/ShowTodo";
import NewTodo from "@/views/NewTodo";
import Users from "@/views/Users";
import TodoList from "@/views/TodoList";
import EditTodo from "@/views/EditTodo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/todoList/:user',
    name: 'todoList',
    component: TodoList
  },
  {
    path: '/newTodo',
    name: 'newTodo',
    component: NewTodo
  },
  {
    path: '/todo/:id',
    name: 'todo',
    component: showTodo
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditTodo
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
