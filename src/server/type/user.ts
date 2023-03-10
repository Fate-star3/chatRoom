import { IGroupInfo } from './group'

export interface IUserInfo {
  token?: string // token令牌
  id?: number // 用户ID
  name?: string // 用户名称
  account?: string // 账号
  password?: string // 密码
  signature?: string // 个性签名
  sex?: string // 性别
  birthday?: string // 生日
  date?: string // 账号创建时间
  avatar?: any // 头像
  status?: boolean // 登录状态
  email?: string // 邮箱
  identity?: string // 用户身份
  isTop?: boolean // 在消息列表用户是否置顶
  isCheck?: boolean // 创建群聊时用户是否选中
  type?: string // 类别
  message?: IMessage<Partial<IGroupInfo> & Partial<IUserInfo>>[] // 消息列表
  leaveMessage?: string // 好友申请留言
  friend?: IUserInfo[] // 好友列表
  group?: IGroupInfo[] // 群聊列表
  newFriend?: IUserInfo[] // 新盆友
  newGroup?: IGroupInfo[] // 新群聊,
  flag?: boolean
  groupIdentity?: string // 用户在群聊的身份
}

type IMessage<T> = {
  [K in keyof T]: T[K]
}
