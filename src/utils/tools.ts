import { IResponse } from './request/constants'

const toString = Object.prototype.toString

export function isArrayBuffer(val: any): boolean {
  return toString.call(val) === '[object ArrayBuffer]'
}

export function isFormData(val: any): boolean {
  return typeof FormData !== 'undefined' && val instanceof FormData
}

export function isUndefined(val: any): boolean {
  return typeof val === 'undefined'
}

export function isBoolean(value: any): boolean {
  return typeof value === 'boolean'
}

export function isObject(val: null): boolean {
  return val !== null && typeof val === 'object'
}

export function isFile(val): boolean {
  return toString.call(val) === '[object File]'
}

export function isBlob(val): boolean {
  return toString.call(val) === '[object Blob]'
}

interface AsyncFetchHooks<T> {
  onRequest?: () => void
  onSuccess?: (result?: T) => void
  onFinish?: () => void
  /** 请求报错时的回调 */
  onError?: (
    error?: ErrorEvent | { code: number; message: string }
  ) => void /** 原生的错误事件对象 */
}

/**
 * 调用接口通用方案
 *
 * @param apiCall 请求接口的回调，需返回promise
 * @param hooks { onRequest, onSuccess, onFinish, onError } 开始、成功、出错、结束时的回调
 *
 */
export async function asyncFetch<T>(
  apiCall: Promise<IResponse<T>>,
  hooks: AsyncFetchHooks<T> = {}
) {
  const { onRequest, onSuccess, onFinish, onError } = hooks
  try {
    onRequest && onRequest()
    const result: IResponse<T> = await apiCall
    if (result.code === 0) {
      onSuccess && onSuccess(result.data)
    } else {
      onError && onError(result as { code: number; message: string })
    }
  } catch (error) {
    onError && onError(error as ErrorEvent)
  } finally {
    onFinish && onFinish()
  }
}

/** 精确判断数据类型 */
export function getType<T>(val: T) {
  return Object.prototype.toString.call(val).slice(8, -1)
}

/** 删除对象value两边空格和换行符 */
export function formatParams<T extends Object>(obj: T) {
  const type = getType(obj)
  if (type !== 'Object' && type !== 'Array') return obj
  const newParams = Array.isArray(obj) ? [...obj] : { ...obj }
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'string') {
      // @ts-ignore
      newParams[key] = value.trim().replace(/\n\r/g, '')
    } else {
      // @ts-ignore
      newParams[key] = formatParams(value)
    }
  }
  return newParams
}

/**
 *
 * @param query 序列化对象为字符串拼接
 * for example {
 *   a: 1,
 *   b: 2
 * }
 * return a=1&b=2
 * @returns
 */
export function serializeObject(query: Record<string, unknown>): string {
  if (!query) {
    return ''
  }
  const newObj: Record<string, unknown> = (Object.keys(query) || [])
    .filter(key => query[key])
    .reduce((acc, key) => ({ ...acc, [key]: query[key] }), {})
  let str = ''
  for (const key in newObj) {
    str = `${str}${key}=${newObj[key]}&`
  }
  str = str.substring(0, str.length - 1)
  return str
}

/**
 * 当前运行设备的操作环境
 * @param {String} key
 */
// eslint-disable-next-line func-names
export const os = (function () {
  const ua = navigator.userAgent
  const isWindowsPhone = /(?:Windows Phone)/.test(ua)
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  const isAndroid = /(?:Android)/.test(ua)
  const isFireFox = /(?:Firefox)/.test(ua)
  const isTablet =
    /(?:iPad|PlayBook)/.test(ua) ||
    (isAndroid && !/(?:Mobile)/.test(ua)) ||
    (isFireFox && /(?:Tablet)/.test(ua))
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet
  const isPc = !isPhone && !isAndroid && !isSymbian
  return {
    isTablet,
    isPhone,
    isAndroid,
    isPc
  }
})()

/**
 * 获取设备信息
 * @param {Number} mode
 * 1. 只区分pc和mobile
 * 2. 只区分运行环境，wechat、app、other、wxwork
 * 3. 区分手机类型，比如ios、xiaomi、huawei、oppo、vivo等，希望能持续更新，未匹配上直接返回完整的userAgent
 */
