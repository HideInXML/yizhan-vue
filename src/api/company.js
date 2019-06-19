import request from '@/utils/request'
import url from '@/api/url'

/* 请求获取公司信息 */
const requestCompInfo = _ => {
  return request({
    url: url.getCompInfo,
    method: 'post'
  })
}

/* 请求修改公司信息 */
const requestEditCompInfo = params => {
  return request({
    url: url.editCompInfo,
    method: 'put',
    data: params
  })
}

/* 请求公司介绍信息 */
const requestCompIntro = _ => {
  return request({
    url: url.getCompIntro,
    method: 'post'
  })
}

/* 请求修改公司介绍 */
const requestEditCompIntro = params => {
  return request({
    url: url.editCompIntro,
    method: 'put',
    data: params
  })
}

export {
  requestCompInfo,
  requestEditCompInfo,
  requestCompIntro,
  requestEditCompIntro
}
