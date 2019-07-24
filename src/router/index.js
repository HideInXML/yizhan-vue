import Vue from 'vue'
import Router from 'vue-router'
import staticRoutes from '@/router/staticRoutes'
import whiteList from '@/router/whiteList'
import {
  requestUserInfo
} from '@/api/user'

Vue.use(Router)

const router = new Router({
  routes: staticRoutes
})

/* 利用router.meta保存数据级权限 */
const router_init = (permissions) => {
  permissions.forEach(function (v) {
    let routeItem = router.match(v.path)
    if (routeItem) {
      routeItem.meta.permission = v.permission ? v.permission : []
    }
  })
}

/* 根据设置的白名单，跳过此路由权限检查 */
const pass_check = (to_path) => {
  // console.log(to_path)
  let is_check = true // 是否检查，默认检查 true
  whiteList.forEach(w => {
    // to_path.indexOf(w) !== -1
    if (w !== '/' && to_path.indexOf(w) !== -1)
      is_check = false
  })
  console.log("is_check:", is_check)
  return is_check
}

/* 免登录页面：检测用户是否有权限访问页面 */
const page_permission = (permissions, to_path, next) => {
  let allow_page = false
  permissions.forEach(function (v) {
    if (v.path === to_path) {
      allow_page = true
    }
  })
  allow_page ? next() : next({
    path: '/error/401'
  })
}

/* 权限控制 */
router.beforeEach((to, from, next) => {
  /* 忽略错误页面的权限判断 */
  if (to.meta.errorPage)
  {
    return next()
  }
  /* 进入登录页面将注销用户信息 */
  if (to.path === '/admin/login')
  {
    sessionStorage.removeItem('user-info')
    localStorage.removeItem('user-token')
  }
  if (pass_check(to.path))
  {
    let user_info = JSON.parse(sessionStorage.getItem('user-info'))
    /* 上次会话结束，重新获取用户信息 */
    if (!user_info)
    {
      requestUserInfo().then(user_info => {
        const permissions = user_info.permissions || []
        router_init(permissions)
        page_permission(permissions, to.path, next)
      }).catch((err) => {
        /* 获取用户信息异常 */
        console.error(err)
      })
    } else
    {
      /* 已登录时判断页面权限 */
      const permissions = user_info.permissions || []
      router_init(permissions)
      page_permission(permissions, to.path, next)
    }
  } else return next()
})

export default router
