<!--  -->
<template>
<div class="mateAchieveMent">
    <!-- MA_index -->
    <el-switch
        v-model="switchSign"
        active-text="总览模式"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="switchStyle"
        @change="switchChange"
    >
    </el-switch>
    <div class="mateAchieveMent_main">
        
    </div>
        <div class="mateAchieveMent_main1">
        
    </div>
</div>
</template>

<script>
export default {
data () {
return {
    switchSign:false
};
},

components: {},

computed: {},



methods: {
    switchChange(){

    }
}
}

</script>
<style lang='scss' scoped>
.mateAchieveMent{
    height: 100%;
    .switchStyle{
        position: fixed;
        top: 120px;
        right: 30px;
        z-index: 9;
    }
    .mateAchieveMent_main{
        height: 100px;
        width: 100px;
        background: red;
    }
        .mateAchieveMent_main1{
        height: 100px;
        width: 100px;
        background: green;
    }
}
</style>