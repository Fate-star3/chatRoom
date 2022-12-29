export interface IUserInfo {
  token?: string // token令牌
  id?: number // 用户ID
  name?: string // 用户名称
  account: string // 账号
  password: string // 密码
  date?: string // 账号创建时间
  avatar?: any // 头像
  status?: boolean // 登录状态
  email?: string // 邮箱
  indentify?: string // 用户身份
}
