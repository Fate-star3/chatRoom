import { useNavigate } from 'react-router-dom'

import next from '@/assets/images/next.png'

import styles from './index.module.scss'

import { updateUserInfo } from '@/server/user'
import { getModel } from '@/store'
import { removeCookie } from '@/utils/storage'
import { asyncFetch } from '@/utils/tools'

const UserDetail = () => {
  const { userInfo } = getModel('user')
  const navigate = useNavigate()
  const handleLogout = () => {
    removeCookie('usertoken')
    navigate('/login')
  }
  console.log(userInfo)
  const HandleUpdateUserInfo = data => {
    asyncFetch(updateUserInfo(data), {
      onSuccess(result) {
        console.log(1)
      }
    })
  }
  const updateAvatar = () => {
    console.log(1)
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
          <div className={styles.username}>个人信息</div>
          <div className={styles.more} />
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <span className={styles.left}>头像</span>
          <div className={styles.right} onClick={() => updateAvatar()}>
            <img src={userInfo?.avatar} alt='' />
            <img src={next} alt='' className={styles.next} />
          </div>
        </div>
        <div className={styles.name}>
          <span className={styles.left}>名字</span>
          <div className={styles.right}>
            <span>{userInfo.name}</span>
            <img src={next} alt='' className={styles.next} />
          </div>
        </div>
        <div className={styles.signature}>
          <span className={styles.left}>签名</span>
          <div className={styles.right}>
            <span>{userInfo.signature}</span>
            <img src={next} alt='' className={styles.next} />
          </div>
        </div>
        <div className={styles.sex}>
          <span className={styles.left}>性别</span>
          <div className={styles.right}>
            <span>{userInfo.sex}</span>
            <img src={next} alt='' className={styles.next} />
          </div>
        </div>
        <div className={styles.birthday}>
          <span className={styles.left}>生日</span>
          <div className={styles.right}>
            <span>{userInfo?.birthday.slice(0, 10)}</span>
            <img src={next} alt='' className={styles.next} />
          </div>
        </div>
      </div>
      <footer className={styles.footer} onClick={handleLogout}>
        退出登录
      </footer>
    </div>
  )
}

export default UserDetail
