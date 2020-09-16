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
  apisecret: '您的apisecret'
 })
```
2. 获取多语言数据
```
this.$jobGet('/content/sdk',{mid:'您的mid'}).then(res=>{
    consle.log(res)
})

```
3. 将多语言数据放入对应的语言包文件，参考I18n国际化设置（数据处理可使用功能扩展）。

## 全局使用自定义多语言（国际化设置）
>国际化设置请参照 [element国际化 I18n](https://element.eleme.cn/#/zh-CN/component/i18n)


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

# 功能扩展
>组件请求后台数据，调用 `this.$transLangData` 返回页面所需的多语言数据格式
```js
    /**
    * @description: 
    * @param {dataList} 后台多语言的数组数据。
    * @param {num} 需要的数据结构 ,num必须大于等于1。当num=1时，根据语言种类返回原数据结构;num>1 的时候为一个大数组，大数组包含页面需要循环数组的数据结构，具体打印查看。
    * @param {start} 原始数据截取，表示从哪个数据开始截取。
    * @param {end} 原始数据截取，表示从哪个数据截取结束，实际截取 不包含这个数据，只保留前一个，该参数不传时，代表截取到最后一位。
    * @return {Onject}  返回各个语言种类处理后的数据结构。
    */

    this.$transLangData(resData, num, start, end).then(langData=> {
        console.log(langData)
        // 将返回的数据存储在多语言文件夹对应的 key 里面
        // 如 en.HomeHotJob = langData.en
    })

```

# 谷歌翻译和多语言冲突解决
1. 添加`<meta name="google" content="notranslate" />`标签，强制关闭(目前推荐此方式)
2. 或者采用：页面使用时采用`zw_val` 这个key获取value
3. 如果有更好的解决方法，还望多指教，谢谢