export const getDevice = (mode: number) => {
  const ua = navigator.userAgent.toLowerCase()

  let result = ''

  switch (mode) {
    case 1:
      if (os.isTablet) {
        result = 'tablet'
      } else if (os.isPhone) {
        result = 'mobile'
      } else {
        result = 'pc'
      }
      break
    case 2:
      if (/(micromessenger)/i.test(ua)) {
        result = 'wechat'
      } else if (/(wxwork)/i.test(ua)) {
        // 企业微信
        result = 'wxwork'
      } else if (/(drpanda)|(abcreading)/i.test(ua)) {
        result = 'app'
      } else {
        result = 'other'
      }
      break
    case 3:
      if (/(iphone|ipad|ipod|mac)/i.test(ua)) {
        result = 'ios'
      } else if (/(huawei|honor)/i.test(ua)) {
        result = 'huawei'
      } else if (/(oppo|x9007|x907|x909|r831s|r827t|r821t|r811|r2017|pacm00|pbem00)/i.test(ua)) {
        result = 'oppo'
      } else if (/(mi)/i.test(ua)) {
        result = 'xiaomi'
      } else if (/(vivo)/i.test(ua)) {
        result = 'vivo'
      } else {
        result = 'b2b'
      }
      break
    default: {
      result = ua
    }
  }

  return result
}

/**
 * Sleep
 * @param ms
 * @return {Promise<unknown>}
 */
export const sleep = async (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

/**
 * @param time
 * @returns {}
 * 1. days  天数 计算有多少天
 * 2. hours 小时数 计算一天剩余多少小时
 * 3. minutes 分钟数 计算一小时剩余多少分钟
 * 4. seconds 秒数  计算一分钟剩余多少秒
 */
export const getTime = (
  countdown: number
): {
  days?: string
  hours?: string
  minutes?: string
  seconds?: string
} => {
  if (!countdown) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  }
  const addPrefix = (time: number): string => {
    return time < 10 ? `0${time}` : `${time}`
  }
  /** 计算相差天数 */
  const days = String(Math.floor(countdown / (24 * 3600 * 1000)))
  // 计算天数后剩余的毫秒数
  const leftTime1 = countdown % (24 * 3600 * 1000)
  /** 计算小时数 */
  const hours = addPrefix(Math.floor(leftTime1 / (3600 * 1000)))
  /** 计算小时数后剩余的毫秒数 */
  const leftTime2 = leftTime1 % (3600 * 1000)
  /** 计算相差分钟数 */
  const minutes = addPrefix(Math.floor(leftTime2 / (60 * 1000)))
  /** 计算分钟数后剩余的毫秒数 */
  const leftTime3 = leftTime2 % (60 * 1000)
  /** 计算相差秒 */
  const seconds = addPrefix(Math.round(leftTime3 / 1000))

  return { days, hours, minutes, seconds }
}

const addTimePrefix = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`
}

/**
 * 时间戳转换展示
 * @param timestamp ms 毫秒时间戳
 */
export const getDisplayTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  const Y = `${date.getFullYear()}-`
  const M = `${addTimePrefix(date.getMonth() + 1)}-`
  const D = `${addTimePrefix(date.getDate())} `
  const h = `${addTimePrefix(date.getHours())}:`
  const m = `${addTimePrefix(date.getMinutes())}:`
  const s = `${addTimePrefix(date.getSeconds())}`
  return Y + M + D + h + m + s
}

/**
 *
 * @param str 处理序列表字符串为对象
 * @returns
 */
export const serializeStr = (str: string) => {
  const searchParams = new URLSearchParams(`?${str}`)

  const result = {}
  for (const [key, value] of searchParams.entries()) {
    result[key] = value
  }
  return result
}

/**
 * @param any[] 处理数组类型的数据  str 对象数组项中的key
 * @return any[]
 */
export const replaceStr = (arr: any[], ...str: string[]): any[] => {
  const newArr = arr.map(item => {
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        str.forEach(ele => {
          if (key === ele) {
            item[key] = item[key].replace(item[key].substring(3, 7), '****')
          }
        })
      }
    }
    return item
  })
  return newArr
}
/**
 *
 * @param min 生成任意范围的随机整数
 * @param max
 * @returns
 */
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** 删除用户信息相关的url参数 */
export const deleteUselessParam = () => {
  const searchParams = new URLSearchParams(window.location.search)

  if (searchParams.has('dptoken')) {
    searchParams.delete('dptoken')
  }
  let result = ''

  if (searchParams.toString()) {
    result = `?${searchParams.toString()}`
  }
  window.history.replaceState(null, '', window.location.origin + window.location.pathname + result)
}

// 计时器 清除此计时器需要使用 cancelAnimationFrame
export function intervalFrame(cb: () => void, time: number): number {
  let frame
  let i = 1
  frame = requestAnimationFrame(function fn() {
    // 计数器 % (60/一秒钟执行的次数)
    if (i % (60 / (1000 / time)) === 0) {
      cb()
    }
    i++
    frame = requestAnimationFrame(fn)
  })
  return frame
}
