import { EnvPathType, EnvType, RuntimeType } from '@/common/type'

const __APP_ENV__ = 'dev'
const env: EnvType = __APP_ENV__ as EnvType
const envPath: string = EnvPathType[__APP_ENV__]

let runtime: RuntimeType = RuntimeType.H5

const isDevelopment = env === EnvType.LOCAL

const ua = navigator.userAgent.toLowerCase()

if (/(micromessenger)/i.test(ua)) {
  runtime = RuntimeType.WECHAT
} else if (/(drpanda)/i.test(ua)) {
  runtime = RuntimeType.APP
  if (/(com.drpanda.chineseclass)/i.test(ua)) {
    runtime = RuntimeType.CC
  } else if (/(com.drpanda.chineseacademy)/i.test(ua)) {
    runtime = RuntimeType.CA
  } else if (/(com.drpanda.learningworld)/i.test(ua)) {
    // PDP | 熊猫博士看世界 | Dr. Panda - Learn & Play
    runtime = RuntimeType.LP
  }
} else {
  runtime = RuntimeType.H5
}

export default {
  env,
  envPath,
  runtime,
  isDevelopment
}
