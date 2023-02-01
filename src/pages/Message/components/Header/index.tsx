/* eslint-disable react/no-unknown-property */
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
  const backToUserDetail = () => {
    navigate('/userDetail')
  }
  return (
    <div className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.left} onClick={() => backToUserDetail()}>
          <img src={userInfo?.avatar} />
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
