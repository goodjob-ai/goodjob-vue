import Vue from 'vue'
import App from './App.vue'
import tansLang from './plugin/index.js'
Vue.use(tansLang, { someOption: true })

new Vue({
  el: '#app',
  render: h => h(App)
})
