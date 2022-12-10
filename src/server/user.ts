import { IUserInfo } from './type/user'

import request from '@/utils/request'

export const RegisterUserInfo = (RegisterData: IUserInfo) => {
  return request.post<IUserInfo>('/user/register', RegisterData)
}
export const LoginUserInfo = (LoginData: IUserInfo) => {
  return request.post<IUserInfo>('/user/login', LoginData)
}
