import { useEffect, useCallback } from 'react'

import Header from './components/Header'
import MessageList from './components/MessageList'

import { getAllGroup } from '@/server/group'
import { getAllUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const Message = () => {
  const { userInfo } = useModel('user')

  const { setListData, setGroupData } = useModel('userList')

  useEffect(() => {
    // 存储好友列表  添加群聊成员
    asyncFetch(getAllUserInfo(''), {
      onSuccess(result) {
        console.log(result, 'list')
        setListData(result.filter(item => item.account !== userInfo.account))
      }
    })
    // 存储群聊列表 创建群聊模块
    asyncFetch(getAllGroup(), {
      onSuccess(result) {
        console.log(result, 'GROUP')
        setGroupData(result)
      }
    })
  }, [])

  return (
    <>
      <Header userInfo={userInfo} />
      <MessageList />
    </>
  )
}

export default Message
