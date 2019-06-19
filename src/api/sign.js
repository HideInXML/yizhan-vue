import request from '@/utils/request'
import url from '@/api/url'

/* 获取报名者列表 */
const requestSignList = keywords => {
  return request({
    url: url.getSignList,
    method: 'post',
    data: keywords
  })
}

/* 请求删除报名者 */
const requestDelSign = param => {
  return request({
    url: url.delSign,
    method: 'delete',
    data: param
  }, false)
}

export {
  requestSignList,
  requestDelSign
}
