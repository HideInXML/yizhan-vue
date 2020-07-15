<template>
<div style="width:100%;position: relative;" >
    <el-card shadow="hover" :body-style="{ padding: '0px' }" style="border-radius:25px"
    @mouseenter.native="cardFocus"  
    >
      <el-image style="width:100%"
      :src="imgSrc1"
      fit="contain"
      lazy
      ></el-image>

    </el-card>
    <!--    图片遮罩层  @click.native="cardClick"  @mouseleave.native="cardLossFocus"-->
    <cardMasking v-if="drawer"  :avatarSrc="avatarSrc"    @mouseleave.native="cardLossFocus"  @click.native="cardClick" @ImageViewClick="ImageViewClick"></cardMasking>
    <!-- 图片预览 -->
    <ElImageViewer 
     v-if="view"
     :on-close="closeViewer" :url-list="imgSrc1ArrayForPreview" ></ElImageViewer>

    <el-dialog
    title="作品简介"
    width="60%"
    :close-on-click-modal="false" :show-close="true" :close-on-press-escape="false" :visible.sync="dialogVisible" append-to-body 
    >
    <span>这是一段简介</span>
        
    </el-dialog>
</div>
</template>

<script>
import cardMasking from './CardMasking'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
props:{
    imgSrc1:{
        type:String,
        default:''
    }
},
data () {
return {
    avatarSrc:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    drawer:false,
    view:false,
    imgSrc1ArrayForPreview:[],
    dialogVisible:false
};
},

components: {
    cardMasking,
    ElImageViewer
},
computed: {},
mounted(){
    this.imgSrc1ArrayForPreview.push(this.imgSrc1)
    console.log(this.imgSrc1ArrayForPreview)
},
methods: {
    //打开图片预览
    cardClick(){
        console.log(123)
        this.view = true
    },
    // 关闭查看器
    closeViewer() {
     this.view = false
    },
    cardFocus(){
        console.log('focus')
        this.drawer = true
    },
    cardLossFocus(){
        console.log('lossFocus')
        this.drawer = false
    },
    //查看弹框
    ImageViewClick(){
        this.drawer = false
        this.dialogVisible = true
    }

}
}

</script>
<style lang='scss' scoped>
</style>