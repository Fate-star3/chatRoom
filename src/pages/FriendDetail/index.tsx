import { message } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

import styles from './index.module.scss'

import { updateUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const FriendDeatil = () => {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useModel('user')
  const { state } = useLocation()
  const { account, avatar, name, signature } = state
  console.log(state)

  const addFriend = () => {
    if (userInfo.friend.filter(item => item.account === state.account).length) {
      return message.warning('重复添加好友！')
    }
    navigate('/addFriend', {
      state
    })
  }
  const deleteFriend = () => {
    asyncFetch(
      updateUserInfo({
        ...userInfo,
        friend: userInfo.friend.filter(item => item.account !== account)
      })
    )
    setUserInfo({
      ...userInfo,
      message: userInfo.message.filter(item => item.account !== account),
      friend: userInfo.friend.filter(item => item.account !== account)
    })
    message.success('删除成功', 1, () => {
      navigate('/')
    })
  }
  return (
    <div className={styles.container}>
      <header className={styles.back}>
        <div className={styles.wrap}>
          <div
            className={styles.back_icon}
            onClick={() => {
              navigate(-1)
            }}
          />
          <div className={styles.more} />
        </div>
      </header>
      <div className={styles.content}>
        <img src={avatar} className={styles.bg} />
        <div className={styles.wrap}>
          <div className={styles.avatar}>
            <img src={avatar} />
          </div>
          <div className={styles.name}>{`昵称：${name}`}</div>
          <div className={styles.name}>{`账号：${account}`}</div>
          <div className={styles.signature}>{signature}</div>
        </div>
        {account !== userInfo.account && (
          <>
            {userInfo.friend.filter(item => item.account === account).length > 0 ? (
              <div className={styles.btn_delete} onClick={() => deleteFriend()}>
                <span>删除好友</span>
              </div>
            ) : (
              <div className={styles.btn_add} onClick={() => addFriend()}>
                <span>加好友</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default FriendDeatil
