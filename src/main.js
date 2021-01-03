import './styles/index.scss'

import Vue from 'vue'
import App from 'App.vue'
import Api from 'plugins/api'

Vue.config.productionTip = false

Vue.use(Api)

new Vue({
  render: h => h(App),
}).$mount('#app')
