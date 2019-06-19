<template>
  <el-header class="header">
    <router-link to="/admin/index">
      <div class="logo" :class="{'logo-hide': !openNav}">
        <img src="../../assets/logo.png" class="image">
        <span class="text">{{ title }}</span>
      </div>
    </router-link>
    <div class="content">
      <i class="fa fa-outdent toggle" @click="navOpenToggle" title="隐藏菜单" v-show="openNav"></i>
      <i class="fa fa-indent toggle" @click="navOpenToggle" title="显示菜单" v-show="!openNav"></i>
    </div>
    <el-dropdown trigger="hover" class="user">
      <span class="user-info">
        {{ user_name }}
        <i class="fa fa-user-circle-o fa-2x" style="margin-left: 10px"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>我的账号</el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/admin/user/password">修改密码</router-link>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <router-link to="/admin/login">退出登录</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
export default {
  name: 'TheLayoutHeader',
  props: ['openNav', 'title'],
  data() {
    const user_info = JSON.parse(sessionStorage.getItem('user-info'))
    const user_name = user_info['name']
    return {
      user_name: user_name
    }
  },
  methods: {
    navOpenToggle() {
      this.$emit('toggle-open')
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  line-height: 60px;
  background-color: #409eff;
  color: #ffffff;
  div {
    display: inline-block;
  }
  .logo {
    width: 240px;
    border-right: 1px solid #c0c4cc;
    margin-left: -20px;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
    .image {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
  }
  .logo-hide {
    width: 65px;
    .text {
      display: none;
    }
  }
  .content {
    padding: 0 20px;
    .toggle {
      font-size: 14px;
      cursor: pointer;
    }
  }
  .user {
    float: right;
    cursor: pointer;
    .user-info {
      color: #ffffff;
      i {
        vertical-align: middle;
      }
    }
  }
}
</style>
