import { IUserInfo } from './type/user'

import request from '@/utils/request'
/**
 * 注册用户
 * @param RegisterData
 * @returns
 */
export const RegisterUserInfo = (RegisterData: IUserInfo) => {
  return request.post<IUserInfo>('/api/user/register', RegisterData)
}
/**
 * 登录
 * @param LoginData
 * @returns
 */
export const LoginUserInfo = (LoginData: IUserInfo) => {
  return request.post<IUserInfo>('/api/user/login', LoginData)
}
/**
 * 获取单个用户信息
 * @param account
 * @returns
 */
export const getUserInfo = (account: string) => {
  return request.get<IUserInfo>(`/api/user/userInfo?account=${account}`)
}
/**
 * 获取正则匹配成功对应的用户
 * @param account
 * @returns
 */
export const getAllUserInfo = (account?: string) => {
  return request.get<IUserInfo[]>(`/api/user/search?account=${account}`)
}
/**
 * 编辑用户个人信息
 * @param body
 * @returns
 */
export const updateUserInfo = (body: IUserInfo) => {
  return request.post('/api/user/update', body)
}
