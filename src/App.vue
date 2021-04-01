<template>
  <div id="app">
    <!-- <h1>{{ msg }}</h1> -->
    <h2>Essentiagggggggggggl Links</h2>
    <h1 class="jb_online" data-jb="test0.g_key_0" > {{ $t('test0.g_key_0') }}</h1>
    <h1 class="jb_online" data-jb="test0.g_key_10" > {{ $t('test0.g_key_10') }}</h1>
    <h1 class="jb_online" data-jb="test0.g_key_3" > {{ $t('test0.g_key_3') }}</h1>
    <h1 class="jb_online" data-jb="test0.g_key_4" > {{ $t('test0.g_key_4') }}</h1>
    <ToUpdateMid></ToUpdateMid>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    this.$jobGet('/content/sdk',{mid:'11006'}, 'test0').then(res=> {
      // this.$LangObj('test0',res).then(r=>{
        // console.log(res);
      // })
    }).catch(err=> {
      console.log(err)
    })
  }
}
</script>

<style>
/* html,body{
  margin:0;
  padding: 0;
} */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
