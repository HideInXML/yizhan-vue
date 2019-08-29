<template>
  <div class="container">
    <background v-if="backgroundShow" @closeBackground="closeBackground"></background>
    <div class="hello" v-if="!backgroundShow">
      
      <!--广告栏 -->
      <div class="adv-wrapper">
        <div class="adv-wrapper-text">&lt;广告&gt;</div>
      </div>
      <!--导航栏 -->
      <div class="hellowyizhan-header">
        <yizhanMenu v-if="menuSign"></yizhanMenu>
        <yizhanMenuForMB v-if="!menuSign"></yizhanMenuForMB>
      </div>

      <!--消除fixed布局多余部分 -->
      <!-- <div style="height:100px;width: 100%;">

      </div> -->
      <!--界面主体 -->
      <div class="hellowyizhan-container">
        <el-backtop target=".hellowyizhan-container" style="width:100px">
              <div
              style="{
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
              }"
            >
              <a style="color:black">回到顶部</a>
            </div>
        </el-backtop>
        <router-view></router-view>


        <!--底部导航 -->
        <div class="hellowyizhan-footer">

        </div>
        <!-- <vueCanvasNest :config="{color:'0,0,0',opacity: .9,count: 500,zIndex: -1,}"></vueCanvasNest> -->
      </div>

    </div>
  </div>
</template>

<script>
//引入vuex
import { mapState } from 'vuex'

import yizhanMenu from '@/components/menu/YizhanMenu'
import yizhanMenuForMB from '@/components/menu/YizhanMenuForMB'
import background from '@/components/Opening_Animation.vue'
import vueCanvasNest from 'vue-canvas-nest'

export default {
  components: {
    yizhanMenu,
    yizhanMenuForMB,
    background,
    vueCanvasNest 
  },
  data () {
    return {
      backgroundShow:true,
      screenWidth: 0, // 屏幕尺寸
      menuSign:true,//移动适配标记
    }
  },
  mounted() {
    // const that = this
    // window.onresize = () => {
    //   return (() => {
    //     window.screenWidth = document.body.clientWidth
    //     that.screenWidth = window.screenWidth
    //   })()
    // }
    window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
        console.log(this.screenWidth)
    if(this.screenWidth < 730)
    {
      this.menuSign = false
    }
    //设备宽度存入vuex
    this.width = this.screenWidth
    //2s后关闭动画
    setTimeout(()=>{
      // this.removejscssfile('static/sourceMaterial/mo.min.js','js')
      // this.removejscssfile('static/sourceMaterial/index.js','js')
      // this.removeCss('static/sourceMaterial/cssans.min.css')
      this.closeBackground()

    },2000)



  },
  computed:{
    width:{
        get()
        {
            return this.$store.state.deviceAttribute.width
        },
        set(v)
        {
            this.$store.commit('setWidth',v)
        }
    },
  },
  methods:{
    closeBackground(){
      //暂停动画
      burst.stop()
      //销毁组件
      this.backgroundShow = false
    },
    //移除js,css
    removejscssfile(filename,filetype){
      let targetelement = (filetype=="js")? "script" :(filetype=="css")? "link" : "none"
      var targetattr = (filetype=="js")?"src" : (filetype=="css")? "href" :"none"
      var allsuspects = document.getElementsByTagName(targetelement)
      for (var i=allsuspects.length; i>=0;i--){
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i])
      }
    },
  //移除css
  /**
   * 删除 link 文件
   * @param href
   */
  removeCss(href) {
      var links = document.getElementsByTagName("link");
      for (var i = 0; i < links.length; i++) {
          var _href = links[i].href;
          if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
              links[i].parentNode.removeChild(links[i]);
          }
      }
  },
    /**
     * 加载 link 文件
     * @param href
     */
    loadCss(href) {
        var addSign = true;
        var links = document.getElementsByTagName("link");
        for (var i = 0; i < links.length; i++) {
            if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
                addSign = false;
            }
        }
        if (addSign) {
            var $link = document.createElement("link");
            $link.setAttribute("rel", "stylesheet");
            $link.setAttribute("type", "text/css");
            $link.setAttribute("href", href);
            document.getElementsByTagName("head").item(0).appendChild($link);
        }
    },
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.container{
  width: 100%;
  height: 100%;
  overflow: hidden; 
}
.hello{
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.9;
  .adv-wrapper{
    display: block;
		position: fixed;
		z-index: 9999;
		background: #444;
		width: 100%;
		right:0;
		height: 40px;

    .adv-wrapper-text{
    	color: #a8a8aa;
      display: block;
      line-height: 40px;
      overflow: hidden;
      text-decoration: none;
      text-overflow: ellipsis;
      text-align: right;
      max-width: 976px;
      margin: 0 auto;
      font-size: small;
      position: relative;
      right: 10px
    }
  }
  .hellowyizhan-header{
    z-index: 9999;
    background:rgba(45,45,45,0.98);
    // background: black;
    position: fixed;
    width: 100%;
    top: 40px;
    height: 60px;
  }
  .hellowyizhan-container{
      // background: red;
      overflow: scroll;
      width: 100%;
      height: 100%;
      position: relative;
      top: 100px;
      // min-height: 200px;
      // opacity: 0.9;
  }
  .hellowyizhan-footer{
    // position: relative;
    // background: blue;
    width: 100%;
    height: 200px;
  }

}
</style>
