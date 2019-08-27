<!--  -->
<template>
<div>
    CU_index
    <button @click="bc" style="width:50px" v-if="mainA">{{data}}</button>
    <a id="aa"></a>
    <!-- <father :data="data">

        <template slot="pane1">
            <div>
                
            </div>
        </template>
    </father> -->
    <father :data ='data'  @buttonClick='fatherClick'></father>
    
</div>
</template>

<script>
import father from './father.vue'

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

methods: {
    bc(){
        this.data = '2'
        this.mainA = false
    },
    fatherClick(a){
        console.log(a)
    }
}
}

</script>
<style lang='scss' scoped>
</style>