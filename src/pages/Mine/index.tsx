import { message } from 'antd'
import { Dialog } from 'antd-mobile'
import { ExclamationTriangleOutline, SetOutline } from 'antd-mobile-icons'
import { Action } from 'antd-mobile/es/components/dialog'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import next from '@/assets/images/next.png'

import styles from './index.module.scss'

import { deleteUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const Mine = () => {
  const { userInfo, setLoginStatus } = useModel('user')
  const navigate = useNavigate()
  const [cancleVisible, setCancleVisible] = useState<boolean>(false)
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
          <div className={styles.name}>{userInfo.name}</div>
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
    </div>
  )
}

export default Mine
