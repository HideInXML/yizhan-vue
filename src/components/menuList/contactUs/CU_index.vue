<!--  -->
<template>
<div>
    CU_index
    <button @click="bc" style="width:50px">{{data}}</button>
    
    <father :data="data">

        <template slot="pane1">
            <div>
                
            </div>
        </template>
    </father>
</div>
</template>

<script>
import father from './father.vue'
export default {
data () {
return {
    data:'0'
};
},
components: {father},

methods: {
    bc(){
        this.data = '2'
    }
}
}

</script>
<style lang='scss' scoped>
</style>