import { Toast } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'

import styles from './index.module.scss'

import { useModel } from '@/store'

const FriendDeatil = () => {
  const navigate = useNavigate()
  const { memberData, setMemberData } = useModel('userList')
  const {
    state: { name, avatar, signature, account }
  } = useLocation()
  console.log(
    memberData.filter(item => item.account === account),
    account
  )

  const addFriend = () => {
    navigate('/addFriend', {
      state: {
        name,
        avatar,
        signature,
        account
      }
    })
  }
  const deleteFriend = () => {
    setMemberData(pre => pre.filter(item => item.account !== account))
    Toast.show('删除成功')
    navigate('/')
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
        <img src={avatar} alt='' className={styles.bg} />
        <div className={styles.wrap}>
          <div className={styles.avatar}>
            <img src={avatar} alt='' />
          </div>
          <div className={styles.name}>{`昵称：${name}`}</div>
          <div className={styles.signature}>{signature}</div>
        </div>
        {memberData.filter(item => item.account === account).length > 0 ? (
          <div className={styles.btn_delete} onClick={() => deleteFriend()}>
            删除好友
          </div>
        ) : (
          <div className={styles.btn_add} onClick={() => addFriend()}>
            加好友
          </div>
        )}
      </div>
    </div>
  )
}

export default FriendDeatil
