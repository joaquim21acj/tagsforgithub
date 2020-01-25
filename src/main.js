import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bv from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(bv)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
