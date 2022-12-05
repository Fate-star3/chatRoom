import React from 'react'

import styles from './index.module.scss'

import { useModel } from '@/store'

const Header = () => {
  const { userInfo } = useModel('user')
  console.warn(userInfo?.avatar, userInfo)

  return (
    <div className={styles.header}>
      <img src={userInfo?.avatar} alt='' width={50} height={50} />
    </div>
  )
}
export default Header
