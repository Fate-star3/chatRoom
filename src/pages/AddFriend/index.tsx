import { message } from 'antd'
import { Toast } from 'antd-mobile'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { useModel } from '@/store'

const AddFriend = () => {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useModel('user')
  const { listData } = useModel('userList')
  const [inputValue, setInputValue] = useState<string>('')
  const {
    state: { name, avatar, account }
  } = useLocation()
  const sendFriendMessage = () => {
    if (!inputValue) {
      return Toast.show('请输入加好友信息')
    }
    if (userInfo.newFriend.filter(item => item.account === account).length !== 0) {
      return message.error('重复添加！')
    }
    Toast.show({
      content: '发送好友请求成功！',
      icon: 'success'
    })
    listData.forEach(item => {
      if (item.account === account) {
        item.leaveMessage = inputValue
      }
    })
    setUserInfo({
      ...userInfo,
      newFriend: listData.filter(item => item.account === account),
      message: userInfo.message.concat(listData.filter(item => item.account === account))
    })
    navigate(-1)
  }

  return (
    <div className={styles.container}>
      <header className={styles.back}>
        <div className={styles.wrap}>
          <div
            className={styles.back_icon}
            onClick={() => {
              navigate(`/message`)
            }}
          />
          <div className={styles.more} />
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.wrap}>
          <div className={styles.avatar}>
            <img src={avatar} />
          </div>
          <div className={styles.name}>{name}</div>
          <textarea
            className={styles.text}
            placeholder='亲爱的，快点来到我这里～'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <div className={styles.btns}>
            <div
              className={styles.cancle}
              onClick={() => {
                navigate(-1)
              }}
            >
              取消
            </div>
            <div className={styles.send} onClick={() => sendFriendMessage()}>
              发送
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFriend
