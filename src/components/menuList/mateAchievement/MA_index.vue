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
    <!-- 渐入渐出动画 -->
    <transition name="component-fade" mode="out-in">
        <component :is="componentsName" style="padding-top: 50px;"></component>
    </transition>
</div>
</template>

<script>
import MA_main from '@/components/menuList/mateAchievement/MA_main.vue'
import MA_overAllView from '@/components/menuList/mateAchievement/MA_overAllView.vue'
export default {
data () {
return {
    switchSign:false,
    componentsName:'MA_main'
};
},

components: {
    MA_main,
    MA_overAllView,    
},

computed: {},



methods: {
    switchChange(){
        console.log(this.switchSign)
        if(this.switchSign)
        {
            this.componentsName = 'MA_overAllView'
        }
        else
        {
            this.componentsName = 'MA_main'
        }
    }
}
}

</script>
<style lang='scss' scoped>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
.mateAchieveMent{
    height: 100%;
    overflow: scroll;
    .switchStyle{
        position: fixed;
        top: 120px;
        right: 30px;
        z-index: 999;
    }
}
</style>