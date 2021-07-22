export const state = () => ({
  position: ""
});

export const mutations = {
  setPosition(state, text) {
    state.position = text;
  }
};

export const actions = {
  setPosition(vuexContext, text) {
    vuexContext.commit("setPosition", text);
  },
  checkLogin(vuexContext) {
    //console.log(vuexContext.state.auth.user.ref_id_role.position);
    if (vuexContext.state.auth.user) {
      vuexContext.commit(
        "setPosition",
        vuexContext.state.auth.user.ref_id_role.position
      );
    }
  }
};

export const getters = {
  displayName(state) {
    return state.auth.user.fname + " " + state.auth.user.lname;
  },
  position(state) {
    return state.position;
  }
};
