export interface IUserInfo {
  token?: string // token令牌
  id?: number // 用户ID
  name?: string // 用户名称
  account: string // 账号
  password: string // 密码
  signature?: string // 个性签名
  sex?: string // 性别
  birthday?: string // 生日
  date?: string // 账号创建时间
  avatar?: any // 头像
  status?: boolean // 登录状态
  email?: string // 邮箱
  identity?: string // 用户身份
  isTop?: boolean // 是否置顶
}
