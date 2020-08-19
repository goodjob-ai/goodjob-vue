# goodjob-vue

> Vue is used in multiple languages

## Build Setup

``` bash
# install dependencies
npm install
```

## 账号注册及申请

1. 登陆 https://goodjob.ai/ 申请成为开发者

2. 面板栏选择创建新项目 goodjob

3. 个人中心查看生成的 apiKey 和 apiSecret.


## SDK-Vue 集成方式


#### 功能使用

1.  安装npm相关依赖
>项目使用js-sha256加密签名，需要安装此依赖
```
npm install js-sha256
```
>本身需要的依赖
```js
npm i goodjob-vue
```

#### 使用流程
1. 创建多语言需要的文件(如en),并在main.js中注册。
>国际化设置请参照 [element国际化 I18n](https://element.eleme.cn/#/zh-CN/component/i18n)

2. main.js中引用依赖并注册
```js
import goodJobSDK from 'goodjob-vue'
Vue.use(goodJobSDK)
```

3. 初始化sdk

> axios中调用 `Vue.initSDK` 方法添加签名
```js
// axios.js
import Vue from 'vue'
// 添加请求拦截器
httpService.interceptors.request.use( config => {
    /**
     * @description: 
     * @param {goodjob_api_key} goodjob个人中心的 api_key
     * @param {goodjob_api_key} goodjob个人中心的 api_secret
     * @return {Object}
     */
    Vue.initSDK(config,"goodjob_api_key","goodjob_api_secret")
    return config
    },
    error => {
        // Do something with request error
    }
)

```

> 简单封装get请求
```js
/**
 * @description: 
 * @param {url} 后台请求路径, 如: /content/sdk
 * @param {params} 后台需要的参数
 * @return {Promise}
 */

export function get(url, params) {
    return new Promise((resolve,reject) => {
        // axios实例请求
        httpService.get(url, {params: params} ) ...省略
    })
}
```

3. 组件请求后台数据，调用 `this.$transLangData` 返回页面所需的多语言数据格式
>例：
```js

// 获取转换数据 requstApi(自己定义请求数据的api)
 requstApi('/content/sdk', {'mid': 10660}).then(res=> {
    let resData = res.data.data

    /**
    * @description: 
    * @param {dataList} 后台多语言的数组数据。
    * @param {num} 需要的数据结构 需要num>=1，num=1时，根据语言种类返回原数据结构;num>1 的时候为一个大数组，大数组包含页面需要循环数组的数据结构，具体打印查看。
    * @param {start} 原始数据截取，表示从哪个数据开始截取。
    * @param {end} 原始数据截取，表示从哪个数据截取结束，实际截取 不包含这个数据，只保留前一个，该参数不传时，代表截取到最后一位。
    * @return {Onject}  返回各个语言种类处理后的数据结构。
    */

    this.$transLangData(resData, num, start, end).then(langData=> {
        console.log(langData)
        // 将返回的数据存储在多语言文件夹对应的 key 里面
        // 如 en.HomeHotJob = langData.en
    })
    ... 省略
})

```

## 组件多语言全局使用

1. template中使用
```html
<template>
    <!-- HomeTitle为文件自定义的 key -->
    <div>{{$t('HomeTitle[index].zw_val')}}</div>
    <!-- 或者 使用name可能会和google翻译插件冲突，被强制翻译，可在 index.html 添加<meta name="google" content="notranslate" />标签，强制关闭 -->
    <div>{{$t('HomeTitle[index].name')}}</div>
</template>
```
2. js中使用
```js
    this.$t('HomeTitle[index].zw_val')
```
3. 语言切换
```js
    this.$i18n.locale = '要切换的语言Code'
```
