import Vue from 'vue'
import Vuex from 'vuex'
import deviceAttribute from './modules/deviceAttribute'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    deviceAttribute:deviceAttribute
  }
})
