<!--  -->
<template>
<div>
    <el-menu class="yizhanMenu_menu"
    default-active="1"
    mode="horizontal"
    @select="handleSelect"
    background-color="black"
    text-color="#fff"
    active-text-color="#ffd04b">
        <el-menu-item index="1" class="yizhanMenu_item">首页</el-menu-item>
        <el-menu-item index="2" class="yizhanMenu_item">公司介绍</el-menu-item>
        <el-menu-item index="3" class="yizhanMenu_item">师资力量</el-menu-item>
        <el-menu-item index="4" class="yizhanMenu_item">校友风采</el-menu-item>
        <el-menu-item index="5" class="yizhanMenu_item">招班信息</el-menu-item>
        <el-menu-item index="6" class="yizhanMenu_item">联系我们</el-menu-item>
    </el-menu>
</div>
</template>

<script>
export default {
data () {
return {
};
},

components: {},

computed: {},

created(){
    //自动跳到主页
    this.$router.push("/mainPage")
},

methods: {
    handleSelect(key, keyPath) {
        console.log(key);

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
.yizhanMenu_menu{
    //取消ui自带导航1px的底纹
    border-bottom: solid 0px ;
    //ui居中
    margin: 0 auto;
    //li居中 	此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。
    display:table;
    text-align:center;
    .yizhanMenu_item{
        font-size: 18px;
        margin: 0 10px;
    }

}

</style>