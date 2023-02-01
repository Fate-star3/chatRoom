import { IUserInfo } from './type/user'

import request from '@/utils/request'
/**
 * 注册用户
 * @param RegisterData
 * @returns
 */
export const RegisterUserInfo = (RegisterData: IUserInfo) => {
  return request.post<IUserInfo>('/user/register', RegisterData)
}
/**
 * 登录
 * @param LoginData
 * @returns
 */
export const LoginUserInfo = (LoginData: IUserInfo) => {
  return request.post<IUserInfo>('/user/login', LoginData)
}
/**
 * 获取单个用户信息
 * @param account
 * @returns
 */
export const getUserInfo = (account: string) => {
  return request.get<IUserInfo>(`/user/userInfo?account=${account}`)
}
/**
 * 获取正则匹配成功对应的用户
 * @param account
 * @returns
 */
export const getAllUserInfo = (account?: string) => {
  return request.get<IUserInfo[]>(`/user/search?account=${account}`)
}

export const updateUserInfo = (body: IUserInfo) => {
  const options = {
    data: body
  }
  return request.post('/user/update', options)
}
