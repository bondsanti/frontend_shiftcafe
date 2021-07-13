import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {},
    mutations: {
      setUser (state, user) {}
    },
    actions: {},
    getters: {
      displayName (state) {
        return state.auth.user.fname + ' ' + state.auth.user.fname
      }
    }
  })
}

export default createStore
