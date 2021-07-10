const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: 'shift café  | %s',
    title: 'shift café',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'shift café' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Mitr&family=Sarabun&display=swap'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FFFFFF' },

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
  modules: ['@nuxtjs/vuetify', '@nuxtjs/axios', '@nuxtjs/auth'],

  axios: {
    baseURL: 'https://api.shift-cafe.com/api'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            method: 'post',
            url: 'authen/login',
            propertyName: 'token'
          },
          user: {
            method: 'get',
            url: 'authen/user',
            propertyName: 'user'
          },
          logout: false
        }
      }
    },
    redirect: {
      login: '/login'
    }
  },
  vuetify: {
    theme: {
      light: true, //you don't actually need this line as it's for default
      themes: {
        light: {
          primary: '#1d1d1d',
          secondary: '#ededed',
          info: '#39b54a'
        }
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {}
  }
}
