<template>
  <el-row class="page">
    <el-col :span="24">
      <the-header :open-nav="openNav" @toggle-open="toggleOpen" :title="conf.site_name"></the-header>
    </el-col>
    <el-col :span="24" class="page-main">
      <the-sidebar :open-nav="openNav"></the-sidebar>
      <section class="page-content" :class="{'page-content-hide-aside': !openNav}">
        <vue-scroll>
          <the-main></the-main>
          <the-footer :copyright="conf.site_copyright"></the-footer>
        </vue-scroll>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import TheLayoutHeader from '@/pages/layout/TheLayoutHeader'
import TheLayoutSidebar from '@/pages/layout/TheLayoutSidebar'
import TheLayoutMain from '@/pages/layout/TheLayoutMain'
import TheLayoutFooter from '@/pages/layout/TheLayoutFooter'
import { requestGetConf } from '@/api/site'

export default {
  name: 'TheLayout',
  created() {
    this.getConf()
  },
  data() {
    return {
      conf: {},
      openNav: true // 刚进首页 默认侧边栏打开
    }
  },
  methods: {
    getConf() {
      requestGetConf().then(result => {
        if (result)
          this.conf = result
        else
          this.conf = { site_name: '艺站', site_copyright: '© Kelvin since 2019' }
      })
    },
    toggleOpen() {
      this.openNav = !this.openNav
    }
  },
  components: {
    'the-header': TheLayoutHeader,
    'the-sidebar': TheLayoutSidebar,
    'the-main': TheLayoutMain,
    'the-footer': TheLayoutFooter
  }
}
</script>

<style scoped lang="scss">
.page {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .page-main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    .page-content {
      position: absolute;
      left: 240px;
      right: 0;
      height: 100%;
    }
    .page-content-hide-aside {
      left: 65px;
    }
  }
}
</style>
