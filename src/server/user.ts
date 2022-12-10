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

export const getUserInfo = (account: string) => {
  return request.get<IUserInfo>(`/user/userInfo?account=${account}`)
}
