export const ServerDomain: Record<ServerType, IDomainEnv> = {
  OLA: {
    dev: 'https://ola-dev.xiongmaoboshi.com',
    pre: 'https://ola-pre.xiongmaoboshi.com',
    // prod: 'https://ola-pre.xiongmaoboshi.com',
    prod: 'https://ola.xiongmaoboshi.com'
  },
  UIS: {
    dev: 'https://staging-subs.xiongmaoboshi.com',
    pre: 'https://subs-pre.xiongmaoboshi.com',
    // prod: 'https://subs-pre.xiongmaoboshi.com',
    prod: 'https://subs.xiongmaoboshi.com'
  },
  FCCA: {
    dev: 'https://fc.xiongmaoboshi.com/h5/dev',
    pre: 'https://fc.xiongmaoboshi.com/h5/pre',
    // prod: 'https://fc.xiongmaoboshi.com/h5/pre',
    prod: 'https://fc.xiongmaoboshi.com/h5'
  },
  FCPROMOTION: {
    dev: 'https://fenxiao.xiongmaoboshi.com',
    pre: 'https://fenxiao.xiongmaoboshi.com',
    prod: 'https://fenxiao.xiongmaoboshi.com'
  }
}

export type HttpMethod = 'GET' | 'POST'

export type ServerType = 'OLA' | 'UIS' | 'FCCA' | 'FCPROMOTION'

/** 服务器环境域名区分 */
export interface IDomainEnv {
  dev: string
  pre: string
  prod: string
}

export const DefaultHeaders = {
  credentials: 'include',
  mode: 'no-cors'
}

export enum PostType {
  JSON = 'application/json;charset=utf-8;',
  FROM = 'application/x-www-form-urlencoded;charset=utf-8;',
  FROM_DATA = 'multipart/formdata'
}

export interface IRequest<T = any> {
  /** request本身会根据path匹配域名 提供特殊情况走指定服务的情况 */
  baseUrl?: string
  /** 接口路径 */
  path?: string
  /** 不需要鉴权的接口配置 可以在requestIntercepter处理一些特殊的header 有些接口穿了多余的header服务器会报错😅😅😅 */
  noAuth?: boolean
  /** header config */
  headers?: any
  /** 请求方式 */
  method?: HttpMethod
  /** post请求参数 */
  body?: T // Object | string | File | Stream
  /** get请求参数 */
  query?: T
  /** 请求拦截 */
  requestIntercepter?: (config: IRequest) => IRequest
  /** 错误处理 */
  failHandler?: (error: ErrorEventType) => void
  /** 成功处理 */
  successHandler?: (success: IHttpResponse) => void
}

export interface IHttpResponse<T = any> {
  ok: boolean
  data: Partial<IResponse<T>>
  status: number
  statusText: string
  headers: any
  url?: string
}

export interface IResponse<T = any> {
  code: number
  data: T
  message: string
}

export interface ErrorEventType extends Partial<IResponse> {
  status?: number
  url?: string
}
