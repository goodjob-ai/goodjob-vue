<template>
    <div class="goodjob_volet_clos" v-if="onlineEdit"  ref="goodjob_outBox" :class="[showFlag? 'goodjob_volet_clos_show' : '', hiddenFlag? 'goodjob_volet_clos_notShow' : '' ] " >
      <div class="goodjob_volet"  >
        <!-- 头部 -->
          <ul class="goodjob-volet-head" >
            <li>
              <img src="../assets/goodjoblogo.svg" alt="">
            </li>
            <li>
              <img :src="jbLanguageObj[jbSelecCode].Ico" alt="">
              <select @change="selectLang" style="border:none;background: #33264D;font-size: 16px;font-weight: bold;color: #FFFFFF;" >
                <option ref="selOption" v-for="item in jbLanguageObj" :value ="item.Code" :key="item.id" >{{item.Msg}}</option>
              </select>
            </li>
          </ul>
          <!-- 内容 -->
          <div class="goodjob-volet-content">
            <!-- {{$i18n.locale + ' + ，接口是否请求' + uploading }} -->
            <div class="left1 jb_left ">
              <!--  :disabled="!updateKey" -->
              <input  class="login-input"  v-model="jobkeyWord"  :placeholder="$t('jb_init.g_key_search')" >
              <p class="left1-tit">{{$t('jb_init.g_key_pageWord')}}</p>
              <ul v-if="pageMidKeys.filter(data => !jobkeyWord || $t(data).toLowerCase().includes(jobkeyWord.toLowerCase())).length" >
                <li v-for="(item,idx) in pageMidKeys.filter(data => !jobkeyWord || $t(data).toLowerCase().includes(jobkeyWord.toLowerCase()))"
                  :key="idx"
                  @click="clickPageList(item)" 
                  :class=" item == editStationFlag ? 'jb_left_checked' : ''"
                >
                  {{$t(item)}}
                </li>
              </ul>
              <!-- 无匹配文案 -->
              <p v-else class="left1-noSearch" >{{$t('jb_init.g_key_noMatched')}}</p>
            </div>

            <div class="left2 jb_left">
              <div class="left2-head">
                <div>
                  <img v-if="jbLanguageObj[editSourceLanguage]" :src="jbLanguageObj[editSourceLanguage].Ico" alt="">
                  <!-- <span>中文</span> -->
                  <span>{{jbLanguageObj[editSourceLanguage].Msg}}</span>
                </div>
                <p class="left2-head-right" >{{$t('jb_init.g_key_sample')}}</p>
              </div>
              <p class="left2-source" :class="editSourceValue ? 'left2-source-hasdata' : '' "> 
                {{ editSourceValue ? editSourceValue : $t('jb_init.g_key_source_placehoder')}}
              </p>
            </div> 
            <div class="left3 jb_left">
              <div class="left3-head">
                <div>
                  <img v-if="jbLanguageObj[targetLang]" :src="jbLanguageObj[targetLang].Ico" alt="">
                  <select @change="target_selectLang" style="border: none;color:rgba(0,0,0,.65);" >
                    <option ref="target_selOption" v-for="item in jbLanguageObj" :value ="item.Code" :key="item.id" >{{item.Msg}}</option>
                  </select>
                  <!-- <span>{{jbLanguageObj[jbSelecCode].Msg}}</span> -->
                </div>
                <p class="left3-head-right">{{$t('jb_init.g_key_current')}}</p>
              </div>
              <textarea :placeholder="$t('jb_init.g_key_target_placehoder')" class="left3-textarea" ref="goodjobInput" type="text" v-model="newValue" ></textarea>
              <div class="left3-btn" >
                <button :disabled="!(updateKey && newValue)" @click=" updateKey && newValue  ? saveBtn()  : e=>e.preventDefault() " type="submit" class="left3-ibtn" :class="updateKey && newValue ?'left3-submit' : 'left3-forbid' " >
                    <div v-if="uploading" class="left3-loading">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="btnItem">{{$t('jb_init.g_key_save')}}</div>
                  </button>
              </div>
            </div>
          </div>
          <!-- 展开 隐藏按钮 -->
          <button aria-hidden="true" v-show="showFlag" @click="showHandle" class="goodjob_ouvrir">{{$t('jb_init.g_key_hide') }}</button>
          <button aria-hidden="true" v-show="!showFlag"  @click="hiddenHandle" class="goodjob_fermer">{{$t('jb_init.g_key_show')}}</button>

      </div>
    </div>
