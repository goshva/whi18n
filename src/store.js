import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const ax = axios.create();
ax.defaults.headers.post['Content-Type'] = 'application/json';
ax.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
ax.defaults.headers.common['Accept-Language'] = 'Bearer '+localStorage.getItem('lang')

ax.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (error.response.status === 401) {
   //   vue.$store.commit('signOut');
    }
  return Promise.reject(error);
  }
);



Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    models:{}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    modelsUpdate(state,models) {
      state.models = models
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        ax({ url: '/v2/my-session', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.headers["x-access-token"]
            const user = resp.data.user
            localStorage.setItem('token', token)
            localStorage.setItem('id', resp.data.id)
            localStorage.setItem('secret', resp.data.secret)
            ax.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            alert(err.response.headers["x-message"])
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    refresh({ commit }) {
      return new Promise((resolve, reject) => {
      const id = localStorage.getItem('id')
      const secret = localStorage.getItem('secret')
      commit('auth_request')
        ax({ url: `/v2/my-session/${id}/refresh`,
            data: { "secret":secret},
            method: 'PUT' })
          .then(resp => {
            const token = resp.headers["x-access-token"]
            const user = resp.data.user
            const session = {id: resp.data.id, secret:resp.data.secret}
            localStorage.setItem('token', token)
            localStorage.setItem('id', session.id)
            localStorage.setItem('secret', session.secret)
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            alert(err.response.headers["x-message"])
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    list({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        ax({ url: '/v2/translations' })
          .then(resp => {
              console.log(resp.data)
            commit('modelsUpdate', resp.data)
            resolve(resp)
          })
          .catch(err => {
              //
            if (err.response) { 
              console.log('error.client_error')
            //  dispatch("logout")


            } else {  
              alert('error.server_error')
            }

            commit('auth_error')
            reject(err)
          })
      })
    },
    getModel({ commit },model) {
      return new Promise((resolve, reject) => {
        ax({ url: `/v2/translation/${model.id}`, method: 'GET' })
          .then(resp => {
            const token = resp.headers["x-access-token"]
            const user = resp.data.user
            localStorage.setItem('token', token)
            resolve(resp)
          })
          .catch(err => {
            alert(err.response.headers["x-message"])
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        ax({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            //localStorage.setItem('token', token)
            // Add the following line:
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      //return new Promise((resolve, reject) => {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('secret')
        delete ax.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    models: state => state.models
  }
})
