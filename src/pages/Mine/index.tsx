import { message } from 'antd'
import { Dialog } from 'antd-mobile'
import {
  EditSOutline,
  ExclamationTriangleOutline,
  SendOutline,
  SetOutline
} from 'antd-mobile-icons'
import { Action } from 'antd-mobile/es/components/dialog'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import next from '@/assets/images/next.png'

import styles from './index.module.scss'

import { deleteUserInfo, updateUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { removeCookie } from '@/utils/storage'
import { asyncFetch } from '@/utils/tools'

const Mine = () => {
  const { userInfo, setLoginStatus } = useModel('user')
  const navigate = useNavigate()
  const [cancleVisible, setCancleVisible] = useState<boolean>(false)
  const [logouteVisible, setLogoutVisible] = useState<boolean>(false)
  // 注销账号
  const cancelAccount = (action: Action) => {
    console.log(action)
    if (action.key === 'delete') {
      asyncFetch(deleteUserInfo({ account: userInfo.account }), {
        onFinish() {
          setLoginStatus(false)
          message.success('注销成功！', 1, () => {
            navigate('/login')
          })
        }
      })
    }
    setCancleVisible(false)
  }
  // 登出
  const logout = (action: Action) => {
    if (action.key === 'delete') {
      removeCookie('usertoken')
      asyncFetch(updateUserInfo({ ...userInfo, status: false }), {
        onSuccess(result?) {
          console.log(result)
        }
      })
      message.success('退出登录', 1, () => {
        navigate('/login')
      })
    }
    setLogoutVisible(false)
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={userInfo.avatar}
          className={styles.avatar}
          onClick={() =>
            navigate('/friendDetail', {
              state: userInfo
            })
          }
        />
        <div className={styles.wrap}>
          <div className={styles.name}>{`昵称:${userInfo.name}`}</div>
          <div className={styles.account}>{`账号:${userInfo.account}`}</div>
        </div>
        <div className={styles.icon} onClick={() => navigate('/userDetail')}>
          <img src={next} className={styles.next} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.setting}>
          <SetOutline />
          <span>设置</span>
          <img src={next} className={styles.next} />
        </div>
        <div className={styles.setting}>
          <EditSOutline />
          <span onClick={() => message.info('该功能暂未开发')}>修改密码</span>
          <img src={next} className={styles.next} />
        </div>
        <div className={styles.setting}>
          <SendOutline />
          <span onClick={() => setLogoutVisible(true)}>退出登录</span>
          <img src={next} className={styles.next} />
        </div>
        <div className={styles.server}>
          <ExclamationTriangleOutline color='red' />
          <span onClick={() => setCancleVisible(true)}>注销账号</span>
          <img src={next} className={styles.next} />
        </div>
      </div>
      <Dialog
        visible={cancleVisible}
        content='是否是注销chatRoom账号？'
        actions={[
          [
            {
              key: 'cancel',
              text: '取消'
            },
            {
              key: 'delete',
              text: '确定',
              bold: true,
              danger: true
            }
          ]
        ]}
        onAction={(action: Action) => cancelAccount(action)}
      />
      <Dialog
        visible={logouteVisible}
        content='是否退出登录？'
        actions={[
          [
            {
              key: 'cancel',
              text: '取消'
            },
            {
              key: 'delete',
              text: '确定',
              bold: true,
              danger: true
            }
          ]
        ]}
        onAction={(action: Action) => logout(action)}
      />
    </div>
  )
}

export default Mine
