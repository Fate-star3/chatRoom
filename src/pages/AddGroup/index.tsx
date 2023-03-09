import { message } from 'antd'
import { Button } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { searchGroupInfo } from '@/server/group'
import { IGroupInfo } from '@/server/type/group'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const AddGroup = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [groupData, setGroupData] = useState<Partial<IGroupInfo>[]>([])
  const { userInfo, setUserInfo } = useModel('user')
  const [inputValue, setInputValue] = useState<string>('')
  console.log(state)

  useEffect(() => {
    asyncFetch(searchGroupInfo(''), {
      onSuccess(result) {
        console.log(result, 'group')
        setGroupData(result as any)
      }
    })
  }, [])
  const joinGroup = () => {
    if (!inputValue) {
      return message.error('请输入验证信息！')
    }
    if (userInfo.newGroup.filter(item => item.account === state.account).length !== 0) {
      return message.error('重复添加！')
    }
    groupData.forEach(item => {
      if (item.account === state.account) {
        item.leaveMessage = inputValue
      }
    })
    // state.member.asyncFetch(updateUserInfo({}))
    setUserInfo({
      ...userInfo,
      newGroup: userInfo.newGroup.concat(
        groupData.filter(item => item.account === state.account) as any
      ),
      message: userInfo.message.concat(
        groupData.filter(item => item.account === state.account) as any
      )
    })
    navigate(-1)
    message.success('等待管理员同意！')
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
          <div className={styles.more} />
        </div>
      </header>
      <div className={styles.header}>
        <img src={state?.avatar} alt='' className={styles.avatar} />
        <div className={styles.right}>
          <div className={styles.name}>{state?.name}</div>
          <div className={styles.account}>{`${state?.account}`}</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.desc}>
          <span className={styles.label}>创建时间</span>
          <p> {state.date.slice(0, 10)}</p>
        </div>
        <div className={styles.announcement}>
          <span className={styles.label}>群公告</span>
          <p>{state.announcement}</p>
        </div>
        <div className={styles.control}>
          <span className={styles.label}>管理员</span>
          {state.member.map((item, index) => {
            return (
              <div className={styles.item} key={index}>
                <img src={item.avatar} alt='' />
              </div>
            )
          })}
        </div>
        <div className={styles.input}>
          <span className={styles.label}>验证消息</span>
          <textarea
            className={styles.text}
            placeholder='亲爱的，快点来到我这里～'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </div>
      </div>
      <Button className={styles.btn} type='button' onClick={() => joinGroup()}>
        加入群聊
      </Button>
    </div>
  )
}
export default AddGroup
