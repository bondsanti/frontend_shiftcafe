export const state = () => ({
  position: "",
  drawer: false,
  img: "/logo.jpg",
  setting: null
});

export const mutations = {
  setPosition(state, text) {
    state.position = text;
  },
  set_drawer(state, newVal) {
    state.drawer = newVal;
  },
  setSetting(state, value) {
    state.setting = value;
  }
};

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return context.$axios
      .$get(context.env.config.BASE_URL + "/setting")
      .then(res => {
        vuexContext.commit("setSetting", res);
      })
      .catch(e => context.error(e));
  },
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
  },
  img(state) {
    return state.img;
  },
  setting(state) {
    return state.setting;
  }
};
