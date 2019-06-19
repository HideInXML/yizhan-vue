<template>
  <aside class="sidebar" :class="{'sidebar-hide': !openNav}">
    <vue-scroll>
      <el-menu
        :default-active="$route.path"
        class="sidebar-menu"
        :collapse="!openNav"
        @select="menuSelect"
        :collapse-transition="false"
      >
        <template v-for="(level1, index1) in menu">
          <!-- 一级菜单 -->
          <el-menu-item
            v-if="level1.children.length === 1 && permissions.includes(level1.path +'/'+level1.children[0].path)"
            :index="level1.path +'/'+level1.children[0].path"
            :key="index1"
          >
            <i :class="level1.children[0].icon"></i>
            <span slot="title">{{level1.children[0].name}}</span>
          </el-menu-item>

          <el-submenu :index="index1+''" v-if="level1.children.length > 1" :key="index1+''">
            <template slot="title">
              <i :class="level1.icon"></i>
              <span slot="title">{{level1.name}}</span>
            </template>
            <template v-for="(level2, index2) in level1.children">
              <!-- 二级菜单 -->
              <el-menu-item
                v-if="!level2.children && permissions.includes(level1.path+'/'+level2.path)"
                :index="level1.path+'/'+level2.path"
                :key="index1+'-'+index2"
              >{{level2.name}}</el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </vue-scroll>
  </aside>
</template>

<script>
export default {
  name: 'TheLayoutSidebar',
  props: ['openNav'],
  data() {
    let user_info = JSON.parse(sessionStorage.getItem('user-info')).permissions || []
    let permissions = []
    user_info.forEach(p => {
      permissions.push(p.path)
    })
    return {
      permissions
    }
  },
  methods: {
    menuSelect(index, indexPath) {
      this.$router.push(index)
    }
  },
  computed: {
    menu: function () {
      return this.$router.options.routes.filter(route => {
        if (route.menu) {
          // 一级菜单 直接返回
          if (route.children.length === 1)
            return route
          else if (route.children.length > 1) { // 二级菜单 则 进行处理 与权限表比对 删除无权限访问的路由
            let children = []
            route.children.forEach(child => {
              if (this.permissions.includes(route.path + '/' + child.path)) {
                children.push(child)
              }
            })
            // 如果二级菜单中只能看到一个菜单,则自动转成一级菜单 icon下放 让自己也有图标 不丢面儿
            if (children.length === 1)
              children[0].icon = route.icon
            // 重新设置子路由
            route.children = children
            return route
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  width: 240px;
  position: absolute;
  top: 0;
  bottom: 0;
  border-right: 1px solid #e6e6e6;
  .sidebar-menu {
    border: none;
    height: 100%;
  }
}
.sidebar-hide {
  width: 65px;
}
</style>
