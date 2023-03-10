import { message } from 'antd'
import { Button } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { IGroupInfo } from '../../server/type/group'

import { updateGroupData } from '@/server/group'
import { IUserInfo } from '@/server/type/user'
import { updateUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const FriendVerification = () => {
  const { state } = useLocation()
  const { type } = state
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useModel('user')
  const [visible, setVisible] = useState<boolean>(false)
  const [newFriend, setNewFriend] = useState<IUserInfo[]>([])
  const [newGroup, setNewGroup] = useState<IGroupInfo[]>([])

  useEffect(() => {
    if (userInfo?.newFriend.length) {
      setNewFriend(userInfo?.newFriend)
    }
  }, [newFriend])
  useEffect(() => {
    if (userInfo?.newGroup.length) {
      setNewGroup(userInfo?.newGroup)
    }
  }, [newGroup])
  // 同意加好友
  const confirm = (item: IUserInfo) => {
    asyncFetch(
      // 更改用户本身的信息
      updateUserInfo({
        ...userInfo,
        friend: userInfo.friend.concat(item),
        newFriend: userInfo?.newFriend.filter(ele => ele.account !== item.account)
      })
    )
    // 更改好友的信息
    asyncFetch(
      updateUserInfo({
        ...item,
        friend: item.friend.concat(userInfo),
        newFriend: item?.newFriend.filter(ele => ele.account !== userInfo.account),
        message: item?.message.concat(userInfo)
      })
    )
    setVisible(true)
    message.success('添加好友成功！', 2, () => {
      setUserInfo({
        ...userInfo,
        friend: userInfo.friend.concat(item),
        newFriend: userInfo?.newFriend.filter(ele => ele.account !== item.account)
      })
      navigate(-1)
    })
  }
  // 同意用户加入群聊
  const groupConfirm = item => {
    const curr = userInfo.message.filter(ele => ele.account === item.account)[0]
    const tempData = userInfo.message.slice()
    tempData.splice(
      userInfo.message.findIndex(ele => ele.account === item.account),
      1,
      {
        ...curr,
        member: curr.member.concat(userInfo)
      }
    )
    setUserInfo({
      ...userInfo,
      group: userInfo.group.concat(item),
      newGroup: userInfo.newGroup.filter(ele => ele.account !== item.account),
      message: tempData
    })
    asyncFetch(
      updateGroupData({
        ...item,
        member: item.member.concat(userInfo)
      })
    )
    setVisible(true)
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
          newFriend.length > 0 &&
          newFriend?.map((item, index) => {
            return (
              <div className={styles.list_item} key={index}>
                <img
                  src={item?.avatar}
                  onClick={() =>
                    navigate('/friendDetail', {
                      state: item
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
                      onClick={() => confirm(item)}
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
          newGroup?.map((item, index) => {
            return (
              <div className={styles.list_item} key={index}>
                <img
                  src={item?.avatar}
                  onClick={() =>
                    navigate('/friendDetail', {
                      state: item
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
                      onClick={() => groupConfirm(item)}
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
