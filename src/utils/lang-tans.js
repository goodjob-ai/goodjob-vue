const sha256 = require("js-sha256").sha256
import axios from 'axios'
import ToUpdateMid from '../components/ToUpdateMid.vue'
import JbMessages from '../components/JbMessages/index.js'

function getChildNotes(nodes){
    for (let i = 0; i < nodes.length; i++) {
        if(nodes[i].getAttribute('data-jb')) return nodes[i]
    }

}

const goodJobVueEdit = {
    install(Vue,{apiKey, apisecret, initI18n,onlineEdit= false}) {
        Vue.prototype.$jbMessages = JbMessages;
        // 用户定义的语言
        Vue.prototype.$initialLangs= []
        Vue.i18nObj={
            en:{},
            'zh-CN':{}
        }

        // 初始化默认多语言
        let copyInitI18n={
            en:{},
            'zh-CN':{}
        }
        if(Array.isArray(initI18n)){
            if(!initI18n.length) throw new Error('Please pass in the "keys" needed for multiple languages.')
            Vue.prototype.$initialLangs = initI18n
             
            Object.values(initI18n).forEach(item=>{
                copyInitI18n={
                    ...copyInitI18n,
                    [item]:{}
                }
            })
            jb_mergeInitLang(copyInitI18n)
        }else{
            if(!Object.keys(initI18n).length) throw new Error('Please pass in the "keys" needed for multiple languages.')
            Vue.prototype.$initialLangs = Object.keys(initI18n)
            copyInitI18n={
                ...copyInitI18n,
                ...initI18n
            }
            jb_mergeInitLang(copyInitI18n)
        }
        
        /**
         *
         * 多语言合并初始值，及自定义值
         * @param {多语言对象} copyInitI18n
         */
        function jb_mergeInitLang(copyInitI18n){
            
            for(const key in  copyInitI18n){
                if(key != 'zh-CN') {
                    copyInitI18n[key]= {
                        jb_init:{
                            g_key_search: 'Search keyword',
                            g_key_pageWord:'Interface copywriter:',
                            g_key_sample:'Source language template',
                            g_key_current:'The target language',
                            g_key_show:'SHOW',
                            g_key_hide: 'HIDE',
                            g_key_save:'Save Translation',
                            g_key_noMatched:'No matching copy',
                            g_key_success: 'Modify the success',
                            g_key_invalid:'Please bind valid parameters',
                            g_key_source_placehoder:'Please select the source language copy you want to modify',
                            g_key_target_placehoder:'Please select the target language and enter the copy',
                            g_key_1001: 'Data not found'
                        },
                        ...copyInitI18n[key]
                    }
                } else{
                    copyInitI18n[key]={
                        jb_init:{
                            g_key_search: '搜索关键字',
                            g_key_pageWord:'界面文案：',
                            g_key_sample:'源语言模板',
                            g_key_current: '目标语言',
                            g_key_show:'显示',
                            g_key_hide: '隐藏',
                            g_key_save:'保存 翻译',
                            g_key_noMatched:'无匹配文案',
                            g_key_success: '修改成功',
                            g_key_invalid:'请绑定有效参数 ',
                            g_key_source_placehoder:'请选择需要修改的源语言文案',
                            g_key_target_placehoder:'请选择目标语言并输入文案',
                            g_key_1001: '数据不存在'
                        },
                        ...copyInitI18n[key]
                    }
                }
            }
            Vue.i18nObj= Object.assign(Vue.i18nObj,copyInitI18n)
        }
        
        Vue.component('ToUpdateMid',ToUpdateMid)
        // 生命周期全局混入 添加修改箭头和点击事件
            
        let jobflag= null
        Vue.mixin({
            data(){
                return{
                    langkey: null,
                    g_key:null
                }
            },
            computed:{
                // 用户当前环境
                onlineEdit(){
                    return onlineEdit
                } 
            },
            methods:{
                iconClickFunc(v, ispage){
                    let evt = v || window.event;
                    //IE用cancelBubble=true来阻止而FF下需要用stopPropagation方法
                    evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble=true)
                let classCount = ispage ? v.getAttribute('goodjob-classNum') : v.target.getAttribute('goodjob-classNum')
                // 
                    let clickArr = Array.from(document.querySelectorAll('.jb'))
                    clickArr.forEach(el=>{
                        
                        if(el.getAttribute('goodjob-classNum') == classCount  ){
                            // 添加点中标识
                            // TODO:这里要调试当前页的数据
                            if(ispage){
                                v.setAttribute('jb_icon-pencil', 'checked' )
                                v.parentNode.setAttribute('jb-pencil-item', 'checked' )
                            } else{
                                v.target.setAttribute('jb_icon-pencil', 'checked' )
                                v.target.parentNode.setAttribute('jb-pencil-item', 'checked' )
                            }

                            // !获取所有子孙元素是否包含特殊元素
                            let nodeFlag = ispage?
                                getChildNotes([ v.parentNode ,...v.parentNode.getElementsByTagName('*')])
                                :
                                getChildNotes([ v.target.parentNode ,...v.target.parentNode.getElementsByTagName('*')])
                            // 

                            if(nodeFlag){
                                // 
                                jobflag = nodeFlag.getAttribute('data-jb').split('.')
                                nodeFlag.setAttribute('jb-pencil-item', 'checked' )
                            } else{
                                
                                jobflag= ispage ? 
                                    v.parentNode.getAttribute('data-jb').split('.') 
                                    : 
                                    v.target.parentNode.getAttribute('data-jb').split('.')
                            }
                            
                            // 多语言的外层key
                            this.langkey = jobflag[0]
                            this.g_key=jobflag[1]
                            // 选中的总Mid
                            this.editStationFlag = jobflag.join('.')
                            
                            // 获取焦点事件
                            this.$nextTick(()=>{
                                // this.newValue= this.$t(this.langkey+'.'+this.g_key)
                                this.newValue = this.$i18n.messages[this.targetLang][this.langkey] && this.$i18n.messages[this.targetLang][this.langkey][this.g_key] || ''
                                this.$refs.goodjobInput.focus()
                            })
                            } else{

                                let notClickFlag = getChildNotes(el.parentNode.getElementsByTagName('*'))
                                // 
                            if(notClickFlag) notClickFlag.removeAttribute('jb-pencil-item')
                            el.removeAttribute('jb_icon-pencil')
                            el.parentNode.removeAttribute('jb-pencil-item')
                            }
                    })
                
                },
                editGoodjobAction(){
                    let typeEle = document.querySelectorAll('.jb_online')
                    let ele = Array.from(typeEle)
                    ele.forEach((item,idx) => {
                        // display:inline-block;
                        // let itemStyle=item.style
                        // item.style.cssText="position:relative !important;"+itemStyle
                        // // item.style.position='relative;'
                        // item.style.color='red;'

                        if(Array.from(item.children).some(iEl=> iEl.className == 'jb jb_icon-pencil')) return false
                        // let createI= document.createElement("i");
                        let createI= document.createElement("img");
                        createI.src= require('../assets/jb_blue_edit.svg')
                        createI.className=`jb jb_icon-pencil`
                        createI.setAttribute('goodjob-classNum', `jb${idx}` )

                        // !点击事件
                        // this.iconClickFunc(createI)
                        createI.onclick= v=>{
                            this.iconClickFunc(v,false)
                        }
                        item.appendChild(createI)
                    });
                    return true
                },
                // 清除编辑箭头ICON
                remmoveGoodjobEdit(){
                    let typeEle = document.querySelectorAll('.jb_online')
                    let ele = Array.from(typeEle)
                    this.langkey= null
                    ele.forEach(item=>{
                        Array.from(item.getElementsByTagName('*')).filter(el=> el.getAttribute('class') == 'jb jb_icon-pencil' ).forEach(clo=>clo.remove())
                        Array.from([item,...item.getElementsByTagName('*')]).forEach(clo=>{
                        //    if(clo.getAttribute('jb-pencil-pre') == 'checked' ) clo.remove()
                            if(clo.getAttribute('jb-pencil-item') == 'checked') clo.removeAttribute('jb-pencil-item')
                        })
                    })
                    
                }
            }
        })

        /**
         * @description: 
         * @param {config} 
         * @param {apiKey} 
         * @param {apisecret} 
         * @return {Object} 设置请求头（apiKey, apisecret， 签名
         */
        
        //  添加全局方法或属性，如:  vue-custom-element
        var jobServe = axios.create({
            baseURL: 'https://api.goodjob.ai',
            timeout: 40000
        })

        jobServe.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8'
        
        // 添加请求拦截器
        jobServe.interceptors.request.use( config => {
            let { url, params, method} = config
            let signParams = ''
            let time= parseInt(+new Date() /1000).toString()
            for (let key in params) {
                if(params[key]){
                signParams+='&'+key+'='+params[key];
                }
            }
            let signValue = ''
            if(signParams.slice(1)) {
                signValue = 'token'+ method.toUpperCase() + url + '?' + signParams.slice(1) + time
            } else {
                signValue = 'token' + method.toUpperCase() + url + time
            }
            config.headers.common = {
                apiKey, // apiKey
                'timestamp': time,
                'sign': sha256.hmac(apisecret, signValue) // ApiSecret
            }
            return config
            
        },error => {
            // Do something with request error
            Promise.reject(error)
        })
        
        jobServe.interceptors.response.use(response => {
                //一些统一code的返回处理
            if (response.status === 200 && response.data.code === 0) {
                return response.data.data || response.data
            } else {
                return Promise.reject(response.data)
            }
        
        },error => {
            return Promise.reject(error)
        })
        
        //mid元素集合
        Vue.prototype.$jobMap = {}
        
        
        /**
         * @param {*} key 设置语言时候的key
         * @param {*} value 获取的值
         */
        Vue.prototype.$setJobValue = function(langKey,g_key,name,language) {
            let mid = parseInt(Vue.prototype.$jobMap[langKey])
            let data = {
                g_key,
                language,
                mid,
                name
            }
            return new Promise((resolve,reject) => {
                jobServe.post('/sdk/cell',data)
                    .then(response => {
                        resolve({mid,...response})
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }

        /**
         * 获取接口方法jobGet
         * @param url
         * @param params 请求数据传递参数
         * @param langKey_name 默认对象的方法 require
         * @param isLangObj 是否使用默认对象 not require
         * @returns {Promise}
         */

        Vue.prototype.$jobGet = function jobGet(url, params = {}, langKey_name, isLangObj= true) {
            return new Promise((resolve,reject) => {
                jobServe.get(url, {params})
                    .then(response => {
                        //返回成功处理  这里传的啥 后续调用的时候 res就是啥
                        response.map(item=>item['mid']= params.mid )
                        if(isLangObj) this.$LangObj(langKey_name,response)
                        resolve(response)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
        // 修改文案
        Vue.prototype.$jobEdit = function jobEdit(url='/sdk/cell',params){
            return new Promise((resolve,reject) => {
                jobServe.post(url, {params})
                    .then(response => {
                        //返回成功处理  这里传的啥 后续调用的时候 res就是啥
                        // response.map(item=>item['mid']= params.mid )
                        resolve(response)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }


        
        
        /**
         *
         *
         * @param {*} langKey 多语言模板的key
         * @param {*} dataList goodjob.ai多语言数据传入的数组
         */
        Vue.prototype.$LangObj = function(langKey,dataList) {  // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
            if(langKey.replace(/\s/g,"") == '' ||  !(dataList instanceof Array) ){
                throw new Error('第一个参数为多语言对象key,不能为空，第二个参数请输入goodjob数据数组')
            }
            
            return new Promise(resolve=>{
                let returnObj = {}  
                dataList.forEach((item,idx,arr)=> {
                    // 没数据情况删除元素自身
                    if(!item.list || !item.list.length ) arr.splice(idx, 1)
                    returnObj[item.lang] = {}
                    this.$set(returnObj[item.lang], langKey, {})
                    // 
                    this.$set(Vue.prototype.$jobMap,langKey,item.mid)
                    this.$set(Vue.prototype.$jobMap,item.mid,dataList[0].lang)


                })

                
                for(let i=0;i<dataList.length;i++){ // 各种语言情况
                    let sliceList = dataList[i].list //.filter(el => el.name).slice(start, end)
                    sliceList.forEach(item=> {
                        for (const key in returnObj) {
                            if(key == dataList[i].lang) {
                                // returnObj[key][langKey][item.index] = item.name
                                returnObj[key][langKey][item.u_key] = item.name
                            }
                        }
                    })
                }

                // 保存数据请求回来i18n的值
                Object.keys(returnObj).forEach(key=>{
                    // Vue.i18nObj[key]= {...Vue.i18nObj[key], ...returnObj[key] }
                    this.$set(Vue.i18nObj,key,{...Vue.i18nObj[key], ...returnObj[key] })
                })
                resolve(Vue.i18nObj)
            })
        }

        // 将转换成指定数组

        /**
         *
         *
         * @param {*} Objdata 要传入的数组
         * @param {number} [num=1] 要分割成几个对象，不传的时候代表不处理数据
         * @param {number} [start=0] 截止对象开始的位置，不传的时候从下标0开始
         * @param {*} end 截止对象结束位置，不传的时候到数组结尾结束
         * @return {*} 
         */
        Vue.prototype.$LangArr = function (Objdata,num=1,start=0,end) {  // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
            if( typeof Objdata !='string' && !(Objdata instanceof Object)) throw new Error('请传入对象类型')
            Objdata=Object.values(Objdata).slice(start,end)
            let returnArr = []
            for(let k=0;k<Objdata.length;k+=num){
                if(num > 1) {
                    returnArr.push(Objdata.slice(k,k+num))
                } else {
                    returnArr= Objdata
                }
            }
            return returnArr
        }

    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(goodJobVueEdit)
}   

export default goodJobVueEdit