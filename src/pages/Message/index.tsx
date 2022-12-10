import Header from './components/Header'
import MessageList from './components/MessageList'

import { useModel } from '@/store'

const Message = () => {
  const { userInfo } = useModel('user')

  return (
    <>
      <Header userInfo={userInfo} />
      <MessageList userInfo={userInfo} />
    </>
  )
}

export default Message
