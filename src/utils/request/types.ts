export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface RequestConfig {
  baseURL?: string
  timeout?: number
  checkStatus?: (status: number) => boolean
  requestIntercept?: (config: HttpRequestConfig) => HttpRequestConfig
  responseIntercept?: (res: HttpResponse) => unknown
  errorIntercept?: (error: Error) => unknown
}
export interface HttpRequestConfig extends RequestConfig {
  url: string
  returnAll?: boolean
  method: HttpMethod
  headers?: Record<string, string>
  data?: any // payload
  credentials?: 'include' | 'omit' | 'same-origin'
  mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin'
  query?: Record<string, unknown>
}

export interface HttpResponse<T = any> {
  ok: boolean
  data: T
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  usingCache?: boolean
  url?: string
  usingExceptionCache?: boolean
}

export interface HttpSuccessResponse<T> {
  code: number
  message: string
  data: T
}

export interface IRequestParams {
  [index: string]: any
}
