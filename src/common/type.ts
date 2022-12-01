export enum ProjectType {
  CA = 'CA',
  CC = 'CC',
  LP = 'LP',
  OLA = 'OLA'
}

export enum EnvType {
  LOCAL = 'local',
  DEV = 'dev',
  PRE = 'pre',
  PROD = 'prod'
}

export const EnvPathType = {
  [EnvType.DEV]: 'dev',
  [EnvType.PRE]: 'pre',
  [EnvType.PROD]: ''
}

export enum RuntimeType {
  H5 = 'h5',
  WECHAT = 'wechat',
  APP = 'app',
  CA = 'CA',
  CC = 'CC',
  LP = 'LP',
  OTHER = 'other'
}

export const PageModule = 'activity'

export interface WechatShareConfigType {
  title?: string
  description?: string
  link?: string
  imgurl?: string
}

export const GameIds = {
  ca: '1027828421423538180',
  cc: '1027828421423538201',
  lp: '1027828421423538178',
  abc: '1321289937760354311',
  town: '1027828421423538181',
  baike: '20010'
}

export const OfficeIP = ['101.204.128.237', '171.217.71.153']
