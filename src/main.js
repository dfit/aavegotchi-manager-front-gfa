import Vue from 'vue'
import App from './App.vue'
import { store } from '@/stores/store.js'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import '@/assets/styles/fonts.css'

Vue.use(Vuetify, {
  iconfont: 'mdi'
})
const vuetify = new Vuetify({
  icons: {
    values: {
      sortAsc: 'mdi-arrow-up',
      sortDesc: 'mdi-arrow-down'
    }
  },
  theme: {
    themes: {
      light: {
        primary: '#0082c3',
        secondary: '#004061',
        accent: '#fe5800',
        error: '#E20C18',
        info: '#0082c3',
        success: '#02be8a',
        warning: '#fe5800'
      }
    }
  }
})
new Vue({
  vuetify,
  render: h => h(App),
  store
}).$mount('#app')
