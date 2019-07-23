<template>
  <div class="hello">
    <!--广告栏 -->
    <div class="adv-wrapper">
      <div class="adv-wrapper-text">&lt;广告&gt;</div>
    </div>
    <!--导航栏 -->
    <div class="hellowyizhan-header">
      <yizhanMenu></yizhanMenu>
    </div>

    <!--消除fixed布局多余部分 -->
    <div style="height:100px">

    </div>
    <!--界面主体 -->
    <div class="hellowyizhan-container">
      <router-view></router-view>
    </div>
    
    <!--底部导航 -->
    <div class="hellowyizhan-footer">

    </div>
  </div>
</template>

<script>
import yizhanMenu from '@/components/menu/YizhanMenu'
export default {
  components: {
    yizhanMenu,
  },
  data () {
    return {
      
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.hello{
  width: 100%;
  height: 100%;
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
    }
  }
  .hellowyizhan-header{
    background:rgba(45,45,45,0.98);
    position: fixed;
    width: 100%;
    top: 40px;
    height: 60px;
  }
  .hellowyizhan-container{
      background: red;
      width: 100%;
      min-height: -webkit-fill-available;
  }
  .hellowyizhan-footer{
    background: blue;
    width: 100%;
    height: 200px;
  }
}
</style>
