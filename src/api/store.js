import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: '',
    userId: '',
    nickName: ''
  },
  mutations: {
    setToken (state, token) {
      sessionStorage.setItem('token', token)
      state.token = token
    },
    setUserId (state, userId) {
      sessionStorage.setItem('userId', userId)
      state.userId = userId
    },
    setNickName (state, nickName) {
      sessionStorage.setItem('nickName', nickName)
      state.nickName = nickName
    }
  },
  getters: {
    getToken: state => {
      let token = sessionStorage.getItem('token')
      state.token = token
      return state.token
    },
    getUserId: state => {
      let userId = sessionStorage.getItem('userId')
      state.userId = userId
      return state.userId
    },
    getNickName: state => {
      let nickName = sessionStorage.getItem('nickName')
      state.nickName = nickName
      return state.nickName
    }
  }
})
export {
  store
}