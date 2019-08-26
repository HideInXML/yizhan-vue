<!--  -->
<template>
<div>
<!-- <child>
	    <div slot="pane" slot-scope="{data}">
	      <slot name="pane" :data="data"></slot>
	    </div> 
       
</child> -->
    {{data}}
    <slot name="pane1">我是b组件</slot>
    <child :data='data'>
        <template slot="pane2">
            <div>
                
            </div>
        </template>
       
    </child>
</div>
</template>

<script>
import child from './child'
export default {
    props:{
        data:{
            type:String,
            default:''
        }
    },
data () {
return {
};
},
components: {child},

methods: {}
}

</script>
<style lang='scss' scoped>
</style>