</template>

<script>
import jbLanguages,{DebounceFunc} from '../utils/seLanguages'
export default {
  name: 'toUpdateMid', // NODE_ENV
  data(){
    return{
      showFlag:false,
      newValue: '', // 要更改的文案
      hiddenFlag: false,
      jbLanguageObj: {},
      jbSelecCode: '', // 操作台选择的语言code
      pageMidKeys:[], // 当前页的mid数组
      jobkeyWord:'', // 搜索的关键字
      uploading:false,
      editSourceLanguage: '', // 点击要修改元素的源语言
      editSourceValue: '', // 点击要修改元素的源语言的值
      targetLang:'',
      editStationFlag: '' // 标识选中总的的mid test0.g_key_0
    }
  },
  created() {
    if(!this.onlineEdit) return false
    this.editSourceLanguage= this.$i18n.locale
    
    // 根据用户传递的语言决定操作台语言选择的种类
    this.DEVELOPER_LANG.forEach(key=> {
      if(key in jbLanguages){
        this.jbLanguageObj= Object.assign(this.jbLanguageObj,{}, {
          [key]:jbLanguages[key]
        }) 
      }
    })

  },
  mounted(){
    if(!this.onlineEdit) return
    Array.from(this.$refs.target_selOption).forEach(item=>{
        if(item.getAttribute('value') == this.$i18n.locale ) {
          item.setAttribute('selected', item.getAttribute('value') )
          this.targetLang= this.$i18n.locale
        }
      })
  },
  methods:{
    // 操作台页面选择的值
    clickPageList(v){
      this.editStationFlag = v // 标识选中总的的mid test0.g_key_0
      let jobflag = v.split('.')
      this.langkey = jobflag[0]
      this.g_key=jobflag[1]
      // this.newValue = this.$i18n.messages[this.targetLang][this.langkey] && this.$i18n.messages[this.targetLang][this.langkey][this.g_key] || ''
      let typeEle = document.querySelectorAll('.jb_online')
      let allArray = []
      Array.from(typeEle).forEach(item=>{
        allArray.push(item, Array.from(item.getElementsByTagName('*')))
      })
      let flatArray =allArray.flat()
      const pagesI =flatArray.find(el=> el &&el.getAttribute('data-jb') == v )
      const pagesIArr = Array.from(pagesI.getElementsByTagName('*'))
      pagesIArr.forEach(item=>{
        if(item.className ==  'jb jb_icon-pencil' ){
          this.iconClickFunc(item, true)
        }
      })
      
    },
    // 操作台页面切换语言
    selectLang(v){
      this.jbSelecCode= v.target.value || v.srcElement.value
      this.$i18n.locale= v.target.value || v.srcElement.value

    },
    // 操作台目标语言选择
    target_selectLang(v){
      this.targetLang= v.target.value || v.srcElement.value
      this.newValue = this.$i18n.messages[this.targetLang][this.langkey] && this.$i18n.messages[this.targetLang][this.langkey][this.g_key] || ''
    },
    // 显示按钮
    hiddenHandle(){
      // 如果是开启状态，跳过改变状态
      this.showFlag=!this.showFlag
      this.showEditDialog()
    },
    
    // 获取页面的pages多语言标识并放置操作台
    showEditDialog(){
      Promise.resolve(this.editGoodjobAction()).then(res=>{
        if(res){
          // if(!this.pageMidKeys.length){
            this.editSourceValue=''
            this.newValue=''
            this.pageMid=[]
            this.pageMidKeys=[]
            this.$nextTick(()=>{
              this.pageMid= Array.from(Array.from(document.querySelectorAll('.jb_online')).map(item=> [item,...item.getElementsByTagName('*')])).flat()
              this.pageMidKeys = this.pageMid.filter(item=> item.getAttribute('data-jb')).map(el=>el.getAttribute('data-jb') )
            })
          // }
          this.hiddenFlag=false
        }
      })
    },

    showHandle(){
       this.showFlag= false
       this.editStationFlag=''
       this.remmoveGoodjobEdit()
       this.newValue=''
       this.hiddenFlag=true
    },
    
    saveBtn(){
      if(!this.$jobMap[this.langkey]) {
        this.$message.warning(this.$t('jb_init.g_key_invalid'))
        return false
      }
      this.uploading=true
      DebounceFunc(()=>{
        this.$setJobValue(this.langkey,this.updateKey,this.newValue, this.targetLang )
          .then(res=>{
            this.$jbMessages({
                content: this.$t('jb_init.g_key_success'),
                type: "success"
              }).show();
            this.$jobGet('/content/sdk',{mid:res.mid}, this.langkey ).then(()=> {
              // this.$LangObj(this.langkey,data)
              this.updateEditSourceValue()
              this.newValue=''
            })
            
          })
          .catch(err=>{
            if(err.code in this.ERRORCODE){
              this.$jbMessages({
              content: this.ERRORCODE[err.code],
              type: "err"
              }).show();
            } else{
              this.$jbMessages({
                content: err.desc ? err.desc : err.msg,
                type: "err"
              }).show();
            }
            
          })
          .finally(()=>{
            this.uploading=false
          })
      }, 500)
      
    },
    // 初始化及根据语言切换来选择操作台的语言
    setWorkStationLangFunc(){
      Array.from(this.$refs.selOption).forEach(item=>{
        if( this.$i18n.locale == item.getAttribute('value')){
          item.setAttribute('selected', item.getAttribute('value') )
        } else{
          item.removeAttribute('selected')
        }
      })
    },
    // 源语言的获取值的方法
  updateEditSourceValue(){
      Promise.resolve(this.$jobMap[this.langkey]).then(mid=>{
        if(mid) {
          this.editSourceLanguage = this.$jobMap[mid]
          this.editSourceValue= this.$i18n.messages[this.editSourceLanguage] && this.$i18n.messages[this.editSourceLanguage][this.langkey] && this.$i18n.messages[this.editSourceLanguage][this.langkey][this.updateKey]
        }
      })
    }
  },
  
  computed:{
    ERRORCODE(){
      return {
        1001: this.$t('jb_init.g_key_1001')
      }
    },
    // 用户的语言
    DEVELOPER_LANG(){
     return this.$initialLangs
    },
    updateKey(){
      return this.g_key
    },
    newValueCompted(){
      return this.langkey+'.'+this.g_key
    }
  },
  watch:{
    $route(){
      // 如果监听到页面跳转，就打开页面
      this.$nextTick(()=>{
        this.remmoveGoodjobEdit()
        this.editStationFlag=''
        if(this.showFlag) this.showEditDialog()
      })
    },
    newValueCompted(v){
      this.updateEditSourceValue()
    },
    'showFlag':{
      handler(v){
        if(v){
          this.setWorkStationLangFunc()
          if(this.$refs.goodjob_outBox && this.$refs.goodjob_outBox.previousElementSibling) this.$refs.goodjob_outBox.previousElementSibling.classList.add("goodjob_previousEl")
        } else{  
          if(this.$refs.goodjob_outBox && this.$refs.goodjob_outBox.previousElementSibling) this.$refs.goodjob_outBox.previousElementSibling.classList.remove('goodjob_previousEl')
          
        }
      },
      immediate:true
    },
    '$i18n.locale':{
      handler(lang){
        this.jbSelecCode= lang
        // if( document.getElementById('jb-pencil-em-checked')){
        //   document.getElementById('jb-pencil-em-checked').innerText= this.newValueCompted
        // }
        if(this.showFlag){
          this.setWorkStationLangFunc()
        }
      },
      immediate:true
    }
  }
}
</script>

