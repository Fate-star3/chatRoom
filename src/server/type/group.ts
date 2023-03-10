import { IUserInfo } from './user'

export interface IGroupInfo {
  name: string // 群聊名称
  account: string // 群聊号
  avatar: string // 群聊头像
  announcement?: string // 群聊公告
  member?: IUserInfo[] // 群聊成员
  isTop?: boolean // 在消息列表群聊是否置顶
  date?: string // 群聊创建时间
  type?: string // 类别
  leaveMessage?: string // 群聊申请留言
}
