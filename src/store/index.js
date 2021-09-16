import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo: [],
    user: [],
    currentUser:''
  },

  mutations: {
    set_todo: function (state, todo) {
      state.todo = todo;
    },

    add_todo: function (state, todo) {
      state.todo.push(todo);
    },

    remove_todo: function (state, id) {
      for (let m = 0; m < state.todo.length; m++) {
        if (state.todo[m].id === id) {
          state.todo.splice(m, 1);
          break;
        }
      }
    },

    update_todo: function (state, payload) {
      for (let m = 0; m < state.todo.length; m++) {
        if (state.todo[m].id === parseInt(payload.id)) {
          state.todo[m].user = payload.msg.user;
          state.todo[m].title = payload.msg.title;
          state.todo[m].due_date = payload.msg.due_date;
          state.todo[m].category = payload.msg.category;
          break;
        }
      }
    },

    set_user: function (state, user){
      state.user = user;
    },
    add_user: function (state, user) {
      state.user.push(user);
    },
    remove_user: function (state, id) {
      for (let m = 0; m < state.user.length; m++) {
        if (state.user[m].id === id) {
          state.user.splice(m, 1);
          break;
        }
      }
    },
    update_user: function (state, payload) {
      for (let m = 0; m < state.user.length; m++) {
        if (state.user[m].id === parseInt(payload.id)) {
          state.user[m].username = payload.u.username;
          state.user[m].password = payload.u.password;
          break;
        }
      }
    },
    set_cUser: function (state, currentUser){
      state.currentUser = currentUser;
    },
  },

  actions: {
    load_todo: function ({ commit }) {
      fetch('http://localhost:8000/api/todo', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_todo', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    delete_todo: function({ commit }, id) {
      fetch(`http://localhost:8000/api/todo/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_todo', jsonData.id)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    new_todo: function({ commit }, message) {
      fetch('http://localhost:8000/api/todo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: message
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_todo', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    change_todo: function({ commit }, payload) {
      fetch(`http://localhost:8000/api/todo/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.msg
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('update_todo', {id: payload.id, msg:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    load_users: function ({ commit }) {
      fetch('http://localhost:8000/api/user', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_user', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    new_user: function({ commit }, user) {
      fetch('http://localhost:8000/api/adduser', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_user', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    load_cUsers: function ({ commit }, u) {
      fetch('http://localhost:8000/api/user/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: u}).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_cUser', jsonData.username)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
  }
})
