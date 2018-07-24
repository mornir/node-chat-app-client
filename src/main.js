import Vue from 'vue'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'
import VModal from 'vue-js-modal'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueSocketio, io(process.env.VUE_APP_SOCKET_SERVER))
Vue.use(VModal, { dialog: true })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
