import request from '@/utils/request'
import url from '@/api/url'

/* 请求站点首页轮播图 */
const requestSiteHome = _ => {
  return request({
    url: url.getSiteHome,
    method: 'post'
  })
}

/* 修改站点首页轮播图 */
const requestEditSiteHome = params => {
  return request({
    url: url.setSiteHome,
    method: 'put',
    data: params
  })
}

/* 请求站点配置信息 */
const requestGetConf = _ => {
  return request({
    url: url.getConf,
    method: 'post'
  })
}

/* 请求修改站点配置信息 */
const requestEditConf = params => {
  return request({
    url: url.editConf,
    method: 'put',
    data: params
  })
}

/* 请求站点统计数据 */
const requestSiteStatistics = _ => {
  return request({
    url: url.siteStatistics,
    method: 'post'
  })
}

export {
  requestSiteHome,
  requestEditSiteHome,
  requestGetConf,
  requestEditConf,
  requestSiteStatistics
}
