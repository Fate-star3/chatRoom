import { message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import checkImg from '@/assets/images/Group 2@2x.png'
import groupImg from '@/assets/images/group.png'

import styles from './index.module.scss'

import { createGroup } from '@/server/group'
import { IGroupInfo } from '@/server/type/group'
import { IUserInfo } from '@/server/type/user'
import { updateAllUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch, getDisplayTime } from '@/utils/tools'

const CreateGroup = () => {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useModel('user')
  const [groupName, setGroupName] = useState<string>('')

  // 创建 群聊
  const create = () => {
    if (!groupName) {
      return message.warning('请输入群聊名称')
    }
    asyncFetch(
      createGroup({
        name: groupName || '',
        member: userInfo.friend.filter(item => item.isCheck) || [],
        date: getDisplayTime(+new Date())
      }),
      {
        onSuccess(result?) {
          setUserInfo({
            ...userInfo,
            message: userInfo.message.concat(result as IUserInfo),
            group: userInfo.group.concat(result as IGroupInfo)
          })
          console.log(result)
        },
        onFinish() {
          navigate(`/messageDetail/${groupName}`)
        }
      }
    )
    asyncFetch(updateAllUserInfo({ isCheck: false }), {
      onSuccess(result?) {
        const tempData = userInfo.friend.slice()
        tempData.forEach(item => {
          item.isCheck = false
        })
        setUserInfo({ ...userInfo, friend: tempData })
        console.log(result)
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
              navigate(`/message`)
            }}
          >
            取消
          </div>
          <div className={styles.groupname}>创建群聊</div>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.group_img}>
          <img src={groupImg} alt='' />
        </div>
        <input
          type='text'
          placeholder='请输入群名称'
          className={styles.group_input}
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
        />
        <div className={styles.user}>
          <h4>用户</h4>
          <ul>
            {userInfo.friend.map((item, index) => {
              return (
                <li key={index} className={styles.item}>
                  <div
                    onClick={() => {
                      item.isCheck = !item.isCheck
                      setUserInfo({ ...userInfo, message: [...userInfo.message] })
                    }}
                  >
                    {item.isCheck ? (
                      <div className={styles.circle}>
                        <img src={checkImg} className={styles.check} />
                      </div>
                    ) : (
                      <div className={styles.circle} />
                    )}
                  </div>
                  <img
                    src={item?.avatar}
                    onClick={() => {
                      navigate(`/friendDetail`, {
                        state: item
                      })
                    }}
                    className={styles.avatar}
                  />
                  <span>{item?.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.create} onClick={() => create()}>
          {`创建${userInfo.message.filter(item => item.isCheck).length || ''}`}
        </div>
      </div>
    </div>
  )
}

export default CreateGroup
