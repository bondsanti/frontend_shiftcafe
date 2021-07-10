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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }]
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
  modules: ['@nuxtjs/vuetify', '@nuxtjs/axios', '@nuxtjs/auth', '@nuxtjs/moment'],

  axios: {
    baseURL: 'http://192.168.1.24:5555/api'
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

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {}
  },
  server:{
    port:3000 ,
    host:'0.0.0.0'
  }
}