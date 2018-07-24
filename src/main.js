import Vue from 'vue'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueSocketio, io(process.env.VUE_SOCKET_SERVER))

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
