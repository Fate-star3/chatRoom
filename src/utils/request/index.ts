/**
 *  初始化网络请求配置选项（如：url前缀、headers配置）
 *  网络拦截器（请求与响应）
 */
import { ErrorEventType, IHttpResponse, IRequest, PostType } from './constants'
import DPRequest from './DPRequest'

import { getCookie, removeCookie, setCookie } from '../storage'
import { deleteUselessParam } from '../tools'

import Toast from '@/components/Toast'

/** 处理接口失败 处理服务器code提供提示文本 */
const failHandler = (response: ErrorEventType) => {
  console.warn('response', response)
  let { message } = response
  const { code } = response
  switch (code) {
    case 404:
      message = '服务器404错误'
      break
    case 1070:
    case 1080:
    case 1041:
    case 60009:
      message = '权限验证失败或已过期，请重试'
      /** 处理token过期的情况 */
      removeCookie('dpuserinfo')
      removeCookie('dptoken')
      removeCookie('taltoken')
      deleteUselessParam()
      window.location.reload()
      break
    case 1012:
      message = '验证码错误，请重新输入'
      break
    case 1006:
      message = '验证码过期，请重新获取'
      break
    case 500:
      message = '服务器出小差了，请重试'
      break
    case 1002: // fc-promotion
      message = '抽奖将于11月1日晚19:00正式开始哦～'
      break
    case 4161:
    case 4168:
    case 4164:
    case 3000:
    case 60205:
    case 60315:
    case 60314:
    case 60313:
      message = ''
      break
    case 99999:
      message = '网络错误'
      break
    default:
      message = message || `error: ${code}`
  }
  console.warn('message', message)
  Toast.show(message)
}

/** 处理接口成功 */
const successHandler = (response: IHttpResponse) => {
  const token = response?.headers?.Authorization || response?.headers?.authorization
  const talToken = response?.headers?.['tal-token']
  if (token) {
    setCookie('dptoken', token)
  }
  if (talToken) {
    setCookie('taltoken', talToken)
  }
}

/** 发起请求前对request config做一些单独的处理 */
const requestIntercepter = (config: IRequest) => {
  const { path = '', noAuth, headers: originHeader } = config
  let headers: Record<string, string | number> = {
    Authorization: getCookie('dptoken'),
    Accept: PostType.JSON,
    'Content-Type': PostType.JSON,
    ...originHeader
  }
  if (noAuth || !getCookie('dptoken')) {
    delete headers.Authorization
  }
  // 针对某些接口做一些单独的处理
  if (
    path === '/uis/ns/account/udc-login-register-bind' ||
    path === '/uis/ns/account/mobile-login-register-bind'
  ) {
    headers = {
      ...headers,
      'X-USER-API-VERSION': 3
    }
  }
  return {
    ...config,
    headers
  }
}

export default new DPRequest({
  requestIntercepter,
  successHandler,
  failHandler
})
