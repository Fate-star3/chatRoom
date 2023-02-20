import { message } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { updateUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const AddFriend = () => {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useModel('user')
  const [inputValue, setInputValue] = useState<string>('')
  const { state } = useLocation()
  const { name, avatar, account } = state

  const sendFriendMessage = () => {
    if (!inputValue) {
      return message.error('请输入加好友信息')
    }
    if (userInfo.newFriend.filter(item => item.account === account).length !== 0) {
      return message.error('重复添加！')
    }
    asyncFetch(
      updateUserInfo({
        ...state,
        newFriend: state.newFriend.concat({ ...userInfo, leaveMessage: inputValue })
      }),
      {
        onSuccess(res) {
          console.log(res)
        },
        onFinish() {
          message.success('发送好友请求成功！', 1, () => {
            setUserInfo({
              ...userInfo,
              message: userInfo.message.concat(state),
              leaveMessage: inputValue
            })
            navigate(-1)
          })
        }
      }
    )
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
