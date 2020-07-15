<!--  -->
<template>
<div>   
    <div style="width：100%;text-align: center; margin-top:10px">
    <el-carousel :interval="3000" type="card" height="400px" style="width:90%;display: inline-block;">
    <el-carousel-item v-for="item in imgSrc1" :key="item">
        <el-image
        style="width:100%; height: 100%"
        :src="item"
        fit="fill">
        </el-image> 
    <div slot="error" class="image-slot">
    <i class="el-icon-picture-outline"></i>
    </div>

    </el-carousel-item>
    </el-carousel> 
        
    </div>
</div>
</template>

<script>
export default {
data () {
return {
    url:'static/pic/1.jpg',
    imgSrc1:['static/pic/1.jpg','static/pic/2.jpg','static/pic/3.jpg']
};
},

components: {},

computed: {},
methods: {}
}

</script>
<style lang='scss' scoped>

</style>