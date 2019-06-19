import request from '@/utils/request'
import url from '@/api/url'

/* 请求获取招班动态 */
const requestAdmiInfo = _ => {
  return request({
    url: url.getAdmiInfo,
    method: 'post'
  })
}

/* 请求修改招班动态 */
const requestEditAdmiInfo = params => {
  return request({
    url: url.editAdmiInfo,
    method: 'put',
    data: params
  })
}

export {
  requestAdmiInfo,
  requestEditAdmiInfo
}
