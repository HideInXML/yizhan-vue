<template>
  <footer class="footer">Copyright {{ copyright }}</footer>
</template>

<script>
export default {
  name: 'TheLayoutFooter',
  props: ['copyright']
}
</script>

<style scoped>
.footer {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}
</style>
