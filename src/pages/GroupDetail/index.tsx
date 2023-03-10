import { message } from 'antd'
import { Button } from 'antd-mobile'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { useModel } from '@/store'

const GroupDetail = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useModel('user')
  // console.log(state)

  const leaveGroup = () => {
    const curr = userInfo.message.filter(ele => ele.account === state.account)[0]
    const tempData = userInfo.message.slice()
    tempData.splice(
      userInfo.message.findIndex(ele => ele.account === state.account),
      1,
      {
        ...curr,
        member: curr.member.filter(item => item.account !== state.account)
      }
    )
    setUserInfo({
      ...userInfo,
      group: userInfo.group.filter(item => item.account !== state.account),
      message: tempData.filter(item => item.account !== state.account)
    })

    message.success('退出群聊', 1, () => {
      navigate('/message')
    })
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
                <img src={item.avatar} alt='' className={styles.avatar} />
              </div>
            )
          })}
        </div>
      </div>
      {userInfo.group.filter(item => item.account === state.account).length > 0 && (
        <Button className={styles.btn} type='button' onClick={() => leaveGroup()}>
          退出群聊
        </Button>
      )}
    </div>
  )
}
export default GroupDetail
