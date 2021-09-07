const config = require("./config.js");

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  env: {
    config
  },
  head: {
    titleTemplate: "DEV FONG  | %s",
    title: "DEV FONG",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "powered by Dev Fong Co.,Ltd."
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
    baseURL: config.BASE_URL
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
      login: "/login",
      logout: "/login"
    }
  },
  moment: {
    defaultLocale: "th",
    locales: ["th"],
    timezone: true
  },
  vuetify: {
    theme: {
      light: true, //you don't actually need this line as it's for default
      themes: {
        light: {
          primary: "#1d1d1d",
          secondary: "#ededed",
          info: "#39b54a",
          accent: "#485fc7",
          warning: "#ffe08a",
          error: "#f14668",
          success: "#00b894",
          shades:"#FFFFFF"
        },
        dark: {}
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
