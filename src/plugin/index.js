/*
 * @Author: your name
 * @Date: 2020-08-17 17:30:47
 * @LastEditTime: 2020-08-18 11:45:08
 * @LastEditors: Please set LastEditors
 * @Description: 初始化sdk配置， 封装处理多语言数据结构方法，全局使用
 * @FilePath: \goodjob-vue\src\plugin\index.js
 */
const sha256 = require("js-sha256").sha256
import axios from 'axios'

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */

const goodJobVue = {
    install(Vue,{apiKey, apisecret}) {

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
            timeout: 50000
        });
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
            
            },
            error => {
                // Do something with request error
                Promise.reject(error);
            }
        );
        
        jobServe.interceptors.response.use(response => {
                //一些统一code的返回处理
            if (response.status === 200) {
                if (!response.data.Code) {
                    return {code : true , data : response.data.data};
                } else {
                  return  Promise.reject({code:response.data.Code ,errMsg:response.data.Msg})
                }
            }
            return response;
        
            },
            error => {
                if(!error.response) { // 非code错误
                   let status = error.name; let data = {msg: error.message}
                    return Promise.reject({code:status, data})
                } else {
                    let { status, data } = error.response
                    return Promise.reject({code:status, data})
                }
            }
        );
        
        // 获取接口方法jobGet
        // Vue.prototype.$jobGet = (url, params) =>{
        //     return jobGet(url,params)
        // }

        Vue.prototype.$jobGet = function jobGet(url, params = {}) {
            return new Promise((resolve,reject) => {
                jobServe.get(url, {params})
                    .then(response => {
                        //返回成功处理  这里传的啥 后续调用的时候 res就是啥
                        resolve(response); //我们后台所有数据都是放在返回的data里所以这里统一处理了
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        }


        /**
         * @description: 
         * @param {dataList} 多语言的数组数据
         * @param {num} 需要的数据结构，即，为1时，以原数据机构返回，大于1的时候为一个大数组，大数组里面包含各个需要循环数据的小数组
         * @param {start} 原始数据截取，表示从哪个数据开始截取
         * @param {end} 原始数据截取，表示从哪个数据截取结束，实际截取 不包含这个数据，只保留前一个
         * @return {Onject}  返回处理后的数据对象，包含各个语言处理后的数据
         */
        
        Vue.prototype.$transLangData = function (dataList,num, start, end) {  // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
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
    window.Vue.use(goodJobVue);
   }

export default goodJobVue