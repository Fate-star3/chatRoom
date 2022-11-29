/** 1. 引入createStore.ts */
import createStore from './createStore'
import double11 from './modules/double11'
import user from './modules/user'

/** 3. 组合所有状态 */
const store = createStore(() => ({
  // user: user(),
  // double11: double11()
}))

/** 向外暴露useModel, StoreProvider, getModel, connectModel */
export const { useModel, StoreProvider, getModel, connectModel } = store
