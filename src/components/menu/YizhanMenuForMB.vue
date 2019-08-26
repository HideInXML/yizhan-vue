<!--  -->
<template>
<div class="menuForMB">
<div style="display: flex;
            align-items:center;">
<el-dropdown trigger="click"  @command="handleCommand" >
  <!-- <el-button icon="el-icon-menu" type="primary"></el-button> -->
  <i class="el-icon-connection" style="font-size: x-large;color: white;position: relative;left: 10px;"></i>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="1">首页</el-dropdown-item>
    <el-dropdown-item command="2">公司介绍</el-dropdown-item>
    <el-dropdown-item command="3">师资力量</el-dropdown-item>
    <el-dropdown-item command="4">校友风采</el-dropdown-item>
    <el-dropdown-item command="5">招班信息</el-dropdown-item>
    <el-dropdown-item command="6">联系我们</el-dropdown-item>
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
        url: 'static/pic/icon_designedBy_yanan/companyIcon.png'
};
},

components: {},
created(){
    //自动跳到主页
    this.$router.push("/mainPage")
},

methods: {
    handleCommand(key){
        console.log(key)
        if(key == 1)
        {
            this.$router.push("/mainPage")
        }
        if(key == 2)
        {
            this.$router.push("/companyIntroduction")
        }
        if(key == 3)
        {
            this.$router.push("/teacherStrength")
        }
        if(key == 4)
        {
            this.$router.push("/mateAchievement")
        }
        if(key == 5)
        {
            this.$router.push("/recruitClassInfo")
        }
        if(key == 6)
        {
            this.$router.push("/contactUs")
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