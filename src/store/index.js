import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    subAppActive: false, // 子系统是否命中
    preActiveApp: "auth"
  },
  mutations: {
    TOGGLE_SUBAPPACTIVE(state, bol) {
      state.subAppActive = bol
    },
    CHANGE_PREACTIVEAPP(state, appName) {
      state.preActiveApp = appName
    },
  },
})

export default store
