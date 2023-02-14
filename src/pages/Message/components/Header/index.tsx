/* eslint-disable react/no-unknown-property */
import { Popover } from 'antd-mobile'
import {
  AddCircleOutline,
  HandPayCircleOutline,
  ScanningOutline,
  TransportQRcodeOutline,
  UserAddOutline
} from 'antd-mobile-icons'
import { Action } from 'antd-mobile/es/components/popover'
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
  const actions: Action[] = [
    {
      key: 'group',
      icon: <AddCircleOutline />,
      text: '创建群聊',
      onClick: () => navigate('/createGroup')
    },
    { key: '', icon: <UserAddOutline />, text: '加好友/群', onClick: () => navigate('/search') },
    { key: 'scan', icon: <ScanningOutline />, text: '扫一扫', disabled: true }
  ]
  return (
    <div className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.left} onClick={() => backToUserDetail()}>
          <img src={userInfo?.avatar} />
          <span>{userInfo?.name}</span>
        </div>
        <div className={styles.right}>
          <Popover.Menu actions={actions} placement='bottom-end' trigger='click' destroyOnHide>
            <div className={styles.add} />
          </Popover.Menu>
        </div>
      </div>
    </div>
  )
}
export default Header
