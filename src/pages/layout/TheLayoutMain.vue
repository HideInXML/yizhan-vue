<template>
  <el-main :style="mainStyle" class="page-sub-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-main>
</template>

<script>
// import { requestToken } from '@/api/user'
export default {
  name: 'TheLayoutMain',
  updated() {
    // requestToken()
  },
  data() {
    const win_height = window.innerHeight - 100 + 'px'
    return {
      mainStyle: {
        minHeight: win_height
      }
    }
  }
}
</script>

<style scoped>
.page-sub-main {
  background-color: #ebeef5;
  color: #666666;
}
</style>
