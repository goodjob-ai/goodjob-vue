import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import InitSDK from './utils/lang-tans'

Vue.use(VueI18n)
Vue.use(InitSDK, { 
  apiKey: '3500e6af-8c02-4f70-a422-4ce5c928632c',
  apisecret: 'a196d92ae0bf78ebca824b13160fb639',
  // initI18n:['fff'],
  initI18n:{
    en:{},
    'zh-CN':{ },
    ko:{}
  },
  onlineEdit: true // 是否开启在线修改
 })

 const i18n = new VueI18n({
  locale: 'en', // 语言标识,粗在state里面
  messages: Vue.i18nObj, // MyLocale,
  silentTranslationWarn: true,
  formatFallbackMessages: true,
  silentFallbackWarn: true,
  
})

new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
