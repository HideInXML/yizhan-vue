import request from '@/utils/request'
import url from '@/api/url'

/* 请求添加学生 */
const requestAddStudent = params => {
  return request({
    url: url.addStudent,
    method: 'post',
    data: params
  })
}

/* 请求学生列表 */
const requestStudentList = keywords => {
  return request({
    url: url.studentList,
    method: 'post',
    data: keywords
  })
}

/* 根据学生 id 查询学员信息 */
const requestGetStudent = id => {
  return request({
    url: url.getStudent + '/' + id,
    method: 'get'
  }, false)
}

/* 根据学员 id 修改学员信息 */
const requestEditStudent = params => {
  return request({
    url: url.editStudent,
    method: 'put',
    data: params
  })
}

/* 删除学员 */
const requestDelStudent = params => {
  return request({
    url: url.delStudent,
    method: 'delete',
    data: params
  }, false)
}

export {
  requestAddStudent,
  requestStudentList,
  requestGetStudent,
  requestEditStudent,
  requestDelStudent
}
