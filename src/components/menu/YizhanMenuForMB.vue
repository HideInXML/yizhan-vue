<!--  -->
<template>
<div class="menuForMB">
<div style="display: flex;
            align-items:center;">
<el-dropdown trigger="click"  @command="handleCommand" >
  <!-- <el-button icon="el-icon-menu" type="primary"></el-button> -->
  
  <i style="font-size: large;color: white;position: relative;left: 10px;"> 首页<i class="el-icon-caret-bottom" ></i></i>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="1">首页</el-dropdown-item>
    <!--<el-dropdown-item command="2">公司介绍</el-dropdown-item>
    <el-dropdown-item command="3">师资力量</el-dropdown-item> -->
    <el-dropdown-item command="2">作品展示</el-dropdown-item>
    <!-- <el-dropdown-item command="5">招班信息</el-dropdown-item> -->
    <el-dropdown-item command="3">联系我们</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</div>
    <div style="display: flex;
            align-items:center;
            justify-content: center;
            margin: 0 auto; 
            ">
        <el-image
        style=""
        :src="url"
        fit="contain"></el-image>
    </div>
</div>
</template>

<script>
export default {
data () {
return {
        url: "static/pic/icon_designedBy_yanan/companyIcon.png",
};
},

components: {},
created(){
    //自动跳到主页
    this.$router.push("/mainPageForMB")
},

methods: {
    handleCommand(key){
        console.log(key)
        if(key == 1)
        {
            this.$router.push("/mainPageForMB")
        }
        if(key == 2)
        {
            this.$router.push("/achievementShowForMB")
        }
        if(key == 3)
        {
            this.$router.push("/contactUsForMB")
        }
        
    }
}
}

</script>
<style lang='scss' scoped>
.menuForMB{
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
}
</style>