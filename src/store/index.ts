/** 1. 引入createStore.ts */
import createStore from './createStore'
import user from './modules/user'
import userList from './modules/userList'

/** 3. 组合所有状态 */
const store = createStore(() => ({
  user: user(),
  userList: userList()
}))

/** 向外暴露useModel, StoreProvider, getModel, connectModel */
export const { useModel, StoreProvider, getModel, connectModel } = store
