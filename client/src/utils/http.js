import axios from 'axios'

// 获取axios实例
let httpInstance = axios.create()
// axios全局配置
httpInstance.defaults.baseURL = 'http://localhost:8082'
httpInstance.defaults.timeout = 5000

// 配置默认的表单请求
httpInstance.formurl = (url, data, config) => {
  return httpInstance.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-from-urlencoded'
    },
    ...config
  })
}

// request拦截器
httpInstance.interceptors.request.use(
  config => {
    console.log('【进入了请求拦截器】', config);
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response拦截器
httpInstance.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return Promise.resolve(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default httpInstance
