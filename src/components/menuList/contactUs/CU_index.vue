<!--  -->
<template>
<div>

    <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose">
        <span>我来啦!</span>
    </el-drawer>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
data () {
return {
    drawer:false
};
},
mounted(){
    this.drawer = true
},
components: {
},
computed:{
},
methods: {
    handleClose(done) {
        this.$router.back()
    }
    
}
}

</script>
<style lang='scss' scoped>
</style>