<style >
body, html{
  margin: 0;
  padding: 0;
}
.goodjob_volet_clos {
  position: fixed;
  bottom:0; 
  /* left: 0; */
  width: 100%;
  /* height: 350px; */
  /* border: 1px solid red; */
  background: #33264D;
  box-shadow: 0px -10px 15px 0px rgba(196, 196, 196, 0.3);
  
}

.goodjob_previousEl{
  padding-bottom: 360px;
}

.goodjob_volet_clos_show{
  /* left: 0px; */
  /* top: 100%; */
  height: 350px;
  z-index: 999999999999;
  /* transition: all .3s ease-in;  */
  animation: addHeight .3s ease-in;
	-webkit-animation:addHeight .3s ease-in;
}

.goodjob_volet_clos_notShow{
  height: 0;
  animation: reduceHeight .3s ease-in;
	-webkit-animation:reduceHeight .3s ease-in;
}

@keyframes addHeight {
  from {
    height: 0;
  }
  to{
    height: 350px;
  }
}

@-webkit-keyframes addHeight {
  from {
    height: 0;
  }
  to{
    height: 350px;
  }
}

@keyframes reduceHeight{
  from {
    height: 350px;
  }
  to{
    height: 0;
  }
}

@-webkit-keyframes reduceHeight{
  from {
    height: 350px;
  }
  to{
    height: 0;
  }
}


