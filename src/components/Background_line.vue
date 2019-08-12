<!--  -->
<template>
<div class="container"></div>
</template>

<script>
import scriptjs from 'scriptjs'
export default {
data () {
return {
};
},

mounted(){
    this.loadCss('static/sourceMaterial/background_line/style.css')
    scriptjs('static/sourceMaterial/background_line/jparticle.min.js',()=>{

        scriptjs('static/sourceMaterial/background_line/index.js',()=>{
            
        })  
    
    })
},
components: {},


methods: {
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
<style lang='scss' scoped>
</style>