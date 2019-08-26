<!--  -->
<template>
<div>
    child: {{data}}
    <div>
      <slot name="pane2">我是c组件</slot>
    </div>
</div>
</template>

<script>
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

components: {},

computed: {},

mounted: {},

methods: {}
}

</script>
<style lang='scss' scoped>
</style>