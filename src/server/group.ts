import { IGroupInfo } from './type/group'

import request from '@/utils/request'

/**
 * 创建群聊
 * @param group
 * @returns
 */
export const createGroup = (group: Partial<IGroupInfo>) => {
  return request.post('/group/create', group)
}
/**
 * 获取群聊信息
 * @returns
 */
export const getAllGroup = () => {
  return request.get<IGroupInfo[]>('/group/allGroupInfo')
}
/**
 * 搜索群聊信息
 * @returns
 */
export const searchGroupInfo = (query: string) => {
  return request.get<IGroupInfo[]>(`/group/searchGroup?account=${query}`)
}
