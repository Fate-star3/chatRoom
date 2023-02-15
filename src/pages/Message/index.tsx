import { useEffect } from 'react'

import Header from './components/Header'
import MessageList from './components/MessageList'

import { getAllUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const Message = () => {
  const { userInfo } = useModel('user')

  const { setListData } = useModel('userList')

  useEffect(() => {
    // 存储好友列表  添加群聊成员
    asyncFetch(getAllUserInfo(''), {
      onSuccess(result) {
        console.log(result, 'list')
        setListData(result.filter(item => item.account !== userInfo.account))
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
