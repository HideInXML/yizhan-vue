const config = {
  baseUrl: 'http://localhost/YiZhan/public/', // 请求 api 的公共前缀
  // 请求头信息
  headers: {
    'Content-Type': 'application/json; charset=UTF-8; multipart/form-data;'
  },
  // 参数
  // data: {},
  // 设置超时时间
  timeout: 15000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json'
}

export default config
