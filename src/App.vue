<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dataList: [{"title":"英式英语","lang":"en","list":[{"name":"Jacob","u_key":"","g_key":"g_key_0","index":0},{"name":"Software Architect","u_key":"","g_key":"g_key_1","index":1},{"name":"P8 expert","u_key":"","g_key":"g_key_2","index":2},{"name":"system structure","u_key":"","g_key":"g_key_3","index":3},{"name":"Full stack development","u_key":"","g_key":"g_key_4","index":4},{"name":"$6000/month (full-time)","u_key":"","g_key":"g_key_5","index":5},{"name":"Hiring","u_key":"","g_key":"g_key_6","index":6},{"name":"David","u_key":"","g_key":"g_key_7","index":7},{"name":"UI designer","u_key":"","g_key":"g_key_8","index":8},{"name":"Ace designer","u_key":"","g_key":"g_key_9","index":9},{"name":"Website design","u_key":"","g_key":"g_key_10","index":10},{"name":"Brand design","u_key":"","g_key":"g_key_11","index":11},{"name":"$5500/month (full-time)","u_key":"","g_key":"g_key_12","index":12},{"name":"Hiring","u_key":"","g_key":"g_key_13","index":13},{"name":" James","u_key":"","g_key":"g_key_14","index":14},{"name":"Corporate trainer","u_key":"","g_key":"g_key_15","index":15},{"name":"Gold trainer","u_key":"","g_key":"g_key_16","index":16},{"name":"Enterprise Architecture","u_key":"","g_key":"g_key_17","index":17},{"name":"Salary incentives","u_key":"","g_key":"g_key_18","index":18},{"name":"$8000/month (full-time)","u_key":"","g_key":"g_key_19","index":19},{"name":"Hiring","u_key":"","g_key":"g_key_20","index":20}]},{"title":"中文-简体","lang":"zh-CN","list":[{"name":"Jacob","u_key":"","g_key":"g_key_0","index":0},{"name":"软件架构师","u_key":"","g_key":"g_key_1","index":1},{"name":"P8专家级","u_key":"","g_key":"g_key_2","index":2},{"name":"系统架构","u_key":"","g_key":"g_key_3","index":3},{"name":"全栈开发","u_key":"","g_key":"g_key_4","index":4},{"name":"$ 6000/月(全职)","u_key":"","g_key":"g_key_5","index":5},{"name":"雇佣中","u_key":"","g_key":"g_key_6","index":6},{"name":"David","u_key":"","g_key":"g_key_7","index":7},{"name":"UI设计师","u_key":"","g_key":"g_key_8","index":8},{"name":"王牌设计师","u_key":"","g_key":"g_key_9","index":9},{"name":"网站设计","u_key":"","g_key":"g_key_10","index":10},{"name":"品牌设计","u_key":"","g_key":"g_key_11","index":11},{"name":"$5500/月(全职)","u_key":"","g_key":"g_key_12","index":12},{"name":"雇佣中","u_key":"","g_key":"g_key_13","index":13},{"name":" James","u_key":"","g_key":"g_key_14","index":14},{"name":"企业培训师","u_key":"","g_key":"g_key_15","index":15},{"name":"金牌培训师","u_key":"","g_key":"g_key_16","index":16},{"name":"企业架构","u_key":"","g_key":"g_key_17","index":17},{"name":"薪酬激励","u_key":"","g_key":"g_key_18","index":18},{"name":"$8000/月(全职)","u_key":"","g_key":"g_key_19","index":19},{"name":"雇佣中","u_key":"","g_key":"g_key_20","index":20}]}]
    }
  },
  mounted () {
    this.$transLangData(this.dataList, 3, 1).then(res=> {
      console.log(res)
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
