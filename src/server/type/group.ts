import { IUserInfo } from './user'

export interface IGroupInfo {
  name: string
  account: string
  avatar: string
  announcement: string
  member: IUserInfo[]
  isTop?: boolean // 在消息列表群聊是否置顶
  date?: string // 群聊创建时间
  type: string // 类别
}
