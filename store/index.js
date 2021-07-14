export const state = () => ({})

export const mutations = {}

export const actions = {}

export const getters = {
  displayName (state) {
    return state.auth.user.fname + ' ' + state.auth.user.fname
  },
  position (state) {
    return state.auth.user.ref_id_role.position
  }
}