.goodjob_volet {
  width: 250px;background: #fff; width: 100%;
  position: absolute;
  left: 0px;
  top: 0;
  transition: all .3s ease-in; 
  height:100%;
  z-index:99999999999;
}

.goodjob_ouvrir, .goodjob_fermer{

  height: 26px;
  background: #FFFFFF;
  border: 1px solid rgba(233, 235, 238, 0.8);
  box-shadow: -2px -2px 9px 0px rgba(196, 196, 196, 0.2);
  border-radius: 4px 4px 0px 0px;
  position: absolute;
  right: 6px;
  top: -26px;
  text-decoration: none;
  text-align: center; 
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #4D4D4D;
  /* width: 120px; */
  padding: 0 20px;
  cursor: pointer;
  outline-color: #FFFFFF;
  z-index:999999999999998;
}

.goodjob-volet-head{
  height: 50px;
  background: #33264D;
  box-shadow: 0px -10px 15px 0px rgba(196, 196, 196, 0.3);
  list-style: none;
  margin:0;
  padding: 0;
  display: flex;
  align-items: center;
}
.goodjob-volet-head >li:first-child{
  width: 100px;
  /* height: 50px; */
  /* margin-top: 5px; */
  margin-left: 30px;
  
}

.goodjob-volet-head >li:first-child > img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin-top: 6px;
}

.goodjob-volet-head >li:last-child{
  display: flex;
  align-items: center;
}

.goodjob-volet-head >li:last-child >img {
  width: 20px;
  height: 20px;
  background: #fff;
  vertical-align: middle;
  object-fit: contain;
  margin-left: 60px;
  margin-right: 10px;
  border-radius: 50%;
  padding: 1px;

}

.goodjob-volet-content{
  box-sizing: border-box;
  padding: 20px 20px 0 20px ;
  /* width: 33.3%; */
  /* border: 1px solid rgb(0, 255, 106); */
  /* height: 280px; */
  height: 300px;
  background: #FFFFFF;
  display: flex;
  /* overflow: hidden; */
  /* overflow-x: hidden; */
  
  
  /* justify-content: space-between; */
  /* border: 1px solid #E6E6E6; */
}

.goodjob-volet-content> .jb_left{
  /* width: 33.3%; */
  
  /* border: 1px solid #E6E6E6; */
  box-sizing: border-box;
  height: 100%;
  /* padding: 10px; */
}




.goodjob-volet-content > .left1 {
  width: 33%;
  /* box-sizing: border-box; */
}


