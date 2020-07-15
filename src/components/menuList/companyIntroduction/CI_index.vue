<!--  -->
<template>
<div style="height:100%">
    
    <!-- <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </el-collapse-item>
    <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </el-collapse-item>
    <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </el-collapse-item>
    <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
    </el-collapse-item>
    </el-collapse>
    <div style="height:200px">
       
    </div>
    <div style="height:200px">
        </div>
    <div style="height:200px">divdivdiv</div>
    <div style="height:200px">divdivdiv</div>
    <div style="height:200px">divdivdiv</div>
    <div style="height:200px">divdivdiv</div><div style="height:200px">divdivdiv</div> -->
    <TimeAxis></TimeAxis>

    <!-- <transition name="component-fade" mode="out-in">
        <component :is="componentsName" style="padding-top: 50px;"></component>
    </transition> -->
    <!-- <div class="background" :style="backgroundStyle"></div> -->
</div>
</template>

<script>
import TimeAxis from '@/components/menuList/companyIntroduction/TimeAxis.vue'
export default {

data () {
return {
    backgroundStyle:{        
        backgroundImage: "url(" + require("../../../assets/img/mac_pic.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "157% 22%",
        backgroundAttachment: "",
        //backgroundSize: "25px auto",
        //marginTop: "5px",
        //opacity: "0.9",
        //-moz-background-size:"100% 100%",
        backgroundSize:"61% 76%"
        },
    activeName: '1'
};
},

components: {
    TimeAxis
},

computed: {},


methods: {}
}

</script>
<style lang='scss' scoped>
.background{
    position: fixed;
    top: 100px;
    z-index: -1;
    width: 100%;
    height: calc(100% - 100px);
}
</style>