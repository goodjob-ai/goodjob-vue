# goodjob-vue

> Vue is used in multiple languages,The Vue version applies to [Goodjob.ai](https://goodjob.ai)

## 账号注册及申请

1. 登陆 https://goodjob.ai/ 申请成为开发者

2. 面板栏选择创建新项目 goodjob

3. 面板->点击您的项目名称项目->设置: 查看生成的 apiKey 和 apiSecret


## SDK-Vue 集成方式


### 安装依赖

```js
npm i --s goodjob-vue
```

### 使用流程
1. main.js中引用并初始化
```js
import goodJobSDK from 'goodjob-vue'
Vue.use(goodJobSDK, { 
  apiKey: '您的apiKey',
  apisecret: '您的apisecret',
  initI18n:['zh-CN','en'], // 此处为要设置的语言数组
  // initI18n:{ // or对象形式赋值
  //   en:{},
  //   'zh-CN':{}
  // }
 })

//  i18n设置

const i18n = new VueI18n({
  ...
  messages: Vue.i18nObj
  //如果这里有其他本地的文件，将本地和Vue.i18nObj合并,可参考[element国际化](https://element.eleme.cn/#/zh-CN/component/i18n)
  ...
})

```
2. 获取多语言数据并调用Api处理语言数据
```
this.$jobGet('/content/sdk',{mid:'您的mid'}).then(res=>{
    consle.log(res)
    <!-- 处理语言数据,新增了回调，可查看i18n数据 -->
    this.$LangObj(多语言模板的key,res).then(i18n=>{
        console.log(i18n)
    })

```

## 全局使用自定义多语言（国际化设置）

1. template中使用
```html
<template>
    <div>{{ $t('模板的key.语言的key') }}</div>
    <!-- 例如： <h1 >{{ $t('test0.0') }}</h1> 或者 <h1 >{{ $t('test0.g_key_0') }}</h1> -->

</template>
```
1. js中使用
```js
    this.$t('模板的key.语言的key')
```
3. 语言切换
```js
    this.$i18n.locale = '要切换的语言Code'
```

# 功能扩展
>组件请求后台数据，调用 `this.$transLangData` 返回页面所需的多语言数据格式
```js
    1: this.$LangArr(this.$t('模板key'),num,start,end)
    /**
     * 将多语音对象转换为嵌套层级的数组,除第一个参数都为非必填
     * @param {*} 
     * @param {number} [num=1] 要分割成几个对象，不传的时候代表不处理数据
     * @param {number} [start=0] 截止对象开始的位置，不传的时候从下标0开始
     * @param {*} end 截止对象结束位置，不传的时候到数组结尾结束
     * @return {*} 
     */


    2:'老版本转化多余格式参照master分支 this.$transLangData'

```

# 谷歌翻译和多语言冲突解决
1. 添加`<meta name="google" content="notranslate" />`标签，强制关闭(目前推荐此方式)
2. 如果有更好的解决方法，还望多指教，谢谢