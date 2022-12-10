import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { IUserInfo } from '@/server/type/user'

interface IHeader {
  userInfo: IUserInfo
}
const Header: React.FC<IHeader> = props => {
  const { userInfo } = props

  const navigate = useNavigate()
  console.warn(userInfo?.avatar, userInfo)

  return (
    <div className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <img
            src='https://yach-static.zhiyinlou.com/online/jsapi/1665281276537/jde9gmmno8/3d040adc-e2b0-4629-9c0f-b7487334af5e.png'
            alt='图片失踪了！'
          />
        </div>
        <div className={styles.middle} />
        <div className={styles.right}>
          <div
            className={styles.search}
            onClick={() => {
              navigate('/search')
            }}
          />
          <div className={styles.add} />
        </div>
      </div>
    </div>
  )
}
export default Header
