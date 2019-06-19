import request from '@/utils/request'

import url from '@/api/url'

/**
 * 对 localStorage sessionStorage的所有操作,全部在此文件中进行,便于管理
 */

/* 请求登录认证,不需要response拦截器预处理错误 */
const requestLogin = params => {
  return request({
    url: url.login,
    method: 'post',
    data: params
  }, false).then(data => {
    // 存储 token 到 localStorage
    if (data.success)
      localStorage.setItem('user-token', data.result.token)
    return data
  })
}

/* 获取用户信息 */
const requestUserInfo = _ => {
  return request({
    url: url.userInfo,
    method: 'post'
  }).then(data => {
    sessionStorage.setItem('user-info', JSON.stringify(data))
    // console.log(data)
    return data
  })
}

/* 修改用户密码 */
const requestEditPassword = params => {
  return request({
    url: url.editPassword,
    method: 'put',
    data: params
  })
}

/* 每次主界面有变化时，更新 user-token */
// const requestToken = () => {
//   request('/api/admin/refresh-token').then((result) => {
//     localStorage.setItem('user-token', result.token)
//   })
// }

/* 退出登录 */
const requestLogout = () => {}

export {
  requestLogin,
  requestUserInfo,
  requestLogout,
  requestEditPassword
}
