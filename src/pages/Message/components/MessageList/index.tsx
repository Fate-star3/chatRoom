import { SwipeAction } from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/swipe-action'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { useModel } from '@/store'
import { getDate } from '@/utils/date-format'

const MessageList = () => {
  const { userInfo, setUserInfo } = useModel('user')
  const navigate = useNavigate()

  const rightActions: Action[] = [
    {
      key: 'top',
      text: '置顶',
      color: 'primary'
    },
    {
      key: 'delete',
      text: '删除',
      color: 'danger'
    }
  ]

  const rightActionsTop: Action[] = [
    {
      key: 'failtop',
      text: '取消置顶',
      color: 'primary'
    },
    {
      key: 'delete',
      text: '删除',
      color: 'danger'
    }
  ]

  return (
    <div className={styles.list}>
      <ul className={styles.wrap}>
        {userInfo?.message.map((item, index) => {
          return (
            <SwipeAction
              key={index}
              closeOnTouchOutside
              rightActions={item?.isTop ? rightActionsTop : rightActions}
              onAction={(action: Action) => {
                const { key } = action
                if (key === 'delete') {
                  setUserInfo({
                    ...userInfo,
                    message: userInfo.message.filter(element => element.account !== item.account)
                  })
                }
                if (key === 'top') {
                  const tempData = userInfo.message.slice()
                  const deleteData = tempData.splice(index, 1)
                  item.isTop = true
                  setUserInfo({ ...userInfo, message: [...deleteData, ...tempData] })
                }
                if (key === 'failtop') {
                  item.isTop = false
                  const tempData = userInfo.message.slice().filter(item => item.isTop)
                  const topData = userInfo.message.slice().filter(item => !item.isTop)

                  setUserInfo({ ...userInfo, message: [...tempData, ...topData] })
                }
              }}
            >
              <li
                key={index}
                style={{
                  backgroundColor: `${item?.isTop ? '#eee' : '#fff'}`
                }}
                className={styles.item}
                onClick={() => {
                  navigate(`/message/detail/${item.account}`, {
                    state: {
                      name: item.name,
                      type: item.type,
                      avatar: item.avatar,
                      signature: item.signature,
                      account: item.account
                    }
                  })
                }}
              >
                <div className={styles.list_item}>
                  <img src={item?.avatar} alt='' />
                  <div className={styles.circle}>1</div>
                  <div className={styles.right}>
                    <span>{item?.name}</span>
                    <p>{item?.identity}</p>
                  </div>
                  <div className={styles.time}>{getDate(item?.date)}</div>
                </div>
              </li>
            </SwipeAction>
          )
        })}
      </ul>
    </div>
  )
}

export default MessageList
