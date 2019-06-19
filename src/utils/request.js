import axios from 'axios'
import conf from '@/utils/config'
import {
  Message
} from 'element-ui'

/**
 * 约定返回格式为:
 * {
 *    success: true/false,
 *    result: {},
 *    error: {
 *      code: 10001,
 *      msg: '错误描述信息'
 *    }
 * }
 * @param {*} options 请求配置信息
 * @param {*} data_err 是否自动处理数据错误(即success=false时)的返回结果,默认为 true
 */
const request = (options, data_err = true) => {
  return new Promise((resolve, reject) => {
    // 创建 axios 实例
    const instance = axios.create({
      baseURL: conf.baseUrl, // api 请求地址的公共前缀
      headers: conf.headers, // 请求头信息
      timeout: conf.timeout, // 设置超时时间
      withCredentials: conf.withCredentials, // 携带凭证
      responseType: conf.responseType // 设置返回数据类型
    })

    /* request 拦截器 */
    instance.interceptors.request.use(config => {
      console.log('准备发送请求...')
      // 判断是否有 token 有的话就携带
      let token_type = 'bearer'
      let access_token = localStorage.getItem('user-token')
      let token = token_type + ' ' + access_token
      if (access_token)
        config.headers.Authorization = token
      // 根据请求方法,序列化参数
      if (!config.url)
        return config
      return config
    }, error => {
      // 处理请求错误
      console.log('request:', error)
      // 判断请求超时
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        Message({
          showClose: true,
          message: '请求超时',
          type: 'error',
          center: true
        })
      }
      return Promise.reject(error)
    })

    /**
     * response 拦截器
     * 当 data_err 设置为 true, 则返回 result 信息
     * 当 data_err 设置为 false, 则把所有返回信息全部扔出,交由调用方处理
     */
    instance.interceptors.response.use(response => {
      console.log('response 拦截器-处理正确返回')
      let data = response.data
      if (data_err) {
        if (!data.success) { // 返回的是错误信息
          console.log('response 响应正常 数据错误')
          const err_msg = data.error.msg
          // const err_cod = data.error.code
          Message({
            showClose: true,
            message: err_msg,
            type: 'error',
            center: true
          })
          // 如果设置成自动处理错误信息,则只要返回result结果
        }
        return data.result
      }
      console.log('把服务器端响应成功数据返回')
      return data // 把服务器端响应成功数据返回
    }, error => {
      console.log('response 拦截器-处理错误')
      // 请求超时
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        error.message = '请求超时'
      }
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '请求错误'
            break
          case 401:
            error.message = '未授权,请登录'
            window.location.href = '/#/admin/login'
            break
          case 403:
            error.message = '拒绝访问'
            break
          case 404:
            error.message = '请求地址出错:' + error.response.config.url
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器内部错误'
            break
          case 501:
            error.message = '服务未实现'
            break
          case 502:
            error.message = '网关错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网关超时'
            break
          case 505:
            error.message = 'HTTP 版本不受支持'
            break
          default:
            break
        }
      }
      Message({
        showClose: true,
        message: error.message,
        type: 'error',
        center: true
      })
      return Promise.reject(error)
    })

    /* 发送请求 */
    instance(options).then(response => {
      console.log('请求-处理正确结果')
      // console.log(response)
      resolve(response)
      return false
    }).catch(error => {
      console.log('请求-处理错误')
      reject(error)
    })
  })
}

export default request
