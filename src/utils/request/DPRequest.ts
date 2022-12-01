import {
  DefaultHeaders,
  IDomainEnv,
  IHttpResponse,
  IRequest,
  IResponse,
  ServerDomain,
  PostType
} from './constants'

import RUNTIME from '@/common/runtime'
import { serializeObject } from '@/utils/tools'

export default class DPRequest {
  constructor(config: IRequest) {
    this.config = this.setConfig(config)
  }

  /** 默认配置 */
  private config: IRequest = {
    path: ''
  }

  private request<T>(config: IRequest): Promise<IResponse<T>> {
    const { requestIntercepter, failHandler, successHandler } = this.config

    /** 定义执行成功的操作 */
    const success = (res: any) => {
      if (this.checkStatus(res)) {
        /** 服务器正确的返回code=0 */
        if (res.data?.code) {
          failHandler && failHandler(res.data)
        } else {
          successHandler && successHandler(res)
        }
      } else {
        failHandler && failHandler(res.data)
      }
      /** 默认返回res.data */
      return res.data
    }
    /**  处理某个接口单独改了配置的情况 */
    let realConfig: IRequest = {
      ...this.config,
      ...config,
      path: this.getRealPath(config),
      headers: {
        ...this.config.headers,
        ...config.headers
      }
    }
    /** 接口拦截 */
    if (requestIntercepter) {
      realConfig = requestIntercepter(realConfig)
    }
    return this.fetchInstance(realConfig, success) as unknown as Promise<IResponse<T>>
  }

  /** 检测http请求状态 */
  checkStatus(response: Response): Response {
    const { status, url } = response
    const { failHandler } = this.config
    if (!(status >= 200 && status < 300)) {
      failHandler({ status, url })
    }
    return response
  }

  /** 设置接口请求实际config */
  setConfig(config: IRequest) {
    /** 处理默认header和配置header合并 */
    config.headers = {
      ...DefaultHeaders,
      ...config?.headers
    }
    return {
      ...this.config,
      ...config
    }
  }

  /** 序列化GET请求参数 */
  getRealPath(config: IRequest): string {
    const { path = '', query, method } = config
    if (method !== 'GET') {
      return path
    }
    const serializeQuery = serializeObject(query)
    /** 处理path上写了参数 query也写了参数的情况 */
    if (path.includes('?') && serializeQuery) {
      return `${path}&${serializeQuery}`
    }
    if (serializeQuery) {
      return `${path}?${serializeQuery}`
    }
    return path
  }

  /**
   * 根据接口路径按照一定规定返回对应三个环境的服务
   * 目前有一些接口没有按照规则来定义域名对应的接口，如果发现的话记得跟服务器及时沟通，不然后续就需要花更多时间来维护🙃🙃🙃🙃🙃🙃
   * @param path
   * @returns
   */
  getDomainUrl(path: string): IDomainEnv {
    let domainUrl: IDomainEnv = {
      dev: '',
      pre: '',
      prod: ''
    }
    if (/\/(uis|ns|code|wechat|s)/.test(path)) {
      domainUrl = ServerDomain.UIS
    }
    if (/\/(shop-api|shop-admin)/.test(path)) {
      domainUrl = ServerDomain.OLA
    }
    if (/\/(fc-ca)/.test(path)) {
      domainUrl = ServerDomain.FCCA
    }
    if (/\/(promotion)/.test(path)) {
      domainUrl = ServerDomain.FCPROMOTION
    }
    return domainUrl
  }

  fetchInstance<T>(config: IRequest, success): Promise<IResponse<T>> {
    let { baseUrl = '' } = config
    const { path = '', headers } = config

    if (!baseUrl) {
      baseUrl = this.getDomainUrl(path)[RUNTIME.env] || ''
    }
    const options = {
      ...config
    }
    const url = `${baseUrl}${path}`
    /** 根据请求数据类型格式化body */
    if (options?.body && headers['Content-Type'] !== PostType.FROM_DATA) {
      options.body = this.formatBody(options.body)
    }
    return fetch(url, options)
      .then((response: Response) => this.checkStatus(response))
      .then(async response => {
        const { ok, status, statusText, headers } = response
        const headersObj = {}
        for (const key of headers.keys()) {
          headersObj[key] = headers.get(key)
        }
        const httpResponse: IHttpResponse = {
          ok,
          data: null,
          status,
          statusText,
          headers: headersObj
        }
        const data = {}
        httpResponse.data = data
        // 默认的response处理 暂时只处理为json的情况
        const contentType = response.headers.get('content-type')
        if (/application\/json/.test(contentType as string)) {
          httpResponse.data = await response.json()
        }
        return success(httpResponse)
      })
  }

  formatBody(data: Record<string, unknown>) {
    let body = ''
    try {
      body = JSON.stringify(data || {})
    } catch (e) {
      console.warn('***formatBody error***', e)
    }
    return body
  }

  get<T = any>(path: string, config?: IRequest) {
    return this.request<T>({
      path,
      method: 'GET',
      ...config
    })
  }

  post<T = any>(path: string, body: any, config?: IRequest) {
    return this.request<T>({
      path,
      body,
      method: 'POST',
      ...config
    })
  }
}
