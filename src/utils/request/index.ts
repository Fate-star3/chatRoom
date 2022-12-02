/**
 *  初始化网络请求配置选项（如：url前缀、headers配置）
 *  网络拦截器（请求与响应）
 */
import { message } from 'antd'

import DPRequest from './DPRequest'

import { tokenStorage } from '../storage'

const request = new DPRequest({
  /** 请求拦截器 */
  requestIntercept(config) {
    if (tokenStorage.getItem()) {
      config.headers.Authorization = tokenStorage.getItem()
    }
    return config
  },
  /** 响应拦截器 */
  responseIntercept(response) {
    const code = response.data.code
    switch (code) {
      case 0:
        return response.data
      case 401:
        goLogin()
        return response.data || {}
      default:
        if (response.data?.message) {
          message.destroy()
          message.error(response.data?.message)
        }
        return response.data || {}
    }
  },
  /** 响应异常拦截器 */
  errorIntercept(error: Error) {
    return { message: onErrorReason(error.message) }
  }
})

function goLogin() {
  // 退出登录逻辑
  if (window.location.href.indexOf('login') === -1) {
    message.error('登录已过期,请重新登录!')
    window.location.hash = '/login'
  }
}

/** 解析http层面请求异常原因 */
function onErrorReason(message: string): string {
  if (message.includes('timeout')) {
    return '请求超时，请重试!'
  }
  switch (message) {
    case 'Request failed with status code 401':
      return '登录过期，请重新登录!'
    case 'Network Error':
      return '网络异常，请检查网络情况!'
    default:
      return message || '服务异常,请重试!'
  }
}

export default request
