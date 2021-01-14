import Vue from 'vue'
import App from './App.vue'
import InitSDK from '@/utils/lang-tans.js'

 Vue.use(InitSDK, { 
  apiKey: '1a9346b9-1a3b-4559-a98c-55c6638c923f',
  apisecret: '8571117d788876b4aa6badb833341aaf',
  initI18n:['en', 'zh-CN'],
 })

new Vue({
  el: '#app',
  render: h => h(App)
})
