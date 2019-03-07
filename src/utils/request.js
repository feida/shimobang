import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  // baseURL: 'http://139.196.222.42:5009', // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    /* if (store.getters.token) {
      config.headers['Authorization'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }*/
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }
    const err = new Error()
    err.response = response

    throw err
  }, (err) => {
    if (err && err.response) {
      Message({
        message: err.response.data,
        type: 'error',
        duration: 5 * 1000
      })
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          err.message = '未授权，请登录'
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = '请求地址出错'
          this.$router.push({ path: '/404' })
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    return Promise.reject(err)
  })

export default service
