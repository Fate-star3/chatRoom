import { message } from 'antd'
import { Button } from 'antd-mobile'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { useModel } from '@/store'

const FriendVerification = () => {
  const {
    state: { type }
  } = useLocation()
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useModel('user')
  const [visible, setVisible] = useState<boolean>(false)
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
          <div className={styles.username}>{type}</div>
          {type === '新朋友' && (
            <div className={styles.more} onClick={() => navigate('/search')}>
              添加
            </div>
          )}
        </div>
      </header>
      <div className={styles.content}>
        {type === '新朋友' &&
          userInfo?.newFriend.map((item, index) => {
            return (
              <div className={styles.list_item} key={index}>
                <img
                  src={item?.avatar}
                  onClick={() =>
                    navigate('/friendDetail', {
                      state: {
                        name: item.name,
                        avatar: item.avatar,
                        signature: item.signature,
                        account: item.account
                      }
                    })
                  }
                />
                <div className={styles.right}>
                  <div className={styles.msg}>
                    <span className={styles.span}>{item?.name}</span>
                    <span className={styles.span_gray}>{`留言：${item?.leaveMessage}`}</span>
                  </div>
                </div>
                {!visible && (
                  <>
                    <Button
                      className={styles.btn}
                      type='button'
                      color='primary'
                      block
                      onClick={() => {
                        setUserInfo({
                          ...userInfo,
                          friend: userInfo.friend.concat(item),
                          newFriend: userInfo?.newFriend.filter(ele => ele.account !== item.account)
                        })
                        setVisible(true)
                        message.success('添加好友成功！')
                      }}
                    >
                      同意
                    </Button>
                  </>
                )}
                {visible && <span className={styles.btn}>已同意</span>}
              </div>
            )
          })}
        {type === '群通知' &&
          userInfo.newGroup.map((item, index) => {
            return (
              <div className={styles.list_item} key={index}>
                <img
                  src={item?.avatar}
                  onClick={() =>
                    navigate('/friendDetail', {
                      state: {
                        name: item.name,
                        avatar: item.avatar,
                        announcement: item.announcement,
                        account: item.account
                      }
                    })
                  }
                />
                <div className={styles.right}>
                  <div className={styles.msg}>
                    <span className={styles.span}>{item?.name}</span>
                    <span className={styles.span_gray}>{`留言：${item?.leaveMessage}`}</span>
                  </div>
                </div>
                {!visible && (
                  <>
                    <Button
                      className={styles.btn}
                      type='button'
                      color='primary'
                      block
                      onClick={() => {
                        setUserInfo({
                          ...userInfo,
                          group: userInfo.group.concat(item),
                          newGroup: userInfo.newGroup.filter(ele => ele.account !== item.account)
                        })
                        setVisible(true)
                      }}
                    >
                      同意
                    </Button>
                  </>
                )}
                {visible && <span className={styles.btn}>已同意</span>}
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default FriendVerification
