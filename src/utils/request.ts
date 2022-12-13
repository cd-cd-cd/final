import axios from 'axios'
import * as antd from 'antd'
import type { HeadersDefaults, AxiosRequestConfig } from 'axios'
const BASE_URL = '/api'
// 添加额外的头部配置
interface Header extends HeadersDefaults {
  'Content-Type': string
}

(axios.defaults.headers as Header)['Content-Type'] = 'application/json;charset=utf-8'
// 返回数据格式
interface Response<T> {
  stat: string,
  data: T
}
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(config => {
  return config
})

// 响应拦截
service.interceptors.response.use(res => {
  return res
}, error => {
  const { status } = error.response
  const { stat, msg } = error.response.data
  return handleErrorCode(status, stat, msg)
})

// 处理错误代码
function handleErrorCode (status: number, stat: string, msg: string) {
  switch (status) {
    case 400:
    case 403:
    case 404:
    case 405:
    case 500: {
      antd.message.error(msg)
      return Promise.reject(stat)
    }
    default: {
      antd.message.error('请求出错')
      return Promise.reject(stat)
    }
  }
}

// 请求函数
async function request<T> (option: AxiosRequestConfig) {
  try {
    const res = await service.request<Response<T>>({
      ...option
    })
    return res.data
  } catch (error) {
    return undefined
  }
}

export default request
