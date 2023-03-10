import { useEffect } from 'react'

import Header from './components/Header'
import MessageList from './components/MessageList'

import { socket } from '@/server/common'
import { useModel } from '@/store'

const Message = () => {
  const { userInfo } = useModel('user')
  useEffect(() => {
    socket.emit('login', userInfo.account)
  }, [])
  return (
    <>
      <Header userInfo={userInfo} />
      <MessageList />
    </>
  )
}

export default Message
