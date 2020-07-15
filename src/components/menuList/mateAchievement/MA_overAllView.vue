<!--  -->
<template>
<div class="MA_overAllView">
    <!-- <el-row style="width:100%;flex-wrap: wrap;" :gutter="10" type="flex">
        <el-col :span='4' v-for="(item,index) in imgArray" :key="index" style="overflow: hidden;">
         
            <CardForOverAllView :imgSrc1='item'></CardForOverAllView>
        </el-col>
    </el-row>  -->
    
     <!-- <div class="MA_overAllView_div" style="background: red;width: 25%;" v-for="(item,index) in imgArray" :key="index">

         item
     </div> -->
     <!-- <CardForOverAllView :imgSrc1='imgSrc1' style="width:24%"></CardForOverAllView> -->
     
     <div  class="MA_overAllView_div">
         <CardForOverAllView :imgSrc1='item' v-for="(item,index) in imgArray1" :key="index" style="margin:0 0 10px 0;" ></CardForOverAllView>
     </div>
     <div  class="MA_overAllView_div">
         <CardForOverAllView :imgSrc1='item' v-for="(item,index) in imgArray2" :key="index" style="margin:0 0 10px 0;" ></CardForOverAllView>
     </div>
     <div  class="MA_overAllView_div">
         <CardForOverAllView :imgSrc1='item' v-for="(item,index) in imgArray3" :key="index" style="margin:0 0 10px 0;" ></CardForOverAllView>
     </div>
     <div  class="MA_overAllView_div">
         <CardForOverAllView :imgSrc1='item' v-for="(item,index) in imgArray4" :key="index" style="margin:0 0 10px 0;" ></CardForOverAllView>
     </div>
     <div  class="MA_overAllView_div">
         <CardForOverAllView :imgSrc1='item' v-for="(item,index) in imgArray5" :key="index" style="margin:0 0 10px 0;" ></CardForOverAllView>
     </div>



</div>
</template>

<script>
import CardForOverAllView from './CardForOverAllView'
// import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
data () {
return {
    imgArray1:['static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg'],
    imgArray2:['static/pic/3.jpg','static/pic/2.jpg'],
    imgArray3:['static/pic/3.jpg','static/pic/3.jpg','static/pic/3.jpg','static/pic/3.jpg'],
    imgArray4:['static/pic/1.jpg','static/pic/3.jpg','static/pic/3.jpg'],
    imgArray5:['static/pic/2.jpg','static/pic/3.jpg','static/pic/1.jpg'],
    // imgArray1:['static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg'],
    // imgArray2:['static/pic/3.jpg','static/pic/2.jpg','static/pic/3.jpg','static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg'],
    // imgArray3:['static/pic/3.jpg','static/pic/3.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg'],
    // imgArray4:['static/pic/1.jpg','static/pic/3.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg',
    // 'static/pic/2.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg'],
    // imgArray5:['static/pic/2.jpg','static/pic/3.jpg','static/pic/1.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg','static/pic/2.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg',
    // 'static/pic/2.jpg','static/pic/3.jpg'],
    imgSrc1:'static/pic/1.jpg'
};
},

components: {
    CardForOverAllView,
    // ElImageViewer
},

computed: {},

methods: {

}
}

</script>
<style lang='scss' scoped>
.MA_overAllView{
    // background: green;
    width: 92%;
    // height: 100%;
    margin: 0 auto;
    display: flex;
    .MA_overAllView_div{
        width:20%;
        padding: 10px;
    }
}
</style>