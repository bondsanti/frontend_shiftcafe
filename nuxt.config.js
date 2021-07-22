const pkg = require("./package");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "shift café  | %s",
    title: "shift café",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "shift café powered by Dev Fong Co.,Ltd."
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/logo2.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Mitr&family=Sarabun&display=swap"
      }
    ],
    script: [
      // {
      //   src: "https://code.jquery.com/jquery-3.5.1.min.js",
      // },
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#FFFFFF" },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/moment",
    "nuxt-sweetalert2"
  ],

  axios: {
    baseURL: "https://api.shift-cafe.com/api"
    //  http://localhost:5555/api
    // 'https://api.shift-cafe.com/api'
    //http://192.168.1.24:555/api
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            method: "post",
            url: "authen/login",
            propertyName: "token"
          },
          user: {
            method: "get",
            url: "authen/user",
            propertyName: "user"
          },
          logout: false
        }
      }
    },
    redirect: {
      login: "/login"
    }
  },
  vuetify: {
    theme: {
      light: true, //you don't actually need this line as it's for default
      themes: {
        light: {
          primary: "#1d1d1d",
          secondary: "#ededed",
          info: "#39b54a"
        }
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ["vue-apexchart"],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  server: {
    port: 3000,
    host: "0.0.0.0"
  }
};
