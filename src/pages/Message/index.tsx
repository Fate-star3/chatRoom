import { useEffect } from 'react'

import Header from './components/Header'
import MessageList from './components/MessageList'

import { getAllGroup } from '@/server/group'
import { getAllUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const Message = () => {
  const { userInfo } = useModel('user')
  const { listData, setListData, groupData, setGroupData } = useModel('userList')
  // 存储好友列表
  useEffect(() => {
    asyncFetch(getAllUserInfo(''), {
      onSuccess(result) {
        console.log(result, 'list')
        result.forEach(item => {
          item.isTop = false
          item.isCheck = false
        })
        setListData(result.filter(item => item.account !== userInfo.account))
        if (localStorage.getItem('list')) {
          setListData(JSON.parse(localStorage.getItem('list')))
        }
      }
    })
  }, [])
  // 存储群聊列表
  useEffect(() => {
    asyncFetch(getAllGroup(), {
      onSuccess(result) {
        result.forEach(item => {
          item.isTop = false
        })
        console.log(result, 'GROUP')
        setGroupData(result)
        if (localStorage.getItem('group')) {
          setGroupData(JSON.parse(localStorage.getItem('group')))
        }
      }
    })
  }, [])

  useEffect(() => {
    if (listData.length) {
      localStorage.setItem('list', JSON.stringify(listData))
      console.log('消息列表并保存到localStorage!')
    }
  }, [listData])
  useEffect(() => {
    if (groupData.length) {
      localStorage.setItem('group', JSON.stringify(groupData))
      console.log('群聊列表并保存到localStorage!')
    }
  }, [groupData])
  return (
    <>
      <Header userInfo={userInfo} />
      <MessageList />
    </>
  )
}

export default Message
