const sha256 = require("js-sha256").sha256
import axios from 'axios'

const goodJobVue = {
    install(Vue,{apiKey, apisecret, initI18n}) {
        if(Array.isArray(initI18n)){
            let i18nObj={}
            Object.values(initI18n).forEach(item=>{
                console.log(item);
                i18nObj[item]={}
            })
            Vue.i18nObj= i18nObj
        }else{
            Vue.i18nObj= initI18n
        }
        

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
            let { url, params} = config
            let signParams = ''
            let time= parseInt(+new Date() /1000).toString()
            for (let key in params) {
                if(params[key]){
                signParams+='&'+key+'='+params[key];
                }
            }
            let signValue = ''
            if(signParams.slice(1)) {
                signValue = 'tokenGET' + url + '?' + signParams.slice(1) + time
            } else {
                signValue = 'tokenGET' + url + time
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
                return response.data.data
            } else {
                return Promise.reject({ code: response.data.code, errMsg: response.data.msg })
            }
        
        },error => {
            return Promise.reject(error)
        })
        
        /**
         * 获取接口方法jobGet
         * @param url
         * @param params
         * @returns {Promise}
         */

        Vue.prototype.$jobGet = function jobGet(url, params = {}) {
            return new Promise((resolve,reject) => {
                jobServe.get(url, {params})
                    .then(response => {
                        //返回成功处理  这里传的啥 后续调用的时候 res就是啥
                        resolve(response)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }


        
        
        /**
         * 2021-1-13
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
                })
                
                for(let i=0;i<dataList.length;i++){ // 各种语言情况
                    let sliceList = dataList[i].list //.filter(el => el.name).slice(start, end)
                    sliceList.forEach(item=> {
                        for (const key in returnObj) {
                            if(key == dataList[i].lang) {
                                returnObj[key][langKey][item.index] = item.name
                                returnObj[key][langKey][item.g_key] = item.name
                            }
                        }
                    })
                }

                Object.keys(returnObj).forEach(key=>{
                    Vue.i18nObj[key]= {...Vue.i18nObj[key], ...returnObj[key] }
                })
                resolve(Vue.i18nObj)
            })
        }

        // 将转换成指定数组

        /**
         *
         * 2021-1-13
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

        /**
         * @description: 2021-1-13 这个是之前保留的老方法
         * @param {dataList} 多语言的数组数据
         * @param {num} 需要的数据结构，即，为1时，以原数据机构返回，大于1的时候为一个大数组，大数组里面包含各个需要循环数据的小数组
         * @param {start} 原始数据截取，表示从哪个数据开始截取
         * @param {end} 原始数据截取，表示从哪个数据截取结束，实际截取 不包含这个数据，只保留前一个
         * @return {Onject}  返回处理后的数据对象，包含各个语言处理后的数据
         */
        
        Vue.prototype.$transLangtoArray_old = function (dataList,num, start, end) {  // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
            return new Promise((resolve, reject)=> {
                // flag传入错误的情况
                let flag = num <1 || typeof num != 'number' || typeof end == 'string' || !Array.isArray(dataList)  ? false : true ;
                let returnObj = {}
                dataList.forEach((item,idx,arr)=> {
                    // 没数据情况删除元素自身
                    if(!item.list || !item.list.length ) arr.splice(idx, 1);
                    returnObj[item.lang.replace(/-/g, '_')] = []
                })
                if(flag) {
                    for(let i=0;i<dataList.length;i++){ // 各种语言情况
                        dataList[i].lang = dataList[i].lang.replace(/-/g, '_')
                        let sliceList = dataList[i].list.filter(el => el.name).slice(start, end) // 获取所需位置后的数据
                        sliceList.forEach(item=> item.zw_val = item.name ) // 防止开启谷歌插件强制翻译的问题，template中可用zw_val取值
                        for(let k=0;k<sliceList.length;k+=num){
                            for (const key in returnObj) {
                                if(num > 1) {
                                    if(key == dataList[i].lang) returnObj[key].push(sliceList.slice(k,k+num))
                                } else {
                                    if(key == dataList[i].lang) returnObj[key] = sliceList
                                }
                            }
                        }
                    }
                    resolve(returnObj)
                } else {
                    reject({msg:'请按要求传入正确的参数'})
                }
            })
        }
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(goodJobVue)
}   

export default goodJobVue