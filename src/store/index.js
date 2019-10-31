import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  inShelfNum: 0
}

const mutations = {
  addShelfNum (state, data) {
    state.inShelfNum = state.inShelfNum + 1
  },
  removeShelfNum (state, data) {
    state.inShelfNum = state.inShelfNum - 1
  },
  inShelfNum (state, data) {
    state.inShelfNum = data
  }
}

export default new Vuex.Store({
  state,
  mutations
})
