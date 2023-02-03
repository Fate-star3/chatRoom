import { useNavigate, useLocation } from 'react-router-dom'

import styles from './index.module.scss'

const FriendDeatil = () => {
  const navigate = useNavigate()
  const {
    state: { name, avatar, signature }
  } = useLocation()

  const addFriend = () => {
    navigate('/addFriend', {
      state: {
        name,
        avatar,
        signature
      }
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
        <img src={avatar} alt='' className={styles.bg} />
        <div className={styles.wrap}>
          <div className={styles.avatar}>
            <img src={avatar} alt='' />
          </div>
          <div className={styles.name}>{`昵称：${name}`}</div>
          <div className={styles.signature}>{signature}</div>
        </div>
        <div className={styles.btn} onClick={() => addFriend()}>
          加好友
        </div>
      </div>
    </div>
  )
}

export default FriendDeatil
