// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/scss/font-awesome.scss'
import '@/assets/css/common.scss'
// import Mock from '@/mock/index'
import VueScroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'

// Mock.mockData()
Vue.config.productionTip = true

Vue.use(VueScroll, {
  ops: {
    bar: {
      background: '#C0C4CC'
    }
  }
})
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
