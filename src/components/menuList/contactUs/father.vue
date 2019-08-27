<!--  -->
<template>
<div>
<!-- <child>
	    <div slot="pane" slot-scope="{data}">
	      <slot name="pane" :data="data"></slot>
	    </div> 
       
</child> -->
    {{data}}
    <button @click="bc">按钮</button>
    <!-- <slot name="pane1">我是b组件</slot> -->
    <!-- <child :data='data'>
        <template slot="pane2">
            <div>
                
            </div>
        </template>
       
    </child> -->
</div>
</template>

<script>
import child from './child'
export default {
    props:{
        data:{
            type:String,
            default:'123'
        }
    },
data () {
return {
};
},
components: {child},

methods: {
    bc(){
       this.$emit('buttonClick','333') 
    }
}
}

</script>
<style lang='scss' scoped>
</style>