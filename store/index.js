export const state = () => ({
  title: 'SHIFT CAFE',
  displayName: 'Long2'
})

export const mutations = () => ({
  setDisplayName (state, user) {
    state.setDisplayName = user
  }
})

export const getters = () => ({
  displayName (state) {
    return state.displayName
  }
})
export const actions = () => ({})