.goodjob-volet-content > .left1 >input {
  width: 95%;
  height: 30px;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 2px;
  outline-color: rgba(23, 57, 230, .3);
  box-sizing: border-box;
  margin:10px 0 0 10px;
  padding-left: 10px;
}
.goodjob-volet-content > .left1 >ul {
  /* max-height: 90%; */
  list-style: none;
  height: calc(100% - 100px);
  margin: 0;
  padding: 0;
  /* border:1px solid #E6E6E6; */
  margin-bottom: 60px;
  /* border: 1px solid red; */
  overflow-x: hidden;
  /* border: 1px solid red; */
}

.goodjob-volet-content > .left1 >ul>li{
  /* min-height: 30px; */
  /* background: #F2F2F2; */
  /* opacity: 0.5; */
  line-height: 22px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 300;
  color: #4D4D4D;
  padding:5px 10px;
  /* margin-bottom: 5px; */
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  position: relative;
  box-sizing: border-box;
  border:1px solid transparent;
  border-bottom: 1px dashed #ebeef5;
  animation: all .3s ease-in-out;
  margin-bottom: 5px;
}

/* .goodjob-volet-content > .left1 >ul>li:nth-child(odd) {
  background: #F2F2F2;
} */

.goodjob-volet-content > .left1 >ul .jb_left_checked{
  color: #1739E6;
}

.goodjob-volet-content > .left1 > .left1-tit{
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #999999;
  margin: 18px 0 8px 0;
  padding: 0;
  padding-left: 1px;
  display: flex;
  justify-content: flex-start;
}

.goodjob-volet-content > .left1 > .left1-noSearch{
  padding-left: 10px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #f0c78a; 
  display: flex;
  justify-content: flex-start;
  /* rgba(76, 166, 255, 1); */
}

.goodjob-volet-content > .left2{
  /* padding: 10px; */
  height: 268px;
  width: 33.3%;
  margin: 0 20px;
}

.goodjob-volet-content > .left2 > .left2-head{
  padding: 0 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border:1px solid #E6E6E6;
  /* border-bottom: 1px solid rgba(230, 230, 230, 1); */
  
}

.goodjob-volet-content > .left2 > .left2-head .left2-head-right{
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #4D4D4D;
}

.goodjob-volet-content > .left2 > .left2-source{
  margin: 0;
  padding: 10px;
  height: calc(100% - 80px);
  overflow-x: hidden;
/* height: 14px; */
  font-size: 14px;
  /* font-family: PingFang SC; */
  font-weight: 300;
  color: #999999;
  border:1px solid #E6E6E6;
  border-top: none;
  background: rgba(250, 250, 250, 1);
}


.goodjob-volet-content > .left2 > .left2-source-hasdata{
  color: #4D4D4D;
}

.goodjob-volet-content > .left2 > .left2-head > div{
  display: flex;
  align-items: center;

  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #999999;
}

.goodjob-volet-content > .left2 > .left2-head > div >img{
  margin-right: 10px;
  width: 30px;
  height: 20px;
  object-fit: contain;
  vertical-align: middle;
}





.goodjob-volet-content > .left3{
  width: 33.3%;
  border: none;
}

.goodjob-volet-content > .left3 > .left3-head{
  padding: 0 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(230, 230, 230, 1);
  border-bottom: none;
}

.goodjob-volet-content > .left3 > .left3-head .left3-head-right{
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #4D4D4D;
}
.goodjob-volet-content > .left3 > .left3-source{
  margin: 0;
  padding: 10px;
  height: 100%;
  overflow-x: hidden;
/* height: 14px; */
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #4D4D4D;
  /* background: pink; */
  line-height: 22px;
}

.goodjob-volet-content > .left3 > .left3-head > div{
  display: flex;
  align-items: center;

  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #999999;
}

.goodjob-volet-content > .left3 > .left3-head > div >img{
  width: 22px;
  height: 18px;
  object-fit: contain;
  vertical-align: middle;
  margin-right: 10px;
}

.goodjob-volet-content > .left3 > .left3-textarea{
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 174px;
  background: #FFFFFF;
  border: 1px solid rgba(230, 230, 230, 1);
  overflow-x: hidden;
  /* outline: 1px solid #1739E6; */
  outline-color: rgba(23, 57, 230, .6);
  font-size: 14px;
  font-weight: 300;
  color: #1A1A1A;
}

