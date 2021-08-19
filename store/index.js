export const state = () => ({
  position: "",
  navDrawer: null,
  img: "/logo.jpg",
  setting: [
    {
      head_title: "DEV FONG",
      sub_title: "DEV FONG Co., Ltd.2021",
      address: "89/1 ถนนสุขสวัสดิ์ 4 ตำบลพระบาท อำเภอเมือง จังหวัดลำปาง 52000",
      tel: "0917961816",
      point: 100,
      footer: "DEV FONG Co., Ltd.2021",

      logo: "logo.ico",
      restaurant: "บริษัท ซิฟท์ เรสเตอรองต์ จำกัด"
    }
  ]
});

export const mutations = {
  setPosition(state, text) {
    state.position = text;
  },
  SET_NAV_DRAWER: (state, payload) => {
    state.navDrawer = payload
  },
  TOGGLE_NAV_DRAWER: state => {
    state.navDrawer = !state.navDrawer
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
    if (state.auth.user) {
      return state.auth.user.fname + " " + state.auth.user.lname;
    } else {
      return "DEV FONG";
    }
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
