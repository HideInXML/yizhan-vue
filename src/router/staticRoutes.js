//前台界面
import HelloYiZhan from "@/components/HelloYiZhan";
import CL_index from "@/components/menuList/companyIntroduction/CI_index"
import CU_index from "@/components/menuList/contactUs/CU_index"
import MP_index from "@/components/menuList/mainPage/MP_index"
import MA_index from "@/components/menuList/mateAchievement/MA_index"
import RCI_index from "@/components/menuList/recruitClassInfo/RCI_index"
import TS_index from "@/components/menuList/teacherStrength/TS_index"
//后台界面
//@author:liuwen
import AppLogin from '@/pages/login/AppLogin'
import AppError401 from '@/pages/error/AppError401'
import AppError404 from '@/pages/error/AppError404'
import TheLayout from '@/pages/layout/TheLayout'
import FuncHome from '@/pages/functions/home/FuncHome'
import FuncCompanyIntro from '@/pages/functions/company/FuncCompanyIntro'
import FuncCompanyInfo from '@/pages/functions/company/FuncCompanyInfo'
import FuncAdmission from '@/pages/functions/admission/FuncAdmission'
import FuncTeachAdd from '@/pages/functions/teacher/FuncTeachAdd'
import FuncTeachList from '@/pages/functions/teacher/FuncTeachList'
import FuncTeachEdit from '@/pages/functions/teacher/FuncTeachEdit'
import FuncStudList from '@/pages/functions/student/FuncStudList'
import FuncStudAdd from '@/pages/functions/student/FuncStudAdd'
import FuncStudEdit from '@/pages/functions/student/FuncStudEdit'
import FuncSignList from '@/pages/functions/sign/FuncSignList'
import FuncSiteHome from '@/pages/functions/site/FuncSiteHome'
import FuncSiteConf from '@/pages/functions/site/FuncSiteConf'
import FuncUserPassword from '@/pages/functions/user/FuncUserPassword'

/* 静态页面路由 */
const staticRoutes = [
//前台路由
  {
    path: '/',
    name: 'HelloYiZhan',
    component: HelloYiZhan,
    children:
      [
        {
          path: 'companyIntroduction',
          name: '公司介绍',
          component: CL_index
        },
        {
          path: 'contactUs',
          name: '联系我们',
          component: CU_index
        },
        {
          path: 'mainPage',
          name: '网站首页',
          component: MP_index
        },
        {
          path: 'mateAchievement',
          name: '校友风采',
          component: MA_index
        },
        {
          path: 'recruitClassInfo',
          name: '招班信息',
          component: RCI_index
        },
        {
          path: 'teacherStrength',
          name: '师资力量',
          component: TS_index
        },
      ]

  },

//后台路透
//@author:liuwen
  {
    path: '/admin/login',
    name: 'Login',
    component: AppLogin
  },
  {
    path: '/error/401',
    name: 'error401',
    meta:
      {
        errorPage: true
      },
    component: AppError401
  },
  {
    path: '*',
    name: 'error404',
    meta:
      {
        errorPage: true
      },
    component: AppError404
  },
  {
    path: '/admin',
    redirect: '/admin/index'
  },
  {
    /* 以下为侧边菜单栏定义 */
    /* menu 表示此路由为侧边菜单栏 */
    /* 如果要继承layout布局，所以采用嵌套路由的写法 */
    /* 如果只有一个子路由，则其为一级菜单栏，且没有下级 */
    /* 如果有2个以上子路由，则有二级菜单 */
    /* 一级菜单 */
    path: '/admin',
    component: TheLayout,
    menu: true,
    children:
      [{
        path: 'index',
        name: '首页',
        icon: 'el-icon-menu',
        component: FuncHome
      }]
  },
  {
    /* 二级菜单 */
    path: '/admin/company',
    component: TheLayout,
    name: '公司',
    menu: true,
    icon: 'el-icon-s-cooperation',
    children:
      [{
        path: 'intro',
        name: '介绍',
        component: FuncCompanyIntro
      },
        {
          path: 'info',
          name: '公司信息',
          component: FuncCompanyInfo
        }]
  },
  {
    /* 一级菜单 */
    path: '/admin',
    component: TheLayout,
    menu: true,
    children:
      [{
        path: 'admission',
        name: '招班动态',
        icon: 'el-icon-s-claim',
        component: FuncAdmission
      }]
  },
  {
    /* 二级菜单 */
    path: '/admin/teacher',
    component: TheLayout,
    name: '教师',
    menu: true,
    icon: 'el-icon-s-custom',
    children:
      [{

        path: 'list',
        name: '教师列表',
        component: FuncTeachList
      },
        {
          path: 'add',
          name: '添加教师',
          component: FuncTeachAdd
        }]
  },
  {
    /* 不显示在菜单栏-编辑教师 */
    path: '/admin/teacher',
    component: TheLayout,
    children:
      [{
        path: 'edit/:id',
        component: FuncTeachEdit
      }]
  },
  {
    /* 二级菜单 */
    path: '/admin/student',
    component: TheLayout,
    name: '学员风采',
    menu: true,
    icon: 'el-icon-s-flag',
    children:
      [{
        path: 'list',
        name: '学员列表',
        component: FuncStudList
      },
        {
          path: 'add',
          name: '添加学员',
          component: FuncStudAdd
        }]
  },
  {
    /* 不显示在菜单栏-编辑学员 */
    path: '/admin/student',
    component: TheLayout,
    children:
      [{
        path: 'edit/:id',
        component: FuncStudEdit
      }]
  },
  {
    /* 一级菜单 */
    path: '/admin/sign',
    component: TheLayout,
    menu: true,
    children:
      [{
        path: 'list',
        name: '我要保名',
        icon: 'el-icon-phone',
        component: FuncSignList
      }]
  },
  {
    path: '/admin/site',
    component: TheLayout,
    name: '站点配置',
    icon: 'el-icon-s-platform',
    menu: true,
    children:
      [{
        path: 'homepage',
        name: '站点首页',
        component: FuncSiteHome
      },
        {
          path: 'config',
          name: '配置信息',
          component: FuncSiteConf
        }]
  },
  {
    path: '/admin/user',
    component: TheLayout,
    children:
      [{
        path: 'password',
        component: FuncUserPassword
      }]
  }]


export default staticRoutes
