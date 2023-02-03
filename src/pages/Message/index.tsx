import { useEffect, useState } from 'react'

import Header from './components/Header'
import MessageList from './components/MessageList'

import { IUserInfo } from '@/server/type/user'
import { getAllUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const Message = () => {
  const { userInfo } = useModel('user')
  const [listData, setListData] = useState<IUserInfo[]>([])
  useEffect(() => {
    asyncFetch(getAllUserInfo(''), {
      onSuccess(result) {
        console.log(result)
        result.forEach(item => {
          item.isTop = false
        })
        if (localStorage.getItem('list')) {
          setListData(JSON.parse(localStorage.getItem('list')))
        } else {
          setListData(result.filter(item => item.account !== userInfo.account))
        }
      }
    })
  }, [])
  return (
    <>
      <Header userInfo={userInfo} listData={listData} setListData={setListData} />
      <MessageList userInfo={userInfo} listData={listData} setListData={setListData} />
    </>
  )
}

export default Message
