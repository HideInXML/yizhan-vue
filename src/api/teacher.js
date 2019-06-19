import request from '@/utils/request'
import url from '@/api/url'

/* 请求添加教师页时对图片的限制信息 */
const requestImgLimit = _ => {
  return request({
    url: url.getImageLimit,
    method: 'get'
  })
}

/* 请求添加教师 */
const requestAddTeacher = params => {
  return request({
    url: url.addTeacher,
    method: 'post',
    data: params
  })
}

/* 请求教师列表(可按条件搜索) */
const requestTeachList = keywords => {
  return request({
    url: url.teachList,
    method: 'post',
    data: keywords
  })
}

/* 删除教师 */
const requestDelTeacher = param => {
  return request({
    url: url.delTeacher,
    method: 'delete',
    data: param
  }, false)
}

/* 根据id 查询教师，涉及到查询失败的路由跳转，所以要手动控制错误信息的输出 */
const requestGetTeacher = id => {
  return request({
    url: url.getTeacher + '/' + id,
    method: 'get'
  }, false)
}

/* 根据 id 修改教师信息 */
const requestEditTeacher = params => {
  return request({
    url: url.editTeacher,
    method: 'put',
    data: params
  })
}

export {
  requestImgLimit,
  requestAddTeacher,
  requestTeachList,
  requestDelTeacher,
  requestGetTeacher,
  requestEditTeacher
}
