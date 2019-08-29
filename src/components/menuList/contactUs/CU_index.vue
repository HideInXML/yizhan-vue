<!--  -->
<template>
<div>
    CU_index
    <button @click="bc" style="width:50px" v-if="mainA">{{data}}</button>
    <a id="aa"></a>
    <input type="text" v-model="data">
    <!-- <father :data="data">

        <template slot="pane1">
            <div>
                
            </div>
        </template>
    </father> -->
    <!-- <father :data1 ='data'  @buttonClick='fatherClick'></father> -->
    
</div>
</template>

<script>
import father from './father.vue'
import { mapState } from 'vuex'
export default {
data () {
return {
    data:'0',
    mainA:true
};
},
components: {
    father,
},
computed:{
    width:{
        get()
        {
            return this.$store.state.deviceAttribute.width
        },
        set(v)
        {
            this.$store.commit('setWidth',v)
        }
    },
},
methods: {
    bc(){
        // this.data
        // this.data = '2'
        // this.mainA = false
        alert(this.width)
    },
    fatherClick(a){
        console.log(a)
    }
}
}

</script>
<style lang='scss' scoped>
</style>