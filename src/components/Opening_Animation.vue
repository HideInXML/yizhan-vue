<!--  -->
<template>
<!-- 开场动画 -->
<div id="wrapper" @click="backgroundClick">
<div class="cssans cssans--center">
    <div class="cssans__accessible">CSSans Pro</div>

    <div class="cssans__word">
        <b class="cssans:a"></b>
        <b class="cssans:r"></b>
        <b class="cssans:t"></b>
    </div>
    <div class="cssans__word">
        <b class="cssans:O"></b>
        <b class="cssans:F"></b>
    </div>   
    <div class="cssans__word">
        <b class="cssans:c"></b>
        <b class="cssans:o"></b>
        <b class="cssans:m"></b>
        <b class="cssans:b"></b>
        <b class="cssans:a"></b>
        <b class="cssans:t"></b>
    </div>
</div>
</div>
</template>

<script>
import scriptjs from 'scriptjs'
// import mo from '../assets/js/background_combat/demo.js'
// import index from '../assets/js/background_combat/index.js'
export default {
data () {
return {
};
},
created(){

},
mounted() {
        //script 加载问题，迫不得已 让index 引入等待100ms
        // const s = document.createElement('script');
        // s.type = 'text/javascript';
        // s.src = 'static/sourceMaterial/mo.min.js';
        // document.body.appendChild(s);
    

        // let timout = setTimeout(()=>{
            // const ss = document.createElement('script');
            // ss.type = 'text/javascript';
            // ss.src = 'static/sourceMaterial/index.js';
            // ss.defer = 'true'

            // document.body.appendChild(ss);
        // },100)    
        
        scriptjs('static/sourceMaterial/openingAnimation/mo.min.js',()=>{

            scriptjs('static/sourceMaterial/openingAnimation/index.js',()=>{
                
            })  
            
        })
          

},

methods: {
    //点击关闭动画
    backgroundClick(){
        this.$emit('closeBackground')
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
    }
}
}

</script>

<style lang='scss' scoped>
#wrapper {
  display:flex;
  justify-content:center;
  align-items:center;
  width: 100%;
  height: 100%;
  position: fixed;
  bottom:0;
  /* z-index: -99; */
}

.cssans__word {
  position: relative;
}

</style>