.goodjob-volet-content > .left3 > textarea::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #a7a5a5;
}
.goodjob-volet-content > .left3 > textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #a7a5a5;
}
.goodjob-volet-content > .left3 > textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #a7a5a5;
}
.goodjob-volet-content > .left3 > textarea::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #a7a5a5;
}

.goodjob-volet-content > .left3 > .left3-btn{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.goodjob-volet-content > .left3 > .left3-btn .left3-loading{
  width: 25px;
  height: 25px;
  position: relative;
  margin: 0 auto;
  margin:0 10px;
}

.goodjob-volet-content > .left3 > .left3-btn .left3-loading span{
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    /* background: rgb(40, 233, 40); */
    background: #fff;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
  }
  @-webkit-keyframes load{
      0%{
          opacity: 1;
      }
      100%{
          opacity: 0.1;
      }
  }
  .goodjob-volet-content > .left3 > .left3-btn .left3-loading span:nth-child(1){
      left: 1px;
      top: 50%;
      margin-top:-2px;
      -webkit-animation-delay:0.13s;
  }
  .goodjob-volet-content > .left3 > .left3-btn .left3-loading span:nth-child(2){
      left: 4px;
      top: 4px;
      -webkit-animation-delay:0.26s;
  }
  .goodjob-volet-content > .left3 > .left3-btn .left3-loading span:nth-child(3){
      left: 50%;
      top: 2px;
      margin-left: -2px;
      -webkit-animation-delay:0.39s;
  }
  .goodjob-volet-content > .left3 > .left3-btn .left3-loading span:nth-child(4){
      top: 4px;
      right:5px;
      -webkit-animation-delay:0.52s;
  }
  .goodjob-volet-content > .left3 > .left3-btn .left3-loading span:nth-child(5){
      right:2.4px;
      top: 55%;
      margin-top:-2px;
      -webkit-animation-delay:0.65s;
  }
  .goodjob-volet-content > .left3 > .left3-btn .left3-loading span:nth-child(6){
      right: 4.3px;
      bottom:4.01px;
      -webkit-animation-delay:0.78s;
  }
  .goodjob-volet-content > .left3 > .left3-btn .left3-loading span:nth-child(7){
      bottom: 1.2px;
      left: 50%;
      margin-left: -2px;
      -webkit-animation-delay:0.91s;
  }
  .goodjob-volet-content > .left3 > .left3-btn .left3-loading span:nth-child(8){
      bottom: 4px;
      left: 3px;
      -webkit-animation-delay:1.04s;
  }

.goodjob-volet-content > .left3 > .left3-btn .left3-ibtn{
  border: none;
  min-width: 160px;
  height: 38px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #FFFFFF;
  outline: none;
  display: flex;
  align-items: center;
  
}

.goodjob-volet-content > .left3 > .left3-btn .left3-ibtn .btnItem{
  text-align: center;
}

.goodjob-volet-content > .left3 > .left3-btn .left3-submit{
  background: #1739E6;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
}

.goodjob-volet-content > .left3 > .left3-btn .left3-forbid{
  color: #bcbec2;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  display: flex;
  justify-content: center;
}


.goodjob-disable{
  background: gray;
  color: #fff;
  opacity: .3;
}

.jb_online{
  position: relative !important;
}

.jb_icon-pencil{
	width: 30px;
	height: 30px; 
  object-fit: contain;
	position: absolute;
	top:-10px;
  /* z-index: 999999999999998; */
  cursor: pointer;
  /* left: 10px; */
  /* transform:rotate(-70deg);
  -ms-transform:rotate(-70deg);
  -moz-transform:rotate(-70deg);
  -webkit-transform:rotate(-70deg);
  -o-transform:rotate(-70deg); */
  margin-right: 10px;
}


img[jb_icon-pencil='checked']{
  content:url("../assets/jb_green_edit.svg");
  animation: all .3s ease-in;
}

</style>
