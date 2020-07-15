<!--  -->
<template>
<div class="cardMasking" >
    <div class="cardMasking_bottom" style="display:flex">
        <div style="width:30%;height:100%;display: flex;
            align-items:center;
            justify-content: center;
            margin: 0 auto;">
            <el-avatar :size="60" fit="fill" :src="avatarSrc" @click.native="avatarClick()" >
            </el-avatar>
        </div>
        <div style="width:70%;height:100%;">
            <div style="width:100%;height:70%;
            ">
                <div  style="width:100%;text-align: left;">
                <font color="#fff" size="4" >作品名称:</font>
                </div>
                <div style="width:100%;text-align: left;">
                <font color="#fff" size="3" >{{picName}}</font>
                </div>
                <div  style="width:100%;text-align: left;">
                <font color="#fff" size="4" >简介:</font>
                </div>
                <div style="width:100%;text-align: left;">
                <el-button  size="mini" @click.stop="ImageViewClick($event)" type="primary" >[😈点此查看😈]</el-button>
                </div>
                <!-- <div style="width:100%;height:40%;z-index:20" >
                    <el-button  size="mini" @click="ImageViewClick()" type="danger" >[😈点此预览😈]</el-button>
                </div> -->
                
                

            </div>
            <div style="width:100%;height:30%">
                <el-button  size="mini" @click.stop="zanClick()">👍赞{{zanNum}}</el-button>
                <el-button icon="el-icon-chat-dot-square" circle size="mini"></el-button>
                <el-button icon="el-icon-s-promotion" circle size="mini"></el-button>
            </div>
        </div>
        <!-- <el-avatar class="cardMasking_avatar" fit="fill" :src="avatarSrc" @click.native="avatarClick()" >
        </el-avatar>
        <el-button type="danger" icon="el-icon-delete" circle @click="btnClick()"></el-button> -->
    </div>

</div>
</template>

<script>
export default {
    props:{
    avatarSrc:{
        type:String,
        default:''
    }
},
data () {
return {
    zanNum:0,
    picName:"xxxxxx",
    
};
},

components: {},

computed: {},
methods: {
    ImageViewClick(ev1){
        
        this.$emit('ImageViewClick')
        // ev1.cancelBubble=true
    },
    zanClick(){
        this.zanNum += 1
    },
    avatarClick(){
        console.log(123)
    },
    btnClick(){
        alert(123)
    }
}
}

</script>
<style lang='scss' scoped>
.cardMasking{
    width: 100%;
    height: 100%;
	background: #fff;
	position: absolute;
	opacity: 0.6;
	border-radius: 25px;
    top: 0;
    .cardMasking_bottom{
        width: 100%;
        height: 150px;
        position: absolute;
        bottom: 5px;
        // opacity: 0.7;
        background: #111;
        // color: #fff;
        // font-size: 2em;
        text-align: center;
        // font-weight: bolder;
        padding: 0;
        z-index: 1;
        border-radius: 0 0 20px 20px;
        .cardMasking_avatar{
            height: 100%;
            width: 100%;
        }
    }
}
</style>