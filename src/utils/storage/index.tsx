import runtime from '@/common/runtime'

export const localStorageKey = 'yyx'

export class SessionStorage {
  key: any

  defaultValue: string

  constructor(key: string, defaultValue: string) {
    this.key = localStorageKey + key
    this.defaultValue = defaultValue
  }

  setItem(value: any) {
    sessionStorage.setItem(this.key, window.btoa(encodeURIComponent(JSON.stringify(value))))
  }

  getItem() {
    const value =
      sessionStorage[this.key] &&
      decodeURIComponent(window.atob(sessionStorage.getItem(this.key) as string))
    if (value === undefined) return this.defaultValue
    try {
      return value && value !== 'null' && value !== 'undefined'
        ? JSON.parse(value)
        : this.defaultValue
    } catch (error) {
      return value && value !== 'null' && value !== 'undefined' ? value : this.defaultValue
    }
  }

  removeItem() {
    sessionStorage.removeItem(this.key)
  }
}

/** 管理token */
export const tokenStorage = new SessionStorage('authToken', '')

/** 只清除当前项目所属的本地存储 */
export const clearSessionStorage = () => {
  for (const key in sessionStorage) {
    if (key.includes(localStorageKey)) {
      sessionStorage.removeItem(key)
    }
  }
}

const Cookie: Record<string, any> = {
  // 熊猫博士H5登录系统的cookie
  Token: 'dptoken',
  Path: '/',
  Prefix: {
    local: 'dev-',
    dev: 'dev-',
    pre: 'pre-',
    prod: 'prod-'
  }
}

const getCookieName = (name: string) => {
  const envPrefix = Cookie.Prefix[runtime.env]
  return `${envPrefix}${name}`
}

/**
 * 因为现在H5项目三个环境部署在一个domain下，为了满足目前需要相同环境相同name的cookie共享的需求，所以用name来区分各环境的cookie, path为/
 * 每个name在set/get/remove会dev/pre环境的关键字。例：before: name=token after(dev/pre): name=(dev/pre)-token，线上不拼接
 * @param name
 * @param value
 * @param days
 */
export const setCookie = (name: string, value: string, days = 30) => {
  // 单独校验 token 的长度
  if (name === Cookie.Token && value?.length < 64) {
    return
  }
  const cookieName = getCookieName(name)
  removeCookie(name)
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${cookieName}=${encodeURIComponent(
    value
  )};expires=${expires.toUTCString()};path=${Cookie.Path}`
}

/**
 * 移除指定name的cookie
 * @param name
 */
export const removeCookie = (name: string) => {
  const cookieName = getCookieName(name)
  document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${Cookie.Path}`
}

/**
 * 获取指定name的cookie
 * @param name
 */
export const getCookie = (name: string) => {
  const cookieName = getCookieName(name)
  const cookieArr = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]*)(;|$)`))

  if (cookieArr?.length) {
    return decodeURIComponent(cookieArr[2])
  }
  return